<template>
    <section>
        <!-- 고객확인제도재이행 안내-->
        <el-dialog :visible.sync="myUserDayCntGuideVisible" :show-close="false" destroy-on-close append-to-body class="NewStock">
            <span slot="title"></span>  
            <div class="new-stock-info" style="margin-top:0px; font-size:15px">{{content1}}</div>
            <div slot="footer" class="dialog-footer">              
                <el-button @click="myDoNextTime">다음에 하기</el-button>
                <el-button @click="myDoNow" type="primary">지금하기</el-button>               
            </div>
        </el-dialog>    
    </section>
</template>

<script>
export default {
	data () {
		return {     
            myUserDayCntGuideVisible: false,                
            content1:'',     
            userId:'',
            authCi:'',
            mobileNo:'',           
		};
	},
	methods : {  
        //로그인완료
        myDoNextTime(){
            let self = this;  
            self.myUserDayCntGuideVisible = false   

            self.getAccLoginInfo()
        
        },
        //계정로그인처리
        getAccLoginInfo()
        {
            let self = this            
            // pre login 처리
            self.$store.dispatch('preLogin', {
                auth_ci: self.authCi       
            }).then((data) => {
                console.log('preLogin Success')
                let userId = data.user_id    
                let unitCode = data.unit_code   
                //login 처리
                if(userId != '' &&  unitCode != '')
                {
                    self.$store.dispatch('login', {
                        user_id : userId, 
                        auth_mobl_no :  self.mobileNo 
                    }).then((data) => {

                        console.log('login Success')     
                        
                        //마이키핀 휴대폰 번호와 코벡스 휴대폰 정보가 일치체크 로긴페이지에서 이미 함   
                        if(afc.isPC)              
                        {
                            self.$EventBus.$emit('reloadStockMaster');   
                            self.$router.push({name:'exchange'})                              

                        }else
                        {
                            self.$router.push({name:'mMain'})
                            //self.$EventBus.$emit('reloadStockMaster');   
                            //self.$router.push({name:'mExchange'})  
                        }                      
                    });
                }           
            })    
        },

        //고객재이행 페이지 이동
        myDoNow(){
            let self = this;  
            self.myUserDayCntGuideVisible = false

            if(afc.isPC)           
            {  
                self.$router.push({name:'mypageCustomerconfirm'})    
            }else
            {
                self.$router.push({name:'mCustomerConfirm'})
            }          
        },
        
        checkDayCnt(data){

            const self = this;
            console.log("dayCnt: "+ data.dayCnt)
            console.log("userId: "+ data.userId)
            console.log("authCi: "+ data.authCi)
            console.log("mobileNo: "+ data.mobileNo)            

            self.userId = data.userId
            self.authCi = data.authCi
            self.mobileNo = data.mobileNo         
            
            self.content1 = "고객확인제도 재이행 주기가 "+ data.dayCnt + "일 남았습니다."
            +"재이행 주기 만기일 전 까지 정보를 업데이트 해 주세요."

            self.myUserDayCntGuideVisible = true
        }

	},
  created() {
        let self = this;
        self.$EventBus.$on('checkDayCntGuide', self.checkDayCnt);      
        self.$EventBus.$emit("mobile-nav-title", "휴대폰번호변경");
        self.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border']);
    }, 
    beforeDestroy(){
        let self = this;
        self.$EventBus.$off("checkDayCntGuide", self.checkDayCnt);

    }
};

</script>
