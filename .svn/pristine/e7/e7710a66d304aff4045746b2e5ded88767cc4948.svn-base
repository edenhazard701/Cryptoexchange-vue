<template>
  <el-row class="TdiList contents">
    <el-col class="tdi-list">
      <h2>
        {{$t('tdi.a002')}}
        <!-- 진행중인 TDI -->
      </h2>
      <div class="el-table">
        <div class="el-table__header-wrapper">
          <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
            <colgroup>
              <col width="110">
              <col width="220">
              <col width="220">
            </colgroup>
            <thead>
              <tr>
                <th>
                  <div class="cell">
                    {{$t('tdi.d003')}}
                    <!-- 암호화폐명 -->
                  </div>
                </th>
                <th>
                  <div class="cell">
                    {{$t('tdi.d004')}}
                    <!-- 차수/가격 -->
                  </div>
                </th>
                <th>
                  <div class="cell">
                    {{$t('tdi.d005')}}
                    <!-- 참여가능수량 -->
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
        <el-table
          ref="tdiList"
          :data="ongoings"
          highlight-current-row
          @current-change="onSelectedChange"
          :show-header="false"
          :empty-text="$t('tdi.b009')"
        >
          <el-table-column :label="$t('tdi.d003')" width="110">
            <!-- 암호화폐명 -->
            <template slot-scope="scope">
              <el-row>
                <el-col class="symbol-logo">
                  <img :src="displayCoinImg(scope.row.cur_cd)">
                </el-col>
                <el-col class="symbol-text">
                  {{$i18n.locale === 'en' ? scope.row.cur_eng_nm : scope.row.cur_nm}}
                  <br>
                  <span class="unit">{{scope.row.cur_cd}}</span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column :label="$t('tdi.d004')" width="220">
            <!-- 차수/가격 -->
            <template slot-scope="scope">
              <span
                :class="[scope.row.proc_stat.slice(-3) !== '진행중' ? '' : 'is-progress']"
              >{{$i18n.locale === 'en' ? scope.row.proc_stat_en : scope.row.proc_stat}}</span>
              <br>
              1 {{scope.row.cur_cd}} = {{format(scope.row.krw_prc)}} TDI
            </template>
          </el-table-column>
          <el-table-column :label="$t('tdi.d005')" align="right" width="220">
            <!-- 참여가능수량 -->
            <template slot-scope="scope">
              {{format(calcAble(scope.row))}} /
              <br>
              {{format(scope.row.hard_cp)}}
              <span class="unit">{{scope.row.cur_cd}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-col>
    <el-col class="tdi-order">
      <div class="login" v-if="!getUserId">
        {{$t('tdi.d029')}}
        <!-- 로그인 후 확인 가능합니다. -->
        <br>
        <el-button type="primary" @click="onLoginClick">
          {{$t('tdi.d030')}}
          <!-- 로그인 -->
        </el-button>
      </div>
      <TdiJoin v-else-if="joinable"></TdiJoin>
      <div class="login" v-else>{{$t('tdi.d027')}}</div>
      <!-- TDI 종료된 코인입니다. -->
    </el-col>
  </el-row>
</template>

<script>
import TdiJoin from "./TdiJoin.vue";
import { mapGetters, mapActions } from "vuex";
import { _ } from "vue-underscore";

export default {
  components: {
    TdiJoin
  },
  data() {
    return {
      /**
       * @property {array}   ongoings 진행중인 목록
       * @property {boolean} joinable 참여가능 여부
       */
      ongoings: [],
      joinable: false
    };
  },
  computed: {
    /**
     * @vuex {getter} getUserId      유저 아이디
     * @vuex {getter} tdiOngoingList 진행중 TDI 목록
     * @vuex {getter} tdiToJoinCurCd 참여하려는 통화코드
     */
    ...mapGetters(["getUserId", "tdiOngoingList", "tdiToJoinCurCd"])
  },
  watch: {
    /**
     * 진행중 TDI 목록 변경되면 업데이트하고, 참여하려는 통화코드가 있으면 선택 처리
     */
    tdiOngoingList(val, old) {
      if (old) {
        let self = this;
        self.ongoings = val;
        if (self.ongoings.length > 0) {
          if (self.tdiToJoinCurCd) {
            self.$refs.tdiList.setCurrentRow(
              _.findWhere(self.ongoings, { cur_cd: self.tdiToJoinCurCd })
            );
          } else {
            self.$refs.tdiList.setCurrentRow(self.ongoings[0]);
          }
        }
      }
    }
  },
  mounted() {
    let self = this;
    self.ongoings = self.tdiOngoingList;
    if (self.ongoings.length > 0) {
      if (self.tdiToJoinCurCd) {
        self.$refs.tdiList.setCurrentRow(
          _.findWhere(self.ongoings, { cur_cd: self.tdiToJoinCurCd })
        );
      } else {
        self.$refs.tdiList.setCurrentRow(self.ongoings[0]);
      }
    }
  },
  methods: {
    /**
     * @vuex {action} fetchTDIMyAble 참여가능 정보 조회 (ac607)
     * @vuex {action} prepareTDIJoin 참여하려는 통화코드 저장
     */
    ...mapActions(["fetchTDIMyAble", "prepareTDIJoin"]),
    /**
     * 로그인 상태가 아닐 때 노출되는 로그인 버튼 클릭 이벤트
     */
    onLoginClick() {
      let self = this;
      self.$router.push({ name: "login" });
    },
    /**
     * 진행중인 TDI 테이블 선택된 행 변경 이벤트
     * 진행상태가 "진행중"인 통화일때 참여가능 정보를 조회하여 참여하기 컴포넌트에 전달
     */
    onSelectedChange(cur, old) {
      let self = this;
      self.prepareTDIJoin(cur.cur_cd);

      if (cur.proc_stat.slice(-3) === "진행중") {
        self.joinable = true;
        self.fetchTDIMyAble({ cur_cd: cur.cur_cd, seq: cur.seq }).then(res => {
          self.$EventBus.$emit("ableOnSelect", res);
        });
      } else {
        self.joinable = false;
      }
    },
    /**
     * 코인 이미지 표시
     * @param {string} symbol 통화코드
     */
    displayCoinImg(symbol) {
      let coin = symbol.toLowerCase();
      let coinData = this.$store.state.data.coinImage;
      let coinURLArray = Object.values(coinData);
      let coinArrIdx = Object.keys(coinData).indexOf(coin);
      if (coinArrIdx < 0) {
        return require("@/images/coin/default.png");
      } else {
        return coinURLArray[coinArrIdx];
      }
    },
    /**
     * 수량 콤마 포맷
     * @param {number} number 수량
     * @returns {string} 포맷 스트링
     */
    format(number) {
      let self = this;
      return UnitManager.numberWithCommas(number);
    },
    /**
     * 참여가능 수량 계산
     * @param {object} row 진행중인 목록 아이템
     */
    calcAble(row) {
      var mod = Math.pow(10, 8);
      return (row.hard_cp * mod - row.invo_qty * mod) / mod;
    }
  }
};
</script>