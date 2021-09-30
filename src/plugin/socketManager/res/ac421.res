BEGIN_FUNCTION_MAP
	.Func,(ac421)자산이동내역조회,ac421,headtype=A;
	BEGIN_DATA_MAP
		ac421In,입력,input;
		begin
			계정ID			, user_id			, user_id			, long  , 10;
			기간구분			, qry_term			, qry_term			, char  , 1;
			이동분류			, io_tp				, io_tp				, char  , 1;
			통화코드			, cur_cd			, cur_cd			, char  , 5;
			이동상태			, stat_tp           , stat_tp           , char	, 1;
			요청건수			, req_cnt           , req_cnt           , long	, 5;
		end
		ac421Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt			, rsp_cnt           , long	, 5;
		end
		ac421Out,출력,output,occurs;
		begin
			거래일시			, trd_dtm			, trd_dtm			, char		, 20;
			이동분류 			, io_tp				, io_tp				, char  	, 1;
			통화코드			, cur_cd			, cur_cd			, char		, 5;
			거래금액			, trd_amt			, trd_amt			, double  	, 20;
			이동상태구분		, stat_tp           , stat_tp           , char		, 1;
			이동상태			, stat_nm           , stat_nm           , char		, 30;
		end
	END_DATA_MAP
END_FUNCTION_MAP
