BEGIN_FUNCTION_MAP
	.Func,(ac161)API Key 발급,ac161,headtype=A;
	BEGIN_DATA_MAP
		ac161In,입력,input;
		begin
			계정ID			, user_id			, user_id			, char	, 10;
			API사용약관동의	, use_terms			, use_terms			, char	,  1;		// API 사용약관동의(Y,N)
			시세	    	, curt_st			, curt_st			, char	,  1;		// 0 : 사용불가능, 1: 사용가능
			주문			, ord_st			, ord_st			, char	,  1;		// 0 : 사용불가능, 1: 사용가능
			잔고			, cur_bar_st		, cur_bar_st		, char	,  1;		// 0 : 사용불가능, 1: 사용가능
			종목정보		, inst_st			, inst_st			, char	,  1;		// 0 : 사용불가능, 1: 사용가능
			IP 정보			, ip_info			, ip_info			, char	, 64;		// API 사용자 접속 허용 IP
		end
		ac161Out,출력,output;
		begin
			계정ID		, user_id		, user_id		, char	, 10;
			CONNECT KEY	, connect_key	, connect_key	, char	, 32;
			SECRET KEY	, secret_key	, secret_key	, char	, 32;
		end
	END_DATA_MAP
END_FUNCTION_MAP
