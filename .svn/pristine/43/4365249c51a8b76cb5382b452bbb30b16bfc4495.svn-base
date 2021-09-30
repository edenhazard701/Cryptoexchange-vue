<template>
  <el-main class="notice_list_wrap">
    <div class="notice-table">
      <!-- headline일때 li에 class headline추가 -->
      <div v-for="data in noticeData" :key="data.value" @click="noticeRowClicked(data)" :class="data.noticeTp === '2' ? 'noti_cell headline' : 'noti_cell'">
        <p class="cont"><span class="title">{{ data.subj }}</span></p>
        <p class="date" v-show="data.noticeTp !== '2'">{{ data.regDt | dateFormat }}</p>
      </div>
      <infinite-loading @infinite="infiniteHandler"> </infinite-loading>
    </div>
    <p class="nodata_sy02" v-if="noticeData.length === 0">{{ $t('m_mypage.j027-1') }}<!-- 공지사항이 없습니다. --></p>
  </el-main>
</template>

<script>
import Vue from 'vue';
import { noticeHead, noticeList, noticeViews } from '@/api/customers';
import { mapGetters } from 'vuex'
import moment from "moment";

import InfiniteLoading from 'vue-infinite-loading';
Vue.use(InfiniteLoading, { slots: { noMore: '', noResults: '' } });

export default {
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      noticeData: [],
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
      noticeList({
        currentPage: self.currentPage,
        pageSize: self.pageSize,
        langType: self.getLangKind == 'EN'?'en':'ko',
        unitcode: self.getUnitcode
      }).then(res => {
        if(res.code == 20000) {
          self.noticeData = self.noticeData.concat(res.body);
          self.currentPage += 1;
          res.body.length == 0 ? $state.complete() : $state.loaded();
        } else {
          $state.complete()
        }
      });
    },
    noticeRowClicked(row) {
      let self = this;
      noticeViews({
        noticeMngNo: row.noticeMngNo,
        langType: self.getLangKind=='EN'?'en':'ko',
        unitcode: self.getUnitcode
      })
      self.$router.push({ name: 'mNoticeDetail', query: { no: row.noticeMngNo } });
    },
    getHeadline() {
      let self = this;
			noticeHead({
        langType: self.getLangKind == 'EN'?'en':'ko',
        unitcode: self.getUnitcode
			}).then(res => {
				//console.log("noticeHead", res);
        self.noticeData = res.body.concat(self.noticeData);
			});
    },
  },
  created() {
    this.$EventBus.$emit('mobile-nav-title', this.$t('m_mypage.a011'));
    this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border']);
    this.getHeadline();
  },
  mounted() {
    window.onresize = this.resize;
  },
};
</script>
