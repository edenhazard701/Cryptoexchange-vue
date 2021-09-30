<template>
	<el-container class="DepositWithdraw">
		<el-aside class="deposit-left">
			<bank-asset-list>자산목록</bank-asset-list>
		</el-aside>
		<el-main class="deposit-main">
			<bank-transaction > 입금/출금/내역</bank-transaction>
			<el-tabs v-model="activeName" @tab-click="handleClick" stretch>
				<!-- 입금탭 시작 -->
				<el-tab-pane name="deposit" class="deposit-view" >
					<span slot="label" class="tab-label">{{$t('asset_in.a009')}}<!-- 입금 --></span>
					<deposit></deposit>
				</el-tab-pane>
				<!-- 입금탭 끝 -->
				<!-- 출금탭 시작 -->
				<el-tab-pane name="withdraw" class="withdraw-view" >
					<span slot="label" class="tab-label">{{$t('asset_in.a010')}}<!-- 출금 --></span>
					<withdraw></withdraw>
				</el-tab-pane>
				<!-- 출금탭 끝 -->
				<!-- 입출금 내역탭 시작 -->
				<el-tab-pane name="history">
					<span slot="label" class="tab-label">{{$t('asset_in.a011')}}<!-- 입출금 내역 --></span>
					<bank-transaction-history></bank-transaction-history>
				</el-tab-pane>
				<!-- 입출금 내역탭 끝 -->
			</el-tabs>
		</el-main>
	</el-container>
</template>

<script>
import BankAssetList from './BankAssetList.vue';
import BankTransaction from './BankTransaction.vue';
import Deposit from './Deposit.vue';
import Withdraw from './Withdraw.vue';
import BankTransactionHistory from './BankTransactionHistory.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    BankAssetList,
    BankTransaction,
    Deposit,
    Withdraw,
    BankTransactionHistory,
	},
	data () {
		return{
			activeName : 'deposit'
		}
	},
	methods: {
		handleClick (tab,event){
			let self = this;
			self.$store.commit('setDepositWithdrawTabIndex', tab.index);
			// 출금 제한 체크
			if (tab.index === '1') {
				self.$EventBus.$emit('withdrawValidation');
				self.$EventBus.$emit('resetWithdrawData'); //출금 값 초기화 
			} else if (tab.index === '2') {
			// 입출금 내역 이벤트 
				self.$EventBus.$emit('tabHistory' , 'all');
			} else {
			//입금 탭
				self.$EventBus.$emit('resetDepositData');  //입금값 초기화  	
			}
		},

		// 스크롤에 따른 관심종목 고정시키기
		scrollAssetList: function(event) {
			// 스크롤에 따른 scrollY값 얻기
			var supportPageOffset= window.pageYOffset !== undefined;
			var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
			var scrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

			var assetList = document.getElementsByClassName('el-aside')[0];

			var docHeight = document.body.offsetHeight;
			var assetListHeight = docHeight - 120;

			var gap = document.getElementsByClassName('el-main')[0].offsetHeight - scrollTop;

			if (assetListHeight > gap) {
				assetListHeight = gap;
			}

			var listHeight = assetListHeight;

			assetList.style.top = scrollTop + 'px';
			assetList.style.height = listHeight + 'px';
		},
	},
	created() {
		let self =this
		self.$EventBus.$on('depositTabChange', (activeName) => {
			self.activeName = activeName
		});

		self.$EventBus.$on('myAssetstatusInfo', (row) => {
			self.activeName = 'deposit';
		});

		window.addEventListener('scroll', this.scrollAssetList);
	},
	mounted () {
		let self = this
		self.$EventBus.$emit('pc-navi', [
			{ label: self.$t('asset_in.a006'), target: 'depositWithdraw' },
			{ label: self.$t('asset_in.a006'), taget: null }
		]);

		self.$EventBus.$on('langChange', () => {
			self.$EventBus.$emit('pc-navi', [
				{ label: self.$t('asset_in.a006'), target: 'depositWithdraw' },
				{ label: self.$t('asset_in.a006'), taget: null }
			]);
		});

		/* 스크롤에 따른 자산목록 고정시키기 */
		self.scrollAssetList();
	},
	beforeDestroy() {
		let self = this
		self.$EventBus.$off('depositTabChange');
		self.$EventBus.$off('myAssetstatusInfo');

		window.removeEventListener('scroll', this.scrollAssetList);
  }
};
</script>
