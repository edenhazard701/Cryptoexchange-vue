<template>
	<el-main class="registration_completion">
        <p class="top_txt">{{$t('m_signup.e002')}}</p>
        <p class="txt" style="text-align:center;">
            {{$t('m_signup.e003')}}
        </p>
		<br><br>
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
            // usermail: 'abc@aaa.com',
            // deadline: moment().add(15,'minutes').format("YYYY-MM-DD HH:mm:ss")
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
