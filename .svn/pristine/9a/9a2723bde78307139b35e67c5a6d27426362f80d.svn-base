<template>
	<el-main class="EtcVue PasswordFind">
        <div class="mypage_cont input-form">
            <h3 class="title">{{$t('login.g001')}}<!--비밀번호 찾기--></h3>
            <el-form ref="form" :model="form" :rules="rule" label-width="0px" class="password-find-form">
                <h5>{{$t('login.g002')}}<!--비밀번호 분실 시 가입한 이메일 주소로 임시비밀번호를 보내드립니다.--></h5>
                <el-form-item prop="email" :label="$t('login.g003')">
                    <el-input type="email" :placeholder="$t('login.g003')" auto-complete="off" v-model="form.email" @keydown.enter.native="enterKeydown"></el-input>
                </el-form-item>
                <el-form-item class="recaptcha" v-show="showReCaptcha">
                    <vue-recaptcha 
                            ref="recaptcha"
                            @verify="onCaptchaVerified"
                            @expired="onCaptchaExpired"
                            size="checkbox"
                            sitekey="6Lc8goEUAAAAAFhh8JwHKCWIPFgDXy6RCJ7Z1R2N">
                    </vue-recaptcha>
                </el-form-item>
                <el-form-item class="unregistration-btn">
                    <el-button ref="submitBtn" type="primary" @click.native.prevent="onSubmit" :loading="verifying">{{$t('login.g004')}}<!--임시비밀번호 요청--></el-button>
                </el-form-item>
            </el-form>
        </div>
	</el-main>
</template>

<script>
export default {
	components: {
        'vue-recaptcha': VueRecaptcha
	},
	data () {
		return {
            verifying: false,       // 로딩 여부
            form: {
                email: ''           // 이메일 입력값
            },
            rule: {
                email: [            // 이메일 유효성 검사 기준
                    { required: true, message: this.$t('login.g007'), trigger: 'blur' }
                ]
            },
            showReCaptcha:false,    // 리캡차 팝업 여부
            checkRecaptcha:false,   // 리캡차 검증 성공 여부
		};
	},
	methods : {
        enterKeydown(e) {
            e.preventDefault()
            this.$refs.submitBtn.$el.click()
        },
		onSubmit() {    // 임시비밀번호 요청
            let self = this
            self.$refs['form'].validate((valid) => {
                if (valid) {
                    if (self.showReCaptcha && !self.checkRecaptcha) {
                        this.$alert(this.$t('login.g005'), null, {
                            confirmButtonText: self.$t('login.g009')
                        });
                        return
                    }
                    
                    self.$confirm(self.$t('login.g008'), '', {
                        distinguishCancelAndClose: true,
                        confirmButtonText: self.$t('login.g010'),
                        cancelButtonText: self.$t('login.g011')
                    }).then(() => {
                        var myWindow = window.open(process.env.CRET_URL,'pccPopup', "width=400,height=615");
                    }).catch(action => {  
                    });
                }
            })

        },
        pccCallback(e) {    // 휴대폰 본인확인 완료 처리
            let self = this
            self.$store.dispatch('passwordFind', {user_mail: self.form.email, auth_di: e.detail.di}).then((data) => {

                self.$alert(self.$t('login.g013') + self.form.email, '', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: self.$t('login.g009'),
                    callback: action => {
                        self.$refs.recaptcha.reset()
                        self.showReCaptcha = true
                        self.checkRecaptcha = false
                    }
                });
            }, (errData) => {
                
                if (errData.errCode == '40097' || errData.errCode == '40017') {
                    errData.errMsg = self.$t('login.g012')
                }
                self.errorMessage(errData.errMsg)
                self.$refs.recaptcha.reset()
                self.showReCaptcha = true
                self.checkRecaptcha = false
            })
        },
        errorMessage(text) {    // 디자인 적용된 얼럿
            this.$alert(text, null, {
                confirmButtonText: this.$t('login.g009'),
                callback: action => {}
            })
        },
        onCaptchaVerified(){    // 리캡차 검증 성공
            this.checkRecaptcha = true
        },
        onCaptchaExpired(){     // 리캡차 유효시간 만료 시 리캡차 초기화
        self.$refs.recaptcha.reset()
            this.checkRecaptcha = false
        },
    },
    created() {
        this.$EventBus.$emit('pc-navi', '');
    },
    mounted() {
        window.addEventListener('pccCallback', this.pccCallback);
    },
    destroyed(){
        window.removeEventListener('pccCallback', this.pccCallback);
    }
};

</script>