'use strict';

require('./BP');
import ABuffer from './ABuffer';
import WebsocketIO from './WebsocketIO'

export default class extends WebsocketIO {
  constructor(listener, isSSL) {
    super(listener, isSSL);

    this.readBuf = null;
    this.readSize = SZ_SIZE_HEADER;
    this.packetInx = 0;
  
    //packet chain buffer
    //this.chnBuf = null;	asoocool 오류 수정을 위해 주석
    
    this.zipBuf = null;
    this.encBuf = null;
    
    // encode, decode
    this.unikeyAIR = null;					// theApp에서 최초 초기화시 생성된 unikeyAIR 객체를 세팅함
    this.userSeed = null;					// 최초 접속시 서버에서 secretSeed를 받아옴
  }

  startIO(address, port) {
    this.readBuf = null;
    this.defReadBuf = new Uint8Array(4096 * 4); //readBuf size 변경 (as-is소스대로 수정)
    //this.defReadBuf = new Uint8Array(1024 * 1024 * 4);
    //this.largeReadBuf = new Uint8Array(1024 * 1024 * 4);
    this.bufferType = '';

    this.readSize = SZ_SIZE_HEADER;
    this.packetInx = 0;
    
    //this.chnBuf = new ABuffer(1024*1500);
    this.zipBuf = new ABuffer(1024*1000);
    this.encBuf = new ABuffer(1024*1000);
    //this.chnId = 0;
    
    //asoocool, 패킷 체인 오류 수정...
    this.chnBufMap = {};

    super.startIO(address, port);
  };

  stopIO(isClosed) {
    super.stopIO(isClosed);
  };

  //data is Uint8Array
  sendData(data, callback) {
    if(!this.isStart()) return;
    
    var isEnc = data[OS_COMM_FLAG] & PACKET_FLAG.ENCRYPT;
    if(isEnc) {
      var abuf = this.encBuf;
      var enc;
      /*
      // 패킷 시작값에 로그인 여부를 체크하여 세팅
      if(data[0] & 0x10)
      {
        data[0] = PACKET_STX;
        enc = this.unikeyAIR.encryptLogin(this.userSeed, data.subarray(OS_TR_FLAG, data.length-1));
      }
      else enc = this.unikeyAIR.encrypt(this.userSeed, data.subarray(OS_TR_FLAG, data.length-1));*/
      
      // 전송하려는 데이터에 UNI::([85,78,73,58,58]) 값이 존재하는 경우에 encryptLogin 설정
      if(Array.prototype.slice.call(data).toString().indexOf('85,78,73,58,58') > -1) {
        enc = this.unikeyAIR.encryptLogin(this.userSeed, data.subarray(OS_TR_FLAG, data.length-1));
  // 			console.log('encryptLogin');
        console.log('encryptLogin====>', enc);
      } else {
        //enc = this.unikeyAIR.encrypt(this.userSeed, data.subarray(OS_TR_FLAG, data.length-1));
        enc = this.unikeyAIR.encryptLogin(this.userSeed, data.subarray(OS_TR_FLAG, data.length-1));
  // 			console.log('encrypt');
      }
      if (enc == null) {
        //console.log("encrypt error:"+this.process_error(this.unikeyAIR.getErrorCode()));
        data[OS_COMM_FLAG] -= PACKET_FLAG.ENCRYPT;
      } else {
        var sendLen = enc.length;
        abuf.copyBuffer(data.subarray(0, OS_TR_FLAG), 0);
        abuf.setOriString(OS_TR_FLAG, 0, enc);	
        abuf.addByte(PACKET_ETX);	// 종료 패킷

        abuf.setByte(OS_SOCK_HI, (sendLen+3)/256);	//패킷 길이 hi
        abuf.setByte(OS_SOCK_LO, (sendLen+3)%256);	//패킷 길이 lo

        data = abuf.subArray(0, sendLen+7);
      }
    }
    
    if(data.length>PACKET_CHAIN_SIZE) {
      var bodyLen = data.length - OS_TR_FLAG - 1,	//헤더와 종료플래그를 뺀 바디 데이터 길이
        splitSize = PACKET_CHAIN_SIZE - 1,		//종료플래그를 뺀 분할해서 보낼 사이즈
        copySize = splitSize - OS_TR_FLAG,		//분할해서 보낼 사이즈에서 헤더길이를 뺏으므로 실제 복사할 사이즈
        count = parseInt(bodyLen/copySize, 10), mod = bodyLen % copySize, dataOffset = OS_TR_FLAG,
        splitBuf = new Uint8Array(PACKET_CHAIN_SIZE);
        
      if(mod>0) count++;
      
      splitBuf.set(data.subarray(0, OS_TR_FLAG), 0);	
      
      for(var i=0; i<count; i++) {
        //splitBuf.set(data.subarray(0, OS_TR_FLAG), 0);	
      
        //시작 패킷
        if(i==0) splitBuf[OS_COMM_FLAG] = PACKET_FLAG.FIRST;
        
        //마지막 패킷
        else if(i==count-1)
        {
          copySize = mod;
          splitSize = copySize + OS_TR_FLAG;
          
          splitBuf = splitBuf.subarray(0, splitSize+1);
          
          splitBuf[OS_COMM_FLAG] = PACKET_FLAG.LAST;
        }
        
        //중간 패킷
        else splitBuf[OS_COMM_FLAG] = PACKET_FLAG.MID;

        //데이터 복사 시작
        //splitBuf.set(data.subarray(0, OS_TR_FLAG), 0);					//헤더 정보 그대로 다시 복사
        splitBuf.set(data.subarray(dataOffset, dataOffset+copySize), OS_TR_FLAG);
        splitBuf[splitSize] = PACKET_ETX;	//패킷 종료 플래그

        splitBuf[OS_SOCK_HI] = (splitBuf.length-SZ_SIZE_HEADER)/256;	//패킷 길이 hi
        splitBuf[OS_SOCK_LO] = (splitBuf.length-SZ_SIZE_HEADER)%256;	//패킷 길이 lo			

        dataOffset += copySize;

        this.socket.send(splitBuf, callback);
      }
    } else {
      this.socket.send(data, callback);
    }
  };

  //data is ArrayBuffer, var buf = new Uint8Array(data);
  onReceived(data) {
    var nRead, isEnc, isZip, dataBuf, arr, flag, cFlag, packetSize, lastBuf;
    
    dataBuf = new ABuffer();
    dataBuf.setBuffer(new Uint8Array(data));

    //this.readBuf = this.defReadBuf;
    // if(this.bufferType == 'L'){
    // 	this.readBuf = this.largeReadBuf;
    // }else{
    // 	this.readBuf = this.defReadBuf;
    // }

    this.readBuf = this.defReadBuf;
    
    while(true) {
      arr = dataBuf.nextBinary(this.readSize);
      nRead = arr.length;
      
      if(nRead<1) break;
      
      this.readBuf.set(arr, this.packetInx);
      
      //수신한 패킷을 다 읽을 때까지 뺀다.
      this.readSize -= nRead;
      //패킷을 읽은 만큼 인덱스를 증가시킨다.
      this.packetInx += nRead;
      
      if(this.packetInx<SZ_SIZE_HEADER) {
        //공통헤더를 다 읽을 때까지...
        continue;          
      } else if(this.packetInx==SZ_SIZE_HEADER) {
        //공통헤더 부분을 다 읽음
        this.readSize = this.readBuf[OS_SOCK_HI]*256 + this.readBuf[OS_SOCK_LO];
        continue;
      } else if(this.readSize>0) {
        //공통헤더를 읽은후 나머지 데이터를 모두 받을 때까지...
        continue;
      }

      //-----------------------------------------------------------------
      //  여기부터 패킷 컨트롤 시작
      //-----------------------------------------------------------------
          
      lastBuf = this.readBuf;
      packetSize = this.packetInx;
          
      //[mRecvBufUtil setBuffer:lastBuf size:RECV_BUFSIZE];
          
      flag = lastBuf[OS_COMM_FLAG];

      /* 응답 패킷 확인
      console.log('%c------------------------','color:purple')
      let result = '';
      for (let i = 0; i < packetSize; i++) {
          result += String.fromCharCode(lastBuf[i].toString());
      }
      console.log('%c'+result,'color:purple')
      console.log('%c------------------------','color:purple')
      */

      //초기화
      this.readSize = SZ_SIZE_HEADER;
      this.packetInx = 0;
      
      // 암호화, 압축은 패킷 체인인 경우 따로따로 압축해제, 복호화를 해야함.
      //암호화 여부, 압축 여부
      isEnc = (flag & PACKET_FLAG.ENCRYPT);
      isZip = (flag & PACKET_FLAG.COMPRESS);

      //console.log('-------------------------------------> ' + flag);		

      //구간 암호화 & 압축
      if(isEnc && isZip)
      {
      }

      // 전문 복호화
      if( isEnc )
      {
        this.encBuf.setBuffer(lastBuf);

        //var encStrLen = (lastBuf[OS_SOCK_HI] * 256) + lastBuf[OS_SOCK_LO];
        var encStr = this.encBuf.getOriString(OS_TR_FLAG, packetSize - SZ_SIZE_HEADER - 3);

        var dec_array = this.unikeyAIR.decryptToArray(this.userSeed, encStr);
        if (dec_array == null) return "decrypt error:"+process_error(this.unikeyAIR.getErrorCode());

        packetSize = dec_array.length + SZ_SIZE_HEADER + 3;
        var rcvLen = dec_array.length;
        this.encBuf.copyBuffer(dec_array, OS_TR_FLAG);

        this.encBuf.setByte(OS_SOCK_HI, (packetSize-SZ_SIZE_HEADER)/256);	//패킷 길이 hi
        this.encBuf.setByte(OS_SOCK_LO, (packetSize-SZ_SIZE_HEADER)%256);	//패킷 길이 lo
        this.encBuf.setOffset(packetSize - 1);
        this.encBuf.addByte(PACKET_ETX);

        lastBuf = this.encBuf.subArray(0, packetSize);
      }

      // 전문 압축 해제
      else if( isZip )
      {
        var state = 
          {
            inputBuffer: lastBuf.subarray(OS_TR_FLAG, packetSize - 1),	//압축 해제 대상 버퍼
            outputBuffer: new Uint8Array(4)
          };

        window.lzo1x.decompress(state);

        //console.log(state.outputBuffer);

        this.zipBuf.copyBuffer(lastBuf.subarray(0, OS_TR_FLAG), 0);
        this.zipBuf.copyBuffer(state.outputBuffer, OS_TR_FLAG);

        packetSize = state.outputBuffer.length + SZ_SIZE_HEADER + 3;

        //헤더에 새로운 사이즈 세팅
        this.zipBuf.setByte(OS_SOCK_HI, (packetSize-SZ_SIZE_HEADER)/256);
        this.zipBuf.setByte(OS_SOCK_LO, (packetSize-SZ_SIZE_HEADER)%256);
        this.encBuf.setOffset(packetSize - 1);
        this.zipBuf.addByte(PACKET_ETX);

        lastBuf = this.zipBuf.subArray(0, packetSize);

        /*
          var ret = checkResult(state.outputBuffer);
          if(ret.status !== 0) {
            console.error('decompression', ret.msg, list[index]);
            // return false;
          }
          */

      }

      cFlag = (flag & 0x0f);
      
      //패킷 체인 처리
      switch(cFlag)
      {
        //마지막 체인 패킷
        case 0x03:
          {
            //if(this.chnBuf.getOffset()==0) break;
            //if(this.chnId != lastBuf[OS_COMM_ID]) break;

            var chnId = lastBuf[OS_COMM_ID],
              chnBuf = this.chnBufMap[chnId];

            if(chnBuf)
            {
              var copySize = packetSize - OS_TR_FLAG;
              
              chnBuf.addBinary(copySize, lastBuf.subarray(OS_TR_FLAG, OS_TR_FLAG+copySize));
              
              lastBuf = chnBuf.getBuffer();
              packetSize = chnBuf.getOffset();

              //헤더에 새로운 사이즈 세팅
              chnBuf.setByte(OS_SOCK_HI, (packetSize-SZ_SIZE_HEADER)/256);
              chnBuf.setByte(OS_SOCK_LO, (packetSize-SZ_SIZE_HEADER)%256);

              chnBuf.setOffset(0);

              delete this.chnBufMap[chnId];

              //console.log('-----> packet chain clear !!');
              //afc.log(this.chnBufMap);
            }
          }
          break;

          //첫번째 체인 패킷은 전체를 복사
        case 0x01:
          {
            //asoocool
            var chnId = lastBuf[OS_COMM_ID];
            var	chnBuf;

            // if(this.bufferType == 'L'){
            // 	chnBuf = new ABuffer(1024 * 1024 * 4);
            // }else{
            // 	chnBuf = new ABuffer(1024 * 1500);
            // }

            chnBuf = new ABuffer(1024 * 1500);
            
            /*
            var chnId = lastBuf[OS_COMM_ID],
              chnBuf = new ABuffer(4096 * 1024 * 2);
            */

            this.chnBufMap[chnId] = chnBuf;

            //종료 플래그는 뺀다. -1
            packetSize--;
            chnBuf.setBinary(0, packetSize, lastBuf.subarray(0, packetSize));
          }
          continue;

          //중간 패킷
        case 0x02:
          {
            var chnId = lastBuf[OS_COMM_ID],
              chnBuf = this.chnBufMap[chnId];

            if(chnBuf)
            {
              //종료 플래그는 뺀다. -1
              var copySize = packetSize - OS_TR_FLAG - 1;
              chnBuf.addBinary(copySize, lastBuf.subarray(OS_TR_FLAG, OS_TR_FLAG+copySize));						
            }
          }
          continue;
      }

      if(this.listener) this.listener.onReceived(lastBuf, packetSize);				
    }
  };

  setUnikeyAIR(unikeyAIR)
  {
    this.unikeyAIR = unikeyAIR;
  };

  getUnikeyAIR()
  {
    return this.unikeyAIR;
  };

  setUserSeed(userSeed)
  {
    this.userSeed = userSeed;
  };

  uint8ArrayToArray(uint8Array)
  {
    if(Array.from) return Array.from(uint8Array);
    else return Array.prototype.slice.call(uint8Array);
  };

  process_error(rv)
  {
    // BASE64 encoding decoding error
    var UNIKEYAIR_BASE64_ERR = 1;  	
    // 기본적인 크기보다 작음
    var UNIKEYAIR_SIZE_ERR_1 = 2;  	
    // 기본적인 크기보다 작음
    var UNIKEYAIR_SIZE_ERR_2 = 3;  	
    // 키 구하는 중 오류(데이터가 비정상)
    var UNIKEYAIR_CALC_KEY_ERR = 10; 	
    // 암호 중 에러
    var UNIKEYAIR_ENC_ERR = 11; 		
    // 복호 중 에러
    var UNIKEYAIR_DEC_ERR = 12; 		
    // 암복호 중 결과 저장 길이가 작음
    var UNIKEYAIR_BUFFER_ERR = 20; 		
    // 초기화 안됨(UNIKEYAIR_SetSecretSeed)
    var UNIKEYAIR_INIT_ERR = 21; 		
    // 라이선스 오류 
    var UNIKEYAIR_LICENSE_ERR = 98; 	
    // 비정상 데이터
    var UNIKEYAIR_ABNORMAL_DATA = 99; 
    switch (rv) {
    case UNIKEYAIR_BASE64_ERR : return "BASE64 encoding decoding error";
    case UNIKEYAIR_SIZE_ERR_1 : return "기본적인 크기보다 작음";
    case UNIKEYAIR_SIZE_ERR_2 : return "기본적인 크기보다 작음";
    case UNIKEYAIR_CALC_KEY_ERR : return "키 구하는 중 오류(데이터가 비정상)";
    case UNIKEYAIR_ENC_ERR : return "암호 중 에러";
    case UNIKEYAIR_DEC_ERR : return "복호 중 에러";
    case UNIKEYAIR_BUFFER_ERR : return "암복호 중 결과 저장 길이가 작음"; /* NOT in JS */
    case UNIKEYAIR_INIT_ERR : return "초기화 안됨(UNIKEYAIR_SetSecretSeed)";
    case UNIKEYAIR_LICENSE_ERR : return "라이선스 오류 ";
    case UNIKEYAIR_ABNORMAL_DATA : return "비정상 데이터";
    default : return "UNKOWN ERROR";
    }
  };
}
