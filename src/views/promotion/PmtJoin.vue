<template>
    <!--서브 페이지 영역 -->
  <div class="sub-cont">
    <div class="join">
      <div class="s-join">
        <div class="tit">
          <p>{{ $t('preRegister.a001') }}</p>
        </div>
        <div class="join-content clearfix">
          <div class="item move-ap ">
            <span class="ct-tit">
                {{ $t('preRegister.a002') }}
            </span>
            <div class="desc">
              <input type="text" class="input-chk" ref="inputEmail" @keyup="onUserEmail(userEmail)" v-model="userEmail" :placeholder="$t('preRegister.a003')" :disabled="emailDisabled">
              <!-- <input type="text" ref="inputEmail" v-validate="'required|email'" name="email" v-model="userEmail" placeholder="아이디 (이메일주소)"> -->
              <!-- <p class="inputEmail" v-show="errors.has('email')">{{ errors.first('email') }}</p> -->
              <!-- <p class="inputEmail" v-show="errors.has('email')">이메일 주소 형식에 맞게 정확히 입력하세요</p> -->
            </div>
            <p class="cm">{{ $t('preRegister.a004') }}</p>
          </div>
          <div class="item  clearfix">
            <span class="ct-tit">
                 {{ $t('preRegister.a005') }}
            </span>
            <div class="desc">
              
              <div class="sns-cf">
                <div class="selectbox">
                  <dl class="dropdown">
                    <dt>
                      <a class="f input-chk">
                        <span>+82</span>
                        <!--<img src="common/img/sub/korea.PNG" alt="">-->
                      </a>
                    </dt>
                  </dl>
                </div>
                <input type="text" v-model="userPhone" @keyup="onUserPhone(userPhone)" class="sms-cf input-chk" :placeholder="$t('preRegister.a006')" :disabled="inputReqDisabled">
              </div>

              <!--기존 button class="btn-search 에 추가만 시켜주세요."-->
              <!-- .btn-join-time 타이머 버튼 -->
              <!-- .btn-join-re 재요청 버튼 -->
              <div class="cf-btn">
                
                <button v-if="!countdowning" :disabled="btnReqDisabled" @click="onCertify" :class="['btn-search', {'btn-auth':!optChk}, {'btn-join-re':optRereq}]">{{btnName}}</button>
                <button v-if="countdowning" class='btn-search btn-join-time'>{{ remaining | toMMSS }}</button>
              </div>
            </div>
            <span v-show="errMsg" class="errMsg">{{errMsg}}</span>

            <div class="desc-code" v-show="sms_proc_time">
              <div class="sns-cf">
                <input type="text" class="sms-cf input-chk" v-model="input_otp" :placeholder="$t('preRegister.a007')" :disabled="inputOptDisabled">
              </div>
              <div class="cf-btn">
                <button v-if="optChk" class="btn-search">
                  {{ $t('preRegister.a012') }}
                </button>
                <button v-if="!optChk" @click="onCodeChk" class="btn-search" :disabled="btnOptDisabled">
                  {{ $t('preRegister.a011') }}
                </button>
                
              </div>

            </div>
            <span v-if="optErrMsg && sms_proc_time" class="optErrMsg">{{optErrMsg}}</span>
          </div>
          <div class="item ">
            <span class="ct-tit">
                {{ $t('preRegister.a013') }}
            </span>
            <div class="desc">
              <input type="text" v-model="rcmd_cd" :placeholder="$t('preRegister.a014')">
            </div>
          </div>
        </div>
        <div class="access-terms clearfix">
          <div class="input-checkbox">
            <div class="ccheck">
              <input type="checkbox" v-model="use_terms_chk" id="check_test">
              <label for="check_test">
                <div class="chk_img">    {{ $t('preRegister.a015') }}</div>
              </label>
            </div>

          </div>
          <div class="terms-btn">
            <button class="access-open-btn" data-modal-id="popup" @click="onPopup">{{ $t('preRegister.a016') }}</button>
          </div>
        </div>

        <div class="btn-join">
          <a :class="['join', 'btn-blue', {'btn-auth-join':!optChk}]" @click="onSubmit">{{ $t('preRegister.a017') }}</a>
        </div>
      </div>

    </div>
    <!-- 레이어팝업 -->
<div id="popup" class="modal-box">
  <div class="pop-header">
    <p class="tit">이용약관입니다<button class="btn-pop-close js-modal-close js-modal-close-info">{{ $t('preRegister.a018') }}</button></p>
  </div>
  <div class="pop-body mCustomScrollbar">
    <!-- <div v-html="popupData.conts"></div> -->
    <div>이용약관입니다</div>
    <div>이용약관입니다</div>
    <div>이용약관입니다</div>
    <div>이용약관입니다</div>
    <div>이용약관입니다</div>
    <div>이용약관입니다</div>
    <div>이용약관입니다</div>
    <div>이용약관입니다</div>
    <div>이용약관입니다</div>
  </div>
</div>
  </div>


<!-- //레이어팝업 -->
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { Validator } from 'vee-validate'
import vueTimers from 'vue-timers/mixin'
import {promPopupInfo} from '../../api/promotion.js'
import Cookies from 'js-cookie'
export default {
  mixins: [vueTimers],
  timers: {
		tick: { time: 1000, repeat: true }
  },
  computed: {
    countdowning() {
      return this.timers.tick.isRunning;
    }
  },
  filters: {
    toMMSS(s) {
      return moment.utc(s*1000).format('mm:ss');
    }
	},
  data() {
    return {
      userEmail: '',
      userPhone: '',
      input_otp: '',
      sms_proc_time: '',
      user_id: '',
      sms_auth_no: '',
      rcmd_cd: '',
      use_terms_chk: false,
      use_terms: '0',
      optChk: false,
      timeoutOtp: true,
      remaining: 180,
      optTimerCnt: false,
      optRereq: false,
      btnOptDisabled: false,
      btnReqDisabled: false,
      optFailCnt: 0,
      reqFailCnt: 0,
      // btnName: '인증요청',
      btnName: this.$t('preRegister.a008'),
      inputReqDisabled: false,
      inputOptDisabled: false,
      emailDisabled: false,
      popupData: {
        subj: '',
        conts: ''
      },
      errMsg: '',
      optErrMsg: ''
      }
  },
  watch: {
    userEmail: function (userEmail) {
      if (userEmail.length > 59) {
          this.userEmail = userEmail.substring(0, 59)
      }
    },
    use_terms_chk: function(use_terms_chk) {
      if (use_terms_chk) {
        this.use_terms = '1'
      } else {
        this.use_terms = '0'
      }
    },
    optChk(optChk) {
      this.optChk = optChk
    }
  },


  methods: {
    // 인증요청
      onCertify() {
        
        this.errMsg = ''
        this.optErrMsg = ''
        const emailChk = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let langType = ''
        if (Cookies.get('Language-Type') === 'ko') {
          langType = 'KR'
        } else {
          langType = 'EN'
        }
        
        if (!this.userEmail) return this.$alert(this.$t('preRegister.c011'))

        if (!emailChk.test(this.userEmail)) return this.$alert(this.$t('preRegister.c012'))

        // if (Cookies.get('optChkFail')) return this.errMsg = this.$t('preRegister.c013')
        // if (Cookies.get(this.userEmail) > 5) return this.errMsg = this.$t('preRegister.c013')

        if (this.userPhone.length < 10) return this.errMsg = this.$t('preRegister.c014')

        // this.emailDisabled = true
        // this.inputReqDisabled= true

        // this.reqFailCnt++
        // 아이디에 따른 재요청 횟수
        // console.log('userEmailFailCnt');
        // let userEmailFailCnt = Cookies.get(this.userEmail)
        // console.log('userEmailFailCnt = ', userEmailFailCnt);
        // if (!userEmailFailCnt) {
        //   Cookies.set(this.userEmail, 1, {expires:1})
        //   console.log('is not userEmailFailCnt = ', userEmailFailCnt);
        // } else {
        //   userEmailFailCnt++
        //   Cookies.set(this.userEmail, userEmailFailCnt, {expires:1})
        //   console.log('is userEmailFailCnt = ', userEmailFailCnt);
        // }
        
        // 재요청시 5번 초기화 
        this.optFailCnt = 0
        this.btnOptDisabled = false

        // if (this.reqFailCnt > 5) {
          // if (userEmailFailCnt > 5) {
          // this.$alert('재요청 횟수가 5회를 초과하였습니다')
          // this.errMsg = this.$t('preRegister.c013')
          // Cookies.set('optChkFail', 'true', {expires:1})
          // Cookies.set('optChkFail', 'true', {expires:1})
          // this.btnOptDisabled = true
          // this.btnReqDisabled = true
          // this.inputOptDisabled = true
          // this.inputReqDisabled = false
          // this.emailDisabled = false
          // return
        // }

        // console.log('vue = ', Vue);
        Vue.prototype.$socket.sendProcessByName('ac181',
          queryData => {
            let block = queryData.getBlockData('InBlock1')[0]
            block['user_mail'] = this.userEmail
            block['mobl_ctry'] = '82'
            block['auth_mobl_no'] = this.userPhone
            block['lang_kind'] = langType
            // block['lang_kind'] = 'EN'
          },
          queryData => {
            if (!queryData) {
                console.log('인증요청 실패')
                
                let errorData = window.sessionStorage.getItem('lastErrorData')

                if (errorData !== null) {
                  errorData = JSON.parse(errorData)
                  
                  // 인증완료된 핸드폰입니다 if (errorData.errCode === '40722')

                  if (errorData.errCode === '40722') {
                    // this.$alert('이미 인증이 완료된 상태입니다', {confirmButtonText: '홈으로 이동하기'})
                    //   .then(res => this.$router.push('/'))
                    // this.$alert(this.$t('preRegister.c006'))
                    this.errMsg = this.$t('preRegister.c006')
                  } else if (errorData.errCode === '40095') {
                    // this.$alert(this.$t('preRegister.c015'))
                    this.errMsg = this.$t('preRegister.c015')
                      
                  } else if (errorData.errCode === '49042') {
                    this.$alert(this.$t('preRegister.c016'))
                      .then(res => {
                          this.$refs.inputEmail.focus()
                          this.userEmail = ''
                      })
                  } else if (errorData.errCode === '40413') {  //5회 에러
                    this.errMsg = this.$t('preRegister.c013')
                  } else {
                    this.errMsg = errorData.errMsg
                  }
                }
                // 인증번호가 요청되지 않아서 --
                // this.reqFailCnt--
                // userEmailFailCnt--
                // Cookies.set(this.userEmail, userEmailFailCnt, {expires:1})
                // this.emailDisabled = false
                // this.inputReqDisabled= false
        
                return
            }
            // console.log('queryData = ', queryData);
            let res = queryData.getBlockData('OutBlock1')[0]
            // res = JSON.stringify(res)
            
            // 보낸시간 (3분까지)
            this.sms_proc_time = res.sms_proc_time
            //암호화된 이메일(아이디)
            this.user_id = res.user_mail
            // 인증번호
            this.sms_auth_no = res.sms_auth_no
            // 인증번호 3분
            this.remaining = 180;
            this.optTimerCnt = true
            this.$timer.start('tick');
          }
        )
      },
      // 인증코드 입력
      onCodeChk() {
        Vue.prototype.$socket.sendProcessByName('ac180',
          queryData => {
            let block = queryData.getBlockData('InBlock1')[0]
            block['user_id'] = this.user_id
            block['input_otp'] = this.input_otp
          },
          queryData => {
            if (!queryData) {
              this.optFailCnt++
              
              if (this.optFailCnt >= 5) {
                // this.$alert('5회이상 실패 하셨습니다. 재요청을 하십시오')
                this.errMsg = this.$t('preRegister.c017')
                this.sms_proc_time = ''
                this.btnOptDisabled = true
                this.$timer.stop('tick')
                this.optRereq = true
                // this.btnName = '재요청'
                this.btnName = this.$t('preRegister.a010')
                this.emailDisabled = false
                this.inputReqDisabled= false
                this.input_otp = ''
                return
              }

              let errorData = window.sessionStorage.getItem('lastErrorData')
              
              if (errorData !== null) {
                  
                  errorData = JSON.parse(errorData)
                  // if (errorData.trName === 'ac180') this.$alert(errorData.errMsg)
                  // if (errorData.trName === 'ac180') this.optErrMsg = errorData.errMsg
                  if (errorData.errCode === '40201' || errorData.errCode === '40296') {
                    this.optErrMsg = this.$t('preRegister.c018')
                  }
              }

              return
            }

            let res = queryData.getBlockData('OutBlock1')[0]
            this.optErrMsg = ''
            this.optChk = true
            this.optFailCnt = 0


            this.$timer.stop('tick')
            this.optTimerCnt = false
            this.optRereq = false
            this.btnOptDisabled = true
            this.btnReqDisabled = true
            this.inputOptDisabled = true
            this.inputReqDisabled = true
            this.emailDisabled = true
            let inputChk = document.querySelectorAll('.input-chk')
            for (let i  = 0; i < inputChk.length; i++) {
              inputChk[i].classList.add("input-disabled")
            }
            //인증완료 후 로직
          })
      },
      onSubmit() {
        
        const emailChk = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!this.userEmail) return this.$alert(this.$t('preRegister.c011'))

        // if (this.errors.has('email')) return this.$alert('이메일 주소 형식에 맞게 정확히 입력하세요')

        if (!emailChk.test(this.userEmail)) return this.$alert(this.$t('preRegister.c012'))

        if (!this.optChk) return this.$alert(this.$t('preRegister.c019'))

        if (!this.use_terms_chk) return this.$alert(this.$t('preRegister.c020'))

        let langType = ''
        if (Cookies.get('Language-Type') === 'ko') {
          langType = 'KR'
        } else {
          langType = 'EN'
        }

        Vue.prototype.$socket.sendProcessByName('ac182',
          queryData => {
            let block = queryData.getBlockData('InBlock1')[0]
            block['user_id'] = this.user_id
            block['rcmd_cd'] = this.rcmd_cd
            block['use_terms'] = this.use_terms
            block['lang_kind'] = langType
          },
          queryData => {
            if (!queryData) {
              let errorData = window.sessionStorage.getItem('lastErrorData')
              if (errorData !== null) {
                  errorData = JSON.parse(errorData)

                  // if (errorData.trName === 'ac182') this.$alert(errorData.errMsg)
                  if (errorData.errCode === '40094') {
                    this.$alert(this.$t('preRegister.c023'))
                  } else {
                    this.$alert(this.$t('preRegister.c024'))
                  }
              }
              return
            }

            const res = queryData.getBlockData('OutBlock1')[0]
            const user_mail = res.user_mail

            const now = new Date()

            let timeout = now.setMinutes(now.getMinutes() + 15)
            timeout = moment(timeout).format('YYYY.MM.DD HH:mm')

            this.$router.push({name:'pmtJoinSuccess', params: {user_mail, timeout}})
          }
        )
      },
      tick() {
        if (this.remaining < 1) {
          this.$timer.stop('tick')
          this.optTimerCnt = false
          this.optRereq = true
          this.btnReqDisabled = false
          this.btnOptDisabled = true
          // this.btnName = '재요청'
          this.btnName = this.$t('preRegister.a010')
          this.emailDisabled = false
          this.inputReqDisabled= false
        } else {
          this.remaining -= 1;
			}
    },
    onAgrPopup() {
      
    },
    onPopup() {
      layerPopup()

      $('.pop-body').mCustomScrollbar()

      // promPopupInfo({
      //   langType: Cookies.get('Language-Type')
      // })
      //   .then(res => {
      //     this.popupData = res.body
      //   }) 
      //   .catch(err => {
      //     console.log(err)
      //   })
      
      
    },
    onUserEmail(userEmail) {
      if (userEmail.length > 60) {
        this.$alert(this.$t('preRegister.c021'))
        this.userEmail = userEmail.substring(0, 60)
      }
    },
    onUserPhone(userPhone) {
      const numberChk = /^[0-9]*$/
      if(!numberChk.test(userPhone)) {
        this.$alert(this.$t('preRegister.c022'))
        this.userPhone = ''
      }

    }

  },
  created() {
    $(window).off('scroll')
  },
  mounted() {
    
    this.rcmd_cd = this.$route.query.referral_id
      // https://kovex.co.kr?referral_id=1cfE48

    }
  }
</script>

<style> 
.modal-overlay{opacity:0; position:fixed; top:0; left:0; z-index:900; width:100%; height:100%; background:rgba(0, 0, 0, 0.3)!important;}
.inputEmail{color:red}
.timer {color:#ff1744;}
.btn-auth {background-color: blue !important}
.btn-auth-join {background-color:#747474 !important}
.input-disabled {background-color:#aeafad !important}
/* .errMsg {
  color:red;
  margin-right: 40%;
  position:relative;
}
.optErrMsg {
  color:red;
  left: -210px;
  position:relative;
} */
</style>