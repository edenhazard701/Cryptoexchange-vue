BEGIN_FUNCTION_MAP
	.Func,(n1001)BITHUMB 종목정보 조회,n1001,headtype=B;
	BEGIN_DATA_MAP
		n1001In1,입력,input;
		begin
			조회구분                 , i_qrydiv             , i_qrydiv             , char   ,   1;
			종목코드                 , i_symbol             , i_symbol             , char   ,  15;
		end
		n1001Out1,출력,output;
		begin
			출력개수                 , out_cnt              , out_cnt              , char   ,   5;
		end
		n1001Out2,출력,output,occurs;
		begin
			종목코드                 , o_symbol             , o_symbol             , char   ,  15;
			수신일자                 , o_recv_dt            , o_recv_dt            , char   ,  20;
			종목한글명               , o_inst_kor_nm        , o_inst_kor_nm        , char   ,  50;
			종목영문명               , o_inst_eng_nm        , o_inst_eng_nm        , char   ,  50;
			종목한글약어             , o_inst_kor_abbr      , o_inst_kor_abbr      , char   ,  40;
			종목영문약어             , o_inst_eng_abbr      , o_inst_eng_abbr      , char   ,  40;
			대상통화코드(30자리)     , o_trgt_cur_cd_n      , o_trgt_cur_cd_n      , char   ,  30;
			결제통화코드(30자리)     , o_setl_cur_cd_n      , o_setl_cur_cd_n      , char   ,  30;
			최소주문수량             , o_min_ord_qty        , o_min_ord_qty        , double ,  10;
			주문단위수량             , o_ord_unit_qty       , o_ord_unit_qty       , double ,  10;
			거래소상장구분           , o_exch_list_tp       , o_exch_list_tp       , char   ,   1;
			거래소상장일시           , o_exch_list_dtm      , o_exch_list_dtm      , char   ,  14;
			거래소상장폐지일시       , o_exch_dlist_dtm     , o_exch_dlist_dtm     , char   ,  14;
			대상통화소수점자리수     , o_trgt_dec_digt      , o_trgt_dec_digt      , long   ,   2;
			결제통화소수점자리수     , o_setl_dec_digt      , o_setl_dec_digt      , long   ,   2;
			대상통화소수점표시자리수 , o_trgt_dec_disp_digt , o_trgt_dec_disp_digt , long   ,   2;
			결제통화소수점표시자리수 , o_setl_dec_disp_digt , o_setl_dec_disp_digt , long   ,   2;
			거래소ID                 , o_exch_id            , o_exch_id            , char   ,   3;
			거래소한글명             , o_exch_kor_nm        , o_exch_kor_nm        , char   ,  50;
			거래소영문명             , o_exch_eng_nm        , o_exch_eng_nm        , char   ,  50;
			국가코드                 , o_ctry_cd            , o_ctry_cd            , char   ,   2;
			거래소상태구분           , o_exch_stat_tp       , o_exch_stat_tp       , char   ,   1;	
			Cfiller                  , Cfiller              , Cfiller              , char   , 100;
			Dfiller                  , Dfiller              , Dfiller              , double ,  20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
