BEGIN_FUNCTION_MAP
	.Func,(ac404)거래내역조회,ac404,headtype=A;
	BEGIN_DATA_MAP
		ac404In,입력,input;
		begin
			계정ID			, user_id			, user_id			, long  , 10;
			거래종류			, trd_kind			, trd_kind			, char  , 1;
			검색시작일			, fr_dt             , fr_dt             , char	, 8;
			검색종료일			, to_dt             , to_dt             , char	, 8;
			요청건수			, req_cnt           , req_cnt           , long	, 5;
		end
		ac404Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt			, rsp_cnt           , long	, 5;
		end
		ac404Out,출력,output,occurs;
		begin
			거래일시			, trd_dtm			, trd_dtm			, char		, 20;
			거래구분 			, trd_tp			, trd_tp			, char  	, 3;
			거래금액			, trd_amt			, trd_amt			, double  	, 20;
			잔고				, npal				, npal				, double  	, 20;
			체결가			, cntr_prc			, cntr_prc			, double  	, 20;
			체결수량			, cntr_qty			, cntr_qty			, double  	, 20;
			수수료			, fee				, fee				, double  	, 20;
			거래종류 			, trd_kind			, trd_kind			, char  	, 1;
			대상통화코드		, trgt_cur_cd		, trgt_cur_cd		, char		, 5;
			결제통화코드		, setl_cur_cd		, setl_cur_cd		, char		, 5;
			수수료통화코드		, fee_cur_cd		, fee_cur_cd		, char		, 5;
			은행코드			, bank_cd			, bank_cd			, char  	, 3;
			상대주소			, oppt_addr			, oppt_addr			, char  	, 50;
			상대예금주			, oppt_nm			, oppt_nm			, char  	, 30;
			트랜젠션ID			, txid				, txid				, char  	, 128;
		end
	END_DATA_MAP
END_FUNCTION_MAP
