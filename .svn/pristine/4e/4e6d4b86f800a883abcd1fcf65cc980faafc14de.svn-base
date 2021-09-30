<template>
  <el-container class="Screener">
    <el-main class="screener contents">
      <div class="options">
        <div v-if="strategyInfo !== ''" class="infoText">
          <span class="strategy-name">{{strategyName}}</span> : {{strategyInfo}}
          <el-popover v-if="strategyDetail !== ''" placement="bottom-start" trigger="hover" width="400" popper-class="info-help">
            <nl2br tag="div" :text="strategyDetail" />
            <el-button slot="reference" icon="el-icon-question" class="question"></el-button>
          </el-popover>
        </div>
        <el-row>
          <el-col class="opt-download">
            <download-excel :data="getExcelData" :fields="getExcelFields" ref="excelDown" :name="excelName" >
              <el-button class="download" icon="el-icon-download" @click="changeExcelName"></el-button>
            </download-excel>
          </el-col>
          <el-col class="opt-period">
            <el-select v-model="term" v-bind:disabled="Number(strategy) < 6" placeholder="주기 선택" @change="requestSignal">
              <el-option v-for="item in terms" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col class="opt-reload">
            <ul class="reloadGroup">
              <li>
                <el-button v-if="autoRefresh == 'off'" class="el-icon-refresh reload off" @click="requestSignal"></el-button>
                <el-button v-else class="el-icon-refresh reload on" disabled></el-button>
              </li>
              <li>
                <el-popover v-model="refreshPopupVisible" placement="bottom" trigger="click" popper-class="pop-period">
                  <dl class="reload-select">
                    <dd><el-radio v-model="autoRefresh" label="off" @change="refreshChange">{{$t('screener.a010')}}<!-- 수동 새로고침 --></el-radio></dd>
                    <dd><el-radio v-model="autoRefresh" label="on" @change="refreshChange">{{$t('screener.a011')}}<!-- 자동 새로고침(1분) --></el-radio></dd>
                  </dl>
                  <el-button icon="el-icon-more" class="more" slot="reference"></el-button>
                </el-popover>
              </li>
            </ul>
          </el-col>
          <el-col class="opt-strategy">
            <el-select v-model="strategy" placeholder="전략 선택" @change="strategyChange">
              <el-option v-for="item in strategyList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col class="opt-setting">
            <el-button class="setting" icon="el-icon-setting" @click="itemSettingDialog"></el-button>
          </el-col>
          <el-col class="opt-market">
            <el-select class="market" v-model="market" placeholder="마켓 선택" @change="requestSignal">
              <el-option v-for="item in marketList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-dialog class="pop-setting" title="항목설정" :visible.sync="itemSettingPopupVisible" :close-on-click-modal="false" width="560px" :before-close="closeItemSetting">
          <el-row>
            <el-col class="setting-list">
              <div class="el-table">
                <div class="el-table__header-wrapper">
                  <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
                    <thead>
                      <tr>
                        <th>{{$t('screener.c003')}}<!-- 항목명 --></th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
              <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
                <el-table :data="hiddenFilter(selectedItemData)" :show-header="false">
                  <el-table-column>
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.selected" @change="itemChange(scope.row)" v-bind:checked="scope.row.value === 1" v-bind:disabled="scope.row.value === 1">{{ initialItemLabel[scope.row.value.toString()] }}</el-checkbox>
                    </template>
                  </el-table-column>
                </el-table>
              </el-scrollbar>
            </el-col>
            <el-col class="setting-select">
              <div class="el-table">
                <div class="el-table__header-wrapper">
                  <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
                    <thead>
                      <tr>
                        <th>{{$t('screener.c004')}}<!-- 선택 항목 --></th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
              <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
                <el-table ref="selectedTable" :data="orderChildFilter(selectedItemData)" highlight-current-row @current-change="currentItemChange" :show-header="false">
                  <el-table-column prop="label">
                    <template slot-scope="scope">
                      <span v-bind:class="scope.row.value === 1 ? 'disabled' : ''">{{ initialItemLabel[scope.row.value.toString()] }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-scrollbar>
            </el-col>
            <el-col class="setting-btns">
              <el-button class="el-icon-d-arrow-left" @click="changeOrderTop"></el-button>
              <el-button class="el-icon-arrow-up" @click="changeOrderUp"></el-button>
              <el-button class="el-icon-arrow-down" @click="changeOrderDown"></el-button>
              <el-button class="el-icon-d-arrow-right" @click="changeOrderBottom"></el-button>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button class="btn-init" @click="resetItem">{{$t('screener.c005')}}<!-- 기본값 --></el-button>
            <el-button @click="closeItemSetting">{{$t('screener.c006')}}<!-- 취소 --></el-button>
            <el-button type="primary" @click="saveItemSetting">{{$t('screener.c007')}}<!-- 저장 --></el-button>
          </span>
        </el-dialog>
      </div>

      <div class="dataTable" :class="{'isClose': !strategyMenuPopupVisible}">
        <div class="menu">
          <div class="screener-title"><span>{{$t('main.h014')}}<!-- 스크리너 --></span></div>
          <el-button v-if="strategyMenuPopupVisible === true" icon="el-icon-arrow-left" class="open-close" @click="showStrategyMenu('close')"></el-button>
          <el-button v-else icon="el-icon-arrow-right" type="primary" class="open-close" @click="showStrategyMenu('open')"></el-button>
          <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
            <ul>
              <li>
                <el-button type="text" class="icon1" @click="periodPopupVisible = true" :class="{'sel': strategy === '0000' || strategy === '0001' || strategy === '0002' || strategy === '0003' || strategy === '0004' || strategy === '0005'}"><span v-html="$t('screener.d035')"></span><!-- 기간별 상승률 --></el-button>
                <el-dialog class="pop-strategy" :visible.sync="periodPopupVisible" :title="$t('screener.d035')" width="420px"><!-- 기간별 상승률 -->
                  <ul class="strategy-period">
                    <li class="strategy1" @click="strategyChange('0000')">
                      <h2>{{$t('screener.b001')}}<!-- 기간별 상승률(1일) --></h2>
                      {{$t('screener.b002')}}<!--  1일 전 대비하여 종가 상승률 상위 순으로 종목을 제공합니다. -->
                    </li>
                    <li class="strategy2" @click="strategyChange('0001')">
                      <h2>{{$t('screener.b004')}}<!-- 기간별 상승률 (1주) --></h2>
                      {{$t('screener.b005')}}<!-- 1주 전 대비하여 종가 상승률 상위 순으로 종목을 제공합니다. -->
                    </li>
                    <li class="strategy3" @click="strategyChange('0002')">
                      <h2>{{$t('screener.b007')}}<!-- 기간별 상승률 (1개월) --></h2>
                      {{$t('screener.b008')}}<!--  1개월 전 대비하여 종가 상승률 상위 순으로 종목을 제공합니다. -->
                    </li>
                    <li class="strategy4" @click="strategyChange('0003')">
                      <h2>{{$t('screener.b010')}}<!-- 거래량 상승률 (1일) --></h2>
                      {{$t('screener.b011')}}<!-- 1일 전과 대비하여 거래량 상승률 상위 순으로 종목을 제공합니다. -->
                    </li>
                    <li class="strategy5" @click="strategyChange('0004')">
                      <h2>{{$t('screener.b013')}}<!-- 거래량 상승률 (1주) --></h2>
                      {{$t('screener.b014')}}<!-- 1주 전과 대비하여 거래량 상승률 상위 순으로 종목을 제공합니다. -->
                    </li>
                    <li class="strategy6" @click="strategyChange('0005')">
                      <h2>{{$t('screener.b016')}}<!-- 거래량 상승률 (1개월) --></h2>
                      {{$t('screener.b017')}}<!-- 1개월 전과 대비하여 거래량 상승률 상위 순으로 종목을 제공합니다. -->
                    </li>
                  </ul>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="periodPopupVisible = false">{{$t('screener.c051')}}<!-- 닫기 --></el-button>
                  </div>
                </el-dialog>
              </li>
              <li><el-button type="text" class="strategy7 icon2" @click="strategyChange('0006')" :class="{'sel':strategy === '0006'}"><span v-html="$t('screener.d001')"></span> <!-- 추세모멘텀<br>전략 --></el-button></li>
              <li><el-button type="text" class="strategy8 icon3" @click="strategyChange('0007')" :class="{'sel':strategy === '0007'}"><span v-html="$t('screener.d005')"></span> <!-- N패턴 전략 --></el-button></li>
              <li><el-button type="text" class="strategy9 icon4" @click="strategyChange('0008')" :class="{'sel':strategy === '0008'}"><span v-html="$t('screener.d008')"></span>  <!-- 골든크로스<br>돌파 전략 --></el-button></li>
              <li><el-button type="text" class="strategy10 icon5" @click="strategyChange('0009')" :class="{'sel':strategy === '0009'}"><span v-html="$t('screener.d011')"></span> <!-- 변동성<br>급증 전략 --></el-button></li>
              <li><el-button type="text" class="strategy11 icon6" @click="strategyChange('0010')" :class="{'sel':strategy === '0010'}"><span v-html="$t('screener.d014')"></span> <!-- 단기 정배열<br>수렴 전략 --></el-button></li>
              <li><el-button type="text" class="strategy12 icon7" @click="strategyChange('0011')" :class="{'sel':strategy === '0011'}"><span v-html="$t('screener.d017')"></span> <!-- 박스권<br>돌파 전략 --></el-button></li>
              <li><el-button type="text" class="strategy13 icon8" @click="strategyChange('0012')" :class="{'sel':strategy === '0012'}"><span v-html="$t('screener.d020')"></span> <!-- 저항선<br>돌파 전략 --></el-button></li>
              <li><el-button type="text" class="strategy14 icon9" @click="strategyChange('0013')" :class="{'sel':strategy === '0013'}"><span v-html="$t('screener.d023')"></span> <!-- 과대 낙폭<br>반등 전략 --></el-button></li>
              <li><el-button type="text" class="strategy15 icon10" @click="strategyChange('0014')" :class="{'sel':strategy === '0014'}"><span v-html="$t('screener.d027')"></span> <!-- 큰손 매수<br>추종 전략 --></el-button></li>
              <li><el-button type="text" class="strategy16 icon11" @click="strategyChange('0015')" :class="{'sel':strategy === '0015'}"><span v-html="$t('screener.d031')"></span> <!-- 상위 베타계수<br>급등 전략 --></el-button></li>
            </ul>
          </el-scrollbar>
        </div>
        <div class="list">
          <el-table :data="signalSortedData" :class="{'nodata': signalSortedData.length < 1}" max-height="702" stripe @header-click="columnHeaderClick" @sort-change="sortChange" :empty-text="emptyMessage">
            <el-table-column v-for="(item, index) in orderFilter(selectedItemData)" :key="item.order" v-bind:fixed="index < 2" :prop="item.prop" :label="initialItemLabel[item.value.toString()]" sortable="custom" :sort-orders="sortOrders" min-width="200" align="right">
              <template slot-scope="scope">
                <el-row v-if="item.value === 1" :key="item.order" @click.native="symbolClick(scope.row.Code)">
                  <el-col class="symbol-logo"><img :src="getImage(scope.row.Code)"></el-col>
                  <el-col class="symbol-text">
                    <span class="symbol-coin">{{ getSymbolName(scope.row) }}</span><br>
                    <span class="unit">{{ scope.row.o_inst_eng_abbr }}</span>
                  </el-col>
                </el-row>
                <el-row v-else :key="item.order">
                  <span v-bind:class="getClass(item.prop, scope.row)">{{ getValue(item.prop, scope.row) }}{{ getPercent(item) }}</span>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Vue from 'vue';
import { mapState, mapGetters, mapActions } from 'vuex';
import {_} from 'vue-underscore';
import JsonExcel from 'vue-json-excel';
import moment from 'moment';
import fromExponential from 'from-exponential';
import { setTimeout, clearTimeout } from 'timers';

Vue.component('downloadExcel', JsonExcel)

export default {
  data() {
    return {
      sortKey: null,                                  // 검색결과 정렬 기준
      sortDir: null,                                  // 검색결과 정렬 순서
      sortOrders: ['descending', 'ascending', null],  // 검색결과 정렬 순서 지정

      refreshPopupVisible: false,                     // 새로고침 설정 팝업 여부
      strategyMenuPopupVisible: true,                 // 기간별상승률 팝업 여부
      periodPopupVisible: false,                      // 주기 선택 팝업 여부
      itemSettingPopupVisible: false,                 // 항목설정 팝업 여부
      
      autoRefresh: '',                                // 자동새로고침 여부
      timer: null,                                    // 자동새로고침 타이머
      
      excelName: '',                                  // 엑셀 저장 시 파일명
      
      signalData: [],                                 // 검색결과 데이터

      selectedItemData: [],                           // 선택된 항목 데이터
      selectedItem: '',                               // 항목설정 - 선택 항목 코드

      term: '361',                                    // 주기 코드
      strategy: '0000',                               // 전략 코드
      market: '0',                                    // 마켓 코드
      initialItemDataVer: '0.2'                       // 항목 기본 데이터 버전(아래의 항목 기본 데이터가 바뀌면 로컬스토리지에 저장 돼 있는 항목 데이터는 적용이 안되므로 버전 처리하여 사용자 업데이트. refer)사용자가 항목설정에서 기본값을 누르면 적용됨)
    };
  },
  methods: {
    amountFormatter(obj) {  // 금액 데이터 단위 설정
      if(obj > 999999) {
        obj = (obj / 1000000).toFixed(0);
        return fromExponential(obj);
      } else {
        return fromExponential(obj);
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
    getValue(prop, row) {   // 숫자 데이터 단위 설정
      if(prop === 'Value') {
        if(parseFloat(row[prop]) > 999999) {
          return this.addComma(this.amountFormatter(row[prop])) + ' 백만';
        } else {
          return this.addComma(this.amountFormatter(row[prop]));
        }
      } else {
        return this.addComma(row[prop]);
      }
    },
    getPercent(item) {  // % 표시하는 데이터에 % 표시
      var percent = '';
      if(item.parent >= 0 || item.prop ==='ChgRate' || item.prop ==='ChgRate_1h' || item.prop ==='ChgRate_7d' || item.prop ==='ChgRate_1m' || item.prop ==='OpenPer' || item.prop ==='HighPer' || item.prop ==='LowPer') {
        percent = '%';
      }
      return percent;
    },
    init() {    // 초기 세팅
      // 항목 세팅
      window.localStorage.setItem('screener_initial_item', JSON.stringify(this.initialItemData));
      var itemSavedVer = JSON.parse(window.localStorage.getItem('item_verstion'));    // 항목 기본 데이터 로컬 버전
      
      if(this.initialItemDataVer != itemSavedVer || JSON.parse(window.localStorage.getItem('screener_item')) === null || this.initialItemData.length !== JSON.parse(window.localStorage.getItem('screener_item')).length) {
        this.selectedItemData = this.initialItemData;
        window.localStorage.removeItem('screener_item');
        window.localStorage.setItem('screener_item', JSON.stringify(this.selectedItemData));
        window.localStorage.setItem('item_verstion', JSON.stringify(this.initialItemDataVer));
      } else {
        this.selectedItemData = JSON.parse(window.localStorage.getItem('screener_item'));
      }

      // 새로고침 세팅
      this.autoRefresh = window.localStorage.getItem('screener_refresh');
      if(this.autoRefresh === '' || this.autoRefresh === null || this.autoRefresh === undefined || this.autoRefresh !== 'on' || this.autoRefresh === 'off') {
        this.autoRefresh = 'off';
      }
      this.strategyChange('0000');
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
    symbolClick(symbol) {   // 종목 클릭 시 currentSymbol 변경하고 거래소로 이동
      this.$store.commit('setCurrentSymbol', symbol);
      this.$EventBus.$emit('changeCurrentSymbol', symbol);
      sessionStorage.setItem('currentSymbol', symbol);

      this.$router.push({name: 'exchange'});
    },
    itemSettingDialog() {   // 항목설정 다이얼로그 열기
      this.selectedItem = '';
      this.itemSettingPopupVisible = true;
    },
    itemChange(row) {   // 항목 선택 - 체크/해제
      if(!row.selected) {
        this.selectedItemData.forEach(element => {
          if(element.selected && element.order > 2 && element.order > row.order) {
            element.order = element.order - 1;
          }
        });
        row.order = -1;
      } else {
        var cnt;
        if(Number(this.strategy < 6)) {
          cnt = 0;
        } else {
          cnt = 1;
        }
        this.selectedItemData.forEach(element => {
          if(element.selected) {
            cnt++;
          }
        });
        row.order = cnt;
      }
    },
    currentItemChange(row) {    // 항목 선택
      this.selectedItem = row;
    },
    changeOrderTop() {  // 항목 순서 맨위로
      if(this.selectedItem === undefined || this.selectedItem === null || this.selectedItem === '' || this.selectedItem.order <= 2) {
        return;
      }

      this.selectedItemData.forEach(row => {
        if(row.selected && row.order > 2 && row.order < this.selectedItem.order) {
          row.order = row.order + 1;
        }
      });
      this.selectedItem.order = 3;
    },
    changeOrderUp() {   // 항목 순서 위로
      if(this.selectedItem === undefined || this.selectedItem === null || this.selectedItem === '' || this.selectedItem.order <= 3) {
        return;
      }

      var orderNum = this.selectedItemData.findIndex(x => x.order == this.selectedItem.order);
      var prevOrderNum = this.selectedItemData.findIndex(x => x.order == (this.selectedItem.order - 1));
      
      if(this.selectedItemData[orderNum].order <= 1 || this.selectedItemData[prevOrderNum].order <= 2) {
        return;
      }
      
      this.selectedItemData[prevOrderNum].order = (this.selectedItemData[prevOrderNum].order + 1);
      this.selectedItemData[orderNum].order = (this.selectedItemData[orderNum].order - 1);
    },
    changeOrderDown() { // 항목 순서 아래로
      if(this.selectedItem === undefined || this.selectedItem === null || this.selectedItem === '' || this.selectedItem.order <= 2) {
        return;
      }
      var orderNum = this.selectedItemData.findIndex(x => x.order == this.selectedItem.order);
      var nextOrderNum = this.selectedItemData.findIndex(x => x.order == (this.selectedItem.order + 1));
      
      if(nextOrderNum < 0) {
        return;
      }
      
      this.selectedItemData[nextOrderNum].order = (this.selectedItemData[nextOrderNum].order - 1);
      this.selectedItemData[orderNum].order = (this.selectedItemData[orderNum].order + 1);
    },
    changeOrderBottom() {   // 항목 순서 맨아래로
      if(this.selectedItem === undefined || this.selectedItem === null || this.selectedItem === '' || this.selectedItem.order <= 2) {
        return;
      }

      var cnt;
      if(Number(this.strategy < 6)) {
        cnt = 0;
      } else {
        cnt = 1;
      }

      this.selectedItemData.forEach(row => {
        if(row.selected) {
          if(row.order > 3 && row.order > this.selectedItem.order) {
            row.order = (row.order - 1);
          }
          cnt++;
        }
      });
      this.selectedItem.order = cnt;
    },
    resetItem() {   // 항목설정 초기화
      this.selectedItemData = [];
      this.selectedItemData = JSON.parse(window.localStorage.getItem('screener_initial_item'));
    },
    saveItemSetting() { // 항목설정 저장
      window.localStorage.setItem('screener_item', JSON.stringify(this.selectedItemData));
      this.selectedItem = '';
      this.$refs.selectedTable.setCurrentRow();
      this.itemSettingPopupVisible = false;
      setTimeout(this.strategyChange(this.strategy), 100);
    },
    closeItemSetting() {    // 항목설정 닫기
      this.selectedItem = '';
      this.$refs.selectedTable.setCurrentRow();
      this.selectedItemData = JSON.parse(window.localStorage.getItem('screener_item'));
      this.itemSettingPopupVisible = false;
      setTimeout(this.strategyChange(this.strategy), 100);
    },
    getImage(code) {    // 코인 이미지 경로 가져오기
      var tmpCode = code.replace(/__/g,'_').split('_')[0].substr(5).toLocaleLowerCase();
      return this.getCoinImages[tmpCode] !== undefined ? this.getCoinImages[tmpCode] : this.getCoinImages['default'];
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
    orderChildFilter(obj) {  // 항목설정 - 선택항목 테이블 데이터 order(표시 순서)로 정렬 및 기간별/거래량 상승률 항목 제거
      if(obj != null && obj != undefined) {
        var res = [];
        obj.forEach(element => {
          if(element.selected && element.order !== 2) {
            res.push(element);
          }
        });
        return res = _.sortBy(res, 'order');
      } else {
        return  '';
      }
    },
    hiddenFilter(obj) {  // 항목설정 - 항목명 테이블 데이터 order(표시 순서)로 정렬
      if(obj != null && obj != undefined) {
        var res = [];
        obj.forEach(element => {
          if(element.order !== 2) {
            res.push(element);
          }
        });
        return res;                    
      } else {
        return  '';
      }
    },
    // 종목명 가져오기
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
    changeExcelName() { // 엑셀 다운로드 시 엑셀파일 이름 현재 시간으로 설정
      this.excelName = 'screener_' + moment().format('YYYYMMDDHHmmss') + '.xls';
    },
    refreshChange(value) {    // 새로고침 설정
      this.autoRefresh = value;
      window.localStorage.setItem('screener_refresh', this.autoRefresh);
      if(this.autoRefresh === 'on' && this.timer === null) {
        this.requestSignal();
      } else {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.refreshPopupVisible = false;
    },
    showStrategyMenu(isOpen) {  // 왼쪽 전략 메뉴 열기/닫기
      if (isOpen === 'close') {
        this.strategyMenuPopupVisible = false;
      } else {
        this.strategyMenuPopupVisible = true;
      }
    },
    strategyChange(value) {   // 전략 선택

      this.strategy = value;

      this.selectedItemData.forEach(element => {     // 기간별/거래량 상승률 항목 전부 비선택 처리
        if(element.parent >= 0) {
          element.selected = false;
        }
      });

      if(Number(this.strategy) < 6) {     // 기간별/거래량 상승률 전략 선택 시 이름 항목 옆에 표시
        var childIdx = this.selectedItemData.findIndex(x => x.parent === Number(this.strategy));
        this.selectedItemData[childIdx].selected = true;

        this.sortKey = this.selectedItemData[childIdx].prop;
        this.sortDir = 'descending';
      } else {
        this.sortKey = null;
        this.sortDir = null;
      }
      
      this.periodPopupVisible = false;
      this.requestSignal();
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
    requestSignal() {   // 전략 검색결과 요청
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
      payload.MarketGb = this.market;

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
      }).catch((errorData) => {
        this.$alert(errorData.errMsg, '', {
          confirmButtonText: this.$t('sys_err.a001')
        });
      });
    },
    ...mapActions(['fetchSignalResult'])
  },
  computed: {
      ...mapState({
        coinList : state => state.data['n1001']
      }),
      socketConnected() {
        return this.$store.getters.isSocketConnected
      },
      ...mapGetters(['getSignalList', 'getSignal', 'getCoinImages', 'getLangKind']),
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
      getExcelData() {    // 엑셀 데이터 세팅
        var obj = this.signalData;
        if(obj != null && obj != undefined) {
          var res = [];
          obj.forEach(element => {
            element.Symbol = this.getSymbolName(element) + ' (' + element.o_inst_eng_abbr + ')';
            res.push(element);
          });
          return res;   
        } else {
          return  '';
        }
      },
      getExcelFields() {  // 엑셀 필드 세팅
        var obj = this.selectedItemData;
        
        if(obj != null && obj != undefined) {
          var res = [];
          obj.forEach(element => {
            if(element.selected) {
              res.push(element);
            }
          });
          res = _.sortBy(res, 'order');
          
          var fields = {};
          res.forEach(element => {
            if(element.prop === 'Hname') {
              fields[this.initialItemLabel[element.value]] = 'Symbol';
            } else {
              fields[this.initialItemLabel[element.value]] = element.prop;
            }
          });

          return fields;   
        } else {
          return  '';
        }
      },
      emptyMessage() {    // 검색결과 없는 경우 표시 메시지
          return this.$t('screener.d036');
      },
      terms() {   // 검색 주기 리스트
        return [
          { value: '1',   label: this.$t('screener.a001') },    // 1분
          { value: '5',   label: this.$t('screener.a002') },    // 5분
          { value: '15',  label: this.$t('screener.a003') },    // 15분
          { value: '30',  label: this.$t('screener.a004') },    // 30분
          { value: '60',  label: this.$t('screener.a005') },    // 1시간
          { value: '180', label: this.$t('screener.a006') },    // 3시간
          { value: '361', label: this.$t('screener.a007') },    // 1일
          { value: '362', label: this.$t('screener.a008') },    // 1주
          { value: '363', label: this.$t('screener.a009') }     // 1개월
        ];
      },
      strategyList() {    // 전략 리스트
        return [
          {
            value: '0000',
            label: this.$t('screener.b001'),  // 기간별 상승률(1일)
            info: this.$t('screener.b002'),   // 1일 전과 대비하여 종가 상승률 상위 순으로 종목을 제공합니다.
            detail: '',
            result: 0
          },
          {
            value: '0001',
            label: this.$t('screener.b004'),  // 기간별 상승률(1주)
            info: this.$t('screener.b005'),   // 1주 전과 대비하여 종가 상승률 상위 순으로 종목을 제공합니다.
            detail: '',
            result: 0
          },
          {
            value: '0002',
            label: this.$t('screener.b007'),  // 기간별 상승률(1개월)
            info: this.$t('screener.b008'),   // 1개월 전과 대비하여 종가 상승률 상위 순으로 종목을 제공합니다.
            detail: '',
            result: 0
          },
          {
            value: '0003',
            label: this.$t('screener.b010'),  // 거래량 상승률(1일)
            info: this.$t('screener.b011'),   // 1일 전과 대비하여 거래량 상승률 상위 순으로 종목을 제공합니다.
            detail: '',
            result: 0
          },
          {
            value: '0004',
            label: this.$t('screener.b013'),  // 거래량 상승률(1주)
            info: this.$t('screener.b014'),   // 1주 전과 대비하여 거래량 상승률 상위 순으로 종목을 제공합니다.
            detail: '',
            result: 0
          },
          {
            value: '0005',
            label: this.$t('screener.b016'),  // 거래량 상승률(1개월)
            info: this.$t('screener.b017'),   // 1개월 전과 대비하여 거래량 상승률 상위 순으로 종목을 제공합니다.
            detail: '',
            result: 0
          },
          {
            value: '0006',
            label: this.$t('screener.b019'),  // 추세모멘텀 전략
            info: this.$t('screener.d002'),   // 모멘텀 강세와 추세상승이 진행중인 코인을 매수하는 전략
            detail: this.$t('screener.d003') + '\n' + this.$t('screener.d004'), // 기술적지표상 강세구간에 진입하고 추가 상승 가능성이 높은 코인에 투자하는 전략.\n* 과매수 구간일 수 있으므로 철저한 위험관리가 필요함.
            result: 0
          },
          {
            value: '0007',
            label: this.$t('screener.b020'),  // N패턴 전략
            info: this.$t('screener.d006'),   // 단기 이평선이 장기 이평선의 지지를 받으며 2차 상승하는 시점에 매수하는 전략
            detail: this.$t('screener.d007'), // 추세상승 초기시점에 가격이 이평선의 지지를 받아 눌림목이 발생하고 재차 상승할 가능성이 높은 코인에 투자하는 전략.
            result: 0
          },
          {
            value: '0008',
            label: this.$t('screener.b021'),  // 골든크로스 돌파 전략
            info: this.$t('screener.d009'),   // 단기 이평선이 장기 이평선을 상향 돌파하고 상승하는 시점에 매수하는 전략
            detail: this.$t('screener.d010'), // 골든크로스 발생 후 장기 이평선의 지지를 확인한 코인 중 추세상승을 시작할 가능성이 높은 시점에 투자하는 전략.
            result: 0
          },
          {
            value: '0009',
            label: this.$t('screener.b022'),  // 변동성 급증 전략
            info: this.$t('screener.d012'),   // 가격 변동성이 급증할 때 매수하는 전략
            detail: this.$t('screener.d013'), // 변동성 지수를 계산하여 30%~70%사이에서 횡보하다 90%이상 증가하는 시점에 투자하는 전략.
            result: 0
          },
          {
            value: '0010',
            label: this.$t('screener.b023'),  // 단기 정배열 수렴 전략
            info: this.$t('screener.d015'),   // 장단기 이평선이 정배열 상태에서 수렴중에 고점를 돌파하는 코인을 매수하는 전략
            detail: this.$t('screener.d016'), // 정배열을 유지하며 좁은 범위에서 수렴하고 있는 상태에서 고점을 돌파하는 시점에 투자하는 전략.
            result: 0
          },
          {
            value: '0011',
            label: this.$t('screener.b024'),  // 박스권 돌파 전략
            info: this.$t('screener.d018'),   // 박스권을 돌파하는 시점에 매수하는 전략
            detail: this.$t('screener.d019'), // 박스권에서 횡보중인 코인이 박스권 상단을 돌파하면서 급등이 발생하면 투자하는 전략.
            result: 0
          },
          {
            value: '0012',
            label: this.$t('screener.b025'),  // 저항선 돌파 전략
            info: this.$t('screener.d021'),   // 약세구간에서 하락중인 코인이 저항선을 한번에 돌파하는 시점에 매수하는 전략
            detail: this.$t('screener.d022'), // 가격이 장단기 이동평균선보다 아래에서 계속 하락하던 중 해당 이동평균선을 한번에 상향 돌파하며 강하게 상승하는 시점에 투자하는 전략.
            result: 0
          },
          {
            value: '0013',
            label: this.$t('screener.b026'),  // 과대 낙폭 반등 전략
            info: this.$t('screener.d024'),   // '과도하게 하락한 코인이 거래량 증가와 함께 급등할 때 매수하는 전략
            detail: this.$t('screener.d025') + '\n' + this.$t('screener.d026'), // 과매도구간에서 평균회귀현상에 따른 기술적 반등시점에 투자하는 전략.\n*추세하락구간에 반등을 노리는 전략으로 단기적인 관점으로 접근이 필요함.
            result: 0
          },
          {
            value: '0014',
            label: this.$t('screener.b027'),  // 큰손 매수 추종 전략
            info: this.$t('screener.d028'),   // 대량의 매도물량을 매수하는 큰손거래가 발생하는 코인을 매수하는 전략
            detail: this.$t('screener.d029') + '\n' + this.$t('screener.d030'), // 매도총잔량이 매수총잔량보다 많은 상태에서 대량 매수체결이 발생한 코인에 투자하는 전략.\n* 순간체결대금이 일정금액이상인 코인을 검색하므로 조회시점에는 검색되지 않을 수 있음.
            result: 0
          },
          {
            value: '0015',
            label: this.$t('screener.b028'),  // 상위 베타계수 급등 전략
            info: this.$t('screener.d032'),   // 비트코인을 기준으로 베타계수 상위 25%의 코인 중 급등신호가 포착된 코인을 매수하는 전략
            detail: this.$t('screener.d033') + '\n' + this.$t('m_screener.d034'), // 비트코인 대비 변동성이 높은 알트코인 위주로 검색하는 전략.\n*전체 시장이 상승할 때 높은 수익률을 얻을 수 있지만, 큰 손실에 유의하여야 함.
            result: 0
          }
        ];
      },
      marketList() {  // 마켓 리스트
        return [
          { value: '0', label: this.$t('screener.c001') },    // 전체
          { value: '1', label: 'KRW' },
          { value: '2', label: 'BTC' },
          { value: '3', label: 'ETH' }
        ];
      },
      initialItemData() { // 초기 항목 데이터
        return [
          { value: 1,     label: '',  prop: 'Hname',              order: 1,   selected: true,     parent: -1 },
          { value: 2,     label: '',  prop: 'Close',              order: 3,   selected: true,     parent: -1 },
          { value: 3,     label: '',  prop: 'ChgRate',            order: 4,   selected: true,     parent: -1 },
          { value: 4,     label: '',  prop: 'Value',              order: 5,   selected: true,     parent: -1 },
          { value: 5,     label: '',  prop: 'Volume',             order: -1,  selected: false,    parent: -1 },
          { value: 6,     label: '',  prop: 'Daebi',              order: -1,  selected: false,    parent: -1 },
          { value: 7,     label: '',  prop: 'Change_1h',          order: -1,  selected: false,    parent: -1 },
          { value: 8,     label: '',  prop: 'Change',             order: -1,  selected: false,    parent: -1 },
          { value: 9,     label: '',  prop: 'Change_7d',          order: -1,  selected: false,    parent: -1 },
          { value: 10,    label: '',  prop: 'Change_1m',          order: -1,  selected: false,    parent: -1 },
          { value: 11,    label: '',  prop: 'ChgRate_1h',         order: -1,  selected: false,    parent: -1 },
          { value: 12,    label: '',  prop: 'ChgRate_7d',         order: -1,  selected: false,    parent: -1 },
          { value: 13,    label: '',  prop: 'ChgRate_1m',         order: -1,  selected: false,    parent: -1 },
          { value: 14,    label: '',  prop: 'ExcHname',           order: -1,  selected: false,    parent: -1 },
          { value: 15,    label: '',  prop: 'MoveAvg_Sim_5',      order: -1,  selected: false,    parent: -1 },
          { value: 16,    label: '',  prop: 'MoveAvg_Sim_20',     order: -1,  selected: false,    parent: -1 },
          { value: 17,    label: '',  prop: 'MoveAvg_Sim_60',     order: -1,  selected: false,    parent: -1 },
          { value: 18,    label: '',  prop: 'MoveAvg_Sim_120',    order: -1,  selected: false,    parent: -1 },
          { value: 19,    label: '',  prop: 'MoveAvg_Exp_5',      order: -1,  selected: false,    parent: -1 },
          { value: 20,    label: '',  prop: 'MoveAvg_Exp_20',     order: -1,  selected: false,    parent: -1 },
          { value: 21,    label: '',  prop: 'MoveAvg_Exp_60',     order: -1,  selected: false,    parent: -1 },
          { value: 22,    label: '',  prop: 'MoveAvg_Exp_120',    order: -1,  selected: false,    parent: -1 },
          { value: 23,    label: '',  prop: 'Bidho',              order: -1,  selected: false,    parent: -1 },
          { value: 24,    label: '',  prop: 'Offerho',            order: -1,  selected: false,    parent: -1 },
          { value: 25,    label: '',  prop: 'Open',               order: -1,  selected: false,    parent: -1 },
          { value: 26,    label: '',  prop: 'High',               order: -1,  selected: false,    parent: -1 },
          { value: 27,    label: '',  prop: 'Low',                order: -1,  selected: false,    parent: -1 },
          { value: 28,    label: '',  prop: 'High_1m',            order: -1,  selected: false,    parent: -1 },
          { value: 29,    label: '',  prop: 'Low_1m',             order: -1,  selected: false,    parent: -1 },
          { value: 30,    label: '',  prop: 'High_3m',            order: -1,  selected: false,    parent: -1 },
          { value: 31,    label: '',  prop: 'Low_3m',             order: -1,  selected: false,    parent: -1 },
          { value: 32,    label: '',  prop: 'High_52w',           order: -1,  selected: false,    parent: -1 },
          { value: 33,    label: '',  prop: 'Low_52w',            order: -1,  selected: false,    parent: -1 },
          { value: 34,    label: '',  prop: 'High_Year',          order: -1,  selected: false,    parent: -1 },
          { value: 35,    label: '',  prop: 'Low_Year',           order: -1,  selected: false,    parent: -1 },
          { value: 36,    label: '',  prop: 'OpenPer',            order: -1,  selected: false,    parent: -1 },
          { value: 37,    label: '',  prop: 'HighPer',            order: -1,  selected: false,    parent: -1 },
          { value: 38,    label: '',  prop: 'LowPer',             order: -1,  selected: false,    parent: -1 },
          { value: 39,    label: '',  prop: 'PrcUpRateDay',       order: 2,   selected: false,    parent: 0 },
          { value: 40,    label: '',  prop: 'PrcUpRateWeek',      order: 2,   selected: false,    parent: 1 },
          { value: 41,    label: '',  prop: 'PrcUpRateMon',       order: 2,   selected: false,    parent: 2 },
          { value: 42,    label: '',  prop: 'VolUpRateDay',       order: 2,   selected: false,    parent: 3 },
          { value: 43,    label: '',  prop: 'VolUpRateWeek',      order: 2,   selected: false,    parent: 4 },
          { value: 44,    label: '',  prop: 'VolUpRateMon',       order: 2,   selected: false,    parent: 5 }
        ];
      },
      initialItemLabel() {    // 초기 항목 데이터 필드명
        return {
          '1': this.$t('screener.c008'),  // 이름
          '2': this.$t('screener.c009'),  // 현재가
          '3': this.$t('screener.c010'),  // 등락율(24시)
          '4': this.$t('screener.c011'),  // 거래대금
          '5': this.$t('screener.c012'),  // 거래량(24시)
          '6': this.$t('screener.c052'),  // 전일대비
          '7': this.$t('screener.c013'),  // 대비(1시)
          '8': this.$t('screener.c014'),  // 대비(24시)
          '9': this.$t('screener.c015'),  // 대비(7일)
          '10': this.$t('screener.c016'), // 대비(1개월)
          '11': this.$t('screener.c017'), // 등락율(1시)
          '12': this.$t('screener.c018'), // 등락율(7일)
          '13': this.$t('screener.c019'), // 등락율(1개월)
          '14': this.$t('screener.c020'), // 거래소
          '15': this.$t('screener.c021'), // 단순이동평균(5)
          '16': this.$t('screener.c022'), // 단순이동평균(20)
          '17': this.$t('screener.c023'), // 단순이동평균(60)
          '18': this.$t('screener.c024'), // 단순이동평균(120)
          '19': this.$t('screener.c025'), // 지수이동평균(5)
          '20': this.$t('screener.c026'), // 지수이동평균(20)
          '21': this.$t('screener.c027'), // 지수이동평균(60)
          '22': this.$t('screener.c028'), // 지수이동평균(120)
          '23': this.$t('screener.c029'), // 매수호가
          '24': this.$t('screener.c030'), // 매도호가
          '25': this.$t('screener.c031'), // 시가
          '26': this.$t('screener.c032'), // 고가
          '27': this.$t('screener.c033'), // 저가
          '28': this.$t('screener.c034'), // 1개월 최고가
          '29': this.$t('screener.c035'), // 1개월 최저가
          '30': this.$t('screener.c036'), // 3개월 최고가
          '31': this.$t('screener.c037'), // 3개월 최저가
          '32': this.$t('screener.c038'), // 52주 신고가
          '33': this.$t('screener.c039'), // 52주 신저가
          '34': this.$t('screener.c040'), // 연중 신고가
          '35': this.$t('screener.c041'), // 연중 신저가
          '36': this.$t('screener.c042'), // 시가%
          '37': this.$t('screener.c043'), // 고가%
          '38': this.$t('screener.c044'), // 저가%
          '39': this.$t('screener.c045'), // 기간별상승률(1일)
          '40': this.$t('screener.c046'), // 기간별상승률(1주)
          '41': this.$t('screener.c047'), // 기간별상승률(1개월)
          '42': this.$t('screener.c048'), // 거래량상승률(1일)
          '43': this.$t('screener.c049'), // 거래량상승률(1주)
          '44': this.$t('screener.c050')  // 거래량상승률(1개월)
        };
      },
      strategyName() {    // 전략명
        var arrIdx = this.strategyList.findIndex(x => x.value === this.strategy);
        return this.strategyList[arrIdx].label;
      },
      strategyInfo() {    // 전략 설명
        var arrIdx = this.strategyList.findIndex(x => x.value === this.strategy);
        return this.strategyList[arrIdx].info;
      },
      strategyDetail() {  // 전략 상세설명
        var arrIdx = this.strategyList.findIndex(x => x.value === this.strategy);
        
        if (this.strategyList[arrIdx].detail) {
          return this.strategyList[arrIdx].detail;
        } else {
          return '';
        }
      }
  },
  created() {
    this.init();
  },
  mounted() {
    let self = this;
    self.changeExcelName();

    self.$EventBus.$emit('pc-navi', [
      { label: self.$t('main.h014'), target: null }
    ]);

    this.$EventBus.$on('langChange', () => {
      self.$EventBus.$emit('pc-navi', [
        { label: self.$t('main.h014'), target: null }
      ]);
    });
  },
  watch: {
    socketConnected(val, old) {
      this.strategyChange('0000');
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    this.timer = null;
  }
};
</script>
