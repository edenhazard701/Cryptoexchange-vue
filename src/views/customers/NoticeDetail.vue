<template>
  <section class="NoticeDetail">
    <h1 class="pageTitle"><!-- 공지사항 -->{{$t('cs.a001')}}</h1>
    <el-row class="content-header">
      <el-col class="cont-title">{{ data.subj }}</el-col>
      <el-col class="cont-date">{{ data.regDt | dateFormat }}</el-col>
    </el-row>
    <div class="content-notice">
      <div class="contsProps" v-html="data.conts"></div>
    </div>
    <div class="content-btn">
      <el-button type="primary" @click="showList">목록</el-button>
    </div>
  </section>
</template>

<script>
import { noticeDetail } from '@/api/customers'
import { mapGetters } from 'vuex'
import moment from "moment";

export default {
  data() {
    return {
      no: this.$route.query.no,
      data: {
        subj: '',
        conts: '',
        regDt: '',
      },
    };
  },
  computed: {
    ...mapGetters(['getLangKind', 'getUnitcode'])
  },
  filters: {
    dateFormat(val) {
      if (val) {
        return moment(val, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY.MM.DD HH:mm:ss');
      } else {
        return '';
      }
    },
  },
  methods: {
    showList() {
      this.$router.go(-1);
    },
  },
  created() {
    let self = this;
    self.$EventBus.$emit('pc-navi', [
      { label: self.$t('header.cs'), target: 'csNotice' },
      { label: self.$t('cs.a001'), target: null }
    ]);

    self.$EventBus.$on('langChange', self.showList);
  },
  mounted() {
    var self = this;
    noticeDetail({
      no: self.no,
      langType: self.getLangKind=='EN'?'en':'ko',
      unitcode: self.getUnitcode
    }).then(res => {
      self.data = res.body;
    });
  },
  beforeDestroy() {
		let self = this;
		self.$EventBus.$off('langChange', self.showList);
	}
};
</script>
