<template>
    <div class="WatchHistory">
        <div class="search">
            <el-row>
                <el-col class="srch-tab">
                    <el-radio-group v-model="watch" @change="changeStat">
                        <el-radio :label="1">{{$t('order.d002')}}<!-- 감시중 --></el-radio>
                        <el-radio :label="98">{{$t('order.d003')}}<!-- 감시완료 --></el-radio>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row>
                <el-col class="srch-label">{{$t('order.d004')}}<!-- 종목 -->:</el-col>
                <el-col class="srch-sort">
                    <el-autocomplete v-model="part" :fetch-suggestions="querySearch" :placeholder="$t('order.d005')"></el-autocomplete><!-- 암호화폐 -->
                </el-col>
                <el-col class="srch-btn">
                    <el-button type="primary" @click="tableSearch(false)">{{$t('order.c007')}}<!-- 조회 --></el-button>
                </el-col>
                <el-col class="srch-info">
                    <el-popover placement="bottom-end" width="400" trigger="hover" class="question">
                        <div class="info">
                            <h2>{{$t('order.e014-0')}}<!-- 상태 --></h2>
                            <p>
                                - {{$t('order.e014-1')}}<!-- 감시중: 감시 진행중인 조건 --><br>
                                - {{$t('order.e014-2')}}<!-- 주문접수: 감시조건이 만족되어 감시 완료된 조건 --><br>
                                - {{$t('order.e014-3')}}<!-- 취소: 사용자가 직접 취소한 감시조건 --><br>
                                - {{$t('order.e014-4')}}<!-- 유효기간 만료: 30일의 유효기간이 만료된 조건 --><br>
                                - {{$t('order.e014-5')}}<!-- 주문거부: 시스템 거부, 에러를 사유로 주문이 거부된 조건 -->
                            </p>
                            <h2>{{$t('order.e014-7')}}<!-- 유의사항 --></h2>
                            <p>{{$t('order.e014-8')}}<!-- 감시조건의 유효기간은 최대 720시간(30일)입니다. 30일이 지난 후에는 조건이 강제 취소되니 유의 바랍니다. --></p>
                        </div>
                        <el-button type="text" slot="reference"><i class="el-icon-question"></i></el-button>
                    </el-popover>
                </el-col>
            </el-row>
        </div>
        <div class="watch-list">
            <div class="el-table">
                <div class="el-table__header-wrapper">
                    <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
                        <colgroup>
                            <col width="90">
                            <col width="90">
                            <col width="90">
                            <col width="50">
                            <col width="100">
                            <col>
                            <col width="160">
                            <col width="160">
                            <col width="160">
                            <col width="80">
                        </colgroup>
                        <thead>
                            <tr>
                                <th><div class="cell">{{$t('order.e004')}}<!-- 감시 # --></div></th>
                                <th><div class="cell">{{$t('order.e005')}}<!-- 일시 --></div></th>
                                <th><div class="cell">{{$t('order.e006')}}<!-- 종목 --></div></th>
                                <th><div class="cell">{{$t('order.e007')}}<!-- 구분 --></div></th>
                                <th><div class="cell">{{$t('order.e008')}}<!-- 방식 --></div></th>
                                <th><div class="cell">{{$t('order.e009')}}<!-- 조건 --></div></th>
                                <th><div class="cell">{{$t('order.e010')}}<!-- 주문금액 --></div></th>
                                <th><div class="cell">{{$t('order.e011')}}<!-- 주문가격 --></div></th>
                                <th><div class="cell">{{$t('order.e012')}}<!-- 주문수량 --></div></th>
                                <th><div class="cell">{{(watch === 1) ? ' ' : $t('order.e013-1')}}</div></th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <el-scrollbar wrap-class="scrollbar-wrapper" :native="false" :class="makeScroll">
                <el-table :data="(watch === 1) ? tableDataWatching : tableDataWatched" :empty-text="$t('order.e015')" stripe :show-header="false">
                    <infinite-loading :identifier="infiniteId" slot="append" @infinite="infiniteHandler" force-use-infinite-wrapper=".scrollbar-wrapper">
                    </infinite-loading>
                    <el-table-column prop="sq" label="감시 #" align="right" width="90"></el-table-column>
                    <el-table-column label="일시" align="center" width="90">
                        <template slot-scope="scope">
                            <el-popover v-if="(watch === 1)" placement="right" trigger="click" width="200">
                                <el-row class="info">
                                    <el-col :span="12">
                                        <h2>{{$t('order.d024')}}</h2>   <!-- 감시 시작일 -->
                                        {{scope.row.cndt_est_dy_tm.replace(/\./g,"-")}}
                                    </el-col>
                                    <el-col :span="12">
                                        <h2>{{$t('order.d025')}}</h2>   <!-- 감시 종료일 -->
                                        {{scope.row.end_dt.replace(/\./g,"-")}}
                                    </el-col>
                                </el-row>
                                <el-button type="text" slot="reference">D-{{scope.row.end_dt | Dday}}</el-button>
                            </el-popover>
                            <span v-else>{{scope.row.st_upt_dy_tm.replace(/\./g,"-")}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="symbol_abbr" label="종목" align="center" width="90"></el-table-column>
                    <el-table-column label="구분" align="center" width="50">
                        <template slot-scope="scope">
                            <span v-if="scope.row.trd_ccd === '2'" class="buy">{{$t('order.b003')}}<!-- 매수 --></span>
                            <span v-else class="sell">{{$t('order.b004')}}<!-- 매도 --></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="방식" align="center" width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.md_cd === '1'">{{$t('order.e016')}}<!-- 스탑 시장가 --></span>
                            <span v-else-if="scope.row.md_cd === '2'">{{$t('order.e017')}}<!-- 스탑 지정가 --></span>
                            <span v-else-if="scope.row.md_cd === '3'">{{$t('order.e018')}}<!-- 트레일링 스탑 --></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="조건">
                        <template slot-scope="scope">
                            <span v-if="scope.row.md_cd === '1' || scope.row.md_cd === '2'">
                                {{$t('order.e019')}}<!-- 스탑 가격 --><br>
                                <span :class="chkLength(priceFormat(scope.row.paycurrcode, scope.row.stop_prc))">
                                    {{priceFormat(scope.row.paycurrcode, scope.row.stop_prc)}} <span class="unit">{{scope.row.paycurrcode}}</span>
                                </span>
                            </span>
                            <span v-if="scope.row.md_cd === '3' && scope.row.trd_ccd === '2'">
                                {{$t('order.e020')}}<!-- 최저가대비상승폭 --><br>
                                <span :class="chkLength(priceFormat(scope.row.paycurrcode, scope.row.distance))">
                                    {{priceFormat(scope.row.paycurrcode, scope.row.distance)}} <span class="unit">{{scope.row.paycurrcode}}</span>
                                </span>
                            </span>
                            <span v-if="scope.row.md_cd === '3' && scope.row.trd_ccd === '1'">
                               {{$t('order.e021')}}<!--  최고가대비하락폭 --><br>
                                <span :class="chkLength(priceFormat(scope.row.paycurrcode, scope.row.distance))">
                                    {{priceFormat(scope.row.paycurrcode, scope.row.distance)}} <span class="unit">{{scope.row.paycurrcode}}</span>
                                </span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column  :label="$t('order.e010')" align="right" width="160"><!-- 주문금액 -->
                        <template slot-scope="scope">
                            <div v-if="scope.row.ordr_amt > 0" :class="chkLength(priceFormat(scope.row.paycurrcode, scope.row.ordr_amt))">{{priceFormat(scope.row.paycurrcode, scope.row.ordr_amt)}} <span class="unit">{{scope.row.paycurrcode}}</span></div>
                            <div v-else>-</div>
                        </template>
                    </el-table-column>
                    <el-table-column  :label="$t('order.e011')" align="right" width="160"><!-- 주문가격 -->
                        <template slot-scope="scope">
                            <div v-if="scope.row.ordr_typ_cd == '2'" :class="chkLength(priceFormat(scope.row.paycurrcode, scope.row.ordr_prc))">{{priceFormat(scope.row.paycurrcode, scope.row.ordr_prc)}} <span class="unit">{{scope.row.paycurrcode}}</span></div>
                            <div v-else-if="scope.row.ordr_typ_cd == '1'">{{$t('order.e022')}}<!-- 시장가 --></div>
                        </template>
                    </el-table-column>
                    <el-table-column  :label="$t('order.e012')" align="right" width="160"><!-- 주문수량 -->
                        <template slot-scope="scope">
                            <div v-if="scope.row.ordr_q > 0" :class="chkLength(coinFormat(scope.row.tradcurrcode, scope.row.ordr_q))">{{coinFormat(scope.row.tradcurrcode, scope.row.ordr_q)}} <span class="unit">{{scope.row.tradcurrcode}}</span></div>
                            <div v-else>-</div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="(watch === 1) ? $t('order.d016') : $t('order.e013-1')" align="center" width="80"><!--  취소 : 상태  -->
                        <template slot-scope="scope">
                            <el-button v-if="watch === 1" size="mini" plain @click="orderCancelClicked(scope.$index, scope.row)">{{$t('order.d016')}}<!-- 취소 --></el-button>
                            <div v-else>
                                <el-popover v-if="watchedStatus(scope.row.hndl_st_vl, scope.row.ordr_hndl_ccd) === $t('order.e013-2')" placement="left" trigger="hover"><!-- 주문접수 -->
                                    <div class="rejectInfo">{{$t('order.b008')}}<!-- 주문 # -->: {{scope.row.ordr_no}}</div>
                                    <span class="btn_state register" type="text" slot="reference">{{$t('order.e023')}}<!-- 주문접수 --></span>
                                </el-popover>
                                <el-popover v-else-if="watchedStatus(scope.row.hndl_st_vl, scope.row.ordr_hndl_ccd) === $t('order.e013-3')" placement="left" trigger="hover"><!-- 주문거부 -->
                                    <div class="rejectInfo">{{$t('sys_err.'+scope.row.rfsl_cd)}}</div><!-- scope.row.rfsl_msg -->
                                    <span class="btn_state refusal" type="text" slot="reference">{{$t('order.c029')}}<!-- 주문거부 --></span>
                                </el-popover>
                                <span class="btn_state" v-else>{{watchedStatus(scope.row.hndl_st_vl, scope.row.ordr_hndl_ccd)}}</span>
                            </div>
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
import { mapState, mapGetters, mapMutations } from 'vuex'

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
    name: 'WatchHistory',
    data() {
        return {
            /* 감시중/감시완료 */
            watch: 1,
            /* 종목 */
            coins: [],
            part: '',
            searchObj: {            /****** 검색조건 ******/
                mbr_ccd: '01',          // 사용자구분 (00:직원 01:고객)
                hndl_st_vl: '',         // 조건상태 (0:감시해제 1:감시중 2:미체결감시중 3:조건만족 4:유효기간만료 98:전체조회(감시중제외) 99:전체(감시중 포함))
                symbol: '',             // 처리상태 (space:전체 0:감시해제 1:감시중 2:미체결감시중 3:조건)
            },
            oldSearchObj: {},
            /* inifinite loading 컴포넌트 초기화 변수 */
            infiniteId: +new Date(),
            reqWatchCancelObj: {    /****** 감시취소요청 ******/
                est_dt: '',             // 설정일자
                symbol: '',             // 단축코드
                sq: '',                 // 조건일련번호
                mbr_ccd: '01',          // 사용자구분
                md_cd: '',              // 매체구분
                trd_ccd: ''             // 1.매수 2.매도
            }
        };
    },
    created() {

    },
    mounted() {
        let self = this

        this.$EventBus.$emit('pc-navi', [
            { label: self.$t('header.exchange'), target: 'exchange'},
            { label: self.$t('order.a001'), target: 'signHistory' },
            { label: self.$t('order.d001'), target: null }
        ]);
            
        this.$EventBus.$on('langChange', () => {
            
            self.$EventBus.$emit('pc-navi', [
                { label: self.$t('header.exchange'), target: 'exchange'},
                { label: self.$t('order.a001'), target: 'signHistory' },
                { label: self.$t('order.d001'), target: null }
            ]);
        })
        /**
         * RB03콜백 함수
         * 주문 체결시 데이터 재조회
         */
        var callback = function(resData) {
            
            if (self.oldSearchObj['symbol'] != "" && self.oldSearchObj['symbol'] != resData['symbol']) return;
            if (resData.evnt_tp != '1' && resData.evnt_tp != '6') return; //재조회 기준 조건 추가 (1주문확인,6체결)

            self.tableSearch(true);
        }
        
        if (self.$store.getters.isSocketConnected) {
            self.setCoins();
            
            /**
             * RB03 TR요청
             */
            self.$store.dispatch('orderNotification', {
                vue_name : self.$options.name,
                callback : callback
            });
            self.tableSearch(false);
        } else {

            self.$EventBus.$on('socketConnected', () => {
                self.setCoins();
                
                /**
                 * RB03 TR요청
                 */
                self.$store.dispatch('orderNotification', {
                    vue_name : self.$options.name,
                    callback : callback
                });
                self.tableSearch(false);
            })
        }
    },
    watch: {

    },
    computed: {
        ...mapState({
            currentSymbol : state => state.data.currentSymbol,
        }),
        ...mapGetters({
            tableDataWatching   : 'watchingList',
            tableDataWatched    : 'watchedList',
            isLogged            : 'isLoggedIn',
            getCoinByCd         : 'getCoinByCd',
            hogaUnit            : 'hogaUnit'
        }),
        socketConnected() {
            return this.$store.getters.isSocketConnected
        },
        /**
         * 스크롤바 생성여부 클래스명 반환
         */
        makeScroll() {
            let self = this;
            if (self.watch === 1) {
                return self.tableDataWatching.length > 15 ? 'is-scroll' : '';
            } else {
                return self.tableDataWatched.length > 15 ? 'is-scroll' : '';
            }
        }
    },
    methods: {
        ...mapMutations(['setContiKey']),
        /**
         * querySearch, createFilter
         * 암호화폐 검색시 입력중인 값에 해당하는 List를 검색input창 하단에 노출하기 위한 메서드
         */
        querySearch(queryString, cb) {
            var coins = this.coins;
            var results = queryString ? coins.filter(this.createFilter(queryString)) : coins;
            // call callback function to return suggestions
            cb(results);
        },
        createFilter(queryString) {
            return (link) => {
                return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
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
        },
        /**
         * 감시중, 감시완료 radio btn change 이벤트
         * 선택한 값에 해당하는 데이터 재조회
         */
        changeStat() {
            var now = this.watch;
            this.part = '';
            if (now == 1) {
                this.watch === 98;
                this.$store.commit('setWatchingList', []);
            } else {
                this.watch === 1;
                this.$store.commit('setWatchedList', []);
            }

            this.tableSearch(false);
        },
        /**
         * 감시 취소 요청
         * @vuex {actions} reqWatchCancel -s0021(매수취소), s0003(매도취소) 전문호출
         */
        orderCancelClicked(index, row) {
            this.reqWatchCancelObj['est_dt']        = row.est_dt;
            this.reqWatchCancelObj['symbol_tmp']    = row.symbol;
            this.reqWatchCancelObj['sq']            = row.sq;
            this.reqWatchCancelObj['trd_ccd']       = row.trd_ccd;

            const self = this;
            // order.d017-1 : 감시조건 취소
            // order.d017-2 : 선택한 조건을 취소하려면 [감시취소] 버튼을 눌러주세요.
            this.$confirm(this.$t('order.d017-2'), this.$t('order.d017-1'), {
                distinguishCancelAndClose: true,
                dangerouslyUseHTMLString: true,
                cancelButtonText: this.$t('order.d018'), // '닫기'
                confirmButtonText: this.$t('order.d019') // '감시 취소',
            })
            .then(() => {
                self.orderCancelDialogVisible = false;

                var successFn = function(res) {

                    self.cancelOk();
                }

                var failFn = function(res) {

                    self.errComplete();
                }
                
                this.$store.dispatch('reqWatchCancel', self.reqWatchCancelObj).then(successFn).catch(failFn);
            })
            .catch(action => {});
        },
        /**
         * 감시취소 완료 후 성공 팝업 노출
         */
        cancelOk() {
            // order.d020-1 : 감시 취소 완료
            // order.d020-2 : 감시조건이 취소되었습니다. 취소내역은 감시완료에서 확인 가능합니다.
            this.$alert(this.$t('order.d020-2'), this.$t('order.d020-1'), {
                confirmButtonText: this.$t('order.d021'), // 확인
                dangerouslyUseHTMLString: true,
                callback: action => {
                    
                }
            });
        },
        /**
         * 감시취소 실패 또는 취소될 경우 에러 팝업 노출
         */
        errComplete() {
            this.$alert(this.$t('order.d022'), '', { //'감시가 완료되었거나 이미 취소된 주문입니다.'
                confirmButtonText: this.$t('order.d021'), //확인
                callback: action => {
                    
                }
            });
        },
        /**
         * 감시 상태값 텍스트 반환
         */
        watchedStatus(hndl_st_vl, ordr_hndl_ccd) {

            var res = '';

            if (hndl_st_vl === '2') {           // 2:Expired 
                
                res = this.$t('order.e013-4')// '유효기간만료'
            } else if (hndl_st_vl === '3') {    // 3:Completed 
                
                res = ordr_hndl_ccd === '1' ? this.$t('order.e013-2')// '주문접수'
                    : ordr_hndl_ccd === '2' ? this.$t('order.e013-3')// '주문거부'
                    : ordr_hndl_ccd === '3' ? this.$t('order.e013-2')// '주문접수'
                    : ordr_hndl_ccd === '4' ? this.$t('order.e013-3')// '주문거부'
                    : ordr_hndl_ccd === '5' ? this.$t('order.e013-2')// '주문접수'
                    : ordr_hndl_ccd === '6' ? this.$t('order.e013-3')// '주문거부'
                    : ordr_hndl_ccd === '7' ? this.$t('order.e013-2')// '주문접수'
                    : ordr_hndl_ccd === '8' ? this.$t('order.e013-2')// '주문접수'
                    : this.$t('order.e013-2')// '주문접수'
            } else if (hndl_st_vl === '4') {    // 4:Canceled
                
                res = this.$t('order.e013-5')// '취소';
            }

            return res;
        },
        /**
         * 감시중 또는 감시완료 데이터 조회
         * @vuex {actions} : searchWatchList - s0055 요청
         *   > param.hndl_st_vl : 1(감시중) or 98(감시완료)
         */
        tableSearch(searchOldParam) {
            let self = this;
            /* 검색조건 유효성 체크 */
            var param = {
                contiFlag: false
            };

            /* 검색조건 set */
            if (searchOldParam) { // 마지막으로 검색한 검색조건으로 param set
                
                param = this.oldSearchObj;
            } else {

                this.searchObj['hndl_st_vl'] = this.watch;
                const coinObj = this.coins.find(c => c.value === this.part);
                this.searchObj['symbol'] = coinObj ? coinObj.coin : '';
                param = this.searchObj;

                /* 검색조건 임시저장( infiniteHandler(scroll-event)에서 사용 + 실시간 데이터 변경으로 재조회시 사용 ) */
                Object.assign(this.oldSearchObj, this.searchObj);
            }

            /* data Serach */
            this.$store.dispatch('searchWatchList', param)
            .then((obj) => {
                
                self.infiniteId = +new Date();
            });
        },
        /**
         * 스크롤 이벤트
         * 테이블의 스크롤이 가장 하단에 도달하는 시점에 실행
         * 감시중 or 감시완료 데이터 추가 조회
         */
        infiniteHandler($state) {

            if (!this.$store.state.exchange.contiKey) {
                $state.reset()
                return;
            };
                
            this.oldSearchObj['contiFlag'] = true;

            /* data Serach */
            this.$store.dispatch('searchWatchList', this.oldSearchObj)
            .then((obj) => {
                
                obj.getContiKey() == null ? $state.complete() : $state.loaded();
            });
        },
        /* 글자 size 조절 */
        chkLength(val) {
            if(val == undefined) return;
            
            if (val.length > 13) {
                return 'fs15';
            }
        },
        /** 주문수량
         * 소수점, 콤마 포멧 
        */
        coinFormat(cd, number) {
            if(cd == '' || cd == null || cd == undefined || this.getCoinByCd(cd) == undefined) return;

            let self = this;
            let dec_digt = self.getCoinByCd(cd).dec_digt
            return UnitManager.fixedDecimalWithCommas(number, dec_digt? dec_digt : 8)
        },
        /** 스탑가격, 최고저가대비상승폭, 최저가대비상승폭, 주문금액, 주문가격
         * 소수점, 콤마 포멧 
        */
        priceFormat(cd, prc) {
            if(cd == '' || cd == null || cd == undefined || this.hogaUnit == undefined) return;

            let self = this;
            var nLenBelowDigitArray = [1];
            UnitManager.getHogaUnit(self.hogaUnit, cd, prc, undefined, undefined, nLenBelowDigitArray);
            return UnitManager.fixedDecimalWithCommas(prc, nLenBelowDigitArray[0])
        }
    },
    filters: {
        /**
         * 일시 데이터 D-day포멧으로 변경하여 반환
         */
        Dday(end_dt) {
            end_dt = end_dt.replace(/\./g,"/")
            const today = new Date();
            const endDay = new Date(end_dt);
            
            return Math.floor( (endDay.getTime() - today.getTime()) / (1000*60*60*24) ) + 1;
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