<template>
  <section class="chart_cont">
    <article class="chart_top_bx">
      <div class="cicle_lft" v-if="!isDepthChart">
        <div class="cicle_lft_lst">
          <el-radio-group v-model="cycleValue" size="mini" @change="changeCycle">
            <el-radio-button v-for="(item, index) in cycleLftLst"
                             :key="index"
                             :label="item.cycle + '@' + item.interval">
              {{ getCycleI18n(item) }}
            </el-radio-button>
          </el-radio-group>
          <el-input-number v-model="currentCycleInput"
                           controls-position="right"
                           size="mini"
                           :min="1" :max="999"
                           :disabled="currentCycle.cycle !== 5"
                           @change="changeCycleInput"/>
          <span class="text">{{ $t(findCycleI18n(currentCycle.cycle), []) }}</span>
          <el-select v-model="cycleValue" size="mini" popper-class="chart-select" @change="changeCycle">
            <el-option-group v-for="(group, index) in defaultCycles"
                             :key="index"
                             :label="group.label">
              <el-option v-for="item in group.items"
                         :key="item.cycle + '@' + item.interval"
                         :label="item.interval"
                         :value="item.cycle + '@' + item.interval">
                <span>{{ getCycleI18n(item) }}</span>
              </el-option>
            </el-option-group>
            <el-option-group>
            <el-option :value="cycleValue" :label="cycleValue">
              <el-button size="mini" type="info" @click="isSettingCycle = true">{{ $t('html5chart.setting') }}
              </el-button>
            </el-option>
            </el-option-group>
          </el-select>
        </div>
      </div><!-- cicle_lft -->
      <a href="#normalChart" class="chart_type01_lft" v-if="isDepthChart" @click.prevent="clickRightMenu(menuBtnLst[1])">
        <!-- 차트로 돌아가기 -->{{$t('html5chart.back2chart')}}
      </a>
      <ul class="signal_rgt" v-if="isShowRightMenu">
        <li v-for="(item, index) in menuBtnLst"
          v-if="item.text !== 'max' || (item.text === 'max' && isShowFullscreen)"
          :class="{active:item.isActive}">
          <a :href="item.href" :class="[item.clazz, {active:item.isActive}]"
             v-if="(isDepthChart && item.useDepthChart) || !isDepthChart"
             @mousedown="item.isActive=true"
             @click.prevent="clickRightMenu(item)"><span class="blind">{{$t('html5chart.'+item.text)}}</span></a>
        </li>
      </ul><!-- signal_rgt -->
    </article><!-- chart_top_bx -->
    <article class="chart_bx">      
      <div class="chart_area">
        <exchange-chart ref="chart"
                        v-if="!isDepthChart"
                        :propdata.sync="currentCycle"
                        :utc-prop="utcProp"
                        @init-sidebar-menu="initSidebarMenu($event)"
                        :is-cycle-settings.sync="isSettingCycle"
                        :is-show-bottom-menu="isShowBottomMenu"
                        :is-log.sync="isLog"
                        :is-invert.sync="isInvert"
                        :is-slide-bottom-menu.sync="isSlideBottomMenu"
                        @change-cycle-settings="items => this.cycleLftLst = items"
                        @change-depth-chart="clickRightMenu(menuBtnLst[1])"
        ><!-- 차트영역 -->{{$t('html5chart.chartarea')}}
        </exchange-chart>
        <depth-chart v-else-if="isDepthChart"></depth-chart>
      </div><!-- chart_area -->

      <transition name="sidebar_bx">
      <aside v-if="isSlideSidebar" class="sidebar_bx">
        <div class="sidebar_menu_bx">
          <el-scrollbar wrap-class="scrollbar-wrapper" :native="false" id="sidebar_scroll">
            <ul class="sidebar_menu">
              <li v-for="item in sidebarMenu"
                  :class="[item.clazz, {active: item.isActive, depth02_li: item.depthClazz}]">
                <a :href="'#'+item.href" @mousedown="item.isActive=!item.isActive" @click.prevent="clickSidebarMenu($event, item)"
                   @mouseover="showTooltip($event)" @mouseleave="hideTooltip()">
                  <span class="blind">{{$t('html5chart.'+item.text)}}</span>
                </a>
              </li>
            </ul><!-- sidebar_menu -->
          </el-scrollbar>
        </div>
        <div class="toltip" v-if="tooltip.isShow" :style="tooltip.style">{{tooltip.text}}</div>

        <transition name="depth02_lst">
        <ul v-if="depthLst.isShow" :class="['depth02_lst', depthLst.clazz]" :style="depthLst.style">
          <li v-for="(item, index) in depthLst.list">
            <a href="#" @click.prevent="clickSidebarDepthMenu(item.type)">
              {{$t('html5chart.' + item.label)}}</a>
          </li>
        </ul>
        </transition>
      </aside>
      </transition>
    </article><!-- chart_bx -->

    <transition name="chart_btm_area">
    <article v-if="isSlideBottomMenu" class="chart_btm_area">
      <el-radio-group v-model="cycleValue" @change="changeBtmOptions" size="mini" class="time_lst">
        <el-radio-button v-for="(item, index) in btmTimeLst"
                         :key="index"
                         :label="item.cycle + '@' + item.interval">
          {{ $t('html5chart.' + item.view + item.text)}}
        </el-radio-button>
      </el-radio-group>

      <ul class="btn_rgt">
        <li><a href="#+9" class="btn_universal_time" @click.prevent.stop="$emit('show-universal-time'), clickRightMenu()" ref="time"></a></li>

        <li><a href="#log" :class="{active: isLog}"
               @click.prevent.stop="isLog = !isLog, $refs.chart.toggleLog(isLog)"><!-- 로그 -->
          {{$t('html5chart.log')}}</a>
        </li>

        <li><a href="#invert" :class="{active: isInvert}"
               @click.prevent.stop="isInvert = !isInvert, $refs.chart.toggleInvert(isInvert)"><!-- 뒤집기 -->
          {{$t('html5chart.invert')}}</a>
        </li>
        <!--
                    <li class="setting_lst">
                        <a href="#" :class="['btn_btm_setting', {active: isBtmSetting}]" @click.prevent="isBtmSetting = !isBtmSetting, clickRightMenu()">설정</a>
                        <div class="chart_btm_setting" id="btn_btm_setting" @mouseleave="isBtmSetting = false">
                            <ul class="chart_btm_lst">
                                <li>
                                    <a href="#" class="btn_lnk" @click.prevent="isBtmSetting = false">빠른 주기</a>
                                </li>
                                <li>
                                    <a href="#" class="btn_lnk" @click.prevent="$emit('show-past-view'), isBtmSetting = false">과거 시점 이동</a>
                                </li>
                                <li>
                                    <a href="#" class="btn_lnk" @click.prevent="$emit('show-universal-time'), isBtmSetting = false">세계시간</a>
                                </li>
                                <li>
                                    <a href="#" class="btn_lnk" @click.prevent="isBtmSetting = false">빠른 Y축 눈금 설정</a>
                                </li>
                            </ul>
                        </div>
                    </li>
        -->
      </ul><!-- btn_rgt -->
    </article><!-- chart_btm_area -->
    </transition>
  </section><!-- chart_cont -->
</template>

<script>
  import ExchangeChart from '../charts/ExchangeChart.vue'
  import DepthChart from '../charts/DepthChart.vue'

  export default {
    components: {
      ExchangeChart,
      DepthChart,
    },
    props: {
      utcProp: Object,
      // 상단 우측 메뉴 표시 여부
      isShowRightMenu: {
        type: Boolean,
        default(){
          return true
        }
      },
      // 하단 메뉴 표시 여부
      isShowBottomMenu: {
        type: Boolean,
        default(){
          return true
        }
      },
      // 풀스크린 표시 여부
      isShowFullscreen: {
        type: Boolean,
        default(){
          return true
        }
      }
    },
    data () {
      // 그리기 도구
      const UsableTools = [];
      Tools.forEach(({label, use, depth}) => {
        if (use) {
          UsableTools.push({
            "label": label,
            "depth": depth.filter((p) => { return p.use; })
          });
        }
      });

      return {
        // 주기
        currentCycle: {
          cycle: 5,
          interval: 1
        },
        // 주기 input change 이벤트
        cycleInterval: null,
        currentCycleInput: 1,
        // 상단 > 주기
        cycleLftLst: [],
        // 상단 > 주기 > select
        defaultCycles: [
          {
            label: null,
            items: [
              { cycle: 1, interval: 1},
              { cycle: 2, interval: 1},
              { cycle: 3, interval: 1},
            ],
          },
          {
            label: null,
            items: [
              { cycle: 5, interval: 1},
              { cycle: 5, interval: 3},
              { cycle: 5, interval: 5},
              { cycle: 5, interval: 10},
              { cycle: 5, interval: 15},
              { cycle: 5, interval: 30},
              { cycle: 5, interval: 60},
            ],
          },
        ],
        // 하단 > 주기
        btmTimeLst: [
          { text: 'day', view: 1, cycle: 5, interval: 1, icnt: 1440 },       //주기(1일)
          { text: 'day', view: 5, cycle: 5, interval: 5, icnt: 1440 },       //주기(5일)
          { text: 'mon', view: 1, cycle: 5, interval: 30, icnt: 1440 },       //주기(1개월)
        ],
        menuBtnLst: [
          { text: 'alarm', clazz: 'btn_alerm', isActive: false },                      //알림
          { text: 'toChart', clazz: 'btn_chart', isActive: false, useDepthChart: true },    //차트전환
          { text: 'setting', clazz: 'btn_setting', isActive: false },                  //설정
          { text: 'max', clazz: 'btn_expend', isActive: false, useDepthChart: true },                       //최대화
          { text: 'analysis', clazz: 'btn_analyze', isActive: false },  //분석
        ],
        // 상단 > 분석도구 1depth
        sidebarMenu:
          [
            { text: 'resetchart', clazz: 'menu01', isActive: false },                          //차트 초기화
            { text: 'line', clazz: 'menu04', isActive: false, depthClazz: 'side_depth04' },                //선 Tool
            { text: 'line2', clazz:'menu05', isActive: false, depthClazz: 'side_depth05'},             //선2 Tool
            { text: 'shape', clazz: 'menu06', isActive: false, depthClazz: 'side_depth06' },               //도형 Tool
            { text: 'fibonacci', clazz:'menu07', isActive: false, depthClazz: 'side_depth07'},         //피보나치 Tool
            { text: 'eraser', clazz: 'menu02', isActive: false },             //지우개(-1단계)
            { text: 'resettool', clazz: 'menu03', isActive: false },                           //분석툴초기화
            //{text:'continuedraw', clazz:'menu08', isActive: false },     //분석툴 연속그리기
            { text: 'crosslinesearch', clazz: 'menu09', isActive: false },    //십자선 수치조회
          ],
        // 상단 > 분석도구 2depth
        toolsLst: UsableTools,
        // 상단 > 높이차트 : 전환 여부
        isDepthChart: false,
        // 하단 > 로그 : 전환 여부
        isLog: false,
        // 하단 > 뒤집기 : 전환 여부
        isInvert: false,
        // 하단 > 설정(빠른메뉴)
        isBtmSetting: false,
        isSettingCycle: false,
        isDataList: false, // 십자선 수치조회
        isEraseTool: false, // 지우개(-1단계)
        isSlideBottomMenu: false, // 하단메뉴 슬라이드
        isSlideSidebar: false, // 사이드바 슬라이드
        depthLst: {
          isShow: false,
          clazz: '',
          style: {'top':'0px'},
          list: []
        },
        tooltip: {
          isShow: false,
          style: '',
          text: ''
        },
        timerInterval: null,
        time: null
      }
    },
    computed: {
      cycleValue: {
        get () {
          const { cycle, interval } = this.currentCycle
          this.currentCycleInput = interval
          return `${cycle}@${interval}`
        },
        set (value) {
          const strs = value.split('@')
          const cycle = Number(strs[0])
          const interval = Number(strs[1])
          this.currentCycle.cycle = cycle
          this.currentCycle.interval = interval
        }
      }
    },
    watch: {
      utcProp (value) {
        this.intervalTimer(value);
      },
      isBtmSetting (value) {
        this.toggleBtmSettingMenu(value)
      }
    },
    beforeMount () {
      // 파라미터로 isDepthChart 값을 전달 받은 경우
      const query = this.$route.query
      if (query['isDepthChart'] === 'true') {
        this.clickRightMenu(this.menuBtnLst[1])
      }
    },
    mounted: function () {
      const self = this;
      // 분석도구 스크롤 이벤트
      document.addEventListener('scroll', this.scrollSidebarDepthMenu, true);

      // 차트영역 외 클릭시 팝업창 닫기
      $(document).on('mousedown.hideActiveMenu', function (e) {
        if (e.button > 0) {
          return;
        }
        const $target = $(e.target);
        if ($target.parents('.setting_modal_bx').length > 0 || $target.hasClass('btn_type_minus btn_lst_setting')
          || $target.parents('.chart_tab01_btn').length > 0 || $target.parents('.color_picker').length > 0
          || $target.hasClass('dim')) {
          return;
        } else if ($target.parents('.cicle_lft').length > 0
          || $target.parents('.signal_rgt').length > 0
          || $target.parents('.sidebar_bx').length > 0) {
          $('#chart-popup-wrapper').empty();
        } else {
          if ($target.parents('.tooltip_area').length > 0) {
            return;
          }

          if (!$target.hasClass('btn_universal_time')) {
            self.$emit('show-universal-time', false);
          }

          $('#chart-popup-wrapper').empty();

          self.clickRightMenu()
        }
      })
        .on('contextmenu.hideActiveMenu', function (e) {
          const $target = $(e.target)
          if ($target.parents('.setting_modal_bx').length > 0 || self.menuBtnLst[1].isActive) {
            e.preventDefault()
            return
          }
          if (!$target.is('canvas')) {
            e.preventDefault()
            $('#chart-popup-wrapper').empty()
          } else {
            // 지우개 초기화
            self.isEraseTool = false
            self.sidebarMenu.filter(function (item) {
              return item['text'] === 'eraser'
            })[0].isActive = false
          }

          self.clickRightMenu()
          
          self.$emit('show-universal-time', false)
        })

      if (this.utcProp) this.intervalTimer(this.utcProp);
    },
    methods: {
      intervalTimer({timeZone = 'Asia/Seoul', utc = '+09:00'}){
        if (this.timerInterval) {
          clearInterval(this.timerInterval)
        }
        const tmpDate = new Date()
        const now = new Date(Date.UTC(tmpDate.getUTCFullYear(), tmpDate.getUTCMonth(), tmpDate.getUTCDay(), tmpDate.getUTCHours(), tmpDate.getUTCMinutes(), tmpDate.getUTCSeconds()));
        const utcSplit = utc.split(':');
        now.setUTCHours(now.getUTCHours() + parseInt(utcSplit[0]));
        now.setUTCMinutes(now.getUTCMinutes() + parseInt(utcSplit[1]));
        console.log('intervalTimer', timeZone, utc, now);
        this.timerInterval = setInterval(() => {
          now.setUTCSeconds(now.getUTCSeconds() + 1);
          if (this.$refs.time) {
            this.$refs.time.text = ('0' + now.getUTCHours()).slice(-2) + ':' + ('0' + now.getUTCMinutes()).slice(-2) + ':' + ('0' + now.getUTCSeconds()).slice(-2) + '(UTC ' + utc + ')';
          }
        }, 1000)
      },      
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
      changeCycle(value) {
        const strs = value.split('@')
        const cycle = Number(strs[0])
        const interval = Number(strs[1])
        this.$refs.chart.BeforeRequestChart(false, {cycle, interval, icnt: 100})
        this.clickRightMenu()
      },
      changeCycleInput(value){
        this.cycleInterval && clearInterval(this.cycleInterval)
        this.cycleInterval = setTimeout(() => {
          this.$set(this.currentCycle, 'interval', value)
          this.$refs.chart.BeforeRequestChart(false, {cycle: this.currentCycle.cycle, interval: value, icnt: 100})
        }, 500)
      },
      changeBtmOptions (value) {
        const strs = value.split('@')
        const cycle = Number(strs[0])
        const interval = Number(strs[1])

        const current = this.btmTimeLst.find(item => item.cycle === cycle && item.interval === interval)
        this.$refs.chart.BeforeRequestChart(false, {
          cycle,
          interval,
          icnt: current.icnt,
        })
      },
      // 상단 메뉴 클릭 
      clickRightMenu (item, flag) {
        // 버튼 활성화
        if (item) {
          switch (item.text) {
            case 'alarm':
              item.isActive = false;
              let alermProps = this.$refs.chart.getAlermProp();
              if (alermProps) {
                this.$emit('show-alerm', alermProps);
              }
              break;
            case 'toChart':
              this.isDepthChart = !this.isDepthChart
              item.isActive = this.isDepthChart;
              const filtered = this.menuBtnLst.filter(({text}) => text === 'analysis');
              this.clickRightMenu(filtered[0], false);
              break;
            case 'setting':
              item.isActive = false;
              this.$refs.chart.showSettingPopup();
              break;
            case 'max':
              item.isActive = false;
              let url = '/#/fullscreenchart'
              if (this.isDepthChart) {
                url += '?isDepthChart=' + this.isDepthChart
              }
              window.open(url, '_blank');
              break;
            case 'analysis' :
              if (!this.$refs.chart) return;

              if (flag !== undefined) {
                this.isSlideSidebar = flag;
              } else {
                this.isSlideSidebar = !this.isSlideSidebar;
              }
              
              item.isActive = this.isSlideSidebar;
              this.hideSidebarDepthMenu();
              this.$refs.chart.extendSidebarArea(this.isSlideSidebar);
              break              
            default:
              item.isActive = false;
              this.hideSidebarDepthMenu();
          }
        } else {
          this.hideSidebarDepthMenu();
        }
      },
      // 사이드바 메뉴 활성화
      initSidebarMenu (item) {
        // 초기화
        this.sidebarMenu.forEach((menu, i) => {
          if (menu.text === item.text) {
            menu.isActive = item.isActive;

            switch (item.text) {
              // 십자선 수치조회
              case 'crosslinesearch' :
                this.isDataList = item.isActive;
                break;
            }
          } else {
            menu.isActive = false;
          }
        });
      },
      // 사이드바 메뉴 클릭 
      clickSidebarMenu (e, item, flag) {
        // 2depth 숨김
        this.hideSidebarDepthMenu(item);

        switch (item.text) {
          // 차트 초기화
          case 'resetchart' :
            this.$refs.chart.doChartReset();
            item.isActive = false;
            break            
          // 지우개(-1단계)
          case 'eraser' :
            if (flag !== undefined) {
              this.isEraseTool = flag;
            } else {
              this.isEraseTool = !this.isEraseTool;
            }
            item.isActive = this.isEraseTool;
            this.$refs.chart.selectDrawTool();
            this.$refs.chart.toggleEraseTool(this.isEraseTool);
            break
          // 분석툴 초기화
          case 'resettool' :
            this.$refs.chart.doToolReset();
            item.isActive = false;
            break;
          // 십자선 수치조회
          case 'crosslinesearch' :
            this.isDataList = !this.isDataList;
            item.isActive = this.isDataList;
            this.$refs.chart.toggleDataList(this.isDataList);
            break;
          default :            
            if (item.depthClazz) {
              if (item.isActive) {
                this.showSidebarDepthMenu(e.target, item);
              } else {
                this.hideSidebarDepthMenu();
              }
            } else {
              item.isActive = false;
            }
        }        
      },
      showTooltip(e) {
        const target = e.target;
        let depth02Offset = $(target.parentNode).position().top + 10, //원뎁스 메뉴 클릭 위치
        title = target.textContent || target.innerText;

        this.tooltip = {
          isShow: true,
          style: 'top:' + depth02Offset + 'px',
          text: title
        }
      },
      hideTooltip() {
        this.tooltip = {
          isShow: false,
          style: '',
          text: ''
        }
      },
      // 2depth 메뉴 노출
      showSidebarDepthMenu(target, item) {
        let depth02Offset = $(target.parentNode).position().top; //원뎁스 메뉴 클릭 위치
        const canvasHeight = 287, fibonacciHeight = 132;
        const locale = this.$i18n.locale;        
        
        this.toolsLst.forEach((depth) => {
          if(depth.label === item.text) {
            if (this.$route.name === 'exchange' && depth02Offset + fibonacciHeight > canvasHeight) 
              depth02Offset = canvasHeight - fibonacciHeight;
            else depth02Offset += 25;

            let strStyle = 'top:' + depth02Offset + 'px;';
            if(item.text === 'fibonacci') strStyle += 'width:115px;'

            this.depthLst.isShow = true;
            this.depthLst.clazz = item.depthClazz;
            this.depthLst.style = strStyle;
            this.depthLst.list = depth.depth;
          }
        });
      },
      hideSidebarDepthMenu(item) {
        this.sidebarMenu.forEach((menu) => {
          if (menu !== item && menu.depthClazz) {
            menu.isActive = false;
          }
        });
        this.depthLst = {
          isShow: false
        }
      },
      scrollSidebarDepthMenu(e) {
        const target = e.target;
        if (target.classList && target.classList.contains('scrollbar-wrapper')) {
            const depth02Position = $(target).find('li.active').position();
            if (depth02Position) {
              $('.depth02_lst:visible').css('top', depth02Position.top + 25);
            }
        }
      },
      clickSidebarDepthMenu(type) {
        this.hideSidebarDepthMenu();
        // 지우개툴 취소        
        const filtered = this.sidebarMenu.filter(({text}) => text === 'eraser');
        this.clickSidebarMenu(null, filtered[0], false);
        // 그리기툴 선택
        this.$refs.chart.unselectTool();
        this.$refs.chart.selectDrawTool(type);
      },      
      toggleBtmSettingMenu (isBtmSetting) {
        //하단 고정 메뉴바
        let btmSetting = $('#btn_btm_setting')
        if (isBtmSetting) {
          btmSetting.stop().slideDown(100)
        } else {
          btmSetting.stop().slideUp(100)
        }
      }
    },
    beforeDestory () {
      // 이벤트 삭제
      $(document).off('.hideActiveMenu');
      document.removeEventListener('scroll', this.scrollSidebarDepthMenu);
    },
  }

  var realClockFn

  function realClock (utc) {

    clearTimeout(realClockFn)

    var d = new Date()
    var nUtc
    if (utc) {
      nUtc = Number(utc)
    } else {
      nUtc = -d.getTimezoneOffset()
    }

    d.setUTCMinutes(d.getUTCMinutes() + nUtc)

    var h = d.getUTCHours()
    var m = d.getUTCMinutes()
    var s = d.getUTCSeconds()

    var u = Math.abs(nUtc)
    var utcString = ''
    if (nUtc != 0) {
      utcString += (nUtc > 0 ? '+' : '-')
      utcString += Math.floor(u / 60)

      if (u % 60 > 0) {
        utcString += ':' + (u % 60)
      }
    }

    $('#utc')
      .text(addZero(h, 2) + ':' + addZero(m, 2) + ':' + addZero(s, 2) + ' (UTC' + utcString + ')')
      .attr('href', utc)

    realClockFn =
      setTimeout(() => {
        realClock(utc)
      }, 1000) // 1초마다 realClock() 함수 호출
  }

  function addZero (str, max) {
    str = str.toString()
    return str.length < max ? addZero('0' + str, max) : str
  }
</script>

<style scoped>
  /** base **/
  .chart_cont * {
    box-sizing: border-box;
    letter-spacing: -1px;
  }

  .chart_cont div, .chart_cont p, .chart_cont span, .chart_cont ul, .chart_cont li, .chart_cont img {
    margin: 0;
    padding: 0;
    word-break: break-all;
    border: 0;
  }

  .chart_cont li {
    list-style: none
  }

  .chart_cont a, .chart_cont label, .chart_cont input, .chart_cont textarea, .chart_cont button, .chart_cont select {
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }

  .chart_cont ol, .chart_cont ul, .chart_cont dl {
    list-style: none
  }

  .chart_cont table {
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
  }

  .chart_cont input[type="text"], .chart_cont select {
    padding: 0;
    margin: 0;
    border: none;
    border: none;
    vertical-align: middle;
  }

  .chart_cont .blind {
    overflow: hidden;
    visibility: hidden;
    position: absolute;
    width: 0;
    height: 0;
    font-size: 0;
    line-height: 0;
  }

  /** chart top **/
  .chart_cont {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .chart_cont .chart_top_bx {
    padding: 9px 10px;
    width: 100%;
    height: 38px;
    background: #fff;
    border-bottom: 1px solid #ece9ec;
  }

  .chart_cont .chart_top_bx:before {
    display: inline-block;
    height: 38px;
    clear: both;
    content: "";
  }

  .chart_cont .chart_top_bx .cicle_lft {
    display: inline-block;
    float: left;
    height: 20px;
    background: #fff;
  }

  .chart_cont .chart_top_bx .cicle_lft:before {
    display: inline-block;
    height: 50px;
    clear: both;
    content: "";
  }

  .chart_cont .chart_top_bx .cicle_lft_lst {
    float: left;
    height: 20px;
  }

  .chart_cont .chart_top_bx .cicle_lft_lst:before {
    display: inline-block;
    height: 20px;
    clear: both;
    content: "";
  }

  .chart_cont .chart_top_bx .cicle_lft .cicle_lft_lst > li {
    float: left;
    height: 20px;
    width: 40px;
  }

  .chart_cont .chart_top_bx .cicle_lft .cicle_lft_lst > li > a {
    display: block;
    width: 100%;
    height: 20px;
    line-height: 19px;
    text-align: center;
    color: #707070;
    font-size: 12px;
    border-radius: 2px;
  }

  .chart_cont .chart_top_bx .cicle_lft .cicle_lft_lst > li > a:hover,
  .chart_cont .chart_top_bx .cicle_lft .cicle_lft_lst > li > a:active {
    background: #e4e7f0;
    color: #707070;
  }

  .chart_cont .chart_top_bx .cicle_lft .cicle_lft_lst > li > a.active {
    background: #3f51b5;
    color: #fff;
  }

  .chart_cont .chart_top_bx .chart_type01_lft {
    position: relative;
    padding: 0 8px 0 22px;
    float: left;
    height: 20px;
    line-height: 21px;
    font-size: 12px;
    color: #707070;
  }

  .chart_cont .chart_top_bx .chart_type01_lft:before {
    position: absolute;
    left: 6px;
    top: 50%;
    margin: -5px 0 0;
    content: "";
    width: 6px;
    height: 10px;
    background: #e4e7f0 url("../../images/chart_arrow_lft_off.png") no-repeat left top;
  }

  .chart_cont .chart_top_bx .chart_type01_lft:hover:before {
    background: url("../../images/chart_arrow_lft_on.png") no-repeat left top;
  }

  .chart_cont .chart_top_bx .chart_type01_lft:hover,
  .chart_cont .chart_top_bx .chart_type01_lft:active {
    background: #e4e7f0;
  }

  .chart_cont .chart_top_bx .minute_lst_bx {
    float: left;
    width: 40px;
    height: 20px;
    position: relative;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .btn_minute {
    display: block;
    width: 40px;
    height: 20px;
    line-height: 18px;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    font-size: 12px;
    color: #707070;
    background: #fff;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .btn_minute:hover,
  .chart_cont .chart_top_bx .minute_lst_bx .btn_minute:active {
    color: #707070;
    background: #e4e7f0;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .btn_minute.active {
    background: #215ab6;
    color: #fff;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide {
    display: none;
    position: absolute;
    left: 0;
    top: 28px;
    z-index: 30;
    width: 142px;
    height: 250px;
    background: #fff;
    border: 1px solid #e1dfe1;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .el-scrollbar {
    height: 248px;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .minute_slide_lst {
    padding: 10px 0 0;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .minute_slide_lst li.last {
    border-bottom: 1px solid #ece9ec;
    padding: 0 0 10px;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .minute_slide_lst li.fst {
    padding: 10px 0 0;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .minute_slide_lst li:last-child {
    padding: 0 0 10px;
    border-bottom: 1px solid #ece9ec;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .minute_slide_lst a {
    display: block;
    text-indent: 14px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: left;
    color: #707070;
    font-size: 12px;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .minute_slide_lst a:hover,
  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .minute_slide_lst a:active {
    background: #f1f2f7;
    color: #707070;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .input_minute_bx {
    width: 100%;;
    height: 29px;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .input_minute_bx:after {
    content: "";
    display: block;
    clear: both;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .input_minute_bx input {
    display: block;
    float: left;
    width: 38px;
    height: 29px;
    text-align: center;
    font-size: 12px;
    color: #707070;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .input_minute_bx .sub_slide_bx {
    float: left;
    position: relative;
    width: 61px;
    height: 29px;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .input_minute_bx .sub_slide_bx .btn_select {
    position: relative;
    display: block;
    width: 61px;
    height: 29px;
    line-height: 29px;
    text-indent: 10px;
    text-align: left;
    font-size: 12px;
    color: #707070;
    border-left: 1px solid #edeaed;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .input_minute_bx .sub_slide_bx .btn_select:before {
    position: absolute;
    right: 9px;
    top: 50%;
    margin: -3px 0 0 0;
    width: 10px;
    height: 6px;
    content: "";
    background: url("../../images/chart_arrow_down.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .input_minute_bx .sub_slide_bx .sub_bx {
    display: none;
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    background: #fff;
    border: 1px solid #edeaed;
    z-index: 10;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .input_minute_bx .sub_slide_bx .sub_bx .sub_select_lst li > a {
    display: block;
    width: 100%;
    height: 30px;
    line-height: 29px;
    font-size: 12px;
    color: #707070;
    text-indent: 10px;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .input_minute_bx .sub_slide_bx .sub_bx .sub_select_lst li > a:hover,
  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .input_minute_bx .sub_slide_bx .sub_bx .sub_select_lst li > a:active {
    background: #f1f2f7;
    color: #707070;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .input_minute_bx .rgt_btn_bx {
    display: block;
    float: left;
    padding: 4px;
    height: 29px;
    width: 41px;
    border-left: 1px solid #edeaed;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .input_minute_bx .rgt_btn_bx a {
    display: block;
    width: 32px;
    height: 21px;
    background: #e5e8f1;
    border-radius: 2px;
    line-height: 20px;
    font-size: 12px;
    color: #707070;
    text-align: center;
  }

  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .input_minute_bx .txt {
    display: block;
    float: left;
    width: 30px;
    height: 30px;
  }

  .chart_cont .chart_top_bx .signal_rgt {
    display: inline-block;
    float: right;
    height: 20px;
  }

  .chart_cont .chart_top_bx .signal_rgt:before {
    display: inline-block;
    height: 20px;
    clear: both;
    content: "";
  }

  .chart_cont .chart_top_bx .signal_rgt > li {
    padding: 0 0 0 10px;
    float: left;
  }

  .chart_cont .chart_top_bx .signal_rgt > li:first-child {
    padding: 0;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a {
    display: block;
    width: 20px;
    height: 20px;
    line-height: 13px;
    text-align: center;
    color: #000;
    border-radius: 2px;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_alerm {
    background: url("../../images/chart_rgt01.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_alerm:hover,
  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_alerm:active {
    background: #e4e7f0 url("../../images/chart_rgt01.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_alerm.active {
    background: #194aa5 url("../../images/chart_rgt01_on.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_chart {
    background: url("../../images/chart_rgt02.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_chart:hover,
  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_chart:active {
    background: #e4e7f0 url("../../images/chart_rgt02.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_chart.active {
    background: #194aa5 url("../../images/chart_rgt02_on.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_setting {
    background: url("../../images/chart_rgt03.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_setting:hover,
  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_setting:active {
    background: #e4e7f0 url("../../images/chart_rgt03.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_setting.active {
    background: #194aa5 url("../../images/chart_rgt03_on.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_reset {
    background: url("../../images/chart_rgt04.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_reset:hover,
  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_reset:active {
    background: #e4e7f0 url("../../images/chart_rgt04.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_reset.active {
    background: #194aa5 url("../../images/chart_rgt04_on.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_expend {
    background: url("../../images/chart_rgt05.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_expend:hover,
  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_expend:active {
    background: #e4e7f0 url("../../images/chart_rgt05.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_expend.active {
    background: #194aa5 url("../../images/chart_rgt05_on.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_analyze {
    background: url("../../images/chart_rgt06.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_analyze:hover,
  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_analyze:active {
    background: #e4e7f0 url("../../images/chart_rgt06.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt > li > a.btn_analyze.active {
    background: #194aa5 url("../../images/chart_rgt06_on.png") no-repeat center;
  }

  .chart_cont .chart_top_bx .signal_rgt .chart_btm_sign {
    display: none;
    position: absolute;
    left: 0;
    top: 28px;
    padding: 10px 0;
    z-index: 10;
    width: 130px;
    border: 1px solid #e1dfe1;
    background: #fff;
  }

  .chart_cont .chart_top_bx .signal_rgt .chart_btm_sign .chart_sign_lst .btn_lnk {
    display: block;
    width: 100%;
    font-size: 12px;
    height: 31px;
    line-height: 30px;
    color: #707070;
    text-indent: 35px;
    background: #fff;
  }

  .chart_cont .chart_top_bx .signal_rgt .chart_btm_sign .chart_sign_lst .btn_lnk:hover,
  .chart_cont .chart_top_bx .signal_rgt .chart_btm_sign .chart_sign_lst .btn_lnk:active,
  .chart_cont .chart_top_bx .signal_rgt .chart_btm_sign .chart_sign_lst .btn_lnk.active {
    background: #f2f3f7 url("../../images/chart_ico_check.png") no-repeat 14px center;
  }

  /** 분석도구 툴 **/
  .chart_cont .chart_bx {
    position: relative;
    overflow: hidden;    
    width: 100%;
    height: 100%;
  }

  .chart_cont .chart_bx .sidebar_bx {
    position: relative;
    margin-right: 9px;
    padding-left: 4px;
    float: right;
    height: 100%;;
    width: 40px;
    border-left:1px solid #ece9ec;
  }

  .sidebar_bx-enter-active {
    transition: all .1s ease;
  }

  .sidebar_bx-enter, .sidebar_bx-leave {
    transform: translateX(10px);
    opacity: 0;
  }

  .chart_cont .chart_bx .sidebar_bx .sidebar_menu_bx {
    right: 0;
    top: 0;
    width: 39px;
    background: #fff;
    height: 100%;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .el-scrollbar {
    height: 100%;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu {
    width: 39px;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li {
    position: relative;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li > a {
    display: block;
    position: relative;
    width: 100%;
    height: 40px;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li > a:before {
    position: absolute;
    left: -1px;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: #e1dfe1;
    content: "";
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu01 > a {
    background: url("../../images/chart_side01.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu02 > a {
    background: url("../../images/chart_side02.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu03 > a {
    background: url("../../images/chart_side03.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu04 > a {
    background: url("../../images/chart_side04.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu05 > a {
    background: url("../../images/chart_side05.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu06 > a {
    background: url("../../images/chart_side06.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu07 > a {
    background: url("../../images/chart_side07.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu08 > a {
    background: url("../../images/chart_side08.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu09 > a {
    background: url("../../images/chart_side09.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu01 > a:hover {
    background: url("../../images/chart_side01_hover.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu02 > a:hover {
    background: url("../../images/chart_side02_hover.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu03 > a:hover {
    background: url("../../images/chart_side03_hover.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu04 > a:hover {
    background: url("../../images/chart_side04_hover.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu05 > a:hover {
    background: url("../../images/chart_side05_hover.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu06 > a:hover {
    background: url("../../images/chart_side06_hover.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu07 > a:hover {
    background: url("../../images/chart_side07_hover.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu08 > a:hover {
    background: url("../../images/chart_side08_hover.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu09 > a:hover {
    background: url("../../images/chart_side09_hover.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu01.active > a {
    background: url("../../images/chart_side01_on.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu02.active > a {
    background: url("../../images/chart_side02_on.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu03.active > a {
    background: url("../../images/chart_side03_on.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu04.active > a {
    background: url("../../images/chart_side04_on.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu05.active > a {
    background: url("../../images/chart_side05_on.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu06.active > a {
    background: url("../../images/chart_side06_on.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu07.active > a {
    background: url("../../images/chart_side07_on.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu08.active > a {
    background: url("../../images/chart_side08_on.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.menu09.active > a {
    background: url("../../images/chart_side09_on.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu .depth02 {
    display: none;
    position: absolute;
    left: -80px;
    top: 0;
    overflow: hidden;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu .depth02 > li > a {
    display: block;
    width: 80px;
    text-align: center;
    color: #000;
  }

  .chart_cont .chart_bx .sidebar_menu_bx .sidebar_menu > li.depth02_li > a:before {
    position: absolute;
    left: 2px;
    top: 24px;
    content: "";
    width: 4px;
    height: 4px;
    background: #fff url("../../images/chart_side_arrow.png") no-repeat center;
  }

  .chart_cont .chart_bx .sidebar_bx .depth02_lst {    
    
    position: absolute;
    right: 39px;
    top: 0;
    padding: 5px 0;
    box-shadow: 0px 3px 5px 0 rgba(153, 204, 255, 0.05);
    border: 1px solid #e1dfe1;
    background: #fff;
    word-break: normal;
  }

  .depth02_lst-enter-active {
    transition: all .3s ease;
  }

  .depth02_lst-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .depth02_lst-enter, .depth02_lst-leave {
    transform: translateY(10px);
    opacity: 0;
  }

  .chart_cont .chart_bx .sidebar_bx .depth02_lst > li > a {
    display: block;
    padding: 0 10px;
    font-size: 11px;
    color: #616161;
    height: 30px;
    text-align: left;
    line-height: 32px;
    font-family: Roboto, Dotum;
  }

  .chart_cont .chart_bx .sidebar_bx .depth02_lst > li > a:hover {
    background: #f1f2f7;
  }

  .chart_cont .chart_bx .sidebar_bx .depth02_lst.side_depth04 {
    width: 84px;
    top: 130px;
  }

  .chart_cont .chart_bx .sidebar_bx .depth02_lst.side_depth05 {
    width: 62px;
    top: 170px;
  }

  .chart_cont .chart_bx .sidebar_bx .depth02_lst.side_depth06 {
    width: 55px;
    top: 210px;
  }

  .chart_cont .chart_bx .sidebar_bx .depth02_lst.side_depth07 {
    width: 98px;
    top: 250px;
  }

  .chart_cont .chart_bx .sidebar_bx .depth02_lst.side_depth08 {
    width: 108px;
    top: 290px;
  }

  .chart_cont .chart_bx .chart_area {
    position: relative;
    width: 100%;    
    height: 100%;
    float: left;
  }

  .chart_cont .chart_bx .chart_area01 {
    display: none;
    width: auto;
    height: 500px;
  }

  /** bottom **/
  .chart_cont .chart_btm_area {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 20px;
    width: 100%;
    background: #fff;
    border-top: 1px solid #ece9ec;
    overflow: hidden;
    max-height: 40px;
    /*
    opacity: 0;
    pointer-events: none;
    max-height: 0;
    transition: max-height 0.2s, opacity 0.25s;
    */
  }

  .chart_cont .chart_btm_area:before {
    display: inline-block;
    height: 50px;
    clear: both;
    content: "";
  }
/*
  .chart_cont .chart_btm_area.is-slide {
    opacity: 1;
    pointer-events: auto;
    max-height: 40px;
    overflow: visible;
  }
*/
  .chart_cont .chart_btm_area-enter-active {
    transition: all .2s ease;
  }

  .chart_cont .chart_btm_area-enter {
    transform: translateY(10px);    
    opacity: 0;
  }

  .chart_cont .chart_btm_area .time_lst {
    float: left;
  }

  .chart_cont .chart_btm_area .time_lst:before {
    display: inline-block;
    height: 29px;
    clear: both;
    content: "";
  }

  .chart_cont .chart_btm_area .time_lst > li {
    float: left;
    padding: 0 0 0 22px;
  }

  .chart_cont .chart_btm_area .time_lst > li:first-child {
    padding: 0;
  }

  .chart_cont .chart_btm_area .time_lst > li > a {
    display: inline-block;
    height: 39px;
    line-height: 38px;
    font-size: 12px;
    color: #707070;
  }

  .chart_cont .chart_btm_area .btn_before_period {
    float: left;
    margin: 0 0 0 22px;
    display: inline-block;
    height: 40px;
    line-height: 39px;
    font-size: 12px;
    color: #707070;
  }

  .chart_cont .chart_btm_area .btn_rgt {
    float: right;
  }

  .chart_cont .chart_btm_area .btn_rgt:before {
    display: inline-block;
    height: 39px;
    clear: both;
    content: "";
  }

  .chart_cont .chart_btm_area .btn_rgt > li {
    float: left;
    position: relative;
    padding: 0 0 0 23px;
  }

  .chart_cont .chart_btm_area .btn_rgt > li:first-child {
    padding: 0;
  }

  .chart_cont .chart_btm_area .btn_rgt > li.setting_lst {
    padding: 9px 0 0 10px;
  }

  .chart_cont .chart_btm_area .btn_rgt > li.setting_lst > a {
    display: block;
    border-radius: 2px;
    width: 40px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    color: #fff;
    background: #3f51b5;
  }

  .chart_cont .chart_btm_area .btn_rgt > li > a {
    display: inline-block;
    height: 40px;
    line-height: 39px;
    color: #707070;
    font-size: 12px;
  }

  .chart_cont .chart_btm_area .btn_rgt .chart_btm_setting {
    display: none;
    padding: 10px 0;
    position: absolute;
    right: -10px;
    bottom: 30px;
    width: 136px;
    background: #fff;
    border: 1px solid #e1dfe1;
    z-index: 51;
  }

  .chart_cont .chart_btm_area .btn_rgt .chart_btm_setting .btn_lnk {
    display: block;
    width: 100%;
    font-size: 12px;
    height: 30px;
    line-height: 29px;
    color: #707070;
    text-indent: 35px;
  }

  .chart_cont .chart_btm_area .btn_rgt .chart_btm_setting .btn_lnk:hover,
  .chart_cont .chart_btm_area .btn_rgt .chart_btm_setting .btn_lnk:active,
  .chart_cont .chart_btm_area .btn_rgt .chart_btm_setting .btn_lnk.active {
    background: #f2f3f7 url("../../images/chart_ico_check.png") no-repeat 14px center;
  }

  .chart_cont .chart_btm_area li > a.active {
    font-weight: bold;
    color: #3F51B5;
  }

  /** rdo_check **/
  .chart_cont .rdo_check {
    overflow: hidden;
    display: inline-block;
    padding: 3px;
    width: 80px;
    height: 30px;
    border: 1px solid #e1dfe1;
    border-radius: 15px;
  }

  .chart_cont .rdo_check label {
    display: block;
    position: relative;
    float: left;
    width: 36px;
    height: 22px;
    border-radius: 15px;
  }

  .chart_cont .rdo_check label .txt {
    position: absolute;
    left: 0;
    top: 0;
    width: 36px;
    height: 22px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    color: #c5c5c5;
  }

  .chart_cont .rdo_check label .check_rdo {
    -webkit-appearance: none;
    border-radius: 0;
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    overflow: hidden;
    visibility: hidden;
    position: absolute;
    width: 0;
    height: 0;
    font-size: 0;
    line-height: 0;
  }

  .chart_cont .rdo_check label.active {
    background: #1f4ba4;
    transition: all 0.4s;
  }

  .chart_cont .rdo_check label.active .txt {
    color: #fff;
    transition: all 0.4s;
  }

  /** tooltip **/
  .chart_cont .chart_bx .sidebar_bx .toltip {
    position: absolute;
    right: 49px;
    padding: 0 10px;
    height: 20px;
    font-size: 11px;
    color: #fff;
    text-align: center;
    background: #404040;
    border-radius: 3px;
    line-height: 22px;
    white-space: nowrap;
    word-break: keep-all;
  }

  .chart_cont .chart_bx .sidebar_bx .toltip:before {
    position: absolute;
    right: -4px;
    top: 50%;
    margin: -5px 0 0;
    width: 4px;
    height: 10px;
    background: url("../../images/chart_tooltip_arrow.png") no-repeat center;
    content: "";
  }

  /* 차트 주기 설정 팝업 css 추가 - 2019.03.05 */
  .chart_cont .chart_top_bx .minute_lst_bx .minute_slide .setting-period a {
    position: relative;
    display: block;
    height: 30px;
    font-size: 12px;
    color: #707070;
    text-align: center;
    line-height: 30px;
    background: #e5e8f1;
    border-top: 1px #e1dfe1 solid;
  }

  .popup_wrapper_pc .setting_modal_bx .anal_setting_modal .pop_btn_bx {
    padding: 20px 0 40px;
    text-align: center;
  }

  .popup_wrapper_pc .pop_btn_bx a {
    width: 100px;
    height: 30px;
    line-height: 25px;
    font-size: 14px;
  }

  .popup_wrapper_pc .period-setting {
    position: relative;
  }

  .popup_wrapper_pc .period-setting::after {
    content: '';
    display: block;
    clear: both;
  }

  .popup_wrapper_pc .period-setting .period-setting-tbl {
    float: left;
    position: relative;
    width: 520px;
    margin-right: 30px;
  }

  .popup_wrapper_pc .period-setting .period-setting-tbl table {
    width: 100%;
    border-spacing: 0;
    border-top: 2px #464748 solid;
  }

  .popup_wrapper_pc .period-setting .period-setting-tbl tr {
    cursor: pointer;
  }

  .popup_wrapper_pc .period-setting .period-setting-tbl tr:hover {
    background: #f5f5f5;
  }

  .popup_wrapper_pc .period-setting .period-setting-tbl tr.sel {
    background: #eee;
  }

  .popup_wrapper_pc .period-setting .period-setting-tbl th {
    height: 40px;
    font-size: 14px;
    font-weight: normal;
    color: #212121;
    border-bottom: 1px #909090 solid;
  }

  .popup_wrapper_pc .period-setting .period-setting-tbl td {
    height: 40px;
    font-size: 14px;
    color: #616161;
    text-align: center;
    border-bottom: 1px #e3e3e3 solid;
    border-right: 1px #e3e3e3 solid;
  }

  .popup_wrapper_pc .period-setting .period-setting-tbl td:last-child {
    border-right: 0;
  }

  .popup_wrapper_pc .period-setting .period-setting-tbl tr:last-child td {
    border-bottom-color: #c7c7c7;
  }

  .popup_wrapper_pc .period-setting .period-setting-tbl td .form_label {
    display: block;
    width: 20px;
    margin: 0 auto;
  }

  .popup_wrapper_pc .period-setting .period-setting-tbl td .prd_count, .popup_wrapper_pc .period-setting .period-setting-tbl td .select_ui {
    width: 150px;
    margin: 0 auto;
  }

  .popup_wrapper_pc .period-setting .period-order {
    float: left;
    position: relative;
    width: 60px;
  }

  .popup_wrapper_pc .period-setting .period-order .period-order-title {
    position: relative;
    height: 40px;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
  }

  .popup_wrapper_pc .period-setting .period-order .period-order-btns {
    position: relative;
    display: flex;
    height: 360px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .popup_wrapper_pc .period-setting .period-order .period-order-btns a {
    position: relative;
    display: block;
    width: 30px;
    height: 30px;
    text-indent: -9999px;
    border: 1px #9e9e9e solid;
    border-radius: 2px;
    background-repeat: no-repeat;
    background-position: center;
    margin: 15px 0;
  }

  .popup_wrapper_pc .period-setting .period-order .period-order-btns .top {
    background-image: url('../../images/paging_start.png');
    transform: rotateZ(90deg);
  }

  .popup_wrapper_pc .period-setting .period-order .period-order-btns .up {
    background-image: url('../../images/paging_prev.png');
    transform: rotateZ(90deg);
  }

  .popup_wrapper_pc .period-setting .period-order .period-order-btns .down {
    background-image: url('../../images/paging_next.png');
    transform: rotateZ(90deg);
  }

  .popup_wrapper_pc .period-setting .period-order .period-order-btns .bottom {
    background-image: url('../../images/paging_end.png');
    transform: rotateZ(90deg);
  }
</style>
