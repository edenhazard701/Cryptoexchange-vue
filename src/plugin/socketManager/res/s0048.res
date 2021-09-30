BEGIN_FUNCTION_MAP
	.Func,(s0048)가상화폐 미체결자동정정  조건리스트 조회,s0048,headtype=B;
	BEGIN_DATA_MAP
		s0048InBlock,입력,input;
		begin
			USER ID                  , user_id             , user_id            ,    char  , 10;
			사용자구분               , mbr_ccd             , mbr_ccd            ,    char  ,  2;
			매체구분                 , md_cd               , md_cd              ,    char  ,  3;
		end
		s0048OutBlock1,출력,output;
		begin
			츨력개수                 , out_cnt             , out_cnt            ,    char  ,  5;
		end
		s0048OutBlock2,출력,output,occurs;
		begin
			USER ID                  , user_id             , user_id            ,    char  , 10;
			설정일자                 , est_dt              , est_dt             ,    char  ,  8;
			조건일련번호             , sq                  , sq                 ,    long  , 10;
			종목코드                 , symbol              , symbol             ,    char  , 15;
			종목구분                 , is_ccd              , is_ccd             ,    char  ,  1;
			조건설정일시             , cndt_est_dy_tm      , cndt_est_dy_tm     ,    char  , 16;
			주문번호(원조건)         , ordr_no             , ordr_no            ,    long  , 10;
			주문일련번호             , ordr_sq             , ordr_sq            ,    long  , 10;
			주문조건구분코드         , ordr_cnd_dcd        , ordr_cnd_dcd       ,    char  ,  1;
			주문접수가격             , acpt_prc            , acpt_prc           ,    double, 20;
			매매구분                 , trd_ccd             , trd_ccd            ,    char  ,  1;
			미체결 자동정정대비설정틱, at_crct_cmpr_est_vl , at_crct_cmpr_est_vl,    int   ,  1;
			미체결 자동정정설정틱    , at_crct_est_vl      , at_crct_est_vl     ,    int   ,  1;
			미체결 자동정정횟수      , at_crct_tno         , at_crct_tno        ,    int   ,  1;
			주문상태                 , ordr_hndl_f         , ordr_hndl_f        ,    char  ,  1;
			주문상태 처리값          , ordr_status         , ordr_status        ,    char  ,  2;
			처리일시                 , proc_date           , proc_date          ,    char  , 14;
			매체구분                 , md_cd               , md_cd              ,    char  ,  3;
		end
	END_DATA_MAP
END_FUNCTION_MAP
