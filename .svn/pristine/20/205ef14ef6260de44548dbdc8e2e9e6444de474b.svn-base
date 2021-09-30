<template>
	<div class="MySecurity">
		<div class="MySecurity-top-wrap">
			<el-row class="mypage-MySecurity-table">
				<el-col class="cell" :span="12" :class="mobl_auth_tp_bool ? 'certified' : ''">
					<el-row :span="24" class="title">{{$t('m_mypage.c002')}}<!-- 휴대폰 본인인증 --></el-row>
					<el-row :span="24" class="detail">
						<i class="el-icon-security01"></i>
						<span class="txt">{{user_nm}}<br>{{ auth_mobl_no }}</span>
						<div class="btn_wrap">
							<div class="middle_wrap">
								<el-button v-if="mobl_auth_tp_bool" disabled>{{$t('m_mypage.c007')}}<!-- 인증완료 --></el-button>
								<el-button v-else @click="mobileVerifyClicked()">{{$t('m_mypage.c006')}}<!-- 인증하기 --></el-button>
							</div>
						</div>
					</el-row>
				</el-col>
				<!-- 이메일 인증은 회원가입시 인증하기때문에 인증완료 고정 -->
				<el-col class="cell certified" :span="12">
					<el-row class="title"><span>{{$t('m_mypage.c003')}}<!-- 이메일 인증 --></span></el-row>
					<el-row class="detail">
						<i class="el-icon-security02"></i>
						<span class="txt">{{ user_mail }}</span>
						<div class="btn_wrap">
							<div class="middle_wrap">
								<el-button type="info" disabled>{{$t('m_mypage.c007')}}<!-- 인증완료 --></el-button>
							</div>
						</div>
					</el-row>
				</el-col>
			</el-row>
			<el-row class="mypage-MySecurity-table">
				<el-col class="cell" :span="12" :class="secu_auth_tp_bool ? 'certified' : ''">    
					<el-row class="title"><span>{{$t('m_mypage.c004')}}<!-- 보안인증 등록 --></span></el-row>
					<el-row class="detail">
						<i class="el-icon-security03"></i>
						<span class="txt security" v-html="secu_auth_tp_name"></span>
						<div class="btn_wrap">
							<div class="middle_wrap">
								<el-button v-show="secu_auth_tp_bool && $store.state.user.mypage.fail_secu_cont !== 5" disabled>{{$t('m_mypage.c007')}}<!-- 인증완료 --></el-button>
								<el-button v-show="secu_auth_tp_bool" @click="securityResetClicked()" class="initialization">{{$t('m_mypage.c008')}}<!-- 초기화 --></el-button>
								<el-button v-show="!secu_auth_tp_bool" @click="securityPasswordRegisterClicked()">{{$t('m_mypage.c016')}}<!-- 보안비밀번호 등록 --></el-button>
								<el-button v-show="!secu_auth_tp_bool" @click="googleOTPRegisterClicked()" class="goggle">{{$t('m_mypage.c017')}}<!-- Google OTP 등록 --></el-button>
							</div>
						</div>
					</el-row>
				</el-col>
				<el-col class="cell" :span="12" :class="bact_auth_tp_bool ? 'certified' : ''">
          <!-- <div class="dimmed"></div>
          <div><el-tag class="ready">{{$t('mypage.e051')}}</el-tag></div> -->

					<el-row class="title"><span>{{$t('m_mypage.c005')}}<!-- 입출금계좌 등록 --></span></el-row>
					<el-row class="detail">
						<i class="el-icon-security04"></i>
						<span class="txt" v-show="bact_auth_tp_bool">{{ bank_name }}<br>{{ bank_accountNumber | accountFilter}}</span>
						<span v-show="bact_auth_tp_name" class="txt" v-html="bact_auth_tp_name"></span>
						<div class="btn_wrap">
							<div class="middle_wrap">
								<el-button v-show="bact_auth_tp_bool" disabled>{{$t('m_mypage.c007')}}<!-- 인증완료 --></el-button>
								<el-button v-show="bact_auth_tp_bool" @click="bankAccountResetClicked()" class="initialization">{{$t('m_mypage.c008')}}<!-- 초기화 --></el-button>
								<el-button v-show="!bact_auth_tp_bool && secu_auth_tp_bool && $store.state.user.mypage.fail_secu_cont !== 5" @click="bankAccountRegisterClicked()">{{$t('m_mypage.c009')}}<!-- 등록하기 --></el-button>
							</div>
						</div>
					</el-row>
				</el-col>
			</el-row>
      <el-row class="mypage-MySecurity-table">
        <!-- 휴대폰 본인인증, 이메일 인증, 보안인증 등록 3단계를 모두 완료해야만 코인 매매 및 입출금이 가능합니다 -->
        <div class="security-info">{{$t('m_mypage.c044')}}</div>
      </el-row>
		</div>
		<div class="MySecurity-btm-wrap">
			<el-row class="mypage-MySecurity-info">
				<strong class="bullet-tit-type01">{{$t('m_mypage.c019')}}<!-- 입금 한도 --></strong>
				<table class="security_info_table">
					<colgroup>
						<col style="width:35%">
						<col>
					</colgroup>
					<thead>
						<tr>
							<th scope="col">{{$t('m_mypage.c027')}}<!-- 구분 --></th>
							<th scope="col">{{$t('m_mypage.c019')}}<!-- 입금 한도 --></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="col" class="al_left">{{$t('m_mypage.c022')}}<!-- 원화 --></th>
							<td>{{$t('m_mypage.c045')}}<!-- 준비 중입니다 --></td>
						</tr>
						<tr>
							<th scope="col" class="al_left">{{$t('m_mypage.c024')}}<!-- 암호화폐 --></th>
							<td>{{$t('m_mypage.c023')}}<!-- 무제한 --></td>
						</tr>
					</tbody>
				</table>
			</el-row>
			<el-row class="mypage-MySecurity-info">
				<strong class="bullet-tit-type01">{{$t('m_mypage.c026')}}<!-- 출금 한도 --></strong>
				<table class="security_info_table bg02">
					<colgroup>
						<col style="width:35%">
						<col style="width:20%">
						<col style="width:45%">
					</colgroup>
					<thead>
						<tr>
							<th scope="col" colspan="2">{{$t('m_mypage.c027')}}<!-- 구분 --></th>
							<th scope="col">{{$t('m_mypage.c026')}}<!-- 출금 한도 --></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="col" class="al_left">{{$t('m_mypage.c022')}}<!-- 원화 --></th>
							<th scope="col">{{$t('m_mypage.c030')}}<!-- 1회 --></th>
							<td>{{$t('m_mypage.c045')}}</td>
						</tr>
						<tr>
							<th scope="col" class="al_left"></th>
							<th scope="col">{{$t('m_mypage.c031')}}<!-- 1일 --></th>
							<td>{{$t('m_mypage.c045')}}</td>
						</tr>
						<tr>
							<th scope="col" class="al_left">{{$t('m_mypage.c046')}}<!-- 코인 --></th>
							<th scope="col">{{$t('m_mypage.c030')}}<!-- 1회 --></th>
							<td v-html="$t('m_mypage.c047', [formatKRW(limitCoin.once_limt)])"></td>
						</tr>
						<tr>
							<th scope="col" class="al_left"></th>
							<th scope="col">{{$t('m_mypage.c037')}}<!-- 1일 --></th>
							<td v-html="$t('m_mypage.c047', [formatKRW(limitCoin.day_limt)])"></td>
						</tr>
					</tbody>
				</table>
			</el-row>
		</div>		
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {  
      navTitle : '인증센터',
      auth_mobl_no: null,
      user_nm: null,
      user_mail: null,
      mobl_auth_tp_bool:false,
      mobl_auth_tp_name:null,
      secu_auth_tp_bool:false,
      secu_auth_tp_name:null,
      bact_auth_tp_bool:false,
      bact_auth_tp_name:null,
      bank_name:null,
      bank_accountNumber:null,
      auth_reset:false,
      limitKRW: {},
      limitCoin: {},
    };
  },
  computed:{
    ...mapGetters(['getUnitcode']),
    isDevice() {
      return afc.isDevice;
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
      alert('TODO : 휴대폰 인증');
    },
    securityResetClicked() {                
      let self = this
      /* 컨펌 팝업 */
      let secuAuthTpName = self.$store.state.user.mypage.secu_auth_tp === '1' ? '보안비밀번호' : 'Google OTP'; // '보안비밀번호' : 'Google OTP';
      
      /* 언어팩 관련 추가 */
      let secuAuthAlertMsg = '';
      if(self.$store.state.user.mypage.secu_auth_tp === '1'){
        secuAuthAlertMsg = self.$t('mypage.e019');
      } else {
        secuAuthAlertMsg = self.$t('mypage.e022');
      }
      
      self.$confirm(  secuAuthAlertMsg, '', { // '등록된 '+ secuAuthTpName +'를 초기화하시려면 휴대폰본인확인이 필요합니다.'
        distinguishCancelAndClose: true,
        confirmButtonText: self.$t('m_mypage.k023'), // '휴대폰본인확인',
        cancelButtonText: self.$t('m_mypage.k027') // '닫기'
      }).then(() => {
        var myWindow = null;
        if (self.isDevice) {
          myWindow = window.open(process.env.MTS_CRET_URL);
        } else {
          myWindow = window.open(process.env.CRET_URL);
        }
        if (myWindow === null || typeof(myWindow) === 'undefined') {
          self.$alert(self.$t('m_login.h006'), '', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: self.$t('m_login.b004')
          });
        }

        // if (self.isDevice) {
        // 	cordova.exec(null,null,"AppPlugin","loadWebView",[0,0,1,1,'',process.env.CRET_URL]);
        // } else {
        // 	var myWindow = window.open(process.env.CRET_URL);
        // 	if (myWindow === null || typeof(myWindow) === 'undefined') {
        // 		self.$alert(self.$t('m_login.h006'), '', {
        // 			dangerouslyUseHTMLString: true,
        // 			confirmButtonText: self.$t('m_login.b004')
        // 		});
        // 	}
        // }
      });
    },
    securityPasswordRegisterClicked() {
      //보안비밀번호 등록
      let self = this
      let plan = self.$route.query.plan
      let user = self.$store.state.user
      let user_id
      (plan === 'preLogin')? user_id = self.$store.getters.getLogin.user_id : user_id = self.$store.getters.getUserId
      user.newSecurePin.user_id = user_id
              
      if(!self.auth_reset && plan != 'preLogin'){
        self.$router.push({name: 'mNewSecurePIN'})
      }else{
        user.newSecurePin.user_id = self.$store.getters.getLogin.user_id					
        self.$router.push({name: 'mNewSecurePIN', query: {plan: 'preLogin'}})
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
      self.$router.push({ name: 'mNewGoogleOTP' })
    },
    bankAccountResetClicked() {
      let self = this;
      self.$confirm( self.$t('m_mypage.k038'), '', { //'등록된 입출금계좌를 초기화 하시려면 [초기화] 버튼을 누르세요.', '', {
        confirmButtonText: self.$t('m_mypage.k039'), //'초기화'
        cancelButtonText: self.$t('m_mypage.k040')     // '닫기'
      }).then(() => {
        self.$socket.sendProcessByName('ac112', (queryData) => {
          var block = queryData.getBlockData('InBlock1')[0];
          block['user_id'] = self.$store.getters.getUserId;
          block['auth_kind'] = '41'
        }, (returnData) => {
          if( returnData ) {
            setTimeout(function() {
              self.$alert(self.$t('m_mypage.k041'), '', {  // '입출금 계좌가 초기화 되었습니다.'
                confirmButtonText: self.$t('m_mypage.i021'),  // '확인'
                callback: action => {
                  self.bact_auth_tp_bool = false ;
                  self.$store.state.user.mypage.bact_auth_tp = 0;
                  self.bact_auth_tp_name =  self.$t('m_mypage.c042'); // '보안인증 등록 후\n이용 가능합니다.'
                }
              });
            }, 1000);
          } else {
            console.log('입출금 계좌 초기화 실패')
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "ac112") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t('sys_err.a001')
            });
            return;
          }
        })
      }).catch(() => {
        console.log('입출금 계좌 초기화 실패 tr')
      });
    },
    bankAccountRegisterClicked() {
      var self = this;
      self.$router.push({ name: 'mBankAccount' });
    },
    pccCallback(e) {
      let self = this;
      let plan = self.$route.query.plan
      let user_id = null
      let email = (' ' + self.$store.state.user.login.email).toString().slice(1);

      if(plan === 'preLogin'){
          user_id = self.$store.getters.getLogin.user_id
      }else{
          user_id = self.$store.getters.getUserId
      }
      let auth_kind = self.$store.state.user.mypage.secu_auth_tp
      let user = self.$store.state.user

      console.log('pccCallback', e.detail);

      const form = {
        //auth_ci			: self.randomText(88), // 임시
        auth_di			: e.detail.di, //self.randomText(64),
        //mobl_corp 		: e.detail.cellCorp, // 통신사
        //user_gend		    : e.detail.sex, // 성별
        //user_forn_tp 	    : e.detail.fgnGbn, // 외국인구분
        //auth_mobl_no 	    : e.detail.cellNo, //user.mobileVertification.auth_mobl_no
        //user_nm 	 	    : e.detail.name, // user.mobileVertification.user_nm
        //user_brth_day	    : e.detail.birYMD, // user.mobileVertification.user_brth_day
      }

      if (!self.mobl_auth_tp_bool || self.$store.state.user.mypage.auth_mobl_no !== e.detail['cellNo']) {
        self.$alert( self.$t('m_mypage.k028'), null, { //'회원정보와 일치하지 않습니다.'
          confirmButtonText: '확인',
          callback: action => {}
        })
        return;
      }

      /* 초기화 flow */
      if(form.auth_di){
        self.$store.dispatch('securityReset', {
          user_id: user_id,
          auth_kind: auth_kind
        }).then((data) => {
          console.log('securityReset Success')
          self.$store.state.user.mypage.secu_auth_tp = '0'
          self.secu_auth_tp_bool = false
          self.secu_auth_tp_name = self.$t('m_mypage.c015')// '보안비밀번호와 Google OTP 중 1가지를 선택하세요.'

          var text = '';
          if(auth_kind == '1'){
            var text = self.$t('m_mypage.k032');// '보안비밀번호가 초기화 되었습니다.';
          }
          if(auth_kind == '3'){
            var text = self.$t('m_mypage.k033');//'Google OTP가 초기화 되었습니다.';	
          }

          this.$alert(text, '', {
            confirmButtonText: self.$t('m_mypage.i021'), //'확인',
          });

          var password = self.$store.state.user.login.pwd;
          var autoLogin = self.$store.getters.getAutoLogin.toString();

          //self.$store.state.user.logoutAlert = "off";

          if(plan != 'preLogin'){
            this.$store.dispatch('logout',{pass:true}).then(() => {
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
      }
    },
    getMyInfo(){
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

        if(self.$store.state.user.mypage.mobl_auth_tp === '1'){
          self.mobl_auth_tp_bool = true
          self.mobl_auth_tp_name = self.$t('m_mypage.c041')//'미인증 상태입니다.'
        }

        if(self.$store.state.user.mypage.secu_auth_tp === '0'){
          self.secu_auth_tp_bool = false
          self.secu_auth_tp_name = self.$t('m_mypage.c015') //'보안비밀번호와 Google OTP 중<br>1가지를 선택하세요.'
        }					

        if(self.$store.state.user.mypage.fail_secu_cont === 5){
          self.secu_auth_tp_bool = true;
          self.secu_auth_tp_name = self.$t('m_mypage.c014')//'초기화 후 재등록하세요<br>(인증 5회 실패)'
        } else {
          if(self.$store.state.user.mypage.secu_auth_tp === '1'){
            self.secu_auth_tp_bool = true
            self.secu_auth_tp_name = self.$t('m_mypage.e002')//'보안비밀번호'
          }
          if(self.$store.state.user.mypage.secu_auth_tp === '3'){
            self.secu_auth_tp_bool = true
            self.secu_auth_tp_name = 'Google OTP'
          }
        }

        if(self.$store.state.user.mypage.bact_auth_tp === '1'){
          self.bact_auth_tp_bool = true
        }else{
          self.bact_auth_tp_bool = false
          self.bact_auth_tp_name = self.$t('m_mypage.e005')//'보안인증 등록 후<br>이용 가능합니다.'
        }
        
        self.$socket.sendProcessByName('dw559', (queryData) => {
          var block = queryData.getBlockData('InBlock1')[0];
          block['user_id'] = user_id;
        }, (returnData) => {
          if( returnData ) {
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
          self.limitCoin = returnData['queryObj']['OutBlock2'][0];
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
  filters: {
    accountFilter(value){
      value = String(value);
      // 계좌번호 4 ~ 9 번째 자리 * 표시
      var str1 = value.substring(0,3);
      var str2 = value.substring(value.length -3);

      return str1 + '*********' + str2;
    }
  },
  created() {
    const self = this;
    self.$EventBus.$emit('mobile-nav-title', self.$t('m_mypage.a004'));
    self.$EventBus.$emit('mobile-nav-menus', ['noDefault', 'back', 'border']);						
    
    window.addEventListener('pccCallback', self.pccCallback);
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
    const self = this;
    self.$EventBus.$off('socketConnected', self.getData);
    window.removeEventListener('pccCallback', self.pccCallback);
  }
};
</script>
