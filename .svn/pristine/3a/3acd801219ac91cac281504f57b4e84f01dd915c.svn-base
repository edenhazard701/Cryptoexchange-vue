<template>
  <div class="OrderVue">
    <div v-if="isVertical || selectedTabIndex == '0' || selectedTabIndex == '1'" class="stock-display">
      <el-row>
        <el-col :span="2" class="star-ico-bx">
          <el-checkbox v-model="isMySymbol" @change="onFavoriteClick">
            <i :class="isMySymbol? 'el-icon-star-on':'el-icon-star-off'"></i>
          </el-checkbox>
        </el-col>
        <el-col class="data-order-bx">
          <el-col :span="10" class="payment-txt-bx">
            <div class="top-data">
              <!-- <span :class="diffColor" class="count-number" >{{getCurrentData['curprc'] | prcFormat}}</span> -->
              <span :class="[diffColor, setSmallCurPrc(getCurrentData['curprc'])]" class="count-number">{{prcFormat(getCurrentData['curprc'])}}</span>
              <span class="krw_txt">{{getCurrentData['paycurrcode']}}</span>
            </div>
            <!-- 전월 대비 상승 : red / 전월 대비 하락 : blue -->
            <!-- <div>{{format(getCurrentData['krwchg'])}}<span class="krw_txt">KRW</span></div> -->

            <div v-show="getCurrentData['paycurrcode'] == 'BTC'" class="data-txt">{{format(getCurrentData['curprc'] *
              currentBtcKrPrice)}} <span class="krw_txt">KRW</span></div>
            <div v-show="getCurrentData['paycurrcode'] == 'ETH'" class="data-txt">{{format(getCurrentData['curprc'] *
              currentEthKrPrice)}}<span class="krw_txt"> KRW</span></div>

          </el-col>
          <el-col :span="5" class="change-txt-bx">
            <span class="tit">{{$t('m_exchange.c001')}}</span>
            <span :class="diffColor" class="per_txt"> {{getCurrentData['updnrate'] > 0 ? '+' +
              getCurrentData['updnrate'] : getCurrentData['updnrate'] }}% </span>
            <span :class="diffColor" class="arrow_txt">
              <span class="graph-show-info">
                {{diffPrice | rateSymbol}}{{diffFormat(diffPrice)}}
              </span>
              <!-- {{scaleChange}} -->
            </span>
            <!-- 상승 : red / 하락 :blue -->
          </el-col>
        </el-col>
        <el-col :span="6" class="graph-bx">
          <!-- 4초에 한번씩 내용전환(롤링) // 내용: 1번 고가, 저가 표시 <-> 3번 거래금액 -->
          <!-- 고가, 저가 표시 영역 -->
          <div class="stock_graph_bx">
            <span class="blue tit">{{$t('m_exchange.c003')}}</span>
            <span class="red tit">{{$t('m_exchange.c002')}}</span>
            <span class="data">{{prcFormat(getCurrentData['highprc'])}}</span>
            <span class="stock_graph">
              <span class="graph" :style="{left: curGraphPos + '%'}">
                <span class="tit_rnd"></span>
              </span>
            </span>
            <span class="data low_data">{{prcFormat(getCurrentData['lowprc'])}}</span>
          </div>
          <!-- //고가, 저가 표시 영역 -->
          <!-- 거래 금액 및 환산 금액 표시 -->
          <!-- <div class="deal-price-wrap">
                        <span class="tit">거래금액(24H)</span> 
                        <span class="tit">거래금액(24H) {{format(getCurrentData['cumdealcost'])}} 
							<span class="data" v-show="getCurrentData['paycurrcode'] == 'BTC'"> =  {{format(getCurrentData['cumdealcost'] * currentBtcKrPrice)}} KRW</span>
							<span class="data" v-show="getCurrentData['paycurrcode'] == 'ETH'"> = {{format(getCurrentData['cumdealcost'] * currentEthKrPrice)}} KRW</span>
						</span> 
						 <span class="payment-txt"> {{millionFormat(dealKRWPrice)}}</span>
				    </div>  -->
          <!-- //거래 금액 및 환산 금액 표시 -->
          <!-- //4초에 한번씩 내용전환(롤링) // 내용: 고가, 저가 표시 <-> 거래금액 -->

        </el-col>
      </el-row>
    </div>

    <!-- 가로모드 -->
    <div v-if="!isVertical && (selectedTabIndex == '2' || selectedTabIndex == '3')" class="landscape-chart">
      <!-- 깊이 차트/종합 차트 -->
      <stock-graph 
          ref="stockGraph"
          v-if="isApp === false"
          :is-depth-chart="selectedTabIndex === '2' ? true : false"
          @show-alerm="isShowAlerm = true, alermProps = $event"
          @orientation-change="orientationChange()"></stock-graph>
      <!-- 종합 차트 -->
      <app-graph
          v-if="isApp === true && selectedTabIndex === '3'"
          @chart-modal-alerm="isShowAlerm = true"
          :alerm-props="alermProps"
          @send-alerm-props="alermProps=$event"></app-graph>
    </div>

    <el-tabs v-else class="tab_type" type="card" v-model="selectedTabIndex" @tab-click="handleClick">
      <!-- 시작 : 주문 탭  -->
      <el-tab-pane :label="$t('m_exchange.c005')">
        <trade></trade>
      </el-tab-pane>
      <!-- 끝 : 주문 탭  -->

      <!-- 시작 : 실시간체결 탭  -->
      <el-tab-pane :label="$t('m_exchange.c006')">
        <!-- <real-time></real-time> -->
        <stock-time></stock-time>
      </el-tab-pane>
      <!-- 끝 : 실시간체결 탭  -->

      <!-- 시작 : 깊이 차트 탭  -->
      <el-tab-pane :label="$t('m_exchange.c007')" lazy>
        <stock-graph 
          ref="stockGraph"
          :is-depth-chart="true"
          @show-alerm="isShowAlerm = true, alermProps = $event"></stock-graph>
      </el-tab-pane>
      <!-- 끝 : 깊이차트 탭  -->

      <!-- 시작 : 종합차트 탭  -->
      <el-tab-pane :label="$t('m_exchange.c008')" lazy>
        <stock-graph 
          ref="stockGraph"
          v-if="isApp === false && selectedTabIndex === '3'"
          :is-depth-chart="false"
          @show-alerm="isShowAlerm = true, alermProps = $event"
          @orientation-change="orientationChange()"></stock-graph>
        <app-graph
          v-if="isApp === true && selectedTabIndex === '3'"
          @chart-modal-alerm="isShowAlerm = true"
          :alerm-props="alermProps"
          @send-alerm-props="alermProps=$event"></app-graph>
      </el-tab-pane>
      <!-- 끝 : 종합차트 탭  -->
    </el-tabs>
    
    <!-- 시작 : 차트 모달 팝업 영역 -->
    <div class="popup_wrapper_mobile">
      <div id="chart-popup-wrapper"></div>
      <modal-alerm v-if="isShowAlerm" @confirm="isShowAlerm = false, $refs.stockGraph.$refs.chart.setAlermProp(alermProps)" @close="isShowAlerm = false"
        :alerm-props="alermProps" @send-alerm-prop="alermProps[$event['key']]['value'] = $event['value']"></modal-alerm>
    </div>
    <!-- 끝 : 차트 모달 팝업 영역 -->

    <div class="item-list-wrapper">
      <div class="market-type"> {{currentPayCurrCode}} {{$t('m_exchange.c004-1')}}<!-- 마켓 --></div>
      <!-- {{currentPayCurrCode}} -->
      <div class="item-list">
        <ul class="tit_lst">

          <li v-for="item in runningList" :key="item.value" @click="selectItem(item)" :class="item.symbol === currentSymbol? 'active': ''">
            <div v-if="$_.findWhere( nameList, {o_symbol : item.symbol})['o_exch_list_tp'] === '1'">
              <el-button class="tit-lnk">
								{{ nameFormat($_.findWhere(nameList, {o_symbol : item.symbol})) }}
                <span class="eng">{{ $_.findWhere( nameList, {o_symbol : item.symbol}) | codeFilter }}</span>
              </el-button>
            </div>
          </li>
        </ul>
      </div>
      <div class="order_dim" @click="foldingList"></div>
    </div>

  </div>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex';
  import {
    _
  } from 'vue-underscore'; 
  import Trade from './Trade.vue';  
  import DepthChart from '../../charts/DepthChart';  
  import StockTime from '../../exchanges/StockTime'
  import AppGraph from '../exchanges/AppGraph'
  import StockGraph from './StockGraph'
  import ModalAlerm from './modal/ModalAlerm';

  export default {
    props: ['id'],
    components: {
      Trade,      // 호가,매수,매도      
      DepthChart,      
      StockTime,  // 체결
      StockGraph,
      AppGraph,
      ModalAlerm
    },
    data() {
      return {        
        name: 'mOrder',
        selectedTabIndex: '0',
        getCurrentData: {
          curprc: '',
          yesterdayprice: '',
          paycurrcode: '',
          highprc: '',
          lowprc: '',
          cumdealcost: '',
          updnrate: '',
          diff: '',
          krwchg: ''
        },
        nowPriceKRW: '',
        nowHighKRWPrice: '', // 고가 원화 환산 가격
        nowRowPrice: '', // 저가 가격
        nowRowKRWPrice: '', // 저가 원화 환산 가격
        dealPrice: '', // 거래 금액
        dealKRWPrice: '', // 거래 금액 원화 가격
        realCount: 0,        
        notiSettingVisible: false,
        stockListVisible: false,
        savedSymbol: null,        
        curGraphPos: 0,        
        diffPrice: 0,
        diffColor: '',
        realCount: 0,
        isItemListOpen: false,
        dataLoaded: false,        
        itemList: this.$route.params.list,
        runningList: [],
        // 즐겨찾기 관련 
        isMySymbol: false,
        mySymbols: [],
        sortStatA: '',
        sortStatB: '',
        sortStatC: '',
        //하이브리드앱 체크
        isApp: false,

        // 깊이차트
        isDepthChart: false,
        // 신호선 설정 팝업
        isShowAlerm: false, // 차트 모달(alerm) 노출여부
        isConfirmAlerm: false, // 차트 모달(alerm) 확인버튼 클릭여부
        alermProps: [],
        isVertical: true,
        chkOrientationChange: false, //OrientationChange 처리여부 확인
        isSupportsOrientationChange: true, // orientationchange 지원여부 확인
        orientation: 0
      };
    },
    filters: {
      nameFilter: function (obj) {
        // //console.log(obj);
        var strArr = obj['o_inst_kor_nm'].split('/');
        return strArr[0];
      },
      codeFilter: function (obj) {
        return obj['o_inst_eng_abbr'];
      },
      rateSymbol(diff) {
        var num = parseFloat(diff);
        if (num > 0) return '▲ '
        else if (num < 0) return '▼ '
        return ''
      }
    },
    computed: {
      ...mapState({
        nameList: state => state.data['n1001'],
        currentSymbol: state => state.data.currentSymbol,
        beforeSymbol: state => state.data.beforeSymbol,
        currentPayCurrCode: state => state.data.currentPayCurrCode,
        trSymbols: state => state.data.trSymbols,
        currentBtcKrPrice: state => state.data.currentBtcKrPrice,
        currentEthKrPrice: state => state.data.currentEthKrPrice

      }),
      ...mapGetters({
        getUserId : "getUserId",
        isLoggedIn : 'isLoggedIn',
        getLangKind: 'getLangKind',
        hogaUnit: 'hogaUnit',
        notiSettingList: 'getNotiSettingList'
      })
		},
		watch: { 
			getLangKind(val, old) {
				this.$i18n.locale = val == 'KR' ? 'ko' : val == "EN" ? 'en' : 'ko'
			}
		},
    methods: {
      ...mapActions(['getNotiSettingList']),
      diffFormat(obj) {
        var self = this;
        obj = Math.abs(obj);
        var objStr = obj.toFixed(8).toString();
        var fixedVal = 0;

        if(self.currentSymbol.indexOf('KRW__') > -1){
          if(obj < 10){
            fixedVal = 2;
          }
          if(10 <= obj && obj < 100){
            fixedVal = 1;
          }
          if(obj >= 100){
            fixedVal = 0;
          }          
        }else{
          fixedVal = 8;
        }

        if (fixedVal > 0) {
          var val1 = UnitManager.numberWithCommas(parseInt(objStr));
          var val2 = obj.toFixed(fixedVal).split('.')[1];
          return val1+'.'+val2;
        } else {
          return UnitManager.numberWithCommas(obj);
        }
      },
      prcFormat (obj) {
        var self = this;
        if (obj == '') return '';

        var objStr = '';
        var objNum = parseFloat(obj);
        var fixedVal = 8;

        if(self.currentPayCurrCode == 'KRW'){
          if(objNum < 10){
            fixedVal = 2;
          }
          if(10 <= objNum && objNum < 100){
            fixedVal = 1;
          }
          if(objNum >= 100){
            fixedVal = 0;
          }          
        }

        objStr = objNum.toFixed(fixedVal);
        
        //const formatter = Intl.NumberFormat();
        if (objStr.indexOf('.') > -1 || objStr.indexOf('e') > -1) {
          if (objNum != 0) {
            var val1 = '';
            if(objStr.indexOf('e') > -1){
              val1 = UnitManager.numberWithCommas(parseInt(objNum.toFixed(0)));
            }else{
              val1 = UnitManager.numberWithCommas(parseInt(objNum));
            }
            
            var val2 = objStr.split('.')[1];
            return val1 + '.' + val2;
          } else {
            return objStr;
          }        
        } else {
          return UnitManager.numberWithCommas(objStr); //formatter.format(obj);
        }
      },
      setSmallCurPrc(value) {
        //console.log(value);
        value = String(value);
        if (value.length > 5) {
          return 'small';
        } else {
          return '';
        }
      },
      // 즐겨찾기 목록 조회
      requestBookmarkSymbol() {
        var self = this;
        this.$socket.sendProcessByName('d0003', (queryData) => {
          let ib1 = queryData.getBlockData('InBlock1')[0]
          ib1['account_id'] = self.getUserId
          ib1['grp_no'] = 0
        }, (queryData) => {
          if (!queryData) {
            //console.log('즐겨찾기 목록 조회 실패')
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "d0003") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t('sys_err.a001')
            });
            return
          }

          self.mySymbols = queryData.getBlockData('OutBlock2');
          self.findMySymbol();
        })
      },
      findMySymbol() {
        var self = this;

        for (var i = 0; i < self.mySymbols.length; i++) {
          if (self.mySymbols[i].symbol === self.currentSymbol) {
            self.isMySymbol = true;
            return
          } else {
            self.isMySymbol = false;
          }
        }
      },
      onFavoriteClick(value) {
        var self = this;        
        if (self.getUserId) {
          // e -> true or false
          self.bookmark(self.currentSymbol, value ? 0 : 1);

        } else {
          self.isMySymbol = !self.isMySymbol;

          this.$EventBus.$emit('downChart');          

          self.$confirm('로그인 후 즐겨찾기 설정이 가능합니다.', '', {
            confirmButtonText: '로그인',
            cancelButtonText: '닫기'
          }).then(() => {
            self.$router.replace({
              name: 'mLogin'
            });
          }).catch(() => {
            this.$EventBus.$emit('upChart');            
          });
        }
      },
      bookmark(symbol, flag) {
        let self = this;
        self.$socket.sendProcessByName('d0004', (queryData) => {
          let ib1 = queryData.getBlockData('InBlock1')[0];
          ib1['account_id'] = self.getUserId;
          ib1['grp_no'] = 0;
          ib1['in_cnt'] = 1;

          let ib2 = queryData.getBlockData('InBlock2');
          let favData = {
            symbol: symbol,
            blnk_memo_yn: 1,
            bmrk_yn: 1,
            save_del_div: flag
          };

          // 추가일 경우 
          if (flag == 0) {
            var maxSeq = 0;
            if (self.mySymbols != null && self.mySymbols.length > 0) {
              var arr = [];
              self.mySymbols.forEach((item) => {
                arr.push(parseInt(item.symbol_seq));
              });

              maxSeq = arr.reduce((previous, current) => {
                return previous > current ? previous : current
              }) + 1;
            }

            favData['symbol_seq'] = maxSeq;
          }
          ib2.push(favData);

        }, (queryData) => {
          if (!queryData) {
            //console.log('즐겨찾기 추가/삭제 실패');
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "d0004") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t('sys_err.a001')
            });
            return;
          }
          var array = [];
          for (var data of queryData.getBlockData('OutBlock2')) {
            array.push(data);
          }
          self.mySymbols = array;
        })
      },
      requestNowSymbolName() {
        // 타이틀 설정
				var self = this;
				var nameArr = '';
        var data = self.$_.findWhere(self.nameList, {
          o_symbol: self.currentSymbol
				});
        var code = data['o_inst_eng_abbr'];
        self.$EventBus.$emit('mobile-title-link', self.nameFormat(data) + '<span class="header-sub-tit"> ' + code +
          '</span> <span class="orderVue-arrow">▼</span>');
			},
			nameFormat(obj) {
        var self = this;
        if(self.getLangKind == 'KR'){
          return obj['o_inst_kor_nm'].split('/')[0];
        }
        if(self.getLangKind == 'EN'){
          return obj['o_inst_eng_nm'].split('/')[0];
        }
      },
      handleClick(e) {
        ////console.log(e.label); 	// 깊이차트 or 종합차트
        if (this.selectedTabIndex !== e.index) {
          if (this.selectedTabIndex === '2') {
            this.$EventBus.$emit('outDepthChart');
          } else if (this.selectedTabIndex === '3') {
            this.$EventBus.$emit('outStockGraph');

          }
          if (e.index === '2') {
            this.$EventBus.$emit('inDepthChart');
          }
          if (e.index === '3') {
            this.$EventBus.$emit('inStockGraph');
          }
        }
        this.selectedTabIndex = e.index;

        /* App 일 때 '깊이차트/종합차트' 선택 시 cordova에 회전 감지 설정 알림 */
        if (afc.isDevice) {
          if (this.selectedTabIndex === '2' || this.selectedTabIndex === '3') {   // '깊이차트'나 '종합차트' 탭으로 이동 시
            // 회전 감지 알림
            cordova.exec( null , null, "AppPlugin" , "setOrientation", [ AppManager.SCREEN_ORIENTATION_SENSOR ]);
          } else {    // '주문'이나 '실시간체결' 탭으로 이동 시
            // 세로모드 설정 알림
            cordova.exec( null , null, "AppPlugin" , "setOrientation", [ AppManager.SCREEN_ORIENTATION_PORTRAIT ]);
          }
        }
      },
      showStockList() {
        if (this.stockListVisible === true) {
          this.stockListVisible = false;
        } else {
          this.stockListVisible = true;
        }
      },
      addComma(number) {
        if (number == undefined || number == '' || number == null) return '0'
        var parts = number.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
      },
      format(number) {
        var fixedVal = 0;
        number = parseFloat(number);

        if (number < 10) {
          fixedVal = 2;
        }
        if (10 <= number && number < 100) {
          fixedVal = 1;
        }
        if (number >= 100) {
          fixedVal = 0;
        }

        // const formatter = Intl.NumberFormat();
        if (number < 100) {
          if (number != 0) {
            var num = number.toFixed(10);
            var val1 = UnitManager.numberWithCommas(parseInt(number.toString()));
            var val2 = num.toString().split('.')[1];
            val2 = parseFloat('0.' + val2).toFixed(fixedVal);
            val2 = val2.toString().split('.')[1];
            return val1 + '.' + val2;
          } else {
            return number.toFixed(fixedVal);
          }
        } else {
          return  UnitManager.numberWithCommas(parseInt(number));
        }
      },
      millionFormat(number) {
        // const formatter = Intl.NumberFormat();
        if (number > 999999) {
          number = (number / 1000000).toFixed(0);
          return UnitManager.numberWithCommas(number) + this.$t('exchange.a009');
        } else {
          return UnitManager.numberWithCommas(number);
        }
      },
      requestNowPrice() {
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
          // block2['symbol'] = symbol;

        }, function (queryData) {
          //console.log(queryData);
          if (queryData != null) {
            var OutBlock1 = queryData['queryObj']['OutBlock2'][0];
            OutBlock1['curprc'] = OutBlock1['curprc'];
            self.updateDisplay(OutBlock1)
            //self.registerReal();
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
      registerReal() {        
        var self = this;
        self.$socket.unregisterReal('KVS0', [self.beforeSymbol], self.name);        
        self.$socket.registerReal('KVS0', "symbol", [self.currentSymbol], self.name, function (queryData) {

          // 리얼데이터 예외처리 Start
          if(queryData == null) return;
          var data = queryData.queryObj.OutBlock1[0];
          if(data == null || data.symbol != self.currentSymbol) return;
          // 리얼데이터 예외처리 End

          data['curprc'] = data['execprice'];
          self.updateRealDisplay(data);
        });
      },
      updateDisplay(data) {
        var self = this;
        this.getCurrentData = {
          curprc: data['curprc'],
          yesterdayprice: data['yesterdayprice'],
          paycurrcode: data['paycurrcode'],
          highprc: data['highprc'],
          lowprc: data['lowprc'],
          cumdealcost: data['cumdealcost'],
          updnrate: data['updnrate'].toFixed(2),
          diff: data['diff']
        };
        self.diffPrice = data['diff'];
        self.diffColor = '';

        var diffPriceNum = parseFloat(self.diffPrice);

        if (diffPriceNum > 0) self.diffColor = 'red';
        if (diffPriceNum < 0) self.diffColor = 'blue';

        self.nowHighKRWPrice = (parseFloat(data['highprc']) * parseFloat(self.getCurrentData['krwchg'])) / parseFloat(
          data['curprc']);
        self.nowRowKRWPrice = (parseFloat(data['lowprc']) * parseFloat(self.getCurrentData['krwchg'])) / parseFloat(
          data['curprc']);
        self.dealKRWPrice = (parseFloat(data['cumdealcost']) * parseFloat(self.getCurrentData['krwchg'])) / parseFloat(
          data['curprc']);

        if (self.getCurrentData['highprc'] == 0 || self.getCurrentData['lowprc'] == 0) {
          self.curGraphPos = 50;
        } else {
          var baseVal = self.getCurrentData['highprc'] - self.getCurrentData['lowprc'];
          var curVal = self.getCurrentData['curprc'] - self.getCurrentData['lowprc'];
          self.curGraphPos = Math.round(curVal / baseVal * 100);
        }
      },
      updateRealDisplay(data) {
        var self = this;
        var oldCurprc = self.getCurrentData['curprc'];

        self.getCurrentData['curprc'] = data['curprc'];
        self.getCurrentData['highprc'] = data['highprc'];
        self.getCurrentData['lowprc'] = data['lowprc'];
        self.getCurrentData['cumdealcost'] = data['cumdealcost'];
        self.getCurrentData['updnrate'] = data['updnrate'].toFixed(2);

        self.diffPrice = parseFloat(data['curprc']) - parseFloat(data['yesterdayprice']);
        self.diffColor = '';

        if (self.diffPrice > 0) self.diffColor = 'red';
        if (self.diffPrice < 0) self.diffColor = 'blue';

        self.nowHighKRWPrice = (parseFloat(data['highprc']) * parseFloat(self.getCurrentData['krwchg'])) / parseFloat(
          data['curprc']);
        self.nowRowKRWPrice = (parseFloat(data['lowprc']) * parseFloat(self.getCurrentData['krwchg'])) / parseFloat(
          data['curprc']);
        self.dealKRWPrice = (parseFloat(data['cumdealcost']) * parseFloat(self.getCurrentData['krwchg'])) / parseFloat(
          data['curprc']);

        if (self.getCurrentData['highprc'] == 0 || self.getCurrentData['lowprc'] == 0) {
          self.curGraphPos = 50;
        } else {
          var baseVal = self.getCurrentData['highprc'] - self.getCurrentData['lowprc'];
          var curVal = self.getCurrentData['curprc'] - self.getCurrentData['lowprc'];
          self.curGraphPos = Math.round(curVal / baseVal * 100);
        }
      },
      setBuySellColor(value) {
        if (value > 0) return 'red'
        else if (value < 0) return 'blue'
        else return ''
      },
      requestCoinList() {
        var self = this;
        if (self.itemList === undefined) { 
          var symbol = self.$store.state.data.currentSymbol;
          self.$socket.sendProcessByName('i0018', function (queryData) {
            var block = queryData.getBlockData('InBlock1')[0];
            // 조회구분
            block['symbolcnt'] = '1';
            block['qry_div'] = '4';
            block['paycurrcode'] = self.currentPayCurrCode;
            block['excode'] = '001';
            // var block2 = queryData.queryObj['InBlock2'];
            // block2.push({
            // 	'symbol': symbol
            // });

          }, function (queryData) {
            if (queryData != null) {
              var OutBlock2 = queryData['queryObj']['OutBlock2'];
              
              self.runningList = OutBlock2.filter(item => {
                return self.$_.find(self.nameList, { o_symbol: item.symbol });
              });
              
              self.getSortData();
              self.sortRunningList();

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
        } else {
          self.runningList = self.itemList;
          self.getSortData();
          self.sortRunningList();

        }
      },
      sortRunningList() {
        var self = this;

        if (self.sortStatA == '' && self.sortStatB == '' && self.sortStatC == '' && self.market != 'favorite') {
          self.sortStatC = 'descending';
        }

        switch (self.sortStatA) {
          case 'descending':
            self.runningList = self.runningList.sort((a, b) => parseFloat(b.curprc) - parseFloat(a.curprc));
            break;
          case 'ascending':
            self.runningList = self.runningList.sort((a, b) => parseFloat(a.curprc) - parseFloat(b.curprc));
            break;
        }

        switch (self.sortStatB) {
          case 'descending':
            self.runningList = self.runningList.sort((a, b) => parseFloat(b.updnrate) - parseFloat(a.updnrate));
            break;
          case 'ascending':
            self.runningList = self.runningList.sort((a, b) => parseFloat(a.updnrate) - parseFloat(b.updnrate));
            break;
        }

        switch (self.sortStatC) {
          case 'descending':
            self.runningList = self.runningList.sort((a, b) => parseFloat(b.cumdealcost) - parseFloat(a.cumdealcost));
            break;
          case 'ascending':
            self.runningList = self.runningList.sort((a, b) => parseFloat(a.cumdealcost) - parseFloat(b.cumdealcost));
            break;
        }

        self.runningList = self.runningList.sort((a, b) => b.pre - a.pre);
      },
      getSortData() {
        var self = this;

        //console.log('getSortData() >>>>>>>>>>>>>>>')

        self.sortStatA = '';
        self.sortStatB = '';
        self.sortStatC = '';

        if (self.$store.state.data.stockListSortStatA != null) {
          self.sortStatA = self.$store.state.data.stockListSortStatA;
          //console.log('getSortData() >>>>>>>>>>>>>>> sortStatA')
        }

        if (self.$store.state.data.stockListSortStatB != null) {
          self.sortStatB = self.$store.state.data.stockListSortStatB;
          //console.log('getSortData() >>>>>>>>>>>>>>> sortStatB')
        }

        if (self.$store.state.data.stockListSortStatC != null) {
          self.sortStatC = self.$store.state.data.stockListSortStatC;
          //console.log('getSortData() >>>>>>>>>>>>>>> sortStatC')
        }

        if (self.$store.state.data.stockListSortStatA == null && self.$store.state.data.stockListSortStatB == null &&
          self.$store.state.data.stockListSortStatC == null) {
          self.sortStatC = 'descending';
          //console.log('getSortData() >>>>>>>>>>>>>>> sortStatC = descending')
        }

      },
      selectItem(row) {

        let self = this;

        //console.log('row>>>>>>>>>>>>>>>>>>>>>>>>> ', row)
        if (_.findWhere(self.nameList, {
            o_symbol: row.symbol
          })['o_exch_list_tp'] !== '1') {
          self.$refs.tableRef.setCurrentRow(self.runningList[self.currentSymbolIndex]);
          return;
        }

        self.foldingList();

        this.$store.commit('setCurrentSymbol', row.symbol);
        this.$EventBus.$emit('changeCurrentSymbol', row.symbol);
        sessionStorage.setItem('currentSymbol', row.symbol);


        self.requestNowSymbolName();
      },
      foldingList() {
        var self = this;
        self.isItemListOpen === true ? arrow = '▲' : arrow = '▼';
        var arrow = '▲';

        if (self.isItemListOpen) {
          //console.log('>>>>>>>>>>>>>>>>> upChart ')

          $('.logo-wrapper').removeClass("active"); //클래스삭제
          if (this.isApp) {
            //하이브리드앱
            $('.item-list-wrapper').hide();
            this.$EventBus.$emit('upChart');
          } else {
            $('.item-list-wrapper').stop().slideUp(200); //마켓 목록 보여주기
          }
          $(".item-list-wrapper").removeClass("show"); //클래스 삭제
        } else {
          //console.log('>>>>>>>>>>>>>>>>> downChart ');

          $('.logo-wrapper').addClass("active"); //클래스 추가 - 타이틀 arrow컨트롤
          if (this.isApp) {
            //하이브리드앱
            $('.item-list-wrapper').show();
            this.$EventBus.$emit('downChart');
          } else {
            $('.item-list-wrapper').stop().slideDown(200); //마켓 목록 none처리
          }
          $(".item-list-wrapper").addClass("show"); //클래스 삭제
        }
        self.isItemListOpen = !self.isItemListOpen;
      },
      getData() {
        var self = this;
        self.requestNowPrice();
        self.requestNowSymbolName();
        self.requestCoinList();
        self.registerReal();

        if (self.getUserId != null) {
          self.requestBookmarkSymbol();
        }

        //모바일 알림설정 확인
        self.getNotiSettingList().then((obj)=> {
          self.CheckisNotiCurSymbol()
        })
      },
      orientationChanged() {
        const timeout = 120;
        return new window.Promise(function(resolve) {
          const go = (i, height0) => {
            document.documentElement.clientHeight != height0 || i >= timeout ? resolve() : window.requestAnimationFrame(() => go(i + 1, height0));
          };
          go(0, document.documentElement.clientHeight);
        });
      },
      orientationChange() {
        var self = this;

        /* App일 때 가로/세로 이벤트 */
        if (afc.isDevice) {
          if (self.chkOrientationChange === false) {
            self.chkOrientationChange = true;
            self.orientationChanged().then(function() {
              // self.isVertical = screen.orientation.type.startsWith('portrait');
              self.isVertical = document.documentElement.clientWidth < document.documentElement.clientHeight;
              self.chkOrientationChange = false;
            });
          }
        } 
        /* Mobile web일 때 가로/세로 이벤트 */
        else {
          if (self.orientation !== window.orientation) {            
            self.orientation = window.orientation;

            // 차트유형/지표설정, 차트설정 창이 열려 있지 않을 경우
            if ($(".modal_chart_type").length === 0) {
              if (self.orientation === 90 || self.orientation === -90) {
                self.isVertical = false;
              } else {
                self.isVertical = true;
              }
            }
          } 
          // 차트유형/지표설정, 차트설정 창을 닫은 경우
          else {
            if (self.orientation === 90 || self.orientation === -90) {
              self.isVertical = false;
            } else {
              self.isVertical = true;
            }
          }
        }
      },
      loadStockDataCallback() {
        var self = this;
        if (self.dataLoaded) return;
        self.dataLoaded = true;
        self.getData();
      },
      resetLoadStockDataCallback() {
        var self = this;
        self.dataLoaded = false;
      },
      changeCurrentSymbolCallback(symbol){
        var self = this;
        self.getData();
      },
      click_item_list_Callback(){
        var self = this;
        self.foldingList();
      },
      CheckisNotiCurSymbol() {  // 알림설정 현재상태
        let self = this;
        self.$EventBus.$emit('mobile-noti', false);
        for(var idx in self.notiSettingList) {
          if (self.notiSettingList[idx]['Code'] == self.currentSymbol) {
            self.$EventBus.$emit('mobile-noti', true);
            break;
          }
        }
      },
		},
    created() {
      var self = this;

      self.$EventBus.$emit('mobile-nav-menus', ['back', 'notificationSetting', 'order']);

      //하이브리드 앱 체크
      self.isApp = afc.isDevice;
    },
    mounted() {
      var self = this;

      self.$EventBus.$on('loadStockData', self.loadStockDataCallback);
      self.$EventBus.$on('changeCurrentSymbol', self.changeCurrentSymbolCallback);
      self.$EventBus.$on('resetLoadStockData', self.resetLoadStockDataCallback);
      self.$EventBus.$on('click-item-list', self.click_item_list_Callback);

      if (self.trSymbols.length > 0 && !self.dataLoaded) {
        self.$EventBus.$emit('loadStockData');
      }

      // 가로/세로 모드
      self.isVertical = document.documentElement.clientWidth < document.documentElement.clientHeight;   // 초기화
      self.orientation = window.orientation;
      
      if (afc.isDevice) {     /* App일 때 가로/세로 이벤트 */
        window.addEventListener('orientationchange', self.orientationChange);
      } else {
        // orientationchange의 지원여부에 따라 orientationchange or resize 이벤트 적용
        self.isSupportsOrientationChange = 'orientationchange' in window;

        const orientationEvent = self.isSupportsOrientationChange ? 'orientationchange' : 'resize';
        window.addEventListener(orientationEvent, self.orientationChange, false);
      }
    },
    beforeDestroy() {
      var self = this;
      self.$socket.unregisterReal('KVS0', [self.currentSymbol], self.name);

      if (afc.isDevice) {     /* App일 때 가로/세로 이벤트 */
        window.removeEventListener('orientationchange', self.orientationChange);
        // 세로모드 설정 알림
        cordova.exec( null , null, "AppPlugin" , "setOrientation", [ AppManager.SCREEN_ORIENTATION_PORTRAIT ]);
      } else {
        const orientationEvent = self.isSupportsOrientationChange ? 'orientationchange' : 'resize';
        window.removeEventListener(orientationEvent, self.orientationChange);
      }

      self.$EventBus.$off('loadStockData', self.loadStockDataCallback);
      self.$EventBus.$off('changeCurrentSymbol', self.changeCurrentSymbolCallback);
      self.$EventBus.$off('resetLoadStockData', self.resetLoadStockDataCallback);
      self.$EventBus.$off('click-item-list', self.click_item_list_Callback);
    }
  }

</script>
