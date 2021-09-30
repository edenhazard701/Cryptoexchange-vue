<template>
  <div class="TdiHistory contents">
    <div class="el-table">
      <div class="el-table__header-wrapper">
        <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
          <colgroup>
            <col width="150">
            <col width="150">
            <col width="80">
            <col width="240">
            <col width="240">
            <col width="240">
          </colgroup>
          <thead>
            <tr>
              <th>
                <div class="cell">
                  {{$t('tdi.e002')}}
                  <!-- 일시 -->
                </div>
              </th>
              <th>
                <div class="cell">
                  {{$t('tdi.e003')}}
                  <!-- 암호화폐 -->
                </div>
              </th>
              <th>
                <div class="cell">
                  {{$t('tdi.e004-0')}}
                  <!-- 차수 -->
                </div>
              </th>
              <th>
                <div class="cell">
                  {{$t('tdi.e005')}}
                  <!-- 가격 -->
                </div>
              </th>
              <th>
                <div class="cell">
                  {{$t('tdi.e006')}}
                  <!-- 참여 수량 -->
                </div>
              </th>
              <th>
                <div class="cell">
                  {{$t('tdi.e007')}}
                  <!-- 참여 TDI 캐시 -->
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>

    <el-scrollbar
      wrap-class="scrollbar-wrapper"
      :native="false"
      :class="{'is-scroll': history.length >= 10}"
    >
      <el-table
        :empty-text="$t('tdi.e010')"
        :data="history"
        stripe
        class="border"
        :show-header="false"
      >
        <infinite-loading
          :identifier="infiniteId"
          slot="append"
          @infinite="infiniteHandler"
          force-use-infinite-wrapper=".el-scrollbar__wrap"
        ></infinite-loading>
        <el-table-column prop="base_dtm" label="일시" align="center" width="150">
          <template slot-scope="scope">{{scope.row.base_dtm | toMoment}}</template>
        </el-table-column>
        <el-table-column prop="cur_cd" label="암호화폐" align="center" width="150">
          <template slot-scope="scope">
            {{$i18n.locale === 'en' ? scope.row.cur_eng_nm : scope.row.cur_nm}}
            <span
              class="unit"
            >{{scope.row.cur_cd}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="seq" label="차수" align="center" width="80">
          <template slot-scope="scope">{{$t('tdi.e004-1', [scope.row.seq])}}</template>
        </el-table-column>
        <el-table-column prop="tdi_invo_prc" label="가격" align="right" width="240">
          <template slot-scope="scope">
            1
            <span class="unit">{{scope.row.cur_cd}}</span>
            = {{format(scope.row.tdi_invo_prc)}}
            <span class="unit">TDI</span>
          </template>
        </el-table-column>
        <el-table-column prop="tdi_invo_qty" label="참여수량" align="right" width="240">
          <template slot-scope="scope">
            {{formatCoin(scope.row.tdi_invo_qty, scope.row.dec_digt)}}
            <span
              class="unit"
            >{{scope.row.cur_cd}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tdi_invo_cash" label="참여 TDI 캐시" align="right" width="240">
          <template slot-scope="scope">
            {{format(scope.row.tdi_invo_cash)}}
            <span class="unit">TDI</span>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";

Vue.use(InfiniteLoading, {
  slots: {
    noMore: "",
    noResults: ""
  }
});

export default {
  data() {
    return {
      /**
       * @property {array}  nextKey    다음조회키
       * @property {array}  history    참여내역
       * @property {number} infiniteId vue-infinite-loading 아이디
       */
      nextKey: null,
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
          return toFormat.format("YYYY.MM.DD HH:mm:ss");
        } else {
          return "-";
        }
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * @vuex {action} fetchTDIJoinedList TDI 참여내역 조회 (ac608)
     */
    ...mapActions(["fetchTDIJoinedList"]),
    /**
     * 수량 콤마 포맷
     * @param {number} number 수량
     * @returns {string} 포맷 스트링
     */
    format(number) {
      return UnitManager.numberWithCommas(number);
    },
    /**
     * 코인 수량 포맷
     * 소수점자릿수 기준 소수점 고정, 콤마 포맷
     * @param {number} number   수량
     * @param {number} dec_digt 소수점자릿수
     * @returns {string} 포맷 스트링
     */
    formatCoin(number, dec_digt) {
      return UnitManager.flooredDecimalWithCommas(number, dec_digt);
    },
    /**
     * vue-infinite-loading 핸들러
     * @param $state vue-infinite-loading 속성
     * self.nextKey 로 param 설정하여 참여내역 조회 요청
     */
    infiniteHandler($state) {
      let self = this;

      let param = {
        next_key: self.nextKey
      };

      self.fetchTDIJoinedList(param).then(res => {
        self.nextKey = res.next_key;
        self.history = self.history.concat(res.list);
        if (res.next_key) {
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    }
  },
  mounted() {}
};
</script>