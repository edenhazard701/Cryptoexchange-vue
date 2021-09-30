<template>
  <div class="SmartTdi">
    <el-tabs v-model="activeName" @tab-click="onTab" :stretch="true" class="blue_bg_tab">
      <el-tab-pane :label="$t('m_tdi.a003')" name="intro">
        <!-- TDI 참여 -->
        <tdi-intro></tdi-intro>
      </el-tab-pane>
      <el-tab-pane :label="$t('m_tdi.f001')" name="history">
        <!-- 나의 참여내역 -->
        <tdi-history v-if="activeName === 'history'"></tdi-history>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TdiIntro from "./tdi/TdiIntro.vue";
import TdiHistory from "./tdi/TdiHistory.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TdiIntro,
    TdiHistory
  },
  data() {
    return {
      /**
       * @property {string} activeName 선택 탭 이름
       * @property {string} navTitle   네비게이션 타이틀
       */
      activeName: "intro",
      navTitle: "TDI"
    };
  },
  computed: {},
  methods: {
    /**
     * @vuex {action} fetchTDICash        TDI 보유캐쉬 조회 (ac612)
     * @vuex {action} fetchTDIList        TDI 전체 목록 조회 (ac609)
     * @vuex {action} fetchTDIOngoingList 이벤트 적용비율, 진행중인 TDI 목록 조회 (ac606)
     */
    ...mapActions(["fetchTDICash", "fetchTDIList", "fetchTDIOngoingList"])
  },
  created() {
    this.$EventBus.$emit("mobile-nav-title", this.navTitle);
    this.$EventBus.$emit("mobile-nav-menus", ["back"]);
  },
  mounted() {
    let self = this;
    if (self.$store.getters.isSocketConnected) {
      self.fetchTDICash().then(res => {
        self.fetchTDIOngoingList().then(res => {
          self.fetchTDIList();
        });
      });
    } else {
      self.$EventBus.$on("socketConnected", () => {
        self.fetchTDICash().then(res => {
          self.fetchTDIOngoingList().then(res => {
            self.fetchTDIList();
          });
        });
      });
    }
  }
};
</script>