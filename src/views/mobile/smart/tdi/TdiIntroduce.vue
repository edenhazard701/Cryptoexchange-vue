<template>
  <MTdiIntroduce></MTdiIntroduce>
</template>

<script>
import MTdiIntroduce from "@/views/smartinvest/TdiIntroduce.vue";

export default {
  components: {
    MTdiIntroduce
  },
  data() {
    return {};
  },
  created() {
    this.$EventBus.$emit("mobile-nav-title", this.$t("m_tdi.a007"));
    this.$EventBus.$emit("mobile-nav-menus", ["noDefault", "back", "border"]);
  }
};
</script>