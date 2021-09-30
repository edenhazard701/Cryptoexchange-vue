<template>
	<el-main class="Unregistration">
		<div class="mypage_cont">
			<h1 class="pageTitle">{{$t('mypage.d001')}}<!--회원탈퇴 신청--></h1>
			<el-form ref="form" :model="form" :rules="rule" label-width="0px" class="unregistration-form">
				<h4>{{$t('mypage.d002')}}<!--탈퇴 전 확인해주세요!--></h4>
				<div class="terms">
					<ol>
						<li>
							{{$t('mypage.d003')}}
							<!-- 매매나 출금이 진행중인 경우, KRW 및 암호화폐 잔액이 최소출금금액 보다 많은 경우 회원탈퇴가 불가합니다.
							모든 거래를 종료하신 후 출금해주시기 바랍니다. -->
						</li>
						<li>
							{{$t('mypage.d004')}}
							<!-- KRW 및 암호화폐 잔액이 최소출금금액 이하일 경우 남아 있는 잔고가 모두 삭감 처리됩니다. -->
						</li>
						<li>
							{{$t('mypage.d005')}}
							<!-- 회원탈퇴 시 코벡스에 등록된 개인정보는 모두 삭제되며 복구되지 않습니다.
							단, 관계법령에 따라 회사가 보관해야 하는 정보는 일정 기간 보관됩니다. -->
						</li>
					</ol>
				</div>
				<el-form-item prop="agreed" class="agree">
					<el-checkbox v-model="form.agreed"><span v-html="$t('mypage.d006')"></span><!--회원탈퇴 유의사항 동의 <span class="caution">(필수)</span>--></el-checkbox><br>
          <el-checkbox v-model="form.pri_info_yn"><span v-html="$t('mypage.d006-1')"></span><!--추후 거래기록 조회를 위해 최소한의 개인정보를 보관하는 것에 동의합니다 <span class="caution">(선택)</span>--></el-checkbox><br>
				</el-form-item>

				<h4 class="dot"><span v-html="$t('mypage.d007')"></span><!--SMS 인증 <span class="caution">(필수)</span>--></h4>
				<el-row v-show="!smsCodeVisible" class="smsConf">
					<el-col class="label">{{$t('mypage.d007-1')}}<!--SMS 인증하기--></el-col>
					<el-col class="input"><el-input type="text" auto-complete="off" v-model="$store.state.user.mypage.auth_mobl_no" readonly></el-input></el-col>
					<el-col class="btn">
						<el-button v-show="!smsCodeComplete" @click.native.prevent="smsClicked">{{$t('mypage.d008')}}<!--인증요청--></el-button>
						<el-button v-show="smsCodeComplete" disabled>{{$t('mypage.d012')}}<!--확인--></el-button>
					</el-col>
				</el-row>
				<el-form-item prop="smsCode" v-show="smsCodeVisible">
					<el-row class="smsConf">
						<el-col class="label">{{$t('mypage.d007-1')}}<!--SMS 인증하기--></el-col>
						<el-col class="input">
							<el-input type="text" :placeholder="$t('mypage.d011')" auto-complete="off" v-model="form.smsCode" maxlength="6" @keyup.native="onlyNumberSMS"></el-input><!--인증번호 6자리-->
							<span v-show="countdowning" class="timer">{{ remaining | toMMSS }}</span>
						</el-col>
						<el-col class="btn">
							<el-button v-if="countdowning" type="primary" @click.native.prevent="verifyClicked" :disabled="smsCodeComplete">{{$t('mypage.d012')}}<!--확인--></el-button>
							<el-button v-if="remaining < 1" @click.native.prevent="smsClicked">{{$t('mypage.d010')}}<!--재요청--></el-button>	<!-- 유효 시간 만료 시 재요청 버튼 나타남 -->
						</el-col>
					</el-row>
				</el-form-item>
				<div v-show="smsCodeError" class="mypage-info sms-caution">{{$t('mypage.d018')}}<!--인증번호가 일치하지 않습니다.--></div>	<!-- 인증 실패 시 -->
				<div v-show="smsCodeError" class="mypage-info">{{$t('mypage.d015')}}<!--SMS인증요청은 일일 최대 5회까지만 가능합니다.--></div>	<!-- 인증요청 5회 이상 시 -->
				<div v-show="smsCodeComplete" class="mypage-info success">{{$t('mypage.d014')}}<!--인증완료--></div>	<!-- 인증 완료 시 -->

				<el-form-item class="unregistration-btn">
					<el-button type="primary" @click.native.prevent="unregisterClicked" :loading="unregistering" :class="{ 'disabled': disabled }">{{$t('mypage.d013')}}<!--회원탈퇴--></el-button>
				</el-form-item>
			</el-form>
		</div>
	</el-main>
</template>

<script>
import vueTimers from 'vue-timers/mixin'
import moment from 'moment';
export default {
	mixins: [vueTimers],
	timers: {
		tick: { time: 1000, repeat: true }
	},
	data () {
		return {
			unregistering: false,	// 로딩 여부
			disabled: true,			// 회원탈퇴 버튼 활성화 여부
			smsCodeVisible: false,	// SMS 인증요청 상태
			smsCodeComplete: false,	// SMS 인증 상태
			smsCodeError: false,	// SMS 인증 오류 여부
      form: {
        agreed: false,		// 회원탈퇴 유의사항 동의 여부
        pri_info_yn: false, // 회원탈퇴 개인정보 보관 동의 여부
        smsCode: '',		// SMS 인증번호
      },
      rule: {
				agreed: [			// 동의 여부 유효성 검사 기준
					{ type: 'enum', enum: ['true'], required: true, message: this.$t('mypage.d021'), transform: value => value.toString(), trigger: 'change' } /*유의사항 동의 후 회원탈퇴를 신청하세요.*/
				]
			},
			remaining: 180			// SMS 인증 유효시간
		};
	},
	methods : {
		smsClicked() {	// SMS 인증 요청
			let self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('sendSmsCert',{auth_kind: '01'}).then((data) => {
            self.remaining = 180;
            self.$timer.start('tick');
            // alert('SMS인증번호가 휴대폰으로 전송되었습니다.\n전송된 인증번호를 입력해주세요.')
            this.$alert(this.$t('mypage.d016'), '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: this.$t('mypage.d012'),	/*확인*/
              callback: action => {
                this.smsCodeVisible = true;
              }
            })
            console.log('sendSmsCert Success')
          })
        }
      })
		},
		tick() {	// SMS 인증 유효 시간 단위
			let self = this;
			if (self.remaining < 1) {
				self.$timer.stop('tick');
			} else {
				self.remaining -= 1;
			}
		},
		verifyClicked() {	// SMS 인증번호 검증
			let self = this;
      this.$store.dispatch('sendSmsCertConfirm', { sms_auth_no: this.form.smsCode }).then((data) => {
        // alert('인증에 성공했습니다.')
        // this.$alert('인증에 성공했습니다.','',{
        // 	confirmButtonText: '확인',
        // 	callback: action => {
        // 		this.smsCodeComplete = !this.smsCodeComplete
        // 		this.smsCodeVisible = !this.smsCodeVisible
        // 		this.disabled = false
        // 	}
        // });
        this.smsCodeComplete = !this.smsCodeComplete
        this.smsCodeVisible = !this.smsCodeVisible
        this.disabled = false
        console.log('sendSmsCertConfirm Success')
      }).catch((errorData) => {
        console.log(errorData.errCode)
        if (errorData.errCode == '49069') {
          self.$alert(self.$t('mypage.d018'), '', {
            confirmButtonText: self.$t('mypage.d012'), //'확인',
          });
        } else if (errorData.errCode == '49082') {
          //인증실패 횟수가 초과 되었습니다. 인증번호 요청을 다시 진행해 주십시요.
          self.countdowning = false;
          self.remaining = 0;
        } else {
          self.$alert(self.$t('sys_err.'+errorData.errCode), '', {
            confirmButtonText: this.$t('mypage.d012'), /*확인*/
          });
        }
      });
		},
    unregisterClicked() {	// 회원탈퇴 처리
      const self = this;
      self.$refs['form'].validate((valid) => {
        if (valid) {
          self.$store.dispatch('unregistration', { pri_info_yn: self.form.pri_info_yn?'Y':'N' }).then((data) => {						
            self.$alert(self.$t('mypage.d027'),'',{
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t('mypage.d012'), /*확인*/
              callback: action => {
                self.$store.dispatch('logout')
                self.$router.push({ name: 'main' });
              }
            });
            console.log('unregistration Success')
          });
        }
			})
		},
		onlyNumberSMS() {	// SMS 인증번호 숫자만 남기기
			let self = this
			self.form.smsCode = self.form.smsCode.replace(/[^0-9]/g,'')
		},
		myInfo(){	// 회원정보 조회
			let self = this
      let user_id = self.$store.getters.getUserId
      self.$store.dispatch('myInfo',{user_id:user_id}).then((data) => {})
    }
	},
	created() {
	},
	mounted() {
		let self = this;
		if(self.$store.getters.isSocketConnected) self.myInfo()

		self.$EventBus.$emit('pc-navi', [
			{ label: self.$t('header.me'), target: 'mypageInfo' },
      { label: self.$t('mypage.a001'), target: 'mypageInfo' },
      { label: self.$t('mypage.b008'), target: null }
		]);

		self.$EventBus.$on('langChange', () => {
			self.$EventBus.$emit('pc-navi', [
				{ label: self.$t('header.me'), target: 'mypageInfo' },
				{ label: self.$t('mypage.a001'), target: 'mypageInfo' },
				{ label: self.$t('mypage.b008'), target: null }
			]);
		});
	},
	computed: {
		countdowning() {	// 유효시간 카운트다운 여부
			let self = this;
			return self.timers.tick.isRunning;
		},
	},
	filters: {
		toMMSS(s) {
			return moment.utc(s*1000).format('mm:ss');
		}
	}
};
</script>
