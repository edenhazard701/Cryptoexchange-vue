<template>
	<div class="BankAssetList contents">
		<el-row class="bankasset-head">
			<el-col class="title">{{$t('asset_in.a001')}}<!-- 전체 자산 평가액 --></el-col>
			<el-col class="asset-value">
				<span>{{ format(totalEvalAmt) }}</span> KRW
			</el-col>
		</el-row>
		<el-row class="bankasset-search">
			<el-col class="search">
				<el-input v-if="!isIE" :placeholder="$t('asset_in.a002')" v-model="filterText" clearable @keyup.native="filterTable" @click.native="filterTable"><!-- 암호화폐 검색 (한글/영문) -->
					<i class="el-icon-search el-input__icon" slot="suffix" ></i>
				</el-input>
				<div v-if="isIE" class="srch-box">
					<input type="text" id="srchBoxIE" :placeholder="$t('asset_in.a002')" v-model="filterText">
					<span class="srch-icon"></span>
          <span class="srch-del" style="display:none;"></span>
				</div>
			</el-col>
			<el-col class="check-own">
				<el-checkbox v-model="holdingOnly" @change="onHoldingOnlyChange">{{$t('asset_in.a003')}}<!-- 보유 코인만 --></el-checkbox>
			</el-col>
		</el-row>

		<div class="el-table">
			<div class="el-table__header-wrapper">
				<table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 480px;">
					<colgroup>
						<col name="el-table_1_column_1" width="170">
						<col name="el-table_1_column_2">
					</colgroup>
					<thead class="has-gutter">
						<tr class="">
							<th colspan="1" rowspan="1" class="el-table_1_column_1 is-leaf">
								<div class="cell">{{$t('asset_in.a004')}}<!-- 암호화폐명 --></div>
							</th>
							<th colspan="1" rowspan="1" class="el-table_1_column_2 is-right is-leaf">
								<div class="cell">{{$t('asset_in.a005')}}<!-- 보유수량 --></div>
							</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>

		<el-scrollbar wrap-class="scrollbar-wrapper" :native="false" :class="{'isScroll': dataList.length > 24}">
			<el-table :data="dataList" highlight-current-row stripe @row-click="selectItem" :show-header="false" row-key="cur_cd" ref="tableRef">
				<el-table-column prop="cur_cd" label="암호화폐명" width="170">
					<template slot-scope="scope">
						<el-row v-if="scope.row.cur_cd === 'KRW'">
							<el-col class="symbol-logo"><img :src="require('@/images/m_krw_logo.png')"></el-col>
							<el-col v-if="$i18n.locale === 'en'" class="symbol-text">{{getCoinByCd(scope.row.cur_cd)['cur_eng_nm']}}<br><span :title="getCoinByCd(scope.row.cur_cd)['cur_eng_nm']" class="unit small">{{scope.row.cur_cd}}</span></el-col>
							<el-col v-else class="symbol-text">{{getCoinByCd(scope.row.cur_cd)['cur_kor_nm']}}<br><span :title="getCoinByCd(scope.row.cur_cd)['cur_kor_nm']" class="unit small">{{scope.row.cur_cd}}</span></el-col>
						</el-row>
						<el-row v-else >
							<el-col class="symbol-logo"><img :src="displayCoinImg(scope.row.cur_cd)"></el-col>
							<el-col v-if="$i18n.locale === 'en'" class="symbol-text">{{getCoinByCd(scope.row.cur_cd)['cur_eng_nm']}}<br><span :title="getCoinByCd(scope.row.cur_cd)['cur_eng_nm']" class="unit small">{{scope.row.cur_cd}}</span></el-col>
							<el-col v-else class="symbol-text">{{getCoinByCd(scope.row.cur_cd)['cur_kor_nm']}}<br><span :title="getCoinByCd(scope.row.cur_cd)['cur_kor_nm']" class="unit small">{{scope.row.cur_cd}}</span></el-col>
						</el-row>
          </template>
				</el-table-column>
				<el-table-column prop="gen_bal" label="보유수량" align="right">
					<template slot-scope="scope">
						<p v-if="scope.row.cur_cd === 'KRW'">{{ format(scope.row["cur_bal"]) }} <span class="unit">{{ scope.row.cur_cd }}</span></p>
						<p v-else>{{ formatCoin(scope.row["cur_bal"]) }} <span class="unit">{{ scope.row.cur_cd }}</span></p>
						<p v-if="scope.row.cur_cd !== 'KRW' && scope.row.cur_bal > 0">
							<span class="unit small about">≈{{ format(scope.row["krw_bal"]) }} KRW</span>
						</p>
          </template>
				</el-table-column>
			</el-table>
		</el-scrollbar>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { _ } from 'vue-underscore'

export default {
	data () {
		return {
			name: 'BankAssetList',  // 컴포넌트 이름 : 실시간 데이터 해지시 사용
			filterText: '',         // 검색 입력 창 텍스트      
			holdingOnly: false,     // 보유코인 선택 체크박스 구분 
			totalEvalAmt: 0,        // 전체 자산 평가액 
			dataList: [],           // 입출금 자산리스트 배열 
			dataLoaded: false,      // 소켓 커넥션 연결상태
			beforeSymbols: [],      // 이전심볼리스트
		};
	},
	computed: {
		...mapState({
			nameList: state => state.data['n1001'],     //종목정보 조회 
		}),
		...mapGetters(['currentCurCd', 'getPairsByCd', 'getPairsByCds', 'getPairBySymbol', "btcKRWCurPrc", "ethKRWCurPrc", 'getCoinByCd']),
		getTotalEvalAmt() {
      let self = this;
      if (self.dataList.length < 1) return 0;
      return self.dataList.map(item => item.krw_bal * 1).reduce((a, b) => a + b);
    },
		isIE() {
			return afc.isIE;  //IE 브라우저 여부 
		}
  },
	methods : {
    //입출금 자산 리스트 선택 
		selectItem(row, event, column) {
			var self = this
			let rowCur_cd = row.cur_cd                           //선택된 통화 코드
			self.$store.commit('setMyAssetstatusInfo', row);     //vuex setMyAssetstatusInfo 에 선택된 통화 정보 저장 
			self.$EventBus.$emit('myAssetstatusInfo', row);      //myAssetstatusInfo 이벤트 발생 : 탭 정보 입금으로 
			self.$EventBus.$emit('tabHistory', 'all');           //tabHistory 이벤트 발생        : 탭 검색  전체검색 
			self.$EventBus.$emit('resetWithdrawData'); 			     //resetWithdrawData 이벤트 발생 : 출금 입력 데이터 초기화 
			self.$EventBus.$emit('resetDepositData');            //resetDepositData 이벤트 발생  : 입금 데이터 초기화  	

			//통화 정보 조회 관리자에서 설정한  관리자 전자지갑연계구분(0.없음, 1.입금, 2.입출금) 에 따라 분기처리 호면
			self.$store.dispatch('adminWalletState', { cur_cd: rowCur_cd }).then( data  => {}).catch( errorData => {});

      // 지갑 조회 dw541
			self.$store.dispatch('selectCoinWallet', { cur_cd: rowCur_cd }).then( data => {
				self.$EventBus.$emit('qrcodeMake'); //qrcode 발생 이벤트
			}).catch( errorData => {});
		},
		format(number) {	//원화 콤마처리
			 let self = this;
			 let numberArr = Number(number).toString().split(".");
			 return numberArr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			//return UnitManager.numberWithCommas(number).toFixed();
		},
		formatCoin(number) {	//암호화화폐 콤마처리
			let self = this;
			let numberArr = Number(number).toFixed(8).toString().split(".");
			return numberArr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (numberArr[1] ? "." + numberArr[1] : "");
    },
    filterTable() {	//암호화화폐 검색 필터
      let self = this;
      
      //el-table__row  전체 정보
			let rows = self.$refs.tableRef.$refs.bodyWrapper.getElementsByClassName('el-table__row');
			
      //입력된 텍스트 정규식
      let tempText = self.filterText.replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)\s]/gi,'').replace(/[\(\)]/gi,'');
      if (tempText.length > 20) {
        tempText = tempText.substr(0,20);
      }

			let searchText = tempText.toLowerCase();
			
      for (let row of rows) {
				let innerText = row.getElementsByTagName('td')[0].innerText.toLowerCase();
				innerText += row.getElementsByTagName('td')[0].getElementsByTagName('span')[0].title.toLowerCase();
        row.style.display = innerText.indexOf(searchText) > -1 ? '' : 'none';
			}
			
			self.filterText = tempText;
			
			rows = null;
			tempText = null;
			searchText = null;
    },
    //보유코인 체크박스 클릭시 이벤트 발생
    onHoldingOnlyChange(event) {  
      let self = this;
      //입출금 자산리스트 조회
			self.getMyAssetList();
		},
		/* 코인 이미지 표시 */
    displayCoinImg(symbol) {         
      let coin = symbol.toLowerCase();
      let coinData = this.$store.state.data.coinImage;
      let coinURLArray = Object.values(coinData);
      let coinArrIdx = Object.keys(coinData).indexOf(coin);
      if (coinArrIdx < 0) {
        return require('@/images/coin/default.png');
      } else {
        return coinURLArray[coinArrIdx];
      }
    },
    //입출금 자산리스트 조회
		getMyAssetList() {
			let self = this;
			let sear_tp = self.holdingOnly ? 1:2;               //보유코인 체크시 1  , 체크해제시 2
			let payload = { sear_tp : sear_tp, sear_key : '' }  //자산리스트 조회 변수 매핑

			if (self.beforeSymbols.length > 0) {
				self.$socket.unregisterReal('KVM2', self.beforeSymbols, self.name);
			}

			//보유자산 리스트 조회
			self.$store.dispatch('selectMyAssetStatusData', payload).then((data) => {		//wallet.js 에 설정된 selectMyAssetStatusData 입출금 자산리스트 조회 		
				self.dataList = data.queryObj.OutBlock2;                                  //실행결과 데이터 리스트 매핑
				self.totalEvalAmt = self.getTotalEvalAmt;                                 //computed : getTotalEvalAmt()   전체자산평가액 구하기 (변화감지)

				let cds = self.dataList.filter(item => (item.cur_bal*1) > 0).map(item => item.cur_cd);
        var symbols = self.getPairsByCds(cds).map(item => item.o_symbol);
        
        self.$socket.registerReal("KVM2", "symbol", symbols, self.name, self.onPriceChange);
        self.beforeSymbols = symbols;
				
				self.filterTable();                                                    

				if (self.currentCurCd !== '') {                               //자산현황에서 입출금 들어왔을떄
					let currentCurcdTemp = self.currentCurCd
					self.$store.commit('setCurrentCurCd' , '');	                //vuex CurrentCurCd 초기화
					let tgt = self.dataList.filter(item => {
						if (item.cur_cd === currentCurcdTemp) return item;
					});
					self.$refs.tableRef.setCurrentRow(tgt[0])                   //자산현황에서 클릭한 통화코드 선택  
					self.selectItem(tgt[0])					                            //선택이벤트 발생 
				} else {
					self.$refs.tableRef.setCurrentRow({ cur_cd : 'KRW' })       //원화 통화코드 선택
				}
			});
    },
    //실시간 잔고변동 tr 연결
		realconnetRB02() {
      let self = this;	
      self.$socket.registerReal('RB02', "symbol", [self.$store.getters.getUserId], self.name, function (queryData) { 
        //실시간 잔고변동이 있을경우 입출금 자산 재조회 
				self.getMyAssetList();  
			});
		},
		onPriceChange(queryData) {
      if (!queryData) {
        return;
      }

      const data = queryData.getBlockData("OutBlock1")[0];
      if (!data) {
        return;
			}
			
			const self = this;
            
      const cd = self.getPairBySymbol(data["symbol"]).o_trgt_cur_cd_n;
      let changed = _.findWhere(self.dataList, { cur_cd: cd });
      if (!changed) {
        return;
      }

      let price = data.curprc * 1;
      const market = data.symbol.slice(-5).replace(/[_]/g, "");
      if (market === "BTC") {
        if (self.getPrimaryMarket(cd) !== market) return;
        price = self.$big(price).times(self.btcKRWCurPrc);
        price = self.krPriceFormat(price);
      } else if (market === "ETH") {
        if (self.getPrimaryMarket(cd) !== market) return;
        price = self.$big(price).times(self.ethKRWCurPrc);
        price = self.krPriceFormat(price);
      }

      changed.krw_bal = Math.floor(self.$big(changed.cur_bal).times(price));

      self.totalEvalAmt = self.getTotalEvalAmt;
    },
    /**
     * 통화 최우선 마켓
     * @param {string} cd 통화코드
     * @returns {string} 마켓코드
     */
    getPrimaryMarket(cd) {
      const self = this;
      let markets = self.getPairsByCd(cd).map(item => item.o_setl_cur_cd_n);
      if (markets.includes("KRW")) {
        return "KRW";
      } else if (markets.includes("BTC")) {
        return "BTC";
      } else {
        return "ETH";
      }
    },
    // 한화 환산가 형식
    krPriceFormat(number) { 
      var fixedVal = 0;
      if (number < 10) {
        fixedVal = 2;
      } else if (10 <= number && number < 100) {
        fixedVal = 1;
      }

      if (fixedVal > 0) {
        if (number > 0) {
          var num = number.toFixed(10);
          var val1 = UnitManager.numberWithCommas(parseInt(number.toString()));
          var val2 = num.toString().split('.')[1];
          val2 = parseFloat('0.' + val2).toFixed(fixedVal);
          val2 = val2.toString().split('.')[1];
          return val1 + '.' + val2;
        } else {
          return number.toFixed(fixedVal);
        }
      } else {
        return UnitManager.numberWithCommas(parseInt(number));
      }
    },
		loadStockDataCallback() { // loadStockData 이벤트 콜백 함수
      if(this.dataLoaded) return;
			this.dataLoaded = true;
			this.getMyAssetList();
			this.realconnetRB02();
    },
    resetLoadStockDataCallback() { // resetLoadStockData 이벤트 콜백 함수
      this.dataLoaded = false;
		},
		bankTransactionReloadCallback() { // resetLoadStockData 이벤트 콜백 함수
      this.getMyAssetList();
    },
	},
	mounted () {
		let self = this;
		let zoomIco = document.getElementsByClassName('srch-icon')[0];
		let delIco = document.getElementsByClassName('srch-del')[0];
		if (self.isIE) {
			$('#srchBoxIE').bind('keyup', function(e) {
				if (e.target.value == '') {
					setTimeout(() => {
						zoomIco.style.display = 'block';
						delIco.style.display = 'none';
						self.filterText = '';
          	self.filterTable();
					});
				} else {
					zoomIco.style.display = 'none';
					delIco.style.display = 'block';
					self.filterText = e.target.value;
          self.filterTable();
				}
			});

			$('.srch-del').on('click', function() {
				zoomIco.style.display = 'block';
				delIco.style.display = 'none';
				self.filterText = '';
				self.filterTable();
			});
		}

		self.$EventBus.$on('loadStockData', self.loadStockDataCallback);
		self.$EventBus.$on('resetLoadStockData', self.resetLoadStockDataCallback);
		self.$EventBus.$on('bankTransactionReload', self.bankTransactionReloadCallback);

		if (self.nameList.length > 0 && !self.dataLoaded) {
			self.$EventBus.$emit('loadStockData');
		}
	},
	beforeDestroy() {
		let self = this;

		self.$EventBus.$off('loadStockData', self.loadStockDataCallback);
		self.$EventBus.$off('resetLoadStockData', self.resetLoadStockDataCallback);
		self.$EventBus.$off('bankTransactionReload', self.bankTransactionReloadCallback);
		
		if (self.beforeSymbols.length > 0) {
      self.$socket.unregisterReal('KVM2', self.beforeSymbols, self.name);
    }
		self.$socket.unregisterReal('RB02', [self.$store.getters.getUserId], self.name);

		self.$store.commit('setCurrentCurCd', '');
		self.$store.commit('setMyAssetstatusInfoCurCd', '');
  }
};

</script>