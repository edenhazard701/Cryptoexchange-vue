<template>
  <div class="SpecialDetail" v-if="expert">
    <el-card shadow="never">
      <el-row>
        <el-col class="special-thumb">
          <span class="pic">
            <img :src="expert.prf_img_url">
          </span>
        </el-col>
        <el-col class="special-cont">
          <h1>
            <span class="name">{{ expert.expt_nnm }}</span>
            <span class="nick">{{ expert.expt_nm }}</span>
          </h1>
          <h2>{{ expert.expt_sinl_intr }}</h2>
          <div class="button-group">
            <el-button type="primary" class="vod" @click="viewVOD(expert.expt_url)">
              <a>
                <span class="ico-vod"></span>
                {{$t('signal.c007')}}
                <!-- 방송보기 -->
              </a>
            </el-button>
            <el-button v-if="expert.stt_cls_gb === '0'" type="primary" @click="onFollowClick(true)">
              {{$t('signal.c005')}}
              <!-- 스마트시그널 신청하기 -->
            </el-button>
            <el-button v-else type="warning" @click="onFollowClick(false)">
              {{$t('signal.c006')}}
              <!-- 스마트시그널 해지하기 -->
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-tabs v-model="tabValue" type="card" class="tab" @tab-click="onTabClick">
      <el-tab-pane :label="$t('signal.c008')">
        <!-- 소개 -->
        <div class="introduce-img">
          <img :src="expert.pr_img_url">
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('signal.c009')">
        <!-- 신호 히스토리 -->
        <div v-if="expert.stt_cls_gb === '1'" class="chart">
          <!-- 기본 시세 -->
          <div v-if="curPrice" class="stock-display">
            <el-row class="StockDisplay">
              <el-col class="stockName">
                <div class="item-name-wrap">
                  <el-row class="item-name">
                    <el-col class="item-logo" style="padding-top:17px !important;">
                      <img :src="$store.getters.getCoinImage">
                    </el-col>
                    <el-col class="item-symbol" style="padding-top:14px !important;">
                      <el-select v-model="signalSymbol" placeholder @change="onSignalSymbolChange">
                        <el-option
                          v-for="item in symbols"
                          :key="item.id"
                          :label="$i18n.locale === 'en' ? item.enm : item.knm"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                      <!-- <span class="unit">BTC</span> -->
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col class="now-price">
                <!-- 전일종가 > 현재가: red, 전일종가 < 현재가: blue, 전일종가 = 현재가: '' -->
                <span
                  class="price"
                  :class="redOrBlue(curPrice.updnrate)"
                >{{ formatPrice(curPrice.paycurrcode, curPrice.curprc) }}</span>
                <span class="krw">{{ curPrice.paycurrcode }}</span> &nbsp;&nbsp;&nbsp;
                <span v-if="curPrice.paycurrcode !== 'KRW'">
                  {{ toKRWPrice(curPrice.paycurrcode, curPrice.curprc) }}
                  <span class="krw">KRW</span>
                </span>
                <!-- 환산가 -->
                <br>
                <span class="label">
                  {{$t('signal.d023')}}
                  <!-- 전일대비 -->
                </span>
                <!-- 변동률 > 0: red, 변동률 < 0: blue, 변동율 = 0: '' -->
                <span :class="redOrBlue(curPrice.updnrate)">
                  {{ formatRate(curPrice.updnrate) }}% &nbsp;&nbsp;
                  <span
                    class="arrow"
                    :class="upOrDown(curPrice.diff)"
                  ></span>
                  {{ formatPrice(curPrice.paycurrcode, curPrice.diff) }}
                </span>
              </el-col>
              <el-col class="high-price">
                <span class="label">
                  {{$t('signal.d024')}}
                  <!-- 당일고가 -->
                </span>
                <span class="price red">{{ formatPrice(curPrice.paycurrcode, curPrice.highprc) }}</span>
                <span v-if="curPrice.paycurrcode !== 'KRW'">
                  {{ toKRWPrice(curPrice.paycurrcode, curPrice.highprc) }}
                  <span class="krw">KRW</span>
                </span>
                <br>
                <span class="label">
                  {{$t('signal.d025')}}
                  <!-- 당일저가 -->
                </span>
                <span class="price blue">{{ formatPrice(curPrice.paycurrcode, curPrice.lowprc) }}</span>
                <span v-if="curPrice.paycurrcode !== 'KRW'">
                  {{ toKRWPrice(curPrice.paycurrcode, curPrice.lowprc) }}
                  <span class="krw">KRW</span>
                </span>
              </el-col>
              <el-col class="trade-price">
                <div>
                  <span class="label">
                    {{$t('signal.d026')}}
                    <!-- 거래금액(24H) -->
                  </span>
                  <span class="value">
                    {{ formatAmount(curPrice.paycurrcode, curPrice.cumdealcost) }}
                    <span
                      class="krw"
                    >{{ curPrice.paycurrcode }}</span>
                  </span>
                </div>
                <div v-if="curPrice.paycurrcode !== 'KRW'">
                  {{ toKRWAmount(curPrice.paycurrcode, curPrice.cumdealcost) }}
                  <span class="krw">KRW</span>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="stock-graph" v-if="tabValue === '1' && expert.stt_cls_gb ==='1' && symbols.length > 0">
            <stock-graph 
              ref="stockGraph"
              @show-alerm="showModalAlerm($event)"
              @show-universal-time="showModalUniversalTime($event)"
              :utcProp="utcProp"></stock-graph>
          </div>
        </div>
        <div v-if="expert.stt_cls_gb === '0'" class="info">
          <ul>
            <li class="dot">
              {{$t('signal.d038')}}
              <!-- 과거 3개월의 전문가 신호를 참고할 수 있습니다.
              (스마트시그널 신청 후 전체 시그널 히스토리를 볼 수 있습니다)-->
            </li>
            <li class="dot">
              {{$t('signal.d039')}}
              <!-- 전문가 구독하고 실시간 매매 시그널을 참고하여 매매하세요! -->
            </li>
            <li class="dot">
              {{$t('signal.d040')}}
              <!-- 스마트시그널 신청시 해당 전문가의 신호를 실시간으로 받을 수 있습니다. -->
            </li>
            <li class="dot highlight">
              {{$t('signal.d041')}}
              <!-- 코벡스에서 다양한 심사 체계를 통과하여 검증된 국내 최고 전문가입니다. -->
            </li>
          </ul>
        </div>
        <div v-else class="info">
          <ul>
            <li class="dot">
              {{$t('signal.d027')}}
              <!-- 1계정당 1명의 전문가 선택이 가능합니다. -->
            </li>
            <li class="dot">
              {{$t('signal.d028')}}
              <!-- 다른 전문가 신호를 받고 싶다면 해지 후 재신청 해주세요. -->
              <span class="caution">
                {{$t('signal.d029')}}
                <!-- (해지 당일 재신청 불가) -->
              </span>
            </li>
            <li class="dot highlight">
              {{$t('signal.d030')}}
              <!-- 투자의 판단과 책임은 모두 본인입니다. 과도한 투자와 손실에 유의하세요. -->
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('signal.c010')">
        <!-- 실적 -->
        <el-select
          v-if="symbols.length > 0"
          class="result-select"
          v-model="profitSymbol"
          placeholder
          @change="onProfitSymbolChange"
        >
          <el-option
            v-for="item in symbols"
            :key="item.id"
            :label="$i18n.locale === 'en' ? item.enm : item.knm"
            :value="item.id"
          ></el-option>
        </el-select>
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
        <div class="info">
          <ul>
            <li class="dot">
              {{$t('signal.d034')}}
              <!-- 전문가의 수익률은 발생 신호 이후 가격 터치시 매수/매도가 가상으로 진행되며 실제 매매 수익률이 아닙니다. -->
            </li>
            <li class="dot">
              {{$t('signal.d035')}}
              <!-- 전문가의 공정한 수익률 산출을 위해 매회 매수금액은 잔고 100% 매수 기준입니다. -->
            </li>
            <li class="dot highlight">
              {{$t('signal.d036')}}
              <!-- 전문가의 신호와 수익률은 투자자 참고용입니다. 과도한 투자와 손실에 유의하세요. -->
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 구독하기 팝업 -->
    <el-dialog
      :title="$t('signal.d005')"
      :visible.sync="followConfirmVisible"
      width="440px"
      class="signal-request"
    >
      <!-- 추가 수수료 부과에 대한 동의 -->
      <div class="request-info">
        <ul>
          <li class="dot">
            {{$t('signal.d006')}}
            <!-- 구독 이후 매매시 전문가 구독 부가수수료(0.05%)가 전체 종목 및 마켓에 적용됩니다. -->
          </li>
          <li class="dot">
            {{$t('signal.d007')}}
            <!-- 수수료 -->
            <br>
            <span v-html="$t('signal.d008')"></span>
            <!-- 기존 매매수수료 (0.05%) + 전문가 수수료 (0.05%)<br>
            MAKER / TAKER 동일-->
          </li>
          <li class="dot">
            {{$t('signal.d009')}}
            <!-- 전문가 구독의 신청 및 해지 시점 기준으로 수수료가 부과됩니다. -->
          </li>
          <li class="dot">
            {{$t('signal.d010')}}
            <!-- 신청 전 미체결 잔여가 신청 후 체결될 경우 전문가 수수료를 포함하여 부과되고
                        반대로 신청 후 미체결 잔여가 해지 후 체결될 경우 일반 수수료가 부과되오니 
            이점 유의해 주세요.-->
          </li>
        </ul>
        <div class="agree">
          <span class="label">
            {{$t('signal.d011')}}
            <!-- 위의 구독 수수료에 대한 이의가 없음에 동의합니다 -->
          </span>
          <el-checkbox v-model="agreeChk" @change="agreeChkOk"></el-checkbox>
        </div>
        <div class="error-msg" :class="{'isError':chkError}">
          {{$t('signal.d037')}}
          <!-- 추가 수수료 부과에 동의해 주세요. -->
        </div>
      </div>
      <div class="request-info1">
        <h2>
          {{$t('signal.d012', [expert.expt_nnm])}}
          <!-- 전문가({{ expert.expt_nnm }})를 구독하시겠습니까? -->
        </h2>
        <span class="dot">
          {{$t('signal.d013')}}
          <!-- 전문가를 구독하시면 실시간으로 전문가의 매매신호를 LMS로 보내드립니다. -->
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="followConfirmVisible = false">
          {{$t('signal.d015')}}
          <!-- 취소 -->
        </el-button>
        <el-button type="primary" @click="onFollowConfirm">
          {{$t('signal.d017')}}
          <!-- 확인 -->
        </el-button>
      </span>
    </el-dialog>

    <!-- 해지하기 팝업 -->
    <el-dialog class="special-unfollow" :visible.sync="unfollowConfirmVisible" width="400px">
      <div class="unfollow-cont">
        <h1>
          {{$t('signal.d018-1', [expert.expt_nnm])}}
          <!-- 전문가({{ expert.expt_nnm }})<br>
          구독 취소를 하시겠습니까?-->
        </h1>
        {{$t('signal.d018-2')}}
        <!-- 서비스 취소 후 당일 24:00까지 재신청이 불가능합니다. -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="unfollowConfirmVisible = false">
          {{$t('signal.d020')}}
          <!-- 취소 -->
        </el-button>
        <el-button type="primary" @click="onUnfollowConfirm">
          {{$t('signal.d019')}}
          <!-- 확인 -->
        </el-button>
      </span>
    </el-dialog>

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
import StockGraph from "../exchanges/StockGraph.vue";
import ModalAlerm from "../exchanges/modal/ModalAlerm.vue";
import ModalUniversalTime from "../exchanges/modal/ModalUniversalTime.vue";
import SpecialPerformance from "./SpecialPerformance";
import { mapState, mapGetters, mapActions } from "vuex";
import moment from "moment";
import { _ } from "vue-underscore";

export default {
  name: "SpecialDetail",
  components: {
    StockGraph,
    ModalAlerm,
    ModalUniversalTime,
    SpecialPerformance
  },
  data() {
    return {
      /**
       * @property {object}  expert                 전문가 데이터
       * @property {boolean} followConfirmVisible   구독 컨펌 팝업 플래그
       * @property {boolean} unfollowConfirmVisible 해지 컨펌 팝업 플래그
       * @property {string}  tabValue               탭 인덱스
       * @property {array}   symbols                전문가 전략 종목
       * @property {string}  profitSymbol           실적 탭 선택된 종목
       * @property {string}  signalSymbol           신호히스토리 탭 선택된 종목
       * @property {object}  curPrice               신호히스토리 탭 선택된 종목 현재가 데이터
       * @property {array}   profitHistory          실적 데이터
       * @property {boolean} agreeChk               구독 컨펌 팝업 동의 체크 여부
       * @property {boolean} chkError               구독 컨펌 팝업 동의 확인
       * @property {boolean} hasFollowing           구독중인 전문가 유무
       */
      expert: {},
      followConfirmVisible: false,
      unfollowConfirmVisible: false,
      tabValue: "0",
      symbols: [],
      profitSymbol: null,
      signalSymbol: null,
      curPrice: null,
      profitHistory: [],
      agreeChk: false,
      chkError: false,
      hasFollowing: false,

      // 알림설정
      isShowAlerm: false,
      alermProps: [],

      // 세계시간
      isShowModalUniversalTime: false,
      utcProp: {
        timeZone: "Asia/Seoul",
        utc: "+09:00"
      }
    };
  },
  methods: {
    /**
     * @vuex {action} fetchSmartSignalExpertProfitHistory 전문가 실적 조회 (ss014)
     * @vuex {action} fetchSmartSignalExpertSymbols       전문가 전략종목 조회 (ss039)
     * @vuex {action} followExpert                        전문가 구독/해지 (ss022)
     * @vuex {action} fetchFollowingExperts               구독중인 전문가 리스트 (ss041)
     */
    ...mapActions([
      "fetchSmartSignalExperts",
      "fetchSmartSignalExpertProfitHistory",
      "fetchSmartSignalExpertSymbols",
      "followExpert",
      "fetchFollowingExperts"
    ]),
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
     * 위/아래 css 클래스
     * @param {number} number
     * @returns {string} "red"/"blue"
     */
    upOrDown(number) {
      if (number == 0) return "";
      return number > 0 ? "up" : "down";
    },
    /**
     * (+)00.00 포맷
     * @param {number} number
     * @returns {string} (+)00.00
     */
    formatRate(number) {
      let self = this;
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
     * 금액 포맷
     * @param {string} cd 결제통화코드
     * @param {number} amt 금액
     * @returns {string} 포맷 스트링
     */
    formatAmount(cd, amt) {
      let digits = cd === "BTC" || cd === "ETH" ? 2 : 0;
      return UnitManager.fixedDecimalWithCommas(amt, digits);
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
     * 금액 환산 + 포맷
     * @param {string} cd 결제통화코드
     * @param {number} amt 금액
     * @returns {string} 포맷 스트링
     */
    toKRWAmount(cd, amt) {
      let self = this;
      if (cd === "BTC") {
        return UnitManager.fixedDecimalWithCommas(amt * self.btcKRWCurPrc, 0);
      } else if (cd === "ETH") {
        return UnitManager.fixedDecimalWithCommas(amt * self.ethKRWCurPrc, 0);
      }
    },
    /**
     * 신청 컨펌 팝업 동의 체크 검사
     */
    agreeChkOk() {
      let self = this;
      if (self.agreeChk == true) {
        self.chkError = false;
      } else {
        self.chkError = true;
      }
    },
    /**
     * 로그인 상태이면 flag 에 따라 구독/해지 컨펌 노출
     * @param {boolean} flag true(구독)/false(해지)
     */
    onFollowClick(flag) {
      let self = this;
      if (!self.getUserId) {
        self.$confirm(self.$t("signal.d031"), {
          dangerouslyUseHTMLString: true,
          confirmButtonText: self.$t("signal.d019"),
          cancelButtonText: self.$t("signal.d020")
        }).then(() => {
          self.$router.push({ name: "login" });
        }).catch(() => {});
      } else {
        if (flag) {
          self.followConfirmVisible = true;
        } else {
          self.unfollowConfirmVisible = true;
        }
      }
    },
    /**
     * 동의 체크 했으면 컨펌 팝업 닫고 구독 요청
     */
    onFollowConfirm() {
      let self = this;
      if (self.agreeChk == false) {
        self.chkError = true;
      } else {
        let self = this;
        self.followConfirmVisible = false;
        self.followExpert({
          stt_cls: "1",
          expt_rgst_no: self.expert.expt_rgst_no
        }).then(res => {
          if (res["rslt_cls"] === "0") {
            let code = res["rslt_msg"].split(":")[0];
            self.alertFollowError(code);
          } else {
            self.expert.stt_cls_gb = "1";
            self.$alert(self.$t("signal.d016"), {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t("signal.d017")
            });
            self.$EventBus.$emit(
              "smartSignalExpertFollowed",
              self.expert.expt_rgst_no
            );
          }
        });
      }
    },
    /**
     * 컨펌 팝업 닫고 해지 요청
     */
    onUnfollowConfirm() {
      let self = this;
      self.unfollowConfirmVisible = false;
      self.followExpert({
        stt_cls: "0",
        expt_rgst_no: self.expert.expt_rgst_no
      }).then(res => {
        if (res["rslt_cls"] === "0") {
          let code = res["rslt_msg"].split(":")[0];
          self.alertFollowError(code);
        } else {
          self.expert.stt_cls_gb = "0";
          self.$alert(self.$t("signal.d021"), {
            dangerouslyUseHTMLString: true,
            confirmButtonText: self.$t("signal.d022")
          });
          self.$EventBus.$emit(
            "smartSignalExpertUnfollowed",
            self.expert.expt_rgst_no
          );
        }
      });
    },
    /**
     * 구독/해지 에러 얼럿
     * @param {string} code 에러 코드
     */
    alertFollowError(code) {
      let self = this;
      self.$alert(self.$t("signal.d001-" + code.slice(-1)), {
        dangerouslyUseHTMLString: true,
        confirmButtonText: self.$t("signal.d002")
      });
    },
    /**
     * 탭 클릭 이벤트
     * 신호히스토리 탭("1") - 로그인 중이고 구독중인 전문가 일 경우 컨텐츠 노출
     */
    onTabClick(tab, event) {
      let self = this;
      if (tab.index === "1") {
        //신호히스토리
        if (!self.getUserId) {
          self.$confirm(self.$t("signal.d031"), {
            dangerouslyUseHTMLString: true,
            confirmButtonText: self.$t("signal.d019"),
            cancelButtonText: self.$t("signal.d020")
          }).then(() => {
            self.$router.push({ name: "login" });
          }).catch(() => {
            self.tabValue = "0";
          });
        } else {
          if (self.expert.stt_cls_gb === "1") {
            if (self.symbols.length > 0) {
              self.signalSymbol = self.symbols[0].id;
              self.$store.commit("setCurrentSymbol", self.symbols[0].symbol);
              self.$EventBus.$emit("changeCurrentSymbol", self.symbols[0].symbol);
              sessionStorage.setItem("currentSymbol", self.symbols[0].symbol);
              self.fetchCurPrice(self.symbols[0].symbol);
            } else {
              self.$alert(self.$t("signal.d044"), {
                confirmButtonText: self.$t("signal.d019"),
                callback: action => {
                  self.tabValue = "0";
                }
              });
            }
          } else {
            self.$alert(self.hasFollowing ? self.$t("signal.d033") : self.$t("signal.d032"), {
              confirmButtonText: self.$t("signal.d019"),
              callback: action => {
                self.tabValue = "0";
              }
            });
          }
        }
      } else if (tab.index === "2") {
        if (self.symbols.length > 0) {
          self.profitSymbol = self.symbols[0].id;
        }
      }
    },
    /**
     * 신호히스토리 탭 종목 변경 이벤트
     * @param {string} event 변경된 심볼 코드
     */
    onSignalSymbolChange(event) {
      let self = this;
      let symbol = _.findWhere(self.symbols, { id: event }).symbol;
      self.$store.commit("setCurrentSymbol", symbol);
      self.$EventBus.$emit("changeCurrentSymbol", symbol);
      sessionStorage.setItem("currentSymbol", symbol);
      self.fetchCurPrice(symbol);
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
        expt_rgst_no: self.expert.expt_rgst_no,
        symbol: _.findWhere(self.symbols, { id: self.profitSymbol }).symbol,
        slt_dir: dir ? dir : "0",
        date: date ? date : "99999999",
        count: "15"
      }).then(res => {
        self.profitHistory = res;
      });
    },
    /**
     * 현재가 조회
     * i0018 조회하고 KVS0 실시간 설정
     * @param {string} symbol 종목 심볼 코드
     */
    fetchCurPrice(symbol) {
      let self = this;

      if (self.curPrice) {
        self.$socket.unregisterReal("KVS0", [self.curPrice.symbol], self.$options.name);
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
          if (queryData == null) {
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse(
              window.sessionStorage.getItem("lastErrorData")
            );
            if (errorData.trName != "i0018") return;

            self.$alert(self.$t("sys_err." + errorData.errCode), "", {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t("sys_err.a001")
            });
          } else {
            self.curPrice = queryData["queryObj"]["OutBlock2"][0];
            self.$socket.registerReal(
              "KVS0",
              "symbol",
              [self.curPrice.symbol],
              self.$options.name,
              self.onPriceChange
            );
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
    },
    // 알림 모달 팝업
    showModalAlerm(alermProps) {
      this.isShowAlerm = true;
      this.alermProps = alermProps;
      this.isShowModalUniversalTime = false;
    },
    // 세계시간 리스트
    showModalUniversalTime(isFlag) {
      this.isShowModalUniversalTime = (isFlag !== undefined) ? isFlag : !this.isShowModalUniversalTime;
    },
    /**
     * 방송보기 새창 열기
     * @param {string} url 새창 URL
     */
    viewVOD(url) {
      var newOpen = window.open(url);
    },
    getData() {
      let self = this;

      let expt_rgst_no = self.$route.query.expt_rgst_no;

      //전문가정보 불러오기
      var param = {
        expt_rgst_no: expt_rgst_no
      };
      self.fetchSmartSignalExperts(param).then(res => {
        if (res.res.out_cnt == 1) {
          self.expert = res.list[0];
        }
      });

      //전문가전략 종목 조회, 종목 셀렉트 데이터 설정, 실적 데이터 조회
      self.fetchSmartSignalExpertSymbols(expt_rgst_no).then(res => {
        if (res.length > 0) {
          self.symbols = res.map(item => {
            var found = self.nameList.find(function (element) {
              return element['o_symbol'] == item.symbol;
            });
            item.knm = found['o_inst_eng_abbr'];
            item.enm = found['o_inst_eng_abbr'];
            item.id = item.symbol + item.expt_strtg_key;
            return item;
          });
          self.profitSymbol = self.symbols[0].id;
          self.signalSymbol = self.symbols[0].id;
          self.fetchProfitHistory();
        }
      });

      // 구독중인 전문가 리스트 조회
      if (self.getUserId) {
        self.fetchFollowingExperts().then(res => {
          self.hasFollowing = res.length > 0;
        });
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
  },
  computed: {
    /**
     * @vuex {getter} getUserId    유저 아이디
     * @vuex {getter} getCoinByCd  통화의 통화정보
     * @vuex {getter} hogaUnit     호가 단위
     * @vuex {getter} btcKRWCurPrc BTC/KRW 현재가
     * @vuex {getter} ethKRWCurPrc ETH/KRW 현재가
     */
    ...mapState({
        nameList: state => state.data['n1001'],
      }),
    ...mapGetters(["getUserId", "getCoinByCd", "hogaUnit", "btcKRWCurPrc", "ethKRWCurPrc"]),
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
            label: self.$t("signal.d042"),
            data: res.map(item => item.acc_prof),
            type: "line"
          },
          {
            label: self.$t("signal.d043"),
            backgroundColor: res.map(item =>
              item.td_prof < 0 ? "#304ffe" : "#4fd165"
            ),
            data: res.map(item => item.td_prof)
          }
        ]
      };
    }
  },
  mounted() {
    let self = this;

    self.$EventBus.$on('loadStockData', self.loadStockDataCallback);
    self.$EventBus.$on('resetLoadStockData', self.resetLoadStockDataCallback);
    if (self.nameList.length > 0 && !self.dataLoaded) {
      self.$EventBus.$emit('loadStockData');
    }
  },
  beforeDestroy() {
    let self = this;
    if (self.curPrice) {
      self.$socket.unregisterReal("KVS0", [self.curPrice.symbol], self.$options.name);
    }

    self.$EventBus.$off('loadStockData', self.loadStockDataCallback);
    self.$EventBus.$off('resetLoadStockData', self.resetLoadStockDataCallback);
  }
};
</script>