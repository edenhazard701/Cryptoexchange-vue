<template>
    <section>
        <el-form ref="fundForm"   :model="fundForm" label-position="left" label-width="120px" style="margin-top:20px">
             <el-form-item label="자금 원천구분">               
                    <el-select  v-model="fundResouceType" 
                                @change="onFundResouceTypeChange" 
                                placeholder="선택하세요" 
                                style="width: 200px;"
                                :disabled="editDisabled"    
                               >
                        <el-option
                            v-for="fund in fundResouceTypes" 
                            :key="fund.value"
                            :label="fund.label"
                            :value="fund.value">
                        </el-option>
                    </el-select>                
            </el-form-item>
            
            <div v-if="fundResouceInputVisible"  prop="etcFundResourceType">
                 <el-form-item label="기타">      
                      <el-input type="text" placeholder="기타" id="myfundresinput" auto-complete="off"  v-model="fundForm.etcFundResourceType"  :disabled="editDisabled" style="width: 100%;" maxlength="10"></el-input>
                 </el-form-item>
            </div>
                        
            <el-form-item label="거래목적">   
                    <el-select v-model="tradePurpose" 
                                @change="onTradePurposeChange" 
                                placeholder="선택하세요"
                                :disabled="editDisabled"   
                               >           
                                >
                        <el-option
                            v-for="deal in tradePurposes" 
                            :key="deal.value"
                            :label="deal.label"
                            :value="deal.value">
                        </el-option>
                    </el-select>                
            </el-form-item>

            <div v-if="tradePurposeInputVisible"  prop="etcTradePurpose">
                 <el-form-item label="기타">      
                      <el-input type="text" placeholder="기타" id="mytradepurposeinput" auto-complete="off"  v-model="fundForm.etcTradePurpose" :disabled="editDisabled" style="width: 100%;" maxlength="10"></el-input>
                 </el-form-item>
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
        }),
    },

	data() {
		return {          
            
            fundForm: {
                etcFundResourceType: '',
                etcTradePurpose: ''
            },
            
            fundResouceTypes: [
            {
                value: 'A01',
                label: '근로및연금소득'
            }, 
            {
                value: 'A02',
                label: '퇴직소득'
            },{
                value: 'A03',
                label: '사업소득'
            },
            {
                value: 'A04',
                label: '부동산임대소득'
            },
            {
                value: 'A05',
                label: '부동산양도소득'
            },
            {
                value: 'A06',
                label: '금융소득(이자 및 배당)'
            },
            {
                value: 'A07',
                label: '상속/증여'
            },
            {
                value: 'A08',
                label: '일시 재산양도로 인한 소득'
            },
            {
                value: 'A99',
                label: '기타(명시)'
            }],
            fundResouceType: 'A01',

            tradePurposes: [
            {
                value: '01',
                label: '급여및생활비'
            }, 
            {
                value: '02',
                label: '저축및투자'
            }, 
            {
                value: '03',
                label: '보험료납부 결제',
            }, 
            {
                value: '04',
                label: '공과금납부 결제'
            }, 
            {
                value: '05',
                label: '카드대금 결제',
            }, 
            {
                value: '06',
                label: '대출원리금 상환 결제'
            }, 
            {
                value: '07',
                label: '사업상 거래'
            }, 
            {
                value: '08',
                label: '보장',
            }, 
            {
                value: '09',
                label: '상속'   
            }, 
            {
                value: '99',
                label: '기타' 
            }],
            tradePurpose: '01',
            tradePurposeInputVisible:false,
            fundResouceInputVisible:false,

            userId: '',
            authCi: '',

            fundValiRes:false,
            
            //자금정보
            saveFundArr: {
                fund_src_tp: '',
                fund_src_etc: '',
                trd_purp_cd: '',
                trd_purp_etc: ''
            },
            editDisabled: true
        };
	},
  
   
	methods: {         

        //자금 원천구분
        onFundResouceTypeChange()
        {
            let self = this;
            if(self.fundResouceType == 'A99' ) //기타 선택시
            {       
                self.fundResouceInputVisible = true         
             
            }else
            {
                self.fundResouceInputVisible = false        
            }         
        },    

        //거래 목적
        onTradePurposeChange()
        {
            let self = this;
            if(self.tradePurpose == '99' ) //기타 선택시
            {       
                self.tradePurposeInputVisible = true    
               
            }else
            {
                self.tradePurposeInputVisible = false        
            }                
        },

        fundEdit(data){
            if(data == true)  //비활성화
            {
                this.editDisabled = true
            }
            else  //활성화
            {
                this.editDisabled = false
            }
            console.log("fundEdit_disabled:" +this.editDisabled )   
        },
       
        fundSave(data){               
         
            if( data == 'get')
            {          
                this.saveFundArr.fund_src_tp   = this.fundResouceType
                this.saveFundArr.fund_src_etc  = this.fundForm.etcFundResourceType        
                this.saveFundArr.trd_purp_cd   = this.tradePurpose      
                this.saveFundArr.trd_purp_etc  = this.fundForm.etcTradePurpose                
               // console.log("saveFundArr:"+  JSON.stringify(this.saveFundArr))
                this.$EventBus.$emit('fundSendArr', this.saveFundArr);              
            }   
            else{
                this.$EventBus.$emit('fundSendArr', '');
            }      
            
        },
        investInfoUpdate() { 
            let self = this;

            if((self.fundResouceType == 'A99' && $.trim($('#myfundresinput').val()) == '') ||
               (self.tradePurpose == '99' && $.trim($('#mytradepurposeinput').val()) == '')) {
                self.$alert('자금정보 입력을 완료해 주세요.', '', {
                    confirmButtonText: '확인' 
                });
                self.fundValiRes = false;
            } else {
                self.fundValiRes = true;
            }
            self.$EventBus.$emit('fundSendVali',  self.fundValiRes);
        },
        
        fundInfoLook() { 
            let self = this;

            self.$socket.sendProcessByName('ac511', (queryData) => {
                let block = queryData.getBlockData('InBlock1')[0];
                block['user_id'] = self.getUserId              
                }, function (queryData) {
                if (queryData != null) {      
                    const res = queryData['queryObj']['OutBlock1'][0]
                    console.log("fundInfoLook_res:" + JSON.stringify(res))
                 
                    self.fundResouceType = res.fund_src_tp;
                    self.fundForm.etcFundResourceType = res.fund_src_etc;
                    self.tradePurpose = res.trd_purp_cd;
                    self.fundForm.etcTradePurpose = res.trd_purp_etc;

                    //기타 이면 인풋박스보이기
                    self.onFundResouceTypeChange()                   
                    self.onTradePurposeChange()

                } else {
                    // 전문 에러 언어팩 적용
                    const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                    if (errorData.trName != "ac511") return
                    console.log("CODE:" + errorData.errCode);  
                }
            })
        }       
      
    },  
   
    mounted(){
        let self = this;
        let state = this.$route.params.state
        console.log("state:" + state)  
        console.log("trd_purp_cd:" + self.$store.state.user.myInfo.trd_purp_cd)       
         if(  state =='saved' || 
               self.$store.state.user.myInfo.fund_src_tp  == ''  || 
               self.$store.state.user.myInfo.trd_purp_cd  == ''    )
         {
            if (self.$store.getters.isSocketConnected) {
                self.fundInfoLook();
            } else {
                self.$EventBus.$on('socketConnected', self.fundInfoLook);
            }    
        }
        else{    

            //백버튼으로 접근시 내부저장소에서 데이터 가져옴
            if(self.$store.state.user.myInfo.fund_src_tp)
            {
                self.fundResouceType =  self.$store.state.user.myInfo.fund_src_tp
            }else
            {
                self.fundResouceType  = 'A01'
            } 

            if(self.$store.state.user.myInfo.trd_purp_cd)
            {
                self.tradePurpose =  self.$store.state.user.myInfo.trd_purp_cd
            }else
            {
                self.tradePurpose  = '01'
            } 
            //기타 선택되어 있을 때만 표시
            self.fundResouceType == 'A99' ? self.fundForm.etcFundResourceType  =  self.$store.state.user.userAccCreationInfo.fund_src_etc  
                                : self.fundForm.etcFundResourceType  = ''

            self.tradePurpose == '99' ? self.fundForm.etcTradePurpose  =  self.$store.state.user.userAccCreationInfo.trd_purp_etc  
                                : self.fundForm.etcTradePurpose  =  ''

            ///////////////////////////////////////////////////////////////////////////////////
        }
    }, 
         
    created() {      
        this.$EventBus.$on('fundEdit', this.fundEdit);
        this.$EventBus.$on('fundSave', this.fundSave);    
        this.$EventBus.$on('fundVali', this.investInfoUpdate);          
       
    },   
    beforeDestroy() {
        this.$EventBus.$off('fundEdit', this.fundEdit);  
        this.$EventBus.$off('fundSave', this.fundSave);          
        this.$EventBus.$off('fundVali', this.investInfoUpdate);         
        this.$EventBus.$off('socketConnected', this.fundInfoLook);     
    }
}

</script>
