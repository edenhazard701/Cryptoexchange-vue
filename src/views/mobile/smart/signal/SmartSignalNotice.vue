<template>
  <div class="SmartSignalNotice notice_detail">
    <section class="notice_detail">
      <el-row class="title_wrap">
        <p class="title">
          <!-- <span class="title">[{{ data.noticeTp }}] {{data.subj}}</span> -->
          <span class="title"> {{data.subj}}</span>
        </p>
        <p class="date">{{data.regDt}}</p>
      </el-row>
      <el-row class="contents">
        <div v-html="data.conts"></div>
      </el-row>
    </section>
  </div>
</template>

<script>
  import {
    sigNoticeDetail
  } from '@/api/customers'
  import {
    mapGetters
  } from 'vuex'
  export default {
    props: ['notice'],
    data() {
      return {
        navTitle: '공지사항 상세',
        data: [],
        no: this.$route.query.no,
      };
    },
    methods: {
      resize() {
        var notiContHei = document.getElementsByClassName('title_wrap')[0].offsetHeight;
        document.getElementsByClassName('contents')[0].style.height = 'calc(100% - ' + notiContHei + 'px)';
      }
    },
    created() {
      this.$EventBus.$emit('mobile-nav-title', this.$t('m_signal.b031'));
      this.$EventBus.$emit('mobile-nav-menus', ['close', 'noDefault', 'border']);
    },
    mounted() {

      var self = this;
			window.onresize = this.resize;
			
      sigNoticeDetail({
        no: this.no,
        langType: self.getLangKind == 'KR' ? 'ko' : 'en'
      }).then(res => {
        if (!res) return;

        this.data = res.body[0]

        setTimeout(function () {
          var notiContHei = document.getElementsByClassName('title_wrap')[0].offsetHeight;
          document.getElementsByClassName('contents')[0].style.height = 'calc(100% - ' + notiContHei + 'px)';
        }, 0);
      })
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
