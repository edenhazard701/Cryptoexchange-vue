<template>
  <div class="bank-account-main">
      <!-- 계좌 만들기 이어서 하기 -->
      <div>
        <div style="margin-top: 50px;
                    padding: 0 40px;
                    font-size: 16pt;
                    font-weight: bold;
                    text-align: center;">
          이전에 진행하던 <br/> 계좌 만들기가 존재합니다.
        </div>
        <div style="margin-top: 100px;
                   font-size: 14pt;
                   text-align: center;">
         <span style="color:#3f51b5; font-weight:bold"> {{this.unitKorNm}} </span>지점 계좌 만들기를 이어서 하실래요?
        </div>

        <div class="btm_fix_btn">
              <el-button-group style="display: block; width:100%;">
                <el-button  style="background-color:white;color:#3f51b5;border:1px solid;width:50%;height:50px;font-size:16px" @click="branchSelect">새로하기<!--새로하기--></el-button>  
                <el-button  class="b_success_btn" style="width:50%;" @click="accNext">이어서 하기<!--이어서 하기--></el-button>    
              </el-button-group>
        </div>

      </div>
  </div>  
</template>

<script>

export default {
  components: {
 
  },
  data() {
    
    return {
        creationInfo:{},
        unitKorNm:''
    }
  },
  methods: {   
  
    //계좌이어서하기
    accNext() {
      this.goToSavedPage()
    },

    //지점 선택
    branchSelect() {
      let self = this;
      self.$router.push({name: 'mBranchSelect',  params:{ci:self.authCi}}); 
    },

    goToSavedPage(){

          if( this.creationInfo.event_noti == '' ){                
              this.$router.push({name: 'mBranchSelect', params:{ci:self.authCi}});  //지점선택
          }else if(this.creationInfo.event_noti != '' && this.creationInfo.auth_gen_dt == ''){
              this.$store.state.user.termFrom = 'BranchSelect'
              this.$router.push({name: 'mTermAgree'});   //약관동의
          }else if(!this.creationInfo.auth_gen_dt != '' && this.creationInfo.user_eng_nm == ''){
              this.$router.push({name: 'mIdSubmit'});  //인증서 발급안내          
          }else if(!this.creationInfo.user_eng_nm != '' && this.creationInfo.home_pst_no == ''){
              this.$router.push({name: 'mCustomerInfo'});    //고객정보
          }else if(!this.creationInfo.home_pst_no != '' && this.creationInfo.job_position_code == ''){
              this.$router.push({name: 'mResidenceInfo'});    //거주정보
          }else if(!this.creationInfo.job_position_code != '' && this.creationInfo.ofc_pst_no == ''){
              this.$router.push({name: 'mJobInfo'});    //직장정보1
          }else if(!this.creationInfo.ofc_pst_no != '' && this.creationInfo.fund_src_tp == ''){
              this.$router.push({name: 'mJobAddrInfo'});    //직장정보2
          }else if(!this.creationInfo.fund_src_tp != '' && this.creationInfo.bact_auth_tp == ''){
              this.$router.push({name: 'mInvestInfo'});  //투자정보   
          }else if(!this.creationInfo.bact_auth_tp == '0'){   //0:1원인증 미완료. 1:1원인증완료
              this.$router.push({name: 'mOneWonVerifi1'});  //1원인증
          } 
    }

  },
  mounted(){
        this.authCi = this.$route.params.ci
        console.log("this.authCi:",this.authCi);
    
        this.creationInfo = this.$store.state.user.userAccCreationInfo
        console.log("creationInfo:"+JSON.stringify(this.creationInfo));
        this.unitKorNm = this.creationInfo.unit_kor_nm  //지점명
  },
  created() {
        this.$EventBus.$emit("mobile-nav-title", "");
        this.$EventBus.$emit('mobile-nav-menus', ['noDefault', 'border','close']);
  }
 
}
</script>
