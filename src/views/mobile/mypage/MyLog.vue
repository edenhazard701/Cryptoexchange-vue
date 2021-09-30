<template>
  <div class="MyLog">
    <el-table :data="history" style="width: 100%" empty-text="접속정보확인 내역이 없습니다.">
      <el-table-column prop="logn_cnel" :label="$t('m_mypage.h001')" align="left" min-width="100">
        <!-- 접속 매체 -->
        <template slot-scope="scope">
          <span class="cnel">{{scope.row.logn_cnel}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="logn_ip"
        :label="$t('m_mypage.h002')"
        header-align="center"
        align="right"
        min-width="120"
      >
        <!-- 접속 IP -->
        <template slot-scope="scope">
          <span class="ip">{{scope.row.logn_ip}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="logn_dtm" :label="$t('m_mypage.h003')" align="right" min-width="100">
        <!-- 일시 -->
        <template slot-scope="scope">
          <span class="dtm">{{scope.row.logn_dtm | toMoment}}</span>
        </template>
      </el-table-column>
    </el-table>
    <p class="btm_txt">
      {{$t('m_mypage.h004')}}
      <!-- 최근 접속 30건만 조회됩니다. -->
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  components: {},
  data() {
    return {
      /**
       * @property {array} history 접속 정보 목록
       */
      history: []
    };
  },
  filters: {
    /**
     * 날짜 포맷
     * @param   {string} dt 날짜 20190101120000
     * @returns {string} 날짜 2019.01.01 12:00
     */
    toMoment(dt) {
      return moment(dt.substr(0, 8) + "T" + dt.substr(8, 4)).format(
        "YYYY.MM.DD HH:mm"
      );
    }
  },
  computed: {},
  methods: {
    /**
     * @vuex {action} fetchLoginHistory 로그인 내역 조회 (ac520)
     */
    ...mapActions(["fetchLoginHistory"])
  },
  watch: {},
  created() {
    this.$EventBus.$emit("mobile-nav-title", this.$t("m_mypage.h005"));
    this.$EventBus.$emit("mobile-nav-menus", ["noDefault", "close"]);
  },
  mounted() {
    let self = this;
    if (self.$store.getters.isSocketConnected) {
      self.fetchLoginHistory().then(res => {
        self.history = res;
      });
    } else {
      self.$EventBus.$on("socketConnected", () => {
        self.fetchLoginHistory().then(res => {
          self.history = res;
        });
      });
    }
  }
};
</script>