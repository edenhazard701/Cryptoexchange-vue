BEGIN_FUNCTION_MAP
.Func,(ac407)출금가능금액조회,ac407,headtype=A;
	BEGIN_DATA_MAP
	ac407In,입력,input;
	begin
		계정ID  	    	 		, user_id       , user_id           , long 		, 10;
		계좌구분    	       	 	, act_tp        , act_tp            , char		, 1;
		대상통화코드       			, trgt_cur_cd   , trgt_cur_cd       , char		, 5;
		요청건수            			, req_cnt       , req_cnt           , long		, 5;
	end
		ac407Out_c,출력공통,output;
		begin
			총합계잔고(환산)		, tot_bal		, tot_bal           , double	, 20;
			응답건수 				, rsp_cnt		, rsp_cnt           , long		, 5;
		end
		ac407Out,출력,output,occurs;
		begin
		           통화코드                     , cur_cd        , cur_cd            , char      , 5;
			일반거래가능금액 		, gen_able		, gen_able			, double	, 20;
			인버스거래가능금액 		, mrg_able		, mrg_able			, double	, 20;
			전체거래가능금액 		, tot_able		, tot_able			, double	, 20;
			일반거래가능금액(환산)	, gen_able_setl	, gen_able_setl		, double	, 20;
			인버스거래가능금액(환산)	, mrg_able_setl	, mrg_able_setl		, double	, 20;
			전체거래가능금액(환산)	, tot_able_setl	, tot_able_setl		, double	, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
