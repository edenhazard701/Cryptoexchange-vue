<template>
  <section class="NoticeVue">
    <h1 class="pageTitle"><!-- 공지사항 -->{{$t('cs.a001')}}</h1>

    <!-- 검색 -->
    <el-form :inline="true" class="searchBar">
      <el-form-item>
        <el-select v-model="noticeOption" plalceholder="선택하세요.">
          <el-option :label="$t('cs.b001')" value="10"></el-option><!-- 전체 -->
          <el-option :label="$t('cs.b002')" value="20"></el-option><!-- 제목 -->
          <el-option :label="$t('cs.b003')" value="30"></el-option><!-- 내용 -->
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="conts" @keyup.enter.native="search" :placeholder="$t('cs.b004')"></el-input>
      </el-form-item>
      <el-form-item class="srchBtn">
        <el-button @click="search"><!-- 조회 -->{{$t('cs.b005')}}</el-button>
      </el-form-item>
    </el-form>
    
    <el-table :data="noticeData" @row-click="noticeRowClicked" stripe :span-method="headlineDisplay" :empty-text="$t('cs.b009')">
      <el-table-column :label="$t('cs.b006')" header-align="center"><!-- 제목 -->
        <template slot-scope="scope"><span v-bind:class="scope.row.noticeTp === '2' ? 'bold' : ''">{{ scope.row.subj }}</span></template>
      </el-table-column>
      <el-table-column :label="$t('cs.b007')" width="160" align="center"><!-- 작성일 -->
        <template slot-scope="scope"><span>{{ scope.row.regDt | dateFormat }}</span></template>
      </el-table-column>
      <el-table-column prop="views" :label="$t('cs.b008')" width="100" align="right"></el-table-column><!-- 조회수 -->
    </el-table>

    <div class="block">
      <el-pagination v-if="total>0" layout="prev, pager, next" :page-size="pageSize" :total="total" :current-page.sync="currentPage" @current-change="pageNumClicked"></el-pagination>
    </div>
  </section>
</template>

<script>
import { noticeHead, noticeList, noticeViews } from '@/api/customers'
import { mapGetters } from 'vuex'
import moment from "moment";

export default {
	data() {
		return {
      headlineData: [],   //공지사항 헤드라인
      headCnt: 0,					//헤드라인 갯수

      currentPage: 1,			//현재 페이지
      pageSize: 15,				//나눌 페이지
      noticeOption: '10',	//검색 카테고리 (10: 전체, 20: 제목, 30: 내용)
      conts: '',					//검색어

      listLoading: false,	//로딩바

      noticeData: [],			//공지사항 DATA
      total: 0,						//토탈 페이지
		};
  },
  computed: {
		...mapGetters(['getLangKind', 'getUnitcode'])
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
    getHeadline() {
      let self = this;
      self.headlineData = [];
			noticeHead({
        langType: self.getLangKind == 'EN'?'en':'ko',
        unitcode: self.getUnitcode
			}).then(res => {
				//console.log("noticeHead", res);
				self.headlineData = res.body;
        self.headCnt = self.headlineData.length;
        if (self.headlineData.length > 0 && self.noticeData.length > 0) {
          self.noticeData = self.headlineData.concat(self.noticeData);          
        }
			});
    },
		getList() {
			let self = this;
      self.listLoading = true;
      self.noticeData = [];
			noticeList({
				conts: self.conts,
				noticeOption: self.noticeOption,
				currentPage: self.currentPage,
				pageSize: self.pageSize,
        langType: self.getLangKind == 'EN'?'en':'ko',
        unitcode: self.getUnitcode
			}).then(res => {
        //console.log("noticeList", res);
        self.listLoading = false;
        self.noticeData = res.body;
        if (self.headlineData.length > 0 && self.noticeData.length > 0) {
          self.noticeData = self.headlineData.concat(self.noticeData);          
        }
        self.total = res.totSize;
			})
		},
		headlineDisplay({ row, column, rowIndex, columnIndex }) {
			if (rowIndex < this.headCnt) {
				if (columnIndex === 0) {
					return [1, 3];
				} else {
					return [0, 0];
				}
			}
		},
		noticeRowClicked(row) {
      let self = this;
      noticeViews({
        noticeMngNo: row.noticeMngNo,
        langType: self.getLangKind == 'EN'?'en':'ko',
        unitcode: self.getUnitcode
      })
      self.$router.push({ name: 'pcNoticeDetail', query: { no: row.noticeMngNo } });
    },
		pageNumClicked(value) {
			let self = this;
			self.currentPage = value;
			self.getList();
    },
    search() {
      let self = this;
      if (self.conts != '') {
        self.headlineData = [];
      } else {
        if (self.headlineData.length == 0) {
          self.getHeadline();
        }
      }
			self.pageNumClicked(1);
		},
		resetData() {
      var self = this;
			self.listLoading = false;
			self.noticeOption = '10';
			self.total = 0;
			self.pageSize = 15;
			self.currentPage = 1;
			self.conts = '';
      self.headCnt = '';
      
      self.getHeadline();
			self.getList();
		},
		langChangeCallback() {
			let self = this;
			self.$EventBus.$emit('pc-navi', [
				{ label: self.$t('header.cs'), target: 'csNotice' },
				{ label: self.$t('cs.a001'), target: null }
      ]);
      self.resetData();
		}
  },
  created() {
    let self = this;
    self.$EventBus.$emit('pc-navi', [
			{ label: self.$t('header.cs'), target: 'csNotice' },
			{ label: self.$t('cs.a001'), target: null }
    ]);
		self.$EventBus.$on('langChange', self.langChangeCallback);
  },
	mounted () {
    let self = this;
    self.resetData();
	},
	beforeDestroy() {
		let self = this;
		self.$EventBus.$off('langChange', self.langChangeCallback);
	}
};
</script>
