<template>
    <el-container class="EtcVue PageCommon">
        <div class="SafetyProgram">
            <h1> &nbsp </h1>
            <h1 class="pageTitle">보안프로그램 설치 <span class="nprotect-icon"></span></h1>
            <ul>
                <li>고객님의 안전한 자산보호와 거래환경 조성을 위해 [nProtect] 프로그램 설치가 필요합니다.</li>
                <li>고객님의 컴퓨터 성능에 따라 10초~1분 정도의 시간이 소요될 수 있습니다.</li>
            </ul>

            <h2 class="subTitle">설치프로그램 소개</h2>
            <ul>
                <li>nProtect 온라인 보안 프로그램은 인터넷 통신상의 보안을 유지하기 위한 통합 보안 서비스로 거래시 발생할 수 있는 개인정보 유출, 금융정보 탈취, 키보드 해킹 및 금융사고를 방지할 수 있습니다.</li>
            </ul>

            <el-row class="nprotect-system">
                <el-col class="title"><div class="label">시스템 지원 환경</div></el-col>
                <el-col class="software">
                    <div class="label">소프트웨어</div>
                    <ul>
                        <li>windows XP SP3 / Vista SP1 / 7 / 8 / 8.1 / 10 (32, 64bit)</li>
                        <li>OS X / Ubuntu / Fedora</li>
                        <li>Android / IOS</li>
                    </ul>
                </el-col>
                <el-col class="hardware">
                    <div class="label">하드웨어</div>
                    <ul>
                        <li>Pentium 4 3.0 Ghz 이상</li>
                        <li>RAM 1GB 이상</li>
                        <li>HDD 30GB 이상</li>
                    </ul>
                </el-col>
                <el-col class="browser">
                    <div class="label">브라우저</div>
                    <ul>
                        <li>Internet Explorer 7 ~ 11 / Edge / Chorme / Safari / Firefox / Opera<br>그 외 다수 브라우저 지원</li>
                    </ul>
                </el-col>
                <el-col class="download">
                        <el-button @click="nProtectDownload" type="primary">nProtect 다운로드</el-button>
                    <a ref="nProDown" href="https://supdate.nprotect.net/nprotect/nos_service/windows/install/nos_setup.exe" ></a>
                </el-col>
            </el-row>

            <h2 class="subTitle">설치 안내</h2>
            <el-row class="nprotect-install">
                <el-col>
                    <div class="install step1"></div>
                    <div class="step-info">
                        <span class="number">1</span>
                        설치 프로그램을 다운로드하여 실행시켜 주세요.
                    </div>
                </el-col>
                <el-col>
                    <div class="install step2"></div>
                    <div class="step-info">
                        <span class="number">2</span>
                        설치가 완료되면 메인페이지로 이동하여 다시 로그인을 진행해 주세요.
                    </div>
                </el-col>
            </el-row>

            <div class="bottom-btns"><el-button type="primary" @click="goMain">메인 페이지로 이동</el-button></div>
        </div>


    <!-- nppfs html 시작 -->
        <iframe id="nppfs-download" name="nppfs-download" src="about:blank;" style="display:none;"></iframe>
    <!-- nppfs html 끝 -->
    </el-container>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    methods: {
        goMain() {
            // this.$router.push({path: '/'});
            // nprotect 설치 후 push할 경우 설치된 내용이 적용되지 않아. locaion.href로 대체함.
            location.href = "/"
        },
        nProtectDownload() {

            this.$refs.nProDown.click()
        }
    },
    created() {
        $("#nppfs-loading-modal").css({
            display: "none",
            width: "0px",
            height: "0px"
        })
        this.$EventBus.$emit('pc-navi', /*['notGnb']*/ '');
    },
    beforeDestroy() {
        $("#nppfs-loading-modal").css({
            display: "none",
            width: "0px",
            height: "0px"
        })
        npPfsCtrl.isStarting = false;
    }
}
</script>