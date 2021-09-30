BEGIN_FUNCTION_MAP
	.Func,(i0008)관심종목차트 조회,i0008,headtype=B;
	BEGIN_DATA_MAP
		i0008In1,입력,input;
		begin
			종목건수     , symbolcnt  , symbolcnt  , long   ,  5;
		end
		i0008In2,입력,input,occurs;
		begin
			주기단위     , cycunit    , cycunit    , char   ,  1;
			조회건수     , qrycnt     , qrycnt     , char   ,  5;
			주기         , cyc        , cyc        , char   ,  3;
			종목코드     , symbol     , symbol     , char   , 15;
		end
		i0008Out1,출력,output;
		begin
			출력개수     , out_cnt    , out_cnt    , char   ,  5;
		end
		i0008Out2,출력,output,occurs;
		begin
			종목코드     , symbol     , symbol     , char   , 15;
			현재가       , curprc     , curprc     , double , 20;
		end
		i0008Out3,출력,output;
		begin
			출력개수     , out_cnt2   , out_cnt2   , char   ,  5;
		end
		i0008Out4,출력,output,occurs;
		begin
			종목코드     , symbol     , symbol     , char   , 15;
			시가         , openprc    , openprc    , double , 20;
			고가         , highprc    , highprc    , double , 20;
			저가         , lowprc     , lowprc     , double , 20;
			종가         , closeprc   , closeprc   , double , 20;
			거래량       , cumdealqty , cumdealqty , double , 20;
			일자         , date       , date       , char   ,  8;
			시간         , time       , time       , char   ,  6;
		end
	END_DATA_MAP
END_FUNCTION_MAP
