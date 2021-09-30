<template>
  <div class="HowToUse">
    <h1 class="pageTitle">{{$t('cs.d001')}}</h1>
    <el-tabs type="card" stretch class="category">
      <el-tab-pane :label="$t('cs.d002')"><!-- 회원가입 --><div class="contsProps" v-html="joinConts"></div></el-tab-pane>
      <el-tab-pane :label="$t('cs.d003')"><!-- 로그인 --><div class="contsProps" v-html="loginConts"></div></el-tab-pane>
      <el-tab-pane :label="$t('cs.d004')"><!-- 매수/매도 --><div class="contsProps" v-html="buySellConts"></div></el-tab-pane>
      <el-tab-pane :label="$t('cs.d005')"><!-- 입출금 --><div class="contsProps" v-html="walletConts"></div></el-tab-pane>
      <el-tab-pane :label="$t('cs.d006')"><!-- 거래 이용 안내 --><div class="contsProps" v-html="dealConts"></div></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { infoList } from '@/api/customers';
import { mapGetters } from 'vuex';

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
        infoMediaTp : '1',
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
    langChangeCallback() {
      let self = this;
      self.$EventBus.$emit('pc-navi', [
        { label: self.$t('header.cs'), target: 'csNotice' },
        { label: self.$t('cs.a003'), target: null }
      ]);
      self.getList();
    }
  },
  mounted() {
    let self = this;
    self.langChangeCallback();
		self.$EventBus.$on('langChange', self.langChangeCallback);
  },
	beforeDestroy() {
		let self = this;
		self.$EventBus.$off('langChange', self.langChangeCallback);
	}
};
</script>
