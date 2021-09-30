<template>
    <div :id="m_strChartDIV"></div>
</template>

<script>
import MobileDetect from 'mobile-detect';
import { mapGetters, mapState } from 'vuex';

let DepthChartObj = {};
let md = new MobileDetect(window.navigator.userAgent);

function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

export default {
    data() {
        return {
            chartIndex: 0,
            chkAddData: true,
            preSymbol: '',
            symbol: '',
            dataLoaded: false,            

            m_strLocalSaveKey:"",
            m_strChartDIV:"DepthChartDIV",
            m_strThemeName:"default",            
            m_nScrollBarType:0,            
            QueryInfo :{
                "opCode":"LOAD_PROPERTY", //"CHANGE_SYMBOL", "CHANGE_CYCLE"(비동기통신이기 때문에 응답이 왔을 때 경우에 따라 정확하게 처리하려면 필요-조회요청시 셋팅한다)
                "packetId":"",//조회요청시 조회요청함수 리턴값으로 부터 받아 저장해놓고 응답을 왔을 때 해당요청에 대한 응답이 맞는지 체크시 사용
                "symbol": "",              
                "strRqArray": null,//복수 종목 차트 설정을 저장한 경우 복구할 때 다음조회할 종목정보 저장 배열
                "chartFullProperty":null, //차트설정 object - 주기까지 저장되어 있다
                "nextQueryInfo":{ //모든 조회가 완료된 후 이어서 조회가 되어야 하는 경우 정보 저장해둔다
                    "opCode":null,
                    "symbol":null                
                }
            },            
            m_RealHogaWrapper:{
                "nIndex":0, //실시간호가 받을 때마다 1씩 증가, 99999까지 증가 이후 0으로 감소시켜 다시 증가 (차트반영시점에 데이터가 변경되었는지 여부 체크시 필요-초당 40,50건 내려오는 경우 있으므로 시간으로 비교체크 어려움)
                "nPrevIndex":null,
                "hogaData":null //서버에서 내려준 KVH2 리얼호가 자료구조 복사본 그대로 저장(다른화면과의 영향도 줄이기 위함)
            },
            m_nTimerID:null,
            m_CurPrice:null //현재가(KVS0를 통해 실시간반영)
        }
    },
    watch: {
      symbol(after) {
        //심볼이 변경: 이전심볼에 대한 실시간데이터 처리 거부                
        if (this.preSymbol !== after) {
            this.preSymbol = after;
        }
      },
      //getLangKind 언어변경 감지 20190218 LJH
      getLangKind(val) {
        DepthChartObj[this.chartIndex].LoadLang(val, true);
      }
    },
    computed: {
      ...mapState({
			  coinList : state => state.data['n1001'],
      }),
      //getLangKind 언어변수 20190218 LJH
      ...mapGetters(['hogaUnit', 'getUserId', 'getLangKind'])
    },
    methods: {
        CreateChart() {
            console.log('CreateChart()______________');            
            const offsetWidth = this.$el.offsetParent.offsetWidth;
            const offsetHeight = this.$el.offsetParent.offsetHeight;

            console.log(offsetWidth, offsetHeight);

            const ChartCanvas = document.createElement("canvas");
            ChartCanvas.id = this.m_strChartDIV + "_Canvas";
            ChartCanvas.width =  offsetWidth;
            ChartCanvas.height = offsetHeight;
            
            this.$el.width = offsetWidth;
            this.$el.height = offsetHeight;
            this.$el.appendChild(ChartCanvas);

            // 차트 초기화
            if(!md.mobile()) {
                this.m_strThemeName = "default"; // 테마 설정

                // 스크롤바 스타일 설정
                this.m_nScrollBarType = 1;
                if (this.$route.name == "fullexchange") {
                    this.m_strThemeName = "full";
                } else if (this.$route.name == "fullscreenchart") {
                    this.m_nScrollBarType = 0;
                }            
                DepthChartObj[this.chartIndex] = new CWebChart(this.m_strChartDIV, this.m_strChartDIV + "_Canvas", this.m_nScrollBarType, this.m_strThemeName);

                // 그래프 선택 시 설정창 호출
                /*
                document.addEventListener('Event_SelectGraph', function (e) {
                    console.log("그래프 선택");
                    _this.$emit("show-chart-setting", {
                        "isShow": !_this.settingProp.isShow, 
                        "strKey": e.m_InfoData.m_strKey, 
                        "strName": e.m_InfoData.m_strName});
                });
                */
            } else {
                this.m_nScrollBarType = 1;
                DepthChartObj[this.chartIndex] = new CMobileWebChart(this.m_strChartDIV, this.m_strChartDIV + "_Canvas", this.m_nScrollBarType);
            }
        },
        DestroyChart() {
            console.log('DestroyChart()______________');
            delete DepthChartObj[this.chartIndex];
        },
        changeCurrentSymbol: function(symbol) {
            console.log("changeCurrentSymbol__________ : " + symbol);
            this.symbol = symbol;
            this.BeforeRequestChart();
        },
        loadStockDataCallback() {
            console.log('loadStockData________________________: %s', this.symbol);
            if(this.dataLoaded) return;
            this.dataLoaded = true;            
            
            this.BeforeRequestChart();
        },
        resetLoadStockDataCallback() {
            this.dataLoaded = false;
        },
        BeforeRequestChart: function() {
            
            //this.$socket 상태에 따라 this.getPacket(); 호출여부 결정해야 됨 LJH 2018.12.14        
            if (this.$socket.netIo.socket) {

                this.clearRealData(this.preSymbol);
                
                //정리된 내용으로 QueryInfo 셋팅
                this.QueryInfo.opCode = "CHANGE_SYMBOL";
                this.QueryInfo.symbol = this.symbol;            

                this.RequestChart();
            }
        },
        RequestChart: function(){

            var _this = this, Chart = DepthChartObj[this.chartIndex];

            function RQInfos() {
                this.Info = new CRQInfo();//RQInfo는 차트엔진에 정의되어 있는 개체
                this.m_strContents = "";
            }
            
            var packetIdObj = this.$socket.sendProcessByName('i0011', 
                function (queryData) {
                    var block = queryData.getBlockData('InBlock1')[0];
                    block['symbol'] = _this.QueryInfo.symbol;       // 종목코드 15                
                },
                function (queryData) {

                    //응답값 확인
                    if (!queryData) {
                        console.error("차트데이터[%s] 불러오기 error", _this.QueryInfo.sysmbol);
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

                    var i, nNumPacketLength = 20, nAmountPacketLength = 30;

                    var hogaData = block;
                    console.log(hogaData);

                    var strKey;                    
                    var chartData = "";
                    var dataLength = 0;
                    var dHoga = [], dHogaRest = [];

                    //차트데이터 추출
                    dHoga[0] = pad(hogaData.bid30, nNumPacketLength);
                    dHogaRest[0] = pad(hogaData.bidrest30, nNumPacketLength);
                    dHoga[1] = pad(hogaData.bid29, nNumPacketLength);
                    dHogaRest[1] = pad(hogaData.bidrest29, nNumPacketLength);
                    dHoga[2] = pad(hogaData.bid28, nNumPacketLength);
                    dHogaRest[2] = pad(hogaData.bidrest28, nNumPacketLength);
                    dHoga[3] = pad(hogaData.bid27, nNumPacketLength);
                    dHogaRest[3] = pad(hogaData.bidrest27, nNumPacketLength);
                    dHoga[4] = pad(hogaData.bid26, nNumPacketLength);
                    dHogaRest[4] = pad(hogaData.bidrest26, nNumPacketLength);
                    dHoga[5] = pad(hogaData.bid25, nNumPacketLength);
                    dHogaRest[5] = pad(hogaData.bidrest25, nNumPacketLength);
                    dHoga[6] = pad(hogaData.bid24, nNumPacketLength);
                    dHogaRest[6] = pad(hogaData.bidrest24, nNumPacketLength);
                    dHoga[7] = pad(hogaData.bid23, nNumPacketLength);
                    dHogaRest[7] = pad(hogaData.bidrest23, nNumPacketLength);
                    dHoga[8] = pad(hogaData.bid22, nNumPacketLength);
                    dHogaRest[8] = pad(hogaData.bidrest22, nNumPacketLength);
                    dHoga[9] = pad(hogaData.bid21, nNumPacketLength);
                    dHogaRest[9] = pad(hogaData.bidrest21, nNumPacketLength);
                    dHoga[10] = pad(hogaData.bid20, nNumPacketLength);
                    dHogaRest[10] = pad(hogaData.bidrest20, nNumPacketLength);
                    dHoga[11] = pad(hogaData.bid19, nNumPacketLength);
                    dHogaRest[11] = pad(hogaData.bidrest19, nNumPacketLength);
                    dHoga[12] = pad(hogaData.bid18, nNumPacketLength);
                    dHogaRest[12] = pad(hogaData.bidrest18, nNumPacketLength);
                    dHoga[13] = pad(hogaData.bid17, nNumPacketLength);
                    dHogaRest[13] = pad(hogaData.bidrest17, nNumPacketLength);
                    dHoga[14] = pad(hogaData.bid16, nNumPacketLength);
                    dHogaRest[14] = pad(hogaData.bidrest16, nNumPacketLength);
                    dHoga[15] = pad(hogaData.bid15, nNumPacketLength);
                    dHogaRest[15] = pad(hogaData.bidrest15, nNumPacketLength);
                    dHoga[16] = pad(hogaData.bid14, nNumPacketLength);
                    dHogaRest[16] = pad(hogaData.bidrest14, nNumPacketLength);
                    dHoga[17] = pad(hogaData.bid13, nNumPacketLength);
                    dHogaRest[17] = pad(hogaData.bidrest13, nNumPacketLength);
                    dHoga[18] = pad(hogaData.bid12, nNumPacketLength);
                    dHogaRest[18] = pad(hogaData.bidrest12, nNumPacketLength);
                    dHoga[19] = pad(hogaData.bid11, nNumPacketLength);
                    dHogaRest[19] = pad(hogaData.bidrest11, nNumPacketLength);
                    dHoga[20] = pad(hogaData.bid10, nNumPacketLength);
                    dHogaRest[20] = pad(hogaData.bidrest10, nNumPacketLength);
                    dHoga[21] = pad(hogaData.bid9, nNumPacketLength);
                    dHogaRest[21] = pad(hogaData.bidrest9, nNumPacketLength);
                    dHoga[22] = pad(hogaData.bid8, nNumPacketLength);
                    dHogaRest[22] = pad(hogaData.bidrest8, nNumPacketLength);
                    dHoga[23] = pad(hogaData.bid7, nNumPacketLength);
                    dHogaRest[23] = pad(hogaData.bidrest7, nNumPacketLength);
                    dHoga[24] = pad(hogaData.bid6, nNumPacketLength);
                    dHogaRest[24] = pad(hogaData.bidrest6, nNumPacketLength);
                    dHoga[25] = pad(hogaData.bid5, nNumPacketLength);
                    dHogaRest[25] = pad(hogaData.bidrest5, nNumPacketLength);
                    dHoga[26] = pad(hogaData.bid4, nNumPacketLength);
                    dHogaRest[26] = pad(hogaData.bidrest4, nNumPacketLength);
                    dHoga[27] = pad(hogaData.bid3, nNumPacketLength);
                    dHogaRest[27] = pad(hogaData.bidrest3, nNumPacketLength);
                    dHoga[28] = pad(hogaData.bid2, nNumPacketLength);
                    dHogaRest[28] = pad(hogaData.bidrest2, nNumPacketLength);
                    dHoga[29] = pad(hogaData.bid1, nNumPacketLength);
                    dHogaRest[29] = pad(hogaData.bidrest1, nNumPacketLength);

                    dHoga[30] = pad(hogaData.ask1, nNumPacketLength);
                    dHogaRest[30] = pad(hogaData.askrest1, nNumPacketLength);
                    dHoga[31] = pad(hogaData.ask2, nNumPacketLength);
                    dHogaRest[31] = pad(hogaData.askrest2, nNumPacketLength);
                    dHoga[32] = pad(hogaData.ask3, nNumPacketLength);
                    dHogaRest[32] = pad(hogaData.askrest3, nNumPacketLength);
                    dHoga[33] = pad(hogaData.ask4, nNumPacketLength);
                    dHogaRest[33] = pad(hogaData.askrest4, nNumPacketLength);
                    dHoga[34] = pad(hogaData.ask5, nNumPacketLength);
                    dHogaRest[34] = pad(hogaData.askrest5, nNumPacketLength);
                    dHoga[35] = pad(hogaData.ask6, nNumPacketLength);
                    dHogaRest[35] = pad(hogaData.askrest6, nNumPacketLength);
                    dHoga[36] = pad(hogaData.ask7, nNumPacketLength);
                    dHogaRest[36] = pad(hogaData.askrest7, nNumPacketLength);
                    dHoga[37] = pad(hogaData.ask8, nNumPacketLength);
                    dHogaRest[37] = pad(hogaData.askrest8, nNumPacketLength);
                    dHoga[38] = pad(hogaData.ask9, nNumPacketLength);
                    dHogaRest[38] = pad(hogaData.askrest9, nNumPacketLength);
                    dHoga[39] = pad(hogaData.ask10, nNumPacketLength);
                    dHogaRest[39] = pad(hogaData.askrest10, nNumPacketLength);
                    dHoga[40] = pad(hogaData.ask11, nNumPacketLength);
                    dHogaRest[40] = pad(hogaData.askrest11, nNumPacketLength);
                    dHoga[41] = pad(hogaData.ask12, nNumPacketLength);
                    dHogaRest[41] = pad(hogaData.askrest12, nNumPacketLength);
                    dHoga[42] = pad(hogaData.ask13, nNumPacketLength);
                    dHogaRest[42] = pad(hogaData.askrest13, nNumPacketLength);
                    dHoga[43] = pad(hogaData.ask14, nNumPacketLength);
                    dHogaRest[43] = pad(hogaData.askrest14, nNumPacketLength);
                    dHoga[44] = pad(hogaData.ask15, nNumPacketLength);
                    dHogaRest[44] = pad(hogaData.askrest15, nNumPacketLength);
                    dHoga[45] = pad(hogaData.ask16, nNumPacketLength);
                    dHogaRest[45] = pad(hogaData.askrest16, nNumPacketLength);
                    dHoga[46] = pad(hogaData.ask17, nNumPacketLength);
                    dHogaRest[46] = pad(hogaData.askrest17, nNumPacketLength);
                    dHoga[47] = pad(hogaData.ask18, nNumPacketLength);
                    dHogaRest[47] = pad(hogaData.askrest18, nNumPacketLength);
                    dHoga[48] = pad(hogaData.ask19, nNumPacketLength);
                    dHogaRest[48] = pad(hogaData.askrest19, nNumPacketLength);
                    dHoga[49] = pad(hogaData.ask20, nNumPacketLength);
                    dHogaRest[49] = pad(hogaData.askrest20, nNumPacketLength);
                    dHoga[50] = pad(hogaData.ask21, nNumPacketLength);
                    dHogaRest[50] = pad(hogaData.askrest21, nNumPacketLength);
                    dHoga[51] = pad(hogaData.ask22, nNumPacketLength);
                    dHogaRest[51] = pad(hogaData.askrest22, nNumPacketLength);
                    dHoga[52] = pad(hogaData.ask23, nNumPacketLength);
                    dHogaRest[52] = pad(hogaData.askrest23, nNumPacketLength);
                    dHoga[53] = pad(hogaData.ask24, nNumPacketLength);
                    dHogaRest[53] = pad(hogaData.askrest24, nNumPacketLength);
                    dHoga[54] = pad(hogaData.ask25, nNumPacketLength);
                    dHogaRest[54] = pad(hogaData.askrest25, nNumPacketLength);
                    dHoga[55] = pad(hogaData.ask26, nNumPacketLength);
                    dHogaRest[55] = pad(hogaData.askrest26, nNumPacketLength);
                    dHoga[56] = pad(hogaData.ask27, nNumPacketLength);
                    dHogaRest[56] = pad(hogaData.askrest27, nNumPacketLength);
                    dHoga[57] = pad(hogaData.ask28, nNumPacketLength);
                    dHogaRest[57] = pad(hogaData.askrest28, nNumPacketLength);
                    dHoga[58] = pad(hogaData.ask29, nNumPacketLength);
                    dHogaRest[58] = pad(hogaData.askrest29, nNumPacketLength);
                    dHoga[59] = pad(hogaData.ask30, nNumPacketLength);
                    dHogaRest[59] = pad(hogaData.askrest30, nNumPacketLength);

                    //깊이차트 매수/매도 30호가 옆에 여백을 주기 위해 추가
                    dHoga.unshift(pad(0.0, nNumPacketLength));
                    dHogaRest.unshift(pad(0.0, nNumPacketLength));
                    dHoga.unshift(pad(0.0, nNumPacketLength));
                    dHogaRest.unshift(pad(0.0, nNumPacketLength));

                    dHoga[dHoga.length] = pad(0.0, nNumPacketLength);
                    dHogaRest[dHoga.length] = pad(0.0, nNumPacketLength);
                    dHoga[dHoga.length] = pad(0.0, nNumPacketLength);
                    dHogaRest[dHoga.length] = pad(0.0, nNumPacketLength);

                    //데이터 가공(호가별 금액계산 = 호가 * 잔량)
                    var dHogaAmount = [];
                    var nHogaLen = dHoga.length;
                    var nSellStartIndex = nHogaLen / 2;
                    for( i = 0 ; i < nHogaLen ; i++ )
                    {
                        var dAmount = Number(dHoga[i])* Number(dHogaRest[i]);                
                        dHogaAmount[i] = pad(dAmount, nAmountPacketLength);
                    }

                    //데이터 가공(누적잔량 = 이전호가잔량 + 현재호가 잔량, 누적금액 = 이전호가금액 + 현재호가 금액)
                    var dHogaData;

                    //매수호가잔량 , 금액 누적 계산
                    var dMinHoga = null;
                    var dSum = 0;
                    var dSumAmount = 0;
                    for( i = nSellStartIndex - 1 ; i >= 0 ; i-- )
                    {
                        dHogaData = Number(dHoga[i]);
                        if(dHogaData <= 0)
                            continue;
                        
                        dMinHoga = dHogaData;//최소 호가가격을 저장한다(호가단위 얻어올 때 사용)

                        dSum = Number(dHogaRest[i]) + dSum;
                        dHogaRest[i] = pad(dSum, nNumPacketLength);

                        dSumAmount = Number(dHogaAmount[i]) + dSumAmount;
                        dHogaAmount[i] = pad(dSumAmount, nAmountPacketLength);                    
                    }

                    //매도호가잔량 , 금액 누적 계산
                    dSum = 0;
                    dSumAmount = 0;
                    for( i = nSellStartIndex ; i < nHogaLen ; i++ )
                    {
                        dHogaData = Number(dHoga[i]);
                        if(dHogaData <= 0)
                            continue;
                        
                        if(dMinHoga === null)
                            dMinHoga = dHogaData;

                        dSum = Number(dHogaRest[i]) + dSum;
                        dHogaRest[i] = pad(dSum, nNumPacketLength);

                        dSumAmount = Number(dHogaAmount[i]) + dSumAmount;
                        dHogaAmount[i] = pad(dSumAmount, nAmountPacketLength);                    
                    }

                    _this.m_CurPrice = parseFloat(block.curprc);//현재가

                    //최종 차트데이터 완성                
                    for ( i = 0; i < nHogaLen; i++) {
                        chartData += (dHoga[i] + "" + dHogaRest[i] + "" + dHogaAmount[i] + "" + (i >= nSellStartIndex ? "1" : "0" ));
                    }

                    if(_this.QueryInfo.chartFullProperty !== null)
                    {
                        //1. 차트 리셋 및 초기화
                        Chart.ResetChart(_this.m_strChartDIV, _this.m_strChartDIV + "_Canvas", _this.m_nScrollBarType, _this.m_strThemeName, _this.QueryInfo.chartFullProperty);
                    }
                    //////////////////////////////////////////////////////////////////////////////////////////
                    //RQ 데이터 셋팅
                    //현재가, 전일종가, 대비, 등락율, 누적등락율 셋팅
                    var RQ = new RQInfos();                
                    RQ.Info.m_PriceChange = parseFloat(block.diff);//대비
                    RQ.Info.m_CurPrice = _this.m_CurPrice;//현재가
                    RQ.Info.m_ChangeRatio = parseFloat(block.updnrate);//등락율
                    RQ.Info.m_CumulativeVolume = parseFloat(block.cumdealqty);//누적거래량

                    RQ.Info.m_OpenPrice = parseFloat(block.openprc);
                    RQ.Info.m_HighPrice = parseFloat(block.highprc);
                    RQ.Info.m_LowPrice = parseFloat(block.lowprc);                

                    //종목정보 가져오기
                    var symbolInfo = _this.$_.findWhere(_this.coinList, {o_symbol : _this.QueryInfo.symbol});
                    
                    //심볼명: m_strItemCode로 사용 - LJH 2018.12.12 KR001BTC__KRW__
                    RQ.Info.m_strItemCode = _this.QueryInfo.symbol;
                    RQ.Info.m_strItemName = symbolInfo.o_inst_eng_abbr.replace("/", "/ ");
                    
                    //호가단위
                    var callPrice = dMinHoga === null ? _this.m_CurPrice : dMinHoga; //최소호가가격을 셋팅
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

                    //금액표현단위
                    var dMoneyUnit = symbolInfo.o_setl_cur_cd_n === "KRW" ? 1 : 0.001;                    

                    RQ.m_strContents = nHogaLen + "!" + chartData;

                    //////////////////////////////////////////////////////////////////////////////////////////
                    //RQ 등록
                    var sRQ = "RQ100";
                    Chart.AddRQ(sRQ);
                    Chart.SetRQInfo(sRQ, RQ.Info);
                    
                    //////////////////////////////////////////////////////////////////////////////////////////
                    //차트컨트롤에 데이터 패킷정보 셋팅                
                    Chart.AddInputNumPacketInfo(sRQ, "_HOGA_", nNumPacketLength, 10, hogaUnit, minOrder);//호가 가격 패킷
                    Chart.AddInputNumPacketInfo(sRQ, "_HOGAREST_", nNumPacketLength, 10, vUnit, vUnit.toString());//호가누적잔량 패킷
                    Chart.AddInputNumPacketInfo(sRQ, "_HOGAAMOUNT_", nAmountPacketLength, 10, dMoneyUnit, dMoneyUnit.toString());//호가누적금액패킷
                    Chart.AddInputNumPacketInfo(sRQ, "_SELLFLAG_", 1, 10, 1, "1");//매도호가여부패킷(1:매도호가, 0:매수호가)
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //데이터처리를 위해 가격차트만 먼저 등록 
                    
                    var rGraph = Chart.IsExistGraphNameInRQ(sRQ, "_HOGADEPTH_");
                    if (rGraph === null) {//차트를 새로 생성한 경우
                        
                        var rGraphProp = Chart.GetGraphPropertyFromChartFullProperty(sRQ, "_HOGADEPTH_", _this.QueryInfo.chartFullProperty);
                        if(rGraphProp)
                            strKey = Chart.AddIndicator(sRQ, rGraphProp.m_strGraphName, rGraphProp.m_nColIndex, rGraphProp.m_nRowIndex, rGraphProp.m_nVertScaleIndex, rGraphProp.m_nBlockRatio, rGraphProp.m_PropertyInfo);
                        else
                            strKey = Chart.AddIndicator(sRQ, "_HOGADEPTH_", -1, -1, -1, 1);

                        Chart.SelectGraphByKey(strKey);
                    }
                    else {//기존 차트 상태에서 종목만 변경하거나 주기를 변경하거나 연속데이터 조회하는 경우
                        strKey = rGraph.m_strKey;                            
                    }
                    
                    Chart.RegXScaleMng(sRQ, false);

                    ////////////////////////////////////////////////////////////////////////////////
                    //차트컨트롤에 차트데이터 전달
                    Chart.SetPacketData(sRQ, RQ.m_strContents, RQ.m_strContents.length, false, true, true);

                    Chart.ArrangeXScaleMng();

                    Chart.InitialViewInfo(100);
                    
                    Chart.ExtractYScaleMinMax(true);

                    //설정셋팅
                    if(_this.QueryInfo.chartFullProperty){
                        Chart.ResizeUsingProperty(_this.QueryInfo.chartFullProperty.m_MainBlockProperty, false);
                        Chart.SetGlobalProperty(_this.QueryInfo.chartFullProperty.m_GlobalProperty);
                    }
                    //else{
                    //    var rGlobalProperty = Chart.GetCloneGlobalProperty();
                    //    rGlobalProperty.SetRightMargin(0);//우측여백 제거
                    //    rGlobalProperty.SetUseWheelScroll(false);//휠 확대/축소 막음
                    //    Chart.SetGlobalProperty(rGlobalProperty);
                    //}

                    Chart.SetGlobalPropertyToChart(false);

                    Chart.Draw(DRAW_CASE_TR | DRAW_CASE_RESIZE | DRAW_CASE_ADD_CHARTBLOCK);

                    //저장/불러오기 처리 모두 완료되었음을 의미
                    _this.QueryInfo.chartFullProperty = null;
                    _this.QueryInfo.strRqArray = null;
                    
                    //실시간 데이터 등록
                    _this.setRealData(_this.QueryInfo.symbol);
                    _this.setRealHogaData(_this.QueryInfo.symbol);

                    //조회시마다 설정 내용 저장
                    _this.SaveChart(Chart);
                }
            );

            //조회요청시 통신모듈에서 리턴해준 packetid를 QueryInfo.packetId에 저장해둔 후 응답시 packetId와 비교하여 해당요청에 대한 응답인지 여부 확인
            this.QueryInfo.packetId = packetIdObj.length > 0 ? packetIdObj[0] : null;
        },   
        applyRealDataToChart:function(){

            const Chart = DepthChartObj[this.chartIndex];

            //1초 사이에 새로 들어온 데이터 없음
            if( this.m_RealHogaWrapper.nIndex === this.m_RealHogaWrapper.nPrevIndex)
                return;
            
            //실시간 등록 후 실시간 데이터 들어오지 않은 경우
            if(this.m_RealHogaWrapper.hogaData === null)
                return;

            var i, nNumPacketLength = 20, nAmountPacketLength = 30;
            var hogaData = this.m_RealHogaWrapper.hogaData;
            var CurPrice = this.m_CurPrice;

            var dHoga = [], dHogaRest = [];

            //차트데이터 추출
            dHoga[0] = pad(hogaData.bid30, nNumPacketLength);
            dHogaRest[0] = pad(hogaData.bidrest30, nNumPacketLength);
            dHoga[1] = pad(hogaData.bid29, nNumPacketLength);
            dHogaRest[1] = pad(hogaData.bidrest29, nNumPacketLength);
            dHoga[2] = pad(hogaData.bid28, nNumPacketLength);
            dHogaRest[2] = pad(hogaData.bidrest28, nNumPacketLength);
            dHoga[3] = pad(hogaData.bid27, nNumPacketLength);
            dHogaRest[3] = pad(hogaData.bidrest27, nNumPacketLength);
            dHoga[4] = pad(hogaData.bid26, nNumPacketLength);
            dHogaRest[4] = pad(hogaData.bidrest26, nNumPacketLength);
            dHoga[5] = pad(hogaData.bid25, nNumPacketLength);
            dHogaRest[5] = pad(hogaData.bidrest25, nNumPacketLength);
            dHoga[6] = pad(hogaData.bid24, nNumPacketLength);
            dHogaRest[6] = pad(hogaData.bidrest24, nNumPacketLength);
            dHoga[7] = pad(hogaData.bid23, nNumPacketLength);
            dHogaRest[7] = pad(hogaData.bidrest23, nNumPacketLength);
            dHoga[8] = pad(hogaData.bid22, nNumPacketLength);
            dHogaRest[8] = pad(hogaData.bidrest22, nNumPacketLength);
            dHoga[9] = pad(hogaData.bid21, nNumPacketLength);
            dHogaRest[9] = pad(hogaData.bidrest21, nNumPacketLength);
            dHoga[10] = pad(hogaData.bid20, nNumPacketLength);
            dHogaRest[10] = pad(hogaData.bidrest20, nNumPacketLength);
            dHoga[11] = pad(hogaData.bid19, nNumPacketLength);
            dHogaRest[11] = pad(hogaData.bidrest19, nNumPacketLength);
            dHoga[12] = pad(hogaData.bid18, nNumPacketLength);
            dHogaRest[12] = pad(hogaData.bidrest18, nNumPacketLength);
            dHoga[13] = pad(hogaData.bid17, nNumPacketLength);
            dHogaRest[13] = pad(hogaData.bidrest17, nNumPacketLength);
            dHoga[14] = pad(hogaData.bid16, nNumPacketLength);
            dHogaRest[14] = pad(hogaData.bidrest16, nNumPacketLength);
            dHoga[15] = pad(hogaData.bid15, nNumPacketLength);
            dHogaRest[15] = pad(hogaData.bidrest15, nNumPacketLength);
            dHoga[16] = pad(hogaData.bid14, nNumPacketLength);
            dHogaRest[16] = pad(hogaData.bidrest14, nNumPacketLength);
            dHoga[17] = pad(hogaData.bid13, nNumPacketLength);
            dHogaRest[17] = pad(hogaData.bidrest13, nNumPacketLength);
            dHoga[18] = pad(hogaData.bid12, nNumPacketLength);
            dHogaRest[18] = pad(hogaData.bidrest12, nNumPacketLength);
            dHoga[19] = pad(hogaData.bid11, nNumPacketLength);
            dHogaRest[19] = pad(hogaData.bidrest11, nNumPacketLength);
            dHoga[20] = pad(hogaData.bid10, nNumPacketLength);
            dHogaRest[20] = pad(hogaData.bidrest10, nNumPacketLength);
            dHoga[21] = pad(hogaData.bid9, nNumPacketLength);
            dHogaRest[21] = pad(hogaData.bidrest9, nNumPacketLength);
            dHoga[22] = pad(hogaData.bid8, nNumPacketLength);
            dHogaRest[22] = pad(hogaData.bidrest8, nNumPacketLength);
            dHoga[23] = pad(hogaData.bid7, nNumPacketLength);
            dHogaRest[23] = pad(hogaData.bidrest7, nNumPacketLength);
            dHoga[24] = pad(hogaData.bid6, nNumPacketLength);
            dHogaRest[24] = pad(hogaData.bidrest6, nNumPacketLength);
            dHoga[25] = pad(hogaData.bid5, nNumPacketLength);
            dHogaRest[25] = pad(hogaData.bidrest5, nNumPacketLength);
            dHoga[26] = pad(hogaData.bid4, nNumPacketLength);
            dHogaRest[26] = pad(hogaData.bidrest4, nNumPacketLength);
            dHoga[27] = pad(hogaData.bid3, nNumPacketLength);
            dHogaRest[27] = pad(hogaData.bidrest3, nNumPacketLength);
            dHoga[28] = pad(hogaData.bid2, nNumPacketLength);
            dHogaRest[28] = pad(hogaData.bidrest2, nNumPacketLength);
            dHoga[29] = pad(hogaData.bid1, nNumPacketLength);
            dHogaRest[29] = pad(hogaData.bidrest1, nNumPacketLength);

            dHoga[30] = pad(hogaData.ask1, nNumPacketLength);
            dHogaRest[30] = pad(hogaData.askrest1, nNumPacketLength);
            dHoga[31] = pad(hogaData.ask2, nNumPacketLength);
            dHogaRest[31] = pad(hogaData.askrest2, nNumPacketLength);
            dHoga[32] = pad(hogaData.ask3, nNumPacketLength);
            dHogaRest[32] = pad(hogaData.askrest3, nNumPacketLength);
            dHoga[33] = pad(hogaData.ask4, nNumPacketLength);
            dHogaRest[33] = pad(hogaData.askrest4, nNumPacketLength);
            dHoga[34] = pad(hogaData.ask5, nNumPacketLength);
            dHogaRest[34] = pad(hogaData.askrest5, nNumPacketLength);
            dHoga[35] = pad(hogaData.ask6, nNumPacketLength);
            dHogaRest[35] = pad(hogaData.askrest6, nNumPacketLength);
            dHoga[36] = pad(hogaData.ask7, nNumPacketLength);
            dHogaRest[36] = pad(hogaData.askrest7, nNumPacketLength);
            dHoga[37] = pad(hogaData.ask8, nNumPacketLength);
            dHogaRest[37] = pad(hogaData.askrest8, nNumPacketLength);
            dHoga[38] = pad(hogaData.ask9, nNumPacketLength);
            dHogaRest[38] = pad(hogaData.askrest9, nNumPacketLength);
            dHoga[39] = pad(hogaData.ask10, nNumPacketLength);
            dHogaRest[39] = pad(hogaData.askrest10, nNumPacketLength);
            dHoga[40] = pad(hogaData.ask11, nNumPacketLength);
            dHogaRest[40] = pad(hogaData.askrest11, nNumPacketLength);
            dHoga[41] = pad(hogaData.ask12, nNumPacketLength);
            dHogaRest[41] = pad(hogaData.askrest12, nNumPacketLength);
            dHoga[42] = pad(hogaData.ask13, nNumPacketLength);
            dHogaRest[42] = pad(hogaData.askrest13, nNumPacketLength);
            dHoga[43] = pad(hogaData.ask14, nNumPacketLength);
            dHogaRest[43] = pad(hogaData.askrest14, nNumPacketLength);
            dHoga[44] = pad(hogaData.ask15, nNumPacketLength);
            dHogaRest[44] = pad(hogaData.askrest15, nNumPacketLength);
            dHoga[45] = pad(hogaData.ask16, nNumPacketLength);
            dHogaRest[45] = pad(hogaData.askrest16, nNumPacketLength);
            dHoga[46] = pad(hogaData.ask17, nNumPacketLength);
            dHogaRest[46] = pad(hogaData.askrest17, nNumPacketLength);
            dHoga[47] = pad(hogaData.ask18, nNumPacketLength);
            dHogaRest[47] = pad(hogaData.askrest18, nNumPacketLength);
            dHoga[48] = pad(hogaData.ask19, nNumPacketLength);
            dHogaRest[48] = pad(hogaData.askrest19, nNumPacketLength);
            dHoga[49] = pad(hogaData.ask20, nNumPacketLength);
            dHogaRest[49] = pad(hogaData.askrest20, nNumPacketLength);
            dHoga[50] = pad(hogaData.ask21, nNumPacketLength);
            dHogaRest[50] = pad(hogaData.askrest21, nNumPacketLength);
            dHoga[51] = pad(hogaData.ask22, nNumPacketLength);
            dHogaRest[51] = pad(hogaData.askrest22, nNumPacketLength);
            dHoga[52] = pad(hogaData.ask23, nNumPacketLength);
            dHogaRest[52] = pad(hogaData.askrest23, nNumPacketLength);
            dHoga[53] = pad(hogaData.ask24, nNumPacketLength);
            dHogaRest[53] = pad(hogaData.askrest24, nNumPacketLength);
            dHoga[54] = pad(hogaData.ask25, nNumPacketLength);
            dHogaRest[54] = pad(hogaData.askrest25, nNumPacketLength);
            dHoga[55] = pad(hogaData.ask26, nNumPacketLength);
            dHogaRest[55] = pad(hogaData.askrest26, nNumPacketLength);
            dHoga[56] = pad(hogaData.ask27, nNumPacketLength);
            dHogaRest[56] = pad(hogaData.askrest27, nNumPacketLength);
            dHoga[57] = pad(hogaData.ask28, nNumPacketLength);
            dHogaRest[57] = pad(hogaData.askrest28, nNumPacketLength);
            dHoga[58] = pad(hogaData.ask29, nNumPacketLength);
            dHogaRest[58] = pad(hogaData.askrest29, nNumPacketLength);
            dHoga[59] = pad(hogaData.ask30, nNumPacketLength);
            dHogaRest[59] = pad(hogaData.askrest30, nNumPacketLength);

            //깊이차트 매수/매도 30호가 옆에 여백을 주기 위해 추가
            dHoga.unshift(pad(0.0, nNumPacketLength));
            dHogaRest.unshift(pad(0.0, nNumPacketLength));
            dHoga.unshift(pad(0.0, nNumPacketLength));
            dHogaRest.unshift(pad(0.0, nNumPacketLength));

            dHoga[dHoga.length] = pad(0.0, nNumPacketLength);
            dHogaRest[dHoga.length] = pad(0.0, nNumPacketLength);
            dHoga[dHoga.length] = pad(0.0, nNumPacketLength);
            dHogaRest[dHoga.length] = pad(0.0, nNumPacketLength);
            
            //데이터 가공(호가별 금액계산 = 호가 * 잔량)
            var dHogaAmount = [];
            var nHogaLen = dHoga.length;
            var nSellStartIndex = nHogaLen / 2;
            for( i = 0 ; i < nHogaLen ; i++ )
            {
                var dAmount = Number(dHoga[i])* Number(dHogaRest[i]);                
                dHogaAmount[i] = pad(dAmount, nAmountPacketLength);
            }

            //데이터 가공(누적잔량 = 이전호가잔량 + 현재호가 잔량, 누적금액 = 이전호가금액 + 현재호가 금액)
            var dHogaData;
            var dMinHoga = null;
            //매수호가잔량 , 금액 누적 계산
            var dSum = 0;
            var dSumAmount = 0;
            for( i = nSellStartIndex - 1 ; i >= 0 ; i-- )
            {
                dHogaData = Number(dHoga[i]);
                if(dHogaData <= 0)
                    continue;
                
                dMinHoga = dHogaData;

                dSum = Number(dHogaRest[i]) + dSum;
                dHogaRest[i] = pad(dSum, nNumPacketLength);

                dSumAmount = Number(dHogaAmount[i]) + dSumAmount;
                dHogaAmount[i] = pad(dSumAmount, nAmountPacketLength);                    
            }

            //매도호가잔량 , 금액 누적 계산
            dSum = 0;
            dSumAmount = 0;
            for( i = nSellStartIndex ; i < nHogaLen ; i++ )
            {
                dHogaData = Number(dHoga[i]);
                if(dHogaData <= 0)
                    continue;
                
                if(dMinHoga === null)
                    dMinHoga = dHogaData;

                dSum = Number(dHogaRest[i]) + dSum;
                dHogaRest[i] = pad(dSum, nNumPacketLength);

                dSumAmount = Number(dHogaAmount[i]) + dSumAmount;
                dHogaAmount[i] = pad(dSumAmount, nAmountPacketLength);                    
            }

            //최종 차트데이터 완성                
            var chartData = "";
            for ( i = 0; i < nHogaLen; i++) {
                chartData += (dHoga[i] + "" + dHogaRest[i] + "" + dHogaAmount[i] + "" + (i >= nSellStartIndex ? "1" : "0" ));
            }
            var strContents = nHogaLen + "!" + chartData;

            //현재 rq얻기
            var sRQ = Chart.GetSelectedRQ();
            var rRQInfo = Chart.GetSelectedRQInfo();

            //종목정보 가져오기
            var symbolInfo = this.$_.findWhere(this.coinList, {o_symbol : this.symbol});

            //호가단위
            var callPrice = dMinHoga === null ? this.m_CurPrice : dMinHoga; //최소호가가격을 셋팅
            var hogaUnit = UnitManager.getHogaUnit(this.hogaUnit, symbolInfo.o_setl_cur_cd_n, callPrice);
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
            rRQInfo.m_strPriceDigit = minOrder;
            
            //최소주문수량단위( ex: "0.0001" 입력 ) => 거래량 자리수 표현에 사용
            var vUnit = Number(rRQInfo.m_strOrderUnitQty);            
            
            //금액표현단위
            var dMoneyUnit = symbolInfo.o_setl_cur_cd_n === "KRW" ? 1 : 0.001;

            //////////////////////////////////////////////////////////////////////////////////////////
            //차트컨트롤에 데이터 패킷정보 셋팅                
            Chart.AddInputNumPacketInfo(sRQ, "_HOGA_", nNumPacketLength, 10, hogaUnit, minOrder);//호가 가격 패킷
            Chart.AddInputNumPacketInfo(sRQ, "_HOGAREST_", nNumPacketLength, 10, vUnit, vUnit.toString());//호가누적잔량 패킷
            Chart.AddInputNumPacketInfo(sRQ, "_HOGAAMOUNT_", nAmountPacketLength, 10, dMoneyUnit, dMoneyUnit.toString());//호가누적금액패킷
            Chart.AddInputNumPacketInfo(sRQ, "_SELLFLAG_", 1, 10, 1, "1");//매도호가여부패킷(1:매도호가, 0:매수호가)
            ////////////////////////////////////////////////////////////////////////////////////////////////////////

            Chart.RegXScaleMng(sRQ, false);

            ////////////////////////////////////////////////////////////////////////////////
            //차트컨트롤에 차트데이터 전달
            Chart.SetPacketData(sRQ, strContents, strContents.length, false, true, true);

            Chart.SetRealCurPrice(this.symbol, this.m_CurPrice);//현재가 적용

            Chart.ArrangeXScaleMng();

            Chart.InitialViewInfo(100);
            
            Chart.ExtractYScaleMinMax(true);

            //설정셋팅
            var rGlobalProperty = Chart.GetCloneGlobalProperty();
            rGlobalProperty.SetRightMargin(0);//우측여백 제거
            rGlobalProperty.SetUseWheelScroll(false);//휠 확대/축소 막음
            Chart.SetGlobalProperty(rGlobalProperty);

            Chart.SetGlobalPropertyToChart(false);

            Chart.Draw(DRAW_CASE_TR | DRAW_CASE_RESIZE | DRAW_CASE_ADD_CHARTBLOCK);
        },
        setRealData: function (symbol) {

            console.log("실시간데이터[%s] 등록 start", symbol);
            var symbols = [];
            symbols[0] = symbol;
            var _this = this;
            this.$socket.registerReal("KVS0", "symbol", symbols, "DepthChart",
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

                    //현재가 실시간반영
                    _this.m_CurPrice = parseFloat(data.execprice);
                }
            );
            console.log("실시간데이터[%s] 등록 end", symbol);
        },
        setRealHogaData: function (symbol) {

            console.log("30호가 실시간데이터[%s] 등록 start", symbol);
            var symbols = [];
            symbols[0] = symbol;
            var _this = this;

            //실시간 호가 데이터 차트에 적용하기 위해 모니터링 시작
            //타이머사용이유:호가데이터는 체결보다 더 많은 데이터가 쏟아지므로 들어오는 데로 차트반영은 시스템에 상당한 부하를 줌
            //따라서 1초 간격으로 실시간데이터 변경여부 체크하여 변경된 경우만 차트에 반영처리
            this.m_nTimerID = setInterval(this.applyRealDataToChart, 500);

            this.$socket.registerReal("KVH2", "symbol", symbols, "DepthChart",
                function(queryData) {
                    
                    //응답값 확인
                    if (!queryData) {
                        console.error("차트데이터[%s] 불러오기 error", symbol);
                        return;
                    }

                    var hogaData = queryData.getBlockData('OutBlock1')[0];
                    //console.log("실시간[%s] 수신2", hogaData.symbol);
                    //심볼 유효성 검증
                    if (symbol !== hogaData.symbol) {
                        console.error("실시간데이터 currentSymbol: %s packetSymbol: %s", symbol, hogaData.symbol);
                        return;
                    }

                    //console.log("실시간데이터[%s] 수신3 %s %f %f", symbol, hogaData.hotime);
                    _this.m_RealHogaWrapper.nIndex++;
                    if(_this.m_RealHogaWrapper.nIndex === 100000)
                        _this.m_RealHogaWrapper.nIndex = 0;                    
                    
                    //호가 데이터 복사
                    _this.m_RealHogaWrapper.hogaData = hogaData;

                    //호가 데이터 깊은복사(속도이슈 가능성으로 일단 주석처리)
                    //_this.m_RealHogaWrapper.hogaData = {};
                    //for (var attr in hogaData) {
                    //   _this.m_RealHogaWrapper.hogaData[attr] = hogaData[attr];
                    //}
                }
            );
            console.log("실시간데이터[%s] 등록 end", symbol);
        },
        resize: function () {
            const Chart = DepthChartObj[this.chartIndex];
            var width = this.$el.offsetParent.offsetWidth;
            var height = this.$el.offsetParent.offsetHeight;
            Chart.Resize(width, height);
        },
        clearRealData: function (symbols) {
            console.log("실시간데이터KVH2 [%s] 해제 start", symbols);
            this.$socket.unregisterReal("KVH2", [symbols], "DepthChart");
            this.$socket.unregisterReal("KVS0", [symbols], "DepthChart");
            console.log("실시간데이터KVH2 [%s] 해제 end", symbols);

            clearInterval(this.m_nTimerID);
            this.m_RealHogaWrapper.nIndex = 0;
            this.m_RealHogaWrapper.nPrevIndex = null;
            this.m_RealHogaWrapper.hogaData = null;
        },
        SavePropertyFromChart: function(e){
            var rChart = e.m_rChart;
            this.SaveChart(rChart);
        },
        SaveChart: function(DepthChartObj){
            var strChartFullProperty = DepthChartObj.GetChartFullPropertyInJSONString();
            localStorage.setItem(this.m_strLocalSaveKey, strChartFullProperty);
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
        const ChartObjKeys = Object.keys(DepthChartObj);
        if (ChartObjKeys.length > 0) {
            this.chartIndex = Math.max(ChartObjKeys) + 1;
        } else {
            this.chartIndex = 0;
        }
        this.m_strChartDIV = "DepthChartDIV" + this.chartIndex;
    },
    mounted () {
        console.log("mounted ()");

        this.CreateChart();

        const Chart = DepthChartObj[this.chartIndex];

        Chart.InitCtrl();
        Chart.SetBlockType(VERT_BLOCK_TYPE);
        Chart.SetUseContextMenu(false);
        
        //언어팩 예외처리 LJH 20190312
        if (this.$i18n.locale === 'en') {
            Chart.LoadLang('EN', false);
        } else {
            Chart.LoadLang('KR', false);
        }

        //20190223 이문수 저장/불러오기 >>
        this.m_strLocalSaveKey = this.$route.name + "_HogaDepth";
        let strChartFullProperty = localStorage.getItem(this.m_strLocalSaveKey);
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
                this.QueryInfo.chartFullProperty = Chart.GetDefaultChartFullProperty(HOGA_DEPTH_CHART_TYPE);
        }
        else
            this.QueryInfo.chartFullProperty = Chart.GetDefaultChartFullProperty(HOGA_DEPTH_CHART_TYPE);

        this.QueryInfo.strRqArray = [];
        for(var sRQ in this.QueryInfo.chartFullProperty.m_mapRQProperty)
        {
            this.QueryInfo.strRqArray[this.QueryInfo.strRqArray.length] = sRQ;
        }
        this.QueryInfo.packetId = null;
        //20190223 이문수 저장/불러오기 <<

        //resize event 등록
        window.addEventListener('resize', this.resize);        
        
        //차트 초기화
        document.addEventListener('Event_ResetChart', this.ResetChart);

        //차트 저장
        document.addEventListener('Event_SaveProperty', this.SavePropertyFromChart);        

        this.symbol = this.$store.state.data.currentSymbol;        

        this.$EventBus.$on('changeCurrentSymbol', this.changeCurrentSymbol);

        // 마스터정보 조회후 호출됨 - LJH 20190219
        this.$EventBus.$on('loadStockData', this.loadStockDataCallback);

        // 소켓이 종료되었을때 호출됨 - LJH 20190219
        this.$EventBus.$on('resetLoadStockData', this.resetLoadStockDataCallback);

        //소켓 관련 이벤트 변경 - 20190219 김성진 ->>
        if(this.coinList.length > 0 && !this.dataLoaded){
            this.$EventBus.$emit('loadStockData');
        }
        //소켓 관련 이벤트 변경 - 20190219 김성진 <<-    
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
        
        //resize event 제거
        window.removeEventListener('resize', this.resize);        
        
        //차트 초기화
        document.removeEventListener('Event_ResetChart', this.ResetChart);

        //차트 저장
        document.removeEventListener('Event_SaveProperty', this.SavePropertyFromChart);

        this.$EventBus.$off('changeCurrentSymbol', this.changeCurrentSymbol);

        //실시간데이터 끊기
        this.clearRealData(this.symbol);

        // 등록된 이벤트 제거
        this.$EventBus.$off('loadStockData', this.loadStockDataCallback);
        this.$EventBus.$off('resetLoadStockData', this.resetLoadStockDataCallback);

        this.DestroyChart();
    },
    destroyed () {
        console.log("destroyed ()");
    }
}
</script>