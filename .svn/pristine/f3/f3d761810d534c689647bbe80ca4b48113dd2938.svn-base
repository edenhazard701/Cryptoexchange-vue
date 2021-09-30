<template>
    <el-container class="EtcVue PageCommon">
        <div class="CommonError">
            <h1 class="error-tit">접속 지연 안내</h1>
            <p class="error-txt">
                코벡스를 이용해 주셔서 감사합니다.<br>
                현재 접속자 수가 많아 접속이 지연되고 있으니,<br>
                잠시 후에 다시 접속해 주시기 바랍니다.<br><br>
                이용에 불편을 드려 죄송합니다.
            </p>
            
            <div class="error-btn-bx">
                <router-link to="/">메인 페이지</router-link>
            </div>
        </div>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            prevPage() {
                history.back(-1);
            }
        },
        created() {
            this.$EventBus.$emit('mobile-nav-title', '');
            this.$EventBus.$emit('mobile-nav-menus', ['noDefault']);
            this.$EventBus.$emit('pc-navi', ['notGnb']);
        }
    }
</script>
