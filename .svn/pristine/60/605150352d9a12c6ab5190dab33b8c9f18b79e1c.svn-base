<template>
  <div class="SmartCoinIssue">
    <div class="total">
      <h2>
        {{$t('m_mining.d001')}}
        <el-button class="text-btn question-btn" v-on:click="smartInfolDialogVisible = true">
          <i class="el-icon-question"></i>
        </el-button>
      </h2>
      <p>
        {{currencyFormat(issueStatus['last_tot_qty'], 0, true)}}
        <span class="small">{{issueStatus['cur_cd']}}</span>
      </p>
    </div>
    <div class="filter">
      <el-input type="month" v-model="input"></el-input>
    </div>
    <div class="daily">
      <ul>
        <li class="cell" v-for="item in tableData">
          <p class="day">{{ item.base_dt | dateFormat }}</p>
          <div class="list_wrap">
            <ul class="top_list">
              <li class="inner-cell">
                <p class="key">{{$t('m_mining.d008')}}</p>
                <p class="value">{{currencyFormat(item.day_qty, 0, true)}}</p>
              </li>
            </ul>
            <ul class="btm_list">
              <li class="inner-cell" v-if="item.minn_qty > 0">
                <p class="key">{{$t('m_mining.d009')}}</p>
                <p class="value">{{currencyFormat(item.minn_qty, 0, true)}}</p>
              </li>
              <li class="inner-cell" v-if="item.mrkt_team_qty > 0">
                <p class="key">{{$t('m_mining.d010')}}</p>
                <p class="value">{{currencyFormat(item.mrkt_team_qty, 0, true)}}</p>
              </li>
              <li class="inner-cell" v-if="item.bybk_qty > 0">
                <p class="key">{{$t('m_mining.d011')}}</p>
                <p class="value">{{currencyFormat(item.bybk_qty, 0, true)}}</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <!-- dialog(누적 발행량)// -->
    <el-dialog :visible.sync="smartInfolDialogVisible" :close-on-click-modal="false" center>
      <div class="smart_dialog_txt_wrap">
        <ul>
          <li class="info">{{$t('m_mining.d012')}}</li>
          <li class="info">{{$t('m_mining.d013')}}</li>
          <li class="info">{{$t('m_mining.d014')}}</li>
          <li class="info">{{$t('m_mining.d015')}}</li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer full_footer">
        <el-button type="primary" @click="smartInfolDialogVisible = false">{{$t('m_mining.b008')}}</el-button>
      </div>
    </el-dialog>
    <!-- //dialog(누적 발행량) -->
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      smartInfolDialogVisible: false,
      input: moment().format("YYYY-MM")
    };
  },
  computed: {
    ...mapGetters({
      issueStatus: "getIssueStatus",
      tableData: "getIssueStatusList"
    })
  },
  mounted() {
    let self = this;

    if (self.$store.getters.isSocketConnected) {
      self.getDispatchIssueStatus();
    } else {
      self.$EventBus.$on("socketConnected", () => {
        self.getDispatchIssueStatus();
      });
    }
  },
  methods: {
    /* 숫자 천단위 comma */
    currencyFormat(number, digits, isFloor) {
      if (digits == undefined) digits = 8;

      if (isFloor) {
        return UnitManager.flooredDecimalWithCommas(number, digits);
      } else {
        return UnitManager.fixedDecimalWithCommas(number, digits);
      }
    },
    getDispatchIssueStatus() {
      let self = this;
      var payload = {
        base_ym: this.input.replace("-", "")
      };
      this.$store.dispatch("issueStatusObj", payload).then(obj => {});
    }
  },
  watch: {
    input(val, old) {
      if (val == "") return;
      this.getDispatchIssueStatus();
    }
  },
  filters: {
    /* dd */
    dateFormat(val) {
      if (!val) return "";
      return val.substr(6, 2);
    }
  }
};
</script>
