<template>
    <div class="SmartCoin">
        <div class="header">
            <h1 class="title">
				<span class="symbol">
					<img :src="displayCoinImg(coinData.cur_cd)">
				</span>{{coinData['cur_nm'] | nameFilter}}
			</h1>
            <p> {{coinData['cur_nm'] | nameFilter}}{{$t('m_mining.a002')}}</p>
            <ul class="list">
                <li class="dot">{{$t('m_mining.a003')}}</li>
                <li class="dot">{{$t('m_mining.a004')}}</li>
            </ul>
            <el-button type="text" class="intro_btn" @click="onIntroClick">{{$t('m_mining.a005')}}</el-button>
        </div>
        
        <el-tabs type="card" v-model="activeName" @tab-click="onTab" :stretch="true" class="box_tab_sy">
            <el-tab-pane :label="$t('m_mining.b001')" name="mining">
                <coin-mining></coin-mining>
            </el-tab-pane>
            <el-tab-pane :label="$t('m_mining.b002')" name="share">
                <coin-share></coin-share>
            </el-tab-pane>
            <el-tab-pane :label="$t('m_mining.b003')" name="issue">
                <coin-issue></coin-issue>
            </el-tab-pane>
        </el-tabs>
    </div> 
</template>

<script>
import CoinMining from './coin/SmartCoinMining';
import CoinShare from './coin/SmartCoinShare';
import CoinIssue from './coin/SmartCoinIssue';

export default {
    components: {
        CoinMining,
        CoinShare,
        CoinIssue
    },
    data () {
        return {
            navTitle: '$코인명$',
			activeName: 'mining',
			coinData : {
				cur_cd : '',
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
	filters: {
		nameFilter (value){
			var arr = value.split('(');
			return arr[0];	
		}
	},
    methods: {
		/* 코인 이미지 표시 */
        displayCoinImg(symbol) {
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
		nameFilter2 (value){
			var arr = value.split('(');
			return arr[0];	
		},
        onTab(tab, event) {
            
        },
        onIntroClick() {
            this.$router.push({
                name: 'mSmartCoinIntro'
            });
        },
        handleScroll: function (event) {
            var scollTop = window.scrollY;
            var topContHei = document.getElementsByClassName('header')[0].offsetHeight;
            var smartCoinkMain = document.getElementsByClassName('SmartCoin')[0].getElementsByClassName('box_tab_sy')[0];

            if(scollTop > topContHei + 20){
				smartCoinkMain.getElementsByClassName('el-tabs__header')[0].style.position = "fixed";
				smartCoinkMain.getElementsByClassName('el-tabs__header')[0].style.top = "45px";
				smartCoinkMain.getElementsByClassName('el-tabs__header')[0].style.width = "100%";
				smartCoinkMain.getElementsByClassName('el-tabs__header')[0].style.margin = "0"
                smartCoinkMain.getElementsByClassName('el-tabs__content')[0].style.padding = "55px 0 0"
            }else{
                smartCoinkMain.getElementsByClassName('el-tabs__header')[0].removeAttribute("style")
                smartCoinkMain.getElementsByClassName('el-tabs__content')[0].removeAttribute("style")
            }
		},
		requestCoinInfo (){
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
					self.coinData = queryData['queryObj']['OutBlock1'][0];
					self.$EventBus.$emit('mobile-nav-title', self.nameFilter2(self.coinData['cur_nm']));
	
					// console.log('rateData >>>>>>>', self.rateData )
					// console.log('rateData >>>>>>>', self.rateData[1].data[0])
	
					// self.rateData.datasets[0].data[0] = self.coinData.minn_qty_rt;
					// self.rateData.datasets[0].data[1] = self.coinData.mrkt_qty_rt;
					// self.rateData.datasets[0].data[2] = self.coinData.team_qty;

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
		}	
    },
    created() {
       
        this.$EventBus.$emit('mobile-nav-menus', ['back', 'border']);

        window.addEventListener('scroll', this.handleScroll);
    },
    mounted() {
		this.handleScroll();
		var self = this;

		if (self.$store.getters.isSocketConnected) {
			self.requestCoinInfo();

		} else {
			self.$EventBus.$on('socketConnected', () => {
				self.requestCoinInfo();
			});
		}
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    }
};

</script>
