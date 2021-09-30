<template>
  <div class="NotiSetting-wrap">
    <div class="NotiSetting">
      <div
        v-if="getSymbolArrOfTableData(notiSettingList).length === 0"
        class="noti-nothing"
      >{{$t('m_noti.d006')}}</div>
      <div
        v-else
        v-for="(data, index) in getSymbolArrOfTableData(notiSettingList)"
        :key="data.Code"
        class="item_wrapper"
      >
        <div class="item_header">
          {{symbolName(data.Code)}}
          <!-- {{data.Hname.substr(0, data.Hname.indexOf(" "))}} {{data.Hname.substr(data.Hname.indexOf(" "))}} -->
          <el-button class="add_btn" @click="addNoti(data.Code)"></el-button>
        </div>
        <div class="item_wrap">
          <div class="item" v-for="(item, subIdx) in notiSettingList" v-if="data.Code == item.Code">
            <span class="item_status">
              <span v-if="item.CondNo == '0002'" class="fluctuation">
                <!-- 등락 -->
                <span
                  :class="item.UpDownFlag == '0' ? 'fluctuation_up' : 'fluctuation_down'"
                >{{condName(item)}}</span>
              </span>
              <span v-else>{{condName(item)}}</span>
              <!-- 지정가, 거래량 -->
            </span>
            <span class="item_cont">
              <div v-html="condDescs(item)"></div>
            </span>

            <el-button class="delete_btn" @click="deleteNoti(item)"></el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="btm_fix_btn">
      <el-button class="b_success_btn" @click="addNoti(null)">{{$t('m_noti.d005')}}</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    addNoti(symbol) {   // 알림 등록 화면으로 이동
      this.$router.push({
        name: "mNotificationSettingDetail",
        params: { itemId: symbol }
      });
    },
    deleteNoti(item) {  // 설정 알림 삭제
      let self = this;
      var payload = {
        JobFlag: "D",
        Code: item["Code"],
        Condition1: item["Condition1"],
        Condition2: item["Condition2"],
        Condition3: item["Condition3"]
      };

      if (item["CondName"] == "지정가") {
        payload["CondNo"] = "0001";
      } else if (item["CondName"] == "거래량") {
        payload["CondNo"] = "0003";
      } else {
        payload["CondNo"] = "0002";
      }

      self.$store.dispatch("setNotiSetting", payload).then(obj => {
        self.$store.dispatch("getNotiSettingList").catch(self.errAlert);
        this.$message({
          message: self.$t("m_noti.d004"),
          customClass: "notify_order_reject not-sign",
          duration: 2000
        });
      }).catch(self.errAlert);
    },
    getSymbolArrOfTableData(tableData) {   // 알림설정 목록에서 종목명 가져오기
      var fn = function(resArr, dataObj) {
        var chk = true;

        if (resArr.length == 0) {
          resArr.push(dataObj);
          return resArr;
        } else {
          for (var idx in resArr) {
            if (resArr[idx]["Code"].indexOf(dataObj["Code"]) >= 0) {
              chk = false;
              break;
            }
          }
        }

        if (chk) resArr.push(dataObj);
        return resArr;
      };

      return tableData.reduce(fn, []);
    },
    condName(item) {    // 알림 종류 세팅
      let self = this;
      switch (item.CondNo) {
        case "0001":
          return self.$t("m_noti.d002-0");
        case "0002":
          return item.Condition3 === "0"
            ? self.$t("m_noti.d002-1")
            : self.$t("m_noti.d002-2");
        case "0003":
          return self.$t("m_noti.d002-3");
        default:
          return "-";
      }
    },
    condDescs(item) {   // 알림 조건 세팅
      let self = this;
      let isEn = self.$i18n.locale === "en";
      switch (item.CondNo) {
        case "0001": {
          let code = item.Hname.slice(-3);
          let price = self.priceFormat(code, item.Condition1 * 1);
          return self.$t("m_noti.d003-0", [price, code]);
        }
        case "0002": {
          let cond1 =
            item.Condition1 === "60"
              ? isEn
                ? "1 hour"
                : "1시간"
              : item.Condition1 + (isEn ? " mins" : "분");
          let cond2 = item.Condition2;
          let isUp = item.Condition3 === "0";
          return isUp
            ? self.$t("m_noti.d003-1", [cond1, cond2])
            : self.$t("m_noti.d003-2", [cond1, cond2]);
        }
        case "0003": {
          return self.$t("m_noti.d003-3", [item.Condition1, item.Condition2]);
        }
        default:
          return ["-"];
      }
    },
    priceFormat(cd, prc) {    // 지정가 표기 정책 반영
      let self = this;
      var nLenBelowDigitArray = [1];
      UnitManager.getHogaUnit(
        self.hogaUnit,
        cd,
        prc,
        undefined,
        undefined,
        nLenBelowDigitArray
      );

      return UnitManager.fixedDecimalWithCommas(prc, nLenBelowDigitArray[0]);
    },
    symbolName(code) {    // 종목명 세팅
      let self = this;
      let pair = self.getPairBySymbol(code);
      let name =
        self.$i18n.locale === "en"
          ? pair.o_inst_eng_nm.split("/")[0]
          : pair.o_inst_kor_nm.split("/")[0];
      return name + " " + pair.o_inst_eng_abbr;
    },
    errAlert(errorData) {
      this.$alert(errorData.errMsg, '', {
          confirmButtonText: this.$t('noti.b012')
      });
    }
  },
  computed: {
    ...mapGetters({
      notiSettingList: "getNotiSettingList",
      hogaUnit: "hogaUnit",
      getPairBySymbol: "getPairBySymbol"
    })
  },
  mounted() {
    let self = this;

    if (self.$store.getters.isSocketConnected) {
      self.$store.dispatch("getNotiSettingList").catch(self.errAlert);
    } else {
      self.$EventBus.$on("socketConnected", () => {
        self.$store.dispatch("getNotiSettingList").catch(self.errAlert);
      });
    }
  }
};
</script>