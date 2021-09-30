<template>
  <el-container v-if="detail" class="TdiCoinDetail">
    <el-main class="coin-intro">
      <div class="coin-cont">
        <div class="coin-title">
          <img :src="displayCoinImg(detail.cur_cd)">
          <h1>{{detail.cur_cd}}</h1>

          <div class="btns">
            <a :href="detail.home_page_url" target="_blank">
              {{$t('tdi.g001')}}
              <!-- 홈페이지 -->
            </a>
            <a :href="detail.hwite_papr_url" target="_blank">
              {{$t('tdi.g002')}}
              <!-- 백서 -->
            </a>
          </div>
        </div>
        <div class="introduce">
          <!-- <nl2br tag="p" :text="detail.smpl_intr"></nl2br> -->
          <div v-html="detail.smpl_intr"></div>
        </div>
      </div>
      <div class="coin-vod">
        <youtube :video-id="youtubeVideoId" player-width="740" player-height="430"></youtube>
      </div>

      <div class="coin-introduce">
        <!-- <nl2br tag="p" :text="detail.detl_intr"></nl2br> -->
        <div v-html="detail.detl_intr"></div>
      </div>
    </el-main>
    <el-aside class="coin-current">
      <!-- 진행상황 -->
      <div class="coin-state" :class="procStatClass">
        <div class="coin-current-title">
          {{$t('tdi.g003')}}
          <!-- TDI 진행상황 -->
        </div>
        <ul>
          <li class="state">
            <div class="state">
              <span>{{ $i18n.locale === 'en' ? detail.proc_stat_nm_en : detail.proc_stat_nm }}</span>
            </div>
            <!-- 상장확정일 때 나타남 -->
            <div v-if="isListed" class="coin-state-badge">
              {{$t('tdi.g014')}}
              <!-- 상장 확정 -->
            </div>
          </li>
          <li class="dot">
            <span class="label">{{$t('tdi.g008')}}</span>
            <br>
            <span v-if="detail.prmy_krw_prc">
              - {{$t('tdi.g004', ['1'])}}
              <!-- 1차 -->
              : 1 {{detail.cur_cd}} = {{detail.prmy_krw_prc}} TDI
            </span>
            <br>
            <span v-if="detail.scnd_krw_prc">
              - {{$t('tdi.g004', ['2'])}}
              <!-- 2차 -->
              : 1 {{detail.cur_cd}} = {{detail.scnd_krw_prc}} TDI
            </span>
            <br>
            <span v-if="detail.thrd_krw_prc">
              - {{$t('tdi.g004', ['3'])}}
              <!-- 3차 -->
              : 1 {{detail.cur_cd}} = {{detail.thrd_krw_prc}} TDI
            </span>
          </li>
          <li class="dot">
            <span class="label">
              {{$t('tdi.f009')}}
              <!-- 기간 -->
              :
            </span>
            {{detail.sale_str_dt | toMoment}} ~ {{detail.sale_limt_dt | toMoment}}
          </li>
          <li class="dot">
            <span class="label">
              {{$t('tdi.g010')}}
              <!-- 참여율 -->
              : {{progressRate}}%
            </span>
          </li>
          <li class="dot">
            <span class="label">
              {{$t('tdi.g011')}}
              <!-- 참여수량 -->
              :
            </span>
            {{format(detail.invo_qty)}}
          </li>
          <li class="dot">
            <span class="label">
              {{$t('tdi.g012')}}
              <!-- 소프트캡 -->
              :
            </span>
            {{format(detail.soft_cp)}}
          </li>
          <li class="dot">
            <span class="label">
              {{$t('tdi.g013')}}
              <!-- 하드캡 -->
              :
            </span>
            <br>
            <span v-if="detail.prmy_hard_cp">
              - {{$t('tdi.g004', ['1'])}}
              <!-- 1차 -->
              : {{format(detail.prmy_hard_cp)}}
            </span>
            <br>
            <span v-if="detail.scnd_hard_cp">
              - {{$t('tdi.g004', ['2'])}}
              <!-- 2차 -->
              : {{format(detail.scnd_hard_cp)}}
            </span>
            <br>
            <span v-if="detail.thrd_hard_cp">
              - {{$t('tdi.g004', ['3'])}}
              <!-- 3차 -->
              : {{format(detail.thrd_hard_cp)}}
            </span>
          </li>
        </ul>

        <div v-if="detail.proc_stat === '1'" class="state-info upcomming">{{$t('tdi.g016')}}</div>
        <el-button
          v-else-if="detail.proc_stat === '2'"
          type="primary"
          class="state-btn"
          @click="onJoinClick"
        >{{$t('tdi.g015')}}</el-button>
        <div v-else class="state-info terminate">
          {{$t('tdi.g017')}}
          <!-- TDI가 종료되었습니다. -->
          <br>
          {{$t('tdi.g018')}}
          <!-- 종료일시 -->
          : {{detail.sale_end_dt | toMoment}}
        </div>
      </div>

      <!-- Overvie -->
      <div class="coin-state coin-overview">
        <div class="coin-current-title">
          {{$t('tdi.g019')}}
          <!-- 개요 -->
        </div>
        <ul>
          <li class="dot">
            <span class="label">
              {{$t('tdi.g020')}}
              <!-- 코인명 -->
            </span>
            {{ detail.cur_kor_nm }}
          </li>
          <li class="dot">
            <span class="label">
              {{$t('tdi.g021')}}
              <!-- 영문명 -->
            </span>
            {{ detail.cur_eng_nm }}
          </li>
          <li class="dot">
            <span class="label">
              {{$t('tdi.g022')}}
              <!-- 심볼 -->
            </span>
            {{ detail.cur_cd }}
          </li>
          <li class="dot">
            <span class="label">
              {{$t('tdi.g023')}}
              <!-- 합의 프로토콜 -->
            </span>
            {{ detail.cnst_prtc }}
          </li>
          <li class="dot">
            <span class="label">
              {{$t('tdi.g024')}}
              <!-- 총 발행량 -->
            </span>
            {{ format(detail.issu_qty) }}
          </li>
          <li class="dot">
            <span class="label">
              {{$t('tdi.g025')}}
              <!-- KYC -->
            </span>
            {{ detail.kyc_auth_yn }}
          </li>
        </ul>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import { getIdFromURL } from "vue-youtube-embed";

export default {
  data() {
    return {
      /**
       * @property {object} detail 코인 상세 데이터
       */
      detail: null
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
     */
    ...mapGetters(["tdiSelectedDetail"]),
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
     * you_tube_url 로 youtube videoId 얻기
     * @returns {string} youtube videoId
     */
    youtubeVideoId() {
      let self = this;
      return self.$youtube.getIdFromURL(self.detail.you_tube_url);
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
    }
  },
  methods: {
    /**
     * @vuex {action} prepareTDIJoin TDI 메인에서 참여해야 하는 통화코드 저장
     * @vuex {action} selectTDI      상세로 이동할 TDI 정보 저장
     */
    ...mapActions(["prepareTDIJoin", "selectTDI"]),
    /**
     * 참여 버튼 클릭 이벤트
     * 통화코드 저장하고 TDI 메인 페이지로 이동
     */
    onJoinClick() {
      let self = this;
      self.prepareTDIJoin(self.detail.cur_cd);
      self.$router.push({ name: "tdiList" });
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
      return UnitManager.numberWithCommas(number);
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
    }
  },
  created() {
    const self = this;
    window.addEventListener("beforeunload", self.onBeforeUnload);
    window.addEventListener("load", self.onReload);
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
  mounted() {
    let self = this;
    self.$EventBus.$emit("pc-navi", [
      { label: self.$t("tdi.a001"), target: "tdiList" },
      { label: "TDI", target: "tdiList" },
      { label: self.$t("tdi.b007"), target: null }
    ]);

    this.$EventBus.$on("langChange", () => {
      self.$EventBus.$emit("pc-navi", [
        { label: self.$t("tdi.a001"), target: "tdiList" },
        { label: "TDI", target: "tdiList" },
        { label: self.$t("tdi.b007"), target: null }
      ]);
    });

    self.detail = self.tdiSelectedDetail;
  }
};
</script>

<style scoped>
</style>