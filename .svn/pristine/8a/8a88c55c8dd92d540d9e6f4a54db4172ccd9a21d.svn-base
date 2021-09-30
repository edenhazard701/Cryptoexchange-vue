<template>
    <el-container class="EtcVue PageCommon">
        <div class="BrowserCheck">
            <h1 class="logo"><span class="logo-txt">{{$t('browserchecking.a001')}}</span></h1>
            <div class="browser-check-bx">
                <ul class="browser-check-lst">
                    <li>{{$t('browserchecking.a002')}}</li>
                    <li v-if="isPC">{{$t('browserchecking.a003-1')}}</li>
                    <li v-if="!isPC" v-html="$t('browserchecking.a003-2')"></li>
                </ul>
            </div>
            <div class="hompage-lnk-bx">
                <!-- pc 일 때 -->
                <ul v-if="isPC" class="homepage-lnk-lst">
                    <li class="chrome">
                        <strong class="lnk-tit">{{$t('browserchecking.a004')}}</strong>
                        <a href="https://www.google.com/intl/ko_ALL/chrome/" target="_blank" class="btn-lnk">{{$t('browserchecking.a007')}}</a> 
                    </li>
                    <li class="edge">
                        <strong class="lnk-tit">{{$t('browserchecking.a005')}}</strong>
                        <a href="https://www.microsoft.com/ko-kr/windows/microsoft-edge" target="_blank" class="btn-lnk">{{$t('browserchecking.a007')}}</a> 
                    </li>
                    <li class="explorer">
                        <strong class="lnk-tit">{{$t('browserchecking.a006')}}</strong>
                        <a href="https://support.microsoft.com/ko-kr/help/17621/internet-explorer-downloads" target="_blank" class="btn-lnk">{{$t('browserchecking.a007')}}</a> 
                    </li>
                </ul>

                <!-- 모바일 일 때 -->
                <ul v-else class="homepage-lnk-lst">
                    <li class="chrome">
                        <strong class="lnk-tit">{{$t('browserchecking.a009')}}</strong>
                    </li>
                    <li class="safari">
                        <strong class="lnk-tit">{{$t('browserchecking.a010')}}</strong>
                    </li>
                    <li class="samsung">
                        <strong class="lnk-tit">{{$t('browserchecking.a011')}}</strong>
                    </li>
                </ul>
            </div>
            <div class="error-btn-bx">
                <el-button @click="clickContinue">{{$t('browserchecking.a008')}}</el-button>
            </div>
        </div>
    </el-container>
</template>
<script>
    import MobileDetect from 'mobile-detect';
    export default {
        data() {
            return {
                isPC: true
            }
        },
        created() {
            if (this.$route.name !== 'main') {
                this.$EventBus.$emit('mobile-nav-title', '');
                this.$EventBus.$emit('mobile-nav-menus', ['noDefault']);
                this.$EventBus.$emit('pc-navi', ['notGnb']);
                
                var self = this;
                var md = new MobileDetect(window.navigator.userAgent);
                if (md.phone()) {
                    self.isPC = false;
                } else {
                    self.isPC = true;
                }
            }
        },
        methods: {
            clickContinue() {
                if (this.$route.name === 'main') {
                    this.$EventBus.$emit('hideDialog');
                } else {
                    this.$router.push({path: '/'})
                }
            }
        }
    }
</script>
