import QueryManager from './QueryManager'
import KVQueryData from './KVQueryData'
import AQuery from './AQuery'

export default class extends QueryManager {
	constructor() {
		super();
		
		this.packetInfo.dheadType = '';
		this.sendInfo.dheadType = '';
		this.pcIp = '';
		this.trSeq = 0;
		this.mediaType = 0;	

		this.pollingReqCnt = 0;
		this.unitcode = ''
		this.user_id = '';
		
		this.noFirst = false;
	}

	onConnected(success) {
    //console.log("KVQueryManager onConnected");
		if(success && !this.noFirst){
			this.noFirst = true;
			this.sendXtSetKey(function(){ });
		}

		if (afc.isDevice) {
			this.mediaType = 30; // MTS
		} else if (afc.isMobile) {
			this.mediaType = 21; // M_W
		} else {
			this.mediaType = 20; // PC_W
		}
	}

	onClosed() {
	}

	enableRetry(retryCount) {
		if(this.netIo) this.netIo.enableRetry(retryCount);
	}

	onReceived(data, size) {
		this.rcvBuf.setBuffer(data);
		this.rcvBuf.setDataSize(size);	

		this.packetInfo.dheadType = '';
		this.packetInfo.packetType = this.rcvBuf.getByte(OS_COMM_CMD);
		this.packetInfo.packetId = this.rcvBuf.getByte(OS_COMM_ID);
		
		switch(this.packetInfo.packetType)
		{
			case PACKET_TYPE.D:
				this.siseProcess();
			  break;
			
			case PACKET_TYPE.I:
				this.pushProcess();
			  break;
		
			case PACKET_TYPE.E:
				this.queryProcess();
			  break;
			
			//transaction 패킷 종료
			case PACKET_TYPE.F:
			  break;

			//transaction 패킷 메시지
			case PACKET_TYPE.P:
			{
				var errCode = this.rcvBuf.getOriString(OS_MSG_CODE, SZ_MSG_CODE);
				var errMsg = this.rcvBuf.getStringTo(OS_MSG_MESSAGE, 0x03);
				this.errorProcess(this.packetInfo.packetId, errCode, errMsg);
				break;
			}

			//transaction 패킷 에러
			//차후 outblockdata 에 호출되도록
			case PACKET_TYPE.Q:
			{
				var errCode = this.rcvBuf.getOriString(OS_MSG_CODE, SZ_MSG_CODE);
				var errMsg = this.rcvBuf.getStringTo(OS_MSG_MESSAGE, 0x03);
				this.errorProcess(this.packetInfo.packetId, errCode, errMsg);
				break;
			}

			// 로그인 세션등록 패킷
			case PACKET_TYPE.O:
			{
				// 서버에서 아무런 응답을 보내주지 않는게 맞음
				break;
			}

			// 구간암호화 키 패킷
			case PACKET_TYPE.X:
			{
				this.netIo.setUserSeed(this.rcvBuf.getOriString(OS_TR_FLAG, 17, true));	//User Seed 세팅
				//this.pcIp = this.rcvBuf.nextOriString(15);							//PC IP, 차후 업무계 티알 헤더 ip 영역에 셋팅해주기
				//값만 꺼내온다. 차후 packet_type.y  에서 다시 받음.
				this.rcvBuf.nextOriString(15);							//PC IP, 차후 업무계 티알 헤더 ip 영역에 셋팅해주기
				this.serverIp = this.rcvBuf.nextOriString(15);						//접속서버 IP
				
				var cb = this.getQueryCallback(this.packetInfo.packetId);
				if(cb) cb.call(this);
				break;
			}

			// m/w 로 부터 자신의 공개 IP 를 받는 패킷
			case PACKET_TYPE.Y:
			{
				var pubIp = this.rcvBuf.getOriString(OS_TR_FLAG, 20);
				
				pubIp = pubIp.split('.');
				for(var i=0; i<pubIp.length; i++)
				{
					if(pubIp[i].length == 2) pubIp[i] = '0' + pubIp[i];
					else if(pubIp[i].length == 1) pubIp[i] = '00' + pubIp[i];
				}
				this.pcIp = pubIp.join('.');
				console.log('public ip : ' + this.pcIp);
				break;
			}

			case PACKET_TYPE.z:
				console.log("recv polling packet!!!");
				this.pollingReqCnt = 0;
			  break;
		}
	}

	errorProcess(packetId, errCode, errMsg) {
		if(errCode == '00000') return;

    	var cbObj = this.getQueryCallback(packetId);
		// 타임아웃 발생시 콜백객체를 제거하므로 체크
		if(!cbObj) return;

		//에러 메시지 셋팅
		this.errorData.trName = cbObj.trName;
		this.errorData.errCode = errCode;
		this.errorData.errMsg = errMsg;

		/**
		 * AS-IS 스파이더젠 에서는 메인컨테이너로 메세지박스 전송
		 * TO-BE 뷰 에서는 세션스토리지에 임시 저장(브라우저 닫으면 삭제됨)
		 */
    	console.error("errorProcess", this.errorData);
		window.sessionStorage.setItem('lastErrorData', JSON.stringify(this.errorData));
		
		//console.log('-----------------------------------------------------');
		//afc.log(this.errorData);
		
	 	 //--------------------------------
		if (!cbObj.func || !cbObj.func.notUseMessageBox) {
			//타임 아웃 이후에 패킷이 도착하거나 
			//계정계 지연 패킷이 올수 있으므로 콜백 객체가 없어도 계속 진행한다.
			//계정계 지연 패킷은 listener 의 afterOutBlockData 함수에서만 구현 가능한다.
			if (cbObj.func) cbObj.func.call(this, null);
		}
	}

	siseProcess() {
		var abuf = this.rcvBuf, dtSize, qryName, aquery, queryData, block, realField, endFlag;
		
		abuf.setOffset(OS_TR_FLAG);

		/*
		var result = '';
		for(var i = 0; i < abuf.dataSize; i++) {
			result += String.fromCharCode(abuf.buf[i]);
		}
		console.log("siseProcess dataSize[%d] data: %s", abuf.dataSize, result);
		*/
		
		while(true)
		{
			//dtSize = abuf.nextByte()*256 + abuf.nextByte();
			//dtSize는 사용하지 않으므로
			//abuf.nextByte();
			//abuf.nextByte();
			
			//trSize(2byte) LJH 2019.2.7
			dtSize = abuf.nextShort();
			
			qryName = abuf.nextOriString(4);

			//tr, size LJH 2019.2.7
			// /console.log("siseProcess qryName[%s] length[%d]", qryName, dtSize);

			aquery = AQuery.getSafeQuery(qryName);
			
			if (!aquery)
			{
				console.error('siseProcess, no query : ' + qryName);
				return;
			}
			
			queryData = this.makeQueryData(aquery);
			
			block = aquery.getQueryBlock('input', 'InBlock1');
			realField = block.format[0][AQuery.IKEY];
			
			//offset 을 넘기지 않으면 ABuffer의 현재 offset 을 사용한다.
			//offset 차이를 구하여 dtsize와 비교1 LJH 2019.2.7
			var startOffset = abuf.offset;
			queryData.outBlockData(abuf);
			var endOffset = abuf.offset;
			
			var blockData = queryData.getBlockData('OutBlock1')[0];
			
			this.realDataToComp(blockData[realField], queryData);

			//offset 차이를 구하여 dtsize와 비교2 LJH 2019.2.7
			if (dtSize-4 !== endOffset-startOffset) {
				console.error("siseProcess qryName[%s] size[%d] length[%d]", qryName, dtSize, endOffset-startOffset);
			}

			//여기까지가 한 묶음.
			//-----------------------

			//LJH 2019.2.1 readbuf size와 offset으로 패킷의 마지막 확인
			if (abuf.dataSize - 1 <= abuf.offset) {
				break;
			}
			
			// endFlag = abuf.nextByte();
			
			// //PACKET_ETX 이면 종료 
			// if(endFlag==PACKET_ETX) break;
			// //아니면 데이터가 더 있는 것이므로 다시 1byte 뒤로 
			// else abuf.addOffset(-1);
		}
	}

	pushProcess() {
		var abuf = this.rcvBuf, dtSize, qryName, aquery, queryData, block;
		
		abuf.setOffset(OS_TR_FLAG);
		
		while(true)
		{
			//dtSize = abuf.nextByte()*256 + abuf.nextByte();
			//dtSize는 사용하지 않으므로
			//abuf.nextByte();
			//abuf.nextByte();
			
			//trSize(2byte) LJH 2019.2.7
			dtSize = abuf.nextShort();

			qryName = abuf.nextOriString(4);
			
			//tr, size LJH 2019.2.7
			//console.log("pushProcess qryName[%s] length[%d]", qryName, dtSize);
			
			aquery = AQuery.getSafeQuery(qryName);
			
			if (!aquery)
			{
				console.error('pushProcess, no query : ' + qryName);
				return;
			}
			
			queryData = this.makeQueryData(aquery);
			
			//push 전문인 경우, res 내부에 qryName 이 포함되어져 있어서
			//미리 얻어서 셋팅하고 쿼리 데이터를 만들고 offset 을 다시 뒤로 돌려준다.
			abuf.addOffset(-4);

			//offset 을 넘기지 않으면 ABuffer의 현재 offset 을 사용한다.
			//offset 차이를 구하여 dtsize와 비교1 LJH 2019.2.7
			var startOffset = abuf.offset;
			queryData.outBlockData(abuf);
			var endOffset = abuf.offset;
			
			//콜백함수 처리
			this.realPushDataToComp(queryData);

			//offset 차이를 구하여 dtsize와 비교2 LJH 2019.2.7
			if (dtSize !== endOffset-startOffset) {
				console.error("pushProcess qryName[%s] size[%d] length[%d]", qryName, dtSize, endOffset-startOffset);
			}

			//여기까지가 한 묶음.
			//-----------------------

			//LJH 2019.2.1 readbuf size와 offset으로 패킷의 마지막 확인
			if (abuf.dataSize - 1 <= abuf.offset) {
				break;
			}
			
			// endFlag = abuf.nextByte();
			
			// //오류인지 LF 문자가 포함되어져 있음.
			// //2019.2.1 LJH - size 필드접근, 추후에 문제가 될 가능성이 있음 / data Size : 2560(10*256) ~ 2815(11*256)
			// if(endFlag==0x0A) endFlag = abuf.nextByte();
			
			// //PACKET_ETX 이면 종료 
			// //if(endFlag==PACKET_ETX) break;
			// //LJH 2019.2.1 readbuf size와 offset으로 패킷의 마지막 확인 / 개행문자로 인해 1byte를 더 읽기때문에 siseProcess 차이점
			// if (abuf.dataSize <= abuf.offset) {
			// 	break;
			// }
			// //아니면 데이터가 더 있는 것이므로 다시 1byte 뒤로 
			// abuf.addOffset(-1);
		}
	}

	//헤더 이후의 데이터 셋팅 오프셋을 리턴한다. makeHeader 보다 먼저 호출된다
	getInDataOffset(aquery) {
		var dataOffset = OS_TR_DHEAD;
		
		//dhead 타입을 얻어온다. A: 업무계, B: 정보계
		var dheadType = aquery.getValue('headtype');
		
		if(!dheadType) dheadType = '';
		
		this.sendInfo.dheadType = dheadType;
		
		if (dheadType) {
			dheadType = dheadType.charCodeAt(0);
		
			if (dheadType==DHEAD_TYPE.B) dataOffset += SZ_INF_DHEAD;
			
			//DHEAD_TYPE.A
			else dataOffset += SZ_ACC_DHEAD;
		}
		
		return dataOffset;
	}

	getOutDataOffset(aquery) {
		var dataOffset = OS_TR_DHEAD;
		
		//dhead 타입을 얻어온다. A: 업무계, B: 정보계
		var dheadType = aquery.getValue('headtype');
		
		if(!dheadType) dheadType = '';
		
		this.packetInfo.dheadType = dheadType;
		
		if (dheadType) {
			dheadType = dheadType.charCodeAt(0);
		
			if(dheadType==DHEAD_TYPE.B) dataOffset += SZ_INF_DHEAD;
			
			//DHEAD_TYPE.A
			else dataOffset += SZ_ACC_DHEAD;
		}
		
		return dataOffset;
	}

	makePacketId() {
		if(++this.packetId > 255) this.packetId = 1;
		return this.packetId;
	}

	makeTrSeq() {
		if(++this.trSeq > 99999) this.trSeq = 1;
		return this.trSeq;
	}

	//사용할 AQueryData 객체를 생성하여 리턴한다.
	makeQueryData(aquery, isSend) {
		var queryData = new KVQueryData(aquery);
		
		if (isSend) {
			var dheadType = aquery.getValue('headtype');
			if (dheadType) {
				dheadType = dheadType.charCodeAt(0);
				if (dheadType == DHEAD_TYPE.A) queryData.enableEnc(true);
			}
			return queryData;
		}
		
		//data head 타입이 존재하면 
		if (this.packetInfo.dheadType) {
			var dheadType = this.packetInfo.dheadType.charCodeAt(0);			
			
			if (dheadType==DHEAD_TYPE.B) {	//정보계 데이터 헤드
				//연속 조회키 셋팅
				var flag = this.rcvBuf.getOriString(OS_BDH_CONTI_FLAG, SZ_BDH_CONTI_FLAG);
				if (flag=='1') queryData.setContiKey(this.rcvBuf.getOriString(OS_BDH_PAGING_KEY, SZ_BDH_PAGING_KEY));
			} else if (dheadType==DHEAD_TYPE.A) {  //계정계 데이터 헤드
				var flag = this.rcvBuf.getOriString(OS_ADH_CONTI_FLAG, SZ_ADH_CONTI_FLAG);
				if(flag=='1') queryData.setContiKey(this.rcvBuf.getOriString(OS_ADH_PAGING_KEY, SZ_ADH_PAGING_KEY));
			}
		}
		
		return queryData;
	}

	//리얼 등록/해제 패킷 전송 함수... 재정의 하기, unregisterReal 함수 내에서 호출함
	sendRealSet(aquery, isSet, regArr) {
		var abuf = this.sndBuf, regData = '', type, sendLen = 0, i;
		var qryType = aquery.getQueryType();
			
		for (i=0; i<regArr.length; i++)
			regData += regArr[i];
			
		this.sendInfo.trName = aquery.getName();
		this.sendInfo.dheadType = qryType;
		this.sendInfo.packetId = isSet; 
			
		if (qryType=='.Feed') regData = this.sendInfo.trName + '|' + regData + ';';
		
		sendLen = OS_TR_FLAG + regData.length + 1;	//1 is 0x03 (end flag)

		//정보계
		if(qryType=='.Feed') type = isSet ? PACKET_TYPE.A : PACKET_TYPE.B;
		else type = isSet ? PACKET_TYPE.G : PACKET_TYPE.H;

		//--------------------------------------------------
		//	XT_SOCK_PACKET
		//--------------------------------------------------
		abuf.setByte(OS_SOCK_STX, PACKET_STX);					//패킷 시작 플래그
		abuf.setByte(OS_SOCK_HI, (sendLen-SZ_SIZE_HEADER)/256 );			//패킷 길이 hi
		abuf.setByte(OS_SOCK_LO, (sendLen-SZ_SIZE_HEADER)%256);			//패킷 길이 lo
		
		//--------------------------------------------------
		//	XT_COMM_HEAD
		//--------------------------------------------------
		abuf.setByte(OS_COMM_FLAG, PACKET_FLAG.LAST);	//종료 패킷 셋팅
		abuf.setByte(OS_COMM_ID, 0);					//트랜잭션 아이디 0~255
		abuf.setByte(OS_COMM_CMD, type);				//패킷의 종류, Transaction 호출 IO 패킷
			
		//regData == 'ECH1|KR004LTC__USD__;'

		abuf.setOriString(OS_TR_FLAG, regData.length, regData);
		abuf.addByte(0x03);//종료 플래그
		
		abuf.setDataSize(sendLen);
		this.sendBufferData(abuf);
	}

	//2019.4.30 LJH, RealPush 등록/해지 패킷 생성
	sendRealPushSet(isSet, key) {
		var abuf = this.sndBuf;
		var sendLen = OS_TR_FLAG + key.length + 1;	            //1 is 0x03 (end flag)
		var type = isSet ? PACKET_TYPE.G : PACKET_TYPE.H;

		//--------------------------------------------------
		//	XT_SOCK_PACKET
		//--------------------------------------------------
		abuf.setByte(OS_SOCK_STX, PACKET_STX);					        //패킷 시작 플래그
		abuf.setByte(OS_SOCK_HI, (sendLen-SZ_SIZE_HEADER)/256);	//패킷 길이 hi
		abuf.setByte(OS_SOCK_LO, (sendLen-SZ_SIZE_HEADER)%256);	//패킷 길이 lo
		
		//--------------------------------------------------
		//	XT_COMM_HEAD
		//--------------------------------------------------
		abuf.setByte(OS_COMM_FLAG, PACKET_FLAG.LAST);           //종료 패킷 셋팅
		abuf.setByte(OS_COMM_ID, 0);					                  //트랜잭션 아이디 0~255
		abuf.setByte(OS_COMM_CMD, type);				                //패킷의 종류, Transaction 호출 IO 패킷
			
		abuf.setOriString(OS_TR_FLAG, key.length, key);
		abuf.addByte(0x03);                                     //종료 플래그
		
		abuf.setDataSize(sendLen);
		this.sendBufferData(abuf);
	}

	// 로그인 세션 등록
	sendXtLoginData(userId, sessionId) {
		var abuf = this.sndBuf;
		
		//접속IP와 filler 는 SPACE로 채움.
		abuf.setOriString(OS_TR_FLAG, 10, userId);			//사용자 아이디
		abuf.addOriString(50, sessionId);					//세션 Key
		abuf.addOriString(15, this.serverIp);				//접속 IP
		abuf.addOriString(15, this.pcIp);					//PC IP
		abuf.addOriString(2, this.mediaType);					//매체 구분
		abuf.addOriString(2, '');							//filler
		// abuf.addOriString(32, this.headerInfo['UUID']);		//mac address
    	abuf.addOriString(32, '');		//mac address
   		abuf.addOriString(5, window.loginObj['unit_code']?window.loginObj['unit_code']:this.unitcode);	//unit code
		abuf.addOriString(4, '');							//filler
		abuf.addByte(PACKET_ETX);//종료 플래그

		this.sendCmdTypeData(abuf, PACKET_TYPE.O);
	}

	// 암호화된 계정아이디 등록
	sendXtEncryptUser(userId) {
		var abuf = this.sndBuf;
		
		//접속IP와 filler 는 SPACE로 채움.
		abuf.setOriString(OS_TR_FLAG, 10, userId);			//사용자 아이디
		abuf.addByte(PACKET_ETX);//종료 플래그

		this.sendCmdTypeData(abuf, PACKET_TYPE.k);
	}

	// 구간암호화 키 앱기동시 최초에만 전송하여 수신받은 수신받은 정보를 저장, 처리해야함
	sendXtSetKey(callback) {
		var abuf = this.sndBuf;
		
	  // abuf.setOriString(OS_TR_FLAG, 17, '');	//비밀키
	  // abuf.addOriString(15, '');							//PC IP, 차후 업무계 티알 헤더 ip 영역에 셋팅해주기
	  // abuf.addOriString(15, '');							//접속서버 IP

		abuf.setOffset(OS_TR_FLAG);
		abuf.addByte(PACKET_ETX);//종료 플래그
		
		this.sendCmdTypeData(abuf, PACKET_TYPE.X, callback);
	}

	sendCmdTypeData(abuf, cmd, callback) {
		var packetId = this.makePacketId();
		var sendLen = abuf.getOffset();
		
		this.sendInfo.trName = '';
		this.sendInfo.dheadType = '';

		//--------------------------------------------------
		//	XT_SOCK_PACKET
		//--------------------------------------------------
		abuf.setByte(OS_SOCK_STX, PACKET_STX);						//패킷 시작 플래그
		abuf.setByte(OS_SOCK_HI, (sendLen-SZ_SIZE_HEADER)/256 );	//패킷 길이 hi
		abuf.setByte(OS_SOCK_LO, (sendLen-SZ_SIZE_HEADER)%256);		//패킷 길이 lo
		
		//--------------------------------------------------
		//	XT_COMM_HEAD
		//--------------------------------------------------
		abuf.setByte(OS_COMM_FLAG, PACKET_FLAG.LAST);	//종료 패킷 셋팅
		abuf.setByte(OS_COMM_ID, packetId);				//트랜잭션 아이디 0~255
		abuf.setByte(OS_COMM_CMD, cmd);					//패킷의 종류, XT_LOGIN_DATA = 'O'
		
		if(callback) this.setQueryCallback(packetId, callback);
		
		abuf.setDataSize(sendLen);
		this.sendBufferData(abuf);
	}

	// pollingProcess
	pollingProcess(callback) {
		var abuf = this.sndBuf;

		abuf.addByte(PACKET_ETX);//종료 플래그
		
		this.sendCmdTypeData(abuf, PACKET_TYPE.z);
	}

	makeHeader(queryData, abuf) {
		var packetId = this.makePacketId(), sendLen = abuf.getDataSize();
		var aquery = queryData.getQuery();
		
		//--------------------------------------------------
		//	XT_SOCK_PACKET
		//--------------------------------------------------
		abuf.setByte(OS_SOCK_STX, PACKET_STX);					//패킷 시작 플래그
		abuf.setByte(OS_SOCK_HI, (sendLen-SZ_SIZE_HEADER)/256);	//패킷 길이 hi
		abuf.setByte(OS_SOCK_LO, (sendLen-SZ_SIZE_HEADER)%256);	//패킷 길이 lo
		
		//--------------------------------------------------
		//	XT_COMM_HEAD
		//--------------------------------------------------
		
		//abuf.setByte(OS_COMM_FLAG, PACKET_FLAG.LAST | PACKET_FLAG.ENCRYPT);		//종료 패킷 셋팅
		abuf.setByte(OS_COMM_FLAG, PACKET_FLAG.LAST | queryData.encFlag);		//종료 패킷 셋팅
		abuf.setByte(OS_COMM_ID, packetId);					//트랜잭션 아이디 0~255
		abuf.setByte(OS_COMM_CMD, PACKET_TYPE.E);			//패킷의 종류, Transaction 호출 IO 패킷
		
		//--------------------------------------------------
		//	XT_TR_HEAD
		//--------------------------------------------------
		abuf.setByte(OS_TR_FLAG, 0x04);										//OCCURS 블록, XT_BLOCK_MODE
		abuf.setOriString(OS_TR_TRCODE, SZ_TR_TRCODE, aquery.getName());	//TR 코드
		abuf.setChar(OS_TR_MEDIA, 'H');										//매체 구분
		
		
		//dhead 타입을 얻어온다. A: 업무계, B: 정보계
		//var dheadType = aquery.getValue('headtype');
		
		//data head 타입이 존재하면 
		if (this.sendInfo.dheadType) 
		{
			var dheadSize = 0;

			//전송시 data head type 저장
			//this.sendInfo.dheadType = dheadType;
			
			var dheadType = this.sendInfo.dheadType.charCodeAt(0);
			abuf.setByte(OS_TR_DHEAD_TYPE, dheadType);	//B, A
			
			if(dheadType==DHEAD_TYPE.B) dheadSize = SZ_INF_DHEAD;
			else if(dheadType==DHEAD_TYPE.A) dheadSize = SZ_ACC_DHEAD;
			
			abuf.setByte(OS_TR_DHEAD_HI, dheadSize/256);
			abuf.setByte(OS_TR_DHEAD_LO, dheadSize%256);
			//abuf.addOffset(SZ_TR_FILLER);

			abuf.setNumString(OS_TR_SEQCHK, SZ_TR_SEQCHK, this.makeTrSeq() );
			
			//정보계 데이터 헤드
			if (dheadType==DHEAD_TYPE.B) {
				var contiKey = queryData.getContiKey();
				if (contiKey) {
					abuf.setChar(OS_BDH_CONTI_FLAG, '1');								// 연속 FLAG 
					abuf.setOriString(OS_BDH_PAGING_KEY, SZ_BDH_PAGING_KEY, contiKey);	// 연속 조회키
				} else {
          			abuf.setChar(OS_BDH_CONTI_FLAG, '0');
     		    }
				
				//사용안함
				//abuf.setOriString(OS_BDH_SCREEN_NO, SZ_BDH_SCREEN_NO, option.menuNo);
				
				//filler의 앞 5자리 공유거래소 UNIT Code 사용 (5자리)
				abuf.setOriString(OS_BDH_UNIT_CODE, SZ_BDH_UNIT_CODE, 
				window.loginObj['unit_code']? window.loginObj['unit_code'] : this.unitcode);
				console.log("DHEAD_TYPE_B_unit_code:" + 
				window.loginObj['unit_code']? JSON.stringify(window.loginObj['unit_code']) : this.unitcode)		
			}
			
			//계정계 데이터 헤드
			else if(dheadType==DHEAD_TYPE.A) 
			{
				if (window.loginObj['token'] !== null) {
					 abuf.setOriString(OS_ADH_ACCOUNT_ID, SZ_ADH_ACCOUNT_ID, window.loginObj['user_id']);		// 로그인 사용자 계정
					//abuf.setOriString(OS_ADH_ACCOUNT_ID, SZ_ADH_ACCOUNT_ID, 's8c*xCDlNj');		// 로그인 사용자 계정
				} else {
					abuf.setOriString(OS_ADH_ACCOUNT_ID, SZ_ADH_ACCOUNT_ID, '');		// 비로그인 사용자 계정
				}
				abuf.setOriString(OS_ADH_CHANNEL, SZ_ADH_CHANNEL, this.mediaType);		// 매체 구분
				
				abuf.setOriString(OS_ADH_PUB_IP, SZ_ADH_PUB_IP, this.pcIp);			// 공인 IP 주소
				abuf.setOriString(OS_ADH_PRV_IP, SZ_ADH_PRV_IP, this.pcIp);			// 사설 IP 주소
				abuf.setOriString(OS_ADH_MAC_ADDR, SZ_ADH_MAC_ADDR, ''); // MAC 주소
				
				var contiKey = queryData.getContiKey();
				if (contiKey) {
					abuf.setChar(OS_ADH_CONTI_FLAG, '1');								// 연속 FLAG 
					abuf.setOriString(OS_ADH_PAGING_KEY, SZ_ADH_PAGING_KEY, contiKey);	// 연속 조회키 
				} else {
					abuf.setChar(OS_ADH_CONTI_FLAG, '0');
				}

       			//filler의 앞 5자리 공유거래소 UNIT Code 사용 (5자리)
				abuf.setOriString(OS_ADH_UNIT_CODE, SZ_ADH_UNIT_CODE, 
				window.loginObj['unit_code']? window.loginObj['unit_code'] : this.unitcode);				
				console.log("DHEAD_TYPE_A_unit_code:" + window.loginObj['unit_code']? JSON.stringify(window.loginObj['unit_code']) : this.unitcode)	
			}

		} else {

			//dheadType 이 없으면 data head 란 개념을 사용하지 않으므로 
			//바로 res 데이터 영역이 시작된다.
			abuf.setNumString(OS_TR_SEQCHK, SZ_TR_SEQCHK, this.makeTrSeq() );
		}

		return packetId;
	}

	registerReal(aquery, queryId, keyArr, compId, callback) {	
		super.registerReal(aquery, keyArr, compId, callback);
  }
  
  setUnitCode(unitcode) {
    this.unitcode = unitcode;
	console.log("KVsetUnitCode:" + unitcode)
  }
}
