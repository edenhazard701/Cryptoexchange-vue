<template>
  <el-container class="TdiIntroduce">
    <el-main class="tdi-introduce">
      <div class="top_txt">
        <h1>
          {{$t('tdi.b004')}}
          <!-- TDI<span class="m_none">(Trade - Driven ICO)</span> 소개 -->
        </h1>
        <p v-html="$t('tdi.c001')">
          <!-- TDI는 Trade – Driven ICO의 약자로 거래 수수료를 이용해 신규 암호화폐 ICO에 참여할 수 있는 서비스 입니다. -->
        </p>
        <p class="sub-info" v-html="$t('tdi.c002')">
          <!-- TDI 방식은 거래소가 신규 암호화폐 프로젝트에 대한 평가를 진행하고 상장하기 때문에 기존 ICO에 비해 위험성이 낮습니다. -->
        </p>
      </div>

      <div class="step_img_wrap">
        <div class="step_img">
          <div class="tdi-system-img" :class="$i18n.locale == 'en' ? 'en' : ''">
            <div class="m_img">
              <img :src="changeLangImg()" alt="진행순서 이미지">
            </div>
          </div>
        </div>
        <div class="sub-info step_img_info">
          <ul class="smart_list">
            <li>
              <span class="num">1</span>
              {{$t('tdi.c008')}}
              <!-- 일정 기간동안 발생한 고객별 거래 수수료를 TDI 캐시로 페이백 해드립니다. -->
            </li>
            <li>
              <span class="num">2</span>
              {{$t('tdi.c009')}}
              <!-- 고객님은 지급받은 TDI 캐시로 원하는 수량만큼 TDI에 참여하실 수 있습니다. -->
            </li>
            <li>
              <span class="num">3</span>
              {{$t('tdi.c010')}}
              <!-- 참여가 완료되면 선택하신 코인이 고객님께 지급됩니다. -->
            </li>
            <!--<li><span class="num">4</span>{{$t('tdi.c044')}}</li>-->
            <!-- 마지막으로 TDI 가 완료되면 거래소 상장이 진행됩니다. -->
          </ul>
          <p class="sub-txt">
            ※ {{$t('tdi.c011')}}
            <!-- TDI 캐시는 수수료와 1:1 비율로 페이백 -->
          </p>
        </div>
      </div>

      <div class="smart_introduce_area">
        <h2 class="blue_tit">
          {{$t('tdi.c012')}}
          <!-- 수수료 페이백 정책 -->
        </h2>
        <p>
          {{$t('tdi.c013')}}
          <!-- 수수료 페이백은 일정 기간 동안 발생한 수수료에 대해 진행됩니다(수시 진행). -->
          <br>
          {{$t('tdi.c014')}}
          <!-- 페이백은 수수료의 1:1 비율로 TDI 캐시로 지급됩니다. -->
        </p>

        <el-row>
          <el-col class="label">
            {{$t('tdi.c015')}}
            <!-- 스냅샷 및 지급 시점 -->
          </el-col>
          <el-col class="cont">
            <ul class="smart_list">
              <li>
                <span class="num-txt">1.</span>
                {{$t('tdi.c016')}}
                <!--  매 시 스냅샷 -->
                <br>
                {{$t('tdi.c017')}}
                <!-- : 매시 59:59에 체결 시 발생한 수수료를 집계합니다.<span class="m_block_txt"> (원화환산금액 기준)</span> -->
              </li>
              <li>
                <span class="num-txt">2.</span>
                {{$t('tdi.c018')}}
                <!--  TDI 캐시 지급 -->
                <br>
                {{$t('tdi.c019')}}
                <!-- : 집계 후, 다음 스냅샷 전까지 해당하는 금액만큼 TDI 캐시를 지급합니다. -->
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>

      <div class="smart_introduce_area">
        <h2 class="blue_tit">
          {{$t('tdi.c020')}}
          <!-- TDI 참여 정책 -->
        </h2>
        <p>
          {{$t('tdi.c021')}}
          <!--  고객님은 TDI캐시로 신규 암호화폐 ICO에 참여하실 수 있습니다. -->
          <br>
          {{$t('tdi.c022')}}
          <!--  여러 코인에 동시 참여도 가능하며 참여한 코인은 즉시 지급됩니다. -->
        </p>

        <el-row>
          <el-col class="label">
            {{$t('tdi.c023')}}
            <!-- 참여 방법 -->
          </el-col>
          <el-col class="cont">
            <ul class="smart_list">
              <li>
                {{$t('tdi.c024')}}
                <!-- 1. 보유한 TDI 캐시를 확인합니다. -->
              </li>
              <li>
                {{$t('tdi.c025')}}
                <!-- 2. 참여하고 싶은 TDI 캐시를 선택합니다. -->
              </li>
              <li>
                {{$t('tdi.c026')}}
                <!-- 3. 참여할 수량을 입력하고 참여를 완료합니다. -->
              </li>
            </ul>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="label">
            {{$t('tdi.c027')}}
            <!-- 용어 정리 -->
          </el-col>
          <el-col class="cont">
            <ul class="smart_list">
              <li class="check" v-html="$t('tdi.c028')">
                <!-- <span class="tit">하드캡:</span> 코인별 최대 참여가능수량 -->
              </li>
              <li class="check" v-html="$t('tdi.c029')">
                }
                <!-- <span class="tit">소프트캡:</span> 상장 기준이 되는 코인별 최소 참여수량 -->
              </li>
              <li class="check" v-html="$t('tdi.c030')">
                <!-- <span class="tit">차수:</span> TDI는 차수에 따라 하드캡 및 가격이 다르게 설정됩니다.<span class="m_block_txt">(앞 차수의 하드캡이 달성되면 다음 차수 시작)</span> -->
              </li>
              <li class="check">
                <span v-html="$t('tdi.c031')"></span>
                <!--  <span class="tit">TDI 가격:</span> 1 코인당 TDI 캐시의 교환비율(앞 차수 가격 &lt; 다음 차수 가격)-->
                <br>EX) 1 AAA = 100 TDI
                <br>
                → {{$t('tdi.c032')}}
                <!--보유한 TDI 캐시를 100 사용하여 AAA 코인 1개로 교환가능 -->
              </li>
            </ul>
            <span class="sub-txt">
              {{$t('tdi.c033')}}
              <!-- ※ 소프트캡이 만족되지 않으면 상장이 취소됩니다. -->
            </span>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="label">
            {{$t('tdi.c034')}}
            <!-- 지급 시점 -->
          </el-col>
          <el-col class="cont">
            <ul class="smart_list">
              <li>
                <span class="tit">
                  {{$t('tdi.c035')}}
                  <!-- 참여 코인 지급 -->
                  :
                </span>
                {{$t('tdi.c036')}}
                <!-- 참여 즉시 지급됩니다. -->
              </li>
            </ul>
            <ul class="caution">
              <li>
                {{$t('tdi.c037')}}
                <!-- ※ 지급된 수량은 자산 화면 및 참여내역에서 확인하실 수 있습니다. -->
              </li>
              <li>
                {{$t('tdi.c038')}}
                <!-- ※ 참여 완료 후, TDI 캐시로 복구가 불가하오니 신중히 선택해 주시기 바랍니다. -->
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  created() {},
  methods: {
    /**
     * 진행 순서 이미지 언어 설정에 따라 변경
     * @returns {string} 이미지 경로
     */
    changeLangImg() {
      var self = this;
      if (self.$i18n.locale == "en") {
        return require("@/images/m_tdiintroduce_en.png");
      } else {
        console.log(typeof require("@/images/m_tdiintroduce.png"));
        return require("@/images/m_tdiintroduce.png");
      }
    }
  },
  mounted() {
    let self = this;
    self.$EventBus.$emit("pc-navi", [
      { label: self.$t("tdi.a001"), target: "tdiList" },
      { label: "TDI", target: "tdiList" },
      { label: self.$t("tdi.b004"), target: null }
    ]);

    this.$EventBus.$on("langChange", () => {
      self.$EventBus.$emit("pc-navi", [
        { label: self.$t("tdi.a001"), target: "tdiList" },
        { label: "TDI", target: "tdiList" },
        { label: self.$t("tdi.b004"), target: null }
      ]);
    });
  }
};
</script>