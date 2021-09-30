BEGIN_FUNCTION_MAP
	.Func,(n0012)거래소코드정보 저장/삭제,n0012;
	BEGIN_DATA_MAP
		n0012In1,입력,input;
		begin
			저장삭제구분   , i_save_del_div , i_save_del_div , char ,  1;
			거래소ID       , i_exch_id      , i_exch_id      , char ,  3;
			거래소한글명   , i_exch_kor_nm  , i_exch_kor_nm  , char , 50;
			거래소영문명   , i_exch_eng_nm  , i_exch_eng_nm  , char , 50;
			국가코드       , i_ctry_cd      , i_ctry_cd      , char ,  2;
			거래소상태구분 , i_exch_stat_tp , i_exch_stat_tp , char ,  1;
			거래소개시일자 , i_exch_open_dt , i_exch_open_dt , char ,  8;
			거래소해지일자 , i_exch_expr_dt , i_exch_expr_dt , char ,  8;
		end
		n0012Out1,출력,output;
		begin
			출력개수       , out_cnt        , out_cnt        , char ,  5;
		end
		n0012Out2,출력,output,occurs;
		begin
			거래소ID       , o_exch_id      , o_exch_id      , char ,  3;
			거래소한글명   , o_exch_kor_nm  , o_exch_kor_nm  , char , 50;
			거래소영문명   , o_exch_eng_nm  , o_exch_eng_nm  , char , 50;
			국가코드       , o_ctry_cd      , o_ctry_cd      , char ,  2;
			거래소상태구분 , o_exch_stat_tp , o_exch_stat_tp , char ,  1;
			거래소개시일자 , o_exch_open_dt , o_exch_open_dt , char ,  8;
			거래소해지일자 , o_exch_expr_dt , o_exch_expr_dt , char ,  8;
		end
	END_DATA_MAP
END_FUNCTION_MAP
