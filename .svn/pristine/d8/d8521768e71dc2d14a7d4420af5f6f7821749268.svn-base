BEGIN_FUNCTION_MAP
	.Func,(M3005)시세서버 SHM마스터 상태 일별 조회,M3005,headtype=B;
	BEGIN_DATA_MAP
		M3005In1,입력,input;
		begin
			일자               , dt       , dt       , char ,   8;
		end
		M3005Out1,출력,output;
		begin
			츨력개수           , out_cnt  , out_cnt  , char ,   5;
		end
		M3005Out2,출력,output,occurs;
		begin
			일자               , dt       , dt       , char ,   8;
			IP주소             , ip_addr  , ip_addr  , char ,  15;
			거래소구분         , ex_div   , ex_div   , char ,   5;
			거래소구분명       , ex_div_nm, ex_div_nm, char , 100;
			수신건수           , rcv_cnt  , rcv_cnt  , int  ,   5;
			수신일자           , rcv_dt   , rcv_dt   , char ,   8;
			수신시간           , rcv_time , rcv_time , char ,   6;
	   end
	END_DATA_MAP
END_FUNCTION_MAP
