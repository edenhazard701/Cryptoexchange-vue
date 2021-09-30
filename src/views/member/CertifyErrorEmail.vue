<template>
	<el-main class="EtcVue Registered">
		<div class="mypage_cont input-form">
            <div class="registered-title">
                <span class="el-icon-check error"></span>
                {{$t('signup.d020')}}<!-- 이미 인증이 완료된 상태입니다. -->
            </div>
            <br><br><br>
            <el-button type="primary" @click="loginClicked">{{$t('signup.d021')}}</el-button> <!-- 로그인페이지로 이동 -->
		</div>
	</el-main>
</template>

<script>
import moment from 'moment'
export default {
	components: {

	},
	data () {
		return {
            
		}
	},
	methods : {
		loginClicked() {
            this.$router.replace('login')
		}
	},
	created() {
		this.$EventBus.$emit('pc-navi', '');
	}
}

</script>
