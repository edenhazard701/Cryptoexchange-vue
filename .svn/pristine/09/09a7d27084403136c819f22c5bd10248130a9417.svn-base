<template>
    <section>
        <el-form ref="homeAddrForm" :model="homeAddrForm" :rules="rule" label-position="left" label-width="120px" style="margin-top:20px">        
            <div>               
                <el-form-item label="우편번호">
                    <el-col :span="10" style="margin-left:0px; margin-top:5px">
                        <el-input type="tel" auto-complete="off" id="accomoMyInfoZipCode" v-model="homeAddrForm.zipCode" maxlength="10" style="width:200px" disabled></el-input>
                    </el-col>     
                    <el-col :span="14" style="text-align:left">
                        <el-button style="background-color:#3f50b4;color:white;width:100px;height:100%;"  autofocus="true"  @click.native.prevent="openAccomoInfoZipCode">우편번호</el-button>
                    </el-col>
                </el-form-item>    
            </div> 
            <div>  
                <el-form-item label="거주지 주소">
                    <div style="margin-left:0px">
                        <el-input type="text" placeholder="거주지주소" auto-complete="off" v-model="homeAddrForm.addrUpdate1" maxlength="50" disabled></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="나머지 주소">
                    <div style="margin-left:0px">
                        <el-input type="text" placeholder="나머지주소" id="my_homeInfo_input" auto-complete="off" v-model="homeAddrForm.addrUpdate2" maxlength="50"></el-input>
                    </div>
                </el-form-item>  
            </div>

             <!-- 자택 전화번호 수정 -->   
             <div class="cell">
                    <span class="title">{{'자택 전화번호'}}<!-- 자택 전화번호 --></span>
                    <span class="value" style="margin-left:90px">
                    <el-select  v-model="telOption" 
                                style="width:90px"
                                >           
                           <el-option
                                v-for="tel in telOptions"
                                :key="tel.value"
                                :label="tel.label"
                                :value="tel.value">
                            </el-option>
                    </el-select>     
                    </span>                
                    <span class="value">
                        <el-input type="text"  
                                    pattern="\d*" 
                                    maxlength="4"  max="9999"
                                    auto-complete="off"                                        
                                    @keydown.native="homeNo1Keydown"          
                                    v-model="homeAddrForm.homePhonNo1"   
                                    style="width:120px"                                   
                                >
                        </el-input>
                    </span>
                    <span class="value">
                        <el-input type="text"  
                                    pattern="\d*" 
                                    maxlength="4"  max="9999"    
                                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"                        
                                    auto-complete="off"                                        
                                    @keydown.native="homeNo2Keydown" 
                                    v-model="homeAddrForm.homePhonNo2"    
                                    style="width:120px"                                  
                                    id="accomo_homeNo2_input">
                        </el-input> 
                    </span>    
                </div>          

        </el-form>

        <div class="btm-buttons">
            <el-button type="primary" style="width: 120px;" @click="residenceUpdate" id="acomo_next_btn">{{'다음'}}</el-button>
        </div>

    </section>
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
            if(validateValue.length < 3) {
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
            if( validateValue.length < 4){
                this.$alert('휴대폰 번호 형식에 맞지 않습니다.', '', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: this.$t('sys_err.a001')
                });      
            }else{
                callback();
            }	
        }

		return {

            homeAddrForm: {
                zipCode: '',
                homePhonNo1: '',
                homePhonNo2: '',
                addrUpdate1: '',
                addrUpdate2: ''
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
            telOption: '',
            from: '',
            
            rule: {
                homePhonNo1: [                
                //     { required: true, min:3, pattern:/(\d{3,4})/,message: '형식에 맞지 않습니다.', trigger: 'blur' }
                    { validator: validatePhoneNo1, trigger: 'blur'}           
                ],           
                homePhonNo2: [               
                //     { required: true, min:4 ,pattern:/(\d{4})/ ,message: '형식에 맞지 않습니다.', trigger: 'blur' }
                    { validator: validatePhoneNo2, trigger: 'blur'}           
                ]
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
            }        
        };
	},
   
	methods: {
        //첫번째 번호에 4자리 채우면 다음 인풋박스로 포커스 넘김
        homeNo1Keydown(e) 
        {    
            let phoneNo1 = this.homeAddrForm.homePhonNo1
            console.log("phoneNo1.length: " + phoneNo1.toString().length)
            if(phoneNo1.toString().length == 4 && e.keyCode != 8) 
             //backspace 키 입력되도 다음 입력필드로 포커스 넘어가는 현상 방지
            {
                document.getElementById("accomo_homeNo2_input").focus();       
            }
        },
        
        homeNo2Keydown(e) 
        {
            let phoneNo2 = this.homeAddrForm.homePhonNo2
            console.log("phoneNo2.length: " + phoneNo2.toString().length)
            if(phoneNo2.toString().length == 4 && e.keyCode != 8)          
            { 
                document.getElementById("acomo_next_btn").focus();     
            }
        },
  
        //우편번호 조회
        openAccomoInfoZipCode() {
            let self = this;
            let width = 400; //팝업 너비
            let height = 500; //팝업 높이

            new daum.Postcode({
                oncomplete: function(data) {
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    let roadAddr = data.roadAddress; // 도로명 주소 변수
                    let extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraRoadAddr !== ''){
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    self.homeAddrForm.zipCode = data.zonecode;
                    self.homeAddrForm.addrUpdate1 = roadAddr;
                    self.homeAddrForm.addrUpdate2 = '';
                },
                //생성자의 크기 값을 명시적으로 지정해야 함
                width : width, 
                height : height
            }).open({
                //팝업 가운데 정렬
                left: (window.screen.width / 2) - (width / 2),
                top: (window.screen.height / 2) - (height / 2)
            })
        },

        AccomoInfo(){
            console.log("AccomoInfo")
         
        },   
        
        accomoSave(){          
         
            console.log("firstnameMyInfo:"+  $.trim($('#firstnameMyInfo').val()))
            console.log("lastnameMyInfo:"+  $.trim($('#mylastname').val()))
            this.myInfoArr.saveAccomoArr.user_eng_nm   = $.trim($('#firstnameMyInfo').val())
            this.myInfoArr.saveAccomoArr.user_eng_surnm = $.trim($('#lastnameMyInfo').val())
            this.myInfoArr.saveAccomoArr.home_pst_no   = this.homeAddrForm.zipCode
            this.myInfoArr.saveAccomoArr.home_addr     = this.homeAddrForm.addrUpdate1        
            this.myInfoArr.saveAccomoArr.home_addr_dtl = this.homeAddrForm.addrUpdate2      
            this.myInfoArr.saveAccomoArr.home_area_code = this.telOption 
            this.myInfoArr.saveAccomoArr.home_phon_no  = this.homeAddrForm.homePhonNo1 + this.homeAddrForm.homePhonNo2
            console.log("myInfoArr1:"+  JSON.stringify(this.myInfoArr))
            this.$EventBus.$emit('accomoSendArr', this.myInfoArr);
            //고객자택정보입력 성공시 이동
            this.$EventBus.$emit('mySavedLvl1');    
        },       

        // //고객거주정보 편집        
        // updateResidenceInfo()
        // {
        //     let self = this;
        //     let phoneNo1 = self.homeAddrForm.homePhonNo1
        //     let phoneNo2 = self.homeAddrForm.homePhonNo2        
        //     let accomoPhoneNo =  phoneNo1 +  phoneNo2         
        //     self.$socket.sendProcessByName('ac117', (queryData) => {
        //         let block               = queryData.getBlockData('InBlock1')[0];
        //         block['user_id']        = self.getUserId       
        //         block['user_eng_nm']    = $('#firstnameMyInfo').val()
        //         block['user_eng_surnm'] = $('#lastnameMyInfo').val()       
        //         block['home_pst_no']    = self.homeAddrForm.zipCode
        //         block['home_addr']      = self.homeAddrForm.addrUpdate1        
        //         block['home_addr_dtl']  = self.homeAddrForm.addrUpdate2      
        //         block['home_area_code'] = self.telOption 
        //         block['home_phon_no']   = accomoPhoneNo

        //         console.log("ac117_input:" + JSON.stringify(block))
        //     }, function (queryData) {
        //         if (queryData != null) {
        //             console.log("accomo saved success")

        //             let result = queryData['queryObj']['OutBlock1'][0]; 
        //             //고객자택정보입력 성공시 이동
        //             self.$EventBus.$emit('mySavedLvl1');
                    
        //         } else {
        //             // 전문 에러 언어팩 적용
        //             const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
        //             if (errorData.trName != "ac117") return

        //             self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
        //                 dangerouslyUseHTMLString: true,
        //                 confirmButtonText: self.$t('sys_err.a001')
        //             });
        //         }
        //     })     
        // },
     
        residenceUpdate() {
            let self = this;

            if( $.trim($('#firstnameMyInfo').val()) == '' ||
                $.trim($('#lastnameMyInfo').val()) == '' 
            ){

                self.$alert('이름(영문) 입력을 완료해 주세요.', {
                    confirmButtonText: '확인'
                })                   
            }
            else if( $.trim($('#accomoMyInfoZipCode').val()) == ''){

                self.$alert('자택정보 입력을 완료해 주세요.', {
                    confirmButtonText: '확인'
                })               
            }  
            else
            {
                self.accomoSave()
                //self.updateResidenceInfo()
            }
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
                        console.log("homeNo1:"+JSON.stringify( self.homeAddrForm.homePhonNo1))
                        console.log("homeNo2:"+JSON.stringify( self.homeAddrForm.homePhonNo2))
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
        if (self.$store.getters.isSocketConnected) {
            self.residenceLook();
        } else {
            self.$EventBus.$on('socketConnected', self.residenceLook);
        }    
    },    
    created() {
        this.$EventBus.$on('AccomoInfo', this.AccomoInfo);        
    },   
    beforeDestroy() {
        this.$EventBus.$off('AccomoInfo', this.AccomoInfo);       
        this.$EventBus.$off('socketConnected', this.residenceLook);
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