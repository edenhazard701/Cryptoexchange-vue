<template>
  <div class="SmartCoinMining">
    <div class="deadline">
      <p class="date">10/24</p>
      <p class="txt">
        {{$t('m_mining.b004')}}
        <span class="time">{{miningTime | miningTimeFormat(this)}}</span>
      </p>
    </div>
    <div class="rate">
      <div class="bullet_question_tit">
        <h2 class="bullet-tit-type01">{{$t('m_mining.b006')}}</h2>
        <el-button class="text-btn question-btn" v-on:click="smartRatioDialogVisible = true">
          <i class="el-icon-question"></i>
        </el-button>
      </div>
      <div class="chart">
        <CoinGraph :data="coinChartData"></CoinGraph>
      </div>
    </div>
    <div class="whole">
      <h2 class="bullet-tit-type01">{{$t('m_mining.b011')}}</h2>
      <el-radio-group v-model="isToday" @change="isTodayChange">
        <el-radio-button label="0">{{$t('m_mining.b012')}}</el-radio-button>
        <el-radio-button label="1">{{$t('m_mining.b013')}}</el-radio-button>
      </el-radio-group>
      <table class="tbody_table_sy">
        <colgroup>
          <col style="width:105px;">
          <col>
        </colgroup>
        <tbody>
          <tr>
            <th scope="row" v-html="$t('m_mining.b014')"></th>
            <td>
              {{currencyFormat(miningObj['proc_qty'], 0, true)}}
              <span class="s_txt">{{coinMining['cur_cd']}}</span>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <span v-html="$t('m_mining.b015')"></span>
              <el-button class="text-btn question-btn" v-on:click="smartAmountDialogVisible = true">
                <i class="el-icon-question"></i>
              </el-button>
            </th>
            <td>
              {{currencyFormat(miningObj['trd_amt'], 0, true)}}
              <span class="s_txt">{{amountSymbol}}</span>
            </td>
          </tr>
          <tr>
            <th scope="row" v-html="isToday == '0' ? $t('m_mining.b016') : $t('m_mining.b017')"></th>
            <td>100,000
              <span class="s_txt">{{amountSymbol}}</span>
              <span class="ratio_colon">:</span>
              {{currencyFormat(miningObj['minn_rt'], 2, true)}}
              <span class="s_txt">{{coinMining['cur_cd']}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="my_status">
      <div class="bullet_question_tit">
        <h2 class="bullet-tit-type01">{{$t('m_mining.b020')}}</h2>
        <el-button class="text-btn question-btn" v-on:click="smartSituationDialogVisible = true">
          <i class="el-icon-question"></i>
        </el-button>
      </div>
      <div class="status_table">
        <el-table :data="myData">
          <el-table-column :label="$t('m_mining.b021')" prop="trade" align="center">
            <template slot-scope="scope">
              {{currencyFormat(coinMining['trd_amt'], 0, true)}}
              <span class="s_txt">{{amountSymbol}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('m_mining.b022')" prop="expect" align="center">
            <template slot-scope="scope">
              {{priceFormat(coinMining['cur_cd'], coinMining['pdt_minn'])}}
              <span class="s_txt">{{coinMining['cur_cd']}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="my_history">
      <h2 class="bullet-tit-type01">{{$t('m_mining.b027')}}</h2>
      <el-table :data="coinMiningList">
        <infinite-loading
          :identifier="miningInfiniteId"
          slot="append"
          @infinite="miningInfinite"
          force-use-infinite-wrapper=".el-table__body-wrapper"
        ></infinite-loading>
        <el-table-column :label="$t('m_mining.b028')" prop="date" width="73" align="center">
          <template slot-scope="scope">
            <p class="date" v-html="dateFormat(scope.row.base_dtm)"></p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('m_mining.b029')"
          prop="rate"
          min-width="107"
          align="right"
          header-align="center"
        >
          <template slot-scope="scope">100,000
            <span class="s_txt">{{amountSymbol}}</span> :
            <br>
            {{currencyFormat(scope.row.minn_rt, 2, true)}}
            <span class="s_txt">{{coinMining['cur_cd']}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('m_mining.b030')"
          prop="mined"
          min-width="90"
          align="right"
          header-align="center"
        >
          <template slot-scope="scope">
            <span
              :class="chkStrLength(priceFormat(coinMining['cur_cd'], scope.row.minn_qty))"
            >{{priceFormat(coinMining['cur_cd'], scope.row.minn_qty)}}</span>
            <span class="s_txt_block">{{scope.row.minedSymbol}} {{coinMining['cur_cd']}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('m_mining.b031')"
          prop="total"
          min-width="90"
          align="right"
          header-align="center"
        >
          <template slot-scope="scope">
            <span
              :class="chkStrLength(priceFormat(coinMining['cur_cd'], scope.row.tot_minn_qty))"
            >{{priceFormat(coinMining['cur_cd'], scope.row.tot_minn_qty)}}</span>
            <span class="s_txt_block">{{scope.row.totalSymbol}} {{coinMining['cur_cd']}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- dialog(마이닝 비율)// -->
    <el-dialog :visible.sync="smartRatioDialogVisible" :close-on-click-modal="false" center>
      <div class="smart_dialog_txt_wrap">
        <p>{{$t('m_mining.b007_01')}} {{coinMining['cur_cd']}} {{$t('m_mining.b007_02')}}</p>
      </div>
      <div slot="footer" class="dialog-footer full_footer">
        <el-button type="primary" @click="smartRatioDialogVisible = false">{{$t('m_mining.b008')}}</el-button>
      </div>
    </el-dialog>
    <!-- //dialog(마이닝 비율) -->
    <!-- dialog(거래금액)// -->
    <el-dialog :visible.sync="smartAmountDialogVisible" :close-on-click-modal="false" center>
      <div class="smart_dialog_txt_wrap">
        <ul>
          <li class="info">{{$t('m_mining.b018')}}</li>
          <li class="info">{{$t('m_mining.b019')}}</li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer full_footer">
        <el-button type="primary" @click="smartAmountDialogVisible = false">{{$t('m_mining.b008')}}</el-button>
      </div>
    </el-dialog>
    <!-- //dialog(거래금액) -->
    <!-- dialog(나의 마이닝 현황)// -->
    <el-dialog :visible.sync="smartSituationDialogVisible" :close-on-click-modal="false" center>
      <div class="tit_list_cont">
        <div class="cont">
          <strong class="tit">{{$t('m_mining.b023')}}</strong>
          <ul class="list">
            <li class="dot">{{$t('m_mining.b024')}}</li>
          </ul>
        </div>
        <div class="cont">
          <strong class="tit">{{$t('m_mining.b025')}}</strong>
          <ul class="list">
            <li class="dot">{{$t('m_mining.b026')}}</li>
          </ul>
        </div>
      </div>
      <div slot="footer" class="dialog-footer full_footer">
        <el-button
          type="primary"
          @click="smartSituationDialogVisible = false"
        >{{$t('m_mining.b008')}}</el-button>
      </div>
    </el-dialog>
    <!-- //dialog(나의 마이닝 현황) -->
  </div>
</template>


<script>
import CoinGraph from "./CoinGraph";
import moment from "moment";
import Vue from "vue";
import { mapGetters } from "vuex";
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
    CoinGraph,
    InfiniteLoading
  },
  data() {
    return {
      miningTime: "", // 마이닝 종료시까지 남은 시간
      miningInfiniteId: +new Date(),
      //팝업
      smartRatioDialogVisible: false,
      smartAmountDialogVisible: false,
      smartSituationDialogVisible: false,
      //마이닝 비율
      isToday: "1",
      //전체 마이닝 현황
      miningObj: {
        proc_qty: 0, //채굴량
        trd_amt: 0, //거래금액
        minn_rt: 0 // 마이닝 비율
      },
      amountSymbol: "KRW",
      //나의 마이닝 현황
      myData: [{}],
      //나의 마이닝 내역
      coinChartData: {
        labels: ["", ""],
        datasets: [
          {
            label: "마이닝 비율",
            backgroundColor: [],
            data: [0, 0],
            cur_cd: ""
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters({
      coinMining: "getCoinMining",
      coinMiningList: "getCoinMiningList",
      hogaUnit: "hogaUnit",
    })
  },
  created() {
    let self = this;

    self.coinChartData["labels"] = [self.yesterday(), self.today()];
  },
  methods: {
    getDispatchCoinMining(payload) {
      let self = this;
      if (!payload) payload = {};

      self.$store.dispatch("coinMiningObj", payload).then(res => {
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

        self.coinChartData = {
          labels: [self.yesterday(), self.today()],
          datasets: [
            {
              label: self.$t('m_mining.b006'), // "마이닝 비율",
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
        // 전체 마이닝 현황  default : 당일
        if (self.isToday == "0") {
          self.miningObj["proc_qty"] = self.coinMining["bf_proc_qty"];
          self.miningObj["trd_amt"] = self.coinMining["bf_trd_amt"];
          self.miningObj["minn_rt"] = self.coinMining["bf_minn_rt"];
        } else {
          self.miningObj["proc_qty"] = self.coinMining["to_proc_qty"];
          self.miningObj["trd_amt"] = self.coinMining["to_trd_amt"];
          self.miningObj["minn_rt"] = self.coinMining["to_minn_rt"];
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
    today() {
      const date = new Date();
      const mm = (date.getMonth() + 1).toString();
      const dd = date.getDate().toString();

      return (
        this.$t('m_mining.b013') +"(" + // 당일
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
        this.$t('m_mining.b012') +"(" + // 전일
        (mm[1] ? mm : "0" + mm[0]) +
        "/" +
        (dd[1] ? dd : "0" + dd[0]) +
        ")"
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
      if (
        cd == "" ||
        cd == null ||
        cd == undefined ||
        this.hogaUnit == undefined
      )
        return;

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
      let formatter = Intl.NumberFormat(self.$i18n.locale, {
        minimumFractionDigits: nLenBelowDigitArray[0],
        maximumFractionDigits: nLenBelowDigitArray[0]
      });
      return formatter.format(prc);
    },
    isTodayChange(val, old) {
      if (val == "0") {
        // 전일
        this.isToday = "0";
        this.miningObj["proc_qty"] = this.coinMining["bf_proc_qty"];
        this.miningObj["trd_amt"] = this.coinMining["bf_trd_amt"];
        this.miningObj["minn_rt"] = this.coinMining["bf_minn_rt"];
      } else {
        // 당일
        this.isToday = "1";
        this.miningObj["proc_qty"] = this.coinMining["to_proc_qty"];
        this.miningObj["trd_amt"] = this.coinMining["to_trd_amt"];
        this.miningObj["minn_rt"] = this.coinMining["to_minn_rt"];
      }
    },
    dateFormat(ord_dtm) {
      if (!ord_dtm) return "";
      ord_dtm = ord_dtm.replace(/\./g, "");
      ord_dtm = ord_dtm.replace(/:/g, "");
      ord_dtm = ord_dtm.replace(/ /g, "");

      return moment(ord_dtm.substr(0, 8) + "T" + ord_dtm.substr(8, 6)).format(
        "YY/MM/DD <br> HH:mm:ss"
      );
    },
    // 글자수 10초과시 다른 class 적용
    chkStrLength(_srt) {
      if (_srt == undefined) return;
      var length = _srt.length;
      if (length > 10) {
        return "fs11";
      }
    }
  },
  mounted() {
    let self = this;

    if (self.$store.getters.isSocketConnected) {
      self.getDispatchCoinMining(null);
      self.getDispatchCoinMiningList(null);

      setInterval(function() {
        self.miningTime = new Date(
          self.miningTime.setSeconds(self.miningTime.getSeconds() - 1)
        );

        // 남은 시간이 매시간 hh시 00분 00초 일 때 마이닝 데이터 재조회
        if (
          self.miningTime.getMinutes() == 59 &&
          self.miningTime.getSeconds() == 58
        ) {
          self.getDispatchCoinMining(null);
          self.getDispatchCoinMiningList(null);
        }
      }, 1000);
    } else {
      self.$EventBus.$on("socketConnected", () => {
        self.getDispatchCoinMining(null);
        self.getDispatchCoinMiningList(null);

        setInterval(function() {
          self.miningTime = new Date(
            self.miningTime.setSeconds(self.miningTime.getSeconds() - 1)
          );

          // 남은 시간이 매시간 hh시 00분 00초 일 때 마이닝 데이터 재조회
          if (
            self.miningTime.getMinutes() == 59 &&
            self.miningTime.getSeconds() == 58
          ) {
            self.getDispatchCoinMining(null);
            self.getDispatchCoinMiningList(null);
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
          res = res.replace(tmpFormat[0], self.$t("m_mining.b005-1"))
          res = res.replace(tmpFormat[1], self.$t("m_mining.b005-2"))
          res = res.replace(tmpFormat[2], self.$t("m_mining.b005-3"))
      return res;
    }
  }
};
</script>
