<template>
	<el-main class="EtcVue Registered">
		<div class="mypage_cont input-form">
            <div class="registered-title certify-error">
                <span class="el-icon-check notice"></span>
		        <!-- 인증 유효시간이 지나서 입력하신<br>
                모든 정보가 초기화되었습니다.<br>
            	회원가입을 처음부터 다시 진행해주세요.<br> -->
                <div v-html="$t('signup.d022')"></div>
            </div>
            
            <el-button type="primary" @click="loginClicked">{{$t('signup.d023')}}</el-button> <!-- 회원가입페이지로 이동 -->
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
            // deadline: moment().add(15,'minutes').format("YYYY-MM-DD HH:mm:ss")
		}
	},
	methods : {
		loginClicked() {
            this.$router.replace('registration')
		}
	},
	created() {
		this.$EventBus.$emit('pc-navi', '');
	}
}

</script>
