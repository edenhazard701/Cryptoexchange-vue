<template>
  <section class="QnaDetail">
    <h1 class="pageTitle">{{ $t('cs.e009') }} <!-- 문의하기 --></h1>
    <el-row class="content-header">
      <el-col class="cont-title">{{ data.subj }}</el-col>
      <el-col class="cont-date">
        <span v-if="data.inqStatus == '2'" class="complete" v-html="$t('cs.e008')"></span><!-- 답변완료 -->
        <span v-else v-html="$t('cs.e007')"></span><!-- 답변대기 -->
      </el-col>
    </el-row>
    <div class="content-notice">
      <el-row>
        <el-col class="qna-label question">
          <span>{{ $t('cs.e010') }}<!-- 문의내용 --></span>
        </el-col>
        <el-col class="qna-date">{{ data.regDt | dateFormat }}</el-col>
      </el-row>
      <el-row tag="div" class="contsProps" v-html="data.conts"></el-row>
    </div>

    <div v-if="data.inqStatus == '2'" class="content-answer">
      <el-row>
        <el-col class="qna-label answer"><span>{{ $t('cs.e011') }}<!-- 문의답변 --></span></el-col>
        <el-col class="qna-date">{{ data.ansUpdDt | dateFormat }}</el-col>
      </el-row>
      <el-row tag="div" class="contsProps" v-html="data.ansConts"></el-row>
    </div>
    <div class="content-btn">
      <el-button type="primary" @click="showList"><!-- 목록 -->{{$t('cs.e013')}}</el-button>
    </div>
  </section>
</template>

<script>
import { inqDetail } from '@/api/customers'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      inqMngNo: this.$route.query.no,
      data : {},
    };
  },
  computed : {
    ...mapGetters(['getUserId', 'getUnitcode'])
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
    showList(){
      this.$router.go(-1); // 뒤로가기 
    },
    langChangeCallback() {
      let self = this;
      self.$EventBus.$emit('pc-navi', [
        { label: self.$t('header.cs'), target: 'csNotice' },
        { label: self.$t('cs.a004'), target: null }
      ]);
    }
  },
  mounted() {
		let self = this;
    self.$EventBus.$on('langChange', self.langChangeCallback);
		
		inqDetail({
			inqMngNo: self.inqMngNo,
      regr: self.getUserId,
      unitcode: self.getUnitcode
		}).then(res => {
      //console.log('inqDetail', res);
      if (res.code == 20000) {
        self.data = res.body;
      }
		});
  },
  beforeDestroy() {
    let self = this;
		self.$EventBus.$off('langChange', self.langChangeCallback);
  }
};
</script>
