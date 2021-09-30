<template>
    <el-container class="EtcVue PageCommon">
        <div class="CommonError">
            <h1 class="error-tit">요청하신 페이지를 찾을 수 없습니다.</h1>
            <p class="error-txt">
                서비스 이용에 불편을 드려 죄송합니다. <br />주소(URL)가 잘못되었거나 페이지의 주소가 변경 또는 삭제되어 요청하신 페이지에 접속할 수 없습니다.<br />문의사항은 고객센터로 문의해 주시기 바랍니다.
            </p>
            <p class="error-code-txt">에러코드 : ZWED10046</p>
            <div class="error-info">
                <ul class="info-lst">
                    <li class="customer">고객센터 1588-0000</li>
                    <li><el-button class="btn-counsel">1:1 이메일 문의</el-button></li>
                </ul>
            </div>
            <div class="error-btn-bx">
                <a @click="prevPage()" class="sub-button">이전페이지</a>
                <router-link to="/">홈으로 이동</router-link>
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
