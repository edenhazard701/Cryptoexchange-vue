<template>
  <div class="TdiCoin" :class="procStatClass">
    <div class="tdicoin-wrap">
      <div class="tdicoin-title">
        <img :src="displayCoinImg(coin.cur_cd)">
        <span class="coin_name">{{coin.cur_cd}}</span>
      </div>
      <div class="coin_introduce">
        <nl2br tag="span" :text="coin.rmrk"></nl2br>
      </div>
      <div class="coin_graph">
        <span class="coin_rate">{{ progressRate(coin) }}%</span>
        <div class="coin_progressbar" :style="{width: progressRate(coin) + '%'}"></div>
      </div>
      <div class="coin_cont">
        <ul>
          <li class="dot">
            <span class="label">
              {{$t('tdi.f009')}}
              <!-- 기간 -->
              :
            </span>
            {{coin.sale_str_dt | toMoment}} ~ {{coin.sale_limt_dt | toMoment}}
          </li>
          <li class="dot">
            <span class="label">{{$t('tdi.f010')}} :</span>
            <br>
            <span v-if="coin.prmy_krw_prc">
              - {{$t('tdi.g004', ['1'])}}
              <!-- 1차 -->
              : 1 {{coin.cur_cd}} = {{coin.prmy_krw_prc}} TDI
            </span>
            <br>
            <span v-if="coin.scnd_krw_prc">
              - {{$t('tdi.g004', ['2'])}}
              <!-- 2차 -->
              : 1 {{coin.cur_cd}} = {{coin.scnd_krw_prc}} TDI
            </span>
            <br>
            <span v-if="coin.thrd_krw_prc">
              - {{$t('tdi.g004', ['3'])}}
              <!-- 3차 -->
              : 1 {{coin.cur_cd}} = {{coin.thrd_krw_prc}} TDI
            </span>
          </li>
        </ul>
      </div>
    </div>
    <el-row class="coin-btn">
      <el-col
        class="progress"
      >{{ $i18n.locale === 'en' ? coin.proc_stat_nm_en : coin.proc_stat_nm }}</el-col>
      <el-col class="btn">
        <el-button type="primary" class="coin_btn" @click="onDetailClick()">
          {{$t('tdi.f011')}}
          <!-- 상세보기 -->
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";

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
    /**
     * 진행상태에 따른 css 클래스
     * @returns {string} css 클래스
     */
    procStatClass() {
      let self = this;
      switch (self.coin.proc_stat) {
        case "1":
          return "isUpcomming";
        case "2":
          return "isProceeding";
        default:
          return "isTerminate";
      }
    }
  },
  methods: {
    /**
     * @vuex {action} fetchTDIDetail      TDI 상세 정보 조회 (ac610)
     * @vuex {action} selectTDI           상세로 이동할 TDI 정보 저장
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
     * 진행율 계산
     * @param {object} item 하단 목록 아이템
     * @returns {number} 진행율
     */
    progressRate(item) {
      var rate = ((item.invo_qty / item.hard_cp) * 100).toFixed(2) * 1;
      return rate;
    },
    /**
     * 하단 목록 아이템 상세 보기 클릭 이벤트
     * 상세 정보 조회 결과와 코인 데이터를 병합하여 저장하고 상세 페이지로 이동
     */
    onDetailClick() {
      let self = this;
      self.fetchTDIDetail({ cur_cd: self.coin.cur_cd }).then(
        res => {
          let tdi = Object.assign(res, self.coin);
          self.selectTDI(tdi);
          self.$router.push({ name: "tdicoin" });
        },
        error => {
          self.$alert(error.errMsg, { confirmButtonText: "확인" });
        }
      );
    }
  }
};
</script>