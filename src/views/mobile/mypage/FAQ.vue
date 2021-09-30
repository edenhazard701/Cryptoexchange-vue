<template>
  <section class="FAQVue">
    <el-tabs type="card" @tab-click="handleClick" class="box_tab_sy">
      <el-tab-pane :label="$t('m_mypage.j018-0')"><!-- 가입 및 탈퇴 -->
        <el-collapse accordion class="accordion">
          <el-collapse-item v-for="item in data['faq1']" v-bind:title="item.subj" v-bind:name="item.id" :key="item.id">
            <div v-html="item.conts"></div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>

      <el-tab-pane :label="$t('m_mypage.j018-1')"><!-- 정보 변경 -->
        <el-collapse accordion class="accordion">
          <el-collapse-item v-for="item in data['faq2']" v-bind:title="item.subj" v-bind:name="item.id" :key="item.id">
            <div v-html="item.conts"></div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      
      <el-tab-pane :label="$t('m_mypage.j018-2')"><!-- 입출금 -->
        <el-collapse accordion class="accordion">
          <el-collapse-item v-for="item in data['faq3']" v-bind:title="item.subj" v-bind:name="item.id" :key="item.id">
            <div v-html="item.conts"></div>
          </el-collapse-item>
        </el-collapse>
        
      </el-tab-pane>
      <el-tab-pane :label="$t('m_mypage.j018-3')"><!-- 인증센터 -->
        <el-collapse accordion class="accordion">
          <el-collapse-item v-for="item in data['faq4']" v-bind:title="item.subj" v-bind:name="item.id" :key="item.id">
            <div v-html="item.conts"></div>
          </el-collapse-item>
        </el-collapse>
        
      </el-tab-pane>
      <el-tab-pane :label="$t('m_mypage.j018-4')"><!-- 기타 -->
        <el-collapse accordion class="accordion">
          <el-collapse-item v-for="item in data['faq5']" v-bind:title="item.subj" v-bind:name="item.id" :key="item.id">
            <div v-html="item.conts"></div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import { FAQList } from '@/api/customers';
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      /*
        '1': 가입 및 탈퇴
        '2': 정보변경
        '3': 입출금
        '4': 인증센터
        '5': 기타
       */
      faqTp: '1',
      data: {
        faq1: [],
        faq2: [],
        faq3: [],
        faq4: [],
        faq5: [],
      },
    };
  },
  computed: {
    ...mapGetters(['getLangKind', 'getUnitcode'])
  },
  methods: {
    handleClick(tab, event) {
			var self = this;
      if (tab.index == '0') {
        self.faqTp = "1";
      } else if (tab.index == '1') {
        self.faqTp = "2";
      } else if (tab.index == '2') {
        self.faqTp = "3";
      } else if (tab.index == '3') {
        self.faqTp = "4";
      } else if (tab.index == '4') {
        self.faqTp = "5";
      }
      if (self.data["faq"+self.faqTp].length <= 0) {
        self.getList();        
      }
    },
    getList() {
      let self = this;
      let faqTp = self.faqTp;
			FAQList({
				faqTp: faqTp,
        langType: self.getLangKind=='EN'?'en':'ko',
        unitcode: self.getUnitcode
			}).then(res => {
        console.log("FAQList", res);
        if (res.code == 20000) {
          self.data["faq"+faqTp] = res.body;
        }
      });
    },
    resize() {
      var tabHei = document.getElementsByClassName('el-tabs__header')[0].offsetHeight;
      document.getElementsByClassName('el-tabs__content')[0].style.height = 'calc(100% - ' + tabHei + 'px)';
    },
  },
  created() {
    this.$EventBus.$emit('mobile-nav-title', this.$t('m_mypage.a007'));
    this.$EventBus.$emit('mobile-nav-menus', ['noDefault', 'close']);
  },
  mounted() {
    this.getList();
    window.onresize = this.resize;
    
    // setTimeout(function () {
    //   var tabHei = document.getElementsByClassName('el-tabs__header')[0].offsetHeight;
    //   document.getElementsByClassName('el-tabs__content')[0].style.height = 'calc(100% - ' + tabHei + 'px)';
    // }, 0);
  },
  updated() {
    this.resize();
  }
};
</script>
