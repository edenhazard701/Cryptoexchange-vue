<template>
	<el-main class="EtcVue Registered">
		<div class="mypage_cont input-form">
            <div class="registered-title">
                <span class="el-icon-check"></span>
                <!-- 회원가입 신청이 접수되었습니다. -->
		    {{$t('signup.d018')}}
            </div>
            <!-- 입력하신 이메일 주소로 인증메일을 보내드렸습니다.<br>
            인증 유효시간 내에 인증을 완료하시면 회원가입이 완료됩니다. -->
		<nl2br tag="span" :text="$t('signup.d018-1')"></nl2br>
		<br>
            <span class="caution">{{$t('signup.d018-2')}}<!--인증 유효시간이 지나면 신청 접수가 취소됩니다.--></span>
            <ul>
                <li>{{$t('signup.d018-3')}}<!--이메일 주소 :--> <span class="value">{{ $store.state.user.registered.user_mail }}</span></li>
                <li>{{$t('signup.d018-4')}}<!--인증 유효시간 :--> <span class="value">{{ deadline }}</span></li>
            </ul>
            <el-button type="primary" @click="loginClicked">{{$t('signup.d019')}}<!--로그인페이지로 이동--></el-button>
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
            	deadline: moment().add(15,'minutes').format("YYYY-MM-DD HH:mm:ss")
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
