<template>
    <section>
    <div class="deposit_wrap">
        <!-- 시작 : 입금 서비스 불가 암호화폐 -->
        <div v-if="getMyAssetstatusInfoCurCd !== 'KRW' && getAdminWalletState === '0'" class="no_info_cont">
            <!-- 인증센터 바로가기// 
            <div class="top_certified">
                <p class="txt">금융사고 예방과 투명한 거래환경 조성을 위해<br>실명확인 계좌 인증 후 사용이 가능합니다</p>
                <el-button class="btn_m_sy01">인증센터 바로가기</el-button>
            </div>-->
            <!-- //인증센터 바로가기 -->
            
            <!-- 입금 서비스 준비중// -->
            <div class="info_txt" v-html="$t('m_wallet_in.a012' , [getMyAssetstatusInfoCurCd])">
                <!--<p class="top_txt">[{{ getMyAssetstatusInfoCurCd }}] 입금 서비스 준비중 입니다.</p>
                <p class="btm_txt">이용에 불편을 드려 죄송합니다.<br>자세한 문의사항은 <a class="tel" href="tel:1588-5588">1588-5588</a> 고객센터 또는 <el-button type="text">1:1 문의</el-button>를 이용해주세요.</p> -->
            </div>
            <!-- //입금 서비스 준비중 -->
        </div>
        <!-- 종료 : 입금 서비스 불가 암호화폐 -->

        <!-- 원화 입금 모바일 x -->
        <div v-else-if="getMyAssetstatusInfoCurCd === 'KRW'" class="no_info_cont">
            <!-- 입금 서비스 준비중// -->
            <div class="info_txt">
                <p class="top_txt">{{$t('m_wallet_in.a013')}}</p> <!-- [모바일 원클릭 입금 서비스 준비중 입니다.] -->
                <p class="btm_txt" v-html="$t('m_wallet_in.a014')"></p> <!-- PC에서 원화(KRW) 입금 서비스를 이용해주세요<br>이용에 불편을 드려 죄송합니다.<br>자세한 문의사항은 <a class="tel" href="tel:1588-5588">1588-5588</a> 고객센터 또는 <el-button type="text">1:1 문의</el-button>를 이용해주세요. -->
            </div>
        </div>

        <!-- 시작 : 원화 입금 서비스 ( 법인계좌 or 가상계좌 ) -->
        <div v-else-if="depositselect" class="isNotCorporation-deposit-view">
            <!-- 시작 : 법인계좌 -->
            <div v-if="isCorporation">
                <table class="tbody_table_sy">
                    <colgroup>
                        <col style="width:25%;">
                        <col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">입금자명</th>
                            <td>{{depositor}}</td>
                        </tr>
                        <tr>
                            <th scope="row">입금금액</th>
                            <td><el-input type="number" class="inp_m" placeholder="입금금액을 입력해주세요" v-model="depositAmount"></el-input></td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <p class="red_txt">*원활한 입금을 위해 반드시 위의 입금자명과<br>입력하신 입금금액을 아래 계좌로 송금해주세요.</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">계좌번호</th>
                            <td>{{depositAccountNumber}}</td>
                        </tr>
                        <tr>
                            <th scope="row">은행</th>
                            <td>{{bankName}}</td>
                        </tr>
                        <tr>
                            <th scope="row">예금주</th>
                            <td>{{depositAccountHolder}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="btm_center_btn">
                    <el-button class="btn_m_sy01" v-on:click="depositDialogVisible = true">입금요청</el-button>
                </div>
            </div>
            <!-- 종료 : 법인계좌 -->
            
            <!-- 시작 : 가상계좌 -->
            <div v-else>
                <div class="imaginary_top">
                    <p class="table_top_txt">{{ this.$route.query.curCdNmEn }} 충전을 위해 아래 계좌로 입금해 주세요.</p>
                    <table class="tbody_table_sy">
                        <colgroup>
                            <col style="width:25%;">
                            <col>
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row">계좌번호</th>
                                <td>{{depositAccountNumber}}</td>
                            </tr>
                            <tr>
                                <th scope="row">은행</th>
                                <td>{{bankName}}</td>
                            </tr>
                            <tr>
                                <th scope="row">예금주</th>
                                <td>{{depositAccountHolder}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="btm_center_btn">
                        <el-button class="btn_m_sy01">계좌번호 복사하기</el-button>
                    </div>
                </div>
                <div class="imaginary_btm">
                    <strong class="bullet-tit-type01">실명 인증 입출금 계좌 정보</strong>
                    <table class="tbody_table_sy">
                        <colgroup>
                            <col style="width:25%;">
                            <col>
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row">계좌번호</th>
                                <td>1103366***** (신*은행) </td>
                            </tr>
                            <tr>
                                <th scope="row">예금주</th>
                                <td>김*웅</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- 종료 : 가상계좌 -->

            <!-- 시작 : 가상계좌, 법인계좌 공통 -->
            <div class="note_btm_list">
                <p class="tit">입금 전 유의사항</p>
                <ul class="list">
                    <li class="dot">코벡스에서 실명 인증이 완료된 계좌에서 입금해야만 입금 처리가 완료됩니다.</li>
                    <li class="dot">가상계좌 입금 후 반영까지 약 5분 정도 소요 됩니다.</li>
                    <li class="dot">모든 출금건은 관리자 심사를 진행하며, 금융사고 예방을 위해 첫 입금 후 72시간 출금이 제한됩니다. (최초1회)</li>
                </ul>
            </div>
            <!-- 종료 : 가상계좌, 법인계좌 공통 -->
            
        </div>
        <!-- 종료 : 원화 입금 서비스 (법인계좌 or 가상계좌) -->

        <!-- 시작 : 가상화폐 입금 서비스 -->
        <div v-else class="virtual-currency-deposit-view">
            <!--qr//-->
            <div v-if="getMyAssetstatusInfoCurCd !== 'KRW' && getwalletInfo.Wallet_UseState">
              <div class="add_copy">
                  <strong class="bullet-tit-type01"> {{ $t('m_wallet_in.a033' , [getMyAssetstatusInfoCurCd]) }} </strong>  <!-- {{getMyAssetstatusInfoCurCd}} 입금주소 -->
                  <div class="qr_code">
                      <canvas id="canvas"></canvas>
                  </div>
                  <!-- <div class="qr_code"><img :src="require('@/images/@temp/m_qr.png')" alt=""></div> -->
                  <p class="key">{{getwalletInfo.wallet_Id}}</p>
                  <div class="btm_center_btn">
                      <el-button class="btn_m_sy01" @click="copyToClipboard(getwalletInfo.wallet_Id)" >{{$t('m_wallet_in.a034')}}</el-button>  <!-- 주소 복사 -->
                  </div>
              </div>
              <!--//qr-->
              <!--destination//-->
              <div v-if="getMyAssetstatusInfoCurCd !== 'KRW' && getwalletInfo.Wallet_SubInfo !== ''" class="destination_copy">
                  <div class="bullet_question_tit">
                      <strong class="bullet-tit-type01">{{$t('m_wallet_in.a035')}}</strong>  <!--데스티네이션 태그   -->
                      <el-button class="text-btn question-btn" v-on:click="destinationDialogVisible = true"><i class="el-icon-question"></i></el-button>
                  </div>
                  <div class="destination_area">
                      <p class="txt">{{getwalletInfo.Wallet_SubInfo}}</p>
                      <el-button class="btn_m_sy01" @click="copyToClipboard(getwalletInfo.Wallet_SubInfo)">{{$t('m_wallet_in.a036')}} </el-button> <!--복사하기 -->
                  </div>
              </div>
            </div>
            <div v-else>
                <div class="btm_center_btn">
                    <el-button class="btn_m_sy01" @click="getDepositAddress" style="margin-bottom:5px;">{{ $t('m_wallet_in.a050' , [getMyAssetstatusInfoCurCd]) }}</el-button>
                </div>
            </div>
            <!--//destination-->
            <div class="note_btm_list">
                <p class="tit">{{$t('m_wallet_in.a026')}} <!--입금 전 유의사항--></p>
                <ul class="list">
                    <li class="dot" v-html="$t('m_wallet_in.a027' , [getMyAssetstatusInfoCurCd ,getCoinName(getMyAssetstatusInfoCurCd) , getMyAssetstatusInfoCurCd])"></li>  <!--<span class='line'>{0}</span> 입금주소로는 꼭 <span class='line'>{1}({2})</span>만 입금해주세요. -->
                    <li class="dot">{{$t('m_wallet_in.a027-0')}} <!--위 주소로 다른 암호화폐 입금시 블록체인 특성상 절대 복구가 불가능합니다. --></li>
                    <li class="dot">{{$t('m_wallet_in.a028')}} <!--입금내역은 지정한 Confirmation이 발생한 후 입금처리가 완료되며, 고객님의 소중한 자산 보호를 위해 암호화폐별 Confirmation 수는 다를 수 있습니다. --></li>
                    <li class="dot">{{$t('m_wallet_in.a029')}} <!--입금완료는 블록체인 네트워크 사정에 따라 평균 입금 시간보다 지연될 수 있습니다. --></li>
                </ul>
            </div>
        </div>
        <!-- 종료 : 가상화폐 입금 서비스 -->
    </div>

    <!--dialog 3가지만 꼭 확인해주세요//-->
    <el-dialog title="3가지만 꼭 확인해주세요" :visible.sync="depositDialogVisible" :close-on-click-modal="false" width="300" center>
        <div class="deposit_confirm_cont">
            <ul class="list">
                <li class="dot">거래소에서 실명인증이 완료된 계좌에서 입금하셔야 입금처리가 완료됩니다</li>
                <li class="dot">발급된 입금자명은 실제 입금시 입금자명 또는 받는통장메모란에 정확하게 입력해주셔야 합니다</li>
                <li class="dot">화면에 입력하신 금액과 실제 입금금액은 동일하게 입금하셔야 합니다</li>
            </ul>
            <div class="gray_box">
                <ul class="red_tit_list">
                    <li>
                        <strong class="red_tit"># 실명 인증 계좌정보:</strong>
                        <p class="txt">신한은행 110******220 (예금주: 홍길동)</p>
                    </li>
                    <li>
                        <strong class="red_tit"># 입금자명 또는 받는통장 메모:</strong> 
                        <p class="txt">홍길동30284</p>
                    </li>
                </ul>
                <p class="btm_txt">상위 정보와 실 입금정보가 다를 경우<br>입금이 지연됩니다</p>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="info" @click="depositDialogVisible = false">취소</el-button>
            <el-button type="primary" @click="depositDialogVisible = false">확인</el-button>
        </div>
    </el-dialog>
    <!--//dialog-->
    
    <!-- 암호화폐 주소 복사 -->
    <el-dialog :visible.sync="walletAddressCopy" width="300px">
        <span>{{$t('m_wallet_in.a025')}}</span>  <!--주소복사가 완료되었습니다. -->
    </el-dialog>
    <!--//dialog-->

    <!--dialog 데스티네이션 태그//-->
    <el-dialog :title="$t('m_wallet_in.a030')" :visible.sync="destinationDialogVisible" :close-on-click-modal="false" width="300" center>  <!-- 데스티네이션 태그 -->
        <div class="destination_txt_cont">
            <ul class="list">
                <li class="dot" v-thml="$t('m_wallet_in.a031')"> <!--일부 암호화폐는 출금시 데스티네이션 태그 또는<br>추가주소를 입력해야 정상적으로 입금이 완료됩니다. --></li>
                <li class="star" v-thml="$t('m_wallet_in.a032')"> <!--주소 복사 붙여넣기시 제대로 입력이 되지 않을 수<br>있습니다. 지갑 주소와 추가주소는 꼭 다시 한번 확인해<br>주세요. --></li>
            </ul>
        </div>
        <div slot="footer" class="dialog-footer full_footer">
            <el-button type="primary" @click="destinationDialogVisible = false">{{$t('m_wallet_in.a048')}}</el-button>  <!-- 확인  -->
        </div>
    </el-dialog>
    <!--//dialog-->
    
    </section>
</template>
<script>
    import Deposit from '../../../bank/Deposit.vue';
    export default {
        extends : Deposit
    };
</script>
