
/**
Constructor
Do not call Function in Constructor.
*/
function SVGBongChart()
{
	AView.call(this);

	this.empW = 2;
	this.maxCnt = 10;
	this.termW = 0;
	this.type = 0;
	this.qryName = ['QR000014'];
	this.keyArr = 
	[
		['D1시가', 'D1고가', 'D1저가', 'D1현재가', 'D1가격5일이동평균']
	];
	
	this.textH = 20;
	this.maxY = 0;
	this.minY = 0;

}
afc.extendsClass(SVGBongChart, AView);


SVGBongChart.prototype.init = function(context, evtListener)
{
	AView.prototype.init.call(this, context, evtListener);

	this.initSvgArea();
	this.calcPosition();

};

SVGBongChart.prototype.initSvgArea = function()
{
	this.svgTag = $('<svg height="100%" width="100%"></svg>');
	this.$ele.append(this.svgTag);
	
};

SVGBongChart.prototype.updatePosition = function(pWidth, pHeight)
{
	AView.prototype.updatePosition.call(this, pWidth, pHeight);
	this.calcPosition();
};

SVGBongChart.prototype.calcPosition = function()
{
	this.eleW = this.$ele.width();
	this.eleH = this.$ele.height()-(this.textH*2);
	this.barW = this.eleW/this.maxCnt;
	this.termW = (this.barW-this.empW)/2;
	this.maxY = this.textH/2;
	this.minY = this.textH+this.eleH+(this.textH/2);
};

SVGBongChart.prototype.clearChart = function()
{
	this.svgTag.children().remove();
};

SVGBongChart.prototype.unregisterReal = function()
{
	if(this.mainKeyInfo && this.mainKeyInfo['D1단축코드'])
	{
		theApp.infoNetManager.unregisterReal(this.qryName[this.type], [this.mainKeyInfo], null, [ this ] );
	}
};

SVGBongChart.prototype.setType = function(type)
{	
	this.unregisterReal();
	this.type = type;
};

SVGBongChart.prototype.setItemInfo = function(item)
{
	this.unregisterReal();
	this.mainKeyInfo = {};
	this.mainKeyInfo['D1단축코드'] = item[0];
	this.mainKeyInfo['D1단축명'] = item[1];
	this.mainKeyInfo['D1시장분류코드'] = item[2];
	
};

SVGBongChart.prototype.sendChartData = function()
{
	this.clearChart();
	
	var thisObj = this;
	var cnt = this.getContainer();
	var qryName = this.qryName[this.type]; 
	cnt.sendData(qryName, function(queryData, groupName)
	{
		var mainKeyBlock = queryData.getBlockData('InBlock1');
		mainKeyBlock[0] = thisObj.mainKeyInfo;

		var InBlock3 = queryData.getBlockData('InBlock3');
		InBlock3[0] =
			{
			'D1metrix의갯수' : 10,
			'D1GID_CODE' : 52,
		};
		
		this.registerReal(qryName, [thisObj.mainKeyInfo], null, [thisObj], -1);
		queryData.enableFlag('realFlag');
	},
	function(queryData, groupName)
	{
	});
};

SVGBongChart.prototype.setMaxMin = function()
{
	this.maxAm = 0;
	this.minAm = Number.MAX_VALUE;;
	
	var si = 0;
	var go = 0;
	var je = 0;
	var jo = 0;
	var avg = 0;
	
	var maxIdx = 0;
	var maxPri = 0;
	var maxAlign = 'middle';
	var maxX = 0;
	var minIdx = 0;
	var minPri = 0;
	var minAlign = 'middle';
	var minX = 0;
	
	for(var i = 0; i<this.data.length; i++)
	{
		var data = new Array();
		si = this.data[i][0] = (this.data[i][0] == 0) ? si : this.data[i][0];
		go = this.data[i][1] = (this.data[i][1] == 0) ? go : this.data[i][1];
		je = this.data[i][2] = (this.data[i][2] == 0) ? je : this.data[i][2];
		jo = this.data[i][3] = (this.data[i][3] == 0) ? je : this.data[i][3];
		avg = this.data[i][4] = (this.data[i][4] == 0) ? this.data[i][3] : this.data[i][4];
		
		if(this.maxAm < go)
		{
			maxIdx = i;
			maxPri = go;
			if(go < avg) this.maxAm = avg;
			else this.maxAm = go;
		}
		
		if(this.minAm > je)
		{
			minIdx = i;
			minPri = je;
			if(je > avg) this.minAm = avg;
			else this.minAm = je;
		}
	}
	
	maxX = this.termW+this.barW*maxIdx;
	minX = this.termW+this.barW*minIdx;
	
	if(maxIdx < 2)
	{
		maxAlign = 'start';
		maxX -= this.termW;
	}
	else if(maxIdx > 7)
	{
		maxAlign = 'end';
		maxX += this.termW;
	}
	
	if(minIdx < 2)
	{
		minAlign = 'start';
		minX -= this.termW;
	}
	else if(minIdx > 7)
	{
		minAlign = 'end';
		minX += this.termW;
	}
	
	this.rate = this.eleH/(this.maxAm-this.minAm);
	var dataLen = this.data.length;
	var xPos = 0;
	var pointsStr = '';
	
	var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
	polyline.setAttribute('style', 'fill:none;stroke:green;stroke-width:1');
	
	for(var i = 0; i<dataLen; i++)
	{
		si = this.data[i][0];
		go = this.data[i][1];
		je = this.data[i][2];
		jo = this.data[i][3];
		avg = this.data[i][4];
		color = this.data[i][5];
		
		xPos = this.termW+this.barW*i;
		
		var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    	newLine.setAttribute('x1', xPos);
    	newLine.setAttribute('y1', this.textH+((this.maxAm-si)*this.rate));
    	newLine.setAttribute('x2', xPos);
    	newLine.setAttribute('y2', this.textH+((this.maxAm-jo)*this.rate));
		newLine.setAttribute('style', 'stroke:'+color+';stroke-width:'+(this.barW-this.empW));
		this.svgTag.append(newLine);
		
		var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    	newLine.setAttribute('x1', xPos);
    	newLine.setAttribute('y1', this.textH+((this.maxAm-go)*this.rate));
    	newLine.setAttribute('x2', xPos);
    	newLine.setAttribute('y2', this.textH+((this.maxAm-je)*this.rate));
		newLine.setAttribute('style', 'stroke:'+color+';stroke-width:1');
		this.svgTag.append(newLine);
		
		pointsStr = xPos+','+(this.textH+(this.maxAm-avg)*this.rate)+' '+ pointsStr;
		
	}
	
	var topText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	
	topText.setAttribute('x', maxX);
    topText.setAttribute('y', this.maxY);
	topText.setAttribute('text-anchor', maxAlign);
	topText.setAttribute("class", "SZ17");
	topText.setAttribute('alignment-baseline', 'middle');
	topText.textContent = afc.addComma(maxPri);
	
	var lowText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	lowText.setAttribute('x', minX);
    lowText.setAttribute('y', this.minY);
	lowText.setAttribute('text-anchor', minAlign);
	lowText.setAttribute("class", "SZ17");
	lowText.setAttribute('alignment-baseline', 'middle');
	lowText.textContent = afc.addComma(minPri);
	
	polyline.setAttribute('points', pointsStr);
	this.svgTag.append(polyline);
	this.svgTag.append(topText);
	this.svgTag.append(lowText);
	
};

SVGBongChart.prototype.setData = function(data)
{
	this.data = data;
	this.setMaxMin();
};


SVGBongChart.prototype.addNewData = function(newData)
{
	this.clearChart();
	
	if(!this.data) return;
	
	this.data[this.data.length-1] = newData;
	this.setMaxMin();
};

SVGBongChart.prototype.setQueryData = function(dataArr, keyArr, queryData)
{
	if(!keyArr) return;
	
	if(queryData.isReal)
	{
		var rowOne = AQueryData.getDataKeyObj(dataArr[0].key);
		if(rowOne[this.keyArr[this.type][0]]<rowOne[this.keyArr[this.type][3]]) color = StockColor.UP_COLOR;
		else color = StockColor.DOWN_COLOR;
		this.addNewData([rowOne[this.keyArr[this.type][0]],rowOne[this.keyArr[this.type][1]],rowOne[this.keyArr[this.type][2]],rowOne[this.keyArr[this.type][3]],rowOne[this.keyArr[this.type][4]], color]);
	}
	else
	{
		var rowOne = null;
		var color = null;
		var data = new Array();
		for(var i = dataArr.length-1; i>-1; i--)
		{
			rowOne = dataArr[i];
			if(rowOne[this.keyArr[this.type][0]]<rowOne[this.keyArr[this.type][3]]) color = StockColor.UP_COLOR;
			else color = StockColor.DOWN_COLOR;
			data.push([rowOne[this.keyArr[this.type][0]],rowOne[this.keyArr[this.type][1]],rowOne[this.keyArr[this.type][2]],rowOne[this.keyArr[this.type][3]],rowOne[this.keyArr[this.type][4]], color]);
		}
	
		this.setData(data);
	}
};