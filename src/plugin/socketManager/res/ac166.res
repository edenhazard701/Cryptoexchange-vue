BEGIN_FUNCTION_MAP
	.Func,(ac166)API 이용 SMS 발송,ac166,headtype=A;
	BEGIN_DATA_MAP
		ac166In,입력,input;
		begin
			계정ID		, user_id		, user_id		, char	, 10;
			인증종류	, auth_kind		, auth_kind		, char	,  2;		// 01:회원탈퇴, 02:API KEY 발급신청
		end
		ac166Out,출력,output;
		begin
			계정ID		, user_id		, user_id		, char	, 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
