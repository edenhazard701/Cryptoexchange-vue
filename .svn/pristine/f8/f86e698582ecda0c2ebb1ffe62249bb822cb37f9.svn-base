BEGIN_FUNCTION_MAP
.Func,(ac401)통화잔고조회,ac401,headtype=A;
	BEGIN_DATA_MAP
	ac401In,입력,input;
		begin
			계정ID      		 	, user_id       , user_id           , long  	, 10;
			계좌구분           	 	, act_tp        , act_tp            , char		, 1;
			대상통화코드     		  	, trgt_cur_cd   , trgt_cur_cd       , char		, 5;
			요청건수           		, req_cnt       , req_cnt           , long		, 5;
		end
		ac401Out_c,출력공통,output;
		begin
			총합계잔고(환산)		, tot_bal		, tot_bal           , char		, 20;
			응답건수 				, rsp_cnt		, rsp_cnt           , long		, 5;
		end
		ac401Out,출력,output,occurs;
		begin
			통화코드 				, cur_cd		, cur_cd            , char		, 5;
			일반총잔고				, gen_bal		, gen_bal           , double	, 20;
			인버스총잔고			, mrg_bal		, mrg_bal           , double	, 20;
			전체총잔고				, tot_bal       , tot_bal           , double	, 20;
			일반총잔고(환산)		, gen_bal_setl	, gen_bal_setl		, double	, 20;
			인버스총잔고(환산)		, mrg_bal_setl  , mrg_bal_setl		, double	, 20;
			전체총잔고(환산)		, tot_bal_setl  , tot_bal_setl		, double	, 20;
			일반거래중금액			, gen_trd		, gen_trd           , double	, 20;
			인버스거래중금액			, mrg_trd		, mrg_trd           , double	, 20;
			전체거래중금액 			, tot_trd		, tot_trd           , double	, 20;
			일반거래중금액(환산)		, gen_trd_setl	, gen_trd_setl		, double	, 20;
			인버스거래중금액(환산)	, mrg_trd_setl	, mrg_trd_setl		, double	, 20;
			전체거래중금액(환산)		, tot_trd_setl	, tot_trd_setl		, double	, 20;
			일반거래가능금액 		, gen_able		, gen_able			, double	, 20;
			인버스거래가능금액 		, mrg_able		, mrg_able			, double	, 20;
			전체거래가능금액 		, tot_able		, tot_able			, double	, 20;
			일반거래가능금액(환산)	, gen_able_setl	, gen_able_setl		, double	, 20;
			인버스거래가능금액(환산)	, mrg_able_setl	, mrg_able_setl		, double	, 20;
			전체거래가능금액(환산)	, tot_able_setl	, tot_able_setl		, double	, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
