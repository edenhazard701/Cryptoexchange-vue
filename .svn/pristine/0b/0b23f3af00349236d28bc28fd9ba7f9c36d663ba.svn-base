<template>
  <el-container class="FooterVue">
    <div class="footer-menu">
      <el-row class="footer">
        <el-col>
          <el-menu index="1" :router="true" @select="menuClicked">
            <el-menu-item-group>
              <template slot="title">{{$t('main.h001')}}<!-- 거래소 --></template>
              <el-menu-item index="1-1" :route="{name:'exchange'}">{{$t('main.h002')}}<!-- 일반 --></el-menu-item>
              <el-menu-item index=""><router-link to="/fullexchange" target="_blank">{{$t('main.h003')}}<!-- 풀스크린 --></router-link></el-menu-item>
              <el-menu-item index="1-2" :route="{name:'signHistory'}">{{$t('main.h004')}}<!-- 거래내역 --></el-menu-item>
            </el-menu-item-group>
          </el-menu>
        </el-col>
        <el-col>
          <el-menu index="2" :router="true" @select="menuClicked">
            <el-menu-item-group>
              <template slot="title">{{$t('main.h005')}}<!-- 자산 --></template>
              <el-menu-item index="2-1" :route="{name:'assetProfit'}">{{$t('main.h006')}}<!-- 투자손익 --></el-menu-item>
              <el-menu-item index="2-2" :route="{name:'assetStatus'}">{{$t('main.h007')}}<!-- 자산현황 --></el-menu-item>
            </el-menu-item-group>
          </el-menu>
        </el-col>
        <el-col>
          <el-menu index="3" :router="true" @select="menuClicked">
            <el-menu-item-group>
              <template slot="title">{{$t('main.h008')}}<!-- 입출금 --></template>
              <el-menu-item index="3-1" :route="{name:'depositWithdraw'}">{{$t('main.h009')}}<!-- 입출금 --></el-menu-item>
              <el-menu-item index="3-2" :route="{name:'bankHistory'}">{{$t('main.h010')}}<!-- 입출금내역 --></el-menu-item>
            </el-menu-item-group>
          </el-menu>
        </el-col>
        <el-col>
          <el-menu index="4" :router="true" @select="menuClicked">
            <el-menu-item-group>
              <template slot="title"><router-link :to="{name:'screener'}">{{$t('main.h014')}}<!-- 스크리너 --></router-link></template>
            </el-menu-item-group>
          </el-menu>
        </el-col>
        <el-col>
          <router-link to="/" target="_blank" class="twitter">twiter</router-link>
          <router-link to="/" target="_blank" class="instagram">instagram</router-link>
          <router-link to="/" target="_blank" class="facebook">facebook</router-link>
        </el-col>
      </el-row>
    </div>
    <div class="footer-cont">
      <el-row class="footer">
        <el-col>
          <div class="footer-logo">UNIVAX</div>
          <div class="footer-text">
            <h2>{{$t('main.e001')}}<!-- 코벡스(주) --></h2>
            {{$t('main.e002')}}<!-- 서울시 영등포구 여의대방로69길 23, 한국금융IT빌딩 8층 --><br>
            {{$t('main.e003')}} <!-- 대표 : <span class="label">김현섭</span> -->
            {{$t('main.e004')}}<!-- 사업자등록번호 : <span class="label">344-88-00854</span> -->
          </div>
          <span class="copyright">Copyrightⓒ2018 KOVEX All rights reserved.</span>
        </el-col>
        <el-col>
          <el-menu index="1" :router="true" @select="menuClicked">
            <el-menu-item-group>
              <template slot="title">{{$t('main.e005')}}<!-- 회사 --></template>
              <!--el-menu-item index="1-1">회사소개</el-menu-item-->
              <el-menu-item index="1-2" :route="{name:'csNotice'}">{{$t('main.e006')}}<!-- 공지사항 --></el-menu-item>
              <!-- <el-menu-item index="1-3" :route="{name:'tdiList'}">{{$t('main.e007')}}</el-menu-item> -->
            </el-menu-item-group>
          </el-menu>
        </el-col>
        <el-col>
          <el-menu index="2" :router="true" @select="menuClicked">
            <el-menu-item-group>
              <template slot="title">{{$t('main.e008')}}<!-- 고객지원 --></template>
              <el-menu-item index="2-1" :route="{name:'csFaq'}">{{$t('main.e009')}}<!-- FAQ --></el-menu-item>
              <el-menu-item index="2-2" :route="{name:'csPolicy'}">{{$t('main.e010')}}<!-- 수수료정책 --></el-menu-item>
              <el-menu-item index="2-3" :route="{name:'csPolicy', params:{tabIndex: '0'}}" @click="selectedIndex('0')">{{$t('main.e011')}}<!-- 이용약관 --></el-menu-item>
              <el-menu-item index="2-4" :route="{name:'csPolicy', params:{tabIndex: '1'}}" @click="selectedIndex('1')">{{$t('main.e012')}}<!-- 개인정보처리방침 --></el-menu-item>
              <el-menu-item index="2-5" :route="{name:'csQna'}">{{$t('main.e013')}}<!-- 1:1 문의 --></el-menu-item>
            </el-menu-item-group>
          </el-menu>
        </el-col>
        <el-col>
          <el-menu index="3" :router="true">
            <el-menu-item-group>
              <template slot="title">{{$t('main.e014')}}</template><!-- 문의/상담 -->
              <el-menu-item index="3-1" :route="{name:'csNotice'}">{{$t('main.e015')}}</el-menu-item><!-- 고객센터: 02-3775-3608 -->
              <el-menu-item><a href="http://pf.kakao.com/_PdmGj/chat" target="_blank">{{$t('main.e016')}}</a></el-menu-item><!-- 카카오톡 문의(24시간) -->
              <el-menu-item>{{$t('main.e017')}}</el-menu-item><!--  이메일: support@kovex.co.kr -->
            </el-menu-item-group>
          </el-menu>
        </el-col>
        <el-col>
          <el-select v-model="site" placeholder="FAMILY SITE" :no-data-text="$t('main.h019')">
            <el-option v-for="item in familysite" :key="item.site" :label="item.name" :value="item.site"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      familysite: [
        { site: '', name: '한국금융IT' },
        { site: '', name: '아이낸스' },
      ],
      site: ''
    };
  },
  methods: {
    menuClicked (e){
      $('html').scrollTop(0);
    },
    selectedIndex(idx) {
      let self = this;
      if (self.$store.state.nowPage === '/customers/policy') {
        self.$EventBus.$emit('tabIndex', idx);
      }
    }
  }
}
</script>
