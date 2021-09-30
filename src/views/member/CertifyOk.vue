<template>
	<el-main class="EtcVue Registered">
		<div class="mypage_cont input-form">
            <div class="registered-title">
                <span class="el-icon-check"></span>
                {{$t('signup.d024')}}<!-- 인증이 완료되었습니다. -->
            </div>
            {{$t('signup.d024-1')}} <!-- 지금부터 로그인이 가능합니다. -->
		<br><br><br>
            
            <el-button type="primary" @click="loginClicked">{{$t('signup.d025')}}</el-button> <!-- 로그인페이지로 이동 -->
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
