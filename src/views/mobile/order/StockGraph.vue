<template>
  <section class="chart_cont">
    <article class="chart_top_bx" v-if="!isDepthChart">
      <div class="chart_top_lft">
        <ul class="time_select">
          <li v-for="(cycle, index) in cycleProps">
            <div class="minute_lst_bx">
              <template v-if="index === 0 || nOuterWidth < 400">
                <a
                  href="#"
                  class="btn_minute"
                  :class="{active: cycle.cycle.indexOf(currentCycle.cycle) > -1}"
                  @click.prevent.stop="clickMinuteBtn(index)"
                >{{ cycle.cycle.indexOf(currentCycle.cycle) > -1 ? getCycleI18n(currentCycle) : $t(findCycleI18n(cycle.cycle[0]), []) }}</a>
                <transition name="minute_slide">
                <div v-if="nSlideMinute === index" class="minute_slide">
                  <ul class="minute_slide_lst">
                    <li v-for="item in cycle.list">
                      <a href="#" @click.prevent.stop="changeCycle(item)">{{ getCycleI18n(item) }}</a>
                    </li>
                  </ul>
                </div>
                </transition>
              </template>
              <template v-else>
                <ul class="minute_hori_lst">
                  <li v-for="item in cycle.list">
                    <a href="#"
                      class="btn_minute"
                      :class="{active: item.cycle === currentCycle.cycle}" 
                      @click.prevent.stop="changeCycle(item)">{{ getCycleI18n(item) }}</a>
                  </li>
                </ul>
              </template>
            </div>
          </li>
        </ul>
        <!-- time_select -->
      </div>
      <!-- chart_top_lft -->
      <ul class="btn_rgt_select">
        <li v-for="(item, index) in menuBtnLst" v-if="item.isVisible">
          <a
            href="#"
            :class="[item.clazz, {active:item.isActive}]"
            @touchstart="item.isActive=true"
            @click.prevent="clickMenuBtn(item)"
          >
            <span class="blind">{{$t('html5chart.' + item.text)}}</span>
          </a>
        </li>
      </ul>
      <!-- btn_rgt_select -->
    </article>
    <!-- chart_top_bx -->
    <article :class="['chart_area', {depth_chart: isDepthChart}]">
      <!--
		<input class="input_cont_chart" type="number" v-model="propdata.icnt" @click="$emit('chart-modal-counter', propdata.icnt)" readonly/>
      -->      
      <div class="chart_cont_bx">
        <exchange-chart
          ref="chart"
          v-if="!isDepthChart"
          :propdata.sync="currentCycle"
          @init-menu-btn="initMenuBtn($event)"
          @toggle-setting-btn="toggleSettingBtn($event)"
          @orientation-change="$emit('orientation-change');"
        >차트영역</exchange-chart>
        <depth-chart v-else-if="isDepthChart"></depth-chart>
      </div>
      <transition name="sidebar_bx">
        <aside v-if="isSlideSidebar" class="sidebar_bx">
          <ul class="sidebar_menu">
            <li v-for="menu in sidebarMenuLst" :class="[menu.clazz, {active: menu.isActive}]">
              <a href="#" @touchstart="menu.isActive=true" @click.prevent="clickSidebarMenu(menu)">{{$t('html5chart.' + menu.text)}}</a>
            </li>
          </ul>
          <!-- sidebar_menu -->
        </aside>
      </transition>
      <!-- sidebar_bx -->
      <!-- chart_area -->
    </article>
  </section>
  <!-- .chart_cont -->
</template>

<script>
import ExchangeChart from "../../charts/ExchangeChart.vue";
import DepthChart from '../../charts/DepthChart';

export default {
  components: {
    ExchangeChart,
    DepthChart
  },
  props: {
    // 깊이차트 여부
    isDepthChart: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    const sidebarMenuLst = [];
    // 차트 초기화
    sidebarMenuLst.push({ text: 'resetchart', clazz: 'lst01', isActive: false });

    // 그리기 툴
    let UsableTools = Tools.reduce((sum, {depth}) => {
        return sum.concat(depth.filter((p) => {
          return p.use;
        }))
      }, []);

    UsableTools.forEach(({label, type, mclazz}) => {
      sidebarMenuLst.push({ text: label, clazz: mclazz, isActive: false, type: type });
    });
    
    // 지우개
    sidebarMenuLst.push({ text: 'eraser', clazz: 'lst02', isActive: false });
    // 분석툴초기화
    sidebarMenuLst.push({ text: 'resettool', clazz: 'lst03', isActive: false });
    // 분석툴 연속 그리기
    // sidebarMenuLst.push({ text: 'resettool', clazz: 'lst17', isActive: false });
      
    return {
      cycleProps: [
        {
          cycle: [5],
          list: [
            { cycle: 5, interval: 1},
            { cycle: 5, interval: 3},
            { cycle: 5, interval: 5},
            { cycle: 5, interval: 10},
            { cycle: 5, interval: 15},
            { cycle: 5, interval: 30},
            { cycle: 5, interval: 60},
          ]
        },
        {
          cycle: [1, 2, 3],
          list: [
            { cycle: 1, interval: 1},
            { cycle: 2, interval: 1},
            { cycle: 3, interval: 1},
          ]
        }
      ],
      menuBtnLst: [
        { text: "alarm", clazz: "btn_alerm", isActive: false, isVisible: true },
        { text: "showdata", clazz: "btn_data", isActive: false, isVisible: true },
        { text: "typenindsetting", clazz: "btn_chat_type btn_top_modal", isActive: false, isVisible: true },
        { text: "setting", clazz: "btn_top_setting btn_top_modal", isActive: false, isVisible: true },
        { text: "analysis", clazz: "btn_assay_tool", isActive: false, isVisible: true }
      ],
      sidebarMenuLst: sidebarMenuLst,
      currentCycle: {
        cycle: 1, // 주기(1:day, 2:week, 3:mon, 4:year, 5:min, 6:sec)
        interval: 1 // 양
      },
      nSlideMinute: false,
      isDrawCrossLine: false,
      isSlideSidebar: false,
      isEraseTool: false,
      nOuterWidth: window.outerWidth
    };
  },
  mounted: function() {
    const self = this,
      chartCont = $(".chart_cont");    

    var chartSideBx = chartCont.find(".sidebar_bx");
    var chartSideBar = chartSideBx.find(".sidebar_menu");

    chartSideBar.find("> li > a").click(function() {
      var SideLi = $(this).closest("li");
      chartSideBar.find("li").removeClass("active");
      SideLi.addClass("active");
    });

    // 차트영역 외 클릭시 팝업창 닫기
    $(document).on("touchstart.hideActiveMenu", function(e) {
      const $target = $(e.target);

      if (
        $target.hasClass("chart_top_bx") ||
        $target.parents(".header-wrapper").length > 0 ||
        $target.parents(".stock-display").length > 0 ||
        $target.parents(".el-tabs__header").length > 0 ||
        $target.parents(".chart_top_bx").length > 0
      ) {
        $("#chart-popup-wrapper").empty();
      }

      if (
        $target.parents("#chart-popup-wrapper").length > 0 ||
        $target.parents(".chart_top_lft").length > 0 ||
        $target.parents(".btn_rgt_select").length > 0 ||
        $target.parents(".sidebar_bx").length > 0
      ) {
        return;
      }

      // 주기 숨김
      self.nSlideMinute = null;

      // 사이드바 숨김
      self.hideSidebarMenu();
    });

    $(window).resize(function() {
      chartCont.find(".sidebar_bx").css("height", chartCont.height() + 15);
      self.nOuterWidth = window.outerWidth;
    });
  },
  methods: {
    findCycleI18n (cycle) {
      let text = 'min'
      switch (cycle) {
        case 1:
          text = 'day'
          break
        case 2:
          text = 'week'
          break
        case 3:
          text = 'month'
          break
        case 4:
          text = 'year'
          break
        default:
          break
      }
      return `html5chart.${text}`
    },
    getCycleI18n ({cycle, interval}){
      return this.$t(this.findCycleI18n(cycle), [interval])
    },
    changeCycle(item) {
      this.nSlideMinute = null;
      this.$refs.chart.BeforeRequestChart(false, item)
    },
    clickMinuteBtn(index) {
      // 사이드바 숨김
      this.hideSidebarMenu();

      if (this.nSlideMinute === index) {
        this.nSlideMinute = null;
      } else {
        this.nSlideMinute = index;
      }
    },
    initMenuBtn(item) {
      this.menuBtnLst.forEach((menu, i) => {
        if (menu.text === item.text) {
          menu.isActive = item.isActive;

          switch (item.text) {
            // 십자선 수치조회
            case 'showdata' :
              this.isDrawCrossLine = item.isActive;
              break;
          }
        } else {
          menu.isActive = false;
        }
      });
    },
    toggleSettingBtn(t) {
      this.menuBtnLst.forEach((menu, i) => {
        if (menu.text === 'setting') {
          menu.isVisible = t;
        }
      });
    },
    clickMenuBtn(item, flag) {      
      // 주기영역 숨김
      this.nSlideMinute = null;

      switch (item.text) {
        case 'alarm':
          item.isActive = false;
          let alermProps = this.$refs.chart.getAlermProp();
          if (alermProps) {
            this.$emit('show-alerm', alermProps);
          }            
          break;
        case 'showdata':
          this.isDrawCrossLine = !this.isDrawCrossLine;
          item.isActive = this.isDrawCrossLine;
          this.$refs.chart.toggleCrossLine(this.isDrawCrossLine);            
          break;
        case 'typenindsetting':
          item.isActive = false;
          this.$refs.chart.showTypePopup();
          break;
        case 'setting':
          item.isActive = false;
          this.$refs.chart.showSettingPopup();
          break;
        case 'analysis':
          if (flag !== undefined) {
            this.isSlideSidebar = flag;
          } else {
            this.isSlideSidebar = !this.isSlideSidebar;
          }
          item.isActive = this.isSlideSidebar;
          break;
        default:
          item.isActive = false;
          this.isSlideSidebar = false;
      }
    },
    clickSidebarMenu(menu, flag) {
      switch (menu.text) {
        // 차트 초기화
        case 'resetchart':
          menu.isActive = false;
          this.$refs.chart.doChartReset();
          break;
        // 지우개
        case 'eraser':
          if (flag !== undefined) {
            this.isEraseTool = flag;
          } else {
            this.isEraseTool = !this.isEraseTool;
          }
          menu.isActive = this.isEraseTool;
          this.$refs.chart.selectDrawTool();
          this.$refs.chart.toggleEraseTool(this.isEraseTool);
          break;
        // 분석툴초기화
        case 'resettool':
          menu.isActive = false;
          this.$refs.chart.doToolReset();
          break;
        // 그리기 툴
        default:
          menu.isActive = false;
          // 지우개툴 취소
          const filtered = this.sidebarMenuLst.filter(({text}) => text === 'eraser');
          this.clickSidebarMenu(filtered[0], false);
          this.$refs.chart.unselectTool();
          this.$refs.chart.selectDrawTool(menu.type)
      }
    },
    hideSidebarMenu() {
      const filtered = this.menuBtnLst.filter(({text}) => text === 'analysis');
      this.clickMenuBtn(filtered[0], false);
    }
  },
  beforeDestory () {
    // 이벤트 삭제
    $(document).off('.hideActiveMenu');
  }
};
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
.chart_cont .minute_lst_bx .minute_slide{position:absolute;left:0;top:30px;z-index:10;width:46px;}
.chart_cont .minute_lst_bx .minute_slide_lst a{display:block;height:28px;line-height:26px;color:#ffffff;border-bottom: 1px solid #ddd;border-right: 1px solid #ddd;border-left: 1px solid #ddd;background:#fff;text-align:center;font-size:12px;color:#555;}
.chart_cont .minute_slide_lst a:active{background:#7b818d;color:#fff;transition:all 0.4s;}
.minute_slide-enter-active {transition: all .2s ease;}
.minute_slide-enter, .sidebar_bx-leave {transform: translateY(-10px);opacity: 0;}
.chart_cont .minute_hori_lst{width:135px;}
.chart_cont .minute_lst_bx .minute_hori_lst .btn_minute{float:left;width:45px;border-left: none;}
.chart_cont .minute_lst_bx .minute_hori_lst li:nth-child(1) .btn_minute{border-left: 1px solid #ddd;}

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
.chart_cont .chart_area input{position:absolute;right:0;top:1px;z-index:50;width:40px;height:30px;line-height:30px;text-align:center;border:1px solid #ddd;font-size:12px;color:#777;}
.chart_cont .sidebar_bx{position:absolute;right:7px;top:-10px !important;width:40px;height:100%;z-index:100;background:#7b818d;overflow-y:auto;}
.chart_cont .sidebar_bx .sidebar_menu > li{position:relative;}
.chart_cont .sidebar_bx .sidebar_menu > li > a{display:block;position:relative;overflow:hidden;text-indent:-9999px;width:100%;height:40px;;font-size:12px;color:#fff;text-align:center;}
.chart_cont .sidebar_bx .sidebar_menu .side_depth01{position:absolute;right:37px;top:0;width:37px;width:50px;background:#cfcfcf;z-index:90;transform:scaleX(0);transform-origin:right;transition:all 0.1S;}
.chart_cont .sidebar_bx .sidebar_menu > li > a.active + .side_depth01{transform:scaleX(1);}
.chart_cont .sidebar_bx .sidebar_menu > li > a:before{position:absolute;left:50%;top:50%;content:"";}
.chart_cont .sidebar_bx .sidebar_menu > li.lst01 > a:before{margin:-8.5px 0 0 -10px;width:20px;height:17px;background:url("../../../images/m_chart_side01.png") no-repeat center;background-size:20px 17px;}
.chart_cont .sidebar_bx .sidebar_menu > li.lst02 > a:before{margin:-10px 0 0 -10px;width:20px;height:20px;background:url("../../../images/m_chart_side02.png") no-repeat center;background-size:20px;}
.chart_cont .sidebar_bx .sidebar_menu > li.lst03 > a:before{margin:-10px 0 0 -10px;width:20px;height:20px;background:url("../../../images/m_chart_side03.png") no-repeat center;background-size:20px;}
.chart_cont .sidebar_bx .sidebar_menu > li.lst04 > a:before{margin:-9px 0 0 -9px;width:18px;height:18px;background:url("../../../images/m_chart_side04.png") no-repeat center;background-size:18px;}
.chart_cont .sidebar_bx .sidebar_menu > li.lst05 > a:before{margin:-10px 0 0 -10px;width:20px;height:20px;background:url("../../../images/m_chart_side05.png") no-repeat center;background-size:20px;}
.chart_cont .sidebar_bx .sidebar_menu > li.lst06 > a:before{margin:-1px 0 0 -10px;width:20px;height:2px;background:url("../../../images/m_chart_side06.png") no-repeat center;background-size:20px 2px;}
.chart_cont .sidebar_bx .sidebar_menu > li.lst07 > a:before{margin:-10px 0 0 -1px;width:2px;height:20px;background:url("../../../images/m_chart_side07.png") no-repeat center;background-size:2px 20px;}
.chart_cont .sidebar_bx .sidebar_menu > li.lst08 > a:before{margin:-10px 0 0 -10px;width:20px;height:20px;background:url("../../../images/m_chart_side08.png") no-repeat center;background-size:20px;}
.chart_cont .sidebar_bx .sidebar_menu > li.lst09 > a:before{margin:-10px 0 0 -10px;width:20px;height:20px;background:url("../../../images/m_chart_side09.png") no-repeat center;background-size:20px;}
.chart_cont .sidebar_bx .sidebar_menu > li.lst10 > a:before{margin:-10px 0 0 -10px;width:20px;height:20px;background:url("../../../images/m_chart_side10.png") no-repeat center;background-size:20px;}
.chart_cont .sidebar_bx .sidebar_menu > li.lst11 > a:before{margin:-10px 0 0 -10px;width:20px;height:20px;background:url("../../../images/m_chart_side11.png") no-repeat center;background-size:20px;}
.chart_cont .sidebar_bx .sidebar_menu > li.lst12 > a:before{margin:-10px 0 0 -10px;width:20px;height:20px;background:url("../../../images/m_chart_side12.png") no-repeat center;background-size:20px;}
.chart_cont .sidebar_bx .sidebar_menu > li.lst13 > a:before{margin:-10px 0 0 -10px;width:20px;height:20px;background:url("../../../images/m_chart_side13.png") no-repeat center;background-size:20px;}
.chart_cont .sidebar_bx .sidebar_menu > li.lst14 > a:before{margin:-10px 0 0 -10px;width:20px;height:20px;background:url("../../../images/m_chart_side14.png") no-repeat center;background-size:20px;}
.chart_cont .sidebar_bx .sidebar_menu > li.lst15 > a:before{margin:-10px 0 0 -10px;width:20px;height:20px;background:url("../../../images/m_chart_side15.png") no-repeat center;background-size:20px;}
.chart_cont .sidebar_bx .sidebar_menu > li.lst16 > a:before{margin:-10px 0 0 -10px;width:20px;height:20px;background:url("../../../images/m_chart_side16.png") no-repeat center;background-size:20px;}
.chart_cont .sidebar_bx .sidebar_menu > li.lst17 > a:before{margin:-10px 0 0 -10px;width:20px;height:20px;background:url("../../../images/m_chart_side17.png") no-repeat center;background-size:20px;}
.chart_cont .sidebar_bx .sidebar_menu > li.active a{background-color:#525772;}
.sidebar_bx-enter-active {transition: all .1s ease;}
.sidebar_bx-enter, .sidebar_bx-leave {transform: translateX(10px);opacity: 0;}
.chart_cont .bg_modal{position:fixed;left:0;top:0;width:100%;height:100%;z-index:99;}
.chart_cont .color-box{width:30px;height:30px;margin:5px;border: 1px solid white;}
.chart_cont .colpick{z-index:10;}
.chart_cont .chart_area .chart_cont_bx{height:100%;}

.chart_cont .alerm_cont_slide{position:absolute;right:-200px;top:30px;overflow-y:auto;padding:15px;width:185px;height:500px;border:1px solid #ddd;z-index:100;background:#fff;}
.chart_cont .alerm_cont_slide .alerm_cont_lst > li{overflow:hidden;width:auto;margin:10px 0 0;}
.chart_cont .alerm_cont_slide .alerm_cont_lst > li:first-child{margin:0;}
.chart_cont .alerm_cont_slide .alerm_cont_lst > li .tit{float:left;height:23px;font-size:15px;color:#333;line-height:21px;height:23px;font-weight:normal;}
.chart_cont .alerm_cont_slide .alerm_cont_lst > li .switch{float:right;}
.chart_cont .alerm_cont_slide .alerm_cont_lst .tit01{padding:0 0 14px;display:block;font-size:15px;color:#333;line-height:18px;font-weight:normal;}
.chart_cont .alerm_cont_slide .alerm_cont_lst .alerm_cont_lst{padding:0 0 0 27px;}
</style>