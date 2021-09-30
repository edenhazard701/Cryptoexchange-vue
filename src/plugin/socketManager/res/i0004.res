BEGIN_FUNCTION_MAP
	.Func,(i0004)차트조회,i0004,headtype=B;
	BEGIN_DATA_MAP
		i0004In1,입력,input;
		begin
			종목코드       , symbol         , symbol         , char   , 15;
			주기단위       , cycunit        , cycunit        , char   ,  1;
			조회건수       , qrycnt         , qrycnt         , char   ,  5;
			주기           , cyc            , cyc            , char   ,  3;
			실봉구분       , availflag      , availflag      , char   ,  1;
			시작일자       , sdate          , sdate          , char   ,  8;
			종료일자       , edate          , edate          , char   ,  8;
		end
		i0004Out1,출력,output;
		begin
			종목코드       , symbol         , symbol         , char   , 15;
			시가		   , curopenprc     , curopenprc     , double , 20;
			고가		   , curhighprc     , curhighprc     , double , 20;
			저가		   , curlowprc      , curlowprc      , double , 20;
			전일시가	   , preopenprc     , preopenprc     , double , 20;
			전일고가	   , prehighprc     , prehighprc     , double , 20;
			전일저가	   , prelowprc      , prelowprc      , double , 20;
			전일대비       , diff           , diff           , double , 20;
			전일종가       , yesterdayprice , yesterdayprice , double , 20;
			등락률         , updnrate       , updnrate       , double ,  6;
			전일누적거래량 , precumdealqty  , precumdealqty  , double , 20;
			출력개수       , out_cnt        , out_cnt        , char   ,  5;
		end
		i0004Out2,출력,output,occurs;
		begin
			시가           , openprc        , openprc        , double , 20;
			고가           , highprc        , highprc        , double , 20;
			저가           , lowprc         , lowprc         , double , 20;
			종가           , closeprc       , closeprc       , double , 20;
			일자           , date           , date           , char   ,  8;
			시간           , time           , time           , char   ,  6;
			체결시간       , exectime       , exectime       , char   , 12;
			체결수량       , execqty        , execqty        , double , 20;
			매도누적체결량 , sellcumexecqty , sellcumexecqty , double , 20;
			매수누적체결량 , buycumexecqty  , buycumexecqty  , double , 20;
			누적거래량     , cumdealqty     , cumdealqty     , double , 20;
			누적거래대금   , cumdealcost    , cumdealcost    , double , 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
