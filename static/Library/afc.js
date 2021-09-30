/**
 * @author asoocool
 */

var afc = 
{
    BTN_STATE: ['normal', 'touch', 'disable'],
    CHECK_STATE: ['check', 'normal'],
    
    ATTR_BASE: 'data-base',
    ATTR_CLASS: 'data-class',
    //ATTR_COLOR: 'data-color',               //텍스트 색상
    ATTR_GROUP: 'data-group',
    
    //ATTR_BGCOLOR: 'data-bgcolor',  			//배경 색상
    //ATTR_BGIMAGE: 'data-bgimage',  			//배경 이미지
    ATTR_STYLE: 'data-style',           	//스타일
    ATTR_STYLE_TAB: 'data-style-tab',       //탭 버튼 스타일
    ATTR_DEFAULT: 'data-default',           //라디오버튼(초기셀렉트 아이디)
    
    ATTR_LISTENER: 'data-listener',
    ATTR_QUERY_NAME: 'data-query-name',
    ATTR_RESP: 'data-responsive',
	ATTR_MASK: 'data-mask',
    
    CLASS_MARK: '--',
    CMARK_LEN: 2,
    
    MASK_NONE: 0,
    MASK_MONEY: 1,
	MASK_FLOAT: 2,

	DISABLE_TIME: 500,
	TOUCH_DELAY_TIME: 300,
	CLICK_DELAY: 100,
	
    //키이벤트
	KEY_TAB: 9, KEY_ENTER: 13, KEY_ESC: 27, KEY_SPACE: 32, 
    KEY_LEFT: 37, KEY_UP: 38, KEY_RIGHT: 39, KEY_DOWN: 40, KEY_DEL: 46,
    KEY_A: 65, KEY_C: 67, KEY_D: 68, KEY_E: 69, KEY_F: 70, KEY_G: 71,KEY_H: 72, KEY_N: 78, KEY_O: 79, 
	KEY_Q: 81, KEY_S: 83, KEY_V: 86, KEY_W: 87, KEY_X: 88, KEY_Y: 89, KEY_Z: 90,
    KEY_F1: 112, KEY_F2: 113, KEY_F3: 114, KEY_F4: 115, KEY_F5: 116, KEY_F6: 117, KEY_F7: 118, KEY_F8: 119, KEY_F9: 120, KEY_F10: 121, 
	
	
};

afc.ClassName =
{
    LABEL:'ALabel',
	TEXTBOX:'ATextBox',
    BUTTON:'AButton',
    CHECKBOX:'ACheckBox',
    RADIOGROUP:'ARadioGroup',
    RADIOBUTTON:'ARadioButton',
    TEXTFIELD:'ATextField',
    TEXTAREA:'ATextArea',
    DROPBOX:'ADropBox',
    SELECTBOX:'ASelectBox',
    GRID:'AGrid',
    TREE:'ATree',
    SWITCHBUTTON:'ASwitchButton',
    IMAGE:'AImage',
    CANVAS:'ACanvas',
    PROGRESS : 'AProgress',
    SLIDER : 'ASlider',
    DATEPICKER : 'ADatePicker',
    TIMEPICKER : 'ATimePicker',
	SCROLLBAR : 'AScrollBar',
	
    GRIDLAYOUT : 'AGridLayout',
    FLEXLAYOUT : 'AFlexLayout',
	
    VIEW:'AView',
    LISTVIEW:'AListView',
    TABVIEW:'ATabView',
    WEBVIEW:'AWebView',

    FLEXVIEW:'AFlexView',
    SPLITVIEW:'ASplitView',
    ACCORDION: 'AAccordion',

	BAR: 'ABar',
    TOOLBAR: 'AToolBar',
	MENUBAR: 'AMenuBar',
	TABBAR: 'ATabBar',
	
	FLOAT: 'AFloat',
	TOAST: 'AToast',
	INDICATOR: 'AIndicator',
	MENU: 'AMenu',
    
    PAGE:'APage',
    WINDOW: 'AWindow',
    APPLICATION: 'AApplication'
    
};

//afc.ACTION_DOWN = 'touchstart';
//afc.ACTION_MOVE = 'touchmove';
//afc.ACTION_UP = 'touchend';

afc.COMP_CTX = {};

//afc.COMP_CTX.defEvents = ['actiondown', 'actionmove', 'actionup'];

afc.compLabel = {
	"ALabel" : "Label",
	"ATextBox" : "TextBox",
	"AButton" : "Button",
	"ACheckBox" : "CheckBox",
	"ARadioButton" : "RadioButton",
	"ADropBox" : "DropBox",
	"ASelectBox" : "SelectBox",
	"ATextField" : "TextField",
	"ATextArea" : "TextArea",
	"ASwitchButton" : "SwitchButton",
	"AImage" : "Image",
	"ACanvas" :"Canvas",
	"AGrid" : "Grid", 
	"ATree" : "Tree",
	"AScrollBar" : "ScrollBar",
	"AView" : "View",
	"ARadioGroup" : "RadioGroup",
	"AListView" : "ListView",
	"ATabView" : "TabView",
	"AWebView" : "WebView",
	"AProgress" : "Progress",
	"ASlider" : "Slider",
	//"ADatePicker" : "DatePicker", 
	"AGridLayout" : "GridLayout",
	"AFlexLayout" : "FlexLayout",
	"AFlexView" : "FlexView",
	"ASplitView" : "SplitView",
	"AAccordion" : "Accordion",
	//"ADataGrid" : "DataGrid",
	//"ACalendar" : "Calendar",
	//"ABar" : "Bar",
	//"AToolBar" : "ToolBar",
	//"AMenuBar" : "MenuBar",
	//"ATabBar" : "TabBar"

};


afc.defaultLib = 
{
	"library":
	[
		"jquery-2.1.3.js",
		"jquery-ui.js",
		"afc.js",
        "ARect.js",
        "AUtil.js",
		"TabKeyController.js"
	],
	
	"component":
	[
		"AComponent.js", 
		"ALayout.js", 
		"AFloat.js",
		"AContainer.js",
		"APanel.js",
		"AWindow.js",
		"APage.js",
		"ANavigator.js",
		"AApplication.js",
		"ADocument.js",
		"AView.js",
		"ATabView.js"
	],
	
	"event":
	[
		"AEvent.js", 
	],
	
	"style":
	[
		"afc.css",
		"comp.css",
		"basicStyle.css",
		"compEx.css",
		"jquery-ui.css"
	]
};



//--------------------------------------- Component -------------------------------------------------------------------------




//--------------------------------------------------------------------------------------------
// About Log
//--------------------------------------------------------------------------------------------

afc.disableLog = function()
{
	afc.log = function() { return ''; };
	console.log = function() {};
};

afc.logFilter = 'SpiderGen';
afc.logOption = 
{
	compElement: false,
};

afc.log = function(msg)
{
	var logMsg = '';
	
	if(msg instanceof AComponent || msg instanceof AContainer) logMsg = msg.toString(); 
	else if(msg instanceof HTMLElement) logMsg = $(msg)[0].outerHTML;
	else if(msg instanceof Object) logMsg = afc.stringifyOnce(msg, undefined, 4);
	else logMsg = msg;
	
	logMsg = afc.logFilter + ' => ' + logMsg;
	console.log(logMsg);
	
	if(afc.isIos) AppManager.consoleLog(logMsg);
	
	return logMsg;
};

afc.getPref = function(callback)
{
	AppManager.getPref('PushCode', callback)
}

afc.clearPref = function()
{

	AppManager.clearPref('PushCode')
}

afc.getNoticePopup = function(callback)
{
	AppManager.getPref('NoticePopup', callback)
}

afc.setNoticePopup = function(setParam)
{
	AppManager.setPref('NoticePopup', setParam)
}


afc.log2 = function(msg)
{
	var logMsg = '';
	
	if(msg instanceof HTMLElement) logMsg = $(msg)[0].outerHTML;
	else if(msg instanceof Object) logMsg = afc.stringifyOnce(msg, undefined, 4);
	else logMsg = msg;
	
	logMsg = afc.logFilter + ' => ' + logMsg;
	console.log(logMsg);
	
	if(afc.isIos) AppManager.consoleLog(logMsg);
	
	return logMsg;
};


afc.setLogFilter = function(filter)
{
	afc.logFilter = filter;
};

afc.setLogOption = function(option)
{
	for(var p in option)
	{
		if(!option.hasOwnProperty(p)) continue;
		afc.logOption[p] = option[p];
	}
};

afc.stringifyOnce = function(obj, replacer, indent)
{
    var printedObjects = [];
    var printedObjectKeys = [];

    function printOnceReplacer(key, value)
    {
        if ( printedObjects.length > 200) // browsers will not print more than 20K, I don't see the point to allow 2K.. algorithm will not be fast anyway if we have too many objects
        { 
        	return 'object too long';
        }
        
        var printedObjIndex = false;
        printedObjects.forEach(function(obj, index)
        {
            if(obj===value)
                printedObjIndex = index;
        });

		//root element
        if ( key == '')
        {
        	printedObjects.push(obj);
            printedObjectKeys.push("root");
            return value;
        }
        else if(printedObjIndex+"" != "false" && typeof(value)=="object")
        {
            if ( printedObjectKeys[printedObjIndex] == "root") return "(pointer to root)";
            else return "(see " + ((!!value && !!value.constructor) ? afc.getClassName(value).toLowerCase()  : typeof(value)) + " with key " + printedObjectKeys[printedObjIndex] + ")";
        }
        else
        {
            var qualifiedKey = key || "(empty key)";
            printedObjects.push(value);
            printedObjectKeys.push(qualifiedKey);
            
            if(replacer) return replacer(key, value);
            else return value;
        }
    }
    
    return JSON.stringify(obj, printOnceReplacer, indent);
};


//--------------------------------------------------------------------------------------------
// About Time Check
//--------------------------------------------------------------------------------------------
if (!Date.now) {
	Date.now = function now() {
		return new Date().getTime();
	};
}

afc.startTime = 0;
afc.oldTime = 0;
afc.beginTimeCheck = function(msg)
{
	afc.log(msg + ' start time ==> --------------------------------------------------');
	window.startTime = window.oldTime = Date.now();
};

afc.ellapseCheck = function(msg)
{
	if(window.startTime==0) return;
	
	afc.log(msg + ' ellapsed time ==> ' + (Date.now() - window.oldTime));
	window.oldTime = Date.now();
};

afc.endTimeCheck = function(msg)
{
	afc.log(msg + ' end time ==> ' + (Date.now() - window.startTime) + ' -------------------------------------');
	window.startTime = 0;
	window.oldTime = 0;
};


//-------------------------------------------------------------------
//  function MyObject()
//  {
//      ParentObject.call(this); //부모에 변수 선언이 있다면 호출해 줄 것.
//  }
//  afc.extendsClass(MyObject, ParentObject);
//--------------------------------------------------------------------

//클래스 상속 관련 처리를 해준다.
afc.extendsClass = function(childClass, parentClass)
{
    //이미 상속처리가 되어져 있는 경우는 리턴
    if(childClass.prototype.superClass) return;
	
//컴포넌트 스크립트 파일이 로드되는 시점
afc.setScriptMap();

    //상속 받을 부모의 프로토 타입 객체를 생성한다.
    var superProto = new parentClass(); //파라미터 없이 호출한다.
    for(var p in superProto) 
        if(superProto.hasOwnProperty(p)) delete superProto[p];
    
    childClass.prototype = superProto;
    childClass.prototype.constructor = childClass;
    childClass.prototype.superClass = parentClass;
};

afc.getClassName = function(funcObj)
{
	if(afc.isIE)
	{
		var funcNameRegex = /function (\w*)/;	//   /function (.{1,})\(/;
		var results = (funcNameRegex).exec(funcObj.constructor.toString());
		return (results && results.length > 1) ? results[1] : "";
/*		
  		var f = typeof funcObj == 'function';
  		var s = f && ((funcObj.name && ['', funcObj.name]) || funcObj.toString().match(/function ([^\(]+)/));
  		return (!f && 'not a function') || (s && s[1] || 'anonymous');
  */
	}
	else return funcObj.constructor.name;
};

afc.getUrlParameter = function()
{  
    var ParameterObject = new Object();  
    var locate = location.href;  
 
    if(locate.indexOf("?")==-1)  
        return ParameterObject;  
 
    var parameter = locate.split("?")[1];  
    var paramAreay = parameter.split("&");  
    for ( var i=0; i<paramAreay.length; i++ )  
    {  
        var tem = paramAreay[i].split("=");  
        ParameterObject[tem[0]] = tem[1];  
    }

    return ParameterObject;  
};

afc.loadSync = function(trgEle, url, callback, searchValue, newValue) 
{
	url = url.replace('.lay', '.html');

    $.ajax(
    {
    	async: false,
        url: url,
        dataType: 'text',
        success: function(html)
        {
			if(searchValue)
				html = html.replace(searchValue, newValue);
			
        	if(trgEle)
        	{
	        	var trgObj = $(trgEle);
	        	trgObj.children().remove();
				trgObj.append(html);
				if(callback) callback.call(trgEle, true);
        	}
        	else if(callback) callback(html);
        },
        
        error: function() 
        {
        	if(callback) callback.call(trgEle, false);
        }
    });
};

//동적로드 4가지 유형
//1. document.write('<script src="./MainPage.js"></script>');
//2. afc.loadScript('./MainPage.js');
//3. afc.loadScriptSync('./MainPage.js');
//4. eval(afc.getFileSrc("./MainPage.js"));

afc.scriptMap = {};
afc.cssMap = {};

afc.getFileSrc = function(url, isEnc)
{
	var retVal = '';
	jQuery.ajax(
	{
		async:false, type:'GET', url: url, dataType:'text',
		success: function(data) 
		{
			if(isEnc)
			{
				//GibberishAES.size(128);	
				//retVal = GibberishAES.aesDecrypt(data, 'asydhf745igjdfdf'); //asydhf745igjdfdf 암호화 키(16자리)
			}
			else retVal = data;
		},
		error: function(xhr, textStatus, errorThrown) 
		{ 
			retVal = null;
		}
	});

	return retVal;
};

afc.loadScript = function(url)
{
	url = url.replace('.cls', '.js');

	if(!afc.scriptMap[url])
	{
//console.log('[loadScript] ' + url);

		$('<script src="' + url + '"></script>').appendTo('head');
		afc.scriptMap[url] = true;
	}
	
	//else console.log('!! already load !! ' + url);
};

afc.loadScriptSync = function(url, isEnc)
{
	if(!afc.scriptMap[url])
	{
		$('<script>eval(afc.getFileSrc("' + url + '", ' + isEnc + '));</script>').appendTo('head');
		afc.scriptMap[url] = true;
	}
};

afc.setScriptMap = function()
{
	var ss = document.getElementsByTagName('script'),
		src = ss[ss.length-1].src,
		loc = window.location.href;
	
 	loc = loc.substring(0, loc.lastIndexOf('/')+1);
	
	src = src.replace(loc, '');
	
	//console.log('afc.setScriptMap => ' + src);
	
	afc.scriptMap[src] = true;
};


//--------------------------------------------------------------------

afc.loadCss = function(url)
{
	if(!afc.cssMap[url])
	{
		$('<link rel="stylesheet" href="' + url + '"/>').appendTo('head');
		afc.cssMap[url] = true;
	}
};

afc.removeCss = function(url)
{
	$('head link[href="' + url + '"]').remove();
};



afc.touchDelay = function()
{
	afc.enableApp(false);
	setTimeout(function() { afc.enableApp(true); }, afc.TOUCH_DELAY_TIME);
};

afc.enableApp = function(isEnable)
{
	//if(afc.isIos) afc.syncNativeCall('enableApp#'+isEnable);
	//else if(afc.isAndroid) AppManager.enableApp(isEnable);
	
	AppManager.enableApp(isEnable);
};

afc.refreshApp = function()
{
	var tmp = $('<div style="position:absolute; z-index:123156456;">　</div>');
	$('body').append(tmp);

	setTimeout(function() { tmp.remove(); }, 10);
};

//컴포넌트 클래스가 구현 가능한 모든 이벤트 목록을 얻어온다. 
//셋팅한 파라미터의 이벤트 목록만 리턴한다. 둘다 null 이면 AEvent.events 리턴
afc.getEventList = function(baseName)
{
	/*
	var retArr = AEvent.events;
	
	if(baseName) retArr = retArr.concat(window[baseName+'Event'].events);
	if(className && baseName!=className) 
	{
		var evtClass = window[className+'Event'];
		if(evtClass) retArr = retArr.concat(evtClass.events);
	}
	
	return retArr;
	*/
	var ctx = window[baseName].CONTEXT;
	
	if(ctx) return ctx.events.concat(AEvent.defEvents);
	else return [];
};

//--------------------------------------------------------------------------------------------
// About Device & Version
//--------------------------------------------------------------------------------------------

afc.isAndroid = false;
afc.isIos = false;
afc.isTizen = false;
afc.isPC = false;
afc.isMobile = false;
afc.isSimulator = false;
afc.isChrome = false;
afc.isAndWebview = false;
afc.isSystemWebview = false;
afc.isIE = false;

afc.andVer = 1000.0;	//버전값으로만 ios 제외하기 위해 , 4.1, 4.2 ...
afc.iosVer = 1000.0;	//7.0, 7.1 ...

afc.strAndVer = ''; 	//4.1.2
afc.strIosVer = '';		//7.1.2
afc.strIEVer = '';		//edge

afc.strModuleName = '';
afc.scrlWidth = 17;


afc.OS = '';
afc.DIV = '/';

//Win32
if(window.navigator.platform.indexOf('Win')>-1) 
{
	afc.OS = 'WIN';
	afc.DIV = '\\';
}
//MacIntel
else if(window.navigator.platform.indexOf('Mac')>-1) 
{
	afc.OS = 'MAC';
	afc.DIV = '/';
}
else
{
	afc.OS = 'LNX';
	afc.DIV = '/';
}


afc.isDeviceOf = function(device)
{
	return (navigator.userAgent.indexOf(device)>-1);
};

afc.androidVersion = function()
{
	var match = navigator.userAgent.match(/Android\s([0-9\.]*)/);
	afc.strAndVer = match ? match[1] : null;
	
	return afc.strAndVer;
};

afc.iosVersion = function()
{
	var match = navigator.userAgent.match(/iPhone OS\s([0-9\_]*)/);
	afc.strIosVer = match ? match[1] : null;
	
	if(afc.strIosVer) 
	{
		afc.strIosVer = afc.strIosVer.replace(/_/g, '.');
		return afc.strIosVer;
	}
	else return null; 
};

afc.makeMeta = function()
{
	//------------------------------------------------------------------------------
	//  param check
	//------------------------------------------------------------------------------
    var params = afc.getUrlParameter();
    var scale = params['scale'];
    var density = params['density'];
    
    //alert(navigator.userAgent);
    
	var meta = null;
	
	if(PROJECT_OPTION.general.autoScale)
	{
		//console.log(window.devicePixelRatio);
		
		//킷캣 이하 버전
		if(density)	meta = '<meta name="viewport" content="width=device-width, target-densitydpi=' + density + 'dpi, user-scalable=no"/>';
		else
		{
			if(!scale) scale = screen.width / PROJECT_OPTION.general.docWidth;
			
			//확대시킬 경우 높이가 넘어가 스크롤이 발생
			//화면에서 하단을 bottom 을 사용해야 하지만 그렇지 못할 경우도 있으므로 
			//화면내에 들어가는 경우는 기본 1.0 으로 지정한다.
			if(scale>1.0) scale = 1.0;
			
			meta = '<meta name="viewport" content="width=device-width, initial-scale=' + scale + ', user-scalable=no"/>';
		}
	}
	
	//설정값으로 스케일 하는 경우
	else
	{ 
		meta = '<meta name="viewport" content="width=device-width, initial-scale=' + PROJECT_OPTION.general.scaleVal + ', user-scalable=no"/>';
	}

	console.log(meta);
	
	//빌드시점에 만들어 주고 있음.
	//if(afc.isIE)
	//	document.write('<meta http-equiv="X-UA-Compatible" content="IE=edge">');
	
    
   	if(meta) document.write(meta);
   	
   	document.write('<meta http-equiv="Content-Security-Policy" content="connect-src *; default-src * gap://ready file:; img-src * data:; style-src * \'unsafe-inline\'; script-src * \'unsafe-inline\' \'unsafe-eval\'">');
    
	//아이폰 숫자 폰번호 인식 방지
	document.write('<meta name="format-detection" content="telephone=no"/>');
};

afc.browserCheck = function()
{
	var agent = navigator.userAgent.toLowerCase(); 
	var name = navigator.appName;

	// IE old version ( IE 10 or Lower ) 
	if ( name == "Microsoft Internet Explorer" ) afc.strIEVer = "msie"; 
	else 
	{
		// IE 11 
		if(agent.indexOf("trident") > -1) afc.strIEVer = "trident"; 
		// Microsoft Edge  
		else if(agent.indexOf("edge/") > -1 )
		{
			afc.strIEVer = "edge";
			afc.scrlWidth = 12;
		}
		
		else if(agent.indexOf("chrome") > -1) 
		{
			afc.isChrome = true;
			afc.scrlWidth = 14;	//자체적으로 14로 커스텀 했음.
		}
	}
	
	afc.isIE = (afc.strIEVer!='');
};

afc.deviceCheck = function()
{
    afc.isMobile = true;
    
	afc.isHybrid = (window.PROJECT_OPTION && PROJECT_OPTION.build.bridgeName!='none');
	
	if(afc.isDeviceOf('Android')) 
	{
		afc.isAndroid = true;
		afc.andVer = parseFloat(afc.androidVersion());
		
		//System Webview
		if(afc.isDeviceOf('Version/'))
		{
// 			afc.isAndWebview = true;
			afc.isSystemWebview = true;
		}
	}
	else if(afc.isDeviceOf('iPhone') || afc.isDeviceOf('iPad') || afc.isDeviceOf('iPod')) 
	{
		afc.isIos = true;
		afc.iosVer = parseFloat(afc.iosVersion());
		
		//document에 touchend 이벤트를 바인드하지 않으면 아이폰에서 특정 컴포넌트의 touchend가 가끔식 발생하지 않음
		$(document).bind('touchend', function(e){});
		
		//System Webview
		/*if(afc.isDeviceOf('Mobile/'))*/
		if(!afc.isDeviceOf('Safari/'))
		{
			afc.isSystemWebview = true;
		}
	}
	else if(afc.isDeviceOf('Tizen')) 
	{
		afc.isTizen = true;
	}
	else
	{
		//alert(navigator.userAgent);
		
		afc.isPC = true;
		afc.isMobile = false;
		
		//afc.ACTION_DOWN = 'mousedown';
		//afc.ACTION_MOVE = 'mousemove';
		//afc.ACTION_UP = 'mouseup';
		
		if(afc.isDeviceOf('Simulator'))
		{
			afc.isSimulator = true;
			
			afc.isMobile = (PROJECT_OPTION.build.bridgeName!='none');
		}
	}
	
	// if(afc.isMobile)
	// {
	// 	//모바일에서는 스크롤바 표시 안함
	// 	var strCss = '._global_style_ ::-webkit-scrollbar {width: 0px; height: 0px;}'; 
	// 	$('<style></style>').text(strCss).appendTo('head');	
	// }
	
	if(window.PROJECT_OPTION)
	{
		if(PROJECT_OPTION.build.bridgeName=='phonegap')
		{
			//afc.makeMeta();
			
			/*
			//cordova dynamic load
			if(afc.isIos) 			document.write('<script src="Bridge/ios/cordova.js"></script>');
			else if(afc.isAndroid)	document.write('<script src="Bridge/android/cordova.js"></script>');
			else if(afc.isPC)	document.write('<script src="Bridge/windows/cordova.js"></script>');
			*/
			
			
			//cordova dynamic load
			if(afc.isIos) 			afc.loadScript('Bridge/ios/cordova.js');
			else if(afc.isAndroid)	afc.loadScript('Bridge/android/cordova.js');
			else if(afc.isPC)		afc.loadScript('Bridge/windows/cordova.js');
		}
    }
    // alert("navigator.userAgent:"+navigator.userAgent+" isMobile:"+afc.isMobile+" isSystemWebview:"+afc.isSystemWebview);
};

//--------------------------------------------------------------------------------------------
// About BugFix
//--------------------------------------------------------------------------------------------

//스타일을 동적으로 수정하기
afc.addRule = function(sheet, selector, styles)
{
	if(sheet.insertRule) return sheet.insertRule(selector + '{' + styles + '}');
	if(sheet.addRule) return sheet.addRule(selector, styles);
};

//전화걸기
afc.phoneCall = function(phoneNumber)
{
	var phoneStr = 'tel:'+phoneNumber;
	if(afc.isAndroid) AppManager.goUrl(phoneStr);
	else if(afc.isIos) window.location = phoneStr;
};

//pos자리만큼 소수점 버림
afc.floor = function(value, pos) 
{
	var digits = Math.pow(10, pos);
	return parseFloat(parseInt(value*digits, 10)/digits).toFixed(pos);
};

//pos자리만큼 소수점 올림
afc.ceil = function(value, pos) 
{
	var digits = Math.pow(10, pos);
    value = Math.ceil(value*digits)/digits;
	value = value.toFixed(pos)// 0을 채워주기 toFixed를 이용
	
	return value;
};

//pos자리만큼 소수점 버림 + '%'
afc.floorPer = function(value, pos) 
{
	var digits = Math.pow(10, pos);
	return parseFloat(parseInt(value*digits, 10)/digits).toFixed(pos)+'%';
};


//pos만큼 소수점 자리 자르기
afc.floatFix = function(value, pos) 
{
	if(!value) value = 0;
	else value = parseFloat(value);
	
	if(!pos) pos = 2;
	return value.toFixed(pos);
};

//천단위마다 콤마 추가
afc.addComma = function(val) 
{
	if(val != undefined)
	{
		var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
		val += '';  // 숫자를 문자열로 변환
		while (reg.test(val))
			val = val.replace(reg, '$1' + ',' + '$2');
		return val;	
	}
	else return '';
	
	/*
	if(val != undefined) return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	else return '';
	*/
};

//천단위마다 콤마 추가 값이 0인 경우 특수문자 "　" 리턴
afc.hogaComma = function(val) 
{
	if(val != 0)
	{
		var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
		val += '';  // 숫자를 문자열로 변환
		while (reg.test(val))
			val = val.replace(reg, '$1' + ',' + '$2');
		return val;	
	}
	else return '　';
	
	/*
	if(val != undefined) return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	else return '';
	*/
};

//콤마 삭제
afc.removeComma = function(val) 
{
	if(!val) return '';
	else return val.toString().replace(/,/g, '');
};

//더미 데이터의 길이만큼 '*'를 생성
afc.makeDummyString = function(length) 
{
	var dumStr = '';
	for(var i=0; i<length; i++) dumStr += '●';
	return dumStr;
};

//계좌정보에서 계좌정보에 셋팅할 텍스트를 생성
afc.makeAccText = function(accInfo, isGroup) 
{
	var regAcNo = accInfo['D1계좌번호'];
	var accText = '';
	// if(theApp.systemInfo)
	// {
	// 	accText = theApp.systemInfo.makeAccNumber(regAcNo);
	// }
	// else accText = regAcNo.substring(0, 3) + "-" + regAcNo.substring(3, 5) + "-" + regAcNo.substring(5, regAcNo.length);
	return accText;
};

//랜덤컬러값을 생성
afc.getRandomColor = function()
{
	return "#"+((1<<24)*Math.random()|0).toString(16);
};

//DATE객체를 String으로 
afc.dateToString = function(date) 
{
	return sprintf('%4d%02d%02d', date.getFullYear(), date.getMonth()+1, date.getDate());
};

afc.formatDate = function(dateNum)
{
	if(!parseInt(dateNum, 10)) return '';
    dateNum+='';
    return dateNum.substring(0,4)+'/'+dateNum.substring(4,6)+'/'+dateNum.substring(6,8); 
};

afc.formatDate2 = function(dateNum)
{
	if(!parseInt(dateNum, 10)) return '';
    dateNum+='';
    return dateNum.substring(2,4)+'/'+dateNum.substring(4,6)+'/'+dateNum.substring(6,8); 
};

afc.formatMonth = function(monthNum)
{
    monthNum+='';
	return monthNum.substring(0,4)+'/'+monthNum.substring(4,6); 
};

afc.formatDateTime = function(datetimeNum)
{
    datetimeNum+='';
	return datetimeNum.substring(0,2)+'/'+datetimeNum.substring(2,4)+' '+datetimeNum.substring(4,6)+':'+datetimeNum.substring(6,8); 
};

afc.formatTime = function(time)
{
	if(!parseInt(time, 10)) return '';
	
	var map1 = { '31000000':'장마감',
			   '41000000':'시간외마감',
			   '51000000':'장전',
			   '61000000':'장중',
			   '71000000':'장후',
			   '81000000':'단일가',
			   '88000000':'단일가 마감',
			   '91000000':'BN 마감',
			   '91000001':'BN 마감',
			   '91000002':'BN 마감',
			   '91000003':'BN 마감',
			   '91000004':'BN 마감',
			   '91000005':'BN 마감',
			   '91000006':'BN 마감',
			   '91000007':'BN 마감',
			   '91000008':'단일가BN마감'};
	if(map1[time]) return map1[time];
	
	var map2 = ['3','4','5','6','7','8','9'];
    time+='';
	if(map2.indexOf(time.substring(0,1)) > -1) time = '0' + time;	

	return time.substring(0,2)+':'+time.substring(2,4); 
};

afc.formatHMS = function(time)
{
	if(!parseInt(time, 10)) return '';
	
	var map1 = { '31000000':'장마감',
			   '41000000':'시간외마감',
			   '51000000':'장전',
			   '61000000':'장중',
			   '71000000':'장후',
			   '81000000':'단일가 마감',
			   '88000000':'단일가 마감',
			   '91000000':'BN 마감',
			   '91000001':'BN 마감',
			   '91000002':'BN 마감',
			   '91000003':'BN 마감',
			   '91000004':'BN 마감',
			   '91000005':'BN 마감',
			   '91000006':'BN 마감',
			   '91000007':'BN 마감',
			   '91000008':'단일가BN마감'};
	if(map1[time]) return map1[time];
	
	var map2 = ['3','4','5','6','7','8','9'];
    time+='';
	if(map2.indexOf(time.substring(0,1)) > -1) time = '0' + time;

	return time.substring(0,2)+':'+time.substring(2,4)+':'+time.substring(4,6);
};

afc.formatTic = function(ticNum)
{
    ticNum+='';
	return ticNum.substring(0,2)+' '+ticNum.substring(2,4)+':'+ticNum.substring(4,6)+':'+ticNum.substring(6,8); 
};

afc.formatSecond = function(t)
{
    t+='';
	return t.substring(0,2)*3600+t.substring(2,4)*60+t.substring(4,6)*1; 
};

afc.switchButtonColor = function(comp)
{
	comp.removeClass('BT38_K00007');
	
    if(comp.getText() == 'ON')
	{
		comp.removeClass('BT92_K06102');
		comp.addClass('BT91_K06101');
	}
	else
	{
		comp.removeClass('BT91_K06101');
		comp.addClass('BT92_K06102');
	}
};

afc.returnAsIt = function(val)
{
	return val;
};

afc.abs = function(val)
{/*
	if(val == '') val = 0;
	else val *= 1;
	
	return val<0 ? val*-1 : val;*/
	val = val.toString();
	if(val.charAt(0) == '-') return val.substring(1);
	else return val;
};

afc.addPercent = function(val)
{
	return val + '%';
};

afc.absComma = function(val)
{
	return afc.addComma(afc.abs(val));
};

afc.intComma = function(val)
{
	return afc.addComma(parseInt(val));
};

afc.absPercent = function(val)
{
	return afc.abs(val) + '%';
};

afc.commaPercent = function(val)
{
	return afc.addComma(val) + '%';
};

afc.absCommaPercent = function(val)
{
	return afc.addComma(val) + '%';
};

afc.plusfloorPercent = function(val)
{
	var digits = Math.pow(10, 2);
	var retVal = parseFloat(parseInt(val*digits, 10)/digits).toFixed(2)+'%';
	//if(val > 0) retVal = ('+'+retVal);
	return retVal;
};

//소수점2자리 버림
afc.floor2 = function(value)
{
	var digits = Math.pow(10, 2);
	return afc.addComma(parseFloat(parseInt(value*digits, 10)/digits).toFixed(2));
};

//소수점2자리 반올림
afc.toFixed2 = function(value)
{
	return afc.addComma(value.toFixed(2));
};

//절대값 소수점2자리 버림
afc.absFloor2 = function(value)
{
	var digits = Math.pow(10, 2);
	value = afc.abs(value);
	return afc.addComma(parseFloat(parseInt(value*digits, 10)/digits).toFixed(2));
};

//절대값 소수점1자리 버림
afc.absFloor1 = function(value)
{
	var digits = Math.pow(10, 1);
	value = afc.abs(value);
	return afc.addComma(parseFloat(parseInt(value*digits, 10)/digits).toFixed(1));
};

//소수점2자리 버림 + '%'
afc.floor2Per = function(value)
{
	
	if(!value) return null;  // 임의 처리 오류 확인을 하기 위함. 2016.12.01
	
//value값이 0.28 등으로 들어올 때 0.29로 javascript에서 처리하기에 toFixed 함수 새로 생성	2016.11.21. 황청유
	//var digits = Math.pow(10, 2);
	//return parseFloat(parseInt(value*digits, 10)/digits).toFixed(2)+'%';
	return ( afc.toFixed(value, 2) + '%' );
};

//num 을 소숫점 fixed 자릿수 이하에서 버리는 함수
afc.toFixed = function (num, fixed) 
{
	if((num != undefined) && (fixed != undefined))
	{
		var numArr = num.toString().split('.');
		var decimal = '';
		if(numArr[1] != undefined)
		{
			var len = numArr[1].length;
			if(len > fixed)
			{
				return parseFloat(numArr[0]+"."+numArr[1].substring(0, fixed)).toFixed(fixed);	
			}
			return parseFloat(num).toFixed(fixed);
		}
		else
		{
			return parseFloat(num).toFixed(fixed);
		}
	}
	else 
	{
		var tmp = '0.';
		for(var i = 0; i < fixed; i++) tmp = tmp + "0";
		return tmp;
	}
	
	/*
	if(!num || !fixed) { // 임의 처리 오류 확인을 하기 위함. 216.12.01
		return null;
	}
	//값이 없을 경우 처리
	if(num*10 == 0) {
		var tmp = '0.';
		for(var i = 0; i < fixed; i++) tmp = tmp + "0";
		return tmp;
	}

    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0]; // <<- // 오류 사항 : TypeError:null is not an object (evaluation 'a.toString().match(d)'), ....
    */ 
};

afc.absFloor2Per = function(value) 
{
	var digits = Math.pow(10, 2);
	value = afc.abs(value);
	return parseFloat(parseInt(value*digits, 10)/digits).toFixed(2)+'%';
};

afc.sigaTotalAmount = function(value) 
{
	if(!value) return '0';
	else
	{
		value = value/1000000000;
		if(value < 0) return value.toFixed(2);
		else return afc.addComma(parseInt(value, 10));
	}
};

afc.capitalAmount = function(value) 
{
	if(!value) return '0';
	else
	{
		value = value/1000000;
		if(value < 0) return value.toFixed(2);
		else return afc.addComma(parseInt(value, 10));
	}
};

afc.addCommaIfFixed = function(value) 
{
	if(!value) return 0;
	else
	{
		if(value.toString().indexOf('.') > -1)
		{
			if(value<0) value *= -1;
			value = parseFloat(value)*1;
			return afc.addComma(value.toFixed(2));
		}
		else return afc.addComma(value);
	}
};

afc.absCommaIfFixed = function(value) 
{
	if(!value) return 0;
	else
	{
		if(value.toString().indexOf('.') > -1)
		{
			if(value<0) value *= -1;
			value = afc.absComma(parseFloat(value))*1;
			return value.toFixed(2);
		}
		else return afc.absComma(value);
	}
};

afc.oneHundredMillionAmount = function(value)
{
	if(!value) return '0';
	else
	{
		value = value/100000000;
		if(value < 0) return value.toFixed(2);
		else return afc.addComma(parseInt(value, 10));
	}
};

afc.isResize = true;

//------------------------------------------------------------------------------------------------------------------
Date.prototype.format = function(f) 
{
    if (!this.valueOf()) return " ";
    
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) 
    {
        switch ($1) 
        {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

String.prototype.str = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".str(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

//------------------------------------------------------------------------------------------------------------------
	
	
window.onerror = function(message, url, lineNumber)
{
/*
	if(!lineNumber || !url) return;

	var totMsg = message + ', Line - ' + lineNumber + ', ' + url;

	if(Define.SAVE_LOG)
	    AppManager.addLog(totMsg);

	console.log(totMsg);
	
	alert(totMsg);
		
	if(afc.isAndroid) navigator.app.exitApp();
	else if(afc.isIos) AppManager.exitApp();
*/

	if(!lineNumber || !url) return;

	// if(theApp) theApp.onError(message, url, lineNumber);

};

//------------------------------------------------------------------------------------------------------------------
// function call
	afc.deviceCheck();
	afc.browserCheck();

	afc.isDevice = false;
	if(afc.isMobile && afc.isSystemWebview) {
		afc.isDevice = true;
	}
	
	// if(!window._afc) afc.makeMeta();

	//카카오톡 예외처리
	if (afc.isDeviceOf("KAKAOTALK")) {
		afc.isDevice = false;	
	}

//------------------------------------------------------------------------------------------------------------------


afc.loadCSSIfNotLoaded = function() 
{
    var ss = document.styleSheets;
	var headEle = document.getElementsByTagName("head")[0];
	
	var ssLen = ss.length;
    for(var i=0; i<ssLen; i++) 
	{
		if(ss[i].cssRules.length==0)
		{
			ss[i].disabled = true;
			
			var link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = ss[i].href;
			headEle.appendChild(link);
		}
    }
};

