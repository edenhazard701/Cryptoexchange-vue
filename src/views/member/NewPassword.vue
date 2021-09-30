<template>
	<el-main class="EtcVue NewPassword">
        <div class="mypage_cont input-form">
            <h3 class="title">{{$t('login.d001')}}<!--새 비밀번호 등록--></h3>
            <el-form ref="form" :model="form" :rules="rule" label-width="0px" class="new-password-form">
                <h5>{{$t('login.d002')}}<!--비밀번호는 영문, 숫자, 특수문자를 혼합하여 8~16자리로 입력하세요. 영문 대소문자 주의.--></h5>
                <el-form-item prop="new1" :label="$t('login.d003')">
                    <el-input type="password" :placeholder="$t('signup.a005-2')" auto-complete="new-password" v-model="form.new1" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item prop="new2" :label="$t('login.d004')">
                    <el-input type="password" @keyup.native="pressEnter" :placeholder="$t('login.d004')" auto-complete="new-password" v-model="form.new2" maxlength="16"></el-input>
                </el-form-item>

                <el-form-item class="btm-buttons">
                    <el-button @click.native.prevent="onCancel" class="cancel-btn">{{$t('login.d006')}}<!--취소--></el-button>
                    <el-button ref="loginBtn" type="primary" @click.native.prevent="onSubmit" :loading="saving">{{$t('login.d005')}}<!--저장--></el-button>
                </el-form-item>
            </el-form>
        </div>
	</el-main>
</template>

<script>
export default {
	components: {},
	data () {
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('login.d007')))
            } else if (value !== this.form.new1) {
                callback(new Error(this.$t('signup.d010')))
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
            validate ? callback(new Error(this.$t('login.d010'))) : callback()
        }
		return {
            saving: false,
            form: {
                new1: '',
                new2: ''
            },
            rule: {
                new1: [
                    { required: true, message: this.$t('login.d007'), trigger: 'blur' },
                    { required: true, pattern:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/ , message: this.$t('login.d009'), trigger: 'blur' },
                    { validator: validatePass1, trigger: 'blur'},
                ],
                new2: [
                    { validator: validatePass2, trigger: 'change'}
                ]
            }
		};
	},
	methods : {
		onSubmit() {
            let self = this

            self.$refs['form'].validate((valid) => {
                if (valid) {

                    self.$store.dispatch('passwordchange', {
                        user_id : self.$store.getters.getLogin.user_id,
                        user_pass_now : self.$store.getters.getLogin.pwd,
                        user_pass_new : new UnikeyAIR().sha256AndBase64(self.form.new1)
                    }).then((data) => {
                        console.log('passwordchange Success')
                        // alert('비밀번호가 변경되었습니다.')
                        this.$alert(this.$t('login.d011'), '', {
                            confirmButtonText: this.$t('login.g009'),
                            callback: action => {

                                if (this.$route.params.secu_auth_tp == '0') {
                                    // console.log('보안:미등록')
                                    self.$router.push({name: 'securityIntro'})
                                } else if (this.$route.params.secu_auth_tp == '1') {
                                    console.log('보안:비밀번호')
                                    self.$router.push({name: 'securePIN', params: {reqUrl: this.$route.params.reqUrl}})
                                } else if (this.$route.params.secu_auth_tp == '3') {
                                    console.log('보안:구글OTP')
                                    self.$router.push({name: 'googleOTP', params: {reqUrl: this.$route.params.reqUrl}})
                                }
                            }
                        });
                    })

                } else {
                    self.disabled = true
                }
            })

        },
        onCancel() {
            //거래소로 이동
            this.$router.push({name:'exchange'})
        },
        created() {
            this.$EventBus.$emit('pc-navi', '');
        },
        pressEnter(e) {
            
            if (e.key == 'Enter') {
                
                this.$refs['loginBtn'].$el.click();
            }
        }
	}
}

</script>