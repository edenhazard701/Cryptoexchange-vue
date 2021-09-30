<template>
  <div class="SmartSignalNotices">
    <p class="lst-tit-bx01">
      <strong class="bullet-tit-type01">{{$t('m_signal.b020')}}</strong>
    </p>

    <div class="notice-table">
      <div v-for="data in noticeData" :key="data.value" @click="noticeRowClicked(data)" :class="data.rownum === 0 ? 'noti_cell headline' : 'noti_cell'">
        <!-- headline일때 li에 class headline추가 -->
        <p class="cont">
          <span class="title">{{ data.subj }}</span>
        </p>
        <p class="date" v-show="data.rownum !== 0">{{ data.regDt }}</p>
      </div>
      <infinite-loading @infinite="infiniteHandler"> </infinite-loading>
    </div>
    <p class="nodata_sy02" v-if="noticeData.length === 0 && loadedComplete">
      {{$t('m_signal.b030')}}
      <!-- 공지사항이 없습니다. -->
    </p>

  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    sigNoticeList,
    sigNoticeViews
  } from '@/api/customers'
  import InfiniteLoading from 'vue-infinite-loading';
  import {
    mapGetters
  } from 'vuex'

  Vue.use(InfiniteLoading, {
    slots: {
      noMore: '',
      noResults: ''
    }
  });

  export default {
    components: {
      InfiniteLoading,
    },
    data() {
      return {
        navTitle: '공지사항',
        seletedRowId: '',
        noticeData: [],
        listLoading: false,
        noticeOption: '10',
        total: 1,
        pageSize: 15,
        currentPage: 1,
        subj: '',
        conts: '',
        headCnt: '',
        loadedComplete: false
      };
    },
    methods: {
      resize() {
        var notiContHei = document.getElementsByClassName('logo-wrapper')[0].offsetHeight;
        document.getElementsByClassName('notice-table')[0].setAttribute("height", document.height - notiContHei + 'px');
      },
      infiniteHandler($state) {
        var self = this;

        self.listLoading = true;

        console.log('res.body >>>>>>>>>>>>>>>>>>>', 'infiniteHandler');

        sigNoticeList({
          conts: self.conts,
          noticeOption: self.noticeOption,
          currentPage: self.currentPage,
          pageSize: self.pageSize,
          langType: self.getLangKind == 'KR' ? 'ko' : 'en'
        }).then(res => {
          if (!res) return;

          if (res !== undefined) {

            self.noticeData = self.noticeData.concat(res.body);
            self.total = res.totSize[0].totSize
            self.listLoading = false;
            self.currentPage += 1;



            var headlineArr = [];
            for (var i = 0; i < self.noticeData.length; i++) {
              // if (self.noticeData[i].rownum === 0) {
              if (self.noticeData[i].rownum === 0) {
                headlineArr.push(i);
              }
            }
            this.headCnt = Math.max.apply(null, headlineArr);

            res.body.length == 0 ? $state.complete() : $state.loaded();
          } else {
            $state.complete()
            self.loadedComplete = true;
          }
        });

      },
      getList(search) {
        /*  let self = this
         self.listLoading = true
         sigNoticeList({
           conts: self.conts,
           noticeOption: self.noticeOption,
           currentPage: self.currentPage,
           pageSize: self.pageSize,
           langType: self.getLangKind == 'KR' ? 'ko' : 'en'
         }).then(res => {
           if (!res) return;
           self.noticeData = res.body;

           console.log('self.noticeData >>>>>>>>>> ', self.noticeData);
           self.total = res.totSize[0].totSize
           self.listLoading = false

           var headlineArr = [];
           for (var i = 0; i < self.noticeData.length; i++) {
             if (self.noticeData[i].noticeTp === '헤드라인') {
               headlineArr.push(i);
             }
           }
           this.headCnt = Math.max.apply(null, headlineArr);
         }); */
      },
      headlineDisplay({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (rowIndex <= this.headCnt) {
          if (columnIndex === 0) {
            return [1, 3];
          } else {
            return [0, 0];
          }
        }
      },
      noticeRowClicked(row) {
        let self = this;
        console.log('row = ', row);
        sigNoticeViews({
            views: row.views,
            sigNoticeMngNo: row.sigNoticeMngNo,
            langType: self.getLangKind == 'KR' ? 'ko' : 'en'
          }).then(res => {
            if (!res) return;
            // console.log('no: row.noticeMngNo', row.sigNoticeMngNo);
            self.$router.push({
              name: 'mSmartSignalNotice',
              query: {
                no: row.sigNoticeMngNo
              }
            })
          })
          .catch(err => {
            console.log(err);
          })
      },
    },
    mounted() {
      window.onresize = this.resize;
      // this.getList();
    },
    watch: {
      getLangKind(val, old) {
        this.$i18n.locale = val == 'KR' ? 'ko' : val == "EN" ? 'en' : /*default 'ko' */ 'ko'
      }

    },
    computed: {
      ...mapGetters(['getLangKind']),
    },
  };

</script>
