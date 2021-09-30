import KVQueryManager from './KVQueryManager'
import KVWebsocketIO from './KVWebsocketIO'

export default class {
  constructor(connectionUrl, opts = {}) {
    this.format = opts.format && opts.format.toLowerCase()

    this.connectionUrl = connectionUrl
    this.opts = opts

    this.reconnection = this.opts.reconnection || false
    this.reconnectionAttempts = this.opts.reconnectionAttempts || Infinity // 재접속 횟수
    this.reconnectionDelay = this.opts.reconnectionDelay || 3000 // 재접속 시간 간격
    this.reconnectTimeoutId = 0
    this.reconnectionCount = 0
    this.isConnecting = false;
    this.ip = '';

    this.unikeyAIR = null;

    this.passToStoreHandler = this.opts.passToStoreHandler || false

    if (opts.store) {
      this.store = opts.store
    }
    if (opts.mutations) {
      this.mutations = opts.mutations
    }

    this.queryManager = this.connect(connectionUrl, opts);
    

    var self = this;
    setTimeout(() => {
      self.checkSleep();  
    }, 5000);

    //mca 서버와 응답 체크 (30초마다 폴링 보내고, 1번 이상 응답이 없으면 reconnect 처리)
    setInterval(function() {
      if(self.queryManager.pollingReqCnt>=1) {
        console.log("reconnect==="+self.queryManager.pollingReqCnt);
        self.queryManager.pollingReqCnt = 0;
        if (self.queryManager.netIo.socket != null && self.queryManager.netIo.socket.readyState == 1) {
          self.queryManager.netIo.socket.close(); // 소켓 강제종료 (오프라인일 경우 바로 CLOSE)
        }else{
          self.reconnect();
        }
      } else {
        console.log("checkPolling==="+self.queryManager.pollingReqCnt);
        self.checkPolling();  
      }
    }, 30000);
  }

  createUnikey() {
    var LIC_CODE = process.env.LIC_CODE // '375A0B82706A6A937F20';
    this.unikeyAIR = new UnikeyAIR();
    this.unikeyAIR.setLicenseCode(LIC_CODE);
    var seed = 
    'b71a5179c5058b965959a2da2bb93831e8439761d4370ca4612290fc26dbcb9480585fc833c9c6992bd215a0e6aa117f16f663f56c5e8d4477300d058f91781a56a6b9087f9d175284207a400755597cd20753e9d5b6edf73dfa685fdc4e6ce34e95c276fc438e8727d1c0716de87e15486ed2328ef13def96c9d19d8cd188739a06ef258c78002eb78056778a713368';
    this.unikeyAIR.setSecretSeed(seed);
  }

  connect(connectionUrl, opts = {}) {
    var tmp = connectionUrl.match(/^(wss?):\/\/([^:\/\s]+):([^\/]*)/i);
    var protocol = tmp[1];
    var host = tmp[2];
    var port = tmp[3];

    if(!this.queryManager){
      this.isConnecting = true;
      this.queryManager = new KVQueryManager();
      this.queryManager.setConnectCallback(this.onConnectedServer.bind(this));
      this.queryManager.setClosedCallback(this.onClosedServer.bind(this));

      //var bSSL = window.location.protocol === 'http:' ? false : true;
      var bSSL = false;
      if (protocol === "wss") {
        bSSL = true;
      }
      var nio = new KVWebsocketIO(this.queryManager, bSSL); //SSL 설정 (true, false)
      nio.protocols = 'wsmw-protocol';
      
      //unikeyAIR 키생성
      if (!this.unikeyAIR) {
        this.createUnikey();
      }
      nio.setUnikeyAIR(this.unikeyAIR);
      
      this.queryManager.setNetworkIo(nio);
      this.queryManager.setQueryBuffer(12000, null, 'utf-8', null, 0x20);      
    }

    this.queryManager.startManager(host, port);
    return this.queryManager
  }

  onConnectedServer() {
    console.log('Observer.onConnectedServer1');
    //this.ip = ip();

    this.queryManager.clearAllRealCallbacks(); // 콜백 모두 제거 (unregisterReal가 동작하더라도 서버에 전송되지는 못함)

    if(this.reconnectTimeoutId != 0){
      clearTimeout(this.reconnectTimeoutId);
    }
    this.isConnecting = false;
    if (this.store) {
      this.passToStore('SOCKET_ONOPEN', true); // VUE 이벤트 발생
    }
    if(this.reconnection && this.queryManager.netIo.socket.readyState == 1){
      this.reconnectionCount = 0;
    }    
  }

  onClosedServer() {
    console.log('Observer.onClosedServer');
    if (this.store) {
      this.passToStore('SOCKET_ONCLOSE', null);
    }       
  }

  reconnect() {
    if (this.reconnectionCount < this.reconnectionAttempts || true) { // 재접속시도 횟수 제한이 필요할 경우 || true 제거
      this.reconnectionCount++

      console.log('--------ReconnectServer--------');
      console.log('reconnectionCount :', this.reconnectionCount);

      var self = this;
      self.connect(self.connectionUrl, self.opts);

    } else {
      if (this.store) {
        this.passToStore('SOCKET_RECONNECT_ERROR', true)        
      }

      // var loop = setInterval(() => {
      //   var currentIp = ip();
      //   if(this.ip != currentIp){
      //     this.reconnectionCount = 0;
      //     this.reconnect();
      //     clearInterval(loop);
      //   }
      // }, 1000 * 10);
    }
  }

  passToStore(eventName, event) {
    if (this.passToStoreHandler) {
      this.passToStoreHandler(eventName, event, this.defaultPassToStore.bind(this))
    } else {
      this.defaultPassToStore(eventName, event)
    }
  }

  defaultPassToStore(eventName, event) {
    if (!eventName.startsWith('SOCKET_')) {
      return
    }
    let method = 'commit'
    let target = eventName.toUpperCase()
    let msg = event
    if (this.format === 'json' && event.data) {
      msg = JSON.parse(event.data)
      if (msg.mutation) {
        target = [msg.namespace || '', msg.mutation].filter((e) => !!e).join('/')
      } else if (msg.action) {
        method = 'dispatch'
        target = [msg.namespace || '', msg.action].filter((e) => !!e).join('/')
      }
    }
    if (this.mutations) {
      target = this.mutations[target] || target
    }
    this.store[method](target, msg)
  }

  checkSleep(){
    var self = this;    
    
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;
    window.ontouchstart = resetTimer;
    window.onclick = resetTimer;
    window.onkeypress = resetTimer;   
    window.addEventListener('scroll', resetTimer, true);
    
    var eventLastTime = (new Date()).getTime();
    function resetTimer() {
      eventLastTime = (new Date()).getTime();
      if((self.queryManager.netIo.socket != null // 소켓 객체가 없을경우
        && self.queryManager.netIo.socket.readyState == 3 // 3:SOCKET CLOSE
        && self.reconnectionCount >= self.reconnectionAttempts)
        || navigator.onLine == false){ // navigator.onLine 네트워크 상태값
        self.reconnectionCount = 0;
        self.reconnect();
      }
    }

    var lastTime = (new Date()).getTime();

    // 반복되며 네트워크상태, 슬립여부 체크
    setInterval(function() {
      var currentTime = (new Date()).getTime();

      // reconnect 함수 실행 여부를 결정---------------------------------------
      if(self.reconnection && !self.isConnecting){
        if (currentTime > (eventLastTime +(10*60*1000)) || navigator.onLine == false /*|| 상태추가*/) {      
          if (currentTime > (lastTime + self.reconnectionDelay + 10000) || navigator.onLine == false) {
      // reconnect 함수 실행 여부를 결정---------------------------------------

            console.log("wake event");
            if(self.queryManager.netIo.socket != null && self.queryManager.netIo.socket.readyState == 1){
              self.queryManager.netIo.socket.close(); // 소켓 강제종료 (오프라인일 경우 바로 CLOSE)
            }else{
              self.reconnect();
            }
          }else{
            if(self.queryManager.netIo.socket == null){
              self.reconnect();
            }else if(self.queryManager.netIo.socket.readyState == 3){
              self.reconnect();
            }
          }      
        }else{
          if(self.queryManager.netIo.socket == null){
            self.reconnect();
          }else if(self.queryManager.netIo.socket.readyState == 3){
            self.reconnect();
          }
        }
      }

      lastTime = currentTime;
    }, self.reconnectionDelay);
  }

  checkPolling(){
    var self = this; 
    self.queryManager.pollingProcess(); //KVQueryManager.pollingReqCnt
    self.queryManager.pollingReqCnt++;
  }
}
