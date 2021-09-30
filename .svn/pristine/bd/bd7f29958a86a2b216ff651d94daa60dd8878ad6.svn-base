<template>
  <el-main class="EtcVue LoginVue">
    <div class="mypage_cont">
           
      <div style="margin-top:20px; text-align: center;">
         <p style="font-size:18px;font-weight:bold;margin-top:20px;">{{from}} 모바일앱에서 가능합니다.</p>
         <p style="font-weight:normal;margin-top:20px;">코벡스앱 다운로드</p>
      </div>      
    
      <el-row type="flex" justify="center">
        <el-col :span="12" style="text-align: left;margin:auto;">
            <div>
              <img style="width:100px;height:100px;" :src="require('@/images/@temp/m_qr.png')"  alt="qrCode">
            </div>
        </el-col>
        <el-col :span="12" style="text-align: right;margin:auto">
            <div class="logo"  @click="goGooglePlay">
              <img style="width:100%;height:100%;" :src="require('@/images/@temp/google_play.png')">
            </div>
            <div class="logo"  @click="goAppStore">
              <img style="width:100%;height:100%;" :src="require('@/images/@temp/app_store.png')">
            </div>
        </el-col>
      </el-row>

      <div class="btn-login" style="margin-top:20px">
        <el-button type="primary" ref="goHomeBtn" @click.native.prevent="goHome">홈으로</el-button>
      </div>     
     
    </div>
	</el-main>
</template>

<script>
export default {
  components: {
   // 'vue-recaptcha': VueRecaptcha
  },
  data() {
    return {
      //showReCaptcha:false,
     // checkRecaptcha:false,
      logining: false,
      autoLogin: false,
    /*   form: {
        email: '',
        password: ''
      },
      rule: {
        email: [
          { required: true, message: this.$t('login.a009'), trigger: 'blur' }
          // { required: true, pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , message: '이메일 형식에 맞지 않습니다.', trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('login.a011'), trigger: 'blur' }
        ]
      }, */
      from: '회원가입은'    
    }
  },
  methods: {
    goHome: async function () {
      this.$router.push({path: '/'});    
    },
    goGooglePlay() {
     // this.$router.push({name: 'registration'})
    },
    goAppStore() {
     // this.$router.push({name: 'passwordFind'})
    },  
  /*   onCaptchaVerified(){
      console.log('로봇 체크함')
      this.checkRecaptcha = true
    },
    onCaptchaExpired(){
      console.log('로봇 체크안함')
      this.checkRecaptcha = false
    }, */
    //websocket 비동기 통신이 있는부분 확인용으로 async 붙임.
    onSubmit: async function () {  
       console.log("onSubmit")       
	  this.$router.push({name: 'registration'}).catch(()=>{}); 
    },
   /*  signupClicked() {
      this.$router.push({name: 'registration'})
    },
    passwordFindClicked() {
      this.$router.push({name: 'passwordFind'})
    },
    accountFindClicked() {
      this.$router.push({name: 'accountFind'})
    },
    lengthLimit(e) {            
      if (e.target.value.length >= 60) {                
        e.preventDefault();
      }
    },
    pressEnter(e) {
      if (e.key == 'Enter') {
        this.$refs['loginBtn'].$el.focus();
        this.$refs['loginBtn'].$el.click();
      }
    },
    emailInputKeydown(e) {
      if (e.key == 'Enter') {
        this.$refs['password'].focus();
      }
    },
    email_pw_onFocus(e) {
      // 2019.04.09 LJH nprotect 시점 변경 (로그인페이지, 자동로그인중 -> 진입시)
      // if (npPfsCtrl.isStarting) return;

      // //브라우저 지원여부 체크
      // var isSupport = npPfsCtrl.IsSupport();
      // if (!isSupport) {
      //     지원되지 않은 브라우져입니다.");
          
      //     location.href = "/static/browser/browsercheck.html"
      // }
      // // 키보드 보안
      // window.npPfsStartup(null, true, true, false, false, "npkencrypt", "on")
    }, */
  },
  mounted(){    
    
    if(this.$route.params.from == 'acc')
    {        
        this.from = '계좌만들기는'  
    }
    
  },
  created() {
    this.$EventBus.$emit('pc-navi', '');
  },
  beforeCreate() {
    // 2019.04.09 LJH nprotect 시점 변경 (로그인페이지, 자동로그인중 -> 진입시)
    // if (npPfsCtrl.isStarting) return;
    // npPfsCtrl.showLoading();

    // //브라우저 지원여부 체크
    // var isSupport = npPfsCtrl.IsSupport();
    // if (!isSupport) {
    //     지원되지 않은 브라우져입니다.");
        
    //     location.href = "/static/browser/browsercheck.html"
    // }
    
    // //원격접속 체크
    // setTimeout(() => {
        
    //     npPfsCtrl.isVirtualMachine(function(result){
    //         if(result == true) {

    //             가상운영체제 또는 원격으로 접속하셨습니다. 키보드보안 미지원 환경입니다.");
    //             location.href = "/"
    //         }
    //     });
    // }, 4000);
    
    // // 키보드 보안
    // window.npPfsStartup(null, true, true, false, false, "npkencrypt", "on");
  },
  beforeRouteEnter(to, from, next) {
    next((self) => {
      if (from.name == 'safetyProgram') {
        location.reload()
      }
    })
  },
}
</script>
