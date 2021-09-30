<template>
  <div class="TdiHistory">
    <el-table :data="history" :empty-text="$t('m_tdi.f008')">
      <!-- 참여 내역이 없습니다. -->
      <infinite-loading
        :identifier="infiniteId"
        slot="append"
        @infinite="infiniteHandler"
        force-use-infinite-wrapper=".el-table__body-wrapper"
      ></infinite-loading>
      <el-table-column prop="base_dtm" :label="$t('m_tdi.f002')" min-width="86px">
        <!-- 일시 -->
        <template slot-scope="scope">
          <p class="date">
            <nl2br tag="p" :text="scope.row.base_dtm | toMoment"/>
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="cur_cd" :label="$t('m_tdi.f003')" min-width="80px">
        <!-- 암호화폐 -->
        <template slot-scope="scope">
          <p class="name">{{$i18n.locale === 'en' ? scope.row.cur_eng_nm : scope.row.cur_nm}}</p>
          <p class="unit">{{scope.row.cur_cd}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="tdi_invo_prc"
        :label="$t('m_tdi.f004') + ' ' + $t('m_tdi.f005')"
        label-class-name="cell_wid"
        align="right"
        min-width="79px"
      >
        <!-- 차수 가격 -->
        <template slot-scope="scope">
          <div class="order">
            <div>{{$t('m_tdi.f009', [scope.row.seq])}}</div>
            <div>{{format(scope.row.tdi_invo_prc)}} TDI</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="tdi_invo_cash" align="right" min-width="115px">
        <!-- 참여수량 참여TDI캐시 -->
        <template slot="header" slot-scope="scope">
          {{$t('m_tdi.f006')}}<br>
          {{$t('m_tdi.f007')}}
        </template>
        <template slot-scope="scope">
          <div :class="{'fs15': formatCoin(scope.row.tdi_invo_qty, scope.row.dec_digt).length > 10 }">
            <div>
              {{formatCoin(scope.row.tdi_invo_qty, scope.row.dec_digt)}}
              <span class="gray_txt">{{scope.row.cur_cd}}</span>
            </div>
            <div>
              {{format(scope.row.tdi_invo_cash)}}
              <span class="gray_txt">TDI</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
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
      return UnitManager.fixedDecimalWithCommas(number, dec_digt);
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