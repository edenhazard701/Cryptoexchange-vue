BEGIN_FUNCTION_MAP
	.Func,(ac405)대체내역조회,ac405,headtype=A;
	BEGIN_DATA_MAP
		ac405In,입력,input;
		begin
			계정ID		, user_id			, user_id			, long 		, 10;
			통화코드 		, cur_cd			, cur_cd			, char 	 	, 5;
			검색시작일        	, fr_dt             , fr_dt             , char		, 8;
			검색종료일        	, to_dt             , to_dt             , char		, 8;
			요청건수          	, req_cnt           , req_cnt           , long		, 5;
		end
		ac405Out_c,출력공통,output;
		begin
			응답건수 		, rsp_cnt			, rsp_cnt           , long		, 5;
		end
		ac405Out,출력,output,occurs;
		begin
			거래일자		, trd_dt			, trd_dt			, char		, 8;
			거래시각		, trd_tm			, trd_tm			, char		, 12;
			거래금액		, trd_amt			, trd_amt			, double	, 20;
			통화코드		, cur_cd			, cur_cd			, char		, 5;
			출금계좌구분	, widr_act_tp		, widr_act_tp		, char  	, 1;
			입금계좌구분	, depo_act_tp		, depo_act_tp		, char  	, 1;
			출금계좌전잔	, widr_act_pbal		, widr_act_pbal		, double  	, 20;
			출금계좌금잔	, widr_act_nbal		, widr_act_nbal		, double  	, 20;
			입금계좌전잔	, depo_act_pbal		, depo_act_pbal		, double  	, 20;
			입금계좌금잔	, depo_act_nbal		, depo_act_nbal		, double  	, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
