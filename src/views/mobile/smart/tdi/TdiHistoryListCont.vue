<template>
  <div class="TdiHistoryListCont">
    <el-tabs type="card" v-model="activeName" class="box_tab_sy size4">
      <el-tab-pane :label="$t('m_tdi.e002')" name="all">
        <!-- 전체 -->
        <div class="TdiHistoryItemWrap">
          <div v-if="allTDIs.length < 1" class="nothing">{{$t('m_tdi.e012')}}</div>
          <MTdiHistoryItem v-for="coin in allTDIs" :key="coin.cur_cd" :coin="coin"></MTdiHistoryItem>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('m_tdi.e003')" name="proceed">
        <!-- 진행중 -->
        <div class="TdiHistoryItemWrap">
          <div v-if="ongoingTDIs.length < 1" class="nothing">{{$t('m_tdi.e012')}}</div>
          <MTdiHistoryItem v-for="coin in ongoingTDIs" :key="coin.cur_cd" :coin="coin"></MTdiHistoryItem>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('m_tdi.e004')" name="upcomming">
        <!-- 진행예정 -->
        <div class="TdiHistoryItemWrap">
          <div v-if="upcomingTDIs.length < 1" class="nothing">{{$t('m_tdi.e012')}}</div>
          <MTdiHistoryItem v-for="coin in upcomingTDIs" :key="coin.cur_cd" :coin="coin"></MTdiHistoryItem>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('m_tdi.e005')" name="terminate">
        <!-- 종료 -->
        <div class="TdiHistoryItemWrap">
          <div v-if="endTDIs.length < 1" class="nothing">{{$t('m_tdi.e012')}}</div>
          <MTdiHistoryItem v-for="coin in endTDIs" :key="coin.cur_cd" :coin="coin"></MTdiHistoryItem>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MTdiHistoryItem from "./TdiHistoryItem.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    MTdiHistoryItem
  },
  data() {
    return {
      /**
       * @property {number} activeName 선택 탭 이름
       * @property {array}  allTDIs    전체 TDI 목록
       */
      activeName: "all",
      allTDIs: []
    };
  },
  computed: {
    /**
     * @vuex {getter} tdiList        전체 TDI 목록
     */
    ...mapGetters(["tdiList"]),
    /**
     * 진행중 TDI 필터 리스트
     * @returns {array}
     */
    ongoingTDIs() {
      let self = this;
      return self.allTDIs.filter(item => {
        return item.proc_stat === "2";
      });
    },
    /**
     * 진행예정 TDI 필터 리스트
     * @returns {array}
     */
    upcomingTDIs() {
      let self = this;
      return self.allTDIs.filter(item => {
        return item.proc_stat === "1";
      });
    },
    /**
     * 종료 TDI 필터 리스트
     * @returns {array}
     */
    endTDIs() {
      let self = this;
      return self.allTDIs.filter(item => {
        return item.proc_stat !== "1" && item.proc_stat !== "2";
      });
    }
  },
  methods: {},
  watch: {
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
    self.allTDIs = self.tdiList;
  }
};
</script>