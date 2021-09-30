<template>
  <div class="NotiStatus">
    <el-table :data="notiSettingList" :empty-text="$t('noti.e008')">
      <!-- 등록된 알림이 없습니다. -->
      <el-table-column :label="$t('noti.e001')" align="center">
        <!-- 알림 현황 -->
        <template slot-scope="scope">
          <el-row>
            <el-col class="idx">{{notiSettingList.length - scope.$index}}</el-col>
            <el-col class="code">{{HanmeFilter(scope.row.Hname)}}</el-col>
            <el-col class="type">
              <span :class="upOrDown(scope.row)">{{ condName(scope.row) }}</span>
            </el-col>
            <el-col class="status">
              <div v-html="condDescs(scope.row)"></div>
            </el-col>
            <el-col class="delete">
              <el-button class="el-icon-close" @click.native.prevent="deleteRow(scope.row)"></el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      
    };
  },
  methods: {
    deleteRow(row) {    // 알림 현황 삭제
      let self = this;
      var payload = {
        JobFlag: "D",
        Code: row["Code"],
        Condition1: row["Condition1"],
        Condition2: row["Condition2"],
        Condition3: row["Condition3"]
      };

      if (row["CondName"] == "지정가") {
        payload["CondNo"] = "0001";
      } else if (row["CondName"] == "거래량") {
        payload["CondNo"] = "0003";
      } else {
        payload["CondNo"] = "0002";
      }

      self.$store.dispatch("setNotiSetting", payload).then(obj => {
        self.$store.dispatch("getNotiSettingList").catch(self.errAlert);
      }).catch(self.errAlert);
    },
    HanmeFilter(val) {    // 종목코드 가져오기
      return val.substring(val.indexOf(" "));
    },
    upOrDown(item) {    // 등락에 따른 class 지정(스타일 적용)
      if (item.CondNo !== "0002") {
        return "";
      }
      return item.CondNo === "0002" && item.Condition3 === "0"
        ? "fluctuation-up"
        : "fluctuation-down";
    },
    condName(item) {    // 알림 종류 가져오기
      let self = this;
      switch (item.CondNo) {
        case "0001":
          return self.$t("noti.e002-0");
        case "0002":
          return item.Condition3 === "0"
            ? self.$t("noti.e002-1")
            : self.$t("noti.e002-2");
        case "0003":
          return self.$t("noti.e002-3");
        default:
          return "-";
      }
    },
    condDescs(item) {   // 알림 상태 가져오기
      let self = this;
      let isEn = self.$i18n.locale === "en";
      switch (item.CondNo) {
        case "0001": {
          let code = item.Hname.slice(-3);
          let price = self.priceFormat(code, item.Condition1 * 1);
          return self.$t("noti.e003-0", [price, code]);
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
            ? self.$t("noti.e003-1", [cond1, cond2])
            : self.$t("noti.e003-2", [cond1, cond2]);
        }
        case "0003": {
          return self.$t("noti.e003-3", [item.Condition1, item.Condition2]);
        }
        default:
          return ["-"];
      }
    },
    priceFormat(cd, prc) {    // 지정가 가격 호가단위 적용
      if (
        cd == "" ||
        cd == null ||
        cd == undefined ||
        this.hogaUnit == undefined
      )
        return;

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
    errAlert(errorData) {
      this.$alert(errorData.errMsg, '', {
          confirmButtonText: this.$t('noti.b012')
      });
    }
  },
  computed: {
    ...mapGetters({
      notiSettingList: "getNotiSettingList",
      hogaUnit: "hogaUnit"
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

    self.$EventBus.$on("setNotisettingChk", () => {
      self.$store.dispatch("getNotiSettingList").catch(self.errAlert);
    });
  },
  filters: {}
};
</script>