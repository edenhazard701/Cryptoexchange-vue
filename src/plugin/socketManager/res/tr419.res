BEGIN_FUNCTION_MAP
	.Func,(tr419)매매프로세스실시간조회,tr419,headtype=A;
	BEGIN_DATA_MAP
		tr419In,입력,input;
		begin
			요청건수             , req_cnt          , req_cnt           , long   , 5;
		end
		tr419Out_c,출력공통,output;
		begin
			응답건수             , rsp_cnt          , rsp_cnt           , long   , 5;
		end
		tr419Out,출력,output,occurs;
		begin
			프로세스명           , prcs_nm          , prcs_nm           , char   , 100;
			큐대기건수           , queue_stn_cnt    , queue_stn_cnt     , long   , 5;
			오류건수             , err_cnt          , err_cnt           , long   , 5;
		end
	END_DATA_MAP
END_FUNCTION_MAP
