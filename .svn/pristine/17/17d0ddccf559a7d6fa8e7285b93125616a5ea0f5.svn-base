<template>
  <el-container class="HeaderVue" :class="{'main':navis === 'main'}">
    <el-row class="header-vue">
      <el-col class="header-menu">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
          <el-menu-item index="0" :route="{name:'main'}" class="kovex-logo">UNIVAX</el-menu-item>
          <!-- 거래소  -->
          <el-submenu index="1" class="menu1" :class="{'nowPage': nowPage == 'exchange', 'en': $i18n.locale == 'en'}">
            <template slot="title"><router-link to="/exchange">{{ $t('header.exchange') }}</router-link></template>
            <el-menu-item index="1-1" :route="{name:'exchange'}"><!-- 일반 -->{{ $t('exchange.a002') }}</el-menu-item>
            <el-menu-item index="" class="full">
              <router-link :to="{name: 'fullexchange', params : { langKind : 'en' }}" target="_blank"><!-- 풀스크린 -->{{ $t('exchange.a003') }}</router-link>
            </el-menu-item>
            <el-menu-item index="1-3" :route="{name:'signHistory'}"><!-- 거래내역 -->{{ $t('order.a001') }}</el-menu-item>
          </el-submenu>
          <!-- 자산 -->
          <el-submenu index="2" class="menu2" :class="{'nowPage': nowPage == 'assetProfit', 'en': $i18n.locale == 'en'}">           
              <template slot="title">
                <div v-if="navis == 'main'">
                  <el-button @click="accCreatePopup('assetProfit')"  type="text"  :style="mainAssetProfitHeaderStyle">{{ $t('header.asset') }}</el-button>
                </div>
                <div v-else>
                  <el-button @click="accCreatePopup('assetProfit')"  type="text"  :style="assetProfitHeaderStyle">{{ $t('header.asset') }}</el-button>
                </div>
              </template>
            <el-menu-item  @click="accCreatePopup('assetProfit')" ><!-- 투자손익 -->{{ $t('balances.a002') }}
               <el-label  style="font-size:17px;font-weight:300;color:white;"></el-label>
            </el-menu-item>
            <el-menu-item  @click="accCreatePopup('assetStatus')"><!-- 자산현황 -->{{ $t('balances.b001') }}
               <el-label  style="font-size:17px;font-weight:300;color:white;"></el-label>
            </el-menu-item>
          </el-submenu>
          <!-- 입출금 -->
          <el-submenu index="3" class="menu3" :class="{'nowPage': nowPage == 'depositWithdraw', 'en': $i18n.locale == 'en'}">             
              <template slot="title">
                <div v-if="navis == 'main'">
                  <el-button @click="accCreatePopup('depositWithdraw')"  type="text"  :style="mainDepositWithdrawHeaderStyle">{{ $t('header.wallet') }}</el-button>
                </div>
                <div v-else>
                  <el-button @click="accCreatePopup('depositWithdraw')"  type="text"  :style="depositWithdrawHeaderStyle">{{ $t('header.wallet') }}</el-button>
                </div>       
             </template>
             <el-menu-item  @click="accCreatePopup('depositWithdraw')"><!-- 입출금 -->{{ $t('asset_in.a006') }}
               <el-label  style="font-size:17px;font-weight:300;color:white;"></el-label>
            </el-menu-item>
            <el-menu-item  @click="accCreatePopup('bankHistory')" ><!-- 입출금내역 -->{{ $t('asset_in.a011') }}
               <el-label  style="font-size:17px;font-weight:300;color:white;"></el-label>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4" class="menu4" :class="{'nowPage': nowPage == 'screener', 'en': $i18n.locale == 'en'}">
            <template slot="title"><router-link to="/screener">{{$t('main.h014')}}<!-- 스크리너 --></router-link></template>
          </el-submenu>
          <!-- <el-submenu index="4" class="menu4" :class="{'nowPage': nowPage == 'tdiList', 'en': $i18n.locale == 'en'}">
            <template slot="title"><router-link to="/tdi/tdilist">{{ $t('header.smart') }}</router-link></template>
            <el-menu-item index="4-1" :route="{name:'tdiList'}">TDI</el-menu-item>
            <el-menu-item index="4-2" :route="{name:'signalInfo'}">{{$t('main.d004')}}</el-menu-item>
            <el-menu-item index="4-3" :route="{name:'screener'}">{{$t('main.h014')}}</el-menu-item>
          </el-submenu> -->
          <!-- <el-submenu index="5" class="menu5" :class="{'nowPage': nowPage == 'kovexcoinintroduce', 'en': $i18n.locale == 'en'}">
            <template slot="title"><router-link to="/introduce">{{ $t('header.coin') }}</router-link></template>
            <el-menu-item index="5-1" :route="{name:'kovexcoinintroduce'}">{{$t('mining.a002')}}</el-menu-item>
            <el-menu-item index="5-2" :route="{name:'kovexcoinminingdividend'}">{{$t('mining.a003')}}</el-menu-item>
            <el-menu-item index="5-3" :route="{name:'kovexcoinsituation'}">{{$t('mining.c001')}}</el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-col>
      <el-col class="header-right">
        <div class="gnb-right">
          <el-menu class="el-menu-demo" :class="{'header-icon': isLoggedIn}" mode="horizontal" @select="handleSelect" :router="true">
            <el-submenu index="7" v-if="isLoggedIn" class="gnb-alarm">
              <template slot="title">
                <!-- 알림이 등록되었을 때 나타남 -->
                <router-link to="/notification/setting" class="header-alarm">{{ $t('header.noti') }}</router-link>
              </template>
              <el-menu-item index="7-1" :route="{name:'notificationSetting'}">{{$t('noti.a001')}}<!-- 알림설정 --></el-menu-item>
              <el-menu-item index="7-2" :route="{name:'notificationHistory'}">{{$t('noti.f001')}}<!-- 알림내역 --></el-menu-item>
            </el-submenu> 
            <el-submenu index="6" class="gnb-customer">
              <template slot="title">
                <router-link :class="{'header-cs': isLoggedIn}" to="/customers/notice">{{ $t('header.cs') }}</router-link>
              </template>
              <el-menu-item index="6-1" :route="{name:'csNotice'}">{{$t('cs.a001')}}<!-- 공지사항 --></el-menu-item>
              <el-menu-item index="6-2" :route="{name:'csNews'}">{{$t('cs.a002')}}<!-- KOVEX 소식 --></el-menu-item>
              <el-menu-item index="6-3" :route="{name:'csHowtouse'}">{{$t('cs.a003')}}<!-- 이용방법 --></el-menu-item> 
              <el-menu-item index="6-4" :route="{name:'csQna'}">{{$t('m_mypage.a008')}}<!-- 1:1문의 --></el-menu-item>
              <el-menu-item index="" class="full"><a href="http://pf.kakao.com/_PdmGj/chat" target="_blank">{{$t('cs.a005')}}<!-- 카카오톡 문의 --></a></el-menu-item>
              <el-menu-item index="6-5" :route="{name:'csFaq'}">{{$t('cs.a006')}}<!-- 자주하는 질문 --></el-menu-item>
              <el-menu-item index="6-6" :route="{name:'csPolicy'}">{{$t('cs.a007')}}<!-- 약관 및 정책 --></el-menu-item>
            </el-submenu> 
            <el-submenu index="8" v-if="isLoggedIn" class="gnb-my">
              <template slot="title">
                <router-link to="/mypage/myinfo" class="header-my">{{ $t('header.me') }}</router-link>
              </template>
              <el-menu-item index="8-1" :route="{name:'mypageInfo'}">{{$t('mypage.a001')}}<!-- 회원정보 --></el-menu-item>
              <!-- <el-menu-item index="8-2" :route="{name:'mypageSecurity'}">{{$t('mypage.a002')}}</el-menu-item> --> <!-- 인증센터 -->
              <el-menu-item index="8-3" :route="{name:'mypageOpenApi'}">{{$t('mypage.a003')}}<!-- API 관리 --></el-menu-item>
              <el-menu-item index="8-4" :route="{name:'mypageLog'}">{{$t('mypage.a006')}}<!-- 접속정보확인 --></el-menu-item>
              <el-menu-item index="8-5" :route="{name:'mypageRestriction'}">{{$t('mypage.a008')}}<!-- 거래 제한 등록/해지 --></el-menu-item>
              <el-menu-item index="8-6" :route="{name:'mypagePreference'}">{{$t('mypage.a007')}}<!-- 공통설정 --></el-menu-item>
              <el-menu-item index="8-7" :route="{name:'login'}" @click="logout">{{$t('login.f001')}}<!-- 로그아웃 --></el-menu-item>
            </el-submenu>
            <el-menu-item v-if="!isLoggedIn" index="9" :route="{name:'login'}" class="gnb-login"><span>{{ $t('header.login') }}</span></el-menu-item>
            <el-menu-item v-if="!isLoggedIn" index="10" :route="{name: 'registration'}" class="gnb-register"><span>{{ $t('header.signup') }}</span></el-menu-item>
          </el-menu>
          <el-select v-model="$i18n.locale" @change="i18nChange" size="mini" slot="title" class="locale-changer" popper-class="local-popper">
            <el-option v-for="(lang, idx) in langs" :key="lang" :label="$i18n.t('header.' + lang)" :value="lang"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios'

export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      langs: ['ko', 'en'],
      navis: [],
      nowPage: '',
      mainAssetProfitHeaderStyle: 'width:73px;font-size:18px;font-weight:400;color:black;padding:0px 20px;margin-bottom:5px;margin-left:10px',
      assetProfitHeaderStyle: 'width:73px;font-size:17px;font-weight:300;color:white;padding:0px 20px;margin-bottom:5px;margin-left:10px',
      mainDepositWithdrawHeaderStyle: 'width:90px;font-size:18px;font-weight:400;color:black;padding:0px 20px;margin-bottom:5px;margin-left:10px',
      depositWithdrawHeaderStyle: 'width:90px;font-size:17px;font-weight:300;color:white;padding:0px 20px;margin-bottom:5px;margin-left:10px'  
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getLangKind', 'getUserId', 'getUnitcode']),
  },
  watch: {
    getLangKind(val, old) {
      this.$i18n.locale = val == 'EN' ? 'en' : 'ko'
      this.$EventBus.$emit('langChange');
    }
  },
  methods: {
    ...mapActions(['logout']),
    handleSelect(key, keyPath) {
        console.log(key, keyPath)
    },
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
        self.$alert(self.$t('main.i001'), '', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: 'OK'
        });
      })
    },
    accCreatePopup(nameTo){
       let self = this;

       //계좌생성된 상태가 아니면
       if( self.getUnitcode == '00999' )
       {
          self.$confirm('계좌만들기 후 이용 가능합니다.', '', {
              confirmButtonText: '계좌만들기',
              cancelButtonText: self.$t('m_mypage.k040')                 
          }).then(() => {     
              
              self.$router.push({name:'registration', params:{ from: 'acc'}}).catch(()=>{});           
            
          })
       }
       else
       {
          self.$router.push({name:nameTo}) 
       }
    }
  },
  created() {
    this.$EventBus.$on('pc-navi', (navi) => {
      this.navis = navi;    
      if (this.navis) {
        this.nowPage = this.navis[0].target ;     
      }
    });
  }
};
</script>
