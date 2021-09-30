<template>
 <el-main class="bank-account-main">
     
       <!-- 계좌생성 보류 -->
       <div style="margin:150px 70px">       
            <p style="margin-top:20px">고객님의 계좌개설 신청을 심사 중이에요.</p>

            <p style="margin-top:20px">회원가입 신청은 24시간 내 연락드릴께요.</p>

            <p style="margin-top:20px">문의사항은 고객센터로 문의해주세요.</p>

            <p style="margin-top:20px">고객센터 (1111-1111)</p>

            <p style="margin-top:20px">감사합니다.  </p>  
        </div>             
          
        <div class="btm_fix_btn">   
          <div>   
                <el-button  class="b_success_btn" @click="goMain">처음으로
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
        
		};
	},
	methods : {
   
    goMain(){
       this.$router.push({name: 'mMain'});  
    },  
	},
  mounted(){

  },
  created() {
      this.$EventBus.$emit("mobile-nav-title", "계좌생성보류");
      this.$EventBus.$emit("mobile-nav-menus", ["noDefault", "border",'close']);            
      //디바이스 백버튼 클릭시 현재페이지 유지하고 이동은 하지 않음
      const backButtonRouteGuard = this.$router.beforeEach((to, from, next) => {
       
          console.log("from.name:"+from.name)
          console.log("to.name:"+to.name)       
         
          if(to.name  == 'mMain' || to.name  == 'mExchange') //상단에 X 버튼 > 메인으로 감
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
  },
  beforeDestroy(){
     
  }
};

</script>
