<template>
  <div class="SmartSignalExperts">
    <el-row class="experts-select-lst">
      <el-col v-for="item in experts" :key="item.expt_rgst_no" class="expert-item">
        <div @click="onExpertClick(item)">
          <el-card shadow="never">
            <el-row>
              <el-col class="expert-picher">
                <img :src="item.prf_img_url">
              </el-col>
              <el-col class="expert-info">
                <span class="info-name">{{item.expt_nm}}</span>
                <span class="info-tit">{{item.expt_nnm}}</span>
                <span class="info-summary">{{item.expt_sinl_strtg}}</span>
                <el-button type="info-primary" size="mini" class="btn-view-type">
                  {{$t('m_signal.c008')}}
                  <!-- 상세보기 -->
                </el-button>
              </el-col>
            </el-row>
            <div v-if="item.stt_cls_gb === '1'" class="ico-badge">
              {{$t('m_signal.b001')}}
              <!-- 구독중 -->
            </div>
          </el-card>
        </div>
      </el-col>
      <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
    </el-row>
  </div>
</template>

<script>
import Expert from "./SmartSignalExpert.vue";
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";

Vue.use(InfiniteLoading, {
  slots: {
    noMore: "",
    noResults: ""
  }
});

export default {
  component: {
    Expert
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
    onExpertClick(expert) {
      this.$router.push({
        name: "mSmartSignalExpert",
        params: { expert }
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
  computed: {},
  mounted() {}
};
</script>
