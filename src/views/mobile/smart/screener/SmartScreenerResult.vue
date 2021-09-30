<template>
    <div class="SmartScreenerResult">
        <div class="screener_filter_bar">
            <el-select class="select_day sel_m" popper-class="m_style day" v-model="term" :disabled="Number(strategy) < 6" @change="requestSignal">
                <el-option v-for="item in terms" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <div class="refresh_combo">
                <el-button class="btn_refresh" @click="requestSignal" :disabled="autoRefresh === 'on'"></el-button>
                <el-popover popper-class="select_refresh_wrap" v-model="refreshPopupVisible">
                    <el-radio-group v-model="autoRefresh" @change="refreshChange">
                        <el-radio label="off">{{$t('m_screener.a010')}}<!-- 수동 새로고침 --></el-radio>
                        <el-radio label="on">{{$t('m_screener.a011')}}<!-- 자동 새로고침(1분) --></el-radio>
                    </el-radio-group>
                    <el-button class="select_refresh_btn" slot="reference"></el-button>
                </el-popover>
            </div>
            <el-select class="select_tactic sel_m" popper-class="m_style" v-model="strategy" @change="strategyChange">
                <el-option v-for="item in strategyList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="table_wrap">
            <div class="top_result_txt">
                <p class="result">{{$t('m_screener.d035')}}<!-- 만족조건 --> : <span class="num">{{ signalSortedData.length }} </span>{{$t('m_screener.d037')}}<!-- 건 --></p>
                <p class="time">{{$t('m_screener.d036')}}<!-- 검색시간 --> : {{ searchTime }}</p>
            </div>
            <el-table v-if="true" :data="signalSortedData" @header-click="columnHeaderClick" @sort-change="sortChange">
                <el-table-column v-for="(item, index) in orderFilter(itemData)" :key="item.order" v-if="item.selected" v-bind:fixed="index === 0" :prop="item.prop" :label="item.label" sortable="custom" :sort-orders="sortOrders" :align="item.prop === 'Hname' ? 'left' : 'right'" :width="getWidth(item)" min-width="130" >
                    <template slot-scope="scope">
                        <div class="name_wrap" v-if="item.value === 1">
                            <div class="symbol-logo"><img :src="getImage(scope.row.Code)"></div>
                            <div class="txt">
                                <p class="name">{{ getSymbolName(scope.row) }}</p>
                                <p class="s_name">{{ scope.row.o_inst_eng_abbr }}</p>
                            </div>
                        </div>
                        <div class="name_wrap" v-else>
                            <p class="name" v-bind:class="getClass(item.prop, scope.row)">{{ getValue(item.prop, scope.row) }}{{ getPercent(item) }}</p>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import {_} from 'vue-underscore';
import moment from 'moment';
import { setTimeout, clearTimeout } from 'timers';
import fromExponential from 'from-exponential';

export default {
    data() {
        return {
            id: this.$route.query.id,                       // 전략 코드

            searchTime: '',                                 // 검색 시간

            sortKey: null,                                  // 검색결과 정렬 기준
            sortDir: null,                                  // 검색결과 정렬 순서
            sortOrders: ['descending', 'ascending', null],  // 검색결과 정렬 순서 지정

            refreshPopupVisible: false,                     // 새로고침 설정 팝업 여부

            autoRefresh: '',                                // 자동새로고침 여부
            timer: null,                                    // 자동새로고침 타이머

            signalData: [],                                 // 검색결과 데이터

            term: '361',                                    // 주기 코드
            strategy: '0000',                               // 전략 코드
        };
    },
    filters: {

    },
    methods: {
        init() {    // 초기 세팅
            // 새로고침 세팅
            this.autoRefresh = window.localStorage.getItem('screener_refresh');
            if(this.autoRefresh === '' || this.autoRefresh === null || this.autoRefresh === undefined || this.autoRefresh !== 'on' || this.autoRefresh === 'off') {
                this.autoRefresh = 'off';
            }

            if(this.id === undefined || this.id === null) {
                alert('parameter error');
                this.$router.go(-1);
                return;
            }
            
            this.strategy = this.id;

            this.strategyChange(this.strategy);
        },
        amountFormatter(obj) {    // 금액 데이터 단위 설정
            if(obj > 999999) {
                obj = (obj / 1000000).toFixed(0);
                return fromExponential(UnitManager.numberWithCommas(obj));
            } else {
                return fromExponential(UnitManager.numberWithCommas(obj));
            }
        },
        priceFormatter(obj) {     // 가격 데이터 지수 표기 방지
            return fromExponential(obj.format(obj.price));
		    },
        getValue(prop, row) {   // 숫자 데이터 단위 설정
            if(prop === 'Close' || prop === 'Change' || prop === 'Change_1h') {
                return this.addComma(this.priceFormatter(row[prop]));
            } else if(prop === 'Value' || prop === 'Volume') {
                if(parseFloat(row[prop]) > 999999) {
                    return this.addComma(this.amountFormatter(row[prop])) + ' ' + this.$t('m_screener.d040'); // 백만
                } else {
                    return this.addComma(this.amountFormatter(row[prop]));
                }
            } else {
                return this.addComma(row[prop]);
            }
        },
        getPercent(item) {  // % 표시하는 데이터에 % 표시
            var percent = '';
            if(item.parent >= 0 || item.prop === 'ChgRate_1h') {
                percent = '%';
            }
            return percent;
        },
        getWidth(row) {  // 항목별 열 가로 사이즈
            if(row.prop === 'Hname') {
                return 150;
            } else if(row.prop === 'Close') {
                return 100;
            } else if(row.prop === 'Change') {
                return 100;
            } else if(row.prop === 'Value') {
                return 100;
            } else if(row.prop === 'Change_1h') {
                return 100;
            } else if(row.prop === 'ChgRate_1h') {
                return 100;
            } else if(row.prop === 'Volume') {
                return 100;
            } else  {
                return 120;
            }
        },
        getClass(prop, row) {   // 데이터 스타일 적용을 위한 클래스 설정
            if(prop === 'Bidho' || prop === 'Offerho') {
                if(parseFloat(row[prop]) > parseFloat(row['Daebi'])) {
                    return 'red';
                } else if(parseFloat(row[prop]) < parseFloat(row['Daebi'])) {
                    return 'blue';
                } else {
                    return '';
                }
            } else if(prop === 'High_1m' || prop === 'High_3m' || prop === 'High_52w' || prop === 'High_Year') {
                if(parseFloat(row[prop]) < parseFloat(row['Close'])) {
                    return 'red';
                } else {
                    return '';
                }
            } else if(prop === 'Low_1m' || prop === 'Low_3m' || prop === 'Low_52w' || prop === 'Low_Year') {
                if(parseFloat(row[prop]) > parseFloat(row['Close'])) {
                    return 'blue';
                } else {
                    return '';
                }
            } else if(prop === 'OpenPer') {
                if(parseFloat(row['Open']) < parseFloat(row['Close'])) {
                    return 'red';
                } else if(parseFloat(row['Open']) > parseFloat(row['Close'])) {
                    return 'blue';
                } else {
                    return '';
                }
            } else if(prop === 'HighPer') {
                if(parseFloat(row['High']) > parseFloat(row['Close'])) {
                    return 'blue';
                } else {
                    return '';
                }
            } else if(prop === 'LowPer') {
                if(parseFloat(row['Low']) < parseFloat(row['Close'])) {
                    return 'red';
                } else {
                    return '';
                }
            }
        },
        getImage(code) {    // 코인 이미지 경로 가져오기
            var tmpCode = code.replace(/__/g,"_").split("_")[0].substr(5).toLocaleLowerCase();
            return this.getCoinImages[tmpCode] !== undefined ? this.getCoinImages[tmpCode] : this.getCoinImages['default'];
        },
        refreshChange(val) {    // 새로고침 설정
            this.autoRefresh = val;
            window.localStorage.setItem('screener_refresh', this.autoRefresh);
            if(this.autoRefresh === 'on' && this.timer === null) {
                this.requestSignal();
            } else {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.refreshPopupVisible = false;
        },
        // 전략 선택
        strategyChange(val) {
            if (this.id != val) {
              this.$router.replace({ query: { id: val } });
            }
            this.id = val;
            this.strategy = val;
            this.term = '361';

            var arrIdx = this.strategyList.findIndex(x => x.value === this.strategy);

            this.$EventBus.$emit('mobile-nav-title', this.strategyList[arrIdx].label);

            this.itemData.forEach(element => {     // 기간별/거래량 상승률 항목 전부 비선택 처리
                if(element.parent >= 0) {
                    element.selected = false;
                }
            });

            if(Number(this.strategy) < 6) {     // 기간별/거래량 상승률 전략 선택 시 이름 항목 옆에 표시
                var childIdx = this.itemData.findIndex(x => x.parent === Number(this.strategy));
                this.itemData[childIdx].selected = true;

                this.sortKey = this.itemData[childIdx].prop;
                this.sortDir = 'descending';
            } else {
                this.sortKey = null;
                this.sortDir = null;
            }

            this.requestSignal();
        },
        sortChange(column, prop, order) {   // 테이블 정렬 화살표 클릭 시 정렬 기준 설정
            if(column.column) {
                this.sortKey = column.prop;
            }
            
            this.sortDir = column.order;
        },
        columnHeaderClick(column, event) {  // 테이블 헤더 클릭 시 정렬 기준 설정
            this.sortKey = column.property;
            this.sortDir = column.order; 
        },
        //마스터정보에 없는 경우 제거
        validateMasterInfo(list) {
          let self = this;
          if (self.coinList && self.coinList.length > 0 && list && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
              let item = list[i];
              let tmp = self.$_.findWhere(self.coinList, {o_symbol : item.Code});
              if (tmp) {
                item.o_inst_kor_nm = tmp.o_inst_kor_nm.split('/')[0];
                item.o_inst_eng_nm = tmp.o_inst_eng_nm.split('/')[0];
                item.o_inst_eng_abbr = tmp.o_inst_eng_abbr;
              } else {
                list.splice(i--, 1);
              }
            }
          }
          return list;
        },
        requestSignal() {   // 전략 목록 요청
            var self = this;

            if(self.strategy === '0000' || self.strategy === '0003') {
                self.term = '361';
            } else if(self.strategy === '0001' || self.strategy === '0004') {
                self.term = '362';
            } else if(self.strategy === '0002' || self.strategy === '0005') {
                self.term = '363';
            }

            var payload = [];
            payload.SearchNum = this.strategy;
            payload.Term = this.term;
            payload.MarketGb = '0';

            this.searchTime = moment().format('HH:mm:ss');

            this.$store.dispatch('fetchSignalResult', payload).then((data) => {
                if(data) {
                    self.signalData = self.validateMasterInfo(data.signalList);
                    
                    if(self.autoRefresh === 'on') {
                        clearTimeout(self.timer);
                        self.timer = null;
                        self.timer = setTimeout(self.requestSignal, 60000); // 자동 새로고침으로 설정된 경우 1분마다 새로고침
                    } else {
                        self.timer = null;
                    }
                }
            }, null);
        },
        orderFilter(obj) {  // 테이블 데이터 order(표시 순서)로 정렬
            if(obj != null && obj != undefined) {
                var res = [];
                obj.forEach(element => {
                    if(element.selected) {
                        res.push(element);
                    }
                });
                return res = _.sortBy(res, 'order');
            } else {
                return  '';
            }
        },
        getSymbolName(row) {
          let self = this;
          if(self.getLangKind == 'KR') {
            return row.o_inst_kor_nm.split('/')[0];
          } else if (self.getLangKind == 'EN') {
            return row.o_inst_eng_nm.split('/')[0];
          }
          return "";
        },
        addComma(value) {       // 1,000 단위 콤마 추가
            if(isNaN(value)) {
                return value;
            }
            var tmp = value.toString().split('.');
            return tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (tmp[1] ? '.' + tmp[1] : '');
        },
        ...mapActions(['fetchSignalResult'])
    },
    created() {
        var self = this;
        self.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault']);
        
    },
    mounted() {
        var self = this;
        self.init();
    },
    computed: {
        ...mapState({
            coinList : state => state.data['n1001'],
            trSymbols: state => state.data.trSymbols,
        }),
        ...mapGetters(['getCoinImages', 'getLangKind']),
        socketConnected() {
            return this.$store.getters.isSocketConnected
        },
        signalSortedData() {    // 정렬된 검색결과 데이터
            let self = this;

            if (!self.sortDir) {
                return self.signalData;
            } else {
                return self.signalData.slice().sort((a, b) => {
                    let mod = self.sortDir === 'descending' ? -1 : 1;
                    
                    if (isNaN(Number(a[self.sortKey]))) {
                        return a[self.sortKey] > b[self.sortKey] ? 1 * mod : -1 * mod;
                    } else {
                        return Number(a[self.sortKey]) > Number(b[self.sortKey]) ? 1 * mod : -1 * mod;
                    }
                });
            }
        },
        terms() {   // 검색 주기 리스트
            return [
                { value: '1',   label: this.$t('m_screener.a001') },    // 1분
                { value: '5',   label: this.$t('m_screener.a002') },    // 5분
                { value: '15',  label: this.$t('m_screener.a003') },    // 15분
                { value: '30',  label: this.$t('m_screener.a004') },    // 30분
                { value: '60',  label: this.$t('m_screener.a005') },    // 1시간
                { value: '180', label: this.$t('m_screener.a006') },    // 3시간
                { value: '361', label: this.$t('m_screener.a007') },    // 1일
                { value: '362', label: this.$t('m_screener.a008') },    // 1주
                { value: '363', label: this.$t('m_screener.a009') }     // 1개월
            ];
        },
        strategyList() {    // 전략 리스트
            return [
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
        },
        itemData() {    // 항목 데이터
            return [
                { value: 1,     label: this.$t('m_screener.d038'), /* 한글명 */                prop: "Hname",          order: 1,   selected: true,      parent: -1 },
                { value: 2,     label: this.$t('m_screener.c009'), /* 현재가 */                prop: "Close",          order: 3,   selected: true,      parent: -1 },
                { value: 3,     label: this.$t('m_screener.d039'), /* 전일대비 */              prop: "Change",         order: 4,   selected: true,      parent: -1 },
                { value: 4,     label: this.$t('m_screener.c011'), /* 거래대금 */              prop: "Value",          order: 5,   selected: true,      parent: -1 },
                { value: 5,     label: this.$t('m_screener.c013'), /* 대비(1시) */             prop: "Change_1h",      order: 6,   selected: true,      parent: -1 },
                { value: 6,     label: this.$t('m_screener.c017'), /* 등락율(1시) */           prop: "ChgRate_1h",     order: 7,   selected: true,      parent: -1 },
                { value: 7,     label: this.$t('m_screener.c012'), /* 거래량(24시) */          prop: "Volume",         order: 8,   selected: true,      parent: -1 },

                { value: 8,     label: this.$t('m_screener.c045'), /* 기간별상승률(1일) */     prop: "PrcUpRateDay",    order: 2,   selected: false,    parent: 0 },
                { value: 9,     label: this.$t('m_screener.c046'), /* 기간별상승률(1주) */     prop: "PrcUpRateWeek",   order: 2,   selected: false,    parent: 1 },
                { value: 10,    label: this.$t('m_screener.c047'), /* 기간별상승률(1개월) */   prop: "PrcUpRateMon",    order: 2,   selected: false,    parent: 2 },
                { value: 11,    label: this.$t('m_screener.c048'), /* 거래량상승률(1일) */     prop: "VolUpRateDay",    order: 2,   selected: false,    parent: 3 },
                { value: 12,    label: this.$t('m_screener.c049'), /* 거래량상승률(1주) */     prop: "VolUpRateWeek",   order: 2,   selected: false,    parent: 4 },
                { value: 13,    label: this.$t('m_screener.c050'), /* 거래량상승률(1개월) */   prop: "VolUpRateMon",    order: 2,   selected: false,    parent: 5 }
            ];
        }
    },
    watch: {
        socketConnected(val, old) {
            this.requestSignal();
        }
    },
    beforeDestroy() {
        clearTimeout(this.timer);
        this.timer = null;
    }
};
</script>