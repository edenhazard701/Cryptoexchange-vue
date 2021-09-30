<template>
    <div class="FullExchange">
        <div class="stock-display-wrap">
            <stock-display></stock-display>
        </div>
        <div class="member">
            <span class="mem-logined" v-if="$store.getters.isLoggedIn" @click="logout">{{ $t('login.f001') }}</span>
            <span class="mem-login" v-if="!$store.getters.isLoggedIn" @click="goLogin">{{ $t('header.login') }}</span>
            <span class="mem-join" v-if="!$store.getters.isLoggedIn" @click="goRegistration">{{ $t('header.signup') }}</span>
            <!-- <span>KOR</span> -->
            <el-select v-model="$i18n.locale" @change="i18nChange" size="mini" slot="title" class="locale-changer">
                <el-option 
                    v-for="(lang, idx) in langs" 
                    :key="lang"
                    :label="$i18n.t('header.' + lang)"
                    :value="lang"
                >
                </el-option>
            </el-select>
        </div>
        <div class="stock-group">
            <div class="stock-graph">
                <stock-graph
                    ref="stockGraph"
                    @show-alerm="showModalAlerm($event)"
                    @show-past-view="showModalPastView"
                    @show-universal-time="showModalUniversalTime($event)"
                    :utcProp="utcProp"
                    >차트</stock-graph>
            </div>
            <div class="stock-price">
                <stock-price></stock-price>
            </div>
            <div class="stock-time">
                <stock-time></stock-time>
            </div>
        </div>
        <div class="stock-group">
            <div class="stock-buy">
                <div class="login" v-if="!$store.getters.isLoggedIn">
                    <!-- 로그인 후 확인 가능합니다. --> {{ $t('exchange.f001') }} 
                    <el-button @click="goLogin"><!-- 로그인 --> {{ $t('exchange.f002') }}</el-button>
                </div>
                <stock-buy></stock-buy>
            </div>
            <div class="stock-sell">
                <stock-sell></stock-sell>
            </div>
        </div>
        <div class="stock-watch" :class="{'expand': expand}">
            <div class="stock-expand">
                <el-button size="mini" @click="watchExand"></el-button>
            </div>
            <stock-watch></stock-watch>
        </div>
        <div class="popup_wrapper_pc">
            <div id="chart-popup-wrapper"></div>
            <modal-alerm 
                v-if="isShowAlerm" 
                @confirm="isShowAlerm = false, $refs.stockGraph.$refs.chart.setAlermProp(alermProps)"
                @close="isShowAlerm = false"
                :alerm-props = "alermProps"
                @send-alerm-prop="alermProps[$event['key']]['value'] = $event['value']"
            ></modal-alerm>
            <modal-past-view v-if="isShowModalPastView" @close="isShowModalPastView = false"></modal-past-view>
            <modal-universal-time 
                v-if="isShowModalUniversalTime"
                @chart-real-clock="utcProp = $event"
                @close="isShowModalUniversalTime = false"
                :utc-prop="utcProp"
            ></modal-universal-time>
        </div>
    </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import { _ } from 'vue-underscore'
  
  import StockPrice from './exchanges/StockPrice.vue';
  import StockDisplay from './exchanges/StockDisplay.vue';
  import StockList from './exchanges/StockList.vue';
  import StockTime from './exchanges/StockTime.vue';
  import StockWatch from './exchanges/StockWatch.vue';
  import StockGraph from './exchanges/StockGraph.vue';
  import StockBuy from './exchanges/StockBuy.vue';
  import StockSell from './exchanges/StockSell.vue';
  import StockOrder from './exchanges/StockOrder.vue';

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
      StockBuy,
      StockSell,
      ModalAlerm,
      ModalPastView,
      ModalUniversalTime
    },
    props: ['langKind'],
    data() {
      return {
        name: 'FullExchange',
        langs: ['ko', 'en'],
        realCount: 0,
        realFlag: false,
        realCount: 0,
        realFlag: false,
        itemId: '',
        sysName: 'UNIVAX-TEST',
        collapsed: false,
        sysUserName: '',
        sysUserAvatar: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        isShowAlerm: false,
        isShowModalPastView: false,
        isShowModalUniversalTime: false,
        utcProp: {
          timeZone: 'Asia/Seoul',
          utc: '+09:00'
        },
        expand:false,
        alermProps: [],
        nowLang: '',
        sessionInterval: null,      //세션체크시 setInterval 변수
        sessionTimeout: null,       //세션업데이트후 timeout 설정
        sessionTime: 600000,        //세션체크시 Interval Time 변수 (10분)
        afterSessionTime: 21600000, //6시간
      };
    },
    computed: {
      ...mapState({
        currentSymbol: state => state.data.currentSymbol,
        currentPayCurrCode: state => state.data.currentPayCurrCode
      }),
      socketConnected() {
        return this.$store.getters.isSocketConnected
      },
      ...mapGetters(['isLoggedIn', 'getLangKind', 'getUserId'])
    },
    watch: {
        getLangKind(val, old) {
            this.$i18n.locale = val == 'EN' ? 'en' : 'ko'
        }
    },
    methods: {
        ...mapActions(['logout', 'getOrderAble']),
        i18nChange(val) {
            let self = this;
            const langKind = val == 'ko' ? 'KR' : 'EN';
            // window.localStorage.setItem('langKind', langKind);
            self.$i18n.locale = val;

            if (!self.isLoggedIn) {                
                self.$store.commit("setLangKind", langKind);
                return;
            }

            self.$store.dispatch('setLangKind', {lang_kind : langKind})
            .then((obj) => {
                self.$alert(self.$t('main.i001'), '', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: 'OK'
                });
            })
        },
        setSymbol(id) {
            // 관심종목에서 선택한 아이템 아이디 값 세팅
            this.itemId = id;
            console.log('Exchange.vue > setSymbol > id : ' + this.itemId);
        },
        goLogin() {
            this.$router.push({name: 'login'});
        },
        goRegistration() {
            this.$router.push({name: 'registration'});
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
        // 미체결/체결/감시중/감시완료/자산 expand
        watchExand() {
            let self = this;
            if (self.expand === false) {
                self.expand = true;
            } else {
                self.expand = false;
            }
        },
        syncUniversalTime () {
            const chartFullProperty = JSON.parse(localStorage.getItem(this.$route.name));
            if (chartFullProperty) {
              this.utcProp['utc'] = chartFullProperty.m_GlobalProperty.m_ChartUniversalTime;
              this.utcProp['checkedIndex'] = chartFullProperty.m_GlobalProperty.m_ChartUniversalIndex;
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
        onRB03Notification() {
            this.getOrderAble();
        },
        socketConnectedCallback(){
            if (this.getUserId) {
                this.$socket.registerReal("RB03", "key_user_id", [this.getUserId], this.name, this.onRB03Notification);
            }
        },
    },
    created() {
        var self = this;
        self.$EventBus.$emit('pc-navi', ['notGnb']);

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
    beforeMount() {
        this.syncUniversalTime();
    },
    mounted() {
      if (this.$store.getters.isSocketConnected) {
        this.socketConnectedCallback();
      }
      this.$EventBus.$on('socketConnected', this.socketConnectedCallback);
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

      this.$EventBus.$off('socketConnected', this.socketConnectedCallback);
      if (this.getUserId) {
      this.$socket.unregisterReal("RB03", [this.getUserId], this.name);
      }
    }
};
</script>
