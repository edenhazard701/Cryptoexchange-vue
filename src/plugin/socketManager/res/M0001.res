BEGIN_FUNCTION_MAP
	.Func,(M0001)모니터링로그인,M0001,headtype=B;
	BEGIN_DATA_MAP
		M0001In1,입력,input;
		begin
			사용자ID       , user_id        , user_id      , char  ,  8;
			패스워드       , passwd         , passwd       , char  ,  8;
		end
		M0001Out1,출력,output;
		begin
			결과구분       , rslt_div       , rslt_div     , char  ,  1;
			사용자구분     , user_div       , user_div     , char  ,  1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
