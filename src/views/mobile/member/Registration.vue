<template>
  <el-main class="login-main">
    <div class="recaptcha" v-if="isDevice && showReCaptcha">
      <iframe ref="reCAPCHA_iframe" id="reCAPCHA_iframe" width="100%" scrolling="auto" :src="recaptchaURL" frameborder="0" @load="reCAPCHAHeight"></iframe>
    </div>
    <div class="logo_wrap">
      <div class="logo" @click="mainGo"><img :src="require('@/images/m_login_logo.png')"  alt="kovex"></div>
    </div>
    <div class="logon_box">
      <div v-if="!isDevice" class="top_txt">
        <p class="txt">{{$t('m_login.a008')}}</p>
        <p class="url">https://univax.kovex.co.kr</p>
      </div>
      <div v-else class="top_txt">
        <p class="txt blue">{{$t('m_login.a016')}}</p>
      </div>

      <!-- Mobile App 시작 -->
      <div style="margin-top:50px; text-align: center;font-size:18px;font-weight:bold;">
         <p style="margin-top:20px;">코인과의 만남!</p>
         <p style="margin-top:20px;">코벡스에서 함께 하세요.</p>
      </div>

      <div  style="margin-top:20px; text-align: center;font-size:15px;font-weight:normal;">
         마이키핀 계정으로 로그인
      </div>

      <div style="margin-top:100px;">
          <el-button style="background-color:#3f50b4;color:white;width:100%;height: 55px;margin-bottom:0px" round  @click.native.prevent="onSubmit" :loading="logining">시작하기</el-button>   
      </div>  
    
    </div>


  </el-main>  
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'daumMap',
  components: {
    'vue-recaptcha': VueRecaptcha
  },
  data() {
    const emailValid = (rule, value, callback) => {
      if (value !== '') {
        callback()
      } else {
        callback(new Error(this.$t('m_login.a009')))
      }
    }
    const passwordValid = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('m_login.a011')))
      } else {
        callback()
      }
    }
    return {
      form: {
        korNm: '',
        enNm: '',
        residenceL: ''
      },
      rule: {
        enNm: [
          { required: true, message: "영문명을 입력해 주세요.", trigger: 'blur' }        
        ],        
      },    
     
      recaptchaURL: process.env.RECAP_URL,
      showReCaptcha:false,
      checkRecaptcha:false,
      recapCloseFlag: false,
      logining: false,
      form: {
        email: '',
        password: ''
      },
      rule: {
        email: [
          // { required: true, message: this.$t('m_login.a009'), trigger: 'blur' }
          { validator: emailValid, trigger: 'blur'}
          /*
          {
            required: true,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '이메일 형식에 맞지 않습니다.',
            trigger: 'blur'
          }
          */
        ],
        password: [
          // { required: true, message: this.$t('m_login.a011'), trigger: 'blur' }
          { validator: passwordValid, trigger: 'blur'}
        ],
        password: [
          // { required: true, message: this.$t('m_login.a011'), trigger: 'blur' }
          { validator: passwordValid, trigger: 'blur'}
        ]
      },
      autoLogin: true,
      langs: ['ko', 'en'],
      secure_pass : '',
      openkeyPadcheck : false
    }
  },
  methods: {
    insertEmail(val) {
      this.form.email = this.form.email + "";
    },
    mainGo() {
      this.$router.push({ name: 'mMain' })
    },
    onCaptchaVerified() {
      console.log('로봇 체크함')
      this.checkRecaptcha = true
    },
    onCaptchaExpired() {
      console.log('로봇 체크안함')
      this.checkRecaptcha = false
    },

    onSubmit() {
    	var self = this;

      if(self.isDevice)  //모바일앱 
      {
         self.$router.push({name: 'mRegiIntro'});            
      }
      else   //모바일웹
      {
         self.$router.push({name: 'mGuideToKovexApp'});   
      }                
    },  
    loginClicked() {
			var self = this;
      self.$router.replace({name: 'mLogin'});
		},
    passwordFindClicked() {
      this.$router.push({ name: 'mPasswordFind' })
    },
    accountFindClicked() {
      this.$router.push({ name: 'mAccountFind' })
    },
    reCAPCHAHeight(){
      document.getElementById('reCAPCHA_iframe').height = document['body'].offsetHeight + 'px';
    },
    reCAPCHAResult(e) {
      var self = this;
      if(!self.isDevice) {
        return;
      }
      if(e.data.length !== undefined && (e.data === 'success' || e.data === '"success"')) {    // 리캡차 인증 성공
        self.showReCaptcha = false;
        self.checkRecaptcha = true;
        self.recapCloseFlag = false;
      } else if(e.data.length !== undefined && (e.data === 'close' || e.data === '"close"')) {    // 리캡차 닫음
        self.showReCaptcha = false;
        self.checkRecaptcha = false;
        self.recapCloseFlag = true;
      } else {    // 리캡차 인증 실패
        // self.showReCaptcha = true;
        // self.checkRecaptcha = false;
      }
    },
    i18nChange(val) {
      let self = this;
      const langKind = val == 'ko' ? 'KR' : 'EN';
      // window.localStorage.setItem('langKind', langKind);
      self.$i18n.locale = val;
      self.$store.commit("setLangKind", langKind);
    },
    //앱 키패드 주석
    secuClick(event){
      var self = this;
      self.openkeyPadcheck = true
      SecurePadManager.closePopupPad(); 
      SecurePadManager.resetCallback();

      var padOption = {
        title: '비밀번호 입력',
        padType: 'char', 
        // checkSpecial: true, //test 계정 접속을 위하여 임시로 막음 (이어지는 숫자 등 체크 안되도록)
        returnType: 1, 
        maxLength: 16,
        minLength: 8,
        genKey: null
      };
      
      SecurePadManager.openPad(padOption, function(code, data, len){ 
        if(len === 'cancel'){ //취소버튼 클릭시
          //SecurePadManager.closePopupPad()
        }else{
          if(event.target.id === 'login_pass_now'){
            self.secure_pass = afc.makeDummyString(len)
            self.form.password = data
          }
        }
      });
    },
  },
  created() {
    this.$i18n.locale = this.getLangKind == 'KR' ? 'ko' : this.getLangKind == "EN" ? 'en' : /*default 'ko' */'ko'
    this.$EventBus.$emit('mobile-nav-menus', ['nohead']);
  },
  computed: {
    ...mapGetters(['getLangKind']),
    isDevice() {
      return afc.isDevice;
    }
  },
  mounted() {
    var self = this;
  
    window.addEventListener("message", self.reCAPCHAResult, false);
  },
  destroyed() {
    var self = this;   
    window.removeEventListener('message', self.reCAPCHAResult);
    
  }
}
</script>
<style>
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>