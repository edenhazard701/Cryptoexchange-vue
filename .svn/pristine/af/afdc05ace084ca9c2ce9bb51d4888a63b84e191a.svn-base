<template>
  <div class="TdiIntro">
    <!-- TDI 소개 -->
    <div class="tdi_info">
      <div class="info_area">
        <p class="tdi_title">
          <span class="big">TDI</span>Trade - driven ICO
        </p>
        <p class="txt">
          {{$t('m_tdi.a004-1', [rate])}}
          <!-- 수수료 {{rate}}%를 TDI 캐시로 드립니다! TDI 캐시로<br>코인 ICO에 참여해보세요! -->
          <span class="caution">
            {{$t('m_tdi.a006')}}
            <!-- ※ 참여 코인은 TDI 종료 후 바로 상장됩니다. -->
          </span>
        </p>
        <el-button type="text" @click="goIntro()">
          {{$t('m_tdi.a007')}}
          <!-- TDI 소개 -->
        </el-button>
      </div>
    </div>

    <!-- 보유 캐시 -->
    <div class="hasCash">
      <div class="hasCash_title">
        {{$t('m_tdi.b001')}}
        <!-- 보유캐시 -->
        <el-button class="text-btn question-btn" @click="viewInfo">
          <i class="el-icon-question"></i>
        </el-button>
      </div>
      <div class="hasCash_number">
        <span class="number">{{ format(tdiCash) }}</span> TDI
      </div>
    </div>

    <!-- 진행중인 TDI -->
    <div class="tdi_proceed">
      <strong class="bullet-tit-type01">
        {{$t('m_tdi.b004')}}
        <!-- 진행중인 TDI -->
      </strong>
      <el-table
        :data="ongoings"
        :show-header="false"
        @row-click="onTdiClick"
        class="tdi_table"
        :empty-text="$t('m_tdi.b008')"
      >
        <!-- TDI 진행중인 코인이 없습니다. -->
        <el-table-column min-width="120">
          <template slot-scope="scope">
            <div class="tdi_name_wrap">
              <div class="img">
                <img :src="displayCoinImg(scope.row.cur_cd)">
              </div>
              <div class="cont">
                <p class="name">{{$i18n.locale === 'en' ? scope.row.cur_eng_nm : scope.row.cur_nm}}</p>
                <p class="unit">{{scope.row.cur_cd}}</p>
                <p class="price">
                  {{scope.row.krw_prc}}
                  <span class="gray">TDI</span>
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="72">
          <template slot-scope="scope">
            <div class="state proceed">
              <p class="label">
                {{$t('m_tdi.c011')}}
                <!-- 기간 -->
              </p>
              <p
                class="state_txt"
              >{{$i18n.locale === 'en' ? scope.row.proc_stat_en : scope.row.proc_stat }}</p>
              <p class="period">~ {{scope.row.to_dt | toMoment}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="90">
          <template slot-scope="scope">
            <div class="remaining">
              <p class="label">
                {{$t('m_tdi.b006')}}
                <!-- 잔여수량 -->
              </p>
              <p
                class="amount"
                :class="chkStrLength(format(calcAble(scope.row)))"
              >{{format(calcAble(scope.row))}}</p>
              <p v-if="scope.row.list_stat" class="confirm">
                <span>
                  {{$t('m_tdi.c002')}}
                  <!-- 상장확정 -->
                </span>
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="78">
          <template slot-scope="scope">
            <div class="graph">
              <div class="c100" :class="progressRateClass(scope.row)">
                <!-- 개발 참고 : p0 p1 p2 ..  ~ p100까지 %에 따라 class 변경필요 -->
                <span>{{ progressRate(scope.row) }} %</span>
                <div class="slice">
                  <div class="bar"></div>
                  <div class="fill"></div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- TDI History -->
    <div class="tdi_history">
      <strong class="bullet-tit-type01 link" @click="onHistoryClick()">
        {{$t('m_tdi.e001')}}
        <!-- TDI 히스토리 -->
      </strong>
      <MTdiHistoryListCont></MTdiHistoryListCont>
    </div>
  </div>
</template>

<script>
import MTdiHistoryListCont from "./TdiHistoryListCont.vue";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { _ } from "vue-underscore";

export default {
  components: {
    MTdiHistoryListCont
  },
  data() {
    return {
      /**
       * @property {number} rate        이벤트 적용비율
       * @property {array}  allTDIs     전체 TDI 목록
       * @property {array}  ongoingList 진행중인 TDI 목록
       */
      rate: 100,
      allTDIs: [],
      ongoings: []
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
  computed: {
    /**
     * @vuex {getter} tdiCash        TDI 보유캐쉬
     * @vuex {getter} tdiOngoingList 진행중 TDI 목록
     * @vuex {getter} tdiList        전체 TDI 목록
     * @vuex {getter} tdiRate        이벤트 적용 비율
     */
    ...mapGetters(["tdiCash", "tdiOngoingList", "tdiList", "tdiRate"])
  },
  methods: {
    /**
     * @vuex {action} fetchTDIDetail TDI 상세 정보 조회 (ac610)
     * @vuex {action} selectTDI      상세 TDI 정보 저장
     */
    ...mapActions(["fetchTDIDetail", "selectTDI"]),
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
     * 진행율 계산
     * @param {object} item 목록 아이템
     * @returns {number} 진행율
     */
    progressRate(item) {
      const rate = ((item.invo_qty / item.hard_cp) * 100).toFixed(2) * 1;
      return rate;
    },
    /**
     * 진행율 파이 그래프 css 클래스
     * @param {object} item 목록 아이템
     * @returns {string} css 클래스
     */
    progressRateClass(item) {
      let rate = (item.invo_qty / item.hard_cp) * 100;
      if (rate <= 1.0 && rate > 0.0) {
        return "p1";
      } else if (rate > 1.0) {
        if (rate >= 99.0 && rate < 100.0) {
          return "p99";
        } else {
          return "p" + rate.toFixed(0);
        }
      } else {
        return "p0";
      }
    },
    /**
     * TDI 소개 버튼 클릭 이벤트 - 소개 페이지로 이동
     */
    goIntro() {
      const self = this;
      self.$router.push({ name: "mTdiIntroduce" });
    },
    /**
     * 유의사항 팝업 노출
     */
    viewInfo() {
      const self = this;
      self.$alert(this.$t("m_tdi.b002"), "", {
        confirmButtonText: self.$t("m_tdi.b003")
      });
    },
    /**
     * 목록 아이템 클릭 이벤트
     * 상세 정보 조회 결과와 목록 아이템 데이터를 병합하여 저장하고 상세 페이지로 이동
     */
    onTdiClick(row, event, column) {
      let self = this;
      self.fetchTDIDetail({ cur_cd: row.cur_cd }).then(
        res => {
          let tdi = Object.assign(
            res,
            _.findWhere(self.allTDIs, { cur_cd: row.cur_cd })
          );
          self.selectTDI(tdi);
          self.$router.push({ name: "mTdiCoinDetail" });
        },
        error => {
          self.$alert(error.errMsg, { confirmButtonText: "확인" });
        }
      );
    },
    /**
     * 수량 콤마 포맷
     * @param {number} number 수량
     * @returns {string} 포맷 스트링
     */
    format(number) {
      return UnitManager.numberWithCommas(number);
    },
    onHistoryClick() {
      let self = this;
      self.$router.push({
        name: "mTdiHistory",
        params: { allTDIs: self.allTDIs }
      });
    },
    /**
     * 참여가능 수량 계산
     * @param {object} row 목록 아이템
     */
    calcAble(row) {
      const mod = Math.pow(10, 8);
      return (row.hard_cp * mod - row.invo_qty * mod) / mod;
    },
    /**
     * 출력될 길이 대비 폰트 사이즈 조절
     * @param {string} _srt 포맷 스트링
     * @returns {string} css 클래스
     */
    chkStrLength(_srt) {
      const length = _srt.length;
      if (length > 11) {
        return "fs11";
      }
    }
  },
  watch: {
    /**
     * vuex - tdiOngoingList 변경되면 self.ongoings, self.rate 업데이트
     */
    tdiOngoingList(val, old) {
      let self = this;
      self.ongoings = val;
      self.rate = self.tdiRate;
    },
    /**
     * vuex - tdiList 변경되면 self.allTDIs 업데이트
     */
    tdiList(val, old) {
      let self = this;
      self.allTDIs = val;
    }
  },
  mounted() {
    let self = this;
    self.ongoings = self.tdiOngoingList;
    self.allTDIs = self.tdiList;
    self.rate = self.tdiRate;
  }
};
</script>

<style scoped>
.c100.p51 .slice,
.c100.p52 .slice,
.c100.p53 .slice,
.c100.p54 .slice,
.c100.p55 .slice,
.c100.p56 .slice,
.c100.p57 .slice,
.c100.p58 .slice,
.c100.p59 .slice,
.c100.p60 .slice,
.c100.p61 .slice,
.c100.p62 .slice,
.c100.p63 .slice,
.c100.p64 .slice,
.c100.p65 .slice,
.c100.p66 .slice,
.c100.p67 .slice,
.c100.p68 .slice,
.c100.p69 .slice,
.c100.p70 .slice,
.c100.p71 .slice,
.c100.p72 .slice,
.c100.p73 .slice,
.c100.p74 .slice,
.c100.p75 .slice,
.c100.p76 .slice,
.c100.p77 .slice,
.c100.p78 .slice,
.c100.p79 .slice,
.c100.p80 .slice,
.c100.p81 .slice,
.c100.p82 .slice,
.c100.p83 .slice,
.c100.p84 .slice,
.c100.p85 .slice,
.c100.p86 .slice,
.c100.p87 .slice,
.c100.p88 .slice,
.c100.p89 .slice,
.c100.p90 .slice,
.c100.p91 .slice,
.c100.p92 .slice,
.c100.p93 .slice,
.c100.p94 .slice,
.c100.p95 .slice,
.c100.p96 .slice,
.c100.p97 .slice,
.c100.p98 .slice,
.c100.p99 .slice,
.c100.p100 .slice {
  clip: rect(auto, auto, auto, auto);
}
.c100 .bar,
.c100.p51 .fill,
.c100.p52 .fill,
.c100.p53 .fill,
.c100.p54 .fill,
.c100.p55 .fill,
.c100.p56 .fill,
.c100.p57 .fill,
.c100.p58 .fill,
.c100.p59 .fill,
.c100.p60 .fill,
.c100.p61 .fill,
.c100.p62 .fill,
.c100.p63 .fill,
.c100.p64 .fill,
.c100.p65 .fill,
.c100.p66 .fill,
.c100.p67 .fill,
.c100.p68 .fill,
.c100.p69 .fill,
.c100.p70 .fill,
.c100.p71 .fill,
.c100.p72 .fill,
.c100.p73 .fill,
.c100.p74 .fill,
.c100.p75 .fill,
.c100.p76 .fill,
.c100.p77 .fill,
.c100.p78 .fill,
.c100.p79 .fill,
.c100.p80 .fill,
.c100.p81 .fill,
.c100.p82 .fill,
.c100.p83 .fill,
.c100.p84 .fill,
.c100.p85 .fill,
.c100.p86 .fill,
.c100.p87 .fill,
.c100.p88 .fill,
.c100.p89 .fill,
.c100.p90 .fill,
.c100.p91 .fill,
.c100.p92 .fill,
.c100.p93 .fill,
.c100.p94 .fill,
.c100.p95 .fill,
.c100.p96 .fill,
.c100.p97 .fill,
.c100.p98 .fill,
.c100.p99 .fill,
.c100.p100 .fill {
  position: absolute;
  border: 2px solid #ff9800;
  width: 46px;
  height: 46px;
  clip: rect(0em, 0.5em, 1em, 0em);
  border-radius: 50%;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
}
.c100.p51 .bar:after,
.c100.p51 .fill,
.c100.p52 .bar:after,
.c100.p52 .fill,
.c100.p53 .bar:after,
.c100.p53 .fill,
.c100.p54 .bar:after,
.c100.p54 .fill,
.c100.p55 .bar:after,
.c100.p55 .fill,
.c100.p56 .bar:after,
.c100.p56 .fill,
.c100.p57 .bar:after,
.c100.p57 .fill,
.c100.p58 .bar:after,
.c100.p58 .fill,
.c100.p59 .bar:after,
.c100.p59 .fill,
.c100.p60 .bar:after,
.c100.p60 .fill,
.c100.p61 .bar:after,
.c100.p61 .fill,
.c100.p62 .bar:after,
.c100.p62 .fill,
.c100.p63 .bar:after,
.c100.p63 .fill,
.c100.p64 .bar:after,
.c100.p64 .fill,
.c100.p65 .bar:after,
.c100.p65 .fill,
.c100.p66 .bar:after,
.c100.p66 .fill,
.c100.p67 .bar:after,
.c100.p67 .fill,
.c100.p68 .bar:after,
.c100.p68 .fill,
.c100.p69 .bar:after,
.c100.p69 .fill,
.c100.p70 .bar:after,
.c100.p70 .fill,
.c100.p71 .bar:after,
.c100.p71 .fill,
.c100.p72 .bar:after,
.c100.p72 .fill,
.c100.p73 .bar:after,
.c100.p73 .fill,
.c100.p74 .bar:after,
.c100.p74 .fill,
.c100.p75 .bar:after,
.c100.p75 .fill,
.c100.p76 .bar:after,
.c100.p76 .fill,
.c100.p77 .bar:after,
.c100.p77 .fill,
.c100.p78 .bar:after,
.c100.p78 .fill,
.c100.p79 .bar:after,
.c100.p79 .fill,
.c100.p80 .bar:after,
.c100.p80 .fill,
.c100.p81 .bar:after,
.c100.p81 .fill,
.c100.p82 .bar:after,
.c100.p82 .fill,
.c100.p83 .bar:after,
.c100.p83 .fill,
.c100.p84 .bar:after,
.c100.p84 .fill,
.c100.p85 .bar:after,
.c100.p85 .fill,
.c100.p86 .bar:after,
.c100.p86 .fill,
.c100.p87 .bar:after,
.c100.p87 .fill,
.c100.p88 .bar:after,
.c100.p88 .fill,
.c100.p89 .bar:after,
.c100.p89 .fill,
.c100.p90 .bar:after,
.c100.p90 .fill,
.c100.p91 .bar:after,
.c100.p91 .fill,
.c100.p92 .bar:after,
.c100.p92 .fill,
.c100.p93 .bar:after,
.c100.p93 .fill,
.c100.p94 .bar:after,
.c100.p94 .fill,
.c100.p95 .bar:after,
.c100.p95 .fill,
.c100.p96 .bar:after,
.c100.p96 .fill,
.c100.p97 .bar:after,
.c100.p97 .fill,
.c100.p98 .bar:after,
.c100.p98 .fill,
.c100.p99 .bar:after,
.c100.p99 .fill,
.c100.p100 .bar:after,
.c100.p100 .fill {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
}
.c100 {
  position: relative;
  font-size: 50px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #eee;
}
.c100 *,
.c100 *:before,
.c100 *:after {
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}
.c100 > span {
  display: block;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  line-height: 50px;
  font-size: 12px;
  color: #ff9800;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
}
.c100:after {
  display: block;
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  border-radius: 50%;
  background-color: #fff;
  width: 46px;
  height: 46px;
}
.c100 .slice {
  position: absolute;
  width: 1em;
  height: 1em;
  clip: rect(0em, 1em, 1em, 0.5em);
}
.c100.p1 .bar {
  -webkit-transform: rotate(3.6deg);
  -moz-transform: rotate(3.6deg);
  -ms-transform: rotate(3.6deg);
  -o-transform: rotate(3.6deg);
  transform: rotate(3.6deg);
}
.c100.p2 .bar {
  -webkit-transform: rotate(7.2deg);
  -moz-transform: rotate(7.2deg);
  -ms-transform: rotate(7.2deg);
  -o-transform: rotate(7.2deg);
  transform: rotate(7.2deg);
}
.c100.p3 .bar {
  -webkit-transform: rotate(10.8deg);
  -moz-transform: rotate(10.8deg);
  -ms-transform: rotate(10.8deg);
  -o-transform: rotate(10.8deg);
  transform: rotate(10.8deg);
}
.c100.p4 .bar {
  -webkit-transform: rotate(14.4deg);
  -moz-transform: rotate(14.4deg);
  -ms-transform: rotate(14.4deg);
  -o-transform: rotate(14.4deg);
  transform: rotate(14.4deg);
}
.c100.p5 .bar {
  -webkit-transform: rotate(18deg);
  -moz-transform: rotate(18deg);
  -ms-transform: rotate(18deg);
  -o-transform: rotate(18deg);
  transform: rotate(18deg);
}
.c100.p6 .bar {
  -webkit-transform: rotate(21.6deg);
  -moz-transform: rotate(21.6deg);
  -ms-transform: rotate(21.6deg);
  -o-transform: rotate(21.6deg);
  transform: rotate(21.6deg);
}
.c100.p7 .bar {
  -webkit-transform: rotate(25.2deg);
  -moz-transform: rotate(25.2deg);
  -ms-transform: rotate(25.2deg);
  -o-transform: rotate(25.2deg);
  transform: rotate(25.2deg);
}
.c100.p8 .bar {
  -webkit-transform: rotate(28.8deg);
  -moz-transform: rotate(28.8deg);
  -ms-transform: rotate(28.8deg);
  -o-transform: rotate(28.8deg);
  transform: rotate(28.8deg);
}
.c100.p9 .bar {
  -webkit-transform: rotate(32.4deg);
  -moz-transform: rotate(32.4deg);
  -ms-transform: rotate(32.4deg);
  -o-transform: rotate(32.4deg);
  transform: rotate(32.4deg);
}
.c100.p10 .bar {
  -webkit-transform: rotate(36deg);
  -moz-transform: rotate(36deg);
  -ms-transform: rotate(36deg);
  -o-transform: rotate(36deg);
  transform: rotate(36deg);
}
.c100.p11 .bar {
  -webkit-transform: rotate(39.6deg);
  -moz-transform: rotate(39.6deg);
  -ms-transform: rotate(39.6deg);
  -o-transform: rotate(39.6deg);
  transform: rotate(39.6deg);
}
.c100.p12 .bar {
  -webkit-transform: rotate(43.2deg);
  -moz-transform: rotate(43.2deg);
  -ms-transform: rotate(43.2deg);
  -o-transform: rotate(43.2deg);
  transform: rotate(43.2deg);
}
.c100.p13 .bar {
  -webkit-transform: rotate(46.800000000000004deg);
  -moz-transform: rotate(46.800000000000004deg);
  -ms-transform: rotate(46.800000000000004deg);
  -o-transform: rotate(46.800000000000004deg);
  transform: rotate(46.800000000000004deg);
}
.c100.p14 .bar {
  -webkit-transform: rotate(50.4deg);
  -moz-transform: rotate(50.4deg);
  -ms-transform: rotate(50.4deg);
  -o-transform: rotate(50.4deg);
  transform: rotate(50.4deg);
}
.c100.p15 .bar {
  -webkit-transform: rotate(54deg);
  -moz-transform: rotate(54deg);
  -ms-transform: rotate(54deg);
  -o-transform: rotate(54deg);
  transform: rotate(54deg);
}
.c100.p16 .bar {
  -webkit-transform: rotate(57.6deg);
  -moz-transform: rotate(57.6deg);
  -ms-transform: rotate(57.6deg);
  -o-transform: rotate(57.6deg);
  transform: rotate(57.6deg);
}
.c100.p17 .bar {
  -webkit-transform: rotate(61.2deg);
  -moz-transform: rotate(61.2deg);
  -ms-transform: rotate(61.2deg);
  -o-transform: rotate(61.2deg);
  transform: rotate(61.2deg);
}
.c100.p18 .bar {
  -webkit-transform: rotate(64.8deg);
  -moz-transform: rotate(64.8deg);
  -ms-transform: rotate(64.8deg);
  -o-transform: rotate(64.8deg);
  transform: rotate(64.8deg);
}
.c100.p19 .bar {
  -webkit-transform: rotate(68.4deg);
  -moz-transform: rotate(68.4deg);
  -ms-transform: rotate(68.4deg);
  -o-transform: rotate(68.4deg);
  transform: rotate(68.4deg);
}
.c100.p20 .bar {
  -webkit-transform: rotate(72deg);
  -moz-transform: rotate(72deg);
  -ms-transform: rotate(72deg);
  -o-transform: rotate(72deg);
  transform: rotate(72deg);
}
.c100.p21 .bar {
  -webkit-transform: rotate(75.60000000000001deg);
  -moz-transform: rotate(75.60000000000001deg);
  -ms-transform: rotate(75.60000000000001deg);
  -o-transform: rotate(75.60000000000001deg);
  transform: rotate(75.60000000000001deg);
}
.c100.p22 .bar {
  -webkit-transform: rotate(79.2deg);
  -moz-transform: rotate(79.2deg);
  -ms-transform: rotate(79.2deg);
  -o-transform: rotate(79.2deg);
  transform: rotate(79.2deg);
}
.c100.p23 .bar {
  -webkit-transform: rotate(82.8deg);
  -moz-transform: rotate(82.8deg);
  -ms-transform: rotate(82.8deg);
  -o-transform: rotate(82.8deg);
  transform: rotate(82.8deg);
}
.c100.p24 .bar {
  -webkit-transform: rotate(86.4deg);
  -moz-transform: rotate(86.4deg);
  -ms-transform: rotate(86.4deg);
  -o-transform: rotate(86.4deg);
  transform: rotate(86.4deg);
}
.c100.p25 .bar {
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  transform: rotate(90deg);
}
.c100.p26 .bar {
  -webkit-transform: rotate(93.60000000000001deg);
  -moz-transform: rotate(93.60000000000001deg);
  -ms-transform: rotate(93.60000000000001deg);
  -o-transform: rotate(93.60000000000001deg);
  transform: rotate(93.60000000000001deg);
}
.c100.p27 .bar {
  -webkit-transform: rotate(97.2deg);
  -moz-transform: rotate(97.2deg);
  -ms-transform: rotate(97.2deg);
  -o-transform: rotate(97.2deg);
  transform: rotate(97.2deg);
}
.c100.p28 .bar {
  -webkit-transform: rotate(100.8deg);
  -moz-transform: rotate(100.8deg);
  -ms-transform: rotate(100.8deg);
  -o-transform: rotate(100.8deg);
  transform: rotate(100.8deg);
}
.c100.p29 .bar {
  -webkit-transform: rotate(104.4deg);
  -moz-transform: rotate(104.4deg);
  -ms-transform: rotate(104.4deg);
  -o-transform: rotate(104.4deg);
  transform: rotate(104.4deg);
}
.c100.p30 .bar {
  -webkit-transform: rotate(108deg);
  -moz-transform: rotate(108deg);
  -ms-transform: rotate(108deg);
  -o-transform: rotate(108deg);
  transform: rotate(108deg);
}
.c100.p31 .bar {
  -webkit-transform: rotate(111.60000000000001deg);
  -moz-transform: rotate(111.60000000000001deg);
  -ms-transform: rotate(111.60000000000001deg);
  -o-transform: rotate(111.60000000000001deg);
  transform: rotate(111.60000000000001deg);
}
.c100.p32 .bar {
  -webkit-transform: rotate(115.2deg);
  -moz-transform: rotate(115.2deg);
  -ms-transform: rotate(115.2deg);
  -o-transform: rotate(115.2deg);
  transform: rotate(115.2deg);
}
.c100.p33 .bar {
  -webkit-transform: rotate(118.8deg);
  -moz-transform: rotate(118.8deg);
  -ms-transform: rotate(118.8deg);
  -o-transform: rotate(118.8deg);
  transform: rotate(118.8deg);
}
.c100.p34 .bar {
  -webkit-transform: rotate(122.4deg);
  -moz-transform: rotate(122.4deg);
  -ms-transform: rotate(122.4deg);
  -o-transform: rotate(122.4deg);
  transform: rotate(122.4deg);
}
.c100.p35 .bar {
  -webkit-transform: rotate(126deg);
  -moz-transform: rotate(126deg);
  -ms-transform: rotate(126deg);
  -o-transform: rotate(126deg);
  transform: rotate(126deg);
}
.c100.p36 .bar {
  -webkit-transform: rotate(129.6deg);
  -moz-transform: rotate(129.6deg);
  -ms-transform: rotate(129.6deg);
  -o-transform: rotate(129.6deg);
  transform: rotate(129.6deg);
}
.c100.p37 .bar {
  -webkit-transform: rotate(133.20000000000002deg);
  -moz-transform: rotate(133.20000000000002deg);
  -ms-transform: rotate(133.20000000000002deg);
  -o-transform: rotate(133.20000000000002deg);
  transform: rotate(133.20000000000002deg);
}
.c100.p38 .bar {
  -webkit-transform: rotate(136.8deg);
  -moz-transform: rotate(136.8deg);
  -ms-transform: rotate(136.8deg);
  -o-transform: rotate(136.8deg);
  transform: rotate(136.8deg);
}
.c100.p39 .bar {
  -webkit-transform: rotate(140.4deg);
  -moz-transform: rotate(140.4deg);
  -ms-transform: rotate(140.4deg);
  -o-transform: rotate(140.4deg);
  transform: rotate(140.4deg);
}
.c100.p40 .bar {
  -webkit-transform: rotate(144deg);
  -moz-transform: rotate(144deg);
  -ms-transform: rotate(144deg);
  -o-transform: rotate(144deg);
  transform: rotate(144deg);
}
.c100.p41 .bar {
  -webkit-transform: rotate(147.6deg);
  -moz-transform: rotate(147.6deg);
  -ms-transform: rotate(147.6deg);
  -o-transform: rotate(147.6deg);
  transform: rotate(147.6deg);
}
.c100.p42 .bar {
  -webkit-transform: rotate(151.20000000000002deg);
  -moz-transform: rotate(151.20000000000002deg);
  -ms-transform: rotate(151.20000000000002deg);
  -o-transform: rotate(151.20000000000002deg);
  transform: rotate(151.20000000000002deg);
}
.c100.p43 .bar {
  -webkit-transform: rotate(154.8deg);
  -moz-transform: rotate(154.8deg);
  -ms-transform: rotate(154.8deg);
  -o-transform: rotate(154.8deg);
  transform: rotate(154.8deg);
}
.c100.p44 .bar {
  -webkit-transform: rotate(158.4deg);
  -moz-transform: rotate(158.4deg);
  -ms-transform: rotate(158.4deg);
  -o-transform: rotate(158.4deg);
  transform: rotate(158.4deg);
}
.c100.p45 .bar {
  -webkit-transform: rotate(162deg);
  -moz-transform: rotate(162deg);
  -ms-transform: rotate(162deg);
  -o-transform: rotate(162deg);
  transform: rotate(162deg);
}
.c100.p46 .bar {
  -webkit-transform: rotate(165.6deg);
  -moz-transform: rotate(165.6deg);
  -ms-transform: rotate(165.6deg);
  -o-transform: rotate(165.6deg);
  transform: rotate(165.6deg);
}
.c100.p47 .bar {
  -webkit-transform: rotate(169.20000000000002deg);
  -moz-transform: rotate(169.20000000000002deg);
  -ms-transform: rotate(169.20000000000002deg);
  -o-transform: rotate(169.20000000000002deg);
  transform: rotate(169.20000000000002deg);
}
.c100.p48 .bar {
  -webkit-transform: rotate(172.8deg);
  -moz-transform: rotate(172.8deg);
  -ms-transform: rotate(172.8deg);
  -o-transform: rotate(172.8deg);
  transform: rotate(172.8deg);
}
.c100.p49 .bar {
  -webkit-transform: rotate(176.4deg);
  -moz-transform: rotate(176.4deg);
  -ms-transform: rotate(176.4deg);
  -o-transform: rotate(176.4deg);
  transform: rotate(176.4deg);
}
.c100.p50 .bar {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
}
.c100.p51 .bar {
  -webkit-transform: rotate(183.6deg);
  -moz-transform: rotate(183.6deg);
  -ms-transform: rotate(183.6deg);
  -o-transform: rotate(183.6deg);
  transform: rotate(183.6deg);
}
.c100.p52 .bar {
  -webkit-transform: rotate(187.20000000000002deg);
  -moz-transform: rotate(187.20000000000002deg);
  -ms-transform: rotate(187.20000000000002deg);
  -o-transform: rotate(187.20000000000002deg);
  transform: rotate(187.20000000000002deg);
}
.c100.p53 .bar {
  -webkit-transform: rotate(190.8deg);
  -moz-transform: rotate(190.8deg);
  -ms-transform: rotate(190.8deg);
  -o-transform: rotate(190.8deg);
  transform: rotate(190.8deg);
}
.c100.p54 .bar {
  -webkit-transform: rotate(194.4deg);
  -moz-transform: rotate(194.4deg);
  -ms-transform: rotate(194.4deg);
  -o-transform: rotate(194.4deg);
  transform: rotate(194.4deg);
}
.c100.p55 .bar {
  -webkit-transform: rotate(198deg);
  -moz-transform: rotate(198deg);
  -ms-transform: rotate(198deg);
  -o-transform: rotate(198deg);
  transform: rotate(198deg);
}
.c100.p56 .bar {
  -webkit-transform: rotate(201.6deg);
  -moz-transform: rotate(201.6deg);
  -ms-transform: rotate(201.6deg);
  -o-transform: rotate(201.6deg);
  transform: rotate(201.6deg);
}
.c100.p57 .bar {
  -webkit-transform: rotate(205.20000000000002deg);
  -moz-transform: rotate(205.20000000000002deg);
  -ms-transform: rotate(205.20000000000002deg);
  -o-transform: rotate(205.20000000000002deg);
  transform: rotate(205.20000000000002deg);
}
.c100.p58 .bar {
  -webkit-transform: rotate(208.8deg);
  -moz-transform: rotate(208.8deg);
  -ms-transform: rotate(208.8deg);
  -o-transform: rotate(208.8deg);
  transform: rotate(208.8deg);
}
.c100.p59 .bar {
  -webkit-transform: rotate(212.4deg);
  -moz-transform: rotate(212.4deg);
  -ms-transform: rotate(212.4deg);
  -o-transform: rotate(212.4deg);
  transform: rotate(212.4deg);
}
.c100.p60 .bar {
  -webkit-transform: rotate(216deg);
  -moz-transform: rotate(216deg);
  -ms-transform: rotate(216deg);
  -o-transform: rotate(216deg);
  transform: rotate(216deg);
}
.c100.p61 .bar {
  -webkit-transform: rotate(219.6deg);
  -moz-transform: rotate(219.6deg);
  -ms-transform: rotate(219.6deg);
  -o-transform: rotate(219.6deg);
  transform: rotate(219.6deg);
}
.c100.p62 .bar {
  -webkit-transform: rotate(223.20000000000002deg);
  -moz-transform: rotate(223.20000000000002deg);
  -ms-transform: rotate(223.20000000000002deg);
  -o-transform: rotate(223.20000000000002deg);
  transform: rotate(223.20000000000002deg);
}
.c100.p63 .bar {
  -webkit-transform: rotate(226.8deg);
  -moz-transform: rotate(226.8deg);
  -ms-transform: rotate(226.8deg);
  -o-transform: rotate(226.8deg);
  transform: rotate(226.8deg);
}
.c100.p64 .bar {
  -webkit-transform: rotate(230.4deg);
  -moz-transform: rotate(230.4deg);
  -ms-transform: rotate(230.4deg);
  -o-transform: rotate(230.4deg);
  transform: rotate(230.4deg);
}
.c100.p65 .bar {
  -webkit-transform: rotate(234deg);
  -moz-transform: rotate(234deg);
  -ms-transform: rotate(234deg);
  -o-transform: rotate(234deg);
  transform: rotate(234deg);
}
.c100.p66 .bar {
  -webkit-transform: rotate(237.6deg);
  -moz-transform: rotate(237.6deg);
  -ms-transform: rotate(237.6deg);
  -o-transform: rotate(237.6deg);
  transform: rotate(237.6deg);
}
.c100.p67 .bar {
  -webkit-transform: rotate(241.20000000000002deg);
  -moz-transform: rotate(241.20000000000002deg);
  -ms-transform: rotate(241.20000000000002deg);
  -o-transform: rotate(241.20000000000002deg);
  transform: rotate(241.20000000000002deg);
}
.c100.p68 .bar {
  -webkit-transform: rotate(244.8deg);
  -moz-transform: rotate(244.8deg);
  -ms-transform: rotate(244.8deg);
  -o-transform: rotate(244.8deg);
  transform: rotate(244.8deg);
}
.c100.p69 .bar {
  -webkit-transform: rotate(248.4deg);
  -moz-transform: rotate(248.4deg);
  -ms-transform: rotate(248.4deg);
  -o-transform: rotate(248.4deg);
  transform: rotate(248.4deg);
}
.c100.p70 .bar {
  -webkit-transform: rotate(252deg);
  -moz-transform: rotate(252deg);
  -ms-transform: rotate(252deg);
  -o-transform: rotate(252deg);
  transform: rotate(252deg);
}
.c100.p71 .bar {
  -webkit-transform: rotate(255.6deg);
  -moz-transform: rotate(255.6deg);
  -ms-transform: rotate(255.6deg);
  -o-transform: rotate(255.6deg);
  transform: rotate(255.6deg);
}
.c100.p72 .bar {
  -webkit-transform: rotate(259.2deg);
  -moz-transform: rotate(259.2deg);
  -ms-transform: rotate(259.2deg);
  -o-transform: rotate(259.2deg);
  transform: rotate(259.2deg);
}
.c100.p73 .bar {
  -webkit-transform: rotate(262.8deg);
  -moz-transform: rotate(262.8deg);
  -ms-transform: rotate(262.8deg);
  -o-transform: rotate(262.8deg);
  transform: rotate(262.8deg);
}
.c100.p74 .bar {
  -webkit-transform: rotate(266.40000000000003deg);
  -moz-transform: rotate(266.40000000000003deg);
  -ms-transform: rotate(266.40000000000003deg);
  -o-transform: rotate(266.40000000000003deg);
  transform: rotate(266.40000000000003deg);
}
.c100.p75 .bar {
  -webkit-transform: rotate(270deg);
  -moz-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  -o-transform: rotate(270deg);
  transform: rotate(270deg);
}
.c100.p76 .bar {
  -webkit-transform: rotate(273.6deg);
  -moz-transform: rotate(273.6deg);
  -ms-transform: rotate(273.6deg);
  -o-transform: rotate(273.6deg);
  transform: rotate(273.6deg);
}
.c100.p77 .bar {
  -webkit-transform: rotate(277.2deg);
  -moz-transform: rotate(277.2deg);
  -ms-transform: rotate(277.2deg);
  -o-transform: rotate(277.2deg);
  transform: rotate(277.2deg);
}
.c100.p78 .bar {
  -webkit-transform: rotate(280.8deg);
  -moz-transform: rotate(280.8deg);
  -ms-transform: rotate(280.8deg);
  -o-transform: rotate(280.8deg);
  transform: rotate(280.8deg);
}
.c100.p79 .bar {
  -webkit-transform: rotate(284.40000000000003deg);
  -moz-transform: rotate(284.40000000000003deg);
  -ms-transform: rotate(284.40000000000003deg);
  -o-transform: rotate(284.40000000000003deg);
  transform: rotate(284.40000000000003deg);
}
.c100.p80 .bar {
  -webkit-transform: rotate(288deg);
  -moz-transform: rotate(288deg);
  -ms-transform: rotate(288deg);
  -o-transform: rotate(288deg);
  transform: rotate(288deg);
}
.c100.p81 .bar {
  -webkit-transform: rotate(291.6deg);
  -moz-transform: rotate(291.6deg);
  -ms-transform: rotate(291.6deg);
  -o-transform: rotate(291.6deg);
  transform: rotate(291.6deg);
}
.c100.p82 .bar {
  -webkit-transform: rotate(295.2deg);
  -moz-transform: rotate(295.2deg);
  -ms-transform: rotate(295.2deg);
  -o-transform: rotate(295.2deg);
  transform: rotate(295.2deg);
}
.c100.p83 .bar {
  -webkit-transform: rotate(298.8deg);
  -moz-transform: rotate(298.8deg);
  -ms-transform: rotate(298.8deg);
  -o-transform: rotate(298.8deg);
  transform: rotate(298.8deg);
}
.c100.p84 .bar {
  -webkit-transform: rotate(302.40000000000003deg);
  -moz-transform: rotate(302.40000000000003deg);
  -ms-transform: rotate(302.40000000000003deg);
  -o-transform: rotate(302.40000000000003deg);
  transform: rotate(302.40000000000003deg);
}
.c100.p85 .bar {
  -webkit-transform: rotate(306deg);
  -moz-transform: rotate(306deg);
  -ms-transform: rotate(306deg);
  -o-transform: rotate(306deg);
  transform: rotate(306deg);
}
.c100.p86 .bar {
  -webkit-transform: rotate(309.6deg);
  -moz-transform: rotate(309.6deg);
  -ms-transform: rotate(309.6deg);
  -o-transform: rotate(309.6deg);
  transform: rotate(309.6deg);
}
.c100.p87 .bar {
  -webkit-transform: rotate(313.2deg);
  -moz-transform: rotate(313.2deg);
  -ms-transform: rotate(313.2deg);
  -o-transform: rotate(313.2deg);
  transform: rotate(313.2deg);
}
.c100.p88 .bar {
  -webkit-transform: rotate(316.8deg);
  -moz-transform: rotate(316.8deg);
  -ms-transform: rotate(316.8deg);
  -o-transform: rotate(316.8deg);
  transform: rotate(316.8deg);
}
.c100.p89 .bar {
  -webkit-transform: rotate(320.40000000000003deg);
  -moz-transform: rotate(320.40000000000003deg);
  -ms-transform: rotate(320.40000000000003deg);
  -o-transform: rotate(320.40000000000003deg);
  transform: rotate(320.40000000000003deg);
}
.c100.p90 .bar {
  -webkit-transform: rotate(324deg);
  -moz-transform: rotate(324deg);
  -ms-transform: rotate(324deg);
  -o-transform: rotate(324deg);
  transform: rotate(324deg);
}
.c100.p91 .bar {
  -webkit-transform: rotate(327.6deg);
  -moz-transform: rotate(327.6deg);
  -ms-transform: rotate(327.6deg);
  -o-transform: rotate(327.6deg);
  transform: rotate(327.6deg);
}
.c100.p92 .bar {
  -webkit-transform: rotate(331.2deg);
  -moz-transform: rotate(331.2deg);
  -ms-transform: rotate(331.2deg);
  -o-transform: rotate(331.2deg);
  transform: rotate(331.2deg);
}
.c100.p93 .bar {
  -webkit-transform: rotate(334.8deg);
  -moz-transform: rotate(334.8deg);
  -ms-transform: rotate(334.8deg);
  -o-transform: rotate(334.8deg);
  transform: rotate(334.8deg);
}
.c100.p94 .bar {
  -webkit-transform: rotate(338.40000000000003deg);
  -moz-transform: rotate(338.40000000000003deg);
  -ms-transform: rotate(338.40000000000003deg);
  -o-transform: rotate(338.40000000000003deg);
  transform: rotate(338.40000000000003deg);
}
.c100.p95 .bar {
  -webkit-transform: rotate(342deg);
  -moz-transform: rotate(342deg);
  -ms-transform: rotate(342deg);
  -o-transform: rotate(342deg);
  transform: rotate(342deg);
}
.c100.p96 .bar {
  -webkit-transform: rotate(345.6deg);
  -moz-transform: rotate(345.6deg);
  -ms-transform: rotate(345.6deg);
  -o-transform: rotate(345.6deg);
  transform: rotate(345.6deg);
}
.c100.p97 .bar {
  -webkit-transform: rotate(349.2deg);
  -moz-transform: rotate(349.2deg);
  -ms-transform: rotate(349.2deg);
  -o-transform: rotate(349.2deg);
  transform: rotate(349.2deg);
}
.c100.p98 .bar {
  -webkit-transform: rotate(352.8deg);
  -moz-transform: rotate(352.8deg);
  -ms-transform: rotate(352.8deg);
  -o-transform: rotate(352.8deg);
  transform: rotate(352.8deg);
}
.c100.p99 .bar {
  -webkit-transform: rotate(356.40000000000003deg);
  -moz-transform: rotate(356.40000000000003deg);
  -ms-transform: rotate(356.40000000000003deg);
  -o-transform: rotate(356.40000000000003deg);
  transform: rotate(356.40000000000003deg);
}
.c100.p100 .bar {
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  transform: rotate(360deg);
}
.c100.p0 > span {
  color: #e0e0e0;
}
</style>