<template>
  <div class="MobileHeader" v-if="!this.menus.includes('nohead')" :class="this.menus.includes('border') ? 'border' : ''">
    <input type="checkbox" id="isCheck">
    <div class="header-wrapper">
      <div class="logo-wrapper" v-if="!this.menus.includes('main')" :class="{'sub': this.menus.includes('back')}">
        <span v-if="this.menus.includes('order')" @click="openItemList">
          <span v-html="itemNm"></span>
        </span>
        <span v-else v-html="navTitle"></span>
      </div>
      <div class="main-header" v-if="this.menus.includes('main')">
        <div class="logo">
          <img :src="require('@/images/m_kovex_logo.png')" alt="kovex">
        </div>
        <div class="language_select">
          <el-select v-model="$i18n.locale" popper-class="m_style m_language" @change="i18nChange">
            <el-option v-for="(lang, idx) in langs" :key="lang" :label="$i18n.t('header.' + lang)" :value="lang"></el-option>
          </el-select>
        </div>
      </div>
      <div class="back-btn-wrapper" v-if="this.menus.includes('back')">
        <el-button type="text" @click="moveMenu('back')"><i class="el-icon-arrow-left"></i></el-button>
      </div>
      <div class="right-btn-wrap">
        <div class="menu-btn-wrapper" v-if="this.menus.includes('notiGuide')">
          <el-button class="text-btn question-btn" v-on:click="notiGuideDialogVisible = true"><i class="el-icon-question"></i></el-button>

          <!-- dialog(알림안내 - 알림 메인)// -->
          <el-dialog :title="$t('m_noti.b001')" class="m_body_pop" :append-to-body="true" :visible.sync="notiGuideDialogVisible" :close-on-click-modal="false" center top="0"><!-- 유의사항 -->
            <div class="tit_list_cont">
              <div class="cont">
                <strong class="tit">{{$t('m_noti.b002')}}<!-- &lt;알림내역&gt; --></strong>
                <p class="txt">{{$t('m_noti.b003')}}<!-- 알림내역은 10일 이내의 내역만 표시됩니다. --></p>
              </div>
              <div class="cont">
                <strong class="tit">{{$t('m_noti.b004')}}<!-- &lt;등록 가능 종목&gt; --></strong>
                <p class="txt">{{$t('m_noti.b005')}}<!-- 거래소에 상장된 모든 종목에 대한 알림을 등록할 수 있습니다. --></p>
              </div>
              <div class="cont">
                <strong class="tit">{{$t('m_noti.b006')}}<!-- &lt;등록 가능 개수&gt; --></strong>
                <p class="txt">{{$t('m_noti.b007')}}<!-- 알림은 최대 30개까지 등록이 가능합니다. --><br>{{$t('m_noti.b008')}}<!-- 등록된 알림은 30일간 저장됩니다. --></p>
              </div>
              <div class="cont">
                <strong class="tit">{{$t('m_noti.b009')}}<!-- &lt;스마트폰 푸시&gt; --></strong>
                <p class="txt">{{$t('m_noti.b010')}}<!-- 설정한 알림 푸시를 받기 위해서는 앱 설치 후 1회 로그인이 필요합니다. --><br>{{$t('m_noti.b011')}}<!-- 푸시는 마지막으로 로그인된 스마트폰으로 전송됩니다. --></p>
              </div>
              <div class="btm_cont">
                <strong class="tit">{{$t('m_noti.b012')}}<!-- * 알림 설정 유의사항 --></strong>
                <p class="txt">{{$t('m_noti.b013')}}<!-- 네트워크 상황과 디바이스 상태에 따라 알림 수신이 지연되거나 수신되지 않을 수 있으니 유의 바랍니다. --></p>
              </div>
            </div>
            <div slot="footer" class="dialog-footer full_footer">
              <el-button type="primary"  @click="notiGuideDialogVisible = false">{{$t('m_noti.b014')}}<!-- 닫기 --></el-button>
            </div>
          </el-dialog>
          <!-- //dialog(알림안내 - 알림 메인) -->
        </div>
        <div class="menu-btn-wrapper" v-if="this.menus.includes('notiSettingGuide')">
          <el-button class="text-btn question-btn" v-on:click="notiGuideDialogVisible = true;$EventBus.$emit('downChart');"><i class="el-icon-question"></i></el-button>
          <!-- dialog(알림안내 - 알림 등록)// -->
          <el-dialog :title="$t('m_noti.e006')" class="m_body_pop" :append-to-body="true" :visible.sync="notiGuideDialogVisible" :close-on-click-modal="false" center top="0"><!-- 유의사항 -->
            <div class="tit_list_cont">
              <div class="cont">
                <strong class="tit">{{$t('m_noti.e007')}}<!-- &lt;알림 안내&gt; --></strong>
                <p class="txt">· {{$t('m_noti.e008')}}<!-- 지정가 알림 --> :<br>
                  {{$t('m_noti.e009')}}<!-- 지정가격 도달 후에도 등록된 알림은 유지됩니다. --><br>
                  {{$t('m_noti.e010')}}<!-- 단, 도달 후 1시간 동안 알림이 재발송되지 않습니다. -->
                </p>
                <p class="txt">· {{$t('m_noti.e011')}}<!-- 등락 알림 --> :<br>
                  {{$t('m_noti.e012')}}<!-- 지정 등락률 도달 후에도 등록된 알림은 유지됩니다. --><br>
                  {{$t('m_noti.e013')}}<!-- 단, 도달 후 1시간 동안 알림이 재발송되지 않습니다. -->
                </p>
                <p class="txt">· {{$t('m_noti.e014')}}<!-- 거래량 알림 --> :<br>
                  {{$t('m_noti.e015')}}<!-- 지정 거래량 도달 후에도 등록된 알림은 유지됩니다. --><br>
                  {{$t('m_noti.e016')}}<!-- 단, 도달 후 1시간 동안 알림이 재발송되지 않습니다. -->
                </p>
              </div>
              <div class="cont">
                <strong class="tit">{{$t('m_noti.e017')}}<!-- &lt;등록 가능 종목&gt; --></strong>
                <p class="txt">{{$t('m_noti.e018')}}<!-- 거래소에 상장된 모든 종목에 대한 알림을 등록할 수 있습니다. --></p>
              </div>
              <div class="cont">
                <strong class="tit">{{$t('m_noti.e019')}}<!-- &lt;등록 가능 개수&gt; --></strong>
                <p class="txt">
                  {{$t('m_noti.e020')}}<!-- 알림은 최대 30개까지 등록이 가능합니다. --><br>
                  {{$t('m_noti.e021')}}<!-- 등록된 알림은 최대 30일간 저장됩니다. -->
                </p>
              </div>
              <div class="cont">
                <strong class="tit">{{$t('m_noti.e022')}}<!-- &lt;스마트폰 푸시&gt; --></strong>
                <p class="txt">
                  {{$t('m_noti.e023')}}<!-- 설정한 알림 푸시를 받기 위해서는 앱 설치 후 1회 로그인이 필요합니다. --><br>
                  {{$t('m_noti.e024')}}<!-- 푸시는 마지막으로 로그인된 스마트폰으로 전송됩니다. -->
                </p>
              </div>
            </div>
            <div slot="footer" class="dialog-footer full_footer">
                <el-button type="primary"  @click="notiGuideDialogVisible = false">{{$t('m_noti.g011')}}<!-- 닫기 --></el-button>
            </div>
          </el-dialog>
          <!-- //dialog(알림안내 - 알림 등록) -->
          </div>
          <div class="bankhis-btn-wrapper" @click="moveMenu('mBankHistory')" v-if="this.menus.includes('bankHistory')">
            <el-button type="text"><i class="el-icon-document bankhis-btn"></i></el-button>
          </div>  
          <div :class="{'filter-btn-wrapper' : !applyFilter, 'filter-btn-wrapper on' : applyFilter}" @click="openFilter" v-if="this.menus.includes('filter')"> <!-- 필터 적용시 class on -->
            <el-button type="text"><i class="el-icon-setting filter-btn"></i></el-button>
          </div>
          <div v-show="chkApp" class="noti-btn-wrapper" @click="openNotification" v-if="this.menus.includes('notification')">
            <el-button type="text"><i class="el-icon-bell noti-btn"></i></el-button>
          </div>
          <div v-show="chkApp" class="noti-btn-wrapper" @click="openNotificationSetting" v-if="this.menus.includes('notificationSetting')">
            <el-button type="text"><i class="el-icon-bell noti-btn" :class="{'noti': isNotiCurSymbol}"></i></el-button>
          </div>
          <div v-show="!chkApp" class="menu-btn-wrapper" @click="openContent" v-if="!this.menus.includes('noDefault')">
            <el-button type="text"><i class="el-icon-menu menu-btn"></i></el-button>
          </div>
          <div class="close-btn-wrapper" @click="popClose" v-if="this.menus.includes('close')">
            <el-button type="text"><i class="close-btn"></i></el-button>
          </div>
      </div>
    </div>
    <!-- 첫화면 슬라이드 메뉴 -->
    <div class="slide" id="header_slide">
      <div class="content-wrap">
        <div class="home-top-bx">
          <el-button type="text" class="lnk-home" @click="moveHome"><i class="el-icon-home">홈으로 이동</i></el-button>
        </div>
        <div class="content">
          <el-button v-show="!isLoggedIn" @click="moveMenu('mLogin');">{{$t('m_main.e001')}}<!-- 로그인 --></el-button>
          <el-button v-show="isLoggedIn" @click="mobileLogout">{{$t('m_main.e003')}}<!-- 로그아웃 --></el-button>
          <el-button v-show="!isLoggedIn" @click="moveMenu('mGuideToKovexApp');">{{$t('m_main.e002')}}<!-- 회원가입 --></el-button>
        </div>
        <el-button type="text" class="close-btn" @click="closeContent"><i class="el-icon-close"></i></el-button>
        <div class="menu-content">
          <!-- 기본 메뉴가 아닌 다른 메뉴를 사용하는 경우 -->
          <div v-if="false"><side-menu-extra1></side-menu-extra1></div>
          <!-- 기본 메뉴 -->
          <div v-else><side-menu-default></side-menu-default></div>
        </div>
      </div>
      <div class="click-area" @click="closeContent"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import SideMenuDefault from './SideMenuDefault';
import SideMenuExtra1 from './SideMenuExtra1';

export default {
  components: {
    SideMenuDefault,
    SideMenuExtra1
  },
  data () {
    return {
      navTitle: '',
      itemNm: '',
      notiGuideDialogVisible: false,
      menus: [],
      langs: ['ko', 'en'],
      chkApp: false,
      applyFilter: false,
      isNotiCurSymbol: false,
      
      //회원가입
      registrationPagesNm: [
        'mGuideToKovexApp',
        'mMyKeepInIntro',
        'mRegiIntro',
        'mTermAgree',
        'mAppInstallGuide',
        'mMobileIdConfirmed',
        'mRegiComplete',
        'mRegiRefused',
        'mRegiFail'        
      ],
      //계좌만들기
      accCreatePagesNm: [   
        'mAccCreateIntro',
        'mAccCreateResume',
        'mBranchSelect',
        'mIdSubmit',
        'mAccIdconfirmed',
        'mCustomerInfo',
        'mResidenceInfo',
        'mJobInfo',
        'mJobAddrInfo',
        'mInvestInfo',
        'mOneWonVerifi1',                     
        'mOneWonVerifi2',
        'mOneWonVerifiComplete',
        'mOneWonVerifiPostponed'    
      ],
      closeFromRegi:'',
      closeFromAcc:'',
    };
  },
  watch: {
    getLangKind(val, old) {
      this.$i18n.locale = (val=='EN'?'en':'ko');
    },
    $route (to, from){
      const self = this;   
     // console.log("from:"+from.name)
     // console.log("to:"+to.name)
      self.closeFromRegi = self.registrationPagesNm.includes(to.name)     
      self.closeFromAcc = self.accCreatePagesNm.includes(to.name)
    //  console.log("closeFromRegi:"+self.closeFromRegi)
    //  console.log("closeFromAcc:"+self.closeFromAcc)
    }
  },
  methods : {
    ...mapActions(['logout']),        
    i18nChange(val) {
      let self = this;
      const langKind = val == 'ko' ? 'KR' : 'EN';
      // window.localStorage.setItem('langKind', langKind);
      self.$i18n.locale = val;

      if (!self.isLoggedIn) {
        self.$store.commit("setLangKind", langKind);
        return;
      }

      self.$store.dispatch('setLangKind', {lang_kind : langKind}).then((obj) => {
        self.$alert(self.$t('m_main.g001'), '', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: 'OK'
        });
      })
    },
    mobileLogout(){
      this.$store.dispatch('logout');
      this.moveMenu('mMain');
    },
    openContent(e) {
      document.getElementById('isCheck').checked = true;
    },
    closeContent(e) {
      document.getElementById('isCheck').checked = false;
    },
    moveHome(e){
      this.moveMenu('mMain')
      document.getElementById('isCheck').checked = false;
    },
    openNotification(e) {
      this.moveMenu('mNotification');
    },
    openNotificationSetting(e) {
      this.$router.push({
        name: 'mNotificationSettingDetail',
        params: {itemId: this.currentSymbol}
      })
    },
    moveMenu(menu) {    
       console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>  moveMenu:'+menu)
      if(menu) {  // el-menu의 menu-item이 아닌 로그인 등의 버튼 클릭 시 해당 페이지로 이동
        if(menu === 'back') {
          this.$router.go(-1);
        } else {
          this.$router.push({name: menu});
        }
      }
      if(document.getElementById('isCheck').checked) {
        this.closeContent();
      }
    },
    changeTitle(title) {
      this.navTitle = title;
    },
    openFilter() {
      this.$EventBus.$emit("openFilterIndex", this.menus[2].filterIdx);
    },
    openItemList(e){
      this.$EventBus.$emit('click-item-list', e);
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>  openItemList ')
    },
    popClose() { 
      //현재 메뉴가 회원가입이거나 계좌만들기인데 닫기 버튼 클릭한 경우
      if(this.closeFromRegi == true || this.closeFromAcc == true)
      {   // 닫기 후 메인페이지 이동되었을 때 디바이스 백버튼을 통해 회원가입 계좌만들기로 돌아가면 안됨 (히스토리 삭제)
          this.$router.push({name: 'mMain'});
          //히스토리 삭제-> 메인에서 백버튼 눌렀을 때 회원가입중인 페이지로 가면 안됨
          // history.pushState(null, document.title, location.href);
          // history.back();
          // history.forward();
          // window.onpopstate = function () {
          //     history.go(1);
          // };
      }   
      else
      {
          this.$router.go(-1);
      }     
    },
    closeDialog() {
      this.$EventBus.$emit("upChart");
    }
  },
  created() {
    this.$EventBus.$on('mobile-nav-title', (title) => {
      this.changeTitle(title);
    });
    this.$EventBus.$on('mobile-nav-menus', (menu) => {
      this.menus = menu;
      if (menu[1] == 'filter') {
        this.applyFilter = !menu[2].defaultFilter
      }
    });
    this.$EventBus.$on('mobile-title-link', (itemNm) => {
      this.itemNm = itemNm;
    });
    this.$EventBus.$on('mobile-noti', (isNoti) => {
      this.isNotiCurSymbol = isNoti;
    });
  },
  computed: {
    ...mapState({
      currentSymbol : state => state.data.currentSymbol
    }),
    ...mapGetters(['isLoggedIn', 'getLangKind'])
  },
  mounted() {
    /* 네이티브 앱 체크 */
    var self = this;
    if (afc.isDevice) {
      self.chkApp = true;
    }

    console.log('currentMenu:'+self.menus)
  }
};
</script>
