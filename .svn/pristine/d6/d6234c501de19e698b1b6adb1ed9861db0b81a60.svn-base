<template>
    <div class="NotSign">
        <div class="search">
            <el-row>
                <el-col class="srch-part">
                    <el-select v-model="sort" :placeholder="$t('order.a011')"><!-- 구분 -->
                        <el-option v-for="item in sorts" :key="item.sort" :label="item.label" :value="item.sort"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col class="srch-label">{{$t('order.a010')}}<!-- 종목 -->: </el-col>
                <el-col class="srch-sort">
                    <el-autocomplete v-model="part" :fetch-suggestions="querySearch" :placeholder="$t('order.b006')"></el-autocomplete><!-- 암호화폐 -->
                </el-col>
                <el-col class="srch-btn">
                    <el-button type="primary" @click="tableSearch(false)" ref="searchBtn">{{$t('order.b007')}}<!-- 조회 --></el-button>
                </el-col>
                <!-- <el-button type="warning" @click="cancelAllConf">전체 취소</el-button> -->
            </el-row>
        </div>
        <div class="notsign-list">
            <div class="el-table">
                <div class="el-table__header-wraper">
                    <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
                        <colgroup>
                            <col width="90">
                            <col width="90">
                            <col width="90">
                            <col width="60">
                            <col>
                            <col width="180">
                            <col width="180">
                            <col width="180">
                            <col width="70">
                        </colgroup>
                        <thead>
                            <tr>
                                <th><div class="cell">{{$t('order.b008')}}<!-- 주문 # --></div></th>
                                <th><div class="cell">{{$t('order.b009')}}<!-- 주문일시 --></div></th>
                                <th><div class="cell">{{$t('order.b010')}}<!-- 종목 --></div></th>
                                <th><div class="cell">{{$t('order.b011')}}<!-- 구분 --></div></th>
                                <th><div class="cell">{{$t('order.b012')}}<!-- 주문가격 --></div></th>
                                <th><div class="cell">{{$t('order.b013')}}<!-- 주문수량 --></div></th>
                                <th><div class="cell">{{$t('order.b014')}}<!-- 체결수량 --></div></th>
                                <th><div class="cell">{{$t('order.b015')}}<!-- 미체결수량 --></div></th>
                                <th><div class="cell"><el-button size="mini" plain type="warning" @click="cancelAllConf">{{$t('order.b016')}}<!-- 전체취소 --></el-button></div></th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <el-scrollbar wrap-class="scrollbar-wrapper" :native="false" :class="{'is-scroll': tableData.length > 15}">
                <el-table :data="tableData" :empty-text="$t('order.b029')" stripe :show-header="false"><!-- 미체결주문이 없습니다. -->
                    <infinite-loading :identifier="infiniteId" slot="append" @infinite="infiniteHandler" force-use-infinite-wrapper=".scrollbar-wrapper">
                    </infinite-loading>
                    <el-table-column label="주문 #" align="right" width="90">
                        <template slot-scope="scope">
                            {{Number(scope.row.ord_no)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="주문일시" align="center" width="90">
                        <template slot-scope="scope">
                            {{scope.row.ord_dtm | dateFormat}}
                        </template>
                    </el-table-column>
                    <el-table-column label="종목" align="center" width="90">
                        <template slot-scope="scope">
                            {{scope.row.trgt_cur_cd + '/' + scope.row.setl_cur_cd}}
                        </template>
                    </el-table-column>
                    <el-table-column label="구분" align="center" width="60">
                        <template slot-scope="scope">
                            <span v-if="scope.row.buy_sell_tp === '2'" class="buy">{{$t('order.b003')}}<!-- 매수 --></span>
                            <span v-else class="sell">{{$t('order.b004')}}<!-- 매도 --></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="주문가격" align="right">
                        <template slot-scope="scope">
                            <span :class="chkLength(priceFormat(scope.row.setl_cur_cd, scope.row.ord_prc))">
                                {{priceFormat(scope.row.setl_cur_cd, scope.row.ord_prc)}} <span class="unit">{{scope.row.setl_cur_cd}}</span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="주문수량" align="right" width="180">
                        <template slot-scope="scope">
                            <span :class="chkLength(coinFormat(scope.row.trgt_cur_cd, scope.row.ord_qty))">
                                {{coinFormat(scope.row.trgt_cur_cd, scope.row.ord_qty)}} <span class="unit">{{scope.row.trgt_cur_cd}}</span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="체결수량" align="right" width="180">
                        <template slot-scope="scope">
                            <div v-if="scope.row.cntr_qty > 0">
                                <span :class="chkLength(coinFormat(scope.row.trgt_cur_cd, scope.row.cntr_qty))">
                                    {{coinFormat(scope.row.trgt_cur_cd, scope.row.cntr_qty)}} <span class="unit">{{scope.row.trgt_cur_cd}}</span>
                                </span>
                            </div>
                            <div v-else>-</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="미체결수량" align="right" width="180">
                        <template slot-scope="scope">
                            <div v-if="scope.row.remn_qty > 0">
                                <span :class="chkLength(coinFormat(scope.row.trgt_cur_cd, scope.row.remn_qty))">
                                    {{coinFormat(scope.row.trgt_cur_cd, scope.row.remn_qty)}} <span class="unit">{{scope.row.trgt_cur_cd}}</span>
                                </span>
                            </div>
                            <div v-else>-</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="취소" align="center" width="70">
                        <template slot-scope="scope">
                            <el-button size="mini" plain @click="cancelConf(scope.$index, scope.row)">{{$t('order.b017')}}<!-- 취소 --></el-button>
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
    import { mapGetters, mapMutations } from 'vuex'

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
        name: 'NotSign',
        data() {
            return {
                sort: '',
                /* 종목 */
                coins: [],
                part: '',
                searchObj: {
                    qry_ord_tp      : 0,
                    qry_cond_tp     : 0,
                    symbol          : '',
                    buy_sell_tp     : '',
                    qry_auto_trd_tp : null,
                    // req_cnt         : 30
                },
                oldSearchObj: {},
                reqSignCancelObj: {     /****** 주문취소요청 ******/
                    org_ord_no: '',         // 원주문번호
                    modi_cncl_tp: '2',      // 정정취소구분 1:정정 2:취소
                    part_all_tp: '2',       // 일부전부구분 1:일부 2:전부
                    ord_qty: '',            // 정정취소수량
                    ord_prc: ''             // 주문가격 (정정시만 지정)
                },
                /* inifinite loading 컴포넌트 초기화 변수 */
                infiniteId: +new Date(),
                notSignAllList: [],
            };
        },
        computed: {
            ...mapGetters({
                tableData: 'notSignList',
                isLogged: 'isLoggedIn',
                getCoinByCd: 'getCoinByCd',
                hogaUnit: 'hogaUnit'
            }),
            socketConnected() {
                return this.$store.getters.isSocketConnected
            },
            /**
             * 검색조건 구분(구분, 매수, 매도) selectBox 데이터 구성
             * 언어팩 적용된 label입력을 위해 computed에 작성
             */
            sorts() {
                return [{
                    sort: '',
                    label: this.$t('order.b002')// '구분'
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
            
        },
        watch: {
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
        mounted() {
            const self = this;
            
            this.$EventBus.$emit('pc-navi', [
                { label: self.$t('header.exchange'), target: 'exchange'},
                { label: self.$t('order.a001'), target: 'signHistory' },
                { label: self.$t('order.b001'), target: null }
            ]);
                
            this.$EventBus.$on('langChange', () => {
                
                self.$EventBus.$emit('pc-navi', [
                    { label: self.$t('header.exchange'), target: 'exchange'},
                    { label: self.$t('order.a001'), target: 'signHistory' },
                    { label: self.$t('order.b001'), target: null }
                ]);
            })

            /**
             * RB03 콜백함수
             * 신규주문시 미체결 데이터 추가
             * 전체 체결시 미체결 데이터 삭제
             * 부분 체결시 미체결 데이터 수정
             */
            var callback = function(resData) {
                
                resData.cntr_qty = resData.tot_cntr_qty

                //----- 미체결 data set START -----//
                if (resData.evnt_tp == '1') { // 주문확인(신규주문)
                    if ((self.oldSearchObj['buy_sell_tp'] != "" && self.oldSearchObj['buy_sell_tp'] != resData['buy_sell_tp'])
                    || (self.oldSearchObj['symbol'] != "" && self.oldSearchObj['symbol'] != resData['symbol'])
                    ) return;

                    self.orderUnshift({listName: 'notSignList', addObj: [resData]})
                    return;
                }

                for (var idx in self.tableData) {
                    var item = self.tableData[idx]

                    if (resData.evnt_tp == '2') { // 주문거부

                        if (parseInt(item.ord_no) == parseInt(resData.ord_no)) { // ord_no = 주문번호

                            self.orderRemove({listName: 'notSignList', idx: idx})
                            return
                        }
                    } else if (resData.evnt_tp == '6') { // 체결
                        
                        if (parseInt(item.ord_no) == parseInt(resData.ord_no)) {
                            
                            if (resData.ord_prc_tp == '1') { // 시장가 주문
                                
                                if (resData.all_cntr_yn == 'Y') { //전체체결 여부
                                    
                                    self.orderRemove({listName: 'notSignList', idx: idx})
                                    return
                                }
                            } else {

                                if (resData.remn_qty <= 0) { //잔여수량 <= 0
                                    
                                    self.orderRemove({listName: 'notSignList', idx: idx})
                                    return;
                                }
                            }

                            self.orderUpdate({listName: 'notSignList', idx: idx, updObj: resData})
                            return;
                        }
                    } else if (resData.evnt_tp == '5') { // 자동취소 '5'이면 주문번호끼리 비교해서 자동삭제 한다.

                        if (parseInt(item.ord_no) == parseInt(resData.ord_no)) {
                            
                            self.orderRemove({listName: 'notSignList', idx: idx})
                            return;
                        }
                    }

                    // 주문번호와 원주문번호를 비교해서 갱신한다.
                    if (parseInt(item.ord_no) == parseInt(resData.org_ord_no)) {
                        
                        if (resData.evnt_tp == '3') { // 정정확인

                            if (Math.abs(parseFloat(item.remn_qty) - parseFloat(resData.cnfm_qty)) < NumberUtil.EPSILON || item.remn_qty <= 0) {

                                self.orderRemove({listName: 'notSignList', idx: idx})
                            } else {
                                
                                self.orderUpdate({listName: 'notSignList', idx: idx, updObj: resData})
                            }

                            if (parseFloat (resData.ord_qty) > 0) {
                                
                                if ((self.oldSearchObj['buy_sell_tp'] != "" && self.oldSearchObj['buy_sell_tp'] != resData['buy_sell_tp'])
                                || (self.oldSearchObj['symbol'] != "" && self.oldSearchObj['symbol'] != resData['symbol'])
                                ) return;

                                self.orderUnshift({listName: 'notSignList', addObj: [resData]})
                            }
                            return;
                        } else {

                            if (parseFloat(item.remn_qty) <= parseFloat(resData.cnfm_qty)) {
                                
                                self.orderRemove({listName: 'notSignList', idx: idx})
                                return;
                            }

                            self.orderUpdate({listName: 'notSignList', idx: idx, updObj: resData})
                            return;
                        }
                    }
                }

                // 정정시 체결이 먼저 일어났을 때
                if (resData.evnt_tp == '3' && parseFloat(resData.ord_qty) > 0) {
                    
                    self.orderUnshift({listName: 'notSignList', addObj: [resData]})
                }
                //----- 미체결 data set END -----//
            }

            if (self.$store.getters.isSocketConnected) {
                self.setCoins();

                /**
                 * 실시간 데이터 RB03 TR요청
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
                     * 실시간 데이터 RB03 TR요청
                     */
                    this.$store.dispatch('orderNotification', {
                        vue_name : self.$options.name,
                        callback : callback
                    });
                    self.tableSearch();
                })
            }
        },
        methods: {
            ...mapMutations(['setContiKey', 'orderUnshift', 'orderRemove', 'orderUpdate']),
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
             * 전체 주문 취소 요청
             * 전체 주문 취소 TR은 별도로 존재하지 않아 화면에 보여지는 모든 미체결 List를 취소요청 처리함.
             *   > 화면에 보여지는 미체결List를 전부 취소요청 한 후 아직 조회되지 않은 데이터가 남아있을 경우
             *     cancelAllOk 메서드에서 미체결 List 재조회 처리. (김민희 사원 확인사항)
             * @vuex {actions} : reqSignAllCancel에서 tr102호출
             */
            cancelAllConf() {
                if (this.tableData.length == '0') {

                    // '취소 가능한 미체결 주문이 없습니다.'
                    this.errComplete(this.$t('order.b030'));
                    return;
                }
                
                //b018-1 : '전체 주문 취소'
                //b018-2 : '화면에 표시된 주문을 모두 취소하시려면 [전체취소] 버튼을 눌러주세요.'
                this.$confirm(this.$t('order.b018-2'), this.$t('order.b018-1'), {
                    distinguishCancelAndClose: true,
                    confirmButtonText: this.$t('order.b020'),// '전체 취소',
                    cancelButtonText: this.$t('order.b019')// '닫기'
                }).then(() => {
                    const self = this;

                    self.$store.dispatch('reqSignAllCancel', self.tableData).then((obj) => {

                        if (obj.failObjArr.length > 0) {
                            
                            for (var i in obj.failObjArr) {
                                
                                if (obj.failObjArr[i]['errorData']['errCode'] != '31048') {

                                    // 취소중 오류가 발생했습니다.
                                    self.errComplete(self.$t('order.b026'), true);
                                    return;
                                }
                            }
                        }
                        
                        if (obj.successArr.length > 0 ) {

                            self.cancelAllOk(obj.successArr.length, true);
                            return;
                        }
                        
                        if (obj.failObjArr.length > 0) {
                            
                            for (var i in obj.failObjArr) {
                                
                                if (obj.failObjArr[i]['errorData']['errCode'] == '31048') {

                                    // '체결이 완료되었거나 이미 취소된 주문입니다.'
                                    self.errComplete(self.$t('order.b025'), true);
                                    return;
                                }
                            }
                        }

                    })
                }).catch(action => {});
            },
            /**
             * 1건 주문 취소 요청
             * @vuex {actions} : reqSignCancel에서 tr102호출
             */
            cancelConf(index, row) {
                // b021-1 : '주문 취소'
                // b021-2 : '선택한 주문을 취소하시려면 [주문취소] 버튼을 눌러주세요.'
                this.$confirm(this.$t('order.b021-2'), this.$t('order.b021-1'), {
                    distinguishCancelAndClose: true,
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: this.$t('order.b022'), // '주문 취소',
                    cancelButtonText: this.$t('order.b019') // '닫기'
                })
                .then(() => {

                    this.reqSignCancelObj['org_ord_no'] = row.ord_no;
                    this.reqSignCancelObj['ord_qty'] = row.remn_qty;

                    const self = this;
                    var successFn = function(res) {

                        self.cancelOk(row);
                    }

                    var failFn = function(res) {
                        if (res.errCode == '19999') {
                            
                            //self.errComplete("아이디 정보가 일치하지 않습니다. 로그인 정보를 확인해 주세요.");
                            self.errComplete(self.$t('sys_err.19999'));
                        } else if (res.errCode == '31048') {

                            // '체결이 완료되었거나 이미 취소된 주문입니다.'
                            self.errComplete(self.$t('order.b025'), true);
                        } else {
                            // '취소중 오류가 발생했습니다.'
                            self.errComplete(self.$t('order.b026'), true);
                        }
                    } 

                    this.$store.dispatch('reqSignCancel', this.reqSignCancelObj).then(successFn).catch(failFn);
                })
                .catch(action => {});
            },
            /**
             * 1건 주문 취소 성공시 팝업 노출
             */
            cancelOk(row) {
                const self = this;
                // b023-1 : '주문 취소 접수'
                // b023-2 : '주문 취소가 신청되었습니다. 취소주문은 주문내역에서 확인 가능합니다.'
                this.$alert(this.$t('order.b023-2'), this.$t('order.b023-1'), {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: this.$t('order.b024'), // 확인
                    callback: action => {
                        self.compNoti(row, 'one');
                    }
                });
            },
            /**
             * 전체 주문 취소 성공시 팝업 노출
             */
            cancelAllOk(successLength, fatchTableSearch) {
                const self = this;
                // b023-1 : '주문 취소 접수'
                // b023-2 : '주문 취소가 신청되었습니다. 취소주문은 주문내역에서 확인 가능합니다.'
                this.$alert(this.$t('order.b023-2'), this.$t('order.b023-1'), {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: this.$t('order.b024'), // 확인
                    callback: action => {
                        self.compNoti(successLength, 'all')
                        if(fatchTableSearch) self.tableSearch(true)
                    }
                });
            },
            /**
             * 주문 취소 에러(체결완료 or 취소된 주문) 팝업 노출
             */
            errComplete(text, fatchTableSearch) {
                this.$alert(text, null, {
                    confirmButtonText: this.$t('order.b024'), // 확인
                    callback: action => {
                        if(fatchTableSearch) self.tableSearch(true)
                    }
                });
            },
            /**
             * 주문 취소 토스트 알림
             * duration: 2000 > 2초 후 자동 소멸
             */
            compNoti(row, gubun) {
                var message = '';

                if (gubun == 'all') {
                    message = '<h1 class="noti-title">' + this.$t('order.b028-1') /* '전체 주문 취소' */ + '</h1>'
                    message += this.$t('order.b028-2') + row + this.$t('order.b028-3')
                } else {
                    message = '<h1 class="noti-title">' + this.$t('order.b027-1') /* '주문취소' */ + '</h1>'
                    message += row.trgt_cur_cd + '/' + row.setl_cur_cd + ' ' + String(row.remn_qty) + this.$t('order.b027-2') /* ' 취소' */
                }
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    title: '',
                    message: message,
                    offset: 44,
                    duration: 2000
                });
            },
            /**
             * 미체결 데이터 조회
             * @param {boolean} searchOldParam
             *   > true일 경우 : 전체주문취소 버튼으로 주문취소한 후 화면에 보여지는 미체결 데이터 외에 데이터가 더 있을 경우
             *     가장 마지막으로 조회요청한 검색조건으로 미체결 데이터 재조회
             */
            tableSearch(searchOldParam) {
                let self = this;
                var param = {};

                if (searchOldParam) {

                    param = this.oldSearchObj;
                    param['contiFalg'] = true;
                } else {

                    this.searchObj['buy_sell_tp'] = this.sort;
                    const coinObj = this.coins.find(c => c.value === this.part);
                    this.searchObj['symbol'] = coinObj ? coinObj.coin : '';
                    param = this.searchObj;
                    param['contiFlag'] = false;

                    /* 검색조건 임시저장( infiniteHandler(scroll-event)에서 사용 + 실시간 데이터 변경으로 재조회시 사용 ) */
                    Object.assign(this.oldSearchObj, this.searchObj);
                }

                this.$store.dispatch('searchNotSignList', param)
                .then((obj) => {
                    
                    self.infiniteId = +new Date();
                });
            },
            /**
             * 스크롤 이벤트
             * 테이블의 스크롤이 가장 하단에 도달하는 시점에 실행
             * 미체결 데이터 추가 조회
             */
            infiniteHandler($state) {

                if (!this.$store.state.exchange.contiKey) {
                    $state.reset()
                    return;
                }
                
                this.oldSearchObj['contiFlag'] = true;

                /* data Serach */
                this.$store.dispatch('searchNotSignList', this.oldSearchObj)
                .then((obj) => {
                    
                    obj.getContiKey() == null ? $state.complete() : $state.loaded();
                });
            },
            /* 글자 size 조절 */
            chkLength(val) {
                if(val == undefined) return;
                if (val.length > 15) {
                    return 'fs15';
                }
            },
            /** 주문수량,체결수량,미체결수량
             * 소수점, 콤마 포멧 
            */
            coinFormat(cd, number) {
                if(cd == '' || cd == null || cd == undefined || this.getCoinByCd(cd) == undefined) return;

                let self = this;
                let dec_digt = self.getCoinByCd(cd).dec_digt
                return UnitManager.fixedDecimalWithCommas(number, dec_digt? dec_digt : 8)
            },
            /** 주문가격
             * 소수점, 콤마 포멧 
            */
            priceFormat(cd, prc) {
                if(cd == '' || cd == null || cd == undefined || this.hogaUnit == undefined) return;
                
                let self = this;
                var nLenBelowDigitArray = [1];
                UnitManager.getHogaUnit(self.hogaUnit, cd, prc, undefined, undefined, nLenBelowDigitArray);
                return UnitManager.fixedDecimalWithCommas(prc, nLenBelowDigitArray[0])
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