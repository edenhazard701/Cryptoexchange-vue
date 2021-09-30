BEGIN_FUNCTION_MAP
	.Func,(i0018) 기본화면 조회,i0018,headtype=B;
	BEGIN_DATA_MAP
		i0018In1,입력,input;
		begin
			종목건수     , symbolcnt   , symbolcnt   , long   ,  5;
			조회구분     , qry_div     , qry_div     , char   ,  1;
			결제통화코드 , paycurrcode , paycurrcode , char   ,  5;
			거래소코드   , excode      , excode      , char   ,  3;
		end
		i0018In2,입력,input,occurs;
		begin
			종목코드     , symbol      , symbol      , char   , 15;
		end
		i0018Out1,출력,output;
		begin
			출력개수     , out_cnt     , out_cnt     , char   ,  5;
		end
		i0018Out2,출력,output,occurs;
		begin
			종목코드        , symbol      , symbol      , char   , 15;
			거래소명        , exkorname   , exkorname   , char   , 50;
			결제통화코드    , paycurrcode , paycurrcode , char   ,  5;
			현재가          , curprc      , curprc      , char   , 20;
			등락폭          , diff        , diff        , char , 20;
			등락률          , updnrate    , updnrate    , double ,  6;
			거래량          , cumdealqty  , cumdealqty  , double , 20;
			시가            , openprc     , openprc     , double , 20;
			고가            , highprc     , highprc     , char , 20;
			저가            , lowprc      , lowprc      , char , 20;
			USD환산         , usdchg      , usdchg      , double , 20;
			KRW환산         , krwchg      , krwchg      , double , 20;
			거래대금        , cumdealcost , cumdealcost , char , 20;
			24시간거래량    , cumdealqty_24   , cumdealqty_24   , char ,  20;
			24시간거래대금  , cumdealcost_24  , cumdealcost_24  , char ,  20;
			상장일자시간    , listdatetime, listdatetime, char   , 14;
			시가총액        , mktcapital  , mktcapital  , long   , 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
