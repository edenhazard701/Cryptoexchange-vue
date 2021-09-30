BEGIN_FUNCTION_MAP
	.Func,(i0016)24시간 변동량 조회,i0016,headtype=B;
	BEGIN_DATA_MAP
		i0016In1,입력,input;
		begin
			종목구분       , symbol_div   , symbol_div   , char   ,   1;
			종목코드       , symbol       , symbol       , char   ,  15;
		end
		i0016Out1,출력,output;
		begin
			종목개수       , out_cnt      , out_cnt      , char   ,   5;
		end
		i0016Out2,출력,output,occurs;
		begin
			종목코드        , symbol       , symbol       , char   ,  15;
			시가총액        , mktcapital   , mktcapital   , long   ,  20;
			상장일자시간    , listdatetime , listdatetime , char   ,  14;
			조회시간        , qry_time     , qry_time     , char   ,   6;
			종가시가        , openprc      , openprc      , double ,  20;
			종가고가        , highprc      , highprc      , double ,  20;
			종가저가        , lowprc       , lowprc       , double ,  20;
			    종가        , curprc       , curprc       , double ,  20;
			종가등락율      , updnrate     , updnrate     , double ,   6;
			24시간거래량    , cumdealqty   , cumdealqty   , double ,  20;
			24시간거래대금  , cumdealcost  , cumdealcost  , double ,  20;
			종가시간대비    , diff         , diff         , double ,  20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
