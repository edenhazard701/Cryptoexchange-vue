<template>	
	<router-view></router-view>	
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data () {
		return {
			itemId: ''
		};
	},
	computed: {
		...mapGetters(['currentCurCd'])
	},
	methods : {
		handleClick(tab, event) {
			console.log(tab, event);
		},
		setItem(id){
			this.itemId = id;
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        activeMenuIndex: function () {
			//입출금 메뉴 클릭 이벤트  
            switch (this.$route.name) {
                case 'depositWithdraw': return '1'; //입출금 이동 
                case 'bankHistory': return '2';     //입출금 내역 이동 
            }
        }
	},
	mounted() {
	}
};

</script>