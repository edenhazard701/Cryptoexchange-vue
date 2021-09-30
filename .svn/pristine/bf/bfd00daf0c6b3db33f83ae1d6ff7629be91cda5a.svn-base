<template>
  <el-container class='m_main'>
    <el-main class="content">
      <div class="visual_wrap">
        <div class="txt_wrap">
          <p class="tit_txt">
            <span class="top_txt">{{$t('m_main.a001')}}
              <!-- 모든 거래를 하나로 모으다 --></span>
            {{$t('m_main.a002')}}
            <!-- 통합 암호화폐 거래소, KOVEX -->
          </p>
          <p class="s_txt">
            {{$t('m_main.a003')}}
            <!-- 풍부한 유동성을 기반으로 빠른 체결을 제공합니다. --><br>
            <!-- 코벡스에서는 언제든지 원하는 가격으로<br>거래를 할 수 있습니다. -->
            <nl2br tag="span" :text="$t('m_main.a004')"></nl2br>
          </p>
        </div>
        <div class="btn_wrap" v-show="!isLoggedIn">
          <el-button class="login" @click="goLogin">{{$t('m_main.a005')}}
            <!-- 로그인 -->
          </el-button>
          <el-button class="join" @click="goRegistration">{{$t('m_main.a006')}}
            <!-- 회원가입 -->
          </el-button>
        </div>
        <div class="btn_wrap" v-show="isLoggedIn">
          <el-button class="exchange" @click="goExchange">{{$t('m_main.a007')}}
            <!-- 거래소 바로가기 -->
          </el-button>
        </div>
      </div>
      <div class="app_wrap">
        <div class="txt">
          <p class="t_txt">{{$t('m_main.b001')}}
            <!-- 언제 어디서나 안정적인 --><br><strong>{{$t('m_main.b002')}}
              <!-- 코벡스 Mobile App --></strong></p>
          <p class="s_txt" v-html="$t('m_main.b003')">
            <!-- 다양한 증권사에서 검증된<br>증권 전문 개발사가 직접 개발했습니다. -->
          </p>
        </div>
        <div class="down">
          <div class="exchange_slide">
            <div class="phone_img">
              <span class="phone_img01"></span>
              <span class="phone_img02"></span>
              <span class="phone_img03"></span>
              <span class="phone_img04"></span>
              <span class="phone_img05"></span>
              <span class="phone_img06"></span>
              <span class="phone_img07"></span>
              <span class="phone_img08"></span>
            </div>
            <agile :autoplay="true" :autoplaySpeed="5000" :speed="300">
              <div class="slide">
                <div class="img"><img :src="require('@/images/m_main_slide01.png')"></div>
              </div>
              <div class="slide">
                <div class="img"><img :src="require('@/images/m_main_slide02.png')"></div>
              </div>
              <div class="slide">
                <div class="img"><img :src="require('@/images/m_main_slide03.png')"></div>
              </div>
            </agile>
          </div>
          <div class="down_btn">
            <div class="center_area">
              <el-button type="text" @click="goGooglePlay"><img :src="require('@/images/m_main_btn_google.png')" alt="goggle play down"></el-button>
              <el-button type="text" @click="goAppStore"><img :src="require('@/images/m_main_btn_app.png')" alt="app store down"></el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="advantage_wrap">
        <p class="advantage_tit" v-html="$t('m_main.c001')">
          <!-- 매일 성장하는 <br>거래소, <span class="kovex">KOVEX</span> -->
        </p>
        <ul class="advantage_list">
          <li class="list01">
            <div class="cont">
              <strong>{{$t('m_main.c002')}}
                <!-- 최적화된 거래 환경 --></strong>
              <p v-html="$t('m_main.c003')">
                <!-- 증권 전문 개발사의 지속적인 연구와<br>다년간의 경험을 바탕으로<br>혁신적인 거래환경을 제공합니다. -->
              </p>
            </div>
          </li>
          <li class="list02">
            <div class="cont">
              <strong>{{$t('m_main.c004')}}
                <!-- 강력한 보안 --></strong>
              <p><span v-html="$t('m_main.c005')"></span>
                <span v-html="$t('m_main.c006')"></span>
                <!-- 코벡스는 최고의 보안 시스템을<br>사용합니다. 또한 암호화폐를<br>콜드월렛에 예치하여<br>고객님들의 자산을 안전하게<br>보관합니다. -->
              </p>
            </div>
          </li>
          <li class="list03">
            <div class="cont">
              <strong>{{$t('m_main.c008')}}
                <!-- 차별화된 컨텐츠 --></strong>
              <p v-html="$t('m_main.c009')">
                <!-- 앞으로 추가될 코벡스만의<br>차별화된 컨텐츠를 기대해 주세요. -->
              </p>
            </div>
          </li>
        </ul>
        <div class="advantage_cont_wrap">
          <div class="advantage_cont">
            <strong class="tit">TDI</strong>
            <p class="txt" v-html="$t('m_main.c010')">
              <!-- 최고의 투자방식, TDI (Trade – Driven ICO) -->
            </p>
            <p class="s_txt" v-html="$t('m_main.c011')">
              <!-- 거래 수수료를 이용해 신규 암호화폐<br>ICO에 참여할 수 있는 서비스입니다. -->
            </p>
            <div class="img01"><img :src="changeLangImg01()" alt=""></div>
          </div>
          <div class="advantage_cont">
            <strong class="tit">{{$t('m_main.c012')}}
              <!-- 스마트시그널 --></strong>
            <p class="txt" v-html="$t('m_main.c013')">
              <!-- 암호화폐와 투자 전문가가 만나다, 스마트시그널 -->
            </p>
            <p class="s_txt" v-html="$t('m_main.c014')">
              <!-- 실시간으로 고객님께 기준(매수/매도/손절가)을 제공하여<br>매매를 도와드리는 서비스입니다. -->
            </p>
            <div class="img02"><img :src="changeLangImg02()" alt=""></div>
          </div>
        </div>
      </div>
    </el-main>
    <el-footer height="auto" class="footer">
      <div class="link_wrap">
        <div class="link">
          <el-button type="text" @click="goPoiicy">{{$t('m_main.d001')}}
            <!-- 이용약관 -->
          </el-button>
        </div>
        <div class="link">
          <el-button type="text" @click="goPrivacyPolicy">{{$t('m_main.d002')}}
            <!-- 개인정보처리방침 -->
          </el-button>
        </div>
      </div>
      <div class="cont">
        <div class="customer_service">
          <p class="customer_title">{{$t('m_main.d003')}}
            <!-- 문의/상담 -->
          </p>
          <p class="customer_text">
            {{$t('m_main.d004')}}
            <!-- 고객센터 -->: <a href="tel:02-3775-3608">02-3775-3608</a><br>
            {{$t('m_main.d005')}}
            <!-- 카카오톡 문의(24시간) -->:<br>
            {{$t('m_main.d006')}}
            <!-- 이메일 -->: support@kovex.co.kr
          </p>
        </div>
        <div class="info">
          <p class="customer_title">{{$t('m_main.d007-0')}}
            <!-- 코벡스(주) -->
          </p>
          <p class="customer_text">
            {{$t('m_main.d007-1')}}
            <!-- 서울시 영등포구 여의대방로69길 23, 한국금융IT빌딩 8층 -->
            <span class="info_txt">
              <span class="inline_block" v-html="$t('m_main.d007-2')">
                <!-- 대표 <span class="emphasis">김현섭</span> --></span>
              <span class="inline_block" v-html="$t('m_main.d007-3')">
                <!-- 사업자등록번호 <span class="emphasis">344-88-00854</span> --></span>
            </span>
          </p>
        </div>
        <p class="copy">
          Copyrightⓒ2018 KOVEX All rights reserved.
        </p>
      </div>
    </el-footer>
    <template v-if="popupMaskShow">
      <div class="modal-mask">
        <div v-for="item in popup" v-if="item.visible" class="modal-wrapper" :id="'popup' + item.popupMngNo" :style="item.pos" :key="item.popupMngNo">
          <div :key="item.value" class="modal-container">
            <div class="modal-header">
              <slot name="header">{{ item.title }}</slot>
              <div class="modal-close" @click="closePopup(item)"></div>
            </div>
            <div class="modal-body" :class="[item.popupTp=='2'?'agree':'default', item.popupOption!=='0'?'today':'']">
              <slot name="body">
                <div v-if="item.popupGb=='T'" v-html="item.conts"></div>
                <img v-else-if="item.popupGb=='I'" class="popupImg" :src="imgUrl(item.mobileImgId)" alt="" />
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <!-- 이용동의 푸터 -->
                <el-row class="agree" v-if="item.popupTp == '2'">
                  <el-row class="check">
                    <el-checkbox v-model="item.agreeChecked">{{$t('m_main.f004')}}<!-- 해당 내용에 동의합니다. --></el-checkbox>
                  </el-row>
                  <el-row class="btn">
                    <el-button class="pop_btn gray" @click="closePopup(item)">{{$t('m_main.f003')}}<!-- 닫기 --></el-button>
                    <el-button class="pop_btn" :disabled="item.agreeChecked?false:true" @click="confirmPopup(item)" type="primary">{{$t('m_main.f005')}}<!-- 확인 --></el-button>
                  </el-row>
                </el-row>
                <!-- 팝업옵션 -->
                <!-- 1: 오늘하루 열지 않음 체크박스 -->
                <!-- 7: 일주일간 열지 않음 체크박스 -->
                <el-row class="default" v-else>
                  <div class="check" v-if="(item.popupOption !== '0') || !item.popupOption">
                    <el-checkbox v-model="item.cookieChecked">{{ item.popupOption === '1'? $t('m_main.f002') : $t('m_main.f001') }}<!-- '오늘 하루 열지 않음' : '일주일동안 열지 않음' --></el-checkbox>
                  </div>
                  <el-col class="btn">
                    <el-button class="pop_btn" @click="closePopup(item)">{{$t('m_main.f005')}}<!-- 확인 --></el-button>
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
import { mapGetters } from 'vuex';
import { popupList } from '@/api/customers'
import { _ } from 'vue-underscore';
export default {
  data() {
    return {
      navTitle: '메인',
      popup: [],
    };
  },
  methods: {
    imgUrl(imgId) {
      return process.env.IMG_URL + imgId;
    },
    goLogin(e) {
      this.$router.push('/login');
    },
    goRegistration(e) {
      this.$router.push('/guidetokovexapp');
    },
    goExchange(e) {
      this.$router.push('/exchange');
    },
    goGooglePlay(e) {
      this.$alert(this.$t('main.j001'), '', { confirmButtonText: 'OK' });
    },
    goAppStore(e) {
      this.$alert(this.$t('main.j001'), '', { confirmButtonText: 'OK' });
    },
    goPoiicy(e) {
      this.$router.push({ name: 'mCsPolicy', params: { tabIndex: '0' } });
    },
    goPrivacyPolicy(e) {
      this.$router.push({ name: 'mCsPolicy', params: { tabIndex: '1' } });
    },
    showPopup() {
      var self = this;
      popupList({
        dpTp: '20', // pc-10, mobile - 20, app - 30
        langType: self.getLangKind == 'KR' ? 'ko' : 'en',
        unitcode: self.getUnitcode
      }).then(res => {
        //console.log("popupList", res);
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
        temp['mobileImgId'] = data['mobileImgId'];
        temp['nsYn'] = data['nsYn'];
        temp['visible'] = false;
        self.popup.push(temp);
      }
    },
    arrangePopups() {
      var self = this;
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
      } else if (self.popup.length > 3) {
        self.popup[0]['pos'] = { left: '30%' };
        self.popup[1]['pos'] = { left: '70%' };
        self.popup[2]['pos'] = { left: '35%' };
        self.popup[3]['pos'] = { left: '75%' };
        self.popup[0]['visible'] = true;
        self.popup[1]['visible'] = true;
        self.popup[2]['visible'] = true;
        self.popup[3]['visible'] = true;
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
    closePopup(item) {
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
    setCookie(name, value, expiredays) {
      // 당일 저녁 00 시까지 팝업
      var todayDate = new Date();
      todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);
      if (todayDate > new Date()) {
        expiredays = expiredays - 1;
      }
      todayDate.setDate(todayDate.getDate() + expiredays);
      document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    },
    changeLangImg01() {
        var self = this;
        if (self.$i18n.locale == 'en') {
            return require('@/images/m_tdiintroduce_en.png');
        } else {
            return require('@/images/m_tdiintroduce.png');
        }
    },
    changeLangImg02() {
        var self = this;
        if (self.$i18n.locale == 'en') {
            return require('@/images/m_smartintroduce_en.png');
        } else {
            return require('@/images/m_smartintroduce.png');
        }
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getUserId', 'getLangKind', 'getUnitcode']),
    popupMaskShow: function () {
      var self = this;
      if (self.popup.length === 0) {
        return false;
      } else {
        for (var data of self.popup) {
          if (data['visible'] === true) {
            return true;
            break;
          }
        }
      }
      return false;
    }
  },
  created() {
    this.$EventBus.$emit('mobile-nav-title', this.navTitle);
    this.$EventBus.$emit('mobile-nav-menus', ['main']);
    $('.el-menu-item').removeClass('is-active');

    //디바이스 백버튼 클릭시 현재페이지 유지하고 이동은 하지 않음 
    // const backButtonRouteGuard = this.$router.beforeEach((to, from, next) => {
      
    //     /* Blocking back button in menu route */
    //       next(false);        
      
    // });

    // this.$once('hook:destroyed', () => {
    //   // This will be called when the component is destroyed.
    //   // It has access to anything defined in the scope of our "created" method.
    //   backButtonRouteGuard();
    // });       
  },
  mounted() {
    var self = this;
   // self.showPopup();
  },
  watch: {
    getLangKind(val, old) {
      this.$i18n.locale = val == 'EN' ? 'en' : 'ko'
    }
  },
};
</script>
