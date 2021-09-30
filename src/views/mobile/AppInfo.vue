<template>
    <div class="SmartSignalInfomation">
        <h1><img :src="require('@/images/m_kovex_logo.png')" alt="kovex"></h1>
        <p class="txt">모든 거래를 하나로 모으다<br><span class="b_txt">통합 암호화폐 거래소, KOVEX</span></p>
        <div class="app_btn">
            <a :href="androidMarket">
                <el-button type="text" class="google">
                    <img :src="require('@/images/m_smart_googleapp.png')"  alt="goggle play down">
                </el-button>
            </a>
            <a :href="appleMarket">
                <el-button type="text" class="app">
                    <img :src="require('@/images/m_smart_appleapp.png')"  alt="app store down">
                </el-button>
            </a>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import {_} from 'vue-underscore';

	export default {
		data() {
			return {
                symbol: this.$route.query.symbol,
                androidMarket: 'https://play.google.com/store/apps/details?id=com.btckorea.bithumb',    // 앱 등록 후 패키지 이름 수정 com.wustone.kovex ??
                appleMarket: 'https://itunes.apple.com/kr/app/apple-store/id594428299?mt=8',            // 앱 등록 후 앱 ID 수정

                timer: null,
                interval: null
			}
        },
		methods: {
            popUp() {
                var self = this;
                self.$alert('모바일 앱 또는 웹에서 이 페이지를<br>열겠습니까?', '', {
                    confirmButtonText: '열기',
                    cancelButtonClass: '취소',
                    showCancelButton: true ,
                    dangerouslyUseHTMLString: true
                }).then(() => {
                    self.openApp(self.appScheme);
                }).catch(() => {
                    
                });
            },
            openApp(target) {
                var self = this;
                
                self.interval = setInterval(self.checkAppExists, 200);

                var delay = 1000;
                self.timer = setTimeout(function() {
                    self.$router.push({ name: "mOrder" })    // 앱 설치 안된 경우
                }, delay);

                location.href = target;
            },
            checkAppExists() {
                var self = this;
                if(document.webkitHidden || document.hidden) {  // 앱이 설치되어서 실행
                    self.clearTimers();
                }
            },
            clearTimers() {
                var self = this;
                clearInterval(self.interval);
                clearTimeout(self.timer);
            }
		},
		created() {
            var self = this;
            self.$EventBus.$emit('mobile-nav-menus', ['nohead']);
        },
        mounted() {
            var self = this;
            self.popUp();
        },
        computed: {
            ...mapState({
                coinList : state => state.data['n1001'],
            }),
            appScheme() {
                var self = this;
                var param = '';
                
                if(self.symbol && self.coinList.length > 0) {
                    var coin = self.$_.findWhere(self.coinList, {o_symbol : self.symbol});
                    if(coin) {
                        self.$store.commit('setCurrentSymbol', self.symbol);
                        self.$EventBus.$emit('changeCurrentSymbol', self.symbol);
                        sessionStorage.setItem('currentSymbol', self.symbol);
                        param = '?symbol=' + self.symbol;
                    }
                }
                return 'kovexrun://kovex' + param;
                // if(afc.isAndroid) {
                //     return self.androidScheme;
                // } else if(afc.isIos) {
                //     return self.appleScheme;
                // }
            },
            androidScheme() {
                var self = this;
                var param = '';
                
                if(self.symbol && self.coinList.length > 0) {
                    var coin = self.$_.findWhere(self.coinList, {o_symbol : self.symbol});
                    if(coin) {
                        self.$store.commit('setCurrentSymbol', self.symbol);
                        self.$EventBus.$emit('changeCurrentSymbol', self.symbol);
                        sessionStorage.setItem('currentSymbol', self.symbol);
                        param = '?symbol=' + self.symbol;
                    }
                }
                return 'kovexrun://kovex' + param;
            },
            appleScheme() {
                var self = this;
                var param = '';
                
                if(self.symbol && self.coinList.length > 0) {
                    var coin = self.$_.findWhere(self.coinList, {o_symbol : self.symbol});
                    if(coin) {
                        self.$store.commit('setCurrentSymbol', self.symbol);
                        self.$EventBus.$emit('changeCurrentSymbol', self.symbol);
                        sessionStorage.setItem('currentSymbol', self.symbol);
                        param = '?symbol=' + self.symbol;
                    }
                }
                return 'kovexrun://kovex' + param;
            }
        }
	}
</script>

