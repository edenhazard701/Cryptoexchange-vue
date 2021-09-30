<template>
  <div class="MyRestAPI MyOpenAPI">
    <h1 class="pageTitle">{{$t('api.a001')}}</h1>
    <div class="my-open-api-intro">
      <ul class="check">
        <li>
          {{$t('api.a002')}}
          <!-- API는 응용 프로그램에서 사용할 수 있도록, 운영 체제나 프로그래밍 언어가 제공하는 기능을 제어할 수 있게 만든 인터페이스 입니다. -->
        </li>
        <li>
          {{$t('api.a003')}}
          <!-- 신청 후 제공되는 API Secret KEY는 신청 최초 1회만 보여지며, 회원님이 직접 관리 및 보관해야 합니다. -->
        </li>
        <li>
          {{$t('api.a004')}}
          <!-- API Secret KEY가 노출될 경우 제3자가 회원님의 자산에 무단 침입할 위험이 있습니다. 그러므로 API Secret KEY는 타인에게 절대 공개 또는 양도해서는 안됩니다. -->
        </li>
        <li>
          {{$t('api.a005')}}
          <!-- API Secret KEY가 회원님의 부주의로 노출되어 자산 손해를 입을 경우 당사에서는 이에 대한 책임을 지지 않습니다. -->
        </li>
      </ul>
      <div class="terms-check">
        <el-checkbox v-model="termsAgreed" @change="onTermsCheckChange">
          <span v-html="$t('api.a006')"></span>
          <!-- 상기 API 약관동의에 대해 숙지하고 동의합니다. <span class="agree-require">(*필수)</span> -->
        </el-checkbox>
      </div>

      <div class="setting-area" :class="{'disabled': !termsAgreed}">
        <div class="category">
          <h2>
            <span v-html="$t('api.a007')"></span>
            <!-- 사용가능 항목 <span class="agree-require">(*필수)</span> -->
            <div class="check-all">
              {{$t('api.a012')}}
              <!-- API로 이용하실 항목을 선택하세요. -->
              &nbsp;&nbsp;
              <el-checkbox v-model="applyAll" @change="applyOptionAll" :disabled="!termsAgreed">
                {{$t('api.c018')}}
                <!-- 전체선택 -->
              </el-checkbox>
            </div>
          </h2>
          <el-row class="open-able-item">
            <el-col class="intro-cell">
              <el-checkbox
                v-model="apiOptions.curt_st"
                @change="onOptionsChange"
                :disabled="!termsAgreed"
              >{{optionKN[0].n}}</el-checkbox>
            </el-col>
            <el-col class="intro-cell">
              <el-checkbox
                v-model="apiOptions.inst_st"
                @change="onOptionsChange"
                :disabled="!termsAgreed"
              >{{optionKN[1].n}}</el-checkbox>
            </el-col>
            <el-col class="intro-cell">
              <el-checkbox
                v-model="apiOptions.cur_bar_st"
                @change="onOptionsChange"
                :disabled="!termsAgreed"
              >{{optionKN[2].n}}</el-checkbox>
            </el-col>
            <el-col class="intro-cell">
              <el-checkbox
                v-model="apiOptions.ord_st"
                @change="onOptionsChange"
                :disabled="!termsAgreed"
              >{{optionKN[3].n}}</el-checkbox>
            </el-col>
          </el-row>
        </div>
        <el-row class="category">
          <el-col :span="12">
            <h2 v-html="$t('api.a014')">
              <!-- 접속IP 설정 <span class="agree-select">(*선택)</span> -->
            </h2>
            <el-input
              maxlength="20"
              :placeholder="$t('api.a015')"
              v-model="ipAddress"
              @blur="onIpBlur"
              @keypress.native="onIpKeyPress"
              :disabled="!termsAgreed"
            ></el-input>
            <div class="validity-caution" v-show="showIpError">{{$t('api.a052')}}</div>
            <ol>
              <li>
                {{$t('api.a016')}}
                <!-- 입력하신 IP만 API 접속이 가능합니다. -->
              </li>
              <li>
                {{$t('api.a017')}}
                <!-- 접속 IP 설정을 하지 않으실 경우 보안상 취약하므로 가급적 설정하는 것을 추천합니다. -->
              </li>
            </ol>

            <h2 v-html="$t('api.a018')">
              <!-- SMS 본인인증 <span class="agree-require">(*필수)</span> -->
            </h2>
            <div class="conf-sms">
              <el-input
                ref="smsInput"
                maxlength="6"
                :placeholder="$t('api.a020')"
                v-model="smsCode"
                @keypress.native="onSmsKeyPress"
                :disabled="!termsAgreed"
                :readonly="smsVerified"
              >
                <template slot="prepend">{{$t('api.a019')}}</template>
                <el-button
                  v-if="(!smsVerified && countdowning) || smsVerified"
                  :disabled="!countdowning || smsVerified"
                  type="primary"
                  slot="append"
                  class="conf-ok-btn"
                  @click="onVerifyClick"
                >{{$t('api.a021-2')}}</el-button>
              </el-input>
              <span v-if="countdowning" class="time-counter">{{ remaining | toMMSS }}</span>
              <el-button
                v-else
                type="primary"
                @click="onRequestClick"
                class="conf-btn"
              >{{ requestBtnTitle }}</el-button>
            </div>
            <!-- sms 인증 결과 -->
            <div
              v-show="verificationRes"
              class="validity-caution"
              :class="vResClass"
            >{{ verificationResMsg }}</div>
          </el-col>
          <el-col :span="12">
            <el-scrollbar>
              <div class="terms">
                <span class="terms-title">
                  {{$t('api.a022')}}
                  <!-- 유의사항 -->
                </span>
                <br>
                <ul>
                  <li>
                    {{$t('api.a023')}}
                    <!-- API 신청은 계정 1개당 3개까지 신청이 가능합니다. -->
                  </li>
                  <li>
                    {{$t('api.a024')}}
                    <!-- Secret KEY 유출 위험을 줄이기 위해 주기적으로 삭제 후 재신청을 통하여 다시 발급받는 것을 권합니다. -->
                  </li>
                  <li>
                    {{$t('api.a025')}}
                    <!-- 아래와 같은 시스템 과부하 발생시 일시적으로 사용을 제한할 수 있습니다. -->
                    <br>
                    {{$t('api.a026')}}
                    <!-- ① 초당 10회 초과 요청시 -->
                    <br>
                    {{$t('api.a027')}}
                    <!-- ② 비정상정인 방식의 이상거래 행위를 한 경우 -->
                    <br>
                    {{$t('api.a028')}}
                    <!-- ③ 허수주문을 발생시켜 시장 교란을 일으킨 경우 -->
                  </li>
                  <li class="none">
                    {{$t('api.a031')}}
                    <!-- 시크릿키 노출이 의심스러울 경우 해당 컨넥트키 삭제 후 재신청을 적극 권장합니다.  -->
                  </li>
                </ul>
              </div>
            </el-scrollbar>
          </el-col>
        </el-row>
        <div class="guide-download request">
          <el-button
            type="primary"
            @click="onApplyClick"
            :disabled="!termsAgreed || !smsVerified || !optionSelected || !ipOK"
          >{{$t('api.a032')}}</el-button>
        </div>
      </div>

      <div class="category contents">
        <el-tabs type="card">
          <el-tab-pane>
            <span slot="label" class="tab-label">{{$t('api.a033')}}</span>
            <el-table :data="myKeys" height="300px">
              <el-table-column prop="connect_key" label="Connect KEY" align="center"></el-table-column>
              <el-table-column prop="reg_dtm" :label="$t('api.a037')" align="center" width="160">
                <!-- 신청일 -->
                <template slot-scope="scope">{{ scope.row.reg_dtm | toMoment }}</template>
              </el-table-column>
              <el-table-column :label="$t('api.a038')" align="center" width="100">
                <!-- 권한 -->
                <template slot-scope="scope">
                  <el-button @click="onInfoClick(scope.row)" type="primary" size="small" plain>
                    {{$t('api.c041')}}
                    <!-- 보기 -->
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column :label="$t('api.a039')" align="center" width="100">
                <template slot-scope="scope">
                  <el-button @click="onDeleteClick(scope.row)" type="danger" size="small" plain>
                    {{$t('api.c042')}}
                    <!-- 삭제 -->
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="tab-label">
              {{$t('api.a034')}}
              <!-- 가이드 -->
            </span>
            <div class="restful-guide">
              <!-- 가이드 내용 -->
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="tab-label">
              {{$t('api.a035')}}
              <!-- 샘플 다운로드 -->
            </span>
            <div class="restful-sample">
              <table border="0" cellpadding="0" cellspacing="0">
                <colgroup>
                  <col>
                  <col width="100">
                </colgroup>
                <thead>
                  <tr>
                    <th colspan="2">
                      # {{$t('api.a043')}}
                      <!-- KOVEX Restful API 에서 사용 가능한 샘플코드 입니다. -->
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>PHP</td>
                    <td>
                      <el-button icon="el-icon-download" class="download"></el-button>
                    </td>
                  </tr>
                  <tr>
                    <td>JAVA</td>
                    <td>
                      <el-button icon="el-icon-download" class="download"></el-button>
                    </td>
                  </tr>
                  <tr>
                    <td>Python</td>
                    <td>
                      <el-button icon="el-icon-download" class="download"></el-button>
                    </td>
                  </tr>
                  <tr>
                    <td>C++ (Windows)</td>
                    <td>
                      <el-button icon="el-icon-download" class="download"></el-button>
                    </td>
                  </tr>
                  <tr>
                    <td>C++ (libcurl)</td>
                    <td>
                      <el-button icon="el-icon-download" class="download"></el-button>
                    </td>
                  </tr>
                  <tr>
                    <td>C++ (Linux)</td>
                    <td>
                      <el-button icon="el-icon-download" class="download"></el-button>
                    </td>
                  </tr>
                  <tr>
                    <td>Node.js</td>
                    <td>
                      <el-button icon="el-icon-download" class="download"></el-button>
                    </td>
                  </tr>
                  <tr>
                    <td>C#</td>
                    <td>
                      <el-button icon="el-icon-download" class="download"></el-button>
                    </td>
                  </tr>
                  <tr>
                    <td>Go</td>
                    <td>
                      <el-button icon="el-icon-download" class="download"></el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- API 보기 팝업 -->
      <el-dialog
        class="restApiPop"
        :title="$t('api.c045')"
        :visible.sync="keyVisible"
        width="620px"
        :before-close="onInfoClose"
      >
        <div class="box-data">Connect Key: {{ selectedKeyInfo.cKey }}</div>
        <div class="box-data">{{$t('api.c047')}} {{ selectedKeyInfo.ip }}</div>
        <div class="box-item">
          <span class="item" v-for="item in selectedKeyInfo.options">{{ item }}</span>
        </div>

        <span slot="footer">
          <!-- <el-button type="primary" @click="onInfoClose">확인</el-button> -->
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
import { _ } from "vue-underscore";
import vueTimers from "vue-timers/mixin";

export default {
  mixins: [vueTimers],
  components: {},
  timers: {
    tick: { time: 1000, repeat: true }
  },
  data() {
    return {
      /**
       * @property {boolean} termsAgreed     동의 체크 했는지
       * @property {boolean} smsSent         SMS 전송 되었는지
       * @property {boolean} smsVerified     SMS 인증 완료 되었는지
       * @property {string}  verificationRes 인증 결과 success/invalid/expired
       * @property {boolean} applyAll        전체 선택 체크
       * @property {object}  apiOptions      사용 가능 항목 체크 정보
       * @property {boolean} showIpError     IP 주소 에러 보여줄지
       * @property {string}  ipAddress       IP 주소 인풋 값
       * @property {string}  smsCode         SMS 인증 인풋 값
       * @property {array}   myKeys          내 API Key 목록
       * @property {boolean} keyVisible      API Key 권한 보기 팝업 플래그
       * @property {object}  selectedKey     API Key 권한 보기 팝업 데이터
       * @property {number}  remaining       SMS 인증 타이머 초기값
       */
      termsAgreed: false,
      smsSent: false,
      smsVerified: false,
      verificationRes: null,
      applyAll: false, // 전체선택
      apiOptions: {
        curt_st: false, // 시세
        inst_st: false, // 종목정보
        cur_bar_st: false, // 잔고
        ord_st: false // 주문
      },
      showIpError: false,
      ipAddress: "",
      smsCode: "",
      myKeys: [],
      keyVisible: false,
      selectedKey: null,
      remaining: 180
    };
  },
  filters: {
    /**
     * 날짜 포맷
     * @param   {string} dt 날짜 20190101120000
     * @returns {string} 날짜 2019.01.01 12:00:00
     */
    toMoment(dt) {
      if (dt.length < 14) {
        return "-";
      } else {
        let toFormat = moment(dt.substr(0, 8) + "T" + dt.substr(8, 6));
        if (toFormat.isValid()) {
          return toFormat.format("YYYY.MM.DD HH:mm:ss");
        } else {
          return "-";
        }
      }
    },
    /**
     * 타이머 포맷
     * @param   {number} s 초 180
     * @returns {string} 타이머 스트링 "03:00"
     */
    toMMSS(s) {
      return moment.utc(s * 1000).format("mm:ss");
    }
  },
  computed: {
    /**
     * 사용가능 항목 스트링 데이터
     * @returns {array} k: 키, n: 출력명
     */
    optionKN() {
      let self = this;
      return [
        {
          k: "curt_st",
          n: self.$t("api.a008") /* '기본시세' */
        },
        {
          k: "inst_st",
          n: self.$t("api.a009") /* '관심종목' */
        },
        {
          k: "cur_bar_st",
          n: self.$t("api.a010") /* '자산' */
        },
        {
          k: "ord_st",
          n: self.$t("api.a011") /* '주문' */
        }
      ];
    },
    /**
     * SMS 인증 결과 메세지
     * @returns {string} verificationRes 값에 따른 출력 메세지
     */
    verificationResMsg() {
      let self = this;
      if (!self.verificationRes) return "";
      switch (self.verificationRes) {
        case "success":
          return self.$t("api.a055");
        case "invalid":
          return self.$t("api.a054");
        case "expired":
          return self.$t("api.a053");
        default:
          return "";
      }
    },
    /**
     * SMS 인증 인풋 비활성/활성 조건
     * @returns {boolean} 비활성/활성
     */
    smsInputDisabled() {
      let self = this;
      if (!self.termsAgreed) {
        return true;
      } else if (self.smsVerified) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * SMS 인증 결과 메세지 컬러
     * @returns {string} css 클래스
     */
    vResClass() {
      let self = this;
      return self.smsVerified ? "success" : "";
    },
    /**
     * smsSent 값에 따른 인증요청 버튼 타이틀
     * @returns {string} 인증요청 버튼 타이틀
     */
    requestBtnTitle() {
      let self = this;
      return self.smsSent ? self.$t("api.a021-1") : self.$t("api.a021-0");
    },
    /**
     * SMS 인증 타이머 카운트다운 중인지
     * @returns {boolean} 카운트다운 중인지
     */
    countdowning() {
      let self = this;
      return self.timers.tick.isRunning;
    },
    /**
     * IP 인풋 validation, 값이 없어도 OK
     * @returns {boolean} valid
     */
    ipOK() {
      let self = this;
      return self.ipAddress === "" || self.isIP(self.ipAddress);
    },
    /**
     * 사용가능항목 선택 체크
     * @returns {boolean} 최소 1개 선택되면 true
     */
    optionSelected() {
      let self = this;
      return Object.values(self.apiOptions).includes(true);
    },
    /**
     * API Key 목록 아이템 데이터를 권한 보기 팝업 데이터로 변환
     * @returns {object} cKey : connect_key, ip : IP 주소, options : 체크한 항목 이름들
     */
    selectedKeyInfo() {
      let self = this;
      let selected = self.selectedKey;
      var options = _.range(4).map(item => "-");
      var cKey = "-";
      var ip = "-";

      if (selected) {
        cKey = selected.connect_key;
        ip = selected.ip_info.length > 0 ? selected.ip_info : "-";
        var index = 0;
        for (let option of self.optionKN) {
          if (selected[option.k] === "1") {
            options[index] = option.n;
            index += 1;
          }
        }
      }

      return { cKey, ip, options };
    }
  },
  methods: {
    /**
     * IP 주소 인풋값 validation
     * @returns {boolean} valid
     */
    isIP(ip) {
      if (typeof ip !== "string") return false;
      if (!ip.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)) {
        return false;
      }
      return (
        ip.split(".").filter(octect => octect >= 0 && octect <= 255).length ===
        4
      );
    },
    /**
     * 전체선택 체크 변경 이벤트
     */
    applyOptionAll() {
      let self = this;
      let apiOptionsObj = {};
      if (self.applyAll === true) {
        apiOptionsObj.curt_st = true;
        apiOptionsObj.inst_st = true;
        apiOptionsObj.cur_bar_st = true;
        apiOptionsObj.ord_st = true;
      } else {
        apiOptionsObj.curt_st = false;
        apiOptionsObj.inst_st = false;
        apiOptionsObj.cur_bar_st = false;
        apiOptionsObj.ord_st = false;
      }

      return (self.apiOptions = apiOptionsObj);
    },
    /**
     * 신청 폼 초기화
     */
    reset() {
      let self = this;
      self.$timer.stop("tick");
      self.termsAgreed = false;
      self.smsSent = false;
      self.smsVerified = false;
      self.verificationRes = null;
      self.apiOptions = {
        curt_st: false,
        inst_st: false,
        cur_bar_st: false,
        ord_st: false
      };
      self.applyAll = false;
      self.ipAddress = "";
      self.smsCode = "";
      window.scrollTo(0, 0);
    },
    /**
     * vue-timers 핸들러
     */
    tick() {
      let self = this;
      if (self.remaining < 1) {
        self.$timer.stop("tick");
        if (!self.smsVerified) {
          self.verificationRes = "expired";
        }
      } else {
        self.remaining -= 1;
      }
    },
    /**
     * @vuex {action} requestSmsCodeForAPIKey API 이용 SMS 요청 (ac166)
     * @vuex {action} verifySmsCodeForAPIKey  API 이용 SMS 확인 (ac167)
     * @vuex {action} applyRestAPIKey         API Key 발급 (ac161)
     * @vuex {action} closeRestAPIKey         API Key 삭제 (ac163)
     * @vuex {action} fetchRestAPIKeys        API Key 목록 조회 (ac531)
     */
    ...mapActions([
      "requestSmsCodeForAPIKey",
      "verifySmsCodeForAPIKey",
      "applyRestAPIKey",
      "closeRestAPIKey",
      "fetchRestAPIKeys"
    ]),
    /**
     * IP 주소 인풋 블러 이벤트
     */
    onIpBlur() {
      let self = this;
      self.showIpError = !self.ipOK;
    },
    /**
     * IP 주소 인풋 숫자와 . 만 제한
     * @param {object} event 이벤트
     */
    onIpKeyPress(event) {
      let kc = event.keyCode ? event.keyCode : event.which;
      if (kc !== 46 && (kc < 48 || kc > 57)) {
        event.preventDefault();
      }
    },
    /**
     * SMS 인증 인풋 숫자만 제한
     * @param {object} event 이벤트
     */
    onSmsKeyPress(event) {
      let kc = event.keyCode ? event.keyCode : event.which;
      if (kc < 48 || kc > 57) {
        event.preventDefault();
      }
    },
    /**
     * SMS 인증 요청 버튼 클릭 이벤트
     */
    onRequestClick() {
      let self = this;
      self.requestSmsCodeForAPIKey().then(res => {
        self.smsVerified = false;
        self.verificationRes = null;
        self.smsSent = true;
        self.remaining = 180;
        self.$timer.start("tick");
      });
    },
    /**
     * SMS 인증 확인 버튼 클릭 이벤트
     */
    onVerifyClick() {
      let self = this;
      self.verifySmsCodeForAPIKey({ auth_no: self.smsCode }).then(
        res => {
          self.smsVerified = true;
          self.verificationRes = "success";
          self.$timer.stop("tick");
        },
        error => {
          if (error.errCode === "40244" || error.errCode === "49069") {
            self.verificationRes = "invalid";
          }
        }
      );
    },
    /**
     * 사용가능항목 체크 변경 이벤트
     * @param {boolean} val checked
     */
    onOptionsChange(val) {
      let self = this;
      let valArray = Object.values(self.apiOptions);
      if (valArray.indexOf(false) < 0) {
        self.applyAll = true;
      } else {
        self.applyAll = false;
      }
    },
    /**
     * API 신청 버튼 클릭 이벤트
     * apiOptions 의 true/false 를 "1"/"0" 으로 변환하여 param 설정하고 발급 요청
     */
    onApplyClick() {
      let self = this;
      self
        .$confirm(self.$t("api.a044"), {
          confirmButtonText: self.$t("api.a056"),
          cancelButtonText: self.$t("api.a057")
        })
        .then(() => {
          let param = Object.assign({}, self.apiOptions);
          for (let key of Object.keys(param)) {
            param[key] = param[key] === true ? "1" : "0";
          }
          if (self.ipOK && self.ipAddress.length > 0) {
            param["ip_info"] = self.ipAddress;
          }
          self.applyRestAPIKey(param).then(
            res => {
              let text = self.$t("api.a046", [res.connect_key, res.secret_key]);
              self.$alert(text, {
                confirmbuttonText: self.$t("api.a056"),
                dangerouslyUseHTMLString: true
              });
              self.fetchRestAPIKeys().then(res => {
                self.myKeys = res;
              });
              self.reset();
            },
            error => {
              self.$alert(error.errMsg, {
                // TODO : error code 에 따른 다국어 처리
                confirmbuttonText: self.$t("api.a056"),
                dangerouslyUseHTMLString: true
              });
              self.reset();
            }
          );
        })
        .catch(() => {});
    },
    /**
     * API Key 목록 아이템 권한 보기 버튼 클릭 이벤트
     * selectedKey 저장하고 권한 보기 팝업 노출
     * @param {object} row 선택한 아이템 데이터
     */
    onInfoClick(row) {
      let self = this;
      self.selectedKey = row;
      self.keyVisible = true;
    },
    /**
     * 권한 보기 팝업 닫기 버튼 클릭 이벤트
     */
    onInfoClose() {
      let self = this;
      self.keyVisible = false;
      self.selectedKey = null;
    },
    /**
     * API Key 목록 아이템 삭제 버튼 클릭 이벤트
     * @param {object} row 선택한 아이템 데이터
     */
    onDeleteClick(row) {
      let self = this;
      self
        .$confirm(self.$t("api.a050"), {
          confirmButtonText: self.$t("api.a056"),
          cancelButtonText: self.$t("api.a057")
        })
        .then(() => {
          self.closeRestAPIKey({ connect_key: row.connect_key }).then(
            res => {
              self.$alert(self.$t("api.a051"), {
                confirmbuttonText: self.$t("api.a056"),
                dangerouslyUseHTMLString: true
              });
              self.fetchRestAPIKeys().then(res => {
                self.myKeys = res;
              });
            },
            error => {
              self.$alert(error.errMsg, {
                // TODO : error code 에 따른 다국어 처리
                confirmbuttonText: self.$t("api.a056"),
                dangerouslyUseHTMLString: true
              });
            }
          );
        })
        .catch(() => {});
    },
    /**
     * 약관동의 체크 변경 이벤트
     * 체크 꺼지면 신청 폼 초기화
     * @param {boolean} e checked
     */
    onTermsCheckChange(e) {
      let self = this;
      if (e == false) {
        self.reset();
      }
    }
  },
  created() {},
  mounted() {
    let self = this;
    if (self.$store.getters.isSocketConnected) {
      self.fetchRestAPIKeys().then(res => {
        self.myKeys = res;
      });
    } else {
      self.$EventBus.$on("socketConnected", () => {
        self.fetchRestAPIKeys().then(res => {
          self.myKeys = res;
        });
      });
    }

    self.$EventBus.$emit("pc-navi", [
      { label: self.$t("header.me"), target: "mypageInfo" },
      { label: self.$t("mypage.a003"), target: "mypageOpenApi" },
      { label: self.$t("mypage.a005"), target: null }
    ]);

    self.$EventBus.$on("langChange", () => {
      self.$EventBus.$emit("pc-navi", [
        { label: self.$t("header.me"), target: "mypageInfo" },
        { label: self.$t("mypage.a003"), target: "mypageOpenApi" },
        { label: self.$t("mypage.a005"), target: null }
      ]);
    });
  }
};
</script>
