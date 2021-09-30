<template>
    <el-container class="EtcVue PageCommon">
        <div class="SecurityProgram">
            <div class="logo"></div>
            <div class="security-info">
                은행과 동일하게 안전한 이체거래를 진행합니다.<br>
                사용 중인 은행의 보안 프로그램을 설치하세요.
            </div>
            <div class="security-table">
                <table border="0" cellpadding="0" cellspacing="0">
                    <colgroup>
                        <col width="450">
                        <col>
                        <col width="140">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>프로그램명</th>
                            <th>기능</th>
                            <th>설치</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                은행보안프로그램 설치확인<br>
                                FSWSS(스크랩핑모듈) Finger Scraping Web Server SSL
                            </td>
                            <td>거래할 은행의 보안 프로그램 설치 확인을 위한 스크랩핑 모듈입니다.</td>
                            <td>
                                <div v-if="!fswss" class="not-install">
                                    미설치<br>
                                    <el-button type="primary">다운로드</el-button>
                                </div>
                                <div v-else class="install">설치완료</div>
                            </td>
                        </tr>
                        <tr>
                            <td>키보드 보안</td>
                            <td>키보드 보안 프로그램입니다.</td>
                            <td>
                                <div v-if="!keysecurity" class="not-install">
                                    미설치<br>
                                    <el-button type="primary">다운로드</el-button>
                                </div>
                                <div v-else class="install">설치완료</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="security-table-info">
                    <span class="text"># 위 프로그램은 입금을 위해 반드시 설치가 필요하며 [다운로드]를 클릭하시면 설치가 됩니다.</span>
                </div>
            </div>

            <div class="security-confirm">
                <div class="label"># 보안프로그램 설치를 마치셨나요?</div>
                [설치확인] 버튼을 클릭하여 설치 상태를 확인하세요.
                <el-button type="info">설치확인</el-button>
            </div>
        </div>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            fswss: false,
            keysecurity: true
        }
    },
    methods: {

    },
    created() {
        this.$EventBus.$emit('pc-navi', ['notGnb']);
    }
}
</script>