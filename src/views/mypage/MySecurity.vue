<template>
	<div class="MySecurity">
		<h1 class="pageTitle">{{$t('mypage.a002')}}<!-- 인증센터 --></h1>
		<el-row class="mypage-mysecurity-table">
			<el-col class="cell" :class="{'active': mobl_auth_tp_bool}">
				<div class="title">{{$t('mypage.e001')}}<!-- 휴대폰 본인인증 --></div>
				<div class="icon phone"><span class="security-check" v-if="mobl_auth_tp_bool"></span></div>
				<div class="value">{{ user_nm }}<br>{{ auth_mobl_no }}</div>
				<div class="detail">
					<el-button v-if="mobl_auth_tp_bool" type="info" round disabled>{{$t('mypage.e002')}}<!-- 인증완료 --></el-button>
					<el-button v-else @click="mobileVerifyClicked()" type="primary" round>{{$t('mypage.e004')}}<!-- 인증하기 --></el-button>
				</div>
			</el-col>

      <!-- 휴대폰 본인인증, 이메일 인증, 보안인증 등록 3단계를 모두 완료해야만 코인 매매 및 입출금이 가능합니다 -->
      <div class="security-info">{{ $t('mypage.e052') }}</div>
      
      <!-- 이메일 인증은 회원가입시 인증하기때문에 인증완료 고정 -->
			<el-col class="cell active">
				<div class="title"><span>{{$t('mypage.e009')}}<!-- 이메일 인증 --></span></div>
				<div class="icon email"><span class="security-check"></span></div>
				<div class="value">{{ user_mail }}</div>
				<div class="detail">
					<el-button type="info" round disabled>{{$t('mypage.e010')}}<!-- 인증 완료 --></el-button>
				</div>
			</el-col>
			<el-col class="cell" :class="{'active': secu_auth_tp_bool}">
				<div class="title"><span>{{$t('mypage.e011')}}<!-- 보안인증 등록 --></span></div>
				<div class="icon security"><span class="security-check" v-if="secu_auth_tp_bool"></span></div>
				
        <div class="value">
          <nl2br v-if="$store.state.user.mypage.secu_auth_tp == '0'" tag="span" :text="$t('mypage.c015')"/>
          <nl2br v-if="$store.state.user.mypage.fail_secu_cont == 5" tag="span" :text="$t('mypage.e014')"/>
          <nl2br v-if="$store.state.user.mypage.fail_secu_cont < 5 && $store.state.user.mypage.secu_auth_tp == '1'" tag="span" :text="$t('mypage.f003')"/>
          <nl2br v-if="$store.state.user.mypage.fail_secu_cont < 5 && $store.state.user.mypage.secu_auth_tp == '3'" tag="span" text="Google OTP"/>
				</div>

				<div class="detail">
					<el-button v-if="secu_auth_tp_bool && fail_secu_cont < 5" type="info" round disabled>{{$t('mypage.e012')}}<!-- 인증완료 --></el-button>
					<el-button v-if="secu_auth_tp_bool" @click="securityResetClicked()" type="primary" class="initialize" round>{{$t('mypage.e015')}}<!-- 초기화 --></el-button>
					<el-button v-if="!secu_auth_tp_bool" @click="securityPasswordRegisterClicked()" type="primary" round>{{$t('mypage.e017')}}<!-- 보안비밀번호 등록 --></el-button>
					<el-button v-if="!secu_auth_tp_bool" @click="googleOTPRegisterClicked()" type="primary" class="otpBtn" round>{{$t('mypage.e018')}}<!-- Google OTP 등록 --></el-button>
				</div>

				<!-- 완료 후 코인 매매 및 입출금 가능 -->
        <!-- <div class="security-info">{{$t('mypage.e013')}}</div> -->
			</el-col>
			<el-col class="cell" :class="{'active': bact_auth_tp_bool}">
				<div class="title"><span>{{$t('mypage.e025')}}<!-- 입출금계좌 등록 --></span></div>
				<div class="icon account"><span class="security-check" v-if="bact_auth_tp_bool"></span></div>
				
        <div class="value">
					<span v-if="bact_auth_tp_bool">{{ bank_name }}<br>{{ bank_accountNumber | accountFilter}}</span>
					<nl2br v-else tag="span" :text="$t('mypage.e026')"/>
				</div>

				<div class="detail">
					<el-button v-if="bact_auth_tp_bool" type="info" round disabled>{{$t('mypage.e029')}}<!--인증 완료--></el-button>
					<el-button v-if="bact_auth_tp_bool" @click="bankAccountResetClicked()" type="primary" class="initialize" round>{{$t('mypage.e015')}}<!-- 초기화 --></el-button>
					<el-button v-if="!bact_auth_tp_bool && secu_auth_tp_bool && fail_secu_cont < 5" @click="bankAccountRegisterClicked()" type="primary" round>{{$t('mypage.e025')}}<!-- 입출금계좌 등록 --></el-button>
				</div>

        <!-- <div class="dimmed">
        </div>
        <el-tag class="ready">{{$t('mypage.e051')}}</el-tag> -->

				<!-- 완료 후 원화 입출금 가능 -->
        <!-- <div class="security-info">{{$t('mypage.e028')}}</div> -->
			</el-col>
		</el-row>
		<div class="mypage-mysecurity-info deposit">
			<h3>{{$t('mypage.e032')}}<!-- 입금 한도 --></h3>
			<table border="0" cellspacing="0" cellpadding="0">
				<colgroup>
					<col width="25%">
					<col>
				</colgroup>
				<thead>
					<tr>
						<th>{{$t('mypage.e033')}}<!-- 구분 --></th>
						<th>{{$t('mypage.e034')}}<!-- 입금 한도 --></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{$t('mypage.e035')}}<!-- 원화 --></td>
						<td>{{$t('mypage.e053')}}<!-- 준비 중입니다 --></td>
					</tr>
					<tr>
						<td>{{$t('mypage.e037')}}<!-- 암호화폐 --></td>
						<td>{{$t('mypage.e036')}}<!-- 무제한 --></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="mypage-mysecurity-info withdraw">
			<h3>{{$t('mypage.e039')}}<!-- 출금 한도 --></h3>
			<table border="0" cellpadding="0" cellspacing="0">
				<colgroup>
					<col width="25%">
					<col width="25%">
					<col>
				</colgroup>
				<thead>
					<tr>
						<th colspan="2">{{$t('mypage.e040')}}<!-- 구분 --></th>
						<th>{{$t('mypage.e041')}}<!-- 출금 한도 --></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{$t('mypage.e042')}}<!-- 원화 --></td>
						<td>{{$t('mypage.e043')}}<!-- 1회 --></td>
						<!-- <td>20,000,000</td> -->
            <td>{{$t('mypage.e053')}}<!-- 준비 중입니다 --></td>
					</tr>
					<tr>
						<td></td>
						<td>{{$t('mypage.e044')}}<!-- 1일 --></td>
						<!-- <td>50,000,000</td> -->
            <td>{{$t('mypage.e053')}}<!-- 준비 중입니다 --></td>
					</tr>
					<tr>
						<td>{{$t('mypage.e054')}}<!-- 코인 --></td>
						<td>{{$t('mypage.e046')}}<!-- 1회 --></td>
						<td>{{$t('mypage.e055', [formatKRW(limitCoin.once_limt)])}}<!-- 실시간 원화 환산가 --></td>
					</tr>
					<tr>
						<td></td>
						<td>{{$t('mypage.e047')}}<!-- 1일 --></td>
						<td>{{$t('mypage.e055', [formatKRW(limitCoin.day_limt)])}}<!-- 실시간 원화 환산가 --></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      auth_mobl_no: null,
      user_mail: null,
      user_nm : null,
      mobl_auth_tp_bool:false,
      secu_auth_tp_bool:false,
      fail_secu_cont:0,
      bact_auth_tp_bool:false,
      bank_name: '',
      bank_accountNumber : null,
      auth_reset:false,
      limitKRW: {},
      limitCoin: {},
    };
  },
  computed: {
    ...mapGetters(['getUnitcode']),
  },
  filters: {
    accountFilter(value){
      if (value == null ) {
        return "";
      }
      value = String(value);
      // 계좌번호 4 ~ 9 번째 자리 * 표시
      var str1 = value.substring(0,3);
      var str2 = value.substring(value.length -3);

      return str1 + '*********' + str2;
    }
  },
  methods: {
    formatKRW(number) {
      let self = this;
      if (number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      } else {
        return '';
      }
    },
    mobileVerifyClicked() {
      alert('TODO : 휴대폰 인증')
    },
    securityResetClicked() {
      let self = this;
      
      /* 언어팩 관련 추가 */
      let secuAuthAlertMsg = '';
      if (self.$store.state.user.mypage.secu_auth_tp === '1') {
        secuAuthAlertMsg = self.$t('mypage.e019');
      } else {
        secuAuthAlertMsg = self.$t('mypage.e022');
      }

      self.$confirm(secuAuthAlertMsg, '', {
        distinguishCancelAndClose: true,
        confirmButtonText: self.$t('mypage.e023'), 	// '휴대폰본인확인'
        cancelButtonText: self.$t('mypage.e024')	// '닫기'
      }).then(() => {
        var myWindow = window.open(process.env.CRET_URL,'pccPopup', "width=400,height=615");
      }).catch(action => {});
    },
    pccCallback(e) {
      let self = this
      let plan = self.$route.query.plan
      let user_id = null
      let email = (' ' + self.$store.state.user.login.email).toString().slice(1);

      /* 언어팩 관련 추가 */
      let secuAuthAlertMsg = '';
      if(self.$store.state.user.mypage.secu_auth_tp === '1'){
        secuAuthAlertMsg = self.$t('mypage.h002');
      } else {
        secuAuthAlertMsg = self.$t('mypage.h003');
      }

      if (!self.mobl_auth_tp_bool || self.$store.state.user.mypage.auth_mobl_no !== e.detail['cellNo']) {
        self.$alert(self.$t('mypage.h001'), null, { //'회원정보와 일치하지 않습니다.'
          confirmButtonText: self.$t('mypage.d012'), // '확인',
          callback: action => {}
        })
        return;
      }
      
      // 인증 초기화
      if (plan === 'preLogin') {
        user_id = self.$store.getters.getLogin.user_id
      } else {
        user_id = self.$store.getters.getUserId
      }
      let auth_kind = self.$store.state.user.mypage.secu_auth_tp

      self.$store.dispatch('securityReset', {
        user_id: user_id,
        auth_kind: auth_kind
      }).then((data) => {
        console.log('securityReset Success')
        
        self.$store.state.user.mypage.secu_auth_tp = '0'
        self.$store.state.user.mypage.fail_secu_cont = 0
        self.secu_auth_tp_bool = false

        self.$alert( secuAuthAlertMsg , null, {
          confirmButtonText: '확인',
          callback: action => {}
        })

        let password = self.$store.state.user.login.pwd;
        let autoLogin = self.$store.getters.getAutoLogin.toString();

        //self.$store.state.user.logoutAlert = "off";
        
        if (plan != 'preLogin') {
          this.$store.dispatch('logout',{pass:true}).then(() => {
            console.log(email)
            self.$store.dispatch('preLogin', {
              email: email,
              password: password,
              autoLogin: autoLogin
            }).then((data) => {
              let secu_auth_tp = data.secu_auth_tp
              let user_id = data.user_id
              let temp_use_tp = data.temp_use_tp;
              self.auth_reset = true;
            })
          });
        }
      })
    },
    securityPasswordRegisterClicked() {
      //보안비밀번호 등록
      let self = this;
      let plan = self.$route.query.plan;
      let user = self.$store.state.user;
      let user_id;
      (plan === 'preLogin')? user_id = self.$store.getters.getLogin.user_id : user_id = self.$store.getters.getUserId;
      user.newSecurePin.user_id = user_id;

      if (!self.auth_reset && plan != 'preLogin') {
        self.$router.push({name: 'newSecurePIN'});
      } else {
        user.newSecurePin.user_id = self.$store.getters.getLogin.user_id;
        self.$router.push({name: 'newSecurePIN', query: {plan: 'preLogin'}});
      }
    },
    googleOTPRegisterClicked() {
      //구글OTP등록
      let self = this;
      let plan = self.$route.query.plan
      let user = self.$store.state.user
      let user_id
      if(!self.$store.getters.getUserId){
        plan = 'preLogin'; 
      }
      (plan === 'preLogin')? user_id = self.$store.getters.getLogin.user_id : user_id = self.$store.getters.getUserId
      user.newGoogleOtp.user_id = user_id
      self.$store.commit('setNewGoogleOtp',{user_id:user_id})
      self.$router.push({ name: 'newGoogleOTP' })
    },
    bankAccountResetClicked() {
      let self = this;
      self.$confirm(self.$t('mypage.i015'), '', {  // '등록된 입출금계좌를 초기화 하시려면 [초기화] 버튼을 누르세요.'
        confirmButtonText: self.$t('mypage.i016'),  // '초기화'
        cancelButtonText: self.$t('mypage.i017')    //'닫기'
      }).then(() => {
        self.$socket.sendProcessByName('ac112', (queryData) => {
          var block = queryData.getBlockData('InBlock1')[0];
          block['user_id'] = self.$store.getters.getUserId;
          block['auth_kind'] = '41'
        }, (returnData) => {
          if( returnData ) {
            self.$alert(self.$t('mypage.i018'), '', { // '입출금 계좌가 초기화 되었습니다.'
              confirmButtonText: self.$t('mypage.i019'),            //'확인'
              callback: action => {
                self.bact_auth_tp_bool = false ;
                self.$store.state.user.mypage.bact_auth_tp = 0;
              }
            });
          } else {
            let errorData = window.sessionStorage.getItem('lastErrorData')
            if (errorData !== null) {
              errorData = JSON.parse(errorData)
              if (errorData.trName === 'ac112'){
                // self.$alert('입출금 계좌 전문오류발생 관리자에게 문의주세요', '', { 
                // 	confirmButtonText:  self.$t('mypage.i019')//'확인'
                // });
                
                // 전문 에러 언어팩 적용
                self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: self.$t('sys_err.a001')
                });
              }
            }
            console.log('입출금 계좌 초기화 실패')
            return;
          }
        })
      }).catch(() => {
        console.log('입출금 계좌 초기화 실패 tr')
      });
    },
    bankAccountRegisterClicked() {
      let self = this;
      self.$router.push({ name: 'bankAccount' })
    },
    getMyInfo() {
      let self = this
      let plan = self.$route.query.plan
      let user_id
      (plan === 'preLogin')? user_id = self.$store.getters.getLogin.user_id : user_id = self.$store.getters.getUserId
      self.$store.dispatch('myInfo',{user_id:user_id}).then((data) => {
        console.log('myInfo Success')

        console.log('이메일:'+self.$store.state.user.mypage.user_mail)
        console.log('휴대폰:'+self.$store.state.user.mypage.auth_mobl_no)
        console.log('휴대폰인증여부:'+self.$store.state.user.mypage.mobl_auth_tp)
        console.log('보안등록여부:'+self.$store.state.user.mypage.secu_auth_tp)
        console.log('입출금계좌등록여부:'+self.$store.state.user.mypage.bact_auth_tp)

        self.auth_mobl_no = self.$store.state.user.mypage.auth_mobl_no
        self.auth_mobl_no = self.auth_mobl_no.replace(/^(\d{3})-?(\d{1,4})\d{2}-?\d(\d{4})$/,'$1-****-$3')
        self.user_mail = self.$store.state.user.mypage.user_mail
        self.user_mail = self.user_mail.replace(new RegExp('.(?=.?@)', 'g'), '*')
        self.user_nm = self.$store.state.user.mypage.user_nm
        self.user_nm = self.user_nm.replace(/(.?)?(.{1,2})?(.+)/, '$1*$3')
        self.fail_secu_cont = self.$store.state.user.mypage.fail_secu_cont

        if (self.$store.state.user.mypage.mobl_auth_tp === '0') {
          self.mobl_auth_tp_bool = false
        }
        if (self.$store.state.user.mypage.mobl_auth_tp === '1') {
          self.mobl_auth_tp_bool = true
        }

        if (self.$store.state.user.mypage.secu_auth_tp === '0') {
          self.secu_auth_tp_bool = false
        }
        if (self.$store.state.user.mypage.fail_secu_cont === 5) {
          self.secu_auth_tp_bool = true
        } else {
          if (self.$store.state.user.mypage.secu_auth_tp === '1') {
            self.secu_auth_tp_bool = true
          }
          if (self.$store.state.user.mypage.secu_auth_tp === '3') {
            self.secu_auth_tp_bool = true
          }
        }

        if (self.$store.state.user.mypage.bact_auth_tp === '1') {
          self.bact_auth_tp_bool = true
        } else {
          self.bact_auth_tp_bool = false
        }

        self.$socket.sendProcessByName('dw559', (queryData) => {
          var block = queryData.getBlockData('InBlock1')[0];
          block['user_id'] = user_id;
        }, (returnData) => {
          if (returnData) {
            var OutBlock1 = returnData['queryObj']['OutBlock1'][0];  
            self.bank_name = OutBlock1.bank_nm;
            self.bank_accountNumber = OutBlock1.acct_no
          } else {
            console.log('실명인증 계좌조회 실패')
            // 전문 에러 언어팩 적용
            // const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            // if (errorData.trName != "dw559") return
            
            // self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
            // 	dangerouslyUseHTMLString: true,
            // 	confirmButtonText: self.$t('sys_err.a001')
            // });
            return;
          }
        })
      })
    },
    getCoinLimit() {
      const self = this;
      self.$socket.sendProcessByName('cm401', (queryData) => {
        var block = queryData.getBlockData('InBlock1')[0];
        block['unit_code'] = self.getUnitcode
        block['cur_cd'] = '000' //'000' or 'KRW'
        block['widr_levl'] = '1'
        block['req_cnt'] = '100'
      }, (returnData) => {
        if( returnData ) {
          if (returnData['queryObj']['OutBlock2'].length > 0) {
            self.limitCoin = returnData['queryObj']['OutBlock2'][0];
          }
        } else {
          // 전문 에러 언어팩 적용
          const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
          if (errorData.trName != "cm401") return;
          self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: self.$t('sys_err.a001')
          });
        }
      });
    },
    getData() {
      const self = this;
      self.getMyInfo();
      self.getCoinLimit();
    },
  },
  created() {
    const self = this;
    window.addEventListener('pccCallback', self.pccCallback);

    self.$EventBus.$emit('pc-navi', [
      { label: self.$t('header.me'), target: 'mypageInfo' },
      { label: self.$t('mypage.a002'), target: null }
    ]);

    self.$EventBus.$on('langChange', () => {
      self.$EventBus.$emit('pc-navi', [
        { label: self.$t('header.me'), target: 'mypageInfo' },
        { label: self.$t('mypage.a002'), target: null }
      ]);
    });
  },
  mounted() {
    let self = this;
    if (self.$store.getters.isSocketConnected) {
      self.getData();
    } else {
      self.$EventBus.$on('socketConnected', self.getData);
    }
  },
  destroyed() {
    let self = this;
    self.$EventBus.$off('socketConnected', self.getData);
    window.removeEventListener('pccCallback', self.pccCallback);
  }
}
</script>
