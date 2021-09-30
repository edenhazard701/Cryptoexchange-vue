<template> 
	<el-main class="password-find-main">
        <div class="member_form fixed">
            <p class="member_form_txt top" v-html="$t('m_login.g002')"></p>
            <el-form ref="form" :model="form" :rules="rule" label-width="0px" class="password-find-form">
                <el-form-item prop="email">
                    <el-input type="email" class="inp_m" :placeholder="$t('m_login.g003')" auto-complete="off" v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item v-if="!isDevice" v-show="showReCaptcha" class="captcha">
                    <vue-recaptcha
                            ref="recaptcha"
                            @verify="onCaptchaVerified"
                            @expired="onCaptchaExpired"
                            size="checkbox"
                            sitekey="6Lc8goEUAAAAAFhh8JwHKCWIPFgDXy6RCJ7Z1R2N">
                    </vue-recaptcha>
                </el-form-item>
                <el-form-item class="btm_fix_btn">
                    <el-button class="b_success_btn" @click.native.prevent="onSubmit">{{$t('m_login.g004')}}</el-button>
                </el-form-item>
            </el-form>
            <div class="recaptcha" v-if="isDevice && showReCaptcha">
                <iframe ref="reCAPCHA_iframe" id="reCAPCHA_iframe" width="100%" scrolling="auto" :src="recaptchaURL" frameborder="0" @load="reCAPCHAHeight"></iframe>
            </div>
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
            form: {
                email: ''                            // 이메일 입력값
            },
            rule: {
                email:                          [    // 이메일 유효성 검사 기준
                    { required: true, message: this.$t('m_login.a009'), trigger: 'blur' }
                ]
            },
            showReCaptcha:false,                    // 리캡차 팝업 여부
            checkRecaptcha:false,                   // 리캡차 검증 성공 여부
            recaptchaURL: process.env.RECAP_URL,    // 빌드 타입에 따른 리캡차 파일 URL
            isFirst: true                           // 임시비밀번호 요청이 처음인지 여부
		};
	},
	methods : {
		onSubmit() {    // 임시비밀번호 요청
            let self=this

            self.$refs['form'].validate((valid) => {
                if (valid) {
                    if(self.isDevice) {
                        if (!self.isFirst && !self.checkRecaptcha) {
                            self.$alert(self.$t('m_login.a014'), '', {
                                confirmButtonText: self.$t('m_login.b004'),
                                callback: action => {
                                    self.showReCaptcha = true;
                                }
                            });
                            return
                        }
                    } else {
                        if (self.showReCaptcha && !self.checkRecaptcha) {
                            self.$alert(self.$t('m_login.a014'), '', {
                                confirmButtonText: self.$t('m_login.b004'),
                                callback: action => {

                                }
                            });
                            return
                        }
                    }

                    self.isFirst = false;

                    self.$confirm(self.$t('m_login.g008'), '', {
                        distinguishCancelAndClose: true,
                        confirmButtonText: self.$t('m_login.g010'),
                        cancelButtonText: self.$t('m_login.g011')
                    }).then(() => {
                        var myWindow = null;
                        if (self.isDevice) {
                            myWindow = window.open(process.env.CRET_URL,'pccPopup', "width=400,height=615");
                        } else {
                            myWindow = window.open(process.env.CRET_URL,'pccPopup', "width=400,height=615");
                        }
                        if (myWindow === null || typeof(myWindow) === 'undefined') {
                            self.$alert(self.$t('m_login.h006'), '', {
                                dangerouslyUseHTMLString: true,
                                confirmButtonText: self.$t('m_login.b004')
                            });
                        }

                        // if(self.isDevice){
                        //     cordova.exec(null,null,"AppPlugin","loadWebView",[0,0,1,1,'',process.env.CRET_URL]);
                        // }else{
                        //     var myWindow = window.open(process.env.CRET_URL,'pccPopup', "width=400,height=615");
                        //     if (myWindow === null || typeof(myWindow) === 'undefined') {
                        //         self.$alert(self.$t('m_login.h006'), '', {
                        //             dangerouslyUseHTMLString: true,
                        //             confirmButtonText: self.$t('m_login.b004')
                        //         });
                        //     }
                        // }
                    }).catch(action => {  
                        
                    });
                } else {
                    self.disabled = true
                }
            })
        },
        pccCallback(e) {    // 휴대폰 본인확인 완료 처리
            let self = this
            self.$store.dispatch('passwordFind', {user_mail: self.form.email, auth_di: e.detail.di}).then((data) => {

                self.$alert(self.$t('m_login.g013') + self.form.email, '', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: self.$t('m_login.b004'),
                    callback: action => {
                        self.showReCaptcha = true
                        self.checkRecaptcha = false
                        if(!self.isDevice) {
                            self.$refs.recaptcha.reset()
                        }
                    }
                });
            }, (errData) => {
                
                if (errData.errCode == '40097' || errData.errCode == '40017') {
                    errData.errMsg = self.$t('m_login.g012')
                }
                self.errorMessage(errData.errMsg)
                
                self.showReCaptcha = true
                self.checkRecaptcha = false
                if(!self.isDevice) {
                    self.$refs.recaptcha.reset()
                }
            })
        },
        errorMessage(text) {    // 에러메시지 디자인 적용된 얼럿
            this.$alert(text, '', {
                confirmButtonText: this.$t('m_login.b004'),
                callback: action => {}
            })
        },
        onCaptchaVerified() {   // 리캡차 검증 성공
            this.checkRecaptcha = true
        },
        onCaptchaExpired() {    // 리캡차 유효시간 만료 시 리캡차 초기화
            this.checkRecaptcha = false
        },
        reCAPCHAHeight() {      // 모바일앱 리캡차 세로 사이즈 설정
            document.getElementById('reCAPCHA_iframe').height = document['body'].offsetHeight + 'px';
        },
        reCAPCHAResult(e) {     // 모바일앱 리캡차 결과 처리
            var self = this;
            if(!self.isDevice) {
                return;
            }
            
            if(e.data.length !== undefined && (e.data === 'success' || e.data === '"success"')) {    // 리캡차 인증 성공
                self.showReCaptcha = false;
                self.checkRecaptcha = true;
            } else if(e.data.length !== undefined && (e.data === 'close' || e.data === '"close"')) {    // 리캡차 닫음
                self.showReCaptcha = false;
                self.checkRecaptcha = false;
            } else {    // 리캡차 인증 실패
                // self.showReCaptcha = true;
                // self.checkRecaptcha = false;
            }
        }
    },
    computed: {
        isDevice() {
            return afc.isDevice;
        }
    },
    created() {
        this.$EventBus.$emit('mobile-nav-title', this.$t('m_login.g001'));
        this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border']);
    },
    mounted() {
        var self = this;
        window.addEventListener('pccCallback', self.pccCallback);
        window.addEventListener("message", self.reCAPCHAResult, false);
    },
    beforeDestroy() {
        var self = this;
        self.$refs.recaptcha.reset();
    },
    destroyed() {
        var self = this;
        window.removeEventListener('pccCallback', self.pccCallback);
        window.removeEventListener('message', self.reCAPCHAResult);
    }
};

</script>