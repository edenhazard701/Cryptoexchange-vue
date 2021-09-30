<template>
  <div class="StockPrice">
    <div class="scroll-area">
      <div class="el-table el-table--fit el-table--scrollable-x el-table--scrollable-y el-table--enable-row-hover el-table--enable-row-transition"
        style="height: 100%;">
        <!-- 기본 -->
        <div class="el-table__body-wrapper is-scrolling-right" style="height: 547px;">
          <el-scrollbar wrap-class="scrollbar-wrapper" :native="false" id="Asking30" class="price-table">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
              <colgroup>
                <col name="el-table_1_column_1" style="width:100%;">
              </colgroup>
              <tbody>
                <!-- 매도 호가 -->
                <tr v-if="getCurrentData !== undefined" v-for="item in sellAsking30" @click="didClickHoga(item.ask)"
                  :key="item.value" class="el-table__row">
                  <td>
                    <div class="cell lft-data">
                      <div class="data-cell">
                        <span v-show="item.ask != 0" :class="item.colorState">
                          <!-- <span v-if="item.colorStateBS == 'purple'" class='arrow' :class="item.searchNotSignTp!='1'?'red':'blue'">▶</span> -->
                          <span class='arrow' :class="item.arrowColor">{{item.arrowColor?'▶':''}}</span>
							            <span :style="{ fontSize: hogaFontSize + 'px'}">{{item.askStr}}</span>	
                        </span>
                        <br>
                        <span v-show="item.ask != 0" class="under-data">{{item.updownRateStr}}</span>
                      </div>
                    </div>
                    <div class="cell rgt-data">
                      <div v-show="item.ask != 0" class="amount" :style="{ fontSize: amountFontSize + 'px'}">
                        <span>{{item.askrest}}</span>
                      </div>
                    </div>
                    <!-- 그래프 표시 -->
					          <span v-if="item.compqtyYN" class="change"></span>
                    <span class="graph-bx">
                      <span class="graph blue" :style="{width: item.askrestWidth+ '%'}"></span>
                    </span>
                    <!-- //그래프 표시 -->
                  </td>                  
                </tr>
                <!-- 체결가 -->
                <tr @click="didClickHoga(getCurrentData['curprc'])">
                  <td class="el-table_1_column_1 conclusion_td">
                    <div class="cell" :class="bdColor">
                      <div class="conclusion_info">
                        <span class="bArrow red" v-if="bArrowRed">▲</span>
                        <span class="bArrow blue" v-if="bArrowBlue">▼</span>
                        <span :class="curColor" class="bold_txt">
                          {{getCurrentData['curprc'] | prcFilter}}
                          <span class="unit">{{getCurrentData['paycurrcode']}}</span>
                        </span>
                        <span v-if="getCurrentData['paycurrcode'] == 'BTC'" class="krw_txt">≈{{(getCurrentData['curprc'] * currentBtcKrPrice) | krPriceFilter}} KRW</span>
                      	<span v-if="getCurrentData['paycurrcode'] == 'ETH'" class="krw_txt">≈{{(getCurrentData['curprc'] * currentEthKrPrice) | krPriceFilter}} KRW</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <!-- 매수 호가 -->
                <tr v-for="item in buyBiding30" :key="item.value" @click="didClickHoga(item.bid)" class="el-table__row">
                  <td>
                    <div class="cell lft-data">
                      <div class="data-cell">
                        <span v-show="item.bid != 0" :class="item.colorState">
                          <!-- <span v-if="item.colorStateBS == 'purple'" class='arrow' :class="item.searchNotSignTp!='1'?'red':'blue'">▶</span> -->
                          <span class='arrow' :class="item.arrowColor">{{item.arrowColor?'▶':''}}</span>
                        	<span :style="{ fontSize: hogaFontSize + 'px'}">{{item.bidStr}}</span>
                        </span>
                        <br>
                        <span v-show="item.bid != 0" class="under-data">{{item.updownRateStr}}</span>
                      </div>
                    </div>
                    <div class="cell rgt-data">
                      <div v-show="item.bid != 0" class="amount" :style="{ fontSize: amountFontSize + 'px'}">
                        <span>{{item.bidrest}}</span>
                      </div>                      
                    </div>
                    <!-- 그래프 표시 -->
                    <span  v-if="item.compqtyYN" class="change"></span>
                    <span class="graph-bx">
                      <span class="graph red" :style="{width: item.bidrestWidth+ '%'}"></span>
                    </span>
                  </td>                 
                </tr>
              </tbody>
            </table>
            <!-- </div> -->
          </el-scrollbar>
        <div class="el-table__column-resize-proxy" style="display: none;">
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>  
  import StockPrice from '../../exchanges/StockPrice.vue';

  export default {
    extends : StockPrice,
    data() {
      return {
        curColorCell: '',
      };
    },
    methods: {
      // 모바일용 함수 src\views\mobile\order\StockPrice.vue 에서 사용됨
      setHogaFontSize(length){  // 텍스트 크기 조절
        if(length < 12 ) {
          this.hogaFontSize = 13;
        } else {
          this.hogaFontSize = 11;
        }
      },
      setAmountFontSize(length) { // 텍스트 크기 조절
        if (length <= 12) {
          this.amountFontSize = 13;
        } else if (length <= 14) {
          this.amountFontSize = 11;
        } else {
          this.amountFontSize = 10;
        }
      },
    },
  };
  
</script>