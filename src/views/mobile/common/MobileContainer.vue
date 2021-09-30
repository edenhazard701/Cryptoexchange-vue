<template>
	<div class="MobileContainerWrap" :class="{'native': chkApp, 'lang-en': $i18n.locale === 'en'}">
		<el-container class="MobileContainer">
			<el-header class="Header">
			    <mobile-header></mobile-header>
			</el-header>
			<!-- <transition name="fade" mode="out-in"> -->
			    <router-view></router-view>
			<!-- </transition> -->
		</el-container>
	</div>
</template>

<style lang="scss" src="@/styles/css_mobile.scss"></style>

<script>
	import MobileHeader from './MobileHeader.vue';

    export default {
        components: {
        	MobileHeader
        },
        data() {
            return {
                vuegConfig:{                
                    forwardAnim:'bounceInUp',  
                    disable:false            
                },
                chkApp: false
            } 
        },
        methods: {
        
        },
        created() {
        
        },
        mounted() {
            /* 네이티브 앱 체크 */
            var self = this;
            if (afc.isDevice) {
                self.chkApp = true;
            }
        },

    }
</script>