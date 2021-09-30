<template>
  <section class="notice_detail">
    <el-row class="title_wrap">
      <p class="title"><span class="title">{{ data.subj }}</span></p>
      <p class="date">{{ data.regDt | dateFormat }}</p>
    </el-row>
    <el-row class="contents">
      <div id="notiCont" class="contsProps" v-html="data.conts"></div>
    </el-row>
  </section>
</template>

<script>
import { noticeDetail } from '@/api/customers'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      no: this.$route.query.no,
      data : {},
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
      var notiContHei = document.getElementsByClassName('title_wrap')[0].offsetHeight;
      document.getElementsByClassName('contents')[0].style.height = 'calc(100% - '+notiContHei+'px)';
		},
  },
  created() {
    this.$EventBus.$emit('mobile-nav-title', this.$t('m_mypage.a011'));
    this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border']);
  },
  mounted (){
    var self = this;
    window.onresize = this.resize;

    noticeDetail({
      no: self.no,
      langType: self.getLangKind=='EN'?'en':'ko',
      unitcode: self.getUnitcode
    }).then(res => {
      self.data = res.body;
    });
  },
	updated(){
		if (afc.isDevice) {
			var notiCont = document.getElementById('notiCont');
			var aCont = document.getElementsByTagName('a');
			for( var i = 0 ;i < aCont.length;  i ++ ) {
				var attr = aCont[i].getAttribute('href');
				aCont[i].setAttribute("href", "");
				aCont[i].addEventListener('click', function(e) {
					e.preventDefault();
					AppManager.goUrl(attr);
				});
			}
    }
    this.resize();
	},
};
</script>
