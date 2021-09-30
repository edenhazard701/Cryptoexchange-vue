BEGIN_FUNCTION_MAP
	.Func,(dw551)출금기준정보조회,dw551,headtype=A;
	BEGIN_DATA_MAP
		dw551In,입력,input;
		begin
			계정ID		, user_id			, user_id			, char  	, 10;
		  	통화코드 		, cur_cd			, cur_cd			, char  	,  5;
		end
		dw551Out,출력,output;
		begin
			일출금한도잔량	, limt_bal			, limt_bal			, long		, 20;
			1회출금한도		, once_limt		    , once_limt		    , long		, 20;
			출금가능수량	, widr_able_qty		, widr_able_qty		, double	, 20;
			출금최소수량  	, min_qty   		, min_qty			, double	, 20;
			출금수수료   	, fee     			, fee				, double  	, 20;
			현재가   		, curt_prc  		, curt_prc			, double  	, 20;
			보조주소구분	, sub_info_tp  		, sub_info_tp		, char  	,  1;
			통화소수점자릿수	, dec_digt			, dec_digt			, int		,  2;
		end
	END_DATA_MAP
END_FUNCTION_MAP
