<template>
  <div class="SmartScreener">
    <div class="top_automatic_search">
      <el-popover popper-class="saved_keywords" placement="top-start" v-model="searchPopupVisible" width="400" trigger="click">
        <el-table :data="savedKeywords" :show-header="false" :border="false" @cell-click="selectKeyword" :empty-text="$t('m_screener.d044')"><!-- 검색내역 없음 -->
          <el-table-column prop="keyword">
            <template slot-scope="scope">
              <span class="keyword">{{scope.row.keyword}}</span>
            </template>
          </el-table-column>
          <el-table-column width="60" prop="date">
            <template slot-scope="scope">
              <span class="date">{{scope.row.date}}</span>
            </template>
          </el-table-column>
          <el-table-column width="30" prop="">
            <template slot-scope="scope">
              <button type="text" class="el-icon-close" @click="deleteSavedKeyword(scope.row)"></button>
            </template>
          </el-table-column>
        </el-table>
        <el-input type="text" slot="reference" v-model="searchKeyword" :placeholder="$t('m_screener.d042')" class="inp_m"></el-input><!-- 전략명 검색 -->
      </el-popover>
      <div class="inp_btn">
        <el-button v-show="deleteKeywordButtonVisible" class="el-icon-close" @click="deleteKeyword"></el-button>
        <el-button class="el-icon-search" @click="onSearch"></el-button>
      </div>
    </div>
    <div class="screener_filter_bar">
      <div class="search_result">
        <span class="stratergy_count">{{ strategyShowList.length }}</span> {{$t('m_screener.d045')}}
      </div>
      <el-select class="select_tactic sel_m" popper-class="m_style" v-model="strategy" @change="strategyChange">
        <el-option v-for="item in strategyList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <div class="btn_grid">
        <el-button @click="listTypeChange" :icon="gridIcon"></el-button>
      </div>
    </div>
    <div class="tactic_list">
      <el-row>
        <p class="nodata_sy01" v-if="strategyShowList.length === 0">{{$t('m_screener.d041')}}<!-- 검색결과가 없습니다. --></p>
        <el-col v-for="item in strategyShowList" :key="item.value" :span="cellSpan">
          <div :class="cellType" @click="moveStrategy(item)">
            <p class="tit">{{item.label}}</p>
            <p class="result">{{$t('m_screener.d043')}}<!-- 검색결과 --> : {{item.result}}</p>
            <p class="txt" v-if="grid === false">{{item.info}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import {_} from 'vue-underscore';
import moment from 'moment';
import { setTimeout, clearTimeout } from 'timers';

export default {
  data () {
    return {
      searchKeyword: '',          // 전략명 검색어
      savedKeywords: [],          // 전략명 검색 기록
      searchPopupVisible: false,      // 전략명 검색 기록 팝업 표시 여부
      deleteKeywordButtonVisible: false,  // 전략명 검색어 삭제 버튼 표시 여부
      
      grid: false,            // 리스트 형태

      signalListData: [],         // 전략명 검색결과
      strategyShowList: [],         // 리스트에 보여지는 전략명
      strategy: '9999'          // 전략명 셀렉트 박스에 선택된 전략 (9999 : 전체보기)
    };
  },
  methods: {
    init() {  // 초기 세팅
      this.savedKeywords = JSON.parse(window.localStorage.getItem('screener_search'));  // 저장된 전략명 검색어 가져오기

      this.requestSignalList();
    },
    deleteSavedKeyword(row) {   // 전략명 검색 기록 삭제
      const index = this.savedKeywords.indexOf(row);
      this.savedKeywords.splice(index, 1);
      window.localStorage.setItem('screener_search', JSON.stringify(this.savedKeywords));
    },
    deleteKeyword() {   // 전략명 검색어 입력값 삭제
      this.searchKeyword = '';
    },
    selectKeyword(row, col, cell, event) {  // 전략명 검색 기록 선택
      if(col.property === undefined) {
        return;
      } else {
        this.searchKeyword = row.keyword;
        this.searchPopupVisible = false;
      }
    },
    onSearch() {  // 전략명 검색
      this.searchPopupVisible = false;
      if(this.searchKeyword === undefined || this.searchKeyword === null || this.searchKeyword === '') {
        this.strategyChange(this.strategy);
        return;
      }

      // 검색기록에 똑같은 검색어가 있으면 삭제
      if(this.savedKeywords !== undefined && this.savedKeywords !== null) {
        var arrIdx = this.savedKeywords.findIndex(x => x.keyword === this.searchKeyword);
        if(arrIdx >= 0) {
          this.savedKeywords.splice(arrIdx, 1);
        }
      }
      
      // 검색어 저장
      if(this.savedKeywords) {
        if(this.savedKeywords.length >= 10) {
          this.savedKeywords.splice(this.savedKeywords.length - 1, 1);
        }
        this.savedKeywords.splice(0, null, { 'keyword': this.searchKeyword, 'date': moment().format('YYYY-MM-DD') });
      } else {
        this.savedKeywords = [{ 'keyword': this.searchKeyword, 'date': moment().format('YYYY-MM-DD')}];
      }
      
      window.localStorage.setItem('screener_search', JSON.stringify(this.savedKeywords));

      // 검색
      this.strategyShowList = this.strategyList.filter(obj => {
        if(obj.value !== '9999' && (obj.label.search(this.searchKeyword) >= 0 || obj.info.search(this.searchKeyword) >= 0)) {
          return obj;
        }        
      });
    },
    // 전략 선택
    strategyChange(val, type) {
      if (type === undefined || type === null) {
        type = 'value';
      }
      if (val === '9999') {
        this.strategyShowList = this.strategyList.filter(obj => {
          if (obj.value !== '9999') {
            return obj;
          }
        });
        return;
      }
      
      var res = [];
      this.strategyList.forEach(element => {
        if(element[type] === val) {
          res.push(element);
        }
      });
      this.strategyShowList = res;
    },
    requestSignalList() {   // 전략 리스트 요청
      var self = this;

      var payload = [];
      payload['Category'] = '0000';
      payload['Filter'] = '';

      this.$store.dispatch('fetchSignalList', payload).then((data) => {
        if(data) {
          self.signalListData = data;

          for(var signal of self.signalListData) {
            for(var strategy of self.strategyList){
              if(strategy.value == signal.SearchNum) {
                strategy.result = signal.JongCnt;
              }
            }
          }

          this.strategyChange('9999');
        }
      }, null);
    },
    moveStrategy(row) {   // 전략 검색결과 페이지로 이동
      this.$router.push({
        name: 'mSmartScreenerResult',
        query: {
          id: row.value
        }
      });
    },
    listTypeChange() {  // 리스트 형태 변경
      this.grid = !this.grid;
    },
    ...mapActions(['fetchSignalList', 'fetchSignalResult'])
  },
  created() {
    this.$EventBus.$emit('mobile-nav-title', this.navTitle);
    this.$EventBus.$emit('mobile-nav-menus', ['back']);
    this.init();
  },
  computed: {
    socketConnected() {
      return this.$store.getters.isSocketConnected
    },
    gridIcon() {  // 전략 리스트 형태 변경 아이콘
      return this.grid ? 'el-icon-tickets' : 'el-icon-menu';
    },
    cellType() {  // 전략 리스트 형태
      return this.grid ? 'cell grid' : 'cell list';
    },
    cellSpan() {  // 전략 리스트 행 span
      return this.grid ? 12 : 24;
    },
    navTitle() {  // 헤더 타이틀
      return this.$t('main.h014'); // 스크리너
    },
    strategyList() {  // 전략 리스트
      return [
        {
          value: '9999',
          label: this.$t('m_screener.c001') + ' (16)',  // 전체보기
          info: '',
          detail: '',
          result: 0
        },
        {
          value: '0000',
          label: this.$t('m_screener.b001'),  // 기간별 상승률(1일)
          info: this.$t('m_screener.b002'),   // 1일 전과 대비하여 종가 상승률 상위 순으로 종목을 제공합니다.
          detail: '',
          result: 0
        },
        {
          value: '0001',
          label: this.$t('m_screener.b004'),  // 기간별 상승률(1주)
          info: this.$t('m_screener.b005'),   // 1주 전과 대비하여 종가 상승률 상위 순으로 종목을 제공합니다.
          detail: '',
          result: 0
        },
        {
          value: '0002',
          label: this.$t('m_screener.b007'),  // 기간별 상승률(1개월)
          info: this.$t('m_screener.b008'),   // 1개월 전과 대비하여 종가 상승률 상위 순으로 종목을 제공합니다.
          detail: '',
          result: 0
        },
        {
          value: '0003',
          label: this.$t('m_screener.b010'),  // 거래량 상승률(1일)
          info: this.$t('m_screener.b011'),   // 1일 전과 대비하여 거래량 상승률 상위 순으로 종목을 제공합니다.
          detail: '',
          result: 0
        },
        {
          value: '0004',
          label: this.$t('m_screener.b013'),  // 거래량 상승률(1주)
          info: this.$t('m_screener.b014'),   // 1주 전과 대비하여 거래량 상승률 상위 순으로 종목을 제공합니다.
          detail: '',
          result: 0
        },
        {
          value: '0005',
          label: this.$t('m_screener.b016'),  // 거래량 상승률(1개월)
          info: this.$t('m_screener.b017'),   // 1개월 전과 대비하여 거래량 상승률 상위 순으로 종목을 제공합니다.
          detail: '',
          result: 0
        },
        {
          value: '0006',
          label: this.$t('m_screener.d001'),  // 추세모멘텀 전략
          info: this.$t('m_screener.d002'),   // 모멘텀 강세와 추세상승이 진행중인 코인을 매수하는 전략
          detail: this.$t('m_screener.d003') + '\n' + this.$t('m_screener.d004'), // 기술적지표상 강세구간에 진입하고 추가 상승 가능성이 높은 코인에 투자하는 전략.\n* 과매수 구간일 수 있으므로 철저한 위험관리가 필요함.
          result: 0
        },
        {
          value: '0007',
          label: this.$t('m_screener.d005'),  // N패턴 전략
          info: this.$t('m_screener.d006'),   // 단기 이평선이 장기 이평선의 지지를 받으며 2차 상승하는 시점에 매수하는 전략
          detail: this.$t('m_screener.d007'), // 추세상승 초기시점에 가격이 이평선의 지지를 받아 눌림목이 발생하고 재차 상승할 가능성이 높은 코인에 투자하는 전략.
          result: 0
        },
        {
          value: '0008',
          label: this.$t('m_screener.d008'),  // 골든크로스 돌파 전략
          info: this.$t('m_screener.d009'),   // 단기 이평선이 장기 이평선을 상향 돌파하고 상승하는 시점에 매수하는 전략
          detail: this.$t('m_screener.d010'), // 골든크로스 발생 후 장기 이평선의 지지를 확인한 코인 중 추세상승을 시작할 가능성이 높은 시점에 투자하는 전략.
          result: 0
        },
        {
          value: '0009',
          label: this.$t('m_screener.d011'),  // 변동성 급증 전략
          info: this.$t('m_screener.d012'),   // 가격 변동성이 급증할 때 매수하는 전략
          detail: this.$t('m_screener.d013'), // 변동성 지수를 계산하여 30%~70%사이에서 횡보하다 90%이상 증가하는 시점에 투자하는 전략.
          result: 0
        },
        {
          value: '0010',
          label: this.$t('m_screener.d014'),  // 단기 정배열 수렴 전략
          info: this.$t('m_screener.d015'),   // 장단기 이평선이 정배열 상태에서 수렴중에 고점를 돌파하는 코인을 매수하는 전략
          detail: this.$t('m_screener.d016'), // 정배열을 유지하며 좁은 범위에서 수렴하고 있는 상태에서 고점을 돌파하는 시점에 투자하는 전략.
          result: 0
        },
        {
          value: '0011',
          label: this.$t('m_screener.d017'),  // 박스권 돌파 전략
          info: this.$t('m_screener.d018'),   // 박스권을 돌파하는 시점에 매수하는 전략
          detail: this.$t('m_screener.d019'), // 박스권에서 횡보중인 코인이 박스권 상단을 돌파하면서 급등이 발생하면 투자하는 전략.
          result: 0
        },
        {
          value: '0012',
          label: this.$t('m_screener.d020'),  // 저항선 돌파 전략
          info: this.$t('m_screener.d021'),   // 약세구간에서 하락중인 코인이 저항선을 한번에 돌파하는 시점에 매수하는 전략
          detail: this.$t('m_screener.d022'), // 가격이 장단기 이동평균선보다 아래에서 계속 하락하던 중 해당 이동평균선을 한번에 상향 돌파하며 강하게 상승하는 시점에 투자하는 전략.
          result: 0
        },
        {
          value: '0013',
          label: this.$t('m_screener.d023'),  // 과대 낙폭 반등 전략
          info: this.$t('m_screener.d024'),   // '과도하게 하락한 코인이 거래량 증가와 함께 급등할 때 매수하는 전략
          detail: this.$t('m_screener.d025') + '\n' + this.$t('m_screener.d026'), // 과매도구간에서 평균회귀현상에 따른 기술적 반등시점에 투자하는 전략.\n*추세하락구간에 반등을 노리는 전략으로 단기적인 관점으로 접근이 필요함.
          result: 0
        },
        {
          value: '0014',
          label: this.$t('m_screener.d027'),  // 큰손 매수 추종 전략
          info: this.$t('m_screener.d028'),   // 대량의 매도물량을 매수하는 큰손거래가 발생하는 코인을 매수하는 전략
          detail: this.$t('m_screener.d029') + '\n' + this.$t('m_screener.d030'), // 매도총잔량이 매수총잔량보다 많은 상태에서 대량 매수체결이 발생한 코인에 투자하는 전략.\n* 순간체결대금이 일정금액이상인 코인을 검색하므로 조회시점에는 검색되지 않을 수 있음.
          result: 0
        },
        {
          value: '0015',
          label: this.$t('m_screener.d031'),  // 상위 베타계수 급등 전략
          info: this.$t('m_screener.d032'),   // 비트코인을 기준으로 베타계수 상위 25%의 코인 중 급등신호가 포착된 코인을 매수하는 전략
          detail: this.$t('m_screener.d033') + '\n' + this.$t('m_screener.d034'), // 비트코인 대비 변동성이 높은 알트코인 위주로 검색하는 전략.\n*전체 시장이 상승할 때 높은 수익률을 얻을 수 있지만, 큰 손실에 유의하여야 함.
          result: 0
        }
      ];
    }
  },
  watch: {
    socketConnected(val, old) {
      this.requestSignalList();
    },
    searchKeyword(val, old) {
      if(this.searchKeyword === '' || this.searchKeyword === null || this.searchKeyword === undefined) {
        this.deleteKeywordButtonVisible = false;
      } else {
        this.deleteKeywordButtonVisible = true;
      }
    }
  }
};
</script>
