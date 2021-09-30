<template>
  <div class="SignalMonitor">
    <h1 class="pageTitle">모니터링<!-- 모니터 --></h1>

    <el-table :data="history" empty-text="데이터가 없습니다.">
      
      <!-- 전문가코드 -->
      <el-table-column prop="expt_rgst_no" label="전문가명" align="center" width="150" fixed>
        <template slot-scope="scope">{{scope.row.expt_rgst_no}}</template>
      </el-table-column>

      <!-- 전략키 -->
      <el-table-column prop="expt_strtg_key" label="전략명" align="center" width="150" fixed>
        <!-- <template slot-scope="scope">{{scope.row.expt_strtg_key}}</template> -->
      </el-table-column>

      <!-- 종목코드 -->
      <el-table-column prop="symbol" label="종목명" align="center" width="150" fixed>
        <template slot-scope="scope">{{toSymbolName(scope.row.symbol)}}</template>
      </el-table-column>
      
      <!-- 실행일시 -->
      <el-table-column prop="rundt" label="실행일시" align="center" width="150">
        <template slot-scope="scope">{{scope.row.rundt | toMoment}}</template>
      </el-table-column>

      <!-- 시작일시 -->
      <el-table-column prop="startdt" label="시작일시" align="center" width="150">
        <template slot-scope="scope">{{scope.row.startdt | toMoment}}</template>
      </el-table-column>

      <!-- 이전종료일시 -->
      <el-table-column prop="enddt" label="이전종료일시" align="center" width="150">
        <template slot-scope="scope">{{scope.row.enddt | toMoment}}</template>
      </el-table-column>

      <!-- 프로세스ID -->
      <el-table-column prop="pid" label="프로세스ID" align="center" width="90">
        <template slot-scope="scope">{{scope.row.pid}}</template>
      </el-table-column>

      <!-- 종료코드 -->
      <el-table-column prop="exitno" label="종료코드" align="center">
        <template slot-scope="scope">{{scope.row.exitno}}</template>
      </el-table-column>

      <!-- 시그널코드 -->
      <el-table-column prop="signo" label="시그널코드" align="center" width="90">
        <template slot-scope="scope">{{scope.row.signo}}</template>
      </el-table-column>

      <!-- 재실행횟수 -->
      <el-table-column prop="rcnt" label="재실행횟수" align="center" width="90">
        <template slot-scope="scope">{{scope.row.rcnt}}</template>
      </el-table-column>

      <!-- 주기 -->
      <el-table-column prop="cycunit" label="주기" align="center">
        <template slot-scope="scope">{{scope.row.cycunit}}</template>
      </el-table-column>

      <!-- N봉 -->
      <el-table-column prop="cyc" label="N봉" align="center">
        <template slot-scope="scope">{{scope.row.cyc}}</template>
      </el-table-column>

      <!-- 봉수 -->
      <el-table-column prop="cyccnt" label="봉수" align="center">
        <template slot-scope="scope">{{scope.row.cyccnt}}</template>
      </el-table-column>

      <!-- 마지막봉일시 -->
      <el-table-column prop="cyclastdt" label="마지막봉일시" align="center" width="150">
        <template slot-scope="scope">{{scope.row.cyclastdt | toMoment}}</template>
      </el-table-column>

      <!-- 마지막봉가격 -->
      <el-table-column prop="cycprc" label="마지막봉가격" align="center" width="100">
        <template slot-scope="scope">{{scope.row.cycprc | addComma}}</template>
      </el-table-column>

      <!-- 시세일시 -->
      <el-table-column prop="execdt" label="시세일시" align="center" width="150">
        <template slot-scope="scope">{{scope.row.execdt | toMoment}}</template>
      </el-table-column>

      <!-- 시세가격 -->
      <el-table-column prop="execprc" label="시세가격" align="center" width="100">
        <template slot-scope="scope">{{scope.row.execprc | addComma}}</template>
      </el-table-column>

      <!-- 시세금액 -->
      <el-table-column prop="execval" label="시세금액" align="center" width="100">
        <template slot-scope="scope">{{scope.row.execval | addComma}}</template>
      </el-table-column>

      <!-- 신호일시 -->
      <el-table-column prop="sigdt" label="신호일시" align="center" width="150">
        <template slot-scope="scope">{{scope.row.sigdt | toMoment}}</template>
      </el-table-column>
      
      <!-- 매수가 -->
      <el-table-column prop="sigbuy" label="매수가" align="center" width="100">
        <template slot-scope="scope">{{scope.row.sigbuy | addComma}}</template>
      </el-table-column>

      <!-- 매도가 -->
      <el-table-column prop="sigsell" label="매도가" align="center" width="100">
        <template slot-scope="scope">{{scope.row.sigsell | addComma}}</template>
      </el-table-column>
      
      <!-- 목표가 -->
      <el-table-column prop="sigtarg" label="목표가" align="center" width="100">
        <template slot-scope="scope">{{scope.row.sigtarg | addComma}}</template>
      </el-table-column>

      <!-- 손절가 -->
      <el-table-column prop="sigsale" label="손절가" align="center" width="100">
        <template slot-scope="scope">{{scope.row.sigsale | addComma}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import { _ } from "vue-underscore";
import { setTimeout, clearTimeout } from 'timers';

export default {
  data() {
    return {
      /**
       * @property {array} history 모니터링 목록
       */
      history: [],
      dataLoaded: false,
      timer: null,
    };
  },
  filters: {
    /**
     * 날짜 포맷
     * @param   {string} dt 날짜 20190101120000
     * @returns {string} 날짜 2019.01.01 12:00:00
     */
    toMoment(dt) {
      if (dt.length < 14) {
        return "-";
      } else {
        let toFormat = moment(dt.substr(0, 8) + "T" + dt.substr(8, 6));
        if (toFormat.isValid()) {
          return toFormat.format("YYYY.MM.DD HH:mm:ss");
        } else {
          return "-";
        }
      }
    },
    addComma(number) {  // 숫자 출력형식
      if (number !== '') {
        var parts = number.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
      } else {
        return "-";
      }
    },
  },
  computed: {
    ...mapState({
      nameList: state => state.data['n1001'],
    }),
  },
  methods: {
    /**
     * 모니터링 조회
     */
    fetchMonitor() {
      let self = this;
      self.$socket.sendProcessByName('sg003', null,
        function (queryData) {
          if (queryData !== null) {
            self.history = queryData.getBlockData('OutBlock2');
          }
          self.timer = setTimeout(self.fetchMonitor, 5000); // 자동 새로고침으로 설정된 경우 1분마다 새로고침
        });
    },
    loadStockDataCallback(){ // loadStockData 이벤트 콜백 함수
        let self = this;
        if(self.dataLoaded) return;
        self.dataLoaded = true;
        self.fetchMonitor();
    },
    // 신규상장, 소켓재접속등 데이터 재조회 필요시 받는 event 
    // resetLoadStockData 이벤트가 먼저 실행되어 dataLoaded 값이 false로 변경
    // 재조회 가능 상태로 처리
    resetLoadStockDataCallback(){ // resetLoadStockData 이벤트 콜백 함수
      let self = this;
      self.dataLoaded = false;
    },
    //종목명 찾기
    toSymbolName(symbol) {
      let self = this;
      let obj = _.findWhere(self.nameList, {o_symbol : symbol});
      return obj['o_inst_kor_abbr'];
    }
  },
  created() {
    let self = this;

    //네비영역 이벤트 호출
    self.$EventBus.$emit("pc-navi", [
      { label: "스마트투자", target: "tdiList" },
      { label: "스마트 시그널", target: "signalInfo" },
      { label: "서버버전 모니터링", target: null }
    ]);
  },
  mounted() {
    let self = this;

    self.$EventBus.$on('loadStockData', self.loadStockDataCallback);
    self.$EventBus.$on('resetLoadStockData', self.resetLoadStockDataCallback);

    if(self.nameList.length > 0 && !self.dataLoaded){
      self.$EventBus.$emit('loadStockData');
    }
  },
  beforeDestroy() {
    let self = this;
    self.$EventBus.$off('loadStockData', self.loadStockDataCallback);
    self.$EventBus.$off('resetLoadStockData', self.resetLoadStockDataCallback);
    clearTimeout(self.timer);
  }
};
</script>