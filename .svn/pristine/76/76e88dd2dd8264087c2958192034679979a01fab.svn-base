<template>
  <el-main class="bank-account-main">

       <!-- 거주정보  -->
       <p style="padding-top:10px;
                    font-size:15px;
                    font-weight:normal;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">
          <span style="font-size:18px;font-weight:bold;">거주지정보 </span>를 입력해주세요.</p>  

          <el-form ref="residenceForm" label-position="left" :model="residenceForm" :rules="rule" label-width="100px" style="margin:20px 0 0 10px">           
            <div>                       
              <el-form-item label="우편번호"  prop="zipCode">
                <el-col :span="9" style="margin-left:0px;margin-right:20px">
                    <el-input type="tel" auto-complete="off" v-model="residenceForm.zipCode" maxlength="10" style="width:100px"></el-input>
                </el-col>
                <el-col :span="6">               
                </el-col >               
                <el-col :span="9" style="margin-right:0px">
                   <el-button style="background-color:#3f50b4;color:white;width:100px;height:100%;"  autofocus="true"  @click.native.prevent="openZipCode" >우편번호</el-button>
                </el-col>
              </el-form-item>    
            </div>

            <div v-if="resiAddrFlag">
              <div >    
                  <el-form-item label="거주지주소"  prop="addrUpdate1">
                    <div style="margin-left:0px">
                      <el-input type="text" placeholder="거주지주소" auto-complete="off" v-model="residenceForm.addrUpdate1" maxlength="50" disabled></el-input>
                    </div>
                  </el-form-item>    
              </div>
              <div>    
                  <el-form-item  label="나머지주소"  prop="addrUpdate2">
                    <div style="margin-left:0px">
                      <el-input type="text" placeholder="나머지주소" id="addr2_input" auto-complete="off" v-model="residenceForm.addrUpdate2" maxlength="50"></el-input>
                    </div>
                  </el-form-item>    
              </div>
              
            <el-form-item label="자택 전화번호">
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
                                    v-model="residenceForm.homePhonNo1"                                      
                                    id="resi_phoneNo1_input">
                        </el-input>
                    </el-col>
                
                    <el-col :span="8">
                        <el-input type="number"  
                                    pattern="\d*" 
                                    maxlength="4"  max="9999"
                                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"                               
                                    auto-complete="off"                                        
                                    @keydown.native="phoneNo2Keydown"                       
                                    v-model="residenceForm.homePhonNo2"                                      
                                    id="resi_phoneNo2_input">
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>
          
            </div>                 
          </el-form>
                
          <div class="btm_fix_btn">
            <el-button class="b_success_btn"  @click.native.prevent="residenceNext" :disabled="residenceNextDisabled" id="resi_next_btn">
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
        dataDivName: 'DataDIV', //2021.08.03 by lyk - 모바일 앱 우편번호 설정 
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
        
        resiAddrFlag:false,     
        zipCodeDialogVisible:false,   
        residenceNextDisabled:true,

        from:'',

        residenceForm: {
          zipCode: '',
          addrUpdate1: '',  
          addrUpdate2: '',     
          homePhonNo1: '',
          homePhonNo2: '',               
        },
        
        rule: {
             homePhonNo1: [                
            //     { required: true, min:3, pattern:/(\d{3,4})/,message: '형식에 맞지 않습니다.', trigger: 'blur' }
                { validator: validatePhoneNo1, trigger: 'blur'}           
             ],           
             homePhonNo2: [               
            //     { required: true, min:4 ,pattern:/(\d{4})/ ,message: '형식에 맞지 않습니다.', trigger: 'blur' }
                { validator: validatePhoneNo2, trigger: 'blur'}           
             ]
        }
		};
	},
  methods : {    

    //첫번째 번호에 4자리 채우면 다음 인풋박스로 포커스 넘김
    phoneNo1Keydown(e) {
      let phoneNo1 = this.residenceForm.homePhonNo1
      console.log("phoneNo1.length:" + phoneNo1.toString().length)
      if( phoneNo1.toString().length == 4 && e.keyCode != 8 )  //backspace 키 입력되도 다음 입력필드로 포커스 넘어가는 현상 방지
      {
         document.getElementById("resi_phoneNo2_input").focus();       
      }
    },

    phoneNo2Keydown(e) {
      let phoneNo2 = this.residenceForm.homePhonNo2
      console.log("phoneNo2.length:" + phoneNo2.toString().length)   
      if( phoneNo2.toString().length == 4 && e.keyCode != 8 )
      {       
         document.getElementById("resi_next_btn").focus();       
      }
    },    

    //고객거주정보등록
    saveResidenceInfo()
    {
      let self = this;   
      let phoneNo1 = self.residenceForm.homePhonNo1
      let phoneNo2 = self.residenceForm.homePhonNo2        
      let phoneNo =  phoneNo1 +  phoneNo2
      console.log("phoneNo:"+phoneNo)
      self.$socket.sendProcessByName('ac111', (queryData) => {
          let block = queryData.getBlockData('InBlock1')[0];
          block['user_id'] = self.userId                
          block['home_pst_no'] = self.residenceForm.zipCode
          block['home_addr'] = self.residenceForm.addrUpdate1        
          block['home_addr_dtl'] = self.residenceForm.addrUpdate2      
          block['home_area_code'] = self.regionNo 
          block['home_phon_no'] =  phoneNo  
          console.log("ac111_input:" + JSON.stringify(block))
      }, function (queryData) {
          if (queryData != null) {

              let res = queryData['queryObj']['OutBlock1'][0].dummy; 
              //내부저장소에 저장
              self.$store.state.user.userAccCreationInfo.home_pst_no = self.residenceForm.zipCode
              self.$store.state.user.userAccCreationInfo.home_addr = self.residenceForm.addrUpdate1
              self.$store.state.user.userAccCreationInfo.home_addr_dtl = self.residenceForm.addrUpdate2
              self.$store.state.user.userAccCreationInfo.home_area_code = self.regionNo
              self.$store.state.user.userAccCreationInfo.home_phon_no1 = self.residenceForm.homePhonNo1
              self.$store.state.user.userAccCreationInfo.home_phon_no2 = self.residenceForm.homePhonNo2

              //고객정보등록 성공시 이동                
              self.$router.push({name: 'mJobInfo'});                
              
          } else {
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "ac111") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: self.$t('sys_err.a001')
            });
          }
        })     

    },
    residenceNext(){
      this.saveResidenceInfo()     
    },

    openZipCode(){
      let self = this; 
      //초기화      
      self.residenceForm.zipCode = '';             
      self.residenceForm.addrUpdate1 = '';   

      self.from = 'residence'

      //2021.08.03 by lyk - 모바일 앱 우편번호 설정 >>
     //self.$EventBus.$emit('zipCode', self.from)
      cordova.exec(null,null,"AppPlugin","loadWebView",[0,0,1,1,'','/static/browser/postCode.html']);
      //2021.08.03 by lyk - 모바일 앱 우편번호 설정 <<
    },  
    //2021.08.03 by lyk - 모바일 앱 우편번호 설정 - 우편번호 검색 후 선택 정보 받는 함수 >>
    onPostCodeRecvData(arg1, arg2, arg3) {
        let self = this

        // alert("MyKeepinApp.onMyKeepinRecvData:"+state+","+type+","+code);
        console.log("ResidenceInfo onDataRecvData:", arg1+"==="+arg2+"==="+arg3) //data.zonecode, data.jibunAddress, data.buildingName
        //우편번호, 주소 처리 
  
        self.$store.state.user.userAccCreationInfo.home_pst_no = arg1
        self.$store.state.user.userAccCreationInfo.home_addr = arg2     

        if(arg1) {
            self.residenceForm.zipCode = arg1
            self.residenceForm.addrUpdate1 = arg2
            self.residence(true)
        }

        console.log("ResidenceInfo home_pst_no:", self.$store.state.user.userAccCreationInfo.home_pst_no)
        console.log("ResidenceInfo home_addr:", self.$store.state.user.userAccCreationInfo.home_addr)
    
    }, 
    //우편번호 주소 있으면 입력필드 노출/다음버튼 활성화 
    residence(flag)
    {
        if(flag != null && flag == true )
        {
          this.residenceNextDisabled = false;        
          this.resiAddrFlag = true;    
          
          this.residenceForm.zipCode = this.$store.state.user.userAccCreationInfo.home_pst_no
          this.residenceForm.addrUpdate1 =  this.$store.state.user.userAccCreationInfo.home_addr
        }
        else
        {
           this.residenceNextDisabled = true;        
           this.resiAddrFlag = false;  
           
           this.residenceForm.zipCode = ''
           this.residenceForm.addrUpdate1 =  ''           
        }     
        this.residenceForm.addrUpdate2 = '';
    } 
	},
  mounted(){
        let self = this

        self.userId = self.$store.state.user.userAccCreationInfo.user_id
        console.log("ac106userId:"+  self.userId );   
        self.residenceForm.zipCode      =   self.$store.state.user.userAccCreationInfo.home_pst_no   
        self.residenceForm.addrUpdate1  =   self.$store.state.user.userAccCreationInfo.home_addr     
        self.residenceForm.addrUpdate2  =   self.$store.state.user.userAccCreationInfo.home_addr_dtl       
        self.residenceForm.homePhonNo1  =   self.$store.state.user.userAccCreationInfo.home_phon_no1 
        self.residenceForm.homePhonNo2  =   self.$store.state.user.userAccCreationInfo.home_phon_no2 
        if(self.$store.state.user.userAccCreationInfo.home_area_code)
        {
            self.regionNo =  self.$store.state.user.userAccCreationInfo.home_area_code
        }else
        {
            self.regionNo  = '02'
        } 

        if( self.residenceForm.zipCode)
        {
          self.resiAddrFlag = true
          self.residenceNextDisabled = false;  
        }
  },
  created() {
       this.$EventBus.$emit("mobile-nav-title", "거주정보");
       this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border','close']);
       this.$EventBus.$on('residenceFlag', this.residence);

        DataManager.setDelegator(this); //2021.08.03 by lyk - 모바일 앱 우편번호 설정 : delegator 설정
  },
  beforeDestroy(){
        this.$EventBus.$off('residenceFlag', this.residence);
  }

};

</script>
