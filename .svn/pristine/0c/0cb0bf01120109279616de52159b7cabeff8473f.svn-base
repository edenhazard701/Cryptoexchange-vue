<template>
  <el-main class="bank-account-main" style="overflow:hidden">

         <!-- 고객정보  -->
         <p style="padding-top:10px;
                    font-size:15px;
                    font-weight:normal;
                    color:grey;
                    text-align:center;
                    line-height:25px;">
          안전한 거래를 위해</p>                

          <p style="padding-top:0px;
                    font-size:15px;
                    font-weight:normal;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">
          <span style="font-size:18px;font-weight:bold;"> 추가정보 </span>를 입력해주세요.</p>  

          <el-form ref="customerForm" label-position="left" :model="customerForm" :rules="rule" label-width="100px" style="margin-top:20px">
            <div>
              <!-- <p style="margin-top:20px;
                        margin-bottom:10px;
                        font-size:14px;
                        color:#212121;
                        line-height:1;">한글명</p> -->
              <div>
                <el-form-item label="한글명">
                  <div style="margin-left:0px">
                    <el-input type="text" placeholder="이름(한글)" auto-complete="off" v-model="customerForm.userNm" disabled maxlength="10"></el-input>
                  </div>
                </el-form-item>             
              </div>            
            </div>

           <div>
              <!-- <p style="margin-bottom:10px;
                        font-size:14px;
                        color:#212121;
                        line-height:1;">영문명</p> -->
             
                        <el-form-item  prop="userEngNm" label="이름(영문)" size="100" >
                          <el-input   type="text" 
                                      pattern="\[a-zA-Z]*$" 
                                      placeholder="이름(영문)" 
                                      auto-complete="off"  
                                      @keydown.native="userEngNmKeydown"    
                                      v-model="customerForm.userEngNm" 
                                      maxlength="10">
                            </el-input>
                        </el-form-item>     
                     
                        <el-form-item  prop="userEngSurNm" label="성(영문)" size="100" >
                           <el-input  type="text" 
                                      pattern="\[a-zA-Z]" 
                                      placeholder="성(영문)" 
                                      auto-complete="off"  
                                      @keydown.native="userEngSurNmKeydown"    
                                      v-model="customerForm.userEngSurNm" 
                                      maxlength="10"
                                      id="customer_engsurnm_input">
                           </el-input>
                        </el-form-item>      
                               
            </div>

          <div>
            <!-- <p style="margin-bottom:10px;
                        font-size:14px;
                        color:#212121;
                        line-height:1;">거주구분 선택</p> -->
            <div>
              <el-form-item label="거주구분 선택">
                <div style="text-align:center">
                  <el-radio-group style="margin-left:0px;" 
                                  v-model="customerForm.dmstLivTp" 
                                  @keydown.native="dmstLivTpKeydown"  
                                  @change="changeDmstLivTp"
                                  id="dmstLivTp_rdo"
                                  >
                    <el-radio border label="01" value="01">국내</el-radio>
                    <el-radio border label="02" value="02">국외</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>  
            </div>    
          </div>        
         
          </el-form>
                
          <div  class="btm_fix_btn" >
            <el-button   class="b_success_btn"                       
                         @click.native.prevent="customerInfoNext" 
                         :disabled="customerInfoNextDisabled"
                         id="customerInfo_next_btn"
                         >
              다음</el-button >
          </div>     
       
	</el-main>
</template>

<script>
export default {

	data () {
     const validateEngNm = (rule, value, callback) => {   
        const reg = /^[a-zA-Z]+$/              
        let validateValue = value.toString()
        console.log("validateEngNm "+ validateValue )   
        if( !reg.test(validateValue)){
           this.$alert('영어알파벳만 입력가능합니다.', '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: this.$t('sys_err.a001')
           });    
        }else{
          callback();
        }	
      }

      const validateEngSurNm = (rule, value, callback) => {  
        const reg = /^[a-zA-Z]+$/                 
        let validateValue = value.toString()
        console.log("validateEngSurNm "+ validateValue )   
        if( !reg.test(validateValue)){
          this.$alert('영어알파벳만 입력가능합니다.', '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: this.$t('sys_err.a001')
           });    
        }else{
          callback();
        }	
      }
      
		return {     
        userId:'' ,
        customInfoDialogVisible:false,
        customerInfoNextDisabled:true,    

        customerForm:{
          userNm:'',
          userEngNm:'',
          userEngSurNm:'',
          dmstLivTp:''
        },

        rule: {
              userEngNm: [
               //   { required: true, message: '영문명(이름)을 입력해주세요.', trigger: 'change' },
                 { validator: validateEngNm, trigger: 'blur'}               
              ],
             
              userEngSurNm: [
               //   { required: true, message: '영문명(성)을 입력해주세요.', trigger: 'change' },
                 { validator: validateEngSurNm, trigger: 'blur'}               
             
              ]
          }
		};
	},
	methods : {   

    // changeEnGivenNm(e){
    //    let self = this;  
    //    console.log("userEngNm:"+self.customerForm.userEngNm)
    //    console.log("userEngNm_length:"+self.customerForm.userEngNm.toString().length)   
    //    if(  self.customerForm.userEngNm.toString().length > 0 
    //      && self.customerForm.userEngSurNm.toString().length > 0)
    //    {
    //      self.customerInfoNextDisabled = false
    //    }
    //    else{
    //      self.customerInfoNextDisabled = true
    //    }
      
    // },
    // changeEnFamilyNm(e){
    //    let self = this;  
    //    console.log("userEngSurNm:"+self.customerForm.userEngSurNm)
    //    console.log("userEngSurNm_length:"+self.customerForm.userEngSurNm.toString().length)   
    //    if( self.customerForm.userEngNm.toString().length > 0 
    //     && self.customerForm.userEngSurNm.toString().length > 0)
    //    {
    //       self.customerInfoNextDisabled = false
    //    }
    //    else{
    //      self.customerInfoNextDisabled = true
    //    }
    // },
    
    //첫번째 영문명 다음 인풋박스로 포커스 넘김
    userEngNmKeydown(e) {
      let userEngNm = this.customerForm.userEngNm
      console.log("userEngNmKeydown.length:" + userEngNm.toString().length)
      if( userEngNm.toString().length == 10 && e.keyCode != 8 )  //backspace 키 입력되도 다음 입력필드로 포커스 넘어가는 현상 방지
      {
         document.getElementById("customer_engsurnm_input").focus();       
      }
    },    

    userEngSurNmKeydown(e) {
      let userEngSurNm = this.customerForm.userEngSurNm
      console.log("userEngSurNmKeydown.length:" + userEngSurNm.toString().length)      
      if( userEngSurNm.toString().length == 10 && e.keyCode != 8 )  
      {       
         document.getElementById("dmstLivTp_rdo").focus();       
      }
    },    

    dmstLivTpKeydown() {
      let dmstLivTp = this.customerForm.dmstLivTp
      console.log("dmstLivTpKeydown:" + dmstLivTp)      
           
      document.getElementById("customerInfo_next_btn").focus();             
    },    

    changeDmstLivTp(e){
      let self = this;  
      if( self.customerForm.dmstLivTp)
      {
          self.customerInfoNextDisabled = false
      }
      else{
        self.customerInfoNextDisabled = true
      }
    },
    //고객정보등록
    saveCustomerInfo()
    {
      let self = this;  
      let dmstLivTp = ''
      if(self.customerForm.dmstLivTp === '01')
          dmstLivTp = '01'
      else
          dmstLivTp = '02'
          
      self.$socket.sendProcessByName('ac110', (queryData) => {
          let block = queryData.getBlockData('InBlock1')[0];
          block['user_id'] = self.userId                
          block['user_eng_nm'] = self.customerForm.userEngNm
          block['user_eng_surnm'] = self.customerForm.userEngSurNm        
          block['dmst_liv_tp'] = dmstLivTp   // 01국내 : 02국외
          
          console.log("user_id:" + JSON.stringify(block.user_id))
          console.log("user_eng_nm:" + JSON.stringify(block.user_eng_nm))
          console.log("user_eng_surnm:" + JSON.stringify(block.user_eng_surnm))
          console.log("dmst_liv_tp:" + JSON.stringify(block.dmst_liv_tp))
      }, function (queryData) {
          if (queryData != null) {          

              let res = queryData['queryObj']['OutBlock1'][0].dummy; 

              self.$store.state.user.userAccCreationInfo.user_eng_nm = self.customerForm.userEngNm
              self.$store.state.user.userAccCreationInfo.user_eng_surnm = self.customerForm.userEngSurNm
              self.$store.state.user.userAccCreationInfo.dmst_liv_tp  = self.customerForm.dmstLivTp
            
			        //고객정보등록 성공시 이동             
              self.$router.push({name: 'mResidenceInfo'});  
             
              
          } else {
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "ac110") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: self.$t('sys_err.a001')
            });
          }
        })     
    },

    customerInfoNext(){
          this.saveCustomerInfo()         
    }

	},
  mounted(){
        let self = this
        self.userId = self.$store.state.user.userAccCreationInfo.user_id
        console.log("ac106userId:"+  self.userId );    
        console.log("mypage.user_nm:"+  self.$store.state.user.mypage.user_nm );  

        if(self.$store.state.user.mypage.user_nm )
        {
           self.customerForm.userNm  =  self.$store.state.user.mypage.user_nm   
        }
        else
        {
           self.customerForm.userNm  =  self.$store.state.user.userAccCreationInfo.user_nm    
        }
       
        self.customerForm.userEngNm  =  self.$store.state.user.userAccCreationInfo.user_eng_nm    
        self.customerForm.userEngSurNm =  self.$store.state.user.userAccCreationInfo.user_eng_surnm 
        if(self.$store.state.user.userAccCreationInfo.dmst_liv_tp)
        {
            self.customerForm.dmstLivTp =  self.$store.state.user.userAccCreationInfo.dmst_liv_tp
        }else
        {  
           // 선택해야 다음페이지 넘어갈 수 있도록 초기 빈값 세팅해야 함
           // self.customerForm.dmstLivTp = '01'
        } 

        if( self.customerForm.userEngNm  && self.customerForm.userEngSurNm)
        {
          self.customerInfoNextDisabled = false
        }
        else{
          self.customerInfoNextDisabled = true
        }    

  },
  created() {
       this.$EventBus.$emit("mobile-nav-title", "고객 정보");
       this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border','close']);
  }
};

</script>
