<template>
  <div class="stock-display">
    <div class="stocklist-layer" :class="{'show': stockListVisible}" v-if="$store.state.nowPage === '/fullexchange' || $store.state.nowPage === '/fullscreenchart'">
      <stock-list :srchView="true" class="stock-list">관심종목</stock-list>
    </div>
    <el-row class="StockDisplay" :class="chkStrLength(getCurrentData['curprc'])">
      <!-- {{currentData}} -->
      <el-col :span="4" class="stockName">
        <el-row>
          <el-col class="item-name-wrap">
            <div class="click-area" @click="showStockList()" :class="{'show': stockListVisible}">
              <el-row class="item-name">
                <el-col class="item-logo"><img :src="$store.getters.getCoinImage"></el-col>
                <el-col class="item-symbol">
                  <span v-if="$_.findWhere(nameList, {o_symbol : currentSymbol}) != undefined">
                    {{nameFormat($_.findWhere(nameList, {o_symbol : currentSymbol}))}}
                  </span>
                  <span class="unit" v-if="$_.findWhere(nameList, {o_symbol : currentSymbol}) != undefined">
                    {{ $_.findWhere(nameList, {o_symbol : currentSymbol}) | codeFilter }}
                  </span>
                  <el-button v-if="$store.state.nowPage === '/fullexchange' || $store.state.nowPage === '/fullscreenchart'" class="arrow" :class="{'open': stockListVisible }" type="text"><i class="el-icon-arrow-down"></i></el-button>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-button icon="el-icon-bell" circle @click="notiSettingVisibleClick" :class="{'open': notiSettingVisible, 'noti': isNotiCurSymbol}">알림</el-button>
          <el-dialog title="알림 설정" :visible.sync="notiSettingVisible" width="780px" top="40px" class="pop-alarm">
            <noti-setting v-if="notiSettingVisible"></noti-setting>
          </el-dialog>
        </el-row>
      </el-col>
      <el-col :span="4" class="now-price">
        <span class="price" :class="diffColor">{{getCurrentData['curprc'] | prcFilter}}</span>
        <span class="krw">{{getCurrentData['paycurrcode']}}</span> &nbsp;&nbsp;
        <span v-if="getCurrentData['paycurrcode'] == 'BTC'">
          {{format(getCurrentData['curprc'] * currentBtcKrPrice)}}
          <span class="krw">KRW</span>
        </span>
        <span v-if="getCurrentData['paycurrcode'] == 'ETH'">
          {{format(getCurrentData['curprc'] * currentEthKrPrice)}}
          <span class="krw">KRW</span>
        </span><br>

        <span class="label"><!-- 전일대비 -->{{ $t('exchange.b001') }}</span>
        <span :class="diffColor">
          {{getCurrentData['updnrate'] > 0 ? '+' + getCurrentData['updnrate'] : getCurrentData['updnrate'] }}% &nbsp;&nbsp;
          <span class="arrow" :class="diffPrice | rateSymbol"></span>
          {{getCurrentData['diff'] | diffFilter}}
        </span>
      </el-col>
      <el-col :span="4" class="high-price">
        <div class="high-now">
          <span class="label"><!-- 당일고가 -->{{ $t('exchange.b002') }}</span>
          <span class="price red">{{hlPrcFormat(getCurrentData['highprc'])}}</span>
          <span class="price-krw" v-show="getCurrentData['paycurrcode'] == 'BTC'">
            {{format(getCurrentData['highprc'] * currentBtcKrPrice)}}
            <span class="krw">KRW</span>
          </span>
          <span class="price-krw" v-show="getCurrentData['paycurrcode'] == 'ETH'">
            {{format(getCurrentData['highprc'] * currentEthKrPrice)}}
            <span class="krw">KRW</span>
          </span>
        </div>
        <!-- <p>초당 실시간 처리량 : {{realCount}}</p> -->
        <div class="low-now">
          <span class="label"><!-- 당일저가 -->{{ $t('exchange.b003') }}</span>
          <span class="price blue">{{hlPrcFormat(getCurrentData['lowprc'])}}</span>
          <span class="price-krw" v-show="getCurrentData['paycurrcode'] == 'BTC'">
            {{format(getCurrentData['lowprc'] * currentBtcKrPrice)}}
            <span class="krw">KRW</span>
          </span>
          <span class="price-krw" v-show="getCurrentData['paycurrcode'] == 'ETH'">
            {{format(getCurrentData['lowprc'] * currentEthKrPrice)}}
            <span class="krw">KRW</span>
          </span>
        </div>
      </el-col>
      <el-col :span="4" class="trade-price">
        <div>
          <span class="label"><!-- 거래금액(24H) -->{{ $t('exchange.b004') }}</span>
          <span class="value">
            {{p24Format(getCurrentData['cumdealcost_24'])}}
            <span class="krw">{{getCurrentData['paycurrcode']}}</span>
          </span>
        </div>
        <div v-if="getCurrentData['paycurrcode'] == 'BTC'">
          {{format(getCurrentData['cumdealcost_24'] * currentBtcKrPrice)}}
          <span class="krw">KRW</span>
        </div>
        <div v-if="getCurrentData['paycurrcode'] == 'ETH'">
          {{format(getCurrentData['cumdealcost_24'] * currentEthKrPrice)}}
          <span class="krw">KRW</span>
        </div>
      </el-col>
    </el-row>
  </div> 
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { _ } from 'vue-underscore';
import StockList from './StockList.vue';
import NotiSetting from '../notification/NotiSettingDetail';
import { setTimeout } from 'timers';

export default {
  components: {
    StockList,
    NotiSetting
  },
  props: ['itemId'],
  data() {
    return {
      name : 'StockDisplay',        
      getCurrentData: {
        curprc: '',           // 현재가
        yesterdayprice: '',   // 전일가
        paycurrcode: '',      // 현재마켓코드
        highprc: '',          // 고가
        lowprc: '',           // 저가
        cumdealcost_24: '',   // 24시간 누적거래대금
        updnrate: '',         // 변동률
        diff: ''              // 대비
      },        
      currentCoinMarket: '',      // 현재마켓
      diffPrice: 0,               // 전일대비 class
      diffColor: '',              // 전일대비 class
      notiSettingVisible: false,  // 알림설정
      stockListVisible: false,    // 종목리스트 표시여부
      stockSymbol: '',            // 마켓
      dataLoaded: false,          // 데이터 로드 상태
      isNotiCurSymbol: false,     // 알림설정
      realDataKVS0: null,         // KVS0 실시간데이터
      realDataKVM2: null,         // KVM2 실시간데이터
      isMock: false,              // 테스트 상태
      mockCount: 1,               // 테스트 데이터 초당 반복횟수
      checkCurrentDate: -1,       // 현재시간

      //임시 타이틀
      titleMap: {
        '00999': 'KOVEX',  //계좌만들기전
        '00001': 'KOVEX',
        '00002': 'UNIVAX1',
        '00003': 'UNIVAX2',
      }
    };
  },    
  filters: {
    prcFilter: function (obj) { // 체결가 출력 형식
      obj = obj.toString();
      if(obj == '') return '';
      
      if(obj.indexOf('.') > -1){
        if(parseFloat(obj) > 1){        
          var val1 = UnitManager.numberWithCommas(parseInt(obj));
          var val2 = obj.split('.')[1];
          return val1+'.'+val2;
        }else{
          return obj;
        }
      }else{          
        return UnitManager.numberWithCommas(obj);
      }
    },
    diffFilter: function (obj) { // 변동률 출력 형식
      var objStr = obj.toString();
      var objNum = parseFloat(obj);
      
      if(objStr.indexOf('.')>-1){        
        var val1 = UnitManager.numberWithCommas(parseInt(objStr.split('.')[0]));
        var val2 = objStr.split('.')[1];
        return (val1+'.'+val2).replace('-','');
      }else{
        if(objNum == 0){
          return objStr;
        }else{
          return UnitManager.numberWithCommas(objNum).replace('-','')
        }
      }
    },      
    codeFilter: function (obj) {  // 마켓코드 출력 형식
      return obj['o_inst_eng_abbr'];
    },
    rateSymbol(diff) {  // 변동률 클래스 설정
      if (diff > 0) return 'up'
      else if (diff < 0) return 'down'
      return ''
    }
  },
  computed: {
    ...mapState({
      nameList: state => state.data['n1001'],
      currentSymbol: state => state.data.currentSymbol,
      beforeSymbol: state => state.data.beforeSymbol,
      trSymbols: state => state.data.trSymbols,
      currentBtcKrPrice: state => state.data.currentBtcKrPrice,
      currentEthKrPrice: state => state.data.currentEthKrPrice
    }),
    ...mapGetters({
      isLoggedIn : 'isLoggedIn',
      getLangKind: 'getLangKind',
      notiSettingList: 'getNotiSettingList'
    })
  },
  methods: {
    ...mapActions(['getNotiSettingList']),      
    chkStrLength(_srt) { // 글자수 15초과시 class 적용
      if(_srt == null) return '';
      var length, result_str;
      _srt = _srt.toString();
      if(_srt == '') result_str = '';
      
      if(_srt.indexOf('.')>-1){
        if(parseFloat(_srt)>0){
          var val1 = UnitManager.numberWithCommas(parseInt(_srt));
          var val2 = _srt.split('.')[1];
          result_str = val1+'.'+val2;
        }else{
          result_str = _srt;
        }
      }else{
        result_str = UnitManager.numberWithCommas(parseInt(_srt))
      }
      
      length = result_str.length;
      
      if (length > 14) {
        return 'fs15';
      }
    },
    prcFormat (obj) {  // 현재가 출력 형식
      obj = obj.toString();
      if(obj == '') return '';
      
      if(obj.indexOf('.') > -1){
        if(parseFloat(obj) > 1){
          var val1 = UnitManager.numberWithCommas(parseInt(obj))
          var val2 = obj.split('.')[1];
          return val1+'.'+val2;
        }else{
          return obj;
        }
      }else{
        return UnitManager.numberWithCommas(parseInt(obj))
      }
    },
    hlPrcFormat: function (obj) { // 고가 저가 출력 형식
      var self = this;
      if(obj == '') return '';
      var objStr = obj.toString();
      var objNum = parseFloat(obj);
      var fixedVal = 0;        

      if(self.currentSymbol.indexOf('KRW__') > -1){
        if(objNum < 10){
          fixedVal = 2;
        }
        if(10 <= objNum && objNum < 100){
          fixedVal = 1;
        }
        if(objNum >= 100){
          fixedVal = 0;
        }          
      }else{
        fixedVal = 8;
      }

      objStr = objNum.toFixed(fixedVal);

      if(objStr.indexOf('.') > -1){
        var val1 = UnitManager.numberWithCommas(parseInt(objStr))
        var val2 = objStr.split('.')[1];
        return val1+'.'+val2;
      }else{
        return UnitManager.numberWithCommas(objStr)
      }
    },
    nameFormat(obj) { // 언어설정에 따른 종목명 표시
      var self = this;
      if(self.getLangKind == 'KR'){
        return obj['o_inst_kor_nm'].split('/')[0];
      }
      if(self.getLangKind == 'EN'){
        return obj['o_inst_eng_nm'].split('/')[0];
      }
    },
    p24Format(obj){ // 24시간 거래대금 출력 형식
      var self = this;
      var objStr = obj.toString();
      var objNum = parseFloat(obj);
      
      if(self.getCurrentData['paycurrcode'] == 'KRW'){
        return UnitManager.numberWithCommas(parseInt(objNum))
      }else{
        if(objStr.indexOf('.')>-1){
          var val1 = UnitManager.numberWithCommas(parseInt(obj))
          var val2 = objNum.toFixed(2).split('.')[1];
          return val1+'.'+val2;
        }else{
          return objStr;
        }
      }
    },
    showStockList() { // 종목리스트 표시 여부
      if (this.stockListVisible === true) {
        this.stockListVisible = false;
      } else {
        this.stockListVisible = true;
      }
    },
    addComma(number) {  // 숫자포맷
      if (number == undefined || number == '' || number == null) return '0'
      var parts = number.toString().split(".");
      return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    },
    format(number) {  // 숫자포맷
      var fixedVal = 0;
      number = parseFloat(number);

      if(number < 10){
        fixedVal = 2;
      }
      if(10 <= number && number < 100){
        fixedVal = 1;
      }
      if(number >= 100){
        fixedVal = 0;
      }
      
      if(number < 100){
        if(number > 1){
          var num = number.toFixed(10);
          var val1 = UnitManager.numberWithCommas(parseInt(number.toString()))
          var val2 = num.toString().split('.')[1];
          val2 = parseFloat('0.'+val2).toFixed(fixedVal);
          val2 = val2.toString().split('.')[1];
          return val1+'.'+val2;
        }else{
          return number.toFixed(fixedVal);
        }
      }else{
        return UnitManager.numberWithCommas(parseInt(number))
      }
    },
    requestNowPrice() { // 현재가 조회 요청
      var self = this;
      var symbol = this.$store.state.data.currentSymbol;
      this.$socket.sendProcessByName('i0018', function (queryData) {
        var block = queryData.getBlockData('InBlock1')[0];
        // 조회구분
        block['symbolcnt'] = '1';
        block['qry_div'] = '4';
        block['paycurrcode'] = '99999';
        block['excode'] = '001';
        var block2 = queryData.queryObj['InBlock2'];
        block2.push({
          'symbol': symbol
        });
      }, function (queryData) {
        if (queryData != null) {
          var OutBlock1 = queryData['queryObj']['OutBlock2'][0];            
          self.updateDisplay(OutBlock1)
        } else {

          // 전문 에러 언어팩 적용
          const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
          if (errorData.trName != "i0018") return

          self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t('sys_err.a001')
          });
        }
      });
    },
    excuetKVS0Display(){  // KVS0 실시간 데이터 처리
      var self = this;
      self.updateRealDisplay(self.realDataKVS0);
    },
    excuetKVM2(){ // KVM2 실시간 데이터 처리
      var self = this;        
      self.getCurrentData['cumdealcost_24'] = self.realDataKVM2['cumdealcost_1440'];
    },
    registerReal() {  // 실시간 데이터 요청
      var self = this;
      
      self.$socket.unregisterReal('KVS0', [self.beforeSymbol], self.name);
      self.$socket.registerReal('KVS0', "symbol", [self.currentSymbol], self.name, function (queryData){
        
        // 리얼데이터 예외처리 Start
        if(queryData == null) return;
        self.realDataKVS0 = queryData.queryObj.OutBlock1[0];
        if(self.realDataKVS0 == null || self.realDataKVS0['symbol'] != self.currentSymbol) return;
        // 리얼데이터 예외처리 End

        self.realDataKVS0['curprc'] = self.realDataKVS0['execprice'];
        // self.$nextTick(function(){
        //   self.excuetKVS0Display();
        // });
        var now = new Date();
        if (self.checkCurrentDate < 0) {
          self.checkCurrentDate = now.getTime();
          self.excuetKVS0Display();
        } else {
          var gap = now.getTime() - self.checkCurrentDate;

          if (gap > 200) {
            self.excuetKVS0Display();
            self.checkCurrentDate = now.getTime();
          }
          setTimeout(function(){
            self.excuetKVS0Display();
          }, 100);
          gap = null;
        }
        now = null;
      });

      self.$socket.unregisterReal('KVM2', [self.beforeSymbol], self.name);
      self.$socket.registerReal('KVM2', 'symbol', [self.currentSymbol], self.name, function (queryData) {
        
        // 리얼데이터 예외처리 Start
        if(queryData == null) return;
        self.realDataKVM2 = queryData.queryObj.OutBlock1[0];
        if(self.realDataKVM2 == null || self.realDataKVM2['symbol'] != self.currentSymbol) return;
        // 리얼데이터 예외처리 End
        
        self.$nextTick(function(){
          self.excuetKVM2();
        });
      });        
    },
    registerRealMock() {  // 테스트 데이터 생성
      var self = this;

      setInterval(() => {
        var data = {};
        data['curprc'] = (Math.random()*1000).toFixed(4);
        data['highprc'] = (Math.random()*1000).toFixed(4);
        data['lowprc'] = (Math.random()*1000).toFixed(4);
        data['updnrate'] = parseFloat((Math.random()*10).toFixed(4));
        data['diff'] = parseFloat((Math.random()*10).toFixed(4));
        self.getCurrentData['cumdealcost_24'] = (Math.random()*10000000).toFixed(4);

        self.updateRealDisplay(data);

      }, 1000/self.mockCount);
    },
    getData() { // 데이터 요첟
      var self = this;
      self.requestNowPrice();
      
      if(self.isMock){  // 테스트 상태 분기
        self.registerRealMock();
      }else{
        self.registerReal();
      }
      
      if (this.$store.getters.isLoggedIn) {
        self.getNotiSettingList().then((obj)=> {
          self.CheckisNotiCurSymbol();
        }).catch(errorData => {
          self.$alert(errorData.errMsg, '', {
            confirmButtonText: this.$t('noti.b012')
          });
        });
      }
    },
    updateDisplay(data) { // 현재가 데이터 가공
      var self = this;
      this.getCurrentData = {
        curprc: data['curprc'],
        yesterdayprice: data['yesterdayprice'],
        paycurrcode: data['paycurrcode'],
        highprc: data['highprc'],
        lowprc: data['lowprc'],
        cumdealcost_24: data['cumdealcost_24'],
        updnrate: data['updnrate'].toFixed(2),
        diff: data['diff']
      };

      self.diffPrice = parseFloat(data['diff']);
      self.diffColor = '';
      if(self.diffPrice > 0) self.diffColor = 'red';
      if(self.diffPrice < 0) self.diffColor = 'blue';

      self.currentCoinMarket = _.findWhere(self.nameList, {o_symbol : self.currentSymbol})['o_inst_eng_abbr'];
      document.title = self.titleMap[self.$store.getters.getUnitcode] + ' - ' + self.currentCoinMarket+' '+self.prcFormat(data['curprc']);
    },
    updateRealDisplay(data) { // 현재가 실시간 데이터 가공
      var self = this;
      var oldCurprc = self.getCurrentData['curprc'];
      
      self.getCurrentData['curprc'] = data['curprc'];
      self.getCurrentData['highprc'] = data['highprc'];
      self.getCurrentData['lowprc'] = data['lowprc'];        
      self.getCurrentData['updnrate'] = data['updnrate'].toFixed(2);
      self.getCurrentData['diff'] = data['diff'];

      if(self.currentSymbol == ''){
        this.getCurrentData['diff'] = parseFloat(data['diff']).toFixed(1);
      }

      self.diffPrice = parseFloat(data['diff']);
      self.diffColor = '';

      if(self.diffPrice > 0) self.diffColor = 'red';
      if(self.diffPrice < 0) self.diffColor = 'blue';

      document.title = self.titleMap[self.$store.getters.getUnitcode] + ' - ' + self.currentCoinMarket+' '+self.prcFormat(data['curprc']);

      self = null;
      oldCurprc = null;
      data = null;
    },      
    setBuySellColor(value) {  // 등락 색상 처리
      if (value > 0) return 'red'
        else if (value < 0) return 'blue'
        else return ''
    },
    notiSettingVisibleClick() { // 알림설정 클릭시 동작
      if (!this.$store.getters.isLoggedIn) {
        alert(this.$t('exchange.a017'))
        return;
      }
      this.notiSettingVisible = true
    },
    CheckisNotiCurSymbol() {  // 알림설정 현재상태
      let self = this;
      
      for(var idx in self.notiSettingList) {

        if (self.notiSettingList[idx]['Code'] == self.currentSymbol) {
          
          self.isNotiCurSymbol = true
          return;
        }
      }
      self.isNotiCurSymbol = false
    },
    selectStockList(val) {  // 종목리스트 표시 여부
      if (val !== this.stockSymbol) {
        this.stockListVisible = false;
      } else {
        this.stockListVisible = true;
      }
    },
    // dataLoaded 값이 false일 경우 데이터 요청 처리
    // 동시 dataLoaded를 true로 변경하여 중복 요청 방지
    loadStockDataCallback(){ // loadStockData 이벤트 콜백 함수
      var self = this;
      if(self.dataLoaded) return;
      self.dataLoaded = true;
      self.getData();
    },
    // 신규상장, 소켓재접속등 데이터 재조회 필요시 받는 event 
    // resetLoadStockData 이벤트가 먼저 실행되어 dataLoaded 값이 false로 변경
    // 재조회 가능 상태로 처리
    resetLoadStockDataCallback(){ // resetLoadStockData 이벤트 콜백 함수
      var self = this;
      self.dataLoaded = false;
    },
    changeCurrentSymbolCallback(symbol){  // changeCurrentSymbol 이벤트 콜백 함수
      var self = this;
      self.getData();        
      self.CheckisNotiCurSymbol();
      self.selectStockList(symbol);
    },
    //App.vue로부터 알림설정 등록시 이벤트 받음
    CheckisRealNotiCurSymbol(symbol) {
      console.log("CheckisRealNotiCurSymbol", symbol);
      let self = this;
      console.log("CheckisRealNotiCurSymbol", self.isNotiCurSymbol);
      if (self.isNotiCurSymbol === false) {
        console.log("CheckisRealNotiCurSymbol", self.currentSymbol);
        if (symbol == self.currentSymbol) {
          self.isNotiCurSymbol = true;
        }
      }
    }
  },
  watch: {
    currentData(val, old) {

    }
  },
  created() {
    var self = this;

    self.$EventBus.$on('pc-insertNoti', self.CheckisRealNotiCurSymbol);

  },
  mounted() {
    var self = this;

    self.$EventBus.$on('loadStockData', self.loadStockDataCallback);
    self.$EventBus.$on('changeCurrentSymbol', self.changeCurrentSymbolCallback);
    self.$EventBus.$on('resetLoadStockData', self.resetLoadStockDataCallback);

    if(self.nameList.length > 0 && !self.dataLoaded){
      self.$EventBus.$emit('loadStockData');
    }
  },
  beforeDestroy() {
    var self = this;

    self.$socket.unregisterReal('KVS0', [self.currentSymbol], self.name);
    self.$socket.unregisterReal('KVM2', [self.currentSymbol], self.name);

    self.$EventBus.$off('loadStockData', self.loadStockDataCallback);
    self.$EventBus.$off('resetLoadStockData', self.resetLoadStockDataCallback);
    self.$EventBus.$off('changeCurrentSymbol', self.changeCurrentSymbolCallback);

    self.$EventBus.$off('pc-insertNoti', self.CheckisRealNotiCurSymbol);
  }
};
</script>