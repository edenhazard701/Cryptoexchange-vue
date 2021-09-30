BEGIN_FUNCTION_MAP
	.Func,(ac422)보유자산 상세조회,ac422,headtype=A;
	BEGIN_DATA_MAP
		ac422In,입력,input;
		begin
			계정ID			, user_id			, user_id			, long  , 10;
			통화코드			, cur_cd			, cur_cd			, char  , 5;
		end
		ac422Out,출력,output;
		begin
			통화코드			, cur_cd			, cur_cd			, char  , 5;
			출금가능수량		, widr_able_qty		, widr_able_qty		, long	, 30;
			krw환산금액		, krw_bal			, krw_bal			, long	, 20;
			거래대기수량		, trd_hold_qty		, trd_hold_qty		, long	, 30;
			출금대기수량		, widr_hold_qty		, widr_hold_qty		, long	, 30;
		end
	END_DATA_MAP
END_FUNCTION_MAP
