<template>
    <div id="ChartDIV"></div>
</template>

<script>

import { 
    mapGetters, 
    mapState 
} from 'vuex';
import _lodash from 'lodash'
import { strictEqual } from 'assert';
import { clearInterval } from 'timers';

export default {
    props: ['propdata', 'alermProps'],
    data() {
        return {
            options: {
				"preSymbol": "",
				"symbol": "",
				"ijwb": '5', // 주기(1:day, 2:week, 3:mon, 4:year, 5:min, 6:sec)
				"ijwbGroup": '30', // 양
				"icnt": 100,
				"blockType": 0, // 0:vert, 1:horz
				'inds': ['_MA_', '_VOLUME_', '_VMA_'],
				"locale": "ko_KR" //en_US
            },
            chartDivName: 'ChartDIV', //모바일 차트
            oldAlermProps: [],
            m_strNextKey: null,
            chkChartInit: false,
        }
    },
    watch: {
        //주기변경 (AppGraph에서 내려옴)
        propdata(newPropdata, oldPropdata) {
             this.optionsChange(newPropdata);
        },
        alermProps: {
			handler: function (after) {
                console.log("alermProps", after);

                if (this.oldAlermProps.length === 0) {
                    after.filter((p, idx) => {
                        let v = p['value'];
                        if (v) {
                            if (idx === 0) {
                                this.RequestContract();
                            } else if (idx === 1) {
                                this.RequestAlarm();
                            } else if (idx === 2) {
                                this.RequestBalance();
                            }
                        }
                    });
                } else {
                    after.filter((p, idx) => {
                        let v = p.value;
                        if (v !== this.oldAlermProps[idx].value) {
                            if (v) {
                                if (idx === 0) {
                                    console.log("RequestContract");
                                    this.RequestContract();
                                } else if (idx === 1) {
                                    console.log("RequestAlarm");
                                    this.RequestAlarm();
                                } else if (idx === 2) {
                                    console.log("RequestBalance");
                                    this.RequestBalance();
                                }
                            } else {
                                var strUserID = this.getUserId;
                                var params= [this.chartDivName, "0", ""];
                                try {
                                    if (idx === 0) {
                                        console.log("clearRealContract");
                                        this.clearRealContract(strUserID);
                                        ChartManager.setMichegyulData(params);
                                    } else if (idx === 1) {
                                        console.log("clearRealAlarm");
                                        this.clearRealAlarm(strUserID);
                                        ChartManager.setAlarmData(params);
                                    } else if (idx === 2) {
                                        console.log("clearRealBalance");
                                        this.clearRealBalance(strUserID);
                                        ChartManager.setAverageBuyData(params);
                                    }
                                } catch(e) {
                                    console.error(e);
                                }
                                
                            }
                        }
                    });
                }
                this.setOldAlermProps(after);
			},
			deep: true
        },
        options(newOptions, oldOptions) {
            //심볼이 변경: 이전심볼에 대한 실시간데이터 처리 거부
            if (oldOptions && (oldOptions.symbol !== newOptions.symbol)) {
                this.options.preSymbol = oldOptions.symbol;

                console.log("종목변동 알림선 새로고침", this.options);
                
                var strUserID = this.getUserId;
                if( strUserID !== null) {
                    //실시간 연동 해제
                    this.oldAlermProps.filter((p, idx) => {
                        if (p.value === true) {
                            if (idx === 0) {
                                this.clearRealContract(strUserID);
                            } else if (idx === 1) {
                                this.clearRealAlarm(strUserID);
                            } else if (idx === 2) {
                                this.clearRealBalance(strUserID);
                            }
                        }
                    });

                    //변경된 종목으로 알림선 가져오기
                    this.oldAlermProps.filter((p, idx) => {
                        if (p.value === true) {
                            if (idx === 0) {
                                this.RequestContract();
                            } else if (idx === 1) {
                                this.RequestAlarm();
                            } else if (idx === 2) {
                                this.RequestBalance();
                            }
                        }
                    });
                }
                // 20190201 전중현 : 미체결, 평균매수가, 알림선 라인 설정을 위한 조회/실시간 처리 <<
            }
            
            this.$emit('change-current-cycle', {"ijwb":  this.options.ijwb, "ijwbGroup": this.options.ijwbGroup});

            if (this.$store.getters.isSocketConnected) {
                //실시간 체결데이터 해지
                this.clearRealData(oldOptions.symbol);
                this.KfitsChart(this.options.symbol, null, this.options.ijwb, this.options.icnt, this.options.ijwbGroup, 0);//마지막 필드 조회(0), 연속조회(1)
            }
        }
    },
    computed: {
        ...mapState({
			coinList : state => state.data['n1001'],
        }),
        ...mapGetters(['getUserId'])
    },
    methods: {
        //모바일 차트 - API 함수 추가
        onChartTouchData : function(strDate, strStart, strHigh, strLow, strClose, strPrice) {
            // cordova.exec( null , null, "ChartPlugin" , "toast", ["strClose:"+strClose]); 
            this.$EventBus.$emit('changePriceFromChart', strPrice); //알림설정 가격 전달
        },
        //연속 데이터 조회
        onScrollEnd : function () {
			if (this.$store.getters.isSocketConnected) {
                //연속키 확인
                // cordova.exec( null , null, "ChartPlugin" , "toast", ["nextKey:"+this.m_strNextKey]); 
                if (!this.m_strNextKey) {
                    return;
                }
                
                //실시간 체결데이터 해지
                this.KfitsChart(this.options.symbol, null, this.options.ijwb, this.options.icnt, this.options.ijwbGroup, 1);//마지막 필드 조회(0), 연속조회(1)
            }
        },
        //차트에서 데이터 요청
        onRequestData : function(requestArr, selectedIndex) {
            console.log("onRequestData selectedIndex", selectedIndex);
            console.log("onRequestData requestArr", requestArr);

            // var code = requestArr[0];	//종목코드
            var code = this.$store.state.data.currentSymbol;
            //var name = requestArr[1];	//종목명
            //var mid = requestArr[2];	//시장구분
            var type = requestArr[3];	//주기
            var term = (requestArr[4]) ? requestArr[4] : 1;	//분틱주기값

            var ijwb= '';
            if (type == '7') {
                ijwb = '4';
            } else if (type == '6') {
                ijwb = '5';                
            } else {
                ijwb = type;
            }
    
            this.optionsChange({
                "symbol": code, 
                "ijwb": ijwb,
                "ijwbGroup": term
            });

            // if (this.$store.getters.isSocketConnected) {
            //     this.KfitsChart(this.options.symbol, null, this.options.ijwb, this.options.icnt, this.options.ijwbGroup, 0);//마지막 필드 조회(0), 연속조회(1)
            // }
        },
        //차트에서 분틱 설정 값 변경
        onChangePeriodOnStorage : function(minList, tickList) {

        },
        //네이티브 차트 조회 갯수 변경 기능
        onByNumber : function (viewNum) {
            // cordova.exec( null , null, "ChartPlugin" , "toast", ["viewNum:"+viewNum]); 
            this.OptionsChange({"icnt": viewNum});
            
            //확인 필요 : OptionsChange에서 kfitsChart 호출
            if (this.$store.getters.isSocketConnected) {
                this.KfitsChart(this.options.symbol, null, this.options.ijwb, this.options.icnt, this.options.ijwbGroup, 0);//마지막 필드 조회(0), 연속조회(1)
            }
        },
        //네이티브 차트 미체결 요청 (val 1:on, 0:off) 2019.2.19 : TEST 필요(이벤트 개별처리 가능여부 확인 필요)
        onMichegyulData : function (val) {
            // try {
            //     cordova.exec( null , null, "ChartPlugin" , "toast", ["onMichegyulData:"+val]);
            // } catch(err) {
            //     console.error("Toast message onMichegyulData");
            // }
            
            console.log("onMichegyulData val: ", val);
            // 현재상태 확인후 처리
            if ((val === "1" && this.oldAlermProps[0].value === true) || (val !== "1" && this.oldAlermProps[0].value === false)) {
                return;
            }

            if (val === "1") {
                this.oldAlermProps[0].value = true;
                this.RequestContract();
            } else {
                this.oldAlermProps[0].value = false;
                var strUserID = this.getUserId;
                if (strUserID !== null) {
                    this.clearRealContract(strUserID);
                }
            }

            this.$emit("send-alerm-props", this.oldAlermProps);
        },
        //네이티브 차트 평균매수가 요청
        onAverageBuyData : function (val) {
            // try {
            //     cordova.exec( null , null, "ChartPlugin" , "toast", ["onAverageBuyData:"+val]);
            // } catch(err) {
            //     console.error("Toast message onAverageBuyData");
            // }
            
            console.log("onAverageBuyData val: ", val);
            // 현재상태 확인후 처리
            if ((val === "1" && this.oldAlermProps[2].value === true) || (val !== "1" && this.oldAlermProps[2].value === false)) {
                return;
            }

            if (val === "1") {
                this.oldAlermProps[2].value = true;
                this.RequestBalance();
            } else {
                this.oldAlermProps[2].value = false;
                var strUserID = this.getUserId;
                if (strUserID !== null) {
                    this.clearRealBalance(strUserID);
                }
            }
            this.$emit("send-alerm-props", this.oldAlermProps);
        },
        //네이티브 차트 알림데이터 요청
        onAlarmData : function (val) {
            // try {
            //     cordova.exec( null , null, "ChartPlugin" , "toast", ["onAlarmData:"+val]);
            // } catch(err) {
            //     console.error("Toast message onAlarmData");
            // }
            
            console.log("onAlarmData val: ", val);
            // 현재상태 확인후 처리
            if ((val === "1" && this.oldAlermProps[1].value === true) || (val !== "1" && this.oldAlermProps[1].value === false)) {
                return;
            }

            if (val === "1") {
                this.oldAlermProps[1].value = true;
                this.RequestAlarm();
            } else {
                this.oldAlermProps[1].value = false;
                var strUserID = this.getUserId;
                if (strUserID !== null) {
                    this.clearRealAlarm(strUserID);
                }
            }
            this.$emit("send-alerm-props", this.oldAlermProps);
        },
        onDelAlarmData : function (val) {
            // cordova.exec( null , null, "ChartPlugin" , "toast", ["onDelAlarmData:"+val]);
            this.SetupAlarm(val);
        },
        //네이티브 차트가 생성되는 시점에 호출되는 함수
        onChartInit: function (chartId) {
            //alert("Chart.onChartInit:"+chartId);
            console.log("onChartInit________________");
            // cordova.exec( null , null, "ChartPlugin" , "toast", ["onChartInit_ver_201901282033:"+this.$socket.netIo.socket]); 
            // this.options = $.extend({}, this.options, newOptions);

            // if (this.$store.getters.isSocketConnected) {
            //     this.KfitsChart(this.options.symbol, null, this.options.ijwb, this.options.icnt, this.options.ijwbGroup, 0);//마지막 필드 조회(0), 연속조회(1)
            // }

            // 마스터정보 조회후 호출됨 - LJH 20190219
            this.$EventBus.$on('loadStockData', this.loadStockData);

            // 소켓이 종료되었을때 호출됨 - LJH 20190219
            this.$EventBus.$on('resetLoadStockData', this.resetLoadStockData);

            //소켓 관련 이벤트 변경 - 20190219 김성진 ->>
            if(this.coinList.length > 0 && !this.dataLoaded) {
                this.$EventBus.$emit('loadStockData');
            }
            //소켓 관련 이벤트 변경 - 20190219 김성진 <<-
        },
        initAppChart: function () {
            var offsetWidth = this.$el.offsetParent.offsetWidth;
            var offsetHeight = this.$el.offsetParent.offsetHeight;
            var offsetTop = this.$el.offsetParent.offsetTop;
            var offsetLeft = this.$el.offsetParent.offsetLeft;

            var docWidth = $(window).width();
            var docHeight = $(window).height();

            var leftRate = parseInt(offsetLeft)/docWidth;
            var topRate = parseInt(docHeight - offsetHeight)/docHeight;
            var widthRate = offsetWidth/docWidth;
            var heightRate = (offsetHeight)/docHeight;

            console.log(docWidth, docHeight, leftRate, topRate, widthRate, heightRate);
            console.log(offsetWidth, offsetHeight, offsetTop, offsetLeft);

            var winWidth = $(document).width();
            var winHeight = $(document).height();

            console.log(winWidth, winHeight);

            var strLocale = "kor";
            if(this.$i18n.locale === 'ko') {
                strLocale = "kor";
            } else if (this.$i18n.locale === 'en') {
                strLocale = "eng";
            }

            // cordova.exec( null , null, "ChartPlugin" , "toast", ["strLocale:"+this.getLangKind]);

            var strLoadChart = '';
            if (this.$route.name === 'mNotificationSettingDetail') {
                strLoadChart = 'alerm'
            } else {
                strLoadChart = 'stock'
            }

            var beforeOptions = {
                "ChartType": '',  //"compare","multi"
                "LoadChart" : strLoadChart,      //"stock","future","stockfuture","nightfuture","multi","compare"
                "MarketCategory" : '',           //"0:주식,"1:선물,"2:옵션,"3:ELW,"4":업종지수,"5":선물지수,"6":해외지수,"7":해외선물,"8":해외주식
                "PeriodType" : 1,                //"0":틱,"1":분,"2":일,"3":주,"4":월,"5":년
                "PeriodTime" : 60,               //1~60
                "IsXScale" : false,
                "IsYScale" : false,
                "Locale" : strLocale
            };

            var afterOptions = {
                "AccrueName": '',
                "AccrueData": ''
            };

            //2016.07.14 by hyh -  차트 테마 적용
            //    alert("theApp.themeMode:"+theApp.themeMode);
            //밝은/어두운 설정 (메인설정 값을 받아와서 처리해야 함)
            // if(theApp.themeMode == 'WHITE' || theApp.themeMode == undefined) //밝은
            // {
                beforeOptions["ChartColor"] = ChartManager.chartColorWhite;
            // }
            // else if(theApp.themeMode == 'BLACK')//어두운
            // {
            //     this.beforeOptions["ChartColor"] = ChartView.chartColorBasic;
            // }
            
            //차트 상승/하락 색상 변경 (메인설정 값을 받아와서 처리해야 함)
        //     if(theApp.colorMode == 'kor' || theApp.colorMode == undefined) //빨간/파란
        //     {
                beforeOptions["ChartColor"][0] = "ff5252"; //"ff0000", //75: 상승
                beforeOptions["ChartColor"][1] = "627bfe"; //"0070ff", //76: 하락
            // }
            // else if(theApp.colorMode == 'eng')//초록/빨간
            // {
            //     //"18a709", //75: 상승
            //     //"ff0000", //76: 하락
            //     this.beforeOptions["ChartColor"][0] = "18a709";
            //     this.beforeOptions["ChartColor"][1] = "ff0000";
            // }
            
            var params = [leftRate,
                        topRate,
                        widthRate,
                        heightRate,
                        this.chartDivName,
                        beforeOptions,
                        afterOptions];
            
            try {
                cordova.exec( null , null, "ChartPlugin" , "loadChartLayout", params);
                // cordova.exec( null , null, "AppPlugin" , "setOrientation", [ AppManager.SCREEN_ORIENTATION_SENSOR ]);  //모바일 회전 이벤트 활성화
                ChartManager.setDelegator(this);
            } catch(err){
                console.error(err);
            }
        },
        //모바일 차트 - API 함수 추가 end
        optionsChange: function (newOptions) { 
            console.log("optionsChange________________");
            this.options = $.extend({}, this.options, newOptions);
        },
        KfitsChart: function (symbol, ijwbID, ijwb, icnt, ijwbGroup, isNext) {
            console.log("KfitsChart________________");
            console.log(ijwb + ", " + ijwbGroup);
            
            var _this = this;
            
            //모바일 차트
            var chartId = this.chartDivName;  
            var type = ijwb;
            var term = '1';
            //모바일 차트 end

            var kovex_ijwb = 0;
            try{
                switch (ijwb) {
                case '1':
                    kovex_ijwb = 2;
                    ijwbGroup = 1;

                    //모바일 차트                
                    type = ijwb; //일
                    term = '1';
                    ChartManager.setPeriod([chartId, type, term]);                   
                    //모바일 차트
                break;
                case '2':
                    kovex_ijwb = 3;
                    ijwbGroup = 1;
                    //모바일 차트  
                    type = ijwb; //주
                    term = '1';
                    ChartManager.setPeriod([chartId, type, term]);
                    //모바일 차트
                break;
                case '3':
                    kovex_ijwb = 4;
                    ijwbGroup = 1;
                    //모바일 차트   
                    type = ijwb; //월
                    term = '1';
                    ChartManager.setPeriod([chartId, type, term]);
                    //모바일 차트
                break;
                case '4':
                    kovex_ijwb = 5;

                    //모바일 차트  
                    type = '7'; //틱
                    term = ijwbGroup;
                    ChartManager.setPeriod([chartId, type, term]);
                    //모바일 차트
                break;
                case '5':
                    kovex_ijwb = 1;

                    //모바일 차트 - 분봉  
                    type = '6'; //분봉
                    term = ijwbGroup;
                    ChartManager.setPeriod([chartId, type, term]);
                    //모바일 차트 - 분봉 end

                break;
                case '6':
                    kovex_ijwb = 6;

                    break;
                }
            } catch(err) {
                console.error(err);
            }

            console.log(ChartManager);

            console.log("차트데이터[%s] 불러오기 start", symbol);
            this.$socket.sendProcessByName('i0004', 
                function (queryData) {
                    var block = queryData.getBlockData('InBlock1')[0];
                    block['symbol'] = symbol;       // 종목코드 15
                    block['cycunit'] = kovex_ijwb;  // 주기단위 1
                    block['qrycnt'] = icnt;         // 조회건수 5
                    block['cyc'] = ijwbGroup;       // 주기 3
                    block['availflag'] = '0';       // 실봉구분 1
                    block['sdate'] = '00000000';    // 시작일자 8
                    block['edate'] = '99999999';    // 종료일자 8

					//연속키 셋팅
                    if(isNext == 1)
                        queryData.setContiKey(_this.m_strNextKey);
                },
                function (queryData) {
                    //응답값 확인
                    if (!queryData) {
                        console.error("차트데이터[%s] 불러오기 error", symbol);
                        return;
                    }
                
                    //심볼 유효성 검증
                    var block = queryData.getBlockData('OutBlock1')[0];
                    if (block.symbol !== symbol) {
                        console.error("차트데이터 currentSymbol: %s packetSymbol: %s", symbol, block.symbol);
                        return;
                    }

                    //모바일 차트 - 데이터 주입
                    var prevOpenPrice = parseFloat(block.preopenprc); //전일시가
                    var prevHighPrice = parseFloat(block.prehighprc); //전일고가
                    var prevLowPrice = parseFloat(block.prelowprc);   //전일저가
                    var prevPrice = parseFloat(block.yesterdayprice); //전일종가
                    var curOpenPrice = parseFloat(block.curopenprc);  //시가
                    var curhighPrice = parseFloat(block.curhighprc);  //고가
                    var curLowPrice = parseFloat(block.curlowprc);    //저가
                    var curPrice = prevPrice + parseFloat(block.diff);//현재가

                    //종목정보 가져오기
                    var symbolInfo = _this.$_.findWhere(_this.coinList, {o_symbol : symbol});

                    //호가단위
                    // var hogaUnit = UnitManager.getHogaUnit(_this.hogaUnit, symbolInfo.o_setl_cur_cd_n, curPrice, undefined, undefined, undefined);
                    
                    // //고정소수점으로 변경
                    // if (hogaUnit < 1 && hogaUnit.toString().indexOf('.') < 0) {
                    //     hogaUnit = hogaUnit.toFixed(20).replace(/0+$/, '');
                    // }

                    //sign정보 처리
                    var nSign = parseFloat(block.diff);
                    var m_sSign = "";
                    if(nSign>0) {
                        m_sSign = "2";
                    } else if(nSign<0) {
                        m_sSign = "5";
                    }
                    
                    var realData = 
                    {
                        'D1에러여부': false,
                        'D1초기화여부': true,
                        'D1현재가': curPrice,
                        'D1데이터개수': block.out_cnt,
                        'D1단축코드': symbol,
                        'D1종목명': symbolInfo.o_inst_eng_nm,
                        'D1시장분류코드': 0,
                        'D1등락구분': m_sSign,                   //등락 구분코드(Sign)
                        'D1대비': block.diff,                 //전봉 or 전일 대비 가격
                        'D1등락율': block.updnrate,               //전봉 or 전봉 대비 등락률
                        'D1거래량_30608과동일': "",         //거래량
                        'D1거래대금_30609과동일': "",    //거래대금
                        'D1기준가': block.yesterdayprice,               //기준가(일주월-현재가, 분틱-당일시가)
                        'D1전일종가': block.yesterdayprice,            //전봉종가
						"D1초기화여부":!isNext,                    //초기화 시 차트 데이터 지워짐
                        "D1연속여부": isNext                   //연속여부
                        //                 'D1가격소수점자리수' : 0
                    };

                    var dataArr = queryData.getBlockData('OutBlock2');
                    var chartData = {
                        "ref" : realData,
                        "data": dataArr
                    };

                    //queryData로부터 연속키 가져오는 함수 : queryData.getContiKey();
					//연속키 저장
                    _this.m_strNextKey = queryData.getContiKey();

                    var params = [chartId, chartData];
                    try {
                        cordova.exec( null , null, "ChartPlugin" , "updateOutputData", params); //앱차트
                    } catch(err) {
                        console.error(err);
                    }

                    //당일 시고저종 전일 시고저종
                    try {
                        var sValue = curOpenPrice+"="+curhighPrice+"="+curLowPrice+"="+curPrice+"="+prevOpenPrice+"="+prevHighPrice+"="+prevLowPrice+"="+prevPrice;
                        console.log("GijunData", sValue);
                        ChartManager.setGijunData([chartId, sValue]);
                    } catch(e) {
                        console.error(e);
                    }

                    //실시간 데이터 등록
                    if (isNext === 0) {
                        _this.setRealData(symbol);
                    }
                    //모바일 차트 - 데이터 주입 end
 
					// 20190201 전중현 : 미체결, 평균매수가, 알림선 라인 설정을 위한 조회/실시간 처리 <<
                    _this.$parent.showAppChart();

                    //스마트시그널에서 사용될 sDate, eDate는 언제든지 사용 가능하도록 업데이트 시킴
                    var sDate = "";
                    var eDate = "";
                    if (dataArr.length > 0 && ijwb === "5") {
                        eDate = dataArr[0].date + dataArr[0].time;
                        sDate = dataArr[dataArr.length-1].date + dataArr[dataArr.length-1].time;
                    }
                    if (isNext === 1) {
                        //연속조회
                        _this.SSInfo.sDate = sDate;
                    } else {
                        //최초조회
                        _this.SSInfo.eDate = eDate;
                        _this.SSInfo.sDate = sDate;
                    }
                    console.log(ijwb, _this.SSInfo.sDate, _this.SSInfo.eDate);

                    if (isNext === 0) {
                        var routeName = _this.$route.name;
                        if (routeName === 'mNotificationSettingDetail') {
                            if (_this.oldAlermProps[1].value === false) {
                                _this.onAlarmData("1");
                            }
                        }
                    }
            });
        },
        setRealData: function (symbol) {
            var _this = this;
            console.log("실시간데이터[%s] 등록 start", symbol);
            var symbols = [];
            symbols[0] = symbol;
            this.$socket.registerReal("KVS0", "symbol", symbols, "AppChart", 
                function(queryData) {
                    //응답값 확인
                    if (!queryData) {
                        console.error("차트데이터[%s] 불러오기 error", symbol);
                        return;
                    }

					var data = queryData.getBlockData('OutBlock1')[0];
                    if (symbol !== data.symbol) {
                        console.error("실시간데이터 currentSymbol: %s packetSymbol: %s", symbol, data.symbol);
                        return;
                    }
					//스마트시그널 eDate 저장
                    _this.SSInfo.eDate = data.execdate + data.exectime;
                    
                    //모바일 차트
                    var chartId = _this.chartDivName;
                    try {
                        cordova.exec( null , null, "ChartPlugin" , "updateRealData", [chartId, queryData.getBlockData('OutBlock1')]);
                    } catch(err) {
                        console.error(err);
                    }
                    //모바일 차트 end
                }
            );
            console.log("실시간데이터[%s] 등록 end", symbol);
        },
        clearRealData: function (symbol) {
            console.log("실시간데이터[%s] 해제 start", symbol);
            this.$socket.unregisterReal("KVS0", [symbol], "AppChart");
            console.log("실시간데이터[%s] 해제 end", symbol);
        },
        // 20190201 전중현 : 미체결, 평균매수가, 알림선 라인 설정을 위한 조회/실시간 처리 >>
        RequestContract: function () {
            var strUserID = this.getUserId;
            if (strUserID === null) {
                return;
            }

            var symbol = this.options.symbol;
            var _this = this;
            console.log("미체결내역조회[%s] 불러오기 start", symbol);
            this.$socket.sendProcessByName('b0001', function (queryData) {
                var block = queryData.getBlockData('InBlock1')[0];
                block['user_id'] = strUserID;       // 계정ID 10
                block['qry_ord_tp'] = '0';          // 조회주문구분 1
                block['qry_cond_tp'] = '0';         // 조회조건구분 1
                block['symbol'] = symbol;           // 종목코드 15
                block['buy_sell_tp'] = null;        // 매수도구분 1
                block['qry_auto_trd_tp'] = null;    // 조회자동매매구분 1
                block['req_cnt'] = "30";            // 요청건수 5
            },
            function (queryData) {
                //응답값 확인
                if (!queryData) {
                    console.error("미체결내역조회[%s] 불러오기 error", symbol);
                    return;
                }

                var block0 = queryData.getBlockData('OutBlock1')[0];
                console.log("미체결내역조회[%s] 수신", block0.rsp_cnt);

                var dataArr = queryData.getBlockData('OutBlock2');

                var strValue = "";
                var nDataLength = dataArr.length;
                for( var i = 0; i < nDataLength; i++ ) {
                    //"매수매도플래그;가격=매수매도플래그;가격"  (매수 : 0, 매도 : 1)
                    if (i > 0) {
                        strValue += "=";
                    }
                    if (dataArr[i].buy_sell_tp === '2') {
                        strValue += "0;" + dataArr[i].ord_prc;
                    } else {
                        strValue += "1;" + dataArr[i].ord_prc;
                    }

                    //원주문번호 추가
                    strValue += ";"+ dataArr[i].ord_no;
                    
                    //strValue = "1;5000000=0;5500000=1;5400000=0;5350000";
                    //주문번호, 심볼, 가격, 수량
                    //Chart.AddTraidngLine( 0, strKey, data.symbol, strPrice, data.remn_qty );
                }
                console.log(strValue);

                //데이터 수신 처리
                var params= [_this.chartDivName, "1", strValue];
                try {
                    ChartManager.setMichegyulData(params);
                } catch(err) {
                    console.error(err);
                }
                console.log("미체결내역조회[%s] 불러오기 end", symbol);

                //미체결내역조회 실시간
                _this.SetRealContract( strUserID, symbol );
            });
        },
        SetRealContract: function (strUserID, symbol) {
            console.log("주문체결통지자동[%s] 등록 start", strUserID);
            var _this = this;
            var Key = [];
            Key[0] = strUserID;
            this.$socket.registerReal("RB03", "key_user_id", Key, "AppChart", function(queryData) {
                console.log("주문체결통지자동추가 수신1");
                //응답값 확인
                if (!queryData) {
                    console.error("주문체결통지자동추가[%s] 불러오기 error");
                    return;
                }

                var data = queryData.getBlockData('OutBlock1')[0];
                if( strUserID !== data.key_user_id )
                    return;

                if( data.symbol !== symbol )
                    return;

                /*
                var evntTp = '';
                if (data.evnt_tp == '1') evntTp = '1.주문확인';
                else if (data.evnt_tp == '2') evntTp = '2.주문거부';
                else if (data.evnt_tp == '3') evntTp = '3.정정확인';
                else if (data.evnt_tp == '4') evntTp = '4.취소확인';
                else if (data.evnt_tp == '5') evntTp = '5.자동취소';
                else if (data.evnt_tp == '6') evntTp = '6.체결';
                console.log("실시간데이터 타입 [%s]", evntTp);
                */

                var strBuySellTp = "" + data.buy_sell_tp;
                //차트 구분 값으로 변경
                if (data.buy_sell_tp === '2') {
                    strBuySellTp = "0";
                } else {
                    strBuySellTp = "1";
                }

                var nKey = Number(data.ord_no);        //주문번호
                var strKey = "" + nKey;
                
                var nOrgKey = Number(data.org_ord_no); //원주문번호
                var strOrgKey = "" + nOrgKey;

                var strPrice = "" + data.ord_prc;      //가격
                var nCount = Number(data.remn_qty);    //수량

                if( nOrgKey !== 0 ) {
                    strKey = strOrgKey;
                }

                //가격;원주문번호
                var strValue = strBuySellTp+";"+strPrice+";"+strKey;
                var params="";

                if( data.evnt_tp === '2' || data.evnt_tp === '4' || data.evnt_tp === '5' ) {
                    // 2.주문거부, 4.취소확인, 5.자동취소 시 삭제
                    console.log("2.주문거부, 4.취소확인, 5.자동취소 시 삭제");
                    params= [_this.chartDivName, "D", strValue];
                    
                    //Chart.RemoveTradingLine( 0, strKey, symbol );                        
                } else if( data.evnt_tp === '1' ) {
                    // 1.주문확인(신규)
                    console.log("1.주문확인(신규)");
                    params= [_this.chartDivName, "A", strValue];                
                    //Chart.AddTraidngLine( 0, strKey, symbol, strPrice, nCount );
                } else if( data.evnt_tp === '3' ) {
                    // 3.정정확인
                    console.log("3.정정확인");
                    params= [_this.chartDivName, "U", strValue];                
                    //Chart.UpdateTradingLine( 0, strKey, symbol, strPrice, nCount );
                } else if( data.evnt_tp === '6' ) {
                    // 6.체결
                    console.log("6.체결");
                    if( data.all_cntr_yn === 'Y' ) {
                        // 잔여 수량이 없을때 삭제
                        params= [_this.chartDivName, "D", strValue];                        
                        //Chart.RemoveTradingLine( 0, strKey, symbol );
                    } else {
                        // 잔여 수량이 남아있을때 수정 
                        params= [_this.chartDivName, "U", strValue];                    
                        //Chart.UpdateTradingLine( 0, strKey, symbol, strPrice, nCount );
                    }
                }

                //차트 미체결 실시간 데이터 처리 
                try {
                    ChartManager.setMichegyulData(params);
                } catch(err) {
                    console.error(err);
                }
            });
            console.log("주문체결통지자동[%s] 등록 end", strUserID);
        },
        clearRealContract: function (strUserID) {
            console.log("주문체결통지자동[%s] 해제 start", strUserID);
            this.$socket.unregisterReal("RB03", [strUserID], "AppChart");
            console.log("주문체결통지자동[%s] 해제 end", strUserID);
        },
        RequestBalance: function () {
            var strUserID = this.getUserId;
            if (strUserID === null) {
                return;
            }

            var symbol = this.options.symbol;
            var symbolInfo = this.$_.findWhere(this.coinList, {o_symbol : symbol});
            if( symbolInfo.o_setl_cur_cd_n !== "KRW" ) {
                // 평균매수가는 KRW일때만 보인다
                return;
            }
            
            var _this = this;
            console.log("일반잔고조회[%s] start", strUserID);
            this.$socket.sendProcessByName('b0002', function (queryData) {
                var block = queryData.getBlockData('InBlock1')[0];
                block['user_id'] = strUserID;                 // 계정ID 10
                block['cur_cd'] = symbolInfo.o_trgt_cur_cd_n; // 통화코드 5
                block['fee_tp'] = '0';                        // 수수료포함구분 1
            },
            function (queryData) {
                //응답값 확인
                if (!queryData) {
                    console.error("일반잔고조회 error");
                    return;
                }

                var block1 = queryData.getBlockData('OutBlock1')[0];
                if( block1.rsp_cnt <= 0 ) {
                    var params= [_this.chartDivName, "1", AvgPrice];
                    try {
                        ChartManager.setAverageBuyData(params);
                    } catch(err) {
                        console.error(err);
                    }

                    return;
                }

                var data = queryData.getBlockData('OutBlock2')[0];
                console.log("일반잔고조회 수신");
        
                var AvgPrice = "";
                var symbolInfo = _this.$_.findWhere(_this.coinList, {o_symbol : symbol});
                if( data.cur_cd === symbolInfo.o_trgt_cur_cd_n ) {
                    AvgPrice = "" + data.buy_prc;

                    console.log(AvgPrice);

                    //데이터 수신 처리
                    var params= [_this.chartDivName, "1", AvgPrice];
                    try {
                        ChartManager.setAverageBuyData(params);
                    } catch(err) {
                        console.error(err);
                    }

                    //Chart.AddTraidngLine( 2, symbolInfo.o_trgt_cur_cd_n, symbol, AvgPrice );
                }
                console.log("일반잔고조회[%s] end", strUserID);

                _this.SetRealBalance(strUserID, symbolInfo.o_setl_cur_cd_n);
            });

        },
        SetRealBalance: function (strUserID, cur_cd) {
            console.log("잔고실시간[%s] 등록 start", strUserID);
            var _this = this;
            var Key = [];
            Key[0] = strUserID;
            this.$socket.registerReal("RB02", "key_user_id", Key, "AppChart", function(queryData) {
                console.log("잔고실시간 수신1");
                //응답값 확인
                if (!queryData) {
                    console.error("잔고실시간 불러오기 error");
                    return;
                }

                var data = queryData.getBlockData('OutBlock1')[0];
                if( strUserID !== data.key_user_id ) {
                    return;
                }

                if( data.cur_cd === cur_cd ) {
                    var AvgPrice = "" + Number(data.avg_buy_prc);
                    var params= [_this.chartDivName, "1", AvgPrice];
                    try {
                        ChartManager.setAverageBuyData(params);
                    } catch(err) {
                        console.error(err);
                    }
                }
            });
            console.log("잔고실시간[%s] 등록 end", strUserID);
        },
        clearRealBalance: function (strUserID) {
            console.log("잔고실시간[%s] 해제 start", strUserID);
            this.$socket.unregisterReal("RB02", [strUserID], "AppChart");
            console.log("잔고실시간[%s] 해제 end", strUserID);
        },
        RequestAlarm: function () {
            var strUserID = this.getUserId;
            if (strUserID === null) {
                return;
            }

            var symbol = this.options.symbol;
            var _this = this;
            console.log("지정가알림 조회[%s] start", strUserID);
            this.$socket.sendProcessByName('f0021', function (queryData) {
                var block = queryData.getBlockData('InBlock1')[0];
                block['UserID'] = strUserID;         // 계정ID 10
                block['MFlag'] = 'M';                // 조회구분 1 'M':MTS 조회 'W':WTS 조회
                //block['Code'] = symbol;              // 종목코드 15
                //block['CondNo'] = "0001";            // 조건 번호 : 0001지정가 알림
                //block['NextFlag'] = 'F';             // Next 조회 유무 1 F:최초, N:연속
                //block['NextKey'] = '99999999999999'; // Next 키 14
            },
            function (queryData) {
                //응답값 확인
                if (!queryData) {
                    console.error("지정가알림 error");
                    return;
                }

                var block1 = queryData.getBlockData('OutBlock1')[0];
                var nDataLength = Number( block1.out_cnt );
                if( nDataLength <= 0 ) {
                    var params= [_this.chartDivName, "1", ""];
                    try {
                        ChartManager.setAlarmData(params);
                    } catch(err) {
                        console.error(err);
                    }

                    return;
                }

                var dataArray = queryData.getBlockData('OutBlock2');
                console.log("지정가알림 수신");

                var bAdd = false;
                var strValue = "";
                for( var i = 0; i < nDataLength; i++ ) {
                    var data = dataArray[i];
                    if( symbol === data.Code && "0001" === data.CondNo ) {
                        if (bAdd) {
                            strValue += "=";
                        }
                        strValue += data.Condition1;
                        bAdd = true;
                    }
                }

                console.log(strValue);

                var params= [_this.chartDivName, "1", strValue];
                try {
                    ChartManager.setAlarmData(params);
                } catch(err) {
                    console.error(err);
                }

                console.log("지정가알림 조회[%s] end", strUserID);

                _this.SetRealAlarm(strUserID, symbol);
            });

        },
        SetRealAlarm: function (strUserID, symbol) {
            console.log("지정가알림[%s] 실시간 등록 start", strUserID);
            var _this = this;
            var Key = [];
            Key[0] = strUserID;
            this.$socket.registerReal("KVF0", "key_user_id", Key, "AppChart", function(queryData) {
                console.log("지정가알림 실시간 수신1");
                // cordova.exec( null , null, "ChartPlugin" , "toast", ["SetRealAlarm:"+queryData]);
                //응답값 확인
                if (!queryData) {
                    console.error("지정가알림 실시간 불러오기 error");
                    return;
                }

                var data = queryData.getBlockData('OutBlock1')[0];

                // cordova.exec( null , null, "ChartPlugin" , "toast", ["SetRealAlarm_data.symbol:"+data.symbol+" symbol:"+_this.options.symbol]);

                if( strUserID !== data.user_id ) {
                    return;
                }
                
                if( data.symbol === _this.options.symbol && data.cond_no === "0001" ) {
                    var strPrice = data.condition1;
                    var strKey = _this.options.symbol + ":" + strPrice;
                    // cordova.exec( null , null, "ChartPlugin" , "toast", ["SetRealAlarm_data.gb:"+data.gb+" prc:"+strPrice]);
                    if( data.gb === 'R' ) {
                        var params= [_this.chartDivName, "A", strPrice];
                        try {
                            ChartManager.setAlarmData(params);
                        } catch(err) {
                            console.error(err);
                        } 
                    } else if( data.gb === 'D' ) {
                        var params= [_this.chartDivName, "D", strPrice];
                        try {
                            ChartManager.setAlarmData(params);
                        } catch(err) {
                            console.error(err);
                        }
                    }
                    // Chart.Draw(DRAW_CASE_REAL);
                }                    
            });
            console.log("지정가알림[%s] 실시간 등록 end", strUserID);
        },
        clearRealAlarm: function (strUserID) {
            console.log("지정가알림[%s] 실시간 해제 start", strUserID);
            this.$socket.unregisterReal("KVF0", [strUserID], "AppChart");
            console.log("지정가알림[%s] 실시간 해제 end", strUserID);
        },
        //지정가알림선 X버튼 클릭시 지정가 알림 해제
        SetupAlarm: function (strPrice) {
            var strUserID = this.getUserId;
            var symbol = this.options.symbol;
            var _this = this;
            console.log("알림 설정 start");
            // cordova.exec( null , null, "ChartPlugin" , "toast", ["SetupAlarm_symbol:"+symbol]);
            this.$socket.sendProcessByName('f0020', function (queryData) {
                var block = queryData.getBlockData('InBlock1')[0];
                block['JobFlag'] = 'D';                            // 작업구분 1 D:삭제, R:등록
                block['UserID'] = strUserID;                       // 계정ID 10
                block['CondNo'] = "0001";                          // 조건 번호 : 0001지정가 알림
                block['Code'] = symbol;                            // 종목코드 15                    
                block['Condition1'] = strPrice;                    // 상세구분1 16 : 설정 지정가
                block['Condition2'] = "";                          // 상세구분2 16 : 사용안함
                block['Condition3'] = "";                          // 상세구분3 16 : 사용안함
            },
            function (queryData) {
                //응답값 확인
                // cordova.exec( null , null, "ChartPlugin" , "toast", ["SetupAlarm_queryData:"+queryData]);
                if (!queryData) {
                    console.error("알림 설정 error");
                    // cordova.exec( null , null, "ChartPlugin" , "toast", ["SetupAlarm_errora"]);
                    return;
                }                
                var block1 = queryData.getBlockData('OutBlock1')[0];
                // cordova.exec( null , null, "ChartPlugin" , "toast", ["block1.Result:"+block1.Result]);
                if( block1.Result === "S200" ) {
                    // 알림선 삭제 처리는 신호처리에서 작업함
                    var params= [_this.chartDivName, "D", strPrice];
                    try {
                        ChartManager.setAlarmData(params);
                    } catch(err) {
                        console.error(err);
                    }
                }
            });
        },
        setOldAlermProps: function(alermProps) {
            this.oldAlermProps = _lodash.cloneDeep(alermProps);
        },
        changeCurrentSymbol: function(symbol) {
            console.log("changeCurrentSymbol1:" + symbol);
            this.optionsChange({"symbol": symbol});
            console.log("changeCurrentSymbol2: " + symbol)
        },
        loadStockData: function() {
            console.log('loadStockData1', this.dataLoaded);
            if(this.dataLoaded) return;
            this.dataLoaded = true;
            this.optionsChange(this.options);
            console.log('loadStockData2', this.dataLoaded);
        },
        resetLoadStockData: function() {
            console.log('resetLoadStockData');
            this.dataLoaded = false;
        }
    },
    beforeCreate () {
        console.log("beforeCreate ()");
    },
    created () {
        console.log("created ()");

        this.$nextTick(function () {
            console.log('nextTick');

            this.options.symbol = this.$store.state.data.currentSymbol;

            //종목변경 이벤트
            this.$EventBus.$on('changeCurrentSymbol', this.changeCurrentSymbol);

            //모바일 차트 - 삭제하지 말 것 (추후 모바일 디바이스 체크 함수 추가되면 작업할 예정)
            this.initAppChart();
        });
    },
    mounted () {
        console.log("mounted ()");

        //알림선 설정
        let alermProps = [];
        alermProps.push({text: this.$t('html5chart.noncontract'), value: false});
        alermProps.push({text: this.$t('html5chart.pricealert'), value: false});
        alermProps.push({text: this.$t('html5chart.avgbuyprice'), value: false});
        this.setOldAlermProps(alermProps);
        this.$emit("send-alerm-props", alermProps);
    },
    beforeDestroy () {
        //component 종료 
        console.log("beforeDestory()");

        this.$EventBus.$off('loadStockData', this.loadStockData);
        this.$EventBus.$off('resetLoadStockData', this.resetLoadStockData);
        this.$EventBus.$off('changeCurrentSymbol', this.changeCurrentSymbol);

        //실시간데이터 끊기
        this.clearRealData(this.options.symbol);

        // 20190201 전중현 : 미체결, 평균매수가, 알림선 라인 설정을 위한 조회/실시간 처리 >>
        var strUserID = this.getUserId;
        if( strUserID !== null) {
            if (this.oldAlermProps[0].value === true) {
                this.clearRealContract(strUserID);
            }
            if (this.oldAlermProps[1].value === true) {
                this.clearRealBalance(strUserID);
            }
            if (this.oldAlermProps[2].value === true) {
                this.clearRealAlarm(strUserID);
            }
        }
    		// 20190201 전중현 : 미체결, 평균매수가, 알림선 라인 설정을 위한 조회/실시간 처리 <<

        //모바일 차트
        ChartManager.destroyAll();
        // cordova.exec( null , null, "AppPlugin" , "setOrientation", [ AppManager.SCREEN_ORIENTATION_PORTRAIT ]); //차트 종료시 세로모드로 고정
        //모바일 차트 end
    },
    destroyed () {
        console.log("destroyed ()");
    }
}
</script>
