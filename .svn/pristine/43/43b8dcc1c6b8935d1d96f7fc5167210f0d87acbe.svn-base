<template>
  <div class="TdiHistoryItem" @click="onItemClick" :router="true">
    <div class="table_cell tdi_name_wrap">
      <div class="img">
        <img :src="displayCoinImg(coin.cur_cd)">
      </div>
      <div class="cont">
        <p class="name">{{$i18n.locale === 'en' ? coin.cur_eng_nm : coin.cur_nm}}</p>
        <p class="unit">{{coin.cur_cd}}</p>
      </div>
    </div>
    <div class="table_cell tdi_state">
      <div :class="procStatClass">
        <p class="state_txt">{{$i18n.locale === 'en' ? coin.proc_stat_nm_en : coin.proc_stat_nm }}</p>
        <p class="period">{{coin.sale_str_dt | toMoment}} ~ {{coin.sale_limt_dt | toMoment}}</p>
      </div>
    </div>
    <div class="table_cell tdi_confirm">
      <p v-if="isListed" class="confirm">
        {{$t('m_tdi.b007')}}
        <!-- 상장확정 -->
      </p>
    </div>
    <div class="table_cell tdi-progress">{{progressRate}}%</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { _ } from "vue-underscore";

export default {
  /**
   * @property {object} coin props 로 받은 코인 데이터
   */
  props: ["coin"],
  data() {
    return {};
  },
  filters: {
    /**
     * 날짜 포맷
     * @param   {string} dt 날짜 20190101120000
     * @returns {string} 날짜 2019.01.01 12:00
     */
    toMoment(dt) {
      return moment(dt.substr(0, 8) + "T" + dt.substr(8, 4)).format(
        "YYYY.MM.DD HH:mm"
      );
    }
  },
  computed: {
    ...mapGetters(["tdiList"]),
    /**
     * 진행상태에 따른 css 클래스
     * @returns {string} css 클래스
     */
    procStatClass() {
      let self = this;
      switch (self.coin.proc_stat) {
        case "1":
          return "upcomming";
        case "2":
          return "proceed";
        default:
          return "terminate";
      }
    },
    /**
     * 상장여부 계산
     * @returns {boolean} 상장여부
     */
    isListed() {
      let self = this;
      return self.coin.invo_qty * 1 >= self.coin.soft_cp * 1;
    },
    /**
     * 진행율 계산
     * @returns {number} 진행율
     */
    progressRate() {
      let self = this;
      var rate =
        ((self.coin.invo_qty / self.coin.hard_cp) * 100).toFixed(2) * 1;
      return rate;
    }
  },
  methods: {
    /**
     * @vuex {action} fetchTDIDetail      TDI 상세 정보 조회 (ac610)
     * @vuex {action} selectTDI           상세 TDI 정보 저장
     */
    ...mapActions(["fetchTDIDetail", "selectTDI"]),
    /**
     * 코인 이미지 표시
     * @param {string} symbol 통화코드
     */
    displayCoinImg(symbol) {
      let coin = symbol.toLowerCase();
      let coinData = this.$store.state.data.coinImage;
      let coinURLArray = Object.values(coinData);
      let coinArrIdx = Object.keys(coinData).indexOf(coin);
      if (coinArrIdx < 0) {
        return require("@/images/coin/default.png");
      } else {
        return coinURLArray[coinArrIdx];
      }
    },
    /**
     * 목록 아이템 클릭 이벤트
     * 상세 정보 조회 결과와 코인 데이터를 병합하여 저장하고 상세 페이지로 이동
     */
    onItemClick() {
      let self = this;
      self.fetchTDIDetail({ cur_cd: self.coin.cur_cd }).then(
        res => {
          let tdi = Object.assign(
            res,
            _.findWhere(self.tdiList, { cur_cd: self.coin.cur_cd })
          );
          self.selectTDI(tdi);
          self.$router.push({ name: "mTdiCoinDetail" });
        },
        error => {
          self.$alert(error.errMsg, { confirmButtonText: "확인" });
        }
      );
    }
  }
};
</script>