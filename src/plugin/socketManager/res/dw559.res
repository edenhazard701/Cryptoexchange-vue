BEGIN_FUNCTION_MAP
	.Func,(dw559)입출금계좌번호조회,dw559,headtype=A;
	BEGIN_DATA_MAP
		dw559In,입력,input;
		begin
			계정ID          , user_id			, user_id			, char  	, 10;
		end
		dw559Out,출력,output;
		begin
            은행코드        , bank_cd           , bank_cd           , char      ,  3;
            은행명          , bank_nm           , bank_nm           , char      , 60;
            계좌번호        , acct_no           , acct_no           , char      , 20;
            모계좌은행코드  , moth_bank_cd      , moth_bank_cd      , char      ,  3;
		모계좌은행명    , moth_bank_nm      , moth_bank_nm      , char      , 60;
            모계좌계좌번호  , moth_acct_no      , moth_acct_no      , char      , 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
