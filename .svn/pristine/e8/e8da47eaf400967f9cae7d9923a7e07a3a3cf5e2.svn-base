<template>
  <section class="PolicyVue">
    <el-tabs type="card" v-model="selectedTabIndex" class="box_tab_sy">
      <el-tab-pane :label="$t('m_mypage.j015')"><!-- 이용약관 -->
        <div v-if="policyConts !== ''" class="policy_cont contsProps" v-html="policyConts"></div>
        <p v-else class="nodata_sy01">{{$t('m_mypage.j017-1')}}<!-- 약관 및 정책이 없습니다. --></p>
      </el-tab-pane>
      <el-tab-pane :label="$t('m_mypage.j016')"><!-- 개인정보처리방침 -->
        <div v-if="privacyConts !== ''" class="policy_cont contsProps" v-html="privacyConts"></div>
        <p v-else class="nodata_sy01">{{$t('m_mypage.j017-1')}}<!-- 약관 및 정책이 없습니다. --></p>
      </el-tab-pane>
      <el-tab-pane :label="$t('m_mypage.j017')"><!-- 오픈 소스 라이선스 -->
        <div v-if="licenceConts !== ''" class="policy_cont contsProps" v-html="licenceConts"></div>
        <p v-else class="nodata_sy01">{{$t('m_mypage.j017-1')}}<!-- 약관 및 정책이 없습니다. --></p>
      </el-tab-pane>
    </el-tabs>
  </section>
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
    resize() {
      var tabHei = document.getElementsByClassName('el-tabs__header')[0].offsetHeight;
      document.getElementsByClassName('el-tabs__content')[0].style.height = 'calc(100% - '+tabHei+'px)'; 
    },
  },
  created() {
    this.$EventBus.$emit('mobile-nav-title', this.$t('m_mypage.a010'));
    this.$EventBus.$emit('mobile-nav-menus', ['noDefault', 'close']);

    this.selectedTabIndex = this.$route.params.tabIndex;
  },
  mounted() {
    this.getList();
    window.onresize = this.resize;
  },
  updated() {
    this.resize();
  }
};
</script>
