BEGIN_FUNCTION_MAP
.Func,(ac529)통화별자산현황조회,ac529,headtype=A;
	BEGIN_DATA_MAP
		ac529In,입력,input;
		begin
			계정ID				, user_id       , user_id           , char  	, 10;
			통화코드 			, cur_cd		, cur_cd            , char		, 5;
			보유자산구분		, remn_tp		, remn_tp			, charr		, 1;
			요청건수			, req_cnt       , req_cnt           , long		, 5;
		end
		ac529Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt		, rsp_cnt           , long		, 5;
		end
		ac529Out,출력,output,occurs;
		begin
			통화코드 			, cur_cd		, cur_cd            , char		, 5;
			총수량				, gen_bal		, gen_bal           , char	, 20;
			주문가능 			, gen_able		, gen_able			, char	, 20;
			미체결 				, ncnt_amt		, ncnt_amt			, char	, 20;
			출금대기 			, widr_req_amt	, widr_req_amt		, char	, 20;
			평가금액            , eval_amt        , eval_amt        , double  , 20 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
