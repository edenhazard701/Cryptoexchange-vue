<template>
    <el-container class="MyPage">
        <el-aside width="200px" class="mypage-left">
            <div class="aside-title">{{$t('header.me')}}<!-- 마이페이지 --></div>
            <el-menu :default-active="activeMenuIndex()" class="mypage-left-menu" @open="handleOpen" @close="handleClose" :router="true">
                <el-menu-item :route="{name:'mypageInfo'}" index="1">
                    <span>{{$t('mypage.a001')}}<!-- 회원정보 --></span>
                </el-menu-item>
                <!-- 인증센터 -->
                <!-- <el-menu-item :route="{name:'mypageSecurity'}" index="2">
                    <span>{{$t('mypage.a002')}}</span>
                </el-menu-item> -->
                <el-submenu index="3">
                    <template slot="title">{{$t('mypage.a003')}}<!-- API 관리 --></template>
                    <el-menu-item index="3-1" :route="{name:'mypageOpenApi'}">{{$t('mypage.a004')}}<!-- Open API --></el-menu-item>
                    <el-menu-item index="3-2" :route="{name:'mypageRestApi'}">{{$t('mypage.a005')}}<!-- Restful API --></el-menu-item>
                </el-submenu> 
                <el-menu-item :route="{name:'mypageLog'}" index="4">
                    <span>{{$t('mypage.a006')}}<!-- 접속정보확인 --></span>
                </el-menu-item>
                <el-menu-item :route="{name:'mypageRestriction'}" index="5">
                    <span>{{$t('mypage.a008')}}<!-- 거래 제한 등록/해지 --></span>
                </el-menu-item>
                <el-menu-item :route="{name:'mypagePreference'}" index="6">
                    <span>{{$t('mypage.a007')}}<!-- 공통설정 --></span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main class="mypage-main">
            <!-- <transition name="fade" mode="out-in"> -->
                <router-view></router-view>
            <!-- </transition> -->
        </el-main>
    </el-container>
</template>

<script>
    export default {
        components: {

        },
        data() {
            return {
                navTitle : '마이페이지',
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            activeMenuIndex: function () {
                switch (this.$route.name) {
                    case 'mypageInfo': return '1';
                    case 'passwordChange': return '1';
                    case 'unregistration': return '1';
                    case 'mypageSecurity': return '2';
                    case 'bankAccount': return '2';
                    case 'mypageOpenApi': return '3-1';
                    case 'mypageRestApi': return '3-2';
                    case 'mypageLog': return '4';
                    case 'mypageRestriction': return '5';
                    case 'mypagePreference': return '6';
                }
            }
        },
        created() {
            this.$EventBus.$emit('mobile-nav-title', this.navTitle);
            this.$EventBus.$emit('mobile-nav-menus', ['notification']);
        }
    };
</script>