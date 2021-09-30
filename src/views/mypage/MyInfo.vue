<template>
    <div class="MyInfo">
        <el-form ref="topForm" :rules="rule" :model="topForm">          
            <h1 class="pageTitle">{{userInfoTitle}}<!-- 회원정보 --></h1>
            <div v-if="((typeof getUnitcode != 'undefined')&&(getUnitcode != '00999'))" class="cell">           
                <span class="title">{{'지점'}}<!-- 지점 --></span>
                <span class="value">{{ unitKorNm }}</span>
            </div>
            <div class="cell">
                <span class="title">{{'이름(한글)'}}<!-- 이름(한글) --></span>
                <span class="value">{{ userNm }}</span>
            </div>
            <div v-if="((typeof getUnitcode != 'undefined')&&(getUnitcode != '00999'))" class="cell">           
                <span class="title">{{'이름(영문)'}}<!-- 이름(영문) --></span>
                <el-form-item prop="firstName"  style="display: inline-block;">
                    <span>                    
                        <el-input type="text" :disabled="engNameDisabled" class="change_value" id="myfirstname" v-model="topForm.firstName" max="10" size="small"  style="width: 120px;"></el-input>
                    </span>
                </el-form-item>
                <el-form-item prop="lastName"  style="display: inline-block;">
                    <span>    
                        <el-input type="text" :disabled="engNameDisabled" class="change_value" id="mylastname" v-model="topForm.lastName" max="10" size="small" style="width: 120px;"></el-input>
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
            <div class="info_wrap" v-if="((typeof getUnitcode != 'undefined')&&(getUnitcode != '00999'))"  style="margin-bottom:30px"> 
                <el-tabs v-model="activeName" @tab-click="sendEvent" :disabled="editWrapDisabled" stretch>
                    <el-tab-pane class="info" name="first" label="자택정보">
                        <Accomo-Edit ></Accomo-Edit>   
                    </el-tab-pane>

                    <el-tab-pane class="info" name="second" label="직장정보">
                        <WorkPlace-Edit></WorkPlace-Edit>
                    </el-tab-pane>

                    <el-tab-pane class="info" name="third" label="자금정보">
                        <Fund-Edit></Fund-Edit>
                    </el-tab-pane>
                </el-tabs>
            </div>         
        </el-form>

        <div class="btm-buttons"  v-if="((typeof getUnitcode != 'undefined')&&(getUnitcode != '00999'))">
            <!-- 편집버튼 클릭시 -->
            <div v-if="!saveVisible" style="margin-top:20px;text-align:center">
                <el-button type="text"  @click.native.prevent="myKeepInCertWindow">{{this.editBtn}}</el-button>
            </div>
            <!-- 저장버튼 클릭시 -->
            <div v-else  style="margin-top:20px;text-align:center">        
                <el-button  type="primary" round  @click="allUpdate" id="myInfoSaveBtn" style="width: 120px;">{{ this.saveBtn}}<!-- 저장 --></el-button>
            </div>
        </div>
    </div>
</template>


<script>
import { myKeepInVerifyAuthInfo, myNodeServerAuthVerify, myNodeServerAuth } from '@/api/myKeepinRequest';
import { mapGetters } from 'vuex'
export default {
	components: {
       AccomoEdit: () => import(/* webpackPrefetch: true */ '@/views/mypage/myCustomerEditTab/AccomoEdit.vue'),
       WorkPlaceEdit: () => import(/* webpackPrefetch: true */ '@/views/mypage/myCustomerEditTab/WorkPlaceEdit.vue'),
       FundEdit: () => import(/* webpackPrefetch: true */ '@/views/mypage/myCustomerEditTab/FundEdit.vue')
	},
      
    computed:{
        ...mapGetters(['getUserId', 'getUnitcode'])
    },
    watch:{
        saveVisible()
        {
            if(this.saveVisible == false)
            {
                this.userInfoTitle = '회원정보'
                this.editWrapDisabled = true;
                this.engNameDisabled = true;           
                this.sendEvent()
          
            }else
            {
                this.userInfoTitle = '정보편집'
                this.editWrapDisabled = false;
                this.engNameDisabled = false;           
                this.sendEvent()
            }    
        }     
    },
	data() {
		return {
            serviceIdData : 'd5abd0d9-4dc1-4a0f-84ce-89df21f46a5e', 
            stateData:'',     //SP 서버에서 생성한 값
            codeData:'',      //인증서버에서 받아온 값
            didData:'',       //사용자의 DID 를 알고 있는 경우 설정
                                //MyKeepin 앱에 did가 다르면 에러코드 '2'반환
            dataHashData:'',  //요청내용에 대한 hash 값
                                //인증 요청에 대한 데이터를 해시한 hex string 값
                                //SP 서버에서 서명 검증시 동일한 방법으로 구해야 함.
                                //null 가능
            vpData:'',
            signatureData:'',
            
            authCi:'',
            mobileNo:'',

            //SP서버 에 보낸 데이터 검증요청 결과값
            dataVerification:'',           

            userInfoTitle: '회원정보',           
            editBtn: '편집',
            saveBtn: '저장',      
            saveVisible: false,       
            activeName: 'first',

            unitKorNm: '',
            userNm: '',
            userBrthDay: '',
            authMoblNo: '',

            topForm: {
                firstName: '',
                lastName: '',
            },

           //MyInfo 정보편집 저장 시 필요한 값
            myInfoArr: {
                //자택정보
                saveAccomoArr: {
                    user_eng_nm: '',
                    user_eng_surnm: '',
                    home_pst_no: '',
                    home_addr: '',
                    home_addr_dtl: '',
                    home_area_code: '',
                    home_phon_no: ''
                },

                //직장정보
                saveWorkPlaceArr: {
                    job_tp: '',
                    job_kind: '',
                    job_position_code: '',
                    ofc_nm: '',
                    ofc_dept_nm: '',
                    ofc_pst_no: '',
                    ofc_addr: '',
                    ofc_addr_dtl: '',
                    ofc_area_code: '',
                    ofc_phon_no: ''
                },

                //자금정보
                saveFundArr: {
                    fund_src_tp: '',
                    fund_src_etc: '',
                    trd_purp_cd: '',
                    trd_purp_etc: ''
                }
            },

            editWrapDisabled: true,
            engNameDisabled: true,      
            
            myKeepinURL:'https://univax.kovex.co.kr/static/browser/mykeepin/editinfopcweb.html',
            authMyKeepinURL:'https://auth.mykeepin.com/didauth/v1/authorize/view'
        }
	},
  
	methods: {
     
        //UUID 생성
        guid() {
            function _s4() {
                return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
            }
            return _s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + _s4() + _s4();
        },  
    
        //마이키핀 로긴 인증요청(get 방식:QR코드 가져옴)
        myKeepInCertWindow(){
            let self = this      
            self.uuid = self.guid();      
        
            const params = {
            service_id : self.serviceIdData,  //코백스 전용 service_id
            redirect_uri : self.myKeepinURL,  //리다이렉트 될 코벡스페이지  
            state : self.uuid,
            type : '4',   // 회원정보편집시 본인인증
            did: '',  //필수아님
            data: ''  //필수아님
            };
            console.log("params:"+JSON.stringify(params));

            const url = self.authMyKeepinURL + '?'

            const MKPN_URL = url + "service_id="+params.service_id+"&redirect_uri="+params.redirect_uri+"&state="+params.state+"&type="+params.type+""
            console.log("MKPN_URL:"+self.MKPN_URL)
            //페이지 전체 마이키핀으로 대체 
            window.location.href = MKPN_URL;       
        }, 

        //리다이렉트로 받은 파라미터 핸들링    
        myKeepInCallback(val) {
            let self = this;          

            console.log('myKeepInCallback:', JSON.stringify(val));   
        
            if(val.state)
            {
                self.stateData = val.state;	
                self.codeData = val.code;
            
                //Verify Auth Info 호출
                self.getMyKeepInVerifiedResult( self.stateData, self.codeData )    
            }      
        },      
        //인증서버에 인증요청
        getMyKeepInVerifiedResult(dt1, dt2){
            let self = this
            myKeepInVerifyAuthInfo({ //-> did vp, signature 값을 받아옴    
                stateData: dt1,
                codeData:  dt2     
            })
            .then(res => {
                console.log("Success:myKeepInVerifyAuthInfo");       
                self.didData = res.did
                self.vpData = res.vp
                self.signatureData = res.signature
                self.stateData = dt1
                self.codeData = dt2
                
            //  console.log("didData : "+  self.didData )
            //  console.log("vpData :"+  self.vpData )
            //  console.log("signatureData :"+  self.signatureData )      
            //  console.log("stateData :"+  self.stateData )
            //  console.log("codeData :"+  self.codeData )

                self.getUserInfoVerifiedResult()
                
                return

            }).catch(err => {
                if(typeof err.status != "undefined" && err.status != '200')
                {
                    console.log(new Error( err.status + ": Request is failed" ));     
                    self.$alert(self.$t('mykeepin_err.' + err.status ), '', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: self.$t('sys_err.a001')
                    });            
                    return         
                }
            })    
        },
        //사용자데이터검증
        getUserInfoVerifiedResult()
        { 
            let self = this
            myNodeServerAuthVerify({   

                didData:  self.didData,   
                stateData: self.stateData,
                typeData: '4',// self.typeData,   
                codeData: self.codeData,
                signatureData:  self.signatureData

                }).then(res => {       
                //데이터 검증 성공
                if(res == true )
                {
                    console.log("Success:myNodeServerAuthVerify");
                    self.dataVerification = true
                    //사용자정보 가져옴
                    self.getUserInfo()
                }
                else{   //데이터 검증 실패
                    self.$alert('인증에 실패했습니다.<br> 마이키핀 계정정보를 다시 확인해주세요.', '', {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: self.$t('sys_err.a001')
                    });
                }  
                return      

            }).catch(err => {
                if(typeof err.status != "undefined" && err.status != '200')
                {
                    console.log(new Error( err.status + ": Request is failed" ));   
                    self.$alert(self.$t('mykeepin_err.' + err.status ), '', {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: self.$t('sys_err.a001')
                    });                      
                    return  
                }   
            })    
        },
    
        //사용자정보 받아옴
        getUserInfo()
        { 
            let self = this
            //사용자정보 받아옴
            myNodeServerAuth({        
            didData:  self.didData,   
            vpData: self.vpData       
            }).then(res => {       
            //데이터 검증 성공        
                self.authCi = res[1].vc.credentialSubject.ci 
                self.mobileNo = res[0].vc.credentialSubject.mobileNumber
                console.log("Success:myNodeServerAuth");
            
                console.log("authCi:" + JSON.stringify( self.authCi));    
                console.log("mobileNo:" + JSON.stringify( self.mobileNo)); 
                
                self.saveVisible = true            

            return  
            }).catch(err => {
            if(typeof err.status != "undefined" && err.status != '200')
            {
                console.log(new Error( err.status + ": Request is failed" ));   
                self.$alert(self.$t('mykeepin_err.' + err.status ), '', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: self.$t('sys_err.a001')
                });      
                return
            }   
            })
        },    

        // //주택 우편번호, 주소 보여주기
        // accomoEditPostNo(data) {
           
        //     if(data != null && data.flag == true)
        //     {
        //         this.$EventBus.$emit('accomoEditPostNo', data);
              
        //     }else{
        //          this.$EventBus.$emit('accomoEditPostNo', '');
           
        //     }
        // },

        // //직장 우편번호, 주소 보여주기
        // workPlaceEditPostNo(data) {
            
        //     if(data != null && data.flag == true)
        //     {
        //         this.$EventBus.$emit('workPlaceEditPostNo', data);
              
        //     }else{
        //         this.$EventBus.$emit('workPlaceEditPostNo', '');
        //     }
        // },
       
        sendEvent() {
            let self = this;
            if(self.activeName == 'first') {
                self.$EventBus.$emit('accomoEdit', self.editWrapDisabled);
            }
            if(self.activeName == 'second') {
                self.$EventBus.$emit('workPlaceEdit', self.editWrapDisabled)
            } 
            if(self.activeName == 'third') {
                self.$EventBus.$emit('fundEdit', self.editWrapDisabled)
            } 
        },

        //저장 버튼
        allUpdate() {
            let self = this;   
        
            if( $.trim($('#myfirstname').val()) == '' ||
                $.trim($('#mylastname').val()) == '' 
            ){

                self.$alert('이름(영문) 입력을 완료해 주세요.', {
                    confirmButtonText: '확인'
                })             
               
            }else{ 
                //각 탭에서 적합성 체크
                self.$EventBus.$emit('accomoVali');
                self.$EventBus.$emit('workPlaceVali');
                self.$EventBus.$emit('fundVali')

                if(     self.resiValiRes == true &&
                        self.workValiRes == true &&
                        self.fundValiRes == true )
                {       
                    try{                    
                        //각 탭에서 저장할 데이터 가져와서 myInfoArr 에 저장
                        self.$EventBus.$emit('accomoSave', 'get');    
                        self.$EventBus.$emit('workPlaceSave', 'get');
                        self.$EventBus.$emit('fundSave', 'get');
                
                        //저장 버튼 누른 후 마이키핀인증 페이지 이동
                        console.log("myInfoArr_allUpdate:" + JSON.stringify(self.myInfoArr))
                        self.$router.push({name: 'myinfochangecertifi', params:{totalArr:self.myInfoArr}});      
                                
                
                    }catch(e){
                        console.log("error: " + JSON.stringify(e))
                    }     
                }    
            }             
        },
        accomoSendVali(data){
            this.resiValiRes = data
            console.log("resiValiRes: " + this.resiValiRes)
        },
        workPlaceSendVali(data){
            this.workValiRes = data
            console.log("workValiRes: " + this.workValiRes)
        },
        fundSendVali(data){
            this.fundValiRes = data
            console.log("fundValiRes: " + this.fundValiRes)           
        },
        accomoSendArr(data){
            if(data)
            {               
                this.myInfoArr.saveAccomoArr = data
                console.log("AccomoSendArr: " + JSON.stringify(this.myInfoArr.saveAccomoArr))
            }        
        },
        workPlaceSendArr(data){
            if(data)
            {              
                this.myInfoArr.saveWorkPlaceArr = data
                console.log("WorkPlaceSendArr: " + JSON.stringify( this.myInfoArr.saveWorkPlaceArr))
            }
        },
        fundSendArr(data){
            if(data)
            {              
                this.myInfoArr.saveFundArr = data
                console.log("FundSendArr: " + JSON.stringify(  this.myInfoArr.saveFundArr))
            } 
        },

        //회원정보 정보조회
        myInfo() { 
            let self = this; 
            self.$store.dispatch('myInfo',{user_id:self.getUserId}).then((data) => { 
                console.log('myInfo Success', data);
                
                //이름 마스킹처리
                // let nm = data.user_nm
                // if (nm.length == 1) {
                // self.userNm = nm;
                // } else if (nm.length == 2) {
                // self.userNm = nm.substring(0,1) + "*";
                // } else if (nm.length > 2 && nm.length < 4 ) {
                // self.userNm = nm.replace(/(.?)?(.{1,2})?(.+)/, '$1*$3')  
                // } else {        
                // self.userNm = nm.substring(0, 1) + "**" + nm.substring(nm.length-1);
                // }    
                self.userNm = data.user_nm        
                console.log("user_nm:" +self.userNm )
                self.unitKorNm = data.unit_kor_nm              
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

                console.log("unitKorNm: " + self.unitKorNm)
                console.log("userNm: " + self.userNm)
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
        }
    },

    mounted(){
        let self = this;     
        
        if (self.$store.getters.isSocketConnected) {
            self.myInfo();
        } else {
            self.$EventBus.$on('socketConnected', self.myInfo);
        }

        const params = new URLSearchParams(location.hash.substring(15));
        const stateVal = params.get("state");
        const codeVal = params.get("code");

        console.log('myinfo_state:', stateVal);
        console.log('myinfo_code:', codeVal);

        const data = {
                state:stateVal,
                code:codeVal
        }    

        if(data.state!= null)
        {
            self.myKeepInCallback(data)	  
        }

        self.$EventBus.$emit('pc-navi', [
            { label: self.$t('header.me'), target: 'mypageInfo' },
            { label: self.$t('mypage.a001'), target: null }
        ]);

        self.$EventBus.$on('langChange', () => {
            self.$EventBus.$emit('pc-navi', [
                { label: self.$t('header.me'), target: 'mypageInfo' },
                { label: self.$t('mypage.a001'), target: null }
            ]);
        });

    },
    created() {

       // this.$EventBus.$on('accomoEditFlag', this.accomoEditPostNo);
       // this.$EventBus.$on('workPlaceEditFlag', this.workPlaceEditPostNo);
        this.$EventBus.$on('accomoSendArr', this.accomoSendArr);    
        this.$EventBus.$on('workPlaceSendArr', this.workPlaceSendArr);    
        this.$EventBus.$on('fundSendArr', this.fundSendArr);   
        this.$EventBus.$on('accomoSendVali', this.accomoSendVali);    
        this.$EventBus.$on('workPlaceSendVali', this.workPlaceSendVali);    
        this.$EventBus.$on('fundSendVali', this.fundSendVali);     
    },
    beforeDestroy(){
     
       // this.$EventBus.$off("accomoEditFlag",this.accomoEditPostNo);
      //  this.$EventBus.$off("workPlaceEditFlag",this.workPlaceEditPostNo);         
        this.$EventBus.$off('accomoSendArr', this.accomoSendArr);    
        this.$EventBus.$off('workPlaceSendArr', this.workPlaceSendArr);    
        this.$EventBus.$off('fundSendArr', this.fundSendArr);    
        this.$EventBus.$off('accomoSendVali', this.accomoSendVali);    
        this.$EventBus.$off('workPlaceSendVali', this.workPlaceSendVali);    
        this.$EventBus.$off('fundSendVali', this.fundSendVali);  

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