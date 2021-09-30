<template>
  <el-container class="KovexCoinSituation">
    <div class="contents">
      <h1 class="pageTitle">
        {{issueStatus['cur_cd']}} {{$t('mining.c001')}}
        <!-- 발행 현황 -->
      </h1>
      <div class="top-row">
        <el-select v-model="curYear" placeholder="Select">
          <el-option v-for="item in selectYear" :key="item" :label="item + $t('mining.c002')" :value="item"></el-option>
        </el-select>
        <el-select v-model="curMonth" placeholder="Select">
          <el-option v-for="item in selectMonth" :key="item" :label="item + $t('mining.c003')" :value="item"></el-option>
        </el-select>
        <!-- <el-col :span="4" class="date-button-wrap">
                    <el-col :span="6"><el-button icon="el-icon-arrow-left"></el-button></el-col>
                    <el-col :span="12">2018년 10월</el-col>
                    <el-col :span="6"><el-button icon="el-icon-arrow-right"></el-button></el-col>
        </el-col>-->
      </div>
      <div class="accrue-issue-amount-wrap">
        <!-- <el-popover placement="bottom" width="400" trigger="hover">
          <div>도움말이 필요합니다.</div>
          <el-button slot="reference" icon="el-icon-question" class="question"></el-button>
        </el-popover> -->
        <div class="title">
          {{$t('mining.c004')}}
          <!-- 누적 발행량 -->
        </div>
        <div
          class="value"
        >{{currencyFormat(issueStatus['last_tot_qty'], 0, true)}} {{issueStatus['cur_cd']}}</div>
      </div>

      <div class="el-table">
        <div class="el-table__header-wrapper">
          <table border="0" celpadding="0" cellspacing="0" class="el-table__header">
            <colgroup>
              <col width="120">
              <col width="180">
              <col>
              <col width="180">
              <col width="180">
              <col width="180">
            </colgroup>
            <thead>
              <tr>
                <th>
                  <div class="cell">
                    {{$t('mining.c005')}}
                    <!-- 일시 -->
                  </div>
                </th>
                <th>
                  <div class="cell">
                    {{$t('mining.c006')}}
                    <!-- 마이닝 -->
                  </div>
                </th>
                <th>
                  <div class="cell">
                    {{$t('mining.c007')}}
                    <!-- 운영 및 마케팅 -->
                  </div>
                </th>
                <th>
                  <div class="cell">
                    {{$t('mining.c008')}}
                    <!-- 바이백 -->
                  </div>
                </th>
                <th>
                  <div class="cell">
                    {{$t('mining.c009')}}
                    <!-- 일자별 발행량 -->
                  </div>
                </th>
                <th>
                  <div class="cell">
                    {{$t('mining.c010')}}
                    <!-- 누적 발행량 -->
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <el-scrollbar :class="tableData.length > 15 ? 'scroll' : ''">
        <el-table :data="tableData" :show-header="false">
          <el-table-column label="일자" width="120" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.base_dt | dateFormat}}</span>
            </template>
          </el-table-column>
          <el-table-column label="마이닝" width="180" align="right">
            <template slot-scope="scope">
              <span>{{currencyFormat(scope.row.minn_qty, 0, true)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="운영 및 마케팅" width="180" align="right">
            <template slot-scope="scope">
              <span>{{currencyFormat(scope.row.mrkt_team_qty, 0, true)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="바이백" width="180" align="right">
            <template slot-scope="scope">
              <span>{{currencyFormat(scope.row.bybk_qty, 0, true)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="일자별 발행량" width="180" align="right">
            <template slot-scope="scope">
              <span>{{currencyFormat(scope.row.day_qty, 0, true)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="누적 발행량" width="180" align="right">
            <template slot-scope="scope">
              <span>{{currencyFormat(scope.row.tot_qty, 0, true)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
      <div class="accrue-issue-caution">
        {{$t('mining.c011')}}
        <!-- ※ 바이백은 시세 안정을 위해 자사가 매입한 수량을 의미합니다. -->
        <br>
        {{$t('mining.c012')}}
        <!-- ※ 일자별 발행량 = 마이닝 + 운영 및 마케팅 – 바이백 -->
        <br>
        {{$t('mining.c013')}}
        <!-- ※ 당일자 마이닝 발행량 및 누적 발행량은 예상값으로 익일에 승인 완료 후, 정확한 수량을 확인하실 수 있습니다. -->
        <br>
        {{$t('mining.c014')}}
        <!-- ※ 팀별 발행량은 운영 및 마케팅 항목에 포함되어 표시됩니다. -->
      </div>
    </div>
  </el-container>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      infiniteId: +new Date(),
      curYear: moment().format("YYYY"), // 년 선택 기본 값
      curMonth: moment().format("MM"), // 월 선택 기본 값
      selectYear: [],
      selectMonth: []
    };
  },
  methods: {
    getDispatchIssueStatus() {
      let self = this;
      var payload = {
        base_ym: this.curYear + this.curMonth
      };
      this.$store.dispatch("issueStatusObj", payload).then(() => {});
    },
    /* 숫자 천단위 comma */
    currencyFormat(number, digits, isFloor) {
      if (digits == undefined) digits = 8;

      if (isFloor) {
        return UnitManager.flooredDecimalWithCommas(number, digits);
      } else {
        return UnitManager.fixedDecimalWithCommas(number, digits);
      }
    },
    initData() {
      for (var i = 2019; i <= Number(moment().format("YYYY")); i++) {
        this.selectYear.push(i.toString());
      }

      var mm = "";
      for (var i = 1; i <= Number(moment().format("MM")); i++) {
        mm = i < 10 ? "0" + i : i.toString();
        this.selectMonth.push(mm);
      }
    }
  },
  computed: {
    ...mapGetters({
      issueStatus: "getIssueStatus",
      tableData: "getIssueStatusList"
    }),
    socketConnected() {
      return this.$store.getters.isSocketConnected;
    }
  },
  watch: {
    curYear(val, old) {
      var lastMonth;
      var mm = "";
      if (val != moment().format("YYYY")) {
        lastMonth = 12;
      } else {
        lastMonth = Number(moment().format("MM"));
      }

      this.selectMonth = [];
      for (var i = 1; i <= lastMonth; i++) {
        mm = i < 10 ? "0" + i : i.toString();
        this.selectMonth.push(mm);
      }

      if (this.curMonth == "01") {
        this.getDispatchIssueStatus();
      } else {
        this.curMonth = "01";
      }
    },
    curMonth(val, old) {
      this.getDispatchIssueStatus();
    }
  },
  created() {
    this.initData();
  },
  mounted() {
    let self = this;
    self.$EventBus.$emit("pc-navi", [
      { label: self.$t('mining.a001'), target: "kovexcoinintroduce" },
      { label: self.$t('mining.c001'), target: null }
    ]);

    self.$EventBus.$on('langChange', () => {
      self.$EventBus.$emit("pc-navi", [
        { label: self.$t('mining.a001'), target: "kovexcoinintroduce" },
        { label: self.$t('mining.c001'), target: null }
      ]);
    });

    if (self.$store.getters.isSocketConnected) {
      self.getDispatchIssueStatus();
    } else {
      self.$EventBus.$on("socketConnected", () => {
        self.getDispatchIssueStatus();
      });
    }
  },
  filters: {
    /* yyyy-mm-dd */
    dateFormat(val) {
      if (!val) return "";
      return val.substr(0, 4) + "-" + val.substr(4, 2) + "-" + val.substr(6, 2);
    }
  }
};
</script>