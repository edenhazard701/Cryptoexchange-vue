BEGIN_FUNCTION_MAP
	.Func,(n0003)거래소코드정보 조회,n0003;
	BEGIN_DATA_MAP
		n0003In1,입력,input;
		begin
			조회구분       , i_qrydiv       , i_qrydiv       , char  ,  1;
		end
		n0003Out1,출력,output;
		begin
			출력개수       , out_cnt        , out_cnt        , char  ,  5;
		end
		n0003Out2,출력,output,occurs;
		begin
			거래소ID       , o_exch_id      , o_exch_id      , char  ,  3;
			거래소한글명   , o_exch_kor_nm  , o_exch_kor_nm  , char  , 50;
			거래소영문명   , o_exch_eng_nm  , o_exch_eng_nm  , char  , 50;
			국가코드       , o_ctry_cd      , o_ctry_cd      , char  ,  2;
			거래소상태구분 , o_exch_stat_tp , o_exch_stat_tp , char  ,  1;
			거래소개시일자 , o_exch_open_dt , o_exch_open_dt , char  ,  8;
			거래소해지일자 , o_exch_expr_dt , o_exch_expr_dt , char  ,  8;
		end
	END_DATA_MAP
END_FUNCTION_MAP
