BEGIN_FUNCTION_MAP
	.Func,(ac402)자산투자손익조회,ac402,headtype=A;
	BEGIN_DATA_MAP
		ac402In,입력,input;
		begin
			계정ID			, user_id           , user_id           , long 		, 10;
			계좌구분        		, act_tp            , act_tp            , char		, 1;
			기초일                	, fr_dt             , fr_dt             , char		, 8;
			기말일                	, to_dt             , to_dt             , char		, 8;
			요청건수             	, req_cnt           , req_cnt           , long		, 5;
		end
		ac402Out_c,출력공통,output;
		begin
			일반총손익              	, g_tot_profit  	, g_tot_profit      , double	, 20;
			인버스총손익            	, i_tot_profit  	, i_tot_profit      , double	, 20;
			응답건수 			, rsp_cnt			, rsp_cnt           , long		, 5;
		end
		ac402Out,출력,output,occurs;
		begin
			통화코드              	, cur_cd            , cur_cd            , char		, 5;
			기초잔고              	, fr_bal            , fr_bal            , double	, 20;
			기초시세              	, fr_prc            , fr_prc            , double	, 20;
			기초평가금액        	, fr_eval           , fr_eval           , double	, 20;
			입금합산              	, in_sum            , in_sum            , double	, 20;
			입금평가금액합산   	, in_eval_sum       , in_eval_sum       , double	, 20;
			출금합산              	, out_sum           , out_sum           , double	, 20;
			출금평가금액합산   	, out_eval_sum      , out_eval_sum      , double	, 20;
			기말잔고              	, to_bal            , to_bal            , double	, 20;
			기말시세              	, to_prc            , to_prc            , double	, 20;
			기말평가금액        	, to_eval           , to_eval           , double	, 20;
			투자손익              	, profit            , profit            , double  	, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
