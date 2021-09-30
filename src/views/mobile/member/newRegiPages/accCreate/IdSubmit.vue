<template>
  <el-main class="bank-account-main" style="overflow:hidden">

          <!-- 신분증  -->
          <p style="padding-top:0px;
                    padding-bottom:10px;
                    font-size:14px;
                    font-weight:normal;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">
          <span style="font-size:16px;color:#212121;font-weight:bold;"> 가상자산 거래용인증서 발급</span>을        
          <br>                 
           위해 <span style="font-size:16px;color:#212121;font-weight:bold;">신분증</span>
           을 준비해주세요!   
          </p>

          <hr style="border-top: 1px solid #bbb;">      

           <p style="padding-top:10px;
                    font-size:10pt;
                    font-weight:normal;
                    color:grey;
                    text-align:center;
                    line-height:25px;">
          인증서는 <font style="font-size:14px;color:black;font-weight:bold">주민등록증</font> 또는
          <br>
          <font style="font-size:14px;color:black;font-weight:bold">운전면허증</font>으로 발급이 가능합니다.
          </p>  
         
           <el-row style="margin-top:10px">
             <el-col :span="12">
                 <div style="margin:0px 0px 0px 0px">
                  <img style="width:100%;height:100%;" :src="require('@/images/@temp/identityCard.jpg')">
                 </div>
             </el-col>
             <el-col :span="12">
                  <div style="margin:15px 0px 20px 20px">
                    <el-button style="background-color:grey;color:white;width:100%;height:90px" round @click="checkIdentityCard">주민등록증으로 <br><br>인증서 발급</el-button>
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
                    <el-button style="background-color:grey;color:white;width:100%;height:90px" round @click="checkDriverLicense">운전면허증으로 <br><br>인증서 발급</el-button>
                  </div>
             </el-col>
           </el-row>     

           <p style="padding-top:30px;
                     text-align:center;
                     line-height:25px;">
            <span style="font-size:16px;color:#212121;font-weight:bold;">
              인증서를 이미 보유중이세요?
            </span> 
            <br>
            <span style="font-size:14px;font-weight:normal;color:grey;">
              계속 진행해 주세요 ▼</span>    
           </p>   

          <div class="btm_fix_btn">
            <el-button class="b_success_btn"  @click.native.prevent="idSubmitNext" >
              다음</el-button >
          </div>     
             
	</el-main>
</template>

<script>
import { myKeepInVerifyAuthInfo, myNodeServerAuthVerify, myNodeServerAuth } from '@/api/myKeepinRequest';
export default {
	components: {

	},
	data () {
		return {            
        userId:'',              
        mykeepinDivName: 'MyKeepinDIV', //2021.07.13 by lyk - 모바일 앱 마이키핀 설정 : 연동 식별자
       
        serviceIdData : 'd5abd0d9-4dc1-4a0f-84ce-89df21f46a5e', 
        stateData:'',     //SP 서버에서 생성한 값
        codeData:'',      //인증서버에서 받아온 값
        didData:'',       //사용자의 DID 를 알고 있는 경우 설정
                          //MyKeepin 앱에 did가 다르면 에러코드 '2'반환
        dataHashData:'',  //요청내용에 대한 hash 값
                          //인증 요청에 대한 데이터를 해시한 hex string 값
                          //SP 서버에서 서명 검증시 동일한 방법으로 구해야 함.
                          //null 가능
        vpData:'',
        signatureData:'',

        //credentialData: [],
        name:'',
        dateOfBirth :'',
        gender :'',
        date :'',
        driverNo:'',

        identityType: ''
		};
	},
	methods : {  
    //주민등록증 으로 인증
    checkIdentityCard(){    

      this.identityType = '3'
     
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
    //운전면허증 으로 인증
    checkDriverLicense(){    
     
      this.identityType = '5'

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
          typeData: self.identityType,
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
          if(self.identityType == '3')      
            self.date = res[4].vc.credentialSubject.date  
          else if(self.identityType == '5')
            self.driverNo = res[4].vc.credentialSubject.no  

          console.log("name:" + JSON.stringify(self.name))
          console.log("dateOfBirth:" + JSON.stringify(self.dateOfBirth))
          console.log("gender:" + JSON.stringify(self.gender))  
          console.log("date:" + JSON.stringify(self.date))
          console.log("driverNo:" + JSON.stringify(self.driverNo))

          self.saveVirtualAssetCertInfoInIDsubmitPage()                  
        
          // self.credentialData = res
          //console.log("credentialData:" + JSON.stringify( self.credentialData));               
        // credentialData:[{"sub":"did:meta:000000000000000000000000000000000000000000000000000000000004a22f","iss":"did:meta:000000000000000000000000000000000000000000000000000000000000052f","exp":1687964399,"iat":1624929536,"nonce":"9e478018-6556-4c81-bdd8-6018f3d29f5c","vc":{"@context":["https://w3id.org/credentials/v1"],"type":["VerifiableCredential","NameCredential"],"credentialSubject":{"name":"오건"}},"jti":"https://attestator.metadium.com/credentials/xQg8x7W-R6OEXjMI0hJ1VA"},{"sub":"did:meta:000000000000000000000000000000000000000000000000000000000004a22f","iss":"did:meta:000000000000000000000000000000000000000000000000000000000000052f","exp":1687964399,"iat":1624929536,"nonce":"e1bc68cb-2228-4a68-8d0f-330fe0632daf","vc":{"@context":["https://w3id.org/credentials/v1"],"type":["VerifiableCredential","DateOfBirthCredential"],"credentialSubject":{"dateOfBirth":"19810114"}},"jti":"https://attestator.metadium.com/credentials/xQg8x7W-R6OEXjMI0hJ1VA"},{"sub":"did:meta:000000000000000000000000000000000000000000000000000000000004a22f","iss":"did:meta:000000000000000000000000000000000000000000000000000000000000052f","exp":1687964399,"iat":1624929536,"nonce":"8fe08630-0b1f-4430-a9b5-93fcbe280de3","vc":{"@context":["https://w3id.org/credentials/v1"],"type":["VerifiableCredential","GenderCredential"],"credentialSubject":{"gender":"1"}},"jti":"https://attestator.metadium.com/credentials/xQg8x7W-R6OEXjMI0hJ1VA"},{"sub":"did:meta:000000000000000000000000000000000000000000000000000000000004a22f","iss":"did:meta:000000000000000000000000000000000000000000000000000000000000052f","exp":1687964399,"iat":1624929536,"nonce":"db20b8f0-5b10-4ce6-b86b-ce5ca6c68f7f","vc":{"@context":["https://w3id.org/credentials/v1"],"type":["VerifiableCredential","NationalityCredential"],"credentialSubject":{"nationality":"1"}},"jti":"https://attestator.metadium.com/credentials/xQg8x7W-R6OEXjMI0hJ1VA"},{"sub":"did:meta:000000000000000000000000000000000000000000000000000000000004a22f","iss":"did:meta:000000000000000000000000000000000000000000000000000000000000052f","exp":1687964399,"iat":1624929536,"nonce":"5ab98bdd-723a-4093-a3b1-8c4e666e9d92","vc":{"@context":["https://w3id.org/credentials/v1"],"type":["VerifiableCredential","MobileNumberCredential"],"credentialSubject":{"mobileNumber":"01094898114"}},"jti":"https://attestator.metadium.com/credentials/xQg8x7W-R6OEXjMI0hJ1VA"},{"sub":"did:meta:000000000000000000000000000000000000000000000000000000000004a22f","iss":"did:meta:000000000000000000000000000000000000000000000000000000000000052f","exp":1687964399,"iat":1624929536,"nonce":"4575fef9-9443-4fd1-8cc3-a692223064d5","vc":{"@context":["https://w3id.org/credentials/v1"],"type":["VerifiableCredential","CiCredential"],"credentialSubject":{"ci":"nxnluP/9PdyIxtsqgi5mHuXiAjc1ziIDCTR5qx+e61wDdvyQPB0X0pQl/cM3CuW6wsv8bt+032b/qSbXn9bFVw=="}},"jti":"https://attestator.metadium.com/credentials/xQg8x7W-R6OEXjMI0hJ1VA"},{"sub":"did:meta:000000000000000000000000000000000000000000000000000000000004a22f","iss":"did:meta:000000000000000000000000000000000000000000000000000000000000052f","exp":1687964399,"iat":1624929536,"nonce":"492ab8f3-9094-4bc0-96de-75088b75abba","vc":{"@context":["https://w3id.org/credentials/v1"],"type":["VerifiableCredential","DiCredential"],"credentialSubject":{"di":"MC0GCCqGSIb3DQIJAyEAJg8JPWGOjnWJW9SZ4iopbZ+uRl6tzP9TiHou0zID55c="}},"jti":"https://attestator.metadium.com/credentials/xQg8x7W-R6OEXjMI0hJ1VA"},{"sub":"did:meta:000000000000000000000000000000000000000000000000000000000004a22f","iss":"did:meta:000000000000000000000000000000000000000000000000000000000000052f","exp":1687964399,"iat":1624929536,"nonce":"3f578902-aff0-4869-ae07-c7b168ec75a7","vc":{"@context":["https://w3id.org/credentials/v1"],"type":["VerifiableCredential","TelecomCredential"],"credentialSubject":{"telecom":"05"}},"jti":"https://attestator.metadium.com/credentials/xQg8x7W-R6OEXjMI0hJ1VA"}]
           
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
    saveVirtualAssetCertInfoInIDsubmitPage()
    {
      let self = this;  
      // 계정ID             , user_id       , user_id       , char  , 10;
			// 사용자성명         , user_nm       , user_nm       , char  , 40;
			// 생년월일           , user_brth_day , user_brth_day , char  ,  8;
			// 성별               , user_gend     , user_gend     , char  ,  1; // 0: 여성, "1": 남성
			// 실명번호(주민번호) , id_no         , id_no         , char  , 13;
			// 발급기관           , auth_ogz_nm   , auth_ogz_nm   , char  , 30;
			// 신분증발급일자/식별번호     , auth_gen_dt   , auth_gen_dt   , char  ,  8;
      // 신분증이미지파일명 , auth_img_id   , auth_img_id   , char  , 30;
  
      //가상자산인증서정보등록
      self.$socket.sendProcessByName('ac109', (queryData) => {
          var block = queryData.getBlockData('InBlock1')[0];
          block['user_id'] = self.userId      
          block['user_nm'] = self.name
          block['user_brth_day'] = self.dateOfBirth  
          block['user_gend'] = self.gender
          block['id_no'] = ''        //주민등록번호 마이키핀에서 제공 안 함 
          block['auth_ogz_nm'] = ''   //발급기관 정보 마이키핀에서 제공 안 함
          block['auth_gen_dt'] = self.identityType =='3'? self.date : self.driverNo
          block['auth_img_id'] = '' //신분증이미지 저장 안함
          
          console.log("block:" + JSON.stringify(block))
      }, function (queryData) {
          if (queryData != null) {

              let user_id = queryData['queryObj']['OutBlock1'][0].user_id;       
           
              console.log("user_id1:"+user_id)         
              console.log("인증서 가져오기 성공")

              //완료 화면으로 이동
              self.$router.push({name: 'mAccIdconfirmed', params:{flag: true, userId:user_id, type:self.identityType}})

              
          } else {
            console.log('가상자산인증서정보등록 실패')
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "ac109") return      
           
              self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: self.$t('sys_err.a001')
              });                   
          }
        })          
    },     

    idSubmitNext(){

          this.$router.push({name: 'mAccIdconfirmed'});  
    }

	},
  mounted(){         
        this.userId = this.$store.state.user.userAccCreationInfo.user_id
        console.log("ac106userId:"+  this.userId );     
  },
  created() {
       this.$EventBus.$emit("mobile-nav-title", "");
       this.$EventBus.$emit('mobile-nav-menus', ['back','noDefault','close']);
       MyKeepinManager.setDelegator(this); //2021.07.13 by lyk - 모바일 앱 마이키핀 설정 : delegator 설정
  }
};

</script>
