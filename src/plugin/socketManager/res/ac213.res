BEGIN_FUNCTION_MAP
	.Func,(ac213)API&Token Key 유효성 체크,ac213,headtype=A;
	BEGIN_DATA_MAP
		ac213In,입력,input;
		begin
			계정ID		, user_id	, user_id	, long	, 10;
			API키		, api_key	, api_key	, char	, 32;
			TOKEN키		, token_key	, token_key	, char	, 32;
			API업무구분	, biz_tp	, biz_tp	, char	, 2;
		end
		ac213Out,출력,output;
		begin
			L4스위치 IP	, switch_ip	, switch_ip	, char  , 16;
		end
	END_DATA_MAP
END_FUNCTION_MAP
