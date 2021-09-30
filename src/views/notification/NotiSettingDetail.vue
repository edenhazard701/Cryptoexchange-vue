<template>
  <div class="NotiSettingDetail">
    <el-tabs v-model="activeTabName" v-bind:stretch="stretchTab">
      <!-- 지정가 알림 탭 시작 -->
      <el-tab-pane :label="$t('noti.b001')" name="limits" class="limits">
        <el-row class="guide">
          <el-col :span="22" class="guide-title">
            {{$t('noti.b002')}}
            <!-- 지정한 가격 도달 시, 알림이 발생합니다. -->
          </el-col>
          <el-col :span="2" class="guide-question">
          </el-col>
        </el-row>
        <div class="contents">
          <el-select v-model="this.itemId" class="select-name" v-on:change="changeItemId">
            <el-option
              v-for="item in nameOptions"
              :key="item.value"
              :label="$i18n.locale === 'en' ? item.labelEn : item.labelKo"
              :value="item.value"
            ></el-option>
          </el-select>

          <el-row>
            <el-col class="input">
              <el-input :class="NotiPriceChange === true ? 'change-price' : ''"
                v-model="limitsObj.price"
                @keydown.native="keyDown"
                @keypress.native="keyPress"
                @keyup.native="keyUp"
              ></el-input>
              <span class="label">
                {{$t('noti.b003')}}
                <!-- 지정가 -->
              </span>
              <span class="coin-unit">{{limitsObj.currency}}</span>
            </el-col>
            <el-col class="btn">
              <el-button v-on:click="subtractLimitsPrice" class="minus"></el-button>
            </el-col>
            <el-col class="btn">
              <el-button v-on:click="addLimitsPrice" class="plus"></el-button>
            </el-col>
          </el-row>

          <el-row>
            <el-col class="limits-ratio-title">
              {{$t('noti.b004')}}
              <!-- 현재가 대비 -->
            </el-col>
            <el-col class="current-select">
              <el-select v-model="limitsRatio" class="limits-ratio-input">
                <el-option @click.native="limitsRatioClick(item.value, tmpLimitsRatio)"
                  v-for="item in limitsRatioOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-button @click="regChangeNoti('limits')" type="primary" class="btn-reg">
            {{$t('noti.b005')}}
            <!-- 알림 등록 -->
          </el-button>
        </div>
      </el-tab-pane>
      <!-- 지정가 알림 탭 끝 -->
      <!-- 등락 알림 탭 시작 -->
      <el-tab-pane :label="$t('noti.c001')" name="fluctuation" class="fluctuation">
        <!-- 등락 알림 -->
        <el-row class="guide">
          <el-col :span="22" class="guide-title">
            {{$t('noti.c002')}}
            <!-- 설정 시간 내에 지정 등락률만큼 상승/하락 시, 알림이 발생합니다. -->
          </el-col>
          <el-col :span="2" class="guide-question">
          </el-col>
        </el-row>
        <el-row class="contents">
          <el-select v-model="this.itemId" class="select-name" v-on:change="changeItemId">
            <el-option
              v-for="item in nameOptions"
              :key="item.value"
              :label="$i18n.locale === 'en' ? item.labelEn : item.labelKo"
              :value="item.value"
            ></el-option>
          </el-select>

          <div class="sub-title up">
            {{$t('noti.e002-1')}}
            <!-- 등락(상승) -->
          </div>
          <el-row>
            <el-col class="select">
              <el-select v-model="fluctuationUpMinute" class="fluctuation-select-minute">
                <el-option
                  v-for="item in fluctuationMinuteOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col class="text">
              <span class="select-minute-text">
                {{$t('noti.c004')}}
                <!-- 이내 -->
              </span>
            </el-col>
            <el-col class="select">
              <el-select v-model="fluctuationUpRatio" class="fluctuation-select-minute">
                <el-option
                  v-for="item in fluctuationRatioOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col class="text2" v-html="$t('noti.c005')">
              <!-- <span class="select-minute-text">이상</span> <span class="fluctuation-up">상승</span> -->
            </el-col>
            <el-col class="reg">
              <el-button @click="regChangeNoti('up')" type="primary" class="btn-reg">
                {{$t('noti.c007')}}
                <!-- 알림 등록 -->
              </el-button>
            </el-col>
          </el-row>

          <div class="sub-title down">
            {{$t('noti.e002-2')}}
            <!-- 등락(하락) -->
          </div>
          <el-row>
            <el-col class="select">
              <el-select v-model="fluctuationDownMinute" class="fluctuation-select-minute">
                <el-option
                  v-for="item in fluctuationMinuteOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col class="text">
              <span class="select-minute-text">
                {{$t('noti.c004')}}
                <!-- 이내 -->
              </span>
            </el-col>
            <el-col class="select">
              <el-select v-model="fluctuationDownRatio" class="fluctuation-select-minute">
                <el-option
                  v-for="item in fluctuationRatioOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col class="text2" v-html="$t('noti.c006')">
              <!-- <span class="select-minute-text">이상</span> <span class="fluctuation-down">하락</span> -->
            </el-col>
            <el-col class="reg">
              <el-button @click="regChangeNoti('down')" type="primary" class="btn-reg">
                {{$t('noti.c007')}}
                <!-- 알림 등록 -->
              </el-button>
            </el-col>
          </el-row>
        </el-row>
      </el-tab-pane>
      <!-- 등락 알림 탭 끝 -->
      <!-- 거래량 변동 알림 탭 시작 -->
      <el-tab-pane :label="$t('noti.d001')" name="change" class="trade-change">
        <el-row class="guide">
          <el-col :span="22" class="guide-title">
            {{$t('noti.d002')}}
            <!-- 설정 시간 내에 거래량이 지정 등락률만큼 상승 시, 알림이 발생합니다. -->
          </el-col>
          <el-col :span="2" class="guide-question">
          </el-col>
        </el-row>
        <el-row class="contents">
          <el-select v-model="this.itemId" class="select-name" v-on:change="changeItemId">
            <el-option
              v-for="item in nameOptions"
              :key="item.value"
              :label="$i18n.locale === 'en' ? item.labelEn : item.labelKo"
              :value="item.value"
            ></el-option>
          </el-select>

          <el-row>
            <el-col class="select2">
              <el-select v-model="changeMinute" class="change-select-minute">
                <el-option
                  v-for="item in changeMinuteOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col class="text3">
              <span class="select-minute-text">
                {{$t('noti.d005')}}
                <!-- 이내 거래량 -->
              </span>
            </el-col>
            <el-col class="select2">
              <el-select v-model="changeRatio" class="change-select-minute">
                <el-option
                  v-for="item in changeRatioOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col class="text4">
              <div v-html="$t('noti.d006')"></div>
              <!-- <span class="select-minute-text">이상</span> <span class="fluctuation-up">상승</span> -->
            </el-col>
          </el-row>

          <el-button @click="regChangeNoti('change')" type="primary" class="btn-reg">
            {{$t('noti.b005')}}
            <!-- 알림 등록 -->
          </el-button>
        </el-row>
      </el-tab-pane>
      <!-- 거래량 변동 알림 탭 끝 -->
    </el-tabs>
    <div class="chart">
      <stock-graph
        ref="stockGraph" 
        :is-show-right-menu="false"
        :is-show-bottom-menu="false"
        >차트</stock-graph>
    </div>
  </div>
</template>

<script>
import StockGraph from "../exchanges/StockGraph.vue";
import ModalAlerm from '../exchanges/modal/ModalAlerm.vue';
import ModalUniversalTime from '../exchanges/modal/ModalUniversalTime.vue';  
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    StockGraph,
    ModalAlerm,
    ModalUniversalTime
  },
  data() {
    return {
      name: 'NotiSettingDetail',
      itemId: "",               // 선택종목 코드
      curprc: "",               // 현재가
      nameOptions: [],          // 관심종목 옵션
      nowPrice: {},             // 선택종목 데이터
      realDataKVS0: null,       // 실시간 데이터
      stretchTab: true,         // 탭 가로 풀사이즈 여부
      activeTabName: "limits",  // 활성화된 탭
      limitsObj: {              // 지정가 데이터
        price: 0,               // 지정가 알림 가격
        currency: ""            // 지정가 알림 통화코드
      },
      limitsRatio: 0,           // 현재가 대비 지정가 선택 시 비율
      tmpLimitsRatio: 0,
      limitsRatioOptions: [     // 현재가 대비 옵션
        {
          value: 0.1,
          label: "10%"
        },
        {
          value: 0.05,
          label: "5%"
        },
        {
          value: 0,
          label: "0%"
        },
        {
          value: -0.05,
          label: "-5%"
        },
        {
          value: -0.1,
          label: "-10%"
        }
      ],
      // 등락 데이터
      fluctuationUpMinute: "3",   // 상승 시간
      fluctuationDownMinute: "3", // 하락 시간
      fluctuationUpRatio: "5",    // 상승 등락률
      fluctuationDownRatio: "5",  // 하락 등락률

      fluctuationRatioOptions: [    // 등락률 옵션
        {
          value: "3",
          label: "3%"
        },
        {
          value: "5",
          label: "5%"
        },
        {
          value: "7",
          label: "7%"
        },
        {
          value: "10",
          label: "10%"
        }
      ],

      // 거래량 데이터
      changeMinute: "3",  // 시간
      changeRatio: "2",   // 등락률

      // 알림설정
      isShowAlerm: false,
      isConfirmAlerm: false,
      alermProps: [],

      // 세계시간
      isShowModalUniversalTime: false,
      utcProp: {
        timeZone: 'Asia/Seoul',
        utc: '+09:00'
      },
      checkedIndex: 60,

      NotiPriceChange: false, //지정가 알림 가격 변경 여부
    };
  },
  methods: {
    addComma(value) {   // 1,000 단위 콤마 추가
      var tmp = value.toString().split(".");
      return (
        tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        (tmp[1] ? "." + tmp[1] : "")
      );
    },
    getOnlyNumber(value) {    // 숫자, . 만 남김
      if (value === undefined || value === "") {
        return "";
      }

      if (value === 0) {
        return 0;
      }

      value = value.toString().replace(/[^0-9.]/g, "");   // 정수 앞쪽의 0 제거
      var splitValue = value.split(".");
      if (splitValue.length > 1) {
        value =
          (parseInt(splitValue[0], 10) > 0
            ? parseInt(splitValue[0], 10)
            : "0") +
          ("." + splitValue[1]);
      } else if (splitValue.length <= 1 && value != "0") {
        value = value.replace(/^[0|\D]*/, "");
      }

      return value;
    },
    keyDown(event) {    // 지정가 한글 입력 방지
      var charCode =
        typeof event.which === undefined ? event.keyCode : event.which;
      var charStr = String.fromCharCode(charCode);

      if (charCode == "229") {
        // 한글 입력 방지
        event.target.readOnly = true;
        return;
      }
    },
    keyPress(event) {   // input에 키 입력 시 숫자, . 아니면 입력 방지
      var charCode =
        typeof event.which === undefined ? event.keyCode : event.which;
      var charStr = String.fromCharCode(charCode);
      var keyPosition = event.target.selectionStart; // 키 입력 위치
      var targetId = event.target.id;

      var tmpText = event.target.value.substring(0, keyPosition);
      var commaCount = (tmpText.match(/,/g) || []).length;

      keyPosition -= commaCount; //  콤마 개수 만큼 키 입력 위치 감소

      if (charCode !== 46 && (charCode < 48 || charCode > 57)) {
        // 숫자, . 아니면 입력 방지
        event.preventDefault();
      }

      var text = this.getOnlyNumber(event.target.value);
      var pointPosition = text.indexOf(".");
      var splitText = text.split(".");
      var integer = splitText[0];
      var decimal = splitText[1];

      if (charCode === 46 && pointPosition !== -1) {
        // . 이 이미 있는 경우 . 입력 방지
        event.preventDefault();
        return;
      } else if (
        charCode === 46 &&
        this.getOnlyNumber(event.target.value).length <= 0
      ) {
        // .만 입력 시 . 앞에 0 붙이기
        event.target.value = "0" + event.target.value;
      } else if (
        charCode === 48 &&
        event.target.selectionStart === 0 &&
        event.target.value.length > 0
      ) {
        // 정수 앞에 0 입력 방지
        //event.preventDefault();
      }

      if (
        charCode !== 46 &&
        ((pointPosition === -1 && text.length <= keyPosition) ||
          (pointPosition !== -1 && keyPosition == pointPosition))
      ) {
        // 정수이거나 정수부분 입력 시 10억 단위 초과 방지
        if (integer.length >= 10) {
          event.preventDefault();
          return;
        }
      } else {
        var tmpValue = text;

        if (
          charCode != "46" &&
          event.target.value != "0" &&
          pointPosition >= keyPosition
        ) {
          // 호가단위 자릿수 조회를 위해 정수부분 입력인 경우 자릿수 추가(ex 123 -> 1231)
          tmpValue = integer + "1";
        }

        var decimalLimit = this.getHogaUnitValid(tmpValue, true); // 소수점 자릿수 조회

        // 정수부분 10억 단위 이상 입력 방지
        if (decimal) {
          // 소수점 이하 숫자 있는 경우
          if (
            pointPosition < keyPosition &&
            decimalLimit <= decimal.length &&
            keyPosition >= text.length
          ) {
            event.preventDefault();
            return;
          }
        } else {
          // 소수점 없는 경우
          if (
            charCode == "46" &&
            decimalLimit < 1 &&
            keyPosition >= text.length
          ) {
            event.preventDefault();
            return;
          }
        }
      }
    },
    keyUp(event) {    // 값 입력 시 자릿수 체크
      event.target.readOnly = false;

      this.limitsObj.price = this.getHogaUnitValid(this.limitsObj.price);
    },
    getHogaUnitValid(value, getUnit) { // 소수점 자릿수 처리 - 호가단위
      if (value === undefined || value === "") {
        return;
      }

      var text = this.getOnlyNumber(value.toString());

      var splitText = text.toString().split(".");
      var integer = splitText[0].toString();

      if (integer >= 10000000000) {
        integer = integer.substring(0, 10);
      }

      var nLenBelowDigitArray = [1];
      var hogaUnit = UnitManager.getHogaUnit(
        this.hogaUnit,
        this.limitsObj.currency,
        text,
        undefined,
        undefined,
        nLenBelowDigitArray
      );
      var hogaUnitBelowPntDigit = NumberUtil.getLenBelowDigit(hogaUnit);

      if (getUnit) {
        // 호가 단위 소수점 자릿수 리턴
        return hogaUnitBelowPntDigit;
      }

      if (splitText.length > 1) {
        var fraction = splitText[1].toString();

        if (fraction.length > hogaUnitBelowPntDigit) {
          fraction = fraction.substring(0, hogaUnitBelowPntDigit * 1);
        }

        return (
          this.addComma(integer) +
          (hogaUnitBelowPntDigit > 0 ? "." + fraction : "")
        );
      } else {
        return this.addComma(integer);
      }
    },
    makeHogaValid(price) {  // 차트에서 클릭한 지정가 호가단위에 맞게 수정 (2019.03.21에 요청된 사항)
      this.limitsRatio = 0; 

      if (price <= 0 ) {
        return;
      }

      this.sellInputChange(price);
      
      var priceText = this.getOnlyNumber(price);
      var callPrice = priceText * 1;// 문자형으로 들어오므로 숫자로 변화처리
      
      // 이전 값
      var nLenBelowDigitArray = [1];
      var hogaunit = UnitManager.getHogaUnit(this.hogaUnit, this.limitsObj.currency, callPrice, undefined, undefined, nLenBelowDigitArray);

      var result = 0;
      if (hogaunit < 1) {
        var hogaunitStr = hogaunit.toFixed(8);
        var fixLength = hogaunitStr.split('.')[1].indexOf('1') + 1
        result = callPrice.toFixed(fixLength + 1);
        result = result.substr(0, result.length-1);
      } else {
        result = Math.round(callPrice / hogaunit) * hogaunit;
      }
      console.log(price, hogaunit, result);

      this.limitsObj.price = this.addComma(result);      
    },
    subtractLimitsPrice() {   // 지정가 호가단위 빼기
      if (this.limitsObj.price === undefined || this.limitsObj.price === "") {
        // 가격이 입력되지 않으면 선택종목의 현재가 입력
        this.limitsObj.price = this.addComma(this.curprc);
        return;
      }

      var priceText = this.getOnlyNumber(this.limitsObj.price);

      if (priceText <= 0) {
        return;
      }

      var nLenBelowDigitArray = [1],
        nLenTargetDigitArray = [1];

      var callPrice = priceText * 1; // 문자형으로 들어오므로 숫자로 변화처리
      // 이전 값
      var call = UnitManager.getHogaUnit(
        this.hogaUnit,
        this.limitsObj.currency,
        callPrice,
        undefined,
        undefined,
        nLenBelowDigitArray
      );
      var nextprc = NumberUtil.substract_Hoga(
        callPrice,
        call,
        nLenBelowDigitArray[0]
      );
      nextprc *= 1;
      // -1 한 값
      call = UnitManager.getHogaUnit(
        this.hogaUnit,
        this.limitsObj.currency,
        nextprc,
        undefined,
        undefined,
        nLenTargetDigitArray
      );
      var price = NumberUtil.substract_Hoga(
        callPrice,
        call,
        nLenTargetDigitArray[0]
      );
      price *= 1;
      price = price.toFixed(nLenTargetDigitArray[0]).toString();

      this.limitsObj.price = this.addComma(price);
    },
    addLimitsPrice() {    // 지정가 호가단위 더하기
      if (this.limitsObj.price === undefined || this.limitsObj.price === "") {
        // 가격이 입력되지 않으면 선택종목의 현재가 입력
        this.limitsObj.price = this.addComma(this.curprc);
        return;
      }

      var priceText = this.getOnlyNumber(this.limitsObj.price);

      var nLenBelowDigitArray = [1],
        nLenTargetDigitArray = [1];
      // 소수점이 있을 경우,
      var callPrice = priceText * 1; // 문자형으로 들어오므로 숫자로 변화처리

      // 이전 값
      var call = UnitManager.getHogaUnit(
        this.hogaUnit,
        this.limitsObj.currency,
        callPrice,
        undefined,
        undefined,
        nLenBelowDigitArray
      );
      var strPrice = priceText.toString();
      var nIndexDot = strPrice.indexOf(".");
      if (nIndexDot > -1) {
        strPrice = strPrice.substr(0, nIndexDot + nLenBelowDigitArray[0] + 1);
      }

      callPrice = strPrice * 1;
      var price = NumberUtil.add_Hoga(callPrice, call, nLenBelowDigitArray[0]);
      price *= 1;
      // +1 한 값
      call = UnitManager.getHogaUnit(
        this.hogaUnit,
        this.limitsObj.currency,
        price,
        undefined,
        undefined,
        nLenTargetDigitArray
      );
      price = price.toFixed(nLenTargetDigitArray[0]).toString();

      if (price >= 10000000000) {
        return;
      }

      this.limitsObj.price = this.addComma(price);
    },
    setPricePercent(percent) {    // 현재가 대비 설정
      if (this.curprc <= 0) {
        return;
      }

      var nLenBelowDigitArray = [1];
      var hogaUnit = UnitManager.getHogaUnit(
        this.hogaUnit,
        this.limitsObj.currency,
        this.curprc,
        undefined,
        undefined,
        nLenBelowDigitArray
      );
      var hogaUnitBelowPntDigit = NumberUtil.getLenBelowDigit(hogaUnit);

      var amt = NumberUtil.multiply(
        this.curprc,
        percent,
        hogaUnitBelowPntDigit
      );
      this.limitsObj.price = this.getHogaUnitValid(
        parseFloat(amt) + parseFloat(this.curprc)
      );
      if (
        hogaUnit >= 1 &&
        this.getOnlyNumber(this.limitsObj.price) % hogaUnit >= 1
      ) {
        this.limitsObj.price = this.addComma(
          this.getOnlyNumber(this.limitsObj.price) -
            (this.getOnlyNumber(this.limitsObj.price) % hogaUnit)
        );
      }
    },
    checkHogaUnit(value) {    // 지정가 호가단위 검사
      if (value === undefined || value === "") {
        return;
      }

      var text = this.getOnlyNumber(value.toString());

      var splitText = text.toString().split(".");
      var integer = splitText[0].toString();

      var nLenBelowDigitArray = [1];
      var hogaUnit = UnitManager.getHogaUnit(
        this.hogaUnit,
        this.limitsObj.currency,
        text,
        undefined,
        undefined,
        nLenBelowDigitArray
      );

      if (integer % hogaUnit >= 1) {
        // 호가단위(' + this.addComma(hogaUnit) + ' ' + this.limitsObj.currency + ')로 입력 바랍니다'
        this.$alert(this.$t('noti.b006', [this.addComma(hogaUnit) + " " + this.limitsObj.currency]), "",
          {
            confirmButtonText: this.$t('noti.b012') // 확인
          }
        );
        return false;
      } else {
        return true;
      }
    },
    dispatchSetNotiSetting(payload, resolve, reject) {    // 알림 등록
      this.$store
        .dispatch("setNotiSetting", payload)
        .then(resolve)
        .catch(reject);
    },
    regChangeNoti(_srt) {   // 알림 등록 전 데이터 유효성 검사 및 input 값 세팅
      // 거래량 알림 등록 버튼 클릭
      let self = this;

      var payload = {
        JobFlag: "R",
        Code: self.itemId
      };

      // 지정가 알림 등록
      if (_srt === "limits") {
        if (!self.limitsObj.price || self.limitsObj.price <= 0) {
          self.$alert(self.$t('noti.b009'), "", { // 알림 받을 지정가를 입력해 주세요.
            confirmButtonText: self.$t('noti.b012') // 확인
          });
          return;
        } else if (!self.checkHogaUnit(self.limitsObj.price)) {
          return;
        } else {
          payload["CondNo"] = "0001";
          payload["Condition1"] = self.limitsObj.price.replace(/,/g, "");
        }
        // 등락 알림 (상승)
      } else if (_srt === "up") {
        payload["CondNo"] = "0002";
        payload["Condition1"] = self.fluctuationUpMinute.replace(/,/g, "");
        payload["Condition2"] = self.fluctuationUpRatio;
        payload["Condition3"] = "0"; // 상승

        // 등락 알림 (하락)
      } else if (_srt === "down") {
        payload["CondNo"] = "0002";
        payload["Condition1"] = self.fluctuationDownMinute.replace(/,/g, "");
        payload["Condition2"] = self.fluctuationDownRatio;
        payload["Condition3"] = "1"; // 하락

        // 거래량 알림
      } else if (_srt === "change") {
        payload["CondNo"] = "0003";
        payload["Condition1"] = self.changeMinute.replace(/,/g, "");
        payload["Condition2"] = self.changeRatio;
      }

      const resolve = obj => {
        if (obj["Result"] == "S100") {
          // 등록성공

          self.regChangeNotiOk();
          self.$EventBus.$emit("setNotisettingChk");
        } else if (obj["Result"] == "E101") {
          // 등록 에러

          self.errAlert("E101", {});
        } else if (obj["Result"] == "E102") {
          // 설정가능 갯수 초과

          self.errAlert("E102", obj);
        } else if (obj["Result"] == "E103") {
          // 동일한 설정 조건 존재

          self.errAlert("E103", {});
        }
      };

      const reject = obj => {
        self.$alert(obj.errMsg, "", {
          dangerouslyUseHTMLString: false,
          confirmButtonText: self.$t('noti.b012') // 확인
        });
      };

      self.dispatchSetNotiSetting(payload, resolve, reject);
    },
    errAlert(errCode, param) {    // 디자인 적용된 얼럿 메시지
      let self = this;
      var errMsg = "";
      var htmlStringChk = false;

      if (errCode == "E101") {
        errMsg = self.$t('noti.b013');// 알림 등록중 에러가 발생했습니다.
      } else if (errCode == "E102") {
        errMsg = self.$t('noti.b010', [(param["MaxCnt"] * 1)]);  // 최대 등록 개수(" + param["MaxCnt"] * 1 + "개)를 초과하였습니다.<br>기존 알림 삭제 후 재등록 바랍니다.
        htmlStringChk = true;
      } else {
        errMsg = self.$t('noti.b011');  // 동일한 조건으로 설정된 알림이 존재합니다.
      }

      self.$alert(errMsg, "", {
        dangerouslyUseHTMLString: htmlStringChk,
        confirmButtonText: self.$t('noti.b012') // 확인
      });
    },
    regChangeNotiOk() {   // 등록완료 시 팝업
      this.$alert(
        this.$t('noti.b008'), // 알림이 등록되었습니다.<br>등록한 알림은 알림 현황에서 확인 가능합니다.
        "",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: this.$t('noti.b012') // 확인
        }
      );
    },
    changeItemId(value) {   // 종목 변경
      this.$EventBus.$emit('changeSymbolToChart', {ref:this.$refs.stockGraph, symbol: value});
      this.itemId = value;
    },
    setCoins() {    // 종목 셀렉트 박스 데이터 세팅
      let self = this;
      var tmpObj = {
        KRW: [],
        BTC: [],
        ETH: []
      };
      self.$socket.sendProcessByName(
        "n1001",
        function(queryData) {
          var block = queryData.getBlockData("InBlock1")[0];
          block["i_qrydiv"] = "0";
        },
        function(queryData) {
          if (queryData != null) {
            const nameList = queryData["queryObj"]["OutBlock2"];
            for (var idx in nameList) {
              let symb = nameList[idx]["o_symbol"];
              let enNm = nameList[idx]["o_inst_eng_nm"];
              let koNm = nameList[idx]["o_inst_kor_nm"];
              let abbr = nameList[idx]["o_inst_eng_abbr"];
              if (nameList[idx]["o_setl_cur_cd_n"] == "KRW") {
                tmpObj["KRW"].push({
                  value: symb,
                  labelKo: koNm.substring(0, koNm.indexOf("/")) + " " + abbr,
                  labelEn: enNm.substring(0, enNm.indexOf("/")) + " " + abbr
                });
              } else if (nameList[idx]["o_setl_cur_cd_n"] == "BTC") {
                tmpObj["BTC"].push({
                  value: symb,
                  labelKo: koNm.substring(0, koNm.indexOf("/")) + " " + abbr,
                  labelEn: enNm.substring(0, enNm.indexOf("/")) + " " + abbr
                });
              } else if (nameList[idx]["o_setl_cur_cd_n"] == "ETH") {
                tmpObj["ETH"].push({
                  value: symb,
                  labelKo: koNm.substring(0, koNm.indexOf("/")) + " " + abbr,
                  labelEn: enNm.substring(0, enNm.indexOf("/")) + " " + abbr
                });
              }
            }

            self.nameOptions = tmpObj["KRW"].concat(tmpObj["BTC"]).concat(tmpObj["ETH"]);
            if (self.currentSymbol) {
              self.itemId = self.currentSymbol;
            } else {
              if (self.nameOptions.length > 0) {
                self.itemId = self.nameOptions[0]["value"];
              }
            }
          } else {
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "n1001") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: self.$t('sys_err.a001')
            });
          }
        }
      );
    },
    getNowPrice(symbol) {   // 현재가 조회
      let self = this;
      this.$socket.sendProcessByName(
        "i0018",
        function(queryData) {
          var block = queryData.getBlockData("InBlock1")[0];
          // 조회구분
          block["symbolcnt"] = "1";
          block["qry_div"] = "4";
          block["paycurrcode"] = "99999";
          block["excode"] = "001";
          var block2 = queryData.queryObj["InBlock2"];
          block2.push({
            symbol: symbol
          });
        },
        function(queryData) {
          // console.log(queryData);
          if (queryData != null) {
            self.nowPrice = queryData["queryObj"]["OutBlock2"][0];
            self.registerKVS0();
          } else {
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "i0018") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: self.$t('sys_err.a001')
            });
          }
        }
      );
    },
    registerKVS0(symbol) {    // 현재가 실시간 등록
      let self = this;
      var callback = function(resData) {
        self.realDataKVS0 = resData.getBlockData("OutBlock1")[0];
        self.curprc = self.realDataKVS0["execprice"];
        self.realDataKVS0 = null;
      };

      self.$socket.unregisterReal("KVS0", self.trSymbols, self.name);
      self.$socket.registerReal("KVS0", "symbol", [self.nowPrice["symbol"]], self.name, callback);
    },
    // 알림 모달 팝업
    showModalAlerm() {
      this.isShowAlerm = true;
      this.isConfirmAlerm = false;
      this.isShowModalUniversalTime = false;
    },
    // 세계시간 리스트
    showModalUniversalTime(isFlag) {
      this.isShowModalUniversalTime = (isFlag !== undefined) ? isFlag : !this.isShowModalUniversalTime;
    },
    limitsRatioClick(val, old) {
      
      if (val == old) {
        this.setPricePercent(val)
      }
    },
    sellInputChange(val) {       // 호가창 매수가격 클릭 시 가격입력 스타일 설정
        // if (val !== this.getOnlyNumber(this.price)) {
            this.NotiPriceChange = true;
        // } else {
        //     this.NotiPriceChange =  false;
        // }

        setTimeout(() => this.NotiPriceChange = false, 300);        
    }
  },
  computed: {
    ...mapState({
      currentSymbol: state => state.data.currentSymbol,
      trSymbols: state => state.data.trSymbols
    }),
    ...mapGetters(["hogaUnit", "getUserId"]),
    socketConnected() {
      return this.$store.getters.isSocketConnected;
    },
    fluctuationMinuteOptions() {    // 등락 알림 시간 옵션
      let self = this;
      return [
        {
          value: "3",
          label: self.$t("noti.c003-0")
        },
        {
          value: "15",
          label: self.$t("noti.c003-1")
        },
        {
          value: "30",
          label: self.$t("noti.c003-2")
        },
        {
          value: "60",
          label: self.$t("noti.c003-3")
        }
      ];
    },
    changeMinuteOptions() {   // 거래량 알림 시간 옵션
      let self = this;
      return [
        {
          value: "3",
          label: self.$t("noti.d003-0")
        },
        {
          value: "15",
          label: self.$t("noti.d003-1")
        },
        {
          value: "30",
          label: self.$t("noti.d003-2")
        }
      ];
    },
    changeRatioOptions() {    // 거래량 알림 등락률 옵션
      let self = this;
      return [
        {
          value: "2",
          label: self.$t("noti.d004-0")
        },
        {
          value: "3",
          label: self.$t("noti.d004-1")
        },
        {
          value: "5",
          label: self.$t("noti.d004-2")
        }
      ];
    }
  },
  created() {
    let self = this;

    self.setCoins();
  },
  mounted() {
    this.$EventBus.$on('changePriceFromChart', this.makeHogaValid);
    this.$EventBus.$on('changeCurrentSymbol', this.changeItemId);
  },
  watch: {
    socketConnected(val, old) {
      let self = this;

      self.setCoins();
    },
    /** watch currentSymbol( 관심종목List 중 선택된 종목 )
     * 실행시점	 : 1.관심종목 클릭시, 2.관심종목 목록호출(setCoins)시
     * desc		: 관심종목 목록 호출시 default 첫번째 종목으로 설정
     */
    currentSymbol(val, old) {
      this.itemId = val;
    },
    /** watch itemId (selectBox에서 선택된 종목)
     * 실행시점	 : 1.현재 선택종목 변경시, 2.selectbox 변경시
     * param	: symbol값
     */
    itemId(val, old) {
      this.getNowPrice(val);
    },
    /** watch nowPrice ( itemId기준 종목 정보 set )
     * 실행시점  : 1.itemId 변경시
     * desc		: activeTabName = [limits, fluctuation, change]
     */
    nowPrice(val, old) {
      let self = this;

      self.curprc = val["curprc"];
      self.limitsObj.currency = val["paycurrcode"];
      self.setPricePercent(this.limitsRatio);
    },
    limitsRatio(val, old) {
      this.setPricePercent(val);
      this.tmpLimitsRatio = val
    }
  },
  beforeDestroy() {
    var self = this;
    self.$socket.unregisterReal("KVS0", self.trSymbols, self.name);

    this.$EventBus.$off('changePriceFromChart', this.makeHogaValid);
    this.$EventBus.$off('changeCurrentSymbol', this.changeItemId);
  }
};
</script>