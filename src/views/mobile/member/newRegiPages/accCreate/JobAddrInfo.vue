<template>
  <el-main class="bank-account-main">
        <!-- 직장정보2  -->                 
          <p style="padding-top:10px;
                    font-size:15px;
                    font-weight:normal;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">
          <span style="font-size:18px;font-weight:bold;">직장정보 </span>를 입력해주세요.</p>  

          <el-form ref="jobAddrForm" label-position="left" :model="jobAddrForm" :rules="rule"  label-width="100px" style="margin:20px 0 0 10px">           
           <div>                       
              <el-form-item  label="우편번호" prop="zipCode">              
                  <el-col :span="9" style="margin-left:0px;margin-right:20px">
                      <el-input type="tel" auto-complete="off" v-model="jobAddrForm.zipCode" maxlength="10" style="width:100px"></el-input>
                  </el-col>    
                  <el-col :span="6"></el-col>                   
                  <el-col :span="9" style="margin-right:0px">
                    <el-button style="background-color:#3f50b4;color:white;width:100px;height:100%;" autofocus="true" @click.native.prevent="openZipCode" >우편번호</el-button>
                  </el-col>               
              </el-form-item>    
            </div>

            <div v-if="jobAddrFlag">
              <div >    
                  <el-form-item  label="직장주소" prop="addrUpdate1">
                    <div style="margin-left:0px">
                      <el-input type="text" placeholder="직장주소" auto-complete="off" v-model="jobAddrForm.addrUpdate1" maxlength="50" disabled></el-input>
                    </div>
                  </el-form-item>    
              </div>
              <div>    
                  <el-form-item label="나머지주소"  prop="addrUpdate2">
                    <div style="margin-left:0px">
                      <el-input type="text" placeholder="나머지주소" id="ofc_addr_dtl_input" auto-complete="off" v-model="jobAddrForm.addrUpdate2" maxlength="50"></el-input>
                    </div>
                  </el-form-item>    
              </div>

            <el-form-item label="직장 전화번호">
                <el-row :gutter="10">
                    <el-col :span="6">
                        <el-select                      
                            v-model="regionNo"       
                            size="medium"
                            style="margin-top:5px"                                          
                          >           
                            <el-option
                              v-for="item in regionNumbers"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              placeholder="02" >                         
                            </el-option>                          
                          </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-input type="number"  
                                    pattern="\d*" 
                                    maxlength="4"  max="9999"
                                    auto-complete="off"                                        
                                    @keydown.native="phoneNo1Keydown"                       
                                    v-model="jobAddrForm.ofcPhonNo1"                                      
                                    id="job_phoneNo1_input">
                        </el-input>
                    </el-col>
                
                    <el-col :span="8">
                        <el-input type="number"  
                                    pattern="\d*" 
                                    maxlength="4"  max="9999"
                                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"                               
                                    auto-complete="off"                                        
                                    @keydown.native="phoneNo2Keydown"                       
                                    v-model="jobAddrForm.ofcPhonNo2"                                      
                                    id="job_phoneNo2_input">
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>

            </div>            
          </el-form>
                
          <div  class="btm_fix_btn">
            <el-button class="b_success_btn"  @click.native.prevent="jobAddrInfoNext" :disabled="jobAddrInfoNextDisabled"  id="job_next_btn">
              다음</el-button >
          </div>          
        
         <post-no></post-no>         

	</el-main>
</template>

<script>
export default {
	components: {
       PostNo: () => import(/* webpackPrefetch: true */ '@/views/member/common/PostNoDialog.vue')  
	},
	data () {

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
        jobAddrInfoNextDisabled:true,
        userId:'',     
        
        regionNumbers: [{        
          value: '02',        // 02	서울특별시
          label: '02'
        }, {
          value: '031',        // 031	경기도
          label: '031'
        }, {
          value: '032',         // 032	인천광역시
          label: '032',
        }, {
          value: '033',         // 033	강원도
          label: '033'
        }, {
          value: '041',         // 041	충청남도
          label: '041',
        }, {
          value: '042',         // 042	대전광역시
          label: '042',
        }, {
          value: '043',         // 043	충청북도
          label: '043'    
        }, {
          value: '044',         // 044[c]	세종특별자치시
          label: '044'
        }, {
          value: '050',
          label: '050',
        }, {
          value: '051',         // 051	부산광역시
          label: '051',
        }, {
          value: '052',         // 052	울산광역시
          label: '052'
        }, {
          value: '053',         // 053	대구광역시
          label: '053',
        }, {
          value: '054',         // 054	경상북도
          label: '054' 
        }, {
          value: '055',         // 055	경상남도
          label: '055',
        }, {
          value: '061',         // 061	전라남도
          label: '061',
        }, {
          value: '062',         // 062	광주광역시
          label: '062'
        }, { 
          value: '063',         // 063	전라북도
          label: '063',
        }, {
          value: '064',         // 064	제주특별자치도
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
        }, {
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
        }],
        regionNo:'02',      //기본세팅 서울 지역번호 
      
        jobAddrFlag:false,
        zipCodeDialogVisible:false,

        from:'',

        jobAddrForm: {
          zipCode: '',
          addrUpdate1: '',  
          addrUpdate2: '',     
          ofcPhonNo1: '',
          ofcPhonNo2: '',           
        },
        
        rule: {
            ofcPhonNo1: [    
                // { required: true, min:3, pattern:/(\d{3,4})/,message: '형식에 맞지 않습니다.', trigger: 'blur' },
                { validator: validatePhoneNo1, trigger: 'blur'}                     
            ],           
            ofcPhonNo2: [               
               // { required: true, min:4 ,pattern:/(\d{4})/ ,message: '형식에 맞지 않습니다.', trigger: 'blur' },
                { validator: validatePhoneNo2, trigger: 'blur'}    
            ]
        }
		};
	},
	methods : {  
    //첫번째 번호에 4자리 채우면 다음 인풋박스로 포커스 넘김
    phoneNo1Keydown(e) {
      let phoneNo1 = this.jobAddrForm.ofcPhonNo1
      console.log("phoneNo1.length:" + phoneNo1.toString().length)
      if( phoneNo1.toString().length == 4 && e.keyCode != 8 )  //backspace 키 입력되도 다음 입력필드로 포커스 넘어가는 현상 방지
      {
         document.getElementById("job_phoneNo2_input").focus();       
      }
    },    

    phoneNo2Keydown(e) {
      let phoneNo2 = this.jobAddrForm.ofcPhonNo2
      console.log("phoneNo2.length:" + phoneNo2.toString().length)      
      if( phoneNo2.toString().length == 4 && e.keyCode != 8 )  
      {       
         document.getElementById("job_next_btn").focus();       
      }
    },    

    //고객직장정보등록
    saveJobAddrInfo()
    {
      let self = this;  
      let phoneNo1 = self.jobAddrForm.ofcPhonNo1 
      let phoneNo2 = self.jobAddrForm.ofcPhonNo2           
      let jobPhoneNo =  phoneNo1 + phoneNo2
      console.log("jobPhoneNo:"+jobPhoneNo)
      self.$socket.sendProcessByName('ac123', (queryData) => {
          let block = queryData.getBlockData('InBlock1')[0];
          block['user_id'] = self.userId                   
          block['ofc_pst_no'] = self.jobAddrForm.zipCode       
          block['ofc_addr'] = self.jobAddrForm.addrUpdate1        
          block['ofc_addr_dtl'] = self.jobAddrForm.addrUpdate2      
          block['ofc_area_code'] = self.regionNo
          block['ofc_phon_no'] = jobPhoneNo   
          console.log("block:" + JSON.stringify(block))
      }, function (queryData) {
          if (queryData != null) {

              let res = queryData['queryObj']['OutBlock1'][0].dummy; 
               //내부저장소에 저장
              self.$store.state.user.userAccCreationInfo.ofc_pst_no = self.jobAddrForm.zipCode
              self.$store.state.user.userAccCreationInfo.ofc_addr = self.jobAddrForm.addrUpdate1
              self.$store.state.user.userAccCreationInfo.ofc_addr_dtl = self.jobAddrForm.addrUpdate2
              self.$store.state.user.userAccCreationInfo.ofc_area_code = self.regionNo
              self.$store.state.user.userAccCreationInfo.ofc_phon_no1 = self.jobAddrForm.ofcPhonNo1
              self.$store.state.user.userAccCreationInfo.ofc_phon_no2 = self.jobAddrForm.ofcPhonNo2          
             
			        //고객직장정보등록 성공시 이동               
               self.$router.push({name: 'mInvestInfo'});  
              
              
          } else {
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "ac123") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: self.$t('sys_err.a001')
            });
          }
        })     
    },

    jobAddrInfoNext(){
      this.saveJobAddrInfo()
      
    },
    openZipCode(){
        let self = this; 
        //초기화
        self.$store.state.user.userAccCreationInfo.ofc_pst_no = '';             
        self.$store.state.user.userAccCreationInfo.ofc_addr = '';   

        self.from = 'jobAddrInfo'

        //2021.08.03 by lyk - 모바일 앱 우편번호 설정 >>
        //self.$EventBus.$emit('zipCode', self.from)
        cordova.exec(null,null,"AppPlugin","loadWebView",[0,0,1,1,'','/static/browser/postCode.html']);
        //2021.08.03 by lyk - 모바일 앱 우편번호 설정 <<
    },
    //2021.08.03 by lyk - 모바일 앱 우편번호 설정 - 우편번호 검색 후 선택 정보 받는 함수 >>
    onPostCodeRecvData(arg1, arg2, arg3) {
        let self = this

        // alert("MyKeepinApp.onMyKeepinRecvData:"+state+","+type+","+code);
        console.log("JobAddrInfo onDataRecvData:", arg1+"==="+arg2+"==="+arg3) //data.zonecode, data.jibunAddress, data.buildingName
        //우편번호, 주소 처리 
        self.jobAddrForm.ofc_pst_no = arg1
        self.$store.state.user.userAccCreationInfo.ofc_pst_no = arg1
        self.$store.state.user.userAccCreationInfo.ofc_addr = arg2

        if(arg1) {
            self.jobAddrForm.zipCode = arg1
            self.jobAddrForm.addrUpdate1 = arg2
            self.jobAddrInfo(true)
        }
    
    },
    jobAddrInfo(flag){
      //우편번호 주소 있으면 입력필드 노출/다음버튼 활성화 
      if(flag != null && flag == true )
      {
        this.jobAddrInfoNextDisabled = false;       
        this.jobAddrFlag = true;        

        this.jobAddrForm.zipCode = this.$store.state.user.userAccCreationInfo.ofc_pst_no
        this.jobAddrForm.addrUpdate1 =  this.$store.state.user.userAccCreationInfo.ofc_addr
      }
      else
      {
        this.jobAddrInfoNextDisabled = true;             
        this.jobAddrFlag = false;    

        this.jobAddrForm.zipCode = ''
        this.jobAddrForm.addrUpdate1 =  ''
      }
      this.jobAddrForm.addrUpdate2 = '';          
    }
	},
  mounted(){
        let self = this

        self.userId = self.$store.state.user.userAccCreationInfo.user_id
        console.log("ac106userId:"+  self.userId );     
        self.jobAddrForm.zipCode      =   self.$store.state.user.userAccCreationInfo.ofc_pst_no   
        self.jobAddrForm.addrUpdate1  =   self.$store.state.user.userAccCreationInfo.ofc_addr     
        self.jobAddrForm.addrUpdate2  =   self.$store.state.user.userAccCreationInfo.ofc_addr_dtl 
        self.jobAddrForm.ofcPhonNo1   =   self.$store.state.user.userAccCreationInfo.ofc_phon_no1 
        self.jobAddrForm.ofcPhonNo2   =   self.$store.state.user.userAccCreationInfo.ofc_phon_no2 
        if(self.$store.state.user.userAccCreationInfo.ofc_area_code)
        {
            self.regionNo =  self.$store.state.user.userAccCreationInfo.ofc_area_code
        }else
        {
            self.regionNo  = '02'
        } 

        if( self.jobAddrForm.zipCode)
        {
            self.jobAddrFlag = true
            self.jobAddrInfoNextDisabled = false;  
        }
 
  },
  created() {
        this.$EventBus.$emit("mobile-nav-title", "직장정보(2|2)");
        this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border','close']);
        this.$EventBus.$on('jobAddrInfoFlag', this.jobAddrInfo);

        DataManager.setDelegator(this); //2021.08.03 by lyk - 모바일 앱 우편번호 설정 : delegator 설정
  },
  beforeDestroy(){
        this.$EventBus.$off('jobAddrInfoFlag', this.jobAddrInfo);
  }
};

</script>
