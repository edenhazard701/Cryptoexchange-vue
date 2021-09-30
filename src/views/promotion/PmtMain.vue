<template>
<div>
  <!-- 앵커 -->
  <ul class="anc style-pc">
    <li class="active"><a href="#section01">HOME<span class="circle"></span></a></li>
    <li><a href="#section02">{{ $t('main.b002') }}<span class="circle"></span></a></li>
    <li><a href="#section03">{{ $t('main.b003') }}<span class="circle"></span></a></li>
    <li><a href="#section04">{{ $t('main.b004') }}<span class="circle"></span></a></li>
    <li><a href="#section05">{{ $t('main.b005') }}<span class="circle"></span></a></li>
  </ul>
  <!-- //앵커 -->

  <!-- HOME -->
  <div id="section01" class="section section01 current">
  <!-- <div id="section01" :class="['section', {section01}, 'current']"> -->
    <div class="inner">
      <div class="text-box">
        <p class="text01 fadeInUp-1">{{ $t('main.a001') }}</p>
        <p class="text02 style-pc fadeInUp-2">{{ $t('main.a002') }} <span class="style-mo">KOVEX</span></p>
        <p class="text03 style-pc fadeInUp-3">KOVEX</p>
        <!-- <p class="text02 style-mo fadeInUp-2">통합 암호화폐 거래소 KOVEX</p> -->
        <p class="text04 fadeInUp-4">{{ $t('main.a003') }}</p>
        <p class="text04 type02 fadeInUp-4">{{ $t('main.a004') }}</p>
      </div>
      <div class="move-scroll style-pc"><a href="#section02">SCROLL</a></div>
    </div>
  </div>
  <!-- //HOME -->

  <!-- 트 -->
  <div id="section02" class="section section02">
    <div class="inner">
      <h1 class="title">{{ $t('main.c001') }}</h1>
      <h2 class="explain">{{ $t('main.c002') }}</h2>

      <div class="person-box">
        <div class="bg-person">
          <p class="text01">{{ $t('main.c003') }}</p>
          <p class="text02"><span class="point-blue counting" data-count="109099"></span> {{ $t('main.c004') }}</p> <!-- data-count에 값 입력 -->
        </div>

        <div class="event-box">
          <!-- 사전가입 보상 -->
          <div class="event event01">
            <h1 class="e-title">{{ $t('main.d001') }}<button class="btn-detail open"></button></h1>
            <h2 class="e-subtitle">{{ $t('main.d002') }}</h2>
            <ul class="info-list">
              <li>
                <span class="dot"></span>
                <span>{{ $t('main.d004') }}</span>
                <span>{{ $t('main.d005') }}</span>
              </li>
              <li>
                <span class="dot"></span>
                <span>{{ $t('main.d006') }}</span>
                <span>{{ $t('main.d007') }}</span>
              </li>
            </ul>
          </div>
          <!-- //사전가입 보상 -->

          <!-- 사전가입 보상 상세 -->
          <div class="detail">
            <button class="btn-detail close"></button>
            <div class="text-box">
              <span class="first"><span class="dot"></span>{{ $t('main.d008') }}</span>
              <ul class="list01">
                <li><span class="num">1.</span>{{ $t('main.d009-1') }} <span class="point-yellow">{{ $t('main.d009-2') }}</span>{{ $t('main.d009-3') }}</li>
                <li><span class="num">2.</span><span class="point-yellow">{{ $t('main.d010-1') }}</span>{{ $t('main.d010-2') }}<span class="br-type-pc"></span>{{ $t('main.d010-3') }}</li>
                <li><span class="num">3.</span>{{ $t('main.d011-1') }} <span class="point-yellow">{{ $t('main.d011-2') }} <span class="br-type-pc"></span>{{ $t('main.d011-3') }}</span>{{ $t('main.d011-4') }}</li>
                <li class="point-skyblue"><span class="num">※</span>{{ $t('main.d012-1') }} <span class="br-type-mo"></span>{{ $t('main.d012-2') }} <span class="br-type-pc"></span>{{ $t('main.d012-3') }}</li>
              </ul>
              <span class="second">{{ $t('main.d013') }}</span>
              <ul class="list02">
                <li><span class="num">※</span>{{ $t('main.d014') }}</li>
                <li><span class="num">※</span>{{ $t('main.d015-1') }} <span class="br-type-mo"></span>{{ $t('main.d015-2') }}<span class="br-type-pc"></span>{{ $t('main.d015-3') }}</li>
                <li><span class="num">※</span>{{ $t('main.d016') }} </li>
              </ul>
            </div>
          </div>
          <!-- //사전가입 보상 상세 -->

          <!-- 레퍼럴 보상 -->
          <div class="event event02">
            <h1 class="e-title">{{ $t('main.e001') }}<button class="btn-detail open"></button></h1>
            <h2 class="e-subtitle">{{ $t('main.e002') }}</h2>
            <ul class="info-list">
              <li>
                <span class="dot"></span>
                <span>{{ $t('main.e004') }} </span>
                <span>{{ $t('main.e005') }}</span>
              </li>
              <li>
                <span class="dot"></span>
                <span>{{ $t('main.e006') }} </span>
                <span>{{ $t('main.e007') }}</span>
              </li>
            </ul>
          </div>
          <!-- //레퍼럴 보상 -->

          <!-- 레퍼럴 보상 상세 -->
          <div class="detail">
            <button class="btn-detail close"></button>
            <div class="text-box">
              <span class="first"><span class="dot"></span>{{ $t('main.e008') }}</span>
              <ul class="list01">
                <li><span class="num">1.</span>{{ $t('main.e009') }}</li>
                <li><span class="num">2.</span>{{ $t('main.e010') }}</li>
                <li><span class="num">3.</span><span class="point-yellow">{{ $t('main.e011-1') }}</span>{{ $t('main.e011-2') }}</li>
                <li><span class="num">4.</span>{{ $t('main.e012-1') }}<span class="point-yellow">{{ $t('main.e012-2') }}</span>{{ $t('main.e012-3') }}<span class="point-yellow">{{ $t('main.e012-4') }}</span>{{ $t('main.e012-5') }}</li>
                <li><span class="num">5.</span>{{ $t('main.e013') }}</li>
              </ul>
              <span class="second">{{ $t('main.d013') }}</span>
              <ul class="list02">
                <li><span class="num">※</span>{{ $t('main.d014') }}</li>
                <li><span class="num">※</span>{{ $t('main.d015-1') }} <span class="br-type-mo"></span>{{ $t('main.d015-2') }}<span class="br-type-pc"></span>{{ $t('main.d015-3') }}</li>
                <li><span class="num">※</span>{{ $t('main.d016') }} </li>
              </ul>
            </div>
          </div>
          <!-- //레퍼럴 보상 상세 -->
        </div>

        <div class="sns-box">
          <a @click="onShareFacebook" class="icon-sns icon-fb" :title="$t('main.f001')"></a>
          <a @click="onShareTwiter" class="icon-sns icon-twit" :title="$t('main.f002')"></a>
          <a @click="onShareNaver" class="icon-sns icon-blog" :title="$t('main.f003')"></a>
          <a href="javascript:;" id="kakao-link-btn" class="icon-sns icon-kakao" :title="$t('main.f004')"></a>
          <a @click="onShareTelegram" class="icon-sns icon-telegram" :title="$t('main.f005')"></a>
          <a class="icon-sns icon-copy" v-clipboard:copy="onMainUrl" :title="$t('main.f006')"></a>
        </div>
      </div>
    </div>
  </div>
  <!-- //사전가입 이벤트 -->

  <!-- 나의 보상확인 -->
  <div id="section03" class="section section03">
    <div class="inner">
      <div class="email-box">
        <div class="left">
          <h1 class="title">{{ $t('main.g001') }}</h1>
          <h2 class="explain">{{ $t('main.g002-1') }} <span class="br-type-pc"></span>{{ $t('main.g002-2') }} <span class="br-type-mo"></span>{{ $t('main.g002-3') }}</h2>
        </div>
        <div class="right">
          <div class="ip-email">
            <span class="icon-email"></span>
            <input type="email" v-model="user_mail" @keyup.enter="onReward" :placeholder="$t('main.g003-1')"/>
            <button @click="onReward" class="btn-email"></button>
          </div>
            <div v-show="chkEmail" style="color:red;">{{$t('main.g003-1')}}</div>
        </div>
      </div>
      <div class="reward-box">
        <div class="tbl-title-box">
          <h3 class="tbl-title">{{ $t('main.g004') }}</h3>
          <!-- <div class="sns-box style-pc"> -->
            <div class="sns-box">
            <!-- <span class="fb-share-button" data-href="http://promotion.kovex.co.kr/#/referral_id=655qdr" data-layout="button" data-size="small" data-mobile-iframe="true"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fpromotion.kovex.co.kr%2F%23%2Freferral_id%3D655qdr&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore icon-sns icon-fb"></a></span> -->
            <span @click="onRcmFacebook" class="icon-sns icon-fb" :title="$t('main.f001')"></span>
            <span @click="onRcmTwiter" class="icon-sns icon-twit" :title="$t('main.f002')"></span>
            <span @click="onRcmNaver" class="icon-sns icon-blog" :title="$t('main.f003')"></span>
            <!-- <a href="javascript:;" id="kakao-link-btn-rcm" class="icon-sns icon-kakao" :title="$t('main.f004')"></a> -->
            <a @click="onKaKao" class="icon-sns icon-kakao" :title="$t('main.f004')"></a>
            <span @click="onRcmTelegram" class="icon-sns icon-telegram" :title="$t('main.f005')"></span>
            <span class="icon-sns icon-copy" v-clipboard:copy="onMainUrl" :title="$t('main.f006')"></span>
          </div>
        </div>
        <div class="tbl-wrap">
          <table>
            <caption>{{ $t('main.g004') }}</caption>
            <colgroup>
              <col class="col-w">
              <col class="col-auto">
              <col class="col-w02">
            </colgroup>
            <tbody>
              <tr>
                <th>{{ $t('main.g005') }}<span class="vertical"></span></th>
                <td colspan="2">{{user_id}}</td>
              </tr>
              <tr>
                <th>{{ $t('main.g006') }}<span class="vertical"></span></th>
                <td class="bdr-none">
                  <span class="link">{{rcmd_link}}</span>
                </td>
                <td class="bdl-none">
                  <span class="copy-wrap">
                    <button class="btn-copy" v-clipboard:copy="rcmd_link">{{$t('main.g009')}}</button>
                  </span>
                </td>
              </tr>
              <tr>
                <th>{{ $t('main.g007') }}<span class="vertical"></span></th>
                <td class="bdr-none">{{rcmd_cd}}</td>
                <td class="bdl-none">
                  <span class="copy-wrap">
                    <button class="btn-copy" v-clipboard:copy="rcmd_cd">{{$t('main.g009') }}</button>
                  </span>
                </td>
              </tr>
              <tr>
                <th>{{ $t('main.g008') }}<span class="vertical"></span></th>
                <td colspan="2">{{rcmd_cnt}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- //나의 보상확인 -->

  <!-- TDI란? -->
  <div id="section04" class="section section04">
    <div class="inner">
      <h1 class="title">{{ $t('main.i001') }}</h1>
      <h2 class="explain"><span class="point-orange">{{ $t('main.i002-1') }} <span class="br-type-mo"></span>{{ $t('main.i002-2') }}</span>{{ $t('main.i002-3') }}</h2>
      <h2 class="explain">{{ $t('main.i002-4') }} <span class="br-type-mo"></span>{{ $t('main.i002-5') }}</h2>
      <h2 class="explain">{{ $t('main.i002-6') }}</h2>
      <ul class="tdi-list">
        <li><span class="num">1.</span>{{ $t('main.i009-1') }} <span class="point-orange">{{ $t('main.i009-2') }} <span class="br-type-mo"></span>{{ $t('main.i009-3') }}</span>{{ $t('main.i009-4') }}</li>
        <li><span class="num">2.</span>{{ $t('main.i010-1') }} <span class="point-orange">{{ $t('main.i010-2') }}</span>{{ $t('main.i010-3') }}</li>
        <li><span class="num">3.</span>{{ $t('main.i011-1') }} <span class="point-orange">{{ $t('main.i011-2') }}</span>{{ $t('main.i011-3') }}</li>
      </ul>
      <span class="refer">{{ $t('main.i012') }}</span>
    </div>
  </div>
  <!-- //TDI란? -->

  <!-- 스마트시그널이란? -->
  <div id="section05" class="section section05">
    <div class="inner">
      <h1 class="title">SMART SIGNAL</h1>
      <h2 class="explain">{{ $t('main.j002-1') }} <span class="point-orange">{{ $t('main.j002-2') }}</span>{{ $t('main.j002-3') }}</h2>
      <h2 class="explain"><span class="point-orange">{{ $t('main.j002-4') }}<span class="br-type-mo"></span>{{ $t('main.j002-5') }}</span>{{ $t('main.j002-6') }} <span class="br-type-mo"></span>{{ $t('main.j002-7') }}</h2>
      <ul class="ss-list">
        <li><span class="num">1.</span>{{ $t('main.j008-1') }} <span class="point-orange">{{ $t('main.j008-2') }} <span class="br-type-pc"></span>{{ $t('main.j008-3') }}</span>{{ $t('main.j008-4') }} <span class="point-orange">{{ $t('main.j008-5') }}</span></li>
        <li><span class="num">2.</span>{{ $t('main.j009-1') }} <span class="br-type-pc"></span><span class="point-orange">{{ $t('main.j009-2') }}</span></li>
      </ul>
    </div>
  </div>
  <!-- //스마트시그널이란? -->

<!-- //wrap -->

<!-- 레이어팝업 -->
  <div id="popup-main" data-modal-id="popup" :ref="'popupNo' + item.popupMngNo" :class="['modal-box', 'type-footer', 'main', 'popupIdx' + index, 'popupNo' + item.popupMngNo]" :style="{display:'none'}" 
    v-for="(item, index) in popupData" :key="index">
      <div class="pop-header"> 
        <p class="tit">{{item.subj}}<button @click="onClosePopup(item.popupMngNo, item.popupOptionCnt, index, checkIn[index])" class="btn-pop-close js-modal-close">닫기</button></p>
      </div>
      <div class="pop-body mCustomScrollbar">
            
            <p class="contsProps" v-html="item.conts"></p>
          
            <!-- {{item.pcFile}} -->
            <img v-if="item.pcBase64" @click="onImgLink(item)" :src="item.pcBase64" />
      </div>
      <div v-if="item.popupOptionCnt !== '30'" class="pop-footer">
        <div class="ch-box">
          <el-checkbox v-model="checkIn[index]"></el-checkbox>
          <!-- <input type="checkbox" id="noView" v-model="item.checkIn = false"> -->
          <label for="noView">{{item.popupOption}}</label>
        </div>
        <!-- <button  class="js-modal-close">닫기</button> -->
        <button @click="onClosePopup(item.popupMngNo, item.popupOptionCnt, index, checkIn[index])" class="js-modal-close">닫기</button>
      </div>
    </div>
  <!-- </div> -->
<!-- //레이어팝업 -->
</div>

</template>
<script>

import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import { promPopupList } from '../../api/promotion.js'
import Cookies from 'js-cookie'

Vue.use(VueClipboard)
const popupKey = 'popupKey'
// Kakao.init('e276240efc16e274b8b67e56002fc45f');
// const onKaKao = function() {
//       alert('kkkkkk')
//         Kakao.Link.sendDefault({
//         // container: '#kakao-link-btn-rcm',
//         objectType: 'feed',
//         content: {
//           title: 'KOVEX 추천인 링크',
//           description: 'KOVEX 추천인 링크',
//           imageUrl: 'http://promotion.kovex.co.kr/img/kovex_naver_twiter.png',
//           link: {
//             webUrl: 'http://promotion.kovex.co.kr/?referral_id=' + this.rcmd_cd,
//             mobileWebUrl: 'http://promotion.kovex.co.kr/?referral_id=' + this.rcmd_cd
//           }
//         }
//       })
// }
export default {
  data() {
    return {
      user_mail : '',
      rcmd_link : '',
      rcmd_cnt : '',
      rcmd_cd : '',
      user_id : '',
      popupData : [],
      checkIn: [],
      chkEmail: false,
      onMainUrl: document.location.href
    }
  },
  methods: {
    onImgLink(item) {
      if (item.cnntUrlYn === '사용') window.open(item.cnntUrl)
      else return
    },

    onReward() {

      Vue.prototype.$socket.sendProcessByName('ac584',
        queryData => {
          let block = queryData.getBlockData('InBlock1')[0]
          block['user_mail'] = this.user_mail
        },
        queryData => {
          if(!queryData) {

            let errorData = window.sessionStorage.getItem('lastErrorData')

            if (errorData !== null) {
              errorData = JSON.parse(errorData)
              this.chkEmail = true
            }
            return
          }
          this.chkEmail = false

          var dp = $(".reward-box").css("display")

          if (dp == "none") {
            $(".reward-box").slideDown();
          }

          let res = queryData.getBlockData('OutBlock1')[0]
          this.rcmd_link = res.rcmd_link
          this.rcmd_cd = res.rcmd_link.split('=')[1]
          this.user_id = res.user_mail
          this.rcmd_cnt = res.rcmd_cnt
        })
    },
    onPopup() {
      promPopupList({
        langType: Cookies.get('Language-Type')
      })
        .then(res => {
          this.popupData = res.body
          let popupLen = this.popupData.length
          
          const that = this
          setTimeout(_ => {
            for (let i = 0; i < this.popupData.length; i++) {
              let getPopupMngNo = this.popupData[i].popupMngNo
              let popupCookie = 'popupNo' + getPopupMngNo
              if (Cookies.get(popupKey + getPopupMngNo)) {
                // that.$refs[popupCookie][0].style.display = 'none'
                // console.log(Object.keys(that.$refs).length)
                // this.$refs[popupKey + getPopupMngNo][i].style.display = 'none'
                
              } else {
                // setTimeout(_ => {
                  that.$refs[popupCookie][0].style.display = 'block'

                  if ( popupLen === 1) {
                    console.log('=========== i === 0 && popupLen === 1 ========')
                    document.querySelector('.popupIdx0').classList.add('popup_one')
                  
                  } else if ( popupLen === 2 ) {
                    document.querySelector('.popupIdx0').classList.add('popup_two_one')
                    document.querySelector('.popupIdx1').classList.add('popup_two_two')
                  } else if ( popupLen === 3 ) {
                    document.querySelector('.popupIdx2').classList.add('popup_three_one')
                    document.querySelector('.popupIdx1').classList.add('popup_three_two')
                    document.querySelector('.popupIdx0').classList.add('popup_three_three')
                    
                  } else if ( popupLen === 4 ) {
                    document.querySelector('.popupIdx3').classList.add('popup_four_three')
                    document.querySelector('.popupIdx2').classList.add('popup_four_four')
                    document.querySelector('.popupIdx1').classList.add('popup_four_one')
                    document.querySelector('.popupIdx0').classList.add('popup_four_two')
                  }

                  var overlay =  ("<div class='modal-overlay " + "popupIdx" + i + "'" + "></div>");
                  $("body").append(overlay);
                  $(".modal-overlay").fadeTo(300, 0.7);
                  // $(".js-modalbox").fadeIn(500);
                  
                  let idx = $('.popupIdx'+i)[i]

              }

            }
          }, 100)
        })
        .catch(err => {
          console.log(err)
        })
    },
    onClosePopup(popupMngNo, popupOptionCnt, index, checkIn) {
   
      let popupNo = 'popupNo' + popupMngNo
      this.$refs[popupNo][0].style.display = 'none'
      
      let removeIndex = ".modal-overlay.popupIdx" + index
      $(removeIndex).fadeOut(300, _ => $(removeIndex).remove())
      
      // idx.fadeOut(300, _ => $(".modal-overlay").remove())
      if (checkIn) {
        Cookies.set(popupKey + popupMngNo, popupMngNo, {expires:popupOptionCnt})
      }
    },

    onShareTwiter() {
      let sendUrl = 'https://twitter.com/intent/tweet?text=KOVEX&url=http://promotion.kovex.co.kr'
		  window.open(sendUrl)
    },
    onShareFacebook() {
      let sendUrl = 'http://www.facebook.com/sharer/sharer.php?u=http://promotion.kovex.co.kr'
      window.open(sendUrl)
    },
    onShareTelegram() {
      let sendUrl = 'https://telegram.me/share/url?url=http://promotion.kovex.co.kr'
      window.open(sendUrl)
    },
    onShareNaver() {
      let url = encodeURI(encodeURIComponent('http://promotion.kovex.co.kr'))
      let title = encodeURI('KOVEX')
      let sendUrl = 'https://share.naver.com/web/shareView.nhn?url=' + url + '&title=' + title
      window.open(sendUrl)
    },

    // 트위터
    onRcmTwiter() {
      const sendUrl = 'https://twitter.com/intent/tweet?text=KOVEX&url=http://promotion.kovex.co.kr/?referral_id=' + this.rcmd_cd
		  window.open(sendUrl)
    },
    // 페이스북
    onRcmFacebook() {
      let url = encodeURI(encodeURIComponent(this.rcmd_link))
      const sendUrl = 'http://www.facebook.com/sharer/sharer.php?u=http://promotion.kovex.co.kr/?referral_id=' + this.rcmd_cd
      window.open(sendUrl)
    },
    // 텔레그램
    onRcmTelegram() {
      const sendUrl = 'https://telegram.me/share/url?url=http://promotion.kovex.co.kr/?referral_id=' + this.rcmd_cd
      window.open(sendUrl)
    },
    onRcmNaver() {
      let url = encodeURI(encodeURIComponent('http://promotion.kovex.co.kr/?referral_id=' + this.rcmd_cd))
      let title = encodeURI('KOVEX')
      let sendUrl = 'https://share.naver.com/web/shareView.nhn?url=' + url + '&title=' + title
      window.open(sendUrl)
    },
    onKaKao() {
      console.log('============= kakao ============');
      console.log('============= kakao ============');
      // Kakao.Link.createDefaultButton({
      //   container: '#kakao-link-btn-rcm',
      //   objectType: 'feed',
      //   content: {
      //     title: 'KOVEX 추천인 링크',
      //     description: 'KOVEX 추천인 링크',
      //     imageUrl: 'http://promotion.kovex.co.kr/img/kovex_naver_twiter.png',
      //     link: {
      //       webUrl: 'http://promotion.kovex.co.kr/?referral_id=' + this.rcmd_cd,
      //       mobileWebUrl: 'http://promotion.kovex.co.kr/?referral_id=' + this.rcmd_cd
      //     }
      //   }
      // })
      // Kakao.init('e276240efc16e274b8b67e56002fc45f')

      Kakao.Link.sendDefault({
        // Kakao.Link.sendTalkLink({
        // container: '#kakao-link-btn-rcm',
        objectType: 'feed',
        content: {
          title: 'KOVEX 추천인 링크',
          description: 'KOVEX 추천인 링크',
          imageUrl: 'http://promotion.kovex.co.kr/img/kovex_naver_twiter.png',
          link: {
            webUrl: 'http://promotion.kovex.co.kr/?referral_id=' + this.rcmd_cd,
            mobileWebUrl: 'http://promotion.kovex.co.kr/?referral_id=' + this.rcmd_cd
          }
        }
      })
    }
  },
  created() {

    $('.pop-body').mCustomScrollbar()

  },
  
  mounted() {

    if (Cookies.get('Language-Type') === 'en') {
      if (!document.querySelector('.section01').classList.contains('en')) {
        document.querySelector('.section01').classList.add('en')
      }
      
      if (!document.querySelector('.event-box .event.event01').classList.contains('en')) {
        document.querySelector('.event-box .event.event01').classList.add('en')
      }
      
      if (!document.querySelector('.event-box .event.event02').classList.contains('en')) {
        document.querySelector('.event-box .event.event02').classList.add('en')
      }

      if (!document.querySelector('.section04').classList.contains('en')) {
        document.querySelector('.section04').classList.add('en')
      }

      if (!document.querySelector('.section05').classList.contains('en')) {
        document.querySelector('.section05').classList.add('en')
      }
    } else {
      if (document.querySelector('.section01').classList.contains('en')) {
        document.querySelector('.section01').classList.remove('en')
      }
      
      if (document.querySelector('.event-box .event.event01').classList.contains('en')) {
        document.querySelector('.event-box .event.event01').classList.remove('en')
      }
      
      if (document.querySelector('.event-box .event.event02').classList.contains('en')) {
        document.querySelector('.event-box .event.event02').classList.remove('en')
      }

      if (document.querySelector('.section04').classList.contains('en')) {
        document.querySelector('.section04').classList.remove('en')
      }

      if (document.querySelector('.section05').classList.contains('en')) {
        document.querySelector('.section05').classList.remove('en')
      }
    }

    $(".header").removeClass("add-bg")
    
    layerPopup()

    this.onPopup()
    // 추천인코드 링크
    if (location.href.indexOf('#') > 30 && location.search) {
      const replacePath = location.search.split('?')[1]
      console.log('replacePath = ', replacePath);
      window.location.href = 'http://promotion.kovex.co.kr/#/?' + replacePath
    }
    const referral_id = this.$route.query.referral_id

    console.log('referral_id = ', referral_id)
    
    if (referral_id) this.$router.push({path:'/pmtJoin', query:{referral_id:referral_id}})

   
    // reward(); //나의 보상확인
    eventBtnMotion(); //사전가입 이벤트 모션
    anc(); //앵커
    //사전가입자 수 카운트 30초마다 반복 실행
    setInterval(function()
    {
      countNumber(); //사전가입자 수 카운트
    },30000);
    

    $(window).scroll(function(){
    //헤더 고정
    if ($(".wrap").hasClass("type-main")) {
      if ($(document).scrollTop() > 0) {
        $(".header").addClass("add-bg");
      }else{
        $(".header").removeClass("add-bg");
      }
    }

    var pos = $(document).scrollTop();
    // console.log(pos);

    var position01 = $(".section01").offset().top;
    var position02 = $(".section02").offset().top;
    var position02_minus = position02 - 150;
    var position03 = $(".section03").offset().top;
    var position04 = $(".section04").offset().top;
    var position05 = $(".section05").offset().top;

    if(pos == position01){
      $(".anc").removeClass("no-visual");
    }
    else if (pos == position01 || pos < position02_minus) {
      $(".anc > li").each(function(idx){
        $(".anc > li").eq(idx).removeClass("active");
        $(".anc > li").eq(0).addClass("active");
        $(".anc").addClass("no-visual");
      });
    }else if (pos < position02_minus || pos < position03) {
      countNumber(); //사전가입자 수 카운트
      eventView(); //사전가입보상, 레퍼럴보상 show 이벤트
      $(".anc > li").each(function(idx){
        $(".anc > li").eq(idx).removeClass("active");
        $(".anc > li").eq(1).addClass("active");
        $(".anc").addClass("no-visual");
      });

    }else if (pos == position03 || pos < position04) {
      $(".anc > li").each(function(idx){
        $(".anc > li").eq(idx).removeClass("active");
        $(".anc > li").eq(2).addClass("active");
        $(".anc").addClass("no-visual");
      });
    }else if (pos == position04 || pos < position05) {
      $(".anc > li").each(function(idx){
        $(".anc > li").eq(idx).removeClass("active");
        $(".anc > li").eq(3).addClass("active");
        $(".anc").addClass("no-visual");
      });
    }else if (pos == position05 || pos > position04) {
      $(".anc > li").each(function(idx){
        $(".anc > li").eq(idx).removeClass("active");
        $(".anc > li").eq(4).addClass("active");
        $(".anc").addClass("no-visual");
      });
    }
  });

  // 카카오 공유링크
  // Kakao.init('e276240efc16e274b8b67e56002fc45f');
    // // 카카오링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
    Kakao.Link.createDefaultButton({
      container: '#kakao-link-btn',
      objectType: 'feed',
      content: {
        title: 'KOVEX 추천인 링크',
        description: 'KOVEX 추천인 링크',
        imageUrl: 'http://promotion.kovex.co.kr/img/kovex_naver_twiter.png',
        link: {
          webUrl: 'http://promotion.kovex.co.kr',
          mobileWebUrl: 'http://promotion.kovex.co.kr'
        }
      }
    });
  },

  updated() {
    $('.pop-body').mCustomScrollbar()
  },
  destroyed() {
    
  },

}
</script>

<style>

/* // detail editor v-html */
.contsProps {line-height:1.42 !important;font-size:16px !important;padding: 12px 15px;}
.contsProps ol > li{list-style-type:none}
.contsProps .ql-align-center {text-align: center;}
.contsProps .ql-align-justify {text-align: justify;}
.contsProps .ql-align-right {text-align: right;}
.contsProps blockquote {border-left: 4px solid #ccc;padding-left: 16px;}
.contsProps h1,
.contsProps h2,
.contsProps h3,
.contsProps h4,
.contsProps h5,
.contsProps h6,
.contsProps ol,
.contsProps ul,
.contsProps blockquote,
.contsProps p{margin:0 !important;padding:0 !important;}
.contsProps ul{padding-left: 1.5em !important;}
.contsProps ul[data-checked=true]>li,
.contsProps ul[data-checked=false]>li {list-style-type:none}
.contsProps ul[data-checked=true]>li:before{content:"\2611"}
.contsProps ul[data-checked=false]>li:before{content:"\2610"}
.contsProps pre {background-color: #23241f;color: #f8f8f2;border-radius: 3px;padding: 6px 10px;overflow:visible;}
/* .contsProps .ql-font-serif {font-family: Georgia, Times New Roman, serif;} */

.contsProps .ql-size-small {font-size: 0.75em;}
.contsProps .ql-size-large {font-size: 1.5em;}
.contsProps .ql-size-huge {font-size: 2.5em;}
.contsProps .ql-direction-rtl {direction: rtl;text-align: inherit;}
.contsProps ol  {counter-reset: mylist}

.contsProps ol > li:before {counter-increment: mylist;content: counter(mylist, decimal) '. ';}
.contsProps ol ol > li:before {content: counter(mylist, lower-alpha) '. ';}
.contsProps ol ol ol > li:before {content: counter(mylist, lower-roman) '. ';}
.contsProps ol ol ol ol > li:before {content: counter(mylist, decimal) '. ';}
.contsProps ol ol ol ol ol > li:before {content: counter(mylist, lower-alpha) '. ';}
.contsProps ol ol ol ol ol ol > li:before {content: counter(mylist, lower-roman) '. ';}
.contsProps ol ol ol ol ol ol ol > li:before {content: counter(mylist, decimal) '. ';}
.contsProps ol ol ol ol ol ol ol ol > li:before {content: counter(mylist, lower-alpha) '. ';}
.contsProps ol ol ol ol ol ol ol ol ol > li:before {content: counter(mylist, lower-roman) '. ';}


/* ql indent */
.contsProps .ql-indent-1:not(.ql-direction-rtl) {padding-left: 3em;}
.contsProps .ql-indent-1.ql-direction-rtl.ql-align-right {padding-right: 3em;}
.contsProps .ql-indent-2:not(.ql-direction-rtl) {padding-left: 6em;}
.contsProps .ql-indent-2.ql-direction-rtl.ql-align-right {padding-right: 6em;}
.contsProps .ql-indent-3:not(.ql-direction-rtl) {padding-left: 9em;}
.contsProps .ql-indent-3.ql-direction-rtl.ql-align-right {padding-right: 9em;}
.contsProps .ql-indent-4:not(.ql-direction-rtl) {padding-left: 12em;}
.contsProps .ql-indent-4.ql-direction-rtl.ql-align-right {padding-right: 12em;}
.contsProps .ql-indent-5:not(.ql-direction-rtl) {padding-left: 15em;}
.contsProps .ql-indent-5.ql-direction-rtl.ql-align-right {padding-right: 15em;}
.contsProps .ql-indent-6:not(.ql-direction-rtl) {padding-left: 18em;}
.contsProps .ql-indent-6.ql-direction-rtl.ql-align-right {padding-right: 18em;}
.contsProps .ql-indent-7:not(.ql-direction-rtl) {padding-left: 21em;}
.contsProps .ql-indent-7.ql-direction-rtl.ql-align-right {padding-right: 21em;}
.contsProps .ql-indent-8:not(.ql-direction-rtl) {padding-left: 24em;}
.contsProps .ql-indent-8.ql-direction-rtl.ql-align-right {padding-right: 24em;}
.contsProps .ql-indent-9:not(.ql-direction-rtl) {padding-left: 27em;}
.contsProps .ql-indent-9.ql-direction-rtl.ql-align-right {padding-right: 27em;}
/* video */
.contsProps .ql-video {display: block;max-width: 100%;}
.contsProps .ql-video.ql-align-center {margin: 0 auto;}
.contsProps .ql-video.ql-align-right {margin: 0 0 0 auto;}

.contsProps h1 { font-size:2em !important; font-weight:bold !important; margin:1em 0 !important;}
.contsProps h2 { font-size:1.5em !important; font-weight:bold !important; margin:1em 0 !important; }
.contsProps h3 { font-size:1.17em !important; font-weight:bold !important; margin:1em 0 !important; }
.contsProps h4 { font-size:0.99em !important; font-weight:bold !important; margin:1em 0 !important; }
.contsProps h5 { font-size:0.83em !important; font-weight:bold !important; margin:1em 0 !important; }
.contsProps h6 { font-size:0.67em !important; font-weight:bold !important; margin:1em 0 !important; }
.contsProps em { font-style:italic !important;}

.modal-overlay{opacity:0; position:fixed; top:0; left:0; z-index:900; width:100%; height:100%; background:rgba(0, 0, 0, 0.3)!important;}
#popup-main {
  /* top: 30% !important; */
  position: fixed !important;
  /* transform: translate(-50%, -50%) !important; */
}
.icon-sns {
  cursor: pointer;

}
/* .event-box .event.event01{display:block; float:inherit; margin-top:0!important; border-radius:inherit; background:#004ea2 url("../../images/img/m/img_coin01.png") no-repeat center top 216px;} */
.event-box .event.event01{display:block; float:inherit; margin-top:0!important; border-radius:inherit;}

.en{background:#004ea2 url("../../images/img/m/en_img_coin01.png") no-repeat center top 216px;}

.modal-box.main.popup_one{left:50% !important; top:50% !important;} 
.modal-box.main.popup_two_one{left:30% !important; top:50% !important;}
.modal-box.main.popup_two_two{left:75% !important; top:50% !important;}
.modal-box.main.popup_three_two{left:30% !important; top:50% !important; }
.modal-box.main.popup_three_one{left:80% !important; top:50% !important;}
.modal-box.main.popup_three_three{left:50% !important; top:50% !important; z-index:1300 !important;}
.modal-box.main.popup_four_one{left:30% !important; top:50% !important; z-index:1300 !important;}
.modal-box.main.popup_four_two{left:75% !important; top:50% !important; z-index:1300 !important;}
.modal-box.main.popup_four_three{left:30% !important; top:40% !important}
.modal-box.main.popup_four_four{left:75% !important; top:40% !important}


</style>