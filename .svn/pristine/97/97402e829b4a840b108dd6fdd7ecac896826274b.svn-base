<template>
  <el-main class="bank-account-main">    
     <!-- App 설치 -->
      
           <p style="padding-top:20px;
                    font-size:18px;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">
          앱 설치 후 휴대폰인증과 
          <br>     
          간편로그인 등록을 진행해 주세요.
          </p>   

         <div style="margin:70px 50px">       
          <table style="width:100%;">
            <colgroup>
              <col style="width:50%">
              <col style="width:50%">
            </colgroup>          
            <tbody>
              <tr style="height:60px; "> 
                <td rowspan="2" style="text-align:center">
                  <img :src="require('@/images/@temp/mykeypin.png')"  alt="mykeypin">  
                  <br>   
                    MyKEEPiN<br>
                    ALLIANCE
                </td> 
                <td style="text-align:center">
                  <!-- 구글플레이 이동 --> <!-- //2021.07.13 by lyk - 모바일 앱 마이키핀 설정 -->
                  <div class="logo" >
                     <a class="link-type" href="market://details?id=com.coinplug.mykeepin" target="_blank"> 
                        <img style="width:100%;height:100%;" :src="require('@/images/@temp/google_play.png')">
                      </a> 
                  </div>   
                </td>
              </tr>
              <tr>
                <td>
                  <!-- 앱스토어 이동 --> 
                  <div class="logo" >
                     <a class="link-type" href="https://apps.apple.com/kr/app/mykeepin-%EC%BD%94%EC%9D%B8%ED%94%8C%EB%9F%AC%EA%B7%B8-%EB%94%94%EC%A7%80%ED%84%B8-id/id1479166844" target="_blank">                        
                        <img style="width:100%;height:100%;" :src="require('@/images/@temp/app_store.png')">
                     </a>
                  </div>
                </td>
              </tr>     
            </tbody>
          </table>        
         </div>  

         <p style="padding-top:20px;
                    color:grey;   
                    font-size:15px;              
                    text-align:center;
                    line-height:25px;"
                    >
          마이키핀은 안전하고 간편한 본인확인 
          </p>  
          <p style="color:grey;   
                    font-size:15px;              
                    text-align:center;
                    line-height:25px;">          
          서비스를 제공합니다.</p>  
               
          <div class="btm_fix_btn">
            <el-button  class="b_success_btn" @click.native.prevent="appInstallNext">
              다음</el-button >
          </div>      

	</el-main>
</template>

<script>
import moment from 'moment'
export default {
	components: {

	},
	data () {
		return {            
		};
	},
	methods : {
    appInstallNext(){
     //App 설치 안내 페이지로 이동 후 회원가입 진행 계속
      this.$router.replace({name: 'mMobileIdConfirmed'});
    },	

	},
  created() {
       this.$EventBus.$emit("mobile-nav-title", "App 설치");
       this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border','close']);
  }
};

</script>
