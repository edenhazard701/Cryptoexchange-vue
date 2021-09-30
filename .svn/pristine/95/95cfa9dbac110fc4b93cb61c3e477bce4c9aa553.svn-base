<template>
  <el-main class="NotiSetting">
    <el-row class="noti-setting">
      <el-col class="stockList">
        <stock-list :srchView="true" class="stock-list"></stock-list>
      </el-col>
      <el-col class="noti-detail">
        <noti-setting-detail v-bind:itemId="itemId"></noti-setting-detail>
      </el-col>
    </el-row>

    <noti-status></noti-status>
  </el-main>
</template>

<script>
// import NotiSettingList from './NotiSettingList.vue';
import StockList from "../exchanges/StockList.vue";
import NotiSettingDetail from "./NotiSettingDetail.vue";
import NotiStatus from "./NotiStatus.vue";

export default {
  components: {
    // NotiSettingList,
    StockList,
    NotiSettingDetail,
    NotiStatus
  },
  data() {
    return {
      itemId: ""    // 알림 탭 ID
    };
  },
  methods: {
    
  },
  created() {
    
  },
  mounted() {
    let self = this;
    self.$EventBus.$emit("pc-navi", [
      { label: self.$t('header.noti'), target: "notificationSetting" },
      { label: self.$t('noti.a001'), target: null }
    ]);

    self.$EventBus.$on('langChange', () => {
      self.$EventBus.$emit("pc-navi", [
        { label: self.$t('header.noti'), target: "notificationSetting" },
        { label: self.$t('noti.a001'), target: null }
      ]);
    });
  }
};
</script>