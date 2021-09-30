<template>
    <div class="bank_history">
        <div class="top_search_wrap">
            <div class="date_picker">
                <span class="picker">
                    <el-date-picker v-model="startDate" type="date" placeholder="시작일" format="yyyy.MM.dd" class="inp_m"  :picker-options="frDtValid" @change="selectDepositWithdraw()"></el-date-picker>
                </span>
                <span class="mark">~</span>
                <span class="picker">
                    <el-date-picker v-model="endDate" type="date" placeholder="종료일" format="yyyy.MM.dd" class="inp_m" :picker-options="toDtValid" @change="selectDepositWithdraw()"></el-date-picker>
                </span>
            </div>
            <div class="select_area">
                <el-select v-model="selectedCurCd" @change="selectDepositWithdraw()" class="sel_m" popper-class="m_style">
                    <el-option v-for="item in curCdList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="dealType" @change="selectDepositWithdraw()" class="sel_m" popper-class="m_style">
                    <el-option v-for="item in dealTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>

        <el-table class="breakdown_table" :data="tableData"  :empty-text="$t('m_wallet_log.a023')">   <!-- 최근 2일 동안 입출금내역이 없습니다. -->
            <el-table-column min-width="30">
                <template slot-scope="scope">
                    <div class="data">
                        <p>{{ scope.row.trd_dt | dateFormatYYMMDD}}</p>
                        <p>{{ scope.row.trd_tm | dateFormatHHMMSS}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <div class="float_cont">
                        <p class="left_txt" v-if="scope.row.cur_cd === 'KRW' && scope.row.dpwd_tp === '1' && scope.row.trd_stat === '1'">{{$t('m_wallet_log.a024')}}</p> <!-- 입금확인중 -->
                        <p class="left_txt completion" v-if="scope.row.cur_cd === 'KRW' && scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'">{{$t('m_wallet_log.a015')}}</p> <!-- 입금완료 -->
                        <p class="left_txt" v-if="scope.row.cur_cd === 'KRW' && scope.row.dpwd_tp === '1' && scope.row.trd_stat === '9'">{{$t('m_wallet_log.a017')}}</p> <!-- 입금취소 -->
                        
                        <p class="left_txt" v-if="scope.row.cur_cd === 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'">{{$t('m_wallet_log.a021')}}</p> <!-- 출금중 -->
                        <p class="left_txt completion" v-if="scope.row.cur_cd === 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'">{{$t('m_wallet_log.a018')}}</p> <!-- 출금완료 -->
                        <p class="left_txt" v-if="scope.row.cur_cd === 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '9'">{{$t('m_wallet_log.a019')}}</p> <!-- 출금취소 -->
                        
                        <p class="left_txt" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '1' && (scope.row.trd_stat === '1' || scope.row.trd_stat === '3')">{{$t('m_wallet_log.a016')}}</p> <!-- 입금대기 -->
                        <p class="left_txt completion" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'">{{$t('m_wallet_log.a015')}}</p> <!-- 입금완료 -->
                        <p class="left_txt" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '1' && scope.row.trd_stat === '9'">{{$t('m_wallet_log.a017')}}</p> <!-- 입금취소 -->
                        
                        <p class="left_txt" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'">{{$t('m_wallet_log.a020')}}</p> <!-- 출금대기중 -->
                        <p class="left_txt" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '3'">{{$t('m_wallet_log.a021')}}</p> <!-- 출금중 -->
                        <p class="left_txt completion" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'">{{$t('m_wallet_log.a018')}}</p> <!-- 출금완료 -->
                        <p class="left_txt" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '9'">{{$t('m_wallet_log.a019')}}</p> <!-- 출금취소 -->
                        <p class="left_txt completion" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === 'E'">{{$t('m_wallet_log.a037')}}</p> <!-- 잔고부족 -->
                        
                        <p class="right_txt">
                            {{ scope.row.cur_cd === 'KRW' ? formatKRW(scope.row.mov_trd_amt) : formatCoin( scope.row.mov_trd_amt) }} <span class="s_txt">{{ scope.row.cur_cd }}</span>
                            <!-- 암호화폐 //-->
                            <span class="block_s_txt" v-if="scope.row.cur_cd !== 'KRW'">≈{{formatKRW(scope.row.krw_trd_amt)}}KRW</span>
                            <!-- //암호화폐 -->
                        </p>
                    </div>

                    <!--  1 : 외부 , 2: 내부 , R : 관리자 , E : 이벤트   (dpwd_trgt_tp)-->
                    <!-- 원화 --> 
                    <div  v-if="scope.row.cur_cd === 'KRW' &&  scope.row.dpwd_trgt_tp === 'R'">({{$t('m_wallet_log.a035')}})</div>
                    <div  v-if="scope.row.cur_cd === 'KRW' &&  scope.row.dpwd_trgt_tp === 'E'">({{$t('m_wallet_log.a036')}})</div>

                    <!-- 암호화폐// -->
                    <div class="txid" v-if="scope.row.cur_cd !== 'KRW' &&  scope.row.dpwd_trgt_tp === 'R' ">({{$t('m_wallet_log.a035')}})</div>
                    <div class="txid" v-if="scope.row.cur_cd !== 'KRW' &&  scope.row.dpwd_trgt_tp === 'E' ">({{$t('m_wallet_log.a036')}})</div>
                    <div class="txid" v-if="scope.row.cur_cd !== 'KRW' && (scope.row.dpwd_trgt_tp === '1' || scope.row.dpwd_trgt_tp === '2') && scope.row.trd_stat !== '1'" >
                        TXID: <el-button type="text">{{ scope.row.txid }}</el-button>
                    </div>
                     <!-- //암호화폐 -->

                    
                    <div class="btn" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1' && (scope.row.dpwd_trgt_tp === '1' || scope.row.dpwd_trgt_tp === '2') ">
                        <el-button class="cancel_btn" @click="withdrawCancel(scope.row.trd_dt , scope.row.trd_tm)" >{{$t('m_wallet_log.a019')}}</el-button>  <!-- 출금취소 -->
                    </div>
                   
                </template>
            </el-table-column>
            <infinite-loading :identifier="infiniteId" slot="append" @infinite="infiniteHandler" :force-use-infinite-wrapper="forceUseinfinite"></infinite-loading>
        </el-table>



        <!-- 컴펌창 -->
        <el-dialog :title="$t('m_wallet_log.a019')" :visible.sync="openComfirmPop" width="400px">  <!-- 출금취소-->
            <div>
                {{$t('m_wallet_log.a027')}} <!-- 출금 신청을 취소하시겠습니까? -->
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="openComfirmPop = false;">{{$t('m_wallet_log.a026')}}</el-button>  <!-- 취소 -->
                <el-button type="primary" @click="comfirmPopOkay">{{$t('m_wallet_log.a025')}}</el-button> <!-- 확인 -->
            </span>
        </el-dialog>

        <!-- 확인창 -->
        <el-dialog :title="$t('m_wallet_log.a030')" :visible.sync="openOkayPop" width="400px">  <!-- 출금취소 접수 -->
            <div v-html="$t('m_wallet_log.a028')">
                         <!--출금취소가 접수되었습니다.<br>  취소내역은 입출금내역에서 확인 가능합니다.  --> 
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="openOkayPop = false">{{$t('m_wallet_log.a025')}}</el-button>  <!-- 확인 --> 
            </span>
        </el-dialog>
        <!-- 확인창 -->
        <el-dialog :title="$t('m_wallet_log.a030')" :visible.sync="openOkayCompletePop" width="400px"> <!-- 출금취소 접수 -->
            <div>
                {{$t('m_wallet_log.a029')}}<!-- 이미 출금 진행이 완료된 내역입니다. -->
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="openOkayCompletePop = false">{{$t('m_wallet_log.a025')}}</el-button>  <!-- 확인 --> 
            </span>
        </el-dialog>




    </div>
</template>

<script>
import moment from 'moment'
import { mapGetters} from 'vuex';
import InfiniteLoading from 'vue-infinite-loading'


export default {
    data() {
        return {
            
            tableDataRow : 50,
            startDate: '',
            endDate: '',
            frDtValid: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            dealType: '0',

            selectedCurCd: 'ALL',
            curCdList: [],
            tableData: [],

            cancelDivision  : '',    //가상화폐 출금 : 2
            cancelTrdDt : '',        //출금취소 가상화폐 일자 
            cancelTrdTm : '',        //출금취소 가상화폐 시간 
            
            openComfirmPop: false,
            openOkayPop: false,
            openOkayCompletePop : false,

            infiniteId : +new Date(),
            forceUseinfinite : false
        }
    },
    methods: {
        infiniteHandler($state) {

            let self = this 
            if(self.tableData.length < self.tableDataRow){
                self.tableDataRow = 50
                $state.reset()
                return
            }
            //조회
            self.$socket.sendProcessByName('dw531', function (queryData) {
                var block = queryData.getBlockData('InBlock1')[0];
                self.tableDataRow += 30

                block['user_id'] = self.$store.getters.getUserId  //'BzBdSqav]<' //self.$store.getters.getUserId;
                block['fr_dt'] =   self.startDate.format('yyyyMMdd')  //'20190221' //시작일
                block['to_dt'] =   self.endDate.format('yyyyMMdd')  //'20190222' //종료일
                block['dpwd_tp'] = self.dealType === '0' ? '%' : self.dealType //'%' : 전체  1.입금(고객) 2.출금(고객) 
                block['cur_cd'] =  self.selectedCurCd === 'ALL' ? '%' : self.selectedCurCd//'%' : 전체 
                block['req_cnt'] = self.tableDataRow  //%  

            }, function (queryData) {
                if (queryData != null) {
                    self.tableData = queryData['queryObj']['OutBlock2'];
                    if(self.tableData.length === self.tableDataRow){
                        $state.loaded();
                    }else{
                        $state.complete()
                    }
                }else{
                    $state.complete()
                    // 전문 에러 언어팩 적용
					const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
					if (errorData.trName != "dw531") return

					self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
						dangerouslyUseHTMLString: true,
						confirmButtonText: self.$t('sys_err.a001')
					});
                }
            });
        },
        selectDepositWithdraw: function(value) {
            let self = this
            self.$socket.sendProcessByName('dw531', function (queryData) {
                var block = queryData.getBlockData('InBlock1')[0];
                block['user_id'] = self.$store.getters.getUserId  //'BzBdSqav]<' //self.$store.getters.getUserId;
                block['fr_dt'] =   self.startDate.format('yyyyMMdd')  //'20190221' //시작일
                block['to_dt'] =   self.endDate.format('yyyyMMdd')  //'20190222' //종료일
                block['dpwd_tp'] = self.dealType === '0' ? '%' : self.dealType//'%' : 전체  1.입금(고객) 2.출금(고객) 
                block['cur_cd'] =   self.selectedCurCd === 'ALL' ? '%' : self.selectedCurCd//'%' : 전체 
                block['req_cnt'] = 50

            }, function (queryData) {
                if (queryData != null) {
                    self.tableData = queryData['queryObj']['OutBlock2'];
                    self.infiniteId = +new Date();
                } else {
                    // 전문 에러 언어팩 적용
					const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
					if (errorData.trName != "dw531") return

					self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
						dangerouslyUseHTMLString: true,
						confirmButtonText: self.$t('sys_err.a001')
					});
                }
            });
        },
        
        coninList(){ // 종목 검색
            let self = this
            if (self.curCdList.length > 0) return
            let tempList = [{ "value" : 'ALL'  , "label" : '전체 자산' }]
            self.$socket.sendProcessByName('dw532', function (queryData) {
                var block = queryData.getBlockData('InBlock1')[0];
                block['user_id'] = self.$store.getters.getUserId;
                block['dpwd_tp'] = '%'
            }, function (queryData) {
                if (queryData != null) {
                    let coinList = queryData['queryObj']['OutBlock2'];
                    for (var idx in coinList) {
                        tempList.push({ "value" : coinList[idx].cur_cd , "label" : '('+coinList[idx].cur_cd+')' })
                    }
                   
                } else {

                    // 전문 에러 언어팩 적용
					const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
					if (errorData.trName != "dw532") return

					self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
						dangerouslyUseHTMLString: true,
						confirmButtonText: self.$t('sys_err.a001')
					});
                }
            });
            return tempList
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
        comfirmPopOkay() {
            let self = this;
            self.openComfirmPop = false;
            //출금 신청 로직
            //KRW or 가상화폐 구분
            if(self.cancelDivision === '') return
            //가상화폐 출금 취소 
            self.$socket.sendProcessByName('dw112', function (queryData) {
                var block = queryData.getBlockData('InBlock1')[0];
                block['user_id'] = self.$store.getters.getUserId
                block['trd_dt'] = self.cancelTrdDt                         //거래일자
                block['trd_tm'] = self.cancelTrdTm                         //거래시각
            }, function (queryData) {
                if (queryData != null) {
                    self.selectDepositWithdraw()
                    self.openOkayPop = true
                }else{
                    self.selectDepositWithdraw()
                    self.openOkayCompletePop = true
                }
            });
            
        },




    },
    created() {
        let self = this
        self.$EventBus.$emit('mobile-nav-title', self.$t('m_wallet_log.a031'));  //전체 입출금 내역 
        self.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault']);

        self.endDate = new Date();
		self.startDate = new Date();
		self.startDate.setDate(self.startDate.getDate() - 1);
    },
    computed: {
        dealTypeOptions(){
            return [{
                value: '0',
                label: this.$t('m_wallet_log.a032')         //전체
            }, {
                value: '7',
                label: this.$t('m_wallet_log.a033')         //입금
            }, {
                value: '8',
                label: this.$t('m_wallet_log.a034')         //출금
            }]
        },
        // 종료일 disabled
        toDtValid() {
            const self = this;
            var resFn = function(){};
            if (this.startDate instanceof Date) { // 시작일 보다 작은 일짜 disabled
                resFn = function(time) {
                    return time.getTime() < self.startDate.getTime();
                }
            };
            return { disabledDate: resFn };
        },
        
    },
    filters: {

        dateFormatYYMMDD(val) {
            if (!val) return '';
            return moment(val).format('YYYY-MM-DD');
        },
        dateFormatHHMMSS(val) {
            if (!val) return '';
            return val.substr(0,2) +':'+ val.substr(2,2) +':'+val.substr(4,2)
        }

    },
    mounted() {

        let self = this;
        if (self.$store.getters.isSocketConnected) {
            //조회
            self.$socket.sendProcessByName('dw531', function (queryData) {
                var block = queryData.getBlockData('InBlock1')[0];
                block['user_id'] = self.$store.getters.getUserId  //'BzBdSqav]<' //self.$store.getters.getUserId;
                block['fr_dt'] =   self.startDate.format('yyyyMMdd')  //'20190221' //시작일
                block['to_dt'] =   self.endDate.format('yyyyMMdd')  //'20190222' //종료일
                block['dpwd_tp'] =  '%'//'%' : 전체  1.입금(고객) 2.출금(고객) 
                block['cur_cd'] =   '%'//'%' : 전체 
                block['req_cnt'] = 50

            }, function (queryData) {
                if (queryData != null) {
                    self.tableData = queryData['queryObj']['OutBlock2'];
                    //self.infiniteId = +new Date();
                } else {
                    // 전문 에러 언어팩 적용
					const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
					if (errorData.trName != "dw531") return

					self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
						dangerouslyUseHTMLString: true,
						confirmButtonText: self.$t('sys_err.a001')
					});
                }
            });

            self.curCdList = self.coninList();

        } else {
            self.$EventBus.$on('socketConnected', () => {
                //조회
                self.$socket.sendProcessByName('dw531', function (queryData) {
                    var block = queryData.getBlockData('InBlock1')[0];

                    block['user_id'] = self.$store.getters.getUserId  //'BzBdSqav]<' //self.$store.getters.getUserId;
                    block['fr_dt'] =   self.startDate.format('yyyyMMdd')  //'20190221' //시작일
                    block['to_dt'] =   self.endDate.format('yyyyMMdd')  //'20190222' //종료일
                    block['dpwd_tp'] =  '%'//'%' : 전체  1.입금(고객) 2.출금(고객) 
                    block['cur_cd'] =   '%'//'%' : 전체 
                    block['req_cnt'] = 50

                }, function (queryData) {
                    if (queryData != null) {
                        self.tableData = queryData['queryObj']['OutBlock2'];
                        //self.infiniteId = +new Date();
                    } else {
                        // 전문 에러 언어팩 적용
                        const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                        if (errorData.trName != "dw531") return

                        self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                            dangerouslyUseHTMLString: true,
                            confirmButtonText: self.$t('sys_err.a001')
                        });
                    }
                });

                self.curCdList = self.coninList();

            })
        }

    }
};

</script>
