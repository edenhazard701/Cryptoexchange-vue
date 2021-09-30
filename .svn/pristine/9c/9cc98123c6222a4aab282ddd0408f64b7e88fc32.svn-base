<template>
  <section class="howToVue">
    <el-tabs type="card" class="box_tab_sy">
      <el-tab-pane :label="$t('m_mypage.j020')"><!-- 회원가입 --><div class="howto_cont contsProps" v-html="joinConts"></div></el-tab-pane>
      <el-tab-pane :label="$t('m_mypage.j021')"><!-- 로그인 --><div class="howto_cont contsProps" v-html="loginConts"></div></el-tab-pane>
      <el-tab-pane :label="$t('m_mypage.j022')"><!-- 매수/매도 --><div class="howto_cont contsProps" v-html="buySellConts"></div></el-tab-pane>
      <el-tab-pane :label="$t('m_mypage.j023')"><!-- 입출금 --><div class="howto_cont contsProps" v-html="walletConts"></div></el-tab-pane>
      <el-tab-pane :label="$t('m_mypage.j024')"><!-- 거래 이용안내 --><div class="howto_cont contsProps" v-html="dealConts"></div></el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import { infoList } from '@/api/customers';
import {  mapGetters } from 'vuex'

export default {
  data() {
    return {
      joinConts: '',		//회원가입 내용
      loginConts: '',		//로그인 내용
      buySellConts: '',	//매수매도 내용
      walletConts: '',	//입출금 내용
      dealConts: ''	  	//거래이용안내 내용
    };
  },
  computed: {
   ...mapGetters(['getLangKind', 'getUnitcode'])
  },
  methods: {
		getList() {
      let self = this;
      infoList({
        infoMediaTp : '2',
        langType: self.getLangKind=='EN'?'en':'ko',
        unitcode: self.getUnitcode
      }).then(res => {
        console.log("infoList", res);
        if (res.code == 20000) {
          let infoData = res.body;
          for (var i = 0; i < infoData.length; i ++) {
            if (infoData[i].infoCtTp == '5') {
              self.dealConts = infoData[i].conts;
            } else if (infoData[i].infoCtTp == '4') {
              self.walletConts = infoData[i].conts;
            } else if (infoData[i].infoCtTp == '3') {
              self.buySellConts = infoData[i].conts;
            } else if (infoData[i].infoCtTp == '2') {
              self.loginConts = infoData[i].conts;
            } else if (infoData[i].infoCtTp == '1') {
              self.joinConts = infoData[i].conts;
            }
          }
        }
      });
    },
		resize() {
			var tabHei = document.getElementsByClassName('el-tabs__header')[0].offsetHeight;
			document.getElementsByClassName('el-tabs__content')[0].style.height = 'calc(100% - '+tabHei+'px)'; 
		},
	},
  created() {
    this.$EventBus.$emit('mobile-nav-title', this.$t('m_mypage.a006'));
    this.$EventBus.$emit('mobile-nav-menus', ['noDefault', 'close']);
  },
  mounted () {
		this.getList();
    window.onresize = this.resize;
    
		// setTimeout(function () {
		// 	var tabHei = document.getElementsByClassName('el-tabs__header')[0].offsetHeight;
		// 	document.getElementsByClassName('el-tabs__content')[0].style.height = 'calc(100% - '+tabHei+'px)'; 
		// }, 0);
  },
  updated() {
    this.resize();
  },
};
</script>
