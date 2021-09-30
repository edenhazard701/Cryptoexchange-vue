<template>
  <div class="PolicyVue">
    <h1 class="pageTitle">{{$t('cs.c001')}}</h1>
    <el-tabs type="card" v-model="selectedTabIndex" stretch class="category">
      <el-tab-pane :label="$t('cs.c002')"> <!-- 이용약관 -->
        <el-scrollbar><div class="contsProps" v-html="policyConts"></div></el-scrollbar>
      </el-tab-pane>

      <el-tab-pane :label="$t('cs.c003')"><!-- 개인정보처리방침 -->
        <el-scrollbar><div class="contsProps" v-html="privacyConts"></div></el-scrollbar>
      </el-tab-pane>

      <el-tab-pane :label="$t('cs.c004')"><!-- 오픈 소스 라이선스 -->
        <el-scrollbar><div class="contsProps" v-html="licenceConts"></div></el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { termsList } from '@/api/customers';
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      policyConts: '',		//이용약관 내용
      privacyConts: '',		//개인정보처리방침 내용
      licenceConts: '',		//오픈라이센스 내용
      selectedTabIndex: '',
    };
  },
  computed: {
   ...mapGetters(['getLangKind', 'getUnitcode'])
  },
  methods: {
		getList() {
			let self = this;
			termsList({
				langType: self.getLangKind=='EN'?'en':'ko',
        unitcode: self.getUnitcode
			}).then(res => {
        if (res.code == 20000) {
          let termsData = res.body;
          for (var i = 0; i < termsData.length; i ++) {
            if (termsData[i].termsTp == '1') {
              self.policyConts = termsData[i].conts;
            } else if (termsData[i].termsTp == '2') {
              self.privacyConts = termsData[i].conts;
            } else if (termsData[i].termsTp == '3') {
              self.licenceConts = termsData[i].conts;
            }
          }
        }
			}) 
    },
    langChangeCallback() {
      let self = this;
      self.$EventBus.$emit('pc-navi', [
        { label: self.$t('header.cs'), target: 'csNotice' },
        { label: self.$t('cs.a007'), target: null }
      ]);
      self.getList();
    }
  },
  created() {
    this.selectedTabIndex = this.$route.params.tabIndex;
    this.langChangeCallback();
    this.$EventBus.$on('langChange', this.langChangeCallback);
  },
	beforeDestroy() {
		let self = this;
		self.$EventBus.$off('langChange', self.langChangeCallback);
	}
};
</script>
