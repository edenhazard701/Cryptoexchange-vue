
/**
Constructor
Do not call Function in Constructor.
*/
function StockGrid()
{
	AGrid.call(this);

	this.colorArr = [];
	this.colorArg = [];
	
}
afc.extendsClass(StockGrid, AGrid);

/*
A : 매핑된 값
B : setColorInfo에서 넣은 key에 맞는 값
					0: 색,X						1: A,0 비교색					2: A,B 비교색				3: A 상태값 색				 	4: A 상태 삼각형 및 색
					5: B,0 비교색	 			  6: A,0 비교 배경색상			7: A,0 비교 삼각형+색상	 8: A,0-상승 1-하락 색상			9: 상승색
					10: 하락색					  11: B 매수-상승 매도-하락 색상    12: 배경라벨125			13:B 등락구분에 맞는 삼각형+색상   14: A,B 비교색(어두운배경) 
					15: B 등락구분에 맞는 예,외*/
StockGrid.COLOR = [	stk.getAsMaskedIt, 			stk.getColorTagCfZero,		stk.getColorTagCfValue,		stk.getColorTagCfState,			stk.getStockTriangle,
					stk.getColorTagValueCfZero, stk.getBgColorTagCfZero,	stk.getTriAndColorTag,		stk.getColorTagCfOrderType,		stk.getUpColorTag,
					stk.getDownColorTag,		stk.getColorTagCfOrderText, stk.getBgColorTagCfZero125,	stk.getTriAndColorTagByState,	stk.getColorTagCfValue_D,
					stk.getPrdtOvtmTextByState];

StockGrid.prototype.init = function(context, evtListener)
{
	AGrid.prototype.init.call(this, context, evtListener);
	
	 this.loadColorInfo();
};

StockGrid.prototype.loadColorInfo = function()
{
	var colorInfo = [];
	for(var i=0; i<this.$rowTmpl.length; i++)
	{
		for(var j=0; j<this.columnCount; j++)
		{
			if( $(this.getCell(i, j)).attr('data-span') ) continue;
			colorInfo.push(0);
		}
	}
	
	this.setColorInfo(colorInfo);
	//var colorInfo = this.getAttr(afc.ATTR_COLOR);
	//if(colorInfo) this.setColorInfo(colorInfo.split(','));
};

StockGrid.prototype.setColorInfo = function(arr, noOverride)
{
	if(!noOverride) this.setCellText = this.setCellTag;
	
	var temp;
	for(var i=0; i<arr.length; i++)
	{
		if(typeof(arr[i]) == 'function')
		{
			this.colorArr[i] = arr[i];
			this.colorArg[i] = [];
		}
		else
		{
			temp = arr[i].toString().split('|');

			if(temp[0]!='')
			{
				if(StockGrid.COLOR[temp[0]]) this.colorArr[i] = StockGrid.COLOR[temp[0]];
				else this.colorArr[i] = eval(temp[0]);
			}
			else this.colorArr[i] = stk.getAsMaskedIt;

			temp.shift();
			this.colorArg[i] = temp;
		}
	}
};

StockGrid.prototype.resetColorInfo = function()
{
	this.colorArr = [];
	this.colorArg = [];
	
	//this.changeSetQueryData();
};

StockGrid.prototype.getMaskValue = function(index, data, keyVal, ele)
{
	if(this.colorArg[index].length>1) return this.colorArr[index]( data, this.colorArg[index], ele );
	else return this.colorArr[index]( data[keyVal], this.maskArr[index], data[this.colorArg[index][0]], ele );
};
