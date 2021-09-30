/**
 * @author asoocool
 */

import AQuery from './AQuery.js'

//-----------------------------------------------------------------------------------------
//	class AQueryData
//-----------------------------------------------------------------------------------------

export default class {
	constructor(aquery) {
		this.aquery = aquery;
		this.queryObj = null;
		
		this.flagObj =  {
			//zipFlag: '0',		// 압축 구분 코드 -> 압축X:0 압축:1
			//encFlag: '0'		// 암호화 구분 코드 -> 평문:0 암호화:1
		};
		
		//연속 구분값
		this.contiKey = null;
		
		this.headerInfo = {
			/*
			biz_sys_tcd: null,
			biz_sys_seq: null,
			scrn_oprt_tcd: null,
			ac_pwd_skip_yn: null,
			media: null,
			scm_tcd: null			// 스키마구분코드 -> AP서버에서 2개 이상의 DB스키마로 선택 접속해야 할 경우 사용 "4": RK "5": 과기공 (20170717 신규)
			*/
		};
		
		//수신된 queryData 가 리얼인지 조회인지 여부
		this.isReal = false;
	}

	setHeaderInfo(headerInfo) {
		for(var p in headerInfo)
		{
			if(!headerInfo.hasOwnProperty(p)) continue;
			
			this.headerInfo[p] = headerInfo[p];
		}
	}

	getQueryName() {
		if(!this.aquery) return null;
		else return this.aquery.getName();
	}

	setQuery(aquery) {
		this.aquery = aquery;
	}

	getQuery() {
		return this.aquery;
	}

	//비동기 처리 후 updateComponent 호출을 위한, lazy call 플래그
	//afterOutBlockData 함수에서 enableLazyUpdate 함수를 호출하면 화면 업데이트를 비동기 함수 호출후에 할 수 있다.
	//차후 비동기 함수 콜백에서 queryData.lazyUpdate(); 함수를 호출해 준다.
	enableLazyUpdate() {
		//동적으로 변수 생성
		this.isLazyUpdate = true;
	}

	getFlag(flagName) {
		if(flagName==undefined) return this.flagObj;
		else return this.flagObj[flagName];
	}

	setFlag(flagName, value) {
		this.flagObj[flagName] = value;
	}

	getContiKey() {
		return this.contiKey;
	}

	setContiKey(contiKey) {
		this.contiKey = contiKey;
	}

	outBlockOccurs(block, prevData) {
		console.log("aquerydata outBlockOccurs");
		return 1;
	}

	inBlockOccurs(block) {
		return 1;
	}

	//OutBlock Buffer to QueryData
	outBlockData(abuf, offset) {
		if(!this.queryObj) this.queryObj = {}
		
		if(offset!=undefined) abuf.setOffset(offset);
		
		var blockData, count, i, j, fmtLen, obj = null, fmt, thisObj = this, exp, tmp, cntBlock;
		var types = ['output'];	// inblock 영역은 수신받지 않기 때문에 outblock 부분만 처리	

		for(var h=0; h<types.length; h++)
		{
			this.aquery.eachQueryBlock(types[h], function(name, block)
			{
				blockData = thisObj.queryObj[name] = [];
				
				count = thisObj.outBlockOccurs(block, obj);

				fmtLen = block.format.length;

				for(i=0; i<count; i++)
				{
					obj = new Object();

					for(j=0; j<fmtLen; j++)
					{
						//[로그인구분,D1로그인구분,0,LoginTp,STRING,1,0]
						fmt = block.format[j];

						if(fmt[AQuery.ITYPE]==AQuery.STRING)
						{
							obj[fmt[AQuery.IKEY]] = abuf.nextString(fmt[AQuery.ISIZE]);
						}
						else 
						{
							exp = fmt[AQuery.IEXP];
							
							if(exp>0) 
							{
								obj[fmt[AQuery.IKEY]] = abuf.nextParseFloat(fmt[AQuery.ISIZE]).toFixed(exp);
							}
							else 
							{
								obj[fmt[AQuery.IKEY]] = abuf.nextParseFloat(fmt[AQuery.ISIZE]);
							}

							//console.log(fmt[AQuery.IKEY], fmt[AQuery.ISIZE], obj[fmt[AQuery.IKEY]]);
						}
					}

					blockData.push(obj);
				}
			});
		}
	}

	inBlockPrepare() {
		this.queryObj = {}
		
		var blockData, count, i, j, fmtLen, obj, fmt, thisObj = this;
		this.aquery.eachQueryBlock('input', function(name, inblock)
		{
			blockData = thisObj.queryObj[name] = [];

			count = thisObj.inBlockOccurs(inblock);
			
			fmtLen = inblock.format.length;

			for(i=0; i<count; i++)
			{
				obj = new Object();
				
				for(j=0; j<fmtLen; j++)
				{
					//[현재가,D1현재가,15001,,ULONG,4,-2]
					//D1현재가 == AQuery.IKEY
					fmt = inblock.format[j];
					obj[fmt[AQuery.IKEY]] = fmt[AQuery.IVALUE];
				}
				
				blockData.push(obj);
			}
		});
	}


	//QueryData to InBlock Buffer
	inBlockBuffer(abuf, offset) {
		var blockData, i, j, fmtLen, fmt, value, thisObj = this, exp, type, fldKey, fldSize;

		abuf.fillBuffer(0x00, offset);
		abuf.setOffset(offset);
		
		this.aquery.eachQueryBlock('input', function(name, block)
		{
			//[ { MENU_CHCK_CODE: '1500', USER_ID: 'z0622' }, ... ]
			blockData = thisObj.queryObj[name];

			fmtLen = block.format.length;

			for(i=0; i<blockData.length; i++)
			{
				//{ MENU_CHCK_CODE: '1500', USER_ID: 'z0622' }
				var obj = blockData[i];

				for(j=0; j<fmtLen; j++)
				{
					//[로그인구분,D1로그인구분,0,LoginTp,STRING,1,0]
					fmt = block.format[j];

					fldKey = fmt[AQuery.IKEY];
					fldSize = fmt[AQuery.ISIZE];

					value = obj[fldKey];
					type = fmt[AQuery.ITYPE];

					if(type==AQuery.STRING) abuf.addString(fldSize, value);
					else if(type==AQuery.BINARY) abuf.addBinary(fldSize, value);
					else 
					{
						exp = fmt[AQuery.IEXP];

						if(exp>0) abuf.addNumString(fldSize, parseFloat(value).toFixed(exp));
						else abuf.addNumString(fldSize, value);
					}
					
				}
			}
		});
	}

	getQueryObj() {
		return this.queryObj;
	}

	setQueryObj(queryObj) {
		this.queryObj = queryObj;
	}

	getBlockData(blockName) {
		return this.queryObj[blockName];
	}

	searchBlockData(blockName) {
		var resultObj = new Object();
		
		if(!blockName) blockName = 'Block';
		
		for(var key in this.queryObj)
		{
			if(key.indexOf(blockName) > -1)
				resultObj[key] = this.queryObj[key];
		}
		return resultObj;
	}
}
