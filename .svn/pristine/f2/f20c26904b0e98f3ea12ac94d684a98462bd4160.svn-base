<template>
    <div class="SignHistory">
        <div class="search">
            <el-row>
                <el-col class="srch-part">
                    <el-select v-model="sort" :placeholder="$t('order.d010')"><!-- 구분 -->
                        <el-option v-for="item in sorts" :key="item.sort" :label="item.label" :value="item.sort"></el-option>
                    </el-select>
                </el-col>
                <el-col class="srch-start">
                    <el-date-picker v-model="frDt" placeholder="시작일" :picker-options="frDtValid"></el-date-picker>
                </el-col>
                <el-col class="srch-dash">~</el-col>
                <el-col class="srch-end">
                    <el-date-picker v-model="toDt" placeholder="종료일" :picker-options="toDtValid"></el-date-picker>
                </el-col>
                <el-col class="srch-period">
                    <el-select v-model="period" placeholder="선택">
                        <el-option v-for="item in periods" :key="item.period" :label="item.label" :value="item.period"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col class="srch-label">{{$t('order.d009')}}<!-- 종목 -->:</el-col>
                <el-col class="srch-sort">
                    <el-autocomplete v-model="part" :fetch-suggestions="querySearch" :placeholder="$t('order.d005')"></el-autocomplete><!-- 암호화폐 -->
                </el-col>
                <el-col class="srch-btn">
                    <el-button type="primary" @click="tableSearch(false)">{{$t('order.e003')}}<!-- 조회 --></el-button>
                </el-col>
            </el-row>
        </div>
        <div class="sign-list">
            <div class="el-table">
                <div class="el-table__header-wrapper">
                    <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
                        <colgroup>
                            <col width="90">
                            <col width="90">
                            <col width="60">
                            <col>
                            <col width="180">
                            <col width="180">
                            <col width="180">
                            <col width="180">
                        </colgroup>
                        <thead>
                            <tr>
                                <th><div class="cell">{{$t('order.a009')}}<!-- 일시 --></div></th>
                                <th><div class="cell">{{$t('order.a010')}}<!-- 종목 --></div></th>
                                <th><div class="cell">{{$t('order.a011')}}<!-- 구분 --></div></th>
                                <th><div class="cell">{{$t('order.a012')}}<!-- 체결가격 --></div></th>
                                <th><div class="cell">{{$t('order.a013')}}<!-- 체결수량 --></div></th>
                                <th><div class="cell">{{$t('order.a014')}}<!-- 체결금액 --></div></th>
                                <th><div class="cell">{{$t('order.a015')}}<!-- 수수료 --></div></th>
                                <th><div class="cell">{{$t('order.a016')}}<!-- 정산금액 --></div></th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <el-scrollbar wrap-class="scrollbar-wrapper" :native="false" :class="{'is-scroll': tableData.length > 15}">
                <el-table :data="tableData" :empty-text="$t('order.a017')" stripe :show-header="false"><!-- 체결내역이 없습니다. -->
                    <infinite-loading :identifier="infiniteId" slot="append" @infinite="infiniteHandler" force-use-infinite-wrapper=".scrollbar-wrapper"></infinite-loading>
                    <el-table-column label="일시" align="center" width="90">
                        <template slot-scope="scope">
                            <span>{{scope.row.trd_dtm | dateFormat}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="trd_cur_cd" label="종목" align="center" width="90"></el-table-column>
                    <el-table-column label="구분" align="center" width="60">
                        <template slot-scope="scope">
                            <span v-if="scope.row.buy_sell_tp === '2'" class="buy">{{$t('order.b003')}}<!-- 매수 --></span>
                            <span v-else class="sell">{{$t('order.b004')}}<!-- 매도 --></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="체결가격" align="right">
                        <template slot-scope="scope">
                            <span :class="chkLength(priceFormat(scope.row.setl_cur_cd, scope.row.cntr_prc))">
                                {{priceFormat(scope.row.setl_cur_cd, scope.row.cntr_prc)}} <span class="unit">{{scope.row.setl_cur_cd}}</span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="체결수량" align="right" width="180">
                        <template slot-scope="scope">
                            <span :class="chkLength(coinFormat(scope.row.trgt_cur_cd, scope.row.cntr_qty))">
                                {{coinFormat(scope.row.trgt_cur_cd, scope.row.cntr_qty)}} <span class="unit">{{scope.row.trgt_cur_cd}}</span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="체결금액" align="right" width="180">
                        <template slot-scope="scope">
                            <span :class="chkLength(trdAmtFormat(scope.row.setl_cur_cd, scope.row.trd_amt))">
                                {{trdAmtFormat(scope.row.setl_cur_cd, scope.row.trd_amt)}} <span class="unit">{{scope.row.setl_cur_cd}}</span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="수수료" align="right" width="180">
                        <template slot-scope="scope">
                            <div v-if="scope.row.fee > 0">
                                <span :class="chkLength(trdAmtFormat(scope.row.setl_cur_cd, scope.row.fee))">
                                    {{trdAmtFormat(scope.row.setl_cur_cd, scope.row.fee)}} <span class="unit">{{scope.row.setl_cur_cd}}</span>
                                </span>
                            </div>
                            <div v-else>-</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="calculate" label="정산금액" align="right" width="180">
                        <template slot-scope="scope">
                            <span :class="chkLength(netAmtFormat(scope.row))">
                                {{netAmtFormat(scope.row)}} <span class="unit">{{scope.row.setl_cur_cd}}</span>
                            </span>
                            <!-- {{priceFormat(scope.row.setl_cur_cd, scope.row.cntr_prc * scope.row.cntr_qty + (scope.row.buy_sell_tp === '1' ? scope.row.fee * -1 : scope.row.fee))}} <span class="unit">{{scope.row.setl_cur_cd}}</span> -->
                        </template>
                    </el-table-column>
                </el-table>
            </el-scrollbar>
        </div>
    </div>

    
</template>

<script>
    import Vue from 'vue';
    import InfiniteLoading from 'vue-infinite-loading';
    import fromExponential from 'from-exponential';
    import moment from 'moment';
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    
    /* Infinite-loading
     * guid     : https://peachscript.github.io/vue-infinite-loading/guide/#installation
     * options  : https://peachscript.github.io/vue-infinite-loading/api/#props
    */
    
    Vue.use(InfiniteLoading, {
        slots: {
            noMore: '',
            noResults: ''
        }
    });
    
    export default {
        components: {
            InfiniteLoading,
        },
        name: 'SignHistory',
        data() {
            return {
                sort: '',
                /* 기간설정 */
                frDt: '',
                toDt: '',
                frDtValid: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                period: '7',
                /* 종목 */
                coins: [],
                part: '',
                /* 검색조건 obj */
                searchObj: {
                    fr_dt       : '',
                    to_dt       : '',
                    trgt_coin   : null,
                    symbol      : '',
                    buy_sell_tp : ''
                    //req_cnt     : 30
                },
                /* 기존 검색 조건 */
                oldSearchObj: {},
                /* inifinite loading 컴포넌트 초기화 변수 */
                infiniteId: +new Date(),
            };
        },
        computed: {
            ...mapGetters({
                tableData: 'signList',
                isLogged: 'isLoggedIn',
                getCoinByCd: 'getCoinByCd',
                hogaUnit: 'hogaUnit',
            }),
            socketConnected() {
                return this.$store.getters.isSocketConnected
            },
            /**
             * 검색기간 달력UI에서 종료일 disabled 유효성
             * 시작일 변경에 따라 동적으로 시작일 보다 작은 날짜 disabled 처리
             */
            toDtValid() {
                const self = this;

                var resFn = function(){};
                if (this.frDt instanceof Date) {
                    resFn = function(time) {
                        return time.getTime() < self.frDt.getTime();
                    }
                };

                return { disabledDate: resFn };
            },
            /**
             * 기간 정보(당일, 1주일, 1개월) 설정
             * 언어팩 변경에 따라 동적으로 처리하기 위해 computed에 methods형태로 작업함.
             */
            periods() {
                return [{
                    period: '1',
                    label: this.$t('order.a003') // '당일'
                }, {
                    period: '7',
                    label: this.$t('order.a004') // '1주일'
                }, {
                    period: '30',
                    label: this.$t('order.a005') // '1개월'
                }]
            },
            /**
             * 구분 정보(구분, 매수, 매도) 설정
             * 언어팩 변경에 따라 동적으로 처리하기 위해 computed에 methods형태로 작업함.
             */
            sorts() {
                return [{
                    sort: '',
                    label: this.$t('order.a011')// '구분'
                }, {
                    sort: '2',
                    label: this.$t('order.b003') // '매수'
                }, {
                    sort: '1',
                    label: this.$t('order.b004')// '매도'
                }]
            }
        },
        created() {
            const self = this;

            if (!this.isLogged) {
                
                alert("로그인 후 사용 가능합니다.");
                this.$router.push({name: 'login'});
            };
        },
        mounted() {
            document.getElementsByClassName("infinite-loading-container")[0].style.width = 1000 + "px"
            let self = this
            
            this.$EventBus.$emit('pc-navi', [
                { label: self.$t('header.exchange'), target: 'exchange'},
                { label: self.$t('order.a001'), target: 'signHistory' },
                { label: self.$t('order.a002'), target: null }
            ]);
                
            this.$EventBus.$on('langChange', () => {
                
                self.$EventBus.$emit('pc-navi', [
                    { label: self.$t('header.exchange'), target: 'exchange'},
                    { label: self.$t('order.a001'), target: 'signHistory' },
                    { label: self.$t('order.a002'), target: null }
                ]);
            })
            
            // 기간설정 default 1주일
            this.toDt = new Date();
            this.frDt = new Date();
            this.frDt.setDate(this.frDt.getDate() - 7);

            /**
             * RB03콜백 함수
             * 주문 체결시 데이터 추가
             */
            var callback = function(resData) {
                
                if (resData.evnt_tp == '6') { // 체결


                    if ((self.oldSearchObj['buy_sell_tp'] != "" && self.oldSearchObj['buy_sell_tp'] != resData['buy_sell_tp'])
                     || (self.oldSearchObj['symbol'] != "" && self.oldSearchObj['symbol'] != resData['symbol'])
                    ) return;

                    var tmpData = {};
                    Object.assign(tmpData, resData);
                    tmpData['trd_cur_cd'] = resData['trgt_cur_cd'] + '/' + resData['setl_cur_cd']
                    tmpData['trd_dtm'] = resData['evnt_dtm']
                    tmpData['fee'] = Number(resData['fee'])
                    tmpData['trd_amt'] = Number(resData['cntr_amt'])

                    self.orderUnshift({listName: 'signList', addObj: [tmpData]})
                }
            }

            if (self.$store.getters.isSocketConnected) {
                self.setCoins();

                /**
                 * RB03 TR요청
                 */
                this.$store.dispatch('orderNotification', {
                    vue_name : self.$options.name,
                    callback : callback
                });
                self.tableSearch();
            } else {
                self.$EventBus.$on('socketConnected', () => {
                    self.setCoins();

                    /**
                     * RB03 TR요청
                     */
                    this.$store.dispatch('orderNotification', {
                        vue_name : self.$options.name,
                        callback : callback
                    });
                    self.tableSearch();
                })
            }
        },
        watch: {
            /**
             * 기간 selectbox 변경시 달력 Input에 데이터 설정
             */
            period(value) {
                this.toDt = new Date();
                var frDtObj = new Date(); // default : 당일

                if (value == '7') { // 1주일
                    
                    frDtObj.setDate(frDtObj.getDate() -7);
                } else if (value == '30') { // 1개월

                    frDtObj.setMonth(frDtObj.getMonth() - 1);
                }
                this.frDt = frDtObj;
            },
            /**
             * 매수,매도 구분 선택시 데이터 재조회
             */
            sort(val, old) {
                const sortObj = this.sorts.find(c => c.sort === this.sort);
                if (sortObj) {
                    
                    this.tableSearch()
                    this.oldSearchObj['sort'] = sortObj['sort']
                }
            }
        },
        methods: {
            ...mapMutations(['setContiKey', 'orderUnshift']),
            /**
             * querySearch, createFilter
             * 암호화폐 검색시 입력중인 값에 해당하는 List를 검색input창 하단에 노출하기 위한 메서드
             */
            querySearch(queryString, cb) {
                var coins = this.coins;
                var results = queryString ? coins.filter(this.createFilter(queryString)) : coins;
                cb(results);
            },
            createFilter(queryString) {
                return (coin) => {
                    return (coin.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            /**
             * 체결 데이터 조회
             * @vuex {actions} : searchSignList - tr523 요청
             */
            tableSearch(searchOldParam) {
                let self = this;
                /* 검색조건 유효성 체크 */
                if (!this.searchValidChk()) return;
                var param = {
                    contiFlag: false
                };

                /* 검색조건 set */
                if (searchOldParam) { // 마지막으로 검색한 검색조건으로 param set
                    
                    param = this.oldSearchObj;
                } else {
                    
                    this.searchObj['buy_sell_tp'] = this.sort;
                    const coinObj = this.coins.find(c => c.value === this.part);
                    this.searchObj['symbol'] = coinObj ? coinObj.coin : '';
                    this.searchObj['fr_dt'] = this.frDt.format('yyyyMMdd');
                    this.searchObj['to_dt'] = this.toDt.format('yyyyMMdd');
                    param = this.searchObj;

                    /* 검색조건 임시저장( infiniteHandler(scroll-event)에서 사용 + 실시간 데이터 변경으로 재조회시 사용 ) */
                    Object.assign(this.oldSearchObj, this.searchObj);
                }

                /* data Serach */
                this.$store.dispatch('searchSignList', param)
                .then((obj) => {
                    
                    self.infiniteId = +new Date();
                });
                
            },
            /**
             * 검색범위 유효성 체크
             */
            searchValidChk() {
                
                // 기간 조회 범위 : 최대 90일
                if ( (this.toDt.getTime() - this.frDt.getTime()) > (1000*60*60*24*90) ) {
                    alert("조회 범위는 최대 90일까지 가능합니다.");
                    return false;
                }

                // 조회일 기준 1년전 데이터까지만 조회가능
                if ( (Date.now() - this.frDt.getTime()) > (1000*60*60*24*365)) {
                    alert("체결내역은 최대 1년까지 조회 가능합니다.");
                    return false;
                }

                return true;
            },
            /**
             * 스크롤 이벤트
             * 테이블의 스크롤이 가장 하단에 도달하는 시점에 실행
             * 체결 데이터 추가 조회
             */
            infiniteHandler($state) {

                if (!this.$store.state.exchange.contiKey) {
                    $state.reset()
                    return;
                }
                
                this.oldSearchObj['contiFlag'] = true;

                /* data Serach */
                this.$store.dispatch('searchSignList', this.oldSearchObj)
                .then((obj) => {
                    
                    obj.getContiKey() == null ? $state.complete() : $state.loaded();
                });
            },
            /* 글자 size 조절 */
            chkLength(val) {
                if (val == undefined) return;
                if (val.length > 15) {
                    return 'fs15';
                }
            },
            /** 체결수량
             * 소수점, 콤마 포멧 
            */
            coinFormat(cd, number) {
                if(cd == '' || cd == null || cd == undefined || this.getCoinByCd(cd) == undefined) return;

                let self = this;
                let dec_digt = self.getCoinByCd(cd).dec_digt
                return UnitManager.fixedDecimalWithCommas(number, dec_digt? dec_digt : 8)
            },
            /** 체결가격
             * 소수점, 콤마 포멧 
            */
            priceFormat(cd, prc) {
                if(cd == '' || cd == null || cd == undefined || this.hogaUnit == undefined) return;

                let self = this;
                var nLenBelowDigitArray = [1];
                UnitManager.getHogaUnit(self.hogaUnit, cd, prc, undefined, undefined, nLenBelowDigitArray);
                return UnitManager.fixedDecimalWithCommas(prc, nLenBelowDigitArray[0])
            },
            /** 체결금액, 수수료
             * 소수점, 콤마 포멧 
            */
            trdAmtFormat(cd, prc) {
                if(cd == '' || cd == null || cd == undefined || this.hogaUnit == undefined) return;

                let self = this;
                var nLenBelowDigitArray = [0];

                if (cd == 'KRW') {

                    prc = Math.floor(Number(prc))
                } else {
                    
                    UnitManager.getHogaUnit(self.hogaUnit, cd, prc, undefined, undefined, nLenBelowDigitArray);
                }
                return UnitManager.fixedDecimalWithCommas(prc, nLenBelowDigitArray[0])
            },
            /** 정산금액
             * 소수점, 콤마 포멧 
            */
            netAmtFormat(row) {
                if(row.net_amt != undefined) return UnitManager.numberWithCommas(row.net_amt)
                if(this.hogaUnit == undefined) return;
                
                let self = this;
                // var formatter;
                var cd = row.setl_cur_cd
                var prc = row.trd_amt
                var fee = row.fee
                var res = 0;
                var nLenBelowDigitArray = [0];

                if(cd == 'KRW') {
                    
                    prc = Math.floor(Number(prc))
                    fee = Math.floor(Number(fee))
                } else {
                    
                    UnitManager.getHogaUnit(self.hogaUnit, cd, prc, undefined, undefined, nLenBelowDigitArray);
                    prc = Number(prc).toFixed(nLenBelowDigitArray[0]) * 1
                }

                if (row.fee > 0) {
                    
                    fee = row.buy_sell_tp === '1' ? Number(fee).toFixed(nLenBelowDigitArray[0]) * -1 : Number(fee).toFixed(nLenBelowDigitArray[0]) * 1
                } else {

                    fee = 0
                }

                res = prc + fee;

                // return formatter.format(res);
                return UnitManager.flooredDecimalWithCommas(fromExponential(res), nLenBelowDigitArray[0])
            },
            /**
             * 암호화폐 검색에 필터처리를 위해 암호화폐 목록 설정 ( 페이지 로드시 최초 1회 실행 )
             *   > 마켓 순서로 정렬( KRW > BTC > ETH 순서 )해서 this.coins에 할당.
             */
            setCoins() {
                let self = this;
                if (self.coins.length > 0) return
                var tmpObj = {
                    "KRW" : [],
                    "BTC" : [],
                    "ETH" : []
                };

                self.$socket.sendProcessByName('n1001', function (queryData) {
                    var block = queryData.getBlockData('InBlock1')[0];
                    block['i_qrydiv'] = '0';
                }, function (queryData) {
                    if (queryData != null) {
                        const nameList = queryData['queryObj']['OutBlock2'];
                        
                        for (var idx in nameList) {
                            
                            if (nameList[idx]['o_setl_cur_cd_n'] == 'KRW') {
                                
                                tmpObj['KRW'].push({
                                    "value" : nameList[idx]['o_inst_eng_abbr'],
                                    "coin"  : nameList[idx]['o_symbol']
                                })
                            } else if (nameList[idx]['o_setl_cur_cd_n'] == 'BTC') {

                                tmpObj['BTC'].push({
                                    "value" : nameList[idx]['o_inst_eng_abbr'],
                                    "coin"  : nameList[idx]['o_symbol']
                                })
                            } else if (nameList[idx]['o_setl_cur_cd_n'] == 'ETH') {

                                tmpObj['ETH'].push({
                                    "value" : nameList[idx]['o_inst_eng_abbr'],
                                    "coin"  : nameList[idx]['o_symbol']
                                })
                            }
                        }

                        self.coins = tmpObj['KRW'].concat(tmpObj['BTC']).concat(tmpObj['ETH'])
                    } else {

                        // 전문 에러 언어팩 적용
                        const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                        if (errorData.trName != "n1001") return

                        self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                            dangerouslyUseHTMLString: true,
                            confirmButtonText: self.$t('sys_err.a001')
                        });
                    }
                });
            }
        },
        filters: {
            /* 주문일시 yyyy-mm-dd hh:mm:ss  */
            dateFormat(ord_dtm) {
                if (!ord_dtm) return '';
                return moment(ord_dtm.substr(0,8) + "T" + ord_dtm.substr(8,6)).format("YYYY-MM-DD HH:mm:ss");
            }   
        },
        beforeDestroy() {
            var self = this;
            self.$socket.unregisterReal('RB03', [self.$store.state.user.user_id], self.$options.name);
        },
        destroyed() {
            this.setContiKey(null)
        }
    };
</script>