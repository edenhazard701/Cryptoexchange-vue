<template>
  <el-main v-if="detail" class="TdiCoinDetail">
    <div class="tdi_coin_detail">
      <div class="tdi_top_wrap" :class="isListed ? 'conf' : ''">
        <div class="tdi_name">
          <p class="name">
            <span class="img">
              <img :src="displayCoinImg(detail.cur_cd)">
            </span>
            {{$i18n.locale === 'en' ? detail.cur_eng_nm : detail.cur_nm}}
            <span
              class="unit"
            >{{detail.cur_cd}}</span>
          </p>
          <div class="flag">
            <span v-if="isListed" class="conf">
              {{$t('m_tdi.c002')}}
              <!-- 상장 확정 -->
            </span>
            <span v-else class="non-conf">
              {{$t('m_tdi.c003')}}
              <!-- 상장까지 -->
              <span class="conf_num">{{format(remnQtyToList)}}</span>
            </span>
          </div>
        </div>
        <div class="tdi_introduce">
          <nl2br tag="span" :text="detail.smpl_intr"/>
        </div>
        <div class="tdi_link">
          <a
            v-if="!isDevice"
            :href="detail.home_page_url"
            target="_blank"
            class="el-button"
          >{{$t('m_tdi.c004')}}</a>
          <a
            v-else
            target="_blank"
            @click="onURLClick(detail.home_page_url)"
            class="el-button"
          >{{$t('m_tdi.c004')}}</a>

          <a
            v-if="!isDevice"
            :href="detail.hwite_papr_url"
            target="_blank"
            class="el-button"
          >{{$t('m_tdi.c005')}}</a>
          <a
            v-else
            target="_blank"
            @click="onURLClick(detail.hwite_papr_url)"
            class="el-button"
          >{{$t('m_tdi.c005')}}</a>
        </div>
      </div>
      <div class="tdi_state">
        <strong class="bullet-tit-type01">
          {{$t('m_tdi.c006')}}
          <!-- TDI 진행상황 -->
        </strong>
        <div class="state_cont">
          <ul class="smart_list">
            <li class="dot big">
              <div :class="procStatClass">
                <span>{{$i18n.locale === 'en' ? detail.proc_stat_nm_en : detail.proc_stat_nm }}</span>
              </div>
            </li>
            <li class="dot">
              <p class="tit">
                {{$t('m_tdi.c010')}}
                <!-- 가격 -->
              </p>
              <p class="cont">
                <span
                  v-if="detail.prmy_krw_prc"
                >- {{$t('m_tdi.f009', [1])}}: 1 {{detail.cur_cd}} = {{detail.prmy_krw_prc}} TDI</span>
                <br>
                <span
                  v-if="detail.scnd_krw_prc"
                >- {{$t('m_tdi.f009', [2])}}: 1 {{detail.cur_cd}} = {{detail.scnd_krw_prc}} TDI</span>
                <br>
                <span
                  v-if="detail.thrd_krw_prc"
                >- {{$t('m_tdi.f009', [3])}}: 1 {{detail.cur_cd}} = {{detail.thrd_krw_prc}} TDI</span>
              </p>
            </li>
            <li class="dot">
              <p class="tit">
                {{$t('m_tdi.c011')}}
                <!-- 기간 -->
              </p>
              <p class="cont">{{detail.sale_str_dt | toMoment}} ~ {{detail.sale_limt_dt | toMoment}}</p>
            </li>
            <li class="dot">
              <p class="tit">
                {{$t('m_tdi.c017')}}
                <!-- 참여율 -->
              </p>
              <p class="cont">{{progressRate}}%</p>
            </li>
            <li class="dot">
              <p class="tit">
                {{$t('m_tdi.c013')}}
                <!-- 참여수량 -->
              </p>
              <p class="cont">{{format(detail.invo_qty)}}</p>
            </li>
            <li class="dot">
              <p class="tit">
                {{$t('m_tdi.c014')}}
                <!-- 소프트캡 -->
              </p>
              <p class="cont">{{format(detail.soft_cp)}}</p>
            </li>
            <li class="dot">
              <p class="tit">
                {{$t('m_tdi.c015')}}
                <!-- 하드캡 -->
              </p>
              <p class="cont">
                <span v-if="detail.prmy_hard_cp">
                  - {{$t('m_tdi.f009', ['1'])}}
                  <!-- 1차 -->
                  : {{format(detail.prmy_hard_cp)}}
                </span>
                <br>
                <span v-if="detail.scnd_hard_cp">
                  - {{$t('m_tdi.f009', ['2'])}}
                  <!-- 2차 -->
                  : {{format(detail.scnd_hard_cp)}}
                </span>
                <br>
                <span v-if="detail.thrd_hard_cp">
                  - {{$t('m_tdi.f009', ['3'])}}
                  <!-- 3차 -->
                  : {{format(detail.thrd_hard_cp)}}
                </span>
              </p>
            </li>
          </ul>
          <div class="graph_wrap">
            <!-- 진행예정,진행중// -->
            <div v-if="detail.proc_stat === '1' || detail.proc_stat === '2'">
              <div class="c100" :class="progressRateClass">
                <!-- 개발 참고 : p0 p1 p2 ..  ~ p100 까지 %에 따라 class 변경필요 -->
                <span>
                  <span class="tit">
                    {{$t('m_tdi.c017')}}
                    <!-- 참여율 -->
                  </span>
                  {{progressRate}}%
                </span>
                <div class="slice">
                  <div class="bar"></div>
                  <div class="fill"></div>
                </div>
              </div>
              <p class="amount">
                <span class="num">{{format(invoAbleQty)}}</span>
                <span class="gray_txt">{{detail.cur_cd}}</span>
                <br>
                {{$t('m_tdi.c018')}}
                <!-- 남음 -->
              </p>
            </div>
            <!-- //진행예정,진행중 -->
            <!-- 종료// -->
            <div v-else class="pass">
              <div class="c100">
                <span>
                  <span class="tit">
                    {{$t('m_tdi.c017')}}
                    <!-- 참여율 -->
                  </span>
                  {{progressRate}}%
                </span>
              </div>
              <p class="amount">
                <span class="num">{{format(invoAbleQty)}}</span>
                <span class="gray_txt">{{detail.cur_cd}}</span>
                <br>
                {{$t('m_tdi.c018')}}
                <!-- 남음 -->
              </p>
            </div>
            <!-- //종료 -->
          </div>
        </div>
      </div>
      <div class="tdi_summary">
        <strong class="bullet-tit-type01">
          {{$t('m_tdi.c019')}}
          <!-- 개요 -->
        </strong>
        <table class="tbody_table_sy">
          <colgroup>
            <col style="width:32%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                {{$t('m_tdi.c020')}}
                <!-- 코인명 -->
              </th>
              <td>{{detail.cur_kor_nm}}</td>
            </tr>
            <tr>
              <th scope="row">
                {{$t('m_tdi.c021')}}
                <!-- 영문명 -->
              </th>
              <td>{{detail.cur_eng_nm}}</td>
            </tr>
            <tr>
              <th scope="row">
                {{$t('m_tdi.c022')}}
                <!-- 심볼 -->
              </th>
              <td>{{detail.cur_cd}}</td>
            </tr>

            <tr>
              <th scope="row">
                {{$t('m_tdi.c023')}}
                <!-- 합의 프로토콜 -->
              </th>
              <td>{{detail.cnst_prtc}}</td>
            </tr>
            <tr>
              <th scope="row">
                {{$t('m_tdi.c024')}}
                <!-- 총 발행량 -->
              </th>
              <td>{{format(detail.issu_qty)}}</td>
            </tr>
            <tr>
              <th scope="row">
                {{$t('m_tdi.c025')}}
                <!-- KYC -->
              </th>
              <td>{{detail.kyc_auth_yn}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="coin_detail">
        <strong class="bullet-tit-type01">
          {{$t('m_tdi.c026')}}
          <!-- 상세소개 -->
        </strong>
        <div class="cont" v-html="detail.detl_intr">
          <!-- <nl2br tag="p" :text="detail.detl_intr"></nl2br> -->
        </div>
      </div>
    </div>
    <div class="btm_fix_btn">
      <el-button v-if="detail.proc_stat === '1'" class="b_success_btn" disabled>
        {{$t('m_tdi.e004')}}
        <!-- TDI 진행예정 -->
      </el-button>
      <el-button v-else-if="detail.proc_stat === '2'" class="b_success_btn" @click="onJoinClick()">
        {{$t('m_tdi.c027')}}
        <!-- TDI 참여 -->
      </el-button>
      <el-button v-else class="b_success_btn" disabled>
        {{$t('m_tdi.e011')}}
        <!-- TDI 종료 -->
      </el-button>
    </div>
  </el-main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      /**
       * @property {object}  detail   코인 상세 데이터
       * @property {boolean} isDevice 하이브리드앱 체크
       */
      detail: null,
      isDevice: false
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
     * @vuex {getter} tdiSelectedDetail 코인 상세 데이터
     * @vuex {getter} getUserId         유저 아이디
     */
    ...mapGetters(["tdiSelectedDetail", "getUserId"]),
    /**
     * 진행상태에 따른 css 클래스
     * @returns {string} css 클래스
     */
    procStatClass() {
      let self = this;
      switch (self.detail.proc_stat) {
        case "1":
          return "upcomming";
        case "2":
          return "proceed";
        default:
          return "terminate";
      }
    },
    /**
     * 상장여부 계산
     * @returns {boolean} 상장여부
     */
    isListed() {
      let self = this;
      return self.detail.invo_qty * 1 >= self.detail.soft_cp * 1;
    },
    /**
     * 진행율 계산
     * @returns {number} 진행율
     */
    progressRate() {
      let self = this;
      var rate =
        ((self.detail.invo_qty / self.detail.hard_cp) * 100).toFixed(2) * 1;
      return rate;
    },
    /**
     * 진행율 파이 그래프 css 클래스
     * @returns {string} css 클래스
     */
    progressRateClass() {
      let self = this;
      var rate = (self.detail.invo_qty / self.detail.hard_cp) * 100;
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
     * 참여수량 계산
     * @returns {number} 참여수량
     */
    invoAbleQty() {
      let self = this;
      var mod = Math.pow(10, 8);
      return (self.detail.hard_cp * mod - self.detail.invo_qty * mod) / mod;
    },
    /**
     * 상장까지(소프트캡) 잔여수량 계산
     * @returns {number} 잔여수량
     */
    remnQtyToList() {
      let self = this;
      var mod = Math.pow(10, 8);
      return (self.detail.soft_cp * mod - self.detail.invo_qty * mod) / mod;
    }
  },
  methods: {
    /**
     * @vuex {action} fetchTDIMyAble 참여가능 정보 조회 (ac607)
     * @vuex {action} selectTDI      상세 TDI 정보 저장
     */
    ...mapActions(["fetchTDIMyAble", "selectTDI"]),
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
      return UnitManager.numberWithCommas(number);
    },
    /**
     * TDI 참여 버튼 클릭 이벤트
     * 로그인 상태이면 조회한 참여가능 정보와 함께 참여 페이지로 이동
     */
    onJoinClick() {
      let self = this;
      if (!self.getUserId) {
        self
          .$confirm(self.$t("m_tdi.d026"), {
            dangerouslyUseHTMLString: true,
            confirmButtonText: self.$t("m_tdi.d017"),
            cancelButtonText: self.$t("m_tdi.d016")
          })
          .then(() => {
            self.$router.push({ name: "mLogin" });
          });
      } else {
        self
          .fetchTDIMyAble({ cur_cd: self.detail.cur_cd, seq: self.detail.seq })
          .then(res => {
            self.$router.push({
              name: "mTdiJoin",
              params: { myAble: res }
            });
          });
      }
    },
    /**
     * window "beforeunload" 이벤트 리스너
     * 코인 상세 정보 sessionStorage 에 저장
     */
    onBeforeUnload() {
      let self = this;
      sessionStorage.setItem("TdiCoinDetail", JSON.stringify(self.detail));
    },
    /**
     * window "load" 이벤트 리스너
     * 코인 상세 정보 sessionStorage 에서 가져와서 저장
     */
    onReload() {
      let self = this;
      let detail = JSON.parse(sessionStorage.getItem("TdiCoinDetail"));
      self.selectTDI(detail);
    },
    /**
     * 하이브리드앱 - 외부 브라우저 이동해서 페이지 오픈
     * @param {string} url
     */
    onURLClick(url) {
      AppManager.goUrl(url);
    }
  },
  watch: {
    /**
     * vuex - tdiSelectedDetail 변경되면 self.detail 업데이트
     */
    tdiSelectedDetail(val, old) {
      let self = this;
      self.detail = val;
    }
  },
  created() {
    let self = this;
    self.$EventBus.$emit("mobile-nav-title", self.$t("m_tdi.c001"));
    self.$EventBus.$emit("mobile-nav-menus", ["noDefault", "back", "border"]);
    window.addEventListener("beforeunload", self.onBeforeUnload);
    window.addEventListener("load", self.onReload);
  },
  mounted() {
    let self = this;
    self.detail = self.tdiSelectedDetail;
    self.isDevice = afc.isDevice;
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
  border: 5px solid #ff9800;
  width: 90px;
  height: 90px;
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
  font-size: 100px;
  width: 100px;
  height: 100px;
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
  top: 50%;
  width: 100%;
  line-height: 1;
  font-size: 16px;
  color: #ff9800;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  transform: translateY(-50%);
}
.c100 > span .tit {
  display: block;
  margin-bottom: 5px;
  font-size: 13px;
  color: #212121;
  font-weight: normal;
}
.c100:after {
  display: block;
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  border-radius: 50%;
  background-color: #fff;
  width: 90px;
  height: 90px;
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
/*pass*/
.pass .c100 {
  background: #9e9e9e;
}
.pass .c100 > span {
  color: #9e9e9e;
}
.pass .c100 > span .tit {
  color: #9e9e9e;
}
</style>