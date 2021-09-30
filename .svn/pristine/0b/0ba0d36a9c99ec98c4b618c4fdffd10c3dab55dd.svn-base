BEGIN_FUNCTION_MAP
	.Func,(ac311)전자지갑출금요청,ac311,headtype=A;
	BEGIN_DATA_MAP
		ac311In,입력,input;
		begin
			계정ID		, user_id			, user_id			, long  	, 10;
			통화코드		, cur_cd			, cur_cd			, char		, 5;
			입금전자지갑주소	, walt_id			, walt_id			, char		, 256;
			보조필드 		, sub_info			, sub_info			, char		, 50;
			출금할금액		, trd_amt			, trd_amt			, double	, 20;
			입력된 비밀번호	, iput_secu_pass	, iput_secu_pass	, char  	, 64;
		end
		ac311Out,출력,output;
		begin
			트랜젝션ID		, txid				, txid				, char  , 128;
		end
	END_DATA_MAP
END_FUNCTION_MAP
