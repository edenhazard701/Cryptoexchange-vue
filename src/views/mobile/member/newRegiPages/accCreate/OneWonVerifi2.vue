<template>
  <el-main class="bank-account-main">
       <!-- 1원 인증 2 -->    
          <p style="padding-top:10px;
                    font-size:18px;
                    font-weight:bold;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">
             1원을 보냈어요.</p>  
       
          <p style="padding-top:10px;
                    font-size:15px;
                    font-weight:normal;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">

                <span style="font-weight:bold;
                             color:#212121;                            
                             line-height:25px;">
                  입금자로 표시된 숫자</span> 를 입력해주세요. </p>  

          <div class="logo" >                  
              <img style="margin-top:20px;width:100%;height:100%;" :src="require('@/images/@temp/oneWonDeposited.jpg')">          
          </div>   
           
          <el-form :model="oneWonVerifi2Form" ref="form" :rules="rules" label-position="left" label-width="0px" style="margin-top:20px">  
            <div style="margin:20px 40px 20px 40px; width:80%;">
              <el-form-item  prop="depositerNmText" >
                 <el-input type="text" placeholder="입금자로 표시된 숫자 입력" auto-complete="off" @keyup.native="changeDepositerNmText" @keydown.native="onlyNumber" :disabled="depositerNmTextDisabled"  v-model="oneWonVerifi2Form.depositerNmText" maxlength="4"></el-input>
              </el-form-item>   
             </div>
             <div v-if="successVisible" style="margin:20px 40px 20px 40px; width:80%;">
               <el-col :span="24" style="text-align:center">
                  <img style="width:50px;height:50px;" :src="require('@/images/m_join_completion.png')">
              </el-col>
            </div>
             <div v-if="errorVisible" style="text-align:center" >
                <div> <el-label style="color:red">{{errorText1}}</el-label> </div>
                <div> <el-label style="color:red">{{errorText2}}</el-label> </div>
             </div>
                    
          </el-form>
              
          <div v-if="!successVisible" style="text-align:center">
            <div>  
                <el-label style="color:red">입금계좌적요:</el-label>
                <el-label>{{random4DigitNo}}</el-label>   
            </div>      
          </div>
                
          <div class="btm_fix_btn" style="text-align:center" >
            <el-button  class="b_success_btn" style="margin-bottom:10px"  @click.native.prevent="oneWonVerifi2Next" :disabled="oneWonVerifi2NextDisabled">
              다음</el-button >
              <span style="font-size:15px;">
              받는계좌:
              <br>
              [{{$store.state.user.oneWonCert.bankNm}}]
              {{$store.state.user.oneWonCert.accountNumber}}
              {{$store.state.user.mypage.user_nm}} 
              
              <el-button type="text" style="color:#3f50b4;"  @click.native.prevent="modifyAcc" :disabled="modfiyDisabled">변경하기</el-button>
              </span>
          </div>                 

	</el-main>
</template>

<script>
import { octaWLFcheckGet } from '@/api/octaSolutionRequest';
export default {
	components: {

	},
	data () {    
      const validatecheck = (rule, value, callback) => {    
         let validateValue =  value.toString().replace(/,/g,"");
      
         if (isNaN(Number(validateValue))) {
           callback(new Error("숫자만 입력가능합니다."));      
         } else if((validateValue.length) > 4) {
           callback(new Error('4자리 초과하였습니다.'));         
         } else {
           callback();   
         }
      }
		return {  
      userId:'',
      random4DigitNo:'',
      successVisible:false,
      errorVisible :false,
      disabled: true,			
   
      oneWonVerifi2Form:{
        depositerNmText:'',
      },      
      rules: {        
          depositerNmText: [         
            // { required: true, message: "필수항목입니다.", trigger: ['blur', 'change']},         
            // { validator: validatecheck, trigger: ['blur', 'change']}
          ]        
        },

       depositerNmTextDisabled: false,
       oneWonVerifi2NextDisabled: true,    
       modfiyDisabled:false,  

       failCnt: 0,        //4자리 점유 인증 코드 불일치 실패횟수
       dReqCnt: 0,        //당일 1원 인증 5회 사이클로 5원 까지 시도횟수
     
       wlfData: [],

       errorText1:"숫자 4자리를 다시 확인해주세요.",
       errorText2: '',// "(" + this.failCnt + "/5회)",  

       
		};
	},
	methods : {
    onlyNumber() {
      let self = this
      let text =   self.oneWonVerifi2Form.depositerNmText         
			self.oneWonVerifi2Form.depositerNmText    = text.toString().replace(/[^0-9]/g,'');    
    }, 
 
    changeDepositerNmText(e){
      let self = this
      console.log("e.keyCode:"+e.keyCode)
      let depoNmLength = 0
      let depoNm = this.oneWonVerifi2Form.depositerNmText.toString()    
      let key = e.keyCode;
      //Backspace/DEL 키이면 길이 1 줄어들게 조정
      if (key == 8 || key == 46) {
        depoNmLength = depoNm.length-1;
      } 
      else {
        depoNmLength = depoNm.length+1;
      } 
      console.log("depositerNmText_length:"+parseInt(depoNmLength))     

      //1글자 이상 입력하면 버튼 활성화
      // if( self.oneWonVerifi2Form.depositerNmText 
      //  && depoNmLength > 0 )
      // {
      //   self.oneWonVerifi2NextDisabled = false
      // }else
      // {
      //    self.oneWonVerifi2NextDisabled = true
      // }

      console.log("random4DigitNo:"+self.random4DigitNo)       
      console.log("depositerNmText:"+self.oneWonVerifi2Form.depositerNmText)       

      //1원송금시 생성숫자와 입력한 숫자가 일치하는지 체크
      if(     depoNmLength == 5 
           && (self.random4DigitNo.toString() === self.oneWonVerifi2Form.depositerNmText.substring(0,4)))
      {  
        //일치 표시                     
         self.successVisible = true   
         self.errorVisible = false       
         console.log("임금계좌적요 일치")   
     
         //다음 버튼활성화    
         self.oneWonVerifi2NextDisabled = false
         //입력필드 비활성화
         self.depositerNmTextDisabled = true
      }
      else if(depoNmLength == 5
          && (self.random4DigitNo.toString() != self.oneWonVerifi2Form.depositerNmText.substring(0,4)))
      {         
          //얼럿 출력
         self.errorVisible = true
         //카운트 1증가
         self.failCnt++        
       
         //인증코드 불일치 5회 실패시 
         if(parseInt(self.failCnt) == 5)
         {
             self.errorText1 = "이전 단계로 돌아가서 다시 진행해 주세요."
             self.errorText2 = "(5/5회 실패)"        
             //계좌정보 초기화
             self.$store.state.user.oneWonCert.accountNumber = ''
             self.$store.state.user.oneWonCert.bankCd   =''

             self.depositerNmTextDisabled = true
             self.oneWonVerifi2NextDisabled = true

         }else if(parseInt(self.failCnt) < 5)
         {  
             self.errorText1 = ''
             self.errorText2 = "(" + self.failCnt + "/5회 실패)"  
         }

         //초기화
         self.oneWonVerifi2Form.depositerNmText = ''
        //다음 버튼비활성화    
         self.oneWonVerifi2NextDisabled = true
      }
    },   
 
    //옥타솔루션 AML체크
    wlfCheck(){
         	let self = this;   
          self.$socket.sendProcessByName('ac178', (queryData) => {
          let block = queryData.getBlockData('InBlock1')[0];
              block['user_id'] = self.userId 
              block['req_bsi_tp'] = '1'     // 1.회원가입 2.회원정보편집  
          
          console.log("block:" + JSON.stringify(block))
          }, function (queryData) {
          if (queryData != null) {           

              let res = queryData['queryObj']['OutBlock1'][0];
            
              if(res)
              {   
                  self.wlfData = res
                  console.log("wlfData:"+ JSON.stringify(self.wlfData))
                  self.octaSolutionAPI()
              }
              
          } else {
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "ac178") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: self.$t('sys_err.a001')
            });
          }
        })     
    },
    //옥타솔루션 WLF API
    octaSolutionAPI()
    {    
          let self = this   
          octaWLFcheckGet( self.wlfData )
          .then(data => 
          {   
              console.log(data);              
              if(data.SUCCESS_YN == 'Y' )
              {    
                  console.log("CODE:" + data.CODE);  
                  console.log("CODE_MSG:" + data.CODE_MSG);     

                  //900(정상): Watch List 대상이 아닙니다
                  if(data.CODE == '900')
                  {
                    self.$store.state.user.registration.userNm =  self.wlfData.customer_nm                     
                    self.$router.push({name: 'mOneWonVerifiComplete'});       
                  //200 : Watch List 대상입니다 준법감시팀에 결재요청 하시기 바랍니다.                    
                  //400 : 준법감시팀에서 거래거절로 결재처리된 고객입니다.                 
                  }else if(data.CODE == '200' || data.CODE == '400')
                  {
                    self.$router.push({name: 'mOneWonVerifiPostponed'});     
                  }                    
              }else //SUCCESS_YN = "N" 인 경우
                    //1. Request 파라미터에 값이 없는 경우
                    //2. AML 시스템 장애 발생하는 경우
              {             
                  self.$alert( data.CODE_MSG, '', {
                      dangerouslyUseHTMLString: true,
                      confirmButtonText: self.$t('sys_err.a001')
                  })
              } 

              //에러여부 상관없이 결과값 저장
              self.saveWLFresult(data.SUCCESS_YN, data.ERROR_MSG, data.CODE, data.CODE_MSG)    
              
           }).catch(err => {
           
                console.log(new Error( err.CODE + ": Request is failed" ));   
                self.$alert(self.$t('wlf_err.' + err.CODE ), '', {
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: self.$t('sys_err.a001')
                });                     
             
          })     
    },
    //WLF 결과저장
    saveWLFresult(success, errorMsg, code, codeMsg)
    {
         let self = this
         self.$socket.sendProcessByName('ac179', (queryData) => {
          let block = queryData.getBlockData('InBlock1')[0];
          
              block['req_bsi_tp'] = '1' // 1.회원가입 2.회원정보편집
              block['user_id'] = self.userId
              block['success_yn'] = success
              block['error_msg'] = errorMsg  
              block['rtn_code'] = code
              block['code_msg'] = codeMsg 
              console.log("block:" + JSON.stringify(block))
          }, function (queryData) {
          if (queryData != null) {           

              let res = queryData['queryObj']['OutBlock1'][0];
            
              if(res)
              {   
                  console.log("user_id:"+ res.user_id)                          
              }
              
          } else {
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "ac179") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: self.$t('sys_err.a001')
            });
          }
        })  
    },
    
    //옥타솔루션 WLF 필터링
    oneWonVerifi2Next()
    {
        let self = this
        self.wlfCheck()
     
    },
    //이전페이지 이동하고 계좌정보 입력페이지 초기화
    modifyAcc(){
       let self = this       
       self.$router.push({name: 'mOneWonVerifi1', params:{flag: true}});   
     //self.$router.go(-1);  // 뒤로가기 
    }

	},
  mounted(){
        let self = this
        self.userId = self.$store.state.user.userAccCreationInfo.user_id

        self.random4DigitNo = self.$route.params.randomNo4  //1원송금시 고객에게 보내진 4자리 숫자
        self.dReqCnt  = self.$route.params.reqCnt  //당일 1원인증 시도한 횟수
        
        console.log("ac106userId:"+  self.userId );    
        console.log("random4DigitNo:"+  self.random4DigitNo );           
      
  },
  created() {
       this.$EventBus.$emit("mobile-nav-title", "1원 인증(2|2)");
       this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border','close']);
  }
};

</script>
