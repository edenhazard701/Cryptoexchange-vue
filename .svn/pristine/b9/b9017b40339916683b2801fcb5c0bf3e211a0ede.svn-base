<template>
    <div class="BankTransaction">
		<div class="top-content">
			<el-row>
				<el-col :span="23" class="top-title">{{$i18n.locale === 'en' ?  getCoinName(asset.cur_cd) :  asset.cur_cd === 'KRW' ? '원화' : getCoinName(asset.cur_cd) }}({{asset.cur_cd }}) {{$t('asset_in.a006')}} <!--입출금 --></el-col> 
				<el-col :span="1" class="top-value"><el-button type="primary" @click="reload" icon="el-icon-refresh" size="mini" class="reload"></el-button> </el-col>
			</el-row>
			<el-row class="total-money">
				<el-col :span="12"> {{asset.cur_cd}} {{$t('asset_in.a068')}} <!--총 보유 --> </el-col>
				<el-col :span="12" class="top-value"> {{asset.cur_cd === 'KRW' ? format(asset.cur_bal) : formatCoin(asset.cur_bal) }} <span class="unit">{{asset.cur_cd}}</span></el-col>
			</el-row>
			<el-row class="top-list">
				<el-col :span="12">
					{{$t('asset_in.a007')}}<!-- 거래대기 -->
					<span class="unit">
						(<router-link class="link" to="/trade/notsign">{{$t('asset_in.a007-1')}}<!-- 미체결 --></router-link>
						 + <router-link class="link" to="/bank/history">{{$t('asset_in.a007-2')}}<!-- 출금중 --></router-link>)
					</span>
				</el-col>
				<el-col :span="12" class="top-value"> {{ asset.cur_cd === 'KRW' ? format(asset.tot_hold_qty) : formatCoin(asset.tot_hold_qty) }} <span class="unit">{{asset.cur_cd}}</span></el-col>
			</el-row>
			<el-row class="top-list">
				<el-col :span="4">
					{{$t('asset_in.a008')}}<!-- 사용가능 -->
					<el-popover placement="bottom" :title="$t('asset_in.a021')" width="410" trigger="hover">
						<p>
							{{$t('asset_in.a022')}}<br>
							{{$t('asset_in.a023')}}
						</p>
						<!-- 사용가능은 실시간 미체결 수량과 출금대기 수량을 뺀 순수 사용가능 및 출금가능 금액 또는 수량을 의미합니다.<br>
						※ 출금가능 = 총보유 – 거래대기 수량 – 출금대기 수량 -->
						<el-button slot="reference" icon="el-icon-question" class="question"></el-button>
					</el-popover>
				</el-col>
				<el-col :span="20" class="top-value"> {{ asset.cur_cd === 'KRW' ? format(asset.widr_able_qty) : formatCoin(asset.widr_able_qty) }} <span class="unit">{{asset.cur_cd}}</span></el-col>
			</el-row>
		</div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data () {
        return {
					asset: {
						cur_cd : '' ,				//코드
						cur_nm : '' ,				//통화명
						cur_bal : 0,       	//보유자산
						krw_bal : 0,  			//보유자산 KRW환산금액
						tot_hold_qty : 0,		//사용중수량
						krw_hold_bal : 0,		//사용중 KRW환산금액
						widr_able_qty : 0,	//출금가능 수량
						krw_able_bal : 0,		//출금가능 KRW환산금액
						walt_cnct_tp : 0,		//전자지갑연계구분
					},
					loaded: false,
        };
	},
	computed :{
		...mapGetters(['getMyAssetstatusInfo','getCoinByCd','getLangKind'])
    },
  methods : {
		format(number) {	//원화 콤마처리
			let self = this;
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		},
		formatCoin(number) {	//암호화화폐 콤마처리
      let self = this;
			let numberArr = number.toString().split(".")
			return numberArr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (numberArr[1] ? "." + numberArr[1] : "")
		},
		reload(){	//재조회
			let self = this;
			self.loaded = false;
			self.asset = self.$store.state.wallet.myAssetstatusInfo;
      self.$EventBus.$emit('bankTransactionReload');
      self.$EventBus.$emit('selectWithdrawbaseInfo'); //출금 값 초기화 
		},
		getCoinName(curCd) {	//코인 한글 또는 영문이름 변환
			let self = this;
			var langKey;
			if(self.getLangKind == 'KR') {
					langKey = 'cur_kor_nm';
			} else if(self.getLangKind == 'EN') {
					langKey = 'cur_eng_nm';
			}
			var name = self.getCoinByCd(curCd) ? self.getCoinByCd(curCd)[langKey] : ''
			return name;
		}
	},
	watch: {
    getMyAssetstatusInfo(val, old){
			let self = this;
			if(!self.loaded){
				self.asset = self.$store.state.wallet.myAssetstatusInfo;
			}
			self.loaded = true;
		}
	},
	created() {
		let self = this
		self.$EventBus.$on('depositReload', () => {
			self.reload()
		});
	},
	mounted () {
		let self = this;
		self.$EventBus.$on('myAssetstatusInfo', (row)=>{
			self.asset = self.$store.state.wallet.myAssetstatusInfo;
		});
	},
	beforeDestroy() {
		let self = this
		self.$EventBus.$off('myAssetstatusInfo');
		self.$EventBus.$off('depositReload');


  }
};
</script>