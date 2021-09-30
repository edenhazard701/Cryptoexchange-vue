<template>
	<el-main class="registration_completion">
        <p class="top_txt certify-time">{{$t('m_signup.e005')}}</p>
        <p class="txt">
            {{$t('m_signup.e006')}}<br>{{$t('m_signup.e007')}}
        </p>
		<!-- <div class="info_box">
            <ul class="list">
                <li class="dot">{{$t('m_signup.e008')}} : <span class="blue_txt">{{ deadline }}</span></li>
            </ul>
		</div> -->
        <div class="btn_wrap"><el-button type="text" class="blue_txt_btn" @click="loginClicked">{{$t('m_signup.e009')}}</el-button></div>
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
            self.$router.replace({name: 'mRegistration'});
		}
	},
    created() {
        this.$EventBus.$emit('mobile-nav-menus', ['nohead']);
    }
};

</script>
