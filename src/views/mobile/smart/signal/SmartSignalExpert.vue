<template>
  <div v-if="expert" class="SmartSignalExpert">
    <el-card shadow="never" class="view-info-cont">
      <el-row class="view-info-lst">
        <el-col class="expert-picher">
          <img :src="expert.prf_img_url">
        </el-col>
        <el-col class="info-cont">
          <span class="info-tit">
            {{expert.expt_nnm}}
            <span class="name">[{{expert.expt_nm}}]</span>
          </span>
          <span class="info-summary">{{expert.expt_sinl_intr}}</span>
          <div class="info-button-box">
            <div class="button-bx">
              <el-button
                v-if="expert.stt_cls_gb === '1'"
                type="info"
                size="mini"
                class="btn-view-type darkgray"
                v-on:click="onFollowClick(false)"
              >{{$t('m_signal.b006')}}</el-button>
              <el-button
                v-else
                type="primary"
                size="mini"
                class="btn-view-type darkgray"
                @click="onFollowClick(true)"
              >
                {{$t('m_signal.b005')}}
                <!-- 신청하기 -->
              </el-button>
            </div>
            <div class="button-bx">
              <el-button type="info" size="mini" class="btn-view-type">
                <a :href="expert.expt_url" target="_blank">
                  {{$t('m_signal.b007')}}
                  <!-- 방송보기 -->
                </a>
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-tabs v-model="tabValue" type="card" class="expert-tab-cont" @tab-click="onTabClick">
      <el-tab-pane :label="$t('m_signal.b002')">
        <!-- 소개 -->
        <expert-intro :prImage="expert.pr_img_url"></expert-intro>
      </el-tab-pane>
      <el-tab-pane :label="$t('m_signal.b003')">
        <!-- 신호히스토리 -->
        <expert-history v-if="expert.stt_cls_gb === '1' && tabValue === '1' && expert.symbols.length > 0" :expert="expert" ></expert-history>
      </el-tab-pane>
      <el-tab-pane :label="$t('m_signal.b004')">
        <!-- 실적 -->
        <expert-record v-if="tabValue === '2'" :expert="expert"></expert-record>
      </el-tab-pane>
    </el-tabs>

    <!-- 해지하기 팝업 -->
    <el-dialog
      :title="$t('m_signal.b025-0', [expert.expt_nnm])"
      :visible.sync="unfollowConfirmVisible"
      :close-on-click-modal="false"
      width="20%"
      center
      @closed="closeDialog"
    >
      <!-- 전문가($전문가실명$) 취소를 하시겠습니까? -->
      <el-row class="notice-dialog-contents-wrapper">
        <el-row class="notice-dialog-contents" v-html="$t('m_signal.b025-1')">
          <!-- 서비스 취소 후 당일 24:00까지 <br />재신청이 불가능합니다. -->
        </el-row>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="unfollowConfirmVisible = false">
          {{$t('m_signal.c005')}}
          <!-- 취소 -->
        </el-button>
        <el-button type="primary" @click="onUnfollowConfirm">
          {{$t('m_signal.c004')}}
          <!-- 확인 -->
        </el-button>
      </div>
    </el-dialog>
    <!-- 신청하기 팝업 -->
    <el-dialog
      :title="$t('m_signal.b023-0')"
      :visible.sync="followConfirmVisible"
      :close-on-click-modal="false"
      width="20%"
      center
      class="assent-dialog"
    >
      <!-- 추가 수수료 부과에 대한 동의 -->
      <el-row class="notice-dialog-contents-wrapper">
        <el-row class="notice-dialog-contents">
          <div class="assent-lst_bx">
            <ul class="assent-lst">
              <li v-html="$t('m_signal.b023-1')" class="dot">
                <!-- 구독 이후 매매시 전문가 구독 부가수수료 (0.05%)가 전체 <span class="red">종목 및 마켓</span>에 적용됩니다. -->
              </li>
              <li class="dot">
                {{$t('m_signal.b023-2')}}
                <!-- 수수료 -->
                <br>
                {{$t('m_signal.b023-3')}}
                <!-- 기존 매매수수료 (0.05%) + 전문가 수수료 (0.05%)  MAKER / TAKER 동일 -->
              </li>
              <li class="dot">
                {{$t('m_signal.b023-5')}}
                <!-- 신청 전 미체결 잔여가 신청 후 체결될 경우 전문가 수수료를 포함하여 부과되고 반대로 신청 후 미체결 잔여가 해지 후 체결될 경우 일반 수수료가 부과되오니 이점 유의해주세요 -->
              </li>
            </ul>
            <div class="check-bx">
              <el-checkbox v-model="agreeChk" @change="agreeChkOk">
                <span v-html="$t('m_signal.b023-6')">
                  <!-- 	 위의 구독 수수료에 대한 이의가 없음에 <br />동의합니다 -->
                </span>
              </el-checkbox>
            </div>
          </div>
          <!-- 에러 메세지 영역 -->
          <p class="message-bx">
            {{$t('m_signal.b023-11')}}
            <!-- 추가 수수료 부과에 동의해주세요 -->
          </p>
          <!-- //에러 메세지 영역 -->
          <strong class="message-tit" v-html="$t('m_signal.b023-7', [expert.expt_nnm])">
            <!-- 전문가({{ expert.expt_nm }})를 <br />구독하시겠습니까? -->
          </strong>
          <p class="btm-txt">
            &bull; {{$t('m_signal.b023-8')}}
            <!-- 전문가를 구독하시면 실시간으로 전문가의 <br />매매신호를 LMS로 보내드립니다 -->
          </p>
        </el-row>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="followConfirmVisible = false">
          {{$t('m_signal.b023-10')}}
          <!-- 취소 -->
        </el-button>
        <el-button type="primary" @click="onFollowConfirm">
          {{$t('m_signal.b023-9')}}
          <!-- 구독 -->
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ExpertIntro from "./SmartSignalExpertIntro";
import ExpertHistory from "./SmartSignalExpertHistory";
import ExpertRecord from "./SmartSignalExpertRecord";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { _ } from "vue-underscore";

export default {
  components: {
    ExpertIntro,
    ExpertHistory,
    ExpertRecord
  },
  data() {
    return {
      /**
       * @property {object}  expert                 전문가 데이터
       * @property {boolean} followConfirmVisible   구독 컨펌 팝업 플래그
       * @property {boolean} unfollowConfirmVisible 해지 컨펌 팝업 플래그
       * @property {string}  tabValue               탭 인덱스
       * @property {boolean} agreeChk               구독 컨펌 팝업 동의 체크 여부
       * @property {boolean} chkError               구독 컨펌 팝업 동의 확인
       * @property {boolean} hasFollowing           구독중인 전문가 유무
       */
      expert: {
        /**
         * @property {array} symbols 전문가 전략 종목
         */
        symbols: []
      },
      followConfirmVisible: false,
      unfollowConfirmVisible: false,
      tabValue: "0",
      agreeChk: false,
      chkError: false,
      hasFollowing: false
    };
  },
  methods: {
    /**
     * @vuex {action} fetchSmartSignalExpertSymbols       전문가 전략종목 조회 (ss039)
     * @vuex {action} followExpert                        전문가 구독/해지 (ss022)
     * @vuex {action} fetchFollowingExperts               구독중인 전문가 리스트 (ss041)
     */
    ...mapActions([
      "fetchSmartSignalExpertSymbols",
      "followExpert",
      "fetchFollowingExperts"
    ]),
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
        self.$confirm(self.$t("m_signal.b029"), {
          dangerouslyUseHTMLString: true,
          confirmButtonText: self.$t("m_signal.c004"),
          cancelButtonText: self.$t("m_signal.c005")
        }).then(() => {
          self.$router.push({ name: "mLogin" });
        }).catch(() => {});
      } else {
        if (flag) {
          self.followConfirmVisible = true;
        } else {
          self.$EventBus.$emit("downChart");
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
            self.$alert(self.$t("m_signal.b024"), {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t("m_signal.c004")
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
          self.$alert(self.$t("m_signal.b026"), {
            dangerouslyUseHTMLString: true,
            confirmButtonText: self.$t("m_signal.c004")
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
      self.$alert(self.$t("m_signal.b021-" + code.slice(-1)), {
        dangerouslyUseHTMLString: true,
        confirmButtonText: self.$t("m_signal.c004")
      });
    },
    /**
     * 탭 클릭 이벤트
     * 신호히스토리 탭("1") - 로그인 중이고 구독중인 전문가 일 경우 컨텐츠 노출
     */
    onTabClick(tab, event) {
      let self = this;
      if (tab.index === "1") {
        if (!self.getUserId) {
          self.$confirm(self.$t("m_signal.b029"), {
            dangerouslyUseHTMLString: true,
            confirmButtonText: self.$t("m_signal.c004"),
            cancelButtonText: self.$t("m_signal.c005")
          }).then(() => {
            self.$router.push({ name: "mLogin" });
          }).catch(() => {
            self.tabValue = "0";
          });
        } else {
          if (self.expert.stt_cls_gb === "0") {
            self.$alert(self.hasFollowing ? self.$t("m_signal.b028") : self.$t("m_signal.b027"), {
              confirmButtonText: self.$t("m_signal.c004"),
              callback: action => {
                self.tabValue = "0";
              }
            });
          } else {
            if (self.expert.symbols.length <= 0) {
              self.$alert(self.$t("signal.d044"), {
                confirmButtonText: self.$t("signal.d019"),
                callback: action => {
                  self.tabValue = "0";
                }
              });
            }
          }
        }
      }
    },
    /**
     * window "beforeunload" 이벤트 리스너
     * 전문가 데이터 sessionStorage 에 저장
     */
    onBeforeUnload() {
      let self = this;
      sessionStorage.setItem("SmartSignalExpert", JSON.stringify(self.expert));
    },
    /**
     * window "load" 이벤트 리스너
     * 전문가 데이터 sessionStorage 에서 가져와서 저장
     */
    onReload() {
      let self = this;
      self.expert = JSON.parse(sessionStorage.getItem("SmartSignalExpert"));
    },
    /**
     *
     */
    closeDialog() {
      this.$EventBus.$emit("upChart");
    }
  },
  computed: {
    /**
     * @vuex {getter} getUserId    유저 아이디
     * @vuex {getter} getCoinByCd  통화의 통화정보
     */
    ...mapGetters(["getUserId", "getCoinByCd"])
  },
  watch: {
    /**
     * 전문가 데이터 변경되면 전문가 전략 종목 조회, 종목 셀렉트 데이터 설정
     */
    expert(val, old) {
      let self = this;
      if (val) {
        self.fetchSmartSignalExpertSymbols(val.expt_rgst_no).then(res => {
          if (res.length > 0) {
            self.expert.symbols = res.map(item => {
              let cd = item.symbol.slice(-10, -5).replace(/[_]/g, "");
              let coin = self.getCoinByCd(cd);
              item.knm = coin.cur_kor_nm + " " + coin.cur_cd;
              item.enm = coin.cur_eng_nm + " " + coin.cur_cd;
              item.id = item.symbol + item.expt_strtg_key;
              return item;
            });
          } else {
            self.expert.symbols = [];
          }
        });
      }
    }
  },
  mounted() {
    let self = this;
    self.expert = self.$route.params.expert;

    // 구독중인 전문가 리스트 조회하여 self.hasFollowing 설정
    if (self.getUserId) {
      self.fetchFollowingExperts().then(res => {
        self.hasFollowing = res.length > 0;
      });
    }

    self.$EventBus.$emit("mobile-nav-title", self.$t("m_signal.a002"));
    self.$EventBus.$emit("mobile-nav-menus", ["noDefault", "back"]);
  },
  created() {
    let self = this;
    window.addEventListener("beforeunload", self.onBeforeUnload);
    window.addEventListener("load", self.onReload);
  }
};
</script>
