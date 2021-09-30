<template>
    <div class="MyInfo">
        <h1 class="pageTitle">{{"휴대폰번호변경"}}<!-- 휴대폰번호변경 --></h1>
        <div class="changeInfo">
            휴대폰 번호가 변경되었나요?<br/>
            변경 휴대폰 번호를 확인해 주세요.
        </div>
        <div class="cell">
            <span class="title">{{"기존휴대폰번호"}}<!-- 기존휴대폰번호 --></span>
            <span><el-input v-model="loginUserData.db_mobl_no"  style="display: inline-block; width: 160px;"></el-input></span>
        </div>
        <div class="cell">
             <span class="title">{{"변경휴대폰번호"}}<!-- 변경휴대폰번호 --></span>
             <span><el-input v-model="mobileNo"  style="display: inline-block; width: 160px;"></el-input></span>
        </div>      

        <div class="btm-buttons">
            <el-button type="primary" style="width: 160px; margin: 40px 0 0 100px;" @click="savePhoneNum()">저장</el-button>
        </div>
       
        <user-day-cnt-guide></user-day-cnt-guide>
        <user-day-cnt-over></user-day-cnt-over>
	</div>
</template>

<script>
import userDayCntGuide from "../member/common/UserDayCntGuide.vue";
import userDayCntOver from "../member/common/UserDayCntOver.vue";
export default {
    components: {
        userDayCntGuide,
        userDayCntOver
    },	
	data() {
		return {          
            loginUserData: [],
            authCi:'',
            mobileNo:'',
                
            dayCnt:0,
		}
	},
   
	methods: {  
           
        //고객재이행주기 체크
        checkDayCnt(data) {
            let self = this;  
    
            if(self.loginUserData && data == "")
            {
                self.$store.dispatch('login',{user_id:self.loginUserData.user_id,auth_mobl_no :self.mobileNo}).then((data) => 
                {               
                   // data.user_day_cnt = 5
                    console.log('user_day_cnt:'+ data.user_day_cnt)    
                    self.dayCnt = parseInt(data.user_day_cnt) 
                    console.log('dayCnt:'+ self.dayCnt)    
                    self.dayCntParams = { 
                                    dayCnt:   self.dayCnt, 
                                    userId:   self.accLoginInfo.user_id, 
                                    authCi:   self.authCi, 
                                    mobileNo: self.mobileNo
                                  
                                  }
                    console.log('dayCntParams:'+ JSON.stringify(self.dayCntParams))        

                    if(     parseInt(data.user_day_cnt) == 5
                         || parseInt(data.user_day_cnt) == 3
                         || parseInt(data.user_day_cnt) == 1    )
                    {
                              
                        self.$EventBus.$$emit('checkDayCntGuide', self.dayCntParams)                         
                    }
                    else if(parseInt(data.user_day_cnt) < 0)
                    {
                        self.$EventBus.$$emit('checkDayCntOver', self.dayCntParams)    
                    }                    
                })             
            }else if(data != '')
            {

            }      
        },
        savePhoneNum() {
            let self = this;  
            
            self.$socket.sendProcessByName('ac116', (queryData) => {
                let block = queryData.getBlockData('InBlock1')[0];
                block['user_id'] = self.loginUserData.user_id           
                block['auth_ci'] = self.authCi
                block['af_auth_mobl_no'] = self.mobileNo 
                
                console.log("block:" + JSON.stringify(block))
            }, function (queryData) {
                if (queryData != null) {
                
                    let res = queryData['queryObj']['OutBlock1'][0]

                    if(res)
                    {
                        self.$alert('변경 완료되었습니다.', '', {
                            confirmButtonText: self.$t('m_signup.d027'), /*확인*/
                        }).then(res)(res=>{
                            console.log('신규모바일번호: ' + res.af_auth_mobl_no);
                            self.$EventBus.$emit('reloadStockMaster');
                            self.$router.push({name:'mExchange'})   
                        })                       
                    }
                    
                } else {
                    // 전문 에러 언어팩 적용
                    const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                    if (errorData.trName != "ac116") return

                    self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: self.$t('sys_err.a001')
                    });
                }
            })     
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
                        //마이키핀 휴대폰 번호와 코벡스 휴대폰 정보가 일치하지 않는 경우 
                        if(  self.mobileNo == data.db_mobl_no)//거래소 이동
                        {    
                            self.$EventBus.$emit('reloadStockMaster');   
                            self.$router.push({name:'mExchange'})               
                        }              
                
                    });
                }           
            })    
        },       
    },   

    mounted(){           
        let self = this;

        //로그인후 받은 사용자정보
        self.loginUserData = self.$route.params.loginUserData  
        console.log("loginUserData: "+ JSON.stringify(self.loginUserData))
  
        //휴대폰변경후 저장시 필요한 입력값
        self.authCi = self.$route.params.authCi          
        self.mobileNo = self.$route.params.mobileNo  
        
        console.log("authCi: "+ JSON.stringify(self.authCi))
        console.log("mobileNo: "+ JSON.stringify(self.mobileNo))
        console.log("isPC: "+ self.isPC)

        //재이행주기체크
        if (self.$store.getters.isSocketConnected) {
            self.checkDayCnt();
        } else {
            self.$EventBus.$on('socketConnected', self.checkDayCnt);
        }

        self.$EventBus.$emit('pc-navi', [
            { label: self.$t('header.me'), target: 'mypageInfo' },
            { label: "휴대폰번호변경", target: null }
        ]);

        self.$EventBus.$on('langChange', () => {
            self.$EventBus.$emit('pc-navi', [
                { label: self.$t('header.me'), target: 'mypageInfo' },
                { label: "휴대폰번호변경", target: null }
            ]);
        });
       
    },
    created() {
        let self = this;      
        self.$EventBus.$emit("mobile-nav-title", "휴대폰번호변경");
        self.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border']);
    } , 
    beforeDestroy() {
        let self = this;
        self.$EventBus.$off('socketConnected', self.checkDayCnt);
  }
}

</script>

<style scoped>
.changeInfo {
    display: block;
    font-size: 11pt;
    text-align: center;
    margin: 40px 0;
}

.phone_wrap {
    width: 320px;
    height: 50px;
    background-color: #f5f5f5;
    padding: 10px;
    margin: 30px 0 0 30px;
    border-radius: 5px;
}

</style>