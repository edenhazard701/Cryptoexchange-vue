<template>
 <el-main class="bank-account-main">
       <!-- 회원가입 불가 -->
         <div style="margin:20px">       
          <table style="width:100%;">
            <colgroup>
              <col style="width:50%">
              <col style="width:50%">
            </colgroup>          
            <tbody>
              <tr style="height:60px; "> 
                <td  class="registration_completion" rowspan="2" style="text-align:center">
                   <img style="width:50px;height:50px;" :src="require('@/images/ico_error_page.png')">
                </td> 
                <td style="text-align:left">
                     <span style="padding-top:20px;
                                font-size:15px;
                                color:#212121;                             
                                line-height:25px;">
                      19세 미만은 </span>                    
                 </td>
              </tr>
              <tr>
                <td>                 
                    <span style="padding-top:20px;
                              font-size:15px;
                              color:#212121;
                              text-align:center;
                              line-height:25px;">
                    회원가입이 불가합니다.</span>    
                </td>
              </tr>     
            </tbody>
          </table>        
         </div>                   

         <p style="padding-top:0px;
                    font-size:12px;
                    color:grey;
                    text-align:center;
                    line-height:25px;">
          기타 궁금한 사항은</p>  

          <p style="padding-top:0px;
                    font-size:12px;
                    color:grey;
                    text-align:center;
                    line-height:25px;">
          고객센터로 문의해주세요.</p>  

          <p style="padding-top:20px;
                    font-size:12px;
                    color:grey;
                    text-align:center;
                    line-height:25px;">
          (1111-1111)</p>                
               
          <div  class="btm_fix_btn" >
            <el-button  class="b_success_btn" @click.native.prevent="mainGo" :loading="logining">
              거래소로 돌아가기 ></el-button >
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
        this.$router.push({name: 'mMain'});  
    }, 

	},
  created() {
      this.$EventBus.$emit("mobile-nav-title", "회원가입불가");
      this.$EventBus.$emit("mobile-nav-menus", ["noDefault", "border",'close']);

      //디바이스 백버튼 클릭시 현재페이지 유지하고 이동은 하지 않음
      const backButtonRouteGuard = this.$router.beforeEach((to, from, next) => {
       
          console.log("from.name:"+from.name)
          console.log("to.name:"+to.name)
               
          if(to.name  == 'mMain'|| to.name  == 'mExchange') //상단에 X 버튼 > 메인으로 감
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
