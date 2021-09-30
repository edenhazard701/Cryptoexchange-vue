<template>
  <el-main class="TdiJoinVue">
    <join :myAble="able"></join>
  </el-main>
</template>

<script>
import Join from "@/views/smartinvest/TdiJoin.vue";
export default {
  /**
   * @property {object} myAble props 로 받은 참여가능 데이터
   */
  props: ["myAble"],
  components: {
    Join
  },
  data() {
    return {
      /**
       * @property {object} able 참여가능 데이터
       */
      able: {}
    };
  },
  created() {
    let self = this;
    self.$EventBus.$emit("mobile-nav-title", this.$t("m_tdi.a003"));
    self.$EventBus.$emit("mobile-nav-menus", ["noDefault", "back"]);
    window.addEventListener("beforeunload", self.onBeforeUnload);
    window.addEventListener("load", self.onReload);
  },
  methods: {
    /**
     * window "beforeunload" 이벤트 리스너
     * 참여가능 정보 sessionStorage 에 저장
     */
    onBeforeUnload() {
      let self = this;
      sessionStorage.setItem("TdiJoin", JSON.stringify(self.able));
    },
    /**
     * window "load" 이벤트 리스너
     * 참여가능 정보 sessionStorage 에서 가져와서 저장하고 참여하기 컴포넌트에 전달
     */
    onReload() {
      let self = this;
      self.able = JSON.parse(sessionStorage.getItem("TdiJoin"));
      self.$EventBus.$emit("ableOnReload", self.able);
    }
  },
  mounted() {
    let self = this;
    self.able = self.$route.params.myAble;
  }
};
</script>