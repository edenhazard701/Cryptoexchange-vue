<template>
    <el-container class="EtcVue PageCommon">
        <div class="ServerChecking">
            <h1 class="logo"><span class="logo-txt">코벡스</span></h1>
            <h2 class="server-tit">서버 점검 안내</h2>
            <p class="server-txt">
                <span>안정적인 서비스를 위해 서버 점검을 진행중입니다.</span>
                <span>점검 일정은 다음과 같습니다.</span>
            </p>
            <div class="check-info-bx">
                <h3 class="info-tit">점검 일정</h3>
                <div class="info-lst-bx">
                    <ul class="info-lst">
                        <li>
                            <strong class="lst-tit">점검 일시 : </strong>
                            <p class="lst-txt">2018/12/14 오전 10:00 ~ 오후 1:00 <span class="time-txt">(총 3시간)</span></p>
                        </li>
                        <li>
                            <strong class="lst-tit">점검 상세 : </strong>
                            <p class="lst-txt">서버 안정화</p>
                        </li>
                    </ul>
                </div>
            </div>
            <p class="server-txt btm-txt">해당 기간동안 코벡스의 전체 시스템 사용이 불가하니 참고 바랍니다.<br />이용에 불편을 드려 죄송합니다. 감사합니다.</p>
            <div class="error-btn-bx">
                <router-link to="">상세 보기</router-link>
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
        created() {
            this.$EventBus.$emit('mobile-nav-title', '');
            this.$EventBus.$emit('mobile-nav-menus', ['noDefault']);
            this.$EventBus.$emit('pc-navi', ['notGnb']);
        }
    }
</script>

