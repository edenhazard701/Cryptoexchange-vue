<template>
    <div class="not-concluded">
        <el-row class="rdo-select-bx">
            <el-col :span="8">
                <el-radio v-model="radio" label="1">{{$t('m_exchange.n001')}}</el-radio>
            </el-col>
            <el-col :span="8">
                <el-radio v-model="radio" label="2">{{$t('m_exchange.n002')}}</el-radio>
            </el-col>
            <el-col :span="8">
                <a href="javascript:void(0)" @click="allSearch" >{{$t('m_exchange.n003')}}</a>
            </el-col>
        </el-row>
        <!-- 시작 : 미체결 탭 -->
        <div v-if="radio == '1'" class="data-lst-bx">
            <div class="data-list">
                <el-row v-for="item in notSignList" :key="item.ord_no" class="not-conc-data">
                    <el-col :span="4">
                        <el-checkbox v-model="item.checked"></el-checkbox>
                    </el-col>
                    <el-col :span="20">
                        <el-row>
                            <el-col v-if="item.buy_sell_tp == '1'" :span="8" class="blue">{{$t('m_exchange.c010')}}</el-col>
                            <el-col v-else :span="8" class="red">{{$t('m_exchange.c009')}}</el-col>
                            <el-col :span="16">{{item.ord_dtm | dateFormat}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">{{$t('m_exchange.n005')}}</el-col>
                            <el-col :span="16">{{priceFormat(item.setl_cur_cd, item.ord_prc)}}<span class="normal_txt">{{item.setl_cur_cd}}</span></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">{{$t('m_exchange.n006')}}</el-col>
                            <el-col :span="16">{{orderQtyUnitFormat(item.trgt_cur_cd, item.ord_qty)}}<span class="normal_txt">{{item.trgt_cur_cd}}</span></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">{{$t('m_exchange.n007')}}</el-col>
                            <el-col :span="16">{{orderQtyUnitFormat(item.trgt_cur_cd, item.remn_qty)}}<span class="normal_txt">{{item.trgt_cur_cd}}</span></el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row v-if="notSignList.length == 0">
                    <el-col class="not-order-data">
                        {{$t('m_exchange.n004')}}
                    </el-col>
                </el-row>
                
            </div>
            <el-button class="cancel-btn" v-on:click="orderCancelBtnClick">{{$t('m_exchange.n008')}}</el-button>
        </div>
        <el-dialog :title="$t('m_exchange.n011')" :visible.sync="orderCancelDialogVisible" :close-on-click-modal="false" width="20%" center>
            <el-row class="notice-dialog-contents-wrapper">
                <el-row class="notice-dialog-contents" v-html="$t('m_exchange.n009')">
                </el-row>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="info"  @click="orderCancelDialogVisible = false">{{$t('m_exchange.n010')}}</el-button>
                <el-button type="primary" @click="orderCancelMessage">{{$t('m_exchange.n011')}}</el-button>
            </div>
        </el-dialog>
        <!-- 끝 : 미체결 탭 -->
        <!-- 시작 : 감시중 탭 -->
        <div v-if="radio == '2'" class="data-lst-bx">
            <div class="data-list">
                <el-row v-for="item in watchList" :key="item.sq" class="not-conc-data">
                    <el-col :span="4">
                        <el-checkbox v-model="item.checked"></el-checkbox>
                    </el-col>
                    <el-col :span="20">
                        <el-row>
                            <el-col v-if="item.trd_ccd == '1'" :span="8" class="blue">{{$t('m_exchange.c010')}}</el-col>
                            <el-col v-else :span="8" class="red">{{$t('m_exchange.c009')}}</el-col>
                            <el-col :span="16" v-if="item.md_cd === '1'">{{$t('m_exchange.c016')}}</el-col>
                            <el-col :span="16" v-else-if="item.md_cd === '2'">{{$t('m_exchange.c015')}}</el-col>
                            <el-col :span="16" v-else-if="item.md_cd === '3'">{{$t('m_exchange.c017')}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8"   v-if="item.md_cd == '1' || item.md_cd =='2'">{{$t('m_exchange.h001')}}</el-col>
                            <el-col :span="16"  v-if="item.md_cd == '1' || item.md_cd =='2'">{{priceFormat(item.paycurrcode, item.stop_prc)}}<span class="normal_txt">{{item.paycurrcode}}</span></el-col>
                            <el-col :span="8"   v-if="item.md_cd == '3' && item.trd_ccd =='2'">{{$t('m_exchange.l001')}}</el-col>
                            <el-col :span="16"  v-if="item.md_cd == '3' && item.trd_ccd =='2'">{{priceFormat(item.paycurrcode, item.distance)}}<span class="normal_txt">{{item.paycurrcode}}</span></el-col>
                            <el-col :span="8"   v-if="item.md_cd == '3' && item.trd_ccd =='1'">{{$t('m_exchange.m001')}}</el-col>
                            <el-col :span="16"  v-if="item.md_cd == '3' && item.trd_ccd =='1'">{{priceFormat(item.paycurrcode, item.distance)}}<span class="normal_txt">{{item.paycurrcode}}</span></el-col>
                        </el-row>
                        <el-row v-if="item.trd_ccd == '1'">
                            <el-col :span="8">{{$t('m_exchange.o005')}}</el-col>
                            <el-col v-if="item.ordr_q > 0" :span="16">{{orderQtyUnitFormat(item.tradcurrcode, item.ordr_q)}}<span class="normal_txt">{{item.tradcurrcode}}</span></el-col>
                            <el-col v-else :span="16"><span> - </span></el-col>
                        </el-row>
                        <el-row v-if="item.trd_ccd == '1'">
                            <el-col :span="8">{{$t('m_exchange.o006')}}</el-col>
                            <el-col v-if="item.ordr_typ_cd == '2'" :span="16">{{priceFormat(item.paycurrcode, item.ordr_prc)}}<span class="normal_txt">{{item.paycurrcode}}</span></el-col>
                            <el-col v-else-if="item.ordr_typ_cd == '1'" :span="16"><span>{{$t('m_exchange.c014')}}</span></el-col>
                        </el-row>
                        <el-row v-if="item.trd_ccd == '2'">
                            <el-col :span="8">{{$t('m_exchange.o007')}}</el-col>
                            <el-col :span="16">{{priceFormat(item.paycurrcode, item.ordr_amt)}}<span class="normal_txt">{{item.paycurrcode}}</span></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">{{$t('m_exchange.o008')}}</el-col>
                            <el-col :span="16">{{item.end_dt | dateFormat}}</el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row v-if="watchList.length == 0">
                    <el-col class="not-order-data">
                        {{$t('m_exchange.o002')}}
                    </el-col>
                </el-row>
            
            </div>
            <el-button class="cancel-btn" v-on:click="watchCancelBtnClick">{{$t('m_exchange.n008')}}</el-button>
        </div>
        <el-dialog :title="$t('m_exchange.n011')" :visible.sync="watchCancelDialogVisible" :close-on-click-modal="false" width="20%" center>
            <el-row class="notice-dialog-contents-wrapper">
                <el-row class="notice-dialog-contents" v-html="$t('m_exchange.n009')">
                </el-row>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="info"  @click="watchCancelDialogVisible = false">{{$t('m_exchange.n010')}}</el-button>
                <el-button type="primary" @click="watchCancelMessage">{{$t('m_exchange.n011')}}</el-button>
            </div>
        </el-dialog>
        <!-- 끝 : 감시중 탭 -->
    </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import fromExponential from 'from-exponential';
import moment from 'moment';

export default {
    name: 'NotConcluded',
    data () {
        return {
            radio: '1',
            orderCancelDialogVisible: false,
            watchCancelDialogVisible: false,
            notSignParam: {
                qry_ord_tp      : 0,
                qry_cond_tp     : 0,
                symbol          : null,
                buy_sell_tp     : null,
                qry_auto_trd_tp : null,
                // req_cnt         : 30
            },
            watchParam: {            /****** 검색조건 ******/
                mbr_ccd: '01',          // 사용자구분 (00:직원 01:고객)
                hndl_st_vl: '1',         // 조건상태 (0:감시해제 1:감시중 2:미체결감시중 3:조건만족 4:유효기간만료 98:전체조회(감시중제외) 99:전체(감시중 포함))
                symbol: '',             // 처리상태 (space:전체 0:감시해제 1:감시중 2:미체결감시중 3:조건)
            },
        };
    },
    methods : {
        ...mapMutations(['setContiKey', 'orderUnshift', 'orderRemove', 'orderUpdate']),
        addComma(value) {       // 1,000 단위 콤마 추가
            var tmp = value.toString().split('.');
            return tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (tmp[1] ? '.' + tmp[1] : '');
        },
        orderQtyUnitFormat(cd, number) {    // 주문 수량 단위로 소수점 자릿수 맞추기 (0채움, 반올림 X)
            let self = this;
            
            var ordQtyUnit = self.$_.findWhere(self.coinList, {o_symbol : self.currentSymbol}).o_ord_unit_qty;
            var ordQtyBelowPntDigit = NumberUtil.getLenBelowDigit(ordQtyUnit);
            
            var count = Math.pow(10, ordQtyBelowPntDigit);

            /* javascript 자체 곱하기 연산 에러로 로직 수정
                 > number * count의 결과값은 소수점이 없는 정수여야 하지만,
                   javascript 자체 곱하기 연산 에러로 결과값이 0.000000001 작게 확인됨.
                     > ex) 1.000012 * 1000000 = 1000011.9999999999로 출력됨.
                 > 위와 같은 에러를 해결하기 위해 0.1을 더한 후 소수점 절사처리.
                   > case1 에러가 발생한 경우 0.1을 더한 결과 값        ex : 1.000012 * 1000000 + 0.1 = 1000012.0999999999
                   > case2 에러가 발생하지 않은 경우 0.1을 더한 결과 값  ex : 1.012 * 100000 + 0.1 = 101200.1
                     > 두 경우 모두 소수점 절사처리시 원하는 결과 값이 출력되므로 에러 해결
            */
            var res = Math.floor((number * count) + 0.1) / count;
            res = this.addComma(res.toFixed(ordQtyBelowPntDigit));

            return res;
        },
        priceFormat(cd, prc) {
            if(cd == '' || cd == null || cd == undefined || this.hogaUnit == undefined) return;

            let self = this;
            var nLenBelowDigitArray = [1];
            UnitManager.getHogaUnit(self.hogaUnit, cd, prc, undefined, undefined, nLenBelowDigitArray);
            // let formatter = Intl.NumberFormat(self.$i18n.locale, {
            //     minimumFractionDigits: nLenBelowDigitArray[0],
            //     maximumFractionDigits: nLenBelowDigitArray[0]
            // });
            // return formatter.format(prc);
            return UnitManager.fixedDecimalWithCommas(prc, nLenBelowDigitArray[0])
        },
        getDispatchNotSign() {
            this.notSignParam['symbol'] = this.currentSymbol
            this.$store.dispatch('searchNotSignList', this.notSignParam).then((obj) => {
                
            })
        },
        getDispatchWatchList() {
            this.watchParam['symbol'] = this.currentSymbol
            this.$store.dispatch('searchWatchList', this.watchParam).then((obj) => {
                
            });
        },
        orderCancelBtnClick() {
            var validChk = true;

            for (var idx in this.notSignList) {
                
                if(this.notSignList[idx]['checked']) {
                    validChk = false;
                    break;
                }
            }

            if (validChk) {
                // 선택된 주문이 없습니다.
                this.$alert(this.$t('m_exchange.n015'), '', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: this.$t('m_exchange.n013'), //'확인',
                    callback: action => {
                    
                    }
                });
                return;
            }

            this.orderCancelDialogVisible = true;
        },
        watchCancelBtnClick() {

            var validChk = true;

            for (var idx in this.watchList) {
                
                if(this.watchList[idx]['checked']) {
                    validChk = false;
                    break;
                }
            }

            if (validChk) {
                // 선택된 주문이 없습니다.
                this.$alert(this.$t('m_exchange.n015'), '', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: this.$t('m_exchange.n013'), //'확인',
                    callback: action => {
                    
                    }
                });
                return;
            }

            this.watchCancelDialogVisible = true;
        },
        orderCancelMessage() {
            let self = this;

            var param = [];
            for (var idx in this.notSignList) {
                
                if (this.notSignList[idx]['checked']) {

                    param.push(this.notSignList[idx])
                }
            }

            this.$store.dispatch('reqSignAllCancel', param).then((obj) => {
                self.orderCancelDialogVisible = false;

                if (obj.failObjArr.length > 0) {
                    
                    // 체결이 완료된 주문은 취소되지 않습니다.<br> 취소주문은 주문내역에서 확인 가능합니다.
                    self.$alert(self.$t('m_exchange.n014'), '', {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: self.$t('m_exchange.n013'), //'확인',
                        callback: action => {
                        
                        }
                    });
                } else if (obj.successArr.length > 0 ) {

                    // 주문 취소가 신청되었습니다.
                    // 취소주문은 주문내역에서 확인 가능합니다.
                    self.$alert(self.$t('m_exchange.n012'), '', {
                        confirmButtonText: self.$t('m_exchange.n013'), //'확인',
                        callback: action => {
                        
                        }
                    });
                } else {
                    
                    // 체결이 완료된 주문은 취소되지 않습니다.<br> 취소주문은 주문내역에서 확인 가능합니다.
                    self.$alert(self.$t('m_exchange.n014'), '', {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: self.$t('m_exchange.n013'), //'확인',
                        callback: action => {
                        
                        }
                    });
                }
            })
        },
        watchCancelMessage() {
            let self = this;

            var param = [];
            for (var idx in this.watchList) {
                
                if (this.watchList[idx]['checked']) {

                    param.push(this.watchList[idx])
                }
            }

            this.$store.dispatch('reqWatchAllCancel', param).then((obj) => {
                self.watchCancelDialogVisible = false;

                if (obj.failObjArr.length > 0) {
                    // '감시가 종료된 주문은 취소되지 않습니다.<br> 처리결과는 감시완료내역에서 확인 가능합니다.'
                    self.$alert(self.$t('m_exchange.o011'), {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: self.$t('m_exchange.n013'), //'확인',
                        callback: action => {
                        
                        }
                    });
                } else if (obj.successArr.length > 0 ) {

                    self.$alert(self.$t('m_exchange.o010'), { //감시중인 주문이 취소되었습니다.
                        confirmButtonText: self.$t('m_exchange.n013'), //'확인',
                        callback: action => {
                        
                        }
                    });
                }

                self.getDispatchWatchList()
            })
        },
        allSearch() {

            this.$router.push({name: 'mInvestment', params: {reqTab: this.radio}})
        }
    },
    computed: {
        ...mapGetters({
            notSignList : 'notSignList',
            watchList   : 'watchingList',
            hogaUnit: 'hogaUnit'
        }),
        ...mapState({
            currentSymbol : state => state.data.currentSymbol,
            coinList : state => state.data['n1001']
        }),
        socketConnected() {
            return this.$store.getters.isSocketConnected
        },
    },
    created() {
        
    },
    watch: {
        radio(val, old) {
            let self = this

            if (val == '2') { //감시중 radio 클릭시 감시중 List데이터 재조회
                
                self.getDispatchWatchList();
            } else {

                self.getDispatchNotSign();
            }
        },
        currentSymbol(val, old) {
            let self = this
            
            self.getDispatchNotSign();
            self.getDispatchWatchList();
        }
    },
    mounted() {
        let self = this
        
        var callback = function(resData) {
            
            if (self.radio == '1') { // 미체결 탭
                //----- 미체결 data set START -----//
                if (resData.evnt_tp == '1') { // 주문확인(신규주문)
                    if (self.notSignParam['symbol'] != resData['symbol']) return;

                    self.orderUnshift({listName: 'notSignList', addObj: [resData]})
                    return;
                }

                for (var idx in self.notSignList) {
                    var item = self.notSignList[idx]

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
            } else { //감시중 탭
                self.getDispatchWatchList()
            }
        }

        if (self.$store.getters.isSocketConnected) {
            
            /* data Serach */
            self.$store.dispatch('orderNotification', {
                vue_name : self.$options.name,
                callback : callback
            });

            self.getDispatchNotSign()
            self.getDispatchWatchList()
        } else {

            self.$EventBus.$on('socketConnected', () => {
                
                /* data Serach */
                self.$store.dispatch('orderNotification', {
                    vue_name : self.$options.name,
                    callback : callback
                });

                self.getDispatchNotSign()
                self.getDispatchWatchList()
            })
        }
    },
    filters: {
        dateFormat(dt) {
            if (!dt) return '';
            dt = dt.replace(/\./g, "")
            dt = dt.replace(/\:/g, "")
            dt = dt.replace(/ /g, "")
            return moment(dt.substr(0,8) + "T" + dt.substr(8,6)).format("MM/DD HH:mm:ss");
        }
    },
    beforeDestroy() {
        var self = this;
        self.$socket.unregisterReal('RB03', [self.$store.state.user.user_id], self.$options.name);
    },
};

</script>

<style scoped>

.not-concluded .data-list .el-col {
    padding: 20px;
}


</style>
