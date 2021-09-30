<template>
  <div class="myPage">
    <el-row class="member_name">
      <span v-html="$t('m_mypage.a001', [userNm])"></span>
      <!-- 환영합니다. <span class="name">{{ userNm }}</span> <span class="s_txt">님</span> -->
      <div class="logout_btn">
        <el-button class="btn_m_sy01" @click="mobileLogout">{{$t('m_mypage.a002')}}<!-- 로그아웃 --></el-button>
      </div>
    </el-row>

    <el-row class="member_email">      
      <el-button type="text" @click="moveMyInfo">{{ "내 정보 수정하기" }}</el-button>         
    </el-row>

    <el-row class="member_menu">
      <el-menu :default-active="activeMenuIndex()" :router="true">
        <el-menu-item class="member_menu01" :route="{name: 'mNews'}" index="1">{{ $t('m_mypage.a003') }}<!--  KOVEX 소식 --><i class="el-icon-arrow-right"></i></el-menu-item>
        <!-- <el-menu-item class="member_menu02" :route="{name: 'mMySecurity'}" index="2">{{ $t('m_mypage.a004') }}<i class="el-icon-arrow-right"></i></el-menu-item> --> <!-- 인증센터 -->
        <el-menu-item class="member_menu03" :route="{name: 'mMyLog'}" index="3">{{ $t('m_mypage.h005') }}<!-- 접속정보확인 --></el-menu-item>
        <el-menu-item class="member_menu04" :route="{name: 'mMyPreference'}" index="4">{{ $t('m_mypage.a005') }}<!-- 공통설정 --></el-menu-item>
        <el-menu-item class="member_menu05" :route="{name: 'mFaq'}" index="5">{{ $t('m_mypage.a007') }}<!-- 자주하는 질문 --></el-menu-item>
        <el-menu-item class="member_menu06" :route="{name: 'mHowToUse'}" index="6">{{ $t('m_mypage.a006') }}<!-- 이용방법 --></el-menu-item>
        <el-menu-item class="member_menu07" :route="{name: 'mQna'}" index="7">{{ $t('m_mypage.a008') }} <!-- 1:1문의 --><i class="el-icon-arrow-right"></i></el-menu-item>
        <el-menu-item class="member_menu08" index=""><a class="menu_link" href="http://pf.kakao.com/_PdmGj/chat" target="_blank">{{ $t('m_mypage.a009') }}<!-- 카카오톡 문의 --></a></el-menu-item>
        <el-menu-item class="member_menu09" :route="{name: 'mCsPolicy'}" index="9">{{ $t('m_mypage.a010') }}<!-- 약관 및 정책 --></el-menu-item>
      </el-menu>
    </el-row>
    <div class="app-version" v-if="chkApp">앱 버전 v{{ app_ver }} ({{ viewTimeStamp }})</div>
    <el-row class="notice">
      <div class="notice_title" @click="moveNotice">{{ $t('m_mypage.a011') }}<!-- 공지사항 --></div>
      <div class="notice_table_wrap">
        <div class="notice-table">
          <div v-for="data in noticeData" :key="data.value" @click="noticeRowClicked(data)" :class="data.noticeTp == '2' ? 'noti_cell headline' : 'noti_cell'"> <!-- headline일때 li에 class headline추가 -->
            <p class="cont"><span class="title">{{ data.subj }}</span></p>
            <p class="date" v-show="data.noticeTp != '2'">{{ data.regDt | dateFormat }}</p>
          </div>
        </div>
        <p class="nodata_sy02" v-if="noticeData.length === 0">{{$t('m_mypage.j027-1')}}<!-- 공지사항이 없습니다. --></p>
      </div>
    </el-row>
    
    <!-- Native App일 때만 나타남 -->
    <app-menu></app-menu>
  </div>
</template>

<script>
import { noticeHead, noticeList, noticeViews } from '@/api/customers';
import AppMenu from './common/MobileFooterMenu';
import { mapGetters } from 'vuex'

export default {
  components: {
    AppMenu
  },
  data () {
    return {
      userNm: '',
      unitKorNm: '',
      userEngNm: '',
      userBrthDay: '',
      userEngSurnm: '',
      authMoblNo: '',

      noticeData: [],
      currentPage: 1,
      noticePageSize: 4,
      
      chkApp: false
    };
  },
  computed:{
    ...mapGetters(['getLangKind', 'getUnitcode', 'getUserId']),
    socketConnected() {
      return this.$store.getters.isSocketConnected
    },
    myInfo() {
      let self = this
      self.$store.dispatch('myInfo', { user_id:self.getUserId }).then((data) => {
        console.log('myInfo Success', data);

        //이름 마스킹처리
        let nm = data.user_nm
        if (nm.length == 1) {
          self.userNm = nm;
        } else if (nm.length == 2) {
          self.userNm = nm.substring(0,1) + "*";
        } else if (nm.length > 2 && nm.length < 4 ) {
          self.userNm = nm.replace(/(.?)?(.{1,2})?(.+)/, '$1*$3')  
        } else {        
          self.userNm = nm.substring(0, 1) + "**" + nm.substring(nm.length-1);
        }        
        console.log("user_nm:" +self.userNm )
        self.unitKorNm = data.unit_kor_nm
        self.userEngNm = data.user_eng_nm
        let date = data.user_brth_day
        self.userBrthDay = date.substring(0,4) + '.' + date.substring(4,date.length-2)  + '.' + date.substring(date.length-2,date.length) //1981.1.14
        console.log("user_brth_day:" +self.userBrthDay )
        self.userEngSurnm = data.user_eng_surnm
        let authMoblNo = data.auth_mobl_no
        self.authMoblNo = authMoblNo.substring(0,3) + '-' +  authMoblNo.substring(3,7) + '-' + authMoblNo.substring(7)  //01094898114
        console.log("auth_mobl_no:" +self.authMoblNo )
      })

      //모바일 App에서 앱버전 및 화면최종 버전처리 날짜 표시
      if (afc.isDevice) {
        AppManager.getVersion(function(result){
          self.app_ver = result;
        });
      }

      // self.viewTimeStamp = new Date().format("yyyy/MM/dd hh:mm");
      self.viewTimeStamp = "2019/05/10 10:20";
    }
  },
  watch: {
    socketConnected() {
      this.myInfo
    },
  },
  methods: {
    mobileLogout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'mMain' });
    },
    moveMyInfo() {
      this.$router.push({ name: 'mMyInfo' });
    },
    moveNotice() {
      this.$router.push({ name: 'mNotice' });
    },
    activeMenuIndex: function () {
      switch (this.$route.name) {
        case 'mMySecurity': return '1';
        case 'mMyLog': return '2';
        case 'mMyPreference': return '3';
        case 'mQna': return '4';
        case 'mFaq': return '5';
        case 'mCsPolicy': return '6';
        default : return '0';
      }
    },
    noticeRowClicked(row){
      let self = this;
      noticeViews({
        noticeMngNo: row.noticeMngNo,
        langType: self.getLangKind == 'KR' ? 'ko' : 'en',
        unitcode: self.getUnitcode
      }).then(res => {
        console.log("noticeViews_res:", JSON.stringify(res))
      }).catch(err => {
        console.log('공지사항 목록 카운트 실패', err);
      })
      self.$router.push({ name: 'mNoticeDetail', query: { no: row.noticeMngNo } });
    },
    getNoticeHead() {
      let self = this;
      console.log("getLangKind:", self.getLangKind);
      console.log("getUnitcode:", self.getUnitcode);
      noticeHead({
        langType: self.getLangKind == 'KR' ? 'ko' : 'en',
        unitcode: self.getUnitcode      
      }).then(res => {       
        self.noticeData = res.body;
        console.log("noticeHead_res:", JSON.stringify(res));
      }).catch(err => {
        console.log('공지사항 목록 조회 실패', err);
      }).finally(_ => {
        self.noticePageSize = self.noticePageSize - self.noticeData.length;
        if (self.noticePageSize > 0) {
          self.getNoticeList();
        }
      });
    },
    getNoticeList() {
      let self = this;
      noticeList({
        currentPage: self.currentPage,
        pageSize: self.noticePageSize,
        langType: self.getLangKind == 'KR' ? 'ko' : 'en',
        unitcode: self.getUnitcode
      }).then(res => {
        //console.log("noticeList", res);
        self.noticeData = self.noticeData.concat(res.body);
      }).catch(err => {
        console.log('공지사항 목록 조회 실패', err);
      })
    },
  },
  created() {
    this.getNoticeHead();
    
    this.$EventBus.$emit('mobile-nav-title', this.$t('m_main.e008'));
    this.$EventBus.$emit('mobile-nav-menus', []);

    window.scroll(0, 0);
  },
  mounted() {
    if(this.$store.getters.isSocketConnected) this.myInfo

    /* 네이티브 앱 체크 */
    var self = this;
    if (afc.isDevice) {
      self.chkApp = true;
    }
  },
};
</script>
