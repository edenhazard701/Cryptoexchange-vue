<template>
  <el-container class="KovexCoinIntroduce TdiIntroduce">
    <el-main class="tdi-introduce">
      <div class="top_txt">
        <h2 class="pageTitle">{{coinData.sName}} {{$t('mining.a002')}}<img :src="displayCoinImg(coinData.cur_cd)"></h2>
        <p>
          {{$t('mining.d002', [coinData.sName])}}<br>
          {{$t('mining.d003', [coinData.sName, coinData.sName])}}<br>
          {{$t('mining.d004')}}<br>
        </p>
      </div>

      <h3 class="sub-title">{{coinData.sName}}({{coinData.cur_cd}})</h3>
      <ul>
        <li class="dot"><span class="label-txt">{{$t('mining.d005')}} :</span> {{coinData.sName }} / {{coinData['cur_cd']}}</li>
        <li class="dot"><span class="label-txt">{{$t('mining.d006')}} :</span> {{$t('mining.d007')}}</li>
        <li class="dot"><span class="label-txt">{{$t('mining.d008')}} :</span> {{$t('mining.d010', [coinData['tot_qty']])}}</li>
        <li class="dot"><span class="label-txt">{{$t('mining.d009')}} :</span> {{$t('mining.d010', [miningAmmout(coinData['tot_minn_qty'])])}}</li>
        <li class="dot"><span class="label-txt">{{$t('mining.d011')}} :</span> {{$t('mining.d012')}}</li>
        <li class="dot"><span class="label-txt">{{$t('mining.d013')}} :</span> x</li>
      </ul>

      <div class="step_img_wrap">
        <div class="step_img">
          <el-row class="rate-distribution">
            <el-col class="rate-data">
              <h3>{{$t('mining.d014')}}</h3>
              <div class="table-wrap">
                <div class="label">{{$t('mining.d015')}}</div>
                <div class="value">
                  <span class="blue">{{coinData['minn_qty_rt']}}%</span>
                  <span class="etc-info">{{$t('mining.d016')}}</span>
                </div>
              </div>
              <div class="table-wrap">
                <div class="label">{{$t('mining.d017')}}</div>
                <div class="value"><span class="green">{{coinData['mrkt_qty_rt']}}%</span></div>
              </div>
              <div class="table-wrap">
                <div class="label">{{$t('mining.d018')}}</div>
                <div class="value"><span class="violet">{{coinData['team_qty_rt']}}%</span></div>
              </div>
            </el-col>
            <el-col class="rate-graph">
              <!-- 원형 그래프 -->
              <div class="chart">
                <PieGraph :data="rateData"></PieGraph>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="sub-info step_img_info">
          <ul>
            <li><span class="num-txt">1.</span> {{$t('mining.d019')}}</li>
            <li><span class="num-txt">2.</span> {{$t('mining.d020')}}</li>
            <li><span class="num-txt">3.</span> {{$t('mining.d021')}}</li>
            <li>{{$t('mining.d022')}}</li>
          </ul>
        </div>
      </div>
      <div class="smart_introduce_area">
        <h2 class="blue_tit">{{$t('mining.d023')}}</h2>
        <p>
          {{$t('mining.d024')}}<br>
          {{$t('mining.d025', [coinData.sName])}}
        </p>
        <el-row>
          <el-col class="label">{{$t('mining.d026')}}</el-col>
          <el-col class="cont">
            <ul>
              <li><span class="num-txt">1.</span> {{$t('mining.d027')}}</li>
              <li><span class="num-txt">2.</span> {{$t('mining.d028')}}</li>
              <li><span class="num-txt">3.</span> {{$t('mining.d029')}}</li>
              <li>{{$t('mining.d030')}}</li>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="label">{{$t('mining.d031')}}</el-col>
          <el-col class="cont">
            <ul>
              <li><span class="num-txt">1.</span> {{$t('mining.d032')}}</li>
              <li><span class="num-txt">2.</span> {{$t('mining.d033', [coinData.sName, coinData.sName])}}</li>
            </ul>
          </el-col>
        </el-row>
      </div>

      <div class="smart_introduce_area">
        <h2 class="blue_tit">{{$t('mining.d034')}}</h2>
        <p>{{$t('mining.d035', [coinData['fee_rt']])}}</p>
        <el-row>
          <el-col class="label">{{$t('mining.d036')}}</el-col>
          <el-col class="cont">
            <ul>
              <li><span class="num-txt">1.</span> {{$t('mining.d037', [coinData['fee_rt']])}}</li>
              <li><span class="num-txt">2.</span> {{$t('mining.d038')}}</li>
              <li><span class="num-txt">3.</span> {{$t('mining.d039')}}</li>
              <li><span class="num-txt">4.</span> {{$t('mining.d040')}}</li>
              <li>{{$t('mining.d041')}}</li>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="label">{{$t('mining.d042')}}</el-col>
          <el-col class="cont">
            <ul>
              <li>
                <span class="num-txt">1.</span>
                {{$t('mining.d043-1')}} <br>
                : {{$t('mining.d043-2')}} <br>
                : {{$t('mining.d043-3')}}
              </li>
              <li>
                <span class="num-txt">2.</span>
                {{$t('mining.d044-1')}} <br>
                : {{$t('mining.d044-2')}}
              </li>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="label">{{$t('mining.d045')}}</el-col>
          <el-col class="cont">
            <ul>
              <li>BTC, ETH, KRW</li>
              <li>{{$t('mining.d046')}}</li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import PieGraph from './PieGraph';
  import { mapGetters } from 'vuex'
  export default {
    components: {
      PieGraph
    },
    computed: {
      ...mapGetters(['getCoinByCd'])
    },
    data() {
      return {
        rateData: {},
        coinData: {}
      };
    },
    methods: {
      miningAmmout(obj) {
        /*
        데이터가 1조 이상
        : 조 + 억 단위로 표시

        2) 데이터가 1억 이상 1조 미만
        : 억 단위로 표시
        : 억 이하값 표시 X

        3) 데이터가 1억 미만
        : 전체 시가총액 표시  
        */
        var self = this;
        if (obj) {
          //const formatter = Intl.NumberFormat();
          if (obj > 99999999999) {
            var jo = String(obj).slice(0, -12);
            if (jo.length > 0) {
              jo = UnitManager.numberWithCommas(jo) + self.$t('main.b012'); //formatter.format(jo) + self.$t('main.b012')
            } else {
              jo = '';
            };
            obj = (obj % 1000000000000);
            var eok = (obj / 100000000).toFixed(0);
            return jo + ' ' + UnitManager.numberWithCommas(eok) + self.$t('main.b011'); //formatter.format(eok) + self.$t('main.b011');;
          } else if (obj > 99999999) {
            obj = (obj / 100000000).toFixed(0);
            return UnitManager.numberWithCommas(obj) + self.$t('main.b011'); //formatter.format(obj) + self.$t('main.b011');;
          } else {
            return UnitManager.numberWithCommas(obj) //formatter.format(obj);
          }
        }
        return obj;
      },
      /* 코인 이미지 표시 */
      displayCoinImg(symbol) {
        if (symbol == null) {
          return require("@/images/coin/default.png");
        }

        let coin = symbol.toLowerCase();
        let coinData = this.$store.state.data.coinImage;
        let coinURLArray = Object.values(coinData);
        let coinArrIdx = Object.keys(coinData).indexOf(coin);
        if (coinArrIdx < 0) {
          return require("@/images/coin/default.png");
        } else {
          return coinURLArray[coinArrIdx];
        }
      },
      requestCoinInfo() {
        var self = this;
        self.$socket.sendProcessByName('ac613', (queryData) => {
          let block = queryData.getBlockData('InBlock1')[0]
          block['cur_cd'] = null;
          // console.log('코인 조회 데이터 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', block);
        }, (queryData) => {
          if (!queryData) {
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName == "ac613") {
              self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: self.$t('sys_err.a001')
              });
            }
          } else {
            self.coinData = queryData['queryObj']['OutBlock1'][0];
            self.rateData = {
              labels: [self.$t('mining.d015'), self.$t('mining.d017'), self.$t('mining.d018')],
              datasets: [{
                label: [self.$t('mining.d015'), self.$t('mining.d017'), self.$t('mining.d018')],
                hoverBorderColor: ['#536dfe', '#ff8a80', '#ffc107'],
                hoverBackgroundColor: ['#536dfe', '#ff8a80', '#ffc107'],
                backgroundColor: ['#536dfe', '#ff8a80', '#ffc107'],
                data: [self.coinData.minn_qty_rt + '', self.coinData.mrkt_qty_rt + '', self.coinData.team_qty_rt + '']
              }]
            };

            //코인명
            if (self.$i18n.locale === 'en') {
              self.coinData.sName = self.getCoinByCd(self.coinData.cur_cd)['cur_eng_nm'];
            } else {
              self.coinData.sName = self.getCoinByCd(self.coinData.cur_cd)['cur_kor_nm'];
            }

            //수량 콤마
            self.coinData.tot_qty = UnitManager.numberWithCommas(self.coinData.tot_qty);
          }
        });
      }
    },
    created() {
      var self = this;
      self.$EventBus.$emit('pc-navi', [
        { label: self.$t('mining.a001'), target: 'kovexcoinintroduce' },
        { label: self.$t('mining.a002'), target: null }
      ]);

      //언어변경 발생시 처리
      self.$EventBus.$on('langChange', () => {
        //메뉴히스토리
        self.$EventBus.$emit('pc-navi', [
          { label: self.$t('mining.a001'), target: 'kovexcoinintroduce' },
          { label: self.$t('mining.a002'), target: null }
        ]);

        //그래프
        self.rateData = {
          labels: [self.$t('mining.d015'), self.$t('mining.d017'), self.$t('mining.d018')],
          datasets: [{
            label: [self.$t('mining.d015'), self.$t('mining.d017'), self.$t('mining.d018')],
            hoverBorderColor: ['#536dfe', '#ff8a80', '#ffc107'],
            hoverBackgroundColor: ['#536dfe', '#ff8a80', '#ffc107'],
            backgroundColor: ['#536dfe', '#ff8a80', '#ffc107'],
            data: [self.coinData.minn_qty_rt + '', self.coinData.mrkt_qty_rt + '', self.coinData.team_qty_rt + '']
          }]
        };

        //코인명
        if (self.$i18n.locale === 'en') {
          self.coinData.sName = self.getCoinByCd(self.coinData.cur_cd)['cur_eng_nm'];
        } else {
          self.coinData.sName = self.getCoinByCd(self.coinData.cur_cd)['cur_kor_nm'];
        }
      });
    },
    mounted() {
      var self = this;
      if (self.$store.getters.isSocketConnected) {
        self.requestCoinInfo();
      }
      self.$EventBus.$on('socketConnected', self.requestCoinInfo);
    },
    beforeDestroy() {
      var self = this;
      self.$EventBus.$off('socketConnected', self.requestCoinInfo);
    }
  };

</script>
