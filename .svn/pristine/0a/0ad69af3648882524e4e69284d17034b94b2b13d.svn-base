<template>
	<el-container class="BankTransaction">
		<el-tabs type="card" @tab-click="handleClick" class="box_tab_sy">
			<!-- 시작 : 입금 탭 -->
			<el-tab-pane :label="$t('m_wallet_in.a007')">  <!-- 입금-->
				<deposit></deposit>
			</el-tab-pane>
			<!-- 종료 : 입금 탭 -->
			
			<!-- 시작 : 출금 탭 -->
			<el-tab-pane :label="$t('m_wallet_in.a008')">   <!-- 출금 -->
				<withdraw></withdraw>
			</el-tab-pane>
			<!-- 종료 : 출금 탭 -->
			
			<!-- 시작 : 입출금 탭 -->
			<el-tab-pane :label="$t('m_wallet_in.a009')">   <!-- 입출금내역  -->
				<bank-transaction-history></bank-transaction-history>
			</el-tab-pane>
			<!-- 종료 : 입출금 탭 -->
		</el-tabs>
	</el-container>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

import Deposit from './transaction/Deposit.vue';									// 입금
import Withdraw from './transaction/Withdraw.vue';									// 출금
import BankTransactionHistory from './transaction/BankTransactionHistory.vue';		// 입출금내역

export default {
	components: {
		Deposit,
		Withdraw,
		BankTransactionHistory
    },	
    data () {
		return{

		}
	},
	computed :{
		...mapGetters(['getMyAssetstatusInfoCurCd']),
	},
    methods : {
		handleClick(tab,event) {
			var self = this;
			if(tab.index === '1'){
				self.$EventBus.$emit('withdrawValidation');
				self.$EventBus.$emit('resetWithdrawData'); //출금 값 초기화 
			}else if(tab.index === '2'){
			// 입출금 내역 이벤트 
				self.$EventBus.$emit('tabHistory' , 'all');
			}else{
			//입금 탭
				self.$EventBus.$emit('resetDepositData');  //입금값 초기화  	
			}
		}		
	},
	created() {
		let self = this
		self.$EventBus.$emit('mobile-nav-title', self.getMyAssetstatusInfoCurCd + self.$t('m_wallet_in.a001'));   // 입출금 
		self.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault']);
	},    
  mounted () {
		
	}	
};
</script>
<!--<style>
#canvas {width:140px;height:140px}
</style> -->