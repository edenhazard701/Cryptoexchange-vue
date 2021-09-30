<template>
  <el-container class="SignalSpecialist">
    <div v-show="isListShow" class="list">
      <div class="special-info">
        <div claas="special-info-text">
          <span class="underline">{{$t('signal.i001')}}</span>
          <br>
          <span class="underline">{{$t('signal.i002')}}</span>
          <br>
          <span class="underline">{{$t('signal.i003')}}</span>
        </div>
      </div>
      <el-scrollbar class="special-content">
        <el-row>
          <el-col v-for="item in experts" :key="item.expt_rgst_no">
            <div class="special-card" @click="onExpertSelect(item)">
              <el-card shadow="never">
                <div class="spec-pic">
                  <img :src="item.prf_img_url">
                </div>
                <div class="spec-cont">
                  <h2>{{item.expt_nm}}</h2>
                  <div class="spec-cont-detail">
                    <span class="special-nick">{{item.expt_nnm}}</span>
                    <span class="special-summary">{{item.expt_sinl_strtg}}</span>
                    <el-button type="primary" size="mini" @click="onExpertSelect(item)">
                      {{$t('signal.c004')}}
                      <!-- 상세보기 -->
                    </el-button>
                  </div>
                </div>
                <div v-if="item.stt_cls_gb === '1'" class="badge">
                  {{$t('signal.c003')}}
                  <!-- 구독중 -->
                </div>
              </el-card>
            </div>
          </el-col>
          <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
        </el-row>
      </el-scrollbar>
    </div>
    <router-view></router-view>
  </el-container>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import InfiniteLoading from "vue-infinite-loading";

Vue.use(InfiniteLoading, {
  slots: {
    noMore: "",
    noResults: ""
  }
});

export default {
  component: {
    InfiniteLoading
  },
  data() {
    return {
      /**
       * @property {object} page       페이징 정보
       * @property {array}  experts    전문가 목록
       * @property {number} infiniteId vue-infinite-loading 아이디
       */
      page: {},
      experts: [],
      infiniteId: +new Date()
    };
  },
  methods: {
    /**
     * @vuex {action} fetchSmartSignalExperts 스마트시그널 전문가선택 목록 조회 (ss011)
     */
    ...mapActions(["fetchSmartSignalExperts"]),
    /**
     * 목록 아이템 선택 이벤트
     * 전문가 데이터와 함께 전문가 상세 페이지로 이동
     * @param {object} expert 선택된 전문가 데이터
     */
    onExpertSelect(expert) {
      let self = this;
      self.$router.push({
        name: "specialDetail",
        query: { 
          expt_rgst_no: expert.expt_rgst_no
        }
      });
    },
    /**
     * vue-infinite-loading 핸들러
     * @param $state vue-infinite-loading 속성
     * self.page 상태에 따라 param 설정하여 전문가 목록 조회 요청
     */
    infiniteHandler($state) {
      let self = this;
      var param = null;
      if (self.page.next_key) {
        param = { next_key: self.page.next_key };
      }
      self.fetchSmartSignalExperts(param).then(res => {
        self.page = res.res;
        self.experts = self.experts.concat(res.list);
        if (res.res.next_key) {
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    }
  },
  computed: {
    /**
     * 전문가 목록 페이지일 때만 목록 출력
     * @returns {boolean} 전문가 목록 표시 여부
     */
    isListShow() {
      return this.$route.name == "signalSpecialist" ? true : false;
    }
  },
  created() {
    var self = this;
    self.$EventBus.$emit("pc-navi", [
      { label: self.$t("tdi.a001"), target: "tdiList" },
      { label: self.$t("signal.b001"), target: "signalInfo" },
      { label: self.$t("signal.a002"), target: null }
    ]);

    self.$EventBus.$on("langChange", () => {
      self.$EventBus.$emit("pc-navi", [
        { label: self.$t("tdi.a001"), target: "tdiList" },
        { label: self.$t("signal.b001"), target: "signalInfo" },
        { label: self.$t("signal.a002"), target: null }
      ]);
    });
  },
  mounted() {
  },
};
</script>