<template>
  <el-main class="notice_list_wrap">
    <div class="notice-table">
      <!-- headline일때 li에 class headline추가 -->
      <div v-for="data in newsData" :key="data.value" @click="newsRowClicked(data)" :class="data.newsTp=='2'?'noti_cell headline':'noti_cell'">
        <p class="cont">
          <span class="title">{{ data.subj }}</span>
        </p>
        <p class="date" v-if="data.newsTp!='2'">{{ data.regDt | dateFormat }}</p>
      </div>
      <infinite-loading @infinite="infiniteHandler"> </infinite-loading>
    </div>
    <p class="nodata_sy02" v-if="newsData.length === 0">{{$t('m_mypage.l001')}}<!-- KOVEX소식이 없습니다. --></p>
  </el-main>
</template>

<script>
import Vue from 'vue';
import { newsHead, newsList, newsViews } from '@/api/customers';
import {  mapGetters } from 'vuex'
import moment from "moment";

import InfiniteLoading from 'vue-infinite-loading';
Vue.use(InfiniteLoading, { slots: { noMore: '', noResults: '' } });

export default {
	components: {
		InfiniteLoading,
	},
  data() {
    return {
      newsData: [],
      pageSize: 15,
      currentPage: 1,			
    };
  },
	computed: {
		...mapGetters(['getLangKind', 'getUnitcode']),
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
			document.getElementsByClassName('notice-table')[0].setAttribute("height", document.height - notiContHei + 'px');
		},
		infiniteHandler($state) {
			var self = this;
			newsList({
				currentPage: self.currentPage,
				pageSize: self.pageSize,
        langType: self.getLangKind == 'KR' ? 'ko' : 'en',
        unitcode: self.getUnitcode,
			}).then(res => {
				if(res.code == 20000) {
					self.newsData = self.newsData.concat(res.body);
					self.currentPage += 1;
					res.body.length == 0 ? $state.complete() : $state.loaded();
				} else {
					$state.complete()
				}
			});
		},		
		newsRowClicked(row){
			let self = this;
			newsViews({
				newsMngNo: row.newsMngNo,
        langType: self.getLangKind == 'KR' ? 'ko' : 'en',
        unitcode: self.getUnitcode
			}).then(res => {
				if(!res) return;
				self.$router.push({ name: 'mNewsDetail', query: {no: row.newsMngNo} })
			}).catch(err => {
				console.log(err);
			})
    },
    getHeadline() {
      let self = this;
			newsHead({
        langType: self.getLangKind == 'EN'?'en':'ko',
        unitcode: self.getUnitcode
			}).then(res => {
				//console.log("newsHead", res);
        self.newsData = res.body.concat(self.newsData);
			});
    },
  },
  created() {
    this.$EventBus.$emit('mobile-nav-title', this.$t('m_mypage.a003'));
    this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border']);
    this.getHeadline();
	},
	mounted() {
		window.onresize = this.resize;
	},
};
</script>
