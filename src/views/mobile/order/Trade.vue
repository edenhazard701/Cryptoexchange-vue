<template>
  <div class="TradeVue">
    <el-row>
      <el-col :span="9" class="trade-view-lft">
        <stock-price></stock-price>
      </el-col>
      <el-col :span="15" class="trade-view-rgt">
        <div v-if="!isLoggedIn" class="not-login">
          {{$t('exchange.f001')}}
          <el-button @click="goLogin">{{$t('exchange.f002')}}</el-button>
        </div>
        <el-tabs type="card" @tab-click="tabClicked"> 
          <!-- @tab-click="handleClick" -->
          <el-tab-pane :label="$t('m_exchange.c009')">
            <stock-buy></stock-buy>
          </el-tab-pane>
          <el-tab-pane :label="$t('m_exchange.c010')">
            <stock-sell></stock-sell>
          </el-tab-pane>
          <el-tab-pane :label="$t('m_exchange.c011')">
            <not-concluded></not-concluded>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import StockPrice from './StockPrice.vue';
import NotConcluded from './NotConcluded.vue';
import StockBuy from '../../exchanges/StockBuy.vue';
import StockSell from '../../exchanges/StockSell.vue';
import { mapState } from 'vuex';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    StockBuy,
    StockSell,
    StockPrice,
    NotConcluded
  },
  data () {
    return {
      name: 'Trade',
      watchParam: {            /****** 검색조건 ******/
        mbr_ccd: '01',         // 사용자구분 (00:직원 01:고객)
        hndl_st_vl: '1',       // 조건상태 (0:감시해제 1:감시중 2:미체결감시중 3:조건만족 4:유효기간만료 98:전체조회(감시중제외) 99:전체(감시중 포함))
        symbol: '',            // 처리상태 (space:전체 0:감시해제 1:감시중 2:미체결감시중 3:조건)
      },
    };
  },
  computed: {
    ...mapState({ currentSymbol : state => state.data.currentSymbol }),
    ...mapGetters(['isLoggedIn', 'getLangKind', 'getUserId'])
  },
  methods: {
    ...mapActions(['logout', 'getOrderAble']),
    tabClicked(tab, event) {
      if (tab.index == 2) {
        this.watchParam['symbol'] = this.currentSymbol
        this.$store.dispatch('searchWatchList', this.watchParam).then((obj) => {});
      } else {
        this.getOrderAble();
      }
    },
    goLogin() {
      this.$router.push('/login');
    },
    onRB03Notification() {
      this.getOrderAble();
    },
    socketConnectedCallback() {
      if (this.getUserId) {
        this.$socket.registerReal("RB03", "key_user_id", [this.getUserId], this.name, this.onRB03Notification);
      }
    },
  },
  created() {
    var self = this;
    if(localStorage.getItem('linkSymbol')){
      //self.$store.state.data.currentSymbol = localStorage.getItem('linkSymbol');
      self.$store.commit('setCurrentSymbol', localStorage.getItem('linkSymbol'));
    }
  },
  mounted() {
    if (this.$store.getters.isSocketConnected) {
      this.socketConnectedCallback();
    }
    this.$EventBus.$on('socketConnected', this.socketConnectedCallback);
  },
  beforeDestroy() {
    if (this.getUserId) {
      this.$socket.unregisterReal("RB03", [this.getUserId], this.name);
    }
    this.$EventBus.$off('socketConnected', this.socketConnectedCallback);
  }
};
</script>
