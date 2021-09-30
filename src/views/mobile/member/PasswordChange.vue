<template>
	<el-main class="password-change-main">
        <div class="recaptcha" v-if="isDevice && showReCaptcha">
            <iframe ref="reCAPCHA_iframe" id="reCAPCHA_iframe" width="100%" scrolling="auto" :src="recaptchaURL" frameborder="0" @load="reCAPCHAHeight"></iframe>
        </div>
        <div class="member_form fixed">
            <p class="member_form_txt top" v-html="$t('m_mypage.d002')"></p>
            <el-form ref="form" :model="form" :rules="rule" label-width="0px">
                <el-form-item prop="user_pass_now">
                    <el-input type="password" class="inp_m" :placeholder="$t('m_mypage.d004')" auto-complete="new-password" v-model="form.user_pass_now" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item prop="user_pass_new1">
                    <el-input type="password" class="inp_m" :placeholder="$t('m_mypage.d005')" auto-complete="new-password" v-model="form.user_pass_new1" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item prop="user_pass_new2">
                    <el-input type="password" class="inp_m" :placeholder="$t('m_mypage.d006')" auto-complete="new-password" v-model="form.user_pass_new2" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item v-if="!isDevice" prop="captcha" class="cpatcha" v-show="showReCaptcha">
                    <vue-recaptcha
                            ref="recaptcha"
                            @verify="onCaptchaVerified"
                            @expired="onCaptchaExpired"
                            size="checkbox"
                            sitekey="6Lc8goEUAAAAAFhh8JwHKCWIPFgDXy6RCJ7Z1R2N">
                    </vue-recaptcha>
                </el-form-item>
                <el-form-item class="btm_fix_btn">
                    <el-button @click.native.prevent="onSubmit" :loading="saving" class="b_success_btn">{{$t('m_mypage.d007')}}</el-button>
                </el-form-item>

                <!--  모바일 앱 보안 키패드 -->
                
                <!-- issue : 리턴값이 암호화 된 값이 넘어와서 validation 이 어긋난다. 복호화를 할수 있는 method 또는 키패드로 입력한 암호화 되지 않은 값이 필요하다. -->
                <!-- <el-form-item v-if="isDevice" prop="user_pass_now">
                    <el-input id="user_pass_now" type="text" class="inp_m"  :placeholder="$t('m_mypage.d004')" @click.native.prevent="secuClick"  v-model="securePass"  readonly="readonly"></el-input>
                    <el-input id="user_pass_now_h" type="hidden" class="inp_m"  v-model="form.user_pass_now"  readonly="readonly"></el-input>
                </el-form-item>

                <el-form-item v-if="isDevice" prop="user_pass_new1">
                    <el-input id="user_pass_new1" type="text" class="inp_m" :placeholder="$t('m_mypage.d005')" @click.native.prevent="secuClick"  v-model="securePass1" readonly="readonly"></el-input>
                    <el-input id="user_pass_new_h1" type="hidden" class="inp_m"  v-model="form.user_pass_new1"  readonly="readonly"></el-input>
                </el-form-item>

                <el-form-item v-if="isDevice" prop="user_pass_new2">
                    <el-input id="user_pass_new2" type="text" class="inp_m" :placeholder="$t('m_mypage.d006')" @click.native.prevent="secuClick"  v-model="securePass2" readonly="readonly"></el-input>
                    <el-input id="user_pass_new_h2" type="hidden" class="inp_m"  v-model="form.user_pass_new2"  readonly="readonly"></el-input>
                </el-form-item> -->
                
                <!--  모바일 앱 보안 키패드 -->

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
        const validatePass1 = (rule, value, callback) => {
            let len = value.length;
            let validate = false
            for(let i=0;i<len;i++){
                if(i+2<len){
                    if(value.charCodeAt(i)+1==value.charCodeAt(i+1)&&value.charCodeAt(i+1)+1==value.charCodeAt(i+2)) validate = true;
                    if(value.charCodeAt(i)==value.charCodeAt(i+1)&&value.charCodeAt(i+1)==value.charCodeAt(i+2)) validate = true;
                }
            }
            validate ? callback(new Error(this.$t('m_mypage.d008'))) : callback()
        }
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('m_login.d007')))
            } else if (value !== this.form.user_pass_new1) {
                callback(new Error(this.$t('m_mypage.d010')))
            } else {
                callback()
            }
        }
		return {
            recaptchaURL: process.env.RECAP_URL,
            navTitle: '비밀번호변경',
            saving: false,
            showReCaptcha:false,
            checkRecaptcha:false,
            recapCloseFlag: false,
            form: {
                user_pass_now: '',
                user_pass_new1: '',
                user_pass_new2: ''
            },
            rule: {
                user_pass_now: [
                    { required: true, message: this.$t('mypage.c010'), trigger: 'blur' }
                ],
                user_pass_new1: [
                    { required: true, message: this.$t('m_login.d006'), trigger: 'blur' },
                    { required: true, pattern:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/ , message: this.$t('m_login.d008'), trigger: 'blur' },
                    { validator: validatePass1, trigger: 'blur'}
                ],
                user_pass_new2: [
                    { validator: validatePass2, trigger: 'change'}
                ]
            },
            securePass : '',
            securePass1 : '',
            securePass2 : '',
            openkeyPadcheck : false
		};
	},
	methods : {
        onCaptchaVerified() {
            console.log('로봇 체크함')
            this.checkRecaptcha = true
        },
        onCaptchaExpired() {
            console.log('로봇 체크안함')
            this.checkRecaptcha = false
        },
		onSubmit() {
            let self = this
            self.$refs['form'].validate((valid) => {
                if (valid) {
                    // recaptcha
                    if(self.isDevice) {
                            if (self.recapCloseFlag && !self.checkRecaptcha) {
                                self.$alert(self.$t('m_login.g005'), '', {
                                    confirmButtonText: self.$t('m_login.b004'),
                                    callback: action => {
                                        self.showReCaptcha = true;
                                    }
                                });
                                return
                            }
                    } else {
                        if (self.showReCaptcha && !self.checkRecaptcha) {
                            self.$alert(self.$t('m_login.g005'), '', {
                                confirmButtonText: self.$t('m_login.b004')
                            });
                            return
                        }
                    }

                    this.$store.dispatch('passwordchange', {
                        user_id : self.$store.getters.getUserId,
                        user_pass_now : new UnikeyAIR().sha256AndBase64(self.form.user_pass_now),
                        user_pass_new : new UnikeyAIR().sha256AndBase64(self.form.user_pass_new1)  
                    }).then((data) => {
                        console.log('passwordchange Success')
                        // alert('새로운 비밀번호로 변경되었습니다.')
                        self.$alert(self.$t('m_mypage.d012'), '', {
                            confirmButtonText: self.$t('m_login.b004'),
                            callback: action => {
                                self.$router.go(-1)
							}
                        })                        
                    }, (errorData) => {
                        console.log(errorData.errCode)

                        if (errorData.errCode == '40280') {
                            // alert("현재 비밀번호를 정확하게 입력하세요.")
                            self.$alert(self.$t('m_mypage.d009'), '', {
                                confirmButtonText: self.$t('m_login.b004')
                            })
                        } else if (errorData.errCode == '40302') {
                            // alert("새 비밀번호를 현재 비밀번호와 다르게 입력하세요.")
                            self.$alert(self.$t('m_mypage.d011'), '', {
                                confirmButtonText: self.$t('m_login.b004')
                            })
                        }else {
                            // alert(errorData.errMsg)
                            self.$alert(self.$t('sys_err.'+errorData.errCode), '', {
                                confirmButtonText: self.$t('m_login.b004')
                            })
                        }
                        
                        if (!self.isDevice) { 
                            this.$refs.recaptcha.reset()
                        }
                        this.showReCaptcha = true
                        this.checkRecaptcha = false
                    })

                } else {
                    self.disabled = true
                }
            })
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
            }
        },
        //보안키패드 앱 
        // secuClick(event){
        //     var self = this;
        //     self.openkeyPadcheck = true
        //     SecurePadManager.closePopupPad(); 
        //     SecurePadManager.resetCallback();

        //     var padOption =
        //     {
        //         title: '비밀번호 입력',
        //         padType: 'char', 
        //         checkSpecial: true,
        //         returnType: 1, 
        //         maxLength: 16,
        //         minLength: 8,
        //         genKey: null
        //     };
            
        //     SecurePadManager.openPad(padOption, function(code, data, len){ 
        //         if(len === 'cancel'){ //취소버튼 클릭시
        //             //SecurePadManager.closePopupPad()
        //         }else{
        //             if(event.target.id === 'user_pass_now'){
        //                 self.securePass =  afc.makeDummyString(len)
        //                 self.form.user_pass_now =  data

        //             }else if(event.target.id === 'user_pass_new1'){
        //                 self.securePass1 =  afc.makeDummyString(len)
        //                 self.form.user_pass_new1 =  data

        //             }else{
        //                 self.securePass2 =  afc.makeDummyString(len)
        //                 self.form.user_pass_new2 =  data

        //             }

        //         }
        //     });
        // },
    },
    computed: {
        isDevice() {
            return afc.isDevice;
        }
    },
    mounted() {
        var self = this;
        // 보안키패드 앱
        // if(afc.isDevice){
        //     $(document).off('click touchstart').on('click touchstart', function (event) {
        //         //if(afc.isDeviceOf('iPhone')) alert('아이폰 이벤트 발생test')
        //         console.log("testeventtarget===>" ,event.target.id )
        //         if(event.target.id === 'user_pass_now'|| event.target.id === 'user_pass_new1' || event.target.id === 'user_pass_new2'){
        //             console.log("111111")
        //             return 
        //         }else if(self.openkeyPadcheck === true){
        //             console.log("2222")
        //             self.openkeyPadcheck = false
        //             SecurePadManager.closePopupPad()
        //         }else{
        //             self.openkeyPadcheck = false
        //             console.log("3333")
        //             return 
        //         }
        //     });
        // }

        window.addEventListener("message", self.reCAPCHAResult, false);
    },
    created() {
        this.$EventBus.$emit('mobile-nav-title', this.$t('m_mypage.d001'));
        this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border'])
    },
    destroyed() {
        var self = this;
        window.removeEventListener('message', self.reCAPCHAResult);
        //if(afc.isDevice) SecurePadManager.closePopupPad();  보안키패드
    }
};

</script>