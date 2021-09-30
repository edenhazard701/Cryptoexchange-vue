BEGIN_FUNCTION_MAP
	.Func,(ac195)로그인세션정보생성,ac195,headtype=A;
	BEGIN_DATA_MAP
		ac195In,입력,input;
		begin
			계정ID      , user_id       	, user_id       	, char  , 10;
			세션ID		, sesn_id			, sesn_id			, char	, 50;
		end
		ac195Out,출력,output;
		begin
			DUMMY       , dummy		        , dummy 	        , char  ,  1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
