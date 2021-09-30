<template>
  <div class="SmartSignalHistory">
    <el-row class="lst-tit-bx01">
      <strong class="bullet-tit-type01">{{$t('m_signal.c012')}}</strong>
    </el-row>
    <el-table :data="history" :empty-text="$t('m_signal.c013')" style="width: 100%">
      <el-table-column
        prop="rqst_dttm"
        :label="$t('m_signal.b014')"
        min-width="85"
        header-align="left"
        align="left"
      >
        <template slot-scope="scope">
          <span class="gray_txt">
            <nl2br tag="p" :text="scope.row.rqst_dttm | toMoment"/>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="stt_cls"
        :label="$t('m_signal.b015')"
        min-width="55"
        header-align="left"
        align="left"
      >
        <template slot-scope="scope">{{toStatus(scope.row.stt_cls)}}</template>
      </el-table-column>
      <el-table-column
        prop="expt_nm"
        :label="$t('m_signal.b018')"
        label-class-name="cell_wid"
        min-width="105"
        header-align="center"
        align="left"
      >
        <template slot-scope="scope">
          <span class="gray_txt01">{{scope.row.expt_nm}}</span>
          <br>
          <span class="gray_txt">{{scope.row.expt_nnm}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="trmn_dttm"
        :label="$t('m_signal.b019')"
        min-width="85"
        header-align="left"
        align="left"
      >
        <template slot-scope="scope">
          <span class="gray_txt">
            <nl2br tag="p" :text="scope.row.trmn_dttm | toMoment"/>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      /**
       * @property {array}  history     신청내역 목록
       */
      history: []
    };
  },
  filters: {
    /**
     * 날짜 포맷
     * @param   {string} dt 날짜 20190101120000
     * @returns {string} 날짜 2019.01.01 12:00:00
     */
    toMoment(dt) {
      if (dt.length < 14) {
        return "-";
      } else {
        let toFormat = moment(dt.substr(0, 8) + "T" + dt.substr(8, 6));
        if (toFormat.isValid()) {
          let ymd = toFormat.format("YYYY/MM/DD");
          let hms = toFormat.format("HH:mm:ss");
          return ymd + "\n" + hms;
        } else {
          return "-";
        }
      }
    }
  },
  computed: {},
  methods: {
    /**
     * @vuex {action} fetchSmartSignalFollowHistory 스마트시그널 신청내역 조회 (ss015)
     */
    ...mapActions(["fetchSmartSignalFollowHistory"]),
    /**
     * stt_cls "상태" 값 -> 출력 텍스트
     * @returns {string} "구독중"/"해지"
     */
    toStatus(flag) {
      let self = this;
      return flag === "1" ? self.$t("m_signal.b016") : self.$t("m_signal.b017");
    },
    /**
     * 신청내역 목록 조회
     * @param {string} next_key 다음조회키
     */
    fetchHistory(next_key) {
      const self = this;
      const param = next_key ? { next_key } : null;
      self.fetchSmartSignalFollowHistory(param).then(res => {
        self.history = self.history.concat(res.list);
        if (res.res.next_key.length > 0) {
          self.fetchHistory(res.res.next_key);
        }
      });
    }
  },
  watch: {},
  mounted() {
    let self = this;
    if (self.$store.getters.isSocketConnected) {
      self.fetchHistory();
    } else {
      self.$EventBus.$on("socketConnected", () => {
        self.fetchHistory();
      });
    }
  },
  created() {}
};
</script>

