BEGIN_FUNCTION_MAP
	.Func,(ac398)TEST,ac398,headtype=A;
	BEGIN_DATA_MAP
		ac398In,입력,input;
		begin
			요청건수             		, req_cnt           , req_cnt           , long	, 5;
		end
		ac398Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt			, rsp_cnt           , long	, 5;
		end
		ac398Out,출력,output,occurs;
		begin
			모니터링오류구분		, mnt_err_tp		, mnt_err_tp		, char  , 2;
			순번				, err_seq			, err_seq			, char  , 30;
			오류메세지			, err_msg			, err_msg			, char  , 200;
			발생일시			, err_dtm			, err_dtm			, char  , 20;
			재처리횟수			, rprc_cnt			, rprc_cnt			, long  , 2;
			재처리가능여부			, rprc_able_tp		, rprc_able_tp		, char  , 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
