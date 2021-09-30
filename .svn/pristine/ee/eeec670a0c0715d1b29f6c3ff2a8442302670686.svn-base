<template>
  <el-main class="bank-account-main">
    
       <!-- 1원 인증  -->     
          <p style="padding-top:10px;
                    font-size:13px;
                    font-weight:normal;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">
          {{$store.state.user.mypage.user_nm}} 님의 본인 명의 타행계좌로</p>  
       
          <p style="padding-top:0px;
                    font-size:13px;
                    font-weight:normal;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">
              본인인증을 진행합니다.</p>  

           <p style="padding-top:10px;
                    font-size:18px;
                    font-weight:bold;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">
              {{oneWonCertText}}</p>  

          <el-form :model="oneWonVerifi1Form" ref="form" :rules="rules" label-position="left" label-width="0px" style="margin-top:20px">  
             <div >  
                <!-- <el-form-item prop="bank" >
                  <el-select v-model="oneWonVerifi1Form.bank" @change="onBankChange" :placeholder="$t('mypage.i007')" >
                    <el-option label="KB국민은행" value="004">국민은행</el-option>
                    <el-option label="신한은행" value="088">신한은행</el-option>
                    <el-option label="KEB하나은행" value="081">KEB하나은행</el-option>
                    <el-option label="우리은행" value="020">우리은행</el-option>
                    <el-option label="기업은행" value="003">기업은행</el-option>

                    <el-option label="농협은행" value="011">농협은행</el-option>
                    <el-option label="씨티은행" value="027">씨티은행</el-option>
                    <el-option label="스탠다드차타드은행" value="023">스탠다드차타드은행</el-option>
                    <el-option label="케이은행" value="089">케이은행</el-option>
                    <el-option label="카카오뱅크" value="090">카카오뱅크</el-option>
                  </el-select>
                </el-form-item>    -->
                <el-form-item>              
                    <el-select                      
                      v-model="oneWonVerifi1Form.bank"                      
                      @change="onBankChange"     
                      :disabled="bankDisabled"                   
                      style="margin:0 40px 0 40px;width:80%"                                        
                    >           
                      <el-option
                        v-for="item in banks"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"                      
                        :placeholder="$t('mypage.i007')"
                      ></el-option>
                    </el-select>
                </el-form-item>    
            </div>

            <div v-if="accountNumberInputVisible" style="margin:20px 40px 20px 40px;width:80%">   
              <el-form-item prop="accountNumber" class="bankaccount-account">
                <el-row>
                  <el-col class="input">
                     <el-input  type="number"   
                                pattern="\d*"                           
                                :placeholder="$t('mypage.i008')" 
                                auto-complete="off"                            
                                maxlength="20" max="99999999999999999999"
                                @keydown.native="changeAccNo"                              
                                v-model="oneWonVerifi1Form.accountNumber" 
                                :disabled="accNoDisabled" 
                              >
                      </el-input>
                  </el-col>
                </el-row>
              </el-form-item>      
             </div>        

             <div style="text-align:center" v-if="errorVisible">
              <div>  <el-label style="color:red">{{errorText1}}</el-label> </div>
              <div>  <el-label style="color:red">{{errorText2}}</el-label> </div>
             </div>
        
          </el-form>
                
          <div  class="btm_fix_btn" >
            <el-button class="b_success_btn" :loading="verifying" @click.native.prevent="checkClicked"  :disabled="oneWonVeri1NextDisabled">
              다음</el-button >
          </div>      

	</el-main>
</template>

<script>
import { doznInquireDepositor, doznAccAuth } from '@/api/doznRequest';
export default {
	components: {

	},
	data () {
     const validatecheck = (rule, value, callback) => {    
        let validateValue =  value.toString().replace(/,/g,"");
      
         if (isNaN(Number(validateValue))) {
           callback(new Error("숫자만 입력가능합니다."));      
         } else if((validateValue.length) < 8) {
           callback(new Error('8자리 이하입니다.'));         
         } else {
           callback();   
         }
      }
		return { 
      userId:'', 
      userNm:'',  
      apiKeyData : '2076ca74-9ef7-42cc-942f-7ee07f2e9030', //테스트용 향후 운영반영시 바뀜
      orgCodeData: '10000152',    //더즌에서 부여한 코벡스 기관번호
      identifyNo: '', //사용자 생년월일    
      uniqueTransactionNo:'', //고유거래번호
      randomNo4DigitData:'', //랜덤 4자리숫자, 다음페이지에서 사용자가 정확히 입력해야 하는 값

      disabled: true,
			verifying : false,
      errorVisible :false,
      bankDisabled: false,
      accNoDisabled: false,

       banks: [{
          value: '001',
          label:  this.$t('m_signup.banks.f001')
        }, {
          value: '011',
          label: this.$t('m_signup.banks.f002')
        }, {
          value: '004',
          label: this.$t('m_signup.banks.f003')
        }, {
          value: '088',
          label: this.$t('m_signup.banks.f004')
        }, {
          value: '020',
          label: this.$t('m_signup.banks.f005')
        }, {
          value: '081',
          label: this.$t('m_signup.banks.f006')
        }, {
          value: '003',
          label: this.$t('m_signup.banks.f007')
        }, {
          value: '023',
          label: this.$t('m_signup.banks.f008')
        }, {
          value: '027',
          label: this.$t('m_signup.banks.f009')   
        }, {
          value: '002',
          label: this.$t('m_signup.banks.f010')
        }, {
          value: '045',
          label: this.$t('m_signup.banks.f011')   
        }, {
          value: '031',
          label: this.$t('m_signup.banks.f012')
        }, {
          value: '034',
          label: this.$t('m_signup.banks.f013')
        }, {
          value: '071',
          label: this.$t('m_signup.banks.f014')  
        }, {
          value: '048',
          label: this.$t('m_signup.banks.f015')
        }, {
          value: '037',
          label: this.$t('m_signup.banks.f016')
        }, {
          value: '039',
          label: this.$t('m_signup.banks.f017') 
        }, {
          value: '032',
          label: this.$t('m_signup.banks.f018')
        }, {
          value: '007',
          label: this.$t('m_signup.banks.f019')
        }, {
          value: '008',
          label: this.$t('m_signup.banks.f020')
        }, {
          value: '012',
          label: this.$t('m_signup.banks.f021')
        }, {
          value: '052',
          label: this.$t('m_signup.banks.f022')
        }, {
          value: '054',
          label: this.$t('m_signup.banks.f023')
        }, {
          value: '055',
          label: this.$t('m_signup.banks.f024')
        }, {
          value: '059',
          label: this.$t('m_signup.banks.f025')
        }, {
          value: '089',
          label: this.$t('m_signup.banks.f026')
        }, {
          value: '090',
          label: this.$t('m_signup.banks.f027')
        }],    
 
      oneWonVerifi1Form:{    
        bank:'',  
        accountNumber:''     
      }, 
          
      rules: {        
          accountNumber: [                  
             { required: true, message: "필수항목입니다.", trigger: ['blur', 'change']},            
             { validator: validatecheck, trigger: ['blur', 'change']}
          ]        
        },
      
       oneWonVeri1NextDisabled:true, 
       oneWonCertDialogVisible:false,
       investInfoDisabled:false,  
       oneWonCertText:"금융기관을 선택해주세요.",
       errorText1:"계좌정보가 일치하지 않습니다.",
       errorText2:"입력정보를 다시 확인해 주세요.",  
       accountNumberInputVisible:false,       

       oneWonFailCnt: 0,  //4자리 점유인증코드 불일치 횟수   
       oneDayReqCnt: 0,  //당일 1원 인증 5회 사이클로 5원 까지 시도횟수 
       reqDt:''
		};
	},
	methods : {
    onBankChange(){
        let self = this;
        if(self.oneWonVerifi1Form.bank != '' ) 
        {       
            self.accountNumberInputVisible = true  
            self.oneWonCertText = "계좌번호를 입력해주세요."    
            self.oneWonVerifi1Form.accountNumber = ""
            self.$store.state.user.oneWonCert.accountNumber= ""    //은행 재선택시 계좌번호 초기화
        }else
        {
            self.accountNumberInputVisible = false      
            self.oneWonCertText = "금융기관을 선택해주세요."         
        }                
    },

    changeAccNo(e){
      console.log("e.keyCode:"+e.keyCode)
      let accNoLength = 0
      let accNo = this.oneWonVerifi1Form.accountNumber.toString()    
      let key = e.keyCode;
      //Backspace/DEL 키이면 길이 1 줄어들게 조정
      if (key == 8 || key == 46) {
        accNoLength = accNo.length-1;
      } 
      else {
        accNoLength = accNo.length+1;
      } 
      console.log("accountNumber_length:"+parseInt(accNoLength))     
    
      if(this.oneWonVerifi1Form.bank != '' && parseInt(accNoLength )> 7 ) //8자리이상
      {
          this.oneWonVeri1NextDisabled = false
      }else
      {
          this.oneWonVeri1NextDisabled = true
      }     
    },
    // onlyNumber() {
		// 	this.oneWonVerifi1Form.accountNumber = this.oneWonVerifi1Form.accountNumber.replace(/[^0-9]/g,'');     
		// },
    checkClicked() {
		//다음 클릭
			let self = this;
			self.verifying = true;
			self.$refs['form'].validate((valid) => {
				if(!valid) {                     // 은행, 계좌번호 validation 확인				
					if(self.oneWonVerifi1Form.bank == '') {
						self.$alert(this.$t('mypage.i007-1'), '', {
							confirmButtonText: this.$t('mypage.i019')
						});
					}else if(self.oneWonVerifi1Form.accountNumber == '') {
						self.$alert(this.$t('mypage.i008-1'), '', {
							confirmButtonText: this.$t('mypage.i019')
						});
					}
					self.verifying = false;
				}else {
			
						self.inquireDepositor();  //예금주조회	

				}
			})
		},
  
	  //예금주 조회 (더즌) 업체 :김준현 차장 / 02-6328-1205 / jhkim@dozn.co.kr
    inquireDepositor(){
        let self = this
        //     테스트계좌 :
        // 은행코드 / 테스트계좌 / 예금주명
        // 004 / 832210312031 / 문세인
        // 007 / 113000509251 / (고)하정파범	
        // 011 / 36701006302 / 달나라가자	
        // 034 / 1107020460139 / 영전용가이가
        // 045 / 9002999999028 / 김 일
        // 081 / 46291012501007 / 핍랄샐
        // 088 / 140012036898 / (나)하완파차
        // 090 / 3333030303018 / 함진헌
        let randomNo6Digit = Math.floor(100000 + Math.random() * 900000)

      doznInquireDepositor({      
          telegramNoData : randomNo6Digit,//당일 unique 한 거래번호 ,최대 6자
          bankCodeData : '081',//self.oneWonVerifi1Form.bank,               
          accountData : '46291012501007'//self.oneWonVerifi1Form.accountNumber,  //'-' 하이픈 미포함      
      })
      .then(res => {
         
          console.log("Success");
          console.log("더즌거래번호:" + res.natv_tr_no );
          console.log("예금주조회요청일시:" + res.request_at );
          console.log("예금주:" + res.depositor );     
          //예금주명이 ac519 로 조회한 사용자명과 같으면(예금주 조회 성공) 
          //1원 계좌로 송금  
          if(   res.depositor != '' &&  ( res.depositor ===  '내부응답' || 
                                          res.depositor ===  '핍랄샐' ))     
          //if(res.depositor != '' && res.depositor ===  self.userNm)
          {
              //조회시마다 이체요청횟수 1회 증가    
              setTimeout(() => {                    
                     self.getDayTranReqCnt()     
              }, 1000);  //1초후에 발송 (타임아웃 방지용)
          }
          else{  //불일치
            self.errorVisible = true
          }                  
          return

      }).catch(error => {
        if(typeof error.status != "undefined" && error.status != '200')
        {
          console.log(new Error( error.status + ": inquireDepositor confirm fail" ));   
          self.$alert(self.$t('dozn_err.' + error.status ), '', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: self.$t('sys_err.a001')
          });  
        }          
        return        
       
      })    
    },
    
    //이체요청횟수조회 + 1원이체
    getDayTranReqCnt()
    {
          let self = this
          self.$socket.sendProcessByName('ac560', (queryData) => {
          let block = queryData.getBlockData('InBlock1')[0];
              block['user_id'] =  self.userId      
          console.log("block:" + JSON.stringify(block.user_id))
          }, function (queryData) {
          if (queryData != null) {           

              let res = queryData['queryObj']['OutBlock1'][0];
            
              if(res)
              {  
                  self.oneDayReqCnt =  res.tran_req_cnt //이체요청횟수                 
                  console.log("oneDayReqCnt:"+ self.oneDayReqCnt)
                  //5회 미만일 때 1원 계좌로 송금    
                  if( parseInt(self.oneDayReqCnt) < 5)
                  {
                    //해당계좌로 1원 송금
                    setTimeout(() => {                    
                          self.wireOneWonToAcc()  //조회시마다 이체요청횟수 1회 증가       
                    }, 1000);  //1초후에 발송 (타임아웃 방지용)                      
                     
                    self.errorVisible = false
                  }else
                  {
                    self.errorText1 = "당일 인증은 5회까지입니다."
                    self.errorText2 = "내일 다시 시도해 주세요."
                    self.errorVisible = true

                    //비활성화
                    self.bankDisabled = true
                    self.accountNumberInputVisible = true  
                    self.accNoDisabled = true 
                  
                    return
                  }              
              }
              
          } else {
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "ac560") return
            console.log("CODE:" + errorData.errCode); 

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: self.$t('sys_err.a001')
            });
          }
        })     
    },
    //해당계좌로 1원 송금
    wireOneWonToAcc(){
	       let self = this;
         //랜덤 6자리 숫자
         self.uniqueTransactionNo = Math.floor(100000 + Math.random() * 900000)
         //랜덤 4자리 숫자 저장후 체크(1원송금시 보내는 랜덤 4자리 한글단어 대용)
         self.randomNo4DigitData  = Math.floor(1000 + Math.random() * 9000);        
  
          doznAccAuth({                            
              telegramNoData : self.uniqueTransactionNo,//당일 unique 한 거래번호 ,최대 6자
              rvBankCodeData : '081',//self.oneWonVerifi1Form.bank,  //입금하고자 하는 은행코드           
              rvAccountData :  '46291012501007',//self.oneWonVerifi1Form.accountNumber,//입금하고자 하는 계좌번호'-' 하이픈 미포함   
              rvAccountCntnData :  self.randomNo4DigitData//랜덤 4자리 한글단어 생성 추후 구현           
          })        
          .then(res => {
                    
              console.log("Success");
              console.log("더즌거래번호:" + res.natv_tr_no );
              console.log("입금계좌적요:" + res.rv_account_cntn );
              console.log("점유인증금액:" + res.amount );  
              
              self.oneWonVeri1Next()

          }).catch(error => {
              //오류응답 중 STATUS : 400 에 ERROR_CODE : VTIM(타임아웃)이 발생 했을 경우, 
              //계좌점유인증 내역조회' 를 통해 거래 처리여부를 확인합니다.
              if(typeof error.status != "undefined" && error.status != '200')
              {
                console.log(new Error( error.status + ": doznAccAuth fail" ));     
                self.$alert(self.$t('dozn_err.' + error.status ), '', {
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: self.$t('sys_err.a001')
                })
                //계좌점유인증 내역조회
                if(error.status == '400' && error.statusText =='VTIM')
                {
                  self.getHistoryOfAccAuth()
                }               
              }
              return  
          })      
    },

    //거래점유인증 내역조회
    getHistoryOfAccAuth(){
	       let self = this;
         self.reqDt = new Date();
         console.log("reqDt:"+self.reqDt.format('yyyyMMdd'))
          doznAccAuthInquire({      
              orgTelegramNo : self.uniqueTransactionNo,//self.oneWonVerifi1Form.bank,  //요청 시 사용한 거래고유번호          
              trDt :  self.reqDt.format('yyyyMMdd'),//'20210804', //YYYYMMDD 원거래 요청일자
              drwBankCode :  ''//원거래 모계좌 은행코드 - 이용기관이 은행과 직접 계약된 경우 필수.         
          })        
          .then(res => {                    
              console.log("Success");
              console.log("응답상태코드:" + res.status );   //200 : 정상. 그 외 에러. 9.에러응답 참고
              console.log("더즌거래번호:" + res.natv_tr_no );  //더즌에서 발급한 고유거래번호
              console.log("거래처리일시:" + res.transfer_at ); //YYYMMDDHHmmss
              console.log("입금계좌적요:" + res.rv_account_cntn );  
              console.log("점유인증금액:" + res.amount );
          }).catch(error => {  
              // 오류응답 중 VTIM(타임아웃), 0011(처리중)이 발생 했을 경우, 은행으로부터 이체처리결과가 확인되지 않은 상태입니다. 
              // 반복적으로 조회를 하여 정상 혹은 실패결과를 수신하시기 바랍니다           
              if(typeof error.status != "undefined" && error.status != '200')
              {
                console.log(new Error( error.status + ": doznAccAuthInquire fail" ));     
                self.$alert(self.$t('dozn_err.' + error.status ), '', {
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: self.$t('sys_err.a001')
                });                        
             
                if(error.status == '0011' || error.statusText =='VTIM')
                {
                  self.$alert('은행으로부터 이체처리결과가 <br> 확인되지 않은 상태입니다.', '', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: self.$t('sys_err.a001')
                  });     
                }    
              }
              return  
          })      
    },
    //인증 실패횟수 조회
    // checkCert5times()
    // {
    //       let self = this
    //       self.$socket.sendProcessByName('ac560', (queryData) => {
    //       let block = queryData.getBlockData('InBlock1')[0];
    //           block['user_id'] = 's8c*xCDlNj'       
    //       console.log("block:" + JSON.stringify(block.user_id))
    //       }, function (queryData) {
    //       if (queryData != null) {           

    //           let res = queryData['queryObj']['OutBlock1'][0];
            
    //           if(res)
    //           {   
    //               self.oneWonFailCnt =  res.tran_req_cnt //인증실패횟수   
              
    //               console.log("oneWonFailCnt:"+ self.oneWonFailCnt)
    //               // Case1) 1원 인증 5회 실패 횟수가 남은 경우
    //               // : 계좌정보 페이지에서 계좌정보 변경 불가하도록 비활성화함
    //               // : 1원 인증 남용 방지

    //               // Case2) 5회 인증 실패시 계좌정보 초기화
    //               if(parseInt(self.oneWonFailCnt) == 5)
    //               {
    //                   self.initData()
    //               }

    //               //당일 1원 인증 5회 사이클로 5원 까지 실패 시 모두 비활성화
    //               if(parseInt(self.oneDayReqCnt) == 5 && parseInt(self.oneWonFailCnt) == 5)
    //               {
    //                   //비활성화
    //                   self.bankDisabled = true
    //                   self.accountNumberInputVisible = true  
    //                   self.accNoDisabled = true 
    //               }
    //           }
              
    //       } else {
    //         // 전문 에러 언어팩 적용
    //         const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
    //         if (errorData.trName != "i0018") return
    //         console.log("CODE:" + errorData.errCode);  
    //       }
    //     })     
    // },
    oneWonVeri1Next(){

      	let self = this;

        //다음 페이지로 은행명 넘김
        self.banks.forEach(element => {
          if(element.value === self.oneWonVerifi1Form.bank )
          {
              self.$store.state.user.oneWonCert.bankCd = element.value
              self.$store.state.user.oneWonCert.bankNm = element.label
            //  console.log("bankNm:"+element.label)
          }
        });

        self.$store.state.user.oneWonCert.accountNumber = self.oneWonVerifi1Form.accountNumber
        self.$router.push({name: 'mOneWonVerifi2', params: {randomNo4: self.randomNo4DigitData, reqCnt: self.oneDayReqCnt}})
    },
   
    initData() {
			let self = this;
			self.oneWonVerifi1Form.bank = '';
			self.oneWonVerifi1Form.accountNumber = '';
		}

	},
  mounted(){        
      let self = this;     
      //변경하기 버튼으로 뒤로 온 경우
      if(self.$route.params.flag == true)
      {   //초기화
          self.initData()     
          self.bankDisabled = false
          self.accountNumberInputVisible = false  
          self.accNoDisabled = false 
          //다음버튼 비활성화
          self.oneWonVeri1NextDisabled = true   
      }        
      //내부저장소에 계좌정보 있을 경우, 정보 불러오고 비활성화(반복적인 1원입금방지용)
      else if(self.$store.state.user.oneWonCert.accountNumber)
      {
           self.oneWonVerifi1Form.accountNumber = self.$store.state.user.oneWonCert.accountNumber
           self.oneWonVerifi1Form.bank          =	self.$store.state.user.oneWonCert.bankCd  
           self.bankDisabled = true
           self.accountNumberInputVisible = true  
           self.accNoDisabled = true 
           //다음버튼 활성화
           self.oneWonVeri1NextDisabled = false
      }
    
  },
  created() {
      this.userId = this.$store.state.user.userAccCreationInfo.user_id     
      this.userNm = this.$store.state.user.userAccCreationInfo.user_nm
      console.log("ac106_userId:"+  this.userId );
      console.log("userNm:"+  this.userNm );
      this.$EventBus.$emit("mobile-nav-title", "1원 인증(1|2)");
      this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border','close']);
  }
};

</script>
