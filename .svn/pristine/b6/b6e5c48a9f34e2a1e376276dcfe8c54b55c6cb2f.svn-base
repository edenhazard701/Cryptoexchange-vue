<template>
    <el-container class="Customers">
        <el-aside width="200px" class="mypage-left">
            <div class="aside-title"><!-- 고객센터 -->{{$t('header.cs')}}</div>

            <el-menu :default-active="activeMenuIndex()" class="my-page-left-menu" @open="handleOpen" @close="handleClose" :router="true">
                <el-menu-item :route="{name:'csNotice'}" index="1">
                    <span><!-- 공지사항 -->{{$t('cs.a001')}}</span>
                </el-menu-item>
                <el-menu-item :route="{name:'csNews'}" index="2">
                    <span><!-- KOVEX 소식 -->{{$t('cs.a002')}}</span>
                </el-menu-item>
                <el-menu-item :route="{name:'csHowtouse'}" index="3">
                    <span><!-- 이용방법 -->{{$t('cs.a003')}}</span>
                </el-menu-item>
                <el-menu-item :route="{name:'csQna'}" index="4">
                    <span><!-- 1:1문의하기 -->{{$t('cs.a004')}}</span>
                </el-menu-item>
                <el-menu-item index="7" class="kakao" :route="{to:'/'}">
					<a href="//pf.kakao.com/_PdmGj/chat" target="_blank"><!-- 카카오톡 문의 -->{{$t('cs.a005')}}</a>
                </el-menu-item>
                <el-menu-item :route="{name:'csFaq'}" index="5">
                    <span><!-- 자주하는질문 -->{{$t('cs.a006')}}</span>
                </el-menu-item>
                <el-menu-item :route="{name:'csPolicy'}" index="6">
                    <span><!-- 약관 및 정책 -->{{$t('cs.a007')}}</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main class="customer-main">
            <!-- <transition name="fade" mode="out-in"> -->
                <router-view></router-view>
            <!-- </transition> -->
        </el-main>
    </el-container>
</template>

<script>
    import Notice from './customers/Notice.vue';
    import News from './customers/News.vue';
    import HowToUse from './customers/HowToUse.vue';
    import Qna from './customers/QnA.vue';
    import FAQ from './customers/FAQ.vue';
    import Policy from './customers/Policy.vue';

    export default {
        components: {
            Notice,
            News,
            HowToUse,
            Qna,
            FAQ,
            Policy
        },
        data() {
            return {

            };
        },
        methods: {
            handleOpen(key, keyPath) {
                //console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                //console.log(key, keyPath);
            },
            activeMenuIndex: function () {
                switch (this.$route.name) {
                    case 'csNotice': return '1';
                    case 'pcNoticeDetail': return '1';
                    case 'csNews': return '2';
                    case 'pcNewsDetail': return '2';
                    case 'csHowtouse': return '3';
                    case 'csQna': return '4';
                    case 'qnaDetail': return '4';
                    case 'qnaWrite': return '4';
                    case 'csFaq': return '5';
                    case 'csPolicy': return '6';
                }
            }
        }
    };
</script>