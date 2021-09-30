<template>
  <div class="AssetProfit" v-if="assetProfitList">
    <el-row class="asset-profit-info">
      <el-col class="asset-profit-info-left">
        <el-row class="asset-profit-info-left-title">
          <el-col class="label">
            <span class="tag">
              {{$t('balances.a003')}}
              <!-- 총 자산 -->
            </span>
          </el-col>
          <el-col class="value">
            {{ formatAmount(tot.tot_asset) }}
            <span class="unit">KRW</span>
          </el-col>
        </el-row>
        <el-row class="total-asset">
          <el-col class="have-krw">
            <div class="label">
              {{$t('balances.a004')}}
              <!-- 보유 KRW -->
            </div>
            <div class="value" :class="{'fs15': formatAmount(tot.tot_evlt_amt).length > 19}">
              {{ formatAmount(tot.krw_remn_bal) }}
              <span class="unit">KRW</span>
            </div>
          </el-col>
          <el-col class="have-coin">
            <div class="label">
              {{$t('balances.a005')}}
              <!-- 보유 암호화폐 -->
            </div>
            <div class="value" :class="{'fs15': formatAmount(tot.tot_evlt_amt).length > 19}">
              {{ formatAmount(tot.tot_evlt_amt) }}
              <span class="unit">KRW</span>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="asset-profit-info-right">
        <el-row class="asset-table">
          <el-col>
            <div class="title">
              {{$t('balances.a008')}}
              <!-- 총 매수 -->
            </div>
            <div class="value" :class="{'fs15':formatAmount(tot.tot_buy_pamt).length > 13 }">
              <div class="value-wrap">
                {{ formatAmount(tot.tot_buy_pamt) }}
                <span class="unit">KRW</span>
              </div>
            </div>
          </el-col>
          <el-col>
            <div class="title">
              {{$t('balances.a009')}}
              <!-- 총 평가손익 -->
            </div>
            <div class="value" :class="{'fs15':formatAmount(tot.tot_evlt_pl).length > 13 }">
              <div class="value-wrap">
                <span :class="redOrBlue(tot.tot_evlt_pl)">{{ formatAmount(tot.tot_evlt_pl) }}</span>
                <span class="unit">KRW</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="asset-table">
          <el-col>
            <div class="title">
              {{$t('balances.a010')}}
              <!-- 총 평가 -->
            </div>
            <div class="value" :class="{'fs15':formatAmount(tot.tot_evlt_amt).length > 13 }">
              <div class="value-wrap">
                {{ formatAmount(tot.tot_evlt_amt) }}
                <span class="unit">KRW</span>
              </div>
            </div>
          </el-col>
          <el-col>
            <div class="title">
              {{$t('balances.a011')}}
              <!-- 총 수익률 -->
            </div>
            <div class="value">
              <div class="value-wrap">
                <span :class="redOrBlue(tot.tot_prft_rt)">{{ formatRate(tot.tot_prft_rt) }}</span>
                <span class="unit">%</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="asset-summary-title">
      <el-col class="help">
        {{$t('balances.a006')}}
        <!-- 유의사항 -->
        <el-popover placement="bottom-start" title width="500" trigger="hover">
          <div class="asset-info">
            <h2>{{ $t('balances.a021-0') }}</h2>
            <p>{{ $t('balances.a021-1') }}</p>
            <p>{{ $t('balances.a021-2') }}</p>

            <h2>{{ $t('balances.a021-3') }}</h2>
            <ul>
              <li class="dot">{{ $t('balances.a021-4') }}</li>
              <li class="dash">{{ $t('balances.a021-5') }}</li>
              <li class="dash">{{ $t('balances.a021-6') }}</li>
              <li class="dash">{{ $t('balances.a021-7') }}</li>
              <li class="dash">{{ $t('balances.a021-8') }}</li>
            </ul>
            <p class="caution">{{ $t('balances.a021-9') }}</p>
            <ul>
              <li class="dot">{{ $t('balances.a021-10') }}</li>
              <li class="dot">{{ $t('balances.a021-11') }}</li>
              <li class="dot">{{ $t('balances.a021-12') }}</li>
              <li class="dot">{{ $t('balances.a021-13') }}</li>
            </ul>
            <p>{{ $t('balances.a021-14') }}</p>
          </div>
          <el-button slot="reference" icon="el-icon-question" class="question"></el-button>
        </el-popover>
      </el-col>
      <el-col class="link">
        <el-button type="text" class="asset-profit-trade" @click="onHistoryClick()">
          {{$t('balances.a007')}}
          <!-- 거래내역 -->
          <i class="el-icon-arrow-right el-icon-right"></i>
        </el-button>
      </el-col>
    </el-row>

    <div class="el-table">
      <div class="el-table__header-wrapper">
        <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
          <colgroup>
            <col width="178">
            <col width="157">
            <col width="157">
            <col width="157">
            <col width="157">
            <col width="157">
            <col width="157">
          </colgroup>
          <thead>
            <tr>
              <th>
                <div class="cell">{{$t('balances.a012')}}</div>
              </th>
              <th>
                <div class="cell">{{$t('balances.a013')}}</div>
              </th>
              <th>
                <div class="cell">{{$t('balances.a014')}}</div>
              </th>
              <th class="is-sortable" @click="onSortClick('buy')">
                <!-- class추가 - 내림차순: descending, 오름차순: ascending -->
                <div class="cell" v-bind:class="curSortKey === 'buy' ? curSortDir : ''">
                  {{$t('balances.a015')}}
                  <span class="caret-wrapper">
                    <i class="sort-caret ascending"></i>
                    <i class="sort-caret descending"></i>
                  </span>
                </div>
              </th>
              <th>
                <div class="cell">{{$t('balances.a016')}}</div>
              </th>
              <th class="is-sortable" @click="onSortClick('evl')">
                <!-- class추가 - 내림차순: descending, 오름차순: ascending -->
                <div class="cell" v-bind:class="curSortKey === 'evl' ? curSortDir : ''">
                  {{$t('balances.a017')}}
                  <span class="caret-wrapper">
                    <i class="sort-caret ascending"></i>
                    <i class="sort-caret descending"></i>
                  </span>
                </div>
              </th>
              <th class="is-sortable" @click="onSortClick('prf')">
                <!-- class추가 - 내림차순: descending, 오름차순: ascending -->
                <div class="cell" v-bind:class="curSortKey === 'prf' ? curSortDir : ''">
                  {{$t('balances.a018')}}
                  <span class="caret-wrapper">
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

    <el-scrollbar>
      <el-table
        :data="sortedAssetProfitList"
        row-key="cur_cd"
        stripe
        @row-click="onRowClick"
        :show-header="false"
      >
        <template slot="empty">
          <p>
            {{$t('balances.a019')}}
            <!-- 보유한 자산이 없습니다. 자산을 입금하시겠습니까? -->
          </p>
          <el-button type="primary" plain @click="onWalletClick">
            {{$t('balances.a020')}}
            <!-- 입출금 -->
          </el-button>
        </template>
        <el-table-column prop="cur_cd" :label="$t('balances.a012')">
          <!-- 자산 -->
          <template slot-scope="scope">
            <el-row v-if="getCoinByCd(scope.row.cur_cd)">
              <el-col class="symbol-logo">
                <img :src="displayCoinImg(scope.row.cur_cd)">
              </el-col>
              <el-col class="symbol-text">
                <span v-if="$i18n.locale === 'en'">{{getCoinByCd(scope.row.cur_cd)['cur_eng_nm']}}</span>
                <span v-else>{{getCoinByCd(scope.row.cur_cd)['cur_kor_nm']}}</span>
                <br>
                <span class="unit">{{scope.row.cur_cd}}</span>
              </el-col>
            </el-row>
            <el-row v-else>
              <el-col class="symbol-text">{{scope.row.cur_cd}}</el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="remn_qty" :label="$t('balances.a013')" align="right" width="157">
          <!-- 보유수량 -->
          <template slot-scope="scope">
            <div :class="chkStrLength(formatCoin(scope.row.cur_cd, scope.row.remn_qty))">
              <span>{{ formatCoin(scope.row["cur_cd"], scope.row["remn_qty"]) }}</span>
              <span class="unit">{{ scope.row["cur_cd"] }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="buy_prc" :label="$t('balances.a014')" align="right" width="157">
          <!-- 평균매수가 -->
          <template slot-scope="scope">
            <div :class="chkStrLength(formatPrice('KRW', scope.row.buy_prc))">
              <span>{{ formatPrice('KRW', scope.row["buy_prc"]) }}</span>
              <span class="unit">KRW</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="buy_pamt" :label="$t('balances.a015')" align="right" width="157">
          <!-- 매수금액 -->
          <template slot-scope="scope">
            <div :class="chkStrLength(formatAmount(scope.row.buy_pamt))">
              <span>{{ formatAmount(scope.row["buy_pamt"]) }}</span>
              <span class="unit">KRW</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="sbst_base_prc"
          :label="$t('balances.a016')"
          align="right"
          width="157"
        >
          <!-- 현재가 -->
          <template slot-scope="scope">
            <div :class="chkStrLength(formatPrice('KRW', scope.row.sbst_base_prc))">
              <span>{{ formatPrice('KRW', scope.row["sbst_base_prc"]) }}</span>
              <span class="unit">KRW</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="evlt_amt" :label="$t('balances.a017')" align="right" width="157">
          <!-- 평가금액 -->
          <template slot-scope="scope">
            <div :class="chkStrLength(formatAmount(scope.row.evlt_amt))">
              <span>{{ formatAmount(scope.row["evlt_amt"]) }}</span>
              <span class="unit">KRW</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="prft_rt" :label="$t('balances.a018')" align="right" width="157">
          <!-- 수익률 -->
          <template slot-scope="scope">
            <div :class="chkStrLength2(formatAmount(scope.row.evlt_pl))">
              <span :class="redOrBlue(scope.row.prft_rt)">{{ formatAmount(scope.row["evlt_pl"]) }}</span>
              <span class="unit">KRW</span>
              <br>
              <span :class="redOrBlue(scope.row.prft_rt)">{{ formatRate(scope.row["prft_rt"]) }}</span>
              <span class="unit">%</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { _ } from "vue-underscore";

export default {
  name: "AssetProfit",
  data() {
    return {
      /**
       * @property {object} tot        총자산 데이터
       * @property {array}  mySymbols  보유자산 심볼 목록
       * @property {string} curSortDir 정렬 모드 null/'descending'/'ascending'
       * @property {string} curSortKey 정렬 키 null/'buy'/'evl'/'prf'
       */
      tot: {
        /**
         * @property {number} tot_buy_pamt 총 매수
         * @property {number} tot_evlt_amt 총 평가, 보유 암호화폐
         * @property {number} tot_evlt_pl  총 평가손익
         * @property {number} tot_prft_rt  총 수익률
         * @property {number} krw_remn_bal 보유 KRW
         * @property {number} tot_asset    총 자산
         */
        tot_buy_pamt: 0,
        tot_evlt_amt: 0,
        tot_evlt_pl: 0,
        tot_prft_rt: 0,
        krw_remn_bal: 0,
        tot_asset: 0
      },
      mySymbols: [],
      curSortDir: null,
      curSortKey: null,
      dataLoaded: false,
    };
  },
  computed: {
    /**
     * @vuex {getter} assetTotal      총 자산
     * @vuex {getter} assetProfitList 투자손익 리스트
     * @vuex {getter} getCoinByCd     통화의 통화정보
     * @vuex {getter} getPairBySymbol 심볼의 종목정보
     * @vuex {getter} getPairsByCd    통화코드가 대상통화인 종목정보목록
     * @vuex {getter} getPairsByCds   통화코드들이 대상통화인 종목정보목록
     * @vuex {getter} getMyCds        assetProfitList 의 통화코드 목록
     * @vuex {getter} hogaUnit        호가 단위
     * @vuex {getter} btcKRWCurPrc    BTC/KRW 현재가
     * @vuex {getter} ethKRWCurPrc    ETH/KRW 현재가
     */
    ...mapGetters([
      "assetTotal",
      "assetProfitList",
      "getCoinByCd",
      "getPairBySymbol",
      "getPairsByCd",
      "getPairsByCds",
      "getMyCds",
      "hogaUnit",
      "btcKRWCurPrc",
      "ethKRWCurPrc"
    ]),
    ...mapState({
      nameList: state => state.data['n1001'],
    }),
    /**
     * assetProfitList 를 정렬 옵션에 따라 정렬한 목록을 테이블에 바인딩
     * @returns {array}
     */
    sortedAssetProfitList() {
      let self = this;
      if (!self.curSortDir) {
        return self.assetProfitList;
      } else {
        return self.assetProfitList.slice().sort((a, b) => {
          let mod = self.curSortDir === "descending" ? -1 : 1;
          switch (self.curSortKey) {
            case "buy":
              return a.buy_pamt * 1 > b.buy_pamt * 1 ? 1 * mod : -1 * mod;
            case "evl":
              return a.evlt_amt * 1 > b.evlt_amt * 1 ? 1 * mod : -1 * mod;
            case "prf":
              return a.prft_rt * 1 > b.prft_rt * 1 ? 1 * mod : -1 * mod;
          }
        });
      }
    }
  },
  methods: {
    /**
     * @vuex {action} fetchAssetProfitData        투자손익 데이터 조회 (b0002)
     * @vuex {action} registerAssetNotification   잔고변동 실시간 등록 (RB02)
     * @vuex {action} unregisterAssetNotification 잔고변동 실시간 해제 (RB02)
     * @vuex {action} filterAssetProfitList       assetProfitList 에서 cur_cd 매칭 아이템 제거
     */
    ...mapActions([
      "fetchAssetProfitData",
      "registerAssetNotification",
      "unregisterAssetNotification",
      "filterAssetProfitList"
    ]),
    /**
     * +/- -> 빨강/파랑 css 클래스
     * @param {number} number
     * @returns {string} "red"/"blue"
     */
    redOrBlue(number) {
      if (number == 0) return "";
      return number > 0 ? "red" : "blue";
    },
    /**
     * 호가 단위 포맷
     * @param {string} cd 통화 코드
     * @param {number} prc 가격
     * @returns {string} 호가 단위 포맷 스트링
     */
    formatPrice(cd, prc) {
      let self = this;
      let nLenBelowDigitArray = [1];
      UnitManager.getHogaUnit(
        self.hogaUnit,
        cd,
        prc,
        undefined,
        undefined,
        nLenBelowDigitArray
      );
      return UnitManager.fixedDecimalWithCommas(prc, nLenBelowDigitArray[0]);
    },
    /**
     * 수익률 -> (+)00.00 포맷
     * @param {number} number
     * @returns {string} (+)00.00
     */
    formatRate(number) {
      let res = UnitManager.flooredDecimalWithCommas(number, 2);
      return number > 0 ? "+" + res : res;
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
     * 출력될 숫자 길이 대비 폰트 사이즈 조절
     * @param {string} number 포맷 스트링
     * @returns {string} css 클래스
     */
    chkStrLength(number) {
      const numLength = number.length;
      if (numLength > 14) {
        return "fs15";
      }
    },
    /**
     * 출력될 숫자 길이 대비 폰트 사이즈 조절
     * @param {string} number 포맷 스트링
     * @returns {string} css 클래스
     */
    chkStrLength2(number) {
      const numLength = number.length;
      if (numLength > 13) {
        return "fs15";
      }
    },
    /**
     * 매수금액, 평가금액, 수익률 헤더 클릭 (정렬) 이벤트
     * curSortDir, curSortKey 설정
     * @param {string} key 정렬 키 'buy'/'evl'/'prf'
     */
    onSortClick(key) {
      let self = this;
      if (!self.curSortDir || self.curSortKey !== key) {
        self.curSortDir = "descending";
        self.curSortKey = key;
        return;
      }
      self.curSortDir = self.curSortDir === "descending" ? "ascending" : null;
      self.curSortKey = self.curSortDir === null ? null : key;
    },
    /**
     * 거래내역 클릭 이벤트 - 거래내역 페이지로 이동
     */
    onHistoryClick() {
      this.$router.push({ name: "signHistory" });
    },
    /**
     * 보유한 자산이 없을 때 노출되는 입출금 버튼 클릭 이벤트 - 입출금 페이지로 이동
     */
    onWalletClick() {
      this.$router.push({ name: "depositWithdraw" });
    },
    /**
     * 목록 아이템 클릭 이벤트
     * KRW 마켓이 없는 통화에 대비하여 통화코드로 종목정보를 통해 최우선 마켓을 확인하고 targetSymbol 을 설정
     * 심볼과 마켓을 설정하고 거래소로 이동
     * @param {object} row
     * @param {object} event
     * @param {object} column
     */
    onRowClick(row, event, column) {
      const self = this;
      const symbols = self.getPairsByCd(row.cur_cd);
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
     * 잔고변동(RB02) 실시간 콜백
     * @param {object} res 잔고변동 데이터
     * KRW 는 보유 KRW (tot.krw_remn_bal) 업데이트
     * 목록에 존재하는 통화는 데이터를 찾아 보유수량, 평균매수가, 매수금액 업데이트하고 평가금액, 평가손익, 수익률은 계산하여 업데이트
     * 목록에 없는 통화일 경우에는 투자손익 데이터 재조회, KVM2 재설정
     */
    onAssetNotification(res) {
      const self = this;

      if (res.cur_cd === "KRW") {
        self.tot = Object.assign(self.tot, {
          krw_remn_bal: res.cur_bal * 1
        });
      } else {
        let changed = _.findWhere(self.assetProfitList, { cur_cd: res.cur_cd });
        let remn_qty = res.cur_bal * 1;

        if (changed) {
          if (remn_qty > 0) {
            let buy_pamt = res.buy_pamt * 1;
            let buy_prc = res.avg_buy_prc * 1;
            let evlt_amt = Math.floor(
              self.$big(remn_qty).times(changed.sbst_base_prc)
            );
            let evlt_pl = evlt_amt - buy_pamt;
            let prft_rt = ((evlt_pl / buy_pamt) * 100).toFixed(2);
            changed = Object.assign(changed, {
              remn_qty,
              buy_pamt,
              buy_prc,
              evlt_amt,
              evlt_pl,
              prft_rt
            });
          } else {
            self.filterAssetProfitList(res.cur_cd);
          }
        } else {
          self.fetchAssetProfitData({ fee_tp: "0" }).then(res => {
            self.$socket.unregisterReal(
              "KVM2",
              self.mySymbols,
              self.$options.name
            );
            self.tot = Object.assign(self.tot, self.assetTotal);
            let cds = self.getMyCds;
            self.mySymbols = self.getPairsByCds(cds).map(item => item.o_symbol);
            self.$socket.registerReal(
              "KVM2",
              "symbol",
              self.mySymbols,
              self.$options.name,
              self.onPriceChange
            );
          });
        }
      }
      self.reloadTotal();
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
     * KVM2 실시간 콜백
     * @param {object} queryData KVM2 데이터
     * 거래소 심볼 단위라서 통화코드를 뽑고 최우선 마켓을 확인
     * 목록에서 아이템을 찾아 현재가를 업데이트 하고 평가금액, 평가손익, 수익률은 계산하여 업데이트
     */
    onPriceChange(queryData) {
      const self = this;
      const data = queryData.getBlockData("OutBlock1")[0];
      const cd = self.getPairBySymbol(data.symbol).o_trgt_cur_cd_n;

      if (self.getMyCds.includes(cd)) {
        let sbst_base_prc = data.curprc * 1;
        const market = data.symbol.slice(-5).replace(/[_]/g, "");

        if (market === "BTC") {
          if (self.getPrimaryMarket(cd) !== market) return;
          sbst_base_prc = self.$big(sbst_base_prc).times(self.btcKRWCurPrc);
          sbst_base_prc = self.krPriceFormat(sbst_base_prc);
        } else if (market === "ETH") {
          if (self.getPrimaryMarket(cd) !== market) return;
          sbst_base_prc = self.$big(sbst_base_prc).times(self.ethKRWCurPrc);
          sbst_base_prc = self.krPriceFormat(sbst_base_prc);
        }

        let changed = _.findWhere(self.assetProfitList, { cur_cd: cd });
        let evlt_amt = Math.floor(self.$big(changed.remn_qty).times(sbst_base_prc));
        let evlt_pl = evlt_amt - changed.buy_pamt;
        let prft_rt = ((evlt_pl / changed.buy_pamt) * 100).toFixed(2);
        if (isNaN(prft_rt)) 
          prft_rt = 0;
        changed = Object.assign(changed, {
          sbst_base_prc,
          evlt_amt,
          evlt_pl,
          prft_rt
        });
        self.reloadTotal();
      }
    },
    /**
     * assetProfitList 데이터로 계산하여 총 자산 영역 데이터 업데이트
     */
    reloadTotal() {
      let self = this;
      let tot_evlt_amt = self.assetProfitList.map(item => item.evlt_amt * 1).reduce((a, b) => a + b);
      let tot_buy_pamt = self.assetProfitList.map(item => item.buy_pamt * 1).reduce((a, b) => a + b);
      let tot_evlt_pl = tot_evlt_amt - tot_buy_pamt;
      let tot_prft_rt = ((tot_evlt_pl / tot_buy_pamt) * 100).toFixed(2);
      let tot_asset = self.tot.krw_remn_bal + tot_evlt_amt;
      self.tot = Object.assign(self.tot, {
        tot_buy_pamt,
        tot_evlt_amt,
        tot_evlt_pl,
        tot_prft_rt,
        tot_asset
      });
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
      self.fetchAssetProfitData({ fee_tp: "0" }).then(res => {
        self.tot = Object.assign(self.tot, self.assetTotal);
        let cds = self.getMyCds;
        self.mySymbols = self.getPairsByCds(cds).map(item => item.o_symbol);
        self.$socket.registerReal(
          "KVM2",
          "symbol",
          self.mySymbols,
          self.$options.name,
          self.onPriceChange
        );
      });
      self.registerAssetNotification({
        vue_name: self.$options.name,
        callback: self.onAssetNotification
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
  mounted() {
    let self = this;

    self.$EventBus.$on('loadStockData', self.loadStockDataCallback);
    self.$EventBus.$on('resetLoadStockData', self.resetLoadStockDataCallback);      

    if(self.nameList.length > 0 && !self.dataLoaded){
      self.$EventBus.$emit('loadStockData');
    }
  },
  created() {
    let self = this;
    self.$EventBus.$emit("pc-navi", [
      { label: self.$t("balances.a001"), target: "assetProfit" },
      { label: self.$t("balances.a002"), target: null }
    ]);

    this.$EventBus.$on("langChange", () => {
      self.$EventBus.$emit("pc-navi", [
        { label: self.$t("balances.a001"), target: "assetProfit" },
        { label: self.$t("balances.a002"), target: null }
      ]);
    });
  },
  beforeDestroy() {
    let self = this;
    self.unregisterAssetNotification({ vue_name: self.$options.name });
    self.$socket.unregisterReal("KVM2", self.mySymbols, self.$options.name);

    self.$EventBus.$off('loadStockData', self.loadStockDataCallback);
    self.$EventBus.$off('resetLoadStockData', self.resetLoadStockDataCallback);
  }
};
</script>