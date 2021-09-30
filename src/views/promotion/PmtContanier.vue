<template>
<div id="PmtContainer" :class="['wrap', {'type-main': pathName}]">
  <!-- <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
  </head> -->
  
  <pmt-navbar></pmt-navbar>
  <!-- <transition name="fade" mode="out-in">   -->
    <router-view></router-view>
  <!-- </transition> -->
  <pmt-footer></pmt-footer>
  
  <!-- 모바일 슬라이더 -->
  <div class="menu-mo">
    <div class="dim"></div>
    <button class="btn-close">닫기</button>
    <div class="lang-box">
      <router-link class="icon-home menuListClose" to="/"></router-link>
      <!-- <a href="#none" class="icon-home">홈</a> -->
      <a @click="onKr" class='icon-kor'>KOR</a>
      <span class="bar"></span>
      <a @click="onEn" class='icon-eng'>ENG</a>
    </div>
    <ul class="menulist">
      <li class="menuListClose"><router-link to="/pmtNoticeList">{{ $t('header.announcements')}}</router-link></li>
      <li class="menuListClose"><router-link to="/pmtJoin">{{ $t('header.preRegister')}}</router-link></li>
    </ul>
  </div>
</div>
</template>

<script>
import PmtNavbar from './PmtNavbar'
import Cookies from 'js-cookie'
import PmtFooter from './PmtFooter'
import { setTimeout } from 'timers'


export default {
  components: {
    PmtNavbar,
    PmtFooter  
  },
  data() {
    return {
      pathName: false,
      addLang: true
    }
  },
  computed: {
    
    wrap: () => {
      console.log('wrap');
      console.log(this.$route);
      console.log(this);
    }
  },
  watch: {
 
    '$route'(to, from) {
      
        if (to.name === 'pmtMain') {
          this.pathName = true
          $(".header").removeClass("add-bg");
        } else {
          this.pathName = false
          document.querySelector('.header').classList.add('add-bg')
        }
       
    }
  },
  methods: {
    
    onKr() {

      if (Cookies.get('Language-Type') === 'ko') return
      
      // this.$confirm(`작성중인 영문 정보가 저장 되지 않습니다 변경하시겠습니까?`, {
      //     confirmButtonText: 'OK',
      //     cancelButtonText: 'Cancel',
      //     center: true,
      //     type: 'warning'
      //   })
      //     .then(res => {
            Cookies.set('Language-Type', 'ko', {expires:1})
            this.$i18n.locale = 'ko'
            $('.icon-eng').removeClass('on')
            $('.icon-kor').addClass('on')
            location.reload()
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       })
    },
    onEn() {

      if (Cookies.get('Language-Type') === 'en') return

      // this.$confirm(`작성중인 국문 정보가 저장 되지 않습니다 변경하시겠습니까?`, {
      //     confirmButtonText: 'OK',
      //     cancelButtonText: 'Cancel',
      //     center: true,
      //     type: 'warning'
      //   })
      //     .then(res => {
            Cookies.set('Language-Type', 'en', {expires:1})
            this.$i18n.locale = 'en'
            this.addLang = false
            $('.icon-eng').addClass('on')
            $('.icon-kor').removeClass('on')
            location.reload()
          // })
          // .catch(err => {
          //   console.log(err)
          // })
    },

  },
  created() {
    if (this.$route.name === 'pmtMain') {
      this.pathName = true
    } else {
      this.pathName = false
    }

    if(Cookies.get('Language-Type')) this.$i18n.locale = Cookies.get('Language-Type')
    
  },
  mounted() {
    slideMenu(); //모바일 메뉴
    lang(); //언어선택

    if (!Cookies.get('Language-Type')) {
      Cookies.set('Language-Type', 'ko', {expires:1})
      $('.icon-eng').removeClass('on')
      $('.icon-kor').addClass('on')
    } else if (Cookies.get('Language-Type') === 'ko') {
      $('.icon-eng').removeClass('on')
      $('.icon-kor').addClass('on')
    } else if (Cookies.get('Language-Type') === 'en') {
      $('.icon-kor').removeClass('on')
      $('.icon-eng').addClass('on')
    }

  },
  updated() {
    $('.btn-lang').removeClass('on')
    $('.lang').css('display', 'none')
  },
  destroyed() {
   
  }
}
</script>

<style lang="scss" src="@/styles/css_pmt.scss">

</style>
