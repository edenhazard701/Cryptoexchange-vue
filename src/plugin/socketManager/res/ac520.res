BEGIN_FUNCTION_MAP
	.Func,(ac520)로그인내역조회,ac520,headtype=A;
	BEGIN_DATA_MAP
		ac520In,입력,input;
		begin
			계정ID			, user_id			, user_id			, char	,	10;
			요청건수		, req_cnt			, req_cnt			, long	,	5;
		end
		ac520Out_c,출력공통,output;
		begin
			응답건수		, rsp_cnt			, rsp_cnt			, long	,	5;
		end
		ac520Out,출력,output,occurs;
		begin
			접속매체		, logn_cnel			, logn_cnel			, char	,	40;
			IP주소			, logn_ip			, logn_ip			, char	,	16;
			접속일자		, logn_dtm			, logn_dtm			, char	,	20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
