<template>
  <div class="AssetStatus" v-if="assetStatusList">
    <el-row class="asset-profit-info">
      <el-col class="asset-profit-info-left">
        <el-row class="asset-profit-info-left-title">
          <el-col class="label">
            <span class="tag">
              {{$t('balances.b002')}}
              <!-- 총 자산 -->
            </span>
          </el-col>
          <el-col class="value status">
            <div>
              {{ formatAmount(asset.krw + asset.coin) }}
              <span class="unit">KRW</span>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="asset-profit-info-right">
        <el-row class="asset-table">
          <el-col>
            <div class="label">
              {{$t('balances.b003')}}
              <!-- 보유 KRW -->
            </div>
            <div class="value">
              {{ formatAmount(asset.krw) }}
              <span class="unit">KRW</span>
            </div>
          </el-col>
          <el-col>
            <div class="label">
              {{$t('balances.b004')}}
              <!-- 보유 암호화폐 -->
            </div>
            <div class="value" :class="{'fs15': formatAmount(asset.coin).length > 14}">
              {{ formatAmount(asset.coin) }}
              <span class="unit">KRW</span>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="asset-summary-title">
      <el-col class="help nopad">
        <el-input
          v-if="!isIE"
          clearable
          :placeholder="$t('balances.b005')"
          suffix-icon="el-icon-search"
          v-model="filterText"
          @keyup.native="filterTable"
          @clear="filterTable"
        ></el-input>
        <div v-if="isIE" class="srch-box">
          <input type="text" id="srchBoxIE" :placeholder="$t('balances.b005')" v-model="filterText">
          <span class="srch-icon"></span>
          <span class="srch-del" style="display:none;"></span>
        </div>
        <!-- 암호화폐 검색(한글/영문) -->
        <el-checkbox
          v-model="holdingOnly"
          @change="onHoldingOnlyChange"
          class="asset-status-check-holding-only"
        >
          {{$t('balances.b006')}}
          <!-- 보유자산만 -->
        </el-checkbox>
        <el-popover placement="bottom-start" title width="500" trigger="hover">
          <h2>{{$t('balances.b015-0')}}</h2>
          <p>{{$t('balances.b015-1')}}</p>
          <h2>{{$t('balances.b015-2')}}</h2>
          <ul>
            <li class="dot">{{$t('balances.b015-3')}}</li>
            <li class="dot">{{$t('balances.b015-4')}}</li>
            <li class="dash">{{$t('balances.b015-5')}}</li>
            <li class="dash">{{$t('balances.b015-6')}}</li>
            <li class="dot">{{$t('balances.b015-7')}}</li>
            <li class="dot">{{$t('balances.b015-8')}}</li>
            <li class="dot">{{$t('balances.b015-9')}}</li>
          </ul>
          <el-button slot="reference" icon="el-icon-question" class="question"></el-button>
        </el-popover>
      </el-col>
      <el-col class="link">
        <el-button type="text" class="asset-profit-trade" @click="onHistoryClick()">
          {{$t('balances.b007')}}
          <!-- 거래내역 -->
          <i class="el-icon-arrow-right el-icon-right"></i>
        </el-button>
      </el-col>
    </el-row>

    <div class="el-table el-table--striped el-table--enable-row-hover">
      <!-- table header -->
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header">
          <colgroup>
            <col>
            <col width="190">
            <col width="190">
            <col width="190">
            <col width="190">
            <col width="170">
          </colgroup>
          <thead>
            <tr>
              <th>
                <div class="cell">
                  {{$t('balances.b008')}}
                  <!-- 자산 -->
                </div>
              </th>
              <th class="is-sortable" @click="onSortClick()">
                <div class="cell" v-bind:class="curSortDir">
                  {{$t('balances.b009')}}
                  <!-- 총 수량 -->
                  <span class="caret-wrapper">
                    <i class="sort-caret ascending"></i>
                    <i class="sort-caret descending"></i>
                  </span>
                </div>
              </th>
              <th>
                <div class="cell">
                  {{$t('balances.b010')}}
                  <!-- 주문가능 -->
                </div>
              </th>
              <th>
                <div class="cell">
                  {{$t('balances.b011')}}
                  <!-- 미체결 -->
                </div>
              </th>
              <th>
                <div class="cell">
                  {{$t('balances.b012')}}
                  <!-- 출금대기 -->
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
        </table>
      </div>

      <!-- table body -->
      <el-scrollbar :class="{'is-scroll': assetStatusListWithoutKRW.length > 15}">
        <div class="el-table__body-wrapper">
          <table ref="tableRef" cellpadding="0" cellspacing="0" border="0" class="el-table__body">
            <colgroup>
              <col>
              <col width="190">
              <col width="190">
              <col width="190">
              <col width="190">
              <col width="170">
            </colgroup>
            <tbody>
              <!-- 원화 -->
              <tr v-for="item in krwFromAssetStatusList" :key="item.cur_cd">
                <td>
                  <div class="cell">
                    <div class="el-row">
                      <div class="symbol-logo el-col el-col-24">
                        <img :src="require('@/images/m_krw_logo.png')">
                      </div>
                      <div class="symbol-text el-col el-col-24">
                        <span
                          v-if="$i18n.locale === 'en'"
                        >{{getCoinByCd(item.cur_cd)['cur_eng_nm']}}</span>
                        <span v-else>{{getCoinByCd(item.cur_cd)['cur_kor_nm']}}</span>
                        <br>
                        <span class="unit">{{item.cur_cd}}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="is-right">
                  <div class="cell">{{ formatAmount(item["gen_bal"]) }}</div>
                </td>
                <td class="is-right">
                  <div class="cell">{{ formatAmount(item["gen_able"]) }}</div>
                </td>
                <td class="is-right">
                  <div class="cell">{{ formatAmount(item["ncnt_amt"]) }}</div>
                </td>
                <td class="is-right">
                  <div class="cell">{{ formatAmount(item["widr_req_amt"]) }}</div>
                </td>
                <td class="is-center">
                  <div class="cell">
                    <button
                      @click="onWalletClick(item)"
                      type="button"
                      class="el-button btn-deposit el-button--primary is-plain"
                    >
                      <span>
                        {{$t('balances.b013')}}
                        <!-- 입출금 -->
                      </span>
                    </button>
                  </div>
                </td>
              </tr>

              <!-- list looping start -->
              <tr v-for="item in assetStatusListWithoutKRW" :key="item.cur_cd">
                <td>
                  <div class="cell">
                    <el-row>
                      <el-col class="symbol-logo">
                        <img :src="displayCoinImg(item.cur_cd)">
                      </el-col>
                      <el-col class="symbol-text">
                        <span
                          v-if="$i18n.locale === 'en'"
                        >{{getCoinByCd(item.cur_cd)['cur_eng_nm']}}</span>
                        <span v-else>{{getCoinByCd(item.cur_cd)['cur_kor_nm']}}</span>
                        <br>
                        <span class="unit">{{item.cur_cd}}</span>
                      </el-col>
                    </el-row>
                  </div>
                </td>
                <td class="is-right">
                  <div class="cell">
                    <p>{{ formatCoin(item["cur_cd"], item["gen_bal"]) }}</p>
                    <p
                      v-if="item.cur_cd !== 'KRW' && item.gen_bal > 0"
                      class="unit"
                    >≈{{ formatAmount(item["eval_amt"]) }} KRW</p>
                  </div>
                </td>
                <td class="is-right">
                  <div class="cell">{{ formatCoin(item["cur_cd"], item["gen_able"]) }}</div>
                </td>
                <td class="is-right">
                  <div class="cell">{{ formatCoin(item["cur_cd"], item["ncnt_amt"]) }}</div>
                </td>
                <td class="is-right">
                  <div class="cell">{{ formatCoin(item["cur_cd"], item["widr_req_amt"]) }}</div>
                </td>
                <td class="is-center">
                  <div class="cell">
                    <el-button
                      class="btn-deposit"
                      @click="onWalletClick(item)"
                      type="primary"
                      plain
                    >
                      {{$t('balances.b013')}}
                      <!-- 입출금 -->
                    </el-button>
                    <el-button class="btn-order" @click="onOrderClick(item)" type="danger" plain>
                      {{$t('balances.b014')}}
                      <!-- 주문 -->
                    </el-button>
                  </div>
                </td>
              </tr>
              <!-- list looping end -->
            </tbody>
          </table>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { _ } from "vue-underscore";
import { debug } from "util";

export default {
  name: "AssetStatus",
  data() {
    return {
      /**
       * @property {array}   beforeSymbols   보유자산 심볼 목록
       * @property {object}  asset       총자산 데이터
       * @property {string}  filterText  검색 인풋 값
       * @property {boolean} holdingOnly 보유자산만 체크박스 값
       * @property {string}  curSortDir  정렬 모드 null/'descending'/'ascending'
       */
      beforeSymbols: [],
      asset: {
        krw: 0,
        coin: 0
      },
      filterText: "",
      holdingOnly: true,
      curSortDir: null, // 'descending', 'ascending', null
      dataLoaded: false,
    };
  },
  computed: {
    /**
     * @vuex {getter} hogaUnit        호가 단위
     * @vuex {getter} assetStatusList 자산현황 리스트
     * @vuex {getter} getCoinByCd     통화의 통화정보
     * @vuex {getter} getPairBySymbol 심볼의 종목정보
     * @vuex {getter} getStatusCds    assetStatusList 의 통화코드 목록
     * @vuex {getter} getPairsByCd    통화코드가 대상통화인 종목정보목록
     * @vuex {getter} getPairsByCds   통화코드들이 대상통화인 종목정보목록
     * @vuex {getter} btcKRWCurPrc    BTC/KRW 현재가
     * @vuex {getter} ethKRWCurPrc    ETH/KRW 현재가
     */
    ...mapGetters([
      "hogaUnit",
      "assetStatusList",
      "getCoinByCd",
      "getPairBySymbol",
      "getStatusCds",
      "getPairsByCd",
      "getPairsByCds",
      "btcKRWCurPrc",
      "ethKRWCurPrc"
    ]),
    ...mapState({
      nameList: state => state.data['n1001'],
    }),
    /**
     * assetProfitList 를 KRW 를 제외시키고 정렬 옵션에 따라 정렬한 목록을 테이블에 바인딩
     * @returns {array}
     */
    assetStatusListWithoutKRW() {
      let self = this;

      if (!self.curSortDir) {
        return self.assetStatusList.filter(item => {
          return item.cur_cd !== "KRW";
        });
      } else {
        return self.assetStatusList
          .filter(item => {
            return item.cur_cd !== "KRW";
          })
          .sort((a, b) => {
            let mod = self.curSortDir === "descending" ? -1 : 1;
            return a["eval_amt"] * 1 > b["eval_amt"] * 1 ? 1 * mod : -1 * mod;
          });
      }
    },
    /**
     * assetProfitList 를 KRW 만 남기고 KRW 테이블에 바인딩
     * @returns {array}
     */
    krwFromAssetStatusList() {
      let self = this;
      return self.assetStatusList.filter(item => {
        return item.cur_cd === "KRW";
      });
    },
    /**
     * 총 자산 - 보유 KRW
     * @returns {number} KRW 총 수량
     */
    assetKRW() {
      let self = this;
      if(self.krwFromAssetStatusList.length < 1) return 0;
      return self.krwFromAssetStatusList[0].gen_bal * 1;
    },
    /**
     * 총 자산 - 보유 암호화폐
     * @returns {number} 암호화폐 평가금액 합계
     */
    assetCoin() {
      let self = this;
      if (self.assetStatusListWithoutKRW.length < 1) return 0;
      return self.assetStatusListWithoutKRW
        .map(item => item.eval_amt * 1)
        .reduce((a, b) => a + b);
    },
    /**
     * IE 체크
     * @returns {boolean}
     */
    isIE() {
      return afc.isIE;
    }
  },
  methods: {
    /**
     * @vuex {action} fetchAssetStatusData        자산현황 데이터 조회 (ac529)
     * @vuex {action} registerOrderNotification   주문체결 실시간 등록 (RB03)
     * @vuex {action} unregisterOrderNotification 주문체결 실시간 해제 (RB03)
     */
    ...mapActions([
      "fetchAssetStatusData",
      "registerOrderNotification",
      "unregisterOrderNotification"
    ]),
    /**
     * 금액 포맷
     * 소수점 절사, 콤마 포맷
     * @param {number} number 금액
     * @returns {string} 포맷 스트링
     */
    formatAmount(number) {
      let self = this;
      return UnitManager.flooredDecimalWithCommas(number, 0);
    },
    /**
     * 코인 수량 포맷
     * getCoinByCd 통화정보의 소수점자릿수 기준 소수점 고정, 콤마 포맷
     * @param {string} cd 통화코드
     * @param {number} number 수량
     * @returns {string} 포맷 스트링
     */
    formatCoin(cd, number) {
      let self = this;
      let dd = 8;
      if (self.getCoinByCd(cd).dec_digt) {
        dd = self.getCoinByCd(cd).dec_digt;
      }
      return UnitManager.numberWithCommas(NumberUtil.Floor( '', '', number, dd));
    },
    /**
     * 테이블 검색 - 검색 인풋의 keyup 에 바인딩
     * row 의 cur_cd 로 가져온 통화정보의 (통화코드 + 한글이름 + 영어이름)이 검색어와 매칭되는 row 만 표시
     */
    filterTable() {
      let self = this;
      const rows = this.$refs.tableRef.getElementsByTagName("tr");
      for (let row of rows) {
        let cd = row.getElementsByClassName("unit")[0].innerText;
        let coin = self.getCoinByCd(cd);
        let text = (
          cd +
          " " +
          coin.cur_kor_nm +
          " " +
          coin.cur_eng_nm
        ).toLowerCase();
        let filterText = self.filterText.toLowerCase();
        row.style.display = text.indexOf(filterText) > -1 ? "" : "none";
      }
    },
    /**
     * 총수량 헤더 클릭 (정렬) 이벤트
     */
    onSortClick() {
      let self = this;
      if (!self.curSortDir) {
        self.curSortDir = "descending";
      } else {
        self.curSortDir = self.curSortDir === "descending" ? "ascending" : null;
      }
    },
    /**
     * 보유자산만 체크 변경 이벤트
     * 보유자산만 값에 따라 자산현황 데이터 재조회
     */
    onHoldingOnlyChange(event) {
      let self = this;
      self.fetchAssetStatusData(event).then(obj => {
        self.reloadTotal();
        let cds = self.getStatusCds;
        var mySymbols = self.getPairsByCds(cds).map(item => item.o_symbol);
        if (self.beforeSymbols.length > 0) {
          self.$socket.unregisterReal("KVM2", self.beforeSymbols, self.$options.name);
        }
        self.$socket.registerReal("KVM2", "symbol", mySymbols, self.$options.name, self.onPriceChange);
        self.beforeSymbols = mySymbols;
        self.filterTable();
      });
    },
    /**
     * 목록 아이템 주문 버튼 클릭 이벤트
     * KRW 마켓이 없는 통화에 대비하여 통화코드로 종목정보를 통해 최우선 마켓을 확인하고 targetSymbol 을 설정
     * 심볼과 마켓을 설정하고 거래소로 이동
     * @param {object} row
     */
    onOrderClick(row) {
      let self = this;
      let symbols = self.getPairsByCd(row.cur_cd);
      const market = self.getPrimaryMarket(row.cur_cd);
      const targetSymbol = _.findWhere(symbols, { o_setl_cur_cd_n: market })
        .o_symbol;

      if (targetSymbol) {
        self.$store.commit("setCurrentSymbol", targetSymbol);
        sessionStorage.setItem("currentSymbol", targetSymbol);
        sessionStorage.setItem("selectedMarket", market);
      }
      self.$router.push({ name: "exchange" });
    },
    /**
     * 통화 최우선 마켓
     * @param {string} cd 통화코드
     * @returns {string} 마켓코드
     */
    getPrimaryMarket(cd) {
      const self = this;
      let markets = self.getPairsByCd(cd).map(item => item.o_setl_cur_cd_n);
      if (markets.includes("KRW")) {
        return "KRW";
      } else if (markets.includes("BTC")) {
        return "BTC";
      } else {
        return "ETH";
      }
    },
    /**
     * 목록 아이템 입출금 버튼 클릭 이벤트
     * 통화코드 설정하고 입출금 페이지로 이동
     * @param {object} row
     */
    onWalletClick(row) {
      let self = this;
      self.$store.commit("setCurrentCurCd", row.cur_cd);
      self.$router.push({ name: "depositWithdraw" });
    },
    /**
     * 거래내역 클릭 이벤트 - 거래내역 페이지로 이동
     */
    onHistoryClick() {
      this.$router.push({ name: "signHistory" });
    },
    /**
     * 주문체결(RB03) 실시간 콜백
     * 자산현황 데이터 재조회 하고 총 자산 업데이트
     * @param {object} res 주문체결 데이터
     */
    onOrderNotification(res) {
      const self = this;
      self.fetchAssetStatusData(self.holdingOnly).then(res => {
        self.reloadTotal();
        let cds = self.getStatusCds;
        var mySymbols = self.getPairsByCds(cds).map(item => item.o_symbol);
        if (self.beforeSymbols.length > 0) {
          self.$socket.unregisterReal("KVM2", self.beforeSymbols, self.$options.name);
        }
        self.$socket.registerReal("KVM2", "symbol", mySymbols, self.$options.name, self.onPriceChange);
        self.beforeSymbols = mySymbols;
        self.filterTable();
      });
    },
    /**
     * KVM2 실시간 콜백
     * @param {object} queryData KVM2 데이터
     * 거래소 심볼 단위라서 통화코드를 뽑고 최우선 마켓을 확인
     * 실시간 현재가와 총 수량으로 계산하여 평가금액을 업데이트하고 총 자산 업데이트
     */
    onPriceChange(queryData) {
      const self = this;
      const data = queryData.getBlockData("OutBlock1")[0];
      const cd = self.getPairBySymbol(data["symbol"]).o_trgt_cur_cd_n;

      if (self.getStatusCds.includes(cd)) {
        let price = data.curprc * 1;
        const market = data.symbol.slice(-5).replace(/[_]/g, "");

        if (market === "BTC") {
          if (self.getPrimaryMarket(cd) !== market) return;
          price = self.$big(price).times(self.btcKRWCurPrc);
          price = self.krPriceFormat(price);
        } else if (market === "ETH") {
          if (self.getPrimaryMarket(cd) !== market) return;
          price = self.$big(price).times(self.ethKRWCurPrc);
          price = self.krPriceFormat(price);
        }

        let changed = _.findWhere(self.assetStatusListWithoutKRW, {
          cur_cd: cd
        });
        changed = Object.assign(changed, {
          eval_amt: Math.floor(self.$big(changed.gen_bal).times(price))
        });
        self.reloadTotal();
      }
    },
    /**
     * 총 자산 업데이트
     */
    reloadTotal() {
      let self = this;
      self.asset = {
        krw: self.assetKRW,
        coin: self.assetCoin
      };
    },
    /**
     * 코인 이미지 표시
     * @param {string} symbol 통화코드
     */
    displayCoinImg(symbol) {
      let coin = symbol.toLowerCase();
      let coinData = this.$store.state.data.coinImage;
      let coinURLArray = Object.values(coinData);
      let coinArrIdx = Object.keys(coinData).indexOf(coin);
      if (coinArrIdx < 0) {
        return require("@/images/coin/default.png");
      } else {
        return coinURLArray[coinArrIdx];
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
    getData(){  // 데이터 요청
      var self = this;
      self.fetchAssetStatusData(self.holdingOnly).then(res => {
        self.reloadTotal();
        let cds = self.getStatusCds;
        var mySymbols = self.getPairsByCds(cds).map(item => item.o_symbol);
        if (self.beforeSymbols.length > 0) {
          self.$socket.unregisterReal("KVM2", self.beforeSymbols, self.$options.name);
        }
        self.$socket.registerReal("KVM2", "symbol", mySymbols, self.$options.name, self.onPriceChange);
        self.beforeSymbols = mySymbols;
        self.filterTable();
      });
      self.registerOrderNotification({
        vue_name: self.$options.name,
        callback: self.onOrderNotification
      });
    },
    // dataLoaded 값이 false일 경우 데이터 요청 처리
    // 동시 dataLoaded를 true로 변경하여 중복 요청 방지
    loadStockDataCallback(){  // loadStockData 이벤트 콜백 함수
      var self = this;
      if(self.dataLoaded) return;
      self.dataLoaded = true;        
      self.getData();
    },
    // 신규상장, 소켓재접속등 데이터 재조회 필요시 받는 event 
    // resetLoadStockData 이벤트가 먼저 실행되어 dataLoaded 값이 false로 변경
    // 재조회 가능 상태로 처리
    resetLoadStockDataCallback(){ // resetLoadStockData 이벤트 콜백 함수
      var self = this;
      self.dataLoaded = false;
    },
  },
  created() {
    var self = this;
    self.$EventBus.$emit("pc-navi", [
      { label: self.$t("balances.a001"), target: "assetProfit" },
      { label: self.$t("balances.b001"), target: null }
    ]);

    self.$EventBus.$on("langChange", () => {
      self.$EventBus.$emit("pc-navi", [
        { label: self.$t("balances.a001"), target: "assetProfit" },
        { label: self.$t("balances.b001"), target: null }
      ]);
    });
  },
  mounted() {
    let self = this;
    /* IE일 때 암호화폐 검색 */
    let zoomIco = document.getElementsByClassName("srch-icon")[0];
    let delIco = document.getElementsByClassName("srch-del")[0];
    if (afc.isIE) {
      $("#srchBoxIE").bind("keyup", function(e) {
        if (e.target.value == "") {
          setTimeout(() => {
            zoomIco.style.display = "block";
            delIco.style.display = "none";
            self.filterText = "";
            self.filterTable();
          });
        } else {
          zoomIco.style.display = "none";
          delIco.style.display = "block";
          self.filterText = e.target.value;
          self.filterTable();
        }
      });

      $(".srch-del").on("click", function() {
        zoomIco.style.display = "block";
        delIco.style.display = "none";
        self.filterText = "";
        self.filterTable();
      });
    }

    self.$EventBus.$on('loadStockData', self.loadStockDataCallback);
    self.$EventBus.$on('resetLoadStockData', self.resetLoadStockDataCallback);      
    if (self.nameList.length > 0 && !self.dataLoaded) {
      self.$EventBus.$emit('loadStockData');
    }
  },
  beforeDestroy() {
    let self = this;
    self.unregisterOrderNotification({ vue_name: self.$options.name });
    self.$socket.unregisterReal("KVM2", self.beforeSymbols, self.$options.name);

    self.$EventBus.$off('loadStockData', self.loadStockDataCallback);
    self.$EventBus.$off('resetLoadStockData', self.resetLoadStockDataCallback);
  }
};
</script>