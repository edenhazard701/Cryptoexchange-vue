<template>
	<el-container class="Notification">
		<div class="contents">
			<el-menu :default-active="activeMenuIndex()" mode="horizontal" class="notification-menu" @open="handleOpen" @close="handleClose" :router="true">
				<el-menu-item :route="{name: 'notificationSetting'}" index="1">{{$t('noti.a001')}}<!-- 알림 설정 --></el-menu-item>
				<el-menu-item :route="{name: 'notificationHistory'}" index="2">{{$t('noti.f001')}}<!-- 알림 내역 --></el-menu-item>
			</el-menu>

			<el-popover placement="bottom" width="540" trigger="hover" popper-class="notification-help">
				<h3 class="red">{{$t('noti.e004-0')}}<!-- &lt;유의사항&gt; --></h3>
				<p class="red" v-html="$t('noti.e004-1')">
					<!-- 앱을 설치하지 않은 고객님께는 알림이 설정되어 있더라도 푸시 알림 서비스가 제공되지 않습니다.<br>
					푸시 서비스 이용을 원하시는 고객님은 앱 설치 후 로그인을 해주시기 바랍니다. -->
				</p>
				<h3>{{$t('noti.e004-2')}}<!-- &lt;알림 안내&gt; --></h3>
				<ul>
					<li class="dot" v-html="$t('noti.e004-3')">
						<!-- 지정가 알림:<br>
						지정가격 도달 후에도 등록된 알림은 유지됩니다.<br>
						단, 도달 후 1시간 동안 알림이 재발송되지 않습니다. -->
					</li>
					<li class="dot" v-html="$t('noti.e004-4')">
						<!-- 등락 알림:<br>
						지정 등락률 도달 후에도 등록된 알림은 유지됩니다.<br>
						단, 도달 후 1시간 동안 알림이 재발송되지 않습니다. -->
					</li>
					<li class="dot" v-html="$t('noti.e004-5')">
						<!-- 거래량 알림:<br>
						지정 거래량 도달 후에도 등록된 알림은 유지됩니다.<br>
						단, 도달 후 1시간 동안 알림이 재발송되지 않습니다. -->
					</li>
				</ul>
				<h3>{{$t('noti.e004-6')}}<!-- &lt;등록 가능 종목&gt; --></h3>
				<p v-html="$t('noti.e004-7')"><!-- 거래소에 상장된 모든 종목에 대한 알림을 등록할 수 있습니다. --></p>
				<h3>{{$t('noti.e004-8')}}<!-- &lt;등록 가능 개수&gt; --></h3>
				<p v-html="$t('noti.e004-9')">
					<!-- 알림은 최대 30개까지 등록이 가능합니다.<br>
					등록된 알림은 30일간 저장됩니다. -->
				</p>
				<h3>{{$t('noti.e004-10')}}<!-- &lt;스마트폰 푸시&gt; --></h3>
				<p v-html="$t('noti.e004-11')">
					<!-- 설정한 알림 푸시를 받기 위해서는 앱 설치 후 1회 로그인이 필요합니다.<br>
					푸시는 마지막으로 로그인된 스마트폰으로 전송됩니다. -->
				</p>
				<h3>{{$t('noti.e004-12')}}<!-- * 알림 설정 유의사항 --></h3>
				<p v-html="$t('noti.e004-13')"><!-- 네트워크 상황과 디바이스 상태에 따라 알림 수신이 지연되거나 수신되지 않을 수 있으니 유의 바랍니다. --></p>
				<el-button slot="reference" icon="el-icon-question" class="question"></el-button>
			</el-popover>
		
            <!-- <transition name="fade" mode="out-in"> -->
				<router-view></router-view>
			<!-- </transition> -->
        </div>
    </el-container>
</template>

<script>	
	export default {
		components: {
			
		},
		data() {
      		return {  
				
      		};
    	},
    	methods: {
			handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            activeMenuIndex: function () {
                switch (this.$route.name) {
                    case 'notificationSetting': return '1';
                    case 'notificationHistory': return '2';
                }
            }
    	}
	};

</script>

<style scoped>
	.notification-menu .el-menu-item {
		width: 50%;
		text-align: center;
	}
</style>