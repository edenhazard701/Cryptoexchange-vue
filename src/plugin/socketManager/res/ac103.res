BEGIN_FUNCTION_MAP
	.Func,(ac103)회원가입요청정보삭제처리,ac103,headtype=A;
	BEGIN_DATA_MAP
		ac103In,입력,input;
		begin
			인증휴대폰CI    , auth_ci       , auth_ci       , char  , 88;
		end
		ac103Out,출력,output;
		begin
			DUMMY       	, dummy             , dummy             , char	,  1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
