<template>
  <div class="SmartSignalExpertHistory">
    <div class="expert_chart_cont">
      <div class="chart-form">
        <el-select
          class="result-select"
          v-model="signalSymbol"
          popper-class="expert_select"
          :placeholder="$t('m_signal.c007')"
          @change="onSignalSymbolChange"
          @visible-change="changeVisible"
        >
          <!-- 선택하세요 -->
          <el-option
            v-for="item in expert.symbols"
            :key="item.id"
            :label="$i18n.locale === 'en' ? item.enm : item.knm"
            :value="item.id"
          ></el-option>
        </el-select>
        <div v-if="curPrice" class="data-bx">
          <div class="btc-bx">
            <div class="btc_data">
              <span class="data_txt" :class="redOrBlue(curPrice.updnrate)">
                {{
                formatPrice(curPrice.paycurrcode, curPrice.curprc) }}
              </span>
              {{ curPrice.paycurrcode }}
            </div>
            <!-- 빨간 컬러 red / 파란 컬러 blue -->
            <div v-if="curPrice.paycurrcode !== 'KRW'" class="KRW_data">
              {{ toKRWPrice(curPrice.paycurrcode,
              curPrice.curprc) }} KRW
            </div>
          </div>
          <div class="per-bx">
            <div class="count_data" :class="redOrBlue(curPrice.updnrate)">
              {{ formatPrice(curPrice.paycurrcode,
              curPrice.diff) }}
            </div>
            <!-- 빨간 컬러 red / 파란 컬러 blue -->
            <div
              class="per_data"
              :class="redOrBlue(curPrice.updnrate)"
            >{{ formatRate(curPrice.updnrate) }}%</div>
            <!-- 빨간 컬러 red / 파란 컬러 blue -->
          </div>
        </div>
      </div>
      <div class="chart">
        <stock-graph
          ref="stockGraph"
          v-if="isApp === false"
          @show-alerm="isShowAlerm = true, alermProps = $event"
        ></stock-graph>
        <app-graph
          v-if="isApp === true"
          @chart-modal-alerm="isShowAlerm = true"
          :alerm-props="alermProps"
          @send-alerm-props="alermProps=$event"
        ></app-graph>
      </div>
    </div>
    <!-- 시작 : 차트 모달 팝업 영역 -->
    <div class="popup_wrapper_mobile">
      <div id="chart-popup-wrapper"></div>
      <modal-alerm v-if="isShowAlerm" @confirm="isShowAlerm = false, $refs.stockGraph.$refs.chart.setAlermProp(alermProps)" @close="isShowAlerm = false"
        :alerm-props="alermProps" @send-alerm-prop="alermProps[$event['key']]['value'] = $event['value']"></modal-alerm>
    </div>
    <!-- 끝 : 차트 모달 팝업 영역 -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { _ } from "vue-underscore";
import StockGraph from "../../order/StockGraph";
import AppGraph from "../../exchanges/AppGraph";
import ModalAlerm from '../../order/modal/ModalAlerm';

export default {
  name: "SmartSignalExpertHistory",
  props: ["expert"],
  components: {
    StockGraph,
    AppGraph,
    ModalAlerm
  },
  data() {
    return {
      /**
       * @property {array}   symbols                전문가 전략 종목
       * @property {string}  signalSymbol           신호히스토리 탭 선택된 종목
       * @property {object}  curPrice               신호히스토리 탭 선택된 종목 현재가 데이터
       */
      symbols: [],
      signalSymbol: null,
      curPrice: null,

      //하이브리드앱 체크
      isApp: false,
      //isApp: true,
      // 신호선 설정 팝업
      isShowAlerm: false, // 차트 모달(alerm) 노출여부
      isConfirmAlerm: false, // 차트 모달(alerm) 확인버튼 클릭여부
      alermProps: []
    };
  },
  computed: {
    /**
     * @vuex {getter} hogaUnit        호가 단위
     * @vuex {getter} btcKRWCurPrc    BTC/KRW 현재가
     * @vuex {getter} ethKRWCurPrc    ETH/KRW 현재가
     */
    ...mapGetters(["hogaUnit", "btcKRWCurPrc", "ethKRWCurPrc"])
  },
  methods: {
    /**
     *
     */
    changeVisible(e) {
      if (e) {
        this.$EventBus.$emit("downChart");
      } else {
        this.$EventBus.$emit("upChart");
      }
    },
    /**
     * 빨강/파랑 css 클래스
     * @param {number} number
     * @returns {string} "red"/"blue"
     */
    redOrBlue(number) {
      if (number == 0) return "";
      return number > 0 ? "red" : "blue";
    },
    /**
     * (+)00.00 포맷
     * @param {number} number
     * @returns {string} (+)00.00
     */
    formatRate(number) {
      let res = UnitManager.flooredDecimalWithCommas(number, 2);
      return number > 0 ? "+" + res : res;
    },
    /**
     * 호가 단위 포맷
     * @param {string} cd 통화 코드
     * @param {number} prc 가격
     * @returns {string} 호가 단위 포맷 스트링
     */
    formatPrice(cd, prc) {
      let self = this;
      var nLenBelowDigitArray = [1];
      UnitManager.getHogaUnit(
        self.hogaUnit,
        cd,
        prc,
        undefined,
        undefined,
        nLenBelowDigitArray
      );
      return UnitManager.fixedDecimalWithCommas(prc, nLenBelowDigitArray[0]);
    },
    /**
     * 가격 환산 + 포맷
     * @param {string} cd 결제통화코드
     * @param {number} prc 가격
     * @returns {string} 포맷 스트링
     */
    toKRWPrice(cd, prc) {
      let self = this;
      if (cd === "BTC") {
        return self.formatPrice("KRW", prc * self.btcKRWCurPrc);
      } else if (cd === "ETH") {
        return self.formatPrice("KRW", prc * self.ethKRWCurPrc);
      }
    },
    /**
     * 신호히스토리 탭 종목 변경 이벤트
     * @param {string} event 변경된 심볼 코드
     */
    onSignalSymbolChange(event) {
      let self = this;
      let symbol = _.findWhere(self.expert.symbols, {
        id: event
      }).symbol;
      self.$store.commit("setCurrentSymbol", symbol);
      self.$EventBus.$emit("changeCurrentSymbol", symbol);
      sessionStorage.setItem("currentSymbol", symbol);
      self.fetchCurPrice(symbol);
    },
    /**
     * 현재가 조회
     * i0018 조회하고 KVS0 실시간 설정
     * @param {string} symbol 종목 심볼 코드
     */
    fetchCurPrice(symbol) {
      let self = this;

      if (self.curPrice) {
        self.$socket.unregisterReal(
          "KVS0",
          [self.curPrice.symbol],
          self.$options.name
        );
      }

      self.$socket.sendProcessByName(
        "i0018",
        function(queryData) {
          var block = queryData.getBlockData("InBlock1")[0];
          // 조회구분
          block["symbolcnt"] = "1";
          block["qry_div"] = "4";
          block["paycurrcode"] = "99999";
          block["excode"] = "001";
          var block2 = queryData.queryObj["InBlock2"];
          block2.push({
            symbol: symbol
          });
        },
        function(queryData) {
          if (queryData != null) {
            self.curPrice = queryData["queryObj"]["OutBlock2"][0];
            self.$socket.registerReal(
              "KVS0",
              "symbol",
              [self.curPrice.symbol],
              self.$options.name,
              self.onPriceChange
            );
          } else {
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse(
              window.sessionStorage.getItem("lastErrorData")
            );
            if (errorData.trName != "i0018") return;

            self.$alert(self.$t("sys_err." + errorData.errCode), "", {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t("sys_err.a001")
            });
          }
        }
      );
    },
    /**
     * 현재가(KVS0) 실시간 콜백
     * @param {object} queryData KVS0 데이터
     */
    onPriceChange(queryData) {
      let self = this;
      let data = queryData.getBlockData("OutBlock1")[0];
      if (!self.curPrice) {
        return;
      }
      if (self.curPrice.symbol === data.symbol) {
        self.curPrice.curprc = data.execprice;
        self.curPrice = Object.assign(self.curPrice, data);
      }
    }
  },
  created() {
    //하이브리드 앱 체크
    this.isApp = afc.isDevice;
  },
  mounted() {
    let self = this;
    self.symbols = self.expert.symbols.slice(0);

    let first = self.expert.symbols[0];
    self.signalSymbol = first.id;
    self.$store.commit("setCurrentSymbol", first.symbol);
    self.$EventBus.$emit("changeCurrentSymbol", first.symbol);
    sessionStorage.setItem("currentSymbol", first.symbol);
    self.fetchCurPrice(first.symbol);
  },
  beforeDestroy() {
    let self = this;
    self.$socket.unregisterReal(
      "KVS0",
      [self.curPrice.symbol],
      self.$options.name
    );
  }
};
</script>
