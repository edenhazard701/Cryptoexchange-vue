<template>
    <section>
    <div class="withdrawal_wrap">
        
        <!-- 출금 서비스 준비중// -->
        <div class="no_info_cont" v-if="getAdminWalletState !== '2'">
            <div class="info_txt">
                <p class="top_txt">{{$t('m_wallet_out.a003' , [getMyAssetstatusInfoCurCd])}}</p>   <!-- [{{ getMyAssetstatusInfoCurCd }}] 출금 서비스 준비중 입니다. -->
                <p class="btm_txt">{{$t('m_wallet_out.a004')}}<br><span v-html="$t('m_wallet_out.a005')"></span></p>
            </div>
        </div>

        <!-- 시작 : 출금 서비스 불가 안내 -->
        <div class="no_info_cont" v-else-if="getMyAssetstatusInfoCurCd  === 'KRW' &&  getInfoUser.bact_auth_tp !== '1'">
            <div class="top_certified">
                <p class="txt" v-html="$t('m_wallet_out.a001')"></p> <!-- 금융사고 예방과 투명한 거래환경 조성을 위해<br>실명확인 계좌 인증 후 사용이 가능합니다  -->
                <!--  인증센터 바로가기  -->
                <!-- <el-button class="btn_m_sy01"  @click="goToCertifyCenterMobile">{{$t('m_wallet_out.a002')}}</el-button>   -->
            </div>
        </div>

        <!-- 시작 : 출금  -->
        <div v-else class="withdrawal_step">
            <div class="retention_wrap" v-show="withdrawStep1">
                <div class="withdrawal_cont">
                    <div class="retention_cont"  >
                        <div class="retention_top_txt">
                            <p class="tit">{{$t('m_wallet_out.a073',[getMyAssetstatusInfo.cur_cd ])}}</p>   <!--  {{ getMyAssetstatusInfo.cur_cd }} 총 보유 -->
                            <p class="sum"><span class="number">{{getMyAssetstatusInfo.cur_cd === 'KRW' ? format(getMyAssetstatusInfo.cur_bal) : formatCoin(getMyAssetstatusInfo.cur_bal) }}</span> {{ getMyAssetstatusInfo.cur_cd }}</p>
                        </div>
                        <div class="white_bg_cont">
                            <ul>
                                <li>
                                    <p class="left_tit">{{$t('m_wallet_out.a074')}}  <!--거래대기 -->
                                        <span class="btm_s_txt">(<router-link class="link" to="/investment">{{$t('m_wallet_out.a075')}}</router-link> + <router-link class="link" to="/bank/history">{{$t('m_wallet_out.a076')}}</router-link>)</span> <!-- 미체결 /입출금대기 -->
                                    </p>
                                    <p class="right_sum">{{ getMyAssetstatusInfo.cur_cd === 'KRW' ? format(getMyAssetstatusInfo.tot_hold_qty) : formatCoin(getMyAssetstatusInfo.tot_hold_qty) }} <span class="s_txt">{{ getMyAssetstatusInfo.cur_cd }}</span></p>
                                </li>
                                <li>
                                    <p class="left_tit">{{$t('m_wallet_out.a077')}}  <!-- 사용가능--><el-button class="text-btn question-btn" v-on:click="availableDialogVisible = true"><i class="el-icon-question"></i></el-button></p>
                                    <p class="right_sum">{{ getMyAssetstatusInfo.cur_cd === 'KRW' ? format(getMyAssetstatusInfo.widr_able_qty) : formatCoin(getMyAssetstatusInfo.widr_able_qty) }}  <span class="s_txt">{{ getMyAssetstatusInfo.cur_cd }}</span></p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 원화// -->
                    <div v-if="getMyAssetstatusInfoCurCd  === 'KRW'" class="withdrawal_bullet_cont">
                        <strong class="bullet-tit-type01">{{$t('m_wallet_out.a006')}} <!--KRW 출금계좌 --></strong>
                        <table class="tbody_table_sy">
                            <colgroup>
                                <col style="width:25%;">
                                <col>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th scope="row">{{$t('m_wallet_out.a007')}}<!--계좌번호--></th>
                                    <td>{{getMyAccountData.acct_no | accountFilter }}({{getMyAccountData.bank_nm | bankNameFilter}})</td>
                                </tr>
                                <tr>
                                    <th scope="row">{{$t('m_wallet_out.a008')}} <!--예금주--></th>
                                    <td>{{getInfoUser.user_nm | nameFilter}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- //원화 -->
                    <!-- 암호화폐// -->
                    <p class="btm_fix_txt" v-if="getMyAssetstatusInfoCurCd  !== 'KRW'">{{$t('m_wallet_out.a078')}}<!--출금하시려면 아래 버튼을 눌러 진행해주세요.--></p>
                    <!-- //암호화폐 -->
                </div>
                <div class="btm_fix_btn">
                    <el-button class="b_success_btn" @click="withdrawStep1button">{{$t('m_wallet_out.a079')}} <!--다음 --></el-button>
                </div>
            </div>
            <!-- //보유자산 -->

            <!-- 출금주소입력(암호화폐)// -->
            <div class="virtual_currency_search" v-show="withdrawStep2">
                <div class="withdrawal_cont">
                    <div class="top_search">
                        <strong class="bullet-tit-type01">{{$t('m_wallet_out.a043')}}<!--출금주소 입력--></strong>
                        <!--검색전//-->
                        <div class="inp_area">
                            <el-input class="inp_m" :placeholder="$t('m_wallet_out.a045' , [getMyAssetstatusInfoCurCd])" @click.native="walletAddressShow" v-model="withDrawWalletAddress"></el-input>  <!-- getMyAssetstatusInfoCurCd 주소 직접입력 또는 선택  -->
                            <!--<div style="color : red;"  v-show="walletAddressValidationMobile" >{{walletAddressValidationMobileText}}</div> -->
                            <!--검색//-->
                            <div class="search_area" v-show="selectAddressWalltState" >
                                <div class="table">
                                    <el-table :data="searchData" :show-header="false" :empty-text="$t('m_wallet_out.a052')"> <!-- 등록된 주소가 없습니다  -->
                                        <el-table-column prop="title">
                                            <template slot-scope="scope">
                                                <span class="title">{{ scope.row.walt_nm }}</span>
                                                <span class="src" @click="withdrawWalletAddressCopy(scope.row)">{{ scope.row.walt_id }} <span class="add_src" v-if="scope.row.sub_info !== ''" >{{ scope.row.sub_info }}</span></span>
                                                <span class="btn"><el-button class="delete" @click="walletAddressDelete(scope.row)" ></el-button></span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <el-button class="plus_btn" icon="el-icon-plus" v-on:click="addAddressBookDialogVisible = true">{{$t('m_wallet_out.a051')}} <!--주소 등록 --></el-button>
                            </div>
                            <!--//검색-->
                        </div>
                        <!--//검색전-->
                        <div style="color : red;"  v-show="walletAddressValidationMobile" >{{walletAddressValidationMobileText}}</div> 

                        <!--검색완료-->
                        <!--<div class="select_completion_box" >
                            <p class="select_txt">
                                <span class="title">빗썸 거래소123</span>
                                <span class="src">3JsozjmDKt6rtpAsJgVex5Dsb2hdquxBuP</span>
                            </p>
                        </div> -->
                        <!--//검색완료-->
                        <div class="check_right"><el-checkbox v-model="is2ndAddress"> {{$t('m_wallet_out.a047')}} <!--추가 주소 사용--></el-checkbox></div>
                    </div>

                    <!--추가주소 입력//-->
                    <div class="add_area" v-if="is2ndAddress">
                        <el-input class="inp_m" :placeholder="$t('m_wallet_out.a080')" v-model="destinationCode" ></el-input>  <!--추가 주소 입력 -->
                        <div class="gray_box">
                            <p class="tit">{{$t('m_wallet_out.a048')}}  <!--추가 주소 (도움말) --></p> 
                            <ul class="list">
                                <li class="dot">{{$t('m_wallet_out.a049')}} <!--일부 암호화폐는 출금시 데스티네이션 태그 또는 추가주소를 입력해야 정상적으로 출금이 완료됩니다. -->
                                    <span class="reference">{{$t('m_wallet_out.a050')}} <!--※주소 복사 붙여넣기시 제대로 입력이 되지 않을 수 있습니다. 지갑 주소와 추가주소는 꼭 다시 한번 확인해 주세요. --></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--//추가주소 입력-->
                </div>
                <div class="btm_fix_btn">
                    <el-button class="b_success_btn" @click="withdrawStep2button">{{$t('m_wallet_out.a079')}}  <!--다음 --></el-button>
                </div>
            </div>
            <!-- //출금주소입력(암호화폐) -->

            <!-- 출금금액// -->
            <div class="amount_wrap"  v-show="withdrawStep3">
                <div class="withdrawal_cont">
                    <table class="tbody_table_sy">
                        <colgroup>
                            <col style="width:130px;">
                            <col>
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row">{{$t('m_wallet_out.a009')}}<!-- 1회 출금 한도 --></th>
                                <td class="al_right black">{{ getMyAssetstatusInfo.cur_cd === 'KRW' ? format(withdrawInfo.once_limt) : formatCoin(withdrawInfo.once_limt) }} <span class="gray_txt">KRW</span></td>
                            </tr>
                            <tr>
                                <th scope="row">{{$t('m_wallet_out.a010')}}<!-- 1일 출금 잔여 한도 --> </th>
                                <td class="al_right black">{{ getMyAssetstatusInfo.cur_cd === 'KRW' ? format(withdrawInfo.limt_bal) : formatCoin(withdrawInfo.limt_bal) }} <span class="gray_txt">KRW</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="withdrawal_bullet_cont">
                        <strong class="bullet-tit-type01">{{$t('m_wallet_out.a011')}}<!-- 출금 금액 --> <span class="gray_txt">({{ getMyAssetstatusInfo.cur_cd }})</span></strong>
                        <div class="inp_btn_wrap">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
                                <el-form-item  prop="withdrawAmount" v-if="getMyAssetstatusInfo.cur_cd === 'KRW'"><!-- 출금금액(KRW) -->
                                    <el-input  type="number" v-model="ruleForm.withdrawAmount" class="inp_m" :placeholder="$t('m_wallet_out.a012')" @keyup.native="onlyNumber"></el-input> <!-- 출금 금액을 입력해주세요. -->
                                    <el-button class="btn_m_sy01" @click="maxAmountPrice"> {{$t('m_wallet_out.a013')}}<!-- 최대 --></el-button>
                                </el-form-item>

                                <el-form-item  prop="withdrawAmountWallet" v-if="getMyAssetstatusInfo.cur_cd !== 'KRW'" ><!-- 출금금액(KRW) -->
                                  <div style="width: 80%;padding-right: 0px;">
                                    <el-input  type="number" v-model="ruleForm.withdrawAmountWallet" class="inp_m" :placeholder="$t('m_wallet_out.a012')"></el-input> <!-- 출금 금액을 입력해주세요. -->
                                    <span style="float: right;line-height: 15px;">≈{{ withdrawKRWStr }} KRW</span>
                                  </div>
                                  <div style="width: 20%">
                                    <el-button class="btn_m_sy01" @click="maxAmountPriceWallet"> {{$t('m_wallet_out.a013')}}<!-- 최대 --></el-button>
                                  </div>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="btm_total_sum">     
                        <ul>
                            <li>
                                <p class="left_tit">{{$t('m_wallet_out.a014')}}<!--수수료--></p>
                                <p class="right_sum" v-if="getMyAssetstatusInfo.cur_cd === 'KRW'">{{ format(withdrawInfo.fee) }}<span class="gray_txt">{{$i18n.locale === 'en' ? 'WON': '원'}}({{ (getMyAssetstatusInfo.cur_cd) }})</span></p>
                                <p class="right_sum" v-if="getMyAssetstatusInfo.cur_cd !== 'KRW'">{{ withdrawInfo.fee }}<span class="gray_txt"> {{ getMyAssetstatusInfo.cur_cd }}</span></p>
                            </li>
                            <li>
                                <p class="left_tit">{{$t('m_wallet_out.a015')}}<!--총 출금--></p>
                                <p class="right_sum" v-if="getMyAssetstatusInfo.cur_cd === 'KRW'"><span class="num">{{totalAmountPrice}}</span><span class="gray_txt">  {{$i18n.locale === 'en' ? 'WON': '원'}}({{ getMyAssetstatusInfo.cur_cd }})</span></p>
                                <p class="right_sum" v-if="getMyAssetstatusInfo.cur_cd !== 'KRW'"><span class="num">{{totalAmountPriceWallet}}</span><span class="gray_txt"> {{ getMyAssetstatusInfo.cur_cd }}</span></p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="btm_fix_btn">
                    <el-button class="b_success_btn" @click="withdrawStep3button">{{$t('m_wallet_out.a079')}}<!-- 다음 --></el-button>
                </div>
            </div>
            <!-- //출금금액 -->

            <!-- sms인증// -->
            <div class="certified_wrap" v-show="withdrawStep4">
                <div class="withdrawal_cont">
                    <p class="withdrawal_top_txt">{{$t('m_wallet_out.a016')}} <!--회원님의 안전한 자산 출금을 위해 가입시 등록하신 휴대폰 번호로 인증번호를 발송해드립니다.--></p>
                    <div class="bullet_form_wrap">
                        <div class="cont">
                            <div class="bullet_question_tit">
                                <strong class="bullet-tit-type01">{{$t('m_wallet_out.a017')}}<!--SMS 인증하기--></strong>
                                <el-button class="text-btn question-btn" v-on:click="withdrawalSmsDialogVisible = true"><i class="el-icon-question"></i></el-button>
                            </div>
                            <div class="inp_btn_wrap certified">
                                <el-input type="number" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="6" max="999999" class="inp_m" :placeholder="$t('m_wallet_out.a018')"  v-model="certifiNum" :disabled="smsResultOk"></el-input> <!--인증번호  -->
                                <span class="count">{{ remaining | toMMSS }}</span> <!-- 카운트 -->
                                <!--<el-button class="btn_m_sy01" @click="">인증요청</el-button> -->
                                <el-button v-show="certifiCheck"    @click="requestCertifiNum" class="btn_m_sy01">{{$t('m_wallet_out.a018')}} <!--인증요청--></el-button>
                                <el-button v-show="confirmCheck"    @click="requestCertifiCheck"  :disabled="smsResultOk" class="btn_m_sy01">{{$t('m_wallet_out.a081')}}<!-- 확인 --></el-button>
                                <el-button v-show="reCertifiCheck"  @click="requestCertifiNum" class="btn_m_sy01">{{$t('m_wallet_out.a020')}}<!-- 재요청 --></el-button>
                                <!-- <el-button class="btn_m_sy01" disabled>확인</el-button> --> <!-- 인증완료 버튼 -->
                                <p v-show="smsvalidateMsg" class="completion_txt">{{smsvalidateMessage}}</p> <!-- 인증완료 텍스트 -->
                            </div>
                        </div>
                        <!-- 2021.08.25 OG 보안인증번호, OTP번호 체크 제거 -->
                        <!-- 보안비밀번호-->
                        <!-- <div class="cont" v-if="getInfoUser.secu_auth_tp === '1'">
                            <strong class="bullet-tit-type01">{{$t('m_wallet_out.a019')}}</strong>  -->
                            <!-- 비밀번호 4자리-->
                            <!-- <el-input type="password" autocomplete="new-password" class="inp_m" maxlength="4" :placeholder="$t('m_wallet_out.a021')" v-model="securityNum" ></el-input> 
                            <div v-show="securityNumvalidateMsg" class="validity-error">{{securityNumvalidateMessage}}</div>
                        </div> -->
                        <!-- Google OTP -->
                        <!-- <div class="cont" v-if="getInfoUser.secu_auth_tp === '3'">
                            <strong class="bullet-tit-type01">Google OTP</strong>  -->
                            <!-- OTP 6자리 -->
                            <!-- <el-input type="password" autocomplete="new-password" class="inp_m" :placeholder="$t('m_wallet_out.a082')" maxlength="6" v-model="securityNum" ></el-input> 
                            <div v-show="otpvalidateMsg" class="validity-error">{{otpvalidateMessage}}</div>
                        </div> -->
                    </div>

                    <!-- 원화 주의사항// -->
                    <div class="note_btm_list" v-if="getMyAssetstatusInfoCurCd  === 'KRW'">
                        <p class="tit">{{$t('m_wallet_out.a038')}}<!-- 출금 주의사항 --></p>
                        <ul class="list">
                            <li class="dot">{{$t('m_wallet_out.a039')}}<!-- 거래소에서는 고객님께 SMS 인증번호나 보안비밀번호를 절대 물어보지 않습니다. --></li>
                            <li class="dot">{{$t('m_wallet_out.a040')}}<!--모든 출금건은 관리자 심사를 진행하며, 금융사고 예방을 위해 첫 입금 후 72시간 출금이 제한됩니다. (최초1회)--></li>
                            <li class="dot">{{$t('m_wallet_out.a041')}}<!--은행 점검시간 23:30~12:30에는 KRW 입출금이 불가능 합니다.--></li>
                        </ul>
                    </div>
                    <!-- //원화 주의사항 -->
                    <!-- 암호화폐 주의사항// -->
                    <div class="note_btm_list" v-if="getMyAssetstatusInfoCurCd  !== 'KRW'">
                        <p class="tit">{{$t('m_wallet_out.a038')}}<!-- 출금 주의사항 --></p>
                        <ul class="list">
                            <li class="dot">{{$t('m_wallet_out.a039')}}<!--거래소에서는 고객님께 SMS 인증번호나 보안비밀번호를 절대 물어보지 않습니다.--></li>
                            <li class="dot">{{$t('m_wallet_out.a040')}}<!--모든 출금건은 관리자 심사를 진행하며, 금융사고 예방을 위해 첫 입금 후 72시간 출금이 제한됩니다. (최초1회)--></li>
                            <li class="dot">{{$t('m_wallet_out.a041-0')}}<!--잘못된 지갑주소로 송금하실 경우 복구가 불가능합니다. 출금 주소를 정확히 확인해주세요. --></li>
                        </ul>
                    </div>
                    <!-- //암호화폐 주의사항 -->
                </div>
                <div class="btm_fix_btn">
                    <el-button  v-if="getMyAssetstatusInfo.cur_cd === 'KRW'" class="b_success_btn" :disabled="requestWithdrawState" @click="requestWithdraw" >{{$t('m_wallet_out.a062')}} <!--출금 요청 --></el-button>
                    <el-button  v-if="getMyAssetstatusInfo.cur_cd !== 'KRW'" class="b_success_btn" :disabled="requestWithdrawState" @click="requestWithdrawWallet" >{{$t('m_wallet_out.a062')}}<!--출금 요청 --></el-button>
                </div>
            </div>
            <!-- //sms인증 -->
        </div>
        <!-- 종료 : 출금 -->
    </div>

    <!--dialog 사용가능//-->
    <el-dialog :title="$t('m_wallet_out.a077')" :visible.sync="availableDialogVisible" :close-on-click-modal="false" width="300" center> <!--사용가능 -->
        <div class="destination_txt_cont">
            <ul class="list">
                <li class="dot">{{$t('m_wallet_out.a083')}}<!--사용가능은 실시간 미체결 수량과 출금대기 수량을 뺀 순수 사용가능 및 출금가능 금액 또는 수량을 의미합니다 --></li>
                <li class="star">{{$t('m_wallet_out.a084')}}<!--출금가능 = 총보유 – 거래대기 수량 – 출금대기 수량--></li>
            </ul>
        </div>
        <div slot="footer" class="dialog-footer full_footer">
            <el-button type="primary" @click="availableDialogVisible = false">{{$t('m_wallet_out.a081')}}<!--확인--></el-button>
        </div>
    </el-dialog>
    <!--//dialog-->

    <!--dialog BTC 주소록//-->
    <el-dialog :title="$t('m_wallet_out.a086' , [getMyAssetstatusInfoCurCd])" :visible.sync="addAddressBookDialogVisible" :close-on-click-modal="false" width="300" center>
        <div class="add_address_area">
            <div class="base_inp">
                <el-input class="inp_m" :placeholder="$t('m_wallet_out.a053')" @keyup.native="addWalletName = $event.target.value" v-model="addWalletName"></el-input>
                <el-input class="inp_m" :placeholder="$t('m_wallet_out.a054')" @keyup.native="addWalletAddress = $event.target.value" v-model="addWalletAddress"></el-input>
                <div style="color : red;"  v-show="addWalletAddressValidation" >{{$t('m_wallet_out.a046')}}</div>
            </div>
            <div class="add_check"><el-checkbox  v-model="destinationAddressChk">{{$t('m_wallet_out.a047')}}<!--추가 주소 사용--></el-checkbox></div>
            <div class="add_inp">
                <el-input class="inp_m" :placeholder="$t('m_wallet_out.a080')" v-if="destinationAddressChk" @keyup.native="addWalletAddressDestiCode = $event.target.value" v-model="addWalletAddressDestiCode"></el-input> <!-- 추가 주소 입력 -->
            </div>
        </div>
        <div slot="footer" class="dialog-footer full_footer">
            <el-button type="primary" @click="walletAddressAddComplete">{{$t('m_wallet_out.a055')}}<!--등록--></el-button>
        </div>
    </el-dialog>
    <!--//dialog-->

    <!-- FDS 조회 블랙리스트지갑 -->
    <el-dialog :visible.sync="fdsBlacklistConfirm" width="320px">
        <div>
                 {{fdsBlacklistCaseText}}
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="fdsBlacklistConfirm = false">{{"출금취소"}}</el-button><!--  출금취소  -->
            <el-button type="primary" @click="octaSolutionFdsAPI('02')">{{"출금하기"}}<!-- 출금하기 --></el-button>
        </span>
    </el-dialog>
    
    <!-- 출금 요청 컴펌 창 -->
    <el-dialog :visible.sync="attentionConfirm" width="300px">
        <div>
            {{getMyAssetstatusInfo.cur_cd === 'KRW' ? '원화' : 'COIN'}} {{$t('m_wallet_out.a066', [getMyAssetstatusInfo.cur_cd])}}  <!-- ({{getMyAssetstatusInfo.cur_cd}}) 출금을 진행하시겠습니까? -->
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="attentionConfirm = false">{{$t('m_wallet_out.a085')}} <!--취소 --></el-button>
            <el-button v-if="getMyAssetstatusInfo.cur_cd === 'KRW'" type="primary" @click="withdrawGo">{{$t('m_wallet_out.a081')}} <!--확인 --></el-button>
            <el-button v-if="getMyAssetstatusInfo.cur_cd !== 'KRW'" type="primary" @click="withdrawGoWallet">{{$t('m_wallet_out.a081')}} <!--확인 --></el-button>
        </span>
    </el-dialog>

    <!--dialog SMS 인증하기//-->
    <el-dialog :title="$t('m_wallet_out.a034')" :visible.sync="withdrawalSmsDialogVisible" :close-on-click-modal="false" width="300" center> <!--SMS 인증하기(도움말) -->
        <div class="destination_txt_cont">
            <ul class="list">
                <li class="dot">{{$t('m_wallet_out.a035')}}<!-- 회원가입시 등록된 휴대폰 번호로 인증번호를 보내드립니다. --></li>
                <li class="dot">{{$t('m_wallet_out.a036')}}<!-- 3분 이내 메시지를 받지 못하셨다면 재요청 버튼을 통해 다시 진행해주세요.--></li>
                <li class="dot">{{$t('m_wallet_out.a037')}}<!-- 인증에 어려움을 겪고 계시다면 고객센터로 문의해주세요. -->(<a class="tel" href="tel:1588-5588">1588-5588</a>)</li>
            </ul>
        </div>
        <div slot="footer" class="dialog-footer full_footer">
            <el-button type="primary" @click="withdrawalSmsDialogVisible = false">{{$t('m_wallet_out.a081')}}<!--확인 --></el-button>
        </div>
    </el-dialog>

    <!-- 출금 차단  or  otp  or  휴대폰 번호 확인창 -->
    <el-dialog :visible.sync="withdrawOkayPop" width="300px" :close-on-click-modal="withdrawOkayPopClose">
        <div class="popup-text">
            <span v-html="withdrawOkayPopText"></span>
        </div>
        <span slot="footer" class="dialog-footer">
            <!-- 인증센터 바로가기 -->
            <!-- <el-button v-if="withdrawOkayPopBtnType === 2" @click="withdrawOkayPopFn('goToCertifyCenter')">{{$t('asset_out.a055')}}</el-button> -->
            <el-button type="primary" v-if="withdrawOkayPopBtnType === 1" @click="withdrawOkayPopFn('okay')">확인</el-button>
        </span>
    </el-dialog>


    <!-- 암호화폐 주소록 삭제 창 -->
    <el-dialog :visible.sync="walletAddressDeletePop" width="320px">
        <div>
            {{deleteWalletName}}{{ $t('asset_out.a061') }}  <!-- 선택주소를 삭제 하시겠습니까? -->
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="walletAddressDeleteCancel">{{ $t('asset_out.a078') }}</el-button> <!-- 취소 -->
            <el-button type="primary" @click="walletAddressDeleteComplete">{{ $t('asset_out.a077') }}</el-button> <!-- 확인 -->
        </span>
    </el-dialog>

    </section>
</template>
<script>
    import Withdraw from '../../../bank/Withdraw.vue';
    export default {
        extends : Withdraw,
    };
</script>