<template>
  <el-container class="Exchange">
    <el-container>
      <el-main>
        <div class="stock-display">
          <stock-display v-bind:itemId="itemId">기본시세</stock-display>
        </div>
        <el-row>
          <el-col class="grid-content stock-price">
            <stock-price class="">호가</stock-price>
          </el-col>
          <el-col class="stock-center">
            <div class="grid-content stock-graph">
              <stock-graph
                ref="stockGraph"
                @show-alerm="showModalAlerm($event)"
                @show-past-view="showModalPastView"
                @show-universal-time="showModalUniversalTime($event)"
                :utc-prop="utcProp"
                >차트</stock-graph>
            </div>
            <el-row>
              <el-col :span="12">
                <div class="grid-content stock-order">
                  <div class="login" v-if="!$store.getters.isLoggedIn">
                    {{ $t('exchange.f001') }}
                    <el-button @click="goLogin">{{ $t('exchange.f002') }}</el-button>
                  </div>
                  <stock-order>매수/매도->주문</stock-order>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content stock-time">
                  <stock-time>실시간 체결</stock-time>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="grid-content stock-watch">
          <stock-watch>미체결/체결/감시/자산</stock-watch>
        </div>
      </el-main>
      <el-aside>
        <stock-list :srchView="true" class="stock-list" v-on:sendItemId="setSymbol">관심종목</stock-list>
      </el-aside>
      <!-- 차트 엔진 모달 영역 
      <div id="chart-popup-wrapper" class="popup_wrapper_pc" style="z-index: 101;"></div>
      -->
      <!-- 모달 영역 -->
      <div class="popup_wrapper_pc">
        <div id="chart-popup-wrapper"></div>
        <modal-alerm 
          v-if="isShowAlerm"          
          @confirm="isShowAlerm = false, $refs.stockGraph.$refs.chart.setAlermProp(alermProps)"
          @close="isShowAlerm = false"
          :alerm-props="alermProps"
          @send-alerm-prop="alermProps[$event['key']]['value'] = $event['value']"
        ></modal-alerm>
        <modal-past-view v-if="isShowModalPastView" @close="isShowModalPastView = false"></modal-past-view>
        <modal-universal-time 
            v-if="isShowModalUniversalTime"
            :time-zone="utcProp.timeZone"
            @chart-real-clock="(value) => this.utcProp = value"
            @close="isShowModalUniversalTime = false"
        ></modal-universal-time>
      </div>
    </el-container>
  </el-container>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import { _ } from 'vue-underscore'

  import StockPrice from './exchanges/StockPrice.vue';
  import StockDisplay from './exchanges/StockDisplay.vue';
  import StockList from './exchanges/StockList.vue';
  import StockOrder from './exchanges/StockOrder.vue';
  import StockTime from './exchanges/StockTime.vue';
  import StockWatch from './exchanges/StockWatch.vue';
  import StockGraph from './exchanges/StockGraph.vue';

  import ModalAlerm from './exchanges/modal/ModalAlerm.vue';
  import ModalPastView from './exchanges/modal/ModalPastView.vue';
  import ModalUniversalTime from './exchanges/modal/ModalUniversalTime.vue';

  import { checkSession } from "@/api/session";
  
  export default {
    components: {
      StockPrice,
      StockDisplay,
      StockList,
      StockOrder,
      StockTime,
      StockWatch,
      StockGraph,
      ModalAlerm,
      ModalPastView,
      ModalUniversalTime
    },
    data() {
      return {
        itemId: '',
        isShowAlerm: false,
        isShowModalPastView: false,
        isShowModalUniversalTime: false,
        utcProp: {
          timeZone: 'Asia/Seoul',
          utc: '+09:00'
        },
        alermProps: [],
        listHeight: '',
        sessionInterval: null,      //세션체크시 setInterval 변수
        sessionTimeout: null,       //세션업데이트후 timeout 설정
        sessionTime: 600000,        //세션체크시 Interval Time 변수 (10분)
        afterSessionTime: 21600000, //6시간
      };
    },
    computed: {
      ...mapState({
        currentSymbol: state => state.data.currentSymbol,
        currentPayCurrCode: state => state.data.currentPayCurrCode,
        i0018QryDiv: state => state.data['i0018QryDiv']
      }),
     },
    methods: {    
      setSymbol(id) {
        // 관심종목에서 선택한 아이템 아이디 값 세팅
        this.itemId = id;        
      },    
      goLogin() {
        this.$router.push({name: 'login'});
      },
      // 알림 모달 팝업
      showModalAlerm(alermProps) {
        this.isShowAlerm = true;
        this.alermProps = alermProps;
        this.isShowModalUniversalTime = false;
      },
      // 과거시점 모달 팝업
      showModalPastView() {
        this.isShowModalPastView = true;
        this.isShowModalUniversalTime = false;
      },
      // 세계시간 리스트
      showModalUniversalTime(isFlag) {
          this.isShowModalUniversalTime = (isFlag !== undefined) ? isFlag : !this.isShowModalUniversalTime;
      },
      // 스크롤에 따른 관심종목 고정시키기
      scrollStockList: function(event) {
        // 스크롤에 따른 scrollY값 얻기
        var supportPageOffset= window.pageYOffset !== undefined;
        var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
        var scrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
        
        var docHeight = document.body.offsetHeight;
        var stockList = document.getElementsByClassName('el-aside')[0];
        var stockListHeight = docHeight - 70;
        var gap = document.getElementsByClassName('el-main')[0].offsetHeight - stockListHeight;
        var listHeight;
        if (scrollTop < 700) {
          if (scrollTop > gap) {
            listHeight = stockListHeight - scrollTop + gap;
          } else {
            listHeight = stockListHeight;
          }
          this.listHeight = listHeight;
          stockList.style.top = scrollTop + 'px';
          stockList.style.height = listHeight + 'px';
        }
      },
      stockListResize :function(event) {
        var supportPageOffset= window.pageYOffset !== undefined;
        var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
        var scrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

        var docHeight = document.body.offsetHeight;
        var stockList = document.getElementsByClassName('el-aside')[0];
        var stockListHeight = docHeight - 70;
        
        if (scrollTop < 500) {
          stockList.style.height = stockListHeight + 'px';
        } else {
          stockList.style.height = this.listHeight + 'px';
        }
      },
      syncUniversalTime () {
        const chartFullProperty = JSON.parse(localStorage.getItem(this.$route.name));
        if (chartFullProperty && chartFullProperty.m_GlobalProperty && chartFullProperty.m_GlobalProperty.m_timeZone) {
          this.utcProp = chartFullProperty.m_GlobalProperty.m_timeZone
        }
      },
      updateSession() {
        //세션 업데이트
        var self = this;
        checkSession().then(res => {
          if (res == "0" || res == "00") {
            console.log("updateSession checkSession Fail::res ==>", res);
            if (self.sessionInterval) {
              clearInterval(self.sessionInterval);
              self.sessionInterval = null;
            }
            self.$store.dispatch("logout", { pass: true });
            self.$alert(self.$t("login.h010"), "", {
              confirmButtonText: "OK",
              callback: action => {
                self.$router.push("/login");
              },
              showClose: false,
            });
          } else {
            console.log("updateSession checkSession success::res ==>", res);
            //세션업데이트완료시 6시간 혹은 24시간 후에 한번더 확인하도록함 (로그아웃처리)
            if (self.sessionTimeout) {
              clearTimeout(self.sessionTimeout);
              self.sessionTimeout = null;
            }
            self.sessionTimeout = setTimeout(function () {
              self.sessionTimeout = null;
              console.log("updateSession call updateSession");
              self.updateSession();
            }, self.afterSessionTime);
          }
        }).catch(res => {
          console.log(res);
        });
      },
      chkSession() {
        var self = this;
        var nowTime = Date.now();
        var lastTime = self.$socket.getLastQueryTime();
        console.log(nowTime - lastTime);
        if (nowTime - lastTime <= self.sessionTime) {
          console.log("chkSession updateSession");
          self.updateSession();
        }
      },
    },
    created() {
      var self = this;

      self.$EventBus.$emit('pc-navi', [
        { label:'거래소', target:'exchange' },
        'exchanges'
      ]);
      
      window.addEventListener('scroll', self.scrollStockList);
      window.addEventListener('resize', self.stockListResize);
      
      //로그인 상태인 경우에만 세션체크를 한다
      if (self.$store.getters.isLoggedIn) {
        //자동로그인 상태에 따라 세션체크 하도록 설정
        self.afterSessionTime = self.$store.state.user.autoLogin ? 86400000 : 21600000;
        self.sessionTimeout = setTimeout(function () {
          self.sessionTimeout = null;
          self.updateSession();
        }, self.afterSessionTime);

        //주기적인 세션체크
        self.sessionInterval = setInterval(self.chkSession, self.sessionTime);
      }
    },
    beforeMount () {
      this.syncUniversalTime();
    },
    mounted() {
      var self = this;
      self.$store.commit('setI0018QryDiv', 4);
      
      /* 스크롤에 따른 관심종목 고정시키기 */
      self.scrollStockList();
      self.stockListResize();

      /* setting bg color */
      var bodyObj = document.body;
      bodyObj.style.backgroundColor = "#e8ebee";
    },
    beforeDestroy() {
      if (this.sessionInterval) {
        clearInterval(this.sessionInterval);
        this.sessionInterval = null;
      }
      if (this.sessionTimeout) {
        clearTimeout(this.sessionTimeout);
        this.sessionTimeout = null;
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollStockList);
      window.removeEventListener('resize', this.stockListResize);

      /* setting bg color */
      var bodyObj = document.body;
      bodyObj.style.backgroundColor = "";
    }
  };
</script>
