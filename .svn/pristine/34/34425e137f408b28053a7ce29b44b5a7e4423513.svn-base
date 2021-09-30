<template>
  <el-main class="bank-account-main">
        <!-- 투자정보  -->
          <p style="padding-top:10px;
                    font-size:15px;
                    font-weight:normal;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">
          건전한 금융거래를 위해</p>  
       
          <p style="padding-top:10px;
                    font-size:15px;
                    font-weight:normal;
                    color:#212121;
                    text-align:center;
                    line-height:25px;">
          <span style="font-size:18px;font-weight:bold;">투자정보 </span>를 선택해주세요.</p>  

          <el-form ref="investForm" label-position="left" :model="investForm" :rules="rule" label-width="100px" style="margin-top:20px">  
         
            <div >  
               <!-- <p style="margin-bottom:10px;
                        font-size:14px;
                        color:#212121;
                        line-height:1;">자금원천구분</p> -->
                <el-form-item label="자금원천구분">              
                    <el-select                      
                      v-model="fundResouceType"                      
                      @change="onFundResouceTypeChange"                        
                      style="margin:5px 40px 0 40px;width:80%"                                     
                    >           
                      <el-option
                        v-for="item in fundResouceTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        placeholder="자금원천구분 선택"
                      ></el-option>
                    </el-select>
                </el-form-item>    
            </div>

            <div v-if="fundResouceInputVisible"  style="margin:20px 40px 20px 40px;width:80%"                >
              <el-input type="text" placeholder="기타" auto-complete="off" @keyup.native="changeFundResouceInput" v-model="investForm.fundSrcEtc" maxlength="10"></el-input>
            </div>
          
            <div> 
                <!-- <p style="margin-bottom:10px;
                        font-size:14px;
                        color:#212121;
                        line-height:1;">거래목적</p>  -->
                <el-form-item label="거래목적">              
                    <el-select                      
                      v-model="tradePurpose"                      
                      @change="onTradePurposeChange"                      
                      style="margin:5px 40px 0 40px;width:80%"   
                    >           
                      <el-option
                        v-for="item in tradePurposes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        placeholder="거래목적 선택"
                      ></el-option>
                    </el-select>
                </el-form-item>    
            </div>       

            <div v-if="tradePurposeInputVisible"  style="margin:20px 40px 20px 40px;width:80%">
              <el-input type="text" placeholder="기타" auto-complete="off" @keyup.native="changeTradePurposeInput" v-model="investForm.trdPurpEtc" maxlength="10"></el-input>
            </div>

          </el-form>
                
          <div class="btm_fix_btn" >
            <el-button class="b_success_btn"  @click.native.prevent="investInfoNext" :disabled="investInfoNextDisabled">
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
       investInfoNextDisabled:false, 

      fundResouceTypes: [{
          value: 'A01',
          label: '근로및연금소득'
        }, {
          value: 'A02',
          label: '퇴직소득'
        }, {
          value: 'A03',
          label: '사업소득',
        }, {
          value: 'A04',
          label: '부동산임대소득'
        }, {
          value: 'A05',
          label: '부동산양도소득'
        }, {
          value: 'A06',
          label: '금융소득(이자및배당)',
        }, {
          value: 'A07',
          label: '상속/증여'   
        }, {
          value: 'A08',
          label: '일시 재산양도로 인한 소득'   
        }, {
          value: 'A99',
          label: '기타'   
        }],    
      fundResouceType:'A01', //기본값 근로및연금소득
      
      tradePurposes: [{
          value: '01',
          label: '급여및생활비'
        }, {
          value: '02',
          label: '저축및투자'
        }, {
          value: '03',
          label: '보험료납부 결제',
        }, {
          value: '04',
          label: '공과금납부 결제'
        }, {
          value: '05',
          label: '카드대금 결제',
        }, {
          value: '06',
          label: '대출원리금 상환 결제'
        }, {
          value: '07',
          label: '사업상 거래'
        }, {
          value: '08',
          label: '보장',
        }, {
          value: '09',
          label: '상속'   
        }, {
          value: '99',
          label: '기타'         
        }],    
      tradePurpose:'02',  //기본값 저축및투자
      tradePurposeInputVisible:false,
      fundResouceInputVisible:false,
      
      investForm:{
        fundSrcEtc:'',
        trdPurpEtc:''
      }
      
		};
	},
	methods : {

    onFundResouceTypeChange()
    {
        var self = this;
        if(self.fundResouceType == 'A99' ) //기타 선택시
        {       
            self.fundResouceInputVisible = true         
            self.investInfoNextDisabled = true        
        }else
        {
            self.fundResouceInputVisible = false  
            self.investInfoNextDisabled = false      
        }         
    },    

    onTradePurposeChange()
    {
        var self = this;
        if(self.tradePurpose == '99' ) //기타 선택시
        {       
            self.tradePurposeInputVisible = true    
            self.investInfoNextDisabled = true             
        }else
        {
            self.tradePurposeInputVisible = false  
            self.investInfoNextDisabled = false           
        }                
    },

    changeFundResouceInput(){
        var self = this;
        if(self.investForm.fundSrcEtc)
        {
            self.investInfoNextDisabled = false    
        }
        else
        {
            self.investInfoNextDisabled = true                 
        }
    },
    
    changeTradePurposeInput(){
        var self = this;
        if(self.investForm.trdPurpEtc)
        {
            self.investInfoNextDisabled = false    
        }
        else
        {
            self.investInfoNextDisabled = true                 
        }
    },

    //투자정보등록
    saveInvestInfo()
    {
      let self = this;  
    
      self.$socket.sendProcessByName('ac124', (queryData) => {
          var block = queryData.getBlockData('InBlock1')[0];
          block['user_id'] = self.userId     
          block['fund_src_tp'] = self.fundResouceType
          block['fund_src_etc'] = self.investForm.fundSrcEtc          //한글20자
          block['trd_purp_cd'] = self.tradePurpose
          block['trd_purp_etc'] = self.investForm.trdPurpEtc          //한글20자
          console.log("block:" + JSON.stringify(block))
      }, function (queryData) {
          if (queryData != null) {

              let res = queryData['queryObj']['OutBlock1'][0].dummy; 

              self.$store.state.user.userAccCreationInfo.fund_src_tp  = self.fundResouceType 
              self.$store.state.user.userAccCreationInfo.fund_src_etc = self.investForm.fundSrcEtc 
              self.$store.state.user.userAccCreationInfo.trd_purp_cd  = self.tradePurpose
              self.$store.state.user.userAccCreationInfo.trd_purp_etc =  self.investForm.trdPurpEtc             

              //투자정보등록 성공시 이동             
              self.$router.push({name: 'mOneWonVerifi1'});  
              
              
          } else {
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "ac124") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: self.$t('sys_err.a001')
            });
          }
        })     
     },
     investInfoNext(){
       this.saveInvestInfo()
     }
	},
  mounted(){
       let self = this
       self.userId = self.$store.state.user.userAccCreationInfo.user_id
       console.log("ac106userId:"+  self.userId );      

       self.investForm.fundSrcEtc = self.$store.state.user.userAccCreationInfo.fund_src_etc      
       self.investForm.trdPurpEtc  = self.$store.state.user.userAccCreationInfo.trd_purp_etc

        if(self.$store.state.user.userAccCreationInfo.fund_src_tp)
        {
            self.fundResouceType =  self.$store.state.user.userAccCreationInfo.fund_src_tp
        }else
        {
            self.fundResouceType  = 'A01'
        } 

         if(self.$store.state.user.userAccCreationInfo.trd_purp_cd)
        {
            self.tradePurpose =  self.$store.state.user.userAccCreationInfo.trd_purp_cd
        }else
        {
            self.tradePurpose  = '02'
        }        
  },
  created() {
       this.$EventBus.$emit("mobile-nav-title", "투자정보");
       this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border','close']);
  }
};

</script>
