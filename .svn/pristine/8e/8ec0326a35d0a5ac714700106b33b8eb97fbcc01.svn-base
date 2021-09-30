BEGIN_FUNCTION_MAP
	.Func,(dw124)원화입금요청,dw124,headtype=A;
	BEGIN_DATA_MAP
		dw124In,입력,input;
		begin
			계정ID		, user_id		, user_id		, char  , 10;
			은행코드	, bank_cd		, bank_cd		, char	, 3;
			계좌번호	, acct_no		, acct_no		, char	, 20;
			거래금액	, trd_amt		, trd_amt		, long	, 20;
		end
		dw124Out,출력,output;
		begin
            거래일자    , trd_dt        , trd_dt        , char  , 8;
            거래시각    , trd_tm        , trd_tm        , char  , 12;
			트랜젝션ID	, txid	        , txid	        , char	, 14;
		end
	END_DATA_MAP
END_FUNCTION_MAP
