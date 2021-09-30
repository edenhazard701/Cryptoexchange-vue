<template>
  <div v-if="symbols && symbols.length > 0" class="SmartSignalExpertRecord">
    <!-- 그래프 영역 -->
    <div class="expert_chart_cont">
      <div class="chart-form">
        <el-select
          class="result-select"
          v-model="profitSymbol"
          popper-class="expert_select"
          :placeholder="$t('m_signal.c007')"
          @change="onProfitSymbolChange"
        >
          <!-- 선택하세요 -->
          <el-option
            v-for="item in expert.symbols"
            :key="item.id"
            :label="$i18n.locale === 'en' ? item.enm : item.knm"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="chart">
        <el-button
          icon="el-icon-arrow-left"
          type="info"
          circle
          class="arrow_left"
          @click="onArrowClick('0')"
        ></el-button>
        <el-button
          icon="el-icon-arrow-right"
          type="info"
          circle
          class="arrow_right"
          @click="onArrowClick('1')"
        ></el-button>
        <SpecialPerformance :chartData="profitHistoryChartData"></SpecialPerformance>
      </div>
    </div>
    <!-- //그래프 영역 -->
    <el-row class="expert-chart-info">
      <el-row class="info-lst">
        <ul class="expert-info-lst">
          <li>
            {{$t('m_signal.b011')}}
            <!-- 전문가의 수익률은 발생 신호 이후 가격 터치시 매수/매도가 가상으로 진행되며 실제 매매 수익률이 아닙니다 -->
          </li>
          <li>
            {{$t('m_signal.b012')}}
            <!-- 전문가의 공정한 수익률 산출을 위해 매수 비율을 곱하지 않고 매회 매수금액은 잔고 100% 매수로 산출됩니다 -->
          </li>
          <li>
            {{$t('m_signal.b013')}}
            <!-- 전문가의 신호와 수익률은 투자자 참고용입니다. 과도한 투자와 손실에 유의하세요 -->
          </li>
        </ul>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import SpecialPerformance from "../../../smartinvest/SpecialPerformance.vue";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { _ } from "vue-underscore";

export default {
  /**
   * @property {object} expert props 로 받은 전문가 상세 데이터
   */
  props: ["expert"],
  components: {
    SpecialPerformance
  },
  data() {
    return {
      /**
       * @property {string}  expertId      전문가 아이디
       * @property {array}   symbols       전문가 전략 종목
       * @property {string}  profitSymbol  실적 탭 선택된 종목
       * @property {array}   profitHistory 실적 데이터
       */
      expertId: null,
      symbols: [],
      profitSymbol: null,
      profitHistory: []
    };
  },
  computed: {
    /**
     * 실적 탭 차트에 바인딩 하는 실적 데이터(self.profitHistory)를 변환한 데이터
     * @returns {object} 차트 데이터
     */
    profitHistoryChartData() {
      let self = this;
      moment.locale(self.$i18n.locale);
      let res = self.profitHistory;
      return {
        dates: res.map(item => item.date),
        labels: res.map(item => moment(item.date, "YYYYMMDD").format("MMM Do")),
        datasets: [
          {
            label: self.$t("m_signal.c014"),
            data: res.map(item => item.acc_prof),
            type: "line"
          },
          {
            label: self.$t("m_signal.c015"),
            backgroundColor: res.map(item =>
              item.td_prof < 0 ? "#304ffe" : "#4fd165"
            ),
            data: res.map(item => item.td_prof)
          }
        ]
      };
    }
  },
  methods: {
    /**
     * @vuex {action} fetchSmartSignalExpertProfitHistory 전문가 실적 조회 (ss014)
     */
    ...mapActions(["fetchSmartSignalExpertProfitHistory"]),
    /**
     * 실적 탭 차트 좌우 화살표 클릭 이벤트
     * @param {string} val '0' - 왼쪽, '1' - 오른쪽
     * 왼쪽은 현재 차트데이터의 첫 날짜, 오른쪽은 마지막 날짜로 실적 데이터 조회
     */
    onArrowClick(val) {
      let self = this;
      let curDates = self.profitHistoryChartData.dates;
      if (curDates.length == 0) {
        return;
      }
      self.fetchProfitHistory(val, val === "1" ? curDates[curDates.length - 1] : curDates[0]);
    },
    /**
     * 실적 탭 종목 변경 이벤트
     * @param {string} event 변경된 심볼 코드
     */
    onProfitSymbolChange(event) {
      let self = this;
      self.clearProfitHistory();
      self.fetchProfitHistory();
    },
    /**
     * 실적 데이터 초기화
     */
    clearProfitHistory() {
      let self = this;
      self.profitHistory = [];
    },
    /**
     * 실적 데이터 조회
     * 조회 방향, 조회 기준 날짜로 param 설정하고 실적 데이터 조회
     * @param {string} dir 조회 방향
     * @param {string} date 조회 기준 날짜
     */
    fetchProfitHistory(dir, date) {
      let self = this;
      self.fetchSmartSignalExpertProfitHistory({
        expt_rgst_no: self.expertId,
        symbol: _.findWhere(self.symbols, { id: self.profitSymbol }).symbol,
        slt_dir: dir ? dir : "0",
        date: date ? date : "99999999",
        count: "7"
      }).then(res => {
        self.profitHistory = res;
      });
    }
  },
  mounted() {
    let self = this;
    if (self.expert.symbols.length > 0) {
      self.symbols = self.expert.symbols.slice(0);
      self.expertId = self.expert.expt_rgst_no;
      self.profitSymbol = self.expert.symbols[0].id;
      self.fetchProfitHistory();
    }
  }
};
</script>

