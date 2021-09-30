<template>
    <section class="Withdraw Deposit">
		<!-- 시작 : 출금 > 출금서비스를 제공하지 않을 때 : 전자지갑연계구분(0.없음, 1.입금, 2.입출금) -->
		<div v-if="getAdminWalletState !== '2'" class="coin-wrap">
			<div class="coin-prepare">
				<span class="coin-name">{{ getMyAssetstatusInfoCurCd }}</span> {{$t('asset_out.a079')}}  <!-- 출금 서비스 준비중입니다. -->
			</div>
			<div class="coin-info" v-html="$t('asset_out.a080')">
				<!-- 이용에 불편을 드려 죄송합니다. <br>
				자세한 문의사항은 1588-5588 고객센터 또는 1:1 문의를 이용해주세요. -->
			</div>
		</div>
		
		<!-- 시작 : 출금 > 계좌 인증을 완료하지 않은 회원 -->
		<div v-else-if="getMyAssetstatusInfoCurCd === 'KRW' && getInfoUser.bact_auth_tp !== '1'" class="not-account-certify-view" >
		<div>{{$t('asset_out.a001')}}<!-- 금융사고 예방과 투명한 거래환경 조성을 위해 실명확인 계좌 인증 후 사용이 가능합니다 --></div>
		<!-- 인증센터 바로가기 -->
		<!-- <el-button @click="goToCertifyCenter">{{$t('asset_out.a002')}}</el-button>  -->
		</div>

		<!-- 시작 : 출금 > 원화일 때 보여지는 부분 : 출금 계좌/예금주 -->
		<div v-else-if="getMyAssetstatusInfoCurCd === 'KRW'" class="krw-deposit-view">
			<div class="deposit-info">
				<el-row>
					<el-col :span="6" class="title">{{$t('asset_out.a004') }} <!-- 출금계좌 --> </el-col>
					<el-col :span="18"> {{getMyAccountData.acct_no | accountFilter }}({{ getMyAccountData.bank_nm | bankNameFilter}})</el-col> <!-- getMyAccountData.bank_nm -->
				</el-row>
				<el-row>
					<el-col :span="6" class="title">{{$t('asset_out.a005') }} <!-- 예금주 --> </el-col>
					<el-col :span="18"> {{getInfoUser.user_nm | nameFilter}}</el-col>
				</el-row>
			</div>

			<div class="withdraw-limit">
				<el-row>
					<el-col :span="6">{{$t('asset_out.a006')}}<!-- 1회 출금 한도 --> </el-col>
					<el-col :span="18">{{format(withdrawInfo.once_limt)}} <span class="unit">KRW</span></el-col>
				</el-row>
				<el-row>
					<el-col :span="6">{{$t('asset_out.a007')}} <!-- 1일 출금 잔여 한도 --> </el-col>
					<el-col :span="18">{{format(withdrawInfo.limt_bal)}} <span class="unit">KRW</span></el-col>
				</el-row>
			</div>

			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="withdraw-form">
				<el-form-item :label="$t('asset_out.a008')" prop="withdrawAmount" class="withdraw-input"><!-- 출금금액(KRW) -->
					<el-input :placeholder="$t('asset_out.a009')" :maxlength=23 v-model="ruleForm.withdrawAmount" class="withdraw-input-obj" :disabled="inputValidationDisabled"></el-input><!-- 출금 금액을 입력해주세요. -->
					<el-button class="append" @click="maxAmountPrice"  :disabled="inputValidationDisabled" >{{$t('asset_out.a066')}}<!-- 최대 --></el-button>
				</el-form-item>

				<el-row class="withdraw-middle">
					<el-col class="label">{{$t('asset_out.a010')}}<!-- 수수료 --></el-col>
					<el-col class="value">{{format(withdrawInfo.fee)}}<span class="unit">  {{$i18n.locale === 'en' ? 'WON': '원'}}(KRW)</span></el-col>
				</el-row>
				<el-row class="withdraw-middle total">
					<el-col class="label">{{$t('asset_out.a011')}}<!-- 총 출금 --></el-col>
					<el-col class="value">{{totalAmountPrice}} <span class="unit">  {{$i18n.locale === 'en' ? 'WON': '원'}}(KRW)</span></el-col>
				</el-row>
				
				<span class="withdraw-info">※ {{$t('asset_out.a018')}}<!-- 회원님의 안전한 자산 출금을 위해 가입시 등록하신 휴대폰 번호로 인증번호를 발송해드립니다. --> </span>
				
				<!-- label="SMS 인증하기" -->
				<el-form-item :label="$t('asset_out.a019')" prop="certifiNum" class="withdraw-input sms-conf"><!-- SMS 인증하기 -->
					<el-popover placement="bottom" :title="$t('asset_out.a026')" width="440" trigger="hover"><!-- SMS 인증하기 -->
						<ul>
							<li class="dot">{{$t('asset_out.a070')}}<!-- 회원가입시 등록된 휴대폰 번호로 인증번호를 보내 드립니다. --></li>
							<li class="dot">{{$t('asset_out.a071')}}<!-- 3분 이내 메시지를 받지 못하셨다면 재요청 버튼을 통해 다시 진행해 주세요. --></li>
							<li class="dot">{{$t('asset_out.a072')}}<!-- 인증에 어려움을 겪고 계시다면 고객센터로 문의해 주세요 (1588-5588) --></li>
						</ul>
						<el-button slot="reference" icon="el-icon-question" class="question"></el-button>
					</el-popover>
					
					<el-input :placeholder="$t('asset_out.a020')" v-model="certifiNum" class="withdraw-input-obj" maxlength="6"  @keyup.native="onlyNumberSMS">
						<template slot="prepend"></template>
						<span v-if="countdowning" slot="append" class="time-counter">{{ remaining | toMMSS }}</span>
					</el-input> <!-- 인증번호 -->
					<el-button v-show="certifiCheck" type="primary" @click="requestCertifiNum">{{$t('asset_out.a021')}}<!-- 인증요청 --></el-button>
					<el-button v-show="confirmCheck" type="primary" @click="requestCertifiCheck"  :disabled="smsResultOk" >{{$t('asset_out.a077')}}<!-- 확인 --></el-button>
					<el-button v-show="reCertifiCheck" type="primary" @click="requestCertifiNum">{{$t('asset_out.a022')}}<!-- 재요청 --></el-button>
					<!-- sms 인증 결과 -->
					<div v-show="smsvalidateMsg" class="validity-error" :class="{comp : smsResultOk}">{{smsvalidateMessage}}</div> <!-- validity-error -->
					
				</el-form-item>
				<!-- 2021.08.25 OG 보안인증번호, OTP번호 체크 제거 -->
				 <!-- 보안비밀번호 -->
				<!-- <el-form-item v-if="getInfoUser.secu_auth_tp === '1'"  :label="$t('asset_out.a065')" prop="securityNum" class="withdraw-input security">				
					 <el-input type="password" :placeholder="$t('asset_out.a023')" v-model="securityNum" maxlength="4" autocomplete="new-password" @keyup.native="onlyNumberSecu"></el-input>
					<div v-show="securityNumvalidateMsg" class="validity-error">{{securityNumvalidateMessage}}</div>
				</el-form-item>  -->
				<!-- Google OTP -->
				<!-- <el-form-item v-if="getInfoUser.secu_auth_tp === '3'"  label="Google OTP" prop="securityNum" class="withdraw-input security">
					<el-input :placeholder="$t('asset_out.a090')" v-model="securityNum" maxlength="6" @keyup.native="onlyNumberSecu"></el-input>
					<div v-show="otpvalidateMsg" class="validity-error">{{otpvalidateMessage}}</div>
				</el-form-item> -->
				<el-form-item class="submit-btn-wrap" label-width="0">
					<el-button type="primary" @click="requestWithdraw">{{$t('asset_out.a024')}}<!-- 출금 요청 --></el-button>
				</el-form-item>
			</el-form>

			<div class="withdraw-caution-info">
				<div class="label">{{$t('asset_out.a025')}}<!-- 출금 주의사항 --></div>
				<ul>
					<li><span class="num">①</span>{{$t('asset_out.a067')}} <!-- 거래소에서는 고객님께 SMS 인증번호나 보안비밀번호를 절대 물어보지 않습니다. --></li>
					<li><span class="num">②</span>{{$t('asset_out.a068')}} <!-- 모든 출금건은 관리자 심사를 진행하며, 금융사고 예방을 위해 첫 입금 후 72시간 출금이 제한됩니다. (최초1회) --></li>
					<li><span class="num">③</span>{{$t('asset_out.a069')}} <!-- 은행 점검시간 23:30~12:30에는 KRW 입출금이 불가능 합니다. --></li>
				</ul>
			</div>
		</div>

		<!-- 시작 : 출금 > 가상화폐일 때 보여지는 부분 : 가상화폐 주소 입력-->
		<div v-else-if="getMyAssetstatusInfoCurCd !== 'KRW'" class="krw-deposit-view">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="withdraw-form">
				<el-form-item :label="$t('asset_out.a039')" class="withdraw-input" prop="walletAddress"><!-- 주소 -->
					<el-autocomplete popper-class="my-autocomplete" v-model="ruleForm.walletAddress" :fetch-suggestions="querySearch" :placeholder="$t('asset_out.a040' , [ getMyAssetstatusInfoCurCd ])" style="width:100%" @select="inputselect" :disabled="inputValidationDisabled">
						<template slot-scope="{ item }" id="walletAddressList">
							<div v-if="item.cur_cd !== ''" class="address">
								<div class="value"><span>{{ item.walt_nm }}</span></div>
								<div v-if="item.sub_info !== ''" class="link">
									<span class="coin-address">{{ item.value }}</span>{{$t('asset_out.a091')}}<!-- 추가주소 -->: {{item.sub_info}}
								</div>
								<div v-else class="link">
									<span class="coin-address">{{ item.value }}</span>
								</div>
								<div class="btn">
									<el-button icon="el-icon-close" @click="walletAddressDelete(item)" class="delete"></el-button>
								</div>
							</div>
							<div v-else class="address-btn">
								<div v-if="item.message !==''" class="nothing">{{item.message}}</div>
								<a @click="walletAddressGetAddPop()">+ {{$t('asset_out.a048')}}<!-- 주소 등록하기 --></a>
							</div>
						</template>
					</el-autocomplete>
				</el-form-item>
				<div class="address-wrap">
					<el-checkbox v-model="is2ndAddress" :disabled="inputValidationDisabled">{{$t('asset_out.a042')}}<!-- 추가 주소 사용 --></el-checkbox>
					<el-popover placement="bottom" title="추가주소(도움말)" width="440" trigger="hover">
						<ul>
							<li class="dot">{{$t('asset_out.a073')}}<!-- 일부 암호화폐는 출금시 데스티네이션 태그 또는 추가주소를 입력해야 정상적으로 출금이 완료됩니다. --></li>
							<li class="etc">{{$t('asset_out.a074')}}<!-- 주소 복사 붙여넣기 시 제대로 입력이 되지 않을 수 있습니다. 지갑 주소와 추가주소는 꼭 다시 한번 확인해 주세요 --></li>
						</ul>
						<el-button slot="reference" icon="el-icon-question" class="question"> </el-button>
					</el-popover>
				</div>
				<el-form-item v-if="is2ndAddress" class="address-add-input">
					<el-input :placeholder="$t('asset_out.a089')" v-model="destinationCode" :disabled="inputValidationDisabled"></el-input>
				</el-form-item>

				<div class="withdraw-limit">
					<el-row>
						<el-col :span="6">{{$t('asset_out.a007')}}<!-- 1일 출금 잔여 한도 --> </el-col>
						<el-col :span="18">{{ formatCoin(withdrawInfo.limt_bal) }} <span class="unit"> KRW</span></el-col>
					</el-row>
				</div>

				<el-form-item :label="$t('asset_out.a092' , [getMyAssetstatusInfoCurCd])" class="withdraw-input" prop="withdrawAmountWallet">  <!-- 출금수량(getMyAssetstatusInfoCurCd) -->
					<el-input :placeholder="$t('asset_out.a044')" v-model="ruleForm.withdrawAmountWallet" class="withdraw-input-obj" :disabled="inputValidationDisabled"></el-input><!-- 출금 수량을 입력해주세요. -->
					<el-button class="append" @click="maxAmountPriceWallet" :disabled="inputValidationDisabled" >{{$t('asset_out.a066')}}<!-- 최대 --></el-button>
				</el-form-item>
        		<span class="unit" style="float: right;">≈{{ withdrawKRWStr }} KRW</span>

				<el-row class="withdraw-middle">
					<el-col class="label">{{$t('asset_out.a010')}}<!-- 수수료 --></el-col>
					<el-col class="value">
						{{withdrawInfo.fee}}<span class="unit"> {{getMyAssetstatusInfoCurCd}}</span>
					</el-col>
				</el-row>
				<el-row class="withdraw-middle total">
					<el-col class="label">{{ $t('asset_out.a011') }}<!-- 총 출금 --></el-col>
					<el-col class="value">{{ totalAmountPriceWallet }}<span class="unit"> {{ getMyAssetstatusInfoCurCd }}</span></el-col>
				</el-row>

				<span class="withdraw-info">※ {{$t('asset_out.a018')}}<!-- 회원님의 안전한 자산 출금을 위해 가입시 등록하신 휴대폰 번호로 인증번호를 발송해드립니다. --> </span>
				
				<el-form-item :label="$t('asset_out.a019')" prop="certifiNum" class="withdraw-input sms-conf"><!-- SMS 인증하기 -->
					<el-input :placeholder="$t('asset_out.a020')" v-model="certifiNum" class="withdraw-input-obj" maxlength="6" @keyup.native="onlyNumberSMS">
						<template slot="prepend"></template>	
							<span v-if="countdowning" slot="append" class="time-counter">{{ remaining | toMMSS }}</span>
					</el-input> <!-- 인증번호 -->
					<el-button v-show="certifiCheck" type="primary" @click="requestCertifiNum">{{$t('asset_out.a021')}}<!-- 인증요청 --></el-button>
					<el-button v-show="confirmCheck" type="primary" @click="requestCertifiCheck" :disabled="smsResultOk" >{{$t('asset_out.a077')}}<!-- 확인 --></el-button>
					<el-button v-show="reCertifiCheck" type="primary" @click="requestCertifiNum">{{$t('asset_out.a022')}}<!-- 재요청 --></el-button>
					<!-- sms 인증 결과 -->
					<div v-show="smsvalidateMsg" class="validity-error" :class="{comp : smsResultOk}">{{smsvalidateMessage}}</div>
				</el-form-item>
				<!-- 2021.08.25 OG 보안인증번호, OTP번호 체크 제거 -->
				<!-- 보안비밀번호 -->
				<!-- <el-form-item v-if="getInfoUser.secu_auth_tp === '1'" :label="$t('asset_out.a065')" prop="securityNum" class="withdraw-input security">
					<el-input type="password" :placeholder="$t('asset_out.a023')" maxlength="4" v-model="securityNum"  autocomplete="new-password" @keyup.native="onlyNumberSecu"></el-input>
					<div v-show="securityNumvalidateMsg" class="validity-error">{{securityNumvalidateMessage}}</div>
				</el-form-item> -->
				<!-- Google OTP -->
				<!-- <el-form-item v-if="getInfoUser.secu_auth_tp === '3'"  label="Google OTP" prop="securityNum" class="withdraw-input security">
					<el-input :placeholder="$t('asset_out.a090')" maxlength="6" v-model="securityNum" @keyup.native="onlyNumberSecu"></el-input>
					<div v-show="otpvalidateMsg" class="validity-error">{{otpvalidateMessage}}</div>
				</el-form-item> -->

				<el-form-item class="submit-btn-wrap" label-width="0">
					<el-button type="primary" @click="requestWithdrawWallet">{{$t('asset_out.a024')}}<!-- 출금 요청 --></el-button>
				</el-form-item>
			</el-form>

			<div class="withdraw-caution-info">
				<div class="label">{{$t('asset_out.a025')}}<!-- 출금 주의사항 --></div>
				<ul>
					<li><span class="num">①</span> {{$t('asset_out.a067')}}<!-- 거래소에서는 고객님께 SMS 인증번호나 보안비밀번호를 절대 물어보지 않습니다. --></li>
					<li><span class="num">②</span> {{$t('asset_out.a068')}}<!-- 모든 출금건은 관리자 심사를 진행하며, 금융사고 예방을 위해 첫 입금 후 72시간 출금이 제한됩니다. (최초1회) --></li>
					<li><span class="num">③</span> {{$t('asset_out.a069-0')}}<!-- 잘못된 지갑주소로 송금하실 경우 복구가 불가능합니다. 출금 주소를 확인해 주세요. --></li>
					<li><span class="num">④</span> {{$t('asset_out.a069-1')}}<!-- 타거래소의 지갑주소는 해당 거래소의 정책에 따라 변경될 수 있습니다. 등록하신 지갑주소로 송금하실 경우에도 주소를 다시 한번 확인해주세요.--></li>
				</ul>
			</div>
		</div>

		<!-- 핸드폰, OTP, 출금차단  확인창   -->
		<el-dialog :visible.sync="withdrawOkayPop" width="320px" :close-on-click-modal="withdrawOkayPopClose">
			<div class="popup-text">
				<span v-html="withdrawOkayPopText"></span>
			</div>
			<span slot="footer" class="dialog-footer">
				<!-- 인증센터 바로가기 -->
				<!-- <el-button v-if="withdrawOkayPopBtnType === 2" @click="withdrawOkayPopFn('goToCertifyCenter')">{{$t('asset_out.a055')}}</el-button>  -->
				<el-button type="primary" v-if="withdrawOkayPopBtnType === 1" @click="withdrawOkayPopFn('okay')">{{$t('asset_out.a077')}}</el-button> <!-- 확인-->
			</span>
		</el-dialog>

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
		<el-dialog :visible.sync="attentionConfirm" width="320px">
			<div>
				{{getMyAssetstatusInfoCurCd === 'KRW' ? '원화' : 'COIN'}}({{getMyAssetstatusInfoCurCd}}){{$t('asset_out.a057')}} <!-- 출금을 진행하시겠습니까? -->
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="attentionConfirm = false">{{$t('asset_out.a078')}}</el-button><!--  취소  -->
				<el-button v-if="getMyAssetstatusInfoCurCd === 'KRW'" type="primary" @click="withdrawGo">{{$t('asset_out.a077')}}</el-button> <!--  확인  -->
				<el-button v-if="getMyAssetstatusInfoCurCd !== 'KRW'" type="primary" @click="withdrawGoWallet">{{$t('asset_out.a077')}}</el-button>  <!--  확인  -->
			</span>
		</el-dialog>

		<!-- 암호화폐 주소록 팝업 창 -->
		<el-dialog :visible.sync="walletAddressAddPop" :title="$t('asset_out.a049', [getMyAssetstatusInfoCurCd])" class="wallet-address-pop" width="660px">
			<el-row>
				<el-col class="label">
					<el-input :placeholder="$t('asset_out.a050')" :maxlength=10 v-model="addWalletName"></el-input> <!-- 이름 -->
				</el-col>
				<el-col class="input">
					<el-input :placeholder="$t('asset_out.a051')" :maxlength=100 v-model="addWalletAddress"></el-input>  <!-- 주소 입력-->
					<div style="color : red;"  v-show="addWalletAddressValidation" >{{$t('asset_out.a093')}}</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col class="label">
					<el-checkbox v-model="destinationAddressChk" class="destination-address-chk">{{$t('asset_out.a042')}}<!-- 추가 주소 사용 --></el-checkbox>
					<el-popover placement="bottom" :title="$t('asset_out.a045')" width="440" trigger="click" popper-class="pop-help"><!-- 추가주소 (도움말) -->
						<ul>
							<li class="dot"> {{$t('asset_out.a073')}}<!-- 일부 암호화폐는 출금시 데스티네이션 태그 또는 추가주소를 입력해야 정상적으로 출금이 완료됩니다. --></li>
							<li class="etc">{{$t('asset_out.a074')}}<!-- 주소 복사 붙여넣기 시 제대로 입력이 되지 않을 수 있습니다. 지갑 주소와 추가주소는 꼭 다시 한번 확인해 주세요 --></li>
						</ul>
						<el-button slot="reference" icon="el-icon-question" class="question"></el-button>
					</el-popover>

				</el-col>
				<el-col class="input">
					<el-input v-if="destinationAddressChk" :placeholder="$t('asset_out.a075')" v-model="addWalletAddressDestiCode"></el-input> <!-- 데스티네이션 태그 또는 추가 주소 입력 -->
				</el-col>
			</el-row>
			
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="walletAddressAddComplete">{{ $t('asset_out.a076') }}</el-button> <!-- 등록 -->
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
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import vueTimers from 'vue-timers/mixin'
import { octaFDScheckGet } from '@/api/octaSolutionRequest';

export default {
	mixins: [vueTimers],
		timers: {
			tick: { time: 1000, repeat: true }
		},
 	data () 
	{
		const validatecheck = (rule, value, callback) => {
			let self = this
			let validateValue = value.toString().replace(/,/g,"")
			let widr_able_qty = self.withdrawInfo.widr_able_qty
			let min_qty = self.withdrawInfo.min_qty
			let once_limt = self.withdrawInfo.once_limt
			let limt_bal = self.withdrawInfo.limt_bal

			if( Number(validateValue) > Number(widr_able_qty) ){
				callback(new Error(self.$t('asset_out.a012')))  //'출금가능금액을 초과하였습니다.'
			}else if( Number(widr_able_qty) === 0 || widr_able_qty === '' ){
				callback(new Error(self.$t('asset_out.a013'))) //'출금가능금액이 없습니다.'
			}else if( Number(validateValue) < Number(min_qty) && validateValue !== ''){
				callback(new Error(self.$t('asset_out.a014' ,[self.format(min_qty)])))  //'최소출금 금액은'+min_qty+'원 입니다.'
			}else if( Number(validateValue) > Number(once_limt) ){
				callback(new Error(self.$t('asset_out.a015'))) //'1회 출금 한도를 초과하였습니다.'
			}else if( Number(validateValue) > Number(limt_bal) ){
				callback(new Error(self.$t('asset_out.a016')))  //'1일 출금잔여 한도를 초과하였습니다.'
			}else if( Number(validateValue) === 0 || validateValue === ''){
				callback(new Error(self.$t('asset_out.a009')))  //  '출금금액을 입력해주세요'
			}else{
				callback();
			}	
		}

		const validatecheckWallet = (rule, value, callback) => {
			let self = this
			let validateValue = value.toString().replace(/,/g,"")  //입력 수량
			let fee = self.withdrawInfo.fee                      //출금수수료
			let widr_able_qty = self.withdrawInfo.widr_able_qty  //출금가능수량
			let min_qty = self.withdrawInfo.min_qty              //출금최소수량
			let once_limt = self.withdrawInfo.once_limt          //1회출금한도
    		let limt_bal = self.withdrawInfo.limt_bal            //일출금한도잔량

			if( Number(validateValue) === 0 || validateValue === ''){
				callback(new Error(self.$t('asset_out.a044')))  // 출금 수량을 입력해주세요 
			}else if( Number(validateValue) > Number(self.$big(widr_able_qty).minus(fee)) ){   //입력값이 출금가능수량-수수료 보다 크면 
				callback(new Error(self.$t('asset_out.a081')))  //'출금가능수량을 초과하였습니다.'
			}else if( Number(widr_able_qty) === 0 || widr_able_qty === '' ){
				callback(new Error(self.$t('asset_out.a082')))  //'출금가능수량이 없습니다.'
			}else if( Number(validateValue) < Number(min_qty) && validateValue !== ''){
				callback(new Error(self.$t('asset_out.a083' , [ self.formatCoin(min_qty),self.getMyAssetstatusInfoCurCd ]) ))  //최소출금수량은 {0} ,{1} 입니다. 
			}else if( self.withdrawKRWNum > Number(once_limt) ){
				callback(new Error(self.$t('asset_out.a084')))  //1회 출금 한도를 초과하였습니다. 
			}else if( self.withdrawKRWNum > Number(limt_bal) ){
				callback(new Error(self.$t('asset_out.a085')))  //1일 출금잔여 한도를 초과하였습니다. 
			}else{
				callback();
			}	
		}

		const validatecheckWalletAddress = (rule, value, callback) => {
			let self = this
			if(value === undefined) return
			let validateValue = value.toString().replace(/,/g,"")
			let cur_cd = self.getMyAssetstatusInfoCurCd

			if(validateValue === '' || validateValue === null ){
				callback(new Error(self.$t('asset_out.a086'))) //코인 주소를 입력해 주세요.
			}
			// 기획팀 요청: 원활한 테스트 위해 이더리움 주소 체크 해제   
			// else if(cur_cd === 'ETH' && (validateValue.substr(0,2) !== '0x' || validateValue.length !== 42)  ){ //암호화 화폐 validation 이더리움 김태형 사원님이 나머지는 정리해서 주시기로 하였슴
			// 	callback(new Error(self.$t('asset_out.a093'))) //코인주소를 확인해 주세요 
			// }else if(cur_cd === 'BTC' && ( validateValue.substr(0,1) !== '1' || validateValue.substr(0,1) !== '3' ) && (validateValue.length <= 23  || validateValue.length >= 37 )  ){  //BTC : 첫글자가 1또는 3으로 시작하며 전체 길이는 24~36 자 이다
			// 	callback(new Error(self.$t('asset_out.a093'))) //코인주소를 확인해 주세요 
			//else{
				callback();
			//}	
		}

		return {
			ruleForm: {
					withdrawAmount: '',              //원화 출금금액
					withdrawAmountWallet : '',       //암호화화폐 출금금액
					walletAddress : ''               //암호화화폐 주소
			},
			rules: {
       			withdrawAmount: [                
					{ validator: validatecheck, trigger: ['blur' , 'change']}
				],
				walletAddress : [
					{ validator: validatecheckWalletAddress, trigger: ['blur' , 'change']}
				],
				withdrawAmountWallet : [
					{ validator: validatecheckWallet, trigger: ['blur' , 'change']}
				]
			},
			withdrawInfo : {
				limt_bal : '',       //일출금한도잔량
				once_limt : '',      //1회출금한도
				widr_able_qty : '',  //출금가능수량
				min_qty : '',        //출금최소수량
				fee : '',            //출금수수료
				curt_prc : '',       //현재가
				sub_info_tp : '',    //보조주소구분
       			dec_digt : '',       //통화소수점자릿수        
			},
			
			//출금 validation disabled
			inputValidationDisabled : false, // 입력창 또는 버튼 disabled 속성

			totalAmountPrice : 0,    //총 출금
			remaining: 180,          //휴대폰 인증 타이머

			countdowning : false,    //SMS 인증카운터 show , hide
			certifiCheck : true,     //휴대폰인증요청 버튼   
			confirmCheck : false,    //휴대폰인증확인 버튼
			reCertifiCheck : false,  //휴대폰재인증요청 버튼

			certifiNum : '',          // sms 인증 번호
			smsvalidateMessage : '',  // sms validation message 
			smsvalidateMsg : false ,  // sms validation show hide
			smsResultOk : false,      // sms 인증성공 disabled

			securityNum: '', 	        // 보안 비밀 번호 , otp 번호
			attentionConfirm : false,   // 출금 confirm 팝업
			fdsBlacklistConfirm: false, // FDS 블랙리스트 출금 confirm 팝업		

			securityNumvalidateMsg : false, //보안비밀번호 validation show hide
			securityNumvalidateMessage : '', //보안비밀번호 validation message

			otpvalidateMsg : false, 	//otp validation show hide
			otpvalidateMessage : '',	//otp validation message

			//암호화 화폐
			is2ndAddress: false,						        //추가 주소 사용 여부 체크박스
			destinationCode : '',                               //추가 주소
			
			myWalletAddressData : [],							// 지갑 주소 목록
			walletAddressAddPop: false,							// 암호화화폐 주소록 추가 팝업
			walletAddressDeletePop : false,						// 암호화화폐 주소록 삭제 팝업
			addWalletName : '', 								// 암호화 화폐 주소추가 이름
			addWalletAddress : '', 								// 암호화 화폐 주소추가 주소
			addWalletAddressValidation : false,                 // 암호화 화폐 주소추가 주소 validation check
			destinationAddressChk : false,						// 추가주소록 체크박스
			addWalletAddressDestiCode : '',                     // 암호화 화폐 주소추가 데스티네이션 코드
			
			deleteWalletName : '', 								// 암호화 화폐 주소삭제 이름
			deleteWalletAddress : '', 							// 암호화 화폐 주소삭제 주소
			deleteWalletAddressDestiCode : '',                  // 암호화 화폐 주소삭제 데스티네이션 코드
			
			totalAmountPriceWallet : 0,                         // 암호화화폐 출금 : 총 출금

			withdrawOkayPopClose : false, 					//출금제한 모달팝업 배경 클릭 금지
			withdrawOkayPopBtnType : '',                    //핸드폰, OTP, 출금차단  확인창 버튼 종류
			withdrawOkayPop : false,						//핸드폰, OTP, 출금차단  확인창
			withdrawOkayPopText : ''  ,						//핸드폰, OTP, 출금차단  확인창 Text
			
			//현재가 처리
			beforeSymbol: '', //이전 심볼
			symbol: '',       //현재 심볼
			withdrawKRWNum: 0,   //원화출금금액
			withdrawKRWStr: '0', //원화출금금액

			// 모바일
			withdrawStep1 : true,                           //모바일 출금 step1
			withdrawStep2 : false,                          //모바일 출금 step2
			withdrawStep3 : false,                          //모바일 출금 step3
			withdrawStep4 : false,                          //모바일 출금 step4
			withDrawWalletAddress: '',  	 				//모바일 암호화화폐 주소
			walletAddressValidationMobile : false,          //모바일 암호화화폐 주소 validation 문구 show , hide
			walletAddressValidationMobileText : '',         //모바일 암호화화폐 주소 validation 문구
			selectAddressWalltState: false , 				//출금 전자지갑 show hide
			searchData: [], 								//출금 전자지갑 목록
			withdrawAmount : '',     						//출금금액
			requestWithdrawState : true,					//출금요청버튼 활성화 비활성화
			destinationDialogVisible: false,
			depositDialogVisible: false,
			withdrawalSmsDialogVisible: false,
			availableDialogVisible: false,
			addAddressBookDialogVisible: false,    			//출금 전자지갑 주소 등록 팝업

			fdsData:[] ,  									// fds 데이터
			fdsBlacklistCaseText: "입력하신 출금주소는 고위험 블랙리스트 지갑 주소입니다. 계속 출금하시겠습니까?",

			validationForm:false,  // 출금금액
		    validationDestinationCode: false, // 추가 주소사용여부 
			validationSms:false,  //sms 인증여부
			validationSecureNum: false, // 보안비밀번호 또는 OTP
			walletYN: false  //원화출금/지갑출금여부
    };
    },
    computed :{
		...mapGetters(['getMyAssetstatusInfoCurCd','getMyAccountData','getDepositWithdrawTabIndex','getWithdrawBlackStat','getInfoUser','getMyAssetstatusInfo','getAdminWalletState','getPairsByCds']),
	},
	watch: {
    	getMyAssetstatusInfoCurCd(val, old) {
      		let self = this;
			//출금한도및 수수료 조회
			self.changeCoin();
		},
		smsResultOk(){
		  //모바일
			if (!afc.isPC) {
				let self = this
				//2021.08.25 OG 보안인증번호, OTP번호 체크 제거    
				//let securityNumlength = self.getInfoUser.secu_auth_tp === '1' ? 4 : 6
				if (self.smsResultOk) {
				//if (self.smsResultOk  && self.securityNum.length === securityNumlength) {
					self.requestWithdrawState = false
				} else {
					self.requestWithdrawState = true
				}
			} 
		},
		//2021.08.25 OG 보안인증번호, OTP번호 체크 제거
		// securityNum(){
		//   //모바일
		// 	if (!afc.isPC) {
		// 		let self = this
		// 		let securityNumlength = self.getInfoUser.secu_auth_tp === '1' ? 4 : 6
		// 		if (self.smsResultOk && self.securityNum.length === securityNumlength) {
		// 			self.requestWithdrawState = false
		// 		} else {
		// 			self.requestWithdrawState = true
		// 		}
		// 	}  
    	// },
		'ruleForm.withdrawAmountWallet': {
			handler(value, oldValue) {
				let self = this;
				self.onlyNumberWallet();
			}
		}
	},
	filters: {
		accountFilter(value){
			value = String(value);
			// 계좌번호 맨뒤 5자리 '*'
			var str1 = value.substring(0,value.length -5);
			//var str2 = value.substring(value.length -3);

			return str1 + '*****';
		},
		nameFilter(value){
			var str1 = '';
			var str2 = '';
			var str3 = '';

			str1 = value.substring(0,1);
			if (value.length === 2) {
				return str1 + '*';
			} else if (value.length > 2) {
				for (var i = 0; i< value.length - 2 ; i++) {
					str2 = str2 + '*';
				}
				str3 = value.substring(value.length - 1);
			} 
			return str1 + str2 + str3;
			// 외자 - 맨뒤 *
			// 3글자 - 가운데 *
			// 4글자 - 가운데 두개 *
		},
		bankNameFilter(value){
			var str1 = '';
			var str2 = '';
			var str3 = '';
			if (value.length === 4) {
				str1 = value.substr(0,1);
				str3 = value.substr(2,2);
				return str1 + '*' + str3;
			} else if (value.length === 5) {
				str1 = value.substr(0,1);
				str3 = value.substr(3,2);
				return str1 + '**' + str3;
			} else if (value.length === 6) {
				str1 = value.substr(0,1);
				str3 = value.substr(3,3);
				return str1 + '**' + str3;
			} else if (value.length === 7) {
				str1 = value.substr(0,1);
				str2 = value.substr(2,1);
				str3 = value.substr(4,3);
				return str1 + '*'+ str2 + '*' + str3;
			} else {
				str1 = value.substr(0,1);
				str2 = value.substr(2,1);
				str3 = value.substr(4,4);
				return str1 + '*'+ str2 + '*' + str3;
			}
		},
		toMMSS(s) {
			return moment.utc(s*1000).format('mm:ss');
		}
  	},
  	methods : {
		inputselect(item){
			//암호화 화폐 출금 주소 선택
			let self = this;
			if(item.sub_info !== '' &&  item.sub_info !== undefined ){                       //데스티네이션 코드가 있다면
				self.is2ndAddress = true                    //추가 추소 사용 체크박스 체크 
				self.destinationCode = item.sub_info        //데스티네이션 코드 입력
			}else{
				self.is2ndAddress = false                   //데스티네이션 코드가 없다면   
				self.destinationCode = ''                   //추가 주소 사용 체크박스 체크 해제 , 데스티네이션 코드 초기화
			}
		},
		goToCertifyCenter() {
			//인증센터 바로가기
			let self = this;
			self.$router.push({name : 'mypageSecurity'});   //인증센터 바로가기 router 이동
 		},
		querySearch(queryString, cb) {                      //el-elment UI autoComplete 데이터 search
			console.log(queryString, cb);
			let self = this
			let links = self.myWalletAddressData
			let results = links;
			cb(results);
		},
		withdrawOkayPopFn(value) {						    // 출금불가계좌 팝업의 인증센터 바로가기btn 클릭
			let self = this
			if (value == 'goToCertifyCenter') {
				self.$router.push({name : 'mypageSecurity'});       //인증센터 바로가기 router 이동
			}
			self.withdrawOkayPop = false;                           //팝업창 닫기
			self.$store.commit('setDepositWithdrawTabIndex', '0');  //vuex 입금 탭 인덱스 설정
			self.$EventBus.$emit('depositTabChange' , 'deposit');   //이벤트 호출 : 입금 탭 이름 
		},
   		requestCertifiNum(){
			//sms 인증요청		
			let self = this
			let validationForm = false

			self.$refs['ruleForm'].validate((valid) => {  
				if(!valid) {
					validationForm = true
				}else {
					validationForm = false
				}
			}) 

			if(validationForm) return false
			self.countdowning = true      //카운트 show hide
			self.certifiCheck = false     //휴대폰인증요청    
			self.confirmCheck = true      //휴대폰인증확인
			self.reCertifiCheck = false   //휴대폰재인증요청
			self.smsvalidateMessage = ''  //sms validation 메세지 
			self.smsvalidateMsg = false   //sms validatino 표시 여부 
			self.$timer.start('tick');    //타이머 시작
			self.inputValidationDisabled = true //출금 입력 input , 버튼 disabled
			self.$socket.sendProcessByName('dw113', (queryData) => {  //sms 문자 전송요청 
				var block = queryData.getBlockData('InBlock1')[0]
				block['user_id'] = self.$store.getters.getUserId;
			}, (returnData) => {
				if(returnData !== null){
					//성공
				} else {
					// 전문 에러 언어팩 적용
					const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
					if (errorData.trName != "dw113") return
	
					self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
						dangerouslyUseHTMLString: true,
						confirmButtonText: self.$t('sys_err.a001')
					});
				}
			});

		},
		

		requestCertifiCheck(){
		 	//인증번호 입력후 인증요청
			let self = this
			
			//인증 예외처리 (TEST)
			self.$timer.stop('tick');                           //타이머 stop
			self.smsvalidateMessage = self.$t('asset_out.a030') //'인증완료'
			self.smsvalidateMsg = true                          //sms valiation 메세지 보여주기
			self.smsResultOk = true                             //sms 인증성공
			return;
      
			//sms 인증요청 validation
			self.$socket.sendProcessByName('dw114', (queryData) => { //sms 인증확인 요청
				var block = queryData.getBlockData('InBlock1')[0]
				block['user_id'] = self.$store.getters.getUserId
				block['sms_auth_no'] = self.certifiNum               //인증번호    
			}, (returnData) => {
				if(returnData !== null){
					self.$timer.stop('tick');                           //타이머 stop
					self.smsvalidateMessage = self.$t('asset_out.a030') //'인증완료'
					self.smsvalidateMsg = true                          //sms valiation 메세지 보여주기
					self.smsResultOk = true                             //sms 인증성공
				}else{
					let errorData = window.sessionStorage.getItem('lastErrorData')
					if (errorData !== null) {
						errorData = JSON.parse(errorData)
						if (errorData.trName === 'dw114'){
										if(errorData.errCode === '40244' || errorData.errCode === '40712' ){
											self.smsvalidateMessage =  self.$t('asset_out.a027') //'인증번호가 일치하지 않습니다'
											self.smsvalidateMsg = true
										}else if(errorData.errCode === '40410'){
											self.$timer.stop('tick');
											self.smsvalidateMessage =  self.$t('asset_out.a086')//'SMS인증 10회 오류로 출금신청 취소 및 계정잠금 처리되었습니다.'
											self.smsvalidateMsg = true
										}else{
											// self.smsvalidateMessage = errorData.errMsg
											// 전문 에러 언어팩 적용
											self.smsvalidateMessage = self.$t('sys_err.' + errorData.errCode)
											self.smsvalidateMsg = true
										}
						}
					}
				}
			});
		},

		//FDS 조회
		requestFds(){
		
		    // 계정ID          , user_id           , user_id           , char      , 10;
            // 통화코드        , cur_cd            , cur_cd            , char      , 5;
            // 전자지갑주소    , walt_id           , walt_id           , char      , 256;
            // 보조필드        , sub_info          , sub_info          , char      , 50;
            // 입력출금금액    , iput_amt          , iput_amt          , double    , 20;         
			let self = this

			self.$socket.sendProcessByName('dw570', (queryData) => {
				var block = queryData.getBlockData('InBlock1')[0];
				block['user_id'] = self.$store.getters.getUserId;
				block['cur_cd']  = self.getMyAssetstatusInfoCurCd
				block['walt_id']  = afc.isPC ? self.ruleForm.walletAddress : self.withDrawWalletAddress							  		//지갑주소
				block['sub_info']  =  self.destinationCode                                      //서브 데스트네이션 코드
				block['iput_amt']  = self.ruleForm.withdrawAmountWallet.replace(/,/g,"")        //입력출금금액				
				console.log("block:" + JSON.stringify(block))
			}, (returnData) => {
				if( returnData ) {
					let res = returnData.getBlockData('OutBlock1')[0]									
					
					if( res ){
                        //fds 데이터 저장
						self.fdsData = res
						console.log("fdsData:"+ JSON.stringify(self.fdsData))

						//fds 조회		
						self.octaSolutionFdsAPI('01')											
					}
				} else {
					// 전문 에러 언어팩 적용
					const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
					if (errorData.trName != "dw570") return
					self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
						dangerouslyUseHTMLString: true,
						confirmButtonText: self.$t('sys_err.a001')
					});
					self.withdrawInfoReset()  //출금 정보 초기화
					return false
				}
			})
		},

		//옥타솔루션 FDS API
		octaSolutionFdsAPI(data)
		{    
			let self = this   
			self.fdsData.send_gbn = data //01:신규, 02:재전송
			console.log("SEND_GBN:"+self.fdsData.send_gbn )
			octaFDScheckGet( self.fdsData )
			.then(data => 
			{   
				console.log(data);         
				
				if(data.ERROR_YN == 'N' )
				{    			
					//0101(White List 정상): FDS RULE 통과
					if(data.AUTO_OUT_YN == 'Y')  // && data.CHK_RESULT_CD_1 == '0101'				
					{            
						//출금요청 및 진행
						self.requestWithdrawAfterFds()
						
					//Black List               
					}else if(data.AUTO_OUT_YN == 'N' &&
					(		 data.CHK_RESULT_CD_2 == '0201' || data.CHK_RESULT_CD_3 == '0202' || data.CHK_RESULT_CD_4 == '0203'))
					{						
						self.fdsBlacklistConfirm = true
					
					//White List/Black List 그외	
					}else if(data.AUTO_OUT_YN == 'N' && 
					(	 	 data.CHK_RESULT_CD_7 == '0401' || data.CHK_RESULT_CD_8 == '0402' || data.CHK_RESULT_CD_9 == '0403' || data.CHK_RESULT_CD_10 == '0404' || data.CHK_RESULT_CD_11 == '0405' || data.CHK_RESULT_CD_12 == '0406' || data.CHK_RESULT_CD_13 == '0407'||
							 data.CHK_RESULT_CD_14 == '0501' || data.CHK_RESULT_CD_15 == '0502' || data.CHK_RESULT_CD_16 == '0503' || data.CHK_RESULT_CD_17 == '0504'
					))
					{
						self.$alert('위험거래로 탐지되었습니다.<br>고객센터로 문의해주세요.', '', {
							dangerouslyUseHTMLString: true,
							confirmButtonText: self.$t('sys_err.a001')
							}).then(() => {
								//출금취소후 메인페이지 이동
								self.goMain()												
							});    
					}else
					{
						self.$alert( data.ERROR_MSG, '', {
							dangerouslyUseHTMLString: true,
							confirmButtonText: self.$t('sys_err.a001')
						}) 
					}	
					
				} 
			}).catch(err => {		
				    //ERROR_YN = "Y" 인 경우
					//1. Request 파라미터에 값이 없는 경우
					//2. FDS 시스템 장애 발생하는 경우	
					
					self.$alert( err.ERROR_MSG, '', {
						dangerouslyUseHTMLString: true,
						confirmButtonText: self.$t('sys_err.a001')
					})          
			})     
		},
		//원화 출금
		requestWithdraw(event) {
			// 원화(KRW) 출금 요청 버튼 클릭
			let self = this
			self.walletYN = false 
			console.log("walletYN:"+self.walletYN)

			// let validationForm = false  // 출금금액
			// let validationSms = false   //sms 인증여부
			// let validationSecureNum = false // 보안비밀번호 또는 OTP
		
			self.$refs['ruleForm'].validate((valid) => {  //form validation 
				if(!valid) {
					self.validationForm = true
				}else {
					self.validationForm = false 
				}
			})

			//sms 인증확인이 되었는가
			if(self.smsResultOk === false){
				self.smsvalidateMessage = self.$t('asset_out.a031')//'휴대폰 인증을 진행해 주세요.'
				self.smsvalidateMsg = true
				self.validationSms = true
			}
		
            //2021.08.25 OG 보안인증번호, OTP번호 체크 제거
			//보안비밀번호나 구글 OTP 입력을 하였는가.
			// if(self.getInfoUser.secu_auth_tp === '1'){
			// 	//보안비밀번호 
			// 	if(self.securityNum === ''){
			// 		self.securityNumvalidateMsg = true 	
			// 		self.securityNumvalidateMessage = self.$t('asset_out.a038')//'보안비밀번호를 입력해주세요'
			// 		validationSecureNum = true
			// 	}
			// }else if(self.getInfoUser.secu_auth_tp === '3'){
			// 	//구글OTP 
			// 	if(self.securityNum === ''){
			// 		self.otpvalidateMsg = true 	
			// 		self.otpvalidateMessage = self.$t('asset_out.a087')//'구글 OTP를 입력해주세요'
			// 		validationSecureNum = true
			// 	}
			// }	
			
			//FDS 조회
			self.requestFds()		

		},
        //암호화폐지갑으로 출금
		requestWithdrawWallet(event) {
		  // 암호화화폐 출금 요청 버튼 클릭
			let self = this
			self.walletYN = true 
			console.log("walletYN:"+self.walletYN)

			// let validationForm = false  // 암호화 화폐 주소, 출금수량
			// let validationDestinationCode = false // 추가 주소사용여부 
			// let validationSms = false  //sms 인증여부
			// let validationSecureNum = false // 보안비밀번호 또는 OTP

			self.$refs['ruleForm'].validate((valid) => {  //form validation 
				if(!valid) {
					self.validationForm = true
				}else {
					self.validationForm = false 
				}
			})

			//추가 주소사용여부 시 추가주소 확인
			if(self.is2ndAddress){
				if(self.destinationCode === ''){
					self.validationDestinationCode = true
					self.$alert('추가주소를 입력해주세요.', '', {
						confirmButtonText: self.$t('asset_out.a077') //'확인'
					});
				}
			}

			//sms 인증확인이 되었는가
			if(self.smsResultOk === false){
				self.smsvalidateMessage = self.$t('asset_out.a031')//'휴대폰 인증을 진행해 주세요.'
				self.smsvalidateMsg = true
				self.validationSms = true
			}

            //2021.08.25 OG 보안인증번호, OTP번호 체크 제거
			//보안비밀번호나 구글 OTP 입력을 하였는가.
			// if(self.getInfoUser.secu_auth_tp === '1'){
			// 	//보안비밀번호 
			// 	if(self.securityNum === ''){
			// 		self.securityNumvalidateMsg = true 	
			// 		self.securityNumvalidateMessage = self.$t('asset_out.a038')//'보안비밀번호를 입력해주세요'
			// 		validationSecureNum = true
			// 	}
			// }else if(self.getInfoUser.secu_auth_tp === '3'){
			// 	//구글OTP 
			// 	if(self.securityNum === ''){
			// 		self.otpvalidateMsg = true 	
			// 		self.otpvalidateMessage = self.$t('asset_out.a087')//'구글 OTP를 입력해주세요'
			// 		validationSecureNum = true
			// 	}
			// }		

			//모바일 주소 유효성 체크
			if(!afc.isPC){
				if(self.withDrawWalletAddress === ''){   //모바일 암호화 화폐 주소 
					self.validationForm = true
				}
			}

			//FDS 조회
			self.requestFds()		
		},
		requestWithdrawAfterFds()
		{
			let self = this
			if(self.validationForm === true || self.validationSms === true || self.validationSecureNum === true){
				return false
			}else{
				//출금한도 및 수수료 조회
				self.$socket.sendProcessByName('dw551', (queryData) => {
					var block = queryData.getBlockData('InBlock1')[0];
					block['user_id'] = self.$store.getters.getUserId;
					block['cur_cd']  = self.getMyAssetstatusInfoCurCd
					console.log("dw551_input:" + JSON.stringify(block))
				}, (returnData) => {
					if( returnData ) {
						let res = returnData.getBlockData('OutBlock1')[0]
						console.log("dw551_output:" + JSON.stringify(res))
						self.withdrawInfo = res
						
						//1회출금 한도 보다 크거나 , 1일 출금 잔여 한도 보다 크거나 , 최대출금 금액보다 크다면
						let ckeckAmount = ''
						if(self.walletYN == true) 	//암호화화폐
						{
							ckeckAmount = Number(self.ruleForm.withdrawAmountWallet)
						}
						else //원화
						{
							ckeckAmount = Number(self.ruleForm.withdrawAmount.replace(/,/g,""))
						}

						if(Number(self.withdrawInfo.limt_bal) < ckeckAmount  || Number(self.withdrawInfo.once_limt) < ckeckAmount || Number(self.withdrawInfo.widr_able_qty) < ckeckAmount ){
							self.withdrawInfoReset()  //출금 정보 초기화
							self.$alert('출금 validation 실패(1회출금한도금액,출금잔여한도,최대출금금액)', '', {
								confirmButtonText: self.$t('asset_out.a077') //'확인'
							});
						}else{
							self.attentionConfirm = true //출금신청 컨펌창 오픈
						}
					} else {
						// 전문 에러 언어팩 적용
						const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
						if (errorData.trName != "dw551") return
						self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
							dangerouslyUseHTMLString: true,
							confirmButtonText: self.$t('sys_err.a001')
						});
						self.withdrawInfoReset()  //출금 정보 초기화
					}
				})
			}
		},
		withdrawGo(){
		  //원화 출금요청
			let self = this
			self.$socket.sendProcessByName('dw122', (queryData) => { //출금 요청 tr
				var block = queryData.getBlockData('InBlock1')[0];
				block['user_id'] = self.$store.getters.getUserId                   //user_id
				block['bank_cd']  = self.getMyAccountData.bank_cd                  //은행코드
				block['acct_no']  = self.getMyAccountData.acct_no                  //계좌 비밀번호
				block['iput_amt']  = self.ruleForm.withdrawAmount.replace(/,/g,"") //출금 금액
				block['iput_fee']  = self.withdrawInfo.fee                         //수수료
				block['input_secu_pass']  = ''//self.getInfoUser.secu_auth_tp === '1' ? new UnikeyAIR().sha256AndBase64(self.securityNum) : self.securityNum  // 보안비밀번호는 암호화 , otp는 암호화 하지 않는다.
			}, (returnData) => {
				if( returnData ) {
					let res = returnData.getBlockData('OutBlock1')[0]
					self.withdrawinputReset() //출금 데이터 리셋
					self.attentionConfirm = false  // 출금 요청 컴펌 창 닫기
					self.$alert( self.$t('asset_out.a058'), '', {    //'원화(KRW)출금 신청이 완료되었습니다.'
						confirmButtonText: self.$t('asset_out.a077') ,//'확인'
						callback: action => {
							//입출금내역으로 이동
							if(afc.isPC){  //pc경우
								self.$store.commit('setDepositWithdrawTabIndex', '2');  //입출금내역 탭 인덱스
								self.$EventBus.$emit('depositTabChange' , 'history');   //입출금내역 탭 이름
								self.$EventBus.$emit('tabHistory' , 'withdraw');   		//입출금내역 탭 조회
							}else{  //모바일 일 경우
								self.$router.push({name: 'mBank'}); 					
							}
						}
					});
				} else {
					let errorData = window.sessionStorage.getItem('lastErrorData')
       				if (errorData !== null) {
							errorData = JSON.parse(errorData)
            			if (errorData.trName === 'dw122'){
							if(errorData.errCode === '40708' || errorData.errCode === '40701'){
								//40708, 40701 보안 비밀번호 오류
								self.securityNumvalidateMessage  = self.$t('sys_err.'+errorData.errCode)// errorData.errMsg
								self.securityNumvalidateMsg  = true
								self.attentionConfirm = false
							}else if(errorData.errCode === '40717' || errorData.errCode === '40712'){
								//40717, 40712 OTP 비밀번호 오류
								self.otpvalidateMessage = self.$t('sys_err.'+errorData.errCode)// errorData.errMsg
								self.otpvalidateMsg = true
								self.attentionConfirm = false 	
							}else{
								self.attentionConfirm = false 
								// 전문 에러 언어팩 적용
								self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
									dangerouslyUseHTMLString: true,
									confirmButtonText: self.$t('sys_err.a001')
								});
							}
         				}
         			 }
				}
			})
		},
		
		withdrawGoWallet(){
		  //출금요청
			let self = this
			self.$socket.sendProcessByName('dw111', (queryData) => {
				var block = queryData.getBlockData('InBlock1')[0];
				block['user_id'] = self.$store.getters.getUserId                                //user_id
				block['cur_cd']  = self.getMyAssetstatusInfoCurCd							    //통화코드	
				block['walt_id']  = afc.isPC ? self.ruleForm.walletAddress : self.withDrawWalletAddress							  		//지갑주소
				block['sub_info']  =  self.destinationCode                                      //서브 데스트네이션 코드
				block['iput_amt']  = self.ruleForm.withdrawAmountWallet.replace(/,/g,"")        //입력출금금액
				block['iput_fee']  = self.withdrawInfo.fee                                      //입력수수료
				block['iput_secu_pass']  = ''//self.getInfoUser.secu_auth_tp === '1' ? new UnikeyAIR().sha256AndBase64(self.securityNum) : self.securityNum  //입력보안비밀번호,OTP

			}, (returnData) => {
				if( returnData ) {
					let res = returnData.getBlockData('OutBlock1')[0]
					//데이터 리셋 (출금 데이터 리셋 )
					//입출금 자산데이터 조회
					//출금한도및 수수료 조회 
					self.withdrawinputReset()
					self.attentionConfirm = false
					self.$alert( self.$t('asset_out.a088', [self.getMyAssetstatusInfoCurCd]) , '', {    //'('+self.getMyAssetstatusInfoCurCd+')출금 신청이 완료되었습니다.'
						confirmButtonText: self.$t('asset_out.a077'), //'확인'
						callback: action => {
							//입출금내역으로 이동
							if(afc.isPC){
								self.$store.commit('setDepositWithdrawTabIndex', '2');  //입출금내역 탭 인덱스
								self.$EventBus.$emit('depositTabChange' , 'history');   //입출금내역 탭 이름
								self.$EventBus.$emit('tabHistory' , 'withdraw');   //입출금내역 탭 조회
							}else{
								self.$router.push({name: 'mBank'}); 
							}

						}
					});
					
				} else {
					let errorData = window.sessionStorage.getItem('lastErrorData')
                    if (errorData !== null) {
						errorData = JSON.parse(errorData)
                        if (errorData.trName === 'dw111'){
							if(errorData.errCode === '40708' || errorData.errCode === '40701'){
								//40708, 40701 보안 비밀번호 오류
								self.securityNumvalidateMessage  = self.$t('sys_err.'+errorData.errCode)// errorData.errMsg
								self.securityNumvalidateMsg  = true
								self.attentionConfirm = false
							}else if(errorData.errCode === '40717' || errorData.errCode === '40712'){
								//40717, 40712 OTP 비밀번호 오류
								self.otpvalidateMessage = self.$t('sys_err.'+errorData.errCode)// errorData.errMsg
								self.otpvalidateMsg = true
								self.attentionConfirm = false 	
							}else{
								self.attentionConfirm = false 
								// self.$alert('전자지갑출금요청에 실패하였습니다.['+errorData.errMsg+']', '', {
								// 	confirmButtonText: '확인'
								// });

								// 전문 에러 언어팩 적용
								self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
									dangerouslyUseHTMLString: true,
									confirmButtonText: self.$t('sys_err.a001')
								});
							}
           				}
        			}
				}
			})
		},
		withdrawCancel(){
			let self = this
			self.attentionConfirm = false
		},
		withdrawInfoReset(){
  			//출금한도및수수료조회 리셋
			let self = this;
			self.resetData();
			self.selectWithdrawbaseInfo();
		},
		withdrawinputReset(){
			let self = this
			//데이터 리셋 (출금 데이터 리셋 )
			self.totalAmountPrice = 0       //원화 총 출금
			self.remaining = 180            //휴대폰 인증 타이머
    		self.rules.withdrawAmount = '', //원화 입력금액

			self.ruleForm.walletAddress = ''  		 //암호화화폐 주소 
			self.is2ndAddress = false        		 //암호화화폐 데스트니태그 사용여부
			self.destinationCode =''		  		 //암호화화폐 데스트니태그	
			self.totalAmountPriceWallet = 0		     //암호화화폐 총 출금
			self.ruleForm.withdrawAmountWallet = ''  //암호화화폐 입력수량

			self.countdowning = false    //SMS 인증카운터 show , hide
			self.certifiCheck = true     //휴대폰인증요청 버튼   
			self.confirmCheck = false    //휴대폰인증확인 버튼
			self.reCertifiCheck = false  //휴대폰재인증요청 버튼

			self.certifiNum = ''          // sms 인증 번호
			self.smsvalidateMessage = ''  // sms validation message 
			self.smsvalidateMsg = false   // sms validation show hide
			self.smsResultOk = false      // sms 인증성공 disabled

			self.attentionConfirm = false   // 출금 confirm 팝업

			self.securityNum = ''           //보안 비밀번호 ,otp
			self.securityNumvalidateMsg = false //보안비밀번호 validation show hide
			self.securityNumvalidateMessage = '' //보안비밀번호 validation message

			self.otpvalidateMsg = false 	//otp validation show hide
			self.otpvalidateMessage = ''	//otp validation message

			//출금한도및 수수료 조회
			self.selectWithdrawbaseInfo();
      
     		//입출금 새로고침 (BankTransaction.vue)
			self.$EventBus.$emit('depositReload'); 
		},
		walletAddressGetAddPop() {
	  		//출금지갑 추가하기
			let self = this
			//데이터 초기화
			self.walletAddressAddPop = false  //주소등록 팝업 초기화 
			self.addWalletName = '' 		  //추가주소이름 초기화	 					
			self.addWalletAddress = '' 		  //추가주소주소 초기화						 
			self.destinationAddressChk = false	 //추가주소 데스티네이션 코드 체크 초기화					
			self.addWalletAddressDestiCode = ''  //추가주소 데스티네이션 코드 초기화  
			self.addWalletAddressValidation = false //추가주소 validation check 초기화                  
			//입력창 오픈
			self.walletAddressAddPop = true      //추가주소 팝업 오픈
		},
		walletAddressAddComplete(){
		//출금지갑 등록하기
			let self = this
			if(self.getMyAssetstatusInfoCurCd === 'ETH' && (self.addWalletAddress.substr(0,2) !== '0x' || self.addWalletAddress.length !== 42)  ){ //암호화 화폐 validation 이더리움 김태형 사원님이 나머지는 정리해서 주시기로 하였슴
				self.addWalletAddressValidation = true
				return false
			}else if(self.getMyAssetstatusInfoCurCd === 'BTC' && ( self.addWalletAddress.substr(0,1) !== '1' || self.addWalletAddress.substr(0,1) !== '3' ) && (self.addWalletAddress.length <= 23  || self.addWalletAddress.length >= 37 )  ){  //BTC : 첫글자가 1또는 3으로 시작하며 전체 길이는 24~36 자 이다
				self.addWalletAddressValidation = true
				return false
			}else{
				
			}
			console.log(self.myWalletAddressData.length)
			//10개까지 등록가능 11체크는 마지막에 한개 추가 해 주었기 떄문에  PC : 11개 모바일은 10개
			if(self.myWalletAddressData.length ===  (afc.isPC ? 11 : 10)){ // (afc.isPC ? 11 : 10)
				self.walletAddressAddPop = false  //pc
				self.addAddressBookDialogVisible = false  //mobile
				self.$alert(self.$t('asset_out.a060'), '', {  //'주소록 등록은 최대 10개 까지 가능 합니다. 주소 삭제 후 다시 등록해주세요.'
					confirmButtonText: self.$t('asset_out.a077') //'확인'
				}); 
			}else{
				self.$socket.sendProcessByName('dw102', (queryData) => {
					var block = queryData.getBlockData('InBlock1')[0];
					block['user_id'] = self.$store.getters.getUserId;
					block['cur_cd']  = self.getMyAssetstatusInfoCurCd 
					block['walt_id']  = self.addWalletAddress
					block['sub_info']  = self.addWalletAddressDestiCode
					block['walt_nm']  = self.addWalletName
					block['proc_tp']  = '1'        //1: 등록, 2: 삭제
				}, (returnData) => {
					if( returnData ) {
						self.walletAddressAddPop = false
						self.addAddressBookDialogVisible = false  //mobile
						self.$alert(self.$t('asset_out.a059'), '', { //'출금 주소 등록이 완료되었습니다.'
             		    confirmButtonText: self.$t('asset_out.a077'), //'확인'
						callback: action => {
							afc.isPC?self.myWalletAddress():self.myWalletAddressMobile();
						}
						}); 
					} else {
						self.walletAddressAddPop = false
						self.addAddressBookDialogVisible = false  //mobile

						// 전문 에러 언어팩 적용
						const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
						if (errorData.trName != "dw102") return

						self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
							dangerouslyUseHTMLString: true,
							confirmButtonText: self.$t('sys_err.a001')
						});
					}
				})
			} 
		},
		walletAddressDeleteReset(){
		//출금지갑 데이터 초기화
			let self = this
			self.walletAddressDeletePop = false
			self.deleteWalletName = ''
			self.deleteWalletAddress = ''
			self.deleteWalletAddressDestiCode = ''
			self.ruleForm.walletAddress = ''
		},
		walletAddressDelete(item){
		//출금지갑 삭제하기 컨펌 오픈
			let self = this
			//데이터 초기화
			self.walletAddressDeleteReset()
			//데이터 바인딩
			if(afc.isPC){
				self.deleteWalletName = item.walt_nm
				self.deleteWalletAddress = item.value
				self.deleteWalletAddressDestiCode = item.sub_info
			}else{
				//모바일
				self.deleteWalletName = item.walt_nm
				self.deleteWalletAddress = item.walt_id
				self.deleteWalletAddressDestiCode = item.sub_info
			}
			self.walletAddressDeletePop = true 
		},
		walletAddressDeleteCancel(){
		  //출금지갑 삭제 취소
			let self = this
			self.walletAddressDeleteReset()
		},
		walletAddressDeleteComplete(){
  		//출금지갑 삭제
			let self = this
			self.$socket.sendProcessByName('dw102', (queryData) => {
				var block = queryData.getBlockData('InBlock1')[0];
				block['user_id'] = self.$store.getters.getUserId;
				block['cur_cd']  = self.getMyAssetstatusInfoCurCd
				block['walt_id']  = self.deleteWalletAddress
				block['sub_info']  = self.deleteWalletAddressDestiCode
				block['walt_nm']  = self.deleteWalletName
				block['proc_tp']  = '2'        //1: 등록, 2: 삭제
			}, (returnData) => {
				if( returnData ) {
					self.walletAddressDeleteReset()
					afc.isPC?self.myWalletAddress():self.myWalletAddressMobile();
				} else {
					self.walletAddressDeleteReset()

					// 전문 에러 언어팩 적용
					const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
					if (errorData.trName != "dw102") return

					self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
						dangerouslyUseHTMLString: true,
						confirmButtonText: self.$t('sys_err.a001')
					});
				}
			})
		},
		//최대금액 원화
		maxAmountPrice(){
			let self = this
			self.$refs.ruleForm.$el[0].focus() // 출금금액 input 창으로 focus 이동 
			self.$socket.sendProcessByName('dw551', (queryData) => {
				var block = queryData.getBlockData('InBlock1')[0];
				block['user_id'] = self.$store.getters.getUserId;
				block['cur_cd']  = self.getMyAssetstatusInfoCurCd
			}, (returnData) => {
				if( returnData ) {
					let res = returnData.getBlockData('OutBlock1')[0]
					let feeAmount = res.fee
					let widrAbleQtyAmount = res.widr_able_qty

					let res_withdrawAmount = 0
					if(Number(widrAbleQtyAmount) < Number(feeAmount)){
						self.ruleForm.withdrawAmount = '' 
					}else{
						res_withdrawAmount = Number(widrAbleQtyAmount) - Number(feeAmount)
						if( afc.isPC){
							self.ruleForm.withdrawAmount = res_withdrawAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')   //PC출금가능 최대금액
						}else{
							self.ruleForm.withdrawAmount = res_withdrawAmount.toString()   //모바일 출금가능 최대금액
						}
						
					}
					let totalAmount = Number(res_withdrawAmount) + Number(feeAmount)
					self.totalAmountPrice = totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
					
				} else {
					self.withdrawInfoReset()
					return;
				}
			})
		},
		//최대수량 암호화 화폐
		maxAmountPriceWallet(){
			let self = this
			self.$socket.sendProcessByName('dw551', (queryData) => {
				var block = queryData.getBlockData('InBlock1')[0];
				block['user_id'] = self.$store.getters.getUserId
				block['cur_cd']  = self.getMyAssetstatusInfoCurCd
			}, (returnData) => {
				if( returnData ) {
       			    let res = returnData.getBlockData('OutBlock1')[0]
       			    console.log("maxAmountPriceWallet", res);
					let feeAmount = res.fee                      //수수료
					let widrAbleQtyAmount = res.widr_able_qty

					let res_withdrawAmountWallet = 0
					if(Number(widrAbleQtyAmount) < Number(feeAmount)){
						self.ruleForm.withdrawAmountWallet = '' 
					}else{
						if(afc.isPC){
							res_withdrawAmountWallet = self.$big(widrAbleQtyAmount).minus(feeAmount) 
							self.ruleForm.withdrawAmountWallet = self.formatCoin(res_withdrawAmountWallet)   //출금가능 최대금액
						}else{
							//모바일
							res_withdrawAmountWallet = self.$big(widrAbleQtyAmount).minus(feeAmount)
							self.ruleForm.withdrawAmountWallet = res_withdrawAmountWallet.toString()   //출금가능 최대금액
						}

					}
					let totalAmount = self.$big(res_withdrawAmountWallet).plus(feeAmount)
					self.totalAmountPriceWallet = self.formatCoin(totalAmount)
				} else {
					self.withdrawInfoReset()
					return;
				}
			})
		},
		onlyNumber() {
			let self = this
			if( afc.isPC){
				self.ruleForm.withdrawAmount = self.ruleForm.withdrawAmount.replace(/[^0-9]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
			if(self.ruleForm.withdrawAmount === ''){
				self.totalAmountPrice = ''	
			}else{
				let mixAmount =  Number(self.ruleForm.withdrawAmount.toString().replace(/,/g,"")) + Number(self.withdrawInfo.fee)
				self.totalAmountPrice= mixAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
			}
		},
		onlyNumberSMS() {
			let self = this
			self.certifiNum = self.certifiNum.replace(/[^0-9]/g,'')
		},
		onlyNumberSecu() {
			let self = this
			self.securityNum = self.securityNum.replace(/[^0-9]/g,'')
		},
		onlyNumberWallet() {
			let self = this
			let fixlength = 0                              //입력 소수점자리수 초기값
			let fixFee = 0 								   //수수료 소수점 초기값 
			let fixFially = 0                              //최종 소수점 초기값
			let val = self.ruleForm.withdrawAmountWallet;  //입력 값 
			let feeVal = self.withdrawInfo.fee.toString()  //수수료 
			let valStr = val.replace(/[^0-9.]/g,'').replace(/\.\.+/g,'.')  // 숫자 , . 허용 , . 1개 만 
			
			//소수점 제한(8자리) , 실수 제한(14자)
			if(valStr.indexOf('.')>-1){
				var arr = valStr.split('.');
				
				if(arr[0].length > 13 ) {          //실수 14자
					valStr = arr[0].substr(0,13);
				}
 
				if(arr[1].length > 8){             //소수점 8자리 까지
					valStr = arr[0] + '.' + arr[1].substr(0,8);
					fixlength = 8
				}else{
					fixlength = arr[1].length
				}
				
			}else{
				if(valStr.length > 13){
					valStr = valStr.substr(0,13);
				}
			}
			//수수료 소수점 자릿수
			if(feeVal.indexOf('.') > -1){
				var feeArr = feeVal.split('.');
				fixFee = feeArr[1].length
			}
			
			//입력 소수점 자릿수 와 수수료 소수점 자릿수 체크 및 적용
			if( fixlength >= fixFee ){
				fixFially = fixlength
			}else{
				fixFially = fixFee
			}

			//계산
			var valNum = valStr=='' ? 0 : parseFloat(valStr);
      		var totNum = (valNum + parseFloat(feeVal)).toFixed(fixFially) 
     	    var totStr = totNum.toString();

			if (afc.isPC){
				if(valStr.indexOf('.')>-1){
					var arr = valStr.split('.');
					valStr = UnitManager.numberWithCommas(arr[0]) + '.' + arr[1];
				}else{
					valStr = UnitManager.numberWithCommas(valNum);
				}
     		}
      
			if(totStr.indexOf('.')>-1){
				var arr = totStr.split('.');
				totStr = UnitManager.numberWithCommas(arr[0]) + '.' + arr[1];
			}else{
				totStr = UnitManager.numberWithCommas(totNum);
   		    }
			
			self.ruleForm.withdrawAmountWallet = valStr;
    	    self.totalAmountPriceWallet = totStr;

			if (valNum > 0) {
				self.withdrawKRWNum = Math.floor(totNum*self.withdrawInfo.curt_prc);
			} else {
				self.withdrawKRWNum = 0;
			}
			self.withdrawKRWStr = UnitManager.numberWithCommas(self.withdrawKRWNum);
		},
		tick() {
			let self = this;
			if(self.remaining === 0 && self.countdowning === true){
				self.$timer.stop('tick');
				self.smsvalidateMessage =  self.$t('asset_out.a029')//'유효시간이 만료되었습니다'
				self.smsvalidateMsg = true
				self.certifiCheck = false     //휴대폰인증요청    
				self.confirmCheck = false     //휴대폰인증확인
				self.reCertifiCheck = true    //휴대폰재인증요청
				self.remaining = 180
			}else{
				self.remaining -= 1;
			}
		},
		format(number) { 
			let self = this;
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		},
		formatCoin(number) {
			let self = this;
			let numberArr = number.toString().split(".")
			return numberArr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (numberArr[1] ? "." + numberArr[1] : "")
		},
		myWalletAddress() {
			//출금전자지갑주소 조회
			let self = this
			let tempList = []
			self.$socket.sendProcessByName('dw553', function (queryData) {
				var block = queryData.getBlockData('InBlock1')[0];
				block['user_id'] = self.$store.getters.getUserId
				block['cur_cd'] =  self.getMyAssetstatusInfoCurCd 
				block['req_cnt'] = '%'
			}, function (queryData) {
				if (queryData != null) {
				let addressList = queryData['queryObj']['OutBlock2'];
				for (var idx in addressList) {
					tempList.push({ "value" : addressList[idx].walt_id , "cur_cd" : addressList[idx].cur_cd , "sub_info" : addressList[idx].sub_info , "walt_nm" : addressList[idx].walt_nm })
				}
				if(addressList.length === 0){
					tempList.push({"cur_cd" : '',"message" : self.$t('asset_out.a047')}) // '등록된 주소가 없습니다.
				}else{
					tempList.push({"cur_cd" : '',"message" : ''})
				}
				}else{
					tempList.push({"cur_cd" : '',"message" : self.$t('asset_out.a047')}) // '등록된 주소가 없습니다.
				}
				self.myWalletAddressData = tempList;
			});
		},
		myWalletAddressMobile(){
			//출금전자지갑주소 조회
			let self = this
			self.$socket.sendProcessByName('dw553', function (queryData) {
				var block = queryData.getBlockData('InBlock1')[0];
				block['user_id'] = self.$store.getters.getUserId
				block['cur_cd'] =  self.getMyAssetstatusInfoCurCd	
				block['req_cnt'] = '%'
				console.log("dw553:", block);
			}, function (queryData) {
				if (queryData != null) {
						self.searchData = queryData['queryObj']['OutBlock2'];
				} else {
					// 전문 에러 언어팩 적용
					const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
					if (errorData.trName != "dw553") return

					self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
						dangerouslyUseHTMLString: true,
						confirmButtonText: self.$t('sys_err.a001')
					});
				}
			});
		},
		///////////////// 모바일     //////////////////////////////////////////////////////
		withdrawStep1button(){
			let self = this;
			if(self.getMyAssetstatusInfoCurCd === 'KRW'){
				//원화일경우
				self.withdrawStep1 = false      //기본화면 hide
				self.withdrawStep2 = false  	//암호화 화폐 주소입력 hide
				self.withdrawStep3 = true 		//금액입력 
				self.withdrawStep4 = false 		//sms 인증화면 
			}else{
				//암호화화폐일경우
				self.withdrawStep1 = false      //기본화면 hide
				self.withdrawStep2 = true  		//암호화 화폐 주소입력 show
				self.withdrawStep3 = false 		//금액입력 
				self.withdrawStep4 = false 		//sms 인증화면 
			}
		},
		withdrawStep2button(){
			let self = this;
			let validationcheck = false
			//암호화화폐일경우
			if(self.withDrawWalletAddress === ''){
				self.walletAddressValidationMobile = true
				self.walletAddressValidationMobileText = self.$t('m_wallet_out.a046')
				validationcheck = false
			}else{
				if(self.getMyAssetstatusInfoCurCd === 'ETH' && (self.withDrawWalletAddress.substr(0,2) !== '0x' || self.withDrawWalletAddress.length !== 42)  ){ //암호화 화폐 validation 이더리움 김태형 사원님이 나머지는 정리해서 주시기로 하였슴
					self.walletAddressValidationMobile = true
					self.walletAddressValidationMobileText = self.$t('m_wallet_out.a046')
					validationcheck = false
				}else if(self.getMyAssetstatusInfoCurCd === 'BTC' && ( self.withDrawWalletAddress.substr(0,1) !== '1' || self.withDrawWalletAddress.substr(0,1) !== '3' ) && (self.withDrawWalletAddress.length <= 23  || self.withDrawWalletAddress.length >= 37 )  ){  //BTC : 첫글자가 1또는 3으로 시작하며 전체 길이는 24~36 자 이다
					self.walletAddressValidationMobile = true
					self.walletAddressValidationMobileText = self.$t('m_wallet_out.a046')
					validationcheck = false
				}else{
					validationcheck = true
				}
			}
			
			if(!validationcheck) return false  

			self.walletAddressValidationMobile = false             //모바일 암호화 화폐 validation hide
			self.walletAddressValidationMobileText = ''            //모바일 암화화 화폐 validation 문구 초기화
			self.withdrawStep1 = false      //기본화면 hide
			self.withdrawStep2 = false  	//암호화 화폐 주소입력 show
			self.withdrawStep3 = true 		//금액입력 
			self.withdrawStep4 = false 		//sms 인증화면 
		},

		withdrawStep3button(){
			let self = this;

			self.$refs['ruleForm'].validate((valid) => {  //form validation 
				if(!valid) {
					return false
				}else {
					self.withdrawStep1 = false      //기본화면 hide
					self.withdrawStep2 = false  	//암호화 화폐 주소입력 hide
					self.withdrawStep3 = false 		//금액입력 
					self.withdrawStep4 = true 		//sms 인증화면 
				}
			})

		},
		walletAddressShow(){
		//출금전자지갑 주소 show hide
			let self = this
			if(self.selectAddressWalltState === true){
				self.selectAddressWalltState = false
			}else{
				self.selectAddressWalltState = true
			}
		},
		withdrawWalletAddressCopy(value){
		//출금전자지갑 주소 인풋에 복사
			let self = this
			self.withDrawWalletAddress = value.walt_id

			if(value.sub_info !== '' ){  //추가주소가 있다면
				self.is2ndAddress = true
				self.destinationCode = value.sub_info
			}
			self.selectAddressWalltState = false

		},
		goToCertifyCenterMobile() {
			//인증센터 바로가기
			let self = this;
			self.$router.push({name : 'mMySecurity'});
		},	
		///////////////////////////////////////////////모바일 end/////////////////
		resetData(){
			let self = this
			self.ruleForm.withdrawAmount = ''
			self.ruleForm.withdrawAmountWallet ='' 
			self.ruleForm.walletAddress =''
			
			self.inputValidationDisabled = false        //출금 input , button validation  disabled  초기화
			
			self.totalAmountPrice = 0    
			self.remaining = 180   
			
			self.countdowning = false    //SMS 인증카운터 show , hide
			self.certifiCheck = true     //휴대폰인증요청 버튼   
			self.confirmCheck = false    //휴대폰인증확인 버튼
			self.reCertifiCheck = false  //휴대폰재인증요청 버튼

			self.certifiNum = ''          // sms 인증 번호
			self.smsvalidateMessage = ''  // sms validation message 
			self.smsvalidateMsg = false   // sms validation show hide
			self.smsResultOk = false      // sms 인증성공 disabled

			self.securityNum = '' 	        // 보안 비밀 번호 , otp 번호
			self.attentionConfirm = false   // 출금 confirm 팝업

			self.securityNumvalidateMsg = false //보안비밀번호 validation show hide
			self.securityNumvalidateMessage = '' //보안비밀번호 validation message

			self.otpvalidateMsg = false 	//otp validation show hide
			self.otpvalidateMessage = ''	//otp validation message

			self.is2ndAddress= false						        // 추가 주소 사용 여부
			self.destinationCode = ''                               //추가 주소
			
			self.walletAddressAddPop = false							// 암호화화폐 주소록 추가 팝업
			self.walletAddressDeletePop = false						// 암호화화폐 주소록 삭제 팝업
			self.addWalletName = '' 								// 암호화 화폐 주소추가 이름
			self.addWalletAddress = '' 								// 암호화 화폐 주소추가 주소
			self.destinationAddressChk = false						// 추가주소록 체크박스
			self.addWalletAddressDestiCode = ''                     // 암호화 화폐 주소추가 데스티네이션 코드
		
			self.deleteWalletName = '' 								// 암호화 화폐 주소삭제 이름
			self.deleteWalletAddress = '' 							// 암호화 화폐 주소삭제 주소
			self.deleteWalletAddressDestiCode = ''                  // 암호화 화폐 주소삭제 데스티네이션 코드
			self.addWalletAddressValidation = false 
			
			self.totalAmountPriceWallet = 0                         // 암호화화폐 출금 : 총 출금

			self.withdrawOkayPopClose = false //출금제한 모달팝업 배경 클릭 금지
			self.withdrawOkayPopBtnType = ''
			self.withdrawOkayPop = false
			self.withdrawOkayPopText = '' 
			
			self.withdrawStep1 = true
			self.withdrawStep2 = false
			self.withdrawStep3 = false
			self.withdrawStep4 = false
			self.withDrawWalletAddress= ''  	 				//모바일 암호화화폐 주소
			self.selectAddressWalltState= false  				//출금 전자지갑 show hide
			self.withdrawAmount = ''     						//출금금액
			self.requestWithdrawState = true					//출금요청버튼 활성화 비활성화
			self.destinationDialogVisible= false
			self.depositDialogVisible= false
			self.withdrawalSmsDialogVisible= false
			self.availableDialogVisible= false
			self.addAddressBookDialogVisible= false    			//출금 전자지갑 주소 등록 팝업
			if(self.$refs['ruleForm'] !== undefined){
				self.$refs['ruleForm'].resetFields();
			}
		},
		unregisterRealKVM2() {
		const self = this;
		if (self.beforeSymbol != '') {
			self.$socket.unregisterReal('KVM2', [self.beforeSymbol], 'withdraw');
		}
		},
		registerRealKVM2() {
		const self = this;
		var symbols = self.getPairsByCds([self.getMyAssetstatusInfoCurCd]).map(item => item.o_symbol);
		console.log(symbols);
		if (symbols.length > 0) {
			self.symbol = symbols[0];
			self.$socket.registerReal("KVM2", "symbol", [self.symbol], 'withdraw', self.callbackKVM2);
		} else {
			self.symbol = '';
		}
		self.beforeSymbol = self.symbol;
		},
		callbackKVM2(queryData) {
		if (queryData && queryData.getBlockData("OutBlock1")[0]) {
			let data = queryData.getBlockData("OutBlock1")[0];
			console.log(data);
			const self = this;
			console.log(self.symbol, data.symbol);
			if (self.symbol != data.symbol) {
			return;
			}
			self.withdrawInfo.curt_prc = data.curprc;
			self.onlyNumberWallet();
		}
		},
		selectWithdrawbaseInfo() {
		//출금한도및 수수료 조회
		const self = this;
		if(self.getMyAssetstatusInfoCurCd === '') return;
		
		//리얼데이터 해지
		self.unregisterRealKVM2();
		self.$socket.sendProcessByName('dw551', (queryData) => {
			var block = queryData.getBlockData('InBlock1')[0];
			block['user_id'] = self.$store.getters.getUserId;
			block['cur_cd']  = self.getMyAssetstatusInfoCurCd 
			}, (returnData) => {
				if( returnData ) {
					let res = returnData.getBlockData('OutBlock1')[0]
					self.withdrawInfo = res;

					//현재가 저장 및 리얼데이터 등록
					if (self.getMyAssetstatusInfoCurCd != 'KRW') {
						self.registerRealKVM2();
					}
				} else {
					// 전문 에러 언어팩 적용
					const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
					if (errorData.trName != "dw551") return

					self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
						dangerouslyUseHTMLString: true,
						confirmButtonText: self.$t('sys_err.a001')
					});
				}
			})
		},
		changeCoin() {
		const self = this;
		if (self.getMyAssetstatusInfoCurCd !== '' && self.getMyAssetstatusInfoCurCd !== 'KRW') {
			afc.isPC?self.myWalletAddress():self.myWalletAddressMobile();
		}
		self.selectWithdrawbaseInfo();
		},
		//메인이동
		goMain() {
			if(afc.isPC == true)
				this.$router.push({ name: 'main' });
			else
				this.$router.push({ name: 'mMain' });
		}
	},
	
  	created() {
		let self = this
		self.$EventBus.$on('resetWithdrawData', () => {
			self.resetData()
		});	
  	    self.$EventBus.$on('selectWithdrawbaseInfo', self.selectWithdrawbaseInfo);
    
        //입금, 출금, 입출금내역중 출금tab 눌렀을때 발생
		self.$EventBus.$on('withdrawValidation', () => {
			//1.핸드폰 미인증
			if(self.getInfoUser.mobl_auth_tp !== '1' && self.getDepositWithdrawTabIndex === '1'){
				self.withdrawOkayPopText =  self.$t('asset_out.a056')//'안전한 자산 출금을 위해 휴대폰 번호 등록 후 서비스 이용이 가능합니다.';
				self.withdrawOkayPopBtnType = 2;
				self.withdrawOkayPop = true
			// 2021.08.25 OG 보안인증번호, OTP번호 체크 제거
			// }else if( (self.getInfoUser.secu_auth_tp !== '1' && self.getInfoUser.secu_auth_tp !== '3') && self.getDepositWithdrawTabIndex === '1'  ){
			// //2.보안비밀번호 또는 OTP 미인증
			// 	self.withdrawOkayPopText =  self.$t('asset_out.a054') //'안전한 자산 출금을 위해 보안비밀번호 또는 OTP 설정 후 서비스 이용이 가능합니다.';
			// 	self.withdrawOkayPopBtnType = 2;
			// 	self.withdrawOkayPop = true;
			}else{
			  //3.출금차단
				//초기화
				self.$store.commit('setWithdrawBlackStat', '');
				//조회
				self.$socket.sendProcessByName('dw550', (queryData) => {
					var block = queryData.getBlockData('InBlock1')[0];
					block['user_id'] = self.$store.getters.getUserId;
					block['cur_cd']  = self.getMyAssetstatusInfoCurCd
				}, (returnData) => {
					if( returnData ) {
						let res = returnData.getBlockData('OutBlock1')[0]
          			    self.$store.commit('setWithdrawBlackStat', res.black_stat);
					} else {
						let errorData = window.sessionStorage.getItem('lastErrorData')
						if (errorData !== null) {
							errorData = JSON.parse(errorData)
							if (errorData.trName === 'dw550') {
								self.$store.commit('setWithdrawBlackStat', errorData.errCode);
								if(self.getDepositWithdrawTabIndex === '1' && self.getWithdrawBlackStat !== '0'){
               					    // '출금이 일시적으로 차단된 계정입니다. <br>'
									//+ '출금 차단 해제를 위해서 고객센터로 문의 부탁드립니다. <br>'
									//+ '1588-5588 <br>'
									//+ '[고객센터 09:00~18:00]';
									self.withdrawOkayPopText = self.$t('asset_out.a053');
									self.withdrawOkayPopBtnType = 1;
									self.withdrawOkayPop = true;
								} else {
									// 전문 에러 언어팩 적용
									self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
										dangerouslyUseHTMLString: true,
										confirmButtonText: self.$t('sys_err.a001')
									});
								}
							} 
						}
					}
				})
			}
		});
	},
	mounted () {
    	let self = this
		if (self.$store.getters.isSocketConnected) {
			self.changeCoin();
		} else {
			self.$EventBus.$on('socketConnected', self.changeCoin);
		}
	},
	beforeDestroy() {
		let self = this
		self.$EventBus.$off('selectWithdrawbaseInfo', self.selectWithdrawbaseInfo);
		self.$EventBus.$off('withdrawValidation');
		self.$EventBus.$off('resetWithdrawData');
		self.$EventBus.$off('socketConnected', self.changeCoin);
		self.unregisterRealKVM2();
  }
};
</script>
