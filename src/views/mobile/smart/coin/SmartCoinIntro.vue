<template>
  <div class="SmartCoinIntro">
    <div class="header">
      <h1 class="title"><span class="symbol"><img :src="displayCoinImg(coinData.cur_cd)">
        </span>{{coinData.sName}}</h1>
      <div class="cont">
        <p>{{$t('mining.d002', [coinData.sName])}}</p>
        <p>{{$t('mining.d003', [coinData.sName, coinData.sName])}}</p>
        <p>{{$t('mining.d004')}}</p>
      </div>
    </div>
    <div class="detail">
      <div class="top_list_wrap">
        <ul class="smart_list">
          <li class="dot">{{$t('mining.d005')}}: {{coinData.sName }} / {{coinData['cur_cd']}}</li>
          <li class="dot">{{$t('mining.d006')}}: {{$t('mining.d007')}}</li>
          <li class="dot">{{$t('mining.d008')}}: {{$t('mining.d010', [coinData['tot_qty']])}}</li>
          <li class="dot">{{$t('mining.d009')}}: {{$t('mining.d010', [miningAmmout(coinData['tot_minn_qty'])])}}</li>
          <li class="dot">{{$t('mining.d011')}}: {{$t('mining.d012')}}</li>
          <li class="dot">{{$t('mining.d013')}}: x</li>
        </ul>
      </div>
      <div class="graph_wrap">
        <div class="graph">
          <h2 class="bullet-tit-type01">{{$t('mining.d014')}}</h2>
          <DoughnutGraph :data="rateData"></DoughnutGraph>
        </div>
        <table class="tbody_table_sy">
          <colgroup>
            <col style="width:35%;">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">{{$t('mining.d015')}}</th>
              <td class="color01">{{coinData['minn_qty_rt']}}% {{$t('mining.d016')}}</td>
            </tr>
            <tr>
              <th scope="row">{{$t('mining.d017')}}</th>
              <td class="color02">{{coinData['mrkt_qty_rt']}}%</td>
            </tr>
            <tr>
              <th scope="row">{{$t('mining.d018')}}</th>
              <td class="color03">{{coinData['team_qty_rt']}}%</td>
            </tr>
          </tbody>
        </table>
        <ul class="smart_list">
          <li class="dot">{{$t('mining.d019')}}</li>
          <li class="dot">{{$t('mining.d020')}}</li>
          <li class="dot">{{$t('mining.d021')}}</li>
        </ul>
        <p class="caution">{{$t('mining.d022')}}</p>
      </div>
      <div class="smart_introduce_area">
        <h3 class="blue_tit">{{$t('mining.d023')}}</h3>
        <p>{{$t('mining.d024')}}<br>{{$t('mining.d025', [coinData.sName])}}</p>
        <h4 class="parenthesis_tit">&lt;{{$t('mining.d026')}}&gt;</h4>
        <ul class="smart_list">
          <li class="dot">{{$t('mining.d027')}}</li>
          <li class="dot">{{$t('mining.d028')}}</li>
          <li class="dot">{{$t('mining.d029')}}</li>
        </ul>
        <p class="caution">{{$t('mining.d030')}}</p>
        <h4 class="parenthesis_tit">&lt;{{$t('mining.d031')}}&gt;</h4>
        <ul class="smart_list">
          <li class="dot">{{$t('mining.d032')}}</li>
          <li class="dot">{{$t('mining.d033', [coinData.sName, coinData.sName])}}</li>
        </ul>
      </div>
      <div class="smart_introduce_area">
        <h3 class="blue_tit">{{$t('mining.d034')}}</h3>
        <p>{{$t('mining.d035', [coinData['fee_rt']])}}</p>
        <h4 class="parenthesis_tit">&lt;{{$t('mining.d036')}}&gt;</h4>
        <ul class="smart_list">
          <li class="dot">{{$t('mining.d037', [coinData['fee_rt']])}}</li>
          <li class="dot">{{$t('mining.d038')}}</li>
          <li class="dot">{{$t('mining.d039')}}</li>
          <li class="dot">{{$t('mining.d040')}}</li>
        </ul>
        <p class="caution">{{$t('mining.d041')}}</p>
        <h4 class="parenthesis_tit">&lt;{{$t('mining.d042')}}&gt;</h4>
        <ul class="smart_list">
          <li class="dot">{{$t('mining.d043-1')}}<br>: {{$t('mining.d043-2')}}<br>: {{$t('mining.d043-3')}}</li>
          <li class="dot">{{$t('mining.d044-1')}}<br>: {{$t('mining.d044-2')}}</li>
        </ul>
        <h4 class="parenthesis_tit">&lt;{{$t('mining.d045')}}&gt;</h4>
        <ul class="smart_list">
          <li class="dot">BTC, ETH, KRW</li>
        </ul>
        <p class="caution">{{$t('mining.d046')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import DoughnutGraph from './DoughnutGraph';
  import { mapGetters } from 'vuex'
  export default {
    components: {
      DoughnutGraph
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
          return require('@/images/coin/default.png');
        } else {
          return coinURLArray[coinArrIdx];
        }
      },
      requestCoinInfo() {
        var self = this;
        self.$socket.sendProcessByName('ac613', (queryData) => {
          let block = queryData.getBlockData('InBlock1')[0]
          block['cur_cd'] = null;
        }, (queryData) => {
          if (!queryData) {
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "ac613") return
            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: self.$t('sys_err.a001')
            });
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

            self.$EventBus.$emit('mobile-nav-title', self.coinData.sName);
          }
        });
      }
    },
    created() {
      this.$EventBus.$emit('mobile-nav-menus', ['noDefault', 'back', 'border']);
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
