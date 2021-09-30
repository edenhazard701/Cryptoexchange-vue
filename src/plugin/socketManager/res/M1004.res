BEGIN_FUNCTION_MAP
	.Func,(M1004)모니터링 휴대전화번호 저장/삭제,M1004,headtype=B;
	BEGIN_DATA_MAP
		M1004In1,입력,input;
		begin
			입력구분        , in_div      , in_div      , char ,   1;
			IP주소          , ip_addr     , ip_addr     , char ,  15;
			휴대전화번호    , phone_no    , phone_no    , char ,  11;
			휴대전화번호명  , phone_nm    , phone_nm    , char ,  30;
			사용자구분      , user_div    , user_div    , char ,   1;
		end
		M1004Out1,출력,output;
		begin
			결과구분        , rslt_div    , rslt_div    , char ,   1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
