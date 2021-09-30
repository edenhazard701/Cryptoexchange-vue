BEGIN_FUNCTION_MAP
	.Func,(i0001)현재가조회,i0001,headtype=B;
	BEGIN_DATA_MAP
		i0001In1,입력,input;
		begin
			종목코드       , symbol      , symbol      , char   , 15;
		end
		i0001Out1,출력,output;
		begin
			종목코드       , symbol      , symbol      , char   , 15;
			결제통화코드   , paycurrcode , paycurrcode , char   ,  5;
			현재가         , curprc      , curprc      , double , 20;
			전일대비       , diff        , diff        , double , 20;
			등락률         , updnrate    , updnrate    , double ,  6;
			누적거래량     , cumdealqty  , cumdealqty  , double , 20;
			체결가         , execprice   , execprice   , double , 20;
			직전대비       , bfrcomp     , bfrcomp     , double , 20;
			시가           , openprc     , openprc     , double , 20;
			시가등락률     , openprcrate , openprcrate , double ,  6;
			고가           , highprc     , highprc     , double , 20;
			고가등락률     , highprcrate , highprcrate , double ,  6;
			저가           , lowprc      , lowprc      , double , 20;
			저가등락률     , lowprcrate  , lowprcrate  , double ,  6;
			누적거래대금   , cumdealcost , cumdealcost , double , 20;
			호가수신시간   , hotime      , hotime      , char   , 10;
			체결강도       , execstrth   , execstrth   , double ,  6;
			체결수량       , execqty     , execqty     , double , 20;
			매도호가1      , ask1        , ask1        , double , 20;
			매도호가잔량1  , askrest1    , askrest1    , double , 20;
			매도호가2      , ask2        , ask2        , double , 20;
			매도호가잔량2  , askrest2    , askrest2    , double , 20;
			매도호가3      , ask3        , ask3        , double , 20;
			매도호가잔량3  , askrest3    , askrest3    , double , 20;
			매도호가4      , ask4        , ask4        , double , 20;
			매도호가잔량4  , askrest4    , askrest4    , double , 20;
			매도호가5      , ask5        , ask5        , double , 20;
			매도호가잔량5  , askrest5    , askrest5    , double , 20;
			매도호가6      , ask6        , ask6        , double , 20;
			매도호가잔량6  , askrest6    , askrest6    , double , 20;
			매도호가7      , ask7        , ask7        , double , 20;
			매도호가잔량7  , askrest7    , askrest7    , double , 20;
			매도호가8      , ask8        , ask8        , double , 20;
			매도호가잔량8  , askrest8    , askrest8    , double , 20;
			매도호가9      , ask9        , ask9        , double , 20;
			매도호가잔량9  , askrest9    , askrest9    , double , 20;
			매도호가10     , ask10       , ask10       , double , 20;
			매도호가잔량10 , askrest10   , askrest10   , double , 20;
			매수호가1      , bid1        , bid1        , double , 20;
			매수호가잔량1  , bidrest1    , bidrest1    , double , 20;
			매수호가2      , bid2        , bid2        , double , 20;
			매수호가잔량2  , bidrest2    , bidrest2    , double , 20;
			매수호가3      , bid3        , bid3        , double , 20;
			매수호가잔량3  , bidrest3    , bidrest3    , double , 20;
			매수호가4      , bid4        , bid4        , double , 20;
			매수호가잔량4  , bidrest4    , bidrest4    , double , 20;
			매수호가5      , bid5        , bid5        , double , 20;
			매수호가잔량5  , bidrest5    , bidrest5    , double , 20;
			매수호가6      , bid6        , bid6        , double , 20;
			매수호가잔량6  , bidrest6    , bidrest6    , double , 20;
			매수호가7      , bid7        , bid7        , double , 20;
			매수호가잔량7  , bidrest7    , bidrest7    , double , 20;
			매수호가8      , bid8        , bid8        , double , 20;
			매수호가잔량8  , bidrest8    , bidrest8    , double , 20;
			매수호가9      , bid9        , bid9        , double , 20;
			매수호가잔량9  , bidrest9    , bidrest9    , double , 20;
			매수호가10     , bid10       , bid10       , double , 20;
			매수호가잔량10 , bidrest10   , bidrest10   , double , 20;
			매도잔량합계   , asktotal    , asktotal    , double , 20;
			매수잔량합계   , bidtotal    , bidtotal    , double , 20;
			출력개수       , out_cnt     , out_cnt     , char   ,  5;
		end
		i0001Out2,출력,output,occurs;
		begin
			시가           , openprc     , openprc     , double , 20;
			고가           , highprc     , highprc     , double , 20;
			저가           , lowprc      , lowprc      , double , 20;
			종가           , closeprc    , closeprc    , double , 20;
			일자           , date        , date        , char   ,  8;
		end
	END_DATA_MAP
END_FUNCTION_MAP
