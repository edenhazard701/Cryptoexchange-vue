<!--
모바일 로그인 > 보안인증 등록
-->
<template>
	<el-main class="security_intro">
        <p class="top_txt" v-html="$t('m_login.e002')"></p>
        <div class="intro_form">
            <p class="btn_tit">{{$t('m_login.e003')}}</p>
            <div class="bottom_btn">
                <el-button class="btn_m_sy01 darkgray" @click="otpClicked">{{$t('m_login.e004')}}</el-button>
                <el-button class="btn_m_sy01" @click="pinClicked">{{$t('m_login.e005')}}</el-button>
            </div>
        </div>
	</el-main>
</template>

<script>
export default {
	components: {
        
	},
	data () {
		return {
            navTitle: '보안인증 등록',
		};
	},
	methods : {
        otpClicked() {
            let self = this;
            self.$router.push({
                name : 'mNewGoogleOTP',
                query : { plan : 'preLogin' }
            });
        },
        pinClicked() {
            let self = this;
            self.$router.push({
                name : 'mNewSecurePIN',
                query : { plan : 'preLogin' }
            });
        }
    },
    mounted() {
        let self = this;
        let user = self.$store.state.user
        let user_id = self.$store.getters.getLogin.user_id
        user.newSecurePin.user_id = user_id
        user.newGoogleOtp.user_id = user_id
    },
    created() {
		this.$EventBus.$emit('mobile-nav-title', this.$t('m_login.e001'));
		this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border']);
    }
};

</script>