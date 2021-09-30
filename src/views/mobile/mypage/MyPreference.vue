<template>
  <div class="m_MyPreference">
    <div class="preference_cont push">
      <div class="bullet_question_tit">
        <strong class="bullet-tit-type01">
          {{$t('m_mypage.i002')}}
          <!-- 푸시설정 -->
        </strong>
        <el-button class="text-btn question-btn" v-on:click="preferenceDialogVisible = true">
          <i class="el-icon-question"></i>
        </el-button>
      </div>
      <table class="tbody_table_sy">
        <colgroup>
          <col style="width:130px;">
          <col style="width:;">
          <col>
        </colgroup>
        <thead>
          <tr>
            <th scope="col">
              {{$t('m_mypage.i007')}}
              <!-- 구분 -->
            </th>
            <th scope="col">E-mail</th>
            <th scope="col">SMS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              {{$t('m_mypage.i008')}}
              <!-- 로그인 알림 -->
            </th>
            <td>
              <el-switch v-model="noti.login_mail_tp"></el-switch>
            </td>
            <td>
              /
              <!-- <el-switch v-model="noti.login_sms_tp"></el-switch> -->
            </td>
          </tr>
          <tr>
            <th scope="row">
              {{$t('m_mypage.i009')}}
              <!-- 체결 알림 -->
            </th>
            <td>
              <el-switch v-model="noti.cntr_mail_tp"></el-switch>
            </td>
            <td>
              <el-switch v-model="noti.cntr_sms_tp"></el-switch>
            </td>
          </tr>
          <tr>
            <th scope="row">
              {{$t('m_mypage.i010')}}
              <!-- 입출금 알림 -->
            </th>
            <td>
              <el-switch v-model="noti.dpwd_mail_tp"></el-switch>
            </td>
            <td>
              <el-switch v-model="noti.dpwd_sms_tp"></el-switch>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="preference_cont notification">
      <strong class="bullet-tit-type01">
        {{$t('m_mypage.i011')}}
        <!-- 거래소 화면 설정 -->
      </strong>
      <table class="tbody_table_sy">
        <colgroup>
          <col style="width:130px;">
          <col>
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              {{$t('m_mypage.i012')}}
              <!-- 종목 정보 다시 받기 -->
            </th>
            <td class="al_right">
              <el-button @click="onUpdateClick()" class="btn_s_sy01">
                {{$t('m_mypage.i013')}}
                <!-- 갱신 -->
              </el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="preference_cont marketing">
      <strong class="bullet-tit-type01">
        {{$t('m_mypage.i014')}}
        <!-- 광고 및 정보 수신 설정 -->
      </strong>
      <table class="tbody_table_sy">
        <colgroup>
          <col style="width:30%;">
          <col>
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              {{$t('m_mypage.i015')}}
              <!-- 이벤트 소식<br> 및 마케팅<br> 수신 동의 -->
            </th>
            <td>
              <div class="agree_box">
                <div class="agree_check">
                  <el-checkbox v-model="noti.event_noti_tp" @change="onAgreeChange">
                    {{$t('m_mypage.i016')}}
                    <!-- 개인정보 수집 및 이용 동의 (선택) -->
                  </el-checkbox>
                </div>
                <ul class="list">
                  <li class="dot" v-html="$t('m_mypage.i017')">
                    <!-- <span class="tit">개인정보의 수집 및 이용 목적 :</span>이벤트 공지, 마케팅 및 광고 등 -->
                  </li>
                  <li class="dot" v-html="$t('m_mypage.i018')">
                    <!-- <span class="tit">수집 항목 :</span>회원명, 연락처, 이메일 -->
                  </li>
                  <li class="dot" v-html="$t('m_mypage.i019')">
                    <!-- <span class="tit">보유기간:</span>회원탈퇴 또는 법령이 정한 시점 -->
                  </li>
                </ul>
              </div>
              <div class="marketing_check">
                <el-switch
                  v-model="noti.event_mail_tp"
                  :disabled="!noti.event_noti_tp"
                  inactive-text="E-mail"
                ></el-switch>
                <el-switch
                  v-model="noti.event_sms_tp"
                  :disabled="!noti.event_noti_tp"
                  inactive-text="SMS"
                ></el-switch>
              </div>
              <p class="btm_txt">
                {{$t('m_mypage.i020')}}
                <!-- 거래소에서 발생하는 공지사항, 시세 정보, 상장 예정정보, 블록체인 뉴스 등 다양한 정보를 SMS 또는 이메일로 발송해드립니다. -->
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- dialog(푸시설정)// -->
    <el-dialog
      :title="$t('m_mypage.i003')"
      :visible.sync="preferenceDialogVisible"
      :close-on-click-modal="false"
      center
    >
      <div class="preference_list">
        <ul class="list">
          <li class="dot">
            <div v-html="$t('m_mypage.i004')"></div>
            <!-- <span class="black">로그인 알림 : </span> 로그인이 발생할 때마다 알려드립니다. -->
          </li>
          <li class="dot">
            <div v-html="$t('m_mypage.i005')"></div>
            <!-- <span class="black">거래 알림 : </span>매수/매도 주문건이 체결될 때마다 알려 드립니다. -->
          </li>
          <li class="dot">
            <div v-html="$t('m_mypage.i006')"></div>
            <!-- <span class="black">입출금 알림 : </span>고객님 계정에서 입출금이 이루어질 때마다 알려드립니다. -->
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer full_footer">
        <el-button type="primary" @click="preferenceDialogVisible = false">
          {{$t('m_mypage.i021')}}
          <!-- 확인 -->
        </el-button>
      </div>
    </el-dialog>
    <!-- //dialog(푸시설정) -->
    <!-- <div>
			<el-button @click="save()" type="info" plain class="mypage-preference-btn-save">전체 설정 저장</el-button>
    </div>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      /**
       * @property {boolean} preferenceDialogVisible 유의사항 팝업 플래그
       * @property {object}  noti 알림설정 데이터
       */
      preferenceDialogVisible: false,
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

      self.$message({
        message: self.$t("m_mypage.i022"),
        customClass: "notify_order_reject not-sign",
        duration: 2000
      });
    },
    /**
     * 알림설정 변경 - 모바일은 저장 버튼이 없고 페이지 벗어날 때 요청 (destroyed)
     * noti 의 true/false 를 "1"/"0" 으로 변환하여 param 설정하고 변경 요청
     */
    save() {
      let self = this;
      let param = Object.assign({}, self.noti);
      for (let key of Object.keys(param)) {
        param[key] = param[key] === true ? "1" : "0";
      }
      self.updateNotiSetting(param);
    }
  },
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
  },
  created() {
    let self = this;
    self.$EventBus.$emit("mobile-nav-title", this.$t("m_mypage.a005"));
    self.$EventBus.$emit("mobile-nav-menus", ["noDefault", "close", "border"]);
  },
  destroyed() {
    let self = this;
    self.save();
  }
};
</script>
