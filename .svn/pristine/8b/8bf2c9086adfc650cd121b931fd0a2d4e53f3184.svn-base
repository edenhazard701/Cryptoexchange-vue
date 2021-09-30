<template>

  <!--서브 페이지 영역 -->
  <div class="sub-cont">
    <div class="inner">
      <div class="board-notice-view">
        <div class="board-tit">
          <h3>공지사항</h3>
        </div>
        <div class="board-view">
          <div class="view-header board-line clearfix">
            <div class="v-tit">
              <h3>{{form.subj}}</h3>
            </div>
            <div class="v-date ">
              <span>{{form.regDt}}</span>
            </div>
            <div class="v-date-v2">
              <!-- <span>2018</span> -->
            </div>
          </div>
          <!-- <div v-html="form.conts" class="view-content"> -->
          <div v-html="form.conts" class="view-content contsProps">
          </div>
          <div class="btn-list">
            <router-link class="btn-s btn-blue " to="/pmtNoticeList">목록</router-link>
          </div>
        </div>

        <!--view-->
      </div>

    </div>
    <!--view-->

  </div>
  <!--서브 페이지 영역 -->

</template>

<script>
import { promNoticeDetail } from '../../api/promotion.js'
import { VueEditor } from 'vue2-editor'
import Cookies from 'js-cookie'
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      no: this.$route.query.no,
      form: {}
    }
  },
  created() {
    promNoticeDetail({
      no: this.no,
      langType: Cookies.get('Language-Type')
    })
      .then(res => {
        this.form = res.body[0]
        console.log(this.form);
      })
      .catch(err => {

      })
      
  }
}
</script>

<style>
/* // detail editor v-html */
.contsProps ol > li{list-style-type:none !important;}
.contsProps ul, ol {display:block;padding-left:40px}
.contsProps ul > li {display:list-item;list-style-type: disc}
/* .contsProps ol > li {display:list-item;list-style-type: decimal !important} */
.contsProps {line-height:1.42 !important;font-size:16px !important;padding: 12px 15px;}
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
/* .contsProps .ql-indent-1:not(.ql-direction-rtl) {padding-left: 3em;}
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
.contsProps .ql-indent-9.ql-direction-rtl.ql-align-right {padding-right: 27em;} */
/* video */
.contsProps .ql-video {display: block;max-width: 100%;}
.contsProps .ql-video.ql-align-center {margin: 0 auto;}
.contsProps .ql-video.ql-align-right {margin: 0 0 0 auto;}


</style>
