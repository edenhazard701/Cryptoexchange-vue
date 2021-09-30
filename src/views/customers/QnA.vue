<template>
  <el-main class="QnAVue">
    <h1 class="pageTitle"><!-- 1:1 문의하기 -->{{$t('cs.e001')}}</h1>
    <div>
      <div class="total-size">
        <span class="value">{{$t('cs.d007', [total])}}</span><!-- 총 100건 -->
      </div>

      <el-table :data="inqData" stripe style="width: 100%" @row-click="qnaRowClicked" :empty-text="$t('cs.e012')">
        <el-table-column type="index" :label="$t('cs.e002')" width="50" align="center" :index="indexMethod"></el-table-column><!-- 번호 -->
        <el-table-column prop="subj" :label="$t('cs.e003')" header-align="center"></el-table-column><!-- 제목 -->
        <el-table-column :label="$t('cs.e004')" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.regDt | dateFormat }} </template>
        </el-table-column><!-- 작성일 -->
        <el-table-column prop="inqStatus" :label="$t('cs.e005')" width="100" align="center"><!-- 답변상태 -->
          <template slot-scope="scope">
            <span v-if="scope.row.inqStatus === '2'" class="reply-state complete" v-html="$t('cs.e008')"></span><!-- 답변완료 -->
            <span v-else class="reply-state" v-html="$t('cs.e007')"></span><!-- 답변대기 -->
          </template>
        </el-table-column>
      </el-table>

			<div class="block">
				<el-pagination layout="prev, pager, next" :page-size="pageSize" :total="total" :current-page.sync="currentPage" @current-change="pageNumClicked"></el-pagination>
			</div>

      <el-row class="content-btn list-btn">
        <el-col :span="24">
          <el-button type="primary" @click="writeQna">{{ $t('cs.e009') }}<!-- 1:1 문의하기 --></el-button>
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>

<script>
import { inqList } from '@/api/customers'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      currentPage: 1,		  //현재 페이지
      pageSize: 10,			  //나눌 페이지 사이즈
      
      inqData: [],        //QnA 리스트
      total: 0,				    //토탈 페이지 수
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
    indexMethod(index) {
      const self = this;
      return self.total - ((self.currentPage - 1) * self.pageSize + index);
    },
		getList() {
			let self = this;
			inqList({
				currentPage: self.currentPage,
				pageSize: self.pageSize,
        regr: self.getUserId,
        unitcode: self.getUnitcode
			}).then(res => {
        console.log("inqList", res);
				if (res.code == 20000) {
          self.inqData = res.body;
				  self.total = res.totSize;
				}
			});
		},
		qnaRowClicked(row) {
			let self = this;
			self.$router.push({ name: 'qnaDetail', query: { no: row.inqMngNo } });
    },
    writeQna() {
      let self = this;
      self.$router.push({ name: 'qnaWrite' });
		},
		pageNumClicked(value) {
			var self = this;
			self.currentPage = value;
			self.getList();
		},
    langChangeCallback() {
      let self = this;
      self.$EventBus.$emit('pc-navi', [
        { label: self.$t('header.cs'), target: 'csNotice' },
        { label: self.$t('cs.a004'), target: null }
      ]);
    }
  },
	mounted () {
		let self = this;
    self.$EventBus.$on('langChange', self.langChangeCallback);
    self.getList();
  },
  beforeDestroy() {
    let self = this;
		self.$EventBus.$off('langChange', self.langChangeCallback);
  }
};
</script>
