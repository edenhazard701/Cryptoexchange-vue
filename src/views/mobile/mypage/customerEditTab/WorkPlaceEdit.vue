<template>
    <div id="container" style="height:100%; padding-bottom:15px;">
        <el-form ref="jobAddrForm" label-position="left" :model="jobAddrForm" label-width="100px" :rules="rule" style="margin:20px 10px 0 10px" id="tab-content current">
            <!-- 직업 선택 -->
            <div class="title">  
                <el-form-item label="직업구분1차">              
                    <el-select                      
                        v-model="jobTp"   
                        @change="onJobTpChange"        
                        :disabled="jobTpDisabled"  
                        style="margin-top:5px;width:100%"                                        
                    >           
                        <el-option
                        v-for="item in jobTps"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>    
            </div>
            <!-- 업종 선택 -->
            <!-- 직장인 선택 -->
            <div v-if="jobKindOfficeWorker2Visible"> 
                <el-form-item  label="직업구분2차">              
                    <el-select                      
                        v-model="jobKindOfficeWorker2"                    
                        @change="onJobKindOfficeWorker2Change"                      
                        style="margin-top:5px;width:100%"    
                        :disabled="jobKindOfficeWorker2Disabled"                                      
                    >           
                        <el-option
                        v-for="item in jobKindsOfficeWorkers2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>    
            </div>
            <!--  무직 선택 -->
            <div v-else-if="jobKindInoccupation2Visible">  
                <el-form-item label="무직선택">              
                    <el-select                      
                         v-model="jobKindInoccupation2"                      
                        @change="onJobKindInoccupation2Change"     
                        :disabled="editDisabled"                       
                        style="margin-top:5px;width:100%"                                        
                    >           
                        <el-option
                        v-for="item in jobKindsInoccupation2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>    
            </div>
            <!-- 직위선택 -->
            <div v-if="jobPositionFlag" style="width:100%">
                <el-form-item label="직위">              
                    <el-select                      
                        v-model="jobPosition"
                        :disabled="jobPositionDisabled"   
                        style="margin-top:5px;width:100%" 
                        id="mJobPositionEdit"                                        
                    >           
                        <el-option
                        v-for="item in jobPositions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item> 
            </div>
            <!-- 직장명/부서명 입력 -->    
            <div  v-if="jobFlag">    
               
                <el-form-item label="직장명" prop="jobPlaceNm">
                    <div style="margin-left:0px">
                    <el-input type="text" 
                        placeholder="직장명"                      
                        autofocus="true" 
                        auto-complete="off"  
                        v-model="jobAddrForm.jobPlaceNm" 
                        maxlength="20"
                        :disabled="editDisabled"         
                        id="mJobNameEdit">
                    </el-input>
                    </div>
                </el-form-item>    
                
                <el-form-item label="부서명" prop="jobTeamNm">
                    <div style="margin-left:0px">
                        <el-input type="text" 
                            placeholder="부서명"                           
                            auto-complete="off" 
                            v-model="jobAddrForm.jobTeamNm" 
                            maxlength="20"
                            :disabled="editDisabled"         
                            id="mDepartmentNameEdit">
                        </el-input>
                    </div>
                </el-form-item>                  
           
                <el-form-item label="우편번호">
                    <el-col :span="11" style="margin-left:0px">
                        <el-input type="tel" auto-complete="off" id="mWorkZipcodeEdit" v-model="jobAddrForm.zipCode" maxlength="10" disabled></el-input>
                    </el-col>    
                    <el-col :span="2"></el-col>                           
                    <el-col :span="11" style="text-align:right">
                    <el-button style="background-color:#3f50b4;color:white;width:100px;height:100%;" autofocus="true"  @click.native.prevent="openWorkZipCode" :disabled="editDisabled">우편번호</el-button>
                    </el-col>
                </el-form-item>    
            
            <!-- 우편번호 검색 후 -->
                        
                <el-form-item  label="직장주소">
                    <div style="margin-left:0px">
                    <el-input type="text" placeholder="직장주소" auto-complete="off" v-model="jobAddrForm.jobAddrUpdate1" maxlength="50" disabled></el-input>
                    </div>
                </el-form-item>    
            
                <el-form-item label="나머지주소">
                    <div style="margin-left:0px">
                    <el-input type="text" placeholder="나머지주소" id="mWork_addr2_input" auto-complete="off" v-model="jobAddrForm.jobAddrUpdate2" maxlength="50" :disabled="editDisabled"></el-input>
                    </div>
                </el-form-item>                      
            

                <el-form-item label="직장 전화번호">
                    <el-row :gutter="10">
                        <el-col :span="6">
                            <el-select v-model="regionNo"
                            :disabled="editDisabled"     
                            style="margin-top:5px">           
                                <el-option
                                v-for="item in regionNumbers"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-input type="number"  
                                        pattern="\d*" 
                                        maxlength="4"  max="9999"
                                        auto-complete="off"                                        
                                        @keydown.native="workNo1Keydown"                       
                                        v-model="jobAddrForm.jobNo1"    
                                        :disabled="editDisabled"                                       
                                        id="m_jobNo1_input">
                            </el-input>
                        </el-col>
                    
                        <el-col :span="8">
                            <el-input type="number"  
                                        pattern="\d*" 
                                        maxlength="4"  max="9999"
                                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"                               
                                        auto-complete="off"      
                                        v-model="jobAddrForm.jobNo2"      
                                        :disabled="editDisabled"                                     
                                        id="m_jobNo2_input">
                            </el-input>
                        </el-col>
                    </el-row>
                 </el-form-item>    
            </div>           
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
            postNoVisible:false,
            from: '',

            jobTpPlaceHolder:'직업 선택',
            jobKindPlaceHolder:'업종 선택',
            jobPostionPlaceHolder:'직위 선택',

            jobKindOfficeWorker2Visible :true,
            jobKindInoccupation2Visible :false,

            jobTpDisabled:true,     //직장구분1차
            jobKindOfficeWorker2Disabled:true, //직장구분2차
            jobPositionDisabled:true,  //직위구분            
            
            jobPositionFlag:true,
            jobFlag:true,            

            jobTps: [
            {
                value: '01',
                label: '직장인'
            },
            {
                value: '03',
                label: '무직'
            },
            {
                value: '91',
                label: '기타'
            }],
            jobTp: '01',     
                   
            jobKindsOfficeWorkers2: [{       
                value: '01',
                label: '농림/축수산/광업 근로자'
                }, {
                value: '02',
                label: '제조/건설/서비스업 근로자',
                }, {
                value: '03',
                label: '개인사업자/자영업자'
                }, {
                value: '04',
                label: '자유직/프리랜서',
                }, {
                value: '05',
                label: '일반 전문직'    
                }, {
                value: '06',
                label: '기타 회사원'    
                }, {
                value: '07',
                label: '공무원'
                }, {
                value: '08',
                label: '의료/법조/금융업 근로자',
                }, {
                value: '09',
                label: '카지노/대부/귀금속/환전업 근로자'
                }, {
                value: '10',
                label: '가상통화거래업 근로자'
                }, {
                value: '11',
                label: '비금융전문직',
                }, {
                value: '12',
                label: '종교인'
                }, {
                value: '13',
                label: '군인'       
            }],
            jobKindOfficeWorker2:'',

            jobKindsInoccupation2: [
            {
                value: '14',
                label: '전업주부'
            }, {
                value: '15',
                label: '무직'
            }, {
                value: '16',
                label: '학생',           
            }],
            jobKindInoccupation2:'',

            jobPositions: [
            {
                value: '01',
                label: '사원'
            }, 
            {
                value: '02',
                label: '대리'
            },{
                value: '03',
                label: '과장'
            },
            {
                value: '04',
                label: '차장'
            },
            {
                value: '05',
                label: '부장'
            },
            {
                value: '06',
                label: '임원'
            }, 
            {
                value: '07',
                label: '사장'    
            }],    
            jobPosition: '',

            regionNumbers: [{
            value: '012',
            label: '012'
            }, {
            value: '059',
            label: '059'
            }, {
            value: '010',
            label: '010',
            }, {
            value: '011',
            label: '011'
            }, {
            value: '016',
            label: '016',
            }, {
            value: '017',
            label: '017'    
            }, {
            value: '018',
            label: '018'
            }, {
            value: '019',
            label: '019',
            }, {
            value: '02',
            label: '02'
            }, {
            value: '031',
            label: '031'
            }, {
            value: '032',
            label: '032',
            }, {
            value: '033',
            label: '033'
            }, {
            value: '041',
            label: '041',
            }, {
            value: '043',
            label: '043'    
            }, {
            value: '044',
            label: '044'
            }, {
            value: '050',
            label: '050',
            }, {
            value: '051',
            label: '051',
            }, {
            value: '052',
            label: '052'
            }, {
            value: '053',
            label: '053',
            }, {
            value: '054',
            label: '054' 
            }, {
            value: '055',
            label: '055',
            }, {
            value: '061',
            label: '061',
            }, {
            value: '062',
            label: '062'
            }, {
            value: '063',
            label: '063',
            }, {
            value: '064',
            label: '064' 
            }, {
            value: '070',
            label: '070',
            }, {
            value: '080',
            label: '080'      
            }, {
            value: '0130',
            label: '0130',
            }, {
            value: '0303',
            label: '0303',
            }, {
            value: '0502',
            label: '0502'
            }, {
            value: '0503',
            label: '0503',
            }, {
            value: '0504',
            label: '0504' 
            }, {
            value: '0506',
            label: '0506',
            }, {
            value: '0507',
            label: '0507', 
            }], 
            regionNo:'02',
  
            jobAddrForm: {
                zipCode: '',
                jobPlaceNm: '',
                jobTeamNm: '',
                jobAddrUpdate1: '',
                jobAddrUpdate2: '',
                jobNo1: '',
                jobNo2: ''
            },
            rule: {
                jobNo1: [               
                  // { required: true, min:3, pattern:/(\d{3,4})/,message: '형식에 맞지 않습니다.', trigger: 'blur' },
                   { validator: validatePhoneNo1, trigger: 'blur'}        
                ],
                jobNo2: [               
               // { required: true, min:4, pattern:/(\d{3,4})/,message: '형식에 맞지 않습니다.', trigger: 'blur' },
                   { validator: validatePhoneNo2, trigger: 'blur'}        
                ]
            },

            workValiRes:false,
        
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
            editDisabled: true          
        };

	},
   
	methods: {
    
        workNo1Keydown(e) {
            let workNo = this.jobAddrForm.jobNo1
            if(workNo.toString().length == 4 && e.keyCode != 8) { //backspace 키 입력되도 다음 입력필드로 포커스 넘어가는 현상 방지
                document.getElementById("m_jobNo2_input").focus();
            }
        },     
      
        initData(){
            let self = this;       
            //데이터 초기화 
            self.jobKindOfficeWorker2 = ''
            self.jobKindInoccupation2 = ''
            self.jobPosition = ''
            self.jobAddrForm.ofcNm = ''
            self.jobAddrForm.ofcDeptNm = ''
        },          
        //직장구분변경시
        onJobTpChange(){
            let self = this;     
            self.initData()          //직장구분 선택할 때마다 데이터 초기화
            if(self.jobTp == '01' )  //직장인 선택시- 관련 필드 모두 노출시키고 활성화
            {                
                //직장인이면 업종리스트 보여줌
                self.jobKindOfficeWorker2Visible = true;    
                self.jobKindInoccupation2Visible = false; 
                //2차업종 활성화
                self.jobKindOfficeWorker2Disabled = false; 
                //직위 노출
                self.jobPositionFlag = true                
                self.jobPositionDisabled = true       
                //직장상세정보 노출
                self.jobFlag = true           
            }
            else if(self.jobTp == '03' )  //무직 선택시 
            { 
                self.jobKindOfficeWorker2Visible = false
                self.jobKindInoccupation2Visible = true                
                //직위 가림
                self.jobPositionFlag = false               
                self.jobPositionDisabled = true       
                //직장상세정보 가림
                self.jobFlag = false                        
            
            }else if(self.jobTp == '91' )  //기타 선택시
            {
                self.jobKindOfficeWorker2Visible = false
                self.jobKindInoccupation2Visible = false   
                //직위 가림
                self.jobPositionFlag = false                
                self.jobPositionDisabled = true      
                //직장상세정보 가림        
                self.jobFlag = false    
            }          
        },      
        //편집->저장 전환후
        onJobTpActive(){
            let self = this;         //탭간 이동시에도 데이터 유지
            if(self.jobTp == '01' )  //직장인 선택시- 관련 필드 모두 노출시키고 활성화
            {                
                //직장인이면 업종리스트 보여줌
                self.jobKindOfficeWorker2Visible = true;    
                self.jobKindInoccupation2Visible = false; 
                //2차업종 활성화
                self.jobKindOfficeWorker2Disabled = false; 
                //직위 노출
                self.jobPositionFlag = true                
                self.jobPositionDisabled = true       
                //직장상세정보 노출
                self.jobFlag = true           
            }
            else if(self.jobTp == '03' )  //무직 선택시 
            { 
                self.jobKindOfficeWorker2Visible = false
                self.jobKindInoccupation2Visible = true                
                //직위 가림
                self.jobPositionFlag = false               
                self.jobPositionDisabled = true       
                //직장상세정보 가림
                self.jobFlag = false                        
            
            }else if(self.jobTp == '91' )  //기타 선택시
            {
                self.jobKindOfficeWorker2Visible = false
                self.jobKindInoccupation2Visible = false   
                //직위 가림
                self.jobPositionFlag = false                
                self.jobPositionDisabled = true      
                //직장상세정보 가림        
                self.jobFlag = false    
            }          
        },
        //페이지진입후 조회
        inputDisabledSetting(){
            let self = this;    
            if(self.jobTp == '01' )  //직장인 선택시- 관련 필드 모두 노출시키고 비활성화
            {                
                //직장인이면 업종리스트 보여줌
                self.jobKindOfficeWorker2Visible = true;    
                self.jobKindInoccupation2Visible = false; 
                //2차업종 비활성화
                self.jobKindOfficeWorker2Disabled = true; 
                //직위 노출
                self.jobPositionFlag = true                
                self.jobPositionDisabled = true       
                //직장상세정보  노출
                self.jobFlag = true    
        
            }else if(self.jobTp == '03' )  //무직 선택시 
            { 
                self.jobKindOfficeWorker2Visible = false
                self.jobKindInoccupation2Visible = true                
                //직위 가림
                self.jobPositionFlag = false               
                self.jobPositionDisabled = true       
                //직장상세정보 가림
                self.jobFlag = false                
            
            }else if(self.jobTp == '91' )  //기타 선택시
            {
                self.jobKindOfficeWorker2Visible = false
                self.jobKindInoccupation2Visible = false   
                //직위 가림
                self.jobPositionFlag = false                
                self.jobPositionDisabled = true      
                //직장상세정보 가림        
                self.jobFlag = false    
            }               
        },        

        //직장인 선택시
        onJobKindOfficeWorker2Change()
        {
            var self = this;
            if(self.jobKindOfficeWorker2 == '09' || self.jobKindOfficeWorker2 == '10' )
            {
                self.$alert("선택 업종은 계좌만들기 보류중입니다. 문의사항은 고객센터를 이용해 주세요. 고객센터(1111-1111)", {
                confirmButtonText: self.$t("m_signal.c004"),
                callback: action => {                    
                    //직위, 직장명, 부서명 비활성화          
                    self.jobPositionDisabled = true      
                    self.editDisabled = true     

                   // 저장버튼 비활성화
                    $('#infoEditSaveBtn').attr("disabled", true)
                    console.log("infoEditSaveBtn_disabled:"+ $("#infoEditSaveBtn").attr("disabled"));
                }
                });     
            }else
            {         
                self.jobPositionDisabled = false
                self.editDisabled = false     

                // 저장버튼 활성화
                $('#infoEditSaveBtn').attr("disabled", false)
                console.log("infoEditSaveBtn_disabled:"+ $("#infoEditSaveBtn").attr("disabled"));
            } 
        },
        //무직 선택시
        onJobKindInoccupation2Change()
        {
            var self = this;
            self.jobPositionDisabled = true
        },  

        //우편번호 조회
        openWorkZipCode() 
        {
            let self = this;
    
            self.jobAddrForm.zipCode = ''
            self.jobAddrForm.jobAddrUpdate1 = ''

            self.from = 'mWorkPlaceEdit'

             //2021.08.03 by lyk - 모바일 앱 우편번호 설정 >>
           // self.$EventBus.$emit('zipCode', self.from)
           cordova.exec(null,null,"AppPlugin","loadWebView",[0,0,1,1,'','/static/browser/postCode.html']);
            //2021.08.03 by lyk - 모바일 앱 우편번호 설정 <<
        },

        //2021.08.03 by lyk - 모바일 앱 우편번호 설정 - 우편번호 검색 후 선택 정보 받는 함수 >>
        onPostCodeRecvData(arg1, arg2, arg3) {
            let self = this

            // alert("MyKeepinApp.onMyKeepinRecvData:"+state+","+type+","+code);
            console.log("WorkPlaceEdit onDataRecvData:", arg1+"==="+arg2+"==="+arg3) //data.zonecode, data.jibunAddress, data.buildingName
            //우편번호, 주소 처리 
            self.jobAddrForm.zipCode = arg1
            self.jobAddrForm.jobAddrUpdate1 = arg2
        
        },
        //2021.08.03 by lyk - 모바일 앱 우편번호 설정 - 우편번호 검색 후 선택 정보 받는 함수 <<

        //우편번호, 주소 보여주기
        mWorkPlaceEditPostNo(data) {

            if(data != null && data.flag == true)
            {
                this.jobAddrForm.zipCode = data.zipCode
                this.jobAddrForm.jobAddrUpdate1 = data.addrUpdate1
            }else{
                
                this.jobAddrForm.zipCode = ''
                this.jobAddrForm.jobAddrUpdate1 = ''
            }
            this.jobAddrForm.jobAddrUpdate2 = '';
        },
        mWorkPlaceEdit(data){
            if(data == true)  //비활성화
            {
                this.editDisabled = true
                this.jobTpDisabled = true
                this.inputDisabledSetting()
            }
            else  //활성화
            {
                this.editDisabled = false
                this.jobTpDisabled = false
                this.onJobTpActive()
            }                       
          
            console.log("mWorkPlaceEdit_disabled:" +this.editDisabled )
            DataManager.setDelegator(this); //2021.08.03 by lyk - 모바일 앱 우편번호 설정 : delegator 설정
        },       
        mWorkPlaceSave(data){  

            if( data == 'get')
            {  
                this.saveWorkPlaceArr.job_tp   = this.jobTp
                if(this.jobTp == '91')//기타
                {
                    this.saveWorkPlaceArr.job_kind    = ''      
                    this.saveWorkPlaceArr.job_position_code = ''      
                    this.saveWorkPlaceArr.ofc_nm = ''     
                    this.saveWorkPlaceArr.ofc_dept_nm = ''     
                }
                else if(this.jobTp == '03')//무직
                {
                    this.saveWorkPlaceArr.job_kind     = this.jobKindInoccupation2      
                    this.saveWorkPlaceArr.job_position_code = this.jobPosition      
                    this.saveWorkPlaceArr.ofc_nm = ''    
                    this.saveWorkPlaceArr.ofc_dept_nm = ''    
                }
                else
                {
                    this.saveWorkPlaceArr.job_kind     = this.jobKindOfficeWorker2
                    this.saveWorkPlaceArr.job_position_code = this.jobPosition      
                    this.saveWorkPlaceArr.ofc_nm = this.jobAddrForm.jobPlaceNm 
                    this.saveWorkPlaceArr.ofc_dept_nm = this.jobAddrForm.jobTeamNm 
                }         

                this.saveWorkPlaceArr.ofc_pst_no   = this.jobAddrForm.zipCode
                this.saveWorkPlaceArr.ofc_addr     = this.jobAddrForm.jobAddrUpdate1        
                this.saveWorkPlaceArr.ofc_addr_dtl = this.jobAddrForm.jobAddrUpdate2      
                this.saveWorkPlaceArr.ofc_area_code = this.regionNo 
                this.saveWorkPlaceArr.ofc_phon_no  = this.jobAddrForm.jobNo1 + this.jobAddrForm.jobNo2  
               // console.log("saveWorkPlaceArr:"+  JSON.stringify(this.saveWorkPlaceArr))             
                this.$EventBus.$emit('mWorkPlaceSendArr', this.saveWorkPlaceArr);
            }   
            else{
                this.$EventBus.$emit('mWorkPlaceSendArr', '');           
            }      
            
        },
        jobInfoUpdate() {
            let self = this;
         
            if(  (   self.jobTp == '01' &&    //직장구분이 직장인이면 
                     (
                        $.trim($('#mJobPositionEdit').val()) == '' || //직위
                        $.trim($('#mJobNameEdit').val()) == '' ||     //직장명
                        $.trim($('#mDepartmentNameEdit').val()) == '' ||//부서명 
                        $.trim($('#mWorkZipcodeEdit').val()) == ''      //우편번호
                     ) 
                 ) 
                 //카지노업종 선택한 경우 처리추후 추가
            )        
            {
                self.$alert('직장정보 입력을 완료해 주세요.', {
                    confirmButtonText: '확인'
                });
                self.workValiRes = false;
            } else {
                self.workValiRes = true;
            }
            self.$EventBus.$emit('mWorkPlaceSendVali',  self.workValiRes);
        },
        
        //직장정보 조회
        workPlaceLook() {
            let self = this;

            self.$socket.sendProcessByName('ac509', (queryData) => {
                let block = queryData.getBlockData('InBlock1')[0];
                block['user_id'] = self.getUserId             
                }, function (queryData) {
                if (queryData != null) {         
               
                    const res = queryData['queryObj']['OutBlock1'][0]
                    console.log("workPlaceLook_res:"+JSON.stringify(res))
                    self.initData()                    
                    self.inputDisabledSetting()       
                    self.jobTp = res.job_tp;       
                    let jobNo = ''            
                    if(self.jobTp == '01')  //직장인               
                    {                      
                        self.jobKindOfficeWorker2 = res.job_kind;                     
                        self.jobPosition = res.job_position_code;
                        self.jobAddrForm.jobPlaceNm = res.ofc_nm;
                        self.jobAddrForm.jobTeamNm = res.ofc_dept_nm;   
                        self.jobAddrForm.zipCode = res.ofc_pst_no;
                        self.jobAddrForm.jobAddrUpdate1 = res.ofc_addr;
                        self.jobAddrForm.jobAddrUpdate2 = res.ofc_addr_dtl;
                        self.regionNo = res.ofc_area_code;
                        if(!isNaN(res.ofc_phon_no)) jobNo = res.ofc_phon_no
                        if(jobNo)
                        {
                            self.jobAddrForm.jobNo1 = jobNo.substr(0, 4);
                            self.jobAddrForm.jobNo2 = jobNo.substr(4);
                        }
                    }
                    else if(self.jobTp == '03')//무직
                    {                                  
                        self.jobKindInoccupation2 = res.job_kind;                       
                    }
                   
              
                } else {
                    // 전문 에러 언어팩 적용
                    const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                    if (errorData.trName != "ac509") return
                    console.log("CODE:" + errorData.errCode);  
                }
            })
        },       
    },    
  
    mounted(){
        let self = this;
        let state = this.$route.params.state
        if( state == 'saved' || 
            self.$store.state.user.myInfo.ofc_pst_no == '')
        {
            if (self.$store.getters.isSocketConnected) {
                self.workPlaceLook();
            } else {
                self.$EventBus.$on('socketConnected', self.workPlaceLook);
            }    
        }else
        {
            //백버튼으로 접근시 내부저장소에서 데이터 가져옴
            if(self.$store.state.user.userAccCreationInfo.job_tp)
            {
                self.jobTp =  self.$store.state.user.userAccCreationInfo.job_tp
            }else
            {
                self.jobTp  = '01'
            } 
        
            self.inputDisabledSetting()          

            self.jobTp == '01' ? self.jobKindOfficeWorker2  =  self.$store.state.user.userAccCreationInfo.job_kind  
                                : self.jobKindInoccupation2  =  self.$store.state.user.userAccCreationInfo.job_kind      
            self.jobPosition  =   self.$store.state.user.userAccCreationInfo.job_position 
            self.jobAddrForm.ofcNm      =   self.$store.state.user.userAccCreationInfo.ofc_nm 
            self.jobAddrForm.ofcDeptNm  =   self.$store.state.user.userAccCreationInfo.ofc_dept_nm 

            self.jobAddrForm.zipCode      =   self.$store.state.user.myInfo.ofc_pst_no   
            self.jobAddrForm.jobAddrUpdate1  =   self.$store.state.user.myInfo.ofc_addr     
            self.jobAddrForm.jobAddrUpdate2  =   self.$store.state.user.myInfo.ofc_addr_dtl 
            self.jobAddrForm.ofcPhonNo1   =   self.$store.state.user.myInfo.ofc_phon_no1 
            self.jobAddrForm.ofcPhonNo2   =   self.$store.state.user.myInfo.ofc_phon_no2 
            if(self.$store.state.user.myInfo.ofc_area_code)
            {
                self.regionNo =  self.$store.state.user.myInfo.ofc_area_code
            }else
            {
                self.regionNo  = '02'
            }     
            ///////////////////////////////////////////////////////////////////////////////////
        }           
    }, 

    created() {
        this.$EventBus.$on('mWorkPlaceEdit', this.mWorkPlaceEdit);
        this.$EventBus.$on('mWorkPlaceEditPostNo', this.mWorkPlaceEditPostNo);
        this.$EventBus.$on('mWorkPlaceSave', this.mWorkPlaceSave);   
        this.$EventBus.$on('mWorkPlaceVali', this.jobInfoUpdate);    
         
        //탭의 디폴트 값 설정 
        DataManager.setDelegator(this); //2021.08.03 by lyk - 모바일 앱 우편번호 설정 : delegator 설정         
    },
    beforeDestroy() {
        this.$EventBus.$off('mWorkPlaceEdit', this.mWorkPlaceEdit);
        this.$EventBus.$off('mWorkPlaceEditPostNo', this.mWorkPlaceEditPostNo);
        this.$EventBus.$off('mWorkPlaceSave', this.mWorkPlaceSave);         
        this.$EventBus.$off('socketConnected', this.workPlaceLook);  
        this.$EventBus.$off('mWorkPlaceVali', this.jobInfoUpdate);     

        DataManager.removeDelegator(this); //2021.08.03 by lyk - 모바일 앱 우편번호 설정 : delegator 설정
    }
}

</script>
