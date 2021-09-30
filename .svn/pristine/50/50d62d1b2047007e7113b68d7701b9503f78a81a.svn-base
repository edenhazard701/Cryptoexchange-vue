BEGIN_FUNCTION_MAP
	.Func,(i0002)체결TICK 조회,i0002,headtype=B;
	BEGIN_DATA_MAP
		i0002In1,입력,input;
		begin
			종목코드       , symbol         , symbol         , char    , 15;
			입력개수       , in_cnt         , in_cnt         , char    ,  5;
		end
		i0002Out1,출력,output;
		begin
			츨력개수       , out_cnt        , out_cnt        , char    ,  5;
		end
		i0002Out2,출력,output,occurs;
		begin
			종목코드       , symbol         , symbol         , char    , 15;
			일자           , date           , date           , char    ,  8;
			체결시간       , exectime       , exectime       , char    , 12;
			체결가         , execprice      , execprice      , char    , 20;
			체결량         , execqty        , execqty        , char  , 20;
			체결종류       , exectype       , exectype       , char    ,  1;
			전일대비구분   , diffdiv        , diffdiv        , char    ,  1;
			전일대비       , diff           , diff           , double  , 20;
			등락률         , updnrate       , updnrate       , double  ,  6;
			체결강도       , execstrth      , execstrth      , double  ,  6;
			매도누적체결량 , sellcumexecqty , sellcumexecqty , double  , 20;
			매수누적체결량 , buycumexecqty  , buycumexecqty  , double  , 20;
			누적거래량     , cumdealqty     , cumdealqty     , double  , 20;
			누적거래대금   , cumdealcost    , cumdealcost    , double  , 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
