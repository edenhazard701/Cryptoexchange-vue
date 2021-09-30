BEGIN_FUNCTION_MAP
	.Func,(ac101)계정등록요청,ac101,headtype=A;
	BEGIN_DATA_MAP
		ac101In,입력,input;
		begin
			계정메일주소		, user_mail		, user_mail		, char  , 50;
			계정비밀번호		, user_pass		, user_pass		, char	, 64;
			투자자구분			, invt_tp		, invt_tp		, char	, 4;
		end
		ac101Out,출력,output;
		begin
			계정ID			, user_id		, user_id		, long  , 10;
			계정그룹ID			, user_grp_id	, user_grp_id	, char  , 2;
			L4스위치 IP		, switch_ip	    , switch_ip	    , char  , 16;
		end
	END_DATA_MAP
END_FUNCTION_MAP
