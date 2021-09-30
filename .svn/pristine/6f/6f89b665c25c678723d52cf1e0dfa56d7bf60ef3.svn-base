<template>
  <div class="SmartSignal">
    <el-tabs v-model="activeName" @tab-click="onTab" :stretch="true">
      <el-tab-pane :label="$t('m_signal.a001')" name="intro">
        <intro></intro>
      </el-tab-pane>
      <el-tab-pane :label="$t('m_signal.a002')" name="experts">
        <experts v-if="activeName ==='experts'"></experts>
      </el-tab-pane>
      <el-tab-pane :label="$t('m_signal.a003')" name="history">
        <history v-if="activeName === 'history'"></history>
      </el-tab-pane>
      <el-tab-pane :label="$t('m_signal.a004')" name="notices">
        <notices v-if="activeName === 'notices'"></notices>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Intro from "./signal/SmartSignalIntro.vue";
import Experts from "./signal/SmartSignalExperts.vue";
import History from "./signal/SmartSignalHistory.vue";
import Notices from "./signal/SmartSignalNotices.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Intro,
    Experts,
    History,
    Notices
  },
  name: "my-component",
  data() {
    return {
      /**
       * @property {string} activeName 선택 탭 이름
       */
      activeName: "intro"
    };
  },
  methods: {},
  created() {
    this.$EventBus.$emit("mobile-nav-title", this.$t("signal.b001"));
    this.$EventBus.$emit("mobile-nav-menus", ["back"]);
  },
  mounted() {},
  /**
   * 공지사항 상세, 전문가 상세에서 돌아올 경우 탭 인덱스 맞춤
   */
  beforeRouteEnter(to, from, next) {
    var self = this;
    next(vm => {
      vm.from = from;
      switch (vm.from.name) {
        case "mSmartSignalNotice":
          vm.activeName = "notices";
          break;
        case "mSmartSignalExpert":
          vm.activeName = "experts";
          break;
        default:
          vm.activeName = "intro";
      }
    });
  }
};
</script>
