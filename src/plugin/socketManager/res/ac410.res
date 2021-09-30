BEGIN_FUNCTION_MAP
	.Func,(ac410)쿠폰상품조회,ac410,headtype=A;
	BEGIN_DATA_MAP
		ac410In,입력,input;
		begin
			쿠폰구분			, copn_tp			, copn_tp			, char  , 1;
			요청건수          		, req_cnt           , req_cnt           , long	, 5;
			계정ID			, user_id			, user_id			, long  , 10;
		end
		ac410Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt			, rsp_cnt           , long	, 5;
			누적거래금액 		, tot_trd_amt		, tot_trd_amt       , long	, 20;
		end
		ac410Out,출력,output,occurs;
		begin
			쿠폰번호			, copn_no			, copn_no			, long		, 10;
			쿠폰구분			, copn_tp			, copn_tp			, char		, 1;
			쿠폰명			, copn_name			, copn_name			, char		, 100;
			적용금액			, aply_amt			, aply_amt			, double  	, 20;
			적용시간			, aply_term			, aply_term			, long  	, 10;
			판매금액			, sale_amt			, sale_amt			, double  	, 20;
			구매가능거래금액		, able_trd_amt		, able_trd_amt		, double  	, 20;
			할인율			, disc_rate			, disc_rate			, long  	, 3;
			할인금액			, disc_price		, disc_price		, double  	, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
