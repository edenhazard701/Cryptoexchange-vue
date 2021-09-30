<template>
  <div class="QnA">
    <ul class="qna_list" >
      <li v-for="data in inqData" :key="data.value" @click="qnaRowClicked(data)">
        <span class="title">{{ data.subj }}</span>
        <span v-if="data.inqStatus === '2'" class="status completion" v-html="$t('m_mypage.j014-2')"></span>
        <span v-else class="status" v-html="$t('m_mypage.j014-1')"></span>
      </li>
      <infinite-loading  @infinite="infiniteHandler"></infinite-loading>
    </ul>
    <p class="nodata_sy02" v-if="inqData.length === 0">{{$t('m_mypage.j008')}}<!-- 1:1문의내역이 없습니다. --></p>
    <div class="btm_fix_btn">
      <el-button @click="openWrite" class="b_success_btn">{{$t('m_mypage.j007')}}<!-- 문의하기 --></el-button> 
    </div>
  </div>
</template>

<script>
import { inqList } from '@/api/customers'
import { mapGetters } from 'vuex'
import moment from 'moment'

import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';
Vue.use(InfiniteLoading, { slots: { noMore: '', noResults: '' } });

export default {
	components: {
		InfiniteLoading,
	},
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      inqData: [],
    };
  },
  computed: {
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
		resize() {
			var notiContHei = document.getElementsByClassName('logo-wrapper')[0].offsetHeight;
			var btmFixBtnHei = document.getElementsByClassName('btm_fix_btn')[0].offsetHeight;
			document.getElementsByClassName('qna_list')[0].setAttribute("height", document.body.scrollHeight - notiContHei - btmFixBtnHei + 'px');
		},    
		infiniteHandler($state) { 
			let self = this;
			inqList({
				currentPage: self.currentPage,
				pageSize: self.pageSize,
        regr: self.getUserId,
        unitcode: self.getUnitcode
			}).then(res => {
				if(res.code == 20000) {
					self.inqData = self.inqData.concat(res.body);
          self.currentPage += 1;
          res.body.length == 0 ? $state.complete() : $state.loaded();
				} else {
					 $state.complete()
				}
			}) 	
		},
		qnaRowClicked(data) {
			let self = this;
      self.$router.push({ name: 'mQnaDetail', query: {no: data.inqMngNo} })
    },
		openWrite() {
			let self = this;
      self.$router.push({ name: 'mQnaWrite' })
    },
  },
  created() {
    this.$EventBus.$emit('mobile-nav-title', this.$t('m_mypage.a008'));
    this.$EventBus.$emit('mobile-nav-menus', ['noDefault', 'back', 'border']);
  },
  mounted() {
		window.onresize = this.resize();
	},
};
</script>
