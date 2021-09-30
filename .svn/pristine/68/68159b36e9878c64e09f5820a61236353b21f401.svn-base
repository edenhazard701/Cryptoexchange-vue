<template>
    <div class="OrderHistory">
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
                <el-col class="srch-label">{{$t('order.a010')}}<!-- 종목 -->:</el-col>
                <el-col class="srch-sort-180">
                    <el-autocomplete v-model="part" :fetch-suggestions="querySearch" :placeholder="$t('order.a007')"></el-autocomplete><!-- 암호화폐 -->
                </el-col>
                <el-col class="srch-btn">
                    <el-button type="primary" @click="tableSearch(false)">{{$t('order.a008')}}<!-- 조회 --></el-button>
                </el-col>
                <el-col class="srch-state">
                    <el-select v-model="stat" placeholder="상태" class="select_stat">
                        <el-option v-for="item in stats" :key="item.stat" :label="item.label" :value="item.stat"></el-option>
                    </el-select>
                </el-col>
                <el-col class="srch-info">
                    <el-popover placement="bottom-end" width="400" trigger="hover" class="question">
                        <div class="info">
                            <h2>{{$t('order.c030')}}<!-- 주문내역 상태 --></h2>
                            <p>
                                {{$t('order.c031')}}<!-- 주문의 최종 상태를 표시합니다. --><br>
                                - {{$t('order.c032')}}<!-- 접수: 접수된 주문(일부 체결되었거나 체결내역이 없는 경우) --><br>
                                - {{$t('order.c033')}}<!-- 완료: 접수 후 전량 체결되어 완료된 주문 --><br>
                                - {{$t('order.c034')}}<!-- 취소: 취소된 내역이 있는 주문 --><br>
                                - {{$t('order.c035')}}<!-- 거부: 매칭에서 거부된 주문 --><br>
                            </p>
                            <p>{{$t('order.c036')}}<!-- * 주문 접수 후 30일(720시간)이 되는 시점에 미체결주문이 강제 취소됩니다. --></p>
                            <h2>{{$t('order.c037')}}<!-- 상세내역 --></h2>
                            <p>{{$t('order.c038')}}<!-- 상태영역 클릭 시, 주문별 상세내역이 표시됩니다. --></p>
                        </div>
                        <el-button type="text" slot="reference"><i class="el-icon-question"></i></el-button>
                    </el-popover>
                </el-col>
            </el-row>
        </div>
        <div class="order-list">
            <div class="el-table">
                <div class="el-table__header-wraper">
                    <table border="0" cellspacing="0" cellpadding="0" class="el-table__header">
                        <colgroup>
                            <col width="90">
                            <col width="90">
                            <col width="90">
                            <col width="55">
                            <col>
                            <col width="180">
                            <col width="180">
                            <col width="180">
                            <col width="80">
                        </colgroup>
                        <thead>
                            <tr>
                                <th><div class="cell">{{$t('order.c009')}}<!-- 주문 # --></div></th>
                                <th><div class="cell">{{$t('order.c010')}}<!-- 일시 --></div></th>
                                <th><div class="cell">{{$t('order.c011')}}<!-- 종목 --></div></th>
                                <th><div class="cell">{{$t('order.c012')}}<!-- 구분 --></div></th>
                                <th><div class="cell">{{$t('order.c013')}}<!-- 주문금액 --></div></th>
                                <th><div class="cell">{{$t('order.c014')}}<!-- 주문가격 --></div></th>
                                <th><div class="cell">{{$t('order.c015')}}<!-- 주문수량 --></div></th>
                                <th><div class="cell">{{$t('order.c016')}}<!-- 체결수량 --></div></th>
                                <th><div class="cell">{{$t('order.c017')}}<!-- 상태 --></div></th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <el-scrollbar wrap-class="scrollbar-wrapper" :native="false" :class="{'is-scroll': tableData.length > 15}">
                <el-table :empty-text="$t('order.c028')" :row-class-name="tableRowClass" :data="tableData" stripe :show-header="false"> <!-- 주문내역이 없습니다. -->
                    <infinite-loading :identifier="infiniteId_Main" slot="append" @infinite="infiniteHandler" force-use-infinite-wrapper=".scrollbar-wrapper">
                    </infinite-loading>
                    <el-table-column prop="ord_no" label="주문 #" align="right" width="90"></el-table-column>
                    <el-table-column label="일시" align="center" width="90">
                        <template slot-scope="scope">
                            {{scope.row.ord_dtm | dateFormat}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="trd_cur_cd" label="종목" align="center" width="90"></el-table-column>
                    <el-table-column label="구분" align="center" width="55">
                        <template slot-scope="scope">
                            <span v-if="scope.row.buy_sell_tp === '2'" class="buy">{{$t('order.b003')}}<!-- 매수 --></span>
                            <span v-else class="sell">{{$t('order.b004')}}<!-- 매도 --></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="주문금액" align="right">
                        <template slot-scope="scope">
                            <span v-if="scope.row.ord_prc_tp == '1' && scope.row.buy_sell_tp != '2'">-</span>
                            <span v-else :class="chkLength(priceFormat(scope.row.setl_cur_cd, scope.row.ord_amt))">{{priceFormat(scope.row.setl_cur_cd, scope.row.ord_amt)}} <span class="unit">{{scope.row.setl_cur_cd}}</span></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="주문가격" align="right" width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.ord_prc_tp == '1'">{{$t('order.e022')}}<!-- 시장가 --></span>
                            <span v-else-if="scope.row.ord_prc > 0" :class="chkLength(priceFormat(scope.row.setl_cur_cd, scope.row.ord_prc))">{{priceFormat(scope.row.setl_cur_cd, scope.row.ord_prc)}} <span class="unit">{{scope.row.setl_cur_cd}}</span></span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="주문수량" align="right" width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.ord_prc_tp == '1' && scope.row.buy_sell_tp == '2'">-</span>
                            <span v-else :class="chkLength(coinFormat(scope.row.trgt_cur_cd, scope.row.ord_qty))">{{coinFormat(scope.row.trgt_cur_cd, scope.row.ord_qty)}} <span class="unit">{{scope.row.trgt_cur_cd}}</span></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="체결수량" align="right" width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.cntr_qty > 0" :class="chkLength(coinFormat(scope.row.trgt_cur_cd, scope.row.cntr_qty))">{{coinFormat(scope.row.trgt_cur_cd, scope.row.cntr_qty)}} <span class="unit">{{scope.row.trgt_cur_cd}}</span></span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="상태" align="center" width="80">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.ord_comp_stat === '1'" :class="{'ready': scope.row.ord_comp_stat === '1'}" @click.native.prevent="viewReceive(scope.$index, scope.row)">{{$t('order.c039')}}<!-- 접수 --></el-button>
                            <el-button v-else-if="scope.row.ord_comp_stat === '2'" :class="{'complete': scope.row.ord_comp_stat === '2'}" @click.native.prevent="viewReceive(scope.$index, scope.row)">{{$t('order.c040')}}<!-- 완료 --></el-button>
                            <el-button v-else-if="scope.row.ord_comp_stat === '3'" :class="{'cancel': scope.row.ord_comp_stat === '3'}" @click.native.prevent="viewReceive(scope.$index, scope.row)">{{$t('order.c041')}}<!-- 취소 --></el-button>
                            <el-button v-else-if="scope.row.ord_comp_stat === '4'" :class="{'reject': scope.row.ord_comp_stat === '4'}" @click.native.prevent="viewReceive(scope.$index, scope.row)">{{$t('order.c042')}}<!-- 거부 --></el-button>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-scrollbar>

            <!-- 접수 상세 -->
            <el-dialog :title="$t('order.c018') /*상세 내역*/" :visible.sync="statVisible" @close="detailInit" width="840px" custom-class="detail-pop">
                <el-table :data="detailObjData">
                    <el-table-column :label="$t('order.c010') /*일시*/" width="70" align="center">
                        <template slot-scope="scope">
                            {{scope.row.ord_dtm | dateFormat}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="trd_cur_cd" :label="$t('order.c011') /*종목*/" width="80" align="center"></el-table-column>
                    <el-table-column prop="part" :label="$t('order.c012') /*구분*/" width="40" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.buy_sell_tp == '2'" class="buy">{{$t('order.b003')}}<!-- 매수 --></span>
                            <span v-else class="sell">{{$t('order.b004')}}<!-- 매도 --></span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('order.c013') /*주문금액*/" align="right">
                        <template slot-scope="scope">
                            <span v-if="scope.row.ord_prc_tp == '1' && scope.row.buy_sell_tp != '2'">-</span>
                            <span v-else>{{priceFormat(scope.row.setl_cur_cd, scope.row.ord_amt)}} <span class="unit">{{scope.row.setl_cur_cd}}</span></span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('order.c014') /*주문가격*/" align="right">
                        <template slot-scope="scope">
                            <span v-if="scope.row.ord_prc_tp == '1'">시장가</span>
                            <span v-else-if="scope.row.ord_prc > 0">{{priceFormat(scope.row.setl_cur_cd, scope.row.ord_prc)}} <span class="unit">{{scope.row.setl_cur_cd}}</span></span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('order.c015') /*주문수량*/" align="right">
                        <template slot-scope="scope">
                            <span v-if="scope.row.ord_prc_tp == '1' && scope.row.buy_sell_tp == '2'">-</span>
                            <span v-else>{{coinFormat(scope.row.trgt_cur_cd, scope.row.ord_qty)}} <span class="unit">{{scope.row.trgt_cur_cd}}</span></span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('order.c016') /*체결수량*/" align="right">
                        <template slot-scope="scope">
                            <span v-if="scope.row.cntr_qty > 0">{{coinFormat(scope.row.trgt_cur_cd, scope.row.cntr_qty)}} <span class="unit">{{scope.row.trgt_cur_cd}}</span></span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('order.c017') /*상태*/" width="40" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.ord_comp_stat == '1'">{{$t('order.c039')}}<!-- 접수 --></span>
                            <span v-else-if="scope.row.ord_comp_stat == '2'">{{$t('order.c040')}}<!-- 완료 --></span>
                            <span v-else-if="scope.row.ord_comp_stat == '3'">{{$t('order.c041')}}<!-- 취소 --></span>
                            <span v-else-if="scope.row.ord_comp_stat == '4'">{{$t('order.c042')}}<!-- 거부 --></span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-if="detailObj.stat !== 4" class="total-list">
                    <div class="detailSum">
                        {{$t('order.c019')}} <!-- 총 정산금액 --> :
                        <span class="sum" v-if="detailObj.tot_trd_amt">{{trdAmtFormat(detailObj.setl_cur_cd, detailObj.tot_trd_amt)}} {{detailObj.setl_cur_cd}}</span>
                        <span class="sum" v-else> 0 {{detailObj.setl_cur_cd}} </span>
                        &nbsp;&nbsp;&nbsp;
                        {{$t('order.c043')}} <!-- 총 수수료 --> :
                        <span class="sum" v-if="detailObj.tot_fee">{{trdAmtFormat(detailObj.setl_cur_cd, detailObj.tot_fee)}} {{detailObj.setl_cur_cd}}</span>
                        <span class="sum" v-else> 0 {{detailObj.setl_cur_cd}} </span>
                    </div>

                    <div class="el-table">
                        <div class="el-table__header-wrapper">
                            <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
                                <colgroup>
                                    <col width="70">
                                    <col width="150">
                                    <col width="150">
                                    <col width="150">
                                    <col width="160">
                                    <col width="40">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th><div class="cell">{{$t('order.c020')}}<!-- 일시 --></div></th>
                                        <th><div class="cell">{{$t('order.c021')}}<!-- 체결가격 --></div></th>
                                        <th><div class="cell">{{$t('order.c022')}}<!-- 수량 --></div></th>
                                        <th><div class="cell">{{$t('order.c023')}}<!-- 수수료 --></div></th>
                                        <th><div class="cell">{{$t('order.c024')}}<!-- 정산금액 --></div></th>
                                        <th><div class="cell">{{$t('order.c017')}}<!-- 상태 --></div></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <el-scrollbar class="scroll-area">
                        <el-table :data="detailTableData" :show-header="false" :empty-text="$t('order.c028')">
                            <infinite-loading :identifier="infiniteId_Detail" slot="append" @infinite="infiniteHandler_detail" force-use-infinite-wrapper=".scrollbar-wrapper">
                            </infinite-loading>
                            <el-table-column label="일시" align="center" width="70">
                                <template slot-scope="scope">
                                    {{scope.row.ord_dtm | dateFormat}}
                                </template>
                            </el-table-column>
                            <el-table-column label="체결가격" align="right" width="150">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.cntr_prc > 0">{{priceFormat(detailObjData[0].setl_cur_cd, scope.row.cntr_prc)}} <span class="unit">{{detailObjData[0].setl_cur_cd}}</span></span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="수량" align="right" width="150">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.cntr_qty > 0">{{coinFormat(detailObjData[0].trgt_cur_cd, scope.row.cntr_qty)}} <span class="unit">{{detailObjData[0].trgt_cur_cd}}</span></span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="수수료" align="right" width="150">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.fee > 0">{{trdAmtFormat(detailObjData[0].setl_cur_cd, scope.row.fee)}} <span class="unit">{{detailObjData[0].setl_cur_cd}}</span></span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="calculate" label="정산금액" align="right" width="160">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.cntr_qty > 0">{{trdAmtFormat(detailObjData[0].setl_cur_cd, scope.row.trd_amt)}} <span class="unit">{{detailObjData[0].setl_cur_cd}}</span></span>
                                    <span v-else>-</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="상태" align="center" width="40">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.ord_stat === '1'">{{$t('order.b001')}}<!-- 미체결 --></span>
                                    <span v-else-if="scope.row.ord_stat === '2'">{{$t('order.c025')}}<!-- 체결 --></span>
                                    <span v-else-if="scope.row.ord_stat === '3'">{{$t('order.c026')}}<!-- 취소 --></span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-scrollbar>
                </div>
                <div v-else>
                    <div class="detailSum">{{$t('order.c029')}}<!-- 주문거부 --></div>
                    <p>
                        거부사유
                    </p>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import InfiniteLoading from 'vue-infinite-loading';
    import fromExponential from 'from-exponential';
    import moment from 'moment';
    import { mapGetters, mapMutations } from 'vuex'
    import { setTimeout } from 'timers';
    
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
        name: 'OrderHistory',
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
                stat: '0',
                /* 검색조건 obj */
                searchObj: {
                    qry_ord_tp: '0',
                    qry_cond_tp: '0',
                    symbol: '',
                    buy_sell_tp: null,
                    qry_auto_trd_tp: null,
                    qry_st_dt: '',
                    qry_en_dt: '',
                    trgt_coin: '',
                    ord_comp_stat: 0,
                    stat: '',
                    req_cnt: 25 //27~28건 조회시 데이터 8k초과로 데이터 짤릴 수 있음. > 기획서상 30건이나 25건씩 조회로 변경.
                },
                /* 기존 검색 조건 */
                oldSearchObj: {},
                infiniteId_Main: +new Date(),
                infiniteId_Detail: +new Date(),
                /* 상세 내역 */
                statVisible: false,
                detailObjData: [],
                detailObj: {
                    stat: '',
                    tot_trd_amt: 0,
                    tot_fee: 0
                },
            };
        },
        computed: {
            ...mapGetters({
                tableData: 'orderHistoryList',
                detailTableData: 'orderHistoryDetailList',
                isLogged: 'isLoggedIn',
                getCoinByCd: 'getCoinByCd',
                hogaUnit: 'hogaUnit'
            }),
            /**
             * 검색기간 달력UI에서 종료일 disabled 유효성
             * 시작일 변경에 따라 동적으로 시작일 보다 작은 날짜 disabled 처리
             */
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
            /**
             * 상태 정보(상태, 접수, 완료, 취소, 거부) 설정
             * 언어팩 변경에 따라 동적으로 처리하기 위해 computed에 methods형태로 작업함.
             */
            stats () {
                return [{
                    stat: '0',
                    label: this.$t('order.c017')  // '상태' //전체
                }, {
                    stat: '1',
                    label: this.$t('order.c039') // '접수'
                }, {
                    stat: '2',
                    label: this.$t('order.c040') // '완료'
                }, {
                    stat: '3',
                    label: this.$t('order.c041') // '취소'
                }, {
                    stat: '4',
                    label: this.$t('order.c042') // '거부'
                }]
            },
            /**
             * 기간 정보(당일, 1주일, 1개월) 설정
             * 언어팩 변경에 따라 동적으로 처리하기 위해 computed에 methods형태로 작업함.
             */
            periods () {
                return [{
                    period: '1',
                    label: this.$t('order.c002') // '당일'
                }, {
                    period: '7',
                    label: this.$t('order.c003') // '1주일'
                }, {
                    period: '30',
                    label: this.$t('order.c004') // '1개월'
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

        },
        mounted() {
            let self = this

            this.$EventBus.$emit('pc-navi', [
                { label: self.$t('header.exchange'), target: 'exchange'},
                { label: self.$t('order.a001'), target: 'signHistory' },
                { label: self.$t('order.c001'), target: null }
            ]);
                
            this.$EventBus.$on('langChange', () => {
                
                self.$EventBus.$emit('pc-navi', [
                    { label: self.$t('header.exchange'), target: 'exchange'},
                    { label: self.$t('order.a001'), target: 'signHistory' },
                    { label: self.$t('order.c001'), target: null }
                ]);
            })

            // 기간설정 default 1주일
            this.toDt = new Date();
            this.frDt = new Date();
            this.frDt.setDate(this.frDt.getDate() - 7);
            
            /**
             * RB03콜백 함수
             * 주문 체결시 데이터 재조회
             */
            var callback = function(resData) {
                
                self.tableSearch();
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
             * 상태정보 선택시 데이터 재조회
             */
            stat(val, old) {
                // 상태 선택시 데이터 재조회
                const statObj = this.stats.find(c => c.stat === this.stat);
                if (statObj) {
                    
                    this.tableSearch()
                    this.oldSearchObj['stat'] = statObj['stat']
                }
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
            ...mapMutations(['setContiKey']),
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
             * @vuex {actions} : searchOrderHistoryList - tr521 요청
             */
            tableSearch(searchOldParam) {
                let self = this;
                var param = {};
                
                /* 검색조건 set */
                if (searchOldParam) { // 마지막으로 검색한 검색조건으로 param set
                    
                    param = this.oldSearchObj;
                } else {

                    const coinObj = this.coins.find(c => c.value === this.part);
                    this.searchObj['buy_sell_tp'] = this.sort;
                    this.searchObj['symbol'] = coinObj ? coinObj.coin : '';
                    this.searchObj['qry_st_dt'] = this.frDt.format('yyyyMMdd');
                    this.searchObj['qry_en_dt'] = this.toDt.format('yyyyMMdd');
                    this.searchObj['ord_comp_stat'] = this.stat;
                    param = this.searchObj;

                    /* 검색조건 임시저장( infiniteHandler(scroll-event)에서 사용 + 실시간 데이터 변경으로 재조회시 사용 ) */
                    Object.assign(this.oldSearchObj, this.searchObj);
                }

                /* data Serach */
                this.$store.dispatch('searchOrderHistoryList', param)
                .then((obj) => {
                    self.infiniteId_Main = +new Date();
                });
                
            },
            /**
             * 주문내역의 row의 상태값이 취소 또는 거부일 경우 class명('withdraw-cancel')을 지정
             * 해당 row의 ord_comp_stat에 따라 클래스명 반환
             */
            tableRowClass({row, rowIndex}) {
                if (this.tableData[rowIndex].ord_comp_stat == '3' || this.tableData[rowIndex].ord_comp_stat == '4') {
                    return 'withdraw-cancel';
                } else {
                    return '';
                }
            },
            /**
             * 스크롤 이벤트
             * 테이블의 스크롤이 가장 하단에 도달하는 시점에 실행
             * 주문 데이터 추가 조회
             */
            infiniteHandler($state) {

                if (!this.$store.state.exchange.contiKey) {
                    $state.reset()
                    return;
                }
                
                this.oldSearchObj['contiFlag'] = true;

                /* data Serach */
                this.$store.dispatch('searchOrderHistoryList', this.oldSearchObj)
                .then((obj) => {
                    
                    obj.getContiKey() == null ? $state.complete() : $state.loaded();
                });
            },
            /**
             * 스크롤 이벤트
             * (주문 데이터의 상태버튼 클릭시 노출되는 팝업의 스크롤 이벤트)
             * 테이블의 스크롤이 가장 하단에 도달하는 시점에 실행
             * 주문 상세 데이터 추가 조회
             */
            infiniteHandler_detail($state) {
                
                if (this.detailObjData['contiKey'] == null) {
                    $state.reset()
                    return;
                };

                var param = {
                    ord_no: this.detailObjData[0]['ord_no'],
                    contiFlag: true
                }
                
                /* data Serach */
                this.$store.dispatch('searchOrderDetailList', param)
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
            /** 주문수량, 체결수량
             * 소수점, 콤마 포멧 
            */
            coinFormat(cd, number) {
                if(cd == '' || cd == null || cd == undefined || this.getCoinByCd(cd) == undefined) return;

                let self = this;
                let dec_digt = self.getCoinByCd(cd).dec_digt
                return UnitManager.fixedDecimalWithCommas(number, dec_digt? dec_digt : 8)
            },
            /** 주문금액, 주문가격, 체결금액
             * 소수점, 콤마 포멧 
            */
            priceFormat(cd, prc) {
                if(cd == '' || cd == null || cd == undefined || this.hogaUnit == undefined) return;

                let self = this;
                var nLenBelowDigitArray = [1];
                UnitManager.getHogaUnit(self.hogaUnit, cd, prc, undefined, undefined, nLenBelowDigitArray);
                return UnitManager.fixedDecimalWithCommas(prc, nLenBelowDigitArray[0])
            },
            /** 정산금액, 수수료, 총 정산금액, 총 수수료
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
            /**
             * 주문내역의 상태버튼 클릭이벤트
             * 주문 상세 데이터 조회
             * @vuex {actions} : searchOrderDetailList -tr522호출
             */
            viewReceive(index, rowData){
                
                /* data Serach */
                this.$store.dispatch('searchOrderDetailList', {ord_no: rowData['ord_no']})
                .then((obj) => {
                    this.detailObjData = [rowData]
                    this.detailObjData['contiKey'] = obj.getContiKey()
                    this.statVisible                = true;
                    this.detailObj['stat']          = rowData['ord_comp_stat'];
                    this.detailObj['tot_trd_amt']   = obj.getBlockData('OutBlock1')[0]['tot_trd_amt']
                    this.detailObj['tot_fee']       = obj.getBlockData('OutBlock1')[0]['tot_fee']
                    this.detailObj['setl_cur_cd']   = rowData['setl_cur_cd']

                    this.infiniteId_Detail = +new Date();
                }).catch((obj) => {
                    this.detailObjData = [];
                    this.detailObj = {};
                });
            },
            /* 상세 닫기 */
            detailInit() {

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
            dateFormat(dt) {
                if (!dt) return '';
                return moment(dt.substr(0,8) + "T" + dt.substr(8,6)).format("YYYY-MM-DD HH:mm:ss");
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