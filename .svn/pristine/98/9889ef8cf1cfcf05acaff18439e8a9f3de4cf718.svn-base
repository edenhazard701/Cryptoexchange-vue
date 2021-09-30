<!--
//1차 테스트
http://192.168.1.245:8090/#/KMcheck?proc_tp=10&svc_id=ac134&user_id=55&auth_no=717717&user_nm=&alac_tp=&alac_uid=&lip=211.252.86.147&mail=cjh514%40naver.com
-->
<template>
	<div class="MyInfo">
    <h3>테스트</h3>
		<el-row class="mypage-myinfo-table">
      <el-col :span="24" class="cell">
          <span class="title">테스트</span>
          <span class="value">테스트</span>
      </el-col>
      <el-col :span="24" class="cell">
        <span class="title">user_id</span>
        <span class="value">{{ this.user_id }}</span>
      </el-col>
      <el-col :span="24" class="cell">
        <span class="title">auth_otp</span>
        <span class="value">{{ this.auth_otp }}</span>
      </el-col>
    </el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {  
			user_id:null,
      auth_otp:null
		}
	},
  computed:{
    registrationConfirm(){
      let self = this

      console.log('메일에서 팝업으로 들어올때호출')
      console.log("user_id:"+self.$route.query.user_id)
      console.log("auth_otp:"+self.$route.query.auth_no)

      self.user_id = self.$route.query.user_id
      self.auth_otp = self.$route.query.auth_no

      //vue 초기화 소켓연결 전에 호출되면 응답 못받아서 2초 후 호출
      setTimeout(function(){
        self.$store.dispatch('registrationConfirm', {
          user_id : self.user_id,
          auth_otp : self.auth_otp
        }).then((data) => {
          console.log(data)
          console.log('registrationConfirm Success')
          alert('회원가입 확정 완료')
          self.$router.push({name:'login'})
        })
      }, 2000)
    }
  },
  mounted() {
    this.registrationConfirm
  }
}
</script>
