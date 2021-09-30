<template>
  <div class="MyPreference">
    <h2 class="pageTitle">
      {{$t('mypage.a007')}}
      <!-- 공통설정 -->
    </h2>
    <div class="preference-table">
      <dl>
        <dt class="title">
          {{$t('mypage.k002')}}
          <!-- 종목 정보 다시 받기 -->
        </dt>
        <dd class="detail">
          <el-button @click="onUpdateClick()" type="primary">
            {{$t('mypage.k003')}}
            <!-- 갱신 -->
          </el-button>
        </dd>
      </dl>
      <dl>
        <dt class="title">
          {{$t('mypage.k004')}}
          <!-- 거래소 알림 -->
        </dt>
        <dd class="detail">
          <el-popover placement="bottom-end" trigger="hover">
            <h2>
              {{$t('mypage.k018')}}
              <!-- 푸시알림 -->
            </h2>
            <p>
              {{$t('mypage.k019')}}
              <!-- 로그인 알림: 로그인이 발생할 때마다 알려드립니다. -->
              <br>
              {{$t('mypage.k020')}}
              <!-- 거래 알림: 매수/매도 주문건이 체결될 때마다 알려드립니다. -->
              <br>
              {{$t('mypage.k021')}}
              <!-- 입출금 알림: 고객님 계정에서 입출금이 이루어질 때마다 알려드립니다. -->
            </p>
            <el-button slot="reference" icon="el-icon-question" class="question"></el-button>
          </el-popover>
          <table border="0" cellpadding="0" cellspacing="0">
            <colgroup>
              <col width="33.3%">
              <col>
              <col width="33.3%">
            </colgroup>
            <thead>
              <tr>
                <th>
                  {{$t('mypage.k005')}}
                  <!-- 구분 -->
                </th>
                <th>
                  {{$t('mypage.k006')}}
                  <!-- E-mail -->
                </th>
                <th>
                  {{$t('mypage.k007')}}
                  <!-- SMS -->
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="label">
                  {{$t('mypage.k008')}}
                  <!-- 로그인 알림 -->
                </td>
                <td>
                  <div class="switch">
                    <el-switch v-model="noti.login_mail_tp"></el-switch>
                    <span class="off">OFF</span>
                    <span class="on">ON</span>
                  </div>
                </td>
                <td>/</td>
              </tr>
              <tr>
                <td class="label">
                  {{$t('mypage.k009')}}
                  <!-- 체결 알림 -->
                </td>
                <td>
                  <div class="switch">
                    <el-switch v-model="noti.cntr_mail_tp"></el-switch>
                    <span class="off">OFF</span>
                    <span class="on">ON</span>
                  </div>
                </td>
                <td>
                  <div class="switch">
                    <el-switch v-model="noti.cntr_sms_tp"></el-switch>
                    <span class="off">OFF</span>
                    <span class="on">ON</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="label">
                  {{$t('mypage.k010')}}
                  <!-- 입출금 알림 -->
                </td>
                <td>
                  <div class="switch">
                    <el-switch v-model="noti.dpwd_mail_tp"></el-switch>
                    <span class="off">OFF</span>
                    <span class="on">ON</span>
                  </div>
                </td>
                <td>
                  <div class="switch">
                    <el-switch v-model="noti.dpwd_sms_tp"></el-switch>
                    <span class="off">OFF</span>
                    <span class="on">ON</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </dd>
      </dl>
      <dl>
        <dt class="title">
          {{$t('mypage.k011')}}
          <!-- 이벤트, 소식 및 마케팅 수신 동의 -->
        </dt>
        <dd class="detail">
          <div class="preference-terms">
            <h3>
              <!-- 개인정보 수집 및 이용 동의 (선택) -->
              {{$t('mypage.k012')}}
              <el-checkbox v-model="noti.event_noti_tp" @change="onAgreeChange"></el-checkbox>
            </h3>
            <ul>
              <li class="dot">
                {{$t('mypage.k013')}}
                <!-- 개인정보의 수집 및 이용 목적 : 이벤트 공지, 마케팅 및 광고 등 -->
              </li>
              <li class="dot">
                {{$t('mypage.k014')}}
                <!-- 수집 항목 : 회원명, 연락처, 이메일 -->
              </li>
              <li class="dot">
                {{$t('mypage.k015')}}
                <!-- 보유기간 : 회원탈퇴 또는 법령이 정한 시점 -->
              </li>
            </ul>
          </div>
          <div class="preference-check">
            <div class="switch">
              <el-switch v-model="noti.event_mail_tp" :disabled="!noti.event_noti_tp"></el-switch>
              <span class="off">OFF</span>
              <span class="on">ON</span>
            </div>
            <span class="label">E-mail</span>
            <div class="switch">
              <el-switch v-model="noti.event_sms_tp" :disabled="!noti.event_noti_tp"></el-switch>
              <span class="off">OFF</span>
              <span class="on">ON</span>
            </div>
            <span class="label">SMS</span>
          </div>
          <div class="preference-info">
            {{$t('mypage.k016')}}
            <!-- 거래소에서 발생하는 공지사항, 시세 정보, 상장 예정정보, 블록체인 뉴스 등
            다양한 정보를 SMS 또는 이메일로 발송해드립니다.-->
          </div>
        </dd>
      </dl>
    </div>
    <div class="preference-btm">
      <el-button @click="onSaveClick()" type="primary">
        {{$t('mypage.k017')}}
        <!-- 전체 설정 저장 -->
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      /**
       * @property {object} noti 알림설정 데이터
       */
      noti: {}
    };
  },
  methods: {
    /**
     * @vuex {action} fetchNotiSetting  공통설정(알림정보) 조회 (ac505)
     * @vuex {action} updateNotiSetting 공통설정(알림정보) 변경 (ac104)
     */
    ...mapActions(["fetchNotiSetting", "updateNotiSetting"]),
    /**
     * 이벤트/소식/마케팅의 스위치 on/off 값 교정
     * event_noti_tp 값이 1 이면 event_mail.tp, event_sms_tp 를 true 로 교정
     * 회원가입에서 동의하고 가입해도 ac505 데이터에서 이벤트 메일, SMS 값이 0으로 되어있다.
     */
    initialSetting() {
      let self = this;
      if (self.noti.event_noti_tp === true) {
        self.noti.event_mail_tp = true;
        self.noti.event_sms_tp = true;
      } else {
        self.noti.event_mail_tp = false;
        self.noti.event_sms_tp = false;
      }
    },
    /**
     * 개인정보 수집 및 이용 동의 체크 변경 이벤트
     * @param {boolean} e checked
     */
    onAgreeChange(e) {
      const self = this;
      if (!e) {
        self.noti.event_mail_tp = false;
        self.noti.event_sms_tp = false;
      } else {
        self.noti.event_mail_tp = true;
        self.noti.event_sms_tp = true;
      }
    },
    /**
     * 종목 정보 다시 받기 - 갱신 버튼 클릭 이벤트
     * $EventBus emit 으로 App.vue 에서 조회하고 갱신되도록 한다
     */
    onUpdateClick() {
      let self = this;
      self.$EventBus.$emit("reloadStockMaster");

      let msgCnt = $(".notify_order_reject").length;
      if (msgCnt == "0") {
        if (msgCnt > 0) return;

        self.$message({
          message: self.$t("mypage.k022"),
          customClass: "notify_order_reject not-sign web",
          duration: 2000
        });
      }
    },
    /**
     * 전체 설정 저장 버튼 클릭 이벤트
     * noti 의 true/false 를 "1"/"0" 으로 변환하여 param 설정하고 변경 요청
     */
    onSaveClick() {
      let self = this;
      self
        .$confirm(self.$t("mypage.k024"), {
          //'수신 설정을 변경하시겠습니까?'
          confirmButtonText: self.$t("mypage.i019"), // 확인
          cancelButtonText: self.$t("mypage.g009") // '취소'
        })
        .then(() => {
          let param = Object.assign({}, self.noti);
          for (let key of Object.keys(param)) {
            param[key] = param[key] === true ? "1" : "0";
          }
          self.updateNotiSetting(param);

          self.$message({
            message: self.$t("mypage.k026"),
            customClass: "notify_order_reject not-sign web",
            duration: 2000
          });
        })
        .catch(() => {
          self.$message({
            message: self.$t("mypage.k027"),
            customClass: "notify_order_reject not-sign web",
            duration: 2000
          });
        });
    }
  },
  computed: {},
  created() {},
  mounted() {
    let self = this;
    if (self.$store.getters.isSocketConnected) {
      self.fetchNotiSetting().then(res => {
        // 스위치 바인딩을 위해 "1"/"0" -> true/false 변환하여 noti 에 저장
        for (let key of Object.keys(res)) {
          res[key] = res[key] === "1" ? true : false;
        }
        self.noti = res;
        // self.initialSetting();
      });
    } else {
      self.$EventBus.$on("socketConnected", () => {
        self.fetchNotiSetting().then(res => {
          for (let key of Object.keys(res)) {
            res[key] = res[key] === "1" ? true : false;
          }
          self.noti = res;
          // self.initialSetting();
        });
      });
    }

    self.$EventBus.$emit("pc-navi", [
      { label: self.$t("header.me"), target: "mypageInfo" },
      { label: self.$t("mypage.a007"), target: null }
    ]);

    self.$EventBus.$on("langChange", () => {
      self.$EventBus.$emit("pc-navi", [
        { label: self.$t("header.me"), target: "mypageInfo" },
        { label: self.$t("mypage.a007"), target: null }
      ]);
    });
  }
};
</script>