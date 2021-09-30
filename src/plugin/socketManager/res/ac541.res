BEGIN_FUNCTION_MAP
.Func,(ac541)자산이동잔고조회,ac541,headtype=A;
	BEGIN_DATA_MAP
		ac541In,입력,input;
		begin
			계정ID      		, user_id       , user_id           , long  	, 10;
			요청건수        	, req_cnt       , req_cnt           , long		, 5;
		end
		ac541Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt		, rsp_cnt           , long		, 5;
		end
		ac541Out,출력,output,occurs;
		begin
			통화코드 			, cur_cd		, cur_cd            , char		, 5;
			이동가능수량		, pro_bal		, pro_bal           , double	, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
