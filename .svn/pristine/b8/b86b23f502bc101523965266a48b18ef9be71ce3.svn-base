<template>
  <div class="SignalInfo">
    <h1 class="pageTitle">
      {{$t('signal.b001')}}
      <!-- 스마트 시그널 -->
    </h1>
    <el-row>
      <el-col class="info-img">
        <div class="info-title label1">
          <nl2br tag="span" :text="$t('signal.b002')"></nl2br>
          <!-- Smart Signal 소개 -->
        </div>
      </el-col>
      <el-col class="info-text">
        <div class="info-content">
          {{$t('signal.b003')}}
          <!-- 스마트시그널이란 증권가에서 검증된 시스템트레이딩용 dwjsans 툴을 사용하거나 암호화폐 전문가의 시장 동향 파악으로
          실시간으로 회원님께 기준선 (매수/매도/목표가/손절가)을 제공하여 회원님의 매매를 도와드리는 서비스 입니다-->
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="info-img">
        <div class="info-title label2">
          <nl2br tag="span" :text="$t('signal.b004')"></nl2br>
          <!-- 스마트시그널 신청/해지 -->
        </div>
      </el-col>
      <el-col class="info-text">
        <el-row class="info-content">
          <el-col :span="12">
            <h2>
              {{$t('signal.b005')}}
              <!-- 신청 -->
            </h2>
            <ul>
              <li class="dot">
                <span v-html="$t('signal.b006')"></span>
                <!-- 전문가 선택 페이지에서 성향에 맞는 전문가를 선택합니다.<br>
                (1계정당 전문가 중복 선택 불가)-->
              </li>
              <li class="dot">
                {{$t('signal.b007')}}
                <!-- 스마트시그널 신청 -->
              </li>
              <li class="dot">
                {{$t('signal.b008')}}
                <!-- 전문가 신호를 통한 매매 실행 -->
              </li>
            </ul>
          </el-col>
          <el-col :span="12">
            <h2>
              {{$t('signal.b009')}}
              <!-- 해지 -->
            </h2>
            <ul>
              <li class="dot">
                {{$t('signal.b010')}}
                <!-- 신청과 동일한 방법으로 해당 전문가 페이지에서 해지 클릭 -->
              </li>
              <li class="dot">
                {{$t('signal.b011')}}
                <!-- 해지시 해지 당일 24:00 까지 재신청이 불가합니다. -->
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="info-img">
        <div class="info-title label3">
          {{$t('signal.b012')}}
          <!-- 수수료 -->
        </div>
      </el-col>
      <el-col class="info-text">
        <div class="info-content">
          <h3>
            {{$t('signal.b013')}}
            <!-- 기존 매매 수수료 0.05% + 스마트시그널 수수료 0.05% -->
          </h3>
          <ul>
            <li class="dot">
              {{$t('signal.b014')}}
              <!-- 수수료는 스마트시그널 신청 이후 주문건만 적용되며, 해지 후 주문건에는 일반 수수료가 부과됩니다. -->
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {
    let self = this;
    self.$EventBus.$emit("pc-navi", [
      { label: self.$t("tdi.a001"), target: "tdiList" },
      { label: self.$t("signal.b001"), target: "signalInfo" },
      { label: self.$t("signal.a001"), target: null }
    ]);

    this.$EventBus.$on("langChange", () => {
      self.$EventBus.$emit("pc-navi", [
        { label: self.$t("tdi.a001"), target: "tdiList" },
        { label: self.$t("signal.b001"), target: "signalInfo" },
        { label: self.$t("signal.a001"), target: null }
      ]);
    });
  }
};
</script>