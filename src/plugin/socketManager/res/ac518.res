BEGIN_FUNCTION_MAP
	.Func,(ac518)계정로그인정보확인,ac518,headtype=A;
	BEGIN_DATA_MAP
		ac518In,입력,input;
		begin
            인증휴대폰CI , auth_ci      , auth_ci       , char  , 88;
		end
		ac518Out,출력,output;
		begin
			계정ID		, user_id		, user_id		, char  , 10;
            지점코드    , unit_code     , unit_code     , char  ,  5;
			계정그룹ID	, user_grp_id	, user_grp_id	, char  ,  2;
			L4스위치 IP	, switch_ip		, switch_ip		, char  , 16;
		end
	END_DATA_MAP
END_FUNCTION_MAP
