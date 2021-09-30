BEGIN_FUNCTION_MAP
	.Func,(dw126)원화입금확인,dw126,headtype=A;
	BEGIN_DATA_MAP
		dw126In,입력,input;
		begin
			트랜젝션ID	, txid  		, txid  		, char  , 14;
			입금은행코드, depo_bank_cd	, depo_bank_cd	, char	, 3;
			입금계좌번호, depo_acct_no	, depo_acct_no	, char	, 20;
			출금은행코드, widr_bank_cd	, widr_bank_cd	, char	, 3;
			출금계좌번호, widr_acct_no	, widr_acct_no	, char	, 20;
			거래금액	, trd_amt		, trd_amt		, long	, 20;
		end
		dw126Out,출력,output;
		begin
			트랜젝션ID	, txid          , txid          , char	, 14;
			확인여부	, conf_yn       , conf_yn       , char	, 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
