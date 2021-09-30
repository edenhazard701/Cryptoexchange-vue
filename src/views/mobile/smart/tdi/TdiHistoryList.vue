<template>
  <el-container class="TdiHistoryList">
    <MTdiHistoryListCont></MTdiHistoryListCont>
  </el-container>
</template>

<script>
import MTdiHistoryListCont from "./TdiHistoryListCont.vue";

export default {
  components: {
    MTdiHistoryListCont
  },
  data() {
    return {};
  },
  created() {
    this.$EventBus.$emit("mobile-nav-title", this.$t("m_tdi.e001"));
    this.$EventBus.$emit("mobile-nav-menus", ["noDefault", "back"]);
  }
};
</script>

<style scoped>
</style>