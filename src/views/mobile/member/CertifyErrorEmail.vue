<template>
	<el-main class="registration_completion">
        <p class="top_txt error">{{$t('m_signup.e001')}}</p>
        <br><br><br>
        <div class="btn_wrap"><el-button type="text" class="blue_txt_btn" @click="loginClicked">{{$t('m_signup.e004')}}</el-button></div>
	</el-main>
</template>

<script>
import moment from 'moment'
export default {
	components: {

	},
	data () {
		return {
            
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
