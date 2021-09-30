BEGIN_FUNCTION_MAP
	.Func,(i0026)관심종목 기본화면 조회,i0026,headtype=B;
	BEGIN_DATA_MAP
		i0026In1,입력,input;
		begin
			종목건수     , symbolcnt   , symbolcnt   , long   ,  5;
			결제통화코드 , paycurrcode , paycurrcode , char   ,  5;
			거래소코드   , excode      , excode      , char   ,  3;
		end
		i0026In2,입력,input,occurs;
		begin
			종목코드     , symbol      , symbol      , char   , 15;
		end
		i0026Out1,출력,output;
		begin
			출력개수     , out_cnt     , out_cnt     , char   ,  5;
		end
		i0026Out2,출력,output,occurs;
		begin
			종목코드     , symbol      , symbol      , char   , 15;
			거래소명     , exkorname   , exkorname   , char   , 50;
			결제통화코드 , paycurrcode , paycurrcode , char   ,  5;
			현재가       , curprc      , curprc      , double , 20;
			등락폭       , diff        , diff        , double , 20;
			등락률       , updnrate    , updnrate    , double ,  6;
			거래량       , cumdealqty  , cumdealqty  , double , 20;
			시가         , openprc     , openprc     , double , 20;
			고가         , highprc     , highprc     , double , 20;
			저가         , lowprc      , lowprc      , double , 20;
			USD환산      , usdchg      , usdchg      , double , 20;
			KRW환산      , krwchg      , krwchg      , double , 20;
			거래대금     , cumdealcost , cumdealcost , double , 20;
			상장일자시간 , listdatetime, listdatetime, char   , 14;
		end
	END_DATA_MAP
END_FUNCTION_MAP
