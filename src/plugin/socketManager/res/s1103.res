BEGIN_FUNCTION_MAP
	.Func,(s1103)가상화폐 서버자동주문 신규조건감시 주문설정 조회,s1103,headtype=B;
	BEGIN_DATA_MAP
		s1103In1,입력,input;
		begin
			유저ID                        , user_id                   , user_id                   , char  ,   10;
			설정일자                      , est_dt                    , est_dt                    , char  ,    8;
			조건일련번호                  , sq                        , sq                        , long  ,   10;
			조건설정일시                  , cndt_est_dy_tm            , cndt_est_dy_tm            , char  ,   16;
		end
		s1103Out1,출력,output;
		begin
			유저ID                        , user_id                   , user_id                   , char  ,   10;
			설정일자                      , est_dt                    , est_dt                    , char  ,    8;
			조건일련번호                  , sq                        , sq                        , long  ,   10;
			조건설정일시                  , cndt_est_dy_tm            , cndt_est_dy_tm            , char  ,   16;
			상태변경일시                  , st_upt_dy_tm              , st_upt_dy_tm              , char  ,   16;
			모조건일련번호                , mthr_sq                   , mthr_sq                   , long  ,   10;
			원조건일련번호                , orgn_sq                   , orgn_sq                   , long  ,   10;
			시작일자                      , st_dt                     , st_dt                     , char  ,    8;
			종료일자                      , end_dt                    , end_dt                    , char  ,    8;
			조건설정유형                  , est_typ_cd                , est_typ_cd                , char  ,    2;
			자동여부                      , at_mnl_ccd                , at_mnl_ccd                , char  ,    1;
			연속조건처리FLag              , ctnu_f                    , ctnu_f                    , char  ,    1;
			조건상태                      , hndl_st_vl                , hndl_st_vl                , char  ,    4;
			조건 삭제 Flag                , dlt_f                     , dlt_f                     , char  ,    1;
			사용자구분                    , mbr_ccd                   , mbr_ccd                   , char  ,    2;
			IP ADDRESS                    , ip                        , ip                        , char  ,   12;
			단말MAC주소                   , tmnl_mac_addr             , tmnl_mac_addr             , char  ,   12;
			매체구분                      , md_cd                     , md_cd                     , char  ,    3;
			종목명                        , is_nm                     , is_nm                     , char  ,   50;
			종목코드                      , symbol                    , symbol                    , char  ,   15;
			종목구분                      , is_ccd                    , is_ccd                    , char  ,    1;
			이하시세감시조건설정여부      , dn_qttn_cndt_est_f        , dn_qttn_cndt_est_f        , char  ,    1;
			이하시세감시조건설정가격구분  , dn_qttn_cndt_est_prc_clsf , dn_qttn_cndt_est_prc_clsf , char  ,    1;
			이하시세감시설정값            , dn_qttn_cndt_est_vl       , dn_qttn_cndt_est_vl       , double, 20.8;
			이하시세감시목표가            , dn_qttn_cndt_gl_prc       , dn_qttn_cndt_gl_prc       , double, 20.8;
			이상시세감시조건설정여부      , up_qttn_cndt_est_f        , up_qttn_cndt_est_f        , char  ,    1;
			이상시세감시조건설정가격구분  , up_qttn_cndt_est_prc_clsf , up_qttn_cndt_est_prc_clsf , char  ,    1;
			이상시세감시설정값            , up_qttn_cndt_est_vl       , up_qttn_cndt_est_vl       , double, 20.8;
			이상시세감시목표가            , up_qttn_cndt_gl_prc       , up_qttn_cndt_gl_prc       , double, 20.8;
			전일감시설정여부              , bdy_cndt_est_f            , bdy_cndt_est_f            , char  ,    1;
			전일가격구분                  , bdy_prc_clsf              , bdy_prc_clsf              , char  ,    1;
			전일감시설정값                , bdy_cndt_est_vl           , bdy_cndt_est_vl           , double, 20.8;
			전일감시목표값                , bdy_cndt_gl_vl            , bdy_cndt_gl_vl            , double, 20.8;
			전일감시조건설정단위          , bdy_cndt_unt_cd           , bdy_cndt_unt_cd           , char  ,    1;
			전일감시상승하락구분          , bdy_cndt_up_dwn_ccd       , bdy_cndt_up_dwn_ccd       , char  ,    1;
			TS시세감시설정여부            , t_s_qttn_cndt_est_f       , t_s_qttn_cndt_est_f       , char  ,    1;
			TS시세감시설정값              , t_s_qttn_cndt_est_vl      , t_s_qttn_cndt_est_vl      , double, 20.8;
			TS고점대비설정값              , t_s_hgh_mrk_cmpr_est_vl   , t_s_hgh_mrk_cmpr_est_vl   , double, 20.8;
			TS고점대비설정단위            , t_s_hgh_mrk_cmpr_est_unt  , t_s_hgh_mrk_cmpr_est_unt  , char  ,    1;
			TS시세감시목표값              , t_s_qttn_cndt_gl_vl       , t_s_qttn_cndt_gl_vl       , double, 20.8;
			고점가격                      , hgh_mrk_prc               , hgh_mrk_prc               , double, 20.8;
			호가분할주문여부              , prtn_ordr_f               , prtn_ordr_f               , char  ,    1;
			호가분할주문횟수              , prtn_ordr_tno             , prtn_ordr_tno             , long  ,    4;
			미체결 자동정정설정여부       , at_crct_est_f             , at_crct_est_f             , char  ,    1;
			미체결 자동정정대비설정틱     , at_crct_cmpr_est_vl       , at_crct_cmpr_est_vl       , long  ,    4;
			미체결 자동정정설정틱         , at_crct_est_vl            , at_crct_est_vl            , long  ,    4;
			미체결 자동정정횟수           , at_crct_tno               , at_crct_tno               , long  ,    4;
			매매구분                      , trd_ccd                   , trd_ccd                   , char  ,    1;
			주문유형                      , ordr_typ_cd               , ordr_typ_cd               , char  ,    1;
			주문조건구분코드              , ordr_cnd_dcd              , ordr_cnd_dcd              , char  ,    1;
			주문가격설정구분              , ordr_prc_est_clsf         , ordr_prc_est_clsf         , char  ,    1;
			주문가격설정값                , ordr_prc_est_vl           , ordr_prc_est_vl           , double, 20.8;
			주문가격                      , ordr_prc                  , ordr_prc                  , double, 20.8;
			주문수량설정구분              , ordr_q_est_clsf           , ordr_q_est_clsf           , char  ,    1;
			주문수량설정값                , ordr_q_est_vl             , ordr_q_est_vl             , double, 20.8;
			주문수량(전체주문수량)        , ordr_q                    , ordr_q                    , double, 20.8;
			미체결수량                    , nccls_q                   , nccls_q                   , double, 20.8;
			체결수량                      , ccls_q                    , ccls_q                    , double, 20.8;
			정정수량                      , crct_q                    , crct_q                    , double, 20.8;
			취소수량                      , cncl_q                    , cncl_q                    , double, 20.8;
			Order Status Flag             , ordr_hndl_f               , ordr_hndl_f               , char  ,    1;
			주문처리상태값                , ordr_status               , ordr_status               , char  ,    4;
		end
	END_DATA_MAP
END_FUNCTION_MAP
