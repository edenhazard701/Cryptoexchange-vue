<template>
  <div class="NotiHistory">
    <!-- 알림 내역 없을 때 -->
    <div v-if="history.length < 1" class="noti-nothing">{{$t('m_noti.a005')}}</div>

    <el-table :data="history" :show-header="false" height="100%">
      <infinite-loading
        :identifier="infiniteId"
        slot="append"
        @infinite="infiniteHandler"
        force-use-infinite-wrapper=".el-table__body-wrapper"
      ></infinite-loading>
      <el-table-column prop="Datetime" :label="$t('m_noti.g010')" align="left" width="75">
        <!-- 일시 -->
        <template slot-scope="scope">
          <span class="date">
            <nl2br tag="p" :text="scope.row.Datetime | toMoment"/>
          </span>
          <!-- <p class="date">{{scope.row.date}}<br>{{scope.row.time}}</p> -->
        </template>
      </el-table-column>
      <el-table-column prop="Hname" :label="$t('m_noti.g008')" align="left" min-width="80">
        <!-- 종목 -->
        <template slot-scope="scope">
          <p class="events">
            {{scope.row.Hname}}
            <span :class="upOrDown(scope.row)">
              <!-- fluctuation_up / fluctuation_down-->
              {{ condName(scope.row) }}
            </span>
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="구분 조건" align="right" min-width="140">
        <!-- 구분 조건 -->
        <template slot-scope="scope">
          <div class="condition">
            <div v-html="condDescs(scope.row)"></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="order" :label="$t('m_noti.g012')" align="center" width="65">
        <!-- 주문 -->
        <template slot-scope="scope">
          <el-button type="text" @click="onOrderClick(scope.row)" class="order_btn">
            {{$t('m_noti.g012')}}
            <!-- 주문 -->
          </el-button>
          <!-- 주문 -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

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
       * @property {number} infiniteId vue-infinite-loading 아이디
       */
      page: {},
      history: [],
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
          let ymd = toFormat.format("YY/MM/DD");
          let hms = toFormat.format("HH:mm");
          return ymd + "\n" + hms;
        } else {
          return "-";
        }
      }
    }
  },
  computed: {
    /**
     * @vuex {getter} hogaUnit 호가단위
     */
    ...mapGetters(["hogaUnit"])
  },
  methods: {
    /**
     * @vuex {action} fetchNotiSettingHistory 알림 내역 조회 (f0022)
     */
    ...mapActions(["fetchNotiSettingHistory"]),
    /**
     * 동적 css 클래스 : 빨강/파랑
     * @param {object} item 리스트 아이템
     * @returns {string} css 클래스
     */
    upOrDown(item) {
      if (item.CondNo !== "0002") {
        return "";
      }
      return item.Condition3 === "0" ? "fluctuation_up" : "fluctuation_down";
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
          return self.$t("m_noti.a002-0");
        case "0002":
          return item.Condition3 === "0"
            ? self.$t("m_noti.a002-1")
            : self.$t("m_noti.a002-2");
        case "0003":
          return self.$t("m_noti.a002-3");
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
          return self.$t("m_noti.a003-0", [price, code]);
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
            ? self.$t("m_noti.a003-1", [cond1, cond2])
            : self.$t("m_noti.a003-2", [cond1, cond2]);
        }
        case "0003": {
          return self.$t("m_noti.a003-3", [item.Condition1, item.Condition2]);
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
     * 심볼과 마켓 저장하고 주문 페이지로 이동
     * @param {object} item 리스트 아이템
     */
    onOrderClick(item) {
      let self = this;
      self.$store.commit("setCurrentSymbol", item.Code);
      sessionStorage.setItem("currentSymbol", item.Code);
      sessionStorage.setItem("selectedMarket", item.Hname.slice(-3));
      self.$router.push({ name: "mOrder" });
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
      }).catch(self.errAlert);
    },
    errAlert(errorData) {
      this.$alert(errorData.errMsg, '', {
          confirmButtonText: this.$t('noti.b012')
      });
    }
  },
  mounted() {}
};
</script>