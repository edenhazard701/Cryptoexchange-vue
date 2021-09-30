BEGIN_FUNCTION_MAP
	.Func,(ac424)거래내역조회,ac424,headtype=A;
	BEGIN_DATA_MAP
		ac424In,입력,input;
		begin
			계정ID			, user_id			, user_id			, long  , 10;
			통화코드			, cur_cd			, cur_cd			, char  , 5;
			거래종류			, trd_kind			, trd_kind			, char  , 1;
			검색시작일			, fr_dt             , fr_dt             , char	, 8;
			검색종료일			, to_dt             , to_dt             , char	, 8;
			요청건수			, req_cnt           , req_cnt           , long	, 5;
		end
		ac424Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt			, rsp_cnt           , long	, 5;
		end
		ac424Out,출력,output,occurs;
		begin
			거래일시			, trd_dtm			, trd_dtm			, char		, 20;
			거래구분 			, trd_tp			, trd_tp			, char  	, 3;
			대상통화코드		, trgt_cur_cd		, trgt_cur_cd		, char		, 5;
			거래수량			, trd_qty			, trd_qty			, double  	, 20;
			결제통화코드		, setl_cur_cd		, setl_cur_cd		, char		, 5;
			체결가격			, cntr_prc			, cntr_prc			, double  	, 20;
			거래금액			, trd_amt			, trd_amt			, double  	, 20;
			정산금액			, setl_amt			, setl_amt			, double  	, 20;
			수수료통화코드		, fee_cur_cd		, fee_cur_cd		, char		, 5;
			수수료			, fee				, fee				, double  	, 20;
			지갑주소			, walt_id			, walt_id			, char  	, 256;
			보조정보			, sub_info			, sub_info			, char  	, 50;
			은행코드			, bank_cd			, bank_cd			, char  	, 3;
			상대주소			, oppt_addr			, oppt_addr			, char  	, 256;
			상대예금주			, oppt_nm			, oppt_nm			, char  	, 50;
			트랜젠션ID			, txid				, txid				, char  	, 128;
			기본정보url		, info_url			, info_url			, char  	, 500;
		end
	END_DATA_MAP
END_FUNCTION_MAP
