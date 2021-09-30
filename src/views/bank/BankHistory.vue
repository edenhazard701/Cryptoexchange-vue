<template>
    <el-container class="BankHistory">
        <el-main class="contents">
            <h1 class="pageTitle">{{$t('asset_in.a011')}}</h1>
            <div class="search">
                <el-row>
                    <el-col class="srch-start">
                        <el-date-picker v-model="frDt" type="date" :placeholder="$t('asset_st.a022')" :picker-options="frDtValid"></el-date-picker> <!-- 시작일 -->
                    </el-col>
                    <el-col class="srch-dash">~</el-col>
                    <el-col class="srch-end">
                        <el-date-picker v-model="toDt" type="date" :placeholder="$t('asset_st.a026')" :picker-options="toDtValid"></el-date-picker> <!-- 종료일 -->
                    </el-col>
                    <el-col class="srch-period">
                        <el-select v-model="period" :placeholder="$t('asset_st.a027')">
                            <el-option v-for="item in periods" :key="item.period" :label="item.label" :value="item.period"></el-option>
                        </el-select>
                    </el-col>
                    <el-col class="srch-part">
                        <el-select v-model="dealType" :placeholder="$t('asset_st.a003')"><!-- 구분 -->
                            <el-option v-for="item in dealTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="srch-label">{{$t('asset_st.a036')}} :</el-col> <!-- 종목 -->
                    <el-col class="srch-sort">
                        <el-autocomplete v-model="moneyType" :fetch-suggestions="querySearch" :placeholder="$t('asset_st.a038')"></el-autocomplete> <!-- 암호화폐 -->
                    </el-col>
                    <el-col class="srch-btn">
                        <el-button type="primary" @click="tableSearch()">{{$t('asset_st.a037')}}</el-button> <!-- 조회 -->
                    </el-col>
                    <el-col class="srch-info">
                        <el-popover placement="bottom-end" :title="$t('asset_st.a039')" width="400" trigger="hover" class="question">   <!-- 입출금내역 유의사항 -->
                            <div class="info">
                                <h2>{{$t('asset_st.a040')}}</h2> <!-- 상태 설명-->
                                <ul>
                                    <li class="dash">{{$t('asset_st.a041')}}</li>      <!-- 입금완료: 관리자 입금 승인이 완료된 내역-->
                                    <li class="dash">{{$t('asset_st.a042')}}</li>           <!-- 입금대기: 관리자 입금 승인 이전의 내역-->
                                    <li class="dash">{{$t('asset_st.a043')}}</li>     <!-- 출금중: 관리자 출금 승인 전의 내역-->
                                    <li class="dash">{{$t('asset_st.a044')}}</li>  <!-- 출금완료: 관리자 출금 승인이 완료된 내역-->
                                    <li class="dash">{{$t('asset_st.a045')}}</li>  <!-- 출금취소: 고객 또는 관리자가 취소한 출금 내역-->
                                </ul>
                                <ul v-html="$t('asset_st.a009')" >
                                    <!-- <li class="etc">암호화폐별 TXID 및 입출금주소는 상태 영역을 클릭하여 확인하실 수 있습니다.</li>
                                    <li class="etc">출금 승인 이전의 출금신청건은 출금취소 버튼을 클릭하여 취소가능합니다.</li> -->
                                </ul>
                            </div>
                            <el-button type="text" slot="reference"><i class="el-icon-question"></i></el-button>
                        </el-popover>
                    </el-col>
                </el-row>
            </div>

            <div class="el-table">
                <div class="el-table__header-wraper">
                    <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
                        <colgroup>
                            <col width="100">
                            <col width="120">
                            <col width="80">
                            <col width="210">
                            <col width="200">
                            <col width="210">
                            <col width="100">
                            <col width="100">
                        </colgroup>
                        <thead>
                            <tr>
                                <th><div class="cell">{{$t('asset_st.a001')}}<!-- 일시 --></div></th>
                                <th><div class="cell">{{$t('asset_st.a002')}}<!-- 자산 --></div></th>
                                <th><div class="cell">{{$t('asset_st.a003')}}<!-- 구분 --></div></th>
                                <th><div class="cell">{{$t('asset_st.a004')}}<!-- 신청금액 --></div></th>
                                <th><div class="cell">{{$t('asset_st.a005')}}<!-- 수수료 --></div></th>
                                <th><div class="cell">{{$t('asset_st.a006')}}<!-- 정산금액 --></div></th>
                                <th><div class="cell">{{$t('asset_st.a007')}}<!-- 상태 --></div></th>
                                <th><div class="cell"></div></th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <el-scrollbar wrap-class="scrollbar-wrapper" :native="false" :class="{'is-scroll': tableData.length > 15}">
                <el-table :data="tableData" :empty-text="$t('asset_st.a021')" stripe  :show-header="false">
                    
                    <el-table-column :label="$t('asset_st.a001')" width="100" align="center">  <!-- 일시 -->
                        <template slot-scope="scope">
                            <span>{{scope.row.trd_dt | dateFormatYYMMDD}}</span><br> 
                            <span>{{scope.row.trd_tm | dateFormatHHMMSS}}</span> 
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('asset_st.a002')" width="120">  <!-- 자산 -->
                        <template slot-scope="scope">
                            <span class="coin-name">{{ scope.row.cur_cd === 'KRW' ? 'KRW' :  $i18n.locale !== 'en' ?  getCoinByCd(scope.row.cur_cd)['cur_kor_nm'] :  getCoinByCd(scope.row.cur_cd)['cur_eng_nm']}}</span><br>
                            <span v-if="scope.row.cur_cd !== 'KRW'" class="symbol unit">{{scope.row.cur_cd}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  :label="$t('asset_st.a003')" width="80" align="center">   <!-- 구분 -->
                        <template slot-scope="scope">
                            <span :class="[scope.row.dpwd_tp === '1' ? 'red' : 'blue']">{{scope.row.dpwd_tp === '1' ? $t('asset_st.a028') : $t('asset_st.a029')}}</span>  <!-- 입금 : 출금 -->
                        </template>
                    </el-table-column>
                    <el-table-column prop="applicationAmount" :label="$t('asset_st.a004')" align="right">   <!-- 신청금액 -->
                        <template slot-scope="scope">
                            {{  scope.row.cur_cd === 'KRW' ? formatKRW(scope.row.mov_trd_amt) : formatCoin(scope.row.mov_trd_amt) }}
                            <span class="unit">{{scope.row.cur_cd}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="commission" :label="$t('asset_st.a005')" width="200" align="right">  <!-- 수수료 -->
                        <template slot-scope="scope">
                            {{ scope.row.cur_cd === 'KRW' ?  formatKRW(scope.row.fee) : formatCoin(scope.row.fee) }}
                            <span class="unit">{{scope.row.cur_cd}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="calcAmount" :label="$t('asset_st.a006')" width="210" align="right">  <!-- 정산금액 -->
                        <template slot-scope="scope">
                            {{ scope.row.cur_cd === 'KRW' ?  formatKRW(scope.row.tot_trd_amt) : formatCoin(scope.row.tot_trd_amt) }}
                            <span class="unit">{{scope.row.cur_cd}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('asset_st.a007')" width="100" align="center">  <!-- 상태 -->
                        <template slot-scope="scope">
                            <el-row v-if="scope.row.cur_cd === 'KRW'">
                                <!--  1 : 외부 , 2: 내부 , R : 관리자 , E : 이벤트   (dpwd_trgt_tp)--> 
                                <!-- 원화 외부 내부 s-->
                                <span v-if="scope.row.dpwd_trgt_tp === '1' || scope.row.dpwd_trgt_tp === '2'">
                                    <span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '1'" class="red">{{$t('asset_st.a030')}}<!--입금확인중--></span> 
                                    <span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'">{{$t('asset_st.a013')}}<!--입금완료--></span>
                                    <span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '9'" class="gray" >{{$t('asset_st.a015')}}<!--입금취소--></span>
                                
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'" class="blue">{{$t('asset_st.a019')}}<!--출금중--></span>
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'">{{$t('asset_st.a016')}}<!--출금완료--></span>
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '9'" class="gray">{{$t('asset_st.a017')}}<!--출금취소--></span>
                                </span>
                                <!-- 원화 외부 내부 e-->

                                <!-- 원화 관리자 s-->
                                <span v-if="scope.row.dpwd_trgt_tp === 'R'">
                                    <span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '1'" class="red">{{$t('asset_st.a030')}}<!--입금확인중--></span> 
                                    <span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'">{{$t('asset_st.a013')}}<!--입금완료--></span>
                                    <span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '9'" class="gray" >{{$t('asset_st.a015')}}<!--입금취소--></span>
                                
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'" class="blue">{{$t('asset_st.a019')}}<!--출금중--></span>
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'">{{$t('asset_st.a016')}}<!--출금완료--></span>
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '9'" class="gray">{{$t('asset_st.a017')}}<!--출금취소--></span>
                                    <br> ({{$t('asset_st.a048')}}) 
                                </span>
                                <!-- 원화 관리자 e-->

                                <!-- 원화 이벤트 s-->
                                <span v-if="scope.row.dpwd_trgt_tp === 'E'">
                                    <span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '1'" class="red">{{$t('asset_st.a030')}}<!--입금확인중--></span> 
                                    <span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'">{{$t('asset_st.a013')}}<!--입금완료--></span>
                                    <span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '9'" class="gray" >{{$t('asset_st.a015')}}<!--입금취소--></span>
                                
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'" class="blue">{{$t('asset_st.a019')}}<!--출금중--></span>
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'">{{$t('asset_st.a016')}}<!--출금완료--></span>
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '9'" class="gray">{{$t('asset_st.a017')}}<!--출금취소--></span>
                                    <br>({{$t('asset_st.a049')}})
                                </span>
                                <!-- 원화 이벤트 e-->
                            </el-row>
                            <el-row v-else>
                                <!-- 암호화 화폐 외부 내부 s-->
                                <span v-if="scope.row.dpwd_trgt_tp === '1' || scope.row.dpwd_trgt_tp === '2'">
                                    <span v-if="scope.row.dpwd_tp === '1' && (scope.row.trd_stat === '1' || scope.row.trd_stat === '3')" class="red">{{$t('asset_st.a014')}}}<!--입금대기--></span>
                                    <el-button v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'" @click="paymentCompleted(scope.row.dpwd_tp ,scope.row.txid ,scope.row.oppt_sub_info, scope.row.oppt_walt_id , scope.row.info_url)">{{$t('asset_st.a013')}}<!--입금완료--></el-button>
                                    <span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '9'" class="blue">{{$t('asset_st.a015')}}<!--입금취소--></span>
                                
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'" class="blue">{{$t('asset_st.a018')}}<!--출금대기중--></span>
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '3'" class="blue">{{$t('asset_st.a019')}}<!--출금중--></span>
                                    <el-button v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'" @click="paymentCompleted(scope.row.dpwd_tp ,scope.row.txid ,scope.row.oppt_sub_info, scope.row.oppt_walt_id , scope.row.info_url)">{{$t('asset_st.a016')}}<!--출금완료--></el-button>
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '9'" class="gray">{{$t('asset_st.a017')}}<!--출금취소--></span>
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === 'E'" class="gray">{{$t('asset_st.a050')}}<!--잔고부족--></span>
                                </span>
                                <!-- 암호화 화폐 외부 내부  e-->

                                <!-- 암호화 화폐 관리자 s-->
                                <span v-if="scope.row.dpwd_trgt_tp === 'R'">
                                    <span v-if="scope.row.dpwd_tp === '1' && (scope.row.trd_stat === '1' || scope.row.trd_stat === '3')" class="red">{{$t('asset_st.a014')}}}<!--입금대기--></span>
                                    <span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'" >{{$t('asset_st.a013')}}<!--입금완료--></span>
                                    <span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '9'" class="blue">{{$t('asset_st.a015')}}<!--입금취소--></span>
                                
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'" class="blue">{{$t('asset_st.a018')}}<!--출금대기중--></span>
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '3'" class="blue">{{$t('asset_st.a019')}}<!--출금중--></span>
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'" >{{$t('asset_st.a016')}}<!--출금완료--></span>
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '9'" class="gray">{{$t('asset_st.a017')}}<!--출금취소--></span>
                                    <br>  ({{$t('asset_st.a048')}})  
                                </span>
                                <!-- 암호화 화폐 관리자  e-->

                                <!-- 암호화 화폐 이벤트 s-->
                                <span v-if="scope.row.dpwd_trgt_tp === 'E'">
                                    <span v-if="scope.row.dpwd_tp === '1' && (scope.row.trd_stat === '1' || scope.row.trd_stat === '3')" class="red">{{$t('asset_st.a014')}}}<!--입금대기--></span>
                                    <span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'" >{{$t('asset_st.a013')}}<!--입금완료--></span>
                                    <span v-if="scope.row.dpwd_tp === '1' && scope.row.trd_stat === '9'" class="blue">{{$t('asset_st.a015')}}<!--입금취소--></span>
                                
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'" class="blue">{{$t('asset_st.a018')}}<!--출금대기중--></span>
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '3'" class="blue">{{$t('asset_st.a019')}}<!--출금중--></span>
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'" >{{$t('asset_st.a016')}}<!--출금완료--></span>
                                    <span v-if="scope.row.dpwd_tp === '2' && scope.row.trd_stat === '9'" class="gray">{{$t('asset_st.a017')}}<!--출금취소--></span>
                                    <br>({{$t('asset_st.a049')}})
                                </span>
                                <!-- 암호화 화폐 이벤트 e-->
                            </el-row> 
                        </template>
                    </el-table-column>
                    <el-table-column label="" width="100" align="center">
                        <template slot-scope="scope">
                            <el-button @click="withdrawCancel(scope.row.trd_dt , scope.row.trd_tm)" v-if="scope.row.cur_cd !== 'KRW' &&  (scope.row.dpwd_trgt_tp === '1' || scope.row.dpwd_trgt_tp === '2') && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'" type="plain" size="small">{{$t('asset_st.a017')}} <!--출금취소 --></el-button>   
                        </template>
                    </el-table-column>
                    <infinite-loading :identifier="infiniteId" slot="append" @infinite="infiniteHandler" force-use-infinite-wrapper=".scrollbar-wrapper"></infinite-loading>
                </el-table>
            </el-scrollbar>

            <!-- 상태 창 -->
            <!-- 입금 -->
            <el-dialog title="" :visible.sync="depositStatusPop" width="580px" class="status-pop">
                <el-row>
                    <el-col class="label">TXID</el-col>
                    <el-col class="value" v-if="coinWallet.info_url === ''" >
                      <div class="address">{{coinWallet.txID}}</div>
                    </el-col>
                    <el-col class="value" v-if="coinWallet.info_url !== ''" @click.native="openCurCdUrl(coinWallet.txID, coinWallet.info_url)">
                      <div class="address">{{coinWallet.txID}}</div>
                    </el-col>
                </el-row>
                <el-row v-if="coinWallet.destiTag !== ''">
                    <el-col class="label">Destination Tag</el-col>
                    <el-col class="value">
                      <div class="address">{{coinWallet.destiTag}}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="label">{{$t('asset_st.a008')}}<!--입금주소--></el-col>
                    <el-col class="value">
                      <div class="address">{{coinWallet.walletAddress}}</div>
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer"></span>
            </el-dialog>
            <!-- 출금 -->
            <el-dialog title="" :visible.sync="withdrawStatusPop" width="580px" class="status-pop">
                <el-row>
                    <el-col class="label" >TXID</el-col>
                    <el-col class="value" v-if="coinWallet.info_url === ''" >
                      <div class="address">{{coinWallet.txID}}</div>
                    </el-col>
                    <el-col class="value" v-if="coinWallet.info_url !== ''" @click.native="openCurCdUrl(coinWallet.txID, coinWallet.info_url)">
                      <div class="address">{{coinWallet.txID}}</div>
                    </el-col>
                </el-row>
                <el-row v-if="coinWallet.destiTag !== ''">
                    <el-col class="label">Destination Tag</el-col>
                    <el-col class="value">
                      <div class="address">{{coinWallet.destiTag}}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="label">{{$t('asset_st.a031')}}</el-col>  <!-- 출금주소 -->
                    <el-col class="value">
                      <div class="address">{{coinWallet.walletAddress}}</div>
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer"></span>
            </el-dialog>

            <!-- 컴펌창 -->
            <el-dialog :title="$t('asset_st.a017')" :visible.sync="openComfirmPop" width="400px">   <!-- 출금취소 -->
                <div> 
                    {{$t('asset_st.a024')}}        <!--  출금 신청을 취소하시겠습니까?   --> 
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="openComfirmPop = false;">{{$t('asset_st.a033')}}</el-button>  <!--  취소  --> 
                    <el-button type="primary" @click="comfirmPopOkay">{{$t('asset_st.a032')}}</el-button>  <!-- 확인  --> 
                </span>
            </el-dialog>

            <!-- 확인창 -->
            <el-dialog :title="$t('asset_st.a046')" :visible.sync="openOkayPop" width="400px">   <!--  출금취소 접수  --> 
                <div v-html="$t('asset_st.a025')">
                    <!--  출금취소가 접수되었습니다. <br> --> 
                    <!--  취소내역은 입출금내역에서 확인 가능합니다.    --> 
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="openOkayPop = false">{{$t('asset_st.a032')}}</el-button>     <!-- 확인  -->
                </span>
            </el-dialog>
            <!-- 확인창 -->
            <el-dialog :title="$t('asset_st.a046')" :visible.sync="openOkayCompletePop" width="400px">        <!--  출금취소 접수    --> 
                <div>
                    {{$t('asset_st.a034')}}                  <!--   이미 출금 진행이 완료된 내역입니다.      --> 
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="openOkayCompletePop = false">{{$t('asset_st.a032')}}</el-button>  <!-- 확인  -->
                </span>
                </span>
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script>
import Vue from 'vue';
import moment from 'moment'
import { mapGetters} from 'vuex';
import InfiniteLoading from 'vue-infinite-loading'

export default {
 
    data () {

        
        return {
            tableDataRow : 30,
            frDt: '',
            toDt: '',
            frDtValid: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },

            period: '1',
            openComfirmPop: false,
            openOkayPop: false,
            openOkayCompletePop : false,
            depositStatusPop: false,
            withdrawStatusPop : false,

            dealType: '0',

            searchCoin: [],           //암호화화폐 종목
            moneyType: '',            //종목
            tableData: [],            //입출금내역

            coinWallet : {            //전자지갑 입출금 주소확인
                txID : '',
                destiTag : '',
                walletAddress : '',
                info_url : ''
            },

            cancelDivision  : '',    //가상화폐 출금 : 2
            cancelTrdDt : '',        //출금취소 가상화폐 일자 
            cancelTrdTm : '',        //출금취소 가상화폐 시간 
    
            infiniteId : +new Date()


        };
    },
    methods : {
        /* 종목 선택 */
        querySearch(queryString, cb) {
            var searchCoin = this.searchCoin;
            var results = queryString ? searchCoin.filter(this.createFilter(queryString)) : searchCoin;
            cb(results);
        },
        createFilter(queryString) {
            return (searchCoin) => {
                return (searchCoin.value.toUpperCase().indexOf(queryString.toUpperCase()) === 0);
            };
        },
        coninList(){
            let self = this
            if (self.searchCoin.length > 0) return
            let tempList = []
            self.$socket.sendProcessByName('dw532', function (queryData) {
                var block = queryData.getBlockData('InBlock1')[0];
                block['user_id'] = self.$store.getters.getUserId;
                block['dpwd_tp'] = '%'
            }, function (queryData) {
                if (queryData != null) {
                    let coinList = queryData['queryObj']['OutBlock2'];
                    for (var idx in coinList) {
                        tempList.push({ "value" : coinList[idx].cur_cd })
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

        infiniteHandler($state) {
            let self = this 
            if(self.tableData.length < self.tableDataRow){
                self.tableDataRow = 30
                $state.reset()
                return
            }
            //조회
            self.$socket.sendProcessByName('dw531', function (queryData) {
                var block = queryData.getBlockData('InBlock1')[0];
                self.tableDataRow += 30

                block['user_id'] = self.$store.getters.getUserId  //'BzBdSqav]<' //self.$store.getters.getUserId;
                block['fr_dt'] =   self.frDt.format('yyyyMMdd')  //'20190221' //시작일
                block['to_dt'] =   self.toDt.format('yyyyMMdd')  //'20190222' //종료일
                block['dpwd_tp'] = self.dealType === '0' ? '%' : self.dealType //'%' : 전체  1.입금(고객) 2.출금(고객) 
                block['cur_cd'] =  self.moneyType === '' ? '%' : self.moneyType//'%' : 전체 
                block['req_cnt'] = self.tableDataRow  //%  

            }, function (queryData) {
                console.log(queryData);
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
                    self.tableSearch()                                     //재조회
                    self.openOkayPop = true;                               //출금취소 완료 팝업
                }else{
                    self.tableSearch()                                     //재조회 
                    self.openOkayCompletePop = true                        //이미 출금취소 완료 팝업
                }
            });
            
        },
        paymentCompleted(idx , trid , destTag ,adderss , url) {
            let self = this;
            //초기화
            self.coinWallet.txID = ''
            self.coinWallet.destiTag = ''
            self.coinWallet.walletAddress = ''
            self.coinWallet.info_url = ''
            self.depositStatusPop = false
            self.withdrawStatusPop = false

            //데이터 입력 
            if(idx === '1'){
                self.coinWallet.txID = trid
                self.coinWallet.destiTag = destTag
                self.coinWallet.walletAddress = adderss
                self.coinWallet.info_url = url
                self.depositStatusPop = true
            }else{
                self.coinWallet.txID = trid
                self.coinWallet.destiTag = destTag
                self.coinWallet.walletAddress = adderss
                self.coinWallet.info_url = url
                self.withdrawStatusPop = true
            }
        },
        openCurCdUrl(txid , url){
            let self = this
            let popup = window.open(url+txid)
           
        },
        searchValidChk() {
            let self = this
            // 기간 조회 범위 : 최대 90일
            if ( (self.toDt.getTime() - self.frDt.getTime()) > (1000*60*60*24*90) ) {
                alert("조회 범위는 최대 90일까지 가능합니다.");
                return false;
            }

            // 조회일 기준 1년전 데이터까지만 조회가능
            if ( (Date.now() - self.frDt.getTime()) > (1000*60*60*24*365)) {
                alert("체결내역은 최대 1년까지 조회 가능합니다.");
                return false;
            }
            return true;
        },
        tableSearch(){
            let self = this
            if (!this.searchValidChk()) return;
            //조회
            self.$socket.sendProcessByName('dw531', function (queryData) {
                var block = queryData.getBlockData('InBlock1')[0];

                block['user_id'] = self.$store.getters.getUserId  //'BzBdSqav]<' //self.$store.getters.getUserId;
                block['fr_dt'] =   self.frDt.format('yyyyMMdd')  //'20190221' //시작일
                block['to_dt'] =   self.toDt.format('yyyyMMdd')  //'20190222' //종료일
                block['dpwd_tp'] = self.dealType === '0' ? '%' : self.dealType //'%' : 전체  1.입금(고객) 2.출금(고객) 
                block['cur_cd'] =  self.moneyType === '' ? '%' : self.moneyType//'%' : 전체 
                block['req_cnt'] = '30'

            }, function (queryData) {
                if (queryData != null) {
                    self.tableData = queryData['queryObj']['OutBlock2'];
                    console.log("1111===>",self.tableData)
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
        }

    },
    created() {
        // 기간설정 default 
        let self = this
        self.toDt = new Date();
        self.frDt = new Date();
        self.frDt.setDate(self.frDt.getDate() - 1);
   
    },
    watch: {
        period(value) {
            this.toDt = new Date();
            var frDtObj = new Date(); // default : 당일

            if (value == '7') { // 1주일
                
                frDtObj.setDate(frDtObj.getDate() -7);
            } else if (value == '30') { // 1개월

                frDtObj.setMonth(frDtObj.getMonth() - 1);
            }
            this.frDt = frDtObj;
        }
    },
    mounted(){
        let self = this;
        self.$EventBus.$emit('pc-navi', [
            { label: self.$t('asset_in.a006'), target: 'depositWithdraw' },
            { label: self.$t('asset_in.a011'), target: null }
        ]);

        this.$EventBus.$on('langChange', () => {
            self.$EventBus.$emit('pc-navi', [
                { label: self.$t('asset_in.a006'), target: 'depositWithdraw' },
                { label: self.$t('asset_in.a011'), target: null }
            ]);
        });

        if (self.$store.getters.isSocketConnected) {

            self.searchCoin = self.coninList();

            //조회
            self.$socket.sendProcessByName('dw531', function (queryData) {
                var block = queryData.getBlockData('InBlock1')[0];

                block['user_id'] = self.$store.getters.getUserId  //'BzBdSqav]<' //self.$store.getters.getUserId;
                block['fr_dt'] =   self.frDt.format('yyyyMMdd')  //'20190221' //시작일
                block['to_dt'] =   self.toDt.format('yyyyMMdd')  //'20190222' //종료일
                block['dpwd_tp'] =  '%'//'%' : 전체  1.입금(고객) 2.출금(고객) 
                block['cur_cd'] =   '%'//'%' : 전체 
                block['req_cnt'] = 30

            }, function (queryData) {
                if (queryData != null) {
                    self.tableData = queryData['queryObj']['OutBlock2'];
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

        } else {
            self.$EventBus.$on('socketConnected', () => {

                self.searchCoin = self.coninList();

                //조회
                self.$socket.sendProcessByName('dw531', function (queryData) {
                    var block = queryData.getBlockData('InBlock1')[0];

                    block['user_id'] = self.$store.getters.getUserId  //'BzBdSqav]<' //self.$store.getters.getUserId;
                    block['fr_dt'] =   self.frDt.format('yyyyMMdd')  //'20190221' //시작일
                    block['to_dt'] =   self.toDt.format('yyyyMMdd')  //'20190222' //종료일
                    block['dpwd_tp'] =  '%'//'%' : 전체  1.입금(고객) 2.출금(고객) 
                    block['cur_cd'] =   '%'//'%' : 전체 
                    block['req_cnt'] = 30

                }, function (queryData) {
                    if (queryData != null) {
                        self.tableData = queryData['queryObj']['OutBlock2'];
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

            })
        }
 
    },
    computed : {
        
		...mapGetters(['getCoinByCd']),
	
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
        periods() {
            return [{
                period: '1',
                label: this.$t('asset_st.a010') // '당일'
            }, {
                period: '7',
                label: this.$t('asset_st.a011') // '1주일'
            }, {
                period: '30',
                label: this.$t('asset_st.a012') // '1개월'
            }]
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
        }

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
    beforeDestroy() {
		let self = this
		self.$EventBus.$off('socketConnected'); 
    }
};

</script>