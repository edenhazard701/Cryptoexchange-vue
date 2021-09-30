<template>
  <section class="QnaDetail">
    <div class="title_wrap">
      <span class="title">{{ data.subj }}</span>
      <span class="date">{{ data.regDt | dateFormat }}</span>
    </div>
    <div class="cont_wrap">
      <div class="question">
        <div v-html="data.conts" class="cont contsProps"></div>
      </div>
      <div class="answer" v-if="data.inqStatus == '2'">
        <div v-html="data.ansConts" class="cont contsProps"></div>
        <p class="date">{{ data.ansUpdDt | dateFormat }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { inqDetail } from '@/api/customers'
import {  mapGetters } from 'vuex'
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
		requestQnaDetail() {
			var self = this;
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
		resize() {
      var notiContHei = document.getElementsByClassName('title_wrap')[0].offsetHeight;
      document.getElementsByClassName('cont_wrap')[0].style.height = 'calc(100% - '+notiContHei+'px)';
    }
  },
  created() {
    this.$EventBus.$emit('mobile-nav-title',  this.$t('m_mypage.a008'));
    this.$EventBus.$emit('mobile-nav-menus', ['noDefault', 'border', 'close']);
  },
  mounted() {
		var self = this;
		window.onresize = this.resize;
		self.requestQnaDetail(self.no)
  },
  updated() {
    this.resize();
  },
};
</script>
