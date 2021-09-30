BEGIN_FUNCTION_MAP
	.Func,(ac498)--,ac498,headtype=A;
	BEGIN_DATA_MAP
		ac498In,입력,input;
		begin
			계정ID			, user_id			, user_id			, long  	, 10;
			요청건수             	, req_cnt           , req_cnt           , long		, 5;
		end
		ac498Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt			, rsp_cnt           , long		, 5;
		end
		ac498Out,출력,output,occurs;
		begin
			통화코드 			, cur_cd			, cur_cd			, char  	, 5;
			총잔고			, tot_bal			, tot_bal			, double	, 20;
			이체가능잔고		, tran_able_bal		, tran_able_bal		, double	, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
