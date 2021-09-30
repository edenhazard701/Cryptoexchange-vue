<template>
<div class="sub-cont">
  <!-- <div class="inner"> -->
<div class="inner">
    <div class="pc-board-notice">
        <div class="pc-board-tit">
          <h3>{{ $t('announcements.a001')}}</h3>
        </div>
        <div class="board-search">
          <div class="search-window">
            <form action="">
              <div class="search-wrap">
                <select v-model="noticeOption" id="" class="max-results">
                  <option v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </option>
                </select>
                <input type="text" v-model="conts" :placeholder="$t('announcements.a006')">
                <button class="btn-search btn-blue" @click="onSearch">
                  검색
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="board-list ">
          <table class="board-table ">
            <thead >
            <tr>
              <th scope="col" class="th-num"></th>
              <th scope="col" class="th-title">{{ $t('announcements.a003')}}</th>
              <th scope="col" class="th-date">{{ $t('announcements.a007')}}</th>
              <th scope="col" class="th-hits">{{ $t('announcements.a008')}}</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in noticeData" :key="index" :class="{'notice-item':item.rownum === 0}">
                <td v-if="item.rownum === 0" class=""></td>
                <td v-if="item.rownum === 0" @click="onDetail(item.noticeMngNo, item.views)"><a><span :class="{'notice-point':item.rownum === 0}">{{item.subj}}</span></a></td>
                <td v-if="item.rownum === 0" class=""></td>
                <td v-if="item.rownum === 0" class=""></td>

                <td v-if="item.rownum === 1" class=""></td>
                <td v-if="item.rownum === 1" @click="onDetail(item.noticeMngNo, item.views)">{{item.subj}}</td>
                <td v-if="item.rownum === 1" class="">{{item.regDt}}</td>
                <td v-if="item.rownum === 1" class="">{{item.views}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="sPaging pc_style">
          <!-- <div class="sPagingWrap"> -->
          <el-pagination layout="prev, pager, next" 
            :page-size="pageSize" 
            :total="total"
            :current-page.sync="currentPage" 
            @current-change="onPageChange"> 
          </el-pagination>
        </div>
      </div>
      <!--모바일 게시판 -->
      <div class="mo-board-notice">
        <div class="m-board-tit">
          <h3>공지사항</h3>
        </div>
        <div class="m-board-search">
          <form action="">
            <div class="search-wrap">
              <select name="" class="max-results ">
                <option value="10">{{ $t('announcements.a005')}}</option>
                <option value="20">{{ $t('announcements.a003')}}</option>
                <option value="30">{{ $t('announcements.a004')}}</option>
              </select>
              <div class="search clearfix">
                <input type="text" v-model="conts" :placeholder="$t('announcements.a006')">
                <div class="m-search-icon">
                  <button >
                    <img :src="require('@/images/img/sub/search.png')" @click="onSearch" alt="">
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="m-board-list">
          <table class="m-board-table">
            <tbody class="">
              <tr v-for="(item, index) in noticeData" :key="index" :class="{'notice-item':item.rownum === 0}">
                <td v-if="item.rownum === 0" class=""></td>
                <td v-if="item.rownum === 0" class="nt-tit" @click="onDetail(item.noticeMngNo, item.views)"><a><span :class="{'notice-point':item.rownum === 0}">{{item.subj}}</span></a></td>
                <td v-if="item.rownum === 0" class=""></td>
                <td v-if="item.rownum === 0" class=""></td>

                <!-- <td v-if="item.rownum === 1" class="nt-tit">{{item.noticeMngNo}}</td> -->
                <td v-if="item.rownum === 1" class="nt-tit" @click="onDetail(item.noticeMngNo, item.views)">{{item.subj}}</td>
                <td v-if="item.rownum === 1" class="td-left">{{item.regDt}}</td>
                <td v-if="item.rownum === 1" class="td-right">{{item.views}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="sPaging mo_style">
          <div class="sPagingWrap">
            <el-pagination layout="prev, pager, next" 
            :page-size="pageSize" 
            :total="total"
            :current-page.sync="currentPage" 
            @current-change="onPageChange">
          </el-pagination>
          </div>
      </div>
      <!--모바일 게시판 -->
    </div>
  </div>
</div>
</template>

<script>
import {promNoticeList, promNoticeViews} from '../../api/promotion.js'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      noticeData: [],
      options: [{
        value: '10',
        label: this.$t('announcements.a005')
      },{
        value: '20',
        label: this.$t('announcements.a003')
      },{
        value: '30',
        label: this.$t('announcements.a004')
      }],
      noticeOption: '10',
      conts: '',
      total: 1,
      pageSize: 10,
      currentPage: 1,
      langType: Cookies.get('Language-Type')
    }
  },

  created() {
    $(window).off('scroll')
   this.onSearch()
  },
  methods: {

    onSearch() {
      promNoticeList({
      conts: this.conts,
      langType: Cookies.get('Language-Type'),
      noticeOption: this.noticeOption,
      currentPage: this.currentPage,
      pageSize: this.pageSize
    })
      .then(res => {
        // this.noticeData = res.body
        this.total = res.totSize

        let currentMaxLow = this.currentPage * this.pageSize
        let currentMinLow = currentMaxLow - this.pageSize

        this.noticeData = res.body.slice(currentMinLow, currentMaxLow)
      })
      .catch(err => {
        console.log(err);
      })
      .finally(_ => {

      })
    },
    onDetail(no, views) {
      promNoticeViews({
        noticeMngNo: no,
        langType: Cookies.get('Language-Type')
      })
        .then(res => {
          this.$router.push({
          path: '/pmtNoticeDetail',
          query: {no:no}
          })
        })
        .catch(err => {

        })
      
    },

    onPageChange(val) {
      this.currentPage = val
      this.onSearch()
    }
  }
}
</script>

<style>

</style>
