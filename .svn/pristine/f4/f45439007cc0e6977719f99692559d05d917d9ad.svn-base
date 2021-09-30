<template>
  <el-main class="bank-account-main">
        <!-- 직장정보  -->       
          <p style="padding-top:10px;
                    font-size:15px;
                    font-weight:normal;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">
          <span style="font-size:18px;font-weight:bold;">직장정보 </span>를 입력해주세요.</p>  

          <el-form ref="jobInfoForm" label-position="left" :model="jobInfoForm" :rules="rule" label-width="100px" style="margin-top:20px">           
             <!-- 직업 선택 -->
             <div style="margin:auto">  
                 <!-- <p style="margin-bottom:10px;
                        font-size:14px;
                        color:#212121;
                        line-height:1;">직업구분1차</p> -->
                  <el-form-item label="직업구분1차">              
                      <el-select                      
                        v-model="jobTp"                      
                        @change="onJobTpChange" 
                        :disabled="jobTpDisabled"  
                        style="margin:5px 40px 0 40px;width:80%;"                                        
                      >           
                        <el-option
                          v-for="item in jobTps"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          :placeholder="jobTpPlaceHolder"
                        ></el-option>
                      </el-select>
                  </el-form-item>    
            </div>
            <!-- 업종 선택 -->
            <!--  직장인 선택 -->
            <div v-if="jobKindOfficeWorker2Visible">  
                  <!-- <p style="margin-bottom:10px;
                        font-size:14px;
                        color:#212121;
                        line-height:1;">직업구분2차</p> -->
                  <el-form-item label="직업구분2차">              
                      <el-select                      
                        v-model="jobKindOfficeWorker2"                      
                        @change="onJobKindOfficeWorker2Change"                      
                        style="margin:5px 40px 0 40px;width:80%"    
                        :disabled="jobKindOfficeWorker2Disabled"                                      
                      >           
                        <el-option
                          v-for="item in jobKindsOfficeWorkers2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          :placeholder="jobKindPlaceHolder"
                        ></el-option>
                      </el-select>
                  </el-form-item>    
            </div>
             <!--  무직 선택 -->
            <div v-else-if="jobKindInoccupation2Visible">  
                  <!-- <p style="margin-bottom:10px;
                        font-size:14px;
                        color:#212121;
                        line-height:1;">직업구분2차</p> -->
                  <el-form-item label="직업구분2차">              
                      <el-select                      
                        v-model="jobKindInoccupation2"                      
                        @change="onJobKindInoccupation2Change"                        
                        style="margin:5px 40px 0 40px;width:80%"                                                           
                      >           
                        <el-option
                          v-for="item in jobKindsInoccupations2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          :placeholder="jobKindPlaceHolder"
                        ></el-option>
                      </el-select>
                  </el-form-item>    
            </div>
             <div v-else style="height:60px">  
                
            </div>
            <!-- 직위선택 -->
            <div v-if="jobPositionFlag" style="width:100%">  
                  <!-- <p style="margin-bottom:10px;
                        font-size:14px;
                        color:#212121;
                        line-height:1;">직위</p>  -->
                  <el-form-item label="직위">              
                      <el-select                      
                        v-model="jobPosition"                      
                        @change="onJobPositionChange"  
                        :disabled="jobPositionDisabled"   
                        style="margin:5px 40px 0 40px;width:80%"                                         
                      >           
                        <el-option
                          v-for="item in jobPositions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          :placeholder="jobPostionPlaceHolder"
                        ></el-option>
                      </el-select>
                  </el-form-item> 
            </div>
            <!-- 직장명/부서명 입력 -->
            <div v-if="jobFlag">
              <div >    
                 <!-- <p style="margin-bottom:10px;
                        font-size:14px;
                        color:#212121;
                        line-height:1;">직장명</p>  -->
                <div style="margin:0px">
                  <el-form-item label="직장명" prop="ofc_nm">
                      <el-input type="text" 
                      placeholder="직장명"                  
                      auto-complete="off"                                      
                      v-model="jobInfoForm.ofcNm"                     
                      @keyup.native="changeJobPlaceNm"
                      :disabled="ofcNmDisabled"  
                      maxlength="20">
                      </el-input>
                  </el-form-item> 
                </div>   
              </div>
              <div>    
                  <!-- <p style="margin-bottom:10px;
                        font-size:14px;
                        color:#212121;
                        line-height:1;">부서명</p>  -->
                  <div style="margin:0px">
                    <el-form-item label="부서명" prop="ofc_dept_nm">                    
                        <el-input type="text" 
                        placeholder="부서명"                
                        auto-complete="off"    
                        v-model="jobInfoForm.ofcDeptNm"    
                        @keyup.native="changeJobTeamNm"     
                        :disabled="ofcDeptNmDisabled"                        
                        maxlength="20">
                        </el-input>                    
                    </el-form-item>    
                  </div>
              </div>
          
            </div>                 
          </el-form>
                
          <div class="btm_fix_btn" >
            <el-button  class="b_success_btn" @click.native.prevent="jobInfoNext" :disabled="jobBtnDisabled">
              다음</el-button >
          </div>       
    
	</el-main>
</template>

<script>
export default {
	components: {

	},
	data () {
		return {    
      userId:'',
      jobTpPlaceHolder:'직업 선택',
      jobKindPlaceHolder:'업종 선택',
      jobPostionPlaceHolder:'직위 선택',

      jobKindOfficeWorker2Visible :true,
      jobKindInoccupation2Visible :false,

      jobPositionDisabled:true,
      jobTpDisabled:false,
      jobBtnDisabled:true,
      ofcNmDisabled: false,
      ofcDeptNmDisabled: false,

      jobPositionFlag:true,
      jobFlag:true,    
    
      jobTps: [{
          value: '01',
          label: '직장인'
        // }, {  
        //   value: '02',
        //   label: '개인사업자'
        }, {
          value: '03',
          label: '무직',   
        }, {
          value: '91',
          label: '기타',           
        }],
      jobTp:'01',

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

      jobKindsInoccupations2: [{
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

      jobKind:'',
        
      jobPositions: [{
          value: '01',
          label: '사원'
        }, {
          value: '02',
          label: '대리'
        }, {
          value: '03',
          label: '과장',
        }, {
          value: '04',
          label: '차장'
        }, {
          value: '05',
          label: '부장',
        }, {
          value: '06',
          label: '임원'  
        }, {
          value: '07',
          label: '사장'    
        }],    
      jobPosition:'',

      jobInfoForm: {
          ofcNm: '',
          ofcDeptNm: ''                  
        },

      rule: {
          ofcNm: [
              { required: true, message: '직장명을 입력해주세요.', trigger: 'change' },
              // { required: true, min:3, pattern:/(\d{3,4})/,message: '형식에 맞지 않습니다.', trigger: 'blur' }
          ],
          
          ofcDeptNm: [
              { required: true, message: '부서명을 입력해주세요.', trigger: 'change' },
              // { required: true, min:4 ,pattern:/(\d{4})/ ,message: '형식에 맞지 않습니다.', trigger: 'blur' }
          ]
      }
		};
	},
	methods : {  
    //유효성체크후 활성화
    changeJobPlaceNm(){
      let ofcNm = this.jobInfoForm.ofcNm  
      let ofcDeptNm = this.jobInfoForm.ofcDeptNm      
      if(ofcNm != '' && ofcDeptNm != '')
      {
        this.jobBtnDisabled = false
      }else
      {
        this.jobBtnDisabled = true
      }

    },
    //유효성체크후 버튼 활성화
    changeJobTeamNm()
    {
        let ofcNm = this.jobInfoForm.ofcNm  
        let ofcDeptNm = this.jobInfoForm.ofcDeptNm 
        if(ofcNm != '' && ofcDeptNm != '')
        {
          this.jobBtnDisabled = false
        }else
        {
          this.jobBtnDisabled = true
        }
    },    
    initData(){
          let self = this;       
          //데이터 초기화 
          self.jobKindOfficeWorker2 = ''
          self.jobKindInoccupation2 = ''
          self.jobPosition = ''
          self.jobInfoForm.ofcNm = ''
          self.jobInfoForm.ofcDeptNm = ''
    },     
    //직업선택
    onJobTpChange(){
        let self = this;    
        self.initData()       
        if(self.jobTp == '01' )  //직장인 선택시
        {
            //직장인이면 업종리스트 보여줌
            self.jobKindOfficeWorker2Visible = true;    
            self.jobKindInoccupation2Visible = false;              
            self.jobPositionFlag = true
            self.jobFlag = false

            self.jobBtnDisabled = true          
     
        }else if(self.jobTp == '03' )  //무직 선택시 
        {
            self.jobKindOfficeWorker2Visible = false
            self.jobKindInoccupation2Visible = true    
            self.jobPositionFlag = false 
            self.jobPositionDisabled = true     
            self.jobFlag = false           
          
            self.jobBtnDisabled = false              
           
        }else if(self.jobTp == '91' )  //기타 선택시
        {
            self.jobKindOfficeWorker2Visible = false
            self.jobKindInoccupation2Visible = false   
            self.jobPositionFlag = false     
            self.jobPositionDisabled = true             
            self.jobFlag = false        
            
            self.jobBtnDisabled = false
        }               

    },
    //백버튼으로 접근했을 시
    onJobTpChangeFromBackBtn(){
        let self = this;     
        if(self.jobTp == '01' )  //직장인 선택시
        {
            //직장인이면 업종리스트 보여줌
            self.jobKindOfficeWorker2Visible = true;    
            self.jobKindInoccupation2Visible = false;              
            self.jobPositionFlag = true
            self.jobFlag = true     

            self.jobBtnDisabled = false          
     
        }else if(self.jobTp == '03' )  //무직 선택시 
        {
            self.jobKindOfficeWorker2Visible = false
            self.jobKindInoccupation2Visible = true    
            self.jobPositionFlag = false          
            self.jobPositionDisabled = true     
            self.jobFlag = false  
          
            self.jobBtnDisabled = false              
           
        }else if(self.jobTp == '91' )  //기타 선택시
        {
            self.jobKindOfficeWorker2Visible = false
            self.jobKindInoccupation2Visible = false   
            self.jobPositionFlag = false    
            self.jobPositionDisabled = true             
            self.jobFlag = false
          
            self.jobBtnDisabled = false
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
                  self.ofcNmDisabled = true
                  self.ofcDeptNmDisabled =  true                               
                  self.jobBtnDisabled = true                      
              }
            });     
        }else
        {                     
            self.jobPositionDisabled = false
            self.ofcNmDisabled = false
            self.ofcDeptNmDisabled =  false        
            self.jobBtnDisabled = false   
        } 
    },
    //무직 선택시
    onJobKindInoccupation2Change()
    {
        var self = this;
        self.jobPositionDisabled = true
    },  

    //직위 선택후 직장명/부서명 보임
    onJobPositionChange()
    {       
        let self = this;
        if(self.jobPosition != '' )
        {       
             self.jobFlag = true         
        }         
    },

    //고객직장정보등록
    saveJobInfo()
    {      
        let self = this;
        if(self.jobTp == '91')//기타
        {
            self.jobKind    = ''      
            self.jobPosition = ''      
            self.jobInfoForm.ofcNm = ''     
            self.jobInfoForm.ofcDeptNm = ''     
        }
        else if(self.jobTp == '03')//무직
        {
            self.jobKind    = self.jobKindInoccupation2      
            self.jobPosition = ''      
            self.jobInfoForm.ofcNm = ''     
            self.jobInfoForm.ofcDeptNm = ''    
        }
        else  //직장인
        {
            self.jobKind    = self.jobKindOfficeWorker2              
        }              
        //self.jobKind = self.jobKindOfficeWorker2?self.jobKindOfficeWorker2:self.jobKindInoccupation2         
        console.log("jobInfo_job_kind:"+ self.jobKind );
        self.$socket.sendProcessByName('ac122', (queryData) => {
            let block = queryData.getBlockData('InBlock1')[0];            
            block['user_id'] = self.userId            
            block['job_tp'] = self.jobTp  //직장구분
            block['job_kind'] = self.jobKind //업종            
            block['job_position_code'] = self.jobPosition     //직위코드  
            block['ofc_nm'] = self.jobInfoForm.ofcNm      //직장명
            block['ofc_dept_nm'] =  self.jobInfoForm.ofcDeptNm      //부서명   
            console.log("block:" + JSON.stringify(block))
        }, function (queryData) {
            if (queryData != null) {
                
                let res = queryData['queryObj']['OutBlock1'][0].dummy; 
                //고객직장정보등록 성공시 이동    
                self.$store.state.user.userAccCreationInfo.job_tp = self.jobTp
                self.$store.state.user.userAccCreationInfo.job_kind = self.jobKind
                self.$store.state.user.userAccCreationInfo.job_position  = self.jobPosition 
                self.$store.state.user.userAccCreationInfo.ofc_nm  = self.jobInfoForm.ofcNm
                self.$store.state.user.userAccCreationInfo.ofc_dept_nm  = self.jobInfoForm.ofcDeptNm 

                //무직/기타 이면 직장주소 건너뜀
                if(self.jobTp == '03' || self.jobTp == '91')
                {
                    self.$router.push({name: 'mInvestInfo'});  
                }
                else   //직장주소페이지로 이동 
                {
                    self.$router.push({name: 'mJobAddrInfo'});  
                }
                      
            } else {
              // 전문 에러 언어팩 적용
              const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
              if (errorData.trName != "ac122") return

              self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: self.$t('sys_err.a001')
              });
            }
        })             
        
    },
    jobInfoNext(){
        let self = this;    
        self.saveJobInfo()   
    }
	},
  mounted(){
        let self = this
        self.userId = self.$store.state.user.userAccCreationInfo.user_id
        console.log("ac106userId:"+  self.userId );     

        if(self.$store.state.user.userAccCreationInfo.job_tp)
        {
            self.jobTp =  self.$store.state.user.userAccCreationInfo.job_tp
        }else
        {
            self.jobTp  = '01'
        } 
        self.initData()        
        self.onJobTpChangeFromBackBtn()          

        self.jobTp == '01' ? self.jobKindOfficeWorker2  =  self.$store.state.user.userAccCreationInfo.job_kind  
                            : self.jobKindInoccupation2  =  self.$store.state.user.userAccCreationInfo.job_kind      
        self.jobPosition  =   self.$store.state.user.userAccCreationInfo.job_position 
        self.jobInfoForm.ofcNm      =   self.$store.state.user.userAccCreationInfo.ofc_nm 
        self.jobInfoForm.ofcDeptNm  =   self.$store.state.user.userAccCreationInfo.ofc_dept_nm 

        self.changeJobPlaceNm()
  },
  created() {
      this.$EventBus.$emit("mobile-nav-title", "직장정보(1|2)");
      this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border','close']);
  }
};

</script>
