<template>
	<el-main class="EtcVue GoogleOTP">
    <div class="mypage_cont input-form">
      <h3 class="title">{{$t('login.b001')}}<!--Google OTP 확인--></h3>
      <el-form ref="form" :model="form" :rules="rule" label-width="0px" class="google-otp-form">
        <h5>{{$t('login.b002')}}<!--회원님께서 등록한 Google OTP 번호를 입력하세요.--></h5>
        <el-form-item prop="otp" :label="$t('login.b003-1')">
          <el-input type="text" autofocus="true" :placeholder="$t('login.b003')" @keypress.native="keypressEvent" auto-complete="new-password" v-model="form.otp" maxlength="6"></el-input>
        </el-form-item>
        <div class="mypage-info login-caution">
          <!-- 인증 시도를 5회 실패한 경우 초기화 후 재등록이 필요합니다. -->
          {{$t('login.b005')}}
          <el-button type="text" @click="$router.push({name: 'mypageSecurity' ,query:{plan:'preLogin'} })">{{$t('login.b006')}}<!--인증센터로 이동--></el-button>
        </div>

        <el-form-item class="unregistration-btn">
          <el-button type="primary" ref="okBtn" @click.native.prevent="onSubmit" :loading="verifying">{{$t('login.b004')}}<!--확인--></el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 계정 휴면 해지 신청 팝업 -->
    <el-dialog :title="$t('login.i001')" :visible.sync="visibleDormancy" width="500px" :close-on-click-modal="false" class="modal" append-to-body><!-- 계정 휴면 해지 신청 -->
      <div class="table">
        <table>
          <colgroup>
            <col style="width: 120px;">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">{{ $t('login.i002') }}<!-- 회원정보 --></th>
              <td>
                <span>{{ ac536Data.user_mail }}</span>
                <span style="margin-left: 10px;">{{ ac536Data.user_nm }}</span>
              </td>
            </tr>
            <tr>
              <th scope="row">{{ $t('login.i003') }}<!-- 휴면 등록 일자 --></th>
              <td>{{ ac536Data.user_slp_dt | toMoment }}</td>
            </tr>
            <tr>
              <th scope="row">{{ $t('login.i004') }}<!-- 개설일자 --></th>
              <td>{{ ac536Data.user_open_dt | toMoment }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btns alignC">
        <el-button class="button" @click="visibleDormancy=false">{{ $t('login.i005') }}<!-- 개설일자 --></el-button>
        <el-button class="button bg01" @click="goRequest">{{ $t('login.i006') }}<!-- 개설일자 --></el-button>
      </div>
    </el-dialog>
	</el-main>
</template>

<script>
import { afterLogin } from '@/api/session'
import moment from "moment";

export default {
	data () {
		return {
      verifying: false,
      form: { otp: '' },
      rule: {
        otp: [ { required: true, message: this.$t('login.b007'), trigger: 'blur' } ]
      },
      visibleDormancy: false,
      ac536Data: {},
		};
  },
  filters: {
    toMoment(dt) {
      if (dt) {
        return moment(dt).format("YYYY-MM-DD");
      }
      return "-";
    },
  },
	methods : {
    onSubmit() {
      let self = this;
      let inputOtp = this.form.otp
      if (inputOtp.length == 0) {
        // Google OTP 번호를 입력하세요.
        this.$alert(this.$t('login.b007'), '', {
          confirmButtonText: this.$t('login.b004')
        })
      } else {
        self.$store.dispatch('login', {
          iput_secu_pass : inputOtp
        }).then((data) => {
          console.log('login Success')
          self.$EventBus.$emit('reloadStockMaster');
          
          let beforePageUrl = self.$store.state.user.beforePageUrl
          if (beforePageUrl) {
            if (beforePageUrl.indexOf('passwordfind') > -1) {
              beforePageUrl = '/';
            }
            if (beforePageUrl.indexOf('certifyok') > -1) {
              beforePageUrl = '/';
            }
            self.$router.push({path:beforePageUrl}) //이후 이동페이지가 있으면 해당 페이지로 이동
          } else {
            self.$router.push({name:'exchange'}) //거래소로 이동
          }
        }, (errorData) => {
          console.log("errorData", errorData);
          if (errorData.errCode == '40313') {
            self.openDormancy();
          }
        });
      }
    },
    sendLoginInfo(data) {
      console.log('sendLoginInfo data==>',data);
      console.log('this.$store.state.user.autoLogin==>',this.$store.state.user.autoLogin);
      afterLogin({
        userId: data.user_id,
        sessionId: data.sesn_id,
        autoKey: data.auto_key,
        autoLogin: this.$store.state.user.autoLogin.toString(),
        langKind: this.$store.getters.getLangKind
      }).then(res => {
        console.log('afterLogin success::res ==>',res)
        console.log('afterLogin success::res.body ==>',res.body)
      });
    },
    keypressEvent(e) {
      var charCode = (typeof e.which === undefined) ? e.keyCode : e.which;
      var charStr = String.fromCharCode(charCode);
      if (e.key == 'Enter') {
        this.$refs['okBtn'].$el.click();
        e.preventDefault();
      } else {
        if ((charCode < 48 || charCode > 57)) {   // 숫자, . 아니면 입력 방지
          e.preventDefault();
        }
      }
    },
    openDormancy() {
      const self = this;
      self.$store.dispatch('getDormancyInfo').then((data) => {
        self.ac536Data = data;
        self.visibleDormancy = true;
      }).catch(err => err);
    },
    goRequest() {
      window.open(process.env.CRET_URL, 'pccPopup', "width=400,height=615");
    },
    pccCallback(e) {
      console.log('pccCallback', e.detail);
      if (e.detail) {
        let self = this;
        self.$store.dispatch('requestDormancy', { auth_di: e.detail.di }).then((data) => {
          // 휴면계정 해지가 완료되었습니다
          self.$alert(self.$t('login.i007'), '', {
            confirmButtonText: self.$t('login.i008'), // 확인
            callback: function() {
              self.$router.push({name:'login'});
            }
          });
        }).catch(err => err);
      }
    },
  },
  created() {
    this.$EventBus.$emit('pc-navi', '');
    window.addEventListener('pccCallback', this.pccCallback);
  },
  destroyed(){
    this.$store.commit("setBeforePageUrl", null);
    window.removeEventListener('pccCallback', this.pccCallback);
  }
};
</script>
