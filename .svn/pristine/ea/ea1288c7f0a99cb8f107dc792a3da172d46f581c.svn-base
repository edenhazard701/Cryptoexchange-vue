<template>
	<section class="Deposit" v-show="onloaded">
		<!-- 시작 : 입금 > 입금서비스를 제공하지 않을 때 -->
		<div v-if="getAdminWalletState === '0'" class="coin-wrap">
			<div class="coin-prepare">
				<span class="coin-name">{{ getMyAssetstatusInfoCurCd }}</span> {{$t('asset_in.a069')}}  <!-- 입금 서비스 준비중 입니다. -->
			</div>
			<div class="coin-info">
				{{$t('asset_in.a013')}} <!--이용에 불편을 드려 죄송합니다. --><br>
				{{$t('asset_in.a014')}} <!--자세한 문의사항은 1588-5588 고객센터 또는 1:1 문의를 이용해주세요. -->
			</div>
			<!-- <div class="coin-tel">
				고객센터 1588-5588
				<el-button plain>1:1 이메일 문의</el-button>
			</div> -->
		</div>
		<!-- 끝 : 입금 > 입금서비스를 제공하지 않을 때 -->

    <!-- 계좌 인증을 완료하지 않은 회원 view -->
    <div v-else-if="getMyAssetstatusInfoCurCd === 'KRW' && getInfoUser.bact_auth_tp !== '1'" class="not-account-certify-view">
      {{$t('asset_in.a015')}}  <!--금융사고 예방과 투명한 거래환경 조성을 위해 실명확인 계좌 인증 후 사용이 가능합니다. -->
      <!-- <el-button @click="goToCertifyCenter">{{$t('asset_in.a016')}} </el-button> --><!--인증센터 바로가기 -->
    </div>

		<!-- 원화 입금 레이아웃 -->
		<div v-else-if="getMyAssetstatusInfoCurCd === 'KRW'" class="krw-deposit-view" :class="{'one-click': depositType === 'oc'}">
			<!-- 가상 계좌 입금 -->
			<!-- <div v-if="depositType === 'va'"> 
				<div class="deposit-info">
					<el-row>
						<el-col :span="4" class="title">계좌번호</el-col>
						<el-col :span="20">{{virtualAccountData.acct_no}}</el-col>
					</el-row>
					<el-row>
						<el-col :span="4" class="title">은행</el-col>
						<el-col :span="8">{{virtualAccountData.bank_nm}}</el-col>
						<el-col :span="4" class="title">예금주</el-col>
						<el-col :span="8">{{virtualAccountData.cmf_nm}}</el-col>
					</el-row>
				</div>

				<div class="warning">
					<div class="warning-title"><i class="el-icon-warning"></i> 입금 전 유의사항</div>
					<ul>
						<li class="dot">코벡스에서 실명 인증이 완료된 계좌에서 입금해야만 입금 처리가 완료됩니다.</li>
						<li class="dot">입금자명이나 받는통자메모란에 발급된 입금자명을 정확하게 입력해주세요.</li>
						<li class="dot">입력하신 금액은 입금하신 금액과 정확하게 일치해야 합니다.</li>
						<li class="dot">가상계좌 입금 후 반영까지 약 5분 정도 소요 됩니다.</li>
						<li class="dot">모든 출금건은 관리자 심사를 진행하며, 금융사고 예방을 위해 첫 입금 후 72시간 출금이 제한됩니다. (최초1회) </li>
						<li class="dot">실명 인증된 계정을 타인에게 대여하는 경우 개인정보 노출 위험에 처할 수 있습니다.</li>
						<li class="dot">은행 점검시간 (매일 23:00~12:30)에는 입출금이 불가능 합니다</li>
					</ul>
				</div>
				<div class="account-info">
					<div class="account-info-title">실명 인증 입출금 계좌 번호</div>
					<div class="account-number">{{certifyAccount.bank_nm}} {{certifyAccount.acct_no | accountFilter}}</div>
					<div class="account-name">(예금주: {{certifyAccount.cmf_nm }})</div>
				</div>
			</div> -->

			<!-- 법인 계좌 입금 -->
			<!-- <div v-else-if="depositType === 'ca'">
				<div class="deposit-info">
					<el-row>
						<el-col :span="4" class="title">계좌번호</el-col>
						<el-col :span="20">{{corporateAccountData.acct_no}}</el-col>
					</el-row>
					<el-row>
						<el-col :span="4" class="title">은행</el-col>
						<el-col :span="8">{{corporateAccountData.bank_nm}}</el-col>
						<el-col :span="4" class="title">예금주</el-col>
						<el-col :span="8">{{corporateAccountData.cmf_nm}}</el-col>
					</el-row>
				</div>
				
				<div>
					<div class="deposit-caution">*반드시 아래 입금자명과 입력하신 입금금액이 일치해야만 입금이 완료됩니다.</div>
					<div class="deposit-input">
						<el-row>
							<el-col :span="4" class="title">입금자명</el-col>
							<el-col :span="8">{{depositor}}</el-col>
							<el-col :span="4" class="title">입금금액</el-col>
							<el-col :span="8" class="input-wrap"><el-input placeholder="입금금액을 입력해주세요" v-model="depositAmount"></el-input></el-col>
						</el-row>
					</div>
				</div>

				<div class="deposit-btn">
					<el-button type="plain" @click="requestDeposit">입금요청</el-button>
				</div>

				<div class="warning">
					<div class="warning-title"><i class="el-icon-warning"></i> 입금 전 유의사항</div>
					<ul>
						<li class="dot">코벡스에서 실명 인증이 완료된 계좌에서 입금해야만 입금 처리가 완료됩니다.</li>
						<li class="dot">입금자명이나 받는통자메모란에 발급된 입금자명을 정확하게 입력해주세요.</li>
						<li class="dot">입력하신 금액은 입금하신 금액과 정확하게 일치해야 합니다.</li>
						<li class="dot">가상계좌 입금 후 반영까지 약 5분 정도 소요 됩니다.</li>
						<li class="dot">모든 출금건은 관리자 심사를 진행하며, 금융사고 예방을 위해 첫 입금 후 72시간 출금이 제한됩니다. (최초1회) </li>
						<li class="dot">실명 인증된 계정을 타인에게 대여하는 경우 개인정보 노출 위험에 처할 수 있습니다.</li>
						<li class="dot">은행 점검시간 (매일 23:00~12:30)에는 입출금이 불가능 합니다</li>
					</ul>
				</div>
			</div> -->

			<!-- 원클릭 입금 -->
			<div class="oneClick"> 
				<div class="oneclick-bnr">
					<span v-html="$t('asset_in.d001')"></span><br>   <!-- 같지만 더 <span class="caution">안전</span>한 시스템<br> -->
					<h2>{{$t('asset_in.d002')}} <!--코벡스 원클릭 입금서비스 --></h2>
				</div>

				<div class="oneclick-info">
					<div class="label">{{$t('asset_in.d003')}} <!--원클릭 입금서비스란? --> </div>
					{{$t('asset_in.d004')}} <!-- 고객님들의 빠른 원화 입금을 위해 코벡스가 준비한 안전하고 편리한 원화 입금 서비스 입니다. --><br>
					{{$t('asset_in.d005')}} <!--코벡스 원클릭 입금 서비스는 1금융권에서 검증된 안전한 솔루션으로 국내 5대 은행사의 계좌에서 
					즉시 이체가 가능합니다. --><br>
					{{$t('asset_in.d006')}} <!-- 특화된 입금서비스를 통해 빠르고 간편하게 암호화를 거래하세요. -->

					<div class="title"><i class="ico-info"></i> {{$t('asset_in.d007')}} <!--입금 후 반영까지 단 3초, 입금하고 바로 거래하자 --></div>
				</div>

				<div class="oneclick-account">
					<div class="label">{{$t('asset_in.a065')}} <!--실명 인증 입출금 계좌 정보 --></div>
					{{getMyAccountData.bank_nm}} {{getMyAccountData.acct_no | accountFilter}} &nbsp;&nbsp; ( {{$t('asset_in.a043')}}<!--예금주 -->: {{user_name | nameFilter}} )
				</div>

				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="oneclick-form">
					<el-form-item :label="$t('asset_in.a045')"  prop="oneclickAmount" class="oneclick-input"> <!-- 입금금액 -->
						<el-input :placeholder="$t('asset_in.c001')" v-model="ruleForm.oneclickAmount"  @keyup.native="onlyNumber" class="oneclick-input-obj" :class="$i18n.locale == 'en' ? 'en' : ''"></el-input> <!--금액을 입력해주세요. -->
						<span class="unit">{{$i18n.locale !== 'en' ? '원': 'WON' }} (KRW)</span>
					</el-form-item>

					<el-form-item class="submit-btn-wrap" label-width="0">
						<el-button type="primary" @click.native.prevent="oneclickDeposit" :class="{'disabled': oneclickAmountCheck }">{{$t('asset_in.d008')}} <!--입금하기 --></el-button>
					</el-form-item>
				</el-form>
				
				<div class="oneclick-explain">
					<dl>
						<dt>{{$t('asset_in.d032')}} <!--간편하고, 더 빠르게 --></dt>
						<dd>{{$t('asset_in.d033')}} <!--입금 후 반영까지 단, 3초 --></dd>
					</dl>
					<dl>
						<dt>{{$t('asset_in.d034')}} <!--검증된 솔루션, 안전한 보안 --></dt>
						<dd>{{$t('asset_in.d035')}} <!--금융권에서 검증된 솔루션 --></dd>
					</dl>
					<dl>
						<dt>{{$t('asset_in.d036')}} <!--국내 대표 5대 은행지원 --></dt>
						<dd>
							<span class="bank shinhan"></span>
							<span class="bank ibk"></span>
							<span class="bank kb"></span>
							<span class="bank woori"></span>
							<span class="bank hana"></span>
						</dd>
					</dl>
				</div>

				<div class="warning">
					<div class="warning-title"><i class="el-icon-warning"></i> {{$t('asset_in.d037')}} <!--유의사항 --></div>
					<ul>
						<li class="dot">{{$t('asset_in.d038')}} <!-- 500만원 미만 입금일 경우 잔고가 즉시 반영됩니다.  --></li>
						<li class="dot">{{$t('asset_in.d039')}} <!-- 500만원 이상 입금하실 경우 반영까지 최대 5분 정도 소요될 수 있습니다. --></li>
						<li class="dot">{{$t('asset_in.d040')}} <!-- 입금중 인터넷이 끊기거나 기타 오류가 발생했을 경우 고객센터로 연락해 주세요. --></li>
						<li class="dot">{{$t('asset_in.d041')}} <!-- 입금 진행을 위해서는 입금 모듈과 보안프로그램 설치가 필수입니다. --></li>
					</ul>
				</div>
			</div>
		</div>
		<!-- end of 원화 입금 레이아웃 -->

    <!-- 가상화폐 입금 레이아웃 -->
		<div v-else class="coin-deposit-view">
      <div v-if="getMyAssetstatusInfoCurCd !== 'KRW' && getwalletInfo.Wallet_UseState">
        <span class="title">{{$t('asset_in.a017' , [ getMyAssetstatusInfoCurCd ]) }}  </span> <!-- {{getMyAssetstatusInfoCurCd}} 입금주소   -->
        <div class="address" id="walletId">{{getwalletInfo.wallet_Id}}</div>
        <el-button type="plain" @click="copyToClipboard(getwalletInfo.wallet_Id)" class="">{{$t('asset_in.a018')}} <!--주소 복사 --></el-button>

        <div v-if="getMyAssetstatusInfoCurCd !== 'KRW' && getwalletInfo.Wallet_SubInfo !== ''" class="destination-tag">
          <el-row class="tag-title">
            <el-col :span="24">
              {{$t('asset_in.a035')}} <!-- 데스티네이션 태그 -->
              <el-popover placement="bottom" width="420">
                <span>
                  {{$t('asset_in.a036')}} <!--일부 암호화폐는 출금시 데스티네이션 태그 또는 추가주소를 입력해야 정상적으로 입금이 완료됩니다. --><br><br>
                  {{$t('asset_in.a037')}} <!--※ 주소 복사 붙여넣기시 제대로 입력이 되지 않을 수 있습니다.
                  지갑 주소와 추가주소는 꼭 다시 한번 확인해 주세요. -->
                </span>
                <el-button slot="reference" icon="el-icon-question" class="question"></el-button>
              </el-popover>
            </el-col>
          </el-row>
          <el-row class="tag-cont">
            <el-col>
              {{getwalletInfo.Wallet_SubInfo}}
            </el-col>
            <el-col class="tag-cont-btn">
              <el-button type="primary" @click="copyToClipboard(getwalletInfo.Wallet_SubInfo)">{{$t('asset_in.a039')}} <!--복사하기 --></el-button>
            </el-col>
          </el-row>
        </div>
        <div class="qrcode-wrap">
          <span class="title">{{$t('asset_in.a019')}} <!--QR 코드 스캔 --></span>
          <div class="qrcode-code" id="qrWrapper">
            <canvas id="canvas"></canvas>
          </div>
        </div>
      </div>
      <div v-else class="depositBtn">
        <el-button type="primary" style="width:170px;margin-bottom:15px;" @click="getDepositAddress">{{ $t('asset_in.a075' , [ getMyAssetstatusInfoCurCd ]) }} <!-- {0} 입금주소 발급받기 --></el-button>
      </div>
			<div class="warning">
				<div class="warning-title"><i class="el-icon-warning"></i>{{$t('asset_in.a020')}} <!-- 입금 전 유의사항 --></div>
				<ul>
					<li class="dot" v-html="$t('asset_in.a073', [ getMyAssetstatusInfoCurCd , getCoinName(getMyAssetstatusInfoCurCd) ,  getMyAssetstatusInfoCurCd ] )"></li> 
					<li class="dot">{{$t('asset_in.a070')}}</li>  <!-- 위 주소로 다른 암호화폐 입금시 블록체인 특성상 절대 복구가 불가능합니다. --> 
					<li class="dot">{{$t('asset_in.a071')}}</li> <!-- 입금내역은 지정한 Confirmation이 발생한 후 입금처리가 완료되며, 고객님의 소중한 자산 보호를 위해 암호화폐별 Confirmation 수는 다를 수 있습니다. --> 
					<li class="dot">{{$t('asset_in.a072')}}</li> <!--  입금완료는 블록체인 네트워크 사정에 따라 평균 입금 시간보다 지연될 수 있습니다. --> 
				</ul>
			</div>
		</div>
		<!-- end of 가상화폐 입금 레이아웃 -->


		<!-- 확인창, 컴펌창, 팝업창 시작 -->
		<!-- 입금금액 입력여부 확인창 -->
		<el-dialog :visible.sync="amountOkayPop" width="320px">
			<div class="popup-text"><span>{{amountOkayText}}</span></div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="amountOkayPop = false">{{$t('asset_in.a074')}}</el-button>
			</span>
		</el-dialog>

		<!-- 입금금액 입력여부 컴펌창 -->
		<!-- <el-dialog :visible.sync="attentionConfirm" width="480px">
			<h2>3가지만 꼭 확인해 주세요.</h2>
			<ul>
				<li class="check">거래소에서 실명인증이 완료된 계좌에서 입금하셔야 입금처리가 완료됩니다.</li>
				<li class="check">발급된 입금자명은 실제 입금시 입금자명 또는 받는통장메모란에 정확하게 입력해주셔야 합니다.</li>
				<li class="check">화면에 입력하신 금액과 실제 입금금액은 동일하게 입금하셔야 합니다.</li>
			</ul>
			<div class="dialog-info">
				<span class="caution"># 실명 인증 계좌정보:</span><br>
				신한은행 110*******220 (예금주: 홍길동)<br>
				<span class="caution"># 입금자명 또는 받는통장 메모:</span><br>
				홍길동 30284<br><br>
				상위 정보와 실 입금정보가 다를 경우 입금이 지연됩니다.
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="attentionConfirmRes(false);">취소</el-button>
				<el-button type="primary" @click="attentionConfirmRes(true);">확인</el-button>
			</span>
		</el-dialog> -->
		<!-- 확인창, 컴펌창, 팝업창 끝 -->

		<!-- 원클릭 입금 진행 중 팝업 -->
		<el-dialog :visible.sync="oneProgress" class="one-progress-pop" width="320px" :close-on-click-modal="oneProgressCloseOption">
			<div class="kovex-logo"></div>
			<div class="progress">
				<div class="spin"></div>
			</div>
			<div class="progress-text">{{$t('asset_in.d031')}} <!--입금 진행중 입니다.--></div>
		</el-dialog>

		<!-- 원클릭 입금 완료 팝업 -->
		<el-dialog :visible.sync="oneclickOk" :title="$t('asset_in.f022')" class="oneclick-ok-pop" width="420px">  <!--  입금이 완료되었습니다.  -->
			<div class="oneclick-ok-info">
				<ul>
					<li>{{$t('asset_in.f023')}}  <!--500만원 미만 입금 시 잔고가 즉시 반영됩니다. --></li>
					<li>{{$t('asset_in.f024')}}  <!--500만원 이상 입금 시 잔고 반영까지 최대 5분 정도 소요될 수 있습니다. --></li>
				</ul>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="oneclickComplte">{{$t('asset_in.a074')}}</el-button>
			</div>
		</el-dialog>
		<!--  oneclick 설치후 설치완료 리턴 클릭이벤트용 -->
		<input type="hidden" id="CompleteSecure" @click="CompleteSecure"></div>

	</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import QRCode from 'qrcode'

export default {
  data () {
    const validatecheck = (rule, value, callback) => {
      var validateValue = value.toString().replace(/,/g,"");
      if (isNaN(Number(validateValue))) {
        callback(new Error(this.$t('asset_in.f025'))); //'숫자만 입력가능합니다.' 
        this.oneclickAmountCheck = true;
      } else if(Number(validateValue) < 5000) {
        callback(new Error(this.$t('asset_in.f015'))); //'입금 최소금액은 5000원 이상입니다.' 
        this.oneclickAmountCheck = true;
      } else if(Number(validateValue) > 999999999999) {
        callback(new Error(this.$t('asset_in.f016'))); //'최대 입금가능 금액을 초과하였습니다.'
        this.oneclickAmountCheck = true;
      } else {
        callback();
        this.oneclickAmountCheck = false;
      }
    }
    return {
      onloaded : false ,              // 렌더링 완료 후 화면 보여주기 상태 
      depositType : 'oc',				// 입금 종류 -   가상계좌: va,법인계좌 : ca , 원클릭 : oc
      /*원클릭 계좌 정보 */
      oneClickAccountData : {
        bank_nm : '',   // 은행명
        bank_cd : '',	// 은행코드
        acct_no : '',	// 계좌번호
        moth_bank_nm : '', // 모계좌은행명
        moth_bank_cd : '', // 모계좌은행코드
        moth_acct_no : ''  // 모계좌계좌번호
      },
      user_name : '' ,  // 회원이름
      auth_mobl_no : '',// 핸드폰 번호 
      oneclickAmountCheck: true,
      ruleForm: {
        name: '',
        oneclickAmount: ''
      },
      rules: {
        oneclickAmount: [{ validator: validatecheck, trigger: ['blur', 'change'] }]
      },
      oneProgressCloseOption : false, //모달팝업 배경  닫힘  금지
      oneProgress: false,             //입금 진행중

      amountOkayText: '',				//입금금액 확인창 텍스트
      amountOkayPop: false,			//입금금액 확인창 노출여부
      
      safetyProgram: false,		 	//은행보안프로그램 설치 여부
      oneclickOk: false,              //oneClick 입금완료 확인 팝업 

      // 모바일
      depositselect : false , // 입금 방법 설정 임시 원화는 입금을 막아서 false 로 고정
      depositDialogVisible: false,
      destinationDialogVisible: false

      /* 입금 탭 */
      //isCorporation: true,								// 법인계좌(true), 가상계좌(false) 구분
      //depositAccountNumber: '110-365-635728',	            // 출금 계좌번호
      //bankName : '신한은행',					             // 은행명
      //depositAccountHolder: '(주)한국가상화폐거래소',       // 입금 계좌주
      //depositor: '장지은14546',			 	             // 입금자명
      //depositAmount: '',						            // 입력 입금 금액
      //attentionConfirm: false,							// 3가지 주의사항 컨펌창

      //입출금 계좌정보 
      /*실명 인증 계좌 정보*/
      //certifyAccount : {
      //	bank_nm : '하낭',   // 은행명
      //	bank_cd : '001',	// 은행코드
      //	acct_no : '123456789123456',	// 가상계좌번호
      //	cmf_nm : '우주최강짱지은'		// 예금주명
      //},
      /* 가상 계좌 정보 */
      //virtualAccountData : {			
      //	bank_nm : '신낭',   // 은행명
      //	bank_cd : '001',	// 은행코드
      //	acct_no : '123465',	// 가상계좌번호
      //	cmf_nm : '장지은'		// 예금주명
      //},

      /* 법인 계좌 정보 */
      //corporateAccountData : {			
      //	bank_nm : '법잍',   	// 은행명
      //	bank_cd : '001',		// 은행코드
      //	acct_no : '987654321'	// 가상계좌번호
      //},
    };
	},
	computed :{
		...mapGetters(['getwalletInfo', 'getMyAccountData', 'getMyAssetstatusInfoCurCd', 'getInfoUser', 'getMyAssetstatusInfo', 'getAdminWalletState', 'getCoinByCd', 'getLangKind']),
	},
	filters: {
		accountFilter(value) {
			value = String(value);
			// 계좌번호 4 ~ 9 번째 자리 * 표시
			var str1 = value.substring(0,3);
			var str2 = value.substring(value.length -3);

			return str1 + '*********' + str2;
		},
		nameFilter(value) {
			if(value === '') return
			var str1 = '';
			var str2 = '';
			var str3 = '';

			str1 = value.substring(0, 1);
			if (value.length === 2) {
				return str1 + '*';
			} else if (value.length > 2) {
				for(var i = 0; i< value.length - 2 ; i++) {
					str2 = str2 + '*';
				}
				str3 = value.substring(value.length - 1);
			} 
			return str1 + str2 + str3;
			// 외자 - 맨뒤 *
			// 3글자 - 가운데 *
			// 4글자 - 가운데 두개 *
		}
	},
  methods : {
    getDepositAddress() {
      const self = this;
      // 지갑 발급 dw101
      self.$store.dispatch('giveCoinWallet', { cur_cd: self.getMyAssetstatusInfoCurCd }).then( data => {
        self.$alert(self.$t('asset_in.a076'), '', {
          confirmButtonText: self.$t('sys_err.a001')
        });
        self.$EventBus.$emit('qrcodeMake');
      }).catch((errorData) => {
        self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
          confirmButtonText: self.$t('sys_err.a001')
        });
      });
    },
		getCoinName(curCd) {
			let self = this;
			var langKey;
			if (self.getLangKind == 'KR') {
					langKey = 'cur_kor_nm';
			} else if (self.getLangKind == 'EN') {
					langKey = 'cur_eng_nm';
			}
			var name = self.getCoinByCd(curCd) ? self.getCoinByCd(curCd)[langKey] : ''
			return name;
		},
    //암호화 화폐 주소 또는 데스티네이션 코드 복사 
    copyToClipboard(value) {
			let self = this;
			let $temp = $("<input>");
			$("body").append($temp);
			$temp.val(value).select();
			document.execCommand("copy");
			$temp.remove();

			// 주소복사 알림 toast
			let msgCnt = $('.notify_order_reject').length;
			if (msgCnt == '0') {
				if (msgCnt > 0) return;

				self.$message({
					message: self.$t('asset_in.a024'),
					customClass: 'notify_order_reject not-sign web',
					duration: 2000
				});
			}
    },
    //인증센터 바로가기
		goToCertifyCenter() {
			let self = this;
			self.$router.push({name : 'mypageSecurity'});
    },
    // 원클릭 입금 - 입금진행중 popup
		oneclickDeposit() {
			let self = this;
			self.oneProgress = true;               //진행중 레이어 팝업 호출

			if (self.safetyProgram) {                //은행프로그램 설치 완료 
				self.sendBankingData();            //oneClick 모듈 내로 데이터 전송 
			} else {
				if (self.getLangKind == 'KR') {     //은행프로그램 설치 필요시 
					let popup = window.open('/static/safety/securityProgram_kr.html?outBankCd='+self.getMyAccountData.bank_cd,'oneclick')  //한글버전
				} else if(self.getLangKind == 'EN') {
					let popup = window.open('/static/safety/securityProgram_en.html?outBankCd='+self.getMyAccountData.bank_cd,'oneclick')  //영문버전	 
				}
				self.oneProgress = false;          //진행중 레이어 팝업 종료
			}			
    },
    //입금 완료 시 
		oneclickComplte() {
			let self = this;
			//입금 입력 데이터 초기화
			self.resetData();
			//입출금 새로고침
			self.$EventBus.$emit('depositReload'); 
			//입출금내역 탭 인덱스
			self.$store.commit('setDepositWithdrawTabIndex', '2');
			//입출금내역 탭 이름  
			self.$EventBus.$emit('depositTabChange', 'history');
			//입출금내역 탭 조회 
			self.$EventBus.$emit('tabHistory', 'deposit');  
		},
		attentionConfirmRes(res) {
			if (res) { // 확인
				this.amountOkayText = this.$t('asset_in.f003') //'입금요청이 완료되었습니다.'
				this.attentionConfirm = false;
				this.amountOkayPop = true;
			} else { // 취소
				this.attentionConfirm = false;
			}
		},
		onlyNumber() {
			this.ruleForm.oneclickAmount = this.ruleForm.oneclickAmount.replace(/[^0-9]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		checkMocule() {
			console.log('설치프로그램 체크');
			var self = this;
			securityModule({bankId : self.getMyAccountData.bank_cd} , function(fwscheck, bankcheck, scrappingData) {
				console.log('fwscheck==>',fwscheck);
				console.log('bankcheck==>',bankcheck);
				if (!fwscheck || !bankcheck) {
					// 언어팩 영문 한글 구분 if문에 
					///static/safety/securityProgram_kr.html
					///static/safety/securityProgram_kr.html
					self.safetyProgram = false;
				} else {
					self.safetyProgram = true;
				}
			});
		},
		sendBankingData() {
			let self = this;
			//RESTFULSERVICE TEST 
			//59.6.135.38:4790/api/bank/trans?sv_param=19022014061252/048/665939141252/088/110489643124/5000  각 서버 IP 에 맞게끔 URL 실행 하여 결과값이 N 이 나오는지 확인(연결되지 않거나 실패시 RESTFUL API 열리지 않음) 
			/*************************************************************************/
			/* 원화(KRW)입금실행                           
			/*************************************************************************/
			// 트랜젝션 ID, 거래일자 , 거래시각
			let trxId = '' ;  // 트랜젝션 ID
			let trd_Dt = '' ; // 거래일자 
			let trd_Tm = '' ; // 거래시각
			// 원화입금요청
			let trd_amt = self.ruleForm.oneclickAmount.toString().replace(/,/g,"");
			self.$socket.sendProcessByName('dw124', (queryData) => {
				var block = queryData.getBlockData('InBlock1')[0];
				//출금은행
				block['user_id'] = self.$store.getters.getUserId;
				block['bank_cd'] = self.getMyAccountData.bank_cd;
				block['acct_no'] = self.getMyAccountData.acct_no;
				block['trd_amt'] = trd_amt;
			}, (returnData) => {
				if( returnData ) {
					var OutBlock1 = returnData['queryObj']['OutBlock1'][0];    
					trd_Dt = OutBlock1.trd_dt;
					trd_Tm = OutBlock1.trd_tm;
					trxId  = OutBlock1.txid;

					var sid_param   = "s1" + self.getMyAccountData.bank_cd.substring(1,3) + "0302"; // 출금은행 은행코드(2자리)

					//트랜젝션ID|입금은행코드|입금계좌번호|출금은행코드|출금계좌번호|거래금액  004/71370101245473/
					var req_sv_param = trxId+'/'+self.getMyAccountData.moth_bank_cd+'/'+self.getMyAccountData.moth_acct_no+'/'+self.getMyAccountData.bank_cd+'/'+self.getMyAccountData.acct_no+'/'+trd_amt 
					var paramObj = {
						service_key : 'e73c7d0da7d54c56ab8ddaee4f9b5452' , 			//서비스키
						sid : sid_param,											//출금은행 은행코드
						tran_count : '1',
						acct_pwd0 : '',           									//?
						tran_in_bank_id0 : self.getMyAccountData.moth_bank_cd,//'004',//self.getMyAccountData.moth_bank_cd,   //입금 은행코드
						tran_in_acct_no0 : self.getMyAccountData.moth_acct_no,//'71370101245473',//self.getMyAccountData.moth_acct_no,   //입금 계좌번호
						tran_amount0 : trd_amt,     								//이체금액
						tran_out_acct_no0 : self.getMyAccountData.acct_no,       //출금계좌번호
						tran_receiver0 : trxId,   									//입금통장메모
						tran_sender0 : trxId,     									//출금통장번호

						pay_use : 'COIN',      										//스크립트이용사이트구분
						pay_dlg_type : '',     
						sv_host_ip : process.env.RESTFUL_API,       	 				//거래소RestFul IP
						sv_port_no : '4792',       									//거래소RestFul 서버포트
						sv_page : '/api/bank/trans',          		//거래소RestFul url[도메인 이하 경로]
						sv_param : req_sv_param,         							//트랜젝션ID|입금은행코드|입금계좌번호|출금은행코드|출금계좌번호|거래금액

						tran_tel : self.auth_mobl_no,      										//고객전화번호전체
						tran_tel_num1 : self.auth_mobl_no.substring(0,3), 										// 고객전화번호 [지역번호]
						tran_tel_num2 : self.auth_mobl_no.substring(3,self.auth_mobl_no.length-4), 										// 고객전화번호 [국번]
						tran_tel_num3 : self.auth_mobl_no.substring(self.auth_mobl_no.length-4,self.auth_mobl_no.length), 										// 고객전화번호 [전화번호]

						timeout : '600', 
						err_msg : '',
						logJson : ''
					}
					oneClickPro(paramObj , function(resultcheck , code , dataCode , dataErrMsg) {
						//원화 입금처리
						self.$socket.sendProcessByName('dw125', (queryData) => {
							var block = queryData.getBlockData('InBlock1')[0];
							block['user_id'] = self.$store.getters.getUserId;
							block['trd_dt'] = trd_Dt;
							block['trd_tm'] = trd_Tm;
							block['bank_cd'] = self.getMyAccountData.bank_cd;
							block['acct_no'] = self.getMyAccountData.acct_no;
							block['trd_amt'] = trd_amt;
							block['txid'] = trxId;
							block['proc_yn'] = resultcheck ? 'Y' : 'N';
							block['err_msg'] = dataErrMsg;
						}, (returnData) => {
							if (returnData) {
								var OutBlock1 = returnData['queryObj']['OutBlock1'][0]; 
							} else {
								
								// 전문 에러 언어팩 적용
								const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
								if (errorData.trName != "dw125") return

								self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
									dangerouslyUseHTMLString: true,
									confirmButtonText: self.$t('sys_err.a001')
								});
								return;
							}
						})
						if (resultcheck) {
							//완료팝업 오픈 
							self.oneProgress = false;
							self.oneclickOk = true;
							//
						} else if (!resultcheck) {
							self.resetData() //데이터 리셋
							self.$EventBus.$emit('depositReload');  
							if (code === '001') {
								//입력취소
								self.oneProgress = false;
								self.$alert(self.$t('asset_in.f026'), '', {
									confirmButtonText: self.$t('sys_err.a001')
								});
							} else if(code === '002') {
								//스크랩핑 취소 오류
								if (dataCode === '9002' || dataErrMsg === "<RESULT>N</RESULT>") {
									self.$alert(self.$t('asset_in.f027'), '', {
										confirmButtonText: self.$t('sys_err.a001')
									});
								} else {
									self.$alert("["+dataCode+"]"+dataErrMsg, '', {
										confirmButtonText: self.$t('sys_err.a001')
									});
								}
								self.oneProgress = false;
							} else {
								self.oneProgress = false;
							}
						}
					});				
				} else {
					// 전문 에러 언어팩 적용
					const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
					if (errorData.trName != "dw124") return

					self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
						dangerouslyUseHTMLString: true,
						confirmButtonText: self.$t('sys_err.a001')
					});
					self.oneProgress = false;
					return;
				}
			})
		},
		////////////////////////////////////// 모바일  전용////////////////////////////////////////////////////////////
		reloadSelectMyAssetStatusDataMobile(cur_cd) {
			let self = this;
			self.$store.dispatch('adminWalletState',{ cur_cd:cur_cd }).then((data) => {}).catch((errorData) => {});  // 전자지갑연계구분(0.없음, 1.입금, 2.입출금) 
			self.$store.commit('setMyAssetstatusInfoCurCd', cur_cd);
			let payload = { sear_tp : 2, sear_key : '' };
			//보유자산 리스트 조회
			self.$store.dispatch('selectMyAssetStatusData', payload).then( data => {
				// 지갑 조회 dw541
				self.$store.dispatch('selectCoinWallet', { cur_cd:cur_cd }).then( data => {
					self.$EventBus.$emit('qrcodeMake');
				}).catch((errorData) => {});
			})
		},
		////////////////////////////////////// 모바일  전용////////////////////////////////////////////////////////////

		resetData() {
			let self = this;
			self.depositType = 'oc';            //원화입금 구분  원클릭 : oc
			self.oneclickAmountCheck = true;    //입금하기 버튼 disabled 
			self.ruleForm.oneclickAmount  = ''; //원클릭 입금 금액 
			self.oneProgress = false;
			self.oneclickOk = false;
			if (self.$refs['ruleForm'] !== undefined) {
				self.$refs['ruleForm'].resetFields();
			}
			self.$EventBus.$emit('qrcodeMake');
		},
		CompleteSecure() {
			var self = this;
			console.log('CompleteSecure');
			self.safetyProgram = true;
    },
    getData() {
      const self = this;
      //이름 조회
			self.$store.dispatch('selectMyInfo', { user_id:self.$store.getters.getUserId }).then((data) => {
				self.user_name = data.user_nm;
				self.auth_mobl_no = data.auth_mobl_no;
			});
      //실명인증 계좌 조회
      self.$store.dispatch('selectMyAccountInfo').then((data) => {}).catch((errorData) => {});
    },
    makeQrcode() {
      setTimeout(() => {
        const self = this;
        var canvas = document.getElementById('canvas');
        if (canvas !== null) {
          canvas.width = canvas.width;
          if (self.getwalletInfo.Wallet_UseState) {
            QRCode.toCanvas(canvas, self.getwalletInfo.wallet_Id, function (error) {
              if (error) console.error(error);
              console.log('success!');
            });
          }
        }
      }, 300);
    }
	},
	created() {
		var self = this;
		self.$EventBus.$on('resetDepositData', self.resetData);
		self.$EventBus.$on('qrcodeMake', self.makeQrcode);
	},
  mounted() {
    var self = this;
    
		if (self.$store.getters.isSocketConnected) { 
      self.getData();
		} else {
			self.$EventBus.$on('socketConnected', self.getData);
    }

    if (!afc.isPC) {
      // 모바일 처리
      if (self.getMyAssetstatusInfoCurCd !== '') {
        // 새로고침시 통화코드가 지워지기 때문에 sessionStorage 에 통화코드 저장
        sessionStorage.setItem('bankTranCurcd', self.getMyAssetstatusInfoCurCd);
        self.$EventBus.$emit('qrcodeMake');
      } else {
        let bankTranCurcd =  sessionStorage.getItem('bankTranCurcd');
        if (bankTranCurcd === '' || bankTranCurcd === null) bankTranCurcd = 'KRW';
        self.reloadSelectMyAssetStatusDataMobile(bankTranCurcd);
      }
    } else {
      // PC 일경우 은행 보안모듈 설치 확인
      self.checkMocule();      
    }
	},
	updated() {
    let self = this;
    // 업데이트 모두 되고 입금 화면 보여주기
		self.onloaded = true;  
	},
	beforeDestroy() {
		let self = this;
    self.$EventBus.$off('qrcodeMake', self.makeQrcode);
    self.$EventBus.$off('resetDepositData', self.resetData);
    self.$EventBus.$off('socketConnected', self.getData);
  }
};
</script>

<style>
#canvas {
  width:140px;
  height:140px;
}
</style>
