<template>
  <div class="FullScreenChart">
    <div class="stock-display-wrap">
      <stock-display></stock-display>
    </div>
    
    <div class="member">
        <span class="mem-logined" v-if="$store.getters.isLoggedIn" @click="logout">로그아웃</span>
        <span class="mem-login" v-if="!$store.getters.isLoggedIn" @click="goLogin">{{ $t('header.login') }}</span>
        <span class="mem-join" v-if="!$store.getters.isLoggedIn" @click="goRegistration">{{ $t('header.signup') }}</span>
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
      <stock-graph
        ref="stockGraph"
        @show-alerm="showModalAlerm($event)"
        @show-past-view="showModalPastView"
        @show-universal-time="showModalUniversalTime($event)"
        :utcProp="utcProp"
      >차트</stock-graph>
    </div>

    <!-- 모달 영역 -->
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
          :time-zone="utcProp.timeZone"
          @chart-real-clock="(value) => this.utcProp = value"
          @close="isShowModalUniversalTime = false"
      ></modal-universal-time>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex';
  import StockDisplay from './exchanges/StockDisplay.vue';
  import StockGraph from './exchanges/StockGraph.vue';
  import ModalAlerm from './exchanges/modal/ModalAlerm.vue';
  import ModalPastView from './exchanges/modal/ModalPastView.vue';
  import ModalUniversalTime from './exchanges/modal/ModalUniversalTime.vue';

  export default {
    components: {
      StockDisplay,
      StockGraph,
      ModalAlerm,
      ModalPastView,
      ModalUniversalTime
    },
    data() {
      return {
        langs: ['ko', 'en'],
        itemId: '',
        isShowAlerm: false,
        isConfirmAlerm: false,
        isShowModalPastView: false,
        isShowModalUniversalTime: false,
        utcProp: {
          timeZone: 'Asia/Seoul',
          utc: '+09:00'
        },
        alermProps: []
      };
    },
    watch: {
      getLangKind(val, old) {
          this.$i18n.locale = val == 'KR' ? 'ko' : val == "EN" ? 'en' : /*default 'ko' */'ko'
      }
    },
    computed: {
      ...mapState({
        currentSymbol: state => state.data.currentSymbol,
        currentPayCurrCode: state => state.data.currentPayCurrCode
      }),
      socketConnected() {
        return this.$store.getters.isSocketConnected
      },
      ...mapGetters(['getLangKind'])
    },
    created() {
      this.$EventBus.$emit('pc-navi', ['notGnb']);
      this.$i18n.locale = this.getLangKind == 'KR' ? 'ko' : this.getLangKind == "EN" ? 'en' : /*default 'ko' */'ko'
    },
    beforeMount () {
      this.syncUniversalTime();
    },
    mounted() {
      // $(".FullScreenChart").css('height',  $(window).height());
    },
    methods: {
      ...mapActions(['logout']),
      i18nChange(val) {
        const langKind = val == 'ko' ? 'KR' : 'EN'
        this.$store.commit('setLangKind', langKind)
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
      syncUniversalTime () {
        const chartFullProperty = JSON.parse(localStorage.getItem(this.$route.name));
        if (chartFullProperty) {
          this.utcProp['utc'] = chartFullProperty.m_GlobalProperty.m_ChartUniversalTime;
          this.utcProp['checkedIndex'] = chartFullProperty.m_GlobalProperty.m_ChartUniversalIndex;
        }
        }
    }
  };
</script>
