<template>
    
    <div class="breakdown_wrap">
        <div class="top_search_wrap">
            <div class="date_picker">
                <span class="picker">
                    <el-date-picker v-model="frDt" type="date" placeholder="시작일" format="yyyy.MM.dd" :picker-options="frDtValid" class="inp_m" @change="startDateChange"></el-date-picker>
                </span>
                <span class="mark">~</span>
                <span class="picker">
                    <el-date-picker v-model="toDt" type="date" placeholder="종료일" format="yyyy.MM.dd" :picker-options="toDtValid" class="inp_m" @change="endDateChange"></el-date-picker>
                </span>
            </div>
            <div class="select_area">
                <el-select v-model="selectedtradeType" @change="tradeTypeChange" class="sel_m" popper-class="m_style">
                    <el-option v-for="item in tradeTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        
        <el-table class="breakdown_table" :data="tableData"  :empty-text="$t('m_wallet_log.a023')" >  <!-- 최근 2일 동안 입출금내역이 없습니다. -->
            <el-table-column min-width="30">
                <template slot-scope="scope">
                    <div class="data">
                        <p>{{scope.row.trd_dt | dateFormatYYMMDD}}</p>
                        <p>{{scope.row.trd_tm | dateFormatHHMMSS}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="state">
                <template slot-scope="scope">
                    <div class="float_cont">
                        <!-- 완료시 class completion 추가 (입금완료,출금완료) -->
                        <p class="left_txt" v-if="scope.row.cur_cd === 'KRW' && scope.row.dpwd_tp === '1' && scope.row.trd_stat === '1'">{{$t('m_wallet_log.a024')}}</p>  <!--입금확인중 -->
                        <p class="left_txt completion" v-if="scope.row.cur_cd === 'KRW' && scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'">{{$t('m_wallet_log.a015')}}</p> <!-- 입금완료-->
                        <p class="left_txt" v-if="scope.row.cur_cd === 'KRW' && scope.row.dpwd_tp === '1' && scope.row.trd_stat === '9'">{{$t('m_wallet_log.a017')}}</p> <!-- 입금취소-->
            
                        <p class="left_txt" v-if="scope.row.cur_cd === 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'">{{$t('m_wallet_log.a021')}}</p> <!-- 출금중 -->
                        <p class="left_txt completion" v-if="scope.row.cur_cd === 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'">{{$t('m_wallet_log.a018')}}</p> <!--출금완료  -->
                        <p class="left_txt" v-if="scope.row.cur_cd === 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '9'">{{$t('m_wallet_log.a019')}}</p> <!--출금취소 -->
            
                        <p class="left_txt" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '1' && (scope.row.trd_stat === '1' || scope.row.trd_stat === '3')">{{$t('m_wallet_log.a016')}}</p> <!-- 입금대기-->
                        <p class="left_txt completion" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '1' && scope.row.trd_stat === '2'">{{$t('m_wallet_log.a015')}}</p> <!--입금완료 -->
                        <p class="left_txt" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '1' && scope.row.trd_stat === '9'">{{$t('m_wallet_log.a017')}}</p> <!-- 입금취소-->
            
                        <p class="left_txt" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1'">{{$t('m_wallet_log.a020')}}</p> <!-- 출금대기중-->
                        <p class="left_txt" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '3'">{{$t('m_wallet_log.a021')}}</p> <!-- 출금중-->
                        <p class="left_txt completion" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '2'">{{$t('m_wallet_log.a018')}}</p> <!--출금완료 -->
                        <p class="left_txt" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '9'">{{$t('m_wallet_log.a019')}}</p> <!-- 출금취소-->
                        <p class="left_txt completion" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === 'E'">{{$t('m_wallet_log.a037')}}</p> <!-- 잔고부족-->
            
                        <p class="right_txt">
                            {{ scope.row.cur_cd === 'KRW' ? format(scope.row.mov_trd_amt) : formatCoin( scope.row.mov_trd_amt) }}  <span class="s_txt">{{ scope.row.cur_cd }}</span>

                            <!-- 암호화폐// -->
                            <span class="block_s_txt" v-if="scope.row.cur_cd !== 'KRW'">≈{{format(scope.row.krw_trd_amt)}} KRW</span>
                            <!-- //암호화폐 -->
                        </p>
                    </div>

                    <!--  1 : 외부 , 2: 내부 , R : 관리자 , E : 이벤트   (dpwd_trgt_tp)-->
                    <!-- 원화 --> 
                    <div v-if="scope.row.cur_cd === 'KRW' &&  scope.row.dpwd_trgt_tp === 'R'">({{$t('m_wallet_log.a035')}})</div>
                    <div  v-if="scope.row.cur_cd === 'KRW' &&  scope.row.dpwd_trgt_tp === 'E'">({{$t('m_wallet_log.a036')}})</div>

                    <!-- 암호화폐// -->
                    <div class="txid" v-if="scope.row.cur_cd !== 'KRW' &&  scope.row.dpwd_trgt_tp === 'R' ">({{$t('m_wallet_log.a035')}})</div>
                    <div class="txid" v-if="scope.row.cur_cd !== 'KRW' &&  scope.row.dpwd_trgt_tp === 'E' ">({{$t('m_wallet_log.a036')}})</div>
                    <div class="txid" v-if="scope.row.cur_cd !== 'KRW' && (scope.row.dpwd_trgt_tp === '1' || scope.row.dpwd_trgt_tp === '2') && scope.row.trd_stat !== '1'">
                        TXID: <el-button type="text">{{ scope.row.txid }}</el-button>
                    </div>
                     <!-- //암호화폐 -->

                    <div class="btn" v-if="scope.row.cur_cd !== 'KRW' && scope.row.dpwd_tp === '2' && scope.row.trd_stat === '1' && (scope.row.dpwd_trgt_tp === '1' || scope.row.dpwd_trgt_tp === '2') ">
                        <el-button class="cancel_btn" @click="withdrawCancel(scope.row.trd_dt , scope.row.trd_tm)" >{{$t('m_wallet_log.a019')}}</el-button>  <!-- 출금취소  -->
                    </div>

                </template>
            </el-table-column>
            <infinite-loading :identifier="infiniteId" slot="append" @infinite="infiniteHandler" :force-use-infinite-wrapper="forceUseinfinite"></infinite-loading>

        </el-table>

        <!-- 컴펌창 -->
        <el-dialog :title="$t('m_wallet_log.a019')" :visible.sync="openComfirmPop" width="300px">  <!-- 출금취소  -->
            <div>
                 {{$t('m_wallet_log.a027')}}<!-- 출금 신청을 취소하시겠습니까?  -->
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="openComfirmPop = false;">{{$t('m_wallet_log.a026')}}</el-button>  <!-- 취소 -->
                <el-button type="primary" @click="comfirmPopOkay">{{$t('m_wallet_log.a025')}}</el-button> <!-- 확인 -->
            </span>
        </el-dialog>

        <!-- 확인창 -->
        <el-dialog :title="$t('m_wallet_log.a030')" :visible.sync="openOkayPop" width="300px">   <!-- 출금취소 접수 -->
            <div v-html="$t('m_wallet_log.a028')">
                <!-- 출금취소가 접수되었습니다.<br>
                취소내역은 입출금내역에서 확인 가능합니다. -->
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="openOkayPop = false">{{$t('m_wallet_log.a025')}}</el-button> <!-- 확인 -->
            </span>
        </el-dialog>

        <!-- 확인창 -->
        <el-dialog :title="$t('m_wallet_log.a030')" :visible.sync="openOkayCompletePop" width="300px">  <!-- 출금취소 접수 -->
            <div>
                {{$t('m_wallet_log.a029')}} <!-- 이미 출금 진행이 완료된 내역입니다. -->
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="openOkayCompletePop = false">{{$t('m_wallet_log.a025')}}</el-button>  <!-- 확인 -->
            </span>
        </el-dialog>
   
    </div>


</template>
<script>
    import BankTransactionHistory from '../../../bank/BankTransactionHistory.vue';
    export default {
        extends : BankTransactionHistory
    };
</script>