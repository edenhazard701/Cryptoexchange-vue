<template>
 <el-main class="bank-account-main">
     
       <!-- 회원가입 완료 -->
       <div style="margin:20px">       
          <table style="width:100%;">
            <colgroup>
              <col style="width:50%">
              <col style="width:50%">
            </colgroup>          
            <tbody>
              <tr style="height:60px; "> 
                <td  class="registration_completion" rowspan="2" style="text-align:center">
                  <span>   
                       <img style="width:50px;height:50px;" :src="require('@/images/m_join_completion.png')">
                  </span>
                </td> 
                <td style="text-align:left">
                    <span style="padding-top:20px;
                              font-size:15px;
                              color:#212121;                            
                              line-height:25px;">
                      {{$store.state.user.registration.userNm}} 님 
                    </span>                      
                </td>
              </tr>
              <tr>
                <td>                 
                    <span style="padding-top:20px;
                              font-size:15px;
                              color:#212121;
                              text-align:center;
                              line-height:25px;">
                    회원가입을 축하드립니다.
                    </span> 
                </td>
              </tr>     
            </tbody>
          </table>        
         </div>             
           
          <div class="btm_fix_btn">          
             <el-button-group style="display: block; width:100%;">
                  <el-button style="background-color:white;color:#3f51b5;border:1px solid;width:50%;height:50px;font-size:16px" @click="lookAroundApp">거래소 둘러보기
                  <!-- <el-button style="background-color:#e0e0e0;color:black;width:100%;height:50px;font-size:16px" @click="lookAroundApp">거래소 둘러보기 -->
                  </el-button>       
             
                   <el-button  class="b_success_btn" style="width:50%;"  @click="createAcc">계좌 만들기
                  </el-button>     
              </el-button-group>             
          </div>   

	</el-main>
</template>

<script>
export default {
	components: {

	},
	data () {
		return {            
      authCi:''
        
		};
	},
	methods : {
    //계좌만들기
    createAcc(){
      this.checkAccCreationInfo()
    },
    //계좌생성정보 있는지 체크
    checkAccCreationInfo(){
        //인증휴대폰CI      , auth_ci        , auth_ci        , char  , 88;

        // 사용자성명        , user_nm        , user_nm        , char  , 50;
	    // 생년월일          , user_brth_day  , user_brth_day  , char  ,  8;
        // 코벡스보유YN      , kovex_yn       , kovex_yn       , char  ,  1;
        // 지점코드          , unit_code      , unit_code      , char  ,  3;
        // 마케팅정보동의    , event_noti     , event_noti     , char  ,  1;
        // 신분증 발급일자   , auth_gen_dt    , auth_gen_dt    , char  ,  8;
        // 영문명            , user_eng_nm    , user_eng_nm    , char  , 50;
        // 영문성            , user_eng_surnm , user_eng_surnm , char  , 20;
        // 거주구분          , dmst_liv_tp    , dmst_liv_tp    , char  ,  2;
        // 자택우편번호      , home_pst_no    , home_pst_no    , char  ,  5;
        // 자택기본주소      , home_addr      , home_addr      , char  , 150;
        // 자택상세주소      , home_addr_dtl  , home_addr_dtl  , char  , 150;
        // 자택전화지역번호  , home_area_code , home_area_code , char  ,  4;
        // 자택전화번호      , home_phon_no   , home_phon_no   , char  , 20;
        // 직장구분          , job_tp         , job_tp         , char  ,  2;
        // 업종              , job_kind       , job_kind       , char  ,  2;
        // 직위              , job_position   , job_position   , char  , 20;
        // 직장명            , ofc_nm         , ofc_nm         , char  , 50;
        // 부서명            , ofc_dept_nm    , ofc_dept_nm    , char  , 50;
        // 직장우편번호      , ofc_pst_no     , ofc_pst_no     , char  ,  5;
        // 직장기본주소      , ofc_addr       , ofc_addr       , char  , 150;
        // 직장상세주소      , ofc_addr_dtl   , ofc_addr_dtl   , char  , 150;
        // 직장전화지역번호  , ofc_area_code  , ofc_area_code  , char  ,  4;
        // 직장전화번호      , ofc_phon_no    , ofc_phon_no    , char  , 20;
        // 자금원천구분      , fund_src_tp    , fund_src_tp    , char  ,  3;
        // 자금원천구분기타  , fund_src_etc   , fund_src_etc   , char  ,  60; //한글20자
        // 거래목적코드      , trd_purp_cd    , trd_purp_cd    , char  ,  2;
        // 거래목적기타      , trd_purp_etc   , trd_purp_etc   , char  ,  60; //한글20자
        // 계좌인증구분      , bact_auth_tp   , bact_auth_tp   , char  ,  1;  //계좌인증구분[0.미등록,1.등록]
        // 계정id            , user_id        , user_id        , char  , 10;
        // 계정그룹ID        , user_grp_id    , user_grp_id    , char  ,  2;
        // L4스위치 IP       , switch_ip      , switch_ip      , char  , 16;

      let self = this;  

      self.$socket.sendProcessByName('ac519', (queryData) => {
          let block = queryData.getBlockData('InBlock1')[0];
          block['auth_ci'] = self.authCi
          console.log("block:" + JSON.stringify(block.auth_ci))
     }, function (queryData) {
          if (queryData != null) {
              let OutBlock1 = queryData['queryObj']['OutBlock1'][0];
             
              //계좌생성정보 저장 - 로그인한 상태에서 계좌생성중에 물고다녀야 하는 유저아이디를 사용하해야 함
              self.$store.state.user.userAccCreationInfo = OutBlock1  
              console.log("userAccCreationInfo:"+JSON.stringify(self.$store.state.user.userAccCreationInfo));                    
              
              self.$router.push({name: 'mAccCreateIntro', params:{ci:self.authCi}});    //계좌만들기 인트로                   
              
          } else {
            console.log('계좌생성정보 저장 실패1')
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "ac519") return          

                 if(errorData.errCode == '49044')  //19세 미만 회원가입 시도
                 {
                    self.$router.push({name: 'mRegiRefused'});  
                 }else if(errorData.errCode == '49042') //이미 가입완료된 회원입니다.
                 {
                    //회원가입불가 페이지로 이동  
                    self.$router.push({name: 'mRegiFail'});  
                 }
           
                return;
          }
        })      
    
    },

    lookAroundApp(){
        this.$router.push({name: 'mMain'});  
    }, 

	},
  mounted(){   
       this.authCi = this.$route.params.ci
       console.log("authCi:",this.authCi);
  },
  created() {
      this.$EventBus.$emit("mobile-nav-title", "회원가입완료");
      this.$EventBus.$emit("mobile-nav-menus", ["noDefault", "border",'close']);         
       
      //디바이스 백버튼 클릭시 현재페이지 유지하고 이동은 하지 않음
      const backButtonRouteGuard = this.$router.beforeEach((to, from, next) => {
          
          console.log("from.name:"+from.name)
          console.log("to.name:"+to.name)       
          
          if(    to.name  == 'mMain' || 
                 to.name  == 'mAccCreateIntro' || 
                 to.name  == 'mAccCreateResume') //계좌만들기 버튼 터치시 
          {
             next(true);        
          }           
          else{    //디바이스 백버튼 뒤로 가기 막음 
             next(false);       
          }
      });

      this.$once('hook:destroyed', () => {
        // This will be called when the component is destroyed.
        // It has access to anything defined in the scope of our "created" method.
        backButtonRouteGuard();
      });       
  }
};

</script>
