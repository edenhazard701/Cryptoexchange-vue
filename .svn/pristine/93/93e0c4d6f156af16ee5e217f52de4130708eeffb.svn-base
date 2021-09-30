<template>
    <div class="NaviBar" v-if="navis && !navis.includes('main') && !navis.includes('exchanges')">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{name: 'main'}">HOME</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in navis" :key="item.navis" :to="{name: item.target}">{{item.label}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navis: []
            };
        },
        created() {
            this.$EventBus.$on('pc-navi', (navi) => {
                this.navis = navi;
            });
        }
    }
</script>