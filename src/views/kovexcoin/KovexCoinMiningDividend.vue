<template>
  <el-container class="KovexCoinMiningDividend">
    <div class="contents">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('mining.a004')" name="mining" class="mining-tab">
          <el-row class="timer-info">
            <el-col :span="12">
              {{$i18n.locale == 'en' ? coinMining['cur_cd'] : ''}}{{ $t('mining.a005')}}
              <!-- 트레이드 마이닝은 하루 단위로 채굴을 진행합니다. (00:00 am ~ 23:59 pm) -->
              <br>
              {{$t('mining.a006', [coinMining['cur_cd']]) }}
              <!-- 회원은 거래수익에 기여한 만큼의 {{coinMining['cur_cd']}}을 채굴하게 됩니다 -->
            </el-col>
            <el-col :span="12" class="time-board">
              {{$t('mining.a007')}}
              <!-- 트레이드 마이닝 종료까지 -->
              <span class="timer">{{miningTime | miningTimeFormat(this)}}</span>
            </el-col>
          </el-row>
          <div class="graph-wrap">
            <div class="graph-info">
              <h2>
                {{$t('mining.a009')}}
                <!-- 마이닝 비율 -->
              </h2>
              {{$t('mining.a010', [ coinMining['cur_cd']] ) }}
              <!-- ※ 배당 비율은 거래금액 100,000 KRW 당 {{coinMining['cur_cd']}}로 표시됩니다. -->
            </div>
            <div class="graph">
              <!-- <div class="yesterday" v-bind:style="mining.yesterdayGraphStyle">
                                <div class="tooltip">{{mining.yesterdayGraphRate}} CTC</div>
                                <div class="title">전일({{yesterday}})</div>
                            </div>
                            <div class="today" v-bind:style="mining.todayGraphStyle">
                                <div class="tooltip">{{mining.todayGraphRate}} CTC</div>
                                <div class="title">당일({{today}})</div>
                            </div>
              <div class="underline"></div>-->
              <MiningGraph :data="miningChartData"></MiningGraph>
            </div>
          </div>
          <el-row>
            <el-col class="table-wrap">
              <div class="table-title">{{yesterday()}}</div>
              <el-row>
                <el-col class="label">
                  {{$t('mining.a013')}}
                  <!-- 채굴량 -->
                </el-col>
                <el-col
                  class="value"
                >{{currencyFormat(coinMining['bf_proc_qty'], 0, true)}} {{coinMining['cur_cd']}}</el-col>
              </el-row>
              <el-row>
                <el-col class="label">
                  {{$t('mining.a014')}}
                  <!-- 거래금액 -->
                </el-col>
                <el-col class="value">{{currencyFormat(coinMining['bf_trd_amt'], 0, true)}} KRW</el-col>
              </el-row>
              <el-row>
                <el-col class="label">
                  {{$t('mining.a015')}}
                  <!-- 마이닝 비율 -->
                </el-col>
                <el-col
                  class="value"
                >100,000 KRW &nbsp;&nbsp; : &nbsp;&nbsp; {{currencyFormat(coinMining['bf_minn_rt'], 2, true)}} {{coinMining['cur_cd']}}</el-col>
              </el-row>
            </el-col>
            <el-col class="table-wrap today">
              <div class="table-title">{{today()}}</div>
              <el-row>
                <el-col class="label">
                  {{$t('mining.a013')}}
                  <!-- 채굴량 -->
                </el-col>
                <el-col
                  class="value"
                >{{currencyFormat(coinMining['to_proc_qty'], 0, true)}} {{coinMining['cur_cd']}}</el-col>
              </el-row>
              <el-row>
                <el-col class="label">
                  {{$t('mining.a014')}}
                  <!-- 거래금액 -->
                </el-col>
                <el-col class="value">{{currencyFormat(coinMining['to_trd_amt'], 0, true)}} KRW</el-col>
              </el-row>
              <el-row>
                <el-col class="label">
                  {{$t('mining.a016')}}
                  <!-- 마이닝 비율 -->
                </el-col>
                <el-col
                  class="value"
                >100,000 KRW &nbsp;&nbsp; : &nbsp;&nbsp; {{currencyFormat(coinMining['to_minn_rt'], 2, true)}} {{coinMining['cur_cd']}}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="table-info">
            {{$t('mining.a017')}}
            <!-- ※ 누적 거래금액은 매 시 59:59초에 누적됩니다. -->
            <br>
            {{$t('mining.a018')}}
            <!-- ※ 거래금액은 매 시 원화 환산 금액을 기준으로 합니다. -->
          </div>
          <div class="asset-board">
            <el-popover placement="bottom-end" width="460" trigger="hover">
              <h3>
                {{$t('mining.a027')}}
                <!--&lt; 유의사항&gt; -->
              </h3>
              <p>
                {{$t('mining.a028')}}
                <!-- 나의 예상 채굴량은 매 시, 거래금액에 따라 환산한 데이터로 실제 채굴량과 다를 수 있습니다. -->
              </p>
              <h3>
                {{$t('mining.a029')}}
                <!--&lt; 계산방식 &gt;-->
              </h3>
              <p>
                {{$t('mining.a030')}}
                <!-- 나의 예상 채굴량 = (회원별 누적 거래금액/전체 누적 거래금액) x 당일 채굴량 -->
              </p>
              <el-button slot="reference" icon="el-icon-question" class="question"></el-button>
            </el-popover>

            <div class="login" v-if="!isLoggedIn">
              <span>
                {{$t('mining.a026')}}
                <!-- 로그인 후 확인 가능합니다. -->
              </span>
            </div>

            <el-row>
              <el-col>
                <span class="title">
                  {{$t('mining.a019')}}
                  <!-- 나의 거래금액 -->
                  :
                </span>
                &nbsp;&nbsp;
                {{currencyFormat(coinMining['trd_amt'], 0, true)}}
                <span
                  class="unit"
                >KRW</span>
              </el-col>
              <el-col>
                <span class="title">
                  {{$t('mining.a020')}}
                  <!-- 나의 예상 채굴량 -->
                </span>
                &nbsp;&nbsp;
                {{priceFormat(coinMining['cur_cd'], coinMining['pdt_minn'])}}
                <span
                  class="unit"
                >{{coinMining['cur_cd']}}</span>
              </el-col>
            </el-row>
          </div>

          <div class="table-title">
            {{$t('mining.a021')}}
            <!-- 나의 마이닝 내역 -->
          </div>
          <div class="el-table">
            <div class="el-table__header-wrapper">
              <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
                <colgroup>
                  <col width="200">
                  <col>
                  <col width="300">
                  <col width="300">
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <div class="cell">
                        {{$t('mining.a022')}}
                        <!-- 일시 -->
                      </div>
                    </th>
                    <th>
                      <div class="cell">
                        {{$t('mining.a023')}}
                        <!-- 마이닝 비율 -->
                      </div>
                    </th>
                    <th>
                      <div class="cell">
                        {{$t('mining.a024')}}
                        <!-- 채굴량 -->
                      </div>
                    </th>
                    <th>
                      <div class="cell">
                        {{$t('mining.a025')}}
                        <!-- 누적 채굴량 -->
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <el-scrollbar :class="coinMiningList.length > 10 ? 'scroll' : ''">
            <div class="login" v-if="!isLoggedIn">
              <span>
                {{$t('mining.a026')}}
                <!-- 로그인 후 확인 가능합니다. -->
              </span>
            </div>

            <el-table :data="coinMiningList" :show-header="false" stripe>
              <infinite-loading
                :identifier="miningInfiniteId"
                slot="append"
                @infinite="miningInfinite"
                force-use-infinite-wrapper=".el-scrollbar__wrap"
              ></infinite-loading>
              <el-table-column prop="base_dtm" label="일시" width="200" align="center">
                <template slot-scope="scope">{{formatData(scope.row.base_dtm)}}</template>
              </el-table-column>
              <el-table-column label="마이닝 비율" align="right">
                <template slot-scope="scope">
                  <span>100,000 KRW : {{currencyFormat(scope.row.minn_rt, 2, true)}} {{coinMining['cur_cd']}}</span>
                </template>
              </el-table-column>
              <el-table-column label="채굴량" width="300" align="right">
                <template slot-scope="scope">
                  <span>{{priceFormat(coinMining['cur_cd'], scope.row.minn_qty)}} {{coinMining['cur_cd']}}</span>
                </template>
              </el-table-column>
              <el-table-column label="누적 최굴량" width="300" align="right">
                <template slot-scope="scope">
                  <span>{{priceFormat(coinMining['cur_cd'], scope.row.tot_minn_qty)}} {{coinMining['cur_cd']}}</span>
                </template>
              </el-table-column>
            </el-table>
            <!-- <el-pagination layout="prev, pager, next" :total="1000" align="center"> </el-pagination> -->
          </el-scrollbar>
        </el-tab-pane>

        <el-tab-pane :label="$t('mining.b001')" name="dividend" class="dividend-tab">
          <!-- 배당 -->
          <el-row class="timer-info">
            <el-col :span="14">
              {{$t('mining.b002', [dividend.dvd_rt])}}
              <!-- 거래소의 모든 회원은 일 수수료 수익의 {{dividend.dvd_rt}}%를 배당 받게 됩니다. (소정의 운영비 제외) -->
              <br>
              {{$t('mining.b003')}}
              <!-- ※ 배당 잔고 스냅샷은 매 시, 1일 24회 진행됩니다. -->
            </el-col>
            <el-col :span="10" class="time-board">
              {{$t('mining.b004')}}
              <!-- 배당 잔고 스냅샷까지 -->
              <span class="timer">{{miningTime | dividendTimeFormat(this)}}</span>
            </el-col>
          </el-row>

          <div class="graph-wrap">
            <div class="graph-info">
              <h2>
                {{$t('mining.b006')}}
                <!-- 배당 비율 -->
              </h2>
              {{$t('mining.b007', [dividend['cur_cd']])}}
              <!-- ※ 배당 비율은 100 {{dividend['cur_cd']}} 당 배당액으로 표시됩니다. -->
            </div>
            <div class="graph">
              <!-- <div class="yesterday" v-bind:style="dividend.yesterdayGraphStyle">
                                <div class="tooltip">{{dividend.yesterdayGraphRate}} KRW</div>
                                <div class="title">전일({{yesterday}})</div>
                            </div>
                            <div class="today" v-bind:style="dividend.todayGraphStyle">
                                <div class="tooltip">{{dividend.todayGraphRate}} KRW</div>
                                <div class="title">당일({{today}})</div>
                            </div>
              <div class="underline"></div>-->
              <DividendGraph :data="dividendChartData"></DividendGraph>
            </div>
          </div>

          <el-row>
            <el-col class="table-wrap">
              <div class="table-title">{{yesterday()}}</div>
              <el-row>
                <el-col class="label">
                  {{$t('mining.b008')}}
                  <!-- 누적 발행량 -->
                </el-col>
                <el-col
                  class="value"
                >{{currencyFormat(dividend['bf_tot_qty'], 0, true)}} {{dividend['cur_cd']}}</el-col>
              </el-row>
              <el-row>
                <el-col class="label">
                  {{$t('mining.b009')}}
                  <!-- 배당액 -->
                </el-col>
                <el-col class="value">{{currencyFormat(dividend['bf_dvd_amt'], 0, true)}} KRW</el-col>
              </el-row>
              <el-row>
                <el-col class="label">
                  {{$t('mining.b010')}}
                  <!-- 배당 비율 -->
                </el-col>
                <el-col
                  class="value"
                >100 {{dividend['cur_cd']}} &nbsp;&nbsp; : &nbsp;&nbsp; {{currencyFormat(dividend['bf_dvd_rt'], 0, true)}} KRW</el-col>
              </el-row>
            </el-col>
            <el-col class="table-wrap today">
              <div class="table-title">{{today()}}</div>
              <el-row>
                <el-col class="label">
                  {{$t('mining.b008')}}
                  <!-- 누적 발행량 -->
                </el-col>
                <el-col
                  class="value"
                >{{currencyFormat(dividend['to_tot_qty'], 0, true)}} {{dividend['cur_cd']}}</el-col>
              </el-row>
              <el-row>
                <el-col class="label">
                  {{$t('mining.b009')}}
                  <!-- 배당액 -->
                </el-col>
                <el-col class="value">{{currencyFormat(dividend['to_dvd_amt'], 0, true)}} KRW</el-col>
              </el-row>
              <el-row>
                <el-col class="label">
                  {{$t('mining.b011')}}
                  <!-- 예상 배당 비율 -->
                </el-col>
                <el-col
                  class="value"
                >100 {{dividend['cur_cd']}} &nbsp;&nbsp; : &nbsp;&nbsp; {{currencyFormat(dividend['to_dvd_rt'], 0, true)}} KRW</el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="table-info">
            {{$t('mining.b012')}}
            <!--  ※ 누적 거래금액은 매 시 59:59초에 누적됩니다. -->
            <br>
            {{$t('mining.b013')}}
            <!-- ※ 거래금액은 매 시 원화 환산 금액을 기준으로 합니다. -->
          </div>

          <div class="asset-board">
            <el-popover placement="bottom" width="300" trigger="hover">
              <h3>
                {{$t('mining.b021')}}
                <!-- &lt;유의사항&gt; -->
              </h3>
              <p>
                {{$t('mining.b022')}}
                <!-- 나의 예상 배당금은 소수점을 제외하여 계산한 데이터로 실제 배당금과 다를 수 있습니다. -->
              </p>
              <h3>
                {{$t('mining.b023')}}
                <!-- &lt;계산방식&gt; -->
              </h3>
              <p>
                {{$t('mining.b024')}}
                <!-- 나의 예상 배당금 = 총 배당금 x 나의 당일 지분율 -->
              </p>
              <el-button slot="reference" icon="el-icon-question" class="question"></el-button>
            </el-popover>

            <div class="login" v-if="!isLoggedIn">
              <span>
                {{$t('mining.a026')}}
                <!-- 로그인 후 확인 가능합니다. -->
              </span>
            </div>

            <el-row class="part3">
              <el-col>
                <span class="title">
                  {{$t('mining.b014')}}
                  <!-- 나의 평균 보유 -->
                  :
                </span>
                &nbsp;&nbsp;
                {{currencyFormat(dividend['avg_poss_amt'], 0, true)}}
                <span
                  class="unit"
                >{{dividend['cur_cd']}}</span> 
              </el-col>
              <el-col>
                <span class="title">
                  {{$t('mining.b015')}}
                  <!-- 나의 당일 지분율 -->
                  :
                </span>
                &nbsp;&nbsp;
                {{currencyFormat(Number(dividend['sta_rt']) * 100, 4)}}
                <span
                  class="unit"
                >%</span>
              </el-col>
              <el-col>
                <span class="title">
                  {{$t('mining.b016')}}
                  <!-- 나의 예상 배당금 -->
                  :
                </span>
                &nbsp;&nbsp;
                {{currencyFormat(dividend['pdt_dvd'], 0, true)}}
                <span
                  class="unit"
                >KRW</span>
              </el-col>
            </el-row>
          </div>

          <div class="table-title">
            {{$t('mining.b017')}}
            <!-- 나의 배당 지급 내역 -->
          </div>
          <div class="el-table">
            <div class="el-table__header-wrapper">
              <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
                <colgroup>
                  <col width="200">
                  <col>
                  <col width="460">
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <div class="cell">
                        {{$t('mining.b018')}}
                        <!-- 지급 일시 -->
                      </div>
                    </th>
                    <th>
                      <div class="cell">
                        {{$t('mining.b019')}}
                        <!-- 기준 배당 비율 -->
                      </div>
                    </th>
                    <th>
                      <div class="cell">
                        {{$t('mining.b020')}}
                        <!-- 배당금 -->
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <el-scrollbar :class="dividendList.length > 10 ? 'scroll': ''">
            <div class="login" v-if="!isLoggedIn">
              <span>
                {{$t('mining.a026')}}
                <!-- 로그인 후 확인 가능합니다. -->
              </span>
            </div>

            <el-table :data="dividendList" :show-header="false" stripe>
              <infinite-loading
                :identifier="dividendInfinitedId"
                slot="append"
                @infinite="dividendInfinite"
                force-use-infinite-wrapper=".el-scrollbar__wrap"
              ></infinite-loading>
              <el-table-column prop="base_dtm" label="일시" width="200" align="center">
                <template slot-scope="scope">{{formatData(scope.row.base_dtm)}}</template>
              </el-table-column>
              <el-table-column label="기준 배당 비율" align="right">
                <template
                  slot-scope="scope"
                >100 {{dividend['cur_cd']}} : {{currencyFormat(scope.row.dvd_rt, 0, true)}} KRW</template>
              </el-table-column>
              <el-table-column label="배당금" width="460" align="right">
                <template
                  slot-scope="scope"
                >{{priceFormat(scope.row.dvd_pay_cur_cd, scope.row.dvd_pay_cur_cd == "KRW" ? scope.row.dvd_amt : scope.row.depo_amt)}} {{scope.row.dvd_pay_cur_cd}}</template>
              </el-table-column>
            </el-table>
            <!-- <el-pagination layout="prev, pager, next" :total="1000" align="center"> </el-pagination> -->
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-container>
</template>

<script>
import MiningGraph from "./MiningGraph";
import DividendGraph from "./DividendGraph";
import fromExponential from "from-exponential";
import moment from "moment";
import { mapGetters } from "vuex";
import { throws } from "assert";
import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";

/* Infinite-loading
 * guid     : https://peachscript.github.io/vue-infinite-loading/guide/#installation
 * options  : https://peachscript.github.io/vue-infinite-loading/api/#props
 */
Vue.use(InfiniteLoading, {
  slots: {
    noMore: "",
    noResults: ""
  }
});

export default {
  components: {
    MiningGraph,
    DividendGraph,
    InfiniteLoading
  },
  data() {
    return {
      miningInfiniteId: +new Date(),
      dividendInfinitedId: +new Date(),
      activeName: "mining", // 현재 활성화 탭
      miningTime: "", // 마이닝 종료시까지 남은 시간
      miningChartData: {
        labels: ["", ""],
        datasets: [
          {
            label: this.$t('mining.a009'), // "마이닝 비율",
            backgroundColor: [],
            hoverBackgroundColor: [],
            data: [0, 0],
            cur_cd: ""
          }
        ]
      },
      dividendChartData: {
        labels: ["", ""],
        datasets: [
          {
            label: this.$t('mining.b006'), // "배당 비율",
            backgroundColor: [],
            hoverBackgroundColor: [],
            data: [0, 0]
          }
        ]
      },
      tmpDividend: {}
    };
  },
  methods: {
    handleClick(tab, event) {},
    today() {
      const date = new Date();
      const mm = (date.getMonth() + 1).toString();
      const dd = date.getDate().toString();

      return (
        this.$t('mining.a012') +"(" + // 당일
        (mm[1] ? mm : "0" + mm[0]) +
        "/" +
        (dd[1] ? dd : "0" + dd[0]) +
        ")"
      );
    },
    yesterday() {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      const mm = (date.getMonth() + 1).toString();
      const dd = date.getDate().toString();

      return (
        this.$t('mining.a011') +"(" + // 전일
        (mm[1] ? mm : "0" + mm[0]) +
        "/" +
        (dd[1] ? dd : "0" + dd[0]) +
        ")"
      );
    },
    getDispatchCoinMining(payload) {
      let self = this;
      if (!payload) payload = {};

      self.$store.dispatch("coinMiningObj", payload).then(res => {
        self.miningChartData = {
          labels: [self.yesterday(), self.today()],
          datasets: [
            {
              label: self.$t('mining.a009'), // "마이닝 비율",
              backgroundColor: ["#e3e3e3", "#1773ee"],
              hoverBackgroundColor: ["#e3e3e3", "#1773ee"],
              data: [
                res["bf_minn_rt"],
                res["to_minn_rt"]
              ],
              cur_cd: res["cur_cd"]
            }
          ]
        };
      });
    },
    getDispatchDividend(payload) {
      let self = this;
      if (!payload) payload = {};

      var setData = function(self, res) {
        //-------------- miningTime 데이터 셋팅 start
        self.miningTime = new Date();
        self.miningTime = new Date(
          self.miningTime.setHours(23 - res.sys_tm.substr(0, 2))
        );
        self.miningTime = new Date(
          self.miningTime.setMinutes(59 - res.sys_tm.substr(2, 2))
        );
        self.miningTime = new Date(
          self.miningTime.setSeconds(59 - res.sys_tm.substr(4, 2))
        );
        //-------------- miningTime 데이터 셋팅 end

        self.dividendChartData = {
          labels: [self.yesterday(), self.today()],
          datasets: [
            {
              label: self.$t('mining.b006'), // "배당 비율",
              backgroundColor: ["#e3e3e3", "#1773ee"],
              hoverBackgroundColor: ["#e3e3e3", "#1773ee"],
              data: [
                Math.floor(Number(res["bf_dvd_rt"]) * 100) / 100,
                Math.floor(Number(res["to_dvd_rt"]) * 100) / 100
              ]
            }
          ]
        };
      };

      self.$store.dispatch("dividendObj", payload).then(res => {
        if (res["to_dvd_amt"] == self.tmpDividend["to_dvd_amt"]) {
          setTimeout(() => {
            self.$store.dispatch("dividendObj", payload).then(res => {
              setData(self, res);
            });
            self.getDispatchCoinMining(null);
            self.getDispatchDividendList(null);
            self.getDispatchCoinMiningList(null);
          }, 3000);
        } else {
          setData(self, res);
          self.tmpDividend = res;
        }
      });
    },
    getDispatchCoinMiningList(payload) {
      let self = this;
      if (!payload) payload = { contiFlag: false };

      /* get data */
      self.$store.dispatch("coinMiningDetailList", payload).then(res => {
        self.miningInfiniteId = +new Date();
      });
    },
    getDispatchDividendList(payload) {
      let self = this;
      if (!payload) payload = { contiFlag: false };

      /* get data */
      self.$store.dispatch("dividendDetailList", payload).then(res => {
        self.dividendInfinitedId = +new Date();
      });
    },
    miningInfinite($state) {

      if (!this.$store.state.smart.miningContiKey) {
          $state.reset()
          return;
      }

      /* add data */
      this.$store
        .dispatch("coinMiningDetailList", { contiFlag: true })
        .then(res => {
          res.getContiKey() == null ? $state.complete() : $state.loaded();
        });
    },
    dividendInfinite($state) {

      if (!this.$store.state.smart.dividendContiKey) {
          $state.reset()
          return;
      }

      /* add data */
      this.$store
        .dispatch("dividendDetailList", { contiFlag: true })
        .then(res => {
          res.getContiKey() == null ? $state.complete() : $state.loaded();
        });
    },
    /* 날짜 format */
    formatData(val) {
      var year = val.substring(0, 4);
      var month = val.substring(4, 6);
      var day = val.substring(6, 8);
      var hour = val.substring(8, 10);
      var min = val.substring(10, 12);
      var sec = val.substring(12, 14);
      return (
        year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec
      );
    },
    /* 숫자 천단위 comma */
    currencyFormat(number, digits, isFloor) {
      if (digits == undefined) digits = 8;

      if (isFloor) {
        if(digits == 0) {
          return Math.floor(number*1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        } else {
          return UnitManager.flooredDecimalWithCommas(number, digits);
        }
      } else {
        return UnitManager.fixedDecimalWithCommas(number, digits);
      }
    },
    priceFormat(cd, prc) {
      if (cd == "" || cd == null || cd == undefined || !this.hogaUnit) return;

      let self = this;
      var nLenBelowDigitArray = [1];
      UnitManager.getHogaUnit(
        self.hogaUnit,
        cd,
        prc,
        undefined,
        undefined,
        nLenBelowDigitArray
      );
      // let formatter = Intl.NumberFormat(self.$i18n.locale, {
      //     minimumFractionDigits: nLenBelowDigitArray[0],
      //     maximumFractionDigits: nLenBelowDigitArray[0]
      // });
      // return formatter.format(prc);
      return UnitManager.fixedDecimalWithCommas(prc, nLenBelowDigitArray[0]);
    }
  },
  computed: {
    ...mapGetters({
      coinMining: "getCoinMining",
      coinMiningList: "getCoinMiningList",
      dividend: "getDividend",
      dividendList: "getDividendList",
      isLoggedIn: "isLoggedIn",
      hogaUnit: "hogaUnit",
      getLangkind: "getLangKind"
    }),
    socketConnected() {
      return this.$store.getters.isSocketConnected;
    }
  },
  created() {
    let self = this;
    self.miningChartData["labels"] = [self.yesterday(), self.today()];
  },
  watch: {
    getLangkind(val, old) {
      let self = this;

      self.miningChartData = {
        labels: [self.yesterday(), self.today()],
        datasets: [
          {
            label: self.$t('mining.a009'), // "마이닝 비율",
            backgroundColor: ["#e3e3e3", "#1773ee"],
            hoverBackgroundColor: ["#e3e3e3", "#1773ee"],
            data: [
              self.coinMining["bf_minn_rt"],
              self.coinMining["to_minn_rt"]
            ],
            cur_cd: self.coinMining["cur_cd"]
          }
        ]
      };

      self.dividendChartData = {
        labels: [self.yesterday(), self.today()],
        datasets: [
          {
            label: self.$t('mining.b006'), // "배당 비율",
            backgroundColor: ["#e3e3e3", "#1773ee"],
            hoverBackgroundColor: ["#e3e3e3", "#1773ee"],
            data: [
              Math.floor(Number(self.dividend["bf_dvd_rt"]) * 100) / 100,
              Math.floor(Number(self.dividend["to_dvd_rt"]) * 100) / 100
            ]
          }
        ]
      };
    }
  },
  mounted() {
    let self = this;
    self.$EventBus.$emit("pc-navi", [
      { label: self.$t('mining.a001'), target: "kovexcoinintroduce" },
      { label: self.$t('mining.a003'), target: null }
    ]);

    self.$EventBus.$on('langChange', () => {
      self.$EventBus.$emit("pc-navi", [
        { label: self.$t('mining.a001'), target: "kovexcoinintroduce" },
        { label: self.$t('mining.a003'), target: null }
      ]);
    });

    if (self.$store.getters.isSocketConnected) {
      self.getDispatchCoinMining(null);
      self.getDispatchCoinMiningList(null);
      self.getDispatchDividend(null);
      self.getDispatchDividendList(null);

      setInterval(function() {
        self.miningTime = new Date(
          self.miningTime.setSeconds(self.miningTime.getSeconds() - 1)
        );

        // 남은 시간이 매시간 hh시 59분 58초 일 때 마이닝 데이터 재조회
        if (
          self.miningTime.getMinutes() == 59 &&
          self.miningTime.getSeconds() == 58
        ) {
          self.getDispatchCoinMining(null);
          self.getDispatchCoinMiningList(null);
          self.getDispatchDividend(null);
          self.getDispatchDividendList(null);
        }
      }, 1000);
    } else {
      self.$EventBus.$on("socketConnected", () => {
        self.getDispatchCoinMining(null);
        self.getDispatchCoinMiningList(null);
        self.getDispatchDividend(null);
        self.getDispatchDividendList(null);

        setInterval(function() {
          self.miningTime = new Date(
            self.miningTime.setSeconds(self.miningTime.getSeconds() - 1)
          );

          // 남은 시간이 매시간 hh시 59분 58초 일 때 마이닝 데이터 재조회
          if (
            self.miningTime.getMinutes() == 59 &&
            self.miningTime.getSeconds() == 58
          ) {
            self.getDispatchCoinMining(null);
            self.getDispatchCoinMiningList(null);
            self.getDispatchDividend(null);
            self.getDispatchDividendList(null);
          }
        }, 1000);
      });
    }
  },
  filters: {
    miningTimeFormat(val, self) {
      if (!val) return;
      const tmpFormat = ['시', '분', '초']
      const format = "HH" + tmpFormat[0] + " mm" + tmpFormat[1] + " ss" + tmpFormat[2]
      var res = moment(val).format(format)
          res = res.replace(tmpFormat[0], self.$t("mining.a008-1"))
          res = res.replace(tmpFormat[1], self.$t("mining.a008-2"))
          res = res.replace(tmpFormat[2], self.$t("mining.a008-3"))
      return res;
    },
    dividendTimeFormat(val, self) {
      if (!val) return;
      const tmpFormat = ['분', '초']
      const format = "mm" + tmpFormat[0] + " ss" + tmpFormat[1];
      var res = moment(val).format(format)
          res = res.replace(tmpFormat[0], self.$t("mining.a008-2"))
          res = res.replace(tmpFormat[1], self.$t("mining.a008-3"))
      return res
    }
  }
};
</script>