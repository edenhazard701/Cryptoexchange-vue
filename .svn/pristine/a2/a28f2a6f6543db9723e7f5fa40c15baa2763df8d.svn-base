<template>
  <el-main class="bank-account-main">
      <!-- 계좌 만들기 인트로 -->
      <div>
        <div style="margin-top: 50px;
                    padding: 0 40px;
                    font-size: 16pt;
                    font-weight: bold;
                    text-align: center;">
          즐거운 투자의 시작 <br/> 코벡스에서 경험하세요
        </div>
        <div style="margin-top: 100px;
                   font-size: 14pt;
                   text-align: center;">
          계좌를 만들어볼까요?
          <div style="margin-top: 10px;
                      font-size: 10pt;
                      color: #BDBDBD;">
            코인도 사고, 팔고<br/>입/출금도 자유로워요
          </div>
        </div>
        <div class="btm_fix_btn">
          <el-button class="b_success_btn"  @click="createAccContinue">다음 </el-button>
        </div>
      </div>
  </el-main>  
</template>

<script>

export default {
  
  data() {    
    return{
      authCi:''
     
    }
  },
  methods: {   
      createAccContinue(){
        var self = this;
        self.$router.push({name: 'mBranchSelect', params:{ci:self.authCi}}); 
      }, 
    },
    mounted(){   
        this.authCi = this.$route.params.ci      
        console.log("authCi:",this.authCi);
    
    },
    created() {
          this.$EventBus.$emit("mobile-nav-title", "");
          this.$EventBus.$emit('mobile-nav-menus', ['noDefault', 'close']);
    }
}
</script>
