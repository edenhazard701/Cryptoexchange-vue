BEGIN_FUNCTION_MAP
	.Func,(n0011)기타거래소 종목정보 저장/삭제,n0011;
	BEGIN_DATA_MAP
		n0011In1,입력,input;
		begin
			저장삭제구분             , i_save_del_div       , i_save_del_div       , char   ,  1;
			거래소ID                 , i_exch_id            , i_exch_id            , char   ,  3;
			종목코드                 , i_symbol             , i_symbol             , char   , 15;
			종목한글명               , i_inst_kor_nm        , i_inst_kor_nm        , char   , 50;
			종목영문명               , i_inst_eng_nm        , i_inst_eng_nm        , char   , 50;
			종목한글약어             , i_inst_kor_abbr      , i_inst_kor_abbr      , char   , 40;
			종목영문약어             , i_inst_eng_abbr      , i_inst_eng_abbr      , char   , 40;
			대상통화코드             , i_trgt_cur_cd        , i_trgt_cur_cd        , char   ,  5;
			결제통화코드             , i_setl_cur_cd        , i_setl_cur_cd        , char   ,  5;
			최소주문수량             , i_min_ord_qty        , i_min_ord_qty        , double , 10;
			주문단위수량             , i_ord_unit_qty       , i_ord_unit_qty       , double , 10;
			거래소상장구분           , i_exch_list_tp       , i_exch_list_tp       , char   ,  1;
			거래소상장일시           , i_exch_list_dt       , i_exch_list_dt       , char   , 14;
			거래소상장폐지일시       , i_exch_dlist_dt      , i_exch_dlist_dt      , char   , 14;
			대상통화소수점자리수     , i_trgt_dec_digt      , i_trgt_dec_digt      , long   ,  2;
			결제통화소수점자리수     , i_setl_dec_digt      , i_setl_dec_digt      , long   ,  2;
			결제통화소수점표시자리수 , i_trgt_dec_disp_digt , i_trgt_dec_disp_digt , long   ,  2;
			결제통화소수점표시자리수 , i_setl_dec_disp_digt , i_setl_dec_disp_digt , long   ,  2;
			거래소체결구분           , i_exch_cntr_tp       , i_exch_cntr_tp       , char   ,  1;
			종목상태구분             , i_inst_stat_tp       , i_inst_stat_tp       , char   ,  1;
			마진거래가능구분         , i_mrgn_trd_able_tp   , i_mrgn_trd_able_tp   , char   ,  1;
			Section ID               , i_mt_sect_id         , i_mt_sect_id         , char   , 20;
		end
		n0011Out1,출력,output;
		begin
			출력개수                 , out_cnt              , out_cnt              , char   ,  5;
		end
		n0011Out2,출력,output,occurs;
		begin
			거래소ID                 , o_exch_id            , o_exch_id            , char   ,  3;
			종목코드                 , o_symbol             , o_symbol             , char   , 15;
			종목한글명               , o_inst_kor_nm        , o_inst_kor_nm        , char   , 50;
			종목영문명               , o_inst_eng_nm        , o_inst_eng_nm        , char   , 50;
			종목한글약어             , o_inst_kor_abbr      , o_inst_kor_abbr      , char   , 40;
			종목영문약어             , o_inst_eng_abbr      , o_inst_eng_abbr      , char   , 40;
			대상통화코드             , o_trgt_cur_cd        , o_trgt_cur_cd        , char   ,  5;
			결제통화코드             , o_setl_cur_cd        , o_setl_cur_cd        , char   ,  5;
			최소주문수량             , o_min_ord_qty        , o_min_ord_qty        , double , 10;
			주문단위수량             , o_ord_unit_qty       , o_ord_unit_qty       , double , 10;
			거래소상장구분           , o_exch_list_tp       , o_exch_list_tp       , char   ,  1;
			거래소상장일시           , o_exch_list_dt       , o_exch_list_dt       , char   , 14;
			거래소상장폐지일시       , o_exch_dlist_dt      , o_exch_dlist_dt      , char   , 14;
			대상통화소수점자리수     , o_trgt_dec_digt      , o_trgt_dec_digt      , long   ,  2;
			결제통화소수점자리수     , o_setl_dec_digt      , o_setl_dec_digt      , long   ,  2;
			결제통화소수점표시자리수 , o_trgt_dec_disp_digt , o_trgt_dec_disp_digt , long   ,  2;
			결제통화소수점표시자리수 , o_setl_dec_disp_digt , o_setl_dec_disp_digt , long   ,  2;
			거래소체결구분           , o_exch_cntr_tp       , o_exch_cntr_tp       , char   ,  1;
			종목상태구분             , o_inst_stat_tp       , o_inst_stat_tp       , char   ,  1;
			마진거래가능구분         , o_mrgn_trd_able_tp   , o_mrgn_trd_able_tp   , char   ,  1;
			Section ID               , o_mt_sect_id         , o_mt_sect_id         , char   , 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
