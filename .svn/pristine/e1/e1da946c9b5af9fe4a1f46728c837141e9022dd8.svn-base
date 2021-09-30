<template>
  <el-container class="SmartSignal">
    <el-aside width="200px" class="signal-left">
      <div class="aside-title">
        {{$t('signal.b001')}}
        <!-- 스마트 시그널 -->
      </div>
      <el-menu :default-active="activeMenuIndex()" :router="true">
        <el-menu-item :route="{name:'signalInfo'}" index="1">
          <span>
            {{$t('signal.a001')}}
            <!-- 스마트 시그널이란? -->
          </span>
        </el-menu-item>
        <el-menu-item :route="{name:'signalSpecialist'}" index="2">
          <span>
            {{$t('signal.a002')}}
            <!-- 전문가 선택 -->
          </span>
        </el-menu-item>
        <el-menu-item :route="{name:'signalRequest'}" index="3">
          <span>
            {{$t('signal.a003')}}
            <!-- 신청내역 -->
          </span>
        </el-menu-item>
        <el-menu-item :route="{name:'signalNotice'}" index="4">
          <span>
            {{$t('signal.a004')}}
            <!-- 공지사항 -->
          </span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="signal-main">
      <!-- <transition name="fade" mode="out-in"> -->
      <router-view></router-view>
      <!-- </transition> -->
    </el-main>
  </el-container>
</template>

<script>
import SignalInfo from "./SignalInfo.vue";
import SignalSpecialist from "./SignalSpecialist.vue";
import SignalRequest from "./SignalRequest.vue";
import SignalNotice from "./SignalNotice.vue";

export default {
  component: {
    SignalInfo,
    SignalSpecialist,
    SignalRequest,
    SignalNotice
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 현재 라우트 이름에 따라 선택되어야 하는 메뉴 인덱스
     * @returns {string} 메뉴 인덱스
     */
    activeMenuIndex: function() {
      switch (this.$route.name) {
        case "signalInfo":
          return "1";
        case "signalSpecialist":
          return "2";
        case "specialDetail":
          return "2";
        case "signalRequest":
          return "3";
        case "signalNotice":
          return "4";
        case "signalNoticeDetail":
          return "4";
      }
    }
  }
};
</script>