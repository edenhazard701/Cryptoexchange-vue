<template>
	<el-main class="m_unregistration":class="disabled ? '' : 'disabled'">
    <el-form ref="unregistrationForm" :model="form" :rules="rule" label-width="0">
      <div class="terms_wrap">
        <p class="tit">{{$t('m_mypage.b001')}}</p>
        <div class="terms">
          <ol class="terms_list">
            <li>1. {{$t('m_mypage.b002')}}</li>
            <li>2. {{$t('m_mypage.b003')}}</li>
            <li>3. {{$t('m_mypage.b004')}}</li>
          </ol>
        </div>
        <!-- <div class="check_area" prop="agreed"> -->
        <el-form-item prop="agreed" class="check_area">
          <el-checkbox v-model="form.agreed">{{$t('m_mypage.b007_01')}} <span class="essential">{{$t('m_mypage.b007_02')}}</span></el-checkbox>
          <el-checkbox v-model="form.pri_info_yn" style="margin-left: 0px;">{{$t('m_mypage.b007_03')}} <span class="essential">{{$t('m_mypage.b007_04')}}</span></el-checkbox>
        </el-form-item>
        <!-- </div> -->
      </div>
      <div class="certified">
        <p class="tit">{{$t('m_mypage.b008')}}</p>
        <el-button v-show="!disabled" class="btn_m_sy01" @click="smsDialogOpen">{{$t('m_mypage.c006')}}</el-button> <!-- 인증 전 -->
        <el-button v-show="disabled" class="btn_m_sy01 completion" disabled>{{$t('m_mypage.c007')}}</el-button> <!-- 인증 후 -->
      </div>
      <div class="btm_fix_btn" v-show="disabled">
        <el-button class="b_success_btn" @click="unregisterClicked">{{$t('mypage.d001')}}</el-button>
      </div>
    </el-form>

    <!-- dialog// -->
    <el-dialog class="full_pop head_border" :title="$t('m_mypage.b008')" @open="fullOpen" @close="fullClose" :visible.sync="nregistrationDialogVisible" :close-on-click-modal="false" fullscreen>
      <el-form ref="smsForm" :model="form" label-width="0" class="sms_nregistration">
        <div class="phone_number">
          <el-input v-model="$store.state.user.mypage.auth_mobl_no" class="inp_m" disabled></el-input>
          <el-button class="btn_m_sy01" @click="smsClicked" :disabled="smsCodeVisible">{{verifySMS()}}</el-button>
        </div>
        <div class="nregistration_number" v-show="smsCodeVisible">
          <el-input type="number" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="6" max="999999" prop="smsCode" class="inp_m"  :placeholder="$t('mypage.d011')" v-model="form.smsCode"></el-input>
          <span class="minute">{{ form.timer }}</span>
        </div>
        <p class="info_txt">{{$t('m_mypage.b010')}}</p>
        <div class="btm_fix_btn">
          <el-button class="b_success_btn" @click="verifyClicked" :disabled="smsCodeVisible ? disabled : ''">{{$t('m_mypage.i021')}}</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- //dialog -->
	</el-main>
</template>

<script>
export default {
	data () {
		return {
      nregistrationDialogVisible: false , // SMS 인증 다이얼로그 표시 여부
      smsRequest: false,                  // SMS 인증 요청 여부
      smsCodeVisible : false ,            // SMS 인증번호 인풋 표시 여부
      disabled : false ,                  // SMS 인증완료 여부
      form: {
        agreed: false,                    // 회원탈퇴 유의사항 동의 여부
        pri_info_yn: false,               // 회원탈퇴 개인정보 보관 동의 여부
        smsCode: '',                      // SMS 인증번호 입력값
        timer: '2:59'                     // SMS 인증 유효시간
      },
      rule: {
        agreed: [                         // 회원탈퇴 유의사항 동의 유효성 기준
          { type: 'enum', enum: ['true'], required: true, message: this.$t('m_mypage.b012'), transform: value => value.toString(), trigger: 'change' }
        ]
      },
      interval : null                     // SMS 인증 유효시간 타이머
		};
	},
	methods : {
    smsDialogOpen() {   // SMS 인증 다이얼로그 열기
      this.$refs['unregistrationForm'].validate((valid) => {
        if (valid) {
          this.nregistrationDialogVisible = true
        }
      })
    },
    smsClicked() {  // 인증요청 클릭
      var self = this;
      this.$refs['unregistrationForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('sendSmsCert',{auth_kind: '01'}).then((data) => {
            this.$alert(this.$t('m_mypage.b014'),'',{
              dangerouslyUseHTMLString: true,
              confirmButtonText: this.$t('m_mypage.b015'),	/*확인*/
              callback: action => {
                this.smsCodeVisible = true;
                this.smsRequest = true;
              }
            })

            if(self.interval != null){
              clearInterval(self.interval)
            }

            let SetTime = 179;		// 최초 설정 시간(기본 :초)
            self.interval = setInterval(() => {
              this.form.timer = Math.floor(SetTime / 60) + ":" + (SetTime % 60); // 남은 시간 계산
              SetTime--;					// 1초씩 감소
              if (SetTime < 0) {
                clearInterval(self.interval)
                this.smsCodeVisible = false
                this.form.smsCode = ''
                // alert(this.$t('m_mypage.b016'));
                this.$alert(this.$t('m_mypage.b016'), '', {
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: this.$t('m_mypage.b015'),	/*확인*/
                });
              }
            }, 1000);
            console.log('sendSmsCert Success')
          })
        }
      })
    },
    verifyClicked() {   // SMS 인증번호 입력 후 확인 버튼 클릭
      let self = this;
      self.$store.dispatch('sendSmsCertConfirm', { sms_auth_no: self.form.smsCode }).then((data) => {
        // alert(this.$t('m_mypage.b017'))
        self.$alert(self.$t('m_mypage.b017'), '', {
          confirmButtonText: self.$t('m_mypage.b015'), //'확인',
        });

        self.disabled = true
        self.nregistrationDialogVisible = false
        console.log('sendSmsCertConfirm Success')
      }).catch((errorData) => {
        if (errorData.errCode == '49069') {
          self.$alert(self.$t('m_mypage.b018'), '', {
            confirmButtonText: self.$t('m_mypage.b015'), //'확인',
          });
          //errorData.errMsg = self.$t('m_mypage.b018')//'인증번호를 정확히 입력해주세요.'
        } else if(errorData.errCode == '49082'){
          //인증실패 횟수가 초과 되었습니다. 인증번호 요청을 다시 진행해 주십시요.
          self.smsCodeVisible = false
        } else{
          self.$alert(self.$t('sys_err.'+errorData.errCode), '', {
            confirmButtonText: self.$t('m_mypage.b015'), //'확인',
            callback: action => {
              if (errorData.errCode == '41025') {
                self.form.timer = '2:59'
                if(self.interval != null){
                  clearInterval(self.interval)
                }
                self.smsCodeVisible = false
                self.form.smsCode = ''
              }
            }
          });
        }
      })
    },
    unregisterClicked() {   // 회원탈퇴 처리
      let self = this;
      self.$refs['unregistrationForm'].validate((valid) => {
        if (valid) {
          if (!self.disabled) {
              alert(self.$t('m_mypage.b012'))
          } else {
            self.$store.dispatch('unregistration', { pri_info_yn: self.form.pri_info_yn?'Y':'N' }).then((data) => {
              alert(self.$t('m_mypage.b013'))
              console.log('unregistration Success')
              self.$store.dispatch('logout').then((r) => {
                self.$router.push({ name: 'mMain' });
              });
            })
          }
        }
      })
    },
    fullOpen() {    // SMS 인증 다이얼로그 풀사이즈 처리
      document.body.classList.add('m_vmodal_hide');
    },
    fullClose(){    // SMS 인증 다이얼로그 풀사이즈 처리 해제
      document.body.classList.remove('m_vmodal_hide');
    },
    verifySMS() {
      let self = this;
      if (self.smsRequest === true) {
        return self.$t('mypage.d010');
      } else {
        return self.$t('m_mypage.b009');
      }
    }
  },
  created() {
    this.$EventBus.$emit('mobile-nav-title', this.$t('m_mypage.b011'));
    this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border']);
  },
  destroyed() {
    document.body.classList.remove('m_vmodal_hide');
  }
};
</script>
