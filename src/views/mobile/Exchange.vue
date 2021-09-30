<template>
  <div class="Exchange">
    <el-row class="notice-wrap">
      <el-col class="notice-speak"><i class="el-icon-edit"></i></el-col>
      <el-col class="notice-text" :value="notice.mng01"><span @click="noticeHandle01">{{notice.noti01}}</span></el-col>
      <el-col class="notice-zoom">
        <el-button icon="el-icon-zoom-in" @click="viewSearch()"></el-button>
      </el-col>
    </el-row>
    <span class="hide-search" v-show="isActive" @click="viewSearch()"></span>
    <stock-list :srchView="isActive" class="stock-list" v-on:sendItemId="setSymbol"></stock-list>

    <!-- dialog(푸시)// -->
    <el-dialog title="지정가 알림" :visible.sync="NotiPushDialogVisible" :close-on-click-modal="false" center>
      <div class="push_table">
        <table class="tbody_table_sy">
          <colgroup>
            <col style="width:60px;">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">종목</th>
              <td class="fluctuation">이더리움 <span class="symbol">ETH/KRW</span></td>
            </tr>
            <tr>
              <th scope="row">조건</th>
              <td>270,420 <span class="symbol">ETH/KRW</span> <span class="reach">도달</span></td>
              <!-- reach 도달 , up 상승 , down 하락 -->
            </tr>
            <tr>
              <th scope="row">일시</th>
              <td>18/10/10 17:24</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="NotiPushDialogVisible = false">닫기</el-button>
        <el-button type="primary">주문</el-button>
      </div>
    </el-dialog>
    <!-- //dialog(푸시) -->

    <!-- Native App일 때만 나타남 -->
    <app-menu></app-menu>

    <!-- 팝업 -->
    <template v-if="popupMaskShow">
      <div class="modal-mask">
        <div v-for="item in popup" v-if="item.visible" class="modal-wrapper" :id="'popup' + item.popupMngNo" :style="item.pos" :key="item.popupMngNo">
          <div :key="item.value" class="modal-container">
            <div class="modal-header">
              <slot name="header">{{ item.title }}</slot>
              <div class="modal-close" @click="closePopup(item)"></div>
            </div>
            <div class="modal-body" :class="[item.popupTp == '2'?'agree':'default', item.popupOption !=='0'?'today':'']">
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
                    <el-button class="pop_btn" :disabled="item.agreeChecked ? false:true" @click="confirmPopup(item)" type="primary">{{$t('m_main.f005')}}<!-- 확인 --></el-button>
                  </el-row>
                </el-row>
                <!-- 팝업옵션 -->
                <!-- 1: 오늘하루 열지 않음 체크박스 -->
                <!-- 7: 일주일간 열지 않음 체크박스 -->
                <el-row class="default" v-else>
                  <div class="check" v-if="(item.popupOption !== '0') || !item.popupOption">
                    <el-checkbox v-model="item.cookieChecked">{{item.popupOption === '1'? $t('m_main.f002') : $t('m_main.f001') }}<!-- '오늘 하루 열지 않음' : '일주일동안 열지 않음' --></el-checkbox>
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
  </div>
</template>

<script>
import StockList from '../exchanges/StockList';
import { mapState, mapGetters } from 'vuex';
import { _ } from 'vue-underscore';
import { noticeMain, popupList } from '@/api/customers';
import AppMenu from './common/MobileFooterMenu';

export default {
  components: {
    StockList,
    AppMenu
  },
  data() {
    return {
      navTitle: '거래소',
      itemId: '',
      isActive: false,
      //푸시팝업
      NotiPushDialogVisible: false,
      notice: {
        noti01: '',
        mng01: 0
      },
      popup: []
    }
  },
  created() {
    this.$EventBus.$emit('mobile-nav-title', this.$t('m_main.e004'));
    this.$EventBus.$emit('mobile-nav-menus', ['notification']);
    window.addEventListener('scroll', this.handleScroll);
  },
  computed: {
    ...mapState({
      currentSymbol: state => state.data.currentSymbol,
      currentPayCurrCode: state => state.data.currentPayCurrCode
    }),
    ...mapGetters(['getLangKind', 'getUserId', 'getUnitcode']),
    socketConnected() {
      return this.$store.getters.isSocketConnected;
    },
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
  watch: {
    getLangKind(val, old) {
      this.$i18n.locale = val == 'KR' ? 'ko' : val == "EN" ? 'en' : /*default 'ko' */ 'ko'
    }
  },
  methods: {
    imgUrl(imgId) {
      return process.env.IMG_URL + imgId;
    },
    viewSearch() {
      var srchObj = document.getElementsByClassName('el-input__inner')[0];
      var listRows = document.getElementsByClassName('el-table__row');

      if (this.isActive === false) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }

      this.$EventBus.$emit('resetSearch', '');

      for (let row of listRows) {
        row.style.display = '';
      }
    },
    setSymbol(id) {
      // 관심종목에서 선택한 아이템 아이디 값 세팅
      this.itemId = id;
      console.log('Exchange.vue > setSymbol > id : ' + this.itemId);
    },
    showNotice() {
      var self = this;
      // 메인 공지 
      noticeMain({
        dpYn: 'Mobile',
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
      });
    },
    noticeHandle01() {
      var self = this;
      self.$router.push({ name: 'mNoticeDetail', query: { no: self.notice.mng01 } });
    },
    handleScroll: function (event) {
      var scrollTop = window.scrollY;
      var notiHei = document.getElementsByClassName('notice-wrap')[0].offsetHeight;
      var tabHei = document.getElementsByClassName('market-tab')[0].offsetHeight;
      var topContHei = notiHei + tabHei - 10;
      var exchangePage = document.getElementsByClassName('Exchange')[0].getElementsByClassName('StockList')[0];

      if (scrollTop > topContHei) {
        exchangePage.getElementsByClassName('el-table')[0].style.position = "fixed";
        exchangePage.getElementsByClassName('el-table')[0].style.top = "45px";
        exchangePage.getElementsByClassName('el-scrollbar')[0].style.padding = "30px 0 0"
      } else {
        exchangePage.getElementsByClassName('el-table')[0].removeAttribute("style")
        exchangePage.getElementsByClassName('el-scrollbar')[0].removeAttribute("style")
      }
    },
    showPopup() {
      var self = this;
      var termArr = [];
      let lastPopup = false;

      console.log('popup input >>>>>>>>>>>>>', self.getLangKind == 'KR' ? 'ko' : 'en');

      // 팝업리스트 조회
      popupList({
        dpTp: '30', // pc-10, mobile - 20, app - 30
        langType: self.getLangKind == 'KR' ? 'ko' : 'en',
        unitcode: self.getUnitcode
      }).then(res => {
        if (!res) return;
        var body = res.body;
        console.log('popup >>>>>>>>>>>>>', body)
        
        console.log('로그인 함 >>>>>>>>>>>>>>>')
        // 이용 동의 팝업 몇건 있는지 검사
        for (var data of body) {
          if (data['popupTp'] === '2') {
            console.log('이용동의 팝업  >>>>>>>>', data['popupMngNo'], data['subj']);
            termArr.push(data['popupMngNo']);
          }
        }

        var count = 0;

        // 이용 동의 팝업이 있으면,
        if (termArr.length > 0) {
          console.log('이용 동의 팝업이 >>>>>>>>>>>>>>>   ', termArr.length + ' 건 있음');
          let data = {};
          for (let idx in body) {
            data = body[idx];
            lastPopup = body.length == Number(idx) + 1 ? true : false

            // 이용동의 팝업이 아니면  
            if (data['popupTp'] !== '2') {
              console.log('이용동의 팝업이 아님 >>>>>>>>', count, data['popupMngNo'], '제목 :' + data['subj']);
              self.setPopupArr(data, lastPopup)

            } else { // 이용동의 팝업이면
              self.$socket.sendProcessByName('ac535', (queryData) => {
                var block = queryData.getBlockData('InBlock1')[0];
                block['user_id'] = self.getUserId;
                block['terms_kind'] = data['agrCnt']
              }, (returnData) => {
                if (returnData) {
                  var OutBlock1 = returnData['queryObj']['OutBlock1'][0];
                  console.log('이용동의 조회 >>>>>>>>>>>>>', OutBlock1);
                  count++;

                  console.log('이용동의 조회 count >>>>>>>>', count);
                  console.log('이용동의 여부1 >>>>>>>>', OutBlock1['terms_kind'], OutBlock1['use_terms']);
                  console.log('이용동의 여부2 >>>>>>>>', body);
                  console.log('이용동의 여부2 >>>>>>>>', OutBlock1['terms_kind']);
                  console.log('이용동의 여부3 >>>>>>>>', _.findWhere(body, { 'agrCnt': OutBlock1['terms_kind'] }));

                  // 동의 했으면 1 -> 팝업 X
                  if (OutBlock1['use_terms'] === '0') {
                    self.setPopupArr(_.findWhere(body, { 'agrCnt': OutBlock1['terms_kind'] }), lastPopup);
                  }
                } else {
                  const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                  if (errorData.trName != "ac535") return;
                  console.log(self.$t('sys_err.' + errorData.errCode));
                }
              })
            }
          }
        } else { // 이용동의 팝업이 없으면 
          for (let idx in body) {
            lastPopup = body.length == Number(idx) + 1 ? true : false
            self.setPopupArr(body[idx], lastPopup);
          }
        }
      });
    },
    setPopupArr(data, isLast) {
      let self = this;
      let cookiedata = '';
      let getPopupInfo = function() {
        return new Promise((resolve, reject) => {
          if (afc.isDevice) {
            afc.getNoticePopup(function(param){
              if (!param) {
                resolve("")
              } else {
                resolve(param)
              }
            })
          } else {
            reject(document.cookie)
          }
        })
      }
      getPopupInfo().then((res) => { 
        let tmpArr = res.split(";")
        let tmpDate = new Date()
        for (let data of tmpArr) {
          if (data.split("&")[1] != undefined) {
            if (Number(data.split("&")[1].replace(";","")) > tmpDate.getTime()) {
              // 유효기간이 지나지 않음
              cookiedata += data + ";"
            }
          }
        }
      }).catch((res) => {
        cookiedata = res
      }).finally(() => {
        console.log("cookiedata : ", cookiedata)
        if (cookiedata.indexOf('kovexPopup' + data['popupMngNo'] + '=done') < 0) {
          console.log('쿠키에 등록 안됨 >>>>>>>>>> ', 'kovexPopup' + data['popupMngNo'], 'popup 배열에 추가')
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
        if (isLast) { 
          self.arrangePopups()
        }
      })
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
      } else if (self.popup.length === 4) {
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
      console.log(item);
      console.log(self.getUserId);
      console.log(item['agrCnt']);
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
      // document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"

      if(afc.isDevice) {
        let oldPopup = ""
        let newPopup = ""
        let setPopupInfo = function() {
          return new Promise((resolve, reject) => {
            afc.getNoticePopup(function(param) {
              oldPopup = !!param ? param : ""
              resolve()
            })
          })
        }
        setPopupInfo().then(() => {
          let tmpArr = oldPopup.split(";")
          let tmpDate = new Date();
          for(let data of tmpArr) {
            if(data.split("&")[1] != undefined) {
              if( Number(data.split("&")[1].replace(";","")) > tmpDate.getTime() ) {
                // 유효기간이 지나지 않은 팝업
                newPopup += data + ";"
              }
            }
          }

          newPopup += name +"=done&"+todayDate.getTime() + ";"
          console.log("afc.setNoticePopup : ", newPopup)
          afc.setNoticePopup(newPopup)
        })
      }
    },
  },
  mounted() {
    var self = this;
    self.handleScroll();
    self.showNotice();

    if (afc.isDevice) {
      self.showPopup();
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>
