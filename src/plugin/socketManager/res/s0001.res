BEGIN_FUNCTION_MAP
    .Func,(s0001)가상화폐 잔고청산주문설정 조건 저장,s0001,headtype=B;
    BEGIN_DATA_MAP
        s0001InBlock,입력,input;
        begin
			유저ID                  , user_id                   , user_id                    , char   ,   10;
			설정일자                , est_dt                    , est_dt                     , char   ,    8;
			조건일련번호            , sq                        , sq                         , long   ,   10;
			단축코드                , symbol                    , symbol                     , char   ,   15;
			종료일자                , end_dt                    , end_dt                     , char   ,    8;
			자동여부                , at_mnl_ccd                , at_mnl_ccd                 , char   ,    1;
			사용자구분              , mbr_ccd                   , mbr_ccd                    , char   ,    2;
			IP ADDRESS              , ip                        , ip                         , char   ,   23;
			단말MAC주소             , tmnl_mac_addr             , tmnl_mac_addr              , char   ,   12;
			매체구분                , md_cd                     , md_cd                      , char   ,    3;
			손실제한설정여부        , lss_rstn_est_f            , lss_rstn_est_f             , char   ,    1;
			손실제한설정가격구분    , lss_rstn_est_prc_clsf     , lss_rstn_est_prc_clsf      , char   ,    1;
			손실제한설정단위        , lss_rstn_est_unt          , lss_rstn_est_unt           , char   ,    1;
			손실제한설정값          , lss_rstn_est_vl           , lss_rstn_est_vl            , double ,   20;
			이익실현설정여부        , prft_rstn_est_f           , prft_rstn_est_f            , char   ,    1;
			이익실현설정가격구분    , prft_rstn_est_prc_clsf    , prft_rstn_est_prc_clsf     , char   ,    1;
			이익실현설정단위        , prft_rstn_est_unt         , prft_rstn_est_unt          , char   ,    1;
			이익실현설정값          , prft_rstn_est_vl          , prft_rstn_est_vl           , double ,   20;
			TS이익실현설정여부      , t_s_prft_rstn_est_f       , t_s_prft_rstn_est_f        , char   ,    1;
			TS이익실현설정가격구분  , t_s_prft_rstn_est_prc_clsf, t_s_prft_rstn_est_prc_clsf , char   ,    1;
			TS이익실현설정단위      , t_s_prft_rstn_est_unt     , t_s_prft_rstn_est_unt      , char   ,    1;
			TS이익실현설정값        , t_s_prft_rstn_est_vl      , t_s_prft_rstn_est_vl       , double ,   20;
			TS고점대비설정단위      , t_s_hgh_mrk_cmpr_est_unt  , t_s_hgh_mrk_cmpr_est_unt   , char   ,    1;
			TS고점대비설정값        , t_s_hgh_mrk_cmpr_est_vl   , t_s_hgh_mrk_cmpr_est_vl    , double ,   20;
			매매구분                , trd_ccd                   , trd_ccd                    , char   ,    1;
			주문조건구분코드        , ordr_cnd_dcd              , ordr_cnd_dcd               , char   ,    1;
			주문유형                , ordr_typ_cd               , ordr_typ_cd                , char   ,    1;
			주문가격설정구분        , ordr_prc_est_clsf         , ordr_prc_est_clsf          , char   ,    1;
			주문가격설정값          , ordr_prc_est_vl           , ordr_prc_est_vl            , double ,   20;
			주문수량설정구분        , ordr_q_est_clsf           , ordr_q_est_clsf            , char   ,    1;
			주문수량설정값          , ordr_q_est_vl             , ordr_q_est_vl              , double ,   20;
			호가분할주문여부        , prtn_ordr_f               , prtn_ordr_f                , char   ,    1;
			호가분할주문횟수        , prtn_ordr_tno             , prtn_ordr_tno              , int    ,    1;
			미체결자동정정설정여부  , at_crct_est_f             , at_crct_est_f              , char   ,    1;
			미체결자동정정대비설정틱, at_crct_cmpr_est_vl       , at_crct_cmpr_est_vl        , int    ,    1;
			미체결자동정정설정틱    , at_crct_est_vl            , at_crct_est_vl             , int    ,    1;
			미체결자동정정횟수      , at_crct_tno               , at_crct_tno                , int    ,    1;
			처리구분                , proc_sec                  , proc_sec                   , char   ,    1;
        end
        s0001OutBlock,출력,output;
        begin
			유저ID                  , user_id                   , user_id                    , char   ,   10;
			단축코드                , symbol                    , symbol                     , char   ,   15;
			설정일자                , est_dt                    , est_dt                     , char   ,    8;
			조건일련번호            , sq                        , sq                         , long   ,   10;
			매체구분                , md_cd                     , md_cd                      , char   ,    3;
			처리결과구분            , rslt_clsf                 , rslt_clsf                  , char   ,    4;
        end
    END_DATA_MAP
END_FUNCTION_MAP
