BEGIN_FUNCTION_MAP
	.Func,(ac403)일별투자손익조회,ac403,headtype=A;
	BEGIN_DATA_MAP
		ac403In,입력,input;
		begin
			계정ID			, user_id           , user_id           , long  , 10;
			계좌구분           	, act_tp            , act_tp            , char	, 1;
			기초일               	, fr_dt             , fr_dt             , char	, 8;
			기말일               	, to_dt             , to_dt             , char	, 8;
			요청건수			, req_cnt           , req_cnt           , long	, 5;
		end
		ac403Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt			, rsp_cnt           , long	, 5;
		end
		ac403Out,출력,output,occurs;
		begin
			일자                   	, dt                , dt                , char		, 8;
			기초평가금액       	, fr_eval           , fr_eval           , double	, 20;
			입금평가금액합산   	, in_eval_sum       , in_eval_sum       , double	, 20;
			출금평가금액합산   	, out_eval_sum      , out_eval_sum      , double	, 20;
			기말평가금액        	, to_eval           , to_eval           , double	, 20;
			투자손익              	, profit            , profit            , double  	, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
