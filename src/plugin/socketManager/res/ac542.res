BEGIN_FUNCTION_MAP
.Func,(ac542)빗썸자산리스트조회,ac542,headtype=A;
	BEGIN_DATA_MAP
	ac542In,입력,input;
		begin
			계정ID      	 	, user_id       , user_id           , long  	, 10;
			요청건수          		, req_cnt       , req_cnt           , long		, 5;
		end
		ac542Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt		, rsp_cnt           , long		, 5;
		end
		ac542Out,출력,output,occurs;
		begin
			통화코드 			, cur_cd		, cur_cd            , char		, 5;
			이동가능수량 		, bit_bal		, bit_bal			, double	, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
