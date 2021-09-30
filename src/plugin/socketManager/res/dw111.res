BEGIN_FUNCTION_MAP
	.Func,(dw111)전자지갑출금요청,dw111,headtype=A;
	BEGIN_DATA_MAP
		dw111In,입력,input;
		begin
			계정ID		, user_id			, user_id			, char  	, 10;
			통화코드		, cur_cd			, cur_cd			, char		, 5;
			전자지갑주소	, walt_id			, walt_id			, char		, 256;
			보조필드 		, sub_info			, sub_info			, char		, 50;
			입력출금금액	, iput_amt			, iput_amt			, double	, 20;
			입력수수료		, iput_fee			, iput_fee			, double	, 20;
			입력보안비밀번호		, iput_secu_pass			, iput_secu_pass			, char		, 64;
		end
		dw111Out,출력,output;
		begin
			통화코드		, cur_cd			, cur_cd			, char		, 5;
			총출금금액		, tot_trd_amt		, tot_trd_amt		, double	, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
