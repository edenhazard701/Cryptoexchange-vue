<template>
  <el-container class="MainVue">
    <el-main class="contents">
      <div class="main-banner">
        <div class="swiper-container">
          <div class="swiper-wrapper"></div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <el-row class="notice-wrap">
        <div class="main-left">
          <div class="sel-lang">
            <span v-for="lang in langs" :key="lang" :label="$i18n.t('header.' + lang)" :value="lang" :class="[$i18n.locale === lang ? 'is-active': '']" @click="selectLang(lang)">{{$i18n.t('header.' + lang)}}</span>
          </div>
          <div class="sns-wrap">
            <router-link to="/" target="_blank" class="twitter"></router-link>
            <router-link to="/" target="_blank" class="instagram"></router-link>
            <router-link to="/" target="_blank" class="facebook"></router-link>
          </div>
        </div>
        <el-row v-if="!notice.noti01 && !notice.noti02" class="notice">
          <el-col class="noti-title">NOTICE</el-col>
          <el-col class="noti-nothing">{{$t('main.g001')}}
            <!-- 공지사항이 없습니다. -->
          </el-col>
          <el-col class="noti-more">
            <router-link to="/customers/notice">{{$t('main.g002')}}
              <!-- 더보기 --><i class="ico-more"></i></router-link>
          </el-col>
        </el-row>
        <el-row v-else class="notice">
          <el-col class="noti-title">NOTICE</el-col>
          <el-col class="noti-content" :value="notice.mng01"><span @click="noticeHandle01">{{notice.noti01}}</span></el-col>
          <el-col class="noti-content" :value="notice.mng02" v-bind:style="notice.noti02 !== '' ? 'visibility: visible' : 'visibility: hidden'"><span @click="noticeHandle02">{{notice.noti02}}</span></el-col>
          <el-col class="noti-more">
            <router-link to="/customers/notice">{{$t('main.g002')}}
              <!-- 더보기 --><i class="ico-more"></i></router-link>
          </el-col>
        </el-row>
      </el-row>

      <div class="market-price">
        <el-radio-group v-model="marketPriceDefalut" class="market-price-button" @change="onPeriodChange">
          <el-radio-button label="1" value="3" :aria-selected="true">{{$t('main.b008')}}</el-radio-button><!-- 전일대비 -->
          <el-radio-button label="2" value="4">{{$t('main.b009')}}</el-radio-button><!-- 24시간 -->
        </el-radio-group>

        <div class="market-tab">
          <el-radio-group v-model="market" @change="onExChange">
            <!-- <el-radio-button label="KRW" disabled>
              <span>KRW</span>
              <span class="ready">{{ $t("exchange.a016")}}</span>
            </el-radio-button> -->
            <el-radio-button label="KRW">KRW</el-radio-button>
            <el-radio-button label="BTC">BTC</el-radio-button>
            <el-radio-button label="ETH">ETH</el-radio-button>
          </el-radio-group>
        </div>

        <div class="el-table">
          <div class="el-table__header-wrapper">
            <table border="0" cellpadding="0" cellspacing="0" class="el-table__header">
              <colgroup>
                <col width="200">
                <col width="160">
                <col width="160">
                <col width="100">
                <col width="170">
                <col width="170">
                <col width="180">
                <col width="180">
              </colgroup>
              <thead>
                <tr>
                  <th class="is-center">
                    <div class="cell">{{$t('main.b001')}}
                      <!-- 종목명 -->
                    </div>
                  </th>
                  <th class="is-center is-sortable" :class="sortStatA">
                    <!-- ascending일 때 class에 ascending 추가, descending일 때 descending 추가 -->
                    <div class="cell" @click="onClickSortA()">
                      {{$t('main.b002')}}
                      <!-- 현재가 -->
                      <span class="caret-wrapper" :class="{'disappear': market === 'favorite'}">
                        <i class="sort-caret ascending"></i>
                        <i class="sort-caret descending"></i>
                      </span>
                    </div>
                  </th>
                  <th class="is-center is-sortable" :class="sortStatE">
                    <div class="cell" @click="onClickSortE()">
                      {{$t('main.b003-1')}}
                      <!-- 변동폭 -->
                      <span class="caret-wrapper">
                        <i class="sort-caret ascending"></i>
                        <i class="sort-caret descending"></i>
                      </span>
                    </div>
                  </th>
                  <th class="is-center is-sortable" :class="sortStatB">
                    <!-- ascending일 때 class에 ascending 추가, descending일 때 descending 추가 -->
                    <div class="cell" @click="onClickSortB()">
                      {{$t('main.b003')}}
                      <!-- 변동률 -->
                      <span class="caret-wrapper">
                        <i class="sort-caret ascending"></i>
                        <i class="sort-caret descending"></i>
                      </span>
                    </div>
                  </th>
                  <th class="is-center">
                    <div class="cell">{{$t('main.b004')}}
                      <!-- 고가 -->
                    </div>
                  </th>
                  <th class="is-center">
                    <div class="cell">{{$t('main.b005')}}
                      <!-- 저가 -->
                    </div>
                  </th>
                  <th class="is-center is-sortable" :class="sortStatC">
                    <!-- ascending일 때 class에 ascending 추가, descending일 때 descending 추가 -->
                    <div class="cell" @click="onClickSortC()">
                      {{$t('main.b006')}}
                      <!-- 거래금액(24H) -->
                      <span class="caret-wrapper" :class="{'disappear': market === 'favorite'}">
                        <i class="sort-caret ascending"></i>
                        <i class="sort-caret descending"></i>
                      </span>
                    </div>
                  </th>
                  <th class="is-center is-sortable" :class="sortStatD">
                    <!-- ascending일 때 class에 ascending 추가, descending일 때 descending 추가 -->
                    <div class="cell" @click="onClickSortD()">
                      {{$t('main.b007')}}
                      <!-- 시가총액(KRW) -->
                      <span class="caret-wrapper">
                        <i class="sort-caret ascending"></i>
                        <i class="sort-caret descending"></i>
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>

        <el-scrollbar class="scroll-area">
          <el-table :data="runningList" stripe @row-click="onRowClick" :show-header="false">
            <!-- 종목명 -->
            <el-table-column prop="itemName" label="종목명" align="left">
              <template slot-scope="scope">{{ nameFormat(scope.row) }}
                <span class="under-data">{{ scope.row.o_inst_eng_abbr }}</span>
              </template>
              <!-- <template slot-scope="scope" v-if="$_.findWhere(nameList, {o_symbol : scope.row.symbol}) != undefined">{{ nameFormat($_.findWhere(nameList, {o_symbol : scope.row.symbol})) }}
                <span class="under-data">{{ $_.findWhere( nameList, {o_symbol : scope.row.symbol}) | codeFilter }}</span>
              </template> -->
            </el-table-column>

            <!-- 현재가 -->
            <el-table-column prop="curprc" label="현재가" align="right" width="160" sortable>
              <template slot-scope="scope">
                <div v-if="scope.row.pre === 1" class="price" :class="scope.row.diff | redBlueFilter">
                  {{ priceStrSetting(scope.row) }}
                </div>
                <span class="under-data" v-if="scope.row.paycurrcode == 'BTC' && scope.row.pre == 1">{{ scope.row.curprc * currentBtcKrPrice | curPrcFilter }} KRW</span>
                <span class="under-data" v-if="scope.row.paycurrcode == 'ETH' && scope.row.pre == 1">{{ scope.row.curprc * currentEthKrPrice | curPrcFilter }} KRW</span>
              </template>
            </el-table-column>

            <!-- 변동폭 -->
            <el-table-column prop="" label="변동폭" align="right" width="160">
              <template slot-scope="scope">
                <div v-if="scope.row.pre === 1">
                  <span v-if="scope.row.diff > 0 && scope.row.pre == 1 && scope.row.curprc != null" class="red up">{{priceDiffSetting(scope.row)}}</span>
                  <span v-if="scope.row.diff < 0 && scope.row.pre == 1 && scope.row.curprc != null" class="blue down">{{priceDiffSetting(scope.row)}}</span>
                  <span v-if="scope.row.diff == 0 && scope.row.pre == 1 && scope.row.curprc != null">{{priceDiffSetting(scope.row)}}</span>
                </div>
              </template>
            </el-table-column>

            <!-- 변동률 -->
            <el-table-column prop="diff" label="변동률" align="right" width="100" sortable>
              <template slot-scope="scope">
                <div v-if="scope.row.pre === 1">
                  <span v-if="scope.row.diff > 0 && scope.row.pre == 1 && scope.row.curprc != null" class="red_p">{{scope.row.updnrate | updnRateFilter}}</span>
                  <span v-if="scope.row.diff < 0 && scope.row.pre == 1 && scope.row.curprc != null" class="blue_p">{{scope.row.updnrate | updnRateFilter}}</span>
                  <span v-if="scope.row.diff == 0 && scope.row.pre == 1 && scope.row.curprc != null">{{scope.row.updnrate | updnRateFilter}}</span>
                </div>
              </template>
            </el-table-column>

            <!-- 고가 -->
            <el-table-column prop="highprc" label="고가" align="right" width="170">
              <template slot-scope="scope" v-if="scope.row.pre == 1">
                {{scope.row.highprc | prcFilter}}
              </template>
            </el-table-column>

            <!-- 저가 -->
            <el-table-column prop="lowprc" label="저가" align="right" width="170">
              <template slot-scope="scope" v-if="scope.row.pre == 1">
                {{scope.row.lowprc | prcFilter}}
              </template>
            </el-table-column>

            <!-- 거래금액 -->
            <el-table-column prop="cumdealcost" label="거래금액(24H)" align="right" sortable width="180">
              <template slot-scope="scope" v-if="scope.row.pre == 1">
                {{cumdealcostFormat(scope.row)}}
              </template>
            </el-table-column>

            <!-- 시가총액 -->
            <el-table-column prop="mktcapital" label="시가총액(KRW)" align="right" sortable width="180">
              <template slot-scope="scope">
                <span v-if="scope.row.pre == 1">{{totalPriceFilter(scope.row.mktcapital) }}</span>
                <span v-if="scope.row.pre == 2">준비중</span>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>

        <div class="main-reference">
          Market cap provided by <a href="https://coinranking.com/" target="_blank">Coinranking</a>
        </div>
      </div>

      <div id="Banner" class="introduce-app" :class="{'fixed':isBanner, 'bg-top':isBannerTop}">
        <el-row class="introduce-app-cont">
          <el-col class="intro-text">
            <h2>{{$t('main.c001')}}
              <!-- 언제 어디서나 안정적인 시그널 -->
            </h2>
            <nl2br tag="p" :text="$t('main.c002')"></nl2br>
            <!-- {{$t('main.c002')}} -->
            <!-- 서버 기반 시스템을 사용하여<br>
							언제 어디서든 시그널을 받을 수 있습니다. -->
          </el-col>
          <el-col class="download">
            <a href="javascript:void(0);" @click="goAppStore" class="android"></a>
            <a href="javascript:void(0);" @click="goAppStore" class="ios"></a>
          </el-col>
        </el-row>
      </div>
      <div class="system-partner">
        <h2 v-html="$t('main.d001')">
          <!-- 매일 <span class="point">성</span><span class="point">장</span>하는 거래소,
				<span class="txt-kovex">KOVEX</span> -->
        </h2>
        <el-row>
          <el-col class="partner1">
            <div class="partner-img"></div>
            <div class="title">{{ $t('main.d002') }}<!-- 최적화된 거래 환경 --></div>
            <nl2br tag="p" :text="$t('main.d003')"></nl2br>
            <!-- {{$t('main.d003')}} -->
            <!-- 증권 전문 개발사의 지속적인 연구와<br>
						다년간의 경험을 바탕으로<br>
						혁신적인 거래환경을 제공합니다. -->
          </el-col>
          <el-col class="partner2">
            <div class="partner-img"></div>
            <div class="title">{{ $t('main.d004') }}<!-- 스마트시그널 --></div>
            <nl2br tag="p" :text="$t('main.d005')"></nl2br>
            <!-- {{$t('main.d005')}} -->
            <!-- 더 이상의 수익 걱정은 금물,<br>
						코벡스에서 선별한 전문가의 전략으로<br>
						투자를 진행해보세요. -->
          </el-col>
          <el-col class="partner3">
            <div class="partner-img"></div>
            <div class="title">{{ $t('main.d006') }}<!-- 강력한 보안 --></div>
            <nl2br tag="p" :text="$t('main.d007')"></nl2br>
            <!-- {{$t('main.d007')}}<br> -->
            <nl2br tag="p" :text="$t('main.d008')"></nl2br>
            <!-- {{$t('main.d008')}} -->
            <!-- 코벡스는 최고의 보안 시스템을 사용합니다.<br>
						또한 암호화폐를 콜드월렛에 예치하여<br>
						고객님들의 자산을 안전하게 보관합니다.  -->
          </el-col>
        </el-row>
        <el-row>
          <el-col class="partner4">
            <div class="partner-img"></div>
            <div class="title">{{ $t('main.d009') }}<!-- 차별화된 컨텐츠 --></div>
            <nl2br tag="p" :text="$t('main.d010')"></nl2br>
            <!-- {{$t('main.d010')}} -->
            <!-- 앞으로 추가될 코벡스만의<br>
						차별화된 컨텐츠를 기대해 주세요. -->
          </el-col>
          <el-col class="partner5">
            <div class="partner-img"></div>
            <div class="title">{{ $t('main.d011') }}<!-- 고객우선 --></div>
            <nl2br tag="p" :text="$t('main.d012')"></nl2br>
            <!-- {{$t('main.d012')}} <br> -->
            <nl2br tag="p" :text="$t('main.d013')"></nl2br>
            <!-- {{$t('main.d013')}} -->
            <!-- 코벡스는 언제나 고객님들의 의견을<br>
						적극적으로 수용합니다.<br>
						365일 24시간 지원되는 고객센터를 이용해 보세요. -->
          </el-col>
          <el-col class="partner6">
            <div class="partner-img"></div>
            <div class="title">{{ $t('main.d014') }}<!-- 신뢰가는 회사 --></div>
            <nl2br tag="p" :text="$t('main.d015')"></nl2br>
            <!-- {{$t('main.d015')}} <br> -->
            <nl2br tag="p" :text="$t('main.d016')"></nl2br>
            <!-- {{$t('main.d016')}} -->
            <!-- 코벡스는 증권 전문 개발사에서 시작되었습니다.<br>
						다양한 증권사에서 검증된<br>
						한국금융IT의 시스템을 사용해 보세요. -->
          </el-col>
        </el-row>
      </div>

      <el-dialog custom-class="alertBrowser" width="1200px" :visible.sync="isAlertBrowser">
        <browser-checking></browser-checking>
        <div slot="footer"></div>
      </el-dialog>
    </el-main>

    <template v-if="popupMaskShow">
      <div class="modal-mask">
        <div v-for="item in popup" v-if="item.visible" class="modal-wrapper" :id="'popup'+item.popupMngNo" :style="item.pos" :key="item.popupMngNo">
          <div :key="item.value" class="modal-container">
            <div class="modal-header">
              <slot name="header">{{ item.title }}</slot>
              <div class="modal-close" @click="closePopup(item)"></div>
            </div>

            <div class="modal-body">
              <slot name="body">
                <el-scrollbar>
                  <span v-if="item.popupGb=='T'" v-html="item.conts"></span>
                  <img v-else-if="item.popupGb=='I'" :style="popupCursor(item)" class="popupImg" :src="imgUrl(item.pcImgId)" alt="" @click="popupLink(item)"/>
                </el-scrollbar>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <!-- 이용동의 푸터 -->
                <el-row v-if="item.popupTp == '2'">
                  <el-col>
                    <el-checkbox v-model="item.agreeChecked"></el-checkbox>{{$t('main.f004')}}<!-- 해당 내용에 동의합니다. -->
                  </el-col>
                  <el-col>
                    <el-button class="modal-default-button" @click="closePopup(item)" type="info">{{$t('main.f003')}}<!-- 닫기 --></el-button>
                    <el-button class="modal-default-button" :disabled="item.agreeChecked?false:true" @click="confirmPopup(item)" type="primary">{{$t('main.f005')}}<!-- 확인 --></el-button>
                  </el-col>
                </el-row>
                <!-- 팝업옵션 -->
                <!-- 1: 오늘하루 열지 않음 체크박스 -->
                <!-- 2: 일주일간 열지 않음 체크박스 -->
                <el-row v-else>
                  <el-col>
                    <div v-if="(item.popupOption !== '0') || !item.popupOption">
                      <el-checkbox v-model="item.cookieChecked"></el-checkbox>{{ item.popupOption==='1'?$t('main.f002'):$t('main.f001') }}<!-- '오늘 하루 열지 않음' : '일주일동안 열지 않음' -->
                    </div>
                  </el-col>
                  <el-col>
                    <el-button class="modal-default-button" @click="closePopup(item)" type="primary">{{$t('main.f003')}}<!-- 닫기 --></el-button>
                  </el-col>
                </el-row>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-container>
</template>

<script>
import { bannerList, noticeMain, popupList } from '@/api/customers'
import { mapState, mapGetters, mapActions } from 'vuex'
import { _ } from 'vue-underscore';
import MobileDetect from 'mobile-detect';
import BrowserChecking from './BrowserChecking.vue';

export default {
  components: {
    BrowserChecking,
  },
  data() {
    return {
      name: 'Main',
      langs: ['ko', 'en'],

      mBanner: [],
      notice: {
        noti01: '',
        noti02: '',
        mng01: 0,
        mng02: 0
      },
      popup: [],

      selectedTabName: '1',
      marketPriceDefalut: '1',
      marketPriceValue: '4',
      marketPriceData: [],
      market: 'KRW',
      // sortOrder: ['descending', 'ascending', null],
      runningList: [],        // 종목리스트 데이터
      isBanner: false,
      isBannerTop: false,

      // currentBtcKrPrice: 0,
      // currentEthKrPrice: 0,

      sortStatA: '',    // 정렬 A 상태 (현재가)
      sortStatB: '',    // 정렬 B 상태 (변동률)
      sortStatC: '',    // 정렬 C 상태 (거래대금)
      sortStatD: '',    // 정렬 D 상태 (시가총액)
      sortStatE: '',    // 정렬 E 상태 (변동폭)

      krwMaxDate: '',    // KRW 마켓 최근등록일
      btcMaxDate: '',    // BTC 마켓 최근등록일
      ethMaxDate: '',    // ETH 마켓 최근등록일
      xrpMaxDate: '',    // XRP 마켓 최근등록일

      dataLoaded: false,  // 데이터 로드 상태
      beforeSymbols: [],   // 이전 실시간 심볼
      isAlertBrowser: false, // 브라우저 알림 팝업 노출 여부
    };
  },
  filters: {
    // nameFilter: function (obj) { 
    //   var arr = obj['o_inst_kor_nm'].split('/');
    //   return arr[0]; 
    // },
    codeFilter: function (obj) { // 종목코드 출력
      return obj['o_inst_eng_abbr'];
    },
    redBlueFilter: function (obj) { // 등락 색상 처리
      var num = parseFloat(obj);
      if (num == 0) return '';
      if (num > 0) return 'red';
      if (num < 0) return 'blue';
    },
    curPrcFilter: function (number) { // 현재가 출력 형식
      var fixedVal = 0;

      if (number < 10) {
        fixedVal = 2;
      }
      if (10 <= number && number < 100) {
        fixedVal = 1;
      }
      if (number >= 100) {
        fixedVal = 0;
      }

      if (number < 100) {
        if (number > 1) {
          var num = number.toFixed(10);
          var val1 = UnitManager.numberWithCommas(number.toString())
          var val2 = num.toString().split('.')[1];
          val2 = parseFloat('0.' + val2).toFixed(fixedVal);
          val2 = val2.toString().split('.')[1];
          return val1 + '.' + val2;
        } else {
          return number.toFixed(fixedVal);
        }
      } else {
        return UnitManager.numberWithCommas(parseInt(number))
      }
    },
    diffFilter: function (obj) { // 변동폭 출력 형식
      var numObj = UnitManager.numberWithCommas(obj);
      numObj = numObj.replace('-', '');
      return numObj;
    },
    updnRateFilter: function (obj) { // 등락률 출력 형식
      var mark = '';

      var obj2 = obj.toFixed(2);

      if (obj > 0) {
        mark = '+';
      } else if (obj2 == 0) {
        obj2 = '0.00';
      }

      return mark + '' + obj2 + '%';
    },
    prcFilter: function (obj) { // 고가,저가 출력 형식
      obj = obj.toString();
      if (obj == '') return '';        
      if (obj.indexOf('.') > -1) {
        if (parseFloat(obj) > 0) {
          var val1 = UnitManager.numberWithCommas(parseInt(obj));
          var val2 = obj.split('.')[1];
          return val1 + '.' + val2;
        } else {
          return obj;
        }
      } else {
        return UnitManager.numberWithCommas(obj);
      }
    },

  },
  methods: {
    imgUrl(imgId) {
      return process.env.IMG_URL + imgId;
    },
    checkBrowser: function() { // 권장브라우저 확인
      var ua = navigator.userAgent;
      if (/trident/i.test(ua)) {
        var tem = /\brv[ :]+(\d+)/g.exec(ua);
        if (tem != null && tem[1] == 11) {
            //ie11
            this.isAlertBrowser = false;
        } else {
          this.isAlertBrowser = true;
        }
      } else if (/chrome/i.test(ua)) {
        //chrome계열 브라우저
        this.isAlertBrowser = false;
      } else if (/safari/i.test(ua) && /version/i.test(ua) && /iphone/i.test(ua)) {
        //safari & android
        this.isAlertBrowser = false;
      } else {
        this.isAlertBrowser = true;
      }
    },
    bannerClickEvent: function (url, nsYn) { // 배너 클릭시 동작
      if (nsYn == "1") {
        window.open(url)
      } else {
        if (url.indexOf(window.location.hostname) < 0) {
          // location
          location.href = url
        } else {
          // path: 'home'
          this.$router.push({ path: url.split("#/")[1] })
        }
      }
    },
    popupLink: function(item) { // 팝업 링크 클릭시 동작
      const url = item.cnntUrl

      if (item.cnntUrlYn == "1") {
        window.open(url)
      }
    },
    popupCursor(item) { // 팝업 커서 css 처리
      if (item.cnntUrlYn === "1") return {cursor:"pointer"}
      else return ''
    },
    totalPriceFilter: function (obj) { // 시가총액 출력 형식
      /*
      데이터가 1조 이상
      : 조 + 억 단위로 표시

      2) 데이터가 1억 이상 1조 미만
      : 억 단위로 표시
      : 억 이하값 표시 X

      3) 데이터가 1억 미만
      : 전체 시가총액 표시  
      */

      var self = this;
      if (obj) {          
        if (obj > 99999999999) {
          var jo = String(obj).slice(0, -12);
          if (jo.length > 0) {
            jo = UnitManager.numberWithCommas(jo) + self.$t('main.b012');
          } else {
            jo = '';
          };
          obj = (obj % 1000000000000);
          var eok = (obj / 100000000).toFixed(0);
          return jo + ' ' + UnitManager.numberWithCommas(eok) + self.$t('main.b011');
        } else if (obj > 99999999) {
          obj = (obj / 100000000).toFixed(0);
          return UnitManager.numberWithCommas(obj) + self.$t('main.b011');
        } else {
          return UnitManager.numberWithCommas(obj)
        }
      }
      return obj;
    },
    /* 언어선택 */
    selectLang(val) {
      let self = this;
      const langKind = val == 'ko' ? 'KR' : 'EN';        
      self.$i18n.locale = val;

      if (!self.isLoggedIn) {                
        self.$store.commit("setLangKind", langKind);
        return;
      }

      self.$store.dispatch('setLangKind', {lang_kind : langKind}).then((obj) => {
        self.$alert(self.$t('main.i001'), '', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: 'OK'
        });
      })
    },
    nameFormat(obj) { // 다국어 따른 종목명 처리
      var self = this;
      if (self.$i18n.locale == 'ko') {
        return obj['o_inst_kor_nm'];
      } else if (self.$i18n.locale == 'en') {
        return obj['o_inst_eng_nm'];
      }
    },
    onExChange(code){ // 마켓 변경시 동작
      let self = this;
      self.market = code;
      sessionStorage.setItem('selectedMarket', code);
      self.requestCoinList();
    },
    onPeriodChange(value){ // 전일대비 24시간 선택 동작
      let self = this;
      self.selectedTabName = value;
      if( value == '1' ) {
        self.marketPriceValue = '4'
        self.requestCoinList();				
        
      } else {	// 24시 
        self.marketPriceValue = '3'
        self.requestCoinList();
      }			
    },
    priceStrSetting(row) { // 현재가 출력 형식
      let self = this;
      if (!self.hogaUnit) {
        return;
      }

      var nLenBelowDigitArray = [1];
      var curprc = row.curprc * 1; //실시간 데이터에서는 curprc가 문자형으로 들어오므로 숫자로 변화처리

      UnitManager.getHogaUnit(self.hogaUnit, row.paycurrcode, curprc, undefined, undefined, nLenBelowDigitArray);
      var strPrice = curprc.toFixed(nLenBelowDigitArray[0]).toString();
      if (parseFloat(strPrice) > 1) {          
        return UnitManager.numberWithCommas(strPrice);
      } else {
        return strPrice;
      }        
    },
    priceDiffSetting(row) { // 변동폭 처리

      let self = this;

      if (!self.hogaUnit) {
        return;
      }
      var nLenBelowDigitArray = [1];

      var curprc = row.curprc * 1;
      var curDiff = row.diff * 1; //실시간 데이터에서는 curprc가 문자형으로 들어오므로 숫자로 변화처리

      var minus = false;
      if (curDiff < 0) {
        minus = true;
        curDiff = Math.abs(curDiff);
      }

      UnitManager.getHogaUnit(self.hogaUnit, row.paycurrcode, curprc, undefined, undefined, nLenBelowDigitArray);
      var strPrice = curDiff.toFixed(nLenBelowDigitArray[0]).toString();
      if (parseFloat(strPrice) > 1) {        
        return UnitManager.numberWithCommas(strPrice);
      } else {
        return strPrice;
      }
    },
    cumdealcostFormat: function (obj) { // 거래금액 출력 형식
      var price = parseFloat(obj.cumdealcost_24);
      var priceStr = price.toString();
      var self = this;

      if (parseFloat(price.toFixed(2)) == 0) {
        return '0';
      }

      if (price >= 1000000) {        
        return UnitManager.numberWithCommas((price / 1000000).toFixed(0)) + self.$t('main.b010');
      } else {
        if (obj.paycurrcode == 'KRW') {            
          return UnitManager.numberWithCommas(parseInt(priceStr));
        } else {
          if (priceStr.indexOf('.') > -1) {
            if (price > 1) {
              var val1 = UnitManager.numberWithCommas(parseInt(price))
              var val2 = price.toFixed(2).toString().split('.')[1];
              return val1 + '.' + val2;
            } else {
              return price.toFixed(2);
            }
          } else {
            return UnitManager.numberWithCommas(price);
          }
        }
      }
    },      
    format(number) { // 숫자 ',' 처리
      return UnitManager.numberWithCommas(number);
    },      
    noticeHandle01(e) { // 공지사항 1
      this.$router.push({ name: 'pcNoticeDetail', query: { no: this.notice.mng01 } });
    },
    noticeHandle02(e) { // 공지사항 2
      this.$router.push({ name: 'pcNoticeDetail', query: { no: this.notice.mng02 } });
    },      
    requestCoinList() { // 종목리스트 데이터 요청
      var self = this;
      self.$socket.sendProcessByName('i0018', function (queryData) {
        var block = queryData.getBlockData('InBlock1')[0];
        // 조회구분
        block['symbolcnt'] = '100';
        block['qry_div'] = self.marketPriceValue;
        block['paycurrcode'] = self.market;
        block['excode'] = '001';

      }, function (queryData) {
        if (queryData != null) {					
          var coinList = queryData['queryObj']['OutBlock2'];
          self.updateCoinList(coinList);
          self.registerRealData();
        } else {
          // 전문 에러 언어팩 적용
          const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
          if (errorData.trName != "i0018") return

          self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: self.$t('sys_err.a001')
          });
        }
      });
    },
    updateCoinList(datas) { // 종목리스트 데이터 가공
      var self = this;        
      var symbols = [];
      self.currentSymbolIndex = -1;
      var currentSymbol = self.$store.state.data.currentSymbol;        
      var newDataArr = [];
      var prepareDataArr = [];
      var currentIndex = -1;

      for (var index in datas) {
        var obj = datas[index];          
        var symbol = obj['symbol'];
        var found = self.nameList.find(function (element) {
          return element['o_symbol'] == symbol;
        });

        //검색된 종목이 없을 경우 다음 종목 처리
        if(found == null)
          continue;
        //

        obj['o_inst_kor_nm'] = found['o_inst_kor_nm'].split('/')[0];
        obj['o_inst_eng_nm'] = found['o_inst_eng_nm'].split('/')[0];
        obj['o_inst_eng_abbr'] = found['o_inst_eng_abbr'];

        obj['diff_f'] = parseFloat(obj['diff']);
        obj['curprc_f'] = parseFloat(obj['curprc']);
        obj['updnrate_f'] = parseFloat(obj['updnrate']);
        obj['cumdealcost_24_f'] = parseFloat(obj['cumdealcost_24']);
        obj['mktcapital_f'] = parseFloat(obj['mktcapital']);

        if (found['o_exch_list_tp'] != '1') {
          obj['cumdealcost_24'] = -1;
          prepareDataArr.push(obj);
          obj['pre'] = 2;
        } else {            
          newDataArr.push(obj);            
          obj['pre'] = 1;
          currentIndex++;
        }
      }
      
      self.runningList = newDataArr.concat(prepareDataArr);
      self.sortRunningList();
    },
    getMaxDate(datas) { // 코인 최근 등록일 가져오기
      var arr = [];
      datas.forEach((item) => {
        arr.push(item.listdatetime.substr(0, 8));
      });
      return arr.reduce((previous, current) => {
        return previous > current ? previous : current;
      });
    },
    checkNewDate(obj) { // 마켓별 최근등록 코인 처리
      var self = this;
      var listDate = obj.listdatetime.substr(0, 8);
      switch (obj.paycurrcode) {
        case 'KRW':
          return listDate == self.krwMaxDate;
        case 'BTC':
          return listDate == self.btcMaxDate;
        case 'ETH':
          return listDate == self.ethMaxDate;
        case 'XRP':
          return listDate == self.xrpMaxDate;
      }
      return false;
    },
    updateCoinItem_KVS0(data) { // 종목 체결 데이터 가공 처리
      var self = this;
      
      //전일대비 처리
      if (self.marketPriceValue != '4') {
        return;
      }

      //종목 찾기
      var findObj = _.findWhere(self.runningList, { symbol: data['symbol'] });
      if (findObj == null) {
        return;
      }

      //현재가
      findObj['curprc'] = data['execprice'];
      findObj['curprc_f'] = parseFloat(data['execprice']);

      //변동폭
      findObj['diff'] = data['diff'];
      findObj['diff_f'] = parseFloat(data['diff']);

      //변동률
      findObj['updnrate'] = data['updnrate'];
      findObj['updnrate_f'] = parseFloat(data['updnrate']);
      
      //고가
      findObj['highprc'] = data['highprc'];
      
      //저가
      findObj['lowprc'] = data['lowprc'];
    },
    updateCoinItem_KVM2(data) { // 종목 체결 데이터 가공 처리
      var self = this;

      //종목 찾기
      var findObj = _.findWhere(self.runningList, { symbol: data['symbol'] });
      if (findObj == null) {
        return;
      }

      //24시간거래대금
      findObj['cumdealcost_24'] = data['cumdealcost_1440'];
      findObj['cumdealcost_24_f'] = parseFloat(data['cumdealcost_1440']);

      //24시간 처리
      if (self.marketPriceValue != '3') {
        return;
      }

      //현재가
      findObj['curprc'] = data['curprc'];
      findObj['curprc_f'] = parseFloat(data['curprc']);

      //변동폭
      findObj['diff'] = data['diff_1440'];
      findObj['diff_f'] = parseFloat(data['diff_1440']);

      //변동률
      findObj['updnrate'] = data['updnrate_1440'];
      findObj['updnrate_f'] = parseFloat(data['updnrate_1440']);
      
      //고가
      findObj['highprc'] = data['highprc_1440'];
      
      //저가
      findObj['lowprc'] = data['lowprc_1440'];
    },
    registerRealData() { // 종목리스트 실시간 데이터 요청
      var self = this;

      var symbols = _.pluck(self.runningList,'symbol');
        
      self.$socket.unregisterReal('KVS0', self.beforeSymbols, self.name);
      self.$socket.registerReal('KVS0', "symbol", symbols, self.name, function (queryData){
        if(queryData == null) return;
        var data = queryData.queryObj.OutBlock1[0];
        self.updateCoinItem_KVS0(data);
      });

      self.$socket.unregisterReal('KVM2', self.beforeSymbols, self.name);
      self.$socket.registerReal('KVM2', 'symbol', symbols, self.name, function (queryData) {
        if(queryData == null) return;
        var data = queryData.queryObj.OutBlock1[0];
        self.updateCoinItem_KVM2(data);
      });

      self.beforeSymbols = symbols;
    }, 
    bookmark(symbol, flag) { // 즐겨찾기 추가/삭제
      let self = this;
      self.$socket.sendProcessByName('d0004', (queryData) => {
        let ib1 = queryData.getBlockData('InBlock1')[0]
        ib1['account_id'] = self.getUserId
        ib1['grp_no'] = 0
        ib1['in_cnt'] = 1
        let ib2 = queryData.getBlockData('InBlock2')
        ib2.push({
          symbol: symbol,
          blnk_memo_yn: 1,
          bmrk_yn: 1,
          save_del_div: flag
        })

      }, (queryData) => {
        if (!queryData) {
          // console.log('즐겨찾기 추가/삭제 실패')
          // 전문 에러 언어팩 적용
          const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
          if (errorData.trName != "d0004") return

          self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: self.$t('sys_err.a001')
          });
          return
        }
        var array = []

        for (var data of queryData.getBlockData('OutBlock2')) {
          array.push({
            symbol: data['symbol']
          })
        }
        self.mySymbols = array;
      })
    },
    findMySymbol() { // 보유종목 상태 처리
      var self = this;
      // console.log(self.mySymbols)
      var findList = [];
      for (var i = 0; i < self.mySymbols.length; i++) {
        var data = self.mySymbols[i];
        var currList = null;
        if (data['symbol'].indexOf('KRW__') != -1) {
          currList = self.krwLists;
        } else if (data['symbol'].indexOf('BTC__') != -1) {
          currList = self.btcLists;
        } else if (data['symbol'].indexOf('ETH__') != -1) {
          currList = self.ethLists;
        } else if (data['symbol'].indexOf('XRP__') != -1) {
          currList = self.xrpLists;
        }
        if (currList != null) {
          var findObj = _.findWhere(currList, {
            symbol: data['symbol']
          });
          if (findObj != null && findObj.length != 0) {
            findList.push(findObj);
          }
        }
      }
      self.favoriteLists = findList;
      if (self.market == 'favorite') {
        self.runningList = self.favoriteLists;
      }
    },
    bnrScroll() {
      var bannerObj = document.getElementById('Banner');
      var bnrTop = bannerObj.offsetTop - 290;
      var bnrTopLimit = bannerObj.offsetTop - 160;
      if (window.scrollY > bnrTop) {
        if (window.scrollY > bnrTopLimit) {
          this.isBanner = false;
          this.isBannerTop = true;
        } else {
          this.isBanner = true;
          this.isBannerTop = false;
        }
      } else {
        this.isBanner = false;
        this.isBannerTop = false;
      }
    },
    onRowClick(row, column, cell, event) { // 종목 클릭시 동작
      var self = this;

      this.$store.commit('setCurrentSymbol', row.symbol);
      this.$EventBus.$emit('changeCurrentSymbol', row.symbol);
      sessionStorage.setItem('currentSymbol', row.symbol);

      this.$router.push({
        name: 'exchange',
      });
    },
    showBanner() { // 배너 보여주기
      var self = this;

      // 배너
      bannerList({
        langType: self.getLangKind == 'KR' ? 'ko' : 'en',
        unitcode: self.getUnitcode,
      }).then(res => {
        console.log("bannerList", res);
        if (!res) return;
        self.mBanner = res.body;
        self.setSwiper(self.mBanner);
      });
    },
    setSwiper(bannerData) { // 배너 슬라이드
      var self = this;

      var swiper = new Swiper('.swiper-container', {
        spaceBetween: 0,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="thumImg ' + className + '"><span class="num">' + (index + 1) + '</span>' + '' + '</span>';
          }
        },
        initialSlide: 1,
      });

      swiper.removeAllSlides();
      var _link = "";

      for (var i = 0; i < bannerData.length; i++) {
        // 링크 여부 
        if (bannerData[i].cnntUrlYn === '1') {
          _link = '<a id="_bannerLink'+i+'" class="_bannerLink" href="#"></a>';
        } else {
          _link = ""
        }          
        swiper.appendSlide([
          '<div class="swiper-slide">' +
          '<div class="mBanner" style="background-image: url('+ process.env.IMG_URL + bannerData[i].imgId + ')">' + _link + '</div>' +
          '</div>'
        ]);
      }

      for (var i = 0; i < bannerData.length; i++) {
        // 블릿 디자인
        var thumImg = document.getElementsByClassName('thumImg');
        var mainTit = document.createElement('div');
        var mainText = document.createTextNode(bannerData[i].subj);
        var subTit = document.createElement('div');
        var subText = document.createTextNode(bannerData[i].subjLow);

        mainTit.appendChild(mainText);
        subTit.appendChild(subText);

        thumImg[i].appendChild(mainTit);
        thumImg[i].appendChild(subTit);
      }

      //LJH 2019.5.14 swiper처리를 하면서 배너가 복제되면서 총 6개가 순환됨 6개 전체에 이벤트를 넣어줘야함
      var banners = document.getElementsByClassName("_bannerLink");
      for (var i = 0; i < banners.length; i++) {
        banners[i].addEventListener("click", function () {
          var j = Number(this.id.split("_bannerLink")[1]);
          if (bannerData[j].cnntUrlYn === '1') {
            self.bannerClickEvent(bannerData[j].cnntUrl, bannerData[j].nsYn);
          }
        });
      }
    },
    showNotice() { // 공지 보여주기
      var self = this;
      noticeMain({
        dpYn: 'PC',
        langType: self.getLangKind == 'KR' ? 'ko' : 'en',
        unitcode: self.getUnitcode
      }).then(res => {
        //console.log("noticeMain", res);

        if (!res) return;
        const body = res.body;
        if (body[0]) {
          self.notice.noti01 = body[0].subj
          self.notice.mng01 = body[0].noticeMngNo
        }
        if (body[1]) {
          self.notice.noti02 = body[1].subj
          self.notice.mng02 = body[1].noticeMngNo
        }
      });
    },
    showPopup() { // 팝업 보여주가
      var self = this;
      popupList({
        dpTp: '10', // pc-10, mobile - 20, app - 30,
        langType: self.getLangKind == 'KR' ? 'ko' : 'en',
        unitcode: self.getUnitcode
      }).then(res => {
        // console.log("popupList", res);
        if (!res) return;
        var body = res.body;
        let count = body.length;
        for (var data of body) {
          if (data['popupTp'] === '2') {
            let popup = Object.assign({}, data);
            if (self.$store.getters.isLoggedIn) {
              self.$socket.sendProcessByName('ac535', (queryData) => {
                var block = queryData.getBlockData('InBlock1')[0];
                block['user_id'] = self.getUserId;
                block['terms_kind'] = data['agrCnt'];
              }, (returnData) => {
                if (returnData) {
                  var OutBlock1 = returnData['queryObj']['OutBlock1'][0];
                  // 동의 했으면 1 -> 팝업 X
                  if (OutBlock1['use_terms'] === '0') {
                    self.setPopupArr(popup);
                  }
                } else {
                  const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                  if (errorData.trName != "ac535") return;
                  console.log(self.$t('sys_err.' + errorData.errCode));
                }

                count--;
                //이용동의가 있는 경우 count == 0
                if (count == 0) {
                  self.arrangePopups();
                }
              })
            } else {
              count--;
            }
          } else {
            self.setPopupArr(data);
            count--;
          }
        }

        //이용동의가 없는 경우 count == 0
        if (count == 0) {
          self.arrangePopups();
        }
      });
    },
    setPopupArr(data) {
      var self = this;
      var cookiedata = document.cookie;
      if (cookiedata.indexOf('kovexPopup' + data['popupMngNo'] + '=done') < 0) {
        var temp = {};
        temp['title'] = data['subj'];
        temp['conts'] = data['conts'];
        temp['popupOption'] = data['popupOption'];
        temp['popupMngNo'] = data['popupMngNo'];
        temp['popupTp'] = data['popupTp'];
        temp['agrCnt'] = data['agrCnt'];
        temp['popupGb'] = data['popupGb'];
        temp['pos'] = 0;
        temp['width'] = 0;
        temp['cookieChecked'] = false;
        temp['agreeChecked'] = false;
        temp['cnntUrl'] = data['cnntUrl'];
        temp['cnntUrlYn'] = data['cnntUrlYn'];
        temp['pcImgId'] = data['pcImgId'];
        temp['nsYn'] = data['nsYn'];
        temp['visible'] = false;
        self.popup.push(temp);
      }
    },
    arrangePopups() { // 팝업 위치 정렬
      var self = this;
      // 팝업 배치
      if (self.popup.length === 1) {
        self.popup[0]['pos'] = { left: '50%' };
        self.popup[0]['visible'] = true;
      } else if (self.popup.length === 2) {
        self.popup[0]['pos'] = { left: '30%' };
        self.popup[1]['pos'] = { left: '70%' };
        self.popup[0]['visible'] = true;
        self.popup[1]['visible'] = true;
      } else if (self.popup.length === 3) {
        self.popup[0]['pos'] = { left: '30%' };
        self.popup[1]['pos'] = { left: '70%' };
        self.popup[2]['pos'] = { left: '50%' };
        self.popup[0]['visible'] = true;
        self.popup[1]['visible'] = true;
        self.popup[2]['visible'] = true;
      } else if (self.popup.length === 4) {
        self.popup[0]['pos'] = { left: '30%' };
        self.popup[1]['pos'] = { left: '70%' };
        self.popup[2]['pos'] = { left: '35%', top: '55%' };
        self.popup[3]['pos'] = { left: '75%', top: '55%' };
        self.popup[0]['visible'] = true;
        self.popup[1]['visible'] = true;
        self.popup[2]['visible'] = true;
        self.popup[3]['visible'] = true;
      } else if (self.popup.length > 4) {
        const lastPoupNum = self.popup.length - 1
        self.popup[lastPoupNum-3]['pos'] = { left: '30%' };
        self.popup[lastPoupNum-2]['pos'] = { left: '70%' };
        self.popup[lastPoupNum-1]['pos'] = { left: '35%', top: '55%' };
        self.popup[lastPoupNum]['pos'] = { left: '75%', top: '55%' };
        self.popup[lastPoupNum-3]['visible'] = true;
        self.popup[lastPoupNum-2]['visible'] = true;
        self.popup[lastPoupNum-1]['visible'] = true;
        self.popup[lastPoupNum]['visible'] = true;
      }
    },
    confirmPopup(item) { // 이용동의 확인
      var self = this;
      if (item['agreeChecked'] === true) {
        // 동의 등록
        self.$socket.sendProcessByName('ac170', (queryData) => {
          var block = queryData.getBlockData('InBlock1')[0];
          block['user_id'] = self.getUserId;
          block['terms_kind'] = item['agrCnt'];
          block['use_terms'] = 'Y';
        }, (returnData) => {
          if (!returnData) {
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "ac170") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t('sys_err.a001')
            });
          } else {
            item['visible'] = false;
          }
        })
      }
    },
    closePopup(item) { // 팝업닫기 동작
      var self = this;
      if (item['popupTp'] !== '2') {
        // 쿠키 설정
        if (item['cookieChecked'] === true) {
          if (item['popupOption'] === '1') {
            self.setCookie('kovexPopup' + item.popupMngNo, "done", 1);
          } else if (item['popupOption'] === '7') {
            self.setCookie('kovexPopup' + item.popupMngNo, "done", 7);
          }
        }
      }
      item['visible'] = false;
    },
    setCookie(name, value, expiredays) { // 팝업 쿠키 처리
      // 당일 저녁 00 시까지 팝업
      var todayDate = new Date();
      todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);
      if (todayDate > new Date()) {
        expiredays = expiredays - 1;
      }
      todayDate.setDate(todayDate.getDate() + expiredays);
      document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    },
    onClickSortA() { // 현재가 정렬 클릭시 동작
      var self = this;
      self.sortStatB = '';
      self.sortStatC = '';
      self.sortStatD = '';
      self.sortStatE = '';
      switch (self.sortStatA) {
        case '':
          self.sortStatA = 'descending';
          break;
        case 'descending':
          self.sortStatA = 'ascending';
          break;
        case 'ascending':
          self.sortStatA = '';
          self.sortStatC = 'descending';
          break;
      }
      self.sortRunningList();
    },
    onClickSortB() { // 대비 정렬 클릭시 동작
      var self = this;
      self.sortStatA = '';
      self.sortStatC = '';
      self.sortStatD = '';
      self.sortStatE = '';
      switch (self.sortStatB) {
        case '':
          self.sortStatB = 'descending';
          break;
        case 'descending':
          self.sortStatB = 'ascending';
          break;
        case 'ascending':
          self.sortStatA = '';
          self.sortStatB = '';
          self.sortStatC = 'descending';
          self.sortStatD = '';
          break;
      }
      self.sortRunningList();
    },
    onClickSortE() { // 대비 정렬 클릭시 동작
      var self = this;
      self.sortStatA = '';
      self.sortStatB = '';
      self.sortStatC = '';
      self.sortStatD = '';
      switch (self.sortStatE) {
        case '':
          self.sortStatE = 'descending';
          break;
        case 'descending':
          self.sortStatE = 'ascending';
          break;
        case 'ascending':
          self.sortStatA = '';
          self.sortStatB = '';
          self.sortStatC = 'descending';
          self.sortStatD = '';
          self.sortStatE = '';
          break;
      }
      self.sortRunningList();
    },
    onClickSortC() { // 거래금액 정렬 클릭시 동작
      var self = this;
      self.sortStatA = '';
      self.sortStatB = '';
      self.sortStatD = '';
      self.sortStatE = '';
      switch (self.sortStatC) {
        case '':
          self.sortStatC = 'descending';
          break;
        case 'descending':
          self.sortStatC = 'ascending';
          break;
        case 'ascending':
          self.sortStatC = 'descending';
          break;
      }
      self.sortRunningList();
    },
    onClickSortD() { // 시가총액 정렬 클릭시 동작
      var self = this;
      self.sortStatA = '';
      self.sortStatB = '';
      self.sortStatC = '';
      self.sortStatE = '';
      switch (self.sortStatD) {
        case '':
          self.sortStatD = 'descending';
          break;
        case 'descending':
          self.sortStatD = 'ascending';
          break;
        case 'ascending':
          self.sortStatA = '';
          self.sortStatB = '';
          self.sortStatC = 'descending';
          self.sortStatD = '';
          break;
      }
      self.sortRunningList();
    },
    sortRunningList(){ // 종목 리스트 정렬 처리
      var self = this;        

      if(self.sortStatA=='' && self.sortStatB=='' && self.sortStatC=='' && self.sortStatD=='' && self.sortStatE==''){
        self.sortStatC='descending';
      }

      self.$store.state.data.stockListSortStatA = self.sortStatA;
      self.$store.state.data.stockListSortStatB = self.sortStatB;
      self.$store.state.data.stockListSortStatC = self.sortStatC;

      switch (self.sortStatA){
        case 'descending':
          self.runningList = _.sortBy(self.runningList,"curprc_f").reverse();
          break;
        case 'ascending':            
          self.runningList = _.sortBy(self.runningList,"curprc_f");
          break;
      }

      switch (self.sortStatB){
        case 'descending':            
          self.runningList = _.sortBy(self.runningList,"updnrate_f").reverse();
          break;
        case 'ascending':            
          self.runningList = _.sortBy(self.runningList,"updnrate_f");
          break;
      }

      switch (self.sortStatC){          
        case 'descending':            
          self.runningList = _.sortBy(self.runningList,"cumdealcost_24_f").reverse();
          break;
        case 'ascending':            
          self.runningList = _.sortBy(self.runningList,"cumdealcost_24_f");
          break;
      }
      
      switch (self.sortStatD){          
        case 'descending':
          self.runningList = _.sortBy(self.runningList,"mktcapital_f").reverse();
          break;
        case 'ascending':
          self.runningList = _.sortBy(self.runningList,"mktcapital_f");
          break;
      }

      switch (self.sortStatE){
        case 'descending':
          self.runningList = _.sortBy(self.runningList,"diff_f").reverse();
          break;
        case 'ascending':
          self.runningList = _.sortBy(self.runningList,"diff_f");
          break;
      }

      self.runningList = _.sortBy(self.runningList,"pre");
    },
    loadStockDataCallback() { // loadStockData 이벤트 콜백 함수
      var self = this;
      if (self.dataLoaded) return;
      self.dataLoaded = true;
      self.requestCoinList();
    },
    resetLoadStockDataCallback() { // resetLoadStockData 이벤트 콜백 함수
      var self = this;
      self.dataLoaded = false;
    },
    hideDialog() {
      console.log('hideDialog');
      this.isAlertBrowser = false;
    },
    goAppStore() {
      this.$alert(this.$t('main.j001'), '', { confirmButtonText: 'OK' });
    },
  },
  computed: {
    ...mapState({
      nameList: state => state.data['n1001'],
      trSymbols: state => state.data.trSymbols,
      currentBtcKrPrice: state => state.data.currentBtcKrPrice,
      currentEthKrPrice: state => state.data.currentEthKrPrice
    }),
    ...mapGetters(['getUserId', 'hogaUnit', 'getLangKind', 'isLoggedIn', 'getUnitcode']),
    popupMaskShow: function () {
      var self = this;

      if (self.popup.length === 0) {
        $('body').removeClass('no-scroll');
        return false;
      } else {
        $('body').addClass('no-scroll');
        for (var data of self.popup) {
          if (data['visible'] === true) {
            return true;
            break;
          }
        }
      }
      return false;
    },
  },
  watch: {
    getLangKind(val, old) {
      var self = this;
      if (self.selectedTabName == '1') {
        self.marketPriceDefalut = '1';
      } else {
        self.marketPriceDefalut = '2';
      }

      self.mBanner = [];
      self.notice = {
        noti01: '',
        noti02: '',
        mng01: 0,
        mng02: 0
      };
      self.popup = [];
      self.showBanner();
      self.showNotice();
    }
  },
  created() {
    this.$EventBus.$emit('pc-navi', 'main');
    window.addEventListener('scroll', this.bnrScroll);
    this.checkBrowser();
    //this.isAlertBrowser = true;
    this.$EventBus.$on('hideDialog', this.hideDialog);
  },
  mounted() {
    var self = this;

    self.$EventBus.$on('loadStockData', self.loadStockDataCallback);
    self.$EventBus.$on('resetLoadStockData', self.resetLoadStockDataCallback);

    if(self.trSymbols.length > 0 && !self.dataLoaded){
      self.$EventBus.$emit('loadStockData');
    }

    self.showBanner();
    self.showNotice();
   // self.showPopup();
    self.bnrScroll();
  },
  beforeDestroy() {
    var self = this;
    self.$socket.unregisterReal('KVS0', self.beforeSymbols, self.name);
    self.$socket.unregisterReal('KVM2', self.beforeSymbols, self.name);

    self.$EventBus.$off('loadStockData', self.loadStockDataCallback);
    self.$EventBus.$off('resetLoadStockData', self.resetLoadStockDataCallback);

    self.$EventBus.$off('hideDialog', this.hideDialog);
  },
  destroyed() {
    window.removeEventListener('scroll', this.bnrScroll);
  }
};

</script>

<style>
.PcContainer .alertBrowser.el-dialog .el-dialog__header {
  padding: 1px 0 0 !important;
}
.PcContainer .alertBrowser.el-dialog .el-dialog__body {
  padding: 0 !important;
}
.PcContainer .ready {
  position: absolute;
  top: -20px;
  left: 110px;
  color: rgb(158, 158, 158);
  font-size: 14px;
}
</style>
