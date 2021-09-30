<template>
 <el-main class="bank-account-main">
        
    <!-- MobileW 회원가입 -->
          <p style="padding-top:80px;
                    font-size:20px;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">
          {{from}} 모바일 앱에서 가능합니다.</p>

          <p style="padding-top:80px;
                    font-size:15px;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">
          코벡스앱 다운로드</p> 
          
          <div style="margin-top:30px;
                      padding:20px 15px;
                      background:#ffffff;">
              <el-row type="flex" justify="center">
                <el-col :span="12" style="text-align: center;margin:auto">    
                 <!-- 마이키핀 앱링크 -->           
                  <div class="logo" >
                      <a class="link-type" href="https://apps.apple.com/kr/app/mykeepin-%EC%BD%94%EC%9D%B8%ED%94%8C%EB%9F%AC%EA%B7%B8-%EB%94%94%EC%A7%80%ED%84%B8-id/id1479166844" target="_blank"> 
                        <img style="width:100%;height:100%;" :src="require('@/images/@temp/google_play.png')">
                      </a>                     
                  </div>            
                </el-col>         
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="12" style="text-align: center;margin:auto">
                  <!-- 마이키핀 앱링크 -->
                  <div class="logo"  >
                     <a class="link-type" href="https://play.google.com/store/apps/details?id=com.coinplug.mykeepin" target="_blank">                        
                        <img style="width:100%;height:100%;" :src="require('@/images/@temp/app_store.png')">
                     </a>
                  </div>
                </el-col>         
              </el-row>
          </div>
        <div >
            <div class="btn_wrap" style="text-align:center;margin-top:30px">
                <el-button type="text" class="blue_txt_btn" @click="goRegistration" style="font-size:18px">홈으로 돌아가기
                  </el-button>                     
            </div>         
        </div>        

	</el-main>
</template>

<script>
export default {
	components: {

	},
	data () {
		return {      
      from: '회원가입은'      
         
		};
	},
	methods : {

    goRegistration(){
	    var self = this;
      self.$router.push({name: 'mMain'});
    }, 
	},
  mounted(){

    if(this.$route.params.from == 'acc')
    {
        this.from = '계좌만들기는'  
    }
    
  },
  created() {
    //   this.$EventBus.$emit("mobile-nav-title", "MobileW 회원가입");
      this.$EventBus.$emit("mobile-nav-title", "");
      this.$EventBus.$emit("mobile-nav-menus", ["noDefault",'close']);
  }
};

</script>
