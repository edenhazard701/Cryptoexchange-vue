'use strict';

const RETRY_CHECK_TIME = 3000;
const FULL_RETRY_TIME = 1000*15;

export default class {
  constructor(listener, isSSL) {
    this.socket = null;
    this.protocols = '';
    this.isSSL = isSSL;

    this.listener = listener;
		this.retryCount = 0;
		this.retryTime = 0;
		this.curCount = 0;
		this.selfClose = false;
  }

  isStart() {
    return (this.socket!=null);
  };

  setIoListener(listener) {
		this.listener = listener;
	}
	
	enableRetry(retryCount) {
		this.retryCount = retryCount;
	}

  startIO(address, port) {
    if(this.isStart()) return;
    
    var thisObj = this;
    
    this.selfClose = false;
    this.address = address;
    this.port = port;
    
    var scheme = 'ws://';
    if(this.isSSL) scheme = 'wss://';
    
    var socket = new WebSocket(scheme + address + ':' + port, this.protocols);
    
    socket.binaryType = 'arraybuffer';
    
    socket.onopen = function(event) {
      //console.log('onopen', event);
      thisObj.socket = socket;
      thisObj._onConnected(true);
      thisObj.listener.onSocketConnected();
    };	
    
    socket.onmessage = function(event) {
      //console.log('onmessage', event);
      thisObj.onReceived(event.data);
    };

    socket.onclose = function(event) {
      console.log('websocketio onclose', event);
      thisObj.listener.onSocketClosed(event);
      thisObj.stopIO(true);
      afc.isIos && afc.iosVer < 11 && 1006 == event.code && (thisObj.isStart() || (socket.isConnectFail = !0, thisObj._onConnected(!1))), socket.isConnectFail || thisObj.onClosed()

    };
    
    socket.onerror = function(event) {
      //console.log('onError', event);
      thisObj.listener.onSocketError(event);
      thisObj.isStart() || (socket.isConnectFail = !0, thisObj._onConnected(!1))
    };
  }

  stopIO(isClosed) {
    if(!this.isStart()) return;

    this.selfClose = !isClosed;
    
    this.socket.close();
    this.socket = null;
  }

  //data is Uint8Array
  sendData(data, callback) {
  }

	onReceived(data, size) {
	}
	
	onClosed() {
		if(this.listener) this.listener.onClosed();
	}
	
	onConnected(success) {
		if(this.listener) this.listener.onConnected(success);
	}
	
	_onConnected(success) {
    //console.log("_onConnected", success);
		if(success) {
			this.curCount = 0;
			this.onConnected(true);
		} else {
			//최초 재시도인 경우, 시작 시간 체크
			if(this.curCount==0) this.retryTime = new Date().getTime();
			
			if(++this.curCount >= this.retryCount) {
				this.curCount = 0;
				this.onConnected(false);
				this.stopIO(true);
			}	else {
				//재접속 시도
				//max wait time is 15 sec
				if( (new Date().getTime() - this.retryTime) > FULL_RETRY_TIME ) {
					this.curCount = 0;
					this.onConnected(false);
					this.stopIO(true);
					return;
				}
	
				var thisObj = this;
				setTimeout(function() {
					thisObj.stopIO(true);
					thisObj.startIO(thisObj.address, thisObj.port);
					
				}, RETRY_CHECK_TIME);
			}
		}
	}
}
