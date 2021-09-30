<template> 
	<el-main class="PasswordChange">
        <div class="mypage_cont">
            <h1 class="pageTitle">{{$t('mypage.c001')}}<!--로그인 비밀번호 변경--></h1>
            <el-form ref="form" :model="form" :rules="rule" label-width="0px" class="password-change-form">
                <h5>{{$t('mypage.c002')}} {{$t('mypage.c003')}}<!--비밀번호는 영문, 숫자, 특수문자를 혼합하여 8~16자리로 입력하세요. 영문 대소문자 주의.--></h5>
                <el-form-item prop="user_pass_now" :label="$t('mypage.c004')">
                    <el-input type="password" :placeholder="$t('signup.a005-2')" auto-complete="new-password" v-model="form.user_pass_now" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item prop="user_pass_new1" :label="$t('mypage.c005')">
                    <el-input type="password" :placeholder="$t('signup.a005-2')" auto-complete="new-password" v-model="form.user_pass_new1" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item prop="user_pass_new2" :label="$t('mypage.c006')">
                    <el-input type="password" :placeholder="$t('mypage.c006')" auto-complete="new-password" v-model="form.user_pass_new2" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item prop="captcha" class="cpatcha" v-show="showReCaptcha">
                    <vue-recaptcha
                            ref="recaptcha"
                            @verify="onCaptchaVerified"
                            @expired="onCaptchaExpired"
                            size="checkbox"
                            sitekey="6Lc8goEUAAAAAFhh8JwHKCWIPFgDXy6RCJ7Z1R2N">
                    </vue-recaptcha>
                </el-form-item>
                <el-form-item class="unregistration-btn">
                    <el-button type="primary" @click.native.prevent="onSubmit" :loading="saving">{{$t('mypage.c008')}}<!--저장--></el-button>
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
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('mypage.c012')))
            } else if (value !== this.form.user_pass_new1) {
                callback(new Error(this.$t('mypage.c016')))
            } else {
                callback()
            }
        }
        const validatePass1 = (rule, value, callback) => {
            let len = value.length;
            let validate = false
            for(let i=0;i<len;i++){
                if(i+2<len){
                    if(value.charCodeAt(i)+1==value.charCodeAt(i+1)&&value.charCodeAt(i+1)+1==value.charCodeAt(i+2)) validate = true;
                    if(value.charCodeAt(i)==value.charCodeAt(i+1)&&value.charCodeAt(i+1)==value.charCodeAt(i+2)) validate = true;
                }
            }
            validate ? callback(new Error(this.$t('mypage.c014'))) : callback()
        }
		return {
            saving: false,
            showReCaptcha:false,
            checkRecaptcha:false,
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
                    { required: true, message: this.$t('mypage.c011'), trigger: 'blur' },
                    { required: true, pattern:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/ , message: this.$t('mypage.c013'), trigger: 'blur' },
                    { validator: validatePass1, trigger: 'blur'},
                ],
                user_pass_new2: [
                    { validator: validatePass2, trigger: 'change'}
                ]
            }
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
                    if (this.showReCaptcha && !this.checkRecaptcha) {
                        this.$alert(this.$t('mypage.c009'),'', {
                            confirmButtonText: this.$t('mypage.d012')
                        });
                        return
                    }

                    this.$store.dispatch('passwordchange', {
                        user_id : self.$store.getters.getUserId,
                        user_pass_now : new UnikeyAIR().sha256AndBase64(self.form.user_pass_now),
                        user_pass_new : new UnikeyAIR().sha256AndBase64(self.form.user_pass_new1),//self.form.user_pass_new1,
                    }).then((data) => {
                        console.log('passwordchange Success')
                        //alert('새로운 비밀번호로 변경되었습니다.');
                        this.$alert(this.$t('mypage.c018'),'', {
                            confirmButtonText: this.$t('mypage.d012'),
                            callback: action => {
                                self.$router.go(-1);
                            }
                        });
                    }, (errorData) => {
                        console.log(errorData.errCode)

                        if (errorData.errCode == '40280') {
                            // alert("현재 비밀번호를 정확하게 입력하세요.")
                            this.$alert(this.$t('mypage.c015'), '', {
                                confirmButtonText: this.$t('mypage.d012')
                            })
                        } else if (errorData.errCode == '40302') {
                            // alert("새 비밀번호를 현재 비밀번호와 다르게 입력하세요.")
                            this.$alert(this.$t('mypage.c017'), '', {
                                confirmButtonText: this.$t('mypage.d012')
                            })
                        }else {
                            // alert(errorData.errMsg)
                            this.$alert(self.$t('sys_err.'+errorData.errCode), '', {
                                confirmButtonText: this.$t('mypage.d012')
                            })
                        }
                        this.$refs.recaptcha.reset()
                        this.showReCaptcha = true
                        this.checkRecaptcha = false
                    })

                } else {
                    self.disabled = true
                }
            })
        }
    },
    created() {
        // this.$EventBus.$emit('pc-navi', null);
        this.$EventBus.$emit('pc-navi', [
            { label: this.$t('header.me'), target: 'mypageInfo' },
            { label: this.$t('mypage.a001'), target: 'mypageInfo' },
            { label: this.$t('mypage.c001'), target: null }
        ]);
    }
};

</script>
