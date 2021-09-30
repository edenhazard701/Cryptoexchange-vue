<template>
    <div :id="m_strChartDIV"></div>
</template>

<script>
import MobileDetect from 'mobile-detect';
import { mapGetters, mapState } from 'vuex';
import _lodash from 'lodash'
import zlib from 'zlib'
//import Html5Chart from '/static/Library/ChartLib/Html5Chart'

let ChartObj = {};
let md = new MobileDetect(window.navigator.userAgent);

function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

export default {
    props: ['propdata', 'utcProp', 'isCycleSettings', 'isShowBottomMenu'],
    data() {
        return {
            chartIndex: 0,
            chkAddData: true,
            preSymbol: '',
            symbol: '',
            oldAlermProps: [],
            dataLoaded: false,
            isSpecialChartType: false, // 특수차트 여부

            //20190223 이문수 저장/불러오기>>
            bRunMounted: false,
            bReConnected: false,
            m_strChartDIV:"ChartDIV",
            m_strThemeName:"default",
            m_nScrollBarType:0,
            m_nDateTimePacketIndex:null,//종목 실시간 처리에서 필요
            m_strScreenName:null,//화면 로드과정 mounted에서 저장(beforeDestory에서 오픈되는 화면Name으로 변경되어 따로 저장해놓음)
            QueryInfo :{
                "opCode":"LOAD_PROPERTY", //"CHANGE_SYMBOL", "CHANGE_CYCLE"(비동기통신이기 때문에 응답이 왔을 때 경우에 따라 정확하게 처리하려면 필요-조회요청시 셋팅한다)
                "packetId":"",//조회요청시 조회요청함수 리턴값으로 부터 받아 저장해놓고 응답을 왔을 때 해당요청에 대한 응답이 맞는지 체크시 사용
                "symbol": "",
                "cycle": '1',
                "interval":1,
                "nRqDataCnt": 100,
                "strRqArray": null,//복수 종목 차트 설정을 저장한 경우 복구할 때 다음조회할 종목정보 저장 배열
                "chartFullProperty":null, //차트설정 object - 주기까지 저장되어 있다
                "chartToolProperty":null,
                "nextQueryInfo":{ //모든 조회가 완료된 후 이어서 조회가 되어야 하는 경우 정보 저장해둔다
                    "opCode":null,
                    "symbol":null,
                    "cycle":null,
                    "interval":null,
                    "nRqDataCnt":null
                }
            }
            //20190223 이문수 저장/불러오기<<
        }
    },
    watch: {
        symbol(after) {
            //심볼이 변경: 이전심볼에 대한 실시간데이터 처리 거부
            if (this.preSymbol !== after) {
                this.preSymbol = after;
            }
        },
        // 세계시간 변경
        utcProp(value) {
            const Chart = ChartObj[this.chartIndex];
            Chart.ChangeUniversalTime(value);
        },
        //getLangKind 언어변경 감지 20190218 LJH
        getLangKind(val) {
            const Chart = ChartObj[this.chartIndex];
            Chart.LoadLang(val, true);
        },
        isCycleSettings (val) {
            if (val) {
                const Chart = ChartObj[this.chartIndex];
                Chart.ShowModalCycleSettings().then((items) => {
                    this.$emit('update:isCycleSettings', false)
                    this.$emit('change-cycle-settings', items)
                }).catch((err) => {
                    this.$emit('update:isCycleSettings', false)
                    err && console.error(err)
                })
            }
        },
        isSpecialChartType (after) {
            this.$emit('toggle-setting-btn', !after);
        }
    },
    computed: {
        ...mapState({
			coinList : state => state.data['n1001'],
        }),
        //getLangKind 언어변수 20190218 LJH
        ...mapGetters(['hogaUnit', 'getUserId', 'getLangKind', 'isLoggedIn'])
    },
    methods: {
        CreateChart() {
            console.log('CreateChart()______________');
            const offsetWidth = this.$el.offsetParent.offsetWidth;
            const offsetHeight = this.$el.offsetParent.offsetHeight;

            const ChartCanvas = document.createElement("canvas");
            ChartCanvas.id = this.m_strChartDIV + "_Canvas";
            ChartCanvas.width =  offsetWidth;
            ChartCanvas.height = offsetHeight;

            this.$el.width = offsetWidth;
            this.$el.height = offsetHeight;
            this.$el.appendChild(ChartCanvas);

            // 차트 초기화
            if(!md.mobile()) {
                this.m_strThemeName = "default";  // 테마 설정
                this.m_strScreenName = this.$route.name + "_ver1.0";

                // 스크롤바 스타일 설정
                this.m_nScrollBarType = 1;
                if (this.m_strScreenName.indexOf("fullexchange") >= 0) {
                    this.m_strThemeName = "full";
                } else if (this.m_strScreenName.indexOf("fullscreenchart") >= 0) {
                    this.m_nScrollBarType = 0;
                }

                ChartObj[this.chartIndex] = new CWebChart(this.m_strChartDIV, ChartCanvas.id, this.m_nScrollBarType, this.m_strThemeName);

                if(!this.isShowBottomMenu) {
                    // 그래프 선택 시 가격 전달
                    document.addEventListener('Event_ChangePrice', this.ChangePrice);                    
                } else {
                    // 하단메뉴 확장
                    document.addEventListener('Event_ExtendBottomArea', this.extendBottomArea);
                }

                // 깊이차트 전환
                document.addEventListener('Event_ChangeDepthChart', this.changeDepthChart);
            } else {
                this.m_strThemeName = "default";  // 테마 설정
                this.m_strScreenName = this.$route.name + "_ver1.0";
                
                this.m_nScrollBarType = 1;
                ChartObj[this.chartIndex] = new CMobileWebChart(this.m_strChartDIV, this.m_strChartDIV + "_Canvas", this.m_nScrollBarType);
            }
        },
        InitChart() {
            //20190223 이문수 저장/불러오기 >>
            const Chart = ChartObj[this.chartIndex];
            let strChartFullProperty = localStorage.getItem(this.m_strScreenName);
            if(strChartFullProperty)
            {
                this.QueryInfo.chartFullProperty = JSON.parse(strChartFullProperty);

                var bError = false;
                if(Object.keys(this.QueryInfo.chartFullProperty.m_mapRQProperty).length <= 0  ||
                        !this.QueryInfo.chartFullProperty.m_MainBlockProperty ||
                        this.QueryInfo.chartFullProperty.m_MainBlockProperty.m_ChartBlockPropertyArray.length <= 0)
                {
                    bError = true;
                }
                else
                {
                    var nIndex, len = this.QueryInfo.chartFullProperty.m_MainBlockProperty.m_ChartBlockPropertyArray.length;
                    for(nIndex = 0 ; nIndex < len; nIndex++ )
                    {
                        var rChartBlockPropertyInfo = this.QueryInfo.chartFullProperty.m_MainBlockProperty.m_ChartBlockPropertyArray[nIndex];
                        if(rChartBlockPropertyInfo.m_GraphPropertyArray.length <= 0)
                        {
                            bError = true;
                            break;
                        }
                    }
                }

                if(bError)
                    this.QueryInfo.chartFullProperty = Chart.GetDefaultChartFullProperty();
            }
            else
                this.QueryInfo.chartFullProperty = Chart.GetDefaultChartFullProperty();

            this.QueryInfo.strRqArray = [];
            for(var sRQ in this.QueryInfo.chartFullProperty.m_mapRQProperty)
            {
                this.QueryInfo.strRqArray[this.QueryInfo.strRqArray.length] = sRQ;
            }
            this.QueryInfo.packetId = null;
            //20190223 이문수 저장/불러오기 <<

            //resize event 등록
            window.addEventListener('resize', this.resize);

            //스크롤이벤트 등록 (연속조회)
            document.addEventListener('Event_Scroll', this.gChartEventScrollFunction);

            // 20190201 전중현 : 미체결, 평균매수가, 알림선 라인 설정을 위한 조회/실시간 처리
            document.addEventListener('Event_SelectTradingLine', this.gChartEventSelectTradingLine);

            //차트 초기화
            document.addEventListener('Event_ResetChart', this.ResetChart);

            //차트 저장
            document.addEventListener('Event_SaveProperty', this.SavePropertyFromChart);

            //차트설정 취소시 이벤트 전달(화면에서 예외처리 필요시 사용)
            document.addEventListener('Event_CancelSetup', this.CancelSetup);

            this.symbol = this.$store.state.data.currentSymbol;

            // 차트 주기 설정 정보
            this.$emit('change-cycle-settings', Chart.getCycleOptions().filter(item => item.is));

            // 십자선 수치조회
            this.toggleDatalistMode();

            if(!md.mobile()) {
                // 하단 메뉴 확장
                if (this.isShowBottomMenu) {                
                    Chart.SendEvent('Event_ExtendBottomArea');
                }

                // 마우스 우측 메뉴 활성화
                Chart.SetUseContextMenu(this.isShowBottomMenu);
            } else {
                // 십자선 보이기 여부
                this.initCrossLine();
            }

            this.BeforeRequestChart(true);
        },
        DestroyChart() {
            console.log('DestroyChart()______________');
            delete ChartObj[this.chartIndex];
        },
        changeCurrentSymbol(symbol) {
            this.symbol = symbol;
            this.BeforeRequestChart(false, {
              cycle: this.QueryInfo.cycle,
              interval: this.QueryInfo.interval,
              icnt: this.QueryInfo.nRqDataCnt
            });
        },
        changeSymbolToChart({ref, symbol}) {
            if (this.$parent._uid === ref._uid) { // _uid
                this.changeCurrentSymbol(symbol);
            }
        },
        loadStockDataCallback() {
          console.log('loadStockData________________________: %s', this.symbol);

          const self = this;

          if(this.dataLoaded) return;
          this.dataLoaded = true;

          // 차트 설정 조회(로그인 되어 있고, 사용자아이디가 있을 경우)
          if ((md.mobile() || (!md.mobile() && this.isShowBottomMenu)) && (this.isLoggedIn && this.getUserId) && this.bReConnected !== true) {
            // 분석툴 로드 - 차트 저장보다 먼저 조회해서 QueryInfo.chartToolProperty에 담는다
            // 저장된 차트데이터 조회가 먼저될 경우 툴 로드가 안됨
            this.LoadToolInfo( true );
            this.QueryUserProperty(0, this.m_strScreenName).then(function(data) {
              if (data) {
                zlib.inflate(new Buffer(data, 'base64'), (err, buffer) => {                       
                  if (!err) {
                    try {
                      // 조회된 데이터가 JSON 형태가 아닐 경우 catch
                      const savedData = JSON.parse(buffer.toString());
                      Object.keys(savedData).forEach((key) => {
                          let value = savedData[key];
                          if (value) {
                              localStorage.setItem(key, JSON.stringify(value));
                          }
                      });
                    } catch(err) {
                      console.error(err.message);
                    }   
                  }
                  // localstorage에 저장 후
                  self.InitChart();
                });
              } else {
                // 조회 데이터가 없을 경우
                self.InitChart();
              }
            });
          } else {
            // 로그인 하지 않았을 경우
            
            // 분석툴 로드 - 차트 저장보다 먼저 조회해서 QueryInfo.chartToolProperty에 담는다
            // 저장된 차트데이터 조회가 먼저될 경우 툴 로드가 안됨
            this.LoadToolInfo( false );
            self.InitChart();
          }
          this.bReConnected = false;
        },
        resetLoadStockDataCallback() {
            this.dataLoaded = false;
            if(this.bRunMounted === false){
                this.bReConnected = true;//실행도중 소켓재접속되는 경우를 체크할 때 사용
                const Chart = ChartObj[this.chartIndex];
                this.SaveChart( Chart, TOTAL_SETUP_SAVE_TYPE , true);//임시로 로컬에 저장
            }

            this.bRunMounted = false;
            
        },
        CalcRqCnt(nViewCnt) {

            let nRqCnt = Math.floor(nViewCnt + nViewCnt / 3);
            if(!md.mobile()){
                nRqCnt = (nRqCnt > 1200 ? 1200 : (nRqCnt < 100 ? 100 : nRqCnt));
            }
            else{
                nRqCnt = (nRqCnt > 700 ? 700 : (nRqCnt < 100 ? 100 : nRqCnt));
            }
            return nRqCnt;
        },
        BeforeRequestChart(bOnCreate, {cycle, interval, icnt} = {cycle:5, interval:10, icnt: 100}) {

            const Chart = ChartObj[this.chartIndex];
            let bChangeCycle = false;

            //주기변경 체크(주기별 저장기능에서 사용할 예정-interval만 변경된 경우는 주기별 저장하지 않음)

            let rRQInfo = Chart.GetSelectedRQInfo();
            if(rRQInfo && rRQInfo.m_nCycle != cycle)
            {
                bChangeCycle = true;
            }

            //예외처리:외부에서 넘어오는 object 중에 icnt가 없이 넘어오면서 icnt만 undefined이 되는 경우 발생
            if(!icnt){
                icnt = 100;
            }

            //this.$socket 상태에 따라 this.getPacket(); 호출여부 결정해야 됨 LJH 2018.12.14
            if (this.$socket.netIo.socket) {
                this.clearRealData(this.preSymbol);

                // 20190201 전중현 : 미체결, 평균매수가, 알림선 라인 설정을 위한 조회/실시간 처리 >>
                var strUserID = this.getUserId;
                if( strUserID !== null)
                {
                    this.clearRealContract(strUserID);
                    this.clearRealBalance(strUserID);
                    this.clearRealAlarm(strUserID);
                }
                // 20190201 전중현 : 미체결, 평균매수가, 알림선 라인 설정을 위한 조회/실시간 처리 <<

                // 현재 상태의 분석툴을 메모리에 저장
                // 종목이 변경되거나, 주기가 변경될수 있기때문에 현재 툴을 모두 지움(인자 true)
                Chart.SaveToolInfo( true );

                if(this.QueryInfo.chartFullProperty)//화면 로드 직후
                {
                    //packetId가 존재한다는 의미는 로드과정에서 조회응답대기중을 의미하며
                    //결국 로드과정에 다른 화면에서 종목변경 요청 들어온 경우임

                    //저장했던 ViewCnt가 차트엔진에서 설정한 ViewCnt의 최대값보다 큰 경우 최대값에 맞추는 예외처리 
                    let nMaxOfViewCnt = Chart.GetMaxOfViewCnt();
                    this.QueryInfo.chartFullProperty.m_nViewCnt = (this.QueryInfo.chartFullProperty.m_nViewCnt > nMaxOfViewCnt ? nMaxOfViewCnt : this.QueryInfo.chartFullProperty.m_nViewCnt);
                    
                    icnt = this.CalcRqCnt(this.QueryInfo.chartFullProperty.m_nViewCnt);
                    if(this.QueryInfo.packetId)
                    {
                        //현재 조회중인 설정내용들 모두 조회완료 후 설정적용까지 끝난 다음 DefaultRQ에 대해 조회진행될 수 있도록 nextQueryInfo에 셋팅
                        this.QueryInfo.nextQueryInfo.opCode = bChangeCycle ? "CHANGE_CYCLE" : "CHANGE_SYMBOL";
                        this.QueryInfo.nextQueryInfo.symbol = this.symbol;
                        this.QueryInfo.nextQueryInfo.cycle = cycle;
                        this.QueryInfo.nextQueryInfo.interval = interval;
                        this.QueryInfo.nextQueryInfo.nRqDataCnt = icnt;
                    }
                    else
                    {
                        var strRQ = this.QueryInfo.strRqArray[0];
                        var RQProperty = this.QueryInfo.chartFullProperty.m_mapRQProperty[strRQ];

                        //첫번째 rq는 화면에서 정해진 코드로 변경
                        RQProperty.m_strCode = this.symbol;
                        RQProperty.m_strName = this.symbol;

                        //주기 , 조회 개수는 저장된 내용을 적용
                        this.QueryInfo.packetId = null;
                        this.QueryInfo.opCode = "LOAD_PROPERTY";
                        this.QueryInfo.symbol = this.symbol;
                        this.QueryInfo.cycle = RQProperty.m_nCycle;
                        this.QueryInfo.interval = RQProperty.m_nInterval;
                        this.QueryInfo.nRqDataCnt = icnt;
                    }
                }
                else//화면 생성 후 종목변경이나 주기변경시 (종목 데이터만 셋팅하면 되는 경우)
                {
                    let nViewCnt = Chart.GetViewCnt();
                    icnt = this.CalcRqCnt(nViewCnt);

                    //종목 추가(추후 추가될 기능)
                    if(false)
                    {
                        //정리된 내용으로 QueryInfo 셋팅
                        this.QueryInfo.opCode = "ADD_SYMBOL";
                        this.QueryInfo.symbol = this.symbol;
                        this.QueryInfo.cycle = cycle;
                        this.QueryInfo.interval = interval;
                        this.QueryInfo.nRqDataCnt = icnt;
                        this.QueryInfo.strRqArray = null;
                        this.QueryInfo.chartFullProperty = null;
                    }
                    //종목변경이나 주기변경(추후 멀티종목시 주기변경에 대한 기능도 추가해야 한다)
                    else
                    {                        
                        //정리된 내용으로 QueryInfo 셋팅
                        this.QueryInfo.opCode = bChangeCycle ? "CHANGE_CYCLE" : "CHANGE_SYMBOL";
                        this.QueryInfo.symbol = this.symbol;
                        this.QueryInfo.cycle = cycle;
                        this.QueryInfo.interval = interval;
                        this.QueryInfo.nRqDataCnt = icnt;                        
                        this.QueryInfo.strRqArray = null;
                        this.QueryInfo.chartFullProperty = null;
                    }
                }

                console.log('update:cycle', this.QueryInfo.packetId, {
                    cycle: this.QueryInfo.cycle,
                    interval: this.QueryInfo.interval,
                    icnt: this.QueryInfo.nRqDataCnt
                })

                  // 현재 주기 표기
                  this.$emit('update:propdata',
                      {
                      cycle: this.QueryInfo.cycle,
                      interval: this.QueryInfo.interval,
                      icnt: this.QueryInfo.nRqDataCnt
                      },
                  )

                var bReset = this.QueryInfo.chartFullProperty ? true : false;
                this.RequestChart(bReset, bOnCreate);
            }
        },
        RequestChart(bReset, bOnCreate) {
            const Chart = ChartObj[this.chartIndex], _this = this;

            function RQInfos() {
                this.Info = new CRQInfo();//RQInfo는 차트엔진에 정의되어 있는 개체
                this.m_strContents = "";
            }

            var kovex_cycle = this.ConvertCycleToKovexCycle(this.QueryInfo.cycle);

            var packetIdObj = this.$socket.sendProcessByName('i0004',
                function (queryData) {
                    var block = queryData.getBlockData('InBlock1')[0];
                    block['symbol'] = _this.QueryInfo.symbol;       // 종목코드 15
                    block['cycunit'] = kovex_cycle;  // 주기단위 1
                    block['qrycnt'] = _this.QueryInfo.nRqDataCnt;// 조회건수 5
                    block['cyc'] = _this.QueryInfo.interval;       // 주기 3
                    block['availflag'] = Chart.IsRealBong() === false ? '0' : '1';       // 실봉구분 1
                    block['sdate'] = '00000000';    // 시작일자 8
                    block['edate'] = '99999999';    // 종료일자 8

                    console.log("RequestChart send:");
                },
                function (queryData) {

                    //응답값 확인
                    if (!queryData) {
                        console.error("차트데이터[%s] 불러오기 error", _this.QueryInfo.symbol);
                        _this.QueryInfo.packetId = null;
                        return;
                    }

                    //packetId 체크
                    if(_this.QueryInfo.packetId != this.packetInfo.packetId)
                    {
                        console.log("[조회응답]:조회요청시와는 다른 패킷id 들어온 경우 종료");
                        return;
                    }
                    _this.QueryInfo.packetId = null;

                    //심볼 유효성 검증
                    var block = queryData.getBlockData('OutBlock1')[0];
                    if (block.symbol !== _this.QueryInfo.symbol) {
                        console.error("차트데이터 currentSymbol: %s packetSymbol: %s", symbol, block.symbol);
                        return;
                    }

                    let nViewCnt = 500;
                    if(_this.QueryInfo.opCode === "LOAD_PROPERTY" && bReset)
                    {
                        //1. 차트 리셋 및 초기화 , 차트블록구성, 사용자기본값 복원
                        Chart.ResetChart(_this.m_strChartDIV, _this.m_strChartDIV + "_Canvas", _this.m_nScrollBarType, _this.m_strThemeName, _this.QueryInfo.chartFullProperty);
                    }
                    else if(_this.QueryInfo.opCode === "CHANGE_SYMBOL" || _this.QueryInfo.opCode === "CHANGE_CYCLE"){
                        nViewCnt = Chart.GetViewCnt();
                    }

                    var nNumPacketLength = 20;

                    //현재가, 전일종가, 대비, 등락율, 누적등락율 셋팅
                    var RQ = new RQInfos();
                    RQ.Info.m_PrevPrice = parseFloat(block.yesterdayprice);
                    RQ.Info.m_PriceChange = parseFloat(block.diff);
                    RQ.Info.m_CurPrice = RQ.Info.m_PrevPrice + RQ.Info.m_PriceChange;
                    RQ.Info.m_ChangeRatio = parseFloat(block.updnrate);
                    RQ.Info.m_CumulativeVolume = parseFloat(block.precumdealqty);

                    // 20190128 전중현 : 기준선 기능 - 데이터 세팅 >>
                    RQ.Info.m_OpenPrice = parseFloat(block.curopenprc);
                    RQ.Info.m_HighPrice = parseFloat(block.curhighprc);
                    RQ.Info.m_LowPrice = parseFloat(block.curlowprc);
                    RQ.Info.m_OHL3Price = ( RQ.Info.m_OpenPrice + RQ.Info.m_HighPrice + RQ.Info.m_LowPrice ) / 3;
                    RQ.Info.m_HL2Price = ( RQ.Info.m_HighPrice + RQ.Info.m_LowPrice ) / 2;

                    RQ.Info.m_PreOpenPrice = parseFloat(block.preopenprc);
                    RQ.Info.m_PreHighPrice = parseFloat(block.prehighprc);
                    RQ.Info.m_PreLowPrice = parseFloat(block.prelowprc);
                    // 20190128 전중현 : 기준선 기능 - 데이터 세팅 <<

                    //종목정보 가져오기
                    var symbolInfo = _this.$_.findWhere(_this.coinList, {o_symbol : _this.QueryInfo.symbol});

                    //심볼명: m_strItemCode로 사용 - LJH 2018.12.12 KR001BTC__KRW__
                    RQ.Info.m_strItemCode = _this.QueryInfo.symbol;
                    RQ.Info.m_strItemName = symbolInfo.o_inst_eng_abbr.replace("/", "/ ");
                    RQ.Info.m_nCycle = Number(_this.QueryInfo.cycle);
                    RQ.Info.m_nInterval = Number(_this.QueryInfo.interval);
                    RQ.Info.m_strMarketStartTime = "000000";
                    RQ.Info.m_strMarketEndTime = "235959";

                    //strNextKey 추가 LJH 2019.01.02
                    //연속키 저장 LJH 2019.01.02
                    RQ.Info.m_strNextKey = queryData.getContiKey();

                    //호가단위
                    var callPrice = RQ.Info.m_CurPrice; //현재가
                    var hogaUnit = UnitManager.getHogaUnit(_this.hogaUnit, symbolInfo.o_setl_cur_cd_n, callPrice);
                    if (hogaUnit < 1 && hogaUnit.toString().indexOf('.') < 0) {
                        hogaUnit = hogaUnit.toFixed(nNumPacketLength).replace(/0+$/, '');
                    }

                    //가격 표현 단위("0", "0.01", "0.00000001" 등 셋팅)
                    var priceUnit = 1/Math.pow(10, symbolInfo.o_setl_dec_digt);
                    if (priceUnit < 1) {
                        priceUnit = priceUnit.toFixed(symbolInfo.o_setl_dec_digt);
                    }
                    priceUnit = priceUnit < hogaUnit ? priceUnit : hogaUnit;//20190309 이문수 (hogaUnit이 0.1인데 priceUnit 1이 나오는 경우발생하여 임시 예외처리(예:베잔트(BZNT/KRW)) ==>> 확인필요!!)
                    var minOrder = priceUnit.toString();
                    RQ.Info.m_strPriceDigit = minOrder;

                    //최소주문수량단위( ex: "0.0001" 입력 ) => 거래량 자리수 표현에 사용
                    var vUnit = symbolInfo.o_min_ord_qty;
                    RQ.Info.m_strOrderUnitQty = vUnit.toString();

                    var dataArr = queryData.getBlockData('OutBlock2');
                    //console.log(dataArr);

                    var dOpenprc,dHighprc,dLowprc,dCloseprc,dCumdealqty,
                        dDate,dSDate,dEDate,strKey;
                    var chartData = "";
                    var dataLength = dataArr.length;
                    var QueryInfocycle = _this.QueryInfo.cycle;
                    var nLastIndex = dataLength - 1;

                    //차트데이터 추출
                    for (var i = 0; i < dataLength; i++) {

                        //분, 초주기 아닌 경우
                        if (QueryInfocycle != 5 && QueryInfocycle != 6) {

                            dDate = dataArr[i].date;//8자리
                            if(QueryInfocycle == 3){//월주기일 경우 서버에서 월말날짜로 들어오는 것을 월초로 변경
                                dDate = dDate.substr(0, 6) + "01";
                            }
                            dCumdealqty = pad(dataArr[i].cumdealqty, nNumPacketLength);

                        } else {//분,초 주기인 경우

                            dDate = dataArr[i].date + dataArr[i].time;//14자리
                            dCumdealqty = pad(dataArr[i].execqty, nNumPacketLength);
                        }
                        dOpenprc = pad(dataArr[i].openprc, nNumPacketLength);
                        dHighprc = pad(dataArr[i].highprc, nNumPacketLength);
                        dLowprc = pad(dataArr[i].lowprc, nNumPacketLength);
                        dCloseprc = pad(dataArr[i].closeprc, nNumPacketLength);

                        chartData += (dDate + "" + dOpenprc + "" + dHighprc + "" + dLowprc + "" + dCloseprc + "" + dCumdealqty);
                    }

                    if(0 < dataLength){
                        dSDate = dDate;
                        dEDate = (QueryInfocycle != 5 && QueryInfocycle != 6) ? (QueryInfocycle == 3 ? dataArr[0].date.substr(0,6) + "01" : dataArr[0].date) : dataArr[0].date + dataArr[0].time;
                    }

                    RQ.Info.m_strTrStartDateTime = dSDate;
                    RQ.Info.m_strTrEndDateTime = dEDate;

                    RQ.m_strContents = dataLength + "!" + chartData;

                    //////////////////////////////////////////////////////////////////////////////////////////
                    //RQ 등록
                    var sRQ = null;
                    if(_this.QueryInfo.opCode === "LOAD_PROPERTY")//저장불러오기에서는 저장되어 있던 rq 그대로 사용
                    {
                        sRQ = _this.QueryInfo.strRqArray[0];
                        Chart.AddRQ(sRQ);
                        Chart.SetRQInfo(sRQ, RQ.Info);
                    }
                    else if(_this.QueryInfo.opCode === "ADD_SYMBOL")
                    {
                        sRQ = Chart.AddRQInfo(RQ.Info);//차트 내부에서 rq 새로 할당한 후 키값 리턴
                    }
                    else if(_this.QueryInfo.opCode === "CHANGE_SYMBOL")
                    {
                        sRQ = Chart.GetSelectedRQ();
                        Chart.SetRQInfo(sRQ, RQ.Info);
                    }
                    else if(_this.QueryInfo.opCode === "CHANGE_CYCLE")
                    {
                        sRQ = Chart.GetSelectedRQ();
                        Chart.SetRQInfo(sRQ, RQ.Info);
                    }
                    else
                    {
                        sRQ = Chart.GetSelectedRQ();
                        Chart.SetRQInfo(sRQ, RQ.Info);
                    }

                    //////////////////////////////////////////////////////////////////////////////////////////
                    //차트컨트롤에 데이터 패킷정보 셋팅
                    if (RQ.Info.m_nCycle == 5 || RQ.Info.m_nCycle == 6) {//분,초주기

                        let rPacketData = Chart.AddDateTimePacketInfo(sRQ, "_DATETIME_", "YYYYMMDDHHMMSS", 14);
                        if(rPacketData)
                            _this.m_nDateTimePacketIndex = rPacketData.m_nPacketIndex;

                    } else {//일,주,월,년주기

                        let rPacketData = Chart.AddDateTimePacketInfo(sRQ, "_DATETIME_", "YYYYMMDD", 8);
                        if(rPacketData)
                            _this.m_nDateTimePacketIndex = rPacketData.m_nPacketIndex;
                    }

                    Chart.AddInputNumPacketInfo(sRQ, "_OPEN_", nNumPacketLength, 10, hogaUnit, minOrder);
                    Chart.AddInputNumPacketInfo(sRQ, "_HIGH_", nNumPacketLength, 10, hogaUnit, minOrder);
                    Chart.AddInputNumPacketInfo(sRQ, "_LOW_", nNumPacketLength, 10, hogaUnit, minOrder);
                    Chart.AddInputNumPacketInfo(sRQ, "_CLOSE_", nNumPacketLength, 10, hogaUnit, minOrder);
                    Chart.AddInputNumPacketInfo(sRQ, "_VOLUME_", nNumPacketLength, 10, vUnit, vUnit.toString());

                    ///////////////////////////////////////////////////////////////////////
                    //계산용 패킷을 추가
                    var strInputPacketNameArray = ["_HIGH_", "_LOW_"];
                    Chart.AddPacketCalculator(sRQ, "_HL2_", strInputPacketNameArray, 10, hogaUnit, minOrder);

                    strInputPacketNameArray[2] = "_CLOSE_";
                    Chart.AddPacketCalculator(sRQ, "_HLC3_", strInputPacketNameArray, 10, hogaUnit, minOrder);

                    ////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //데이터처리를 위해 가격차트만 먼저 등록
                    if(_this.QueryInfo.opCode === "LOAD_PROPERTY")
                    {                        
                        strKey = Chart.LoadFirstIndicator(sRQ, _this.QueryInfo.chartFullProperty, bReset);
                    }
                    //종목 추가하는 경우 가격차트와 이평만 추가
                    else if(_this.QueryInfo.opCode === "ADD_SYMBOL")
                    {
                        strKey = Chart.AddIndicator(sRQ, "_PRICE_", -1, -1, -1, 1);
                        var rBlockPosInfo = Chart.FindBlockColRowByGraphKey(sRQ, strKey);
                        if (rBlockPosInfo !== null) {
                            //가격 이동평균 추가
                            Chart.AddIndicator(sRQ, "_MA_", rBlockPosInfo.m_X, rBlockPosInfo.m_Y, rBlockPosInfo.m_nVertScaleIndex, 1);
                        }
                    }
                    else{

                        Chart.UpdatePacketInfo(sRQ);
                    }

                    var bAppendRQ = Chart.GetRQCount() > 1 ? true : false;
                    Chart.RegXScaleMng(sRQ, bAppendRQ);

                    ////////////////////////////////////////////////////////////////////////////////
                    //차트컨트롤에 차트데이터 전달
                    Chart.SetPacketData(sRQ, RQ.m_strContents, RQ.m_strContents.length, false, false, true);

                    if(_this.QueryInfo.opCode === "LOAD_PROPERTY")//추후 멀티종목 주기변경시 등 일부 케이스에서도 strRqArray를 사용 예정이므로 로직변경해야 함
                    {
                        if( _this.QueryInfo.strRqArray.length > 0){
                            _this.QueryInfo.strRqArray.shift();
                        }

                        //실시간 데이터 등록
                        _this.setRealData(_this.QueryInfo.symbol);

                        //이어서 조회할 종목이 있는 경우(멀티종목 의미)
                        if( _this.QueryInfo.strRqArray.length > 0){
                            var strRQ = _this.QueryInfo.strRqArray[0];
                            var rRQProperty = _this.QueryInfo.chartFullProperty.m_mapRQProperty[strRQ];
                            if(rRQProperty)
                            {
                                _this.QueryInfo.packetId = null;
                                _this.QueryInfo.opCode = "LOAD_PROPERTY";
                                _this.QueryInfo.symbol = rRQProperty.m_strCode;//2번째 종목부터는 저장된 종목으로 조회토록 한다
                                _this.QueryInfo.cycle = rRQProperty.m_nCycle;
                                _this.QueryInfo.interval = rRQProperty.m_nInterval;

                                let nRqCnt = _this.CalcRqCnt(_this.QueryInfo.chartFullProperty.m_nViewCnt);
                                _this.QueryInfo.nRqDataCnt = nRqCnt;//rRQProperty.m_nRequestDataCnt;

                                _this.RequestChart(false);

                                return;
                            }
                        }

                        /////////////////////////////////////////////////////////////////////
                        //저장되었던 지표적용(저장되어 있던 모든 종목 조회가 완료된 후)
                        var GraphPropertyArray = Chart.GetGraphPropertyArrayFromChartFullProperty(_this.QueryInfo.chartFullProperty);
                        var nGraphPropLen = GraphPropertyArray.length;
                        for (i = 0; i < nGraphPropLen; i++) {

                            var rGraphProp = GraphPropertyArray[i];

                            strKey = Chart.AddIndicator(rGraphProp.m_strRQ, rGraphProp.m_strGraphName, rGraphProp.m_nColIndex, rGraphProp.m_nRowIndex,
                                rGraphProp.m_nVertScaleIndex, rGraphProp.m_nBlockRatio, rGraphProp.m_PropertyInfo, rGraphProp.m_strGraphKey, true);

                            //추가된 지표 계산
                            Chart.IndicatorCalc(rGraphProp.m_strRQ, strKey);
                        }

                        Chart.ArrangeXScaleMng();

                        Chart.InitialViewInfo(_this.QueryInfo.chartFullProperty.m_nViewCnt);

                        Chart.ExtractYScaleMinMax(true);

                        Chart.ResizeUsingProperty(_this.QueryInfo.chartFullProperty.m_MainBlockProperty, false);

                        Chart.SetGlobalProperty(_this.QueryInfo.chartFullProperty.m_GlobalProperty);

                        Chart.SetGlobalPropertyToChart(false);

                        // localStorage에 저장한 분석툴을 메모리로 로드
                        var bToolAdd = Chart.LoadAllToolInfo( _this.QueryInfo.chartToolProperty );
                        if( bToolAdd === true )
                        {
                            // 현 조회된 종목,주기의 분석툴 로드
                            Chart.LoadToolInfoByRQ(sRQ, _this.QueryInfo.symbol, _this.QueryInfo.cycle );
                        }

                        Chart.Draw(DRAW_CASE_TR | DRAW_CASE_RESIZE | DRAW_CASE_ADD_CHARTBLOCK);

                        //저장/불러오기 처리 모두 완료되었음을 의미
                        _this.QueryInfo.chartFullProperty = null;
                        _this.QueryInfo.chartToolProperty = null;
                        _this.QueryInfo.strRqArray = null;

                        //불러오기 모두 완료된 후 조회과정 중 종목변경 요청 온 것은 Default rq 종목변경
                        if(_this.QueryInfo.nextQueryInfo.symbol){

                            _this.QueryInfo.packetId = null;
                            _this.QueryInfo.opCode = "CHANGE_SYMBOL";
                            _this.QueryInfo.symbol = _this.QueryInfo.nextQueryInfo.symbol;
                            _this.QueryInfo.cycle = _this.QueryInfo.nextQueryInfo.cycle;
                            _this.QueryInfo.interval = _this.QueryInfo.nextQueryInfo.interval;
                            
                            let nRqCnt = _this.CalcRqCnt(_this.QueryInfo.chartFullProperty.m_nViewCnt);                            
                            _this.QueryInfo.nRqDataCnt = nRqCnt;//_this.QueryInfo.nextQueryInfo.nRqDataCnt;
                            _this.RequestChart(false);

                            _this.QueryInfo.nextQueryInfo.symbol = null;

                            return;
                        }
                        else
                        {
                            // 모든 조회요청 후 저장
                            _this.SaveChart( Chart, TOTAL_SETUP_SAVE_TYPE );

                            // 특수차트 여부 설정
                            _this.isSpecialChartType = Chart.IsSpecialChartType();                            
                        }
                    }
                    else//일반 종목변경, 주기변경
                    {
                        Chart.ArrangeXScaleMng();

                        Chart.InitialViewInfo(nViewCnt);

                        Chart.ExtractYScaleMinMax(true);

                        // 현 조회된 종목,주기의 분석툴 로드
                        Chart.LoadToolInfoByRQ(sRQ, RQ.Info.m_strItemCode, QueryInfocycle );

                        //조회시마다 설정 내용 저장
                        _this.SaveChart(Chart);

                        Chart.Draw(DRAW_CASE_TR | DRAW_CASE_RESIZE);

                        //저장/불러오기 처리 모두 완료되었음을 의미
                        _this.QueryInfo.chartFullProperty = null;
                        _this.QueryInfo.strRqArray = null;

                        //실시간 데이터 등록
                        _this.setRealData(_this.QueryInfo.symbol);
                    }

                    //default rq 종목에 대해서만 처리되어지도록 한다
                    var rDefaultRQ = Chart.GetDefaultRQSet();
                    if(rDefaultRQ)
                    {
                        var symbol = rDefaultRQ.m_RQInfo.m_strItemCode;

                        // 20190201 전중현 : 미체결, 평균매수가, 알림선 라인 설정을 위한 조회/실시간 처리 >>
                        var bUseNonContractLine = Chart.GetUseNonContractLine();
                        var bUseAlarmLine = Chart.GetUseAlarmLine();
                        var bUseAvgBuyPriceLine = Chart.GetUseAvgBuyPriceLine();
                        var strUserID = _this.getUserId;
                        if( strUserID !== null )
                        {
                            if(bUseNonContractLine)
                                _this.RequestContract( strUserID, symbol );

                            if(bUseAlarmLine)
                                _this.RequestAlarm( strUserID, symbol );

                            if(bUseAvgBuyPriceLine)
                                _this.RequestBalance( strUserID, symbol );
                        }
                        // 20190201 전중현 : 미체결, 평균매수가, 알림선 라인 설정을 위한 조회/실시간 처리 <<
                    }
                }
            );

            //조회요청시 통신모듈에서 리턴해준 packetid를 QueryInfo.packetId에 저장해둔 후 응답시 packetId와 비교하여 해당요청에 대한 응답인지 여부 확인
            this.QueryInfo.packetId = packetIdObj.length > 0 ? packetIdObj[0] : null;
        },
        setRealData: function (symbol) {

            console.log("실시간데이터[%s] 등록 start", symbol);
            const Chart = ChartObj[this.chartIndex], _this = this;
            var symbols = [];
            symbols[0] = symbol;
            this.$socket.registerReal("KVS0", "symbol", symbols, "ExchangeChart",
                function(queryData) {

                    //응답값 확인
                    if (!queryData) {
                        console.error("차트데이터[%s] 불러오기 error", symbol);
                        return;
                    }

                    var data = queryData.getBlockData('OutBlock1')[0];
                    //console.log("실시간[%s] 수신2", data.symbol);
                    //심볼 유효성 검증
                    if (symbol !== data.symbol) {
                        console.error("실시간데이터 currentSymbol: %s packetSymbol: %s", symbol, data.symbol);
                        return;
                    }

                    //console.log("실시간데이터[%s] 수신3 %s %f %f", symbol, data.execdate + data.exectime, parseFloat(data.execprice), parseFloat(data.execqty));

                    //실시간 데이터 생성
                    var RealDataArray = [];
                    RealDataArray[0] = data.execdate + data.exectime;
                    RealDataArray[1] = null;
                    RealDataArray[2] = null;
                    RealDataArray[3] = null;
                    RealDataArray[4] = parseFloat(data.execprice);
                    RealDataArray[5] = parseFloat(data.execqty);

                    Chart.SetRealData( PRICE_REAL_TYPE, symbol, RealDataArray, _this.m_nDateTimePacketIndex);
                }
            );
            console.log("실시간데이터[%s] 등록 end", symbol);
        },
        ConvertCycleToKovexCycle : function( cycle ){

            var strCycle = String(cycle);//숫자로 들어오는 경우가 있어서 문자로 변경해서 비교
            switch (strCycle) {
                case '1': return 2;//일
                case '2': return 3;//주
                case '3': return 4;//월
                case '4': return 5;//년
                case '5': return 1;//분
                case '6': return 6;//초
                default: return 2;//기본 일주기
            }
        },
        addData: function (strRq, rqInfo) {
            //연속키 확인
            var strNextKey = rqInfo.m_strNextKey;
            if (!strNextKey) {
                return;
            }

            const Chart = ChartObj[this.chartIndex], _this = this;
            var kovex_cycle = 0;
            var symbol = rqInfo.m_strItemCode;
            var cycle = "" + rqInfo.m_nCycle;
            var interval = rqInfo.m_nInterval;
            var icnt = this.propdata.icnt || this.QueryInfo.nRqDataCnt;
            kovex_cycle = this.ConvertCycleToKovexCycle(cycle);

            console.log("연속조회데이터[%s] 불러오기 start", symbol);
            //이중클릭 방지
            _this.chkAddData = false;
            this.$socket.sendProcessByName('i0004',
                function (queryData) {
                    var block = queryData.getBlockData('InBlock1')[0];
                    // 조회구분
                    block['symbol'] = symbol;       // 종목코드 15
                    block['cycunit'] = kovex_cycle;  // 주기단위 1
                    block['qrycnt'] = icnt;         // 조회건수 5
                    block['cyc'] = interval;       // 주기 3
                    block['availflag'] = '0';       // 실봉구분 1
                    block['sdate'] = '00000000';    // 시작일자 8
                    block['edate'] = '99999999';    // 종료일자 8

                    //연속키 셋팅 LJH 2018.12.13
                    queryData.setContiKey(strNextKey);

                    console.log("addData send:");
                },
                function (queryData) {
                    //응답값 확인
                    if (!queryData) {
                        console.error("연속조회데이터[%s] 불러오기 error", symbol);
                        _this.chkAddData = true;
                        return;
                    }

                    var block = queryData.getBlockData('OutBlock1')[0];
                    if (block.symbol !== symbol) {
                        console.error("연속조회데이터 currentSymbol: %s packet symbol: %s", symbol, block.symbol);
                        _this.chkAddData = true;
                        return;
                    }

                    //연속조회 차트 그리기
                    var addDataArr = {
                        'data': queryData.getBlockData('OutBlock2')
                    };

                    var addCumdealqty;
                    var addDate;

                    var addChartData = "";
                    var addDataLength = addDataArr.data.length;
                    for (var i = 0; i < addDataLength; i++) {
                        if (cycle != 5 && cycle != 6) {
                            addDate = addDataArr.data[i].date;
                            addCumdealqty = pad(addDataArr.data[i].cumdealqty, 20);
                        } else {
                            addDate = addDataArr.data[i].date + addDataArr.data[i].time;
                            addCumdealqty = pad(addDataArr.data[i].execqty, 20);
                        }

                        var addOpenprc = pad(addDataArr.data[i].openprc, 20);
                        var addHighprc = pad(addDataArr.data[i].highprc, 20);
                        var addLowprc = pad(addDataArr.data[i].lowprc, 20);
                        var addCloseprc = pad(addDataArr.data[i].closeprc, 20);

                        addChartData += (addDate + "" + addOpenprc + "" + addHighprc + "" + addLowprc + "" + addCloseprc + "" + addCumdealqty);
                    }
                    addChartData = addDataLength + "!" + addChartData;

                    Chart.SetPacketData(strRq, addChartData, addChartData.length, true, false, true);

                    //연속키 저장
                    Chart.SetRQInfoNextKey(strRq, queryData.getContiKey());

                    _this.chkAddData = true;
                    console.log("연속조회데이터[%s] 불러오기 end", symbol);
                }
            );
        },
        resize: function (bDraw) {
            const Chart = ChartObj[this.chartIndex]
            var width = this.$el.offsetParent.offsetWidth;
            var height = this.$el.offsetParent.offsetHeight;
            Chart.Resize(width, height, bDraw);
        },
        clearRealData: function (symbols) {
            console.log("실시간데이터[%s] 해제 start", symbols);
            this.$socket.unregisterReal("KVS0", [symbols], "ExchangeChart");
            console.log("실시간데이터[%s] 해제 end", symbols);
        },
        gChartEventScrollFunction: function (e) {
            if (this.chkAddData && this.m_strChartDIV === e.m_strChartParentDIV) {
            console.log("scroll event");
                var rqInfoForScroll = e.m_mapRqInfo;
                for (var strRq in rqInfoForScroll) {
                    var rqInfo = rqInfoForScroll[strRq];
                    this.addData(strRq, rqInfo);
                }
            }
        },
        // 20190201 전중현 : 미체결, 평균매수가, 알림선 라인 설정을 위한 조회/실시간 처리 >>
        gChartEventSelectTradingLine :function (e) {
            if (this.m_strChartDIV === e.m_strChartParentDIV) {
	            var rChart = e.m_rChart;
	            var rSelectedTradingLine = e.m_InfoData;
	
	            if( rChart === undefined || rChart === null )
	                return;
	
	            var strUserID = this.getUserId;
	            if( strUserID !== null )
	            {
	                this.SetupAlarm(strUserID, rSelectedTradingLine );
	            }
            }
        // 20190201 전중현 : 미체결, 평균매수가, 알림선 라인 설정을 위한 조회/실시간 처리 <<
        },
        SavePropertyFromChart: function(e){
            if (this.m_strChartDIV === e.m_strChartParentDIV) {
                var rChart = e.m_rChart;
                this.isSpecialChartType = rChart.IsSpecialChartType();                
	            this.SaveChart(rChart, e.m_InfoData);

                //모바일에서 설정창 오픈상태에서 가로모드 변경되었을 경우 설정창 확인종료시점에 차트화면을 가로모드로 재로드하기 위해 이벤트 발생시킴
                this.$emit('orientation-change');
            }
        },
        CancelSetup: function(e){

            //모바일에서 설정창 오픈상태에서 가로모드 변경되었을 경우 설정창 취소종료시점에 차트화면을 가로모드로 재로드하기 위해 이벤트 발생시킴
            this.$emit('orientation-change');
        },
        // 알림선 설정창 변경으로 조회가 필요한 Data는 여기서 체크하여 요청
        CheckAndRequestData: function(rChart){

            var strUserID = this.getUserId;
            if( strUserID === null )
                return;

            var curChartFullProperty = rChart.GetChartFullProperty();
            var curGlobalProperty = curChartFullProperty.m_GlobalProperty;

            var bOldShowNonContractLine = this.oldAlermProps[0]['value'];
            var bOldShowAlarmLine = this.oldAlermProps[1]['value'];
            var bOldShowAvgBuyPriceLine = this.oldAlermProps[2]['value'];

            // 미체결 라인
            if( bOldShowNonContractLine === false && curGlobalProperty.GetUseNonContractLine() === true )
                this.RequestContract( strUserID, this.symbol );
            
            // 지정가 알림
            if( bOldShowAlarmLine === false && curGlobalProperty.GetUseAlarmLine() === true )
                this.RequestAlarm( strUserID, this.symbol );

            // 평균매수가
            if( bOldShowAvgBuyPriceLine === false && curGlobalProperty.GetUseAvgBuyPriceLine() === true )
                this.RequestBalance( strUserID, this.symbol );
        },
        SaveChart: function(obj, nType = TOTAL_SETUP_SAVE_TYPE, bTempSave = false ) {

            const self = this;            
            var ChartFullProperty, strChartFullProperty;
            ChartFullProperty = obj.GetChartFullProperty();

            if( nType === TOTAL_SETUP_SAVE_TYPE )
            {
                strChartFullProperty = JSON.stringify(ChartFullProperty);
                localStorage.setItem(this.m_strScreenName, strChartFullProperty);
            }

            var strChartToolProperty = "", bSaveTool = false;
            if( ChartFullProperty.m_GlobalProperty.m_bUseToolSave === true )
            {
                if( nType === TOTAL_SETUP_SAVE_TYPE || nType === TOOL_SETUP_SAVE_TYPE )
                {
                    var ChartToolProperty = obj.GetChartToolProperty();
                    if( ChartToolProperty !== null )
                    {
                        strChartToolProperty = JSON.stringify(ChartToolProperty);                    
                    }
                    else{
                        strChartToolProperty = "null";
                    }
                    localStorage.setItem(this.m_strScreenName + 'toolinfo', strChartToolProperty);
                    bSaveTool = true;
                }
            }

            // 차트 설정 저장(로그인 되어 있고, 사용자아이디가 있을 경우)
            if ((md.mobile() || (!md.mobile() && this.isShowBottomMenu)) && (this.isLoggedIn && this.getUserId)) {
              if( nType === TOTAL_SETUP_SAVE_TYPE ) {
                const saveTargetProp = [];
                saveTargetProp.push('{');
                saveTargetProp.push('"' + self.m_strScreenName + '":');
                saveTargetProp.push(strChartFullProperty);
                saveTargetProp.push(',');
                saveTargetProp.push('"chart-cycles":');
                saveTargetProp.push(localStorage.getItem('chart-cycles') || '""');
                saveTargetProp.push('}');

                // 차트 설정 데이터 압축
                zlib.deflate(saveTargetProp.join(''), (err, buffer) => {
                  if (!err) {
                    // DB 저장
                    self.QueryUserProperty(1, self.m_strScreenName, buffer.toString('base64'));
                  }
                });
              }

              if( nType === TOTAL_SETUP_SAVE_TYPE || nType === TOOL_SETUP_SAVE_TYPE ) {
                if( bSaveTool === true ) {
                  const saveTargetToolProp = [];
                  saveTargetToolProp.push('{');
                  saveTargetToolProp.push('"' + self.m_strScreenName + 'toolinfo":');
                  saveTargetToolProp.push(strChartToolProperty);
                  saveTargetToolProp.push('}');
                  zlib.deflate(saveTargetToolProp.join(''), (err, buffer) => {
                    if (!err) {
                      // DB 저장                                
                      self.QueryUserProperty(1, self.m_strScreenName + 'toolinfo', buffer.toString('base64'));
                    }
                  });
                }
              }
            }
        },
        QueryUserProperty(regGb, key, data) {            
          const userId = this.getUserId;
          return new Promise((resolve, reject) => {
            this.$socket.sendProcessByName('d2001', queryData => {
              let block = queryData.getBlockData('InBlock1')[0];
              block['reg_gb'] = regGb;      // 구분 1   [0:조회, 1:등록, 2:삭제]
              block['user_id'] = userId;    // 유저ID 10
              block['key'] = key;           // KEY 20

              // 저장일 경우 data 압축 후 셋팅
              if (regGb === 1) {
                block['datalen'] = data.length; // 데이터사이즈 7                            
                block['data'] = data;           // 데이터내용 1048576
              }
            }, queryData => {
              //응답값 확인
              if (!queryData) {
                return reject('queryData is null');
              }

              // rslt_cls|조회결과(1), rslt_msg|결과메세지(100), out_cnt|결과갯수(4)
              const block0 = queryData.getBlockData('OutBlock1')[0];
              console.log('[d2001] OutBlock1 결과 메세지: %s', block0.rslt_cls === '1' ? '성공' : block0.rslt_msg);

              // user_id|유저ID(10), key|KEY(20), datalen|데이터사이즈(7), data|데이터내용(1048576)
              const outBlock2 = queryData.getBlockData('OutBlock2')[0];
              resolve(outBlock2);
            })
          }).then(function(outBlock) {
            if(outBlock)
              return outBlock.data;
          }, function(reason) {
            console.log(reason);
          });
        },
        ResetChart: function(e){
          if (this.m_strChartDIV === e.m_strChartParentDIV) {
            var rChart = e.m_rChart;
            this.QueryInfo.chartFullProperty = rChart.GetDefaultChartFullProperty();
            var RQProperty = null;
            this.QueryInfo.strRqArray = [];
            for (var sRQ in this.QueryInfo.chartFullProperty.m_mapRQProperty) {
              this.QueryInfo.strRqArray[this.QueryInfo.strRqArray.length] = sRQ;
              if (RQProperty === null)
                RQProperty = this.QueryInfo.chartFullProperty.m_mapRQProperty[sRQ];
            }

            //첫번째 rq는 화면에서 정해진 코드로 변경
            RQProperty.m_strCode = this.symbol;
            RQProperty.m_strName = this.symbol;

            //주기 , 조회 개수는 저장된 내용을 적용
            this.QueryInfo.packetId = null;
            this.QueryInfo.opCode = "LOAD_PROPERTY";
            this.QueryInfo.symbol = this.symbol;
            this.QueryInfo.cycle = RQProperty.m_nCycle;
            this.QueryInfo.interval = RQProperty.m_nInterval;

            let nRqCnt = this.CalcRqCnt(this.QueryInfo.chartFullProperty.m_nViewCnt);
            this.QueryInfo.nRqDataCnt = nRqCnt ; //RQProperty.m_nRequestDataCnt;

            // 현재 주기 표기
            this.$emit('update:propdata', {
              cycle: this.QueryInfo.cycle,
              interval: this.QueryInfo.interval,
              icnt: this.QueryInfo.nRqDataCnt
            });

            var strUserID = this.getUserId;
            if (strUserID !== null) {
              this.clearRealContract(strUserID);
              this.clearRealBalance(strUserID);
              this.clearRealAlarm(strUserID);
            }
            rChart.SendEvent('Event_ExtendBottomArea');
            this.RequestChart( true );
          }            
        },
        RequestContract: function (strUserID, symbol) {
          const Chart = ChartObj[this.chartIndex], _this = this;
          console.log("미체결내역조회[%s] 불러오기 start", symbol);
          this.$socket.sendProcessByName('b0001', function (queryData) {
            var block = queryData.getBlockData('InBlock1')[0];
            block['user_id'] = strUserID;    // 계정ID 10
            block['qry_ord_tp'] = '0';          // 조회주문구분 1
            block['qry_cond_tp'] = '0';         // 조회조건구분 1
            block['symbol'] = symbol;           // 종목코드 15
            block['buy_sell_tp'] = null;        // 매수도구분 1
            block['qry_auto_trd_tp'] = null;    // 조회자동매매구분 1
            block['req_cnt'] = "30";            // 요청건수 5

            _this.clearRealContract(strUserID);

            console.log("RequestContract send:");
          }, function (queryData) {
            // 미체결라인 배열 초기화
            Chart.RemoveAllTradingLine( 0 );

            //응답값 확인
            if (!queryData) {
              console.error("미체결내역조회[%s] 불러오기 error", symbol);
              return;
            }

            var block0 = queryData.getBlockData('OutBlock1')[0];
            console.log("미체결내역조회[%s] 수신", block0.rsp_cnt);

            var dataArr = queryData.getBlockData('OutBlock2');
            //console.log(dataArr);

            var data;
            var strKey, HoldingCount, strPrice;
            var nDataLength = dataArr.length;
            for (var i = 0; i < nDataLength; i++) {
              data = dataArr[i];
              strKey = "" + data.ord_no;
              strPrice = "" + data.ord_prc;
              Chart.AddTraidngLine( 0, strKey, data.symbol, strPrice, data.remn_qty );
            }
            _this.SetRealContract( strUserID );
            if (nDataLength > 0)
              Chart.Draw(DRAW_CASE_REAL);
          });
        },
        SetRealContract: function (strUserID) {
            console.log("주문체결통지자동추가 등록 start");
            const Chart = ChartObj[this.chartIndex], self = this;
            var Key = [];
            Key[0] = strUserID;
            this.$socket.registerReal("RB03", "key_user_id", Key, "ExchangeChart", function(queryData) {
              console.log("주문체결통지자동추가 수신1");
              //응답값 확인
              if (!queryData) {
                console.error("주문체결통지자동추가[%s] 불러오기 error");
                return;
              }

              var data = queryData.getBlockData('OutBlock1')[0];
              if( strUserID !== data.key_user_id )
                return;

              var symbol = self.symbol;
              if( data.symbol !== symbol )
                return;

              var evntTp = '';
              if (data.evnt_tp == '1') evntTp = '1.주문확인';
              else if (data.evnt_tp == '2') evntTp = '2.주문거부';
              else if (data.evnt_tp == '3') evntTp = '3.정정확인';
              else if (data.evnt_tp == '4') evntTp = '4.취소확인';
              else if (data.evnt_tp == '5') evntTp = '5.자동취소';
              else if (data.evnt_tp == '6') evntTp = '6.체결';

              console.log("실시간데이터 타입 [%s]", evntTp);

              var nKey = Number(data.ord_no);
              var strKey = "" + nKey;
              var nOrgKey = Number(data.org_ord_no);
              var strOrgKey = "" + nOrgKey;

              var strPrice = "" + data.ord_prc;
              var nCount = Number(data.remn_qty);

              if (nOrgKey !== 0)
                strKey = strOrgKey;

              // 2.주문거부, 4.취소확인, 5.자동취소 시 삭제
              if( data.evnt_tp === '2' || data.evnt_tp === '4' || data.evnt_tp === '5' ) {
                Chart.RemoveTradingLine( 0, strKey, symbol );
              } else if( data.evnt_tp === '1' ) {
                // 1.주문확인(신규)
                Chart.AddTraidngLine( 0, strKey, symbol, strPrice, nCount );
              } else if( data.evnt_tp === '3' ) {
                // 3.정정확인
                Chart.UpdateTradingLine( 0, strKey, symbol, strPrice, nCount );
              } else if( data.evnt_tp === '6' ) {
                // 6.체결
                if( data.all_cntr_yn === 'Y' ) {
                  // 잔여 수량이 없을때 삭제
                  Chart.RemoveTradingLine( 0, strKey, symbol );
                } else {
                  // 잔여 수량이 남아있을때 수정
                  Chart.UpdateTradingLine( 0, strKey, symbol, strPrice, nCount );
                }
              }
              Chart.Draw(DRAW_CASE_REAL);
            }
          );
          console.log("주문체결통지자동 등록 end");
        },
        clearRealContract: function (strUserID) {
          console.log("주문체결통지자동[%s] 해제 start", strUserID);
          this.$socket.unregisterReal("RB03", [strUserID], "ExchangeChart");
          console.log("주문체결통지자동[%s] 해제 end", strUserID);
        },
        RequestBalance: function (strUserID, symbol ) {
          const Chart = ChartObj[this.chartIndex], _this = this;
          var symbolInfo = this.$_.findWhere(this.coinList, {o_symbol : symbol});
          if( symbolInfo.o_setl_cur_cd_n !== "KRW" ) {
            // 평균매수가는 KRW일때만 보인다
            // 평균매수가 배열 초기화
            Chart.RemoveAllTradingLine( 2 );
            return;
          }

          console.log("일반잔고조회 start");
          this.$socket.sendProcessByName('b0002', function (queryData) {
            var block = queryData.getBlockData('InBlock1')[0];
            block['user_id'] = strUserID;            // 계정ID 10
            block['cur_cd'] = symbolInfo.o_trgt_cur_cd_n; // 통화코드 5
            block['fee_tp'] = '0';                      // 수수료포함구분 1
            _this.clearRealBalance(strUserID);
            console.log("RequestBalance send:");
          }, function (queryData) {
            // 평균매수가 배열 초기화
            Chart.RemoveAllTradingLine( 2 );

            //응답값 확인
            if (!queryData) {
              console.error("일반잔고조회 error");
              return;
            }

            var block1 = queryData.getBlockData('OutBlock1')[0];
            if( block1.rsp_cnt <= 0 )
              return;

            var data = queryData.getBlockData('OutBlock2')[0];
            console.log("일반잔고조회 수신");

            var AvgPrice;
            var symbol = _this.symbol;
            var symbolInfo = _this.$_.findWhere(_this.coinList, {o_symbol : symbol});
            if (data.cur_cd === symbolInfo.o_trgt_cur_cd_n) {
              AvgPrice = "" + data.buy_prc;
              Chart.AddTraidngLine( 2, symbolInfo.o_trgt_cur_cd_n, symbol, AvgPrice );
              Chart.Draw(DRAW_CASE_REAL);
            }
            _this.SetRealBalance(strUserID);
          });
        },
        SetRealBalance: function (strUserID) {
            console.log("잔고실시간 등록 start");
            const Chart = ChartObj[this.chartIndex], _this = this;
            var Key = [];
            Key[0] = strUserID;
            this.$socket.registerReal("RB02", "key_user_id", Key, "ExchangeChart",
                function(queryData)
                {
                    console.log("잔고실시간 수신1");
                    //응답값 확인
                    if (!queryData) {
                        console.error("잔고실시간 불러오기 error");
                        return;
                    }

                    var data = queryData.getBlockData('OutBlock1')[0];

                    if( strUserID !== data.key_user_id )
                        return;

                    var symbol = _this.symbol;
                    var symbolInfo = _this.$_.findWhere(_this.coinList, {o_symbol : symbol});
                    if( data.cur_cd === symbolInfo.o_trgt_cur_cd_n )
                    {
                        var AvgPrice = "" + Number(data.avg_buy_prc);
                        Chart.UpdateTradingLine( 2, symbolInfo.o_trgt_cur_cd_n, symbol, AvgPrice );
                        Chart.Draw(DRAW_CASE_REAL);
                    }
                }
            );
            console.log("실시간데이터 등록 end" );
        },
        clearRealBalance: function (strUserID) {
            console.log("잔고실시간 해제 start");
            this.$socket.unregisterReal("RB02", [strUserID], "ExchangeChart");
            console.log("잔고실시간 해제 end");
        },
        RequestAlarm: function (strUserID, symbol )
        {
            const Chart = ChartObj[this.chartIndex], _this = this;
            console.log("지정가알림 조회 start");
            this.$socket.sendProcessByName('f0021', function (queryData) {
              var block = queryData.getBlockData('InBlock1')[0];
              block['UserID'] = strUserID;         // 계정ID 10
              block['MFlag'] = 'W';                // 조회구분 1 'M':MTS 조회 'W':WTS 조회
              //block['Code'] = symbol;              // 종목코드 15
              //block['CondNo'] = "0001";            // 조건 번호 : 0001지정가 알림
              //block['NextFlag'] = 'F';             // Next 조회 유무 1 F:최초, N:연속
              //block['NextKey'] = '99999999999999'; // Next 키 14

              _this.clearRealAlarm(strUserID);

              console.log("RequestAlarm send:");
          },
          function (queryData)
          {
            // 알림선 배열 초기화
            Chart.RemoveAllTradingLine( 1 );

            //응답값 확인
            if (!queryData) {
              console.error("지정가알림 error");
              return;
            }

            var block1 = queryData.getBlockData('OutBlock1')[0];
            var nDataLength = Number( block1.out_cnt );
            if( nDataLength <= 0 )
              return;

            var dataArray = queryData.getBlockData('OutBlock2');
            console.log("지정가알림 수신");

            var bAdd = false;
            var data, strPrice, strKey;
            var symbol = _this.symbol;
            for (var i = 0; i < nDataLength; i++) {
              data = dataArray[i];
              if (symbol === data.Code && "0001" === data.CondNo) {
                bAdd = true;
                strPrice = data.Condition1;
                strKey = symbol + ":" + strPrice;
                Chart.AddTraidngLine( 1, strKey, symbol, strPrice );
              }
            }
            if( bAdd )
              Chart.Draw(DRAW_CASE_REAL);
            _this.SetRealAlarm(strUserID);
          });
        },
        SetupAlarm: function (strUserID, rAlarmLineInfo )
        {
            var _this = this;
            console.log("알림 설정 start");
            this.$socket.sendProcessByName('f0020',
                function (queryData)
                {
                    var block = queryData.getBlockData('InBlock1')[0];
                    block['JobFlag'] = 'D';                            // 작업구분 1 D:삭제, R:등록
                    block['UserID'] = strUserID;                       // 계정ID 10
                    block['CondNo'] = "0001";                          // 조건 번호 : 0001지정가 알림
                    block['Code'] = rAlarmLineInfo.m_strItemCode;      // 종목코드 15
                    block['Condition1'] = rAlarmLineInfo.m_strPrice;   // 상세구분1 16 : 설정 지정가
                    block['Condition2'] = "";                          // 상세구분2 16 : 사용안함
                    block['Condition3'] = "";                          // 상세구분3 16 : 사용안함

                    console.log("SetupAlarm send:");
                },
                function (queryData)
                {
                    //응답값 확인
                    if (!queryData)
                    {
                        console.error("알림 설정 error");
                        return;
                    }

                    var block1 = queryData.getBlockData('OutBlock1')[0];

                    if( block1.Result === "S200" )
                    {
                        // 알림선 삭제 처리는 신호처리에서 작업함
                        //Chart.RemoveTradingLine(1, rAlarmLineInfo.m_strKey, rAlarmLineInfo.m_strItemCode );
                        //Chart.Draw(DRAW_CASE_TR);
                    }
                });

        },
        SetRealAlarm: function (strUserID)
        {
            console.log("지정가알림 실시간 등록 start");
            const Chart = ChartObj[this.chartIndex], self = this;
            var Key = [];
            Key[0] = strUserID;
            this.$socket.registerReal("KVF0", "key_user_id", Key, "ExchangeChart",
                function(queryData)
                {
                    console.log("지정가알림 실시간 수신1");
                    //응답값 확인
                    if (!queryData) {
                        console.error("지정가알림 실시간 불러오기 error");
                        return;
                    }

                    var data = queryData.getBlockData('OutBlock1')[0];
                    if( strUserID !== data.user_id )
                        return;

                    var symbol = self.symbol;
                    if( data.symbol === symbol && data.cond_no === "0001" )
                    {
                        var strPrice = data.condition1;
                        var strKey = symbol + ":" + strPrice;
                        if( data.gb === 'R' )
                        {
                            Chart.AddTraidngLine( 1, strKey, symbol, strPrice );
                        }
                        else if( data.gb === 'D' )
                        {
                            Chart.RemoveTradingLine( 1, strKey, symbol );
                        }
                        Chart.Draw(DRAW_CASE_REAL);
                    }
                }
            );
            console.log("지정가알림 실시간 등록 end" );
        },
        clearRealAlarm: function (strUserID) {
            console.log("지정가알림 실시간 해제 start");
            this.$socket.unregisterReal("KVF0", [strUserID], "ExchangeChart");
            console.log("지정가알림 실시간 해제 end");
        },
        // 20190201 전중현 : 미체결, 평균매수가, 알림선 라인 설정을 위한 조회/실시간 처리 <<
        // 알림선 설정 기존값 저장
        setOldAlermProps: function(alermProps) {
            this.oldAlermProps = _lodash.cloneDeep(alermProps);
        },
        getAlermProp() {
            const Chart = ChartObj[this.chartIndex], alermProps = [];
            alermProps.push({text: this.$t('html5chart.noncontract'), value: Chart.GetUseNonContractLine() || false});
            alermProps.push({text: this.$t('html5chart.pricealert'), value: Chart.GetUseAlarmLine() || false});
            alermProps.push({text: this.$t('html5chart.avgbuyprice'), value: Chart.GetUseAvgBuyPriceLine() || false});

            this.setOldAlermProps(alermProps);
            
            return alermProps;
        },
        setAlermProp (alermProps) {
            const Chart = ChartObj[this.chartIndex];
            // 알림창 닫힐때 선택한 옵션은 Request         
            Chart.SetUseNonContractLine( alermProps[0]['value'] );
            Chart.SetUseAlarmLine( alermProps[1]['value'] );
            Chart.SetUseAvgBuyPriceLine( alermProps[2]['value'] );

            this.SaveChart(Chart); 
            this.CheckAndRequestData(Chart);
            this.setOldAlermProps(alermProps);
            Chart.Draw(DRAW_CASE_REAL);
        },
        // 차트유형/지표설정
        showTypePopup (strKey) {
			const Chart = ChartObj[this.chartIndex];
			Chart.ShowModalType(strKey);
        },
        // 설정창 오픈
        showSettingPopup (strKey) {
            const Chart = ChartObj[this.chartIndex];
			Chart.ShowModalSetting(strKey);
        },
        // 십자선 수치조회
        toggleDatalistMode () {
            const Chart = ChartObj[this.chartIndex];
            let isShowDataListMode = false;
            if (this.QueryInfo.chartFullProperty) {
                isShowDataListMode = this.QueryInfo.chartFullProperty.m_GlobalProperty.m_nShowDataListMode;
            } else {
                isShowDataListMode = Boolean(Chart.GetShowDataListMode());
            }

            this.$emit('init-sidebar-menu', { text: 'crosslinesearch', isActive: isShowDataListMode });
        },
        // 깊이차트 전환
        changeDepthChart (e) {
            if (this.m_strChartDIV === e.m_strChartParentDIV) {
            	this.$emit('change-depth-chart');
            }
        },
        // 차트 초기화
        doChartReset() {
            const Chart = ChartObj[this.chartIndex];
            Chart.SendEvent('Event_ResetChart');
        },
        // 선택툴 해제
        unselectTool() {
            const Chart = ChartObj[this.chartIndex];
            Chart.UnSelectTool();
        },
        // 분석도구
        selectDrawTool(nType) {
            const Chart = ChartObj[this.chartIndex];
            if (nType) {
                Chart.AddTool(TOOL_TYPE[nType]);                
            } else {
                Chart.AddTool(null);
            }
        },        
        // 지우개
        toggleEraseTool(bFlag) {
            const Chart = ChartObj[this.chartIndex];
            Chart.RemoveOneTool(bFlag);
        },
        // 분석툴 초기화
        doToolReset () {
            const Chart = ChartObj[this.chartIndex];
            Chart.RemoveAllTool();
        },
        // 십자선 수치조회
        toggleDataList(nMode) {
            const Chart = ChartObj[this.chartIndex];
            Chart.SetShowDataListMode(Number(nMode));
        },
        // 사이드바 확장
        extendSidebarArea(flag) {
            if (flag) {
                this.$el.offsetParent.style.width = "calc(100% - 49px)";
            } else {
                this.$el.offsetParent.style.width = "100%";
            }

            this.resize();
        },
        // 하단메뉴 확장
        extendBottomArea(e) {

            if (this.m_strChartDIV === e.m_strChartParentDIV) {
                const Chart = ChartObj[this.chartIndex];

                let isVisibleBottomArea = false;
                if (this.QueryInfo.chartFullProperty) {
                    isVisibleBottomArea = this.QueryInfo.chartFullProperty.m_GlobalProperty.m_bShowBottomArea;
                } else {
                    isVisibleBottomArea = Chart.IsVisibleBottomArea();
                }

                if (isVisibleBottomArea) {
                    this.$el.offsetParent.offsetParent.style.height = "calc(100% - 88px)";
                    this.$emit("update:isSlideBottomMenu", true);
                    this.$emit("update:isLog", e.m_GlobalProperty.m_bLogPriceYAxis);
                    this.$emit("update:isInvert", e.m_GlobalProperty.m_bInvertPriceYAxis);
                } else {
                    this.$el.offsetParent.offsetParent.style.height = "calc(100% - 40px)";
                    this.$emit("update:isSlideBottomMenu", false);
                }

                this.resize();
            }            
        },
        // 로그
        toggleLog(bLog) {
            const Chart = ChartObj[this.chartIndex];
            Chart.SetLogYScale(bLog);
        },
        // 뒤집기
        toggleInvert(bInvert) {
            const Chart = ChartObj[this.chartIndex];
            Chart.SetInvertYScale(bInvert);
        },
        // 십자선 보이기 여부
        initCrossLine() {
            const Chart = ChartObj[this.chartIndex];
            let isDrawCrossLine = false;
            if (this.QueryInfo.chartFullProperty) {
                isDrawCrossLine = this.QueryInfo.chartFullProperty.m_GlobalProperty.m_bShowCrossLine;
            } else {
                isDrawCrossLine = Boolean(Chart.IsVisibleCrossLine());
            }
            
            this.$emit('init-menu-btn', { text: 'showdata', isActive: isDrawCrossLine });
        },
        toggleCrossLine(bDrawCrossLine) {
            const Chart = ChartObj[this.chartIndex];
            Chart.ShowCrossLine(bDrawCrossLine);
        },
        // 알림설정 가격 전달
        ChangePrice(e) {
            this.$EventBus.$emit('changePriceFromChart', e.m_InfoData);
        },
        // 분석툴 불러오기
        LoadToolInfo( bServerLoad ) {
          let strChartToolProperty;
          let strToolKey = this.m_strScreenName + 'toolinfo';
          const Chart = ChartObj[this.chartIndex], self = this;;
          if( bServerLoad === true && this.isLoggedIn && this.getUserId ) {
            this.QueryUserProperty(0, strToolKey).then(function(data) {
              if (data) {
                zlib.inflate(new Buffer(data, 'base64'), (err, buffer) => {
                  if (!err) {
                    try {
                      // 조회된 데이터가 JSON 형태가 아닐 경우 catch
                      const savedToolData = JSON.parse(buffer.toString());
                      Object.keys(savedToolData).forEach((key) => {
                        let value = savedToolData[key];
                        if (value) {
                          localStorage.setItem(key, JSON.stringify(value));
                        }
                      });
                    } catch(err) {
                      console.error(err.message);
                    }
                  }
                  // localstorage에 저장 후
                  strChartToolProperty = localStorage.getItem(strToolKey);
                  if(strChartToolProperty)  {
                    self.QueryInfo.chartToolProperty = JSON.parse(strChartToolProperty);
                  } else {
                    self.QueryInfo.chartToolProperty = null;
                  }
                });
              } else {
                // 조회 데이터가 없을 경우
                strChartToolProperty = localStorage.getItem(strToolKey);
                if(strChartToolProperty) {
                  self.QueryInfo.chartToolProperty = JSON.parse(strChartToolProperty);
                } else {
                  self.QueryInfo.chartToolProperty = null;
                }
              }
          });
        } else {
          // 로그인하지 않았을 경우
          strChartToolProperty = localStorage.getItem(strToolKey);
          if (strChartToolProperty) {
            self.QueryInfo.chartToolProperty = JSON.parse(strChartToolProperty);
          } else {
            self.QueryInfo.chartToolProperty = null;
          }
        }
      }
    },
    created () {
      console.log("created ()");
      //LJH 2019.03.04 Mounted에서 크기를 구했을시 차트영역의 크기가 정확 않음
      this.$nextTick(function () {
          this.resize();
      });
    },
    beforeMount () {
      console.log("beforeMount ()");
      const ChartObjKeys = Object.keys(ChartObj);
      if (ChartObjKeys.length > 0) {
        this.chartIndex = Math.max(ChartObjKeys) + 1;
      } else {
        this.chartIndex = 0;
      }
      this.m_strChartDIV = "ChartDIV" + this.chartIndex;
    },
    mounted () {
        console.log("mounted ()");

        this.bRunMounted = true;

        this.CreateChart();

        const Chart = ChartObj[this.chartIndex];

        Chart.InitCtrl();
        Chart.SetBlockType(VERT_BLOCK_TYPE);

        //언어팩 예외처리 LJH 20190312
        if (this.$i18n.locale === 'en') {
            Chart.LoadLang('EN', false);
        } else {
            Chart.LoadLang('KR', false);
        }

        // 마스터정보 조회후 호출됨 - LJH 20190219
        this.$EventBus.$on('loadStockData', this.loadStockDataCallback);

        // 소켓이 종료되었을때 호출됨 - LJH 20190219
        this.$EventBus.$on('resetLoadStockData', this.resetLoadStockDataCallback);

        //소켓 관련 이벤트 변경 - 20190219 김성진 ->>
        if(this.coinList.length > 0 && !this.dataLoaded) {
            this.$EventBus.$emit('loadStockData');
        }
        //소켓 관련 이벤트 변경 - 20190219 김성진 <<-

        this.$EventBus.$on('changeCurrentSymbol', this.changeCurrentSymbol);

        this.$EventBus.$on('changeSymbolToChart', this.changeSymbolToChart);

        // this.$EventBus.$on('changeCurrentSymbol', (symbol) => {
        //     console.log("changeCurrentSymbol__________ : " + symbol);
        //     this.symbol = symbol;
        //     this.BeforeRequestChart();
        // });
    },
    beforeUpdate () {
        console.log("beforeUpdate ()");
    },
    updated () {
        console.log("updated ()");
    },
    beforeDestroy () {
        //component 종료
        console.log("beforeDestory ()");

        this.SaveChart(ChartObj[this.chartIndex]);

        //resize event 제거
        window.removeEventListener('resize', this.resize);
        document.removeEventListener('Event_Scroll', this.gChartEventScrollFunction);

        // 20190201 전중현 : 미체결, 평균매수가, 알림선 라인 설정을 위한 조회/실시간 처리
        document.removeEventListener('Event_SelectTradingLine', this.gChartEventSelectTradingLine);

        //차트 초기화
        document.removeEventListener('Event_ResetChart', this.ResetChart);

        //차트 가격 전달
        document.removeEventListener('Event_ChangePrice', this.ChangePrice);

        //차트 저장
        document.removeEventListener('Event_SaveProperty', this.SavePropertyFromChart);

        //차트설정 취소시 이벤트 전달(화면에서 예외처리 필요시 사용)
        document.removeEventListener('Event_CancelSetup', this.CancelSetup);

        document.removeEventListener('Event_ChangeDepthChart', this.changeDepthChart);
        document.removeEventListener('Event_ExtendBottomArea', this.extendBottomArea);

        this.$EventBus.$off('changeCurrentSymbol', this.changeCurrentSymbol);

        this.$EventBus.$off('changeSymbolToChart', this.changeSymbolToChart);

        //실시간데이터 끊기
        this.clearRealData(this.symbol);

		// 20190201 전중현 : 미체결, 평균매수가, 알림선 라인 설정을 위한 조회/실시간 처리 >>
        var strUserID = this.getUserId;
        if( strUserID !== null)
        {
            this.clearRealContract(strUserID);
            this.clearRealBalance(strUserID);
            this.clearRealAlarm(strUserID);
        }
		// 20190201 전중현 : 미체결, 평균매수가, 알림선 라인 설정을 위한 조회/실시간 처리 <<

        // 등록된 이벤트 제거
        this.$EventBus.$off('loadStockData', this.loadStockDataCallback);
        this.$EventBus.$off('resetLoadStockData', this.resetLoadStockDataCallback);

        this.DestroyChart();
    },
    destroyed () {
        console.log("destroyed ()");
        //Chart.ClearIndicator();
        //localStorage.removeItem('symbol');
        //localStorage.removeItem('chart'); //차트만 필요시
        //localStorage.clear();// 최주형 : 로컬스토리지 클리어 삭제했습니다.. 다른값도 초기화되네요 (차트에서 스토리지 안쓰나보네요 ? 사용하시면 알려주세요)
    }
}
</script>
