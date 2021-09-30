
/**
Constructor
Do not call Function in Constructor.
*/
function SlideChart()
{
	AView.call(this);
	
	
	//나중에 확대축소를 위한 한변의 길이값 디폴트 100
	this.lineSize = 24;

	this.offset = 0;
		
	//스크롤의 속도 조절
	this.scrollSpeed = 2;
	
	this.renderOffset = 0;
	
	this.savedDetailX = 0;
	
	this.isChartFull = false;
	
	this.savedRightOffset = null;
	
	// 그라디언트 값
	this.gradientValue = null;
	// 선 색상 값
	this.colorValue = null;
}
afc.extendsClass(SlideChart, AView);


SlideChart.prototype.init = function(context, evtListener)
{
	AView.prototype.init.call(this, context, evtListener);

	//차트의 좌우 스크롤 및 멀티터치 이벤트받음
// 	this.enableScrlManagerX();
	
	this.setChart();	
};

SlideChart.prototype.setChart = function()
{
	this.chartPos = 
	{
		height: this.getHeight(),       		 		//차트의 높이
		width: this.getWidth(),         				//차트의 넓이
		lineWidth: this.getWidth()*this.lineSize/584,   //차트라인 한개의 폭
		backOneSize: this.getHeight()*66/350,	 		//백그라운드 기준으로 한칸의 높이값
		chartTop: this.getHeight()*36/350,	 	 		//차트 영역의 가장위
		chartBottom: this.getHeight()*300/350,	 		//차트 영역의 가장밑
		dateAreaY: this.getHeight()*300/350,	 		//날짜 영역의 맨위
		dateAreaSize: this.getHeight()*50/350	 		//날짜 영역의 높이
	}
};

SlideChart.prototype.setColor = function(gradient, color) {
	this.gradientValue = gradient;
	this.colorValue = color;
};

SlideChart.prototype.setChartFull = function(isfirst)
{
	this.isChartFull = true;
	
	if(isfirst) this.lineSize = 60;
	//가로모드
	this.chartPos = 
	{
		height: this.getHeight(),       		 		//차트의 높이
		width: this.getWidth(),         				//차트의 넓이
		lineWidth: this.getWidth()*this.lineSize/584,   //차트라인 한개의 폭
		backOneSize: this.getHeight()*66/430,	 		//백그라운드 기준으로 한칸의 높이값
		chartTop: this.getHeight()*36/430,	 	 		//차트 영역의 가장위
		chartBottom: this.getHeight()*300/430,	 		//차트 영역의 가장밑
		chartBarY: this.getHeight()*315/430,	 		//가로모드의 거래량 그래프의 시작지점
		chartBarSize: this.getHeight()*65/430,	 		//가로모드의 거래량 그래프의 크기
		dateAreaY: this.getHeight()*380/430,	 		//날짜 영역의 맨위
		dateAreaSize: this.getHeight()*50/430	 		//날짜 영역의 높이
	}	
	
};

SlideChart.prototype.backgroundRender = function()
{	
	
	this.backTag = $('<svg id="chartSvg" width="'+this.chartPos.width+'" height="'+(this.chartPos.height-1)+'">'+
		'<defs>'+
			'<linearGradient id="Gradient1" x1="0%" y1="0%" x2="0%" y2="100%">'+
				'<stop offset="0.5" style="stop-color:rgb(255,198,197);stop-opacity:0.2"/>'+
				'<stop offset="1" style="stop-color:rgb(255,255,255);stop-opacity:0.2"/>'+
			'</linearGradient>'+
			'<linearGradient id="Gradient2" x1="0%" y1="0%" x2="0%" y2="100%">'+
      			'<stop offset="0.5" style="stop-color:rgb(205,227,247);stop-opacity:0.2"/>'+
      			'<stop offset="1" style="stop-color:rgb(255,255,255);stop-opacity:0.2" />'+
    		'</linearGradient>'+
			'<linearGradient id="Gradient3" x1="0%" y1="0%" x2="0%" y2="100%">'+
            	'<stop offset="0.5" style="stop-color:rgb(0,0,0);stop-opacity:0.2"/>'+
      			'<stop offset="1" style="stop-color:rgb(255,255,255);stop-opacity:0.2" />'+
        	'</linearGradient>'+
		'</defs>'+		
		'</svg>');
	
	this.$ele.append(this.backTag);
	this.svgEle = this.element.getElementsByTagName('svg');
	
	
};

//스와이프에 따른 위치 구하기
SlideChart.prototype.setOffset = function(offset)
{	
	if(!this.chartData) return;
	//차트의 현재 위치값
	var calcOffset = Math.floor(offset/this.scrollSpeed);
	
	//차트의 전체크기
	this.chartSize = this.chartData.length*(-1)*this.chartPos.lineWidth+this.chartPos.width+this.lineSize/3;
						 
	if(calcOffset < 0) 
	{
		if(calcOffset > this.chartSize) 
		{
			this.render(calcOffset);
		}
		else 
		{
			this.offset = this.chartSize * this.scrollSpeed;
		}
	
	}
	else this.offset = 0;
};

//차트 초기화면 그리기
SlideChart.prototype.initChart = function(offset)
{	
	this.clearChartData();
	
	if(!this.chartData) return;
	
	//기본차트태그 생성
	this.createMainTag();
	
	//예측차트태그 생성
	//this.CreatepredictionTag()
	
	//상세보기뷰태그 생성
	this.createDetailView();
	
	//텍스트 영역 생성
	//this.createTextView();
	
	//가로모드의 거래량 영역 생성
	if(this.isChartFull) this.createBarGraph();
		
	
	this.savedRightOffset = null;
	
	if(offset == 'first')
	{
		this.render(0);
		this.selectFirstArea();
	}
	else
	{
		this.render(offset);
	}

};

SlideChart.prototype.selectFirstArea = function()
{
	var dataLength = this.currentPathData.length;
	for(var i=0;i<dataLength;i++)
	{
		if(this.currentPathData[i] && this.currentPathData[i][2])
		{
			if(this.currentPathData[i][2]['AVG_PRC'])
			{
				this.onClickPredictionArea(this.predictionArea[i], this.currentPathData[i]);
				return;
			}
		}
	}
};

SlideChart.prototype.clearChartData = function()
{
	this.$ele.empty();
	this.offset = 0;
	this.backgroundRender();
};

//현재위치값으로 데이터 받아오기
SlideChart.prototype.getOffsetData = function(offset)
{
	this.isFisrtData = false;
	this.rightOffset = Math.floor(Math.abs(offset)/this.chartPos.lineWidth);
	
	//여러번 작업하지 않게 하는 변수
	if(this.savedRightOffset == this.rightOffset) return false;
	
	var cSize = Math.floor(this.chartData.length-(this.chartPos.width/this.chartPos.lineWidth)-1);
	
	if(this.rightOffset > cSize) 
	{
		this.rightOffset = cSize;
	}
	
	this.savedRightOffset = this.rightOffset;
		
	this.leftOffset = this.rightOffset+Math.ceil(this.chartPos.width/this.chartPos.lineWidth)+1;
	
	this.currentPathData = [];
	this.forwardPrediction = null; 
	this.backwardPrediction = null;
	
	this.forwardData = null; 
	this.backwardData = null;
	
	this.forwardDiff = 0;
	this.backwardDiff = 0;
	
	/*afc.log(offset+' / '+this.rightOffset + ' / '+this.leftOffset);
	afc.log('★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★');	*/
	for(var i=this.rightOffset;i<this.leftOffset;i++)
	{
		if(i == 0) 
		{
			this.isFisrtData = true;
		}
		if(this.chartData[i]) this.currentPathData.push(this.chartData[i]);
		
	}
	
	if(this.chartData[this.rightOffset-1]) this.forwardData = this.chartData[this.rightOffset-1][1];
	
	if(this.chartData[this.leftOffset]) this.backwardData = this.chartData[this.leftOffset][1];
	

	
	for(var i=this.rightOffset-1;i>=0;i--)
	{
		this.forwardDiff++;
		if(this.chartData[i] && this.chartData[i][2]) 
		{
			this.forwardPrediction = this.chartData[i][2];
			break;
		}
		else
		{
			
		}
	}
	
	for(var i=this.leftOffset;i<this.chartData.length;i++)
	{
		this.backwardDiff++;
		if(this.chartData[i] && this.chartData[i][2]) 
		{
			this.backwardPrediction = this.chartData[i][2];
			break;
		}
	}
	
	return true;
	
};

//메인차트
SlideChart.prototype.createMainTag = function()
{
	this.polylineElement = null;  		//그래프��� 선
	this.gradElement = null;       		//그래프 선밑의 그라데이션
	this.predictionArea = [];	//예측데이터 터치영역
	
	this.selectedArea = {object:null, data:null};
	
	this.circleElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
	this.circleElement.setAttribute("r","5");
	this.circleElement.style.fill = "#ffffff";
	this.circleElement.setAttribute("visibility","hidden");
	this.svgEle[0].appendChild(this.circleElement);
	
	var chartLength = Math.ceil(this.chartPos.width/this.chartPos.lineWidth)+1;
	
	this.polylineElement = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
	this.polylineElement.setAttribute("points","");
	
	this.polylineElement.style.fill = "none";
	this.polylineElement.style.stroke = (this.colorValue) ? this.colorValue : "#5aa2e6";
	this.polylineElement.style.strokeWidth = "1.2px";
	this.svgEle[0].appendChild(this.polylineElement);
	
	//this.svgEle[0].insertBefore(this.polylineElement,this.predictionElement[i]);
		
	this.gradElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
	this.gradElement.style.fill = (this.gradientValue) ? this.gradientValue : "url(#Gradient1)"; 
	this.svgEle[0].insertBefore(this.gradElement, this.circleElement);
};

//예측차트 생성
SlideChart.prototype.CreatepredictionTag = function()
{
	this.predictionArea = [];	//예측데이터 터치영역
	this.predictionElement = []; //예측데이터 값 다이아몬드(path로 그림)
	this.predictionPath = null; //예측데이터 점선경로
	this.predictionGradation = null; //예측데이터 점선경로의 그라데이션
	
	var predX, predY;
	
	var chartLength = Math.ceil(this.chartPos.width/this.chartPos.lineWidth)+1;
	
	for(var i=0;i<chartLength;i++)
	{
		
		this.predictionElement[i] = document.createElementNS("http://www.w3.org/2000/svg", 'path');
		this.predictionElement[i].style.fill = "#51dcff";
		this.predictionElement[i].setAttribute("visibility","hidden");
		this.svgEle[0].appendChild(this.predictionElement[i]);
		
		this.predictionArea[i] = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
		this.predictionArea[i].setAttribute("id", i);
		this.predictionArea[i].setAttribute("y", this.chartPos.chartTop);
		this.predictionArea[i].setAttribute("width", this.chartPos.lineWidth);
		if(this.isChartFull)
		{
			this.predictionArea[i].setAttribute("height",this.chartPos.dateAreaY-this.chartPos.chartTop);
		}
		else
		{
			this.predictionArea[i].setAttribute("height",this.chartPos.chartBottom-this.chartPos.chartTop);
		}
		this.predictionArea[i].setAttribute("fill","rgba(0, 0, 0, 0)");
		this.svgEle[0].appendChild(this.predictionArea[i]);
	}
	
	this.predictionGradation = document.createElementNS("http://www.w3.org/2000/svg", 'path');
	this.predictionGradation.style.fill = "url(#Gradient3)"; 
	this.svgEle[0].insertBefore(this.predictionGradation, this.circleElement);
	
	this.predictionPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
	//this.predictionPath.setAttribute("d", predictionPathString);
	this.predictionPath.setAttribute("stroke-dasharray", "2.3,2.3");
	this.predictionPath.style.stroke = "#8f88f2";
	this.predictionPath.style.strokeWidth = "2.3px";
	this.predictionPath.style.fill = "rgba(0,0,0,0)";
	this.svgEle[0].insertBefore(this.predictionPath, this.circleElement);
	
	

	
	
};

//상세보기뷰 태그만들고 숨겨놓는다. 위치계산은 따로함
SlideChart.prototype.createDetailView = function()
{
	
	this.detailText = [];
	
	this.detailView = document.createElementNS("http://www.w3.org/2000/svg", 'g');
	this.svgEle[0].appendChild(this.detailView);
	
	this.rectBox = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
	this.rectBox.setAttribute("x","0px");
	this.rectBox.setAttribute("y", this.chartPos.chartTop-10);
	this.rectBox.setAttribute("rx","10px");
	this.rectBox.setAttribute("ry","10px");
	this.rectBox.setAttribute("width","138px");
	this.rectBox.setAttribute("height","115px");
	this.rectBox.setAttribute("style","fill:rgb(38, 49, 65);opacity:0.7");
	this.detailView.appendChild(this.rectBox);
	
	this.detailText[0] = document.createElementNS("http://www.w3.org/2000/svg", 'text');
	this.detailText[0].setAttribute("x","128px");
	this.detailText[0].setAttribute("y",this.chartPos.chartTop+20);
	this.detailText[0].style.fill = "#ffffff";
	this.detailText[0].setAttribute("text-anchor", "end");
	this.detailText[0].textContent = "2020/20/20"
	this.detailView.appendChild(this.detailText[0]);
	
	this.detailText[1] = document.createElementNS("http://www.w3.org/2000/svg", 'text');
	this.detailText[1].setAttribute("x","128px");
	this.detailText[1].setAttribute("y",this.chartPos.chartTop+55);
	this.detailText[1].style.fill = "#ffffff";
	this.detailText[1].setAttribute("text-anchor", "end");
	this.detailText[1].textContent = "10,998"
	this.detailView.appendChild(this.detailText[1]);
	
	this.detailText[2] = document.createElementNS("http://www.w3.org/2000/svg", 'text');
	this.detailText[2].setAttribute("x","128px");
	this.detailText[2].setAttribute("y",this.chartPos.chartTop+90);
	this.detailText[2].style.fill = "red";
	this.detailText[2].setAttribute("text-anchor", "end");
	this.detailText[2].textContent = "6.82%"
	this.detailView.appendChild(this.detailText[2]);
	
	this.detailView.setAttribute("visibility","hidden");  //visible 또는 hidden
};

SlideChart.prototype.createTextView = function()
{
	this.textElement = [];  		//날짜
	var chartLength = Math.ceil(this.chartPos.width/this.chartPos.lineWidth)+1;
	for(var i=0;i<chartLength;i++)
	{
		this.textElement[i] = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		this.textElement[i].style.fill = "#ffffff";
		this.textElement[i].setAttribute("y",this.chartPos.dateAreaY+this.chartPos.dateAreaSize/2);
		this.svgEle[0].appendChild(this.textElement[i]);
		
	}
};


//가로모드에 사용되는 바그래프 영역 생성
SlideChart.prototype.createBarGraph = function()
{
	this.barElement = [];  		//거래량 그래프
	var chartLength = Math.ceil(this.chartPos.width/this.chartPos.lineWidth)+1;
	for(var i=0;i<chartLength;i++)
	{
		this.barElement[i] = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
		this.barElement[i].style.fill = "rgba(255,255,255,0.5)";
		//this.barElement[i].setAttribute("y",this.chartPos.chartBottom+this.chartPos.dateAreaSize/2);
		this.svgEle[0].appendChild(this.barElement[i]);
		
	}

	//텍스트의 위치

	//this.chartPos.chartBarSize
	var text = this.backTag[0].getElementsByTagName('text');

	for(var i=0;i<text.length;i++)
	{
		switch(text[i].getAttribute("id"))
		{
			case "text6":
				text[i].setAttribute("y", this.chartPos.chartBarY+(this.chartPos.chartBarSize/10));
				break;
			case "text7":
				text[i].setAttribute("y", this.chartPos.chartBarY+(4.5*this.chartPos.chartBarSize/10));
				break;
			case "text8":
				text[i].setAttribute("y", this.chartPos.chartBarY+(8*this.chartPos.chartBarSize/10));
				break; 
			case "text9":
				this.grText = text[i];
				text[i].setAttribute("x", this.chartPos.width);
				text[i].setAttribute("y", this.chartPos.chartBarY+10);
				text[i].setAttribute("text-anchor", "end");
				text[i].setAttribute("font-size", "20px");
				text[i].style.fill  = "#ffffff";
				break; 
		}
	}
};

//차트를 그리는 함수
SlideChart.prototype.render = function(offset)
{	
	this.renderOffset = offset;
	var isChangeData = this.getOffsetData(this.renderOffset);
	var moveX = Math.abs(offset%this.chartPos.lineWidth);
	
	var predX,	predY;
	var thisObj = this;
	
	var existData;
	var existDataOffset;
	
	if(isChangeData) this.checkMaxMin(this.currentPathData);
	var settingY = function(data)
	{
		if(data == thisObj.nowMax || thisObj.nowMax == thisObj.nowMin) {
			return 50;
		}
		else {
			if(thisObj.nowMax < 0 || thisObj.nowMin < 0) {
				thisObj.nowMax = thisObj.nowMax * 1000;
			};
			return (thisObj.nowMax-data)/(thisObj.nowMax - thisObj.nowMin)*(thisObj.chartPos.chartBottom-thisObj.chartPos.chartTop) + thisObj.chartPos.backOneSize/2;
		};
	};
	
	var getDateFormat = function(str)
	{	
		if(str.length == 6)
		{
			var resStr = str + "";
			return resStr.substring(0, 4)+'/'+resStr.substring(4, 6);
		}
		var resStr = str + "";
		return resStr.substring(4, 6)+'/'+resStr.substring(6, 8);
	};
	
	var cPathDataLength = this.currentPathData.length;
	for(var i=0;i<cPathDataLength;i++)
	{
		if(this.currentPathData[i][1])
		{
			existData = this.currentPathData[i][1];
			existDataOffset = i;
			break;
		}
	}
	
	if(this.isFisrtData)
	{
		this.savedCircleOffset = existDataOffset;
// 		this.circleElement.setAttribute("visibility","visible");
	}
	else
	{
		//this.circleElement.setAttribute("visibility","hidden");
	}
		
		this.circleElement.setAttribute("cx",this.chartPos.width - this.chartPos.lineWidth/2 - (this.chartPos.lineWidth*this.savedCircleOffset)- offset);
		this.circleElement.setAttribute("cy",settingY(existData));
	
	
	//차트밑의 그라데이션 속성
	if(this.forwardData)
	{
		var gradElementString = "M"+(this.chartPos.width - this.chartPos.lineWidth/2 - ((-1)*this.chartPos.lineWidth)+ moveX)+" "+settingY(this.forwardData);
		gradElementString += " L"+(this.chartPos.width - this.chartPos.lineWidth/2 + moveX)+" "+settingY(existData);
	}
	else
	{
		var gradElementString = "M"+(this.chartPos.width - this.chartPos.lineWidth/2 - (this.chartPos.lineWidth*existDataOffset) + moveX)+" "+settingY(existData);
	}
	
	
	//예측데이터 라인과 그라데이션 속성
	//var predictionPathString = "M";
	//var predictionPathFisrt = null;
	//var predictionPathLast = null;
	
	var polyLineString = "";
	
	/*if(this.forwardPrediction)
	{
		var temp1 = (this.chartPos.width - this.chartPos.lineWidth/2-(((-1)*this.forwardDiff)*this.chartPos.lineWidth)+moveX);
		predictionPathString = "M"+temp1+" "+(settingY(this.forwardPrediction.AVG_PRC));
		predictionPathFisrt = temp1;
	}*/
	
	//차트의 안보이는곳의 점으로 연결
	if(this.forwardData)
	{
		polyLineString += " "+(this.chartPos.width - this.chartPos.lineWidth/2-((-1)*this.chartPos.lineWidth)+moveX)+" "+settingY(this.forwardData);			
	}
	
	for(var i=0;i<cPathDataLength;i++)
	{
		if(this.currentPathData[i])
		{
			//예측차트부분 컨트롤하는 if함수
			/*if(this.currentPathData[i][2])
			{
				//◆모양 그리기 rect 기준 x predX-6 y predY-6  width 12 height 12 rotate 45	
				predX = this.chartPos.width - this.chartPos.lineWidth/2-(i*this.chartPos.lineWidth)+moveX;
				predY = settingY(this.currentPathData[i][2].AVG_PRC);
				this.predictionElement[i].setAttribute("d","M"+(predX)+" "+(predY+6)+" L"+(predX-6)+" "+(predY)+" L"+(predX)+" "+(predY-6)+" L"+(predX+6)+" "+(predY)+" Z");
				this.predictionElement[i].setAttribute("visibility","visible");
				
				if(this.selectedArea.object)
				{
					if(this.currentPathData[i][0] == this.selectedArea.data)
					{
						this.predictionArea[i].setAttribute('fill', 'rgba(55,60,57,0.2)');
					}
					else	
					{
						this.predictionArea[i].setAttribute('fill', 'rgba(0,0,0,0)');
					}
				}
				
				this.predictionArea[i].setAttribute("visibility","visible");
				this.predictionArea[i].setAttribute("id", i);
				this.predictionArea[i].setAttribute("x", (this.chartPos.width - this.chartPos.lineWidth) - (i*this.chartPos.lineWidth) + moveX);
				this.predictionArea[i].onclick = function(e)
				{	
					thisObj.onClickPredictionArea(e.target, thisObj.currentPathData[this.getAttribute("id")]);
				}
		
				if(predictionPathString == "M") 
				{
					predictionPathFisrt = predX;
				}
				else predictionPathString +=  " L";
				predictionPathString += predX+" "+predY;
				predictionPathLast = predX;
			}
			else
			{
				this.predictionElement[i].setAttribute("visibility","hidden");
				this.predictionArea[i].setAttribute("visibility","hidden");
			}*/
			
			if(this.currentPathData[i][1]) polyLineString += " "+(this.chartPos.width - this.chartPos.lineWidth/2-(i*this.chartPos.lineWidth)+moveX)+" "+settingY(this.currentPathData[i][1]);
			if(this.currentPathData[i][1]) gradElementString += " L"+(this.chartPos.width - this.chartPos.lineWidth/2-((i)*this.chartPos.lineWidth)+moveX)+" "+settingY(this.currentPathData[i][1]);
			
			//텍스트
			//this.textElement[i].setAttribute("x",((this.chartPos.width - this.chartPos.lineWidth/2) - 20 - (i*this.chartPos.lineWidth) + moveX));
			//this.textElement[i].textContent = getDateFormat(this.currentPathData[i][0]);
			
			if(this.isChartFull)
			{
				this.barElement[i].setAttribute("x", (this.chartPos.width - this.chartPos.lineWidth) - (i*this.chartPos.lineWidth) + moveX + 1);
				this.barElement[i].setAttribute("y", (this.chartPos.chartBarY + this.chartPos.chartBarSize) - parseInt(this.currentPathData[i][3])/this.maxBar * this.chartPos.chartBarSize);
				this.barElement[i].setAttribute("width", this.chartPos.lineWidth-2);
				this.barElement[i].setAttribute("height", parseInt(this.currentPathData[i][3])/this.maxBar * this.chartPos.chartBarSize);
			}
			
			if(this.currentPathData[i+1])
			{
			
			}
			else
			{
				if(this.backwardData)
				{
					polyLineString += " "+(this.chartPos.width - this.chartPos.lineWidth/2-((i+1)*this.chartPos.lineWidth)+moveX)+" "+settingY(this.backwardData);
					gradElementString += " L"+(this.chartPos.width - this.chartPos.lineWidth/2-((i+1)*this.chartPos.lineWidth)+moveX)+" "+settingY(this.backwardData);
				}
			}
			
		}
	}
	
	
	
	/*if(this.backwardPrediction)
	{
		var temp2 = (this.chartPos.width - this.chartPos.lineWidth/2-((cPathDataLength+this.backwardDiff)*this.chartPos.lineWidth)+moveX);
		predictionPathString += "L"+temp2+" "+(settingY(this.backwardPrediction.AVG_PRC));
		predictionPathLast = temp2;
	}*/
	if(this.forwardData) var GradTempStr = this.chartPos.lineWidth/2-((1)*this.chartPos.lineWidth);
	else var GradTempStr = this.chartPos.lineWidth/2;
	
	if(this.backwardData) var GradTempStr2 = (this.chartPos.width - this.chartPos.lineWidth/2 + moveX-((cPathDataLength)*this.chartPos.lineWidth));
	else var GradTempStr2 = (this.chartPos.width - this.chartPos.lineWidth/2 + moveX-((cPathDataLength-1)*this.chartPos.lineWidth));
	this.gradElement.setAttribute("d", gradElementString+" L"+GradTempStr2+" "+this.chartPos.chartBottom+" L"+(this.chartPos.width - GradTempStr - (this.chartPos.lineWidth*existDataOffset) + moveX)+" "+this.chartPos.chartBottom);
	/*if(predictionPathFisrt != null && predictionPathString != "M" && predictionPathLast !=null)
	{
		this.predictionGradation.setAttribute("d", predictionPathString+" L"+predictionPathLast+" "+this.chartPos.chartBottom+" L"+predictionPathFisrt+" "+this.chartPos.chartBottom);
		this.predictionPath.setAttribute("d", predictionPathString);
	}*/
	
	
	this.polylineElement.setAttribute("points", polyLineString);
	
	
	if(this.selectedArea.object)
	{
		this.setDetailViewPosition();
	}
		
};

//차트를 클릭했을때 리스너
SlideChart.prototype.onClickPredictionArea = function(target, data)
{
	this.savedOffset = this.renderOffset;
	if(this.selectedArea.object == target)
	{
		/*target.setAttribute('fill', 'rgba(0,0,0,0)');
		this.selectedArea.object = null;
		this.selectedArea.data = null;
		this.detailView.setAttribute("visibility","hidden");*/
	}
	else
	{
		
		if(this.selectedArea.object) this.selectedArea.object.setAttribute('fill', 'rgba(0,0,0,0)');
		target.setAttribute('fill', 'rgba(55,60,57,0.2)');
		
		this.selectedArea.object = target;
		this.selectedArea.data = data[0];
		
		this.savedDetailX = parseInt(this.selectedArea.object.getAttribute("x"));
		
		if(data[1] != null)
		{
			this.setDetailViewPosition();
			this.setDetailViewText(data);
			this.detailView.setAttribute("visibility","visible");	
		}
		
		var cnt = this.getContainer().getView();
		if(cnt.callbackChartData) cnt.callbackChartData(data);
		if(cnt.tabView && cnt.tabView.getSelectedView().setPieChart) cnt.tabView.getSelectedView().setPieChart(data);
		
		if(this.isChartFull)
		{
			if(data[3]) this.grText.textContent = '거래량: '+data[3];
			else this.grText.textContent = '거래량: 0';
		}
				
	}
	
};

//상세보기뷰 위치 계산
SlideChart.prototype.setDetailViewPosition = function()
{
	var offset = this.savedDetailX - this.renderOffset + this.savedOffset;
	
	if(offset+this.chartPos.lineWidth/2 > this.chartPos.width/2)
	{
		var result = offset-(1.2*this.chartPos.lineWidth);
	}
	else
	{
		var result = offset+(0.8*this.chartPos.lineWidth);
	}
	
	this.rectBox.setAttribute("x",result);
	
	for(var i in this.detailText)
	{
		this.detailText[i].setAttribute("x",result+128);
	}
	
};

//상세보기뷰 setText
SlideChart.prototype.setDetailViewText = function(data)
{
	this.detailText[0].textContent = data[0];
	this.detailText[1].textContent = afc.addComma(data[1]);
	
	var daebi = afc.toFixed2(data[2]['AVG_PRC']/data[1]*100 - 100);
	
	if(daebi == 0)
	{
		this.detailText[2].style.fill = "#ffffff";
	}
	else if(daebi > 0)
	{
		this.detailText[2].style.fill = "#ff5353";
	}
	else if(daebi < 0)
	{
		this.detailText[2].style.fill = "#418dff";
		daebi = daebi * (-1);
	}
	
	this.detailText[2].textContent = daebi+"%";
};


SlideChart.prototype.checkMaxMin = function(data)
{
	var dataLength = data.length;
	for(var i=0;i<dataLength;i++)
	{
		if(data[i][1])
		{
			this.nowMax = data[i][1];
			this.nowMin = data[i][1];
			break;
		}
	}
	
	if(this.isChartFull)
	{
		for(var i=0;i<dataLength;i++)
		{
			if(data[i][3])
			{
				this.maxBar = data[i][3];
				this.minBar = data[i][3];
				break;
			}
		}
	}
	
	for(var i in data)
	{
		if(data[i])
		{
			if(data[i][1] && data[i][1] > this.nowMax) this.nowMax = data[i][1];
			if(data[i][1] && data[i][1] < this.nowMin) this.nowMin = data[i][1];
			if(data[i][2] && data[i][2].AVG_PRC)
			{
				if(parseInt(data[i][2].AVG_PRC) > this.nowMax) this.nowMax = parseInt(data[i][2].AVG_PRC);
				if(parseInt(data[i][2].AVG_PRC) < this.nowMin) this.nowMin = parseInt(data[i][2].AVG_PRC);
			}

			if(this.isChartFull)
			{
				if(data[i][3])
				{
					if(data[i][3] > this.maxBar) this.maxBar = data[i][3];
					if(data[i][3] < this.minBar) this.minBar = data[i][3];
				}
			}
		}
	}
	
	
	if(this.forwardPrediction && this.forwardPrediction.AVG_PRC)
	{
		if(parseInt(this.forwardPrediction.AVG_PRC) > this.nowMax) this.nowMax = parseInt(this.forwardPrediction.AVG_PRC);
		if(parseInt(this.forwardPrediction.AVG_PRC) < this.nowMin) this.nowMin = parseInt(this.forwardPrediction.AVG_PRC);
	}
	if(this.backwardPrediction && this.backwardPrediction.AVG_PRC)
	{
		if(parseInt(this.backwardPrediction.AVG_PRC) > this.nowMax) this.nowMax = parseInt(this.backwardPrediction.AVG_PRC);
		if(parseInt(this.backwardPrediction.AVG_PRC) < this.nowMin) this.nowMin = parseInt(this.backwardPrediction.AVG_PRC);
	}
	if(this.forwardData)
	{
		if(this.forwardData > this.nowMax) this.nowMax = this.forwardData;
		if(this.forwardData < this.nowMin) this.nowMin = this.forwardData;
	}
	if(this.backwardData)
	{	
		if(this.backwardData > this.nowMax) this.nowMax = this.backwardData;
		if(this.backwardData < this.nowMin) this.nowMin = this.backwardData;
	}
	
	
	this.nowMax = Math.round(this.nowMax*100)/100;
	this.nowMin = Math.round(this.nowMin*100)/100;
	
	var gap = (this.nowMax-this.nowMin)/4;
	this.setBackYLabel(this.nowMax, Math.round(gap*10)/10);

	if(this.isChartFull)
	{	
		var Fgap = (this.maxBar-this.minBar)/2;
		this.setFullScreenLabel(this.maxBar,  Math.round(Fgap*10)/10);
	}

};

SlideChart.prototype.setBackYLabel = function(Max, gap)
{
	var text = this.backTag[0].getElementsByTagName('text');
	var textLength = text.length;
	for(var i=0;i<textLength;i++)
	{
		switch(text[i].getAttribute("id"))
		{
			case "text1":
				text[i].textContent = afc.addComma(afc.floor2(Max));
				break;
			case "text2":
				text[i].textContent = afc.addComma(afc.floor2(Max-gap*1));
				break;
			case "text3":
				text[i].textContent = afc.addComma(afc.floor2(Max-gap*2));
				break; 
			case "text4":
				text[i].textContent = afc.addComma(afc.floor2(Max-gap*3));
				break;
			case "text5":
				text[i].textContent = afc.addComma(afc.floor2(Max-gap*4));
				break;
		}
	}
};

SlideChart.prototype.setFullScreenLabel = function(Max, gap)
{
	var text = this.backTag[0].getElementsByTagName('text');
	var textLength = text.length;
	for(var i=0;i<textLength;i++)
	{
		switch(text[i].getAttribute("id"))
		{
			case "text6":
				text[i].textContent = afc.addComma(Math.floor(Max));
				break;
			case "text7":
				text[i].textContent = afc.addComma(Math.floor(Max-gap*1));
				break;
			case "text8":
				text[i].textContent = afc.addComma(Math.floor(Max-gap*2));
				break; 
		}
	}
};

SlideChart.prototype.sumArrayData = function(qryName, socketData, ajaxData, isMonth)
{
	this.isMonth = isMonth;
	var resultData = socketData;
	var startDate;
	var tempArr = [];
	var isPush = false;
	//주식영업일자
	
	if(resultData.length == 0) return;
		
	startDate = resultData[0]['주식영업일자'];
	
	for(var i in ajaxData)
	{
		if(isMonth)
		{
			ajaxData[i]['PRED_DATE'] = ajaxData[i]['PRED_DATE'].substring(0, 6); 
		}
		
		if(parseInt(startDate) < parseInt(ajaxData[i]['PRED_DATE']))
		{
			if(ajaxData[i]['AVG_PRC'] > 0) 
			{	
				tempArr.push({'주식영업일자': ajaxData[i]['PRED_DATE'], '예측데이터': ajaxData[i]});
			}
		}
		else
		{
			if(!isPush)
			{
				isPush = true;
				if(tempArr.length > 0) 
				{
					tempArr.reverse();
					for(var i=0;i<tempArr.length;i++)
					{
						resultData.unshift(tempArr[i]);
					}
				}
			}
			for(var j in resultData)
			{
				if(resultData[j]['주식영업일자'] == ajaxData[i]['PRED_DATE']) 
				{
					if(ajaxData[i]['AVG_PRC'] > 0) resultData[j]['예측데이터'] = ajaxData[i];
				}
			}
		}
	}

	if(resultData.length > 0) this.setData(qryName, resultData);
};

SlideChart.prototype.setData = function(qryName, data)
{	
	this.setQuertyData(qryName, data);
	
	if(!this.chartData) return;
	this.initChart('first');
};

SlideChart.prototype.setQuertyData = function(qryName, data)
{
	/*if(qryName == 'dummy')
	{
		this.chartData = data;
	}*/
	
	var date, nowPrice, preData, amount;
	
	/*if(qryName == 'svc01_cht_0001r')
	{*/
		this.chartData = [];
		var dataLength = data.length;
		for(var i=0;i<dataLength;i++)
		{
			date = data[i][0];
			data[i][1] ? nowPrice = parseFloat(data[i][1]) : nowPrice = null;
			data[i][2] ? preData = data[i][2] : preData = null;
			data[i][3] ? amount = parseInt(data[i][3]) : amount = null;;
			this.chartData.push([ date,nowPrice,preData,amount]);
		}
		
	//}
// 	console.log(this.chartData);
};

SlideChart.prototype.enableScrlManagerX = function()
{
	if(this.scrlManagerX) return;
	
	this.scrlManagerX = new ScrollManager();
	this.scrlManagerX.setOption(
	{
		startDelay: 100,
		endDelay: 20,
		scrollAmount: 1,
		speedRatio: 0.3
	});
	
	this.$ele.css({'overflow':'auto', '-webkit-overflow-scrolling': ''});
	
	this.$ele.css('overflow-y', 'hidden');
	
	this.scrollXImplement();
	//this.aevent._scroll();
};

SlideChart.prototype.setMultiPoint = function(touch1, touch2)
{
	
};

SlideChart.prototype.multiTouchMoveEvent = function(touch1, touch2)
{
	//시작지점: this.multiStart
	//차이: this.preMultiDiff
	
	//this.chartSize 차트의 총싸이즈
	//this.offset 현재 위치
	var preChartSize = this.chartData.length*(-1)*this.chartPos.lineWidth+this.chartPos.width+this.lineSize/3;
	
	var nowDiff = Math.abs(touch1 - touch2);
	
	if(nowDiff > this.preMultiDiff)
	{
		this.lineSize = this.lineSize+(nowDiff-this.preMultiDiff);
	}
	else if(nowDiff < this.preMultiDiff)
	{
		this.lineSize = this.lineSize-(this.preMultiDiff-nowDiff);
	}
	
	if(this.lineSize < 50) this.lineSize = 50;
	if(this.lineSize > 150) this.lineSize = 150;
	
	this.chartPos.lineWidth = this.getWidth()*this.lineSize/584;
	
	var afterChartSize = this.chartData.length*(-1)*this.chartPos.lineWidth+this.chartPos.width+this.lineSize/3;
	
	this.offset = this.offset*afterChartSize/preChartSize;
	
	if(this.offset < afterChartSize) 
	{
		//afc.log(this.offset+'/'+afterChartSize);
	}
	else this.offset = preChartSize;
		
	this.initChart(this.offset);
	this.preMultiDiff = nowDiff;		
	
		
};


SlideChart.prototype.scrollXImplement = function()
{	
	//PC인 경우 자신의 영역 mousedown 과 상관없이 mousemove 가 무조건 발생한다.
	var thisObj = this, isDown = false, scrlArea = this.element;
	this.multiStart; //중간지점
	this.preMultiDiff; //시작차이
	this.bindEvent(AEvent.ACTION_DOWN, function(e)
	{
		isDown = true;
		
		e.preventDefault();
		
		touch1 = e.targetTouches[0];
        touch2 = e.targetTouches[1];
		
		if(touch2)
		{
			thisObj.multiStart = (touch1.pageX+touch2.pageX)/2;
			thisObj.preMultiDiff = Math.abs(touch1.pageX-touch2.pageX);
		}
		else
		{
			thisObj.scrlManagerX.initScroll(e.changedTouches[0].clientX);
		}
	});
	
	this.bindEvent(AEvent.ACTION_MOVE, function(e)
	{
		if(!isDown) return;
		
		e.preventDefault();
		e.stopPropagation();
		touch1 = e.targetTouches[0];
        touch2 = e.targetTouches[1];
		if(touch2)
		{
			//afc.log('tch2');
			thisObj.multiTouchMoveEvent(touch1.pageX, touch2.pageX);
		}
		else
		{
			//afc.log('else');	
			thisObj.scrlManagerX.updateScroll(e.changedTouches[0].clientX, function(move)
			{
				//afc.log('updateScroll');
				
				//이벤트의 move만큼 차트를 이동시킴
				thisObj.offset = thisObj.offset + move;
				thisObj.setOffset(thisObj.offset);
			});
		}
	});
	
	this.bindEvent(AEvent.ACTION_UP, function(e)
	{
		if(!isDown) return;
		isDown = false;

		e.preventDefault();
		e.stopPropagation();
		
		touch1 = e.targetTouches[0];
        touch2 = e.targetTouches[1];
		if(touch2)
		{
				
		}
		else
		{
			thisObj.scrlManagerX.scrollCheck(e.changedTouches[0].clientX, function(move)
			{
				//afc.log('scrollCheck');
				thisObj.offset = thisObj.offset + move;
				thisObj.setOffset(thisObj.offset);
				
				//scrollManager가 true일때 터치업을 계속 발생시킴
				return true;
			});
		}
	});
};