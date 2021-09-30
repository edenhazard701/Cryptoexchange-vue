BEGIN_FUNCTION_MAP
	.Func,(ac411)쿠폰구매내역조회,ac411,headtype=A;
	BEGIN_DATA_MAP
		ac411In,입력,input;
		begin
			계정ID		, user_id			, user_id			, long  , 10;
			검색시작일        	, fr_dt             , fr_dt             , char	, 8;
			검색종료일        	, to_dt             , to_dt             , char	, 8;
			검색구분		, sear_tp			, sear_tp			, char  , 1;
			요청건수		, req_cnt			, req_cnt           , long	, 5;
		end
		ac411Out_c,출력공통,output;
		begin
			응답건수		, rsp_cnt			, rsp_cnt			, long	, 5;
		end
		ac411Out,출력,output,occurs;
		begin
			구매일시		, buy_dtm			, buy_dtm			, char		, 20;
			쿠폰번호		, copn_no			, copn_no			, long		, 10;
			쿠폰구분		, copn_tp			, copn_tp			, char  	, 1;
			쿠폰명		, copn_name			, copn_name			, char  	, 100;
			쿠폰상태		, copn_stat			, copn_stat			, char  	, 1;
			적용종료일시	, aply_end_dtm		, aply_end_dtm		, char  	, 14;
			적용금액		, aply_amt			, aply_amt			, double	, 20;
			사용금액		, use_amt			, use_amt			, double	, 20;
			구매통화코드	, buy_cur_cd		, buy_cur_cd		, char  	, 5;
			구매금액		, buy_amt			, buy_amt			, double  	, 20;
			환불금액		, refd_amt			, refd_amt			, double  	, 20;
			
		end
	END_DATA_MAP
END_FUNCTION_MAP
