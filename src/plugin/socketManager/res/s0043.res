BEGIN_FUNCTION_MAP
	.Func,(s0043)가상화폐 신규주문설정 조건리스트 조회,s0043,headtype=B;
	BEGIN_DATA_MAP
		s0043InBlock,입력,input;
		begin
			USER ID             , user_id         , user_id       ,    char     ,  10;
			사용자구분          , mbr_ccd         , mbr_ccd       ,    char     ,   2;
			매체구분            , md_cd           , md_cd         ,    char     ,   3;
			조건상태            , status          , status        ,    char     ,   1;
		end
		s0043OutBlock1,출력,output;
		begin
			츨력개수            , out_cnt         , out_cnt       , char        ,   5;
		end
		s0043OutBlock2,출력,output,occurs;
		begin
			USER ID             , user_id         , user_id        ,    char     , 10;
			단축코드            , symbol          , symbol         ,    char     , 15;
			설정일자            , est_dt          , est_dt         ,    char     ,  8;
			조건일련번호        , sq              , sq             ,    long     , 10;
			조건상태            , hndl_st_vl      , hndl_st_vl     ,    char     ,  1;
			종목명              , is_nm           , is_nm          ,    char     , 50;
			매매구분            , trd_ccd         , trd_ccd        ,    char     ,  1;
			자동여부            , at_mnl_ccd      , at_mnl_ccd     ,    char     ,  1;
			주문유형            , ordr_typ_cd     , ordr_typ_cd    ,    char     ,  1;
			주문조건구분코드    , ordr_cnd_dcd    , ordr_cnd_dcd   ,    char     ,  1;
			매매구분상세        , trd_ccd_msg     , trd_ccd_msg    ,    char     , 16;
			현재가              , now_prc         , now_prc        ,    char     , 20;
			주문유형            , ordr_typ_cd_msg , ordr_typ_cd_msg,    char     , 20;
			조건설정            , cond_set        , cond_set       ,    char     , 60;
			조건설정상세        , cond_set_msg    , cond_set_msg   ,    char     ,200;
			주문가격            , ordr_prc        , ordr_prc       ,    char     , 40;
			주문수량            , ordr_q          , ordr_q         ,    char     , 40;
			유효기간            , end_dt          , end_dt         ,    char     ,  8;
			호가분할            , prtn_ordr_f     , prtn_ordr_f    ,    char     , 50;
			미체결 자동정정     , at_crct_est_f   , at_crct_est_f  ,    char     , 40;
			처리상태            , status          , status         ,    char     , 20;
			매체구분            , md_cd           , md_cd          ,    char     ,  3;
			처리일시            , proc_date       , proc_date      ,    char     , 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
