<template>
  <div class="NotiSettingDetail">
    <div class="top_wrap">
      <el-autocomplete
        popper-class="saved_keywords"
        v-model="input"
        class="top_search_inp"
        :fetch-suggestions="querySearch"
        @select="querySelect"
        id="search_autocomplete"
      >
        <!-- 개발참고 : 셀렉트 -> 검색으로 변경 -->
        <template slot-scope="{ item }">
          <div class="saved-cell">
            <span class="event">{{ $i18n.locale === 'en' ? item.enm : item.knm }}</span>
            <span class="symbol">{{ item.abbr }}</span>
          </div>
        </template>
        <i class="el-icon-delete" slot="suffix" @click="onVallDelete"></i>
        <!-- 검색 delete btn -->
        <i class="el-icon-search" slot="suffix"></i>
        <!-- @click="onSearch" -->
      </el-autocomplete>

      <div class="info_txt">
        <div
          :class="{'up' : upDownClass == 'up', 'down': upDownClass == 'down', '': upDownClass == 'default'}"
        >
          <!-- up 상승 , down 하락-->
          <p class="left_txt">
            <span class="top_txt">
              <span
                class="number"
                v-if="nowPrice.curprc != null"
              >{{priceFormat(nowPrice.paycurrcode, nowPrice.curprc)}}</span>
              <span class="gray_txt">{{nowPrice.paycurrcode}}</span>
            </span>
            <span class="btm_txt" v-if="getChangedPrice">{{ getChangedPrice }} KRW</span>
          </p>
          <p class="rigth_txt">
            <span
              class="top_txt"
              v-if="nowPrice.diff != null"
            >{{diffFormat(nowPrice.paycurrcode, nowPrice.diff)}}</span>
            <span
              class="btm_txt"
              v-if="nowPrice.updnrate != null"
            >{{nowPrice.updnrate > 0 ? '+' : ''}}{{nowPrice.updnrate.toFixed(2)}}%</span>
          </p>
        </div>
      </div>
    </div>
    <el-tabs type="card" @tab-click="handleClick" v-bind:stretch="stretchTab" class="box_tab_sy">
      <!-- 개발참고 : 작업중 오류 발생으로 옵션 삭제 v-model="activeTabName"  -->
      <!-- 지정가 알림 탭 시작 -->
      <el-tab-pane :label="$t('m_noti.e001')" class="tab">
        <!-- 개발참고 : 작업중 오류 발생으로 옵션 삭제 name="limits"  -->
        <div class="gray_box">
          <div class="row_cont limits_price">
            <el-input
              v-model="limitsObj.price"
              @keydown.native="keyDown"
              @keypress.native="keyPress"
              @keyup.native="keyUp"
              class="label_inp mix_inp inp_m"
              disabled
              @click.native="viewKeyPad"
            >
              <template slot="prepend">{{$t('m_noti.e002')}}</template>
              <template slot="append">{{limitsObj.currency}}</template>
            </el-input>
            <div class="size_wrap">
              <el-button v-on:click="subtractLimitsPrice" class="minus"></el-button>
              <el-button v-on:click="addLimitsPrice" class="plus"></el-button>
            </div>
          </div>
          <div class="row_cont">
            <div class="label_select">
              <p class="label">{{$t('m_noti.e003')}}</p>
              <el-select v-model="limitsRatio" class="sel_m" popper-class="m_style" @visible-change="changeVisible">
                <el-option @click.native="limitsRatioClick(item.value, tmpLimitsRatio)"
                  v-for="item in limitsRatioOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="row_cont">
            <el-button @click="regChangeNoti('limits')" class="b_success_btn">{{$t('m_noti.e004')}}</el-button>
          </div>
        </div>
        <div>
          <!-- keypad : 지정가 -->
          <el-dialog
            :visible.sync="pricePad"
            :append-to-body="true"
            class="keypad price noti mobile"
            :close-on-click-modal="false"
            :show-close="false"
            @closed="closeDialog"
          >
            <el-row class="amount-order">
              <el-col class="input">
                <div class="label">{{$t('m_noti.a002-0')}}</div>
                <div class="value_bx">
                  <div class="value_account">
                    <div class="value" v-bind:class="checkPriceLength ? 'f_size_small' : ''">
                      {{ limitsObj.price }}
                      <span class="unit">{{ limitsObj.currency }}</span>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col class="btns">
                <el-button @click="subtractLimitsPrice">-</el-button>
              </el-col>
              <el-col class="btns">
                <el-button @click="addLimitsPrice">+</el-button>
              </el-col>
            </el-row>
            <el-row class="number-input">
              <el-col class="number-part">
                <el-row class="amount-btns">
                  <el-col :span="12">
                    <el-button @click="limitsObj.price = ''">{{$t('m_keypad.a002')}}</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button @click="setPriceKeypad('delete')">←</el-button>
                  </el-col>
                </el-row>
                <el-row class="number-pad pad2">
                  <el-col>
                    <el-button @click="setPriceKeypad('7')">7</el-button>
                    <el-button @click="setPriceKeypad('8')">8</el-button>
                    <el-button @click="setPriceKeypad('9')">9</el-button>
                    <el-button @click="setPriceKeypad('4')">4</el-button>
                    <el-button @click="setPriceKeypad('5')">5</el-button>
                    <el-button @click="setPriceKeypad('6')">6</el-button>
                    <el-button @click="setPriceKeypad('1')">1</el-button>
                    <el-button @click="setPriceKeypad('2')">2</el-button>
                    <el-button @click="setPriceKeypad('3')">3</el-button>
                    <el-button @click="setPriceKeypad('.')">.</el-button>
                    <el-button @click="setPriceKeypad('0')">0</el-button>
                    <el-button @click="setPriceKeypad('000')">000</el-button>
                  </el-col>
                </el-row>
              </el-col>
              <el-col class="number-select">
                <el-button @click="setPricePercent('0.10')" class="plus">+10%</el-button>
                <el-button @click="setPricePercent('0.05')" class="plus">+5%</el-button>
                <el-button @click="setPricePercent('0')">{{$t('m_keypad.a006')}}</el-button>
                <el-button @click="setPricePercent('-0.05')" class="minus">-5%</el-button>
                <el-button @click="setPricePercent('-0.10')" class="minus">-10%</el-button>
              </el-col>
            </el-row>
            <div class="keypad-footer">
              <el-button @click="setPriceKeypad('close')">{{$t('m_keypad.a008')}}</el-button>
              <el-button @click="confirmDialog">{{$t('m_keypad.a007')}}</el-button>
            </div>
          </el-dialog>
        </div>
      </el-tab-pane>
      <!-- 지정가 알림 탭 끝 -->
      <!-- 등락 알림 탭 시작 -->
      <el-tab-pane :label="$t('m_noti.f001')" class="tab">
        <!-- 개발참고 : 작업중 오류 발생으로 옵션 삭제 name="fluctuation"  -->
        <div class="gray_box">
          <div class="row_cont">
            <!-- <p class="fluctuation_tit up">{{$t('m_noti.d002-1')}}</p> -->
            <div class="fluctuation_select">
              <el-select v-model="fluctuationUpMinute" class="sel_m" popper-class="m_style">
                <el-option
                  v-for="item in fluctuationMinuteOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="select_minute_text wid02">{{$t('m_noti.f003')}}</span>
              <el-select v-model="fluctuationUpRatio" class="sel_m" popper-class="m_style">
                <el-option
                  v-for="item in fluctuationRatioOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="select_minute_text" v-html="$t('m_noti.f004')"></span>
            </div>
          </div>
          <div class="row_cont">
            <el-button @click="regChangeNoti('up')" class="b_success_btn">{{$t('m_noti.f006')}}</el-button>
          </div>
          <div class="row_cont">
            <!-- <p class="fluctuation_tit down">{{$t('m_noti.d002-2')}}</p> -->
            <div class="fluctuation_select">
              <el-select v-model="fluctuationDownMinute" class="sel_m" popper-class="m_style" @visible-change="changeVisible">
                <el-option
                  v-for="item in fluctuationMinuteOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="select_minute_text wid02">{{$t('m_noti.f003')}}</span>
              <el-select v-model="fluctuationDownRatio" class="sel_m" popper-class="m_style" @visible-change="changeVisible">
                <el-option
                  v-for="item in fluctuationRatioOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="select_minute_text" v-html="$t('m_noti.f005')"></span>
            </div>
          </div>
          <div class="row_cont">
            <el-button @click="regChangeNoti('down')" class="b_success_btn">{{$t('m_noti.f006')}}</el-button>
          </div>
        </div>
      </el-tab-pane>
      <!-- 등락 알림 탭 끝 -->
      <!-- 거래량 변동 알림 탭 시작 -->
      <el-tab-pane :label="$t('m_noti.g001')" class="tab">
        <!-- 개발참고 : 작업중 오류 발생으로 옵션 삭제 name="change"  -->
        <div class="gray_box">
          <div class="row_cont">
            <div class="fluctuation_select">
              <el-select v-model="changeMinute" class="sel_m" popper-class="m_style">
                <el-option
                  v-for="item in changeMinuteOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="select_minute_text wid03">{{$t('m_noti.g004')}}</span>
              <el-select v-model="changeRatio" class="sel_m" popper-class="m_style">
                <el-option
                  v-for="item in changeRatioOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="select_minute_text" v-html="$t('m_noti.f004')"></span>
            </div>
          </div>
          <div class="row_cont">
            <el-button @click="regChangeNoti('change')" class="b_success_btn">{{$t('m_noti.f006')}}</el-button>
          </div>
        </div>
      </el-tab-pane>
      <!-- 거래량 변동 알림 탭 끝 -->
    </el-tabs>
    <div class="chart" :class="activeTabIdx == '0' ? 'tab1' : activeTabIdx == '1' ? 'tab2' : activeTabIdx == '2' ? 'tab3' : 'tab1'">
        <app-graph v-if="isShow" @chart-modal-alerm="isShowAlerm = true" :alerm-props="alermProps" @send-alerm-props="alermProps=$event"></app-graph>
    </div>
    <!-- 시작 : 차트 모달 팝업 영역 -->
    <div class="popup_wrapper_mobile">
      <div id="chart-popup-wrapper"></div>
      <modal-alerm v-if="isShowAlerm" @confirm="isShowAlerm = false, isConfirmAlerm = true" @close="isShowAlerm = false"
        :alerm-props="alermProps" @send-alerm-prop="alermProps[$event['key']]['value'] = $event['value']"></modal-alerm>
    </div>
    <!-- 끝 : 차트 모달 팝업 영역 -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import AppGraph from "../../exchanges/AppGraph";
import fromExponential from "from-exponential";
import ModalAlerm from "../../order/modal/ModalAlerm";
import { setTimeout, clearTimeout } from 'timers';

export default {
  props: ["itemId"],
  components: {
    AppGraph,
    ModalAlerm
  },
  data() {
    return {
      timer: null,                // 차트 z-index 조정을 위한 타이머
      name: "NotiSettingDetail",  // 명칭
      upDownClass: "default",     // 등락률 스타일 적용을 위한 클래스 명
      input: "",                  // 종목 검색 입력값
      pricePad: false,            // 지정가 키패드 표시 여부
      prevValue: "",              // 키패드 입력 전 값
      savedKeywords: [],          // 종목 리스트
      stretchTab: true,           // 메뉴 스트레치 여부
      nowPrice: {},               // 선택종목 데이터
      realDataKVS0: null,         // 실시간 데이터
      currentBtcKrPrice: 0,       // BTC마켓인 경우 BTC 한화 현재가
      currentEthKrPrice: 0,       // ETH마켓인 경우 ETH 한화 현재가
      activeTabIdx: '0',          // 활성 탭 인덱스
      limitsObj: {                // 지정가 데이터
        price: 0,                 // 지정가 알림 가격
        currency: ""              // 지정가 알림 통화코드
      },
      limitsRatio: 0,             // 현재가 대비 지정가 선택 시 비율
      tmpLimitsRatio: 0,
      limitsRatioOptions: [       // 현재가 대비 옵션
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

      fluctuationRatioOptions: [  // 등락률 옵션
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
      changeMinute: "3",        // 시간
      changeRatio: "2",         // 등락률

      // 신호선 설정 팝업
      isShowAlerm: false, // 차트 모달(alerm) 노출여부
      isConfirmAlerm: false, // 차트 모달(alerm) 확인버튼 클릭여부
      alermProps: [],
      isShow: true
    };
  },
  methods: {
    changeVisible(e) {
      if(e) {
        this.$EventBus.$emit('downChart');
      } else {
        this.$EventBus.$emit('upChart');
      }
    },
    querySearch(qs, cb) {   // 종목 검색어 입력 시 필터링된 검색어 표시
      var saved = this.savedKeywords;
      var results = qs ? saved.filter(this.createFilter(qs)) : saved;
      cb(results);
    },
    createFilter(qs) {      // 종목 검색어 필터
      return item => {
        let text = item.knm + " " + item.enm + " " + item.abbr.split("/")[0];
        return text.toLowerCase().indexOf(qs.toLowerCase()) > -1;
      };
    },
    querySelect(val) {      // 종목 검색
      let self = this;
      let nm = self.$i18n.locale === "en" ? val.enm : val.knm;
      self.input = nm + " " + val.abbr;

      self.$store.commit("setCurrentSymbol", val.symbol);
      self.$EventBus.$emit("changeCurrentSymbol", val.symbol);
      sessionStorage.setItem("currentSymbol", val.symbol);

      self.$socket.sendProcessByName(
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
            symbol: val.symbol
          });
        },
        function(queryData) {
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
    onVallDelete() {    // 종목 검색어 삭제
      this.input = "";
      document
        .getElementsByClassName("el-icon-delete")[0]
        .classList.remove("show");
      document
        .getElementsByClassName("top_search_inp")[0]
        .getElementsByClassName("el-input")[0]
        .getElementsByTagName("input")[0].value = "";
    },
    handleClick(tabObj) {     // 탭 선택 이벤트
      this.isShow = false;
      this.$nextTick(() => {
        // Add the component back in
        this.isShow = true;
      });
      this.activeTabIdx = tabObj.index;
    },
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

      value = value.toString().replace(/[^0-9.]/g, "");
      // 정수 앞쪽의 0 제거
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
    keyPress(event) {   // 지정가 입력 시 숫자, . 아니면 입력 방지
      var charCode =
        typeof event.which === undefined ? event.keyCode : event.which;
      var charStr = String.fromCharCode(charCode);
      var keyPosition = event.target.selectionStart; // 키 입력 위치

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

        var decimalLimit; // 소수점 자릿수 조회
        decimalLimit = this.getHogaUnitValid(tmpValue, true);

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
          // 소수점 없는 경우 . 입력 방지
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
    keyUp(event) {    // 지정가 자릿수 체크
      event.target.readOnly = false;

      this.limitsObj.price = this.getHogaUnitValid(this.limitsObj.price);
    },
    getHogaUnitValid(value, getUnit) {    // 소수점 자릿수 처리 - 호가단위
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
      if (price <= 0 ) {
        return;
      }
      
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
    priceFormat(cd, prc) {    // 현재가 표기 정책 적용
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
    diffFormat(cd, prc) {   // 대비값 표기 정책 적용
      let self = this;

      if (cd == "KRW") {
        return self.addComma(Math.abs(prc));
      }

      return self.addComma(parseFloat(Math.abs(prc)).toFixed(8));
    },
    subtractLimitsPrice() {   // 지정가 호가단위 빼기
      if (this.limitsObj.price === undefined || this.limitsObj.price === "") {
        // 가격이 입력되지 않으면 선택종목의 현재가 입력
        this.limitsObj.price = this.addComma(this.nowPrice.curprc);
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
        this.limitsObj.price = this.addComma(this.nowPrice.curprc);
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
    setPricePercent(percent) {    // 지정가 현재가 대비 셀렉트로 설정
      if (this.nowPrice.curprc <= 0) {
        return;
      }

      var nLenBelowDigitArray = [1];
      var hogaUnit = UnitManager.getHogaUnit(
        this.hogaUnit,
        this.limitsObj.currency,
        this.nowPrice.curprc,
        undefined,
        undefined,
        nLenBelowDigitArray
      );
      var hogaUnitBelowPntDigit = NumberUtil.getLenBelowDigit(hogaUnit);

      var amt = NumberUtil.multiply(
        this.nowPrice.curprc,
        percent,
        hogaUnitBelowPntDigit
      );
      this.limitsObj.price = this.getHogaUnitValid(
        parseFloat(amt) + parseFloat(this.nowPrice.curprc)
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
    checkHogaUnit(value) {    // 지정가 호가단위 체크
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
        this.$message({
          // 호가단위(" + this.addComma(hogaUnit) + " " + this.limitsObj.currency + ")로 입력 바랍니다.
          message: this.$t("m_noti.e005", [this.addComma(hogaUnit) + this.limitsObj.currency]),
          customClass: "notify_order_reject not-sign",
          dangerouslyUseHTMLString: true,
          center: true,
          duration: 2000
        });
        return false;
      } else {
        return true;
      }
    },
    regChangeNoti(_srt) {   // 알림 등록
      let self = this;
      var payload = {
        JobFlag: "R",
        Code: self.nowPrice["symbol"]
      };

      self.$EventBus.$emit("downChart");

      // 지정가 알림 등록
      if (_srt === "limits") {
        if (self.limitsObj.price <= 0 || !self.limitsObj.price) {
          self.$message({
            message: self.$t("m_noti.e026"), // "알림 받을 지정가를 입력해 주세요.",
            customClass: "notify_order_reject not-sign",
            dangerouslyUseHTMLString: true,
            center: true,
            duration: 2000
          });

          self.timer = setTimeout(() => {
            self.$EventBus.$emit("upChart");
          }, 2000);
          
          return;
        } else if (!self.checkHogaUnit(self.limitsObj.price)) {
          self.timer = setTimeout(() => {
            self.$EventBus.$emit("upChart");
          }, 2000);

          return;
        } else {
          payload["CondNo"] = "0001";
          payload["Condition1"] = self.limitsObj.price
            .toString()
            .replace(/,/g, "");
        }
        // 등락 알림 (상승)
      } else if (_srt === "up") {
        payload["CondNo"] = "0002";
        payload["Condition1"] = self.fluctuationUpMinute
          .toString()
          .replace(/,/g, "");
        payload["Condition2"] = self.fluctuationUpRatio;
        payload["Condition3"] = "0"; // 상승

        // 등락 알림 (하락)
      } else if (_srt === "down") {
        payload["CondNo"] = "0002";
        payload["Condition1"] = self.fluctuationDownMinute
          .toString()
          .replace(/,/g, "");
        payload["Condition2"] = self.fluctuationDownRatio;
        payload["Condition3"] = "1"; // 하락

        // 거래량 알림
      } else if (_srt === "change") {
        payload["CondNo"] = "0003";
        payload["Condition1"] = self.changeMinute.toString().replace(/,/g, "");
        payload["Condition2"] = self.changeRatio;
      }

      const resolve = obj => {

        if (obj["Result"] == "S100") {
          // 등록성공
          self.$message({
            message: self.$t("m_noti.e025"),
            //   "알림이 등록되었습니다.<br>등록한 알림은 알림설정에서 확인가능합니다.",
            customClass: "notify_order_reject not-sign",
            dangerouslyUseHTMLString: true,
            center: true,
            duration: 2000
          });
        } else if (obj["Result"] == "E101") {
          // 등록 에러
          self.$message({
            message: self.$t("m_noti.e029"), // "알림 등록중 에러가 발생했습니다.",
            customClass: "notify_order_reject not-sign",
            dangerouslyUseHTMLString: true,
            center: true,
            duration: 2000
          });
        } else if (obj["Result"] == "E102") {
          // 설정가능 갯수 초과
          self.$message({
            message: self.$t("m_noti.e027", [Number(obj["MaxCnt"])]),
            //   "최대 등록 개수(" +
            //   obj["MaxCnt"] +
            //   "개)를 초과하였습니다.<br>기존 알림 삭제 후 재등록 바랍니다.",
            customClass: "notify_order_reject not-sign",
            dangerouslyUseHTMLString: true,
            center: true,
            duration: 2000
          });
        } else if (obj["Result"] == "E103") {
          // 동일한 설정 조건 존재
          self.$message({
            message: self.$t("m_noti.e028"), // "동일한 조건으로 설정된 알림이 존재합니다.",
            customClass: "notify_order_reject not-sign",
            dangerouslyUseHTMLString: true,
            center: true,
            duration: 2000
          });
        }

        self.timer = setTimeout(() => {
          self.$EventBus.$emit("upChart");
        }, 2000);
      };

      self.$store.dispatch("setNotiSetting", payload).then(resolve).catch(self.errAlert);;
    },
    setCoins() {    // 종목 리스트 세팅
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
              let symbol = nameList[idx]["o_symbol"];
              let enm = nameList[idx]["o_inst_eng_nm"].split("/")[0];
              let knm = nameList[idx]["o_inst_kor_nm"].split("/")[0];
              let abbr = nameList[idx]["o_inst_eng_abbr"];
              if (nameList[idx]["o_setl_cur_cd_n"] == "KRW") {
                tmpObj["KRW"].push({
                  symbol,
                  abbr,
                  enm,
                  knm
                });
              } else if (nameList[idx]["o_setl_cur_cd_n"] == "BTC") {
                tmpObj["BTC"].push({
                  symbol,
                  abbr,
                  enm,
                  knm
                });
              } else if (nameList[idx]["o_setl_cur_cd_n"] == "ETH") {
                tmpObj["ETH"].push({
                  symbol,
                  abbr,
                  enm,
                  knm
                });
              }
            }

            self.savedKeywords = tmpObj["KRW"]
              .concat(tmpObj["BTC"])
              .concat(tmpObj["ETH"]);

            if (self.itemId) {
              var itemObj = self.savedKeywords.filter(function(obj) {
                if (obj["symbol"] == self.itemId) {
                  return obj;
                }
              });
              self.querySelect(itemObj[0]);
            } else if (self.currentSymbol) {
              var itemObj = self.savedKeywords.filter(function(obj) {
                if (obj["symbol"] == self.currentSymbol) {
                  return obj;
                }
              });
              self.querySelect(itemObj[0]);
            } else {
              self.querySelect(self.savedKeywords[0]);
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
    toggleModalCounter(icnt) {
      this.chartModal.icnt = Number(icnt);
      this.chartModal.showModalCounter = this.chartModal.showModalCounter
        ? false
        : true;
    },
    registerKVS0() {  // 현재가 실시간 등록
      let self = this;
      var callback = function(resData) {
        self.realDataKVS0 = resData.getBlockData("OutBlock1")[0];
        self.$nextTick(function() {
          if(self.realDataKVS0 !== null && self.realDataKVS0["execprice"] != null) {
            self.nowPrice["curprc"] = self.realDataKVS0["execprice"];
            self.nowPrice["diff"] = self.realDataKVS0["diff"];
            self.nowPrice["updnrate"] = self.realDataKVS0["updnrate"];
            self.upDownClass = Number(self.realDataKVS0["diff"]) < 0 ? "down" : Number(self.realDataKVS0["diff"]) == 0 ? "default" : "up"; 
          }
        });
      };

      self.$socket.unregisterReal("KVS0", self.trSymbols, self.name);
      self.$socket.registerReal(
        "KVS0",
        "symbol",
        [self.nowPrice["symbol"]],
        self.name,
        callback
      );
    },
    viewKeyPad() {    // 지정가 키패드 표시
      clearTimeout(this.timer);
      this.timer = null;
      this.$EventBus.$emit('downChart');

      this.prevValue = this.limitsObj.price;
      this.pricePad = true;
    },
    setPriceKeypad(value) {   // 지정가 키패드 - 키 입력
      if (value === "delete") {
        this.limitsObj.price = this.limitsObj.price
          .toString()
          .substring(0, this.limitsObj.price.toString().length - 1);
        this.limitsObj.price = this.getHogaUnitValid(
          this.limitsObj.price + value
        );
      } else if (value === "close") {
        this.pricePad = false;
        this.limitsObj.price = this.prevValue;
      } else if (
        (value === "0" || value === "000") &&
        (this.limitsObj.price === "" || this.limitsObj.price < 0)
      ) {
        this.limitsObj.price = "0";
      } else {
        this.limitsObj.price = this.getHogaUnitValid(
          this.limitsObj.price + value
        );
      }
    },
    closeDialog() {   // 지정가 키패드 닫기
      this.$EventBus.$emit("upChart");
    },
    confirmDialog() { // 지정가 키패드 확인
      this.pricePad = false;
      this.$EventBus.$emit("upChart");
    },
    limitsRatioClick(val, old) {
      
      if (val == old) {
        this.setPricePercent(val)
      }
    },
    errAlert(errorData) {
      this.$alert(errorData.errMsg, '', {
          confirmButtonText: this.$t('noti.b012')
      });
    }
  },
  created() {
    this.$EventBus.$emit("mobile-nav-title", this.$t("m_noti.e004"));
    this.$EventBus.$emit("mobile-nav-menus", [
      "notiSettingGuide",
      "noDefault",
      "back"
    ]);
  },
  mounted() {
    let self = this;
    if (self.$store.getters.isSocketConnected) {
      self.setCoins();
    } else {
      self.$EventBus.$on("socketConnected", () => {
        self.setCoins();
      });
    }

    self.currentBtcKrPrice = self.$store.state.data.currentBtcKrPrice;
    self.currentEthKrPrice = self.$store.state.data.currentEthKrPrice;
    self.$EventBus.$on("currentKrPrice", data => {
      self.currentBtcKrPrice = self.$store.state.data.currentBtcKrPrice;
      self.currentEthKrPrice = self.$store.state.data.currentEthKrPrice;
    });

    //검색 삭제(X) 버튼
    var searchInp = document
      .getElementsByClassName("top_search_inp")[0]
      .getElementsByTagName("input")[0];

    searchInp.addEventListener("keyup", function() {
      if (searchInp.value == "") {
        document
          .getElementsByClassName("el-icon-delete")[0]
          .classList.remove("show");
      } else {
        document
          .getElementsByClassName("el-icon-delete")[0]
          .classList.add("show");
      }
    });

    $("#search_autocomplete").bind("keyup", function (e) {
      if (e.target.value == '') {
        setTimeout(() => {
          self.input = '';      
        }, 300);
      } else {
        self.input = e.target.value;        
      }
    });

    self.$EventBus.$on('changePriceFromChart', self.makeHogaValid);
  },
  computed: {
    ...mapState({
      currentSymbol: state => state.data.currentSymbol,
      trSymbols: state => state.data.trSymbols
    }),
    fluctuationMinuteOptions() {  // 등락률 시간 옵션
      let self = this;
      return [
        {
          value: "3",
          label: self.$t("m_noti.f002-0")
        },
        {
          value: "15",
          label: self.$t("m_noti.f002-1")
        },
        {
          value: "30",
          label: self.$t("m_noti.f002-2")
        },
        {
          value: "60",
          label: self.$t("m_noti.f002-3")
        }
      ];
    },
    changeMinuteOptions() {   // 거래량 시간 옵션
      let self = this;
      return [
        {
          value: "3",
          label: self.$t("m_noti.g002-0")
        },
        {
          value: "15",
          label: self.$t("m_noti.g002-1")
        },
        {
          value: "30",
          label: self.$t("m_noti.g002-2")
        }
      ];
    },
    changeRatioOptions() {    // 거래량 등락률 옵션
      let self = this;
      return [
        {
          value: "2",
          label: self.$t("m_noti.g003-0")
        },
        {
          value: "3",
          label: self.$t("m_noti.g003-1")
        },
        {
          value: "5",
          label: self.$t("m_noti.g003-2")
        }
      ];
    },
    checkPriceLength() {    // 지정가 키패드 가격 문자 길이
      return this.getOnlyNumber(this.limitsObj.price).length > 10;
    },
    limitPriceAddComma() {
      var tmp = this.limitsObj.price.toString().split(".");

      return (
        tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        (tmp[1] ? "." + tmp[1] : "")
      );
    },
    getChangedPrice() {   // 원화 환산값
      if (this.limitsObj.currency === "BTC") {
        var text = this.getOnlyNumber(this.nowPrice.curprc.toString());
        var nLenBelowDigitArray = [1];

        var amtKRW = text * this.currentBtcKrPrice;

        var hogaUnit = UnitManager.getHogaUnit(
          this.hogaUnit,
          "KRW",
          amtKRW,
          undefined,
          undefined,
          nLenBelowDigitArray
        );
        var hogaUnitBelowPntDigit = NumberUtil.getLenBelowDigit(hogaUnit);

        var count = Math.pow(10, hogaUnitBelowPntDigit);
        var res = Math.floor(amtKRW * count) / count;
        return this.addComma(res.toFixed(hogaUnitBelowPntDigit));

        return res;
      }
      if (this.limitsObj.currency === "ETH") {
        var text = this.getOnlyNumber(this.nowPrice.curprc.toString());
        var nLenBelowDigitArray = [1];

        var amtKRW = text * this.currentEthKrPrice;

        var hogaUnit = UnitManager.getHogaUnit(
          this.hogaUnit,
          "KRW",
          amtKRW,
          undefined,
          undefined,
          nLenBelowDigitArray
        );
        var hogaUnitBelowPntDigit = NumberUtil.getLenBelowDigit(hogaUnit);

        var count = Math.pow(10, hogaUnitBelowPntDigit);
        var res = Math.floor(amtKRW * count) / count;
        return this.addComma(res.toFixed(hogaUnitBelowPntDigit));

        return res;
        return res;
      } else {
        return false;
      }
    },
    ...mapGetters(["hogaUnit", "getUserId"])
  },
  watch: {
    nowPrice(val, old) {
      let self = this;

      self.upDownClass =
        Number(val["diff"]) < 0
          ? "down"
          : Number(val["diff"]) == 0
          ? "default"
          : "up";

      if (this.activeTabIdx == "0") {
        self.limitsObj.price = this.addComma(val["curprc"]);
        self.limitsObj.currency = val["paycurrcode"];
        self.setPricePercent(this.limitsRatio);
      } else if (this.activeTabIdx == "1") {
      } else {
      }
    },
    limitsRatio(val, old) {
      this.setPricePercent(val);
      this.tmpLimitsRatio = val
    }
  },
  beforeDestroy() {
    var self = this;
    self.$socket.unregisterReal("KVS0", self.trSymbols, self.name);

    self.$EventBus.$off('changePriceFromChart', this.makeHogaValid);
    
    clearTimeout(self.timer);
    self.timer = null;
  }
};
</script>