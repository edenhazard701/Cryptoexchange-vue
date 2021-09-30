<template>
  <div class="TdiJoin">
    <div v-if="able">
      <el-row class="tdi_cash_wrap">
        <el-col :span="12">
          <h2 class="tag">
            {{$t('tdi.d006')}}
            <!-- 보유 TDI 캐시 -->
            <el-button v-if="isPC === false" class="text-btn question-btn" @click="viewInfo">
              <i class="el-icon-question"></i>
            </el-button>

            <el-popover
              v-if="isPC === true"
              placement="bottom-start"
              width="400"
              trigger="hover"
              popper-class="tdi-order-help"
            >
              <span class="etc">
                {{$t('tdi.d017')}}
                <!-- TDI 캐시는 TDI 참여 시에만 사용가능한 캐시로 TDI 기간동안 거래를 하시면 수수료와 1:1 비율로 지급됩니다. -->
              </span>
              <el-button type="text" slot="reference" class="question">
                <i class="el-icon-question"></i>
              </el-button>
            </el-popover>
          </h2>
        </el-col>
        <el-col :span="12">
          <p class="tdi_cash_txt">
            <span class="tdi-cash">{{format(able.remn_cash)}}</span> TDI
          </p>
        </el-col>
      </el-row>

      <el-row class="tdi-mycash">
        <el-col :span="12" class="tit">
          {{able.cur_cd}} {{$t('tdi.e005')}}
          <!-- 가격 -->
          ({{$t('tdi.g004', [able.seq])}})
        </el-col>
        <el-col :span="12" class="txt price">
          <span class="num">1</span>
          {{able.cur_cd}} =
          <span class="num">{{format(able.tdi_invo_prc)}}</span> TDI
        </el-col>
        <el-col :span="12" class="tit">
          {{$t('tdi.d005')}}
          <!-- 참여가능수량 -->
          ({{$t('tdi.g004', [able.seq])}})
        </el-col>
        <el-col :span="12" class="txt">
          <span class="num">{{format(able.invo_able_qty)}}</span>
          {{able.cur_cd}}
        </el-col>
        <el-col :span="12" class="tit">
          {{$t('tdi.d009')}}
          <!-- 나의 참여가능 한도 -->
        </el-col>
        <el-col :span="12" class="txt">
          <span class="num">{{format(able.my_able_limt)}}</span>
          {{able.cur_cd}}
        </el-col>
      </el-row>

      <el-form ref="tdiForm" :model="tdiForm" :rules="tdiRule">
        <el-form-item prop="amount" class="input" :label="$t('tdi.d010')">
          <!-- 참여 수량 -->
          <div v-if="isPC" class="join-amount">
            <el-input
              style="ime-mode: disabled;"
              v-model="tdiForm.amount"
              placeholder="0"
              @keyup.native="onAmountKeyUp"
              @keydown.native="onAmountKeyDown"
              :class="[able.cur_cd.length == '4' ? 'pad4' : able.cur_cd.length == '5' ? 'pad5': '']"
            ></el-input>
            <span class="append">{{able.cur_cd}}</span>
          </div>
          <div v-else class="join-amount">
            <el-input
              type="number"
              v-model="tdiForm.amount"
              placeholder="0"
              :class="[able.cur_cd.length == '3' ? 'pad3' : able.cur_cd.length == '4' ? 'pad4' : able.cur_cd.length == '5' ? 'pad5': '']"
            ></el-input>
            <span class="append">{{able.cur_cd}}</span>
          </div>
          <div class="change-value">= {{format(Math.ceil(able.tdi_invo_prc * tdiForm.amount))}} TDI</div>
        </el-form-item>
        <el-form-item class="btn">
          <el-button @click="onMaxClick">
            {{$t('tdi.d011')}}
            <!-- 최대 -->
          </el-button>
        </el-form-item>
        <el-form-item class="submit">
          <el-button v-if="isPC === true" type="primary" @click="onSubmit('tdiForm')">
            {{$t('tdi.d012')}}
            <!-- 참여 -->
          </el-button>
          <el-button v-if="isPC === false" type="primary" @click="onSubmit('tdiForm')">
            TDI {{$t('tdi.d012')}}
            <!-- 참여 -->
          </el-button>
        </el-form-item>
      </el-form>

      <div class="tdi-caution">
        {{$t('tdi.d013')}}
        <!-- ※ 참여가능수량은 차수별로 표시되며 차수 완료 시, 업데이트됩니다. -->
        <br>
        {{$t('tdi.d014')}}
        <!-- ※ TDI 캐시는 매 시, 누적된 거래 수수료에 따라 지급됩니다. -->
        <br>
        {{$t('tdi.d015')}}
        <!-- ※ 실제 거래 수수료와 TDI 캐시는 1:1의 비율로 지급됩니다. -->
        <br>
        {{$t('tdi.d016')}}
        <!-- ※ TDI는 참여 후 환불이 불가하오니 신중히 선택해 주시기 바랍니다. -->
      </div>

      <!-- 참여 confirm 팝업 -->
      <el-dialog :visible.sync="joinConfVisible" width="290px" class="join-pop">
        <ul>
          <li>
            {{$t('tdi.d022')}}
            <!-- TDI 코인 -->
            :
            <span class="join-value">{{able.cur_cd}}</span>
          </li>
          <li>
            {{$t('tdi.d023')}}
            <!-- 참여 수량 -->
            :
            <span class="join-value">{{format(tdiForm.amount)}}</span>
          </li>
          <li>
            {{$t('tdi.d024')}}
            <!-- 참여하시겠습니까? -->
          </li>
        </ul>
        <div slot="footer" class="dialog-footer">
          <el-button type="info" @click="joinConfVisible = false">
            {{$t('tdi.d025')}}
            <!-- 취소 -->
          </el-button>
          <el-button type="primary" @click="onJoinClick">
            {{$t('tdi.d026')}}
            <!-- 확인 -->
          </el-button>
        </div>
      </el-dialog>
      <!-- 참여 확인 팝업 -->
      <el-dialog :visible.sync="joinOkVisible" width="290px" class="join-pop">
        <div class="join-ok">
          {{$t('tdi.d028')}}
          <!-- 참여가 완료되었습니다. -->
        </div>
        <div slot="footer" class="dialog-footer full_footer">
          <el-button type="primary" @click="joinOkVisible = false">
            {{$t('tdi.d026')}}
            <!-- 확인 -->
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MobileDetect from "mobile-detect";
import fromExponential from "from-exponential";
import { _ } from "vue-underscore";

export default {
  /**
   * @property {object} myAble props 로 받은 참여가능 데이터
   */
  props: ["myAble"],
  data() {
    /**
     * 참여수량 인풋 입력값 validator
     */
    var chkAmount = (rule, value, callback) => {
      let self = this;
      if (self.able.remn_cash === "0") {
        callback(self.$t("tdi.d019"));
      } else if (value === "" || value === 0) {
        callback(self.$t("tdi.d018"));
      } else if (value < 1) {
        callback(self.$t("tdi.d033"));
      } else if (value > self.able.my_max_able_qty) {
        callback(self.$t("tdi.d032"));
      } else if (value > self.able.invo_able_qty) {
        callback(self.$t("tdi.d020"));
      } else if (value > self.able.my_able_limt) {
        callback(self.$t("tdi.d021"));
      } else {
        callback();
      }
    };
    return {
      /**
       * @property {object}  tdiForm         폼 데이터
       * @property {object}  tdiRule         폼 벨리데이터 설정
       * @property {boolean} isPC            PC웹 체크
       * @property {boolean} joinConfVisible 참여 컨펌 팝업 플래그
       * @property {boolean} joinOkVisible   참여 완료 팝업 플래그
       * @property {object}  able            참여가능 데이터
       */
      tdiForm: {
        amount: ""
      },
      tdiRule: {
        amount: [{ validator: chkAmount, trigger: "click" }]
      },
      isPC: true,
      joinConfVisible: false,
      joinOkVisible: false,
      able: null
    };
  },
  computed: {},
  methods: {
    /**
     * @vuex {action} requestTDIJoin      TDI 참여 요청 (ac611)
     * @vuex {action} fetchTDIList        TDI 전체 목록 조회 (ac609)
     * @vuex {action} fetchTDIOngoingList 이벤트 적용비율, 진행중인 TDI 목록 조회 (ac606)
     * @vuex {action} fetchTDIMyAble      참여가능 정보 조회 (ac607)
     * @vuex {action} mergeSelectedTDI    현재 TDI 상세 정보 업데이트
     */
    ...mapActions([
      "requestTDIJoin",
      "fetchTDIList",
      "fetchTDIOngoingList",
      "fetchTDIMyAble",
      "mergeSelectedTDI"
    ]),
    /**
     * 참여수량 인풋 keydown 이벤트
     * 숫자, 소수점만 입력
     * @param {object} event
     */
    onAmountKeyDown(event) {
      let self = this;
      let kc = event.keyCode ? event.keyCode : event.which;
      if (kc >= 96 && kc <= 105) {
        kc -= 48;
      }
      let amnt = self.tdiForm.amount;
      let dec = amnt.split(".")[1];

      if (kc > 47 && kc < 58) {
        if (!dec) {
          return;
        }
        if (dec.length < self.able.dec_digt * 1) {
          return;
        }
      }
      if ((kc === 110 || kc === 190) && amnt.indexOf(".") == -1) {
        return;
      }
      if (
        kc == 8 ||
        kc == 9 ||
        kc == 35 ||
        kc == 36 ||
        kc == 37 ||
        kc == 39 ||
        kc == 46
      ) {
        return;
      }

      event.target.readOnly = true;
    },
    /**
     * 참여수량 인풋 keyup 이벤트
     * @param {object} event
     */
    onAmountKeyUp(event) {
      event.target.readOnly = false;
    },
    /**
     * 수량 콤마 포맷
     * @param {number} number 수량
     * @returns {string} 포맷 스트링
     */
    format(number) {
      return UnitManager.numberWithCommas(number);
    },
    /**
     * 최대 버튼 클릭 이벤트
     * 최대 가능 수량 계산하여 인풋 값 업데이트
     */
    onMaxClick() {
      let self = this;
      if (self.able.my_max_able_qty % 1 > 0) {
        self.tdiForm.amount = fromExponential(self.able.my_max_able_qty);
      } else {
        self.tdiForm.amount = self.able.my_max_able_qty;
      }
    },
    /**
     * 참여 버튼 클릭 이벤트
     * validate 되면 참여확인 컨펌 팝업 노출
     * @param {string} 폼 이름
     */
    onSubmit(formName) {
      let self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          self.joinConfVisible = true;
        } else {
          return false;
        }
      });
    },
    /**
     * 참여확인 컨펌 확인 버튼 클릭 이벤트
     * 참여 요청 완료되면 참여수량 초기화하고 TDI 데이터 업데이트 self.reload()
     */
    onJoinClick() {
      let self = this;
      self.joinConfVisible = false;

      if (self.able.tdi_invo_yn === "Y") {
        self
          .requestTDIJoin({
            cur_cd: self.able.cur_cd,
            cur_seq: self.able.seq,
            tdi_invo_qty: self.tdiForm.amount
          })
          .then(
            res => {
              self.joinOkVisible = true;
              self.tdiForm.amount = "";
              self.reload();
            },
            error => {
              self.$alert(error.errMsg, {
                confirmButtonText: self.$t("sys_err.a001")
              }); // 확인
              self.tdiForm.amount = "";
              self.reload();
            }
          );
      } else {
        self.$alert(self.$t("tdi.d027"), {
          confirmButtonText: self.$t("sys_err.a001")
        }); // TDI 종료된 코인입니다.
        self.tdiForm.amount = "";
        self.reload();
      }
    },
    /**
     * TDI 목록, 진행중인 목록, 현재 TDI 상세 정보, 참여가능 정보 업데이트
     */
    reload() {
      let self = this;
      self.fetchTDIOngoingList().then(res => {
        let data = _.findWhere(res.list, { cur_cd: self.able.cur_cd });
        if (!self.isPC) {
          self.mergeSelectedTDI(data);
        }
        self.fetchTDIList().then(res => {
          let data = _.findWhere(res, { cur_cd: self.able.cur_cd });
          if (!self.isPC) {
            self.mergeSelectedTDI(data);
          }
          self
            .fetchTDIMyAble({
              cur_cd: data.cur_cd,
              seq: data.seq
            })
            .then(res => {
              self.able = res;
            });
        });
      });
    },
    /**
     * 모바일 화면 유의사항 팝업
     */
    viewInfo() {
      let self = this;
      self.$alert(self.$t("tdi.d017"), "", {
        confirmButtonText: self.$t("main.f003") //닫기
      });
    }
  },
  watch: {
    /**
     * 참여가능 데이터의 통화코드가 변경되면 참여 수량 인풋 초기화
     */
    able(val, old) {
      let self = this;
      if (old && val.cur_cd !== old.cur_cd) {
        self.tdiForm.amount = "";
      }
    }
  },
  mounted() {
    let self = this;
    self.able = self.$route.params.myAble;
    // 새로고침 되면 수신되는 데이터로 참여가능 정보 조회하여 업데이트
    self.$EventBus.$on("ableOnReload", data => {
      self.fetchTDIMyAble({ cur_cd: data.cur_cd, seq: data.seq }).then(res => {
        self.able = res;
      });
    });
    // 진행중인 TDI 목록에서 선택(변경)된 통화의 참여가능 정보 받아서 업데이트
    self.$EventBus.$on("ableOnSelect", data => {
      self.able = data;
    });
  },
  created() {
    var md = new MobileDetect(window.navigator.userAgent);
    var self = this;
    if (md.phone()) {
      self.isPC = false;
    } else {
      self.isPC = true;
    }
  }
};
</script>