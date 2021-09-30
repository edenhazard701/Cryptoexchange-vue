<template>
  <div class="SmartInvest">
    <el-menu @select="menuSelected" :router="true" class="main-nav">
      <el-menu-item index="1" :route="{name:'mSmartSignal'}" class="nav-lst01">
        <div class="nav-txt-bx">
          {{$t('signal.b001')}}
          <!-- 스마트시그널 -->
        </div>
      </el-menu-item>
      <el-menu-item index="2" :route="{name:'mSmartScreener'}" class="nav-lst02">
        <div class="nav-txt-bx">
          {{$t('main.h014')}}
          <!-- 스크리너 -->
        </div>
      </el-menu-item>
      <el-menu-item index="3" :route="{name:'mSmartTdi'}" class="nav-lst03">
        <div class="nav-txt-bx">
          TDI
          <p class="nav-info-txt">Trade-Driven ICO<br />
            {{$t('m_tdi.a002')}}
            <!-- 거래 수수료로 ICO 에 참여해 보세요. -->
          </p>
        </div>
      </el-menu-item>
      <!-- <el-menu-item index="4" :route="{name:'mSmartCoin'}" class="nav-lst04"> -->
        <el-menu-item index="" class="nav-lst04">
        <div class="nav-txt-bx">
          {{$t('m_mining.a001')}}
          <!-- KOVEX 코인 -->
          <p class="nav-info-txt">{{coinData['cur_nm'] | nameFilter}}{{$t('m_mining.a002')}}
            <!-- {{coinData['cur_nm'] | nameFilter}}은 거래소에서 사용되는 토큰입니다. -->
          </p>
        </div>
      </el-menu-item>
    </el-menu>

    <!-- Native App일 때만 나타남 -->
    <app-menu></app-menu>
  </div>
</template>

<script>
  import AppMenu from './common/MobileFooterMenu';

  export default {
    components: {
      AppMenu
    },
    data() {
      return {
        navTitle: '스마트투자',
        coinData: {
          cur_cd: '',
          cur_nm: '',
          tot_qty: '',
          tot_minn_qty: '',
          mrkt_qty: '',
          team_qty: '',
          minn_qty_rt: '',
          mrkt_qty_rt: '',
          team_qty_rt: '',
          fee_rt: ''
        }
      };
    },
    created() {
      this.$EventBus.$emit('mobile-nav-title', this.$t('m_main.e005'));
      this.$EventBus.$emit('mobile-nav-menus', ['notification', 'border']);
    },
    filters: {
      nameFilter(value) {
        var arr = value.split('(');
        return arr[0];
      }
    },
    methods: {
			nameFormat (value){
				var arr = value.split('(');
				return arr[0];	
			},
      menuSelected(event) {
        if (event === "") {
          this.requestCoinInfo()
        }
      },
      requestCoinInfo() {
        console.log('requestCoinInfo() >>>>>>>>>>>>>>>>>>>>>>>>>>');
        var self = this;
        self.$socket.sendProcessByName('ac613', (queryData) => {
          let block = queryData.getBlockData('InBlock1')[0]
          block['cur_cd'] = null;
          // console.log('코인 조회 데이터 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', block);
        }, (queryData) => {
          if (!queryData) {
            console.log('>>>>>>>>>>>>>> 거래소 코인 정보 조회 실패')
            // 전문 에러 언어팩 적용
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "ac613") return

            self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: self.$t('sys_err.a001')
            });
            return
          } else {
            console.log('거래소 코인 정보 (ac613) >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', queryData)
            // self.coinData = queryData['queryObj']['OutBlock1'][0];
            self.$router.push({name: 'mSmartCoin'});

            // console.log('rateData >>>>>>>', self.rateData )
            // console.log('rateData >>>>>>>', self.rateData[1].data[0])

          }

          // 통화코드(5)				cur_cd			TMX  
          // 통화명(30)				cur_nm			TM_TEST(TMX)
          // 총발행량(20)				tot_qty			10000000
          // 총채굴량(20)				tot_minn_qty	6000000
          // 운영및마케팅(20)			mrkt_qty		2500000
          // 팀(20)					team_qty		1500000
          // 트레이드마이닝비율(20)		minn_qty_rt		60
          // 운영및마케팅비율(20)		mrkt_qty_rt			25
          // 팀비율(20)				team_qty_rt		15
          // 수수료비율(5)			fee_rt			70
        })
      },
      /* 거래소 코인 */
      kovexCoinName() {
        var self = this;
        self.$socket.sendProcessByName('ac613', (queryData) => {
          let block = queryData.getBlockData('InBlock1')[0]
          block['cur_cd'] = null;
        }, (queryData) => {
          if (!queryData) {
            const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
            if (errorData.trName != "ac613") return
          } else {
            self.coinData = queryData['queryObj']['OutBlock1'][0];
          }
        })
      }
    },
    mounted() {
      var self = this;

      if (self.$store.getters.isSocketConnected) {
        self.kovexCoinName();

      } else {
        self.$EventBus.$on('socketConnected', () => {
          self.kovexCoinName();
        });
      }
      // this.requestCoinInfo();
      
    }
  };

</script>
