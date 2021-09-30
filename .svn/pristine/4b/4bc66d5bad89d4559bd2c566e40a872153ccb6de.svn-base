<!--
PC 로그인 > 보안인증 등록
-->
<template>
	<el-main class="EtcVue SecurityIntro">
		<div class="mypage_cont input-form">
			<h3 class="title">{{$t('login.e001')}}<!--보안인증 등록--></h3>
			<div class="security-intro-form">
				<span class="mypage-info" v-html="$t('login.e002')">
					<!-- 회원님은 현재 보안인증 <span class="caution">미등록(초기화)</span> 상태입니다.<br>
					로그인을 하시려면 보안인증이 필요합니다. -->
				</span>
				
				<h5>{{$t('login.e003')}}<!--Google OTP 또는 보안비밀번호 등록--></h5>
				<div class="btns-row">
					<el-button type="primary" @click="otpClicked" class="opt-btn">{{$t('login.e004')}}<!--Google OTP--></el-button>
					<el-button type="primary" @click="pinClicked">{{$t('login.e005')}}<!--보안비밀번호--></el-button>
				</div>
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
            
		};
	},
	methods : {
		otpClicked() {
			let self = this;
			self.$router.push({
				name : 'newGoogleOTP',
                query : { plan : 'preLogin' }
			});
		}, 
		pinClicked() {
			let self = this;
			self.$router.push({
				name : 'newSecurePIN',
                query : { plan : 'preLogin' }
			});
		}
	},
	created() {
		this.$EventBus.$emit('pc-navi', '');
	},
    mounted() {
        let self = this;
        let user = self.$store.state.user
        let user_id = self.$store.getters.getLogin.user_id
        user.newSecurePin.user_id = user_id
        user.newGoogleOtp.user_id = user_id
    }
};

</script>