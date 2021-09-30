BEGIN_FUNCTION_MAP
	.Func,(dw550)출금차단확인,dw550,headtype=A;
	BEGIN_DATA_MAP
		dw550In,입력,input;
		begin
			계정ID		, user_id			, user_id			, char  	, 10;
			통화코드 		, cur_cd			, cur_cd			, char  	,  5;
		end
		dw550Out,출력,output;
		begin
			차단상태		, black_stat		, black_stat		, char		, 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
