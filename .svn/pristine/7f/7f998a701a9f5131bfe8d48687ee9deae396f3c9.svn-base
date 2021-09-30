/*================================================
= 차트 유형별 화면 정리
================================================*/
//1.linefill(flat)
//변동성완화
//주식검색_TOP
//주식검색_신규상장종목
//주식검색_변동성완화종목
//주식검색_시장경보종목
//시장동향_테마별종목시세
//시장동향_오늘의증시(투명 linefill)
//
//2.기타차트 (라인, 바 조합)
//주식_현재가_투자자(line)
//투자정보_시장별 매매동향(line) (개발자:우정혁)
//투자정보_프로그램 매매종합(시간별(line),일자별(line+bar))
//선물옵션_미결제약정(line+bar)
//시장동향_증시자금(line)
//주식_시간별차트(line)(개발자:배경수)
//주식_일자별차트(line)(개발자:배경수)
//ELW_LP공급_당일(line)
//주식 거래원 매매추이(line)
//
//3.기본차트
//주식_현재가 차트 (개발자:배경수)
//주식_거래원매매추이 (?)
//투자정보_지수업종차트_기타,금리,환율,해외지수(해외,상품 등) (개발자:홍승표, 하지훈)
//선옵차트 : (개발자:조세훈)
//ETN : (개발자:배경수)
//
//4.비교차트
//셀프비교차트 (개발자:정일균)
//
//5.멀티차트
//개발자:정일균
//
//6.신규기획차트
//주식_보조지표_신호 리스트 (개발자:배경수)
//-----------------------------------------------------------------------------------------------

var ChartManager = {};

ChartManager.delegatorObj = {};

var compareMaxList = 5; //비교차트 최대 개수
var indicatorSignalList; //신호차트 전역 리스트

//======================================================
// 차트 초기화
//======================================================
//param[0] : jQuery 차트 객체
//------------------------------------------------------
//attribute.id : Chart ID
//attribute.data-charttype : 차트유형 설정
//attribute.data-loadchart : 차트형태 설정
//attribute.data-marketcategory : 차트 시장별 타입 설정
//attribute.data-periodtype : 차트 기간 설정
//attribute.data-periodtime : 차트 N 분/틱 주기 설정
//attribute.data-isxscale : 차트의 xscale 숨김 유무 설정
//attribute.data-isyscale : 차트의 yscale 숨김 유무 설정
//------------------------------------------------------
//차트유형 - "mini","compare","linefill","line","pie","bar","spider","minibong","ratecompare","standardline","subchart","news","signalchart"
//차트형태 - "stock","future","stockfuture","nightfuture","multi","compare"
//차트 시장별 타입 - "0:주식,"1:선물,"2:옵션,"3:ELW,"4":업종지수,"5":선물지수,"6":해외지수,"7":해외선물,"8":해외주식
//차트 기간 설정 - "0":틱,"1":분,"2":일,"3":주,"4":월,"5":년
//------------------------------------------------------
ChartManager.loadChartLayout = function(ele, beforeOptions, afterOptions)
{

    var parentEl = this.$parent.$el;

    var docWidth = $(document).width();
    var docHeight = $(document).height();
    
    // var leftRate = parseInt(parentEl.offsetLeft)/docWidth;
    // var topRate = parseInt(parentEl.offsetTop)/docHeight;
    // var widthRate = parentEl.offsetWidth/docWidth;
    // var heightRate = parentEl.offsetHeight/docHeight;

    var leftRate = 0;
    var topRate = 0.2;
    var widthRate = 1;
    var heightRate = 0.8;
    
    var params = [leftRate,
                  topRate,
                  widthRate,
                  heightRate,
                  this.chartDivName,
                  beforeOptions,
                  afterOptions];
    
    cordova.exec( null , null, "ChartPlugin" , "loadChartLayout", params);
};

//======================================================
// 차트 색상 입력은 아래 두 가지 방식 지원
//======================================================
//hex: 000000
//dec: 255,0,0
//======================================================
ChartManager.chartColorBasic = [ //블랙 테마
    //차트 기본색상
    "ff0000", //0: 상승
    "0070ff", //1: 하락
    "000000", //2: 보합
    "000000", //3: 거래량
    
    //주가 이동평균
    "ff3e47", //이평1 기간
    "007aff", //거래량 상승, 이평2 기간
    "ae6428", //거래량 하락, 이평3 기간
    "00b07c", //거래량 보합, 이평4 기간
    "ff33ff", //200일
    "102, 0, 153", //300일
    
    //10~11:MACD
    "152, 116, 232", //B_Ratio -- 10
    "158,  40, 255", //기간 -- 11
    "230, 100,  39", //기간 -- 12
    "125, 125, 125", //투자자 주가 라인색      2013. 8. 19 추가
    "ff3e47",  //투자자 상승색           2013. 8. 19 추가
    "007aff",  //투자자 하락색            2013. 8. 19 추가
    
    //16~20:비교차트
    "ff3e47", //비교차트 1
    "007aff", //비교차트 2
    "ae6428", //비교차트 3
    "00b07c", //비교차트 4
    "ff33ff", //비교차트 5
    
    //21~...:차트 UI
    "171926", //0. 기본 버튼 nor 배경 :
    "f0f0f0", //1. 기본 버튼 nor 글씨 :
    "171926", //2. 기본 버튼 touch 배경:
    "f0f0f0", //3. 기본 버튼 touch 글자:
    "171926", //4. 취소 버튼 nor 배경, 다이얼로그창 하단 버튼 nor배경 end색:
    "f0f0f0", //5. 취소 버튼 nor 글씨:
    "171926", //6. 취소 버튼 touch 글자, 다이얼로그창 하단 버튼 touch배경 start색:
    "f0f0f0", //7. 취소 버튼 touch 글자:
    "171926", //8. 확인 버튼 nor 배경:
    "f0f0f0", //9. 확인 버튼 nor 글씨:
    "171926", //10. 확인 버튼 touch 배경:
    "f0f0f0", //11. 확인 버튼 touch 글자:
    "0c5196", //12. 팝업 상단 배경, 설정 상단 배경 :
    "ffffff", //13. 팝업 상단 글씨 :
    "ffffff", //14. 팝업 중간 배경 :
    "000000", //15. 팝업 중간 글씨 :
    "ffffff", //16. 팝업 하단 상단 라인 :
    "ffffff", //17. 팝업 하단 배경 :
    "ffffff", //18. 리스트 배경 :
    "303047", //19. 리스트 글씨 1단 :
    "000000", //20. 리스트 글씨 2단 :
    "7f7f7f", //21. 리스트 최상단 라인 :
    "dfdfdf", //22. 리스트 중간 라인 :
    "7f7f7f", //23. 리스트 최하단 라인 :
    "ffffff", //24. 설정 바닥 색상 :
    "ffffff", //25. 설정 리스트 색상 :
    "000000", //26. 설정 리스트 nor 글씨, 체크박스 우측 글씨 :
    "22223b", //27. 설정 리스트 touch 글자, 체크박스 우측 글씨 checked:
    "dfdfdf", //28. 설정 리스트 중간 라인 색상 :
    "ffffff", //29. 설정 중복지표 바닥 색상 :
    "c6c6ce", //30. 분틱설정 세로선 색상 :
    "dfdfdf", //31. 분틱설정 가로선 색상 :
    "7a7c8b", //32. 분틱설정 상단 글씨 색상 :
    "171926", //33. 바닥고정버튼 nor 배경:
    "ffffff", //34. 바닥고정버튼 nor 글씨:
    "171926", //35. 바닥고정버튼 touch 배경:
    "ffffff", //36. 바닥고정버튼 touch 글자:
    "ffffff", //37. 바닥고정버튼 배경색 :
    "ffffff", //38. 바닥고정버튼 라인색 :
    "7a7c8b", //39. 설정 서브헤더 글씨 색상 :
    "e4e5ec", //40. 설정 서브헤더 배경 색상 :
    "c6c6ce", //41. 설정 서브헤더 라인 색상 :
    "494b61", //42. TextField Border 색상 nor, 버튼 Border 색상 :
    "ffffff", //43. TextField 배경 색상 nor :
    "000000", //44. TextField 텍스트 색상 nor :
    "e4e5ec", //45. TextField Border 색상 disable :
    "f1f3f5", //46. TextField 배경 색상 disable :
    "22223c", //47. TextField 텍스트 색상 disable :
    "222a43", //48. 팝업상단의 하단라인 색상:
    "ffffff", //49. 팝업상단의 x버튼 컬러
    "0c5196", //50. 설정 탭 ,지표설정 탭 배경 touch 색상 :
    "f0f0f0", //51. 설정 탭, 지표설정 탭 글씨 touch 색상,  :
    "737373", //52. 지표설정 탭 글씨 nor 색상 :
    "1b1e2d", //53. 지표설정 탭 배경 색상, saveload메뉴배경:
    "414450", //54. 다이얼로그창 하단 버튼 nor배경 start색, touch배경 end색
    
    
    //한글화 색상 설정 (20)
    "ff0000", //55: 상승
    "0070ff", //56: 하락
    "000000", //57: 보합
    "000000", //58: 거래량 //50
    "ffffff", //59: 배경
    "",       //60: temp1
    "",       //61: temp1
    "",       //62: temp1
    "",       //63: temp1
    "",       //64: temp1
    "",       //65: temp1
    "",       //66: temp1
    "",       //67: temp1
    "",       //68: temp1
    "",       //69: temp1
    "",       //70: temp1
    "",       //71: temp1
    "",       //72: temp1
    "",       //73: temp1
    "",       //74: temp1
    
    //영문화 색상 설정 (20)
    "18a709", //75: 상승
    "ff0000", //76: 하락
    "ff0000", //77: 보합
    "000000", //78: 거래량 //50
    "000000", //79: 배경
    "",       //80: temp1
    "",       //81: temp1
    "",       //82: temp1
    "",       //83: temp1
    "",       //84: temp1
    "",       //85: temp1
    "",       //86: temp1
    "",       //87: temp1
    "",       //88: temp1
    "",       //89: temp1
    "",       //90: temp1
    "",       //91: temp1
    "",       //92: temp1
    "",       //93: temp1
    "",       //94: temp1
    
    
    ];

ChartManager.chartColorWhite = [
    //차트 기본색상
    "ff1744", //0: 상승
    "304ffe", //1: 하락
    "434445", //2: 보합
    "434445", //3: 거래량
    
    //주가 이동평균
    "ff3e47", //이평1 기간
    "007aff", //거래량 상승, 이평2 기간
    "ae6428", //거래량 하락, 이평3 기간
    "00b07c", //거래량 보합, 이평4 기간
    "ff33ff", //200일
    "102, 0, 153", //300일
    
    //10~11:MACD
    "152, 116, 232", //B_Ratio -- 10
    "158,  40, 255", //기간 -- 11
    "230, 100,  39", //기간 -- 12
    "125, 125, 125", //투자자 주가 라인색      2013. 8. 19 추가
    "ff3e47",  //투자자 상승색           2013. 8. 19 추가
    "007aff",  //투자자 하락색            2013. 8. 19 추가
    
    //16~20:비교차트
    "ff3e47", //비교차트 1
    "007aff", //비교차트 2
    "ae6428", //비교차트 3
    "00b07c", //비교차트 4
    "ff33ff", //비교차트 5
    
    //21~...:차트 UI
    "eaeaea", //0. 기본 버튼 nor 배경:
    "000000", //1. 기본 버튼 nor 글씨:
    "dedede", //2. 기본 버튼 touch 배경:
    "000000", //3. 기본 버튼 touch 글자:
    "eaeaea", //4. 취소 버튼 nor 배경, 다이얼로그창 하단 버튼 nor배경 end색:
    "000000", //5. 취소 버튼 nor 글씨:
    "dedede", //6. 취소 버튼 touch 글자, 다이얼로그창 하단 버튼 touch배경 start색:
    "000000", //7. 취소 버튼 touch 글자: ffffff / ffffff
    "eaeaea", //8. 확인 버튼 nor 배경: ff6835 / ff6835
    "000000", //9. 확인 버튼 nor 글씨: ffffff / ffffff
    "dedede", //10. 확인 버튼 touch 배경: d84413 / d84413
    "000000", //11. 확인 버튼 touch 글자: ffffff / ffffff
    "0c5196", //12. 팝업 상단 배경, 설정 상단 배경 : 222a43 / f7f7fc
    "ffffff", //13. 팝업 상단 글씨 : ffffff / 22223b
    "ffffff", //14. 팝업 중간 배경 : f9f9f9 / f9f9f9
    "000000", //15. 팝업 중간 글씨 : 22223b / 22223b
    "ffffff", //16. 팝업 하단 상단 라인 : c6c6ce / c6c6ce
    "ffffff", //17. 팝업 하단 배경 : f9f9f9 / f9f9f9
    "ffffff", //18. 리스트 배경 : f8f8f8 / f8f8f8
    "303047", //19. 리스트 글씨 1단 : 303047 / 303047
    "000000", //20. 리스트 글씨 2단 : 7a7c8b / 7a7c8b
    "7f7f7f", //21. 리스트 최상단 라인 : c6c6ce / c6c6ce
    "dfdfdf", //22. 리스트 중간 라인 : e4e5ec / e4e5ec
    "7f7f7f", //23. 리스트 최하단 라인 : c6c6ce / c6c6ce
    "ffffff", //24. 설정 바닥 색상 : f7f7fc / f7f7fc
    "ffffff", //25. 설정 리스트 색상 : f7f7fc / f7f7fc
    "000000", //26. 설정 리스트 nor 글씨, 체크박스 우측 글씨 : 81818d / 81818d
    "22223b", //27. 설정 리스트 touch 글자, 체크박스 우측 글씨 checked: 22223b / 22223b
    "dfdfdf", //28. 설정 리스트 중간 라인 색상 : ffffff / ffffff
    "ffffff", //29. 설정 중복지표 바닥 색상 : f8f8fa / f8f8fa
    "c6c6ce", //30. 분틱설정 세로선 색상 : c6c6ce / c6c6ce
    "dfdfdf", //31. 분틱설정 가로선 색상 : ffffff / ffffff
    "7a7c8b", //32. 분틱설정 상단 글씨 색상 : 7a7c8b / 7a7c8b
    "eaeaea", //33. 바닥고정버튼 nor 배경: 161b33 / 161b33
    "000000", //34. 바닥고정버튼 nor 글씨: ffffff / ffffff
    "dedede", //35. 바닥고정버튼 touch 배경: 0d101f / 0d101f
    "000000", //36. 바닥고정버튼 touch 글자: ffffff / ffffff
    "ffffff", //37. 바닥고정버튼 배경색 : 161b33 / 161b33
    "ffffff", //38. 바닥고정버튼 라인색 : 5a5d7a / 5a5d7a
    "7a7c8b", //39. 설정 서브헤더 글씨 색상 : 7a7c8b / 7a7c8b
    "e4e5ec", //40. 설정 서브헤더 배경 색상 : e4e5ec / e4e5ec
    "c6c6ce", //41. 설정 서브헤더 라인 색상 : c6c6ce / c6c6ce
    "c1c1c1", //42. TextField Border 색상 nor, 버튼 Border 색상 :
    "ffffff", //43. TextField 배경 색상 nor : ffffff / ffffff
    "000000", //44. TextField 텍스트 색상 nor : 22223c / 22223c
    "c1c1c1", //45. TextField Border 색상 disable : e4e5ec / e4e5ec
    "ffffff", //46. TextField 배경 색상 disable : f1f3f5 / f1f3f5
    "000000", //47. TextField 텍스트 색상 disable : 22223c / 22223c
    "dbdde7", //48. 팝업상단의 하단라인 색상 : 222a43 / dbdde7
    "ffffff", //49. 팝업상단의 x버튼 컬러 : 5e637d / 9499b3
    "0c5196", //50. 설정 탭 ,지표설정 탭 배경 touch 색상 : 0c5196 /
    "ffffff", //51. 설정 탭, 지표설정 탭 글씨 touch 색상 : ffffff/
    "737373", //52. 지표설정 탭 글씨 nor 색상 : 0c5196/
    "ffffff", //53. 지표설정 탭 배경 색상 : ffffff/
    "ffffff", //54. 다이얼로그창 하단 버튼 nor배경 start색, touch배경 end색
    
    //한글화 색상 설정 (20)
    "ff0000", //55: 상승
    "0070ff", //56: 하락
    "000000", //57: 보합
    "000000", //58: 거래량 //50
    "000000", //59: 배경
    "",       //60: temp1
    "",       //61: temp1
    "",       //62: temp1
    "",       //63: temp1
    "",       //64: temp1
    "",       //65: temp1
    "",       //66: temp1
    "",       //67: temp1
    "",       //68: temp1
    "",       //69: temp1
    "",       //70: temp1
    "",       //71: temp1
    "",       //72: temp1
    "",       //73: temp1
    "",       //74: temp1
    
    //영문화 색상 설정 (20)
    "ff0000", //75: 상승
    "0070ff", //76: 하락
    "000000", //77: 보합
    "000000", //78: 거래량 //50
    "000000", //79: 배경
    "",       //80: temp1
    "",       //81: temp1
    "",       //82: temp1
    "",       //83: temp1
    "",       //84: temp1
    "",       //85: temp1
    "",       //86: temp1
    "",       //87: temp1
    "",       //88: temp1
    "",       //89: temp1
    "",       //90: temp1
    "",       //91: temp1
    "",       //92: temp1
    "",       //93: temp1
    "",       //94: temp1
    
    ];

ChartManager.setDelegator = function(delegator)
{
    // alert("setDele:"+delegator.chartDivName);
    ChartManager.delegatorObj[delegator.chartDivName] = delegator;
};

ChartManager.removeDelegator = function(delegator)
{
    delete ChartManager.delegatorObj[delegator.chartDivName];
};

ChartManager.bringToFront = function(isFront)
{
	if(window.cordova)
	{
		cordova.exec( null , null, "ChartPlugin" , "bringToFront", [isFront]);
	}
};


ChartManager.action1 = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "action1", params);
};

ChartManager.action2 = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "action2", params);
};

ChartManager.action3 = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "action3", params);
};

ChartManager.action4 = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "action4", params);
};

ChartManager.action5 = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "action5", params);
};

ChartManager.action6 = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "action6", params);
};

ChartManager.action7 = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "action7", params);
};

ChartManager.action8 = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "action8", params);
};

//======================================================
// 차트 보이기
//======================================================
//param[0] : 적용 할 chartId를 입력
//------------------------------------------------------
ChartManager.showChart = function(chartId)
{
    //$('#' + chartId[0]).show();
    cordova.exec( null , null, "ChartPlugin" , "showChart", chartId);
}

//======================================================
// 차트 숨기기
//======================================================
//param[0] : 적용 할 chartId를 입력
//------------------------------------------------------
ChartManager.hideChart = function(chartId)
{
    //$('#' + chartId[0]).hide();
    cordova.exec( null , null, "ChartPlugin" , "hideChart", chartId);
}

//======================================================
// 차트 주기 변경
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 주기 입력
//param[2] : 분/틱/초 개수 입력 (일/주/월 주기에서 사용되지 않음)
//------------------------------------------------------
//주기 값 리스트
//1 : Daily
//2 : Weekly
//3 : Monthly
//5 : Yearly
//6 : Minute
//7 : Tick
//------------------------------------------------------
ChartManager.setPeriod = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setPeriod", params);
}

//======================================================
// 차트 설정창 등 팝업
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 버튼 객체
//param[2] : 팝업 종류
//------------------------------------------------------
//팝업 종류 리스트
//"indicator"       : 지표설정
//"divide"          : 분할차트 설정
//"save"            : 저장,로드
//"sync"            : 동기화
//"tools"           : 툴바
//"indicatorPopup"  : 지표팝업
//"bunPopup"        : 분팝업
//"tickPopup"       : 틱팝업
//"dwmPopup"        : 일주월 팝업
//"periodAllPopup"  : 일주월분틱 팝업
//"indicatormini"   : 미니 지표설정창
//------------------------------------------------------
ChartManager.openDlg = function(params)
{
    var docWidth = $(document).width();
    var docHeight = $(document).height();
    
    var chartId = params[0];
    var comp = params[1];
    var dlgType = params[2];
    
    // var leftRate = parseInt(comp.offset().left)/docWidth;
    // var topRate = parseInt(comp.offset().top)/docHeight;
    // var widthRate = comp.width()/docWidth;
    // var heightRate = comp.height()/docHeight;

    var leftRate = 0;
    var topRate = 0.2;
    var widthRate = 1;
    var heightRate = 0.8;
    
    var chartParams = [leftRate, topRate, widthRate, heightRate, chartId, dlgType];
    
    cordova.exec( null , null, "ChartPlugin" , "openDlg", chartParams);
}

//======================================================
// 차트 데이터 입력
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 데이터
//------------------------------------------------------
//데이터 예제 (JSON) :
//{
//    ref:
//    {
//        'D1에러여부': false, //uInfo->bError : ?
//        'D1초기화여부': false, //uInfo->bClear : ?
//        'D1데이터개수': 3, //CHART_O 데이터 개수 int
//        'D1기준가': 100, //기준가[12]
//        'D1종목코드': 000001, //종목코드[6]
//
//        //CHART_O
//        'D1종목명': '삼성전자', //종목명[30]
//        'D1시장': 'KOSPI', //시장[10] - 'KOSPI', 'KOSDAQ', 'KOSPI200'
//        'D1현재가': 100, //현재가[12]
//        'D1사인': 1, //상승하락여부[1] - 1:상승, 2:하락
//        'D1변동폭': 10, //변동폭[10]
//        'D1등락률': 10, //등락률[6]
//        'D1거래량': 10100, //거래량[10]
//        'D1시가': 100, //시가[12]
//        'D1고가': 200, //고가[12]
//        'D1저가': 90, //저가[12]
//        'D1전일종가': 100, //전일종가[10]
//        'D1다음날짜': 20150101 //다음 데이터의 날짜시간[14]
//    },
//    data: //날짜, 시가, 고가, 저가, 종가, 거래량, 거래대금
//    [
//        {'D1날짜':20160101, 'D1시가':100, 'D1고가':200, 'D1저가':50, 'D1종가':100, 'D1거래량': 10100, 'D1거래대금': 1000100},
//        {'D1날짜':20160102, 'D1시가':101, 'D1고가':201, 'D1저가':51, 'D1종가':101, 'D1거래량': 10200, 'D1거래대금': 1000200},
//        {'D1날짜':20160103, 'D1시가':102, 'D1고가':202, 'D1저가':52, 'D1종가':102, 'D1거래량': 10100, 'D1거래대금': 1000100}
//    ]
//}
ChartManager.updateOutputData = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "updateOutputData", params);
}

//======================================================
// 십자선 표시
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : ture or false
//------------------------------------------------------
ChartManager.setShowCrossLine = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setShowCrossLine", params);
}

//======================================================
// 스마트시그널 신호 데이터
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 날짜=20190211;시간=100800;매수;전문가1;1000000;2000000/"; 예) 날짜=날짜데이터;시간=시간데이터;매수;전문가이름;매수가;손절가;/매도;전문가이름;매수가;손절가;/==매수;전문가이름;매수가;손절가;/=...
//------------------------------------------------------
ChartManager.setSignalData = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setSignalData", params);
}

//======================================================
// 당일,전일 시고저종 데이터
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : "2000000=3000000=4000000=5000000=2005000=3005000=4005000=5005000";
//		      "시가=고가=저가=종가=전일시가=전일고가=전일저가=전일종가"
//------------------------------------------------------
ChartManager.setGijunData = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setGijunData", params);
}

//======================================================
// 평균매수단가 표시
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : sValue = "4000000";
//------------------------------------------------------
ChartManager.setAverageBuyData = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setAverageBuyData", params);
}

//======================================================
// 미체결 데이터 표시
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : "매수매도플래그;가격=매수매도플래그;가격"  (매수 : 0, 매도 : 1)
//------------------------------------------------------
ChartManager.setMichegyulData = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setMichegyulData", params);
}

//======================================================
// 알림 데이터 표시
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : "2500000=3500000=4500000=5500000";
//		     "지정가=지정가=지정가=지정가"
//------------------------------------------------------
ChartManager.setAlarmData = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setAlarmData", params);
}

//======================================================
// 차트 사이즈 조정
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : Left Rate
//param[2] : Top Rate
//param[3] : Width Rate
//param[4] : Height Rate
//------------------------------------------------------
ChartManager.setChartSize = function(ele)
{
    var docWidth = $(document).width();
    var docHeight = $(document).height();
    
    var leftRate = parseInt(ele.offset().left)/docWidth;
    var topRate = parseInt(ele.offset().top)/docHeight;
    var widthRate = ele.width()/docWidth;
    var heightRate = ele.height()/docHeight;
    var chartParams = [leftRate, topRate, widthRate, heightRate, ele[0].id];
	
    cordova.exec( null , null, "ChartPlugin" , "setChartSize", chartParams);
}

//======================================================
// 비교차트 종목 설정
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 비교차트 종목 문자열 (시장;종목코드;종목명)
//------------------------------------------------------
//데이터 예제 :
//kospi;012330;현대모비스
//------------------------------------------------------
ChartManager.setCompareData = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setCompareData", params);
}

//======================================================
// 지표 데이터 조회
//======================================================
//param[0] : 적용 할 ChartId
//------------------------------------------------------
ChartManager.getIndicatorSignalList = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "getIndicatorSignalList", params);
}

//======================================================
// 지표 데이터 조회 (차트에서 실행 됨)
//======================================================
//param[0] : 적용 할 ChartId
//------------------------------------------------------
ChartManager.onIndicatorSignalList = function(chartId, selectedDate, jsonData)
{
	var delegator = ChartManager.delegatorObj[chartId];
    if(delegator && delegator.onIndicatorSignalList) delegator.onIndicatorSignalList(chartId, selectedDate, jsonData);
	
   	//try{ ChartManager.tabManager.tbvManager.getActiveView().onIndicatorSignalList(chartId, selectedDate, jsonData); }catch(e){}
}

//======================================================
// 시그널 차트에서 선택된 날짜 받기
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 선택 된 날짜
//------------------------------------------------------
ChartManager.onSignalDateChange = function(chartId, selectedDate)
{
	var delegator = ChartManager.delegatorObj[chartId];
    if(delegator && delegator.onSignalDateChange) delegator.onSignalDateChange(chartId, selectedDate);
	
   	//try{ ChartManager.tabManager.tbvManager.getActiveView().onSignalDateChange(chartId, selectedDate); }catch(e){}
}

//======================================================
// 투자자 차트 형태 설정
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 투자자 차트 형태
//------------------------------------------------------
//데이터 예제 : "개인,외국인,기관계,line"
//------------------------------------------------------
ChartManager.setAccrueName = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setAccrueName", params);
}

//======================================================
// 투자자 차트 데이터 설정(스크립트에서 직접 밀어넣을때 사용)
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 투자자 차트 데이터 형태
//------------------------------------------------------
//데이터 예제 : names + "=" + datas
//------------------------------------------------------
ChartManager.setAccrueData = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setAccrueData", params);
}

//======================================================
// 차트 저장
//======================================================
//param[0] : 적용 할 ChartId
//------------------------------------------------------
ChartManager.setSaveChart = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setSaveChart", params);
}

//======================================================
// 차트의 뷰갯수 설정
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 차트에 보일 데이터 개수
//------------------------------------------------------
ChartManager.setViewDataCount = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setViewDataCount", params);
}

//======================================================
// 차트 보조지표 삭제
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 보조지표 명. ex) "거래량"
//------------------------------------------------------
ChartManager.setDeleteIndicaBlock = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setDeleteIndicaBlock", params);
}

//======================================================
// 차트 보조지표 추가
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 보조지표 명. ex) "거래량"
//------------------------------------------------------
ChartManager.setAddIndicaBlock = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setAddIndicaBlock", params);
}

//======================================================
// 차트의 기준값 설정
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 기준값
//------------------------------------------------------
ChartManager.setStandardValue = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setStandardValue", params);
}

//======================================================
// 차트의 타임존 설정
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 타임존
//------------------------------------------------------
ChartManager.setTimeZone = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setTimeZone", params);
}

//======================================================
// 차트의 Multi Index 설정
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : index
//------------------------------------------------------
ChartManager.setDivideNum = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setDivideNum", params);
}

//======================================================
// 차트 데이터 초기화
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : "1" or true을 입력하면 보이기, 다른 값은 숨기기
//------------------------------------------------------
ChartManager.setDataClear = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setDataClear", params);
}

//======================================================
// 매매종합 - 증시자금동향 비교 차트에서 각 항목의 visible 처리
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 적용 할 지표명
//param[2] : 적용 할 상태 true or false
//------------------------------------------------------
//데이터 예제 : chartId, "고객예탁금", "0"
//------------------------------------------------------
ChartManager.setVisibleUserGraph = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setVisibleUserGraph", params);
}

//======================================================
// 차트의 기준선 기능 사용 유무 설정 (지표신호)
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : "1" or true을 입력하면 보이기, 다른 값은 숨기기
//------------------------------------------------------
ChartManager.setIsBaseLine = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setIsBaseLine", params);
}

//======================================================
// 차트설정 -> 분틱주기 탭 실행 시 실행되는 메소드
// 분틱주기 각 값들을 Client에 저장된 값으로 채운다.
//======================================================
//param[0] : 적용 할 ChartId
//------------------------------------------------------
ChartManager.onGetPeriodInfo = function(chartId)
{
    
    var delegator = ChartManager.delegatorObj[chartId];
    var periodValue = null;
    
    if(delegator && delegator.onGetPeriodInfo) periodValue = delegator.onGetPeriodInfo();
    
    // 분틱주기 각 값들을 Client에 저장된 값으로 채운다.
    cordova.exec( null , null, "ChartPlugin" , "setSyncPeriodValueToChart", [chartId, periodValue]);
}

//======================================================
// 차트설정 -> 분틱주기 탭 종료 시 실행되는 메소드
// 분틱 주기 값을 Client에 저장한다.
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 분틱 주기 값들
//------------------------------------------------------
ChartManager.onChangePeriodOnStorage = function(chartId, periodValue)
{
    //데이터를 저장하는 소스 추가해주세요.
    periodValue = periodValue.replace("<<", "").replace(">>", "");
    
    var arrPeriodValue = periodValue.split("/");
    var arrBunList = arrPeriodValue[0].split(";");
    var arrTicList = arrPeriodValue[1].split(";");
    
    var delegator = ChartManager.delegatorObj[chartId];
    
    if(delegator && delegator.onChangePeriodOnStorage)
        delegator.onChangePeriodOnStorage(arrBunList, arrTicList);
}

//======================================================
// 차트에서 뷰갯수를 수정하면 실행된다.
// 차트의 뷰갯수를 지정하고 싶으면 setViewDataCount(chartId, viewnum) 메소드 사용.
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 뷰갯수
//------------------------------------------------------
ChartManager.onByNumber = function(chartId, viewnum)
{
    var delegator = ChartManager.delegatorObj[chartId];
    
    //조회개수
    if(delegator && delegator.onByNumber)
        delegator.onByNumber(viewnum);
}

//======================================================
// 차트에서 스마트시그널 사용 유무 요청
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 선택 값 (ison)
//------------------------------------------------------
ChartManager.onSmartSignal = function(chartId, ison)
{
    var delegator = ChartManager.delegatorObj[chartId];
    
    //조회개수
    if(delegator && delegator.onSmartSignal)
        delegator.onSmartSignal(ison);
}

//======================================================
// 차트에서 평균매수가 사용 유무 요청
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 선택 값 (ison)
//------------------------------------------------------
ChartManager.onAverageBuyData = function(chartId, ison)
{
    var delegator = ChartManager.delegatorObj[chartId];
    
    //조회개수
    if(delegator && delegator.onAverageBuyData)
        delegator.onAverageBuyData(ison);
}

//======================================================
// 차트에서 미체결 데이터 사용 유무 요청
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 선택 값 (ison)
//------------------------------------------------------
ChartManager.onMichegyulData = function(chartId, ison)
{
    var delegator = ChartManager.delegatorObj[chartId];
    
    //조회개수
    if(delegator && delegator.onMichegyulData)
        delegator.onMichegyulData(ison);
}

//======================================================
// 차트에서 알림 타입 사용 유무 요청
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 선택 값 (ison)
//------------------------------------------------------
ChartManager.onAlarmData = function(chartId, ison)
{
    var delegator = ChartManager.delegatorObj[chartId];
    
    //조회개수
    if(delegator && delegator.onAlarmData)
        delegator.onAlarmData(ison);
}

//======================================================
// 차트에서 알림 타입 사용 유무 요청
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 선택 값 (ison)
//------------------------------------------------------
ChartManager.onDelAlarmData = function(chartId, ison)
{
    var delegator = ChartManager.delegatorObj[chartId];
    
    //조회개수
    if(delegator && delegator.onDelAlarmData)
        delegator.onDelAlarmData(ison);
}

//======================================================
// 수정주가의 값이 변경되면 실행된다.
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 수정주가 사용 유무
//------------------------------------------------------
ChartManager.onChangeAdjustedStock = function(chartId, isAdjustedStock)
{
    //0 / 1
    var delegator = ChartManager.delegatorObj[chartId];
    
    //조회개수
    if(delegator && delegator.onChangeAdjustedStock)
        delegator.onChangeAdjustedStock(isAdjustedStock);
}


//======================================================
// 차트 선택 시 실행되는 메소드 (멀티차트에서 자주 사용)
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 선택된 차트 인덱스 (종목코드;종목명)
//param[2] : 설정 값 (주기;주기값;현재가;사인;변동폭;등락률;거래량;종목코드;시장;시가;고가;저가;기준가;)
//------------------------------------------------------
ChartManager.onSelectedChart = function(chartId, selectedIndex, strInfo)
{

	var delegator = ChartManager.delegatorObj[chartId];
    
    //조회개수
    if(delegator && delegator.onSelectedChart)
        delegator.onSelectedChart(selectedIndex, strInfo);
}

//======================================================
// 멀티차트 분할 변경 시 실행되는 메소드 (멀티차트에서 자주 사용)
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 분할 개수
//param[2] : 코드 데이터
//param[3] : 리얼 데이터
//------------------------------------------------------
ChartManager.onDivideChart = function(chartId, nTotNum, sCodeData, sRealData, sMarket)
{
//    alert(nTotNum + "\n" + sCodeData + "\n" + sRealData);
    
    //멀티차트 분할 후 작업 소스 추가해주세요.
	
	var delegator = ChartManager.delegatorObj[chartId];
    
    //조회개수
    if(delegator && delegator.onDivideChart)
        delegator.onDivideChart(nTotNum, sCodeData, sRealData, sMarket);
}

//======================================================
// 차트 제거
//======================================================
//param[0] : 적용 할 ChartId
//------------------------------------------------------
ChartManager.destroy = function(chartId)
{
    var params = [chartId];
    cordova.exec( null , null, "ChartPlugin" , "destroy", params);
}

//======================================================
// 차트에서 서버로 데이터 요청
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 선택 된 차트 영역 인덱스
//param[2] : 차트 데이터(simbol;name;market;period;cycle) 
//------------------------------------------------------
ChartManager.onRequestData = function(chartId, selIndex, strData)
{
    var strDatas = strData.split(";");
	var delegator = ChartManager.delegatorObj[chartId];
	if(delegator && delegator.onRequestData) delegator.onRequestData(strDatas, selIndex); 
}

//======================================================
// 팝업 데이터 받기 (화면에서 요청)
//======================================================
//param[0] : 적용 할 ChartId
//------------------------------------------------------
ChartManager.getComparePopupData = function(chartId)
{
    var params = [chartId];
    cordova.exec( null , null, "ChartPlugin" , "getComparePopupData", params);
}

//======================================================
// 팝업 데이터 받기 (차트에서 전달)
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 비교차트 정보 (예: ^005930^삼성전자^kospi)
//param[2] : 비교차트 체크 정보 (예: 1,1,1,1,1)
//------------------------------------------------------
ChartManager.onComparePopupData = function(chartId, compareArray, compareChecks)
{
	var delegator = ChartManager.delegatorObj[chartId];
	if(delegator && delegator.onComparePopupData) delegator.onComparePopupData(compareArray, compareChecks);
	/*
    var $divListArea = $("#MS0219--ComparePopupDisplayArea");
    $divListArea.html("");
    
    var indexList;
    
    for (indexList=0; indexList < compareMaxList; indexList++)
    {
        var arrJongmokData = compareArray[indexList];
        
//        alert(arrJongmokData);
        
        if (arrJongmokData != null)
        {
            //==============================
            // 출력 하게 될 div
            //==============================
            var currentIndex = indexList;
            
            
            var divRow = '<div class="AView-Style ui-droppable" data-base="AView" data-class="AView" style="width: 600px; height: 100px; background-color: rgba(0, 0, 0, 0); left: 0px; top: 0px; position: relative; border-bottom:1px solid #111111;"></div>'
            
            var $divRow = $(divRow);

            $divListArea.append($divRow);
            
            //==============================
            // 체크박스 데이터 주입
            //==============================
            var $spanCheck = $('<input type="checkbox" data-index="' + currentIndex +'"/>');
            var isChecked = compareChecks[currentIndex];
            
            if(isChecked == "1")
            {
                $spanCheck.attr("checked", true);
            }
            else
            {
                $spanCheck.attr("checked", false);
            }
            
            var fnClickCheck = function(){
                var isChecked = "0";
                var $chk = $(this);
                var index = $chk.data("index");
                
                //체크 된 경우
                if ($chk.is(":checked")) {
                    isChecked = "1";
                }
            }
            
            $spanCheck.click(fnClickCheck);
            
            $divRow.append($spanCheck);

            //==============================
            // 종목 데이터 주입
            //==============================
            var arrJongmokRowData = arrJongmokData.split("^");
            
            var strJongmokCode = arrJongmokRowData[1];
            var strJongmokName = arrJongmokRowData[2];
            var strJongmokType = arrJongmokRowData[3];
            
            var $divJongmokName = $('<div style="top:0px;left:40px;position:absolute;">' + strJongmokName + '</div>');
            var $divJongmokCode = $('<div style="top:50px;left:40px;position:absolute;">' + strJongmokCode + '</div>');

            $divRow.append($divJongmokName);
            $divRow.append($divJongmokCode);
            
            //==============================
            // 삭제 버튼 주입
            //==============================
            var $btnDelete = $('<button style="top:0px;left:200px; position:absolute;" data-index="' + currentIndex +'">삭제</button>');
            var isChecked = compareChecks[currentIndex];
            
            var fnClickDelete = function(){
                var $button = $(this);
                var index = $button.data("index");
                
                var $divList = $divListArea.children();
                
                if($divList.length > 1)
                {
                    $divList.eq(index).remove();
                }
                else
                {
                    alert("최소 한개 종목은 있어야 합니다.");
                }
            }
            
            $btnDelete.click(fnClickDelete);
            
            $divRow.append($btnDelete);
            
            //==============================
            // 확인 시 차트로 보낼 데이터 저장 영역
            //==============================
            var $hiddenData = $('<input type="text" style="width:200px;top:50px;left:150px; position:absolute;"/>');
            
            $hiddenData.val(arrJongmokData);
            $divRow.append($hiddenData);
        }
    }
	*/
}

//======================================================
// 비교차트 팝업 닫을 시 팝업 내용을 차트로 전달
//======================================================
//param[0] : 적용 할 ChartId
//------------------------------------------------------
ChartManager.setCompareArrayFromPopup = function(chartId, sendCompareArray, sendCompareChecks)
{
	/*
    var $arrDivList = $("#MS0219--ComparePopupDisplayArea").children();

    var sendCompareArrayChecked = [];
    var sendCompareArrayUnchecked = [];
    
    var sendCompareArray = [];
    var sendCompareChecks = [];
    
    var indexList;
    var nCheckedCount = 0;
    var nUncheckedCount = 0;
    
    for (indexList=0; indexList< $arrDivList.length; indexList++)
    {
        var $rowDiv = $arrDivList.eq(indexList);
        
        var $hidden = $rowDiv.children().eq(4);
        
        var $chk = $rowDiv.children().eq(0);
        var isChecked = "0";
        
        //체크 된 경우
        if ($chk.is(":checked")) {
            sendCompareArrayChecked[nCheckedCount] =  $hidden.val();
            nCheckedCount++;
        }
        else
        {
            sendCompareArrayUnchecked[nUncheckedCount] =  $hidden.val();
            nUncheckedCount++;
        }
    }
    
    sendCompareArray = sendCompareArrayChecked.concat(sendCompareArrayUnchecked);
    
    for (indexList=0; indexList < compareMaxList; indexList++)
    {
        if(indexList >= nCheckedCount && indexList < nCheckedCount+nUncheckedCount)
        {
            sendCompareChecks[indexList] = "0";
        }
        else
        {
            sendCompareChecks[indexList] = "1";
        }
    }
    
    /*======================================================================
    // To. 정일균 과장님
    // params를 화면에서 저장해 놓았다가 차트가 켜진 후 아래 구문이 실행되도록 구현해주세요
    ======================================================================*/
	
    var params = [chartId, sendCompareArray, sendCompareChecks];
    cordova.exec( null , null, "ChartPlugin" , "setCompareArrayFromPopup", params);
    
}

//======================================================
// 비교차트 데이터 재요청
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 비교차트 정보 (예: ^005930^삼성전자^kospi)
//param[2] : 비교차트 체크 정보 (예: 1,1,1,1,1)
//------------------------------------------------------
ChartManager.onCompareDataRequest = function(chartId, compareArray, compareChecks)
{
	var delegator = ChartManager.delegatorObj[chartId];
	if(delegator && delegator.onCompareDataRequest) delegator.onCompareDataRequest(compareArray, compareChecks);
	
	/*
    var dataList = {
        '005930' : tempData1,
        '015760' : tempData2,
        '005380' : tempData3,
        '028260' : tempData4,
        '012330' : tempData5,
    };
    
    var indexList;
    
    for (indexList in compareArray)
    {
        var arrJongmokData = compareArray[indexList];

        if(arrJongmokData != null)
        {
            var arrJongmokRowData = arrJongmokData.split("^");
            
            var strJongmokCode = arrJongmokRowData[1];
            var strJongmokName = arrJongmokRowData[2];
            var strJongmokType = arrJongmokRowData[3];
            
            if(compareChecks[indexList] == "1")
            {
                var params = [chartId, dataList[strJongmokCode]];
                cordova.exec( null , null, "ChartPlugin" , "updateOutputData", params);
            }
        }
    }
	*/
};

//======================================================
// 비교차트 팝업 닫을 시 팝업 내용을 차트로 전달 (Test)
//======================================================
//param[0] : 적용 할 ChartId
//------------------------------------------------------
ChartManager.setCompareArrayFromPopupTest = function(chartId)
{
    var $arrDivList = $("#MS0219--ComparePopupDisplayArea").children();
    
    var sendCompareArray = [];
    var sendCompareChecks = [];
    
    var indexList;
    
    for (indexList=0; indexList< $arrDivList.length; indexList++)
    {
        var $rowDiv = $arrDivList.eq(indexList);

        var $hidden = $rowDiv.children().eq(4);

        var $chk = $rowDiv.children().eq(0);
        var isChecked = "0";
        
        //체크 된 경우
        if ($chk.is(":checked")) {
            isChecked = "1";
        }
        
        sendCompareArray[indexList] =  $hidden.val();
        sendCompareChecks[indexList] = isChecked;
    }
    
    for (indexList=0; indexList < compareMaxList; indexList++)
    {
        if(sendCompareChecks[indexList] == null)
        {
            sendCompareChecks[indexList] = "1";
        }
    }
    
    var params = [chartId, sendCompareArray, sendCompareChecks];
    cordova.exec( null , null, "ChartPlugin" , "setCompareArrayFromPopup", params);
    
    $("#MS0219--ComparePopupArea").hide();
    ChartManager.bringToFront(0);
};

//======================================================
// 비교차트 체크박스 클릭 시 차트에 적용
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 비교차트 인덱스
//param[2] : 체크 유무 (1,0)
//------------------------------------------------------
ChartManager.setCheckCompareItem = function(chartId, nIndex, isChecked)
{
    var params = [chartId, nIndex, isChecked];
    cordova.exec( null , null, "ChartPlugin" , "setCheckCompareItem", params);
}

//======================================================
// 비교차트 삭제 버튼 클릭 시 차트에 적용
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 비교차트 인덱스
//------------------------------------------------------
ChartManager.setRemoveCompareItem = function(chartId, nIndex)
{
    var params = [chartId, nIndex];
    cordova.exec( null , null, "ChartPlugin" , "setRemoveCompareItem", params);
}

//======================================================
// 차트 초기화 완료
//======================================================
//param[0] : 적용 할 ChartId
//------------------------------------------------------
ChartManager.onChartInit = function(chartId)
{    
    var delegator = ChartManager.delegatorObj[chartId];
    // alert("onChartInit:" + delegator + "deleg:"+delegator.onChartInit);
    if(delegator && delegator.onChartInit)
        delegator.onChartInit(chartId);
}

//======================================================
// 멀티차트 커버 터치 시 발생 이벤트
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 선택된 차트 인덱스 (종목코드;종목명)
//param[2] : 설정 값 (주기;주기값;현재가;사인;변동폭;등락률;거래량;종목코드;시장;시가;고가;저가;기준가;)
//------------------------------------------------------
ChartManager.onRequestCodeControl = function(chartId, selectedIndex, strInfo)
{
    var delegator = ChartManager.delegatorObj[chartId];
    
    if(delegator && delegator.onRequestCodeControl)
        delegator.onRequestCodeControl(selectedIndex, strInfo);
}

//======================================================
// 스크롤 끝까지 이동. 연속 데이터 요청
//======================================================
//param[0] : 적용 할 ChartId
//------------------------------------------------------
ChartManager.onScrollEnd = function(chartId)
{
    var delegator = ChartManager.delegatorObj[chartId];
    
    if(delegator && delegator.onScrollEnd)
        delegator.onScrollEnd();
}

//======================================================
// 차트 마켓 변경
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : MarketCategory
//------------------------------------------------------
ChartManager.setMarketCategory = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "setMarketCategory", params);
}


//======================================================
// 리얼 데이터 입력
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 리얼 데이터
//------------------------------------------------------
ChartManager.updateRealData = function(params)
{
    cordova.exec( null , null, "ChartPlugin" , "updateRealData", params);
}

//======================================================
 // 시장지표 데이터 요청
//======================================================
 //param[0] : 적용 할 ChartId
 //param[1] : 시장지표명
//------------------------------------------------------
ChartManager.onRequestMarketIndicatorName = function(chartId, strMarketIndicatorTitle, nDataCount)
{
 	var delegator = ChartManager.delegatorObj[chartId];
	
	if(delegator.onRequestMarketIndicatorName)
		delegator.onRequestMarketIndicatorName(strMarketIndicatorTitle, nDataCount);
    
};

//======================================================
// 시장지표 데이터 입력
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 시장지표 데이터
//------------------------------------------------------
ChartManager.setMarketData = function(chartId, marketIndicatorData)
{
     var params = [chartId, marketIndicatorData];
     cordova.exec( null , null, "ChartPlugin" , "setMarketData", params);
};

//======================================================
// 차트 화면에 [i] 수치조회창 버튼 상태 변경 요청
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : Checked or Unchecked
//------------------------------------------------------
ChartManager.onConfigViewPanalChange = function(chartId, isShow)
 {
   var delegator = ChartManager.delegatorObj[chartId];

   if(delegator.onConfigViewPanalChange){
        delegator.onConfigViewPanalChange(isShow);
    }
 };
 
//======================================================
// 현재 차트뷰[ChartView.js-ChartPlugin.java-ChartManager.java]에 등록 된 모든 차트 제거
//======================================================
ChartManager.destroyAll = function()
{
	if(window.cordova)
	{
		cordova.exec( null , null, "ChartPlugin" , "destroyAll", []);
	}
};

//======================================================
// 차트 위에 Toast 출력
//======================================================
//param[0] : 출력 할 텍스트
//------------------------------------------------------
ChartManager.toast = function(text)
{
    cordova.exec( null , null, "ChartPlugin" , "toast", [text]);
};

//======================================================
// 차트 색상 정보 적용
//======================================================
//param[0] : 적용 할 ChartId
//param[1] : 차트 색상 정보
//------------------------------------------------------
ChartManager.setChartColorInfos = function(chartId, arrChartColorInfos)
{
	var params = [chartId, arrChartColorInfos];
	cordova.exec( null , null, "ChartPlugin" , "setChartColorInfos", params);
	
	/*====================================================================
	//비교차트 색상 적용 소스 예제 (ChartView에서 사용)
	//====================================================================
	var chartColor = ChartView.chartColorBasic; //현재 테마의 색상을 가져옴. 저장하는 게 좋을 듯
	chartColor[16] = "ff0000";
	chartColor[17] = "00ff00";
	chartColor[18] = "0000ff";
	chartColor[19] = "ffff00";
	chartColor[20] = "00ffff";

	ChartManager.setChartColorInfos(chartId, chartColor); */
};

//======================================================
// 클릭 한 차트의 정보
//======================================================
//param[0] : 클릭 한 ChartId
//param[1-5] : 날짜, 시가, 고가, 저가, 종가, 차트에서 터치한 위치의 가격
//------------------------------------------------------
ChartManager.onChartTouchData = function(chartId, strDate, strStart, strHigh, strLow, strClose, strPrice)
{
    var delegator = ChartManager.delegatorObj[chartId];
    
    if(delegator && delegator.onChartTouchData)
        delegator.onChartTouchData(strDate, strStart, strHigh, strLow, strClose, strPrice);
};

