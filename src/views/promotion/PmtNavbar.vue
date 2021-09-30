<template>
  <div class="header add-bg">
    <router-link class="logo" to="/"></router-link>
    <!-- <a href="#none" class="logo" title="KOVEX"></a> -->
    <ul class="gnb">
      <li><router-link to="/pmtNoticeList">{{ $t('header.announcements')}}</router-link></li>
      <li><router-link to="/pmtJoin">{{ $t('header.preRegister') }}</router-link></li>
      <!-- <li><a href="#none">공지사항</a></li>
      <li><a href="#none">사전가입</a></li> -->
    </ul>
    <button class="btn-lang">
      <span id="langType">KOR</span>
    </button>
    <ul class="lang">
      <li><a @click="onKr" title="KOR">KOR</a></li>
      <li><a @click="onEn" title="ENG">ENG</a></li>
    </ul>

    <button class="btn-menu-mo">메뉴</button>
  </div>
</template>

<script>

import Cookies from 'js-cookie'

export default {
  methods: {
    onKr() {

      if (Cookies.get('Language-Type') === 'ko') return
      
      // this.$confirm(`Your English information is not being saved Are you sure you want to change?`, {
      //     confirmButtonText: 'OK',
      //     cancelButtonText: 'Cancel',
      //     center: true,
      //     type: 'warning'
      //   })
          // .then(res => {
            $("#langType").text('KOR')
            Cookies.set('Language-Type', 'ko', {expires:1})
            this.$i18n.locale = 'ko'
            
          // })
          // .catch(err => {
          //   console.log(err)
          // })
          // .finally(_ => {
            $(".btn-lang").removeClass("on")
            $('.lang').css('display', 'none')
 
            location.reload()
          // })
    },
    onEn() {

      if (Cookies.get('Language-Type') === 'en') return

      // this.$confirm(`작성중인 국문 정보가 저장 되지 않습니다 변경하시겠습니까?`, {
      //     confirmButtonText: 'OK',
      //     cancelButtonText: 'Cancel',
      //     center: true,
      //     type: 'warning'
      //   })
          // .then(res => {
            $("#langType").text('ENG')
            Cookies.set('Language-Type', 'en', {expires:1})
            this.$i18n.locale = 'en'
          // })
          // .catch(err => {
          //   console.log(err)
          // })
          // .finally(_ => {
            $(".btn-lang").removeClass("on")
            $('.lang').css('display', 'none')
            location.reload()
          // })
    }
    
  },
  mounted() {

    

    if(Cookies.get('Language-Type') === 'ko') {
      console.log('koko');
      $("#langType").text('KOR')
    } 
    if(Cookies.get('Language-Type') === 'en') {
      console.log('enen')

      $("#langType").text('ENG')
    }

    
    
  },
}
</script>

<style>

</style>
