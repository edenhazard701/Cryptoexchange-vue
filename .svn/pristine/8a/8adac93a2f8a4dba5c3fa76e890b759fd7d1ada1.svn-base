<template>
    <el-main>
        <el-form ref="topForm" :rules="rule" :model="topForm">
            <div class="MyInfo">
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
                        <span class="value">
                            <el-input type="text" class="change_value" id="firstnameInfo" placeholder="First name" max="10" size="small" v-model="topForm.firstName" :disabled="engNmDisabled" style="width: 120px;"></el-input>
                        </span>
                    </el-form-item>
                    <el-form-item prop="lastName"  style="display: inline-block;">
                        <span class="value">
                            <el-input type="text" class="change_value" id="lastnameInfo" placeholder="Last name" max="10" size="small" v-model="topForm.lastName" :disabled="engNmDisabled" style="width: 120px;"></el-input>
                        </span>
                    </el-form-item>
                </div>
                <div class="cell">
                    <span class="title">{{'생년월일'}}<!-- 생년월일 --></span>
                    <span class="value">{{ userBrthDay }}</span>
                </div>
                <div class="cell">
                    <span class="title">{{$t('mypage.b005')}}<!-- 휴대폰 번호 --></span>
                    <span class="value">{{ authMoblNo }}</span>

                </div>
                <div class="info_wrap">
                    <el-tabs v-model="activeName" @tab-click="sendEvent" stretch>
                        <el-tab-pane :disabled="firstDisabled" class="info" name="first" label="자택정보">
                            <Accomo-Info></Accomo-Info>   
                        </el-tab-pane>

                        <el-tab-pane :disabled="secondDisabled" class="info" name="second" label="직장정보">
                            <Work-Place-Info></Work-Place-Info>
                        </el-tab-pane>

                        <el-tab-pane :disabled="thirdDisabled" class="info" name="third" label="자금정보">
                            <Fund-Info></Fund-Info>
                        </el-tab-pane>
                    </el-tabs>
                </div>
               
            </div>
        </el-form>
        <post-no></post-no>
    </el-main>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
	components: {
        PostNo: () => import(/* webpackPrefetch: true */ '@/views/member/common/PostNoDialog.vue'),
        AccomoInfo: () => import(/* webpackPrefetch: true */ '@/views/mobile/mypage/customerInfoTab/AccomoInfo.vue'),
        WorkPlaceInfo: () => import(/* webpackPrefetch: true */ '@/views/mobile/mypage/customerInfoTab/WorkPlaceInfo.vue'),
        FundInfo: () => import(/* webpackPrefetch: true */ '@/views/mobile/mypage/customerInfoTab/FundInfo.vue')
	},
    computed:{
        ...mapGetters(['getUserId', 'getUnitcode'])
    },  
	data() {
		return {         
            activeName: 'first',

            saveAccomoBtnVisible: false,
            saveWorkBtnVisible: false,
            saveAllBtnVisible: false,
            
            unitKorNm:'',
            userNm:'',
            userBrthDay:'',
            authMoblNo:'',

            topForm: {
                firstName: '',
                lastName: '',
            }, 

            firstDisabled:false,
            secondDisabled:true,
            thirdDisabled:true,

            engNmDisabled: false
        };
	},
   
	methods: {
      
        //직장정보만 활성화, 영문이름 비활성화
        mSavedLvl1(){
            let self = this;
            console.log("mSavedLvl1:")
            self.activeName = 'second'
            self.firstDisabled = true
            self.secondDisabled = false
            self.thirdDisabled = true 

            self.engNmDisabled = true
        },
        //자금정보만 활성화
        mSavedLvl2(){
            let self = this;
            console.log("mSavedLvl2:")
            self.activeName = 'third'
            self.firstDisabled = true
            self.secondDisabled = true   
            self.thirdDisabled = false 
        },
        //탭 모두 비활성화
        mSavedLvl3(){
            let self = this;
            console.log("mSavedLvl3:")
            self.activeName = 'third'
            self.firstDisabled = true
            self.secondDisabled = true   
            self.thirdDisabled = true 
        },
        
        //주택 우편번호, 주소 보여주기
        mAccomoInfoPostNo(data) {
           
            if(data != null && data.flag == true)
            {
                this.$EventBus.$emit('mAccomoInfoPostNo', data);
              
            }else{
                this.$EventBus.$emit('mAccomoInfoPostNo', '');
           
            }
        },

        //직장 우편번호, 주소 보여주기
        mWorkPlaceInfoPostNo(data) {    
            
            if(data != null && data.flag == true)
            {
                this.$EventBus.$emit('mWorkPlaceInfoPostNo', data);
              
            }else{
                this.$EventBus.$emit('mWorkPlaceInfoPostNo', '');
            }
        },
      
        sendEvent() {
            let self = this;
            if(self.activeName == 'first') {
                self.$EventBus.$emit('mAccomoInfo');
            }
            else if(self.activeName == 'second') {
                self.$EventBus.$emit('mWorkPlaceInfo')
            }
            else if(self.activeName == 'third') {
                self.$EventBus.$emit('mFundInfo')
            } 
        },
        
        // MyInfo로 회원정보 조회
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
                    console.log("user_brth_day:" +self.userBrthDay )
                }
                if(data.auth_mobl_no)
                {
                    let authMoblNo = data.auth_mobl_no
                    self.authMoblNo = authMoblNo.substring(0,3) + '-' +  authMoblNo.substring(3,7) + '-' + authMoblNo.substring(7)  //01094898114
                    console.log("auth_mobl_no:" +self.authMoblNo )
                }            
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
    },   
    created() {
        this.$EventBus.$emit("mobile-nav-title", "정보 업데이트");
        this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border','close']);

        this.$EventBus.$on('mSavedLvl1', this.mSavedLvl1);
        this.$EventBus.$on('mSavedLvl2', this.mSavedLvl2);      
        this.$EventBus.$on('mSavedLvl3', this.mSavedLvl3);   
        this.$EventBus.$on('mAccomoInfoFlag', this.mAccomoInfoPostNo);
        this.$EventBus.$on('mWorkPlaceInfoFlag', this.mWorkPlaceInfoPostNo);
    }, 
    beforeDestroy(){
        this.$EventBus.$off('mSavedLvl1', this.mSavedLvl1);
        this.$EventBus.$off('mSavedLvl2', this.mSavedLvl2);
        this.$EventBus.$off('mSavedLvl3', this.mSavedLvl3);
        this.$EventBus.$off('mAccomoInfoFlag', this.mAccomoInfoPostNo);
        this.$EventBus.$off('mWorkPlaceInfoFlag', this.mWorkPlaceInfoPostNo);
        this.$EventBus.$off('socketConnected', this.myInfo);
    }
}
</script>

<style scoped>
.pageTitle {
    text-align: center;
}
.cell {
    background: #f5f5f5;    
    height: 40px;
    line-height:40px;
    font-size: 14px;
    color: #212121;
    border-bottom: 1px solid #cecece;
}
.title{
    float:left;
    padding-left:5%;
    width:25%;
    height:39px;
    background: #3F51B5;
    color: #fff;
}

.value {
    float:left;
    padding-left:5%;
    width:70%; 
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