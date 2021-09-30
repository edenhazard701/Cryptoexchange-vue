BEGIN_FUNCTION_MAP
	.Func,(ac412)출금계좌조회,ac412,headtype=A;
	BEGIN_DATA_MAP
		ac412In,입력,input;
		begin
			계정ID 		, user_id			, user_id			, long  , 10;
			요청건수            , req_cnt           , req_cnt           , long	, 5;
		end
		ac412Out_c,출력공통,output;
		begin
			응답건수 		, rsp_cnt			, rsp_cnt           , long	, 5;
		end
		ac412Out,출력,output,occurs;
		begin
			은행명 		, bank_nm			, bank_nm			, char  , 60;
		  	은행코드 		, bank_cd			, bank_cd			, char  , 3;
			출금계좌번호	, acct_no			, acct_no			, char  , 16;
			예금주명		, cmf_nm			, cmf_nm			, char  , 30;
		end
	END_DATA_MAP
END_FUNCTION_MAP
