BEGIN_FUNCTION_MAP
	.Func,(s0045)가상화폐 잔고청산주문설정 감시 실행,s0045,headtype=B;
	BEGIN_DATA_MAP
		s0045InBlock,입력,input;
		begin
			USER ID              , user_id                  , user_id                  , char ,   10;
			사용자구분           , mbr_ccd                  , mbr_ccd                  , char ,    2;
			매체구분             , md_cd                    , md_cd                    , char ,    3;
		end
		s0045OutBlock1,출력,output;
		begin
			츨력개수             , out_cnt                  , out_cnt                  , char ,    5;
		end
		s0045OutBlock2,출력,output,occurs;
		begin
			USER ID              , user_id                  , user_id                  , char ,   10;
			단축코드             , symbol                   , symbol                   , char ,   15;
			설정일자             , est_dt                   , est_dt                   , char ,    8;
			조건상태             , hndl_st_vl               , hndl_st_vl               , char ,    1;
			종목명               , is_nm                    , is_nm                    , char ,   50;
			매매구분             , trd_ccd                  , trd_ccd                  , char ,    1;
			자동여부             , at_mnl_ccd               , at_mnl_ccd               , char ,    1;
			주문유형             , ordr_typ_cd              , ordr_typ_cd              , char ,    1;
			주문조건구분코드     , ordr_cnd_dcd             , ordr_cnd_dcd             , char ,    1;
			주문수량             , ordr_q                   , ordr_q                   , char ,   40;
			주문가격             , ordr_prc                 , ordr_prc                 , char ,   40;
			손실제한설정         , lss_rstn_est_f           , lss_rstn_est_f           , char ,   40;
			이익실현설정         , prft_rstn_est_f          , prft_rstn_est_f          , char ,   40;
			TS이익실현설정       , t_s_prft_rstn_est_f      , t_s_prft_rstn_est_f      , char ,   40;
			유효기간             , end_dt                   , end_dt                   , char ,    8;
			호가분할조건설정     , prtn_ordr_f              , prtn_ordr_f              , char ,   50;
			미체결자동정정설정   , at_crct_est_f            , at_crct_est_f            , char ,   40;
			처리상태             , status                   , status                   , char ,   20;
			매체구분             , md_cd                    , md_cd                    , char ,    3;
		end
	END_DATA_MAP
END_FUNCTION_MAP
