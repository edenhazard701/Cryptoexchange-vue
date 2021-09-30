<template>
<el-scrollbar class="setting_modal_bx" wrap-class="scrollbar-wrapper" :native="false">
    <ul class="chart_universal_time">
        <li v-for="(country, idx) in countries">
            <a href="#" :class="[{active: isMouseOver, checked: country.timeZone === timeZone}]" :data-utcminutes="country.utc"
                @click.prevent="clickCountry(country)"
                @mouseout="isMouseOver = true"
                @mouseleave="isMouseOver = false">{{ getStrUtcTime(country) }}</a>
        </li>
    </ul>
</el-scrollbar>
</template>

<script>
export default {
    props: ["timeZone"],
    data() {
        return {
            countries: [
                {name:'html5chart.countries.c001', timeZone: 'UTC', utc:'+00:00', isNotUTCShow: true},   // 표준시
                {name:'html5chart.countries.c002', timeZone: 'Asia/Seoul', utc:'+09:00', isNotUTCShow: true},   // 거래소
                {name:'html5chart.countries.c003', timeZone: 'Pacific/Honolulu', utc:'-10:00'}, // 호노룰루
                {name:'html5chart.countries.c004', timeZone: 'America/Juneau', utc:'-09:00'}, // 쥬노
                {name:'html5chart.countries.c005', timeZone: 'America/Los_Angeles', utc:'-08:00'}, // 로스엔젤레스
                {name:'html5chart.countries.c006', timeZone: 'America/Vancouver', utc:'-08:00'}, // 밴쿠버
                {name:'html5chart.countries.c007', timeZone: 'America/Phoenix', utc:'-07:00'}, // 피닉스
                {name:'html5chart.countries.c008', timeZone: 'America/Mexico_City', utc:'-06:00'}, // 멕시코시티
                {name:'html5chart.countries.c009', timeZone: 'America/El_Salvador', utc:'-06:00'}, // 산살바도르
                {name:'html5chart.countries.c010', timeZone: 'America/Chicago', utc:'-06:00'}, // 시카고
                {name:'html5chart.countries.c011', timeZone: 'America/New_York', utc:'-05:00'}, // 뉴욕
                {name:'html5chart.countries.c012', timeZone: 'America/Lima', utc:'-05:00'}, // 리마
                {name:'html5chart.countries.c013', timeZone: 'America/Bogota', utc:'-05:00'}, // 보고타
                {name:'html5chart.countries.c014', timeZone: 'America/Toronto', utc:'-05:00'}, // 토론토
                {name:'html5chart.countries.c015', timeZone: 'America/Caracas', utc:'-04:30'}, // 카라카스
                {name:'html5chart.countries.c016', timeZone: 'America/Buenos_Aires', utc:'-03:00'}, // 부에노스아이레스
                {name:'html5chart.countries.c017', timeZone: 'America/Santiago', utc:'-03:00'}, // 산티아고
                {name:'html5chart.countries.c018', timeZone: 'America/Sao_Paulo', utc:'-03:00'}, // 상파울루
                {name:'html5chart.countries.c019', timeZone: 'Europe/London', utc:'+00:00'},    // 런던
                {name:'html5chart.countries.c020', timeZone: 'Atlantic/Reykjavik', utc:'+00:00'},    // 레이캬비크
                {name:'html5chart.countries.c021', timeZone: 'Africa/Lagos', utc:'+01:00'},   // 라고스
                {name:'html5chart.countries.c022', timeZone: 'Europe/Rome', utc:'+01:00'},   // 로마
                {name:'html5chart.countries.c023', timeZone: 'Europe/Luxembourg', utc:'+01:00'},   // 룩셈부르크
                {name:'html5chart.countries.c024', timeZone: 'Europe/Madrid', utc:'+01:00'},   // 마드리드
                {name:'html5chart.countries.c025', timeZone: 'Europe/Warsaw', utc:'+01:00'},   // 바르샤바
                {name:'html5chart.countries.c026', timeZone: 'Europe/Berlin', utc:'+01:00'},   // 베를린
                {name:'html5chart.countries.c027', timeZone: 'Europe/Belgrade', utc:'+01:00'},   // 베오그라드
                {name:'html5chart.countries.c028', timeZone: 'Europe/Stockholm', utc:'+01:00'},   // 스톡홀름
                {name:'html5chart.countries.c029', timeZone: 'Europe/Zurich', utc:'+01:00'},   // 취리히
                {name:'html5chart.countries.c030', timeZone: 'Europe/Copenhagen', utc:'+01:00'},   // 코펜하겐
                {name:'html5chart.countries.c031', timeZone: 'Europe/Paris', utc:'+01:00'},   // 파리
                {name:'html5chart.countries.c032', timeZone: 'Europe/Riga', utc:'+02:00'},  // 리가
                {name:'html5chart.countries.c033', timeZone: 'Europe/Vilnius', utc:'+02:00'},  // 빌뉴스
                {name:'html5chart.countries.c034', timeZone: 'Europe/Athens', utc:'+02:00'},  // 아테네
                {name:'html5chart.countries.c035', timeZone: 'Asia/Jerusalem', utc:'+02:00'},  // 예루살렘
                {name:'html5chart.countries.c036', timeZone: 'Africa/Johannesburg', utc:'+02:00'},  // 요하네스버그
                {name:'html5chart.countries.c037', timeZone: 'Africa/Cairo', utc:'+02:00'},  // 카이로
                {name:'html5chart.countries.c038', timeZone: 'Europe/Tallinn', utc:'+02:00'},  // 탈린
                {name:'html5chart.countries.c039', timeZone: 'Europe/Helsinki', utc:'+02:00'},  // 헬싱키
                {name:'html5chart.countries.c040', timeZone: 'Asia/Riyadh', utc:'+03:00'},  // 리야드
                {name:'html5chart.countries.c041', timeZone: 'Europe/Moscow', utc:'+03:00'},  // 모스크바
                {name:'html5chart.countries.c042', timeZone: 'Asia/Bahrain', utc:'+03:00'},  // 바레인
                {name:'html5chart.countries.c043', timeZone: 'Asia/Istanbul', utc:'+03:00'},  // 이스탄불
                {name:'html5chart.countries.c044', timeZone: 'Asia/Qatar', utc:'+03:00'},  // 카타르
                {name:'html5chart.countries.c045', timeZone: 'Asia/Kuwait', utc:'+03:00'},  // 쿠웨이트
                {name:'html5chart.countries.c046', timeZone: 'Asia/Tehran', utc:'+03:30'},  // 테헤란
                {name:'html5chart.countries.c047', timeZone: 'Asia/Dubai', utc:'+04:00'},  // 두바이
                {name:'html5chart.countries.c048', timeZone: 'Asia/Muscat', utc:'+04:00'},  // 무스카트
                {name:'html5chart.countries.c049', timeZone: 'Asia/Ashkhabad', utc:'+05:00'},  // 아슈하바트
                {name:'html5chart.countries.c050', timeZone: 'Asia/Kolkata', utc:'+05:30'},  // 콜카타
                {name:'html5chart.countries.c051', timeZone: 'Asia/Almaty', utc:'+06:00'},  // 알마티
                {name:'html5chart.countries.c052', timeZone: 'Asia/Bangkok', utc:'+07:00'},  // 방콕
                {name:'html5chart.countries.c053', timeZone: 'Asia/Jakarta', utc:'+07:00'},  // 자카르타
                {name:'html5chart.countries.c054', timeZone: 'Asia/Ho_Chi_Minh', utc:'+07:00'},  // 호치민
                {name:'html5chart.countries.c055', timeZone: 'Asia/Taipei', utc:'+08:00'},  // 대만
                {name:'html5chart.countries.c056', timeZone: 'Asia/Shanghai', utc:'+08:00'},  // 상하이
                {name:'html5chart.countries.c057', timeZone: 'Asia/Singapore', utc:'+08:00'},  // 싱가포르
                {name:'html5chart.countries.c058', timeZone: 'Asia/Chongqing', utc:'+08:00'},  // 충칭
                {name:'html5chart.countries.c059', timeZone: 'Asia/Hong_Kong', utc:'+08:00'},  // 홍콩
                {name:'html5chart.countries.c060', timeZone: 'Asia/Tokyo', utc:'+09:00'},  // 도쿄
                {name:'html5chart.countries.c061', timeZone: 'Asia/Seoul', utc:'+09:00'},  // 서울
                {name:'html5chart.countries.c062', timeZone: 'Australia/Brisbane', utc:'+10:00'},  // 브리즈번
                {name:'html5chart.countries.c063', timeZone: 'Australia/Adelaide', utc:'+09:30'},  // 애들레이드
                {name:'html5chart.countries.c064', timeZone: 'Pacific/Norfolk', utc:'+11:30'},  // 노포크아일랜드
                {name:'html5chart.countries.c065', timeZone: 'Australia/Sydney', utc:'+10:00'},  // 시드니
                {name:'html5chart.countries.c066', timeZone: 'Pacific/Fakaofo', utc:'+13:00'},  // 토켈라우
                {name:'html5chart.countries.c067', timeZone: 'Pacific/Chatham', utc:'+12:45'},  // 채텀제도
            ],
            isMouseOver: false
        }
    },
    mounted() {
        this.setPosition();
        window.addEventListener('resize', this.setPosition);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.setPosition);
    },
    methods: {
        setPosition() {
            const chartCont = document.getElementsByClassName('chart_cont')[0];
            const chartBtmArea = document.getElementsByClassName('chart_btm_area')[0];
            const maxHeight = chartCont.offsetHeight - chartBtmArea.clientHeight;
            const pClassName = chartCont.offsetParent.className;

            let offsetLeft = 0, offsetTop = 0;            
            if (pClassName === 'chart') {
                offsetLeft = chartCont.offsetParent.clientWidth + chartCont.offsetParent.offsetLeft + chartCont.offsetParent.offsetParent.offsetLeft - 1;
                offsetTop = chartCont.offsetTop + chartCont.offsetParent.offsetTop + chartCont.offsetParent.offsetParent.offsetTop - 1;
            } else {
                offsetLeft = chartCont.offsetLeft + chartCont.clientWidth;
                offsetTop = chartCont.offsetParent.offsetTop;
            }
            offsetLeft -= (this.$el.clientWidth + this.$el.clientLeft);

            this.$el.style.left = offsetLeft + 'px';
            this.$el.style.top = (offsetTop) + 'px';
            this.$el.style.maxHeight = maxHeight + 'px';
        },
        getStrUtcTime(item) {
            let utc = '';
            if (!item.isNotUTCShow) {
              utc += '(UTC ' + item.utc + ') '
            }
            return utc + this.$t(item.name);
        },
        clickCountry({timeZone, utc}) {
            this.$emit("chart-real-clock", {timeZone, utc});
            this.$emit("close");
        }
    }
};
</script>

<style scoped>
.setting_modal_bx{
    position: absolute;
    padding:10px 0;
    margin-right:5px;
    background:#fff;
    z-index:100;
    width:180px;
    border:1px solid #e1dfe1;
    overflow-y: auto;
    box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.1);
}

.FullExchange .setting_modal_bx {
    background:#38484f;
    border:1px solid #465b63;
    box-shadow: 0px 3px 5px 0 rgba(153, 204, 255, 0.05);
}
</style>
