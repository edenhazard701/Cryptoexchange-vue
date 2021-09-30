<template>
  <el-container class="TradeHistory">
    <div class="contents">
      <el-menu :default-active="activeMenuIndex()" class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item :route="{name: 'signHistory'}" index="1"><span>{{$t('order.a002')}}<!-- 체결내역 --></span></el-menu-item>
        <el-menu-item :route="{name: 'notSign'}" index="2"><span>{{$t('order.b001')}}<!-- 미체결 --></span></el-menu-item>
        <el-menu-item :route="{name: 'orderHistory'}" index="3"><span>{{$t('order.c001')}}<!-- 주문내역 --></span></el-menu-item>
        <el-menu-item :route="{name: 'watchHistory'}" index="4"><span>{{$t('order.d001')}}<!-- 감시내역 --></span></el-menu-item>
        <el-menu-item :route="{name: 'stockHistory'}" index="5"><span>{{$t('order.f001')}}<!-- 거래내역 --></span></el-menu-item>
      </el-menu>
      
      <!-- <transition name="fade" mode="out-in"> -->
      <router-view></router-view>
      <!-- </transition> -->
    </div>
  </el-container>
</template>

<script>
import SignHistory from './SignHistory.vue';
import NotSign from './NotSign.vue';
import OrderHistory from './OrderHistory.vue';
import WatchHistory from './WatchHistory.vue';
import StockHistory from './StockHistory.vue';

export default {
  comopoent: {
    SignHistory,
    NotSign,
    OrderHistory,
    WatchHistory,
    StockHistory
  },
  methods: {
    activeMenuIndex: function () {
      switch (this.$route.name) {
        case 'signHistory': return '1';
        case 'notSign' : return '2';
        case 'orderHistory' : return '3';
        case 'watchHistory' : return '4';
        case 'stockHistory' : return '5';
      }
    }
  }
};
</script>
