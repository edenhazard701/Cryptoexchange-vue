<template>
  <div class="FAQVue">
    <h1 class="pageTitle">{{$t('cs.f001')}}<!-- 자주하는 질문 --></h1>
    <el-tabs type="card" @tab-click="handleClick" stretch class="category">

      <el-tab-pane :label="$t('cs.f002')"><!-- >가입 및 탈퇴 -->
        <el-collapse accordion class="accordion">
        <el-collapse-item v-for="item in data['faq1']" :title="item.subj" :name="item.id" :key="item.id">
          <div class="contsProps" v-html="item.conts"></div>
        </el-collapse-item>
        </el-collapse>
      </el-tab-pane>

      <el-tab-pane :label="$t('cs.f003')"><!-- 정보변경 -->
        <el-collapse accordion class="accordion">
          <el-collapse-item v-for="item in data['faq2']" :title="item.subj" :name="item.id" :key="item.id">
            <div class="contsProps" v-html="item.conts"></div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>

      <el-tab-pane :label="$t('cs.f004')"><!-- 입출금 -->
        <el-collapse accordion class="accordion">
          <el-collapse-item v-for="item in data['faq3']" :title="item.subj" :name="item.id" :key="item.id">
            <div class="contsProps" v-html="item.conts"></div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <!-- 인증센터 -->
      <!-- <el-tab-pane :label="$t('cs.f005')">
        <el-collapse accordion class="accordion">
          <el-collapse-item v-for="item in data['faq4']" :title="item.subj" :name="item.id" :key="item.id">
            <div class="contsProps" v-html="item.conts"></div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane> -->

      <el-tab-pane :label="$t('cs.f006')"><!-- 기타 -->
        <el-collapse accordion class="accordion">
          <el-collapse-item v-for="item in data['faq5']" :title="item.subj" :name="item.id" :key="item.id">
            <div class="contsProps" v-html="item.conts"></div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
    <div class="faq-info" v-html="$t('cs.f007')"></div>
  </div>
</template>

<script>
import { FAQList } from '@/api/customers';
import { mapGetters } from 'vuex';

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
    langChangeCallback() {
      let self = this;
      self.$EventBus.$emit('pc-navi', [
        { label: self.$t('header.cs'), target: 'csNotice' },
        { label: self.$t('cs.a006'), target: null }
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
