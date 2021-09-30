<template>
 <el-main class="bank-account-main">
     
       <!-- 계좌생성 완료 -->
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
                      계좌를 만들었어요.
                    </span> 
                </td>
              </tr>     
            </tbody>
          </table>        
         </div>             
           
          <div class="btm_fix_btn">
            <div style="text-align:center">                
                   <span>비트코인을 만나볼까요?</span>                      
            </div>
            <div>
                  <el-button class="b_success_btn" style="margin-top:20px" @click="startOver">시작하기
                  </el-button>     
            </div>             
          </div>   

	</el-main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
	components: {

	},
	data () {
		return {            
        
		};
	},
  computed: {  
    ...mapGetters(['getAuthCi']),
    ...mapActions(['logout']),         
  },
	methods : {
   
    startOver(){    
        this.$router.push({ name: 'mMain' })
    },
       
    //계정로그인처리
    getAccLoginInfo()
    {
         let self = this                
         console.log("authCi:"+self.getAuthCi)
        // pre login 처리
          self.$store.dispatch('preLogin', {
            auth_ci:  self.getAuthCi
          }).then((data) => {

            console.log('preLogin Success id:' + data.user_id)

            let userId = data.user_id    
            let unitCode = data.unit_code

            console.log("userId:"+userId)
            console.log("unitCode:"+unitCode)
            
            //login 처리
            if(userId != '' &&  unitCode != '')
            {
                self.$store.dispatch('login', {
                    user_id : userId, 
                    auth_mobl_no : self.$store.state.user.registration.mobileNo
                }).then((data) => 
                {              
                  console.log('===== login Success')
                 
                });
            }       
        })    
    },    
   
	},
  //강제로그아웃후 로그인시킴
  mounted(){
    this.$store.dispatch('logout',{pass:true}).then(() => {
        this.getAccLoginInfo()
    });     

    console.log("userNm:",this.$store.state.user.registration.userNm);
  },
  created() {
      this.$EventBus.$emit("mobile-nav-title", "계좌생성완료");
      this.$EventBus.$emit("mobile-nav-menus", ["noDefault", "border",'close']);    
      //회원가입 완료됐는데 디바이스 백버튼 누르면 뒤로가면 안됨     
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

  },
  beforeDestroy(){
     
  }
};

</script>
