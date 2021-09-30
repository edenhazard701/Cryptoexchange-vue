<template>
  <el-main class="bank-account-main">

       <!-- 정보변경인증-->
          <p style="padding-top:20px;
                    font-size:13pt;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">
          마이키핀 앱 QR 인증을 통해 <br/>정보 변경을 완료할 수 있어요</p>  

          <div style="margin-top:28px;
                      padding:20px 15px;
                      background:#ffffff;
                      text-align: center;">
                <img :src="require('@/images/@temp/mykeypin.png')"  alt="mykeypin"><br/>마이키핀
          </div> 
          
          <div style="width:100%
                      margin-top:28px;
                      padding:20px 15px;
                      background:#FFFFFF;
                      text-align: center;"
                     >       
              <el-row >    
                <el-col :span='24'> 
                  <el-button  type="info" style="height:50px;" @click="cancelChange">취소 </el-button>              
                  <el-button  style="background-color:#3f50b4;color:white;width:200px;height:50px;" @click="wlfCheck">정보 변경하기</el-button>  
                </el-col> 
              </el-row>                   
          </div>       

	</el-main>
</template>

<script>
import { octaWLFcheckGet } from '@/api/octaSolutionRequest';
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters(['isLoggedIn', 'getLangKind', 'getUserId', 'getUnitcode']),
    ...mapActions(['logout'])
  },
	data () {
	return {    
         
     //MyInfo 정보편집 저장 시 필요한 값
      myInfoArr: {
          //자택정보
          saveAccomoArr: {
              user_eng_nm: '',
              user_eng_surnm: '',
              home_pst_no: '',
              home_addr: '',
              home_addr_dtl: '',
              home_area_code: '',
              home_phon_no: ''
          },

          //직장정보
          saveWorkPlaceArr: {
              job_tp: '',
              job_kind: '',
              job_position_code: '',
              ofc_nm: '',
              ofc_dept_nm: '',
              ofc_pst_no: '',
              ofc_addr: '',
              ofc_addr_dtl: '',
              ofc_area_code: '',
              ofc_phon_no: ''
          },

          //자금정보
          saveFundArr: {
              fund_src_tp: '',
              fund_src_etc: '',
              trd_purp_cd: '',
              trd_purp_etc: ''
          }
      },  
		};
	},

	methods : {
    
    changeInfo(){
      //Case1) App 설치 여부  -- 앱에서 체크
      //  미설치시 앱설치페이지이동     
     
     //Case2)  
     // App 설치 후 휴대폰 본인확인 미인증
     //App 실행 후 휴대폰 본인인증 페이지로 이동

     //Case3)  마이키핀 생체인증 실패 & 비밀번호 실패 후 코벡스 App 돌아올 경우 얼럿 출력
     //: 인증에 실패했습니다. 마이키핀 계정정보를 다시 확인해주세요.
     //[확인]
    },

    //옥타솔루션 AML체크
    wlfCheck(){
         	let self = this;   
          self.$socket.sendProcessByName('ac178', (queryData) => {
          let block = queryData.getBlockData('InBlock1')[0];
              block['user_id'] = self.getUserId, 
              block['req_bsi_tp'] = '2'     // 1.회원가입 2.회원정보편집  
          
          console.log("block:" + JSON.stringify(block.user_id))
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
                    
                  //200 : Watch List 대상입니다 준법감시팀에 결재요청 하시기 바랍니다.                    
                  //400 : 준법감시팀에서 거래거절로 결재처리된 고객입니다.                 
                  }else if(data.CODE == '200' || data.CODE == '400')
                  {
                    //실패
                    self.$alert('고객님의 신원을 확인 중이에요.<br>신원 확인은 최대 24시간 까지 걸릴 수 있습니다.<br>문의사항은 고객센터로 문의해주세요.<br>고객센터 (1111-1111) ', '', {
                      dangerouslyUseHTMLString: true,
                      confirmButtonText: self.$t('sys_err.a001')
                    }).then(() => {
                          //강제로그아웃후 메인페이지 이동
                           self.mobileLogout()
                           //해당계정 정지 상태로 변경  ac179                           
                    });    
                  }  

                  //에러여부 상관없이 결과값 저장
                  self.saveWLFresult(data.SUCCESS_YN, data.ERROR_MSG, data.CODE, data.CODE_MSG)                 
                  
              }else //SUCCESS_YN = "N" 인 경우
                    //1. Request 파라미터에 값이 없는 경우
                    //2. AML 시스템 장애 발생하는 경우
              {             
                  self.$alert( data.CODE_MSG, '', {
                      dangerouslyUseHTMLString: true,
                      confirmButtonText: self.$t('sys_err.a001')
                  })
              }    
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
          
              block['req_bsi_tp'] = '2' // 1.회원가입 2.회원정보편집
              block['user_id'] = self.getUserId
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
                  console.log("saveWLFresult_user_id:"+ res.user_id)   
              }

              //고객정보저장
              self.saveUserChangedInfo()    
              
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
   
    //고객거주정보 편집
    updateResidenceInfo()
    {
        let self = this;    
        self.$socket.sendProcessByName('ac117', (queryData) => {
            let block               = queryData.getBlockData('InBlock1')[0];
            block['user_id']        = self.getUserId      
            block['user_eng_nm']    = self.myInfoArr.saveAccomoArr.user_eng_nm
            block['user_eng_surnm'] = self.myInfoArr.saveAccomoArr.user_eng_surnm 
            block['home_pst_no']    = self.myInfoArr.saveAccomoArr.home_pst_no
            block['home_addr']      = self.myInfoArr.saveAccomoArr.home_addr        
            block['home_addr_dtl']  = self.myInfoArr.saveAccomoArr.home_addr_dtl      
            block['home_area_code'] = self.myInfoArr.saveAccomoArr.home_area_code      
            block['home_phon_no']   = self.myInfoArr.saveAccomoArr.home_phon_no      

            console.log("block:" + JSON.stringify(block))
        }, function (queryData) {
            if (queryData != null) {

                let result = queryData['queryObj']['OutBlock1'][0]; 

                //내부저장소에 저장
                self.$store.state.user.myInfo.user_eng_nm = self.myInfoArr.saveAccomoArr.user_eng_nm
                self.$store.state.user.myInfo.user_eng_surnm = self.myInfoArr.saveAccomoArr.user_eng_surnm

                self.$store.state.user.myInfo.home_pst_no = self.myInfoArr.saveAccomoArr.home_pst_no
                self.$store.state.user.myInfo.home_addr = self.myInfoArr.saveAccomoArr.home_addr
                self.$store.state.user.myInfo.home_addr_dtl = self.myInfoArr.saveAccomoArr.home_addr_dtl
                self.$store.state.user.myInfo.home_area_code =  self.myInfoArr.saveAccomoArr.home_area_code  
                self.$store.state.user.myInfo.home_phon_no = self.myInfoArr.saveAccomoArr.home_phon_no       

                //고객거주정보 수정 성공시
                console.log("고객 거주정보 수정 성공");   
                self.updateJobInfo()                                   
                
            } else {
                // 전문 에러 언어팩 적용
                const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                if (errorData.trName != "ac117") return

                self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: self.$t('sys_err.a001')
                }).then(()=>{
                    self.$router.push({
                          name: 'mypageInfo'                         
                    });                  
                })
            }
        })     
    },
    
    //고객직장정보편집
    updateJobInfo()
    {
        let self = this;             
        self.$socket.sendProcessByName('ac125', (queryData) => {
            let block                  = queryData.getBlockData('InBlock1')[0];
            block['user_id']           = self.getUserId             
            block['job_tp']            = self.myInfoArr.saveWorkPlaceArr.job_tp
            block['job_kind']          = self.myInfoArr.saveWorkPlaceArr.job_kind
            block['job_position_code'] = self.myInfoArr.saveWorkPlaceArr.job_position_code   
            block['ofc_nm']            = self.myInfoArr.saveWorkPlaceArr.ofc_nm
            block['ofc_dept_nm']       = self.myInfoArr.saveWorkPlaceArr.ofc_dept_nm
            block['ofc_pst_no']        = self.myInfoArr.saveWorkPlaceArr.ofc_pst_no 
            block['ofc_addr']          = self.myInfoArr.saveWorkPlaceArr.ofc_addr
            block['ofc_addr_dtl']      = self.myInfoArr.saveWorkPlaceArr.ofc_addr_dtl
            block['ofc_area_code']     = self.myInfoArr.saveWorkPlaceArr.ofc_area_code
            block['ofc_phon_no']       = self.myInfoArr.saveWorkPlaceArr.ofc_phon_no

            console.log("block:" + JSON.stringify(block))
        }, function (queryData) {
            if (queryData != null) {

                let result = queryData['queryObj']['OutBlock1'][0];   

                //내부저장소에 저장
                self.$store.state.user.myInfo.job_tp        = self.myInfoArr.saveWorkPlaceArr.job_tp 
                self.$store.state.user.myInfo.job_kind      = self.myInfoArr.saveWorkPlaceArr.job_kind
                self.$store.state.user.myInfo.job_position_code  = self.myInfoArr.saveWorkPlaceArr.job_position_code
                self.$store.state.user.myInfo.ofc_nm        = self.myInfoArr.saveWorkPlaceArr.ofc_nm
                self.$store.state.user.myInfo.ofc_dept_nm   = self.myInfoArr.saveWorkPlaceArr.ofc_dept_nm  
                self.$store.state.user.myInfo.ofc_pst_no    = self.myInfoArr.saveWorkPlaceArr.ofc_pst_no 
                self.$store.state.user.myInfo.ofc_addr      = self.myInfoArr.saveWorkPlaceArr.ofc_addr
                self.$store.state.user.myInfo.ofc_addr_dtl  = self.myInfoArr.saveWorkPlaceArr.ofc_addr_dtl
                self.$store.state.user.myInfo.ofc_area_code = self.myInfoArr.saveWorkPlaceArr.ofc_area_code
                self.$store.state.user.myInfo.ofc_phon_no   = self.myInfoArr.saveWorkPlaceArr.ofc_phon_no              

                //고객 직장정보 수정 성공시
                console.log("고객 직장정보 수정 성공");               
                self.updateInvestInfo()
                
            } else {
                // 전문 에러 언어팩 적용
                const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                if (errorData.trName != "ac125") return

                self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: self.$t('sys_err.a001')
                }).then(()=>{
                    self.$router.push({
                          name: 'mypageInfo'                         
                    });                  
                })
            }
        })     
    },

    //자금 정보 편집
    updateInvestInfo() {
        let self = this;  
        
        self.$socket.sendProcessByName('ac149', (queryData) => {
            var block = queryData.getBlockData('InBlock1')[0];
            block['user_id'] = self.getUserId              
            block['fund_src_tp'] = self.myInfoArr.saveFundArr.fund_src_tp
            block['fund_src_etc'] = self.myInfoArr.saveFundArr.fund_src_etc 
            block['trd_purp_cd'] = self.myInfoArr.saveFundArr.trd_purp_cd
            block['trd_purp_etc'] = self.myInfoArr.saveFundArr.trd_purp_etc 
            console.log("block:" + JSON.stringify(block))
        }, function (queryData) {
            if (queryData != null) {

                let result = queryData['queryObj']['OutBlock1'][0]; 

                //내부저장소에 저장
                self.$store.state.user.myInfo.fund_src_tp = self.myInfoArr.saveFundArr.fund_src_tp
                self.$store.state.user.myInfo.fund_src_etc = self.myInfoArr.saveFundArr.fund_src_etc
                self.$store.state.user.myInfo.trd_purp_cd = self.myInfoArr.saveFundArr.trd_purp_cd
                self.$store.state.user.myInfo.trd_purp_etc =  self.myInfoArr.saveFundArr.trd_purp_etc  
                            
                //고객 투자정보입력 수정 성공시
                console.log("고객 투자정보 수정 성공");                        
                self.doneInfoChanged()
                
            } else {
                // 전문 에러 언어팩 적용
                const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                if (errorData.trName != "ac149") return

                self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: self.$t('sys_err.a001')
                }).then(()=>{
                    self.$router.push({
                        name: 'mypageInfo'                         
                    });                
                })
            }
        })     
    },    
    doneInfoChanged(){
       let self = this; 
      
        //저장성공시 회원정보 메인페이지로 이동           
        self.$alert('정보편집이 완료되었습니다.', '', {
          dangerouslyUseHTMLString: true,
        }).then(() => {
              self.$router.push({
                  name: 'mypageInfo',
                  params:{state:'saved'}
              });
        });       
    },  

    //마이키핀->옥타솔루션->정보DB 저장 순서대로 실행
    //회원정보DB 저장
    saveUserChangedInfo(){
      	let self = this;   
      
        //각 탭에서 가지고 있는 값 그대로 저장함(변경했으면 변경한 값)
        try{
              self.updateResidenceInfo()                     
        }
        catch(e){
            console.log("error: " + JSON.stringify(e))
        }
       
    },
   
    cancelChange(){
     //이전 편집 페이지로 이동하고 변경 정보 유지
      this.$router.replace({name: 'mypageInfo'});
    },

    //강제 로그아웃
    mobileLogout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'main' });
    },

	},
  mounted(){
    	let self = this;   

      self.myInfoArr = self.$route.params.totalArr
      console.log("myInfoArr_infoChangeCert:" + JSON.stringify(self.myInfoArr))

      self.$EventBus.$emit('pc-navi', [
          { label: self.$t('header.me'), target: 'mypageInfo' },
          { label: "정보변경인증", target: null }
      ]);

      self.$EventBus.$on('langChange', () => {
          self.$EventBus.$emit('pc-navi', [
              { label: self.$t('header.me'), target: 'mypageInfo' },
              { label: "정보변경인증", target: null }
          ]);
      });   
  }, 
  created() {
    this.$EventBus.$emit('pc-navi', '');    
  },
  destroyed(){
    this.$store.commit("setBeforePageUrl", null);  
  },
};

</script>
