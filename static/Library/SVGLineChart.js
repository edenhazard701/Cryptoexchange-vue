
/**
Constructor
Do not call Function in Constructor.
*/
function SVGLineChart()
{
	AView.call(this);

	this.svgChartView = null;
	this.leftTime = null;
	this.rightTime = null;
	this.dateFormat = 1;
	this.maxCnt = 195;		//2분단위 호출시 하루단위 195개
	this.dataTerm = 2*60;	//2분단위
	
	this.todayIdx = 0;
	
	this.eleW = 0;
	this.eleH = 0;
	
	this.mainKeyInfo = null;

}
afc.extendsClass(SVGLineChart, AView);


SVGLineChart.prototype.init = function(context, evtListener)
{
	AView.prototype.init.call(this, context, evtListener);
	
	var child = this.getChildren();
	
	this.svgChartView = child[0];
	
	if(child.length > 1)
	{
		this.leftTime = child[1];
		this.rightTime = child[2];
	}
	
	this.initSvgArea();
	this.calcPosition();

};

SVGLineChart.prototype.initSvgArea = function()
{
	this.lineTag = $('<div class="SD14" style="position:absolute;background:rgba(255,255,255,0.6);top:2%;height:96%;width:1px;color:rgba(255,255,255,0.6);"></div>');
	
	this.svgTag = $('<svg height="100%" width="100%" style="position:absolute;"><defs><filter id="f2" x="0" y="0" width="100%" height="100%"><feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />'+
      '<feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" /><feBlend in="SourceGraphic" in2="blurOut" mode="normal" /></filter></defs><polyline filter="url(#f2)" points="" style="fill:none;stroke:rgba(255,255,255,0.5);stroke-width:3"/></svg>');
	  
	this.svgChartView.$ele.append(this.svgTag);
	this.svgChartView.$ele.append(this.lineTag);
	
	this.polyline = this.svgTag[0].getElementsByTagName('polyline')[0];
};

SVGLineChart.prototype.updatePosition = function(pWidth, pHeight)
{
	AView.prototype.updatePosition.call(this, pWidth, pHeight);
	this.calcPosition();
};

SVGLineChart.prototype.calcPosition = function()
{
	this.eleW = this.svgChartView.$ele.width();
	this.eleH = this.svgChartView.$ele.height();
};

SVGLineChart.prototype.clearChart = function()
{
	this.polyline.setAttribute('points', '');
	this.unregisterReal();
};

SVGLineChart.prototype.unregisterReal = function()
{
	if(this.mainKeyInfo && this.mainKeyInfo['D1단축코드'])
	{
		theApp.infoNetManager.unregisterReal('QR020105', [this.mainKeyInfo], null, [ this ] );
	}
};

SVGLineChart.prototype.setItemInfo = function(item)
{
	this.unregisterReal();
	this.mainKeyInfo = {};
	this.mainKeyInfo['D1단축코드'] = item[0];
	this.mainKeyInfo['D1단축명'] = item[1];
	this.mainKeyInfo['D1시장분류코드'] = item[2];
};

SVGLineChart.prototype.sendChartData = function()
{
	this.clearChart();
	
	this.data = new Array();
	
	var thisObj = this;
	var cnt = this.getContainer();
	cnt.sendData('QR020105', function(queryData, groupName)
	{
		var mainKeyBlock = queryData.getBlockData('InBlock1');
		mainKeyBlock[0] = thisObj.mainKeyInfo;
		
		var subKeyBlock = queryData.getBlockData('InBlock3');
		subKeyBlock[0] = 
		{
			'D1metrix의갯수' : thisObj.maxCnt,
			'D1GID_CODE' : 111,
			'D1Intra주기' : thisObj.dataTerm,
			'D1조회일수' : 2,
			'D1prev' : 0,
			'D1next' : 0
		};
		
		this.registerReal('QR020105', mainKeyBlock, null, [ thisObj ], -1);
		queryData.enableFlag('realFlag');
	},
	function(queryData, groupName)
	{
		
	}, (this.getGroupName())? this.getGroupName() : null);
};

SVGLineChart.prototype.setMaxMin = function()
{
	this.maxAm = 0;
	this.minAm = Number.MAX_VALUE;;
	
	var amount = 0;
	
	for(var i = 0; i<this.data.length; i++)
	{
		amount = this.data[i][2];
		if(this.maxAm < amount) this.maxAm = amount;
		if(this.minAm > amount) this.minAm = amount;
	}
	
	this.rate = this.eleH/(this.maxAm-this.minAm);
	
	this.term = this.eleW/this.maxCnt;
	var pointStr = '';
	
	var dataLen = this.data.length;
	
	for(var i = 0; i<dataLen; i++)
	{
		amount = this.data[i][2];
		pointStr = pointStr+((this.term*i)+','+((this.maxAm-amount)*this.rate)+' ');
	}
	
	this.polyline.setAttribute('points', pointStr);
};

SVGLineChart.prototype.setData = function(data)
{
	this.data = data;
	this.setMaxMin();
	this.setDate();
};

SVGLineChart.prototype.setDate = function()
{
	if(this.leftTime) this.leftTime.setText(this.makeDateFormat(this.data[0]));
	if(this.rightTime) this.rightTime.setText(this.makeDateFormat(this.data[this.data.length-1]));
};

SVGLineChart.prototype.setDateFormat = function(format)
{
	this.dateFormat = format;
};

SVGLineChart.prototype.makeDateFormat = function(dateArr)
{
	if(this.dateFormat == 1)
	{
		var date = dateArr[0].toString();
		date = date.substring(4,6)+'/'+date.substring(6,8);
		var time = dateArr[1].substring(0,2)+':'+dateArr[1].substring(2,4);
		return date+' '+time;
	}
	else
	{
		return dateArr[1].substring(0,2)+':'+dateArr[1].substring(2,4);
	}
};

SVGLineChart.prototype.moveTodayLine = function()
{
	this.lineTag.css('left', this.todayIdx*this.term);
};

SVGLineChart.prototype.addNewData = function(newData)
{
	if(this.data.length == 0) return;
	
	if(this.data[this.data.length-1][1] == newData[1] || (newData[1]%2 != 0))
	{
		this.data[this.data.length-1] = newData;
	}
	else
	{
		this.data.shift();
		this.data.push(newData);
		
		this.todayIdx--;
		if(this.todayIdx < 0) this.todayIdx = this.maxCnt;
		
		this.moveTodayLine();
		
	}
	
	this.setMaxMin();
	this.setDate();
	
};

SVGLineChart.prototype.setQueryData = function(dataArr, keyArr, queryData)
{
	if(!keyArr) return;
	
	if(queryData.isReal)
	{
		if(dataArr[0]['D1Intra종가'])
		{
			var dataArr = AQueryData.getDataKeyObj(dataArr[0].key);
			var time = dataArr['D1체결Intra생성시간'].toString();
			if(time.length == 7) time = '0'+time;
			if(time.length == 8) this.addNewData([dataArr['D1Intra체결일자'], time.substring(0,4), dataArr['D1Intra종가']]);	
		}
	}
	else
	{
		var timeArr = new Array();
		var time = null;
		var timeStr = "";
		var dataLen = dataArr.length;
		for(var i = dataLen-1; i>-1; i--)
		{
			time = dataArr[i]['D1체결Intra생성시간'].toString();
			if(time.length == 7) time = '0'+time;
			if(time.length == 8)
			{
				timeStr = time.substring(0,4);
				if(timeStr == '0902')
				{
					timeStr = '0900';
					this.todayIdx = (dataLen-1) - i;
				}
				timeArr.push([dataArr[i]['D1Intra체결일자'], timeStr, dataArr[i]['D1Intra종가']]);
			}
		}
		
		this.setData(timeArr);
		this.moveTodayLine();
		
	}
};