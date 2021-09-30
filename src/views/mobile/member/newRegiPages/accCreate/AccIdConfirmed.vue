<template>
   <el-main class="bank-account-main">
  
       <!-- 본인확인 (계좌만들기)  -->
          <p style="padding-top:20px;
                    font-size:15px;
                    font-weight:normal;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">
          인증서를</p>  

          <p v-if="!successToGetaCert" style="padding-top:0px;
                    font-size:15px;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">        
           가져올게요</p>  
           
          <p v-else style="padding-top:0px;
                    font-size:15px;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">        
           가져왔어요</p>           

          <div v-if="!successToGetaCert" style="padding-top:20px;" >

            <el-row style="margin-top:10px">
             <el-col :span="12">
                 <div style="margin:0px 0px 0px 0px">
                  <img style="width:100%;height:100%;" :src="require('@/images/@temp/identityCard.jpg')">
                 </div>
             </el-col>
             <el-col :span="12">
                  <div style="margin:15px 0px 20px 20px">
                    <el-button style="background-color:grey;color:white;width:100%;height:90px" round @click="checkIdentityCard">주민등록증 <br><br>인증서 가져오기</el-button>
                  </div>
             </el-col>
            </el-row>
           
            <el-row style="margin-top:10px">
              <el-col :span="12">
                  <div style="margin:0px 0px 0px 0px">
                    <img style="width:100%;height:100%;" :src="require('@/images/@temp/driverLicense.jpg')">
                  </div>
              </el-col>
              <el-col :span="12">
                    <div style="margin:15px 0px 20px 20px">
                      <el-button style="background-color:grey;color:white;width:100%;height:90px" round @click="checkDriverLicense">운전면허증 <br><br>인증서 가져오기</el-button>
                    </div>
              </el-col>
            </el-row>     

            <!-- <el-button style="background-color:#3f50b4;color:white;width:100%;height:50px;font-size:16px"  round @click.native.prevent="getVirtualAssetCert" >
              가져오기</el-button > -->
          </div>   

          <div v-else style="margin:50px;text-align:center;border: 0px solid grey;" >
            <el-row style="padding:20px" >              
               <img style="width:50px;height:50px;" :src="require('@/images/m_join_completion.png')">      
            </el-row>
            <el-row style="padding-bottom:20px">
                완료
            </el-row>
          </div>   

          <div style="text-align:center" v-if="errorVisible">
              <div>  <el-label style="color:red">{{errorText1}}</el-label> </div>
              <div>  <el-label style="color:red">{{errorText2}}</el-label> </div>
          </div>

          <div class="btm_fix_btn" >
            <el-button  class="b_success_btn"  @click.native.prevent="idConfirmedNext" :disabled="idConfirmedNextDisabled">
              다음</el-button >
          </div>     
          
  </el-main>  
</template>

<script>
import { myKeepInVerifyAuthInfo, myNodeServerAuthVerify, myNodeServerAuth } from '@/api/myKeepinRequest';
export default {
  components: {
  },
  data() {

    return {
      mykeepinDivName: 'MyKeepinDIV', //2021.08.06 by lyk - 모바일 앱 마이키핀 설정 : 연동 식별자
      userId:'',
      successToGetaCert: false,
      errorVisible:false,
      idConfirmedNextDisabled:true,

      errorText1:'',//"임직원은 회원가입이 불가합니다.",-보류  
      errorText2:'',
     
      name:'',
      dateOfBirth :'',
      gender :'',
      date :'',
      driverNo:'',
      idType:''
    }
  },
  methods: {
    //보류
    // getVirtualAssetCertInfo(){
    //   	var self = this;

    //       //가상자산 인증서 정보 (이름, 주민번호 6+1)가 
    //       //Backoffice 사원 정보(이름, 주민번호 6+1) 중 일치하는 정보가 있을 경우 얼럿 출력
    //       if(data.depositor != ''){
         
    //         self.idConfirmedNextDisabled = false
    //         self.errorVisible = false
    //       }
    //       else{  //불일치
    //         self.errorVisible = true
    //       }            
    // },

    // getVirtualAssetCert(){
 
    //   //2021.07.13 by lyk - 모바일 앱 마이키핀 설정 : 코벡스 앱을 통해 마이키핀 인증 앱 실행 >>
    //    if (afc.isDevice) {
    //       /*
    //       [인증유형]
    //       1	회원가입	Register	KVSignupPresentation
    //       2	간편로그인	Login(Sign-in)	KVLoginPresentation
    //       3	계좌만들기(주민등록증)	Open Account	KVIdentityPresentation
    //       4	본인인증	Identity verification	KVVerificationPresentation
    //       5	계좌만들기(운전면허증)	Open Account	KVIdPresentation2
    //       */
    //       cordova.exec( null , null, "AppPlugin" , "goMyKeepin", [ '3' ]);
    //   }
    //   //2021.07.13 by lyk - 모바일 앱 마이키핀 설정 : 코벡스 앱을 통해 마이키핀 인증 앱 실행 <<
      
    // }, 

    //주민등록증 으로 등록한 인증서 가져오기
    checkIdentityCard(){    

      this.idType = '3'
     
      //2021.07.13 by lyk - 모바일 앱 마이키핀 설정 : 코벡스 앱을 통해 마이키핀 인증 앱 실행 >>
       if (afc.isDevice) {
          /*
          [인증유형]
          1	회원가입	Register	KVSignupPresentation
          2	간편로그인	Login(Sign-in)	KVLoginPresentation
          3	계좌만들기(주민등록증)	Open Account	KVIdentityPresentation
          4	본인인증	Identity verification	KVVerificationPresentation
          5	계좌만들기(운전면허증)	Open Account	KVIdPresentation2
          */
          cordova.exec( null , null, "AppPlugin" , "goMyKeepin", [ "3" ]);
      }
      //2021.07.13 by lyk - 모바일 앱 마이키핀 설정 : 코벡스 앱을 통해 마이키핀 인증 앱 실행 <<
      
    }, 
    //운전면허증 으로 등록한 인증서 가져오기
    checkDriverLicense(){    
     
      this.idType = '5'

      //2021.07.13 by lyk - 모바일 앱 마이키핀 설정 : 코벡스 앱을 통해 마이키핀 인증 앱 실행 >>
       if (afc.isDevice) {
          /*
          [인증유형]
          1	회원가입	Register	KVSignupPresentation
          2	간편로그인	Login(Sign-in)	KVLoginPresentation
          3	계좌만들기(주민등록증)	Open Account	KVIdentityPresentation
          4	본인인증	Identity verification	KVVerificationPresentation
          5	계좌만들기(운전면허증)	Open Account	KVIdPresentation2
          */
          cordova.exec( null , null, "AppPlugin" , "goMyKeepin", [ "5" ]);
      }
      //2021.07.13 by lyk - 모바일 앱 마이키핀 설정 : 코벡스 앱을 통해 마이키핀 인증 앱 실행 <<
      
    },   
  
    //2021.07.13 by lyk - 모바일 앱 마이키핀 설정 - 앱에서 마이키핀 앱 인증 성공 후 화면에서 전달 받는 함수 >>
    onMyKeepinRecvData(state, type, code) {
      let self = this

      // alert("MyKeepinApp.onMyKeepinRecvData:"+state+","+type+","+code);
      console.log("MyKeepinApp.onMyKeepinRecvData:", state+"==="+type+"==="+code)

      if(state == "onNotInstall" || state == "onNeedUpdate") {
        if (window.localStorage.getItem('os_div') == '1') { //안드로이드
          // window.open("https://play.google.com/store/apps/details?id=com.coinplug.mykeepin", "_blank")    
          // location.href = "https://play.google.com/store/apps/details?id=com.coinplug.mykeepin";
          //goDeepLink
          cordova.exec( null , null, "AppPlugin" , "goDeepLink", [ "market://details?id=com.coinplug.mykeepin", "https://play.google.com/store/apps/details?id=com.coinplug.mykeepin" ]);
        } else if (window.localStorage.getItem('os_div') == '2') { //iOS
          window.open("https://apps.apple.com/kr/app/mykeepin-%EC%BD%94%EC%9D%B8%ED%94%8C%EB%9F%AC%EA%B7%B8-%EB%94%94%EC%A7%80%ED%84%B8-id/id1479166844", "_blank")    
        }
      } else {
        //인증서버와 데이터 검증 후 완료되면 아래 페이지로 이동
        // 회원가입 완료 페이지로 이동
        if(state != "" && type != "" && code != "") {
           //인증서버에 인증요청
           self.getMyKeepInVerifiedResult(state,code )
        } else {
          // alert("MyKeepinApp.not working:"+state+","+type+","+code);
          console.log("MyKeepinApp.not working:", state+","+type+","+code);
        }
      }
    },
    //2021.07.13 by lyk - 모바일 앱 마이키핀 설정 - 앱에서 마이키핀 앱 인증 성공 후 화면에서 전달 받는 함수 <<

    //인증서버에 인증요청
    getMyKeepInVerifiedResult(dt1, dt2){
      let self = this
      myKeepInVerifyAuthInfo({ //-> did vp, signature 값을 받아옴    
        stateData: dt1,
        codeData:  dt2     
      })
      .then(res => {
        console.log("Success:myKeepInVerifyAuthInfo");       
        self.didData = res.did
        self.vpData = res.vp
        self.signatureData = res.signature
        self.stateData = dt1
        self.codeData = dt2
        
      //  console.log("didData : "+  self.didData )
      //  console.log("vpData :"+  self.vpData )
      //  console.log("signatureData :"+  self.signatureData )      
      //  console.log("stateData :"+  self.stateData )
      //  console.log("codeData :"+  self.codeData )       

        self.getUserInfoVerifiedResult()
        
        return

      }).catch(err => {
        if(typeof err.status != "undefined" && err.status != '200')
        {
            console.log(new Error( err.status + ": Request is failed" ));     
            self.$alert(self.$t('mykeepin_err.' + err.status ), '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t('sys_err.a001')
            });            
            return         
        }
      })    
    },
    //사용자데이터검증
    getUserInfoVerifiedResult()
    { 
        let self = this
        myNodeServerAuthVerify({   

          didData:  self.didData,   
          stateData: self.stateData,
          typeData: self.idType,
          codeData: self.codeData,
          signatureData:  self.signatureData

        }).then(res => {       
          //데이터 검증 성공
          if(res == true )
          {
              console.log("Success:myNodeServerAuthVerify");
              self.dataVerification = true
              //사용자정보 가져옴
              self.getUserInfo()
          }
          else{   //데이터 검증 실패
              self.$alert('인증에 실패했습니다.<br> 마이키핀 계정정보를 다시 확인해주세요.', '', {
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: self.$t('sys_err.a001')
              });
          }  
          return      

        }).catch(err => {
          if(typeof err.status != "undefined" && err.status != '200')
          {
              console.log(new Error( err.status + ": Request is failed" ));   
              self.$alert(self.$t('mykeepin_err.' + err.status ), '', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: self.$t('sys_err.a001')
              });                      
            return  
          }   
        })    
    },
    //사용자정보 받아옴
    getUserInfo()
    { 
        let self = this
        //사용자정보 받아옴
        myNodeServerAuth({        
          didData:  self.didData,   
          vpData: self.vpData       
        }).then(res => {       
          //데이터 검증 성공                
          console.log("Success:myNodeServerAuth");
          self.name = res[0].vc.credentialSubject.name
          self.dateOfBirth = res[1].vc.credentialSubject.dateOfBirth
          self.gender = res[2].vc.credentialSubject.gender        
         if(self.idType == '3')      
            self.date = res[4].vc.credentialSubject.date  
          else if(self.idType == '5')
            self.driverNo = res[4].vc.credentialSubject.no  

          console.log("credentialData:" + JSON.stringify(res))  
        // credentialData:[{"sub":"did:meta:000000000000000000000000000000000000000000000000000000000004a22f","iss":"did:meta:000000000000000000000000000000000000000000000000000000000000052f","exp":1687964399,"iat":1624929536,"nonce":"9e478018-6556-4c81-bdd8-6018f3d29f5c","vc":{"@context":["https://w3id.org/credentials/v1"],"type":["VerifiableCredential","NameCredential"],"credentialSubject":{"name":"오건"}},"jti":"https://attestator.metadium.com/credentials/xQg8x7W-R6OEXjMI0hJ1VA"},{"sub":"did:meta:000000000000000000000000000000000000000000000000000000000004a22f","iss":"did:meta:000000000000000000000000000000000000000000000000000000000000052f","exp":1687964399,"iat":1624929536,"nonce":"e1bc68cb-2228-4a68-8d0f-330fe0632daf","vc":{"@context":["https://w3id.org/credentials/v1"],"type":["VerifiableCredential","DateOfBirthCredential"],"credentialSubject":{"dateOfBirth":"19810114"}},"jti":"https://attestator.metadium.com/credentials/xQg8x7W-R6OEXjMI0hJ1VA"},{"sub":"did:meta:000000000000000000000000000000000000000000000000000000000004a22f","iss":"did:meta:000000000000000000000000000000000000000000000000000000000000052f","exp":1687964399,"iat":1624929536,"nonce":"8fe08630-0b1f-4430-a9b5-93fcbe280de3","vc":{"@context":["https://w3id.org/credentials/v1"],"type":["VerifiableCredential","GenderCredential"],"credentialSubject":{"gender":"1"}},"jti":"https://attestator.metadium.com/credentials/xQg8x7W-R6OEXjMI0hJ1VA"},{"sub":"did:meta:000000000000000000000000000000000000000000000000000000000004a22f","iss":"did:meta:000000000000000000000000000000000000000000000000000000000000052f","exp":1687964399,"iat":1624929536,"nonce":"db20b8f0-5b10-4ce6-b86b-ce5ca6c68f7f","vc":{"@context":["https://w3id.org/credentials/v1"],"type":["VerifiableCredential","NationalityCredential"],"credentialSubject":{"nationality":"1"}},"jti":"https://attestator.metadium.com/credentials/xQg8x7W-R6OEXjMI0hJ1VA"},{"sub":"did:meta:000000000000000000000000000000000000000000000000000000000004a22f","iss":"did:meta:000000000000000000000000000000000000000000000000000000000000052f","exp":1687964399,"iat":1624929536,"nonce":"5ab98bdd-723a-4093-a3b1-8c4e666e9d92","vc":{"@context":["https://w3id.org/credentials/v1"],"type":["VerifiableCredential","MobileNumberCredential"],"credentialSubject":{"mobileNumber":"01094898114"}},"jti":"https://attestator.metadium.com/credentials/xQg8x7W-R6OEXjMI0hJ1VA"},{"sub":"did:meta:000000000000000000000000000000000000000000000000000000000004a22f","iss":"did:meta:000000000000000000000000000000000000000000000000000000000000052f","exp":1687964399,"iat":1624929536,"nonce":"4575fef9-9443-4fd1-8cc3-a692223064d5","vc":{"@context":["https://w3id.org/credentials/v1"],"type":["VerifiableCredential","CiCredential"],"credentialSubject":{"ci":"nxnluP/9PdyIxtsqgi5mHuXiAjc1ziIDCTR5qx+e61wDdvyQPB0X0pQl/cM3CuW6wsv8bt+032b/qSbXn9bFVw=="}},"jti":"https://attestator.metadium.com/credentials/xQg8x7W-R6OEXjMI0hJ1VA"},{"sub":"did:meta:000000000000000000000000000000000000000000000000000000000004a22f","iss":"did:meta:000000000000000000000000000000000000000000000000000000000000052f","exp":1687964399,"iat":1624929536,"nonce":"492ab8f3-9094-4bc0-96de-75088b75abba","vc":{"@context":["https://w3id.org/credentials/v1"],"type":["VerifiableCredential","DiCredential"],"credentialSubject":{"di":"MC0GCCqGSIb3DQIJAyEAJg8JPWGOjnWJW9SZ4iopbZ+uRl6tzP9TiHou0zID55c="}},"jti":"https://attestator.metadium.com/credentials/xQg8x7W-R6OEXjMI0hJ1VA"},{"sub":"did:meta:000000000000000000000000000000000000000000000000000000000004a22f","iss":"did:meta:000000000000000000000000000000000000000000000000000000000000052f","exp":1687964399,"iat":1624929536,"nonce":"3f578902-aff0-4869-ae07-c7b168ec75a7","vc":{"@context":["https://w3id.org/credentials/v1"],"type":["VerifiableCredential","TelecomCredential"],"credentialSubject":{"telecom":"05"}},"jti":"https://attestator.metadium.com/credentials/xQg8x7W-R6OEXjMI0hJ1VA"}]
       
          console.log("name:" + JSON.stringify(self.name))
          console.log("dateOfBirth:" + JSON.stringify(self.dateOfBirth))
          console.log("gender:" + JSON.stringify(self.gender))  
          console.log("date:" + JSON.stringify(self.date))
          console.log("driverNo:" + JSON.stringify(self.driverNo))

          self.saveVirtualAssetCertInfoInAccIdPage()                  
          
          return  
        }).catch(err => {
          if(typeof err.status != "undefined" && err.status != '200')
          {
            console.log(new Error( err.status + ": Request is failed" ));   
            self.$alert(self.$t('mykeepin_err.' + err.status ), '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t('sys_err.a001')
            });      
            return
          }   
        })
    },   
    //가상자산인증서정보등록
    saveVirtualAssetCertInfoInAccIdPage()
    {
      const self = this;  
      // 계정ID             , user_id       , user_id       , char  , 10;
			// 사용자성명         , user_nm       , user_nm       , char  , 40;
			// 생년월일           , user_brth_day , user_brth_day , char  ,  8;
			// 성별               , user_gend     , user_gend     , char  ,  1; // 0: 여성, "1": 남성
			// 실명번호           , id_no         , id_no         , char  , 13;
			// 발급기관           , auth_ogz_nm   , auth_ogz_nm   , char  , 30;
			// 신분증발급일자/식별번호     , auth_gen_dt   , auth_gen_dt   , char  ,  8;
      // 신분증이미지파일명 , auth_img_id   , auth_img_id   , char  , 30;

      //가상자산인증서정보등록
      self.$socket.sendProcessByName('ac109', (queryData) => {
          let block = queryData.getBlockData('InBlock1')[0];
          block['user_id'] = self.userId
          block['user_nm'] = self.name
          block['user_brth_day'] = self.dateOfBirth  
          block['user_gend'] = self.gender
          block['id_no'] = ''        //주민등록번호 마이키핀에서 제공 안 함 
          block['auth_ogz_nm'] = ''   //발급기관 정보 마이키핀에서 제공 안 함
          block['auth_gen_dt'] = self.idType =='3'? self.date : self.driverNo
          block['auth_img_id'] = ''  //신분증이미지 저장 안함
          
          console.log("block:" + JSON.stringify(block))
      }, function (queryData) {
          if (queryData != null) {

              let user_id = queryData['queryObj']['OutBlock1'][0].user_id;      
              console.log("user_id2:"+user_id)                
              console.log("두번째 페이지에서 인증서 가져오기 성공")
            
              self.successToGetaCertFunc()            
              
          } else {
            console.log('가상자산인증서정보등록 실패')
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "ac109") return            
           
              this.errorVisible = true      
              this.errorText1 = this.$t('sys_err.' + errorData.errCode)             
           
            return;
          }
        })          
    },     

    successToGetaCertFunc(){
      
       //인증서 가져오기 성공 -> 가져왔어요/완료 노출
       this.successToGetaCert = true
       //가상자산인증서정보등록 다음 버튼 활성화
       this.idConfirmedNextDisabled = false
       console.log("successToGetaCert:" + this.successToGetaCert)
       console.log("idConfirmedNextDisabled:" + this.idConfirmedNextDisabled)
    },
    failToGetaCert(){
      
       this.successToGetaCert = false         
       this.idConfirmedNextDisabled = true
    },
    idConfirmedNext() {       

          this.$router.push({name: 'mCustomerInfo'});  
    },   
   
  },
  mounted()
  {
      if(this.$route.params.flag == true)
      {
          console.log("인증서가져오기성공?"+this.$route.params.flag)
          console.log("인증서등록한사용자ID:"+this.$route.params.userId)
          console.log("인증서Type:"+this.$route.params.identityType)          
          this.successToGetaCertFunc()
      }else{
          this.failToGetaCert()
      }      

      this.userId = this.$store.state.user.userAccCreationInfo.user_id
      console.log("ac106_userId:"+  this.userId );      
      MyKeepinManager.setDelegator(this) //2021.08.06 by lyk - 모바일 앱 마이키핀 설정 : delegator 설정
  },

  created() {
      this.$EventBus.$emit("mobile-nav-title", "본인확인");
      this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border','close']);

      MyKeepinManager.setDelegator(this) //2021.08.06 by lyk - 모바일 앱 마이키핀 설정 : delegator 설정
  },
 

}
</script>
<style>
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>