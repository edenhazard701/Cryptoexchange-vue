<template>
 <el-main class="bank-account-main">
       <!-- 회원가입 실패 -->
         <div style="margin:20px">       
          <table style="width:100%;">
            <colgroup>
              <col style="width:50%">
              <col style="width:50%">
            </colgroup>          
            <tbody>
              <tr style="height:60px; ">
                <td style="text-align:left">
                     <span style="padding-top:20px;
                                font-size:15px;
                                color:#212121;                             
                                line-height:25px;">
                      고객님은 </span>                    
                 </td>
              </tr>
              <tr>
                <td colspan="2">                 
                    <span style="padding-top:20px;
                              font-size:15px;
                              color:#212121;                           
                              line-height:25px;">
                    이미 가입한 회원정보가 존재합니다.
                    </span>                   
                </td>
              </tr>    
            </tbody>
          </table>        
         </div>                   

         <p style="padding-left:20px;
                    font-size:12px;
                    color:grey;
                    text-align:left;
                    line-height:25px;">
          로그인 후 이용해 주세요.</p>               
               
          <div class="btm_fix_btn" >
            <el-button  class="b_success_btn" @click.native.prevent="mainGo">
              로그인 페이지로 이동</el-button >
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
    mainGo(){
        this.$router.push({name: 'mLogin'});  
    }, 

	},
  created() {
      this.$EventBus.$emit("mobile-nav-title", "회원가입실패");
      this.$EventBus.$emit("mobile-nav-menus", ["noDefault", "border",'close']);

      //디바이스 백버튼 클릭시 현재페이지 유지하고 이동은 하지 않음
      const backButtonRouteGuard = this.$router.beforeEach((to, from, next) => {
       
          console.log("from.name:"+from.name)
          console.log("to.name:"+to.name)       
         
          if(to.name  == 'mMain'|| to.name  == 'mLogin') //상단에 X 버튼 > 메인으로 감
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
