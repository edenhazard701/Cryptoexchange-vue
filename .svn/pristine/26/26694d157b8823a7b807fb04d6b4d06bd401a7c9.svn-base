<template>
    <div id="container" style="height:100%; padding-bottom:15px;">
        <el-form ref="homeAddrForm" label-position="left" :model="homeAddrForm" label-width="100px" :rule="rule" style="margin:20px 10px 0 10px"> 
                           
            <el-form-item label="우편번호">
                <el-col :span="11" style="margin-left:0px">
                    <el-input type="tel" auto-complete="off" id="mAccomoEditZipCode" v-model="homeAddrForm.zipCode" maxlength="10" disabled></el-input>
                </el-col>      
                <el-col :span="2"></el-col>     
                <el-col :span="11" style="text-align:right">
                    <el-button style="background-color:#3f50b4;color:white;width:100px;height:100%;"  autofocus="true"  @click.native.prevent="openAccomoEditZipCode" :disabled="editDisabled">우편번호</el-button>
                </el-col>
            </el-form-item>    
                    
            <el-form-item  label="거주지 주소">
                <div style="margin-left:0px">
                    <el-input type="text" placeholder="거주지주소" auto-complete="off" v-model="homeAddrForm.addrUpdate1" maxlength="50" disabled></el-input>
                </div>
            </el-form-item>    
            
            <el-form-item label="나머지 주소">
                <div style="margin-left:0px">
                    <el-input type="text" placeholder="나머지주소" id="accomo_addr2_input" auto-complete="off" v-model="homeAddrForm.addrUpdate2" maxlength="50" :disabled="editDisabled"></el-input>
                </div>
            </el-form-item>                     

            <el-form-item label="자택 전화번호">
                <el-row :gutter="10">
                    <el-col :span="6">
                        <el-select v-model="telOption"
                         :disabled="editDisabled"
                        style="margin-top:5px">           
                            <el-option
                            v-for="tel in telOptions"
                            :key="tel.value"
                            :label="tel.label"
                            :value="tel.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-input type="number"  
                                    pattern="\d*" 
                                    maxlength="4"  max="9999"
                                    auto-complete="off"                                        
                                    @keydown.native="homeNo1Keydown"                       
                                    v-model="homeAddrForm.homePhonNo1"      
                                    :disabled="editDisabled"                                
                                    id="accomo_homePhonNo1_input">
                        </el-input>
                    </el-col>
                
                    <el-col :span="8">
                        <el-input type="number"  
                                    pattern="\d*" 
                                    maxlength="4"  max="9999"
                                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"                               
                                    auto-complete="off"   
                                    v-model="homeAddrForm.homePhonNo2"     
                                    :disabled="editDisabled"                                 
                                    id="accomo_homePhonNo2_input">
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>

        </el-form>  
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
export default {

    computed:{
        ...mapGetters({
            getUserId : 'getUserId'
        })     
    },
	data() {
            const validatePhoneNo1 = (rule, value, callback) => {     
                let validateValue = value.toString().replace(/,/g,"")    
                console.log("validatePhoneNo1.length "+ validateValue.length )   
                if( validateValue.length < 3){
                this.$alert('휴대폰 번호 형식에 맞지 않습니다.', '', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: this.$t('sys_err.a001')
                });    
                }else{
                callback();
                }	
            }

            const validatePhoneNo2 = (rule, value, callback) => {     
                let validateValue = value.toString().replace(/,/g,"")    
                console.log("validatePhoneNo2.length "+ validateValue.length )   
                if(  validateValue.length < 4){
                this.$alert('휴대폰 번호 형식에 맞지 않습니다.', '', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: this.$t('sys_err.a001')
                });    
                }else{
                callback();
                }	
            }   

		return {
            dataDivName: 'DataDIV', //2021.08.03 by lyk - 모바일 앱 우편번호 설정
            accomoPostNoVisible :false,

            homeAddrForm: {
                zipCode: '',
                homePhonNo1: '',
                homePhonNo2: '',
                addrUpdate1: '',
                addrUpdate2: ''
            },

            rule: {
                homePhonNo1: [    
                    // { required: true, min:3, pattern:/(\d{3,4})/,message: '형식에 맞지 않습니다.', trigger: 'blur' },
                    { validator: validatePhoneNo1, trigger: 'blur'}                     
                ],           
                homePhonNo2: [               
                // { required: true, min:4 ,pattern:/(\d{4})/ ,message: '형식에 맞지 않습니다.', trigger: 'blur' },
                    { validator: validatePhoneNo2, trigger: 'blur'}    
                ]
            },

            telOptions: [
            {
                value: '02',    // 02 서울특별시
                label: '02'
            },
            {
                value: '031',   // 031 경기도
                label: '031'
            },
            {
                value: '032',   // 032 인천광역시
                label: '032'
            },
            {
                value: '033',   // 033 강원도
                label: '033'
            },
            {
                value: '041',   // 041 충청남도
                label: '041'
            },
            {
                value: '042',   // 042 대전광역시
                label: '042'
            },
            {
                value: '043',   // 043 충청북도
                label: '043'
            },
            {
                value: '044',   // 044[c] 세종특별자치시
                label: '044'
            },
            {
                value: '050',   
                label: '050'
            },
            {
                value: '051',   // 051 부산광역시
                label: '051'
            },
            {
                value: '052',   // 052 울산광역시
                label: '052'
            },
            {
                value: '053',   // 053 대구광역시
                label: '053'
            },
            {
                value: '054',   // 054 경상북도
                label: '054'
            },
            {
                value: '055',   // 055 경상남도
                label: '055'
            },
            {
                value: '061',   // 061 전라남도
                label: '061'
            },
            {
                value: '062',   // 062 광주광역시
                label: '062'
            },
            {
                value: '063',   // 063 전라북도
                label: '063'
            },
            {
                value: '064',   // 064 제주특별자치도
                label: '064'
            },
            {
                value: '070',
                label: '070'
            },
            {
                value: '080',
                label: '080'      
            }, 
            {
                value: '0130',
                label: '0130',
            }, 
            {
                value: '0303',
                label: '0303',
            }, 
            {
                value: '0502',
                label: '0502'
            }, 
            {
                value: '0503',
                label: '0503',
            }, 
            {
                value: '0504',
                label: '0504' 
            }, 
            {
                value: '0506',
                label: '0506',
            }, 
            {
                value: '0507',
                label: '0507',           
            }, 
            {
                value: '012',
                label: '012' 
            }, 
            {
                value: '059',
                label: '059'
            }, 
            {
                value: '010',
                label: '010',
            }, 
            {
                value: '011',
                label: '011'
            }, 
            {
                value: '016',
                label: '016',
            }, 
            {
                value: '017',
                label: '017'    
            }, 
            {
                value: '018',
                label: '018'
            }, 
            {
                value: '019',
                label: '019',       
            }],
            telOption: '02',

            from: '',

            resiValiRes: false,

            saveAccomoArr: {
                user_eng_nm: '',
                user_eng_surnm: '',
                home_pst_no: '',
                home_addr: '',
                home_addr_dtl: '',
                home_area_code: '',
                home_phon_no: ''
            },
            editDisabled: true
        };

	},
    
	methods: {

        homeNo1Keydown(e) {
            let accomoNo = this.homeAddrForm.homePhonNo1
            if(accomoNo.toString().length == 4 && e.keyCode != 8) { //backspace 키 입력되도 다음 입력필드로 포커스 넘어가는 현상 방지
                document.getElementById("accomo_homePhonNo2_input").focus();
            }
        },
      

        // 우편번호 조회
        openAccomoEditZipCode() {
            let self = this;
        
            self.homeAddrForm.zipCode = ''
            self.homeAddrForm.addrUpdate1 = ''
           
            self.from = 'mAccomoEdit'
            
            //2021.08.03 by lyk - 모바일 앱 우편번호 설정 >>
            // self.$EventBus.$emit('zipCode', self.from)
            cordova.exec(null,null,"AppPlugin","loadWebView",[0,0,1,1,'','/static/browser/postCode.html']);
            //2021.08.03 by lyk - 모바일 앱 우편번호 설정 <<
        },

        //2021.08.03 by lyk - 모바일 앱 우편번호 설정 - 우편번호 검색 후 선택 정보 받는 함수 >>
        onPostCodeRecvData(arg1, arg2, arg3) {
            let self = this

            // alert("MyKeepinApp.onMyKeepinRecvData:"+state+","+type+","+code);
            console.log("AccomoEdit onDataRecvData:", arg1+"==="+arg2+"==="+arg3) //data.zonecode, data.jibunAddress, data.buildingName
            //우편번호, 주소 처리 
            self.homeAddrForm.zipCode = arg1
            self.homeAddrForm.addrUpdate1 = arg2
        
        },
        //2021.08.03 by lyk - 모바일 앱 우편번호 설정 - 우편번호 검색 후 선택 정보 받는 함수 <<

        // 우편번호, 주소 보여주기
        mAccomoEditPostNo(data) {
            console.log("mAccomoEditPostNo:", data)
            if(data != null && data.flag == true)
            {
                this.homeAddrForm.zipCode = data.zipCode
                this.homeAddrForm.addrUpdate1 = data.addrUpdate1
            }else{
               
                this.homeAddrForm.zipCode = ''
                this.homeAddrForm.addrUpdate1 = ''
            }
            this.homeAddrForm.addrUpdate2 = '';
        },
        mAccomoEdit(data){
            if(data == true)  //비활성화
            {
                this.editDisabled = true
            }
            else  //활성화
            {
                this.editDisabled = false
            }
            console.log("mAccomoEdit_disabled:" +this.editDisabled )                    
            DataManager.setDelegator(this); //2021.08.03 by lyk - 모바일 앱 우편번호 설정 : delegator 설정
        },
        mAccomoSave(data){          
          
            if(data == 'get')
            {
                this.saveAccomoArr.user_eng_nm   = $.trim($('#firstnameEdit').val())
                this.saveAccomoArr.user_eng_surnm = $.trim($('#lastnameEdit').val())
                this.saveAccomoArr.home_pst_no   = this.homeAddrForm.zipCode
                this.saveAccomoArr.home_addr     = this.homeAddrForm.addrUpdate1        
                this.saveAccomoArr.home_addr_dtl = this.homeAddrForm.addrUpdate2      
                this.saveAccomoArr.home_area_code = this.telOption 
                this.saveAccomoArr.home_phon_no  = this.homeAddrForm.homePhonNo1 + this.homeAddrForm.homePhonNo2  
               // console.log("saveAccomoArr:"+  JSON.stringify(this.saveAccomoArr))
                this.$EventBus.$emit('mAccomoSendArr', this.saveAccomoArr);
             
            }else
            {                 
                this.$EventBus.$emit('mAccomoSendArr', '');
            }     
        },
        residenceUpdate(){
            let self = this;                
            if( $.trim($('#mAccomoEditZipCode').val()) == ''){

                self.$alert('자택정보 입력을 완료해 주세요.', {
                    confirmButtonText: '확인'
                })
                self.resiValiRes = false;
            }  else {
                self.resiValiRes = true;
            }

            self.$EventBus.$emit('mAccomoSendVali',  self.resiValiRes);
        
        },
        //자택정보 조회
        residenceLook() {
            let self = this;

            self.$socket.sendProcessByName('ac507', (queryData) => {
                let block = queryData.getBlockData('InBlock1')[0];
                block['user_id'] = self.getUserId             
                }, function (queryData) {
                if (queryData != null) {      
                    const res = queryData['queryObj']['OutBlock1'][0]
                    console.log("residenceLook_res:"+JSON.stringify(res))
                    let homeNo = ''     
                    self.homeAddrForm.zipCode = res.home_pst_no;
                    self.homeAddrForm.addrUpdate1 = res.home_addr;
                    self.homeAddrForm.addrUpdate2 = res.home_addr_dtl;
                    self.telOption = res.home_area_code;
                    if(!isNaN(res.home_phon_no))  homeNo = res.home_phon_no
                    if(homeNo)
                    {
                        self.homeAddrForm.homePhonNo1 = homeNo.substr(0, 4);
                        self.homeAddrForm.homePhonNo2 = homeNo.substr(4);
                    }
                   
                } else {
                    // 전문 에러 언어팩 적용
                    const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                    if (errorData.trName != "ac507") return
                    console.log("CODE:" + errorData.errCode);  
                }
            })
        },             
    },   

    mounted(){
        let self = this;
        let state = this.$route.params.state
      
        if( state == 'saved' || 
            self.$store.state.user.myInfo.user_eng_nm == '')
        {
            if (self.$store.getters.isSocketConnected) {
                self.residenceLook();
            } else {
                self.$EventBus.$on('socketConnected', self.residenceLook);
            }
        }else
        {
            //백버튼으로 접근시 내부저장소에서 데이터 가져옴
            self.homeAddrForm.userEngNm      =   self.$store.state.user.myInfo.user_eng_nm   
            self.homeAddrForm.userEngSurnm  =   self.$store.state.user.myInfo.user_eng_surnm    
            self.homeAddrForm.zipCode      =   self.$store.state.user.myInfo.home_pst_no   
            self.homeAddrForm.addrUpdate1  =   self.$store.state.user.myInfo.home_addr     
            self.homeAddrForm.addrUpdate2  =   self.$store.state.user.myInfo.home_addr_dtl 
            self.homeAddrForm.homePhonNo1   =   self.$store.state.user.myInfo.home_phon_no1 
            self.homeAddrForm.homePhonNo2   =   self.$store.state.user.myInfo.home_phon_no2 
            if(self.$store.state.user.myInfo.home_area_code)
            {
                self.telOption =  self.$store.state.user.myInfo.home_area_code
            }else
            {
                self.telOption  = '02'
            } 
            ///////////////////////////////////////////////////////////////////////////////////
        }
    }, 

    created() {
        this.$EventBus.$on('mAccomoEdit', this.mAccomoEdit);
        this.$EventBus.$on('mAccomoEditPostNo', this.mAccomoEditPostNo);
        this.$EventBus.$on('mAccomoSave', this.mAccomoSave);           
        this.$EventBus.$on('mAccomoVali', this.residenceUpdate);               
          

        //탭의 디폴트 값 설정 
        DataManager.setDelegator(this); //2021.08.03 by lyk - 모바일 앱 우편번호 설정 : delegator 설정 
    },   
    beforeDestroy() {
        this.$EventBus.$off('mAccomoEdit', this.mAccomoEdit);
        this.$EventBus.$off('mAccomoEditPostNo', this.mAccomoEditPostNo);
        this.$EventBus.$off('mAccomoSave', this.mAccomoSave);    
        this.$EventBus.$off('socketConnected', this.residenceLook);     
        this.$EventBus.$off('mAccomoVali', this.residenceUpdate);               
 
        DataManager.removeDelegator(this); //2021.08.03 by lyk - 모바일 앱 우편번호 설정 : delegator 설정
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

</style>