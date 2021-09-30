<template>
    <section>
        <el-form ref="jobAddrForm"  :model="jobAddrForm"  label-position="left" label-width="120px" :rules="rule" style="margin-top:20px">
             <!-- 직업 선택 -->            
            <el-form-item label="직장구분">              
                <el-select                      
                    v-model="jobTp"                      
                    @change="onJobTpChange"
                    :disabled="jobTpDisabled"  
                    style="width:100%"                                        
                >           
                    <el-option
                    v-for="item in jobTps"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    style="width:100%"      
                    ></el-option>
                </el-select>
            </el-form-item>                
            <!-- 업종 선택 -->
            <!-- 직장인 선택 -->      
            <div v-if="jobKindOfficeWorker2Visible"> 
                <el-form-item label="직장인">              
                    <el-select                      
                        v-model="jobKindOfficeWorker2"                      
                        @change="onJobKindOfficeWorker2Change"                      
                        style="width:100%"    
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
                        style="width:100%"                                        
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
                        style="width:100%" 
                        id="my_job_position"                                        
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
            <div v-if="jobFlag">    
                <el-form-item label="직장명" prop="ofc_nm">
                    <div style="margin-left:0px">
                        <el-input type="text" 
                            placeholder="직장명"                         
                            autofocus="true" 
                            auto-complete="off"  
                            v-model="jobAddrForm.jobPlaceNm" 
                            maxlength="20"
                            :disabled="editDisabled"                  
                            id="my_job_name">
                        </el-input>
                    </div>
                </el-form-item>    
            
                <el-form-item  label="부서명" prop="ofc_dept_nm">
                    <div style="margin-left:0px">
                        <el-input type="text" 
                            placeholder="부서명"                            
                            auto-complete="off" 
                            v-model="jobAddrForm.jobTeamNm" 
                            maxlength="20"
                            :disabled="editDisabled"                  
                            id="my_department_name">
                        </el-input>
                    </div>
                </el-form-item>             
                
                <el-form-item label="우편번호">
                    <el-col :span="10" style="margin-left:0px; margin-top:5px">
                        <el-input type="tel" placeholder="" auto-complete="off" id="my_work_zipcode" v-model="jobAddrForm.zipCode" maxlength="50" style="width:200px" disabled></el-input>
                    </el-col>               
                    <el-col :span="14" style="text-align:left">
                    <el-button style="background-color:#3f50b4;color:white;width:100px;height:100%;" autofocus="true" @click.native.prevent="openWorkZipCode" :disabled="editDisabled">우편번호</el-button>
                    </el-col>
                </el-form-item>    
            
                <!-- 우편번호 검색 후 -->                     
                <el-form-item label="직장주소">
                    <div style="margin-left:0px">
                    <el-input type="text" placeholder="직장주소" auto-complete="off" v-model="jobAddrForm.jobAddrUpdate1" maxlength="50" disabled></el-input>
                    </div>
                </el-form-item>    
            
                <el-form-item  label="나머지 주소">
                    <div style="margin-left:0px">
                    <el-input type="text" placeholder="나머지주소"  id="my_work_addr2_input" auto-complete="off" v-model="jobAddrForm.jobAddrUpdate2" maxlength="50" :disabled="editDisabled"></el-input>
                    </div>
                </el-form-item>   
            
                <!-- 직장 전화번호 수정 -->            
                <div class="cell">
                    <span class="title" style="width:140px">{{'직장 전화번호'}}<!-- 직장 전화번호 --></span>
                    <span class="value" style="margin-left:110px">
                    <el-select  v-model="regionNo" 
                                :disabled="editDisabled"     
                                style="width:90px"
                                >           
                        <el-option
                                v-for="item in regionNumbers"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                    </el-select>     
                    </span>                
                    <span class="value">
                    <el-input type="text"  
                                pattern="\d*" 
                                maxlength="4"  max="9999"
                                auto-complete="off"                                        
                                @keydown.native="workNo1Keydown"                
                                v-model="jobAddrForm.jobNo1"   
                                style="width:120px"    
                                :disabled="editDisabled"                                      
                                id="my_jobno1_input">
                    </el-input>
                    </span>
                    <span class="value">
                    <el-input type="text"  
                                pattern="\d*" 
                                maxlength="4"  max="9999"
                                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"                               
                                auto-complete="off"        
                                v-model="jobAddrForm.jobNo2"    
                                style="width:120px"     
                                :disabled="editDisabled"                                    
                                id="my_jobno2_input">
                    </el-input> 
                    </span>    
                </div>         
            </div> 
        </el-form>
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
                jobNo2: '',
               
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
                document.getElementById("my_jobno2_input").focus();
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
            if(self.jobKindOfficeWorker2 == '09'  || self.jobKindOfficeWorker2 == '10')
            {
                self.$alert("선택 업종은 계좌만들기 보류중입니다. 문의사항은 고객센터를 이용해 주세요. 고객센터(1111-1111)", {
                confirmButtonText: self.$t("m_signal.c004"),
                callback: action => {                    
             
                    self.jobPositionDisabled = true      
                    self.editDisabled = true       
                    
                    // 저장버튼만 비활성화
                    $('#myInfoSaveBtn').attr("disabled", true)
                    console.log("myInfoSaveBtn_disabled:"+ $("#myInfoSaveBtn").attr("disabled"));
                }
                });     
            }else
            {         
                self.jobPositionDisabled = false
                self.editDisabled = false       

                // 저장버튼 활성화
                $('#myInfoSaveBtn').attr("disabled", false)
                console.log("myInfoSaveBtn_disabled:"+ $("#myInfoSaveBtn").attr("disabled"));
            } 
        },
        //무직 선택시
        onJobKindInoccupation2Change()
        {
            var self = this;
            self.jobPositionDisabled = true
        },  
        
        //우편번호 조회
        openWorkZipCode() {
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
                    self.jobAddrForm.zipCode = data.zonecode;
                    self.jobAddrForm.jobAddrUpdate1 = roadAddr;
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

        // //우편번호 조회
        // openWorkZipCode() {
        //     let self = this;

        //     self.jobAddrForm.zipCode = ''
        //     self.jobAddrForm.addrUpdate1 = ''

        //     self.from = 'WorkPlaceEdit'
        //     self.$EventBus.$emit('zipCode', self.from)
        // },

        // //우편번호, 주소 보여주기
        // workPlaceEditPostNo(data) {
        //     if(data != null && data.flag == true)
        //     {
        //         this.jobAddrForm.zipCode = data.zipCode
        //         this.jobAddrForm.jobAddrUpdate1 = data.addrUpdate1
        //     }else{
        //         this.jobAddrForm.zipCode = ''
        //         this.jobAddrForm.jobAddrUpdate1 = ''
        //     }
           
        //     this.jobAddrForm.jobAddrUpdate2 = '';
        // },
        workPlaceEdit(data){
         
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
          
            console.log("workPlaceEdit_disabled:" + this.editDisabled )
        },       
        workPlaceSave(data){  

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
             //   console.log("saveWorkPlaceArr:"+  JSON.stringify(this.saveWorkPlaceArr))             
                this.$EventBus.$emit('workPlaceSendArr', this.saveWorkPlaceArr);
            }   
            else{
                this.$EventBus.$emit('workPlaceSendArr', '');           
            }      
            
        },
        jobInfoUpdate() {
            let self = this;
         
            if(  (   self.jobTp == '01' &&    //직장구분이 직장인이면 
                    ( $.trim($('#my_job_position').val()) == '' ||     //직위
                      $.trim($('#my_job_name').val()) == '' ||     //직장명
                      $.trim($('#my_department_name').val()) == ''||  //부서명 
                      $.trim($('#my_work_zipcode').val()) == '' )     //우편번호
                 ) 
            )        
            {
                self.$alert('직장정보 입력을 완료해 주세요.', {
                    confirmButtonText: '확인'
                });
                self.workValiRes = false;
            } else {
                self.workValiRes = true;
            }
            self.$EventBus.$emit('workPlaceSendVali',  self.workValiRes);
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
                    console.log("workPlaceLook_Res:" + JSON.stringify(res))
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
        }
    },

    mounted(){
        let self = this;
        let state = this.$route.params.state
         console.log("state:" + state)       
         console.log("ofc_pst_no:" + self.$store.state.user.myInfo.ofc_pst_no)       
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
            if(self.$store.state.user.myInfo.ofc_area_code)
            {
                self.regionNo =  self.$store.state.user.myInfo.ofc_area_code
            }else
            {
                self.regionNo  = '02'
            }     
            const ofcPhonNo   =   self.$store.state.user.myInfo.ofc_phon_no            
            if(ofcPhonNo)
            {
                self.jobAddrForm.jobNo1 = ofcPhonNo.substr(0, 4);
                self.jobAddrForm.jobNo2 = ofcPhonNo.substr(4);
            }    
            ///////////////////////////////////////////////////////////////////////////////////
        }           
    },    

    created() {
       this.$EventBus.$on('workPlaceEdit', this.workPlaceEdit);
      // this.$EventBus.$on('WorkPlaceEditFlag', this.workPlaceEditPostNo);
       this.$EventBus.$on('workPlaceSave', this.workPlaceSave);   
       this.$EventBus.$on('workPlaceVali', this.jobInfoUpdate);         
    },
    beforeDestroy() {
       this.$EventBus.$off('workPlaceEdit', this.workPlaceEdit);
    //    this.$EventBus.$off('WorkPlaceEditFlag',this.workPlaceEditPostNo);
       this.$EventBus.$off('workPlaceSave', this.workPlaceSave);         
       this.$EventBus.$off('socketConnected', this.workPlaceLook);  
       this.$EventBus.$off('workPlaceVali', this.jobInfoUpdate);       
    }
}

</script>
