<template>
	<el-container class="Notification">
		<el-tabs type="card" v-model="tabIndex" v-bind:stretch="stretchTab" class="box_tab_sy">
			<el-tab-pane :label="$t('m_noti.a001')" class="tab"><m-notification-history v-if="tabIndex == 0"></m-notification-history></el-tab-pane><!-- 알림내역 -->
			<el-tab-pane :label="$t('m_noti.c001')" class="tab"><m-notification-setting v-if="tabIndex == 1"></m-notification-setting></el-tab-pane><!-- 알림설정 -->
		</el-tabs>
		<!-- <transition name="fade" mode="out-in"> --><router-view></router-view><!-- </transition> -->
    </el-container>
</template>

<script>	
	import MNotificationHistory from './NotiHistory.vue';
	import MNotificationSetting from './NotiSetting.vue';

	export default {
		components: {
			MNotificationHistory,
			MNotificationSetting,
		},
		data() {
			return {  
				navTitle : '알림',
				stretchTab : true,
				tabIndex: 0
			};
		},
		methods: {
			
		},
		created() {
			this.$EventBus.$emit('mobile-nav-title',  this.$t('header.noti'));
			this.$EventBus.$emit('mobile-nav-menus', ['notiGuide', 'noDefault', 'back']);
		}
	};
</script>