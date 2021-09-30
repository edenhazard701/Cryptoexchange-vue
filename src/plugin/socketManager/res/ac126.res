BEGIN_FUNCTION_MAP
	.Func,(ac126)회원탈퇴처리,ac126,headtype=A;
	BEGIN_DATA_MAP
		ac126In,입력,input;
		begin
			계정ID		            , user_id		, user_id		, char  , 10;
			개인정보유지여부	    , pri_info_yn	, pri_info_yn	, char	, 1; // N.개인정보삭제,Y.개인정보유지
		end
		ac126Out,출력,output;
		begin
			DUMMY		, dummy			, dummy			, char  , 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
