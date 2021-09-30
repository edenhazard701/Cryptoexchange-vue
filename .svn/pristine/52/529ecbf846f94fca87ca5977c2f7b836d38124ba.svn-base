<template>
    <section class="SignalNotice">
		<h1 class="pageTitle">{{$t('signal.f001')}}<!-- 공지사항 --></h1>

		<el-form :inline="true" :model="srchForm" class="searchBar">
			<el-form-item>
				<el-select v-model="noticeOption" plalceholder="선택하세요.">
					<el-option :label="$t('signal.f002')" value="10"></el-option><!-- 전체 -->
					<el-option :label="$t('signal.f003')" value="20"></el-option><!-- 제목 -->
					<el-option :label="$t('signal.f004')" value="30"></el-option><!-- 내용 -->
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-input  v-model="conts"  @keyup.enter.native="search" :placeholder="$t('signal.f005')" class="search-input"></el-input><!-- 검색어를 입력해 주세요. -->
			</el-form-item>
			<el-form-item class="srchBtn">
				<el-button @click="search">{{$t('signal.f006')}}<!-- 조회 --></el-button>
			</el-form-item>
		</el-form>

		<el-table :data="noticeData" @row-click="noticeRowClicked" stripe :span-method="headlineDisplay" :empty-text="$t('signal.f016')">
			<el-table-column prop="subj"  :label="$t('signal.f009')" header-align="center"><!-- 제목 -->
				<template  slot-scope="scope">
					<span v-bind:class="scope.row.rownum === 0 ? 'bold' : ''">{{scope.row.subj}}</span>
				 </template>
			</el-table-column>
			<el-table-column prop="regDt"  :label="$t('signal.f010')" width="160" align="center"><!-- 작성일 -->
				<template  slot-scope="scope">
					<span v-bind:class="scope.row.rownum === 0 ? false : true">{{scope.row.regDt}}</span>
				 </template>
			</el-table-column>
			<el-table-column prop="views"  :label="$t('signal.f011')" width="100" header-align="center" align="right"></el-table-column><!-- 조회수 -->
		</el-table>

		<div class="block">
			<el-pagination layout="prev, pager, next" 
              :page-size="pageSize" 
              :total="total"
              :current-page.sync="currentPage" 
              @current-change="pageNumClicked"> 
            </el-pagination>
		</div>
    </section>
</template>

<script>

import { sigNoticeList, sigNoticeViews } from '@/api/customers'
import { noticeList, noticeViews } from '@/api/customers'
import {  mapGetters } from 'vuex'

export default {
	components: {
		// SignalNoticeDetail
	},
	data() {
		return {
			options: [
				{
					value: '10',
					label: '전체'
				}, {
					value: '20',
					label: '제목'
				},{
					value: '30',
					label: '본문'
				}
			],
			activeName: '1',
			noticeData: [],			//공지사항 DATA
			listLoading: false,	//로딩바
			noticeOption: '10',	//검색 카테고리 (10: 전체, 20: 제목, 30: 내용)
			total: 1,						//토탈 페이지
			pageSize: 15,				//나눌 페이지
			currentPage: 1,			//현재 페이지
			subj: '',						//글 제목
			conts: '',					//검색어
			srchForm: {
				condition: '1',
				keyword: ''
			},
			headCnt: ''					//헤드라인 갯수
		};
	},
	methods : {
		search() {
			this.currentPage = 1;
			this.getList()
		},
		getList() {
			let self = this;
			self.listLoading = true;
			sigNoticeList({
				conts: self.conts,
				noticeOption: self.noticeOption,
				currentPage: self.currentPage,
				pageSize: self.pageSize,
				langType: self.getLangKind == 'KR' ? 'ko' : 'en'
			}).then(res => {
				//console.log('res >>>>>>>>>> ' , res);
				self.noticeData = res.body;

				//console.log('self.noticeData >>>>>>>>>> ' , self.noticeData);
				self.total = res.totSize[0].totSize;
				//console.log(self.total);
				self.listLoading = false;
				
				var headlineArr = [];
				for(var i=0; i<self.noticeData.length; i++) {
					if (self.noticeData[i].rownum === 0) {
						headlineArr.push(i);
					}
				}
				this.headCnt = Math.max.apply(null, headlineArr);
			});
		},
		headlineDisplay({row, column, rowIndex, columnIndex}) {
			if (rowIndex <= this.headCnt) {
				if (columnIndex === 0) {
					return [1, 3];
				} else {
					return [0, 0];
				}
			}
		},
		noticeRowClicked(row){
			let self = this;
			// console.log('row = ', row);
			sigNoticeViews({
				views: row.views,
				sigNoticeMngNo: row.sigNoticeMngNo,
				langType: self.getLangKind == 'KR' ? 'ko' : 'en'
			}).then(res => {
				//console.log('no: row.noticeMngNo', row.sigNoticeMngNo);
				self.$router.push({
					name: 'signalNoticeDetail',
					query: { no: row.sigNoticeMngNo }
				});
			}).catch(err => {
				console.log(err);
			})
		},
		pageNumClicked(value){
			//console.log('pageChange = ', value);
			var self = this;
			self.currentPage = value;
			self.getList();
		},
		resetData(){
			var self = this;
			self.activeName = '1';
			self.noticeData = [];
			self.listLoading = false;
			self.noticeOption = '10';
			self.total = 1;
			self.pageSize = 15;
			self.currentPage = 1;
			self.subj = '';
			self.conts = '';
			self.srchForm = {
				condition: '1',
				keyword: ''
			};
			self.headCnt = '';
		}
	},
	mounted () {
		let self = this;
		self.$EventBus.$emit('pc-navi', [
			{ label: self.$t('tdi.a001'), target: 'tdiList'},
			{ label: self.$t('signal.b001'), target: 'signalInfo' },
			{ label: self.$t('signal.f014'), target: null }
		]);

		self.$EventBus.$on('langChange', () => {
			self.$EventBus.$emit('pc-navi', [
				{ label: self.$t('tdi.a001'), target: 'tdiList'},
				{ label: self.$t('signal.b001'), target: 'signalInfo' },
				{ label: self.$t('signal.f014'), target: null }
			]);
		});

		self.getList();
	},
	created () {
	},
	watch: {
		getLangKind(val, old) {
			this.$i18n.locale = val == 'KR' ? 'ko' : val == "EN" ? 'en' : 'ko' //default 'ko'
			this.resetData();
			this.getList();
    }
  },
	computed: {
		...mapGetters(['getLangKind'])
  }
};
</script>