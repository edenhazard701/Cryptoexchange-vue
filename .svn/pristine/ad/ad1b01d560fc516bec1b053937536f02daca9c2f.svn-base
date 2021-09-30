<template>
    <el-container class="mBankVue">
        <el-main class="m_bank_main">
            <div class="top_cont">
                <el-row class="top_tit_wrap">
                    <p class="tit">{{$t('m_wallet_in.a002')}}</p>  <!-- 전체 자산 평가액 -->
                    <p class="price"><span class="number">{{ format(totalEvalAmt) }}</span> KRW</p>
                </el-row>
                <el-row class="search">
                    <div class="search_inp">
                        <el-input class="inp_m" ref="filterTextInput" :placeholder="$t('m_wallet_in.a003')" v-model="filterText" maxlength="20"></el-input>  <!-- 암호화폐 검색 (한글/영문)  -->
                        <el-button class="search_delete" @click="onVallDelete"></el-button> <!-- 검색 delete btn -->
                        <el-button class="search_btn"></el-button>
                    </div>
                </el-row>
                <el-row class="table_top_check">
                    <el-checkbox v-model="holdingOnly" @change="onHoldingOnlyChange" id="hasCoinChk">{{$t('m_wallet_in.a004')}}</el-checkbox>  <!--  보유코인만  -->
                </el-row>
            </div>
            <el-table :data="dataList" @row-click="selectItem" class="data_table" row-key="cur_cd" ref="tableRef">
                <el-table-column :label="$t('m_wallet_in.a005')" align="left" width="150">   <!-- 암호화폐명  -->
                    <template slot-scope="scope">
                        <div v-if="scope.row.cur_cd === 'KRW'" class="name_wrap">
                            <div class="logo"><img :src="require('@/images/m_krw_logo.png')"></div>
                            <div class="name">
                                <span class="span_ko_nm" v-if="$i18n.locale === 'en'" :title="getCoinByCd(scope.row.cur_cd)['cur_eng_nm']">{{getCoinByCd(scope.row.cur_cd)['cur_eng_nm']}}</span>
                                <span class="span_ko_nm" v-else :title="getCoinByCd(scope.row.cur_cd)['cur_kor_nm']">{{getCoinByCd(scope.row.cur_cd)['cur_kor_nm']}}</span>
                                <span class="span_ko_en">{{scope.row.cur_cd}}</span>
                            </div>
                        </div> <!-- getLangKind == 'KR' -->
                        <div v-if="scope.row.cur_cd !== 'KRW'" class="name_wrap">
                            <div class="logo"><img :src="displayCoinImg(scope.row.cur_cd)"></div>
                            <div class="name">
                                <span class="span_ko_nm" v-if="$i18n.locale === 'en'" :title="getCoinByCd(scope.row.cur_cd)['cur_eng_nm']">{{getCoinByCd(scope.row.cur_cd)['cur_eng_nm']}}</span>
                                <span class="span_ko_nm" v-else :title="getCoinByCd(scope.row.cur_cd)['cur_kor_nm']">{{getCoinByCd(scope.row.cur_cd)['cur_kor_nm']}}</span>
                                <span class="span_ko_en">{{scope.row.cur_cd}}</span>
                            </div>
                        </div>
                	</template>
                </el-table-column>
                <el-table-column :label="$t('m_wallet_in.a006')" align="right">  <!-- 보유 수량  --> 
                    <template slot-scope="scope">
                        <div class="remn_qty" v-if="scope.row.cur_cd === 'KRW'">
                            {{ format(scope.row["cur_bal"]) }} <span class="s_txt" >{{ scope.row.cur_cd }}</span>
                        </div>
                        <div class="remn_qty" v-if="scope.row.cur_cd !== 'KRW'">
                            {{ formatCoin(scope.row["cur_bal"]) }} <span class="s_txt" >{{ scope.row.cur_cd }}</span>
                        </div>
                        <div class="remn_qty_krw" v-if="scope.row.cur_cd !== 'KRW'">
                            ≈{{ format(scope.row["krw_bal"]) }} <span class="s_txt" >KRW</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <!-- Native App일 때만 나타남 -->
        <app-menu></app-menu>
    </el-container>
</template>

<script >
import AppMenu from './common/MobileFooterMenu';
import { mapGetters, mapActions, mapState } from 'vuex'
import { _ } from 'vue-underscore'


export default {
    components: {
        AppMenu
    },
    data () {
        return {
            name: 'BankAssetListMobile',
			filterText: '',
			holdingOnly: false,
			totalEvalAmt: 0,
            dataList: [],
            dataLoaded: false,
            beforeSymbols: []
        }
    },
    computed: {
		...mapState({
			nameList: state => state.data['n1001']
		}),
		...mapGetters(['currentCurCd', 'getPairsByCd', 'getPairsByCds', 'getPairBySymbol', "btcKRWCurPrc", "ethKRWCurPrc", 'getCoinByCd']),
		getTotalEvalAmt() {
            let self = this;
            if (self.dataList.length < 1) return 0;
            return self.dataList.map(item => item.krw_bal * 1).reduce((a, b) => a + b);
        }
    },
    methods: {
        handleScroll: function (event) {
            var scollTop = window.scrollY;
            var topContHei = document.getElementsByClassName('top_cont')[0].offsetHeight;
            var backMain = document.getElementsByClassName('m_bank_main')[0].getElementsByClassName('data_table')[0];

            if(scollTop > topContHei){
                backMain.getElementsByClassName('el-table__header-wrapper')[0].style.position = "fixed";
                backMain.getElementsByClassName('el-table__header-wrapper')[0].style.top = "45px";
                backMain.getElementsByClassName('el-table__body-wrapper')[0].style.padding = "25px 0 0"
            }else{
                backMain.getElementsByClassName('el-table__header-wrapper')[0].removeAttribute("style")
                backMain.getElementsByClassName('el-table__body-wrapper')[0].removeAttribute("style")
            }
        },
        onVallDelete(){
            var self = this;
            self.filterText = '';
            self.filterTable();
            document.getElementsByClassName('search_delete')[0].classList.remove('show');
            document.getElementsByClassName('search_inp')[0].getElementsByTagName("input")[0].value = "";
        },
        selectItem(row, event, column) {
            var self = this
            let rowCur_cd = row.cur_cd
            self.$store.commit('setMyAssetstatusInfo', row);

            // 전자지갑연계구분(0.없음, 1.입금, 2.입출금) 
            self.$store.dispatch('adminWalletState', { cur_cd: rowCur_cd }).then( data => {}).catch( errorData => {});

            // 지갑 조회 dw541
            self.$store.dispatch('selectCoinWallet', { cur_cd: rowCur_cd }).then( data => {}).catch( errorData => {});
        
            self.$router.push({
                name : 'mBankTransaction'
            });
		},
		format(number) { 
			let self = this;
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		},
		formatCoin(number) {
			let self = this;
			let numberArr = Number(number).toFixed(8).toString().split(".")
			return numberArr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (numberArr[1] ? "." + numberArr[1] : "")
        },
        onHoldingOnlyChange(event) {
			let self = this;			
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
        getMyAssetList() {
			let self = this;
			let sear_tp = self.holdingOnly ? 1:2;
			let payload = { sear_tp : sear_tp, sear_key : '' }

			//보유자산 리스트 조회
			self.$store.dispatch('selectMyAssetStatusData', payload).then((data) => {
				self.dataList = data.queryObj.OutBlock2;
                self.totalEvalAmt = self.getTotalEvalAmt;

                let cds = self.dataList.filter(item => (item.cur_bal*1) > 0).map(item => item.cur_cd);
                var symbols = self.getPairsByCds(cds).map(item => item.o_symbol);
                
                if (self.beforeSymbols.length > 0) {
                    self.$socket.unregisterReal('KVM2', self.beforeSymbols, self.name);
                }
                self.$socket.registerReal("KVM2", "symbol", symbols, self.name, self.onPriceChange);
                self.beforeSymbols = symbols;
                
				self.filterTable();
			})
        },
        filterTable() {
            let self = this;
            const rows = this.$refs.tableRef.$refs.bodyWrapper.getElementsByClassName('el-table__row');

            let tempText = self.filterText.replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)\s]/gi,'').replace(/[\(\)]/gi,'');
            if(tempText.length > 20){
                tempText = tempText.substr(0,20);
            }

            let searchText = tempText.toLowerCase(); 

            for (let row of rows) {
                let innerText = row.getElementsByTagName('td')[0].innerText.toLowerCase();
                innerText += row.getElementsByTagName('td')[0].getElementsByTagName('span')[0].title.toLowerCase();
                
                row.style.display = innerText.indexOf(searchText) > -1 ? '' : 'none';
            }

            self.filterText = tempText;
        },
		realconnetRB02() {
			let self = this			
			self.$socket.unregisterReal('RB02', [self.$store.getters.getUserId], self.name);
        	self.$socket.registerReal('RB02', "symbol", [self.$store.getters.getUserId], self.name, function (queryData){
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
            let changed = _.findWhere(self.dataList, {
                cur_cd: cd
            });

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
        krPriceFormat(number) { // 한화 환산가 형식
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
        // dataLoaded 값이 false일 경우 데이터 요청 처리
        // 동시 dataLoaded를 true로 변경하여 중복 요청 방지
        loadStockDataCallback() { // loadStockData 이벤트 콜백 함수
            var self = this;
            if(self.dataLoaded) return;
			self.dataLoaded = true;
            self.getMyAssetList();
            self.realconnetRB02();
        },
        // 신규상장, 소켓재접속등 데이터 재조회 필요시 받는 event 
        // resetLoadStockData 이벤트가 먼저 실행되어 dataLoaded 값이 false로 변경
        // 재조회 가능 상태로 처리
        resetLoadStockDataCallback() { // resetLoadStockData 이벤트 콜백 함수
            var self = this;
            self.dataLoaded = false;
        },
    },
    created() {
        let self = this;

        self.$EventBus.$emit('mobile-nav-title', self.$t('m_main.e007'));
        self.$EventBus.$emit('mobile-nav-menus', ['bankHistory', 'notification']);

        window.addEventListener('scroll', self.handleScroll);
    },
    mounted() {
        let self = this;

        var input = self.$refs.filterTextInput.$el.getElementsByTagName('input')[0];
        $(input).bind("keyup", function(e) {
            if(e.target.value == ''){          
                setTimeout(() => {
                    self.filterText = '';
                    self.filterTable();
                }, 300);
            }else{
                self.filterText = e.target.value;
                self.filterTable();
            }
        });

        self.handleScroll();
        //검색 delete btn
        var searchInp = document.getElementsByClassName('search_inp')[0].getElementsByTagName("input")[0];

        searchInp.addEventListener("keyup", function(){
            if(searchInp.value == ''){
                document.getElementsByClassName('search_delete')[0].classList.remove('show');
            }else{
                document.getElementsByClassName('search_delete')[0].classList.add('show');
            }
        });

        document.getElementsByClassName('MobileContainer')[0].classList.add('bank');

		self.$EventBus.$on('loadStockData', self.loadStockDataCallback);
		self.$EventBus.$on('resetLoadStockData', self.resetLoadStockDataCallback);

		if (self.nameList.length > 0 && !self.dataLoaded) {
			self.$EventBus.$emit('loadStockData');
		}

		self.$refs.tableRef.setCurrentRow({ cur_cd : self.currentCurCd });
    },
    beforeDestroy() {
        let self = this
		self.$EventBus.$off('loadStockData', self.loadStockDataCallback);
		self.$EventBus.$off('resetLoadStockData', self.resetLoadStockDataCallback);
		
        if (self.beforeSymbols.length > 0) {
            self.$socket.unregisterReal('KVM2', self.beforeSymbols, self.name);
        }
        self.$socket.unregisterReal('RB02', [self.$store.getters.getUserId], self.name);
        
        window.removeEventListener('scroll', self.handleScroll);
    },
    destroyed() {
        document.getElementsByClassName('MobileContainer')[0].classList.remove('bank');
    }
}
</script>
