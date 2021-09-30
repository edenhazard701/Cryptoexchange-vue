<template>
  <div class="SignalMonitor">
    <h1 class="pageTitle">모니터링<!-- 모니터 --></h1>

    <el-table :data="history" empty-text="데이터가 없습니다.">
      
      <!-- 분석항목 -->
      <el-table-column prop="name" label="분석항목" align="center">
        <!-- <template slot-scope="scope">{{scope.row.name}}</template> -->
      </el-table-column>

      <!-- 전체 -->
      <el-table-column prop="all" label="전체" align="center">
        <!-- <template slot-scope="scope">{{scope.row.all}}</template> -->
      </el-table-column>

      <!-- 매수거래 -->
      <el-table-column prop="buy_data" label="매수거래" align="center">
        <!-- <template slot-scope="scope">{{scope.row.buy_data}}</template> -->
      </el-table-column>
      
      <!-- 매도거래 -->
      <el-table-column prop="sell_data" label="매도거래" align="center">
        <!-- <template slot-scope="scope">{{scope.row.sell_data}}</template> -->
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
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
    addComma(number) {  // 숫자 출력형식
      if ( number !== '') {
        var parts = number.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
      } else {
        return "-";
      }
    },
  },
  computed: {
  },
  methods: {
    /**
     * 모니터링 조회
     */
    fetchMonitor() {
      let self = this;
      self.$socket.sendProcessByName('sg004', null,
        function (queryData) {
          if (queryData !== null) {
            self.history = queryData.getBlockData('OutBlock2');
          }
          self.timer = setTimeout(self.fetchMonitor, 5000); // 자동 새로고침으로 설정된 경우 1분마다 새로고침
        });
    },
    loadStockDataCallback() { // loadStockData 이벤트 콜백 함수
        let self = this;
        if(self.dataLoaded) return;
        self.dataLoaded = true;
        self.fetchMonitor();
    },
    // 신규상장, 소켓재접속등 데이터 재조회 필요시 받는 event 
    // resetLoadStockData 이벤트가 먼저 실행되어 dataLoaded 값이 false로 변경
    // 재조회 가능 상태로 처리
    resetLoadStockDataCallback() { // resetLoadStockData 이벤트 콜백 함수
      let self = this;
      self.dataLoaded = false;
    },
  },
  created() {
    let self = this;

    //네비영역 이벤트 호출
    self.$EventBus.$emit("pc-navi", [
      { label: "스마트투자", target: "tdiList" },
      { label: "스마트 시그널", target: "signalInfo" },
      { label: "전략분석 모니터링", target: null }
    ]);
  },
  mounted() {
    let self = this;

    self.$EventBus.$on('loadStockData', self.loadStockDataCallback);
    self.$EventBus.$on('resetLoadStockData', self.resetLoadStockDataCallback);

    if(!self.dataLoaded){
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