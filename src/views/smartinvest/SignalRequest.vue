<template>
  <div class="SignalRequest">
    <h1 class="pageTitle">
      {{$t('signal.a003')}}
      <!-- 신청내역 -->
    </h1>

    <el-table :data="tableData" :empty-text="$t('signal.e008')">
      <el-table-column prop="rqst_dttm" :label="$t('signal.e001')" align="center" width="160">
        <!-- 신청일 -->
        <template slot-scope="scope">
          <span>{{scope.row.rqst_dttm | toMoment}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="stt_cls" :label="$t('signal.e002')" align="center" width="160">
        <!-- 상태 -->
        <template slot-scope="scope">
          <span>{{toStatus(scope.row.stt_cls)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expt_nm" :label="$t('signal.e003')" align="center">
        <!-- 구독 전문가 실명/닉네임 -->
        <template slot-scope="scope">{{scope.row.expt_nm}} / {{scope.row.expt_nnm}}</template>
      </el-table-column>
      <el-table-column prop="trmn_dttm" :label="$t('signal.e004')" align="center" width="160">
        <!-- 해지일 -->
        <template slot-scope="scope">
          <span>{{scope.row.trmn_dttm | toMoment}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="onCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="totalItemCount"
    ></el-pagination>
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
       * @property {number} currentPage 페이지 인덱스
       * @property {number} pageSize    페이지 사이즈
       */
      history: [],
      currentPage: 1,
      pageSize: 10
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
          return toFormat.format("YYYY.MM.DD HH:mm:ss");
        } else {
          return "-";
        }
      }
    }
  },
  computed: {
    /**
     * 신청내역 목록 아이템 카운트
     * @returns {number} 카운트
     */
    totalItemCount() {
      let self = this;
      return self.history.length;
    },
    /**
     * 현재 페이지 인덱스에 맞춘 부분 목록
     * @returns {array}
     */
    tableData() {
      let self = this;
      let start = (self.currentPage - 1) * self.pageSize;
      return self.history.slice(start, start + self.pageSize);
    }
  },
  methods: {
    /**
     * @vuex {action} fetchSmartSignalFollowHistory 스마트시그널 신청내역 조회 (ss015)
     */
    ...mapActions(["fetchSmartSignalFollowHistory"]),
    /**
     * 페이지 인덱스 변경 이벤트
     */
    onCurrentChange(val) {},
    /**
     * stt_cls "상태" 값 -> 출력 텍스트
     * @returns {string} "구독중"/"해지"
     */
    toStatus(flag) {
      let self = this;
      return flag === "1" ? self.$t("signal.e005") : self.$t("signal.e006");
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
  created() {},
  mounted() {
    let self = this;
    self.$EventBus.$emit("pc-navi", [
      { label: self.$t("tdi.a001"), target: "tdiList" },
      { label: self.$t("signal.b001"), target: "signalInfo" },
      { label: self.$t("signal.a003"), target: null }
    ]);

    self.$EventBus.$on("langChange", () => {
      self.$EventBus.$emit("pc-navi", [
        { label: self.$t("tdi.a001"), target: "tdiList" },
        { label: self.$t("signal.b001"), target: "signalInfo" },
        { label: self.$t("signal.a003"), target: null }
      ]);
    });

    if (self.$store.getters.isSocketConnected) {
      self.fetchHistory();
    } else {
      self.$EventBus.$on("socketConnected", () => {
        self.fetchHistory();
      });
    }
  }
};
</script>