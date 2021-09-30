<template>
  <div class="StockList">
    <el-row class="search">
      <el-col class="inp" v-show="srchView">
        <!-- 암호화폐 검색(한글/영문) -->
        <el-input v-if="!isIE" clearable :placeholder="$t('exchange.a004')" ref="filterTextInput" suffix-icon="el-icon-search"
          v-model="filterText" maxlength="20"></el-input>
        <div v-if="isIE" class="srch-box">
          <input type="text" class="searchBoxIE" id="searchBoxIE" :placeholder="$t('exchange.a004')" maxlength="20"
            v-model="filterText" />            
          <span class="srch-icon-black" v-if="$store.state.nowPage === '/fullexchange'"></span>
          <span class="srch-icon" v-if="$store.state.nowPage != '/fullexchange'"></span>
          <span class="srch-del" style="display:none;"></span>
        </div>
      </el-col>
      <el-col class="btn">
        <el-checkbox @change="onOnlyChange" v-model="holdingOnly">
          <!-- 보유 -->{{ $t('exchange.a005') }}</el-checkbox>
      </el-col>
    </el-row>
    <div class="market-tab">
      <el-radio-group v-model="market" @change="onExchange">
        <el-radio-button label="KRW">KRW</el-radio-button>
        <el-radio-button label="BTC">BTC</el-radio-button>
        <el-radio-button label="ETH">ETH</el-radio-button>
        <el-radio-button class="favorite" label="FAV">
          <i class="el-icon-star-off" size="small"></i>
        </el-radio-button>
        <!-- <el-radio-button label="XRP">XRP</el-radio-button> -->
      </el-radio-group>
    </div>

    <div class="el-table">
      <div class="el-table__header-wrapper">
        <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
          <thead>
            <tr>
              <th class="is-center" :width="isPC ? '125' : '130'">
                <div class="cell">
                  <!-- 종목 -->{{ $t('exchange.a006') }}</div>
              </th>
              <th class="is-center is-sortable" :class="sortStatA">
                <!-- ascending일 때 class에 ascending 추가, descending일 때 descending 추가 -->
                <div class="cell" @click="onClickSortA()">
                  <!-- 현재가 -->{{ $t('exchange.a007') }}
                  <span class="caret-wrapper" :class="{'disappear': market === 'FAV'}">
                    <i class="sort-caret ascending"></i>
                    <i class="sort-caret descending"></i>
                  </span>
                </div>
              </th>
              <th class="is-center is-sortable" width="45" v-if="isPC" :class="sortStatB">
                <div class="cell" @click="onClickSortB()">
                  <!-- 대비 -->{{ $t('exchange.c002') }}
                  <span class="caret-wrapper">
                    <i class="sort-caret ascending"></i>
                    <i class="sort-caret descending"></i>
                  </span>
                </div>
              </th>
              <th class="is-center is-sortable" v-if="!isPC" :class="sortStatB" width="70">
                <!-- ascending일 때 class에 ascending 추가, descending일 때 descending 추가 -->
                <div class="cell" @click="onClickSortB()">
                  {{ $t('m_exchange.b011') }}
                  <span class="caret-wrapper">
                    <i class="sort-caret ascending"></i>
                    <i class="sort-caret descending"></i>
                  </span>
                </div>
              </th>
              <th class="is-center is-sortable" :width="isPC ? '95' : '81'" :class="sortStatC">
                <!-- ascending일 때 class에 ascending 추가, descending일 때 descending 추가 -->
                <div class="cell" @click="onClickSortC()">
                  <!-- 거래금액 -->{{ $t('exchange.a008') }}
                  <span class="caret-wrapper" :class="{'disappear': market === 'FAV'}">
                    <i class="sort-caret ascending"></i>
                    <i class="sort-caret descending"></i>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <el-scrollbar class="scroll-area">
      <el-table :data="runningList" :empty-text="emptyText" highlight-current-row row-key="symbol" ref="tableRef" @cell-click="onCellClick" :show-header="false">

        <el-table-column label="" width="25" align="center">
          <template slot-scope="scope">
            <el-checkbox :checked="scope.row.my_coin"><i class="el-icon-star-off" size="small"></i></el-checkbox>
            <el-tooltip v-if="scope.row.paycurrcode == 'BTC'" effect="dark" :content="(krPriceFormat(scope.row.curprc * currentBtcKrPrice)).toString()+' KRW'"
              placement="left">
              <span class="krw-change"></span>
            </el-tooltip>
            <el-tooltip v-if="scope.row.paycurrcode == 'ETH'" effect="dark" :content="(krPriceFormat(scope.row.curprc * currentEthKrPrice)).toString()+' KRW'"
              placement="left">
              <span class="krw-change"></span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column prop="symbol" label="종목" width="100">
          <template slot-scope="scope">
            <span v-if="getLangKind == 'KR'" class="coin-name" :title="scope.row.search_nm" :itemid="scope.row.symbol">
              {{ scope.row.kor_nm }}
              <span v-if="checkNewDate(scope.row)" class="new-coin"></span>
            </span>
            <span v-if="getLangKind != 'KR'" class="coin-name" :title="scope.row.search_nm" :itemid="scope.row.symbol">
              {{ scope.row.eng_nm }}
              <span v-if="checkNewDate(scope.row)" class="new-coin"></span>
            </span>
            <span class="symbol">{{ scope.row.o_inst_eng_abbr }}</span>
          </template>
        </el-table-column>

        <!-- PC 일 때 -->
        <el-table-column v-if="isPC" prop="updnrate" label="현재가" align="right">
          <template slot-scope="scope">
            <div v-if="scope.row.o_exch_list_tp === '1'" :class="chkStrLength(priceStrSetting(scope.row))">
              <div :class="scope.row.updnrate.toFixed(2) | redBlueFilter" class="price">{{priceStrSetting(scope.row)}}</div>
              <!-- <span v-bind:class="[ scope.row.presentValueFluctuation ? 'fluctuation-up' : 'fluctuation-down' ]">{{ scope.row.presentValueFluctuationPoint }}</span> -->
              <span :class="scope.row.updnrate.toFixed(2) | redBlueFilter">{{scope.row.updnrate | diffFilter}}</span>
              <!-- 가격변동 시 깜박이는 효과 : 상승일 때 -->
              <!-- exectype 1: 매도 파란박스 2: 매수 빨간박스 -->
              <span v-if="scope.row.newTick == true" :class="scope.row.exectype === '2' ? 'price-up' : 'price-down'"></span>
              <span v-else class="none"></span>
            </div>
          </template>
        </el-table-column>
        <!--// PC 일 때 -->

        <!-- mobile 일 때 -->
        <el-table-column v-if="isPC !== true" prop="curprc" label="현재가" align="right">
          <template slot-scope="scope">
            <div v-if="scope.row.o_exch_list_tp === '1'" :class="chkStrLength(priceStrSetting(scope.row))">
              <div :class="scope.row.updnrate.toFixed(2) | redBlueFilter" class="price">{{priceStrSetting(scope.row)}}</div>
              <!-- <span v-bind:class="[ scope.row.presentValueFluctuation ? 'fluctuation-up' : 'fluctuation-down' ]">{{ scope.row.presentValueFluctuationPoint }}</span> -->
              <!-- 가격변동 시 깜박이는 효과 : 상승일 때 -->
              <!-- exectype 1: 매도 파란박스 2: 매수 빨간박스 -->
              <span class="krw-change" v-if="scope.row.paycurrcode == 'BTC'">{{krPriceFormat(scope.row.curprc * currentBtcKrPrice)}} KRW</span>
              <span class="krw-change" v-if="scope.row.paycurrcode == 'ETH'">{{krPriceFormat(scope.row.curprc * currentEthKrPrice)}} KRW</span>
              <span v-if="scope.row.newTick == true" :class="scope.row.exectype === '2' ? 'price-up' : 'price-down'"></span>
            </div>
          </template>
        </el-table-column>

        <el-table-column v-if="isPC !== true" prop="curprc" label="변동율" align="right" width="70">
          <template slot-scope="scope">
            <div v-if="scope.row.o_exch_list_tp === '1'">
              <span :class="scope.row.updnrate.toFixed(2) | redBlueFilter">{{scope.row.updnrate | diffFilter}}</span>
            </div>
          </template>
        </el-table-column>
        <!--// mobile 일 때 -->

        <el-table-column prop="cumdealcost_24" label="거래금액" width="105" align="right">
          <template slot-scope="scope">
            <div v-if="scope.row.o_exch_list_tp === '1'" v-html="strMillionSetting(scope.row)"></div>
            <span v-else>
              <!-- 준비중 -->{{$t('exchange.a016')}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="searchMessage">
        {{$t('exchange.a015')}}<!-- 검색값과 일치하는 종목이 없습니다 -->
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
  import MobileDetect from 'mobile-detect';
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    _
  } from 'vue-underscore'
  import {
    setTimeout
  } from 'timers';
  import {
    strictEqual
  } from 'assert';

  export default {
    props: [
      'srchView'
    ],
    data() {
      return {
        name: 'StockList',
        filterText: '',             // 검색어
        holdingOnly: false,         // 보유
        market: 'KRW',              // 현재마켓
        //sortOrder: ['descending', 'ascending', null],
        isPC: true,                 // 요청기기
        runningList: [],            // 종목 리스트
        dataLink: [],               // 데이터 키/값
        mySymbols: [],              // 즐겨찾기 리스트
        currentSymbolIndex: -1,     // 종목 선택 인덱스
        emptyText: '',              // 목록 빈화면 메시지
        ownItems: [],               // 보유 종목 리스트
        isOwnSelected: false,       // 보유 선택 상태
        sortStatA: '',              // 현재가 정렬값
        sortStatB: '',              // 대비 정렬값
        sortStatC: '',              // 거래금액 정렬값
        krwMaxDate: '',             // KRW 마켓 종목 최근등록일
        btcMaxDate: '',             // BTC 마켓 종목 최근등록일
        ethMaxDate: '',             // ETH 마켓 종목 최근등록일
        searchMessage: false,       // 검색 메시지
        dataLoaded: false,          // 화면 데이터 로드 상태
        isMock: false,              // 테스트 상태
        mockCount: 1,               // 테스트 데이터 초당 요청수
        beforeSymbols: [],          // 이전 심볼 배열
      };
    },
    watch: {
      getUserId(val, old) {
        console.log(val);
      },
      filterText(val, old) {
        if (val == '') {
          this.filterTable();
        }
      },
      getLangKind(val, old) {
        this.setEmptyText();
      },
    },
    computed: {
      ...mapState({
        nameList: state => state.data['n1001'],
        currentSymbol: state => state.data.currentSymbol,
        trSymbols: state => state.data.trSymbols,
        currentBtcKrPrice: state => state.data.currentBtcKrPrice,
        currentEthKrPrice: state => state.data.currentEthKrPrice
      }),
      ...mapGetters(['getUserId', 'hogaUnit', 'getLangKind']),
      isIE() {
        return afc.isIE;
      }
    },
    filters: {
      // nameFilter: function (obj) {
      //   var strArr = obj['o_inst_kor_nm'].split('/');
      //   return strArr[0];
      // },
      // codeFilter: function (obj) {
      //   return obj['o_inst_eng_abbr'];
      // },
      redBlueFilter: function (obj) { // 등락 색상 처리
        var val = parseFloat(obj);
        if (val == 0) {
          return '';
        }
        if (val > 0) {
          return 'red';
        }
        if (val < 0) {
          return 'blue';
        }
      },
      diffFilter: function (obj) { // 등락 출력 형식
        var obj2 = obj.toFixed(2);
        if (obj2 > 0) {
          obj2 = '+' + obj2;
        } else if (obj2 == 0) {
          obj2 = '0.00';
        }
        return obj2 + '%';
      }
    },
    methods: {
      ...mapActions(['fetchAssetStatusData']),      
      chkStrLength(_srt) { // 글자수 15초과시 다른 class 적용
        var length = _srt.length;

        if (!this.isPC) {
          if (length > 14) {
            return 'fs15';
          }
        } else {
          if (length > 15) {
            return 'fs15';
          }
        }
      },
      nameSearchFormat(obj) { // 검색대상 종목명 처리
        return obj['o_inst_kor_nm'].split('/')[0] + ' ' + obj['o_inst_eng_nm'].split('/')[0] + ' ' + obj[
          'o_inst_eng_abbr'].split('/')[0];
      },
      nameFormat(obj) { // 다국어 따른 종목명 처리
        var self = this;
        if (self.getLangKind == 'KR') {
          return obj['o_inst_kor_nm'].split('/')[0];
        }
        if (self.getLangKind == 'EN') {
          return obj['o_inst_eng_nm'].split('/')[0];
        }
      },
      bookmark(symbol, flag) { // 즐겨찾기 추가/삭제
        let self = this;
        self.$socket.sendProcessByName('d0004', (queryData) => {
          let ib1 = queryData.getBlockData('InBlock1')[0];
          ib1['account_id'] = self.getUserId;
          ib1['grp_no'] = 0;
          ib1['in_cnt'] = 1;
          let ib2 = queryData.getBlockData('InBlock2');
          let favData = {
            symbol: symbol,
            blnk_memo_yn: 1,
            bmrk_yn: 1,
            save_del_div: flag
          };

          if (flag == 0) {
            var maxSeq = 0; // 즐겨찾기 순번
            if (self.mySymbols != null && self.mySymbols.length > 0) {
              var arr = [];
              self.mySymbols.forEach((item) => {
                arr.push(parseInt(item.symbol_seq));
              });

              maxSeq = arr.reduce((previous, current) => {
                return previous > current ? previous : current
              }) + 1;
            }

            favData['symbol_seq'] = maxSeq;
          }

          ib2.push(favData);

        }, (queryData) => {
          if (!queryData) {
            console.log('즐겨찾기 추가/삭제 실패');

            // 전문 에러 언어팩 적용
            const errorData = JSON.parse(window.sessionStorage.getItem('lastErrorData'));
            if (errorData.trName != "d0004") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t('sys_err.a001')
            });
            return;
          }
          var array = [];

          for (var data of queryData.getBlockData('OutBlock2')) {
            array.push(data);
          }

          self.mySymbols = array;
        })
      },
      requestBookmarkSymbol() { // 즐겨찾기 목록 요청
        var self = this;
        this.$socket.sendProcessByName('d0003', (queryData) => {
          let ib1 = queryData.getBlockData('InBlock1')[0]
          ib1['account_id'] = self.getUserId
          ib1['grp_no'] = 0

        }, (queryData) => {
          if (!queryData) {
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse(window.sessionStorage.getItem('lastErrorData'));
            if (errorData.trName != "d0003") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t('sys_err.a001')
            });
            return;
          }
          self.mySymbols = queryData.getBlockData('OutBlock2');
          if (self.market == 'FAV' && self.runningList.length == 0) {
            self.requestCoinListFav();
          }
        });
      },
      onCellClick(row, column, cell, event) { // 종목 클릭시 동작
        let self = this;

        // 즐겨찾기 클릭시 처리
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'LABEL' || event.target.className ===
          'el-icon-star-off') {
          if (self.getUserId) {
            if (event.target.type === 'checkbox') {
              self.bookmark(row.symbol, event.target.checked ? 0 : 1);
            }
          } else {
            event.target.checked = !event.target.checked;
            self.$confirm(self.$t('exchange.a012'), '', {
              confirmButtonText: self.$t('exchange.a014'),
              cancelButtonText: self.$t('exchange.a013')
            }).then(() => {
              self.$router.push({
                path: '/login'
              });
            }).catch(() => {

            });
          }
        } else { // 종목명 클릭시 처리
          self.selectItem(row);
        }
      },
      filterTable() { // 검색 동작
        let self = this;
        if (self.$refs.tableRef == null) return;
        const rows = self.$refs.tableRef.$refs.bodyWrapper.getElementsByClassName('el-table__row');

        // 검색어 특수기호 제거
        var tempText = self.filterText.replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\s)]/gi, '').replace(/[\(\)]/gi, '');

        // 검색어 20자 이내
        if (tempText.length > 20) {
          tempText = tempText.substr(0, 20);
        }

        let idx = 0;
        let searchText = tempText.toLowerCase();

        for (let row of rows) {
          let innerText = row.getElementsByTagName('td')[1].getElementsByTagName('span')[0].title.toLowerCase();
          innerText = innerText.replace(/\n/ig, ' ').replace(/ +/ig, ' ');

          if (innerText.indexOf(searchText) < 0) {
            row.style.display = 'none';
            idx++;
          } else {
            row.style.display = '';
          }
        }

        if (idx == rows.length) {
          self.searchMessage = true;
        } else {
          self.searchMessage = false;
        }

        self.filterText = tempText;

      },
      onOnlyChange(event) { // 보유클릭시 동작
        var self = this;
        self.isOwnSelected = !self.isOwnSelected;
        self.getData();
      },
      onClickSortA() { // 현재가 정렬 클릭시 동작
        var self = this;
        if (self.market !== 'FAV') {
          self.sortStatB = '';
          self.sortStatC = '';
          switch (self.sortStatA) {
            case '':
              self.sortStatA = 'descending';
              break;
            case 'descending':
              self.sortStatA = 'ascending';
              break;
            case 'ascending':
              self.sortStatA = '';
              self.sortStatC = 'descending';
              break;
          }
          self.sortRunningList();
        }
      },
      onClickSortB() { // 대비 정렬 클릭시 동작
        var self = this;
        self.sortStatA = '';
        self.sortStatC = '';
        switch (self.sortStatB) {
          case '':
            self.sortStatB = 'descending';
            break;
          case 'descending':
            self.sortStatB = 'ascending';
            break;
          case 'ascending':
            self.sortStatA = '';
            self.sortStatB = '';
            self.sortStatC = 'descending';
            break;
        }
        self.sortRunningList();
      },
      onClickSortC() { // 거래금액 정렬 클릭시 동작
        var self = this;
        if (self.market !== 'FAV') {
          self.sortStatA = '';
          self.sortStatB = '';
          switch (self.sortStatC) {
            case '':
              self.sortStatC = 'descending';
              break;
            case 'descending':
              self.sortStatC = 'ascending';
              break;
            case 'ascending':
              self.sortStatC = 'descending';
              break;
          }
          self.sortRunningList();
        }
      },
      sortRunningList() { // 종목 리스트 정렬 처리
        var self = this;
        if (self.$refs.tableRef == null) return;

        // 즐겨찾기 선택시
        if (self.market == 'FAV') {
          self.sortStatC = '';
          if (self.sortStatA == '' && self.sortStatB == '' && self.sortStatC == '') {
            self.runningList = _.sortBy(self.runningList, "symbol_seq").reverse();
          }
        }

        // 즐겨찾기가 아니고 정렬값이 없을경우
        if (self.sortStatA == '' && self.sortStatB == '' && self.sortStatC == '' && self.market != 'FAV') {
          self.sortStatC = 'descending';
        }

        self.$store.state.data.stockListSortStatA = self.sortStatA;
        self.$store.state.data.stockListSortStatB = self.sortStatB;
        self.$store.state.data.stockListSortStatC = self.sortStatC;

        // _.sortBy 함수를 사용해야 모든 브라우저에서 정상동작 됨
        // 현재가 정렬
        switch (self.sortStatA) {
          case 'descending':
            self.runningList = _.sortBy(self.runningList, "curprc_f").reverse();
            break;
          case 'ascending':
            self.runningList = _.sortBy(self.runningList, "curprc_f");
            break;
        }

        // 대비 정렬
        switch (self.sortStatB) {
          case 'descending':
            self.runningList = _.sortBy(self.runningList, "updnrate_f").reverse();
            break;
          case 'ascending':
            self.runningList = _.sortBy(self.runningList, "updnrate_f");
            break;
        }

        // 거래금액 정렬
        switch (self.sortStatC) {
          case 'descending':
            self.runningList = _.sortBy(self.runningList, "cumdealcost_24_f").reverse();
            break;
          case 'ascending':
            self.runningList = _.sortBy(self.runningList, "cumdealcost_24_f");
            break;
        }

        self.runningList = _.sortBy(self.runningList, "pre");

        // 현재선택 종목
        var currentRow = _.findWhere(self.runningList, {
          symbol: self.$store.state.data.currentSymbol
        });

        if (currentRow) {
          setTimeout(() => {
            self.$refs.tableRef.setCurrentRow();
            self.$refs.tableRef.setCurrentRow(currentRow);
          }, 100);
        }

        // 실시간 체결데이터 수신시 for문 사용을 개선하기 위해 추가
        self.dataLink = {};
        self.runningList.forEach((item) => {
          self.dataLink[item.symbol] = item;
        });
      },
      setEmptyText() {
        let self = this;
        if (self.market === 'FAV') {
          //즐겨찾기한 종목이 없습니다.
          self.emptyText = self.$t('exchange.a011');
          if (self.getUserId == null) {
            //로그인 후 즐겨찾기한 종목을 확인할 수 있습니다.
            self.emptyText = self.$t('exchange.a010');
          }
        } else if (self.market === 'KRW') {
          //KRW 마켓 준비 중입니다
          self.emptyText = self.$t('exchange.a023');
        } else {
          //종목이 없습니다.
          self.emptyText = self.$t('exchange.a018');
        }
      },
      onExchange(code) { // 마켓 변경시 동작
        let self = this;
        self.market = code;
        sessionStorage.setItem('selectedMarket', code);

        self.setEmptyText();
        self.getData();
      },
      selectItem(row) { // 종목 선택시 동작
        let self = this;
        if (self.$refs.tableRef == null) return;
        //if (row.symbol == self.currentSymbol) return;

        if (_.findWhere(self.nameList, {
            o_symbol: row.symbol
          })['o_exch_list_tp'] !== '1') {
          self.$refs.tableRef.setCurrentRow(self.runningList[self.currentSymbolIndex]);
          return;
        }

        var md = new MobileDetect(window.navigator.userAgent);

        // 다른 컴포넌트들에게 데이터 전송
        this.$store.commit('setCurrentSymbol', row.symbol);
        this.$EventBus.$emit('changeCurrentSymbol', row.symbol);
        sessionStorage.setItem('currentSymbol', row.symbol);

        if (md.mobile()) {
          // mobile 일 때, 주문 컴포넌트로 이동, 데이터 전송
          this.$router.push({
            name: 'mOrder',
            params: {
              list: self.runningList
            }
          });
        }
      },
      krPriceFormat(number) { // 한화 환산가 형식
        var fixedVal = 0;

        if (number < 10) {
          fixedVal = 2;
        }
        if (10 <= number && number < 100) {
          fixedVal = 1;
        }
        if (number >= 100) {
          fixedVal = 0;
        }
        
        if (number < 100) {
          if (number > 0) {
            var num = number.toFixed(10);
            var val1 = UnitManager.numberWithCommas(parseInt(number.toString()));
            var val2 = num.toString().split('.')[1];
            val2 = parseFloat('0.' + val2).toFixed(fixedVal);
            val2 = val2.toString().split('.')[1];
            return val1 + '.' + val2;
          } else {
            return number.toFixed(fixedVal);
          }
        } else {
          return UnitManager.numberWithCommas(parseInt(number))
        }
      },
      priceStrSetting(row) { // 현재가 출력 형식
        let self = this;
        var nLenBelowDigitArray = [1];
        var curprc = row.curprc * 1; //실시간 데이터에서는 curprc가 문자형으로 들어오므로 숫자로 변화처리
        UnitManager.getHogaUnit(self.hogaUnit, row.paycurrcode, curprc, undefined, undefined, nLenBelowDigitArray);
        var strPrice = curprc.toFixed(nLenBelowDigitArray[0]).toString();
        if (parseFloat(strPrice) > 1) {          
          return UnitManager.numberWithCommas(strPrice);
        } else {
          return strPrice;
        }
      },
      strMillionSetting(obj) { // 거래금액 출력 형식
        var price = parseFloat(obj.cumdealcost_24);
        var priceStr = obj.cumdealcost_24.toString();
        var self = this;

        if (parseFloat(price.toFixed(2)) == 0) {
          return '0';
        }

        if (price >= 1000000) {          
          return UnitManager.numberWithCommas((price / 1000000).toFixed(0)) + '<span class="unit-million">' + self.$t(
            'exchange.a009') + '</span>';
        } else {
          if (obj.paycurrcode == 'KRW') {            
            return UnitManager.numberWithCommas(parseInt(priceStr));
          } else {
            if (priceStr.indexOf('.') > -1) {
              if (price > 1) {
                var val1 = UnitManager.numberWithCommas(parseInt(price));
                var val2 = price.toFixed(2).toString().split('.')[1];
                return val1 + '.' + val2;
              } else {
                return price.toFixed(2);
              }
            } else {
              return UnitManager.numberWithCommas(price); //formatter.format(price);
            }
          }
        }
      },
      requestCoinList(symbolType) { // 마켓별 종목리스트 데이터 요청
        var self = this;

        if (self.$refs.tableRef != null) {
          self.$refs.tableRef.$refs.bodyWrapper.style.display = 'none';
        }

        self.$socket.sendProcessByName('i0018', function (queryData) {
          var block = queryData.getBlockData('InBlock1')[0];
          // 조회구분
          block['symbolcnt'] = '100';
          block['qry_div'] = '4';
          block['paycurrcode'] = symbolType;
          block['excode'] = '001';

        }, function (queryData) {
          if (queryData == null) {
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse(window.sessionStorage.getItem('lastErrorData'));
            if (errorData.trName != "i0018") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t('sys_err.a001')
            });
            return;
          }
          var coinList = queryData['queryObj']['OutBlock2'];
          self.updateCoinList(coinList);

          if (self.isMock) { // 테스트 여부
            self.registerRealMock();
          } else {
            self.registerReal();
          }

          setTimeout(() => { // 검색어 입력된 경우 처리
            if (self.filterText) {
              self.filterTable();
            }
            if (self.$refs.tableRef != null) {
              self.$refs.tableRef.$refs.bodyWrapper.style.display = '';
            }
          }, 50);

        });
      },
      requestCoinListFav() { // 즐겨찾기 종목 리스트 데이터 요청
        var self = this;

        self.runningList = [];

        if (self.mySymbols == null || self.mySymbols.length == 0) return;

        if (self.$refs.tableRef != null) {
          self.$refs.tableRef.$refs.bodyWrapper.style.display = 'none';
        }

        var symbols = _.pluck(self.mySymbols, 'symbol');

        self.$socket.sendProcessByName('i0018', function (queryData) {
          var block = queryData.getBlockData('InBlock1')[0];
          // 조회구분
          block['symbolcnt'] = symbols.length.toString();
          block['qry_div'] = '4';
          block['paycurrcode'] = '99999';
          block['excode'] = '001';
          var block2 = queryData.queryObj['InBlock2'];
          for (var i in symbols) {
            block2.push({
              'symbol': symbols[i]
            });
          }
        }, function (queryData) {
          if (queryData == null) {

            // 전문 에러 언어팩 적용
            const errorData = JSON.parse(window.sessionStorage.getItem('lastErrorData'));
            if (errorData.trName != "i0018") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t('sys_err.a001')
            });
            return;
          }
          var coinList = queryData['queryObj']['OutBlock2'];

          for (var i in self.mySymbols) {
            var mySymbol = self.mySymbols[i];
            var coin = _.findWhere(coinList, {
              symbol: mySymbol.symbol
            });
            if (coin != null) {
              coin.symbol_seq = parseInt(mySymbol.symbol_seq);
            }
          }

          self.updateCoinList(coinList);
          self.registerReal();

          setTimeout(() => { // 검색어 입력된 경우 처리
            if (self.filterText) {
              self.filterTable();
            }
            if (self.$refs.tableRef != null) {
              self.$refs.tableRef.$refs.bodyWrapper.style.display = '';
            }
          }, 50);

        });
      },
      updateCoinList(datas) { // 체결데이터 리스트 가공 처리
        var self = this;
        var symbols = [];
        self.currentSymbolIndex = -1;
        var currentSymbol = self.$store.state.data.currentSymbol;
        var newDataArr = [];
        var prepareDataArr = [];
        var currentIndex = -1;

        for (var index in datas) {
          var obj = datas[index];
          var symbol = obj['symbol'];
          var found = self.nameList.find(function (element) {
            return element['o_symbol'] == symbol;
          });

          //검색된 종목이 없을 경우 다음 종목 처리
          if(found == null)
            continue;
          //
          
          var my_coin = _.findWhere(self.mySymbols, {
            symbol: symbol
          });

          // 문자열 sorting시 일부 브라우저에서 오동작하여 float타입으로 sorting하기 위해 처리됨
          obj['curprc_f'] = parseFloat(obj['curprc']);
          obj['updnrate_f'] = parseFloat(obj['updnrate']);
          obj['cumdealcost_24_f'] = parseFloat(obj['cumdealcost_24']);

          obj['kor_nm'] = found['o_inst_kor_nm'].split('/')[0];
          obj['eng_nm'] = found['o_inst_eng_nm'].split('/')[0];
          obj['search_nm'] = found['o_inst_kor_nm'].split('/')[0] + ' ' + found['o_inst_eng_nm'].split('/')[0] + ' ' +
            found['o_inst_eng_abbr'].split('/')[0];
          obj['o_exch_list_tp'] = found['o_exch_list_tp'];
          obj['o_inst_eng_abbr'] = found['o_inst_eng_abbr'];
          obj['my_coin'] = my_coin != undefined;

          if (found['o_exch_list_tp'] != '1') { // 준비중 종목
            obj['cumdealcost_24'] = -1;
            obj['pre'] = 2;
            prepareDataArr.push(obj);
          } else {
            obj['pre'] = 1;
            newDataArr.push(obj);
            currentIndex++;
          }
          if (obj['symbol'] != null) {
            if (currentSymbol == symbol) {
              self.currentSymbolIndex = parseInt(currentIndex);
            }
            symbols.push(obj['symbol']);
          }
        }

        datas = newDataArr.concat(prepareDataArr);

        var viewDatas = [];

        for (let data of datas) { // 보유 상태 처리
          if (self.ownItems == null || self.ownItems.length == 0) {
            if (!self.isOwnSelected) viewDatas.push(data);
          } else {
            for (let code of self.ownItems) {
              if (data.symbol.substr(5, 5).replace(/_/ig, '') == code || !self.isOwnSelected) {
                viewDatas.push(data);
                break;
              }
            }
          }
        }

        self.runningList = viewDatas;
        self.sortRunningList();

        symbols = null;
        currentSymbol = null;
        newDataArr = null;
        prepareDataArr = null;
        currentIndex = null;
      },
      checkNewDate(obj) { // 마켓별 최근등록 코인 처리
        var self = this;
        var listDate = obj.listdatetime.substr(0, 8);
        switch (obj.paycurrcode) {
          case 'KRW':
            return listDate == self.krwMaxDate;
          case 'BTC':
            return listDate == self.btcMaxDate;
          case 'ETH':
            return listDate == self.ethMaxDate;
        }
        return false;
      },
      getOwnList() { // 보유 종목 데이터 요청
        var self = this;
        self.$socket.sendProcessByName('b0002', (queryData) => {
          let ib1 = queryData.getBlockData('InBlock1')[0];

          ib1['user_id'] = self.getUserId;
          ib1['fee_tp'] = '0';

        }, (queryData) => {
          if (queryData == null) {

            // 전문 에러 언어팩 적용
            const errorData = JSON.parse(window.sessionStorage.getItem('lastErrorData'));
            if (errorData.trName != "b0002") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t('sys_err.a001')
            });
            return;
          }
          var list = queryData['queryObj']['OutBlock2'];
          self.ownItems = [];
          for (var idx in list) {
            if (list[idx]['cur_cd'] != 'KRW') {
              self.ownItems.push(list[idx]['cur_cd']);
            }
          }
        });
      },
      setDefault() { // 기본값 설정
        var self = this;

        if (sessionStorage.getItem('selectedMarket') != null) {
          self.market = sessionStorage.getItem('selectedMarket');
        }

        if (self.market == null || self.market == '') {
          self.market = 'KRW';
        }

        if (self.$store.state.data.stockListSortStatA) {
          self.sortStatA = self.$store.state.data.stockListSortStatA
        };
        if (self.$store.state.data.stockListSortStatB) {
          self.sortStatB = self.$store.state.data.stockListSortStatB
        };
        if (self.$store.state.data.stockListSortStatC) {
          self.sortStatC = self.$store.state.data.stockListSortStatC
        };

        if (self.sortStatA == '' && self.sortStatB == '' && self.sortStatC == '') {
          self.sortStatC = 'descending';
        }

        self.setEmptyText();
      },
      setMaxDate() { // 마켓별 코인 최근 등록일 설정
        var self = this;
        var krwList = [];
        var btcList = [];
        var ethList = [];

        self.nameList.forEach((item) => {
          if (item.o_setl_cur_cd_n == 'KRW') {
            krwList.push(item);
          }
          if (item.o_setl_cur_cd_n == 'BTC') {
            btcList.push(item);
          }
          if (item.o_setl_cur_cd_n == 'ETH') {
            ethList.push(item);
          }
        });

        if (krwList.length > 0) {
          self.krwMaxDate = self.getMaxDate(krwList);
        }
        if (btcList.length > 0) {
          self.btcMaxDate = self.getMaxDate(btcList);
        }
        if (ethList.length > 0) {
          self.ethMaxDate = self.getMaxDate(ethList);
        }
      },
      getMaxDate(datas) { // 코인 최근 등록일 가져오기
        var arr = [];
        datas.forEach((item) => {
          arr.push(item.o_exch_list_dtm.substr(0, 8));
        });
        return arr.reduce((previous, current) => {
          return previous > current ? previous : current;
        });
      },
      getData() { // 화면 데이터 요청
        var self = this;
        //console.log('getUserId', self.getUserId)
        if (self.getUserId != null) {
          self.requestBookmarkSymbol();
          self.getOwnList();
        }
        // if (self.market == 'FAV') {
        //   self.requestCoinListFav();
        // } else if (self.market == 'KRW') {
        //   self.runningList = [];
        // } else {
        //   self.requestCoinList(self.market);
        // }
        if (self.market == 'FAV') {
          self.requestCoinListFav();
        } else {
          self.requestCoinList(self.market);
        }
      },
      registerReal() { // 실시간 데이터 요청
        var self = this;
        var symbols = _.pluck(self.runningList, 'symbol');        

        self.$socket.unregisterReal('KVM2', self.beforeSymbols, self.name);
        self.$socket.registerReal('KVM2', 'symbol', symbols, self.name, function (queryData) {
          if (queryData != null) {
            self.excuetKVM2(queryData);            
          }
        });

        self.$socket.unregisterReal('KVS0', self.beforeSymbols, self.name);
        self.$socket.registerReal('KVS0', "symbol", symbols, self.name, function (queryData) {
          if (queryData != null) {
            self.excuteKVS0(queryData);
          }
        });
        self.beforeSymbols = symbols;
      },
      registerRealMock() { // 데스트 데이터 생성
        
      },
      excuteKVS0(queryData) { // KVS0 실시간 데이터 처리
        var self = this;

        var data = queryData.queryObj.OutBlock1[0];
        if (data == null) return;

        var findObj = self.dataLink[data.symbol];
        if (findObj == null) return;

        //남아있는 timeout에 대한 처리
        if (findObj.timer) {
          self.$set(findObj, 'newTick', false);
          clearTimeout(findObj.timer);
        }

        findObj['exectype'] = data['exectype'];

        findObj['curprc'] = parseFloat(data['execprice']);
        findObj['curprc_f'] = parseFloat(data['execprice']);

        findObj['updnrate'] = parseFloat(data['updnrate']);
        findObj['updnrate_f'] = parseFloat(data['updnrate']);

        //새로 timeout 등록
        self.$set(findObj, 'newTick', true);
        findObj.timer = setTimeout(function() {
          self.$set(findObj, 'newTick', false);
          findObj.timer = null;
        }, 1000);
      },
      excuetKVM2(queryData) { // KVM2 실시간 데이터 처리
        var self = this;

        var data = queryData.queryObj.OutBlock1[0];
        if (data == null) return;

        var findObj = self.dataLink[data.symbol];
        if (findObj == null) return;

        findObj['cumdealcost_24'] = data['cumdealcost_1440'];
        findObj['cumdealcost_24_f'] = parseFloat(data['cumdealcost_1440']);
      },
      resetSearchCallback() { // resetSearch 이벤트 콜백 함수
        var self = this;
        self.filterText = '';
        self.searchMessage = false;
        self.filterTable();
      },
      // dataLoaded 값이 false일 경우 데이터 요청 처리
      // 동시 dataLoaded를 true로 변경하여 중복 요청 방지
      loadStockDataCallback() { // loadStockData 이벤트 콜백 함수
        var self = this;
        if (self.dataLoaded) return;
        self.dataLoaded = true;
        self.setMaxDate();
        self.getData();
      },
      // 신규상장, 소켓재접속등 데이터 재조회 필요시 받는 event 
      // resetLoadStockData 이벤트가 먼저 실행되어 dataLoaded 값이 false로 변경
      // 재조회 가능 상태로 처리
      resetLoadStockDataCallback() { // resetLoadStockData 이벤트 콜백 함수
        var self = this;
        self.dataLoaded = false;
      },
      changeCurrentSymbolCallback(symbol) { // changeCurrentSymbol 이벤트 콜백 함수
        var self = this;
        self.getData();
        self.CheckisNotiCurSymbol();
        self.selectStockList(symbol);
      },
      stockWatchCellClickCallback(param) { // stockWatchCellClick 이벤트 콜백 함수
        var self = this;
        // market 선택 값과 다를 경우 마켓 선택
        if (this.market != param['setl_cur_cd']) {
          this.market = param['setl_cur_cd']
          this.onExchange(this.market);
        }

        this.runningList.filter(function (obj, i) {
          if (obj['symbol'] == param['symbol']) {
            self.$refs.tableRef.setCurrentRow(self.runningList[i])
          }
        });

        this.$store.commit('setCurrentSymbol', param.symbol);
        this.$EventBus.$emit('changeCurrentSymbol', param.symbol);
        sessionStorage.setItem('currentSymbol', param.symbol);
      }
    },
    created() {
      var self = this;

      var md = new MobileDetect(window.navigator.userAgent);
      if (md.phone()) {
        self.isPC = false;
      } else {
        self.isPC = true;
      }

      self.setDefault();
    },
    mounted() {
      var self = this;
      var zoomIco = document.getElementsByClassName('srch-icon')[0];
      var delIco = document.getElementsByClassName('srch-del')[0];

      if (self.isIE) { // 익스 경우 검색창 처리
        $("#searchBoxIE").bind("keyup", function (e) {
          if (e.target.value == '') {
            setTimeout(() => {
              zoomIco.style.display = 'block';
              delIco.style.display = 'none';
              self.filterText = '';
              self.filterTable();
            });
          } else {
            zoomIco.style.display = 'none';
            delIco.style.display = 'block';
            self.filterText = e.target.value;
            self.filterTable();
          }
        });

        $('.srch-del').on('click', function () {
          zoomIco.style.display = 'block';
          delIco.style.display = 'none';
          self.filterText = '';
          self.filterTable();
        })
      } else { // 익스가 아닌경우 검색창 처리
        var input = self.$refs.filterTextInput.$el.getElementsByTagName('input')[0];
        $(input).bind("keyup", function (e) {
          if (e.target.value == '') {
            setTimeout(() => {
              self.filterText = '';
              self.filterTable();
            }, 300);
          } else {
            self.filterText = e.target.value;
            self.filterTable();
          }
        });
      }

      self.$EventBus.$on('loadStockData', self.loadStockDataCallback);
      self.$EventBus.$on('resetLoadStockData', self.resetLoadStockDataCallback);
      // 모바일 거래소에서 공지사항보기 할때, 검색창 초기화
      self.$EventBus.$on('resetSearch', self.resetSearchCallback);
      // 이명철 2019-01-22 추가
      //  stockWatch의 미체결/체결/감시중/감시완료 의 row클릭시 해당 관심종목에서 클릭한 심볼 선택처리
      self.$EventBus.$on('stockWatchCellClick', self.stockWatchCellClickCallback);

      if (self.nameList.length > 0 && !self.dataLoaded) {
        self.$EventBus.$emit('loadStockData');
      }
    },
    beforeDestroy() {
      var self = this;
      self.$socket.unregisterReal('KVS0', self.beforeSymbols, self.name);
      self.$socket.unregisterReal('KVM2', self.beforeSymbols, self.name);

      self.$EventBus.$off('loadStockData', self.loadStockDataCallback);
      self.$EventBus.$off('resetLoadStockData', self.resetLoadStockDataCallback);
      self.$EventBus.$off('resetSearch', self.resetSearchCallback);
      self.$EventBus.$off('stockWatchCellClick', self.stockWatchCellClickCallback);
    },
  };
</script>
