<template>
    <el-form ref="topForm" :rules="rule" :model="topForm">
        <div class="MyInfo">
            <h1 class="pageTitle">{{'정보 업데이트'}}<!-- 회원정보 --></h1>
            <div class="cell">
                <span class="title">{{'지점'}}<!-- 지점 --></span>
                <span class="value">{{ unitKorNm }}</span>
            </div>
            <div class="cell">
                <span class="title">{{'이름(한글)'}}<!-- 이름(한글) --></span>
                <span class="value">{{ userNm }}</span>
            </div>
            <div class="cell">
                <span class="title">{{'이름(영문)'}}<!-- 이름(영문) --></span>
                <el-form-item prop="firstName"  style="display: inline-block;">
                    <span>                    
                        <el-input type="text" class="change_value" id="firstnameMyInfo" v-model="topForm.firstName" max="10" size="small" :disabled="engNmDisabled" style="width: 120px;"></el-input>
                    </span>
                </el-form-item>
                <el-form-item prop="lastName"  style="display: inline-block;">
                    <span>    
                        <el-input type="text" class="change_value" id="lastnameMyInfo" v-model="topForm.lastName" max="10" size="small" :disabled="engNmDisabled" style="width: 120px;"></el-input>
                    </span>
                </el-form-item>
            </div>
            <div class="cell">
                <span class="title">{{'생년월일'}}<!-- 생년월일 --></span>
                <span class="value">{{ userBrthDay }}</span>
            </div>
            <div class="cell">
                <span class="title">{{'휴대폰 번호'}}<!-- 휴대폰 번호 --></span>
                <span class="value">{{ authMoblNo }}</span>
            </div>
            <div class="info_wrap">
                <el-tabs v-model="activeName" @tab-click="sendEvent" stretch>
                    <el-tab-pane :disabled="firstDisabled" class="info" name="first" label="자택정보">
                        <Accomo-Info></Accomo-Info>   
                    </el-tab-pane>

                    <el-tab-pane :disabled="secondDisabled" class="info" name="second" label="직장정보">
                        <WorkPlace-Info ></WorkPlace-Info>
                    </el-tab-pane>

                    <el-tab-pane :disabled="thirdDisabled" class="info" name="third" label="자금정보">
                        <Fund-Info ></Fund-Info>
                    </el-tab-pane>
                </el-tabs>
            </div>
        
        </div>
    </el-form>
</template>


<script>
import { mapGetters } from 'vuex'
export default {

	components: {    
       AccomoInfo: () => import(/* webpackPrefetch: true */ '@/views/mypage/myCustomerInfoTab/AccomoInfo.vue'),
       WorkPlaceInfo: () => import(/* webpackPrefetch: true */ '@/views/mypage/myCustomerInfoTab/WorkPlaceInfo.vue'),
       FundInfo: () => import(/* webpackPrefetch: true */ '@/views/mypage/myCustomerInfoTab/FundInfo.vue')
	},
          
    computed:{
        ...mapGetters(['getUserId','getUnitcode'])
    },

	data() {
		return {           
            activeName: 'first',

            saveAccomoBtnVisible: false,
            saveWorkBtnVisible: false,
            saveAllBtnVisible: false,
        
            unitKorNm: '',
            userNm: '',
            userBrthDay: '',
            authMoblNo: '',

            topForm: {
                firstName: '',
                lastName: '',
            },

            firstDisabled:false,
            secondDisabled:true,
            thirdDisabled:true,

            engNmDisabled: false
        }
	},
    
	methods: {
         //직장정보만 활성화, 영문이름 비활성화
        mySavedLvl1(){
            let self = this;
            console.log("mSavedLvl1:")
            self.activeName = 'second'
            self.firstDisabled = true
            self.secondDisabled = false
            self.thirdDisabled = true 

            self.engNmDisabled = true
        },
        //자금정보만 활성화
        mySavedLvl2(){
            let self = this;
            console.log("mSavedLvl2:")
            self.activeName = 'third'
            self.firstDisabled = true
            self.secondDisabled = true   
            self.thirdDisabled = false 
        },
        //탭 모두 비활성화
        mySavedLvl3(){
            let self = this;
            console.log("mSavedLvl3:")
            self.activeName = 'third'
            self.firstDisabled = true
            self.secondDisabled = true   
            self.thirdDisabled = true 
        },        

        //탭 이동      
        sendEvent() {
            let self = this;
            if(self.activeName == 'first') {
                self.$EventBus.$emit('AccomoInfo');
            }
            if(self.activeName == 'second') {
                self.$EventBus.$emit('WorkPlaceInfo')
            } 
            if(self.activeName == 'third') {
                self.$EventBus.$emit('FundInfo')
            } 
        },     

        //MyInfo로 정보 조회
        myInfo() { 
            let self = this; 
            self.$store.dispatch('myInfo',{user_id:self.getUserId}).then((data) => { 
                console.log('myInfo Success', data);                
               
                self.userNm = data.user_nm       
                console.log("user_nm:" +self.userNm)       
                self.unitKorNm = data.unit_kor_nm;
                self.topForm.firstName = data.user_eng_nm;
                self.topForm.lastName = data.user_eng_surnm;     
                if(data.user_brth_day)
                {
                    let date = data.user_brth_day
                    self.userBrthDay = date.substring(0,4) + '.' + date.substring(4,date.length-2)  + '.' + date.substring(date.length-2,date.length) //1981.1.14
                 }
                if(data.auth_mobl_no)
                {
                    let authMoblNo = data.auth_mobl_no
                    self.authMoblNo = authMoblNo.substring(0,3) + '-' +  authMoblNo.substring(3,7) + '-' + authMoblNo.substring(7)  //01094898114
                }

                console.log("userNm: " + self.userNm)
                console.log("unitKorNm: " + self.unitKorNm)
                console.log("firstName: " + self.topForm.firstName)
                console.log("lastName: " + self.topForm.lastName)
                console.log("userBrthDay: " + self.userBrthDay)
                console.log("authMoblNo: " + self.authMoblNo)
            }).catch(err => {
         
              console.log(new Error( err ));   
              self.$alert(self.$t('myInfoError.' + err ), '', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: self.$t('sys_err.a001')
              });                      
            return  
          })    
        },
    },

    mounted(){
        let self = this;
        if (self.$store.getters.isSocketConnected) {
            self.myInfo();
        } else {
            self.$EventBus.$on('socketConnected', self.myInfo);
        }
        
        self.$EventBus.$emit('pc-navi', [
            { label: self.$t('header.me'), target: 'mypageInfo' },
            { label: "고객재이행", target: null }
        ]);

        self.$EventBus.$on('langChange', () => {
            self.$EventBus.$emit('pc-navi', [
                { label: self.$t('header.me'), target: 'mypageInfo' },
                { label: "고객재이행", target: null }
            ]);
        });

    },
    created() {        
        this.$EventBus.$on('mySavedLvl1', this.mySavedLvl1);
        this.$EventBus.$on('mySavedLvl2', this.mySavedLvl2);    
        this.$EventBus.$on('mySavedLvl3', this.mySavedLvl2);    
    },
    beforeDestroy() {
        this.$EventBus.$off('mySavedLvl1', this.mySavedLvl1);
        this.$EventBus.$off('mySavedLvl2', this.mySavedLvl2);     
        this.$EventBus.$off('mySavedLvl3', this.mySavedLvl3);     
        this.$EventBus.$off('socketConnected', this.myInfo);
    }
}

</script>

<style scoped>
.cell {
    background: #f5f5f5;
    height: 40px;
    font-size: 14px;
    color: #212121;
    border-bottom: 1px solid #cecece;
}
.value {
    border: none;
}
.info {
    font-size: 10pt;
    color: #444;
}
.info_wrap{
    float:left;
    width:100%;
}

</style>