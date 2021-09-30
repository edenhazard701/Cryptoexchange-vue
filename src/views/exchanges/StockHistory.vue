<template>
  <div class="StockHistory">
    <div class="search">
      <el-row>
        <el-col class="srch-part">
          <el-select v-model="trd_tp" :placeholder="$t('order.d010')"><!-- 구분 -->
            <el-option value="0" label="전체"></el-option>
            <el-option value="1" label="매수"></el-option>
            <el-option value="2" label="매도"></el-option>
            <el-option value="3" label="입금"></el-option>
            <el-option value="4" label="출금"></el-option>
          </el-select>
        </el-col>
        <el-col class="srch-start"><el-date-picker v-model="fr_dt" placeholder="시작일"></el-date-picker></el-col>
        <el-col class="srch-dash">~</el-col>
        <el-col class="srch-end"><el-date-picker v-model="to_dt" placeholder="종료일"></el-date-picker></el-col>
        <el-col class="srch-period">
          <el-select v-model="period" placeholder="선택">
            <el-option label="당일" value="1"></el-option>
            <el-option label="1주일" value="7"></el-option>
            <el-option label="1개월" value="30"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="srch-label">통화:</el-col>
        <el-col class="srch-sort">
          <el-autocomplete v-model="cur_cd" :fetch-suggestions="querySearch" placeholder="통화 입력"></el-autocomplete>
        </el-col>
        <el-col class="srch-btn">
          <el-button type="primary" @click="getStockHistory">{{ $t('order.e003') }}<!-- 조회 --></el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" height="600" empty-text="거래내역이 없습니다." stripe><!-- 거래내역이 없습니다. -->
        <el-table-column label="일시" align="center" width="90" fixed>
          <template slot-scope="scope">{{ scope.row.trd_dt + scope.row.trd_tm | dateFormat }}</template>
        </el-table-column>
        <el-table-column label="통화" align="center" width="90" fixed>
          <template slot-scope="scope">{{ scope.row.cur_cd }}</template>
        </el-table-column>
        <el-table-column label="구분" align="center" width="60" fixed>
          <template slot-scope="scope">{{ scope.row.biz_detl_tp | bizFormat }}</template>
        </el-table-column>
        <el-table-column label="주문번호" align="center" width="70" fixed>
          <template slot-scope="scope">{{ scope.row.ord_no }}</template>
        </el-table-column>
        <el-table-column label="거래수량" align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.trd_qty!=0" >{{ scope.row.trd_qty | numberFormat }}<br>{{ scope.row.cur_cd }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="거래단가" align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.trd_prc!=0" >{{ scope.row.trd_prc | numberFormat }}<br>KRW</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="거래금액" align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.trd_amt!=0" >{{ scope.row.trd_amt | numberFormat }}<br>KRW</span>
            <span v-else>-</span>
          </template>
        </el-table-column> -->
        <el-table-column label="원화환산거래금액" align="right" min-width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.krw_prc_trd_amt!=0" >{{ scope.row.krw_prc_trd_amt | numberFormat }}<br>KRW</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="원화평가금액" align="right" min-width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.krw_evlt_amt!=0" >{{ scope.row.krw_evlt_amt | numberFormat }}<br>KRW</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="원화환산매도장부금액" align="right" min-width="140">
          <template slot-scope="scope">
            <span v-if="scope.row.krw_prc_sell_book_amt!=0" >{{ scope.row.krw_prc_sell_book_amt | numberFormat }}<br>KRW</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="원화환산손익" align="right" min-width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.krw_prc_pl!=0" >{{ scope.row.krw_prc_pl | numberFormat }}<br>KRW</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="전통화잔고" align="right" min-width="140">
          <template slot-scope="scope">
            <span v-if="scope.row.bf_cur_bal!=0" >{{ scope.row.bf_cur_bal | numberFormat }}<br>{{ scope.row.cur_cd }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="전KRW기준매입금액" align="right" min-width="130">
          <template slot-scope="scope">
            <span v-if="scope.row.bf_krw_buy_pamt!=0" >{{ scope.row.bf_krw_buy_pamt | numberFormat }}<br>KRW</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="전여분통화잔고" align="right" min-width="110">
          <template slot-scope="scope">
            <span v-if="scope.row.bf_extr_cur_bal!=0" >{{ scope.row.bf_extr_cur_bal | numberFormat }}<br>{{ scope.row.cur_cd }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="후통화잔고" align="right" min-width="140">
          <template slot-scope="scope">
            <span v-if="scope.row.af_cur_bal!=0" >{{ scope.row.af_cur_bal | numberFormat }}<br>{{ scope.row.cur_cd }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="후KRW기준매입금액" align="right" min-width="130">
          <template slot-scope="scope">
            <span v-if="scope.row.af_krw_buy_pamt!=0" >{{ scope.row.af_krw_buy_pamt | numberFormat }}<br>KRW</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="후여분통화잔고" align="right" min-width="110">
          <template slot-scope="scope">
            <span v-if="scope.row.af_extr_cur_bal!=0" >{{ scope.row.af_extr_cur_bal | numberFormat }}<br>{{ scope.row.cur_cd }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="대상통화KRW매매수수료" align="right" min-width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.trgt_krw_buy_fee!=0" >{{ scope.row.trgt_krw_buy_fee | numberFormat }}<br>KRW</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="결제통화KRW매수수수료" align="right" min-width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.setl_krw_buy_fee!=0" >{{ scope.row.setl_krw_buy_fee | numberFormat }}<br>KRW</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="출금수수료" align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.widr_fee!=0" >{{ scope.row.widr_fee | numberFormat }}<br>{{ scope.row.cur_cd }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="출금네트워크수수료" align="right" min-width="130">
          <template slot-scope="scope">
            <span v-if="scope.row.widr_fee_amt!=0" >{{ scope.row.widr_fee_amt | numberFormat }}<br>{{ scope.row.cur_cd }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="KRW기준매입수수료" align="right" min-width="130">
          <template slot-scope="scope">
            <span v-if="scope.row.krw_buy_fee!=0" >{{ scope.row.krw_buy_fee | numberFormat }}<br>KRW</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import fromExponential from 'from-exponential';
import moment from 'moment';
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      trd_tp: '0',
      
      fr_dt: moment().subtract(1, 'weeks').subtract(-1, 'days'),
      to_dt: moment(),
      period: '7',
      
      cur_cd: '',

      coins: [],
      tableData: [],
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getUserId', 'getCoinByCd', 'hogaUnit']),
  },
  watch: {
    period() {
      const self = this;
      self.calcPeriod();
    }
  },
  filters: {
    /* 주문일시 yyyy-mm-dd hh:mm:ss  */
    dateFormat(ord_dtm) {
      if (!ord_dtm) return '';
      return moment(ord_dtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss');
    },
    bizFormat(val) {
      if (val) {
        if (val == '1') {
          return "매도";
        } else if (val == '2') {
          return "매수";
        } else if (val == '3') {
          return "입금";
        } else if (val == '4') {
          return "출금";
        } else {
          return val;
        }
      } else {
        return "";
      }
    },
    numberFormat(val) {
      if (val && val != '') {
        // val = Number(val);
        val = val.toString();
        var strArr = val.split('.');
        var num = strArr[0]?strArr[0]:'';
        var dec = strArr[1]?strArr[1]:'';
        num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (dec) {
          return num + "." + dec;
        } else {
          return num;
        }
      } else {
        return '0';
      }
    }
  },
  methods: {
    calcPeriod() {
      const self = this;
      self.to_dt = moment();
      if (self.period == '7') {
        self.fr_dt = moment().subtract(1, 'weeks').subtract(-1, 'days');
      } else if (self.period == '30') {
        self.fr_dt = moment().subtract(1, 'months').subtract(-1, 'days');
      } else {
        self.fr_dt = self.to_dt;
      }
    },
    querySearch(queryString, cb) {
      const self = this;
      var coins = self.coins;
      var results = queryString ? coins.filter(self.createFilter(queryString)) : coins;
      cb(results);
    },
    createFilter(queryString) {
      return (coin) => {
        return (coin.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    getStockHistory(searchOldParam) {
      const self = this;
      self.$socket.sendProcessByName('ea429', function (queryData) {
        var block = queryData.getBlockData('InBlock1')[0];
        block['trd_tp'] = self.trd_tp;
        block['fr_dt'] = moment(self.fr_dt).format('YYYYMMDD');
        block['to_dt'] = moment(self.to_dt).format('YYYYMMDD');
        block['cur_cd'] = self.cur_cd;
        block['req_cnt'] = 100;
        console.log(block);
      }, function (queryData) {
        if (queryData != null) {
          self.tableData = queryData['queryObj']['OutBlock2'];
          console.log(self.tableData);
        } else {
          const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
          if (errorData.trName != "ea429") return
          self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: self.$t('sys_err.a001')
          });
        }
      });
    },
    /**
     * 검색범위 유효성 체크
     */
    searchValidChk() {
      // 기간 조회 범위 : 최대 90일
      if ( (this.toDt.getTime() - this.frDt.getTime()) > (1000*60*60*24*90) ) {
        alert("조회 범위는 최대 90일까지 가능합니다.");
        return false;
      }

      // 조회일 기준 1년전 데이터까지만 조회가능
      if ( (Date.now() - this.frDt.getTime()) > (1000*60*60*24*365)) {
        alert("체결내역은 최대 1년까지 조회 가능합니다.");
        return false;
      }

      return true;
    },
    /* 글자 size 조절 */
    chkLength(val) {
        if (val == undefined) return;
        if (val.length > 15) {
            return 'fs15';
        }
    },
    setCoins() {
      const self = this;
			let sear_tp = '2'; //보유코인 체크시 1  , 체크해제시 2
      let payload = { sear_tp : sear_tp, sear_key : '' }  //자산리스트 조회 변수 매핑
      
			//보유자산 리스트 조회
			self.$store.dispatch('selectMyAssetStatusData', payload).then((data) => {
        data.queryObj.OutBlock2.forEach(item => {
          self.coins.push( {value: item.cur_cd, coin: item.cur_cd})
        });;
			});
    },
    getData() {
      const self = this;
      self.setCoins();
      self.getStockHistory();
    }
  },
  created() {
    const self = this;
    if (!self.isLoggedIn) {
      alert("로그인 후 사용 가능합니다.");
      self.$router.push({ name: 'login' });
    };
  },
  mounted() {
    const self = this;
    self.$EventBus.$emit('pc-navi', [
      { label: self.$t('header.exchange'), target: 'exchange'},
      { label: self.$t('order.a001'), target: 'signHistory' },
      { label: '거래내역', target: null }
    ]);

    self.getData();
  },
};
</script>

<style>
.StockHistory .el-table {
  background: #fff !important;
}
.StockHistory .el-table tr {
  background: #fff !important;
}
.StockHistory .el-table th {
  background: #fff !important;
}
.StockHistory .el-table td {
  background: #fff !important;
}
</style>