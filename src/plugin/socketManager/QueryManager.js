import ABuffer from './ABuffer';
import AQuery from './AQuery';

export default class {
	constructor() {
    this.netIo = null; //io 전송 방식에 따른 객체 저장

    this.sndBuf = null; //전송용 ABuffer 객체
    this.rcvBuf = null; //수신용 ABuffer 객체

    this.realCallbacks = {};      //.Feed 리얼데이터 콜백함수
    this.realPushCallbacks = {};  //.Push 리얼데이터 콜백함수
    this.lastQueryTime = null;  //최근 조회시간

    //초기화	
    this.headerInfo = null;
    this.setHeaderInfo();

    this.errorData = {
      trName: '',
      errCode: '', //메시지코드/오류코드
      errMsg: '' //에러 메시지
    };

    //수신 패킷 정보
    this.packetInfo = {
      packetType: 0,
      packetId: 0,
      menuNo: '',
      groupName: '',
      trName: ''
    };

    //전송 패킷 정보
    this.sendInfo = {
      packetType: 0,
      packetId: 0,
      menuNo: '',
      groupName: '',
      trName: ''
    };

    this.packetId = 0;

    this.timeoutSec = 15; //zero is unlimit

    this.errCodeMap = {};
    this.queryCallbacks = {};
    this.realProcMap = {};

    this.serverStarted = false;
  }

  setConnectCallback(callback) {
    this.connectCallback = callback;
  }

  setClosedCallback(callback) {
    this.closedCallback = callback;
  }

  onSocketConnected() {
    console.log('onSocketConnected');
    this.serverStarted = true;
    this.connectCallback();
  }

  onSocketClosed() {
    console.log('onSocketClosed');
    this.serverStarted = false;
    this.closedCallback();
  };

  onSocketError(e) {
    console.log('onSocketError');  
  }

  startManager(address, port) {
    if (this.netIo){
      this.netIo.startIO(address, port);    
      this.onConnected();
    }
  }

  stopManager() {
    if (this.netIo) this.netIo.stopIO();
    this.serverStarted = false;
    this.onClosed();
  }

  setNetworkIo(netIo) {
    this.netIo = netIo;
  }

  setQueryCallback(key, callback) {
    this.queryCallbacks[key] = callback;
  }

  getQueryCallback(key) {
    var callback = this.queryCallbacks[key];
    if (callback) {
      if (callback.timeout) {
        clearTimeout(callback.timeout);
        callback.timeout = null;
      }

      if (!callback.noDelete) delete this.queryCallbacks[key];
    }

    return callback;
  }

  clearAllQueryCallback() {
    var callback, key;
    for (key in this.queryCallbacks) {
      callback = this.queryCallbacks[key];

      if (callback.timeout) {
        clearTimeout(callback.timeout);
        callback.timeout = null;
      }
    }

    this.queryCallbacks = {};
  }

  clearAllRealCallbacks() {
    this.realCallbacks = {};    //.Feed 콜백함수
    this.realPushCallbacks = {};//.Push 콜백함수
  }

  setQueryBuffer(sendSize, recvSize, charSet, emptyChar, emptyNumChar) {
    this.sndBuf = new ABuffer(sendSize);
    this.sndBuf.setCharset(charSet);

    this.rcvBuf = new ABuffer(recvSize);
    this.rcvBuf.setCharset(charSet);

    if (emptyChar != undefined && emptyChar != null) {
      this.sndBuf.setEmptyChar(emptyChar);
      this.rcvBuf.setEmptyChar(emptyChar);
    }

    if (emptyNumChar != undefined && emptyNumChar != null) {
      this.sndBuf.setEmptyNumChar(emptyNumChar);
      this.rcvBuf.setEmptyNumChar(emptyNumChar);
    }
  }

  //second
  setTimeout(timeoutSec) {
    this.timeoutSec = timeoutSec;
  }

  getLastError(key) {
    if (key) return this.errorData[key];
    else return this.errorData;
  }

  getLastPacketInfo(key) {
    if (key) return this.packetInfo[key];
    else return this.packetInfo;
  }

  printLastError(key) {
    if (key) return afc.log(key + ':' + this.errorData[key]);
    else return afc.log(JSON.stringify(this.errorData, undefined, 2));
  }

  //---------------------------------------------------------
  //	listener functions
  //	function afterRecvBufferData(QueryManager);				* 수신버퍼에 데이터를 수신한 후 바로 호출된다.
  //	function afterOutBlockData(queryData, QueryManager);	* 수신된 데이터를 AQueryData 에 채운 후 호출된다.
  //	function beforeInBlockBuffer(queryData, groupName);		* 전송버퍼에 데이터를 채우기 전에 호출된다.
  //	function beforeSendBufferData(QueryManager);			* 전송버퍼의 데이터를 전송하기 바로 전에 호출된다.

  procRegisterReal(aquery, keyArr, compId, callback) {
    //console.log("procRegisterReal compId[%s] trName[%s] key: ", compId, aquery.getName(), keyArr);

    var trName = aquery.getName();
    var regArr = [];
    for (var i = 0; i < keyArr.length; i++) {
      var key = keyArr[i];
      if (key !== "") {
        var tr = this.realCallbacks[trName];
        if (tr != null) {
          var symbol = tr[key];
          if (symbol != null) {
            this.realCallbacks[trName][key][compId] = callback;
          } else {
            this.realCallbacks[trName][key] = {};
            this.realCallbacks[trName][key][compId] = callback;
            regArr.push(key);
          }
        } else {
          this.realCallbacks[trName] = {};
          this.realCallbacks[trName][key] = {};
          this.realCallbacks[trName][key][compId] = callback;
          regArr.push(key);
        }
      }
    }

    //새롭게 등록할 정보가 있으면 서버로 등록전달
    if (regArr.length > 0) {
      console.log('%cregisterRealFeed', 'color:red', compId, trName, regArr);
      this.sendRealSet(aquery, true, regArr);
    }
  }
  procRegisterRealPush(aquery, compId, callback) {
    
    //console.log("procRegisterRealPush compId[%s] qryName[%s]", compId, aquery.getName());

    var trName = aquery.getName();
    var tr = this.realPushCallbacks[trName];
    if (tr != null) {
      this.realPushCallbacks[trName][compId] = callback;
    } else {
      this.realPushCallbacks[trName] = {};
      this.realPushCallbacks[trName][compId] = callback;
    }
    console.log('%cregisterRealPush', 'color:red', compId, trName);
  }
  registerReal(trName, keyArr, compId, callback) {
    console.log("registerReal compId[%s] qryName[%s] key: ", compId, trName, keyArr);
    if (trName && typeof(trName) == 'string') {
      let aquery = AQuery.getSafeQuery(trName);
      if (aquery) {
        //2019.4.30 LJH, QueryTpye이 .Push인 경우 따로 패킷을 전달하지 않음 (registerRealPush, unregisterRealPush 사용하여 등록/해지)
        if (aquery.getQueryType() == '.Push') {
          this.procRegisterRealPush(aquery, compId, callback);
        } else {
          this.procRegisterReal(aquery, keyArr, compId, callback);
        }
      } else {
        console.error("registerReal no qryName[%s]", trName);
      }
    }
  }

  procUnregisterReal(aquery, keyArr, compId) {
    //console.log("procUnregisterReal compId[%s] qryName[%s] key: ", compId, aquery.getName(), keyArr);

    var trName = aquery.getName();
    var regArr = [];
    for (var i = 0; i < keyArr.length; i++) {
      var key = keyArr[i];
      if (key !== "") {
        var tr = this.realCallbacks[trName];
        if (tr != null) {
          var symbol = tr[key];
          if (symbol != null) {
            if (symbol[compId] != null) {
              symbol[compId] = null;

              //2019.5.2 LJH, trName, key에 대하여 모든 컴포넌트 해지체크
              var subCheck = false;
              for (var j in symbol) {
                if (symbol[j] != null) {
                  subCheck = true;
                  break;
                }
              }
              if (subCheck === false) {
                //trName, key에 대하여 모든 컴포넌트가 해지되었음 / 서버로 해지전달
                this.realCallbacks[trName][key] = null;
                regArr.push(key);
              } else {
                //console.log('not unregisterRealFeed using', compId, trName, key, '');
              }
            } else {
              //console.log("not unregisterRealFeed", trName, key, compId);
            }
          } else {
            //console.log("not unregisterRealFeed", trName, key);
          }
        } else {
          //console.log("not unregisterRealFeed", trName);
        }
      }
    }

    //새롭게 해제할 정보가 있으면
    if (regArr.length > 0) {
      console.log('%cunregisterRealFeed', 'color:blue', compId, trName, regArr);
      this.sendRealSet(aquery, false, regArr);
    }
  }
  procUnregisterRealPush(aquery, compId) {
    
    //console.log("procUnregisterRealPush compId[%s] qryName[%s]", compId, aquery.getName());

    var trName = aquery.getName();
    var tr = this.realPushCallbacks[trName];
    if (tr != null) {
      if (tr[compId] != null) {
        this.realPushCallbacks[trName][compId] = null;
        console.log('%cunregisterRealPush', 'color:blue', compId, trName);
      } else {
        //console.log("not unregisterRealPush", trName, compId);
      }
    } else {
      //console.log("not unregisterRealPush", trName, compId);
    }
  }
  unregisterReal(trName, keyArr, compId) {
    //console.log("unregisterReal compId[%s] qryName[%s] key: ", compId, aquery.getName(), keyArr);
    if (trName && typeof(trName) == 'string') {
      let aquery = AQuery.getSafeQuery(trName);
      if (aquery) {
        //2019.4.30 LJH, QueryTpye이 .Push인 경우 따로 패킷을 전달하지 않음 (registerRealPush, unregisterRealPush 사용하여 등록/해지)
        if (aquery.getQueryType() == '.Push') {
          this.procUnregisterRealPush(aquery, compId);
        } else {
          this.procUnregisterReal(aquery, keyArr, compId);
        }
      } else {
        console.error("unregisterReal no qryName[%s]", trName);
      }
    }
  }

  getHeaderInfo(headerKey) {
    if (headerKey) return this.headerInfo[headerKey];
    else return this.headerInfo;
  }

  setHeaderInfo(headerInfo) {
    if (headerInfo) {
      for (var p in headerInfo) {
        if (!headerInfo.hasOwnProperty(p)) continue;
        this.headerInfo[p] = headerInfo[p];
      }
    }
    //파라미터가 null 인 경우 초기화
    else {
      this.headerInfo = {
        PBLC_IP_ADDR: '', // 공인 IP		//10.110.51.182
        PRVT_IP_ADDR: '', // 사설 IP		//10.110.51.182
        MAC_ADR: '', // Mac 주소		//6C626D3A60C9
        TMNL_OS_TCD: 'PC', // 단말 OS 구분 코드 MS Win:"PC" MAC:"MC" AND:"AP" IPHONE:"IP" IPAD:"ID" AND PAD:"AD" 기타:"ZZ"
        TMNL_OS_VER: '', // 단말 OS 버전
        TMNL_BROW_TCD: '', // 단말 브라우저 구분 코드 익스플로러:"IE" 사파리:"SF" 파이어폭스:"FX" 크롬:"CR" 오페라:"OP" WEBKIT:"WK" 기타:"ZZ"
        TMNL_BROW_VER: '' // 단말 브라우저 버전
      }
    }
  }

  onConnected(success) {
    console.log('onConnected');
  }

  onClosed() {
    console.log('onClosed');
    this.clearAllQueryCallback();  
  }

  //상속 받아 다음과 같은 패턴으로 구현한다.
  onReceived(data, size) {
    //----------------------------------------------------
    //	1. this.rcvBuf 를 생성한다. 생성방법은 상황에 따라 다름.
    //	this.rcvBuf.setBuffer(data);
    //	this.rcvBuf.setDataSize(size);

    //	2. 패킷 타입과 패킷 아이디를 셋팅한다.
    //	this.packetInfo.packetType = this.rcvBuf.getByte(OS_COMM_CMD);
    //	this.packetInfo.packetId = this.rcvBuf.getByte(OS_COMM_ID);

    //	3. 패킷 타입에 따라 처리 함수를 분기한다.
    //	switch(this.packetInfo.packetType)
    //	{
    //		case 1: this.queryProcess();
    //	}

    //----------------------------------------------------
  }

  //헤더 이후의 데이터 셋팅 오프셋을 리턴한다.
  getInDataOffset() {
    return 0;
  }

  getOutDataOffset() {
    return 0;
  }

  //사용할 AQueryData 객체를 생성하여 리턴한다.
  makeQueryData(aquery, isSend) {
    return new AQueryData(aquery);
  }

  //리얼 등록/해제 패킷 전송 함수... 재정의 하기, unregisterReal 함수 내에서 호출함
  sendRealSet(aquery, isSet, regArr) {

  }

  //2019.4.30 LJH, RealPush 등록/해지 패킷 생성
  sendRealPushSet(isSet, key) {
    
  }

  //onReceive 함수 내에서 패킷 타입에 따라 분기하여 호출되는 함수
  realProcess() {
    //----------------------------------------------------

    //	1. 쿼리 네임을 얻어 queryData 를 생성한다.
    //	var qryName = this.rcvBuf.nextOriString(4),
    //		aquery = AQuery.getSafeQuery(qryName),
    //		queryData = this.makeQueryData(aquery);

    //	2. queryData 객체에 값을 채우고 dataKey 값을 구한 후
    //	queryData.outBlockData(this.rcvBuf, offset);

    //	3. realDataToComp 함수를 호출한다.

    //----------------------------------------------------

  }

  makeHeader(queryData, abuf, menuNo) {

  }

  // 데이터 수신시 에러정보를 세팅하는 함수
  setErrorData(cbObj) {
    //----------------------------------------------------

    //	* rcvBuf에서 에러데이터에 해당하는 정보를 뽑아 저장한다.
    //	this.errorData.errCode = this.rcvBuf.getString(OS_ERR_CODE, SZ_ERR_CODE);
    //	this.errorData.errMsg = this.rcvBuf.getString(OS_ERR_MSG, SZ_ERR_MSG);
    //		...
    //		etc
    //----------------------------------------------------
  }

  //asoocool dblTostr
  enableDTS() {
    this.dblTostr = true;
  }

  // 전문 수신 후 프로세스
  queryProcess() {
    var dataSize = this.rcvBuf.getDataSize();
    var cbObj = this.getQueryCallback(this.packetInfo.packetId);

    // 타임아웃 발생시 콜백객체를 제거하므로 체크
    if (!cbObj) return;

    //패킷 정보 셋팅
    this.packetInfo.menuNo = cbObj.menuNo;
    this.packetInfo.groupName = cbObj.groupName;
    this.packetInfo.trName = cbObj.trName;

    //에러 메시지 셋팅
    this.errorData.trName = cbObj.trName;
    this.errorData.errCode = '';
    this.errorData.errMsg = '';
    this.setErrorData();

    //수신된 전문 로그 남기는 함수, 개발시에만 호출
    this.recv_log_helper();

    var queryData = null;
    var aquery = AQuery.getSafeQuery(cbObj.trName);

    if (!aquery) {
      alert('onReceive : ' + cbObj.trName + ' query is not found.');
      return;
    }

    var dataOffset = this.getOutDataOffset(aquery);

    //tr, size LJH 2019.2.8
    // if(dataSize-dataOffset-1 > 20000) {
    //   console.log("queryProcess qryName[%s] length[%d]", cbObj.trName, dataSize-dataOffset-1);
    // }

    //body data 가 있는 경우만
    if (dataSize > dataOffset) {
      queryData = this.makeQueryData(aquery);

      //asoocool dblTostr
      queryData.dblTostr = cbObj.dblTostr;

      //queryData 객체에 전문데이터를 세팅
      queryData.outBlockData(this.rcvBuf, dataOffset);
    }

    //타임 아웃 이후에 패킷이 도착하거나 
    //계정계 지연 패킷이 올수 있으므로 콜백 객체가 없어도 계속 진행한다.
    //계정계 지연 패킷은 listener 의 afterOutBlockData 함수에서만 구현 가능한다.
    if (cbObj && cbObj.func) cbObj.func.call(this, queryData);

    if (queryData) {
      //afterOutBlockData 함수에서 enableLazyUpdate 함수를 호출하면 화면 업데이트를 비동기 함수 호출후에 할 수 있다.
      //차후 비동기 함수 콜백에서 queryData.lazyUpdate(); 함수를 호출해 준다.

      // console.log('======================================================================')
      // console.log(queryData.aquery.query.name, queryData.queryObj)
      // console.log('======================================================================')

      if (queryData.isLazyUpdate) queryData.lazyUpdate = _updateFunc;
      else _updateFunc();
    } else {
      // console.log('======================================================================')
      // console.log(queryData.aquery.query.name, 'queryData NULL')
      // console.log('======================================================================')
    }

    //-----

    function _updateFunc() {
      var compArray = aquery.getQueryComps(cbObj.menuNo, 'output');

      if (compArray) {
        var qryComp;
        for (var i = 0; i < compArray.length; i++) {
          qryComp = compArray[i];

          //비활성화된 탭은 적용되지 않도록
          //var tab = qryComp.getRootView().tab;
          //if(tab && $(tab.content).is(':hidden')) continue;

          var item = qryComp.getRootView().item;
          if (item && $(item).is(':hidden')) continue;


          //groupName 을 지정해 줬으면 같은 그룹네임인지 비교
          if (cbObj.groupName != '' && cbObj.groupName != qryComp.getGroupName()) continue;

          qryComp.updateComponent(queryData);
        }
      }
    }
  }

  //siseProcess 함수에서 호출한다 / 콜백함수 호출
  realDataToComp(key, queryData) {
    queryData.isReal = true;
    var trCallback = this.realCallbacks[queryData.aquery.getName()];
    if (trCallback != null){
      var keyCallback = trCallback[key];
      for (var compId in keyCallback) {
        var compCallback = keyCallback[compId];
        if (compCallback != null) {
          compCallback.call(this, queryData);
        }
      }
    }
  }

  //pushProcess 함수에서 호출한다 / 콜백함수 호출
  realPushDataToComp(queryData) {
    queryData.isReal = true;
    var trCallback = this.realPushCallbacks[queryData.aquery.getName()];
    if (trCallback != null){
      for (var compId in trCallback) {
        var compCallback = trCallback[compId];
        if (compCallback != null) {
          compCallback.call(this, queryData);
        }
      }
    }
  }

  sendProcessByName(queryName, beforeInBlockBuffer, afterOutBlockData) {
    // console.log('======================================================================')
    console.log('sendProcessByName', queryName)
    // console.log('======================================================================')
    // 현재 시간을 저장한다 (거래소화면 세션체크시 사용됨)
    this.lastQueryTime = Date.now();
    let aquery = AQuery.getSafeQuery(queryName);
    if (aquery) {
      return [this.sendProcess(aquery, '', '', beforeInBlockBuffer, afterOutBlockData)];      
    } else {
      console.error("sendProcessByName no qryName[%s]", queryName);
      return [];
    }
  }

  //2019.05.23 LJH, 최근 쿼리 조회시간 가져오기
  getLastQueryTime() {
    return this.lastQueryTime;
  }

  sendProcess(aquery, menuNo, groupName, beforeInBlockBuffer, afterOutBlockData) {
    var trName = aquery.getName();

    this.errorData.trName = trName;

    this.sendInfo.trName = trName;
    this.sendInfo.menuNo = menuNo;
    this.sendInfo.groupName = groupName;

    var queryData = this.makeQueryData(aquery, true);
    queryData.inBlockPrepare();

    //전송버퍼에 데이터를 채우기 전에 호출된다.
    //######## beforeInBlockBuffer

    if (beforeInBlockBuffer) beforeInBlockBuffer.call(this, queryData);

    var packetId = 0;
    var dataOffset = this.getInDataOffset(aquery);

    queryData.inBlockBuffer(this.sndBuf, dataOffset);

    this.sndBuf.setDataSize(this.sndBuf.getOffset());

    packetId = this.makeHeader(queryData, this.sndBuf, menuNo);

    this.sendInfo.packetId = packetId;

    //asoocool dblTostr
    var cbObj = {
      'menuNo': menuNo,
      'groupName': groupName,
      'func': afterOutBlockData,
      'timeout': null,
      'trName': trName,
      'dblTostr': this.dblTostr
    }

    //asoocool dblTostr
    //cbObj 에 셋팅하고 바로 지운다.
    this.dblTostr = undefined;

    this.setQueryCallback(packetId, cbObj);

    //------------------------------------------------------------
    //	네트웍 타임아웃 셋팅
    if (this.timeoutSec != null && this.timeoutSec > 0) {
      var thisObj = this;

      cbObj.timeout = setTimeout(function () {
        thisObj.errorData.trName = trName;
        thisObj.errorData.errCode = 10001;
        //thisObj.errorData.errMsg = '서버와의 접속이 지연되고 있습니다.';
        thisObj.errorData.errMsg = '통신 상태가 원활하지 않습니다.(1) : ' + thisObj.errorData.trName + ',' + menuNo + ',' + groupName;
        console.log('통신 상태가 원활하지 않습니다 : ' + thisObj.errorData.trName + ',' + menuNo + ',' + groupName);

        //콜백 객체 제거
        thisObj.getQueryCallback(packetId);

        //타임아웃
        if (afterOutBlockData) afterOutBlockData.call(thisObj, null);
        //if(listener && listener.afterOutBlockData) listener.afterOutBlockData(null, groupName, thisObj.errorData.trName, thisObj);
      }, this.timeoutSec * 1000);
    }

    this.sendBufferData(this.sndBuf);

    return packetId;
  }

  sendBufferData(abuf) {

    //2019-02-07 LJH sendData 출력
    // if (abuf.dataSize === 17) {
    //   var result = '';
    //   for(var i = 0; i < abuf.dataSize; i++) {
    //     result += String.fromCharCode(abuf.buf[i]);
    //   }
    //   console.log("[real] sendSize[%d] sendData: %s", abuf.dataSize, result);
    // }

    if (!this.netIo.isStart()) {
      if (this.serverStarted) {
        this.stopManager();
      }
      return;
    }

    //---------------------------------------------------------
    // 송신할 전문 로그 남기는 함수
    this.send_log_helper();
    //---------------------------------------------------------

    var sendLen = abuf.getDataSize();
    this.netIo.sendData(abuf.subArray(0, sendLen), function (result) {
      if (!result) {
        alert('통신 상태가 원활하지 않습니다.');
      }
    });
  }

  makePacketId() {
    return ++this.packetId;
  }

  // 송신할 전문 로그 남기는 함수
  send_log_helper() {
  }

  // 수신된 전문 로그 남기는 함수
  recv_log_helper() {
  }

    //2019.4.30 LJH, RealPush 등록/해지 정의
  registerRealPush(key) {
    this.sendRealPushSet(true, key);
  }
  unregisterRealPush(key) {
    this.sendRealPushSet(false, key);
  }
}
