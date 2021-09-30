<template>
    <section class="NoticeDetail">
        <h1 class="pageTitle">{{$t('signal.f001')}}<!-- 공지사항 --></h1>
        <el-row class="content-header">
            <el-col class="cont-title">{{data.subj}}</el-col>
            <el-col class="cont-date">{{data.regDt}}</el-col>
        </el-row>
        <div class="content-notice">
            <!-- <el-col :span="24"><nl2br tag="div" :text="cont" /></el-col> -->
			<div v-html="data.conts"></div>
        </div>
        <div class="content-btn">
            <el-button type="primary" @click="showList">{{$t('signal.f015')}}<!-- 목록 --></el-button>
        </div>
    </section>
</template>

<script>
import { sigNoticeDetail } from '@/api/customers'
import { mapGetters } from 'vuex'

export default {
    props:['seletedRowData'],
    data() {
        return {
            data : [],
            no: this.$route.query.no    //리스트에서 넘어온 글 번호
        };
    },
    methods: {
        showList(){
            // 뒤로가기 
            this.$router.go(-1);
        }
    },
  	watch: {
        getLangKind(val, old) {
			this.$i18n.locale = val == 'KR' ? 'ko' : val == "EN" ? 'en' : 'ko' //default 'ko'
			this.showList();
        }
    },
	computed: {
		...mapGetters(['getLangKind'])
  	},
    created() {
    },
    mounted () {
        var self = this;
        self.$EventBus.$emit('pc-navi', [
            { label: self.$t('tdi.a001'), target: 'tdiList' },
			{ label: self.$t('signal.b001'), target: 'signalInfo' },
            { label: self.$t('signal.f014'), target: null }
        ]);

        self.$EventBus.$on('langChange', () => {
            self.$EventBus.$emit('pc-navi', [
                { label: self.$t('tdi.a001'), target: 'tdiList' },
                { label: self.$t('signal.b001'), target: 'signalInfo' },
                { label: self.$t('signal.f014'), target: null }
            ]);
        });

		sigNoticeDetail({
			no: this.no,
			langType: self.getLangKind == 'KR' ? 'ko' : 'en'
		}).then(res => {
			this.data = res.body[0];
		});
    }
};
</script>