<template>
  <div class="StockPrice">
    <div class="basic-table el-table el-table--fit el-table--scrollable-y el-table--enable-row-hover">
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%;">
          <colgroup>
            <col>
            <col width="65">
            <col width="110">
          </colgroup>
          <thead class="">
            <tr class="">
              <th colspan="1" rowspan="1" class="el-table_11_column_52 is-leaf">
                <div class="cell"><!-- 가격 -->{{ $t('exchange.c001') }}({{$_.findWhere(nameList, {o_symbol : currentSymbol}) | codeFilter}})</div>
              </th>
              <th colspan="1" rowspan="1" class="el-table_11_column_53 is-right is-leaf">
                <div class="cell"><!-- 대비 -->{{ $t('exchange.c002') }}</div>
              </th>
              <th colspan="1" rowspan="1" class="el-table_11_column_54 is-right is-leaf">
                <div class="cell"><!-- 수량 -->{{ $t('exchange.c003') }}({{$_.findWhere(nameList, {o_symbol : currentSymbol}) | coinFilter}})</div>
              </th>
            </tr>
          </thead>
        </table>
      </div>

      <!-- 30호가 -->
      <el-scrollbar wrap-class="scrollbar-wrapper" :native="false" id="Asking30" class="price-table">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
          <colgroup>
            <col>
            <col width="65">
            <col width="100">
            <col width="10">
          </colgroup>
          <tbody>

            <!-- 매도 호가 -->
            <tr v-for="item in sellAsking30" @click="didClickHoga2(item.id)" :key="item.value" class="el-table__row" :id="item.id">
              <td>
                <div class="cell">
                  <span class='arrow' :class="item.arrowColor">{{item.arrowColor?'▶':''}}</span>
                  <span :class="item.colorState" class='prc'>
                    {{item.askStr}}
                  </span>
                </div>
              </td>
              <td class="is-right">
                <div class="cell">
                  <span :class="item.colorState" class='updown'>{{item.updownRateStr}}</span>
                </div>
              </td>
              <td class="is-right" :style="{ fontSize: amountFontSize + 'px'}">
                <div class="amount">{{item.askrest}}</div>
                <!-- 그래프 표시 -->
                <span class="graph blue" :style="{width: item.askrestWidth+ '%'}"></span>
                <!-- 수량이 새로 생기거나 변경될 때 나타남 -->
                <span v-if="item.compqtyYN" class="blink"></span>
              </td>
              <td></td>
            </tr>

            <!-- 체결가 -->
            <tr @click="didClickHoga(getCurrentData['curprc'])">
              <td colspan="4" :class="chkStrLength(getCurrentData['curprc'])">
                <div class="cell">
                  <span class="bArrow red" v-if="bArrowRed">▲</span>
                  <span class="bArrow blue" v-if="bArrowBlue">▼</span>
                  <span :class="curColor">
                    {{getCurrentData['curprc'] | prcFilter}}
                    <span class="unit">{{getCurrentData['paycurrcode']}}</span>
                  </span>
                  <!-- 체결가 변동 시 깜빡임 -->                  
                  <span :class="bdColor"></span>
                  <span v-if="getCurrentData['paycurrcode'] == 'BTC'" class="krw_txt">≈{{(getCurrentData['curprc'] * currentBtcKrPrice) | krPriceFilter}} KRW</span>
                  <span v-if="getCurrentData['paycurrcode'] == 'ETH'" class="krw_txt">≈{{(getCurrentData['curprc'] * currentEthKrPrice) | krPriceFilter}} KRW</span>
                </div>                
              </td>
            </tr>

            <!-- 매수 호가 -->
            <tr v-for="item in buyBiding30" :key="item.value" @click="didClickHoga2(item.id)" class="el-table__row" :id="item.id">
              <td>
                <div class="cell">
                  <span class='arrow' :class="item.arrowColor">{{item.arrowColor?'▶':''}}</span>
                  <span :class="item.colorState" class='prc'>
                    {{item.bidStr}}
                  </span>
                </div>
              </td>
              <td class="is-right">
                <div class="cell">
                  <span :class="item.colorState" class='updown'>{{item.updownRateStr}}</span>
                </div>
              </td>
              <td class="is-right">
                <div class="amount" :style="{ fontSize: amountFontSize + 'px'}">{{item.bidrest}}</div>
                <!-- 그래프 표시 -->
                <span class="graph red" :style="{width: item.bidrestWidth+ '%'}"></span>
                <!-- 수량이 새로 생기거나 변경될 때 나타남 -->
                <span v-if="item.compqtyYN" class="blink"></span>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </el-scrollbar>
      <div class="el-table__column-resize-proxy" style="display: none;"></div>
    </div>
  </div>
</template>
<script>
  import { _ } from 'vue-underscore';
  import { mapState, mapGetters } from 'vuex';
  import MobileDetect from 'mobile-detect';
  import { setTimeout, clearTimeout } from 'timers';
  import fromExponential from 'from-exponential';
  export default {
    data() {
      return {
        name: 'StockPrice',
        getCurrentData: {
          curprc: '',         // 현재가
          paycurrcode: '',    // 현재마켓코드
        },        
        yesterdayPrice : 0,     // 전일가
        maxNum: 0,              // 호가잔량 max
        curColor: '',           // 현재가 색상
        bdColor: '',            // 체결시 테두리 색
        timer: null,            // 테두리색 유지
        bArrowRed: false,       // 상승화살표
        bArrowBlue: false,      // 하락화살표
        buyBiding30: [],        // 매수호가 데이터
        sellAsking30: [],       // 매도호가 데이터
        searchNotSignList : [], // 미체결내역 데이터
        minOrdQty: 0,           // 최소주문수량
        minOrdQtyLen: 0,        // 최소주문수량 소수점 자리수
        ordUnitQty: 0,          // 주문단위수량
        ordUnitQtyLen: 0,       // 주문단위수량 소수점 자리수
        dataLoaded: false,      // 데이터 로드 상태
        updateData: true,       // 데이터 업데이트 상태
        amountFontSize: 0,      // 수량 폰트사이즈
        hogaFontSize: 0         // 호가 폰트사이즈
      };
    },   
    filters: {
      prcFilter: function (obj) { // 체결가 출력 형식
        if(obj == null) return '';
        obj = obj.toString();
        if(obj == '') return '';
        
        if(obj.indexOf('.')>-1){
          if(parseFloat(obj)>0){
            var val1 =  UnitManager.numberWithCommas(parseInt(obj))
            var val2 = obj.split('.')[1];
            return val1+'.'+val2;
          }else{
            return obj;
          }
        }else{
          return UnitManager.numberWithCommas(obj)
        }
      },
      codeFilter: function (obj) {  // 마켓코드 출력 형식
        if (obj == null) return ''
        var abbr = obj['o_inst_eng_abbr'];
        var strs = abbr.split("/");        
        if (strs.length > 1) return strs[1]
        return ''
      },
      coinFilter: function (obj) { // 종목코드 출력 형식
        if (obj == null) return ''
        var abbr = obj['o_inst_eng_abbr'];
        var strs = abbr.split("/");        
        if (strs.length > 1) return strs[0]
        return ''
      },
      krPriceFilter: function (number) { // 한화환산가 출력 형식
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
          if(number > 0){
            var num = number.toFixed(10);
            var val1 = UnitManager.numberWithCommas(parseInt(number))
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
      // restFilter: function(obj){ // 호가잔량 출력 형식
      //   if(obj=='') return '';
      //   var fixedVal = 0;
      //   var nstr = obj.toString();
      //   var number = parseFloat(obj);

      //   if(nstr.indexOf('.') > -1){
      //     if(number > 0){            
      //       var val1 = UnitManager.numberWithCommas(parseInt(number))
      //       var val2 = nstr.toString().split('.')[1];          
      //       return val1+'.'+val2;
      //     }else{
      //       return nstr;
      //     }
      //   }else{
      //     return UnitManager.numberWithCommas(parseInt(number))
      //   }
      // },
      // restFilterMobile: function(obj){ // 호가잔량 출력 형식 (모바일)
      //   if(obj == '') return;
        
      //   var num = parseFloat(obj.toString().replace(/,/ig,''));

      //   if(obj.indexOf('.')>-1){
      //     var num = parseFloat(obj.toString().replace(/,/ig,''));
      //     return obj.split('.')[0]+'.'+num.toFixed(4).split('.')[1]
      //   }else{
      //     return obj+'.0000';
      //   }
      // }
    },
    computed: {
      ...mapState({
        nameList: state => state.data['n1001'],        
        currentPayCurrCode: state => state.data.currentPayCurrCode,
        currentSymbol: state => state.data.currentSymbol,
        beforeSymbol: state => state.data.beforeSymbol,
        trSymbols: state => state.data.trSymbols,
        currentBtcKrPrice: state => state.data.currentBtcKrPrice,
        currentEthKrPrice: state => state.data.currentEthKrPrice
      }),
      ...mapGetters(['getUserId']),
      isPC(){
        return afc.isPC;
      }
    },
    methods: {
      prcFormat(obj) {  // 현재가 출력 형식
        if(obj == null) return '';
        obj = obj.toString();
        if(obj == '') return '';
        
        if(obj.indexOf('.')>-1){
          if(parseFloat(obj)>0){
            var val1 =  UnitManager.numberWithCommas(parseInt(obj))
            var val2 = obj.split('.')[1];
            return val1+'.'+val2;
          }else{
            return obj;
          }
        }else{
          return UnitManager.numberWithCommas(obj)
        }
      },
      restFormat: function(obj){  // 호가잔량 출력 형식
        if (obj == null || obj == '') {
          return '';
        }
        var number = parseFloat(obj).toFixed(10);
        return UnitManager.numberWithCommas(afc.floor(number, 4));
      },
      updownRateFormat(obj) { // 변동률 출력 형식
        var num = obj;
        if (num > 999.99) {
          return "+999.99";
        } else if (num < -999.99) {
          return "-999.99";
        }
        return num.toFixed(2);
      },      
      chkStrLength(_srt) { // 글자수 15 초과시 class 적용
        if(_srt == null) return '';
        var length, result_str;
        _srt = _srt.toString();
        if(_srt == '') result_str = '';
        
        if(_srt.indexOf('.')>-1){
          if(parseFloat(_srt)>0){
            var val1 = UnitManager.numberWithCommas(parseInt(_srt))
            var val2 = _srt.split('.')[1];
            result_str = val1+'.'+val2;
          }else{
            result_str = _srt;
          }
        }else{
          result_str = UnitManager.numberWithCommas(_srt)
        }
        
        length = result_str.length;
        
        if (length > 14) {
          return 'fs15';
        }
      },      
      createEmptyObject() { // 빈 매수/매도 데이터 생성
		    var self = this;
        self.buyBiding30 = [];
        self.sellAsking30 = [];
        for (var i = 0; i < 30; i++) { // 매수/매도 30호가
          var bidObj = {
            bid: '',
            bidrest: '',
            bfrbuycompqty: '',
            undownRate: '',
            bidrestWidth: 0,
            bidPreSame: false,
            colorState: '',
            colorStateBS: '',
            compqtyYN: false,
            updownRate: ''
          };
          self.buyBiding30.push(bidObj);
          var askObj = {
            ask: '',
            askrest: '',
            bfrsellcompqty: '',
            undownRate: '',
            askrestWidth: 0,
            askPreSame: false,
            colorState: '',
            colorStateBS: '',
            compqtyYN: false,
            updownRate: ''
          };
          self.sellAsking30.push(askObj);          
        }
      },      
      mergeData(obj) { // 매수/매도 데이터 가공
        var self = this;

        self.maxNum = 0;
        var basePrice = self.yesterdayPrice;
        var findObj = _.findWhere( self.nameList, {o_symbol : self.currentSymbol});
        var coinCode = findObj['o_inst_eng_abbr'].split('/')[0];
        var oOrdUnitQty = fromExponential(findObj['o_ord_unit_qty']).toString();
        var oOrdUnitQtyLen = 0;  // 소수점 자리수 처리 toFixed() 기준값
        var asklist = [];
        var bidlist = [];

        if(oOrdUnitQty.indexOf('.')>-1){
          oOrdUnitQtyLen = oOrdUnitQty.split('.')[1].indexOf('1')+1
        }

        var maxLength = 0;
        var maxHogaLength = 0;
        for (var i = 0; i < 30; i++) {

          var objCnt = i + 1;

          // -------- 매도 - ask
          var askObj = {
            ask: obj['ask' + objCnt], // 매도 호가         
            askStr: '',   
            askrest: parseFloat(obj['askrest' + objCnt]).toFixed(oOrdUnitQtyLen), // 매도 호가 잔량
            bfrsellcompqty: obj['bfrsellcompqty' + objCnt], // 직전 매도 대비 잔량
            askrestWidth: 0, // 수량 가로 크기
            askPreSame: false,            
            colorState: '',
            arrowColor: '',
            compqtyYN: false,
            id: 'ask'+i
          };

          if(askObj['ask'] != 0){
            if (basePrice < askObj['ask']) {
              askObj.updownRate = Math.floor(self.updownRate(basePrice, askObj['ask'])*100)/100;
              askObj.updownRateStr = self.updownRateFormat(askObj.updownRate)+'%';
              askObj.colorState = 'red';
              askObj.updownRateStr = '+' + askObj.updownRateStr;
            } else if (basePrice > askObj['ask']) {
              askObj.updownRate = Math.ceil(self.updownRate(basePrice, askObj['ask'])*100)/100;
              askObj.updownRateStr = self.updownRateFormat(askObj.updownRate)+'%';
              askObj.colorState = 'blue';
              if (askObj.updownRateStr.indexOf('-') < 0) {
                askObj.updownRateStr = '-' + askObj.updownRateStr;
              }
            } else {
              askObj.updownRate = 0;
              askObj.updownRateStr = self.updownRateFormat(askObj.updownRate)+'%';
            }
            if (self.maxNum < parseFloat(askObj['askrest'])) {
              self.maxNum = parseFloat(askObj['askrest']);
            }
            askObj.askStr = self.prcFormat(askObj.ask);
            askObj.askrest = askObj.askrest;
            if(!self.updateData) askObj.compqtyYN = askObj.bfrsellcompqty != 0;
          }else{
            askObj.ask = '';
            askObj.askrest = '';
            askObj.updownRate = '';
            askObj.updownRateStr = '';
            askObj.colorState = '';
          }
          if (askObj.askrest.length > maxLength) {
            maxLength = askObj.askrest.length;
          }
          if (askObj.askStr.length > maxHogaLength) {
            maxHogaLength = askObj.askStr.length;
          }

          asklist.push(askObj);

          // ----------- 매수 - bid          
          var bidObj = {
            bid: obj['bid' + objCnt], // 매수 호가            
            bidStr: '',
            bidrest: parseFloat(obj['bidrest' + objCnt]).toFixed(oOrdUnitQtyLen), // 매수 호가 잔량
            bfrbuycompqty: obj['bfrbuycompqty' + objCnt], // 직전 매수 대비 수량
            bidrestWidth: 0,
            bidPreSame: false,            
            colorState: '',
            arrowColor: '',
            compqtyYN: false,
            id: 'bid'+i
          };

          if(bidObj['bid'] != 0){
            if (basePrice < bidObj['bid']) {
              bidObj.updownRate = Math.floor(self.updownRate(basePrice, bidObj['bid'])*100)/100;
              bidObj.updownRateStr = self.updownRateFormat(bidObj.updownRate)+'%';
              bidObj.colorState = 'red';
              bidObj.updownRateStr = '+' + bidObj.updownRateStr;
            } else if (basePrice > bidObj['bid']) {
              bidObj.updownRate = Math.ceil(self.updownRate(basePrice, bidObj['bid'])*100)/100;
              bidObj.updownRateStr = self.updownRateFormat(bidObj.updownRate)+'%';
              bidObj.colorState = 'blue';
              if (bidObj.updownRateStr.indexOf('-') < 0) {
                bidObj.updownRateStr = '-' + bidObj.updownRateStr;
              }
            } else {
              bidObj.updownRate = 0;
              bidObj.updownRateStr = self.updownRateFormat(bidObj.updownRate)+'%';
            }
            if (self.maxNum < parseFloat(bidObj['bidrest'])) {
              self.maxNum = parseFloat(bidObj['bidrest']);
            }
            bidObj.bidStr = self.prcFormat(bidObj.bid);
            bidObj.bidrest = bidObj.bidrest;
            if(!self.updateData) bidObj.compqtyYN = bidObj.bfrbuycompqty != 0;
          }else{
            bidObj.bid = '';
            bidObj.bidrest = '';
            bidObj.updownRate = '';
            bidObj.updownRateStr = '';
            bidObj.colorState = '';
          }
          if (bidObj.bidrest.length > maxLength) {
            maxLength = bidObj.bidrest.length;
          }
          if (bidObj.bidStr.length > maxHogaLength) {
            maxHogaLength = bidObj.bidStr.length;
          }

          bidlist.push(bidObj);
        } // 매수,매도 30개 처리 완료

        for (var i = 0; i < 30; i++) {

          // 그래프 width
          if(self.maxNum == 0){
            asklist[i].askrestWidth = 0;
            bidlist[i].bidrestWidth = 0;
          }else{
            asklist[i].askrestWidth = Math.round(asklist[i].askrest / self.maxNum * 100);
            bidlist[i].bidrestWidth = Math.round(bidlist[i].bidrest / self.maxNum * 100);

            //그래프 계산후 호가형식 지정
            asklist[i].askrest = self.restFormat(asklist[i].askrest);
            bidlist[i].bidrest = self.restFormat(bidlist[i].bidrest);
          }

          // 미체결 상태처리
          for (var j = 0; j < self.searchNotSignList.length; j++) {            
            var searchNotSignSymbol = self.searchNotSignList[j].symbol;
            var searchNotSignPrc = Number(self.searchNotSignList[j].ord_prc);
            var searchNotSignTp = self.searchNotSignList[j].buy_sell_tp;

            if(self.currentSymbol == searchNotSignSymbol && searchNotSignPrc != 0){
              if(asklist[i]['ask'] == searchNotSignPrc){
                asklist[i]['searchNotSignTp'] = searchNotSignTp;
                asklist[i]['arrowColor'] = searchNotSignTp!='1'?'red':'blue'
              }
              if(bidlist[i]['bid'] == searchNotSignPrc){                                
                bidlist[i]['searchNotSignTp'] = searchNotSignTp;
                bidlist[i]['arrowColor'] = searchNotSignTp!='1'?'red':'blue'
              }
            }
          }
        }

        setTimeout(() => { // 변동 효과 초기화
          for(var i=0;i<30;i++){
            self.sellAsking30[i].compqtyYN = false;
            self.buyBiding30[i].compqtyYN = false;
          }
        }, 200);

        if (self.setHogaFontSize) {
          self.setHogaFontSize(maxHogaLength);
        }
        self.setAmountFontSize(maxLength);
        
        if(self.updateData){ // 조회,실시간 구분 - 조회
          self.sellAsking30 = asklist.reverse();
          self.buyBiding30 = bidlist;
        }else{ // 조회,실시간 구분 - 실시간
          asklist = asklist.reverse()
          for (var i = 0; i < 30; i++) {
            if(self.sellAsking30[i].ask !='' || asklist[i].ask !=''){
              Object.assign(self.sellAsking30[i], asklist[i])
              // console.log('self.sellAsking30[i]',self.sellAsking30[i].askrest)
            }
            if(self.buyBiding30[i].bid !='' || bidlist[i].bid !=''){
              Object.assign(self.buyBiding30[i], bidlist[i])
              // console.log('self.buyBiding30[i]',self.buyBiding30[i].bidrest)
            }            
          }
        }
      },
      request30() { // 호가데이터 조회
        var self = this;
        self.updateData = true;

        self.$socket.sendProcessByName('i0011', (queryData) => {
          var block = queryData.getBlockData('InBlock1')[0];
          // 조회구분
          block['symbol'] = self.currentSymbol;
        }, (returnData) => {
          if (returnData == null) {
            console.log("returnData is null");
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "i0011") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: self.$t('sys_err.a001')
            });
          } else {

            // 조회 예외처리 Start
            if(self.sellAsking30.length == 0) return;
            var obj = returnData.queryObj.OutBlock1[0];
            if(obj == null || self.currentSymbol != obj.symbol) return;
            // 조회 예외처리 End

            //현재가 처리
            self.updateDisplay(obj);

            //매수매도 30호가처리
            self.mergeData(obj);
            self.updateData = false;
            
            self.registerReal();
          }
        })
      },      
      setBuySellColor(value) {  // 매수/매도 색상 처리
        if (value > 0) return 'red'
        else if (value < 0) return 'blue'
        else return ''
      },
      realTimeNotSignUpdate(addRemoveTp, addRemoveObj) {  // 미체결내역 실시간 처리
        let self = this
        for(let i = 0; i<30; i++) {
          self.sellAsking30[i]['searchNotSignTp'] = ''
          self.sellAsking30[i]['arrowColor'] = ''
          self.buyBiding30[i]['searchNotSignTp'] = ''
          self.buyBiding30[i]['arrowColor'] = ''

          for (let j = 0; j < self.searchNotSignList.length; j++) {
            let searchNotSignSymbol = self.searchNotSignList[j].symbol;
            let searchNotSignPrc = Number(self.searchNotSignList[j].ord_prc);
            let searchNotSignTp = self.searchNotSignList[j].buy_sell_tp;

            if(self.currentSymbol == searchNotSignSymbol && searchNotSignPrc != 0){

              if(self.sellAsking30[i]['ask'] == searchNotSignPrc){
                
                self.sellAsking30[i]['searchNotSignTp'] = searchNotSignTp;
                self.sellAsking30[i]['arrowColor'] = searchNotSignTp!='1'?'red':'blue'
              }
              if(self.buyBiding30[i]['bid'] == searchNotSignPrc){                                
                
                self.buyBiding30[i]['searchNotSignTp'] = searchNotSignTp;
                self.buyBiding30[i]['arrowColor'] = searchNotSignTp!='1'?'red':'blue'
              }
            }
          }
        }
      },
      updateDisplay(data) { // 현재가 조회 처리        
        var self = this;
        self.yesterdayPrice = data['curprc'] - data['diff'];
        self.getCurrentData = {
          curprc: data['curprc'],
          paycurrcode: data['paycurrcode'],
        };
        self.curColor = self.setBuySellColor(data['curprc'] - self.yesterdayPrice);
      },
      updateRealDisplay(data) { // 현재가 실시간 데이터 처리
        var self = this;

        //현재가영역 timer 초기화
        if (self.timer) {
          clearTimeout(self.timer);
          self.bdColor = '';
          self.bArrowRed = false;
          self.bArrowBlue = false;
        }

        //현재가 대비 상승하락 화살표
        let prevPrice = parseFloat(self.getCurrentData['curprc']);
        let curPrice = parseFloat(data['execprice']);
        if (prevPrice < curPrice) {
          self.bArrowRed = true;
        } else if (prevPrice > curPrice) {
          self.bArrowBlue = true;
        }

        //현재가 셋팅
        self.getCurrentData['curprc'] = data['execprice'];
        
        //현재가영역 글자색
        self.curColor = self.setBuySellColor(data['execprice'] - self.yesterdayPrice);
        
        self.bdColor = data['exectype'] == '1' ? 'price-down' : 'price-up';
        self.timer = setTimeout(() => {
          self.bdColor = '';
          self.timer = null;
          self.bArrowRed = false;
          self.bArrowBlue = false;
        }, 1000);
      },
      updownRate(basePrice, hogaPrice) {  // 변동률 처리
        if (basePrice == 0) return 999.99;
        var val = (((hogaPrice / basePrice) * 100) - 100);        
        return val;
      },
      didClickHoga(price) { // 호가 클릭시 동작
        var self = this;
        if (price == 0) return;
        self.$EventBus.$emit('changeHoga', price);
      },
      didClickHoga2(id) { // 호가 클릭시 동작
        var self = this;
        var prc = document.getElementById(id).getElementsByClassName('prc')[0].innerText.trim().replace(/,/ig,'');        
        if (prc == '') return;
        self.$EventBus.$emit('changeHoga', parseFloat(prc));
      },
      getSearchNotSignList() {  // 미체결내역 조회 요청
        let self = this;

        this.$socket.sendProcessByName('b0001', 
          function (queryData) 
          {
            var block = queryData.getBlockData('InBlock1')[0];
            block['user_id'] = self.$store.state.user.user_id;      // 계정ID
            block['qry_ord_tp'] = '0';                              // 조회주문구분
            block['qry_cond_tp'] = '0';                             // 조회조건구분
            block['symbol'] = self.$store.state.data.currentSymbol; // 종목코드
            block['buy_sell_tp'] = null;                            // 매수도구분
            block['qry_auto_trd_tp'] = null;                        // 조회자동매매구분
            block['req_cnt'] = "60";                                // 요청건수 : 30호가 (매수30건 + 매도 30건 => 최대 60건)
          },
          function (queryData)
          {
            if (queryData == null) {
              // 전문 에러 언어팩 적용
              const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
              if (errorData.trName != "b0001") return

              self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: self.$t('sys_err.a001')
              });
              return;
            }
            self.searchNotSignList = queryData.queryObj.OutBlock2;
            self.realTimeNotSignUpdate();
          }
        );
      },      
      registerReal() {  // 리얼 데이터 조회 요청
        var self = this;

        self.$socket.unregisterReal('KVS0', [self.beforeSymbol], self.name);
        self.$socket.registerReal('KVS0', "symbol", [self.currentSymbol], self.name,
          function (returnData) {
            if (returnData != null) {

              // 리얼데이터 예외처리 Start
              var obj = returnData.queryObj.OutBlock1[0];
              if (obj == null || self.currentSymbol != obj.symbol) return;
              // 리얼데이터 예외처리 End
              
              self.updateRealDisplay(obj);
            }
          });

        self.$socket.unregisterReal('KVH2', [self.beforeSymbol], self.name);
        self.$socket.registerReal('KVH2', 'symbol', [self.currentSymbol], self.name,
          function (returnData) {            
            if (returnData != null) {

              // 리얼데이터 예외처리 Start
              if (self.sellAsking30.length == 0) return;
              var obj = returnData.queryObj.OutBlock1[0];
              if (obj == null || self.currentSymbol != obj.symbol) return;
              // 리얼데이터 예외처리 End

              self.mergeData(obj);
            }
          });

        if (self.getUserId != null) {
          self.$socket.unregisterReal('RB03', [self.$store.state.user.user_id], self.name);
          self.$socket.registerReal('RB03', 'key_user_id', [self.$store.state.user.user_id], self.name,
          function (queryData) {
            
            var resData = queryData.getBlockData('OutBlock1')[0];

            if (resData !== undefined || resData !== null) {
              //----- 미체결 data set START -----//
                if (resData.evnt_tp == '1') { // 주문확인(신규주문)
                    
                    self.searchNotSignList.unshift(resData)
                    self.realTimeNotSignUpdate(0, resData);
                    return;
                }

                for (var idx in self.searchNotSignList) {
                    var item = self.searchNotSignList[idx]

                    if (resData.evnt_tp == '2') { // 주문거부

                        if (parseInt(item.ord_no) == parseInt(resData.ord_no)) { // ord_no = 주문번호
                            
                            self.searchNotSignList.splice(idx, 1)
                            self.realTimeNotSignUpdate(1, resData);
                            return
                        }
                    } else if (resData.evnt_tp == '6') { // 체결
                        
                        if (parseInt(item.ord_no) == parseInt(resData.ord_no)) {
                            
                            if (resData.ord_prc_tp == '1') { // 시장가 주문
                                
                                if (resData.all_cntr_yn == 'Y') { //전체체결 여부
                                    
                                    self.searchNotSignList.splice(idx, 1)

                                    for (var inIdx in self.searchNotSignList) {

                                      if (self.searchNotSignList[inIdx]['ord_prc'] == resData['ord_prc']) return;
                                    }
                                    self.realTimeNotSignUpdate(1, resData);
                                    return
                                }
                            } else {

                                if (resData.remn_qty <= 0) { //잔여수량 <= 0
                                    
                                    self.searchNotSignList.splice(idx, 1)

                                    for (var inIdx in self.searchNotSignList) {

                                      if (self.searchNotSignList[inIdx]['ord_prc'] == resData['ord_prc']) return;
                                    }
                                    self.realTimeNotSignUpdate(1, resData);
                                    return;
                                }
                            }

                            self.searchNotSignList.splice(idx, 1);
                            self.searchNotSignList.splice(idx, 0, resData);

                            self.realTimeNotSignUpdate(0, resData);
                            return;
                        }
                    } else if (resData.evnt_tp == '5') { // 자동취소 '5'이면 주문번호끼리 비교해서 자동삭제 한다.

                        if (parseInt(item.ord_no) == parseInt(resData.ord_no)) {
                            
                            self.searchNotSignList.splice(idx, 1)
                            self.realTimeNotSignUpdate(1, resData);
                            return;
                        }
                    }

                    // 주문번호와 원주문번호를 비교해서 갱신한다.
                    if (parseInt(item.ord_no) == parseInt(resData.org_ord_no)) {
                        
                        if (resData.evnt_tp == '3') { // 정정확인

                            if (Math.abs(parseFloat(item.remn_qty) - parseFloat(resData.cnfm_qty)) < NumberUtil.EPSILON || item.remn_qty <= 0) {
                              
                              self.searchNotSignList.splice(idx, 1)
                              self.realTimeNotSignUpdate(1, resData);
                            } else {
                              self.realTimeNotSignUpdate(0, resData);
                            }

                            if (parseFloat (resData.ord_qty) > 0) {
                              
                              self.searchNotSignList.unshift(resData);
                              self.realTimeNotSignUpdate(0, resData);
                            }
                            return;
                        } else { // 미체결 취소
                            if (parseFloat(item.remn_qty) <= parseFloat(resData.cnfm_qty)) {

                                self.searchNotSignList.splice(idx, 1)
                                self.realTimeNotSignUpdate(1, resData);
                                return;
                            }
                            self.realTimeNotSignUpdate(0, resData);
                            return;
                        }
                    }
                }

                // 정정시 체결이 먼저 일어났을 때
                if (resData.evnt_tp == '3' && parseFloat(resData.ord_qty) > 0) {
                    self.searchNotSignList.unshift(resData);
                    self.realTimeNotSignUpdate(0, resData);
                }
                //----- 미체결 data set END -----//
            }
          });
        }        
      },
      //현재종목에 대한 최소주문주량, 주문단위수량 저장
      setHogaFormatQty() {
        var self = this;
        var currentSymbol = self.$store.state.data.currentSymbol;
        self.minOrdQty = _.findWhere(self.nameList, {o_symbol : currentSymbol})["o_min_ord_qty"]; 
        self.minOrdQtyLen = self.minOrdQty.toString().indexOf("1")-1;
        self.ordUnitQty = _.findWhere(self.nameList, {o_symbol : currentSymbol})["o_ord_unit_qty"];
        self.ordUnitQtyLen = self.ordUnitQty.toString().indexOf("1")-1;
      },         
      scrollMobile(){ // 모바일 스크롤 처리
        var self = this;

        if (!self.isPC) {
          var pH = $('#Asking30').parent().height(); // 527
          var aH = $('#Asking30').height();  // 2500
          var top = (aH - pH)/2;
          $('#Asking30').parent().scrollTop(top);
        }
      },
      getData(){  // 데이터 요청
        var self = this;
        self.setHogaFormatQty();

        if (self.getUserId != null) {
          self.getSearchNotSignList();
        }
        self.request30();
      },
      // dataLoaded 값이 false일 경우 데이터 요청 처리
      // 동시 dataLoaded를 true로 변경하여 중복 요청 방지
      loadStockDataCallback(){  // loadStockData 이벤트 콜백 함수
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
        //self.$EventBus.$emit('realCountAdd');
      },
      // --------------------------------------------------------------------
      setAmountFontSize(length) { // 텍스트 크기 조절
        if(length <= 18 ) {
          this.amountFontSize = 12;
        } else {
          this.amountFontSize = 10;
        }
      }
      // --------------------------------------------------------------------
    },    
    created() {
      var self = this;
      self.createEmptyObject();
    },
    mounted() {
      var self = this;

      self.$EventBus.$on('loadStockData', self.loadStockDataCallback);
      self.$EventBus.$on('changeCurrentSymbol', self.changeCurrentSymbolCallback);
      self.$EventBus.$on('resetLoadStockData', self.resetLoadStockDataCallback);      

      if(self.nameList.length > 0 && !self.dataLoaded){
        self.$EventBus.$emit('loadStockData');
      }

      setTimeout(() => { // 모바일 UI 처리
        self.scrollMobile();
      }, 500);
    },
    updated() {
      var self = this;
      if(self.isPC) {
        /* 풀스크린 시 기본 호가 리스트 스크롤 중앙으로 이동 */
        var obj = document.getElementById('Asking30').childNodes;
        var objHeight = obj[0].offsetHeight;
        var tbl = obj[0].childNodes;
        var tblHeight = tbl[0].offsetHeight;
        var scrollPos = (tblHeight - objHeight) / 2;
        obj[0].scrollTop = scrollPos;
      }
    },
    beforeDestroy() {
      var self = this;
      self.$socket.unregisterReal('KVS0', [self.currentSymbol], self.name);
      self.$socket.unregisterReal('KVH2', [self.currentSymbol], self.name);
      self.$socket.unregisterReal('RB03', [self.$store.state.user.user_id], self.name);
      
      self.$EventBus.$off('loadStockData', self.loadStockDataCallback);
      self.$EventBus.$off('resetLoadStockData', self.resetLoadStockDataCallback);
      self.$EventBus.$off('changeCurrentSymbol', self.changeCurrentSymbolCallback);
    },
    destroyed() {
      
    }
  };
</script>
