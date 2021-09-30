<template>
	<section class="BankTransactionHistory contents">
		<div class="header-options search">
			<el-date-picker v-model="frDt" type="date" :placeholder="$t('asset_st.a022')" :picker-options="frDtValid" @change="startDateChange"></el-date-picker> <!-- 시작일 -->
			<el-date-picker v-model="toDt" type="date" :placeholder="$t('asset_st.a026')" :picker-options="toDtValid" @change="endDateChange" ></el-date-picker>  <!-- 종료일 -->

			<el-select v-model="dealType" :placeholder="$t('asset_st.a027')" > <!-- 선택 -->
				<el-option v-for="item in dealTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</div>
		<div class="el-table">
			<div class="el-table__header-wrapper">
				<table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
					<colgroup>
						<col width="180">
						<col width="250">
						<col width="200">
					</colgroup>
					<thead>
						<tr>
							<th></th>
							<th><div class="cell">{{$t('asset_st.a023')}}</div></th>  <!-- 금액 -->
							<th><div class="cell">{{$t('asset_st.a007')}}</div></th>  <!-- 상태 -->
						</tr>
					</thead>
				</table>
			</div>
		</div>
		<el-scrollbar wrap-class="scrollbar-wrapper" :native="false" :class="{'is-scroll': tableData.length > 15}">
			<el-table :data="tableData"  :empty-text="emptyText" stripe :show-header="false">
				<el-table-column :label="$t('asset_st.a001')" width="100" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.trd_dt | dateFormatYYMMDD}}</span><br>
						<span>{{scope.row.trd_tm | dateFormatHHMMSS}}</span>
					</template>	
				</el-table-column><!-- 일시 -->

				<el-table-column :label="$t('asset_st.a003')" width="80" align="center"><!-- 구분 -->
					<template slot-scope="scope">
						<span :class="[scope.row.dpwd_tp === '1' ? 'red' : 'blue']">{{scope.row.dpwd_tp === '1' ?  $t('asset_st.a028') : $t('asset_st.a029') }}</span>  <!-- 입금 :  출금  -->
					</template>
				</el-table-column>
				<el-table-column  :label="$t('asset_st.a023')" align="right"> <!-- 금액 -->  <!--krw_trd_amt-->
					<template slot-scope="scope">
						{{  scope.row.cur_cd === 'KRW' ? formatKRW(scope.row.mov_trd_amt) : formatCoin(scope.row.mov_trd_amt) }} <span class="unit">{{scope.row.cur_cd}}</span>
						<br>
						<span class="unit small about" v-if="scope.row.cur_cd !== 'KRW'">≈{{ formatKRW(scope.row.krw_trd_amt) }} KRW</span>

					</template>
				</el-table-column>
				<el-table-column label="상태" width="200" align="center">
					<template slot-scope="scope">
						<div v-if="scope.row.cur_cd === 'KRW'">
							<!-- 원화 외부 내부 s-->
              <span v-if="scope.row.dpwd_trgt_tp === '1' || scope.row.dpwd_trgt_tp === '2'">
								<span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '1'" class="red">{{$t('asset_st.a030')}}</span>   <!--입금확인중 -->
								<span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'">{{$t('asset_st.a013')}}</span>				 <!-- 입금완료-->
								<span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '9'" class="gray" >{{$t('asset_st.a015')}}</span>		<!-- 입금취소-->
							
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'" class="blue" >{{$t('asset_st.a019')}}</span>		<!--출금중 -->
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'">{{$t('asset_st.a016')}}</span>					<!-- 출금완료-->
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '9'" class="gray">{{$t('asset_st.a017')}}</span>		<!-- 출금취소-->
              </span>
							<!-- 원화 외부 내부 e-->
							
							<!-- 원화 관리자 s-->
							<span v-if="scope.row.dpwd_trgt_tp === 'R' ">
								<span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '1'" class="red">{{$t('asset_st.a030')}}</span>   <!--입금확인중 -->
								<span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'">{{$t('asset_st.a013')}}</span>				 <!-- 입금완료-->
								<span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '9'" class="gray" >{{$t('asset_st.a015')}}</span>		<!-- 입금취소-->
							
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'" class="blue" >{{$t('asset_st.a019')}}</span>		<!--출금중 -->
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'">{{$t('asset_st.a016')}}</span>					<!-- 출금완료-->
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '9'" class="gray">{{$t('asset_st.a017')}}</span>		<!-- 출금취소-->
								<br>({{$t('asset_st.a048')}})
							</span>
							<!-- 원화 관리자 e-->

							<!-- 원화 이벤트 s-->
							<span v-if="scope.row.dpwd_trgt_tp === 'E' ">
								<span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '1'" class="red">{{$t('asset_st.a030')}}</span>   <!--입금확인중 -->
								<span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'">{{$t('asset_st.a013')}}</span>				 <!-- 입금완료-->
								<span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '9'" class="gray" >{{$t('asset_st.a015')}}</span>		<!-- 입금취소-->
							
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'" class="blue" >{{$t('asset_st.a019')}}</span>		<!--출금중 -->
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'">{{$t('asset_st.a016')}}</span>					<!-- 출금완료-->
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '9'" class="gray">{{$t('asset_st.a017')}}</span>		<!-- 출금취소-->
								<br>({{$t('asset_st.a049')}})
							</span>
							<!-- 원화 이벤트 e-->
						</div>

						<div v-else>
							<!-- 암호화화폐 외부 내부 s-->
              <span v-if="scope.row.dpwd_trgt_tp === '1' || scope.row.dpwd_trgt_tp === '2'">
								<span v-if="scope.row.dpwd_tp === '1' && (scope.row.trd_stat === '1' || scope.row.trd_stat === '3')" class="red">{{$t('asset_st.a014')}}</span>		<!-- 입금대기-->
								<span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'">{{$t('asset_st.a013')}}</span>		<!-- 입금완료-->
								<span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '9'" class="blue">{{$t('asset_st.a015')}}</span>		<!-- 입금취소-->
							
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'" class="blue">{{$t('asset_st.a018')}}		<!-- 출금대기중-->
									<el-button @click="withdrawCancel(scope.row.trd_dt , scope.row.trd_tm)" type="plain" size="small">{{$t('asset_st.a020')}}</el-button>  		<!--취소 --> 
								</span>
                <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '3'" class="blue">{{$t('asset_st.a019')}}</span>		<!-- 출금중 -->
                <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'">{{$t('asset_st.a016')}}</span>		<!-- 출금완료 -->
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '9'" class="gray">{{$t('asset_st.a017')}}</span>		<!-- 출금취소 -->
                <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === 'E'" class="gray">{{$t('asset_st.a050')}}</span>		<!-- 잔고부족 -->

								<!-- 입/출금 주소 및 TXID -->
								<div v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'" class="txid">
									<span class="addr-deposit">{{$t('asset_st.a008')}}: {{scope.row.oppt_walt_id}}</span>		<!--입금주소 -->
									<span class="txid-num">TXID : <a @click="openCurCdUrl(scope.row.txid , scope.row.info_url)">{{scope.row.txid}}</a></span>		
								</div>

								<div v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'" class="txid">
									<span class="addr-deposit">{{$t('asset_st.a031')}}: {{scope.row.oppt_walt_id}}</span>		<!-- 출금주소 -->
									<span class="txid-num">TXID : <a @click="openCurCdUrl(scope.row.txid , scope.row.info_url)">{{scope.row.txid}}</a></span>
								</div>
							</span>
							<!-- 암호화화폐 외부 내부 e-->

							<!-- 암호화화폐 관리자  s-->
              <span v-if="scope.row.dpwd_trgt_tp === 'R' ">
								<span v-if="scope.row.dpwd_tp === '1' && (scope.row.trd_stat === '1' || scope.row.trd_stat === '3')" class="red">{{$t('asset_st.a014')}}</span>		<!-- 입금대기-->
								<span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'" >{{$t('asset_st.a013')}}</span>		<!-- 입금완료-->
								<span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '9'" class="blue">{{$t('asset_st.a015')}}</span>		<!-- 입금취소-->
							
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'" class="blue">{{$t('asset_st.a018')}}</span>		<!-- 출금대기중-->
                <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '3'" class="blue">{{$t('asset_st.a019')}}</span>		<!-- 출금중-->
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'" >{{$t('asset_st.a016')}}</span>		<!-- 출금완료 -->
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '9'" class="gray">{{$t('asset_st.a017')}}</span>		<!-- 출금취소 -->

								<br>({{$t('asset_st.a048')}})
							</span>
							<!-- 암호화화폐 관리자 e-->

							<!-- 암호화화폐 이벤트 s-->
              <span v-if="scope.row.dpwd_trgt_tp === 'E'">
								<span v-if="scope.row.dpwd_tp === '1' && (scope.row.trd_stat === '1' || scope.row.trd_stat === '3')" class="red">{{$t('asset_st.a014')}}</span>		<!-- 입금대기-->
								<span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'" >{{$t('asset_st.a013')}}</span>		<!-- 입금완료-->
								<span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '9'" class="blue">{{$t('asset_st.a015')}}</span>		<!-- 입금취소-->
							
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'" class="blue">{{$t('asset_st.a018')}}</span>		<!-- 출금대기중-->
                <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '3'" class="blue">{{$t('asset_st.a019')}}</span>		<!-- 출금중-->
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'" >{{$t('asset_st.a016')}}</span>		<!-- 출금완료 -->
								<span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '9'" class="gray">{{$t('asset_st.a017')}}</span>		<!-- 출금취소 -->

								<br>({{$t('asset_st.a049')}})
							</span>
							<!-- 암호화화폐 이벤트 e-->
						</div> 
					</template>
				</el-table-column>
				<infinite-loading :identifier="infiniteId" slot="append" @infinite="infiniteHandler" force-use-infinite-wrapper=".scrollbar-wrapper"></infinite-loading>
					
			</el-table>
		</el-scrollbar> 

		<!-- 상태 창 -->
		<!-- 컴펌창 -->
		<el-dialog :visible.sync="openComfirmPop" width="320px">
			<span>{{ $t('asset_st.a024')}}</span>		<!--출금 신청을 취소하시겠습니까? -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="openComfirmPop = false">{{$t('asset_st.a033')}}</el-button>		<!--취소 -->
				<el-button type="primary" @click="comfirmPopOkay">{{$t('asset_st.a032')}}</el-button>		<!--확인 -->
			</span>
		</el-dialog>
		
		<el-dialog :visible.sync="openOkayPop" width="320px">
			<span v-html="$t('asset_st.a025')"></span>		<!--  출금취소가 완료되었습니다.-->
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="openOkayPop = false">{{$t('asset_st.a032')}}</el-button>		<!-- 확인 -->
			</span>
		</el-dialog>

		<el-dialog title="출금취소 접수" :visible.sync="openOkayCompletePop" width="400px">
			<span>{{$t('asset_st.a034')}}</span>		<!-- 이미 출금 진행이 완료된 내역입니다. -->
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="openOkayCompletePop = false">{{$t('asset_st.a032')}}</el-button>		<!-- 확인 -->
			</span>
		</el-dialog>
	</section>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions, mapState } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  data () {
    return {
      infiniteId : +new Date(),
      forceUseinfinite : false,    //모바일 용
      frDt: '',   //시작일자
      toDt: '',   //종료일자 
      frDtValid: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      
      /* 입출금 내역 탭*/
      dealType: '0',

      emptyText : '', 
      tableData : [],
      tableDataAll : [],
      tableDataRow : 50,

      cancelDivision  : '',    //가상화폐 출금 : 2
      cancelTrdDt : '',        //출금취소 가상화폐 일자 
      cancelTrdTm : '',        //출금취소 가상화폐 시간 

      openComfirmPop : false,
      openOkayPop : false,
      openOkayCompletePop : false,

      // 모바일
      selectedtradeType: '0'
    };
	},	
	filters: {
    dateFormatYYMMDD(val) {
      if (!val) return '';
      return moment(val).format('YYYY-MM-DD');
    },
    dateFormatHHMMSS(val) {
      if (!val) return '';
      return val.substr(0,2) +':'+ val.substr(2,2) +':'+val.substr(4,2)
    },
	},
	watch: {
		//구분 , 날짜 에 따라서 재조회
		dealType(val, old) {
			let self = this;
			self.getDW531();
		}
	},    
  computed : {
		...mapState({trSymbols: state => state.data.trSymbols}),
		...mapGetters(['getMyAssetstatusInfoCurCd']),
    // 종료일 disabled
    toDtValid() {
      const self = this;
      var resFn = function(){};
      if (this.frDt instanceof Date) { // 시작일 보다 작은 일짜 disabled
        resFn = function(time) {
          return time.getTime() < self.frDt.getTime();
        }
      };
      return { disabledDate: resFn };
		},
		dealTypeOptions(){
      return [{
          value: '0',
          label: this.$t('asset_st.a047')         //전체
      }, {
          value: '7',
          label: this.$t('asset_st.a028')         //입금
      }, {
          value: '8',
          label: this.$t('asset_st.a029')         //출금
      }]
		},
		//모바일
		tradeTypeList(){
			return  [{
          value: '0',
          label: this.$t('m_wallet_log.a032') //'거래 전체'
      }, {
          value: '7',
          label: this.$t('m_wallet_log.a033') //'입금'
      }, {
          value: '8',
          label: this.$t('m_wallet_log.a034') //'출금'
      }]
		} 
	},
  methods : {
		/* 취소 확인 버튼 */
		comfirmPopOkay() {
			let self = this;
			self.openComfirmPop = false;
      //출금 신청 로직
      //가상화폐 구분
      if(self.cancelDivision === '') return
      //가상화폐 출금 취소 
      self.$socket.sendProcessByName('dw112', function (queryData) {
        var block = queryData.getBlockData('InBlock1')[0];
        block['user_id'] = self.$store.getters.getUserId
        block['trd_dt'] = self.cancelTrdDt                         //거래일자
        block['trd_tm'] = self.cancelTrdTm                         //거래시각
      }, function (queryData) {
        if (queryData != null) {
					self.openOkayPop = true;
          self.$EventBus.$emit('tabHistory', 'withdraw');
        }else{
					self.openOkayCompletePop = true
					self.$EventBus.$emit('tabHistory', 'withdraw');
        }
        self.$EventBus.$emit('depositReload');
      });
			this.okVisible = true;
		},
		formatKRW(number) { 
			let self = this;
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    formatCoin(number) {
			let self = this;
			let numberArr = Number(number).toFixed(8).toString().split(".")
			return numberArr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (numberArr[1] ? "." + numberArr[1] : "")
		},
		withdrawCancel(trd_dt , trd_tm) { // 출금취소 클릭(가상화폐)
      let self = this;
      //초기화
      self.openComfirmPop = false;
      self.cancelDivision = ''
      self.cancelTrdDt = ''
      self.cancelTrdTm = ''
      //데이터 입력
      self.cancelDivision = '2'
      self.cancelTrdDt = trd_dt
      self.cancelTrdTm = trd_tm
      //확인창 오픈 
      self.openComfirmPop = true;
		},
		openCurCdUrl(txid , url){
      let self = this
      let popup = window.open(url+txid)
    },
		infiniteHandler($state) {
      let self = this 
      if(self.tableData.length < self.tableDataRow){
        self.tableDataRow = 50
        $state.reset()
        return
			}
			self.tableDataRow += 30			
			self.getDW531($state);
		},
				
		startDateChange(){
			let self = this;
			self.tableDataRow = 50
			self.getDW531();
		},
		endDateChange(){
			let self = this;
			self.tableDataRow = 50
			self.getDW531();
		},
		getDW531($state){
			var self = this;
			self.$socket.sendProcessByName('dw531', function (queryData) {
				var block = queryData.getBlockData('InBlock1')[0];

				block['user_id'] = self.$store.getters.getUserId  
				block['fr_dt'] =   self.frDt.format('yyyyMMdd')  
				block['to_dt'] =   self.toDt.format('yyyyMMdd')  
				block['dpwd_tp'] = self.dealType === '0' ? '%' : self.dealType
				block['cur_cd'] =  self.getMyAssetstatusInfoCurCd 
				block['req_cnt'] = self.tableDataRow

			}, function (queryData) {
				if (queryData != null) {
          self.tableData = queryData['queryObj']['OutBlock2'];
         
					if($state){
						if(self.tableData.length === self.tableDataRow){
							$state.loaded();
						}else{
							$state.complete()
						}
					}else{
						self.infiniteId = +new Date();
					}
				}else{
					self.emptyText = self.$t('asset_st.a035') // '입출금 내역이 없습니다.'
				}
			});
		},

		// 모바일
		tradeTypeChange(val) {
			// val : 0,1,2
			var self = this;
			self.dealType = val;
			self.tableDataRow = 50
			self.getDW531();
		},
		format(number) { 
			let self = this;
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		},
	},
	created() {
		let self = this
    // 기간설정 default 
    self.toDt = new Date();
		self.frDt = new Date();
		self.frDt.setDate(self.frDt.getDate() - 1);

		self.emptyText =  self.$t('asset_st.a021') //'최근 2일 동안 입출금내역이 없습니다.'

		self.$EventBus.$on('tabHistory', (activeName) => {
			switch(activeName){
				case 'all' :
				self.dealType = '0'
				break;
				case 'deposit' :
				self.dealType = '7'
				break;
				case 'withdraw' :
				self.dealType = '8'
				break;
			}
			self.tableDataRow = 50
			self.getDW531();
		});
	},
	mounted(){

	},
	beforeDestroy() {
		let self = this
		self.$EventBus.$off('tabHistory'); 
  }
};
</script>