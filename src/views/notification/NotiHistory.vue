<template>
  <div class="NotiHistory">
    <div class="search">
      <el-row>
        <el-col class="srch-label">{{$t('noti.f006')}}:</el-col>
        <!-- 종목 -->
        <el-col class="srch-sort">
          <el-autocomplete
            class="top_search_inp"
            v-model="searchCode"
            value-key="pair"
            :fetch-suggestions="queryPairs"
            :placeholder="$t('noti.f003')"
            @select="onPairSelect"
            clearable
          ></el-autocomplete>
          <!-- 암호화폐 -->
        </el-col>
        <el-col class="srch-btn">
          <el-button type="primary" @click="onQueryClick">
            {{$t('noti.f004')}}
            <!-- 조회 -->
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="el-table">
      <div class="el-table__header-wraper">
        <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
          <colgroup>
            <col width="200">
            <col width="310">
            <col width="200">
            <col width="310">
            <col width="100">
          </colgroup>
          <thead>
            <tr>
              <th>
                <div class="cell">
                  {{$t('noti.f005')}}
                  <!-- 일시 -->
                </div>
              </th>
              <th>
                <div class="cell">
                  {{$t('noti.f006')}}
                  <!-- 종목 -->
                </div>
              </th>
              <th>
                <div class="cell">
                  {{$t('noti.f011')}}
                  <!-- 구분 -->
                </div>
              </th>
              <th>
                <div class="cell">
                  {{$t('noti.f012')}}
                  <!-- 조건 -->
                </div>
              </th>
              <th>
                <div class="cell"></div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <el-scrollbar>
      <el-table :data="history" :empty-text="$t('noti.f010')" stripe :show-header="false">
        <!-- 알림 내역이 없습니다. -->
        <infinite-loading
          :identifier="infiniteId"
          slot="append"
          @infinite="infiniteHandler"
          force-use-infinite-wrapper=".el-scrollbar__wrap"
        ></infinite-loading>
        <el-table-column prop="Datetime" label="일시" align="center" width="200">
          <template slot-scope="scope">{{ scope.row.Datetime | toMoment }}</template>
        </el-table-column>
        <el-table-column prop="Hname" label="종목" align="center" witdh="200">
          <template slot-scope="scope">{{ scope.row.Hname }}</template>
        </el-table-column>
        <el-table-column prop="CondName" label="구분" align="center" width="200">
          <template slot-scope="scope">
            <el-row>
              <span :class="upOrDown(scope.row)">{{ condName(scope.row) }}</span>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="ConditionName" label="조건" align="right">
          <template slot-scope="scope">
            <el-row>
              <div v-html="condDescs(scope.row)"></div>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="order" label align="center" width="100">
          <template slot-scope="scope">
            <el-button size="mini" plain @click="onOrderClick(scope.row)">
              {{$t('noti.f009')}}
              <!-- 주문 -->
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { _ } from "vue-underscore";
import InfiniteLoading from "vue-infinite-loading";

Vue.use(InfiniteLoading, {
  slots: {
    noMore: "",
    noResults: ""
  }
});

export default {
  components: {
    InfiniteLoading
  },
  data() {
    return {
      /**
       * @property {object} page       페이징 정보
       * @property {array}  history    알림내역 목록
       * @property {array}  pairs      검색 종목 데이터
       * @property {string} searchCode 검색 키워드
       * @property {number} infiniteId vue-infinite-loading 아이디
       */
      page: {},
      history: [],
      pairs: [],
      searchCode: "",
      infiniteId: +new Date()
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
     * @vuex {getter} hogaUnit 호가단위
     * @vuex {getter} getN1001 종목정보
     */
    ...mapGetters(["hogaUnit", "getN1001"])
  },
  methods: {
    /**
     * @vuex {action} fetchNotiSettingHistory 알림 내역 조회 (f0022)
     */
    ...mapActions(["fetchNotiSettingHistory"]),
    /**
     * 검색 종목 쿼리
     * @param   {string} qs 쿼리스트링
     * @param   {function} cb 쿼리 결과 콜백
     */
    queryPairs(qs, cb) {
      let self = this;
      var results = qs
        ? self.pairs.filter(self.queryPairsFilter(qs))
        : self.pairs;
      cb(results);
    },
    /**
     * 검색 종목 쿼리 필터
     * @param {string} qs 쿼리스트링
     * @returns {boolean} 쿼리 결과
     */
    queryPairsFilter(qs) {
      return item => {
        let trgt = item.pair.split("/")[0];
        return trgt.toLowerCase().indexOf(qs.toLowerCase()) > -1;
      };
    },
    /**
     * 동적 css 클래스 : 빨강/파랑
     * @param {object} item 리스트 아이템
     * @returns {string} css 클래스
     */
    upOrDown(item) {
      if (item.CondNo !== "0002") {
        return "";
      }
      return item.CondNo === "0002" && item.Condition3 === "0"
        ? "fluctuation-up"
        : "fluctuation-down";
    },
    /**
     * "구분" 항목 스트링 생성
     * @param {object} item 리스트 아이템
     * @returns {string} "구분" 항목 스트링
     */
    condName(item) {
      let self = this;
      switch (item.CondNo) {
        case "0001":
          return self.$t("noti.f007-0");
        case "0002":
          return item.Condition3 === "0"
            ? self.$t("noti.f007-1")
            : self.$t("noti.f007-2");
        case "0003":
          return self.$t("noti.f007-3");
        default:
          return "-";
      }
    },
    /**
     * "조건" 항목 스트링 생성
     * @param {object} item 리스트 아이템
     * @returns {string} "조건" 항목 스트링
     */
    condDescs(item) {
      let self = this;
      let isEn = self.$i18n.locale === "en";
      switch (item.CondNo) {
        case "0001": {
          let code = item.Hname.slice(-3);
          let price = self.priceFormat(code, item.Condition1 * 1);
          return self.$t("noti.f008-0", [price, code]);
        }
        case "0002": {
          let cond1 =
            item.Condition1 === "60"
              ? isEn
                ? "1 hour"
                : "1시간"
              : item.Condition1 + (isEn ? " mins" : "분");
          let cond2 = item.Condition2;
          let isUp = item.Condition3 === "0";
          return isUp
            ? self.$t("noti.f008-1", [cond1, cond2])
            : self.$t("noti.f008-2", [cond1, cond2]);
        }
        case "0003": {
          return self.$t("noti.f008-3", [item.Condition1, item.Condition2]);
        }
        default:
          return "-";
      }
    },
    /**
     * 호가 단위 포맷
     * @param {string} cd 통화 코드
     * @param {number} prc 가격
     * @returns {string} 호가 단위 포맷 스트링
     */
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

      return UnitManager.fixedDecimalWithCommas(prc, nLenBelowDigitArray[0]);
    },
    /**
     * 리스트 아이템 주문 버튼 클릭 이벤트
     * 심볼과 마켓 저장하고 거래소로 이동
     * @param {object} item 리스트 아이템
     */
    onOrderClick(item) {
      let self = this;
      self.$store.commit("setCurrentSymbol", item.Code);
      sessionStorage.setItem("currentSymbol", item.Code);
      sessionStorage.setItem("selectedMarket", item.Hname.slice(-3));
      self.$router.push({ name: "exchange" });
    },
    onPairSelect(item) {},
    /**
     * 조회 버튼 클릭 이벤트
     * 검색 종목에 따라 param 설정하여 알림내역 조회 -> self.page, self.history 업데이트
     */
    onQueryClick() {
      let self = this;
      var param;

      if (self.searchCode.length > 0) {
        let pair = _.findWhere(self.pairs, { pair: self.searchCode });
        if (!pair) {
          return;
        }
        param = { Code: pair.symbol };
      } else {
        param = {};
      }

      self.fetchNotiSettingHistory(param).then(res => {
        self.infiniteId += 1;
        self.page = res.res;
        self.page = Object.assign(self.page, param);
        self.history = res.list;
      }).catch(self.errAlert);
    },
    /**
     * 검색 대상 종목 리스트 생성
     * 검색 종목에 따라 param 설정하여 알림내역 조회 -> self.page, self.history 업데이트
     * 종목정보에서 o_inst_eng_abbr, o_symbol 만 갖는 배열 생성하여 self.pairs 에 저장
     */
    preparePairs() {
      let self = this;
      self.pairs = self.getN1001.map(item => {
        return {
          pair: item.o_inst_eng_abbr,
          symbol: item.o_symbol
        };
      });
    },
    /**
     * vue-infinite-loading 핸들러
     * @param $state vue-infinite-loading 속성
     * self.page 상태에 따라 param 설정하여 알림내역 조회 요청
     */
    infiniteHandler($state) {
      let self = this;
      if (self.page.NextFlag === "E") {
        $state.reset();
        return;
      }
      let param = {
        NextFlag: self.page.NextFlag,
        NextKey: self.page.NextKey
      };
      self.fetchNotiSettingHistory(param).then(res => {
        self.page = res.res;
        self.history = self.history.concat(res.list);
        if (res.res.NextFlag === "E") {
          $state.complete();
        } else {
          $state.loaded();
        }
      }).catch( errorData => {
        this.$alert(errorData.errMsg, '', {
          confirmButtonText: this.$t('noti.b012')
        });
        $state.complete();
      });
    },
    errAlert(errorData) {
      this.$alert(errorData.errMsg, '', {
        confirmButtonText: this.$t('noti.b012')
      });
    }
  },
  created() {},
  mounted() {
    let self = this;
    self.$EventBus.$emit("pc-navi", [
      { label: self.$t("header.noti"), target: "notificationSetting" },
      { label: self.$t("noti.f001"), target: null }
    ]);

    self.$EventBus.$on("langChange", () => {
      self.$EventBus.$emit("pc-navi", [
        { label: self.$t("header.noti"), target: "notificationSetting" },
        { label: self.$t("noti.f001"), target: null }
      ]);
    });

    if (self.$store.getters.isSocketConnected) {
      self.preparePairs();
    } else {
      self.$EventBus.$on("socketConnected", () => {
        self.preparePairs();
      });
    }
  }
};
</script>