BEGIN_FUNCTION_MAP
	.Func,(ac701)회원가입확정수신,ac701,headtype=A;
	BEGIN_DATA_MAP
		ac701In,입력,input;
		begin
			제휴구분		, alac_tp		, alac_tp		, char  , 2;
			제휴계정ID		, alac_uid		, alac_uid		, char  , 50;
			계정메일주소	, user_mail		, user_mail		, char  , 50;
			계정비밀번호	, user_pass		, user_pass		, char	, 64;
		end
		ac701Out,출력,output;
		begin
			제휴계정ID		, alac_uid		, alac_uid		, char  , 50;
			공개계정ID		, publ_uid		, publ_uid		, char  , 50;
		end
	END_DATA_MAP
END_FUNCTION_MAP
