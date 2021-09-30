<template>
    <el-container class="PcContainer" :class="[$store.state.nowPage === '/fullexchange' || $store.state.nowPage === '/fullscreenchart' ? 'full' : '']">
        <el-header v-show="!navis.includes('notGnb')" class="Header" :class="{'isScroll':isActive }">
          <kovex-header></kovex-header>
          <navi-bar></navi-bar>
        </el-header>
        <!-- <transition name="fade" mode="out-in" > -->
          <router-view></router-view>
        <!-- </transition> -->
        <el-footer id="Footer" v-show="!navis.includes('notGnb')" class="Footer" :class="[$store.state.nowPage === '/tdi/tdilist' ? 'no-margin' : '']">
          <span class="page-top" :class="{'abs': topFixed }" @click="pageTop()"></span>
          <kovex-footer></kovex-footer>
        </el-footer>
    </el-container>
</template>

<style lang="scss" src="@/styles/css_pc.scss"></style>

<script>
    import KovexHeader from './Header.vue';
    import NaviBar from './NaviBar.vue';
    import KovexFooter from './Footer.vue';

    export default {
        components: {
            KovexHeader,
            NaviBar,
            KovexFooter
        },
        data() {
            return {
                isActive: false,
                topFixed: false,
                navis: []
            };
        },
        methods: {
            isScroll() {
                if (window.pageYOffset > 1) {
                    this.isActive = true;
                } else {
                    this.isActive = false;
                }

                var winHeight = document.body.clientHeight;
                var footerObj = document.getElementById('Footer');
                var footerPos = footerObj.offsetTop - winHeight;

                if (window.pageYOffset > footerPos) {
                    this.topFixed = true;
                } else {
                    this.topFixed = false;
                }
            },
            pageTop() {
                window.scrollTo(0, 0);
            }
        },
        created() {
            window.addEventListener('scroll', this.isScroll);

            this.$EventBus.$on('pc-navi', (navi) => {
                this.navis = navi;
            });
        },
        mounted() {
            this.isScroll();
        },
        destroyed() {
            window.removeEventListener('scroll', this.isScroll);
        }
    }
</script>