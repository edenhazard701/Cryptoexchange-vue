<template>
<section class="chart_cont">
	<article class="chart_top_bx">		
		<div class="chart_top_lft">
			<!-- 수정 -->
			<!-- 가로모드일때만 노출
			<div class="select_ui">
				<button class="select_tit">선택하기</button>
				<ul class="select_lst">
					<li><button class="data_button">리플 <span class="txt">XRP/KRW</span></button></li>
					<li><button class="data_button">트론 <span class="txt">TRX/KRW</span></button></li>
					<li><button class="data_button">비트코인에스브이 <span class="txt">XRP/KRW</span></button></li>
					<li><button class="data_button">이더리움 <span class="txt">TRX/KRW</span></button></li>
					<li><button class="data_button">비트코인 <span class="txt">XRP/KRW</span></button></li>
					<li><button class="data_button">이오스 <span class="txt">TRX/KRW</span></button></li>
					<li><button class="data_button">디마켓 <span class="txt">XRP/KRW</span></button></li>
				</ul>
			</div>
			//가로모드일때만 노출 -->
			<!-- 수정 -->
			<ul class="time_select">
				<li>
					<div class="minute_lst_bx">
                        <a href="javascript:;" class="btn_minute" :class="{active: propdata.ijwb == '4'}">{{caclCycleTick()}}</a>
                        <div class="minute_slide">
                            <ul class="minute_slide_lst">
                                <li><a href="#1tick" @click.prevent="propdata = {ijwb:'4', ijwbGroup:'1'}">{{ $t('html5chart.tick', [1]) }}</a></li>
                                <li><a href="#3tick" @click.prevent="propdata = {ijwb:'4', ijwbGroup:'3'}">{{ $t('html5chart.tick', [3]) }}</a></li>
                                <li><a href="#5tick" @click.prevent="propdata = {ijwb:'4', ijwbGroup:'5'}">{{ $t('html5chart.tick', [5]) }}</a></li>
                            </ul><!-- minute_slide_lst -->
                        </div><!-- minute_slide -->
                    </div><!-- minute_lst_bx -->
				</li>
				<li>
					<div class="minute_lst_bx">
                        <a href="javascript:;" class="btn_minute" :class="{active: propdata.ijwb == '5'}">{{caclCycleMin()}}</a>
                        <div class="minute_slide">
                            <ul class="minute_slide_lst">
								<li><a href="#1min" @click.prevent="propdata = {ijwb:'5', ijwbGroup:'1'}">{{ $t('html5chart.min', [1]) }}</a></li>
                                <li><a href="#3min" @click.prevent="propdata = {ijwb:'5', ijwbGroup:'3'}">{{ $t('html5chart.min', [3]) }}</a></li>
                                <li><a href="#5min" @click.prevent="propdata = {ijwb:'5', ijwbGroup:'5'}">{{ $t('html5chart.min', [5]) }}</a></li>
								<li><a href="#10min" @click.prevent="propdata = {ijwb:'5', ijwbGroup:'10'}">{{ $t('html5chart.min', [10]) }}</a></li>
								<li><a href="#30min" @click.prevent="propdata = {ijwb:'5', ijwbGroup:'30'}">{{ $t('html5chart.min', [30]) }}</a></li>
								<li><a href="#60min" @click.prevent="propdata = {ijwb:'5', ijwbGroup:'60'}">{{ $t('html5chart.min', [60]) }}</a></li>
                            </ul><!-- minute_slide_lst -->
                        </div><!-- minute_slide -->
                    </div><!-- minute_lst_bx -->
				</li>
				<li>
					<div class="minute_lst_bx">
                        <a href="javascript:;" class="btn_minute" :class="{active: propdata.ijwb == '1' || propdata.ijwb == '2' || propdata.ijwb == '3'}">{{caclCycle()}}</a>
                        <div class="minute_slide">
                            <ul class="minute_slide_lst">
                                <li><a href="#1d" @click.prevent="propdata = {ijwb:'1'}">{{ $t('html5chart.day') }}</a></li>
                                <li><a href="#1w" @click.prevent="propdata = {ijwb:'2'}">{{ $t('html5chart.week') }}</a></li>
                                <li><a href="#1m" @click.prevent="propdata = {ijwb:'3'}">{{ $t('html5chart.month') }}</a></li>
                            </ul><!-- minute_slide_lst -->
                        </div><!-- minute_slide -->
                    </div><!-- minute_lst_bx -->
				</li>
			</ul><!-- time_select -->
		</div><!-- chart_top_lft -->
		<ul class="btn_rgt_select" v-if="isShowMenu">
			<li>
				<a href="#alerm" class="btn_alerm" @click.prevent="showModalAlerm"><span class="blind">{{ $t('html5chart.alarm') }}</span></a>
			</li>
			<li>
				<a href="#DataList" class="btn_data" v-bind:class="{active:isDataList}" @click.prevent="showDataList"><span class="blind">{{ $t('html5chart.toChart') }}</span></a>
			</li>
			<li>
				<a href="#ModalSetting" class="btn_top_setting btn_top_modal" @click.prevent="showModalSetting"><span class="blind">{{ $t('html5chart.setting') }}</span></a>
			</li>
			<li>
                <a href="#analysis" class="btn_assay_tool" @click.prevent="showToolBar"><span class="blind">{{ $t('html5chart.analysis') }}</span></a>
            </li>
		</ul><!-- btn_rgt_select -->		
	</article><!-- chart_top_bx -->
	<article class="chart_area">
		<!-- <input class="input_cont_chart" type="number" v-model="propdata.icnt" @click="$emit('chart-modal-counter', propdata.icnt)" readonly/> -->
		<div class="chart_cont_bx">
			<app-chart 
				:propdata="propdata"
				@change-current-cycle="changeCurrentCycle($event)"
				:alerm-props = "alermProps"
                @send-alerm-props="$emit('send-alerm-props', $event)"
				>Chart Area</app-chart>
		</div><!-- chart_area -->		
	</article>
</section><!-- .chart_cont -->
</template>

<script>
import AppChart from '../../charts/AppChart.vue';

export default {
	components: {
        AppChart
	},
	props: ['alermProps'],
    data() {
        return {
			propdata: {
                "ijwb": '', // 주기(1:day, 2:week, 3:mon, 4:year, 5:min, 6:sec)
				"ijwbGroup": '', // 양
			},
			isDataList: false,
			isShowChart: false,
			isShowMenu: false
        }
	},	
	watch: {
		alermProps (newProps) {
            this.$emit("send-alerm-props", newProps);
		}
	},
	created: function() {
		//모바일 차트 화면 전환시 in/out이벤트 등록    
		this.$EventBus.$on('outStockGraph', () => {
            console.log("outStockGraph");
            this.hideAppChart();
        });            
        this.$EventBus.$on('inStockGraph', () => {
            console.log("inStockGraph");
            this.showAppChart();
        });
        this.$EventBus.$on('upChart', () => {
            console.log("upChart");
            this.showAppChart();
        });
        this.$EventBus.$on('downChart', () => {
            console.log("downChart");
            this.hideTimeSelect();
            this.hideAppChart();
		});
		//모바일 차트 화면 전환시 in/out이벤트 등록 end

		console.log('route', this.$route.name);
		if (this.$route.name === 'mNotificationSettingDetail' || this.$route.name === 'mSmartSignalExpert') {
			this.isShowMenu = false;
		} else {
			this.isShowMenu = true;
		}
	},
    mounted: function() {
		var _this = this;

		//차트
		var chartWRap = $('.chart_cont');
		
		//주기
		var ChartTimeSelect = chartWRap.find(".time_select");
		var ChartTimeLnk = ChartTimeSelect.find(".btn_minute");
		var ChartTimeSlide = ChartTimeSelect.find(".minute_slide");
		var ChartSubLnk = ChartTimeSlide.find("a");

		ChartTimeLnk.click(function() {
			console.log("ChartTimeLnk");
			var t = $(this);
			var TimeSlide = t.siblings(".minute_slide");
			if(TimeSlide.is(":visible")){
				TimeSlide.hide();

				//분석도구 사라지기

				//모바일 차트 - 주기 drop list 선택시 차트의 z-index 변경
				_this.showAppChart();
			} else {
				ChartTimeSlide.hide();
				TimeSlide.show();
				
				// rgtLnk.removeClass("active");				
				// assaySlide.animate({right : '-40px'}, "fast");
				// dataSlide.stop().slideUp(100);

				//분석도구 사라지기

				//모바일 차트 - 주기 drop list 선택시 차트의 z-index 변경
				_this.hideAppChart();
			}
		});

		ChartSubLnk.click(function() {
			var t = $(this);

			//상위로 올라가면서 해당하는 클래스 접기
			var subSlide = t.closest(".minute_slide");
			subSlide.hide();
		});

		//기본터치시 예외처리
		//chartWRap.addEventListener('touchstart', this.touchStartEvent);
		chartWRap.on('touchstart', this.touchStartEvent);			
			
			// ChartTimeSlide.each(function () {
			// 	if ($(this).is(":visible")) {
			// 		$(this).stop().slideUp(200);					
			// 	}
			// });
			// ChartTimeLnk.removeClass("active");
			// ChartTimeSlide.stop().slideUp(200);
			
			// if (!$(e.target).parent().parent().hasClass('minute_slide_lst')) {
			// 	ChartTimeLnk.removeClass("active");
			// 	ChartTimeSlide.stop().slideUp(200);
			// }
	},
	beforeDestroy () {
		console.log("beforeDestory ()");

		this.$EventBus.$off('outStockGraph');
        this.$EventBus.$off('inStockGraph');
        this.$EventBus.$off('upChart');
        this.$EventBus.$off('downChart');

		var chartWRap = $('.chart_cont');
		chartWRap.off('touchstart');
	},
    methods: {
		//터치이벤트시 예외처리
		touchStartEvent: function(e) {
			//console.log(e.target);
			var chartWRap = $('.chart_cont');
			if (!$(e.target).closest('.time_select').hasClass('time_select')) {
				this.hideTimeSelect();
				this.showAppChart();
			}
		},
		showAppChart: function() {
			console.log("showAppChart");

			if (this.isShowChart === false) {
				this.isShowChart = true;

				//모바일 차트 - 주기 drop list 선택시 차트의 z-index 변경
				// cordova.exec( null , null, "ChartPlugin" , "toast", ["click-cross-active"]); 				
				ChartManager.bringToFront(false);
				//모바일 차트 - 주기 drop list 선택시 차트의 z-index 변경
			}
		},
		hideAppChart: function() {
			console.log("hideAppChart");
			
			if (this.isShowChart) {
				this.isShowChart = false;

				//모바일 차트 - 주기 drop list 선택시 차트의 z-index 변경
				// cordova.exec( null , null, "ChartPlugin" , "toast", ["click-cross-remove"]);
				ChartManager.bringToFront(true);
				//모바일 차트 - 주기 drop list 선택시 차트의 z-index 변경
			}
		},
		//주기영역 닫기 / 다른버튼 선택시
		hideTimeSelect: function() {
			console.log("hideTimeSelect");

			var chartWRap = $('.chart_cont');
			var ChartTimeSelect = chartWRap.find(".time_select");
			var ChartTimeSlide = ChartTimeSelect.find(".minute_slide");
			ChartTimeSlide.hide();
		},
		showModalAlerm: function (e) {
			console.log("showModalAlerm", e);

			this.hideTimeSelect();

			//신호선알림 팝업 열기
			this.$emit('chart-modal-alerm');
		},
		//모바일 차트 알림선
		showDataList: function (e) {
			console.log("ShowDataList", e);

			var chartId = 'ChartDIV';
			this.isDataList = !this.isDataList;
			var params= [chartId, this.isDataList];
			try {
				ChartManager.setShowCrossLine(params);
			} catch(err) {
				console.error(err);
			}
		},
		//모바일 차트 설정창 (확인완료)
        showModalSetting: function (e) {
			console.log("showModalSetting", e);

			//모바일 차트
			var chartId = 'ChartDIV';
			ChartManager.openDlg([chartId, this.$parent.$el, "indicator"]);
		},
		//모바일 차트 분석툴바 (확인완료)
        showToolBar: function (e) {
			console.log("showToolBar", e);

			//모바일 차트 - 분석툴	
			// cordova.exec( null , null, "ChartPlugin" , "toast", ["tools"]); 
			var chartId = 'ChartDIV';
			ChartManager.openDlg([chartId, this.$parent.$el, "tools"]);
			//모바일 차트 - 분석툴
		},
		//사용미정
		extendSelect: function () {
			console.log("extendSelect");
			var t = $(this);
			var Li = t.closest("li");
			var LiNest = Li.next("li");

			var TimeSlide = t.siblings(".minute_slide");
			if(t.hasClass('active')){
				t.removeClass("active");
				TimeSlide.stop().slideUp(100);
				LiNest.removeClass("lst_active");
			} else {
				ChartTimeLnk.removeClass("active");
				ChartTimeSlide.stop().slideUp(100);
				t.addClass("active");
				TimeSlide.stop().slideDown(100);
				LiNest.addClass("lst_active");
				rgtLnk.removeClass("active");				
			}
		},
		changeCurrentCycle(cycle) {
			this.propdata.ijwb = cycle.ijwb;
			this.propdata.ijwbGroup = cycle.ijwbGroup;
		},
		caclCycleTick() {
			let ijwb = Number(this.propdata.ijwb);
			let ijwbGroup = Number(this.propdata.ijwbGroup);

			if (ijwb === 4) {
				return this.$t('html5chart.tick', [ijwbGroup]);
			} else {
				return this.$t('html5chart.tick', []);
			}
		},
		caclCycleMin() {
			let ijwb = Number(this.propdata.ijwb);
			let ijwbGroup = Number(this.propdata.ijwbGroup);

			if (ijwb === 5) {
				return this.$t('html5chart.min', [ijwbGroup]);
			} else {
				return this.$t('html5chart.min', []);
			}
		},
		caclCycle() {
			let ijwb = Number(this.propdata.ijwb);

			if (ijwb === 1) {
				return this.$t('html5chart.day');
			} else if (ijwb === 2) {
				return this.$t('html5chart.week');
			} else if (ijwb === 3) {
				return this.$t('html5chart.month');
			} else {
				return this.$t('html5chart.day');
			}
		}
    }
}
</script>

<style scoped>
.chart_cont *{-webkit-text-size-adjust:none;outline:none;box-sizing:border-box;letter-spacing:-0.5px;-webkit-tap-highlight-color:transparent;font-family:Roboto, 'Noto Sans KR', sans-serif;}
.chart_cont div, .chart_cont p, .chart_cont span, .chart_cont dl, .chart_cont dt, .chart_cont dd, .chart_cont ul, .chart_cont ol, .chart_cont li, .chart_cont input, .chart_cont textarea, .chart_cont button, .chart_cont select, .chart_cont section, .chart_cont article{margin:0;padding:0;word-break:break-all;}
.chart_cont button, .chart_cont a, .chart_cont label, .chart_cont input, .chart_cont textarea, .chart_cont button, .chart_cont select{text-decoration:none;-webkit-tap-highlight-color:transparent;}
.chart_cont a[href^="tel"]{font-style:normal}
.chart_cont ol, .chart_cont ul, .chart_cont dl, .chart_cont li{list-style:none}
.chart_cont img{border:0;margin:0;padding:0;}
.chart_cont img{border:0;vertical-align:top}
.chart_cont input{vertical-align:middle}
.chart_cont input[type="text"], 
.chart_cont input[type="number"], 
.chart_cont input[type="password"], 
.chart_cont input[type="date"], 
.chart_cont select,
.chart_cont textarea{-webkit-appearance:none;border-radius:0;padding:0;margin:0;border:none;border:none;}
.chart_cont select, 
.chart_cont button{-webkit-appearance:menulist-text;border-radius:0;padding:0;margin:0;border:none;appearance:none;background:#fff;-webkit-appearance:none;-moz-appearance:none;-webkit-appearance:listbox;background-color:transparent;}
.chart_fixed{position:fixed;left:0;top:0;width:100%;height:100%;}

/** switch radio **/
.chart_cont{width:auto;overflow:hidden;height:100%;}
.chart_cont .switch{position: relative;display:inline-block;width:42px;height:23px;}
.chart_cont .switch input{opacity: 0;width:0;height:0;}
.chart_cont .slider{position: absolute;cursor: pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;-webkit-transition:.4s;transition:.4s;}
.chart_cont .slider:before{position: absolute;content: "";height: 17px;width:17px;left:4px;bottom:3px;background-color:white;-webkit-transition:.4s;transition:.4s;}
.chart_cont input:checked + .slider{background-color: #113fa0;}
.chart_cont input:focus + .slider{box-shadow: 0 0 1px #113fa0;}
.chart_cont input:checked + .slider:before{-webkit-transform: translateX(17px);-ms-transform: translateX(17px);transform: translateX(17px);}
.chart_cont .slider.round{border-radius: 34px;}
.chart_cont .slider.round:before{border-radius: 50%;}

/** form **/
.chart_cont .minute_lst_bx{float:left;width:45px;position:relative;}
.chart_cont .minute_lst_bx .btn_minute{display:block;height:30px;width:100%;font-size:12px;color:#000;text-align:center;line-height:28px;border:1px solid #e0e0e0;}
.chart_cont .minute_lst_bx .btn_minute.active{background:#7b818d;color:#fff;transition:all 0.4s;border:1px solid #7b818d;}
.chart_cont .minute_lst_bx .minute_slide{display:none;position:absolute;left:0;top:30px;z-index:10;width:46px;}
.chart_cont .minute_lst_bx .minute_slide_lst a{display:block;height:28px;line-height:26px;color:#ffffff;border-bottom: 1px solid #ddd;border-right: 1px solid #ddd;border-left: 1px solid #ddd;background:#fff;text-align:center;font-size:12px;color:#555;}
.chart_cont .minute_slide_lst a:active{background:#7b818d;color:#fff;transition:all 0.4s;}

/** chart **/
.chart_cont .blind {overflow:hidden;visibility:hidden;position:absolute;width:0;height:0;font-size:0;line-height:0;}
.chart_cont .chart_select{display:inline-block;background:#fff;height:50px;border:1px solid black;width:50px;}
.chart_cont .chart_top_bx{padding:5px 7px 7px;width:auto;height:42px;background:#fff;}
.chart_cont.landscape .chart_top_bx{padding:5px 7px 7px 0;}
.chart_cont .chart_top_bx:before{display:block;content:"";clear:both;}
.chart_cont .chart_top_bx .chart_top_lft{float:left;position:relative;height:30px;}
.chart_cont .chart_top_bx .chart_top_lft .select_ui{float:left;margin:0 15px 0 0;display:none;}
.chart_cont.landscape .chart_top_bx .chart_top_lft .select_ui{display:block;}
.chart_cont .chart_top_bx .chart_top_lft:before{content:"";clear:both;display:block;}
.chart_cont .chart_top_bx .time_select{float:left;}
.chart_cont .chart_top_bx .time_select > li{float:left;}
.chart_cont .chart_top_bx .time_select > li .btn_minute{border-right:none;}
.chart_cont .chart_top_bx .time_select > li:last-child .btn_minute{border-right:1px solid #e0e0e0;}
.chart_cont .chart_top_bx .time_select > li:last-child .minute_slide{width:45px;}
.chart_cont .chart_top_bx .time_select > li.lst_active .minute_lst_bx > a{border-left:1px solid #7b818d}
.chart_cont .chart_top_bx .time_select > li:last-child .minute_lst_bx > a.active{border-right:1px solid #7b818d}
.chart_cont .chart_top_bx .btn_rgt_select *{vertical-align:top;}
.chart_cont .chart_top_bx .btn_rgt_select{float:right;position:relative;}
.chart_cont .chart_top_bx .btn_rgt_select:before{display:block;content:"";clear:both;}
.chart_cont .chart_top_bx .btn_rgt_select > li{float:left;}
.chart_cont .chart_top_bx .btn_rgt_select > li.next_active a{border-left:1px solid #fff;}
.chart_cont .chart_top_bx .btn_rgt_select > li > a{position:relative;display:inline-block;height:30px;color:#000;width:40px;border:1px solid #e0e0e0;border-right:1px solid #fff;}
.chart_cont .chart_top_bx .btn_rgt_select > li > a:before{position:absolute;content:"";margin:4px 6px; width:28px;height:22px;}
.chart_cont .chart_top_bx .btn_rgt_select > li > a.btn_data:before{background:url("../../../images/m_chart_btm_data.png") no-repeat left top;background-size:26px;}
.chart_cont .chart_top_bx .btn_rgt_select > li > a.btn_data.active:before{background:url("../../../images/m_chart_btm_data_on.png") no-repeat left top;background-size:26px;}
.chart_cont .chart_top_bx .btn_rgt_select > li > a.btn_chat_type:before{background:url("../../../images/m_chart_btn_chattype.png") no-repeat left top;background-size:26px;}
.chart_cont .chart_top_bx .btn_rgt_select > li > a.btn_chat_type.active:before{background:url("../../../images/m_chart_btn_chattype_on.png") no-repeat left top;background-size:26px;}
.chart_cont .chart_top_bx .btn_rgt_select > li > a.btn_top_setting:before{background:url("../../../images/m_chart_btn_setting.png") no-repeat left top;background-size:26px;}
.chart_cont .chart_top_bx .btn_rgt_select > li > a.btn_top_setting.active:before{background:url("../../../images/m_chart_btn_setting_on.png") no-repeat left top;background-size:26px;}
.chart_cont .chart_top_bx .btn_rgt_select > li > a.btn_assay_tool:before{background:url("../../../images/m_chart_btn_assay.png") no-repeat left top;background-size:23px;}
.chart_cont .chart_top_bx .btn_rgt_select > li > a.btn_assay_tool.active:before{background:url("../../../images/m_chart_btn_assay_on.png") no-repeat left top;background-size:23px;}
.chart_cont .chart_top_bx .btn_rgt_select > li:last-child a{border-right:1px solid #e0e0e0;}
.chart_cont .chart_top_bx .btn_rgt_select > li > a.active{background:#e3e7ff;color:#fff;border:1px solid #3f51b5;}
.chart_cont .chart_top_bx .btn_rgt_select > li > a.btn_alerm.active{color:#000;}
.chart_cont .chart_top_bx .btn_rgt_select > li > a.btn_alerm:before{background:url("../../../images/m_chart_btm_alertm.png") no-repeat left top;background-size:26px;}
.chart_cont .chart_top_bx .btn_rgt_select > li > a.btn_alerm.active:before{background:url("../../../images/m_chart_btm_alertm_on.png") no-repeat left top;background-size:26px;}
.chart_cont .chart_top_bx .btn_rgt_select .chart_data_slide{display:none;position:absolute;left:-40px;;top:42px;width:165px;z-index:50;}
.chart_cont .chart_top_bx .btn_rgt_select .chart_data_slide .chart_data_lst > li .tit{display:inline-block;padding:0 0 0 10px;width:100%;line-height:23px;color:#fff;height:25px;font-size:13px;background:#212121;font-weight:normal;}
.chart_cont .chart_top_bx .btn_rgt_select .chart_data_slide .data_lst{padding:3px 0 5px;background:rgba(33, 33, 33, 0.85);}
.chart_cont .chart_top_bx .btn_rgt_select .chart_data_slide .data_lst > li{padding:0 0 0 10px;margin:3px 0 0;overflow:hidden;}
.chart_cont .chart_top_bx .btn_rgt_select .chart_data_slide .data_lst > li:first-child{margin:0;}
.chart_cont .chart_top_bx .btn_rgt_select .chart_data_slide .data_lst .lft_txt{float:left;display:inline-block;font-size:12px;line-height:14px;color:#fff;}
.chart_cont .chart_top_bx .btn_rgt_select .chart_data_slide .data_lst .rgt_txt{float:right;padding:0 10px 0 0;display:inline-block;font-size:12px;line-height:14px;color:#fff;}
.chart_cont .chart_top_bx .btn_rgt_select .chart_data_slide .data_lst .rgt_txt.minus{color:#eb1e1e;}
.chart_cont .chart_top_bx .btn_rgt_select .chart_data_slide .data_lst .rgt_txt.plus{color:#267dff;}	

.chart_cont .chart_area{width:auto;position:relative;}
.chart_cont .chart_area input{position:absolute;right:0;top:0;z-index:50;width:40px;height:30px;line-height:30px;text-align:center;border:1px solid #ddd;font-size:12px;color:#777;}
.chart_cont .bg_modal{position:fixed;left:0;top:0;width:100%;height:100%;z-index:99;}
.chart_cont .color-box{width:30px;height:30px;margin:5px;border: 1px solid white;}
.chart_cont .colpick{z-index:10;}
.chart_cont .chart_area{height:calc(100% - 42px);}
.chart_cont .chart_area .chart_cont_bx{height:calc(100%);}

.chart_cont .alerm_cont_slide{position:absolute;right:-200px;top:30px;overflow-y:auto;padding:15px;width:185px;height:500px;border:1px solid #ddd;z-index:100;background:#fff;}
.chart_cont .alerm_cont_slide .alerm_cont_lst > li{overflow:hidden;width:auto;margin:10px 0 0;}
.chart_cont .alerm_cont_slide .alerm_cont_lst > li:first-child{margin:0;}
.chart_cont .alerm_cont_slide .alerm_cont_lst > li .tit{float:left;height:23px;font-size:15px;color:#333;line-height:21px;height:23px;font-weight:normal;}
.chart_cont .alerm_cont_slide .alerm_cont_lst > li .switch{float:right;}
.chart_cont .alerm_cont_slide .alerm_cont_lst .tit01{padding:0 0 14px;display:block;font-size:15px;color:#333;line-height:18px;font-weight:normal;}
.chart_cont .alerm_cont_slide .alerm_cont_lst .alerm_cont_lst{padding:0 0 0 27px;}
</style>