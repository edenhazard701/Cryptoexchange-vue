BEGIN_FUNCTION_MAP
	.Func,(n0009)거래대금상위 조회,n0009;
	BEGIN_DATA_MAP
		n0009In1,입력,input;
		begin
			조회구분         , qrydiv       , qrydiv       , char   ,  1;
			조회개수         , qrycnt       , qrycnt       , char   ,  5;
		end
		n0009Out1,출력,output;
		begin
			출력개수         , out_cnt      , out_cnt      , char   ,  5;
		end
		n0009Out2,출력,output,occurs;
		begin
			종목코드         , symbol       , symbol       , char   , 15;
			종목한글명       , korname      , korname      , char   , 50;
			대상통화코드     , tradcurrcode , tradcurrcode , char   ,  5;
			현재가           , curprc       , curprc       , double , 20;
			거래대금전일대비 , dealcostdiff , dealcostdiff , double , 20;
			거래대금등락률   , dealcostrate , dealcostrate , double ,  6;
			전일대비         , diff         , diff         , double , 20;
			등락율           , updnrate     , updnrate     , double ,  6;
		end
	END_DATA_MAP
END_FUNCTION_MAP
