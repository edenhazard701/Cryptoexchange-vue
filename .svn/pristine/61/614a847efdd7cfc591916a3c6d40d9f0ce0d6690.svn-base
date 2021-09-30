BEGIN_FUNCTION_MAP
	.Func,(i0010)BITHUMB 종목정보(현재가) 조회,i0010;
	BEGIN_DATA_MAP
		i0010In1,입력,input;
		begin
			조회구분                 , i_qrydiv             , i_qrydiv             , char   ,  1;
		end
		i0010Out1,출력,output;
		begin
			출력개수                 , out_cnt              , out_cnt              , char   ,  5;
		end
		i0010Out2,출력,output,occurs;
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
		end
	END_DATA_MAP
END_FUNCTION_MAP
