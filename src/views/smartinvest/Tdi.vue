<template>
  <el-container class="TdiVue">
    <el-main>
      <div class="tdi-top">
        <div class="tdi-info">
          <h1>
            <span class="headline">TDI</span>
            {{$t('tdi.b001-1')}}
            <!-- Trade - driven ICO -->
          </h1>
          <span class="info-text">{{$t('tdi.b001-2', [event_aply_rt])}} {{$t('tdi.b002')}}</span>
          <!-- 수수료 {{event_aply_rt}}%를 TDI 캐시로 드립니다! TDI 캐시로 코인 ICO에 참여해보세요! -->
          <span class="caution">
            ※ {{$t('tdi.b003')}}
            <!-- 참여 코인은 TDI 종료 후 바로 상장됩니다. -->
          </span>
          <el-button type="text" @click="goIntro()">
            {{$t('tdi.b004')}}
            <!-- TDI 소개 -->
          </el-button>
        </div>

        <!-- 진행중인 TDI -->
        <div v-if="ongoingList.length == 0" class="tdi-current">
          <div class="el-carousel__container">
            <div class="el-carousel__item nothing">
              <div class="tdi-display el-row"></div>
              <div class="tdi-nothing">
                {{$t('tdi.b009')}}
                <!-- TDI 진행 중인 코인이 없습니다. -->
              </div>
            </div>
          </div>
        </div>
        <el-carousel
          v-else
          class="tdi-current"
          trigger="click"
          :autoplay="false"
          arrow="always"
          indicator-position="none"
        >
          <el-carousel-item
            v-for="item in ongoingList"
            :key="item.cur_cd"
            :class="item.proc_stat === '진행예정' ? 'upcomming' : item.proc_stat === '종료' ? 'terminate': ''"
          >
            <el-row class="tdi-display">
              <el-col class="tdi-symbol">
                <img :src="displayCoinImg(item.cur_cd)">
              </el-col>
              <el-col class="tdi-name">
                <span class="symbol-text">{{item.cur_cd}}</span>
                <br>
                {{$i18n.locale == 'en' ? item.cur_eng_nm : item.cur_nm}}
              </el-col>
              <el-col class="tdi-rate">1 {{item.cur_cd}} = {{currencyFormat(item.krw_prc)}} TDI</el-col>
              <el-col class="tdi-now">
                <div class="tdi-now-border">
                  <i class="el-icon-check"></i>
                  <span class="now">{{$i18n.locale === 'en' ? item.proc_stat_en : item.proc_stat}}</span>
                  <span class="date">{{item.fr_dt | toMoment }} ~ {{item.to_dt | toMoment }}</span>
                </div>
              </el-col>
              <el-col class="tdi-btn">
                <el-button type="text" @click="onIntroClick(item.cur_cd)">
                  {{$t('tdi.b007')}}
                  <!-- 코인 소개 -->
                </el-button>
              </el-col>
            </el-row>
            <div class="tdi-graph" :class="item.proc_stat === '진행예정' ? 'upcomming' : ''">
              <span class="tdi-start">{{$t('tdi.b011')}}</span>
              <span
                class="tdi-result"
                :class="item.list_stat ? 'confirm' : ''"
                :style="softCapLeft(item.soft_cp, item.hard_cp)"
              >{{ toListed(item) }}</span>
              <span class="tdi-hardcap">Hard Cap</span>
              <span class="tdi-zero">0</span>
              <span
                class="tdi-softcap"
                :style="softCapLeft(item.soft_cp, item.hard_cp)"
              >{{currencyFormat(item.soft_cp)}}</span>
              <span class="tdi-end">{{currencyFormat(item.hard_cp)}}</span>
              <span v-show="item.proc_stat === '진행예정'" class="graph-upcomming">
                {{$t('tdi.g006')}}
                <!-- 진행예정 -->
              </span>

              <div
                class="tdi-progress-bar"
                :class="progressRate(item) === 100 ? 'comp' : progressRate(item) === 0 ? 'zero' : ''"
                :style="{'width':progressRate(item)+'%'}"
              >
                <div
                  v-if="item.proc_stat !== '진행예정' && item.proc_stat !== '종료'"
                  class="join-rate-balloon"
                >
                  <div class="join-rate">
                    {{$t('tdi.b012')}}
                    <div class="join-value">{{progressRate(item)}}%</div>
                  </div>
                  <div class="join-amount">
                    {{$t('tdi.b013')}}
                    <div class="join-value">{{currencyFormat(item.invo_qty)}}</div>
                  </div>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="tdi-cont">
        <!-- TDI 참여/참여내역 -->
        <el-tabs class="TdiHistory" v-model="joinTabIndex">
          <el-tab-pane>
            <span slot="label" class="label">{{$t('tdi.d001')}}</span>
            <!-- TDI 참여 -->
            <tdi-list v-if="joinTabIndex == 0"></tdi-list>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="label">{{$t('tdi.e001')}}</span>
            <!-- 나의 참여내역 -->
            <tdi-history v-if="joinTabIndex == 1"></tdi-history>
          </el-tab-pane>
        </el-tabs>

        <!-- TDI History -->
        <el-tabs class="TdiHistory" v-model="listTabIndex">
          <el-tab-pane>
            <span slot="label" class="label">{{$t('tdi.f001')}}</span>
            <!-- 전체 -->
            <el-row>
              <el-col v-if="allTDIs.length < 1" class="nothing">{{$t('tdi.f012')}}</el-col>
              <!-- TDI 내역이 없습니다. -->
              <el-col v-for="coin in coinDatas" :key="coin.cur_cd">
                <tdi-coin :coin="coin"/>
              </el-col>
            </el-row>
          </el-tab-pane>

          <el-tab-pane>
            <span slot="label" class="label">{{$t('tdi.f006')}}</span>
            <!-- 진행중 -->
            <el-row>
              <el-col v-if="ongoingTDIs.length < 1" class="nothing">{{$t('tdi.f012')}}</el-col>
              <!-- TDI 내역이 없습니다. -->
              <el-col v-for="coin in coinDatas" :key="coin.cur_cd">
                <tdi-coin :coin="coin"/>
              </el-col>
            </el-row>
          </el-tab-pane>

          <el-tab-pane>
            <span slot="label" class="label">{{$t('tdi.f007')}}</span>
            <!-- 진행예정 -->
            <el-row>
              <el-col v-if="upcomingTDIs.length < 1" class="nothing">{{$t('tdi.f012')}}</el-col>
              <!-- TDI 내역이 없습니다. -->
              <el-col v-for="coin in coinDatas" :key="coin.cur_cd">
                <tdi-coin :coin="coin"/>
              </el-col>
            </el-row>
          </el-tab-pane>

          <el-tab-pane>
            <span slot="label" class="label">{{$t('tdi.f008')}}</span>
            <!-- 종료 -->
            <el-row>
              <el-col v-if="endTDIs.length < 1" class="nothing">{{$t('tdi.f012')}}</el-col>
              <!-- TDI 내역이 없습니다. -->
              <el-col v-for="coin in coinDatas" :key="coin.cur_cd">
                <tdi-coin :coin="coin"/>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>

        <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="total" :current-page.sync="currentPage" @current-change="pageNumClicked" style="margin: 0 0 40px 0;" />

      </div>
    </el-main>
  </el-container>
</template>

<script>
import TdiList from "./TdiList.vue";
import TdiHistory from "./TdiHistory.vue";
import TdiCoin from "./TdiCoin";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import { _ } from "vue-underscore";

export default {
  components: {
    TdiList,
    TdiHistory,
    TdiCoin
  },
  data() {
    return {
      /**
       * @property {number} event_aply_rt 이벤트 적용비율
       * @property {array}  allTDIs       전체 TDI 목록
       * @property {array}  ongoingTDIs   진행중 TDI 목록
       * @property {array}  upcomingTDIs  진행예정 TDI 목록
       * @property {array}  endTDIs       종료 TDI 목록
       * @property {number} total         전체목록 갯수
       * @property {number} pageSize      페이지목록 갯수
       * @property {number} currentPage   현재페이지
       * @property {array}  coinDatas     보여줄 TDI 목록
       * @property {array}  ongoingList   진행중인 TDI 목록 (배너, TDI 참여 탭 테이블)
       * @property {number} joinTabIndex  TDI 참여/나의 참여내역 탭 인덱스
       * @property {number} listTabIndex  전체/진행중/진행예정/종료 탭 인덱스
       */
      event_aply_rt: 0,
      allTDIs: [],
      ongoingTDIs: [],
      upcomingTDIs: [],
      endTDIs: [],
      total: 0,
			pageSize: 6,
      currentPage: 1,
      coinDatas: [],
      ongoingList: [],
      joinTabIndex: 0,
      listTabIndex: 0,
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
  methods: {
    /**
     * @vuex {action} fetchTDIList        TDI 전체 목록 조회 (ac609)
     * @vuex {action} fetchTDIDetail      TDI 상세 정보 조회 (ac610)
     * @vuex {action} selectTDI           상세로 이동할 TDI 정보 저장
     * @vuex {action} fetchTDIOngoingList 이벤트 적용비율, 진행중인 TDI 목록 조회 (ac606)
     */
    ...mapActions([
      "fetchTDIList",
      "fetchTDIDetail",
      "selectTDI",
      "fetchTDIOngoingList"
    ]),
    /**
     * 배너 아이템 그래프 텍스트
     * @param {object} item 배너 목록 아이템
     * @returns {string} 상장상태 / "Soft Cap"
     */
    toListed(item) {
      let self = this;
      return item.list_stat
        ? self.$i18n.locale === "en"
          ? item.list_stat_en
          : item.list_stat
        : "Soft Cap";
    },
    /**
     * TDI 소개 버튼 클릭 이벤트 - 소개 페이지로 이동
     */
    goIntro: function() {
      let self = this;
      self.$router.push({ name: "tdiIntroduce" });
    },
    /**
     * 진행율 계산
     * @param {object} item 배너 목록 아이템
     * @returns {number} 진행율
     */
    progressRate(item) {
      var rate = ((item.invo_qty / item.hard_cp) * 100).toFixed(2) * 1;
      return rate;
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
     * 배너 아이템 그래프 "Soft Cap" 위치
     * @param {number} softval 소프트캡 item.soft_cp
     * @param {number} hardval 하드캡 item.hard_cp
     * @returns {string} css 클래스
     */
    softCapLeft(softval, hardval) {
      var softRate = parseInt((softval / hardval) * 100);
      return "left:" + softRate + "%";
    },
    /**
     * 수량 콤마 포맷
     * @param {number} number 수량
     * @returns {string} 포맷 스트링
     */
    currencyFormat(number) {
      return UnitManager.numberWithCommas(number);
    },
    /**
     * 배너 아이템의 코인 소개 버튼 클릭 이벤트
     * 상세 정보 조회 결과와 전체목록에 있는 데이터를 병합하여 저장하고 상세 페이지로 이동
     * @param {string} cur_cd 통화코드
     */
    onIntroClick(cur_cd) {
      let self = this;
      self.fetchTDIDetail({ cur_cd }).then(
        res => {
          let tdi = Object.assign(res, _.findWhere(self.allTDIs, { cur_cd }));
          self.selectTDI(tdi);
          self.$router.push({ name: "tdicoin" });
        },
        error => {
          self.$alert(error.errMsg, { confirmButtonText: "확인" });
        }
      );
    },
    //페이지에 보여줄 내용 찾기
    checkPage(item, index) {
      if ((this.currentPage-1)*this.pageSize <= index && index < this.currentPage*this.pageSize) {
        return true;
      }
      return false;
    },
    //페이지전환 호출
    pageNumClicked() {
      switch(this.listTabIndex) {
        case '0':
          this.total = this.allTDIs.length;
          this.coinDatas = this.allTDIs.filter(this.checkPage);
          break;
        case '1':
          this.total = this.ongoingTDIs.length;
          this.coinDatas = this.ongoingTDIs.filter(this.checkPage);
          break;
        case '2':
          this.total = this.upcomingTDIs.length;
          this.coinDatas = this.upcomingTDIs.filter(this.checkPage);
          break;
        case '3':
          this.total = this.endTDIs.length;
          this.coinDatas = this.endTDIs.filter(this.checkPage);
          break;
      }
    }
  },
  computed: {
    /**
     * @vuex {getter} tdiList        전체 TDI 목록
     * @vuex {getter} tdiOngoingList 진행중인 TDI 목록
     */
    ...mapGetters(["tdiList", "tdiOngoingList"]),
  },
  watch: {
    /**
     * vuex - tdiList 변경되면 self.allTDIs 업데이트
     */
    tdiList(val, old) {
      this.allTDIs = val;
      this.ongoingTDIs = val.filter(item => item.proc_stat === "2");
      this.upcomingTDIs = val.filter(item => item.proc_stat === "1");
      this.endTDIs = val.filter(item => item.proc_stat !== "1" && item.proc_stat !== "2");
    },
    /**
     * vuex - tdiOngoingList 변경되면 self.ongoingList 업데이트
     */
    tdiOngoingList(val, old) {
      let self = this;
      self.ongoingList = val;
    },
    listTabIndex(val, old) {
      this.currentPage = 1;
      this.pageNumClicked();
    }
  },
  created() {
    let self = this;
    self.$EventBus.$emit("pc-navi", [
      { label: self.$t("tdi.a001"), target: "tdiList" },
      { label: "TDI", target: null }
    ]);

    this.$EventBus.$on("langChange", () => {
      self.$EventBus.$emit("pc-navi", [
        { label: self.$t("tdi.a001"), target: "tdiList" },
        { label: "TDI", target: null }
      ]);
    });
  },
  mounted() {
    let self = this;   
    if (self.$store.getters.isSocketConnected) {
      self.fetchTDIOngoingList().then(res => {
        self.event_aply_rt = res.res.event_aply_rt;
        self.ongoingList = res.list;
        self.fetchTDIList().then(res => {
          self.allTDIs = res;
          self.pageNumClicked();
        });
      });
    } else {
      self.$EventBus.$on("socketConnected", () => {
        self.fetchTDIOngoingList().then(res => {
          self.event_aply_rt = res.res.event_aply_rt;
          self.ongoingList = res.list;
          self.fetchTDIList().then(res => {
            self.allTDIs = res;
            self.pageNumClicked();
          });
        });
      });
    }
  },
};
</script>
