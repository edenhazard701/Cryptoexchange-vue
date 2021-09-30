<template>
  <div class="MyLog">
    <h2 class="pageTitle">
      {{$t('mypage.j001')}}
      <!-- 접속정보확인 -->
    </h2>
    <div class="el-table">
      <div class="el-table__header-wrapper">
        <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
          <colgroup>
            <col width="293">
            <col>
            <col width="293">
          </colgroup>
          <thead>
            <tr>
              <th>
                <div class="cell">
                  {{$t('mypage.j002')}}
                  <!-- 접속 매체 -->
                </div>
              </th>
              <th>
                <div class="cell">
                  {{$t('mypage.j003')}}
                  <!-- 접속 IP -->
                </div>
              </th>
              <th>
                <div class="cell">
                  {{$t('mypage.j004')}}
                  <!-- 일시 -->
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
      <el-table :data="history" stripe :show-header="false" empty-text="접속 정보가 없습니다.">
        <el-table-column prop="logn_cnel" label="접속 매체" align="center" width="293"></el-table-column>
        <!-- 접속 매체 -->
        <el-table-column prop="logn_ip" label="접속 IP" align="center"></el-table-column>
        <!-- 접속 IP -->
        <el-table-column prop="logn_dtm" label="일시" align="center" width="293">
          <!-- 일시 -->
          <template slot-scope="scope">
            <span>{{scope.row.logn_dtm | toMoment}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <div class="mylog-info">
      <i class="ico-info"></i>
      {{$t('mypage.j005')}}
      <!-- 최근 접속 30건만 조회됩니다. -->
    </div>
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
  created() {},
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

    self.$EventBus.$emit("pc-navi", [
      { label: self.$t("header.me"), target: "mypageInfo" },
      { label: self.$t("mypage.a006"), target: null }
    ]);

    self.$EventBus.$on("langChange", () => {
      self.$EventBus.$emit("pc-navi", [
        { label: self.$t("header.me"), target: "mypageInfo" },
        { label: self.$t("mypage.a006"), target: null }
      ]);
    });
  }
};
</script>