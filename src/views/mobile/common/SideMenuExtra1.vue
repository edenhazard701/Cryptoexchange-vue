<template>
    <el-menu v-bind:default-active="index" class="el-menu-vertical-demo" @open="handleOpen" @select="handleSelect" :router="true">
        <el-menu-item index="1" :route="{name:'mExchange'}">
            <i class="el-icon-menu"></i>
            <span>여분 메뉴1</span>
        </el-menu-item>
        <el-menu-item index="2" :route="{name:'mSmartInvest'}">
            <i class="el-icon-menu"></i>
            <span>여분 메뉴2</span>
        </el-menu-item>
        <el-menu-item index="3" :route="{name:'mInvestment'}">
            <i class="el-icon-document"></i>
            <span>여분 메뉴3</span>
        </el-menu-item>
        <el-menu-item index="4" :route="{name:'mBank'}">
            <i class="el-icon-setting"></i>
            <span>여분 메뉴4</span>
        </el-menu-item>
        <el-menu-item index="5" :route="{name:'mMyPage'}">
            <i class="el-icon-setting"></i>
            <span>여분 메뉴5</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    data () {
        return {
            index: '0'
        };
    },
    methods : {
        handleSelect(index, indexKey) {
            this.$parent.moveMenu();
        }
    }
};

</script>