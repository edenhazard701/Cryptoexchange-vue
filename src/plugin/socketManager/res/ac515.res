BEGIN_FUNCTION_MAP
	.Func,(ac515)로그인정보확인,ac515,headtype=A;
	BEGIN_DATA_MAP
		ac515In,입력,input;
		begin
			계정메일주소, user_mail		, user_mail		, char  , 50;
			입력비밀번호, iput_pass		, iput_pass		, char  , 64;
		end
		ac515Out,출력,output;
		begin
			계정ID		, user_id		, user_id		, char  , 10;
			보안인증	, secu_auth_tp	, secu_auth_tp	, char	, 1;
			모바일인증	, mobl_auth_tp	, mobl_auth_tp	, char	, 1;
			계정그룹ID	, user_grp_id	, user_grp_id	, char  , 2;
			L4스위치 IP	, switch_ip		, switch_ip		, char  , 16;
			임시비밀번호 사용여부, temp_use_tp, temp_use_tp, char , 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
