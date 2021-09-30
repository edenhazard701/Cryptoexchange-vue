<template>
	<el-container class="AssetVue">
		<div class="contents">
			<el-menu :default-active="activeMenuIndex()" mode="horizontal" class="asset-menu" @open="handleOpen" @close="handleClose" :router="true">
				<el-menu-item :route="{name: 'assetProfit'}" index="1">{{$t('balances.a002')}}<!-- 투자손익 --></el-menu-item>
				<el-menu-item :route="{name: 'assetStatus'}" index="2">{{$t('balances.b001')}}<!-- 자산현황 --></el-menu-item>
			</el-menu>
            <!-- <transition name="fade" mode="out-in"> -->
				<router-view></router-view>
			<!-- </transition> -->
		</div>
    </el-container>
</template>

<script>	
	export default {
		components: {
			
		},
		data() {
      		return {  
				
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
                    case 'assetProfit': return '1';
                    case 'assetStatus': return '2';
                }
            }
    	}
	};

</script>