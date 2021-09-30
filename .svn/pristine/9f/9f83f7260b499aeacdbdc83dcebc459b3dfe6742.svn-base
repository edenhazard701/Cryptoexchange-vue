<!--
MOBILE 로그인 > Google OTP 확인
-->
<template>
	<el-main class="google-otp-main">
        <div class="member_form fixed">
            <p class="member_form_txt top">{{$t('m_login.b002')}}</p>
            <el-form ref="form" :model="form" :rules="rule" label-width="0px" class="google-otp-form">
                <el-form-item prop="otp">
                    <el-input type="number" maxlength="6" max="999999"
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                    id="iput_otp"  :placeholder="$t('m_login.b003')"class="inp_m" v-model="form.otp"></el-input>
                </el-form-item>
                <el-form-item class="security_cont">
                    <p class="gray_txt">{{$t('m_login.b005')}}</p>
                    <el-button type="text" class="blue_txt_btn" ref="okBtn" @click="$router.push({name: 'mMySecurity' ,query:{plan:'preLogin'} })">{{$t('m_login.b006')}}</el-button>
                </el-form-item>
                <el-form-item class="btm_fix_btn">
                    <el-button class="b_success_btn" @click.native.prevent="onSubmit" :loading="verifying">{{$t('m_login.b004')}}</el-button>
                </el-form-item>
            </el-form>
        </div>
	</el-main>
</template>

<script>
export default {
	components: {
        
	},
	data () {
		return {
            navTitle: 'Google OTP 확인',
            verifying: false,
            form: {
                otp: ''
            },
            rule: {
                otp: [
                    { required: true, message: this.$t('m_mypage.k019'), trigger: 'blur' }
                ]
            }
		};
	},
	methods : {
        onSubmit() {
            let inputOtp = this.form.otp
            if(inputOtp != ''){
                this.$store.dispatch('login', {
                    iput_secu_pass : inputOtp
                }).then((data) => {
                    this.$EventBus.$emit('reloadStockMaster');
                    this.$router.push({name:'mExchange'})
                });
            }
        },        
	},
    created() {
        this.$EventBus.$emit('mobile-nav-title', this.$t('m_login.b001'));
        this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border']);
    },
    mounted() {                

    },
};

</script>