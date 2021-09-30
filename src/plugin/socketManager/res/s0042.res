BEGIN_FUNCTION_MAP
	.Func,(s0042)가상화폐 신규주문설정 조건 단건 조회,s0042,headtype=B;
	BEGIN_DATA_MAP
		s0042InBlock,입력,input;
		begin
			USER ID                     , user_id                   , user_id                   , char   , 10;
			단축코드                    , symbol                    , symbol                    , char   , 15;
			설정일자                    , est_dt                    , est_dt                    , char   ,  8;
			조건일련번호                , sq                        , sq                        , long   , 10;
			사용자구분                  , mbr_ccd                   , mbr_ccd                   , char   ,  2;
			매체구분                    , md_cd                     , md_cd                     , char   ,  3;
		end
		s0042OutBlock,출력,output;
		begin
			USER ID                     , user_id                   , user_id                   , char   , 10;
			단축코드                    , symbol                    , symbol                    , char   , 15;
			설정일자                    , est_dt                    , est_dt                    , char   ,  8;
			조건일련번호                , sq                        , sq                        , long   , 10;
			사용자구분                  , mbr_ccd                   , mbr_ccd                   , char   ,  2;
			매체구분                    , md_cd                     , md_cd                     , char   ,  3;
			이상시세감시설정여부        , up_qttn_cndt_est_f        , up_qttn_cndt_est_f        , char   ,  1;
			이상시세감시설정가격구분    , up_qttn_cndt_est_prc_clsf , up_qttn_cndt_est_prc_clsf , char   ,  1;
			이상시세감시설정값          , up_qttn_cndt_est_vl       , up_qttn_cndt_est_vl       , double , 20;
			이하시세감시설정여부        , dn_qttn_cndt_est_f        , dn_qttn_cndt_est_f        , char   ,  1;
			이하시세감시설정가격구분    , dn_qttn_cndt_est_prc_clsf , dn_qttn_cndt_est_prc_clsf , char   ,  1;
			이하시세감시설정값          , dn_qttn_cndt_est_vl       , dn_qttn_cndt_est_vl       , double , 20;
			전일감시설정여부            , bdy_cndt_est_f            , bdy_cndt_est_f            , char   ,  1;
			전일가격구분                , bdy_prc_clsf              , bdy_prc_clsf              , char   ,  1;
			전일감시설정값              , bdy_cndt_est_vl           , bdy_cndt_est_vl           , double , 20;
			전일감시조건설정단위        , bdy_cndt_unt_cd           , bdy_cndt_unt_cd           , char   ,  1;
			전일감시상승하락구분        , bdy_cndt_up_dwn_ccd       , bdy_cndt_up_dwn_ccd       , char   ,  1;
			TS시세감시설정여부          , t_s_qttn_cndt_est_f       , t_s_qttn_cndt_est_f       , char   ,  1;
			TS시세감시설정값            , t_s_qttn_cndt_est_vl      , t_s_qttn_cndt_est_vl      , double , 20;
			TS고점대비설정값            , t_s_hgh_mrk_cmpr_est_vl   , t_s_hgh_mrk_cmpr_est_vl   , double , 20;
			TS고점대비설정단위          , t_s_hgh_mrk_cmpr_est_unt  , t_s_hgh_mrk_cmpr_est_unt  , char   ,  1;
			주문가격설정구분            , ordr_prc_est_clsf         , ordr_prc_est_clsf         , char   ,  1;
			주문가격설정값              , ordr_prc_est_vl           , ordr_prc_est_vl           , double , 20;
			주문수량설정구분            , ordr_q_est_clsf           , ordr_q_est_clsf           , char   ,  1;
			주문수량설정값              , ordr_q_est_vl             , ordr_q_est_vl             , double , 20;
			호가분할주문여부            , prtn_ordr_f               , prtn_ordr_f               , char   ,  1;
			호가분할주문횟수            , prtn_ordr_tno             , prtn_ordr_tno             , int    ,  1;
			미체결자동정정설정여부      , at_crct_est_f             , at_crct_est_f             , char   ,  1;
			미체결자동정정대비설정틱    , at_crct_cmpr_est_vl       , at_crct_cmpr_est_vl       , int    ,  1;
			미체결자동정정설정틱        , at_crct_est_vl            , at_crct_est_vl            , int    ,  1;
			미체결자동정정횟수          , at_crct_tno               , at_crct_tno               , int    ,  1;
			매매구분                    , trd_ccd                   , trd_ccd                   , char   ,  1;
			주문조건구분코드            , ordr_cnd_dcd             , ordr_cnd_dcd               , char   ,  1;
			주문유형                    , ordr_typ_cd               , ordr_typ_cd               , char   ,  1;
			유효기간                    , end_dt                    , end_dt                    , char   ,  8;
			자동여부                    , at_mnl_ccd                , at_mnl_ccd                , char   ,  1;
			처리일시                    , st_upt_dy_tm              , st_upt_dy_tm              , char   , 16;
		end
	END_DATA_MAP
END_FUNCTION_MAP
