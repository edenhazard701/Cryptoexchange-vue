<!--
모바일 : 회원가입 > 휴대폰인증 임시페이지
-->
<template>
	<el-main class="mobile-verification-main">
        <h3 class="title">휴대폰 인증 임시페이지</h3>
        <el-form ref="form" :model="$store.state.user.mobileVertification" :rules="rule" label-width="0px" class="registration-form">
            <el-form-item prop="auth_mobl_no" size="20">
                <el-input type="text" placeholder="휴대폰번호(예:01011112222)" auto-complete="off" v-model="$store.state.user.mobileVertification.auth_mobl_no" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item prop="user_nm" size="20">
                <el-input type="text" placeholder="성명(예:홍길동)" auto-complete="off" v-model="$store.state.user.mobileVertification.user_nm" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item prop="user_brth_day" size="20">
                <el-input type="text" placeholder="생년월일(예:19820304)" auto-complete="off" v-model="$store.state.user.mobileVertification.user_brth_day" maxlength="8"></el-input>
            </el-form-item>
            <el-form-item class="subtitle">
                <el-button type="info" @click.native.prevent="onTestCert">테스트인증</el-button>
                <el-button type="info" @click="onCancel">취소</el-button>
            </el-form-item>
        </el-form>
	</el-main>
</template>

<script>
export default {
	components: {

	},
    data () {
        return {
            form: {
                auth_ci: '',
                auth_di: '',
                auth_mobl_no: '',
                mobl_corp: '',
                user_nm: '',
                user_brth_day: '',
                user_gend: '',
                user_forn_tp: ''
            },
            rule: {
                auth_mobl_no: [
                    { required: true, message: '휴대폰번호를 입력해주세요.', trigger: 'change' },
                    { required: true, pattern:/(\d{3}).*(\d{3}).*(\d{4})/ ,message: '휴대폰번호 형식에 맞지 않습니다.', trigger: 'blur' }
                ],
                user_nm: [
                    { required: true, min:2 ,message: '사용자명을 입력해주세요.', trigger: 'change' }
                ],
                user_brth_day: [
                    { required: true, message: '생년월일을 입력해주세요.', trigger: 'change' },
                    { required: true, min:8 ,pattern:/^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/ ,message: '생년월일 형식에 맞지 않습니다.', trigger: 'blur' }
                ]
            }
        }
    },
    methods : {
        randomText(size) {
            let text = ""
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
            for (let i = 0; i < size; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
            return text
        },
        onTestCert() {
            let self = this
            let user = self.$store.state.user

            //임시
            self.form.auth_ci = this.randomText(88)
            self.form.auth_di = this.randomText(64)
            self.form.mobl_corp = '001'//통신사
            self.form.user_gend = '1'//성별
            self.form.user_forn_tp = '1'//외국인구분
            self.form.auth_mobl_no = user.mobileVertification.auth_mobl_no
            self.form.user_nm = user.mobileVertification.user_nm
            self.form.user_brth_day = user.mobileVertification.user_brth_day

            self.$store.commit('setMobileVertification', self.form)

            self.$refs['form'].validate((valid) => {
                if (valid) {

                    let plan = self.$route.query.plan
                    console.log('임시 휴대폰인증 plan:' + plan)

                    if (plan === 'passwordFind') {
                        //비밀번호찾기 이메일 발송
                        this.$store.dispatch('passwordFind').then((data) => {
                            console.log('passwordFind Success')
                            alert('임시 비밀번호가 발송되었습니다.')
                            self.$store.dispatch('resetMobileVertification')
                            self.$router.push({name: 'mLogin'})
                        })
                    } else if (plan === 'accountFind') {
                        //아이디 찾기
                        this.$store.dispatch('accountFind').then((data) => {
                            console.log('accountFind Success')
                            alert('아이디 : ' + data.user_mail)
                            self.$store.dispatch('resetMobileVertification')
                            self.$router.push({name: 'mLogin'})
                        })
                    } else {
                        //회원가입요청처리
                        this.$store.dispatch('registrationDemand', user).then((data) => {
                            console.log('registration Success')
                            let user_id = data.user_id
                            console.log('ac133 return data.user_id:' + data.user_id)

                            //회원가입 보안비밀번호&OTP 등록 프로세스에서 사용
                            user.newSecurePin.user_id = user_id
                            user.newGoogleOtp.user_id = user_id

                            //인증완료 상태값 변경후 이전화면 이동
                            self.$store.state.user.registration.mobileVerified = true
                            self.$router.go(-1)
                        })
                    }

                } else {
                    self.disabled = true
                }
            })

        },
        onCancel() {
            let self = this;
            self.$router.go(-1)
        }
    },
    computed:{
        reset(){
            let self = this
            self.$store.dispatch('resetMobileVertification')
        }
    },
    mounted() {
        this.reset
    },
    created() {
        this.$EventBus.$emit('mobile-nav-title', this.navTitle);
        this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault']);
    }
};

</script>

<style lang="scss" scoped>
    .mobile-verification-main {
        margin: 100px auto;
        display: flex;
        flex-flow: column;
        justify-content: center;
		align-items: center;
		width: 100%;
		height: 400px;
		border: 1px solid #e9ecf1;
    }

</style>
