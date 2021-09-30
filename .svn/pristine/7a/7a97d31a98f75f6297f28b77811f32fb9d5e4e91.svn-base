<template>
	<el-main class="registration_completion">
        <p class="top_txt">{{$t('m_signup.d018_01')}}</p>
        <p class="txt" v-html="$t('m_signup.d018_02')">
        </p>
		<div class="info_box">
            <ul class="list">
                <li class="dot">{{$t('m_signup.d018_03')}} : <span class="blue_txt">{{ $store.state.user.registered.user_mail }}</span></li>
                <li class="dot">{{$t('m_signup.d018_04')}} : <span class="blue_txt">{{ deadline }}</span></li>
            </ul>
		</div>
        <div class="btn_wrap"><el-button type="text" class="blue_txt_btn" @click="loginClicked">{{$t('m_signup.d019')}}</el-button></div>
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
		};
	},
	methods : {
		loginClicked() {
			var self = this;
            self.$router.replace({name: 'mLogin'});
		}
	},
    created() {
        this.$EventBus.$emit('mobile-nav-menus', ['nohead']);
    }
};

</script>
