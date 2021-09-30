BEGIN_FUNCTION_MAP
	.Func,(dw122)원화출금요청,dw122,headtype=A;
	BEGIN_DATA_MAP
		dw122In,입력,input;
		begin
			계정ID		, user_id		, user_id		, char  , 10;
			은행코드	, bank_cd		, bank_cd		, char	, 3;
			계좌번호	, acct_no		, acct_no		, char	, 20;
			입력출금금액, iput_amt		, iput_amt		, long	, 20;
			입력수수료	, iput_fee		, iput_fee		, long	, 20;
			입력보안비밀번호, input_secu_pass   , input_secu_pass , char  , 60;
		end
		dw122Out,출력,output;
		begin
			총출금금액	, tot_trd_amt	, tot_trd_amt	, long	, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
