BEGIN_FUNCTION_MAP
	.Func,(s0046)가상화폐 서버자동주문 주문내역 조회,s0046,headtype=B;
	BEGIN_DATA_MAP
		s0046InBlock,입력,input;
		begin
			USER ID               ,    user_id         ,    user_id          ,  char  ,  10;
			매매구분              ,    trd_ccd         ,    trd_ccd          ,  char  ,   1;
			조회일자FROM          ,    from_dt         ,    from_dt          ,  char  ,   8;
			조회일자TO            ,    end_dt          ,    end_dt           ,  char  ,   8;
			사용자구분            ,    mbr_ccd         ,    mbr_ccd          ,  char  ,   2;
			매체구분              ,    md_cd           ,    md_cd            ,  char  ,   3;
			조회건수              ,    count           ,    count            ,  char  ,   3;
		end
		s0046OutBlock1,출력,output;
		begin
			츨력개수              , out_cnt            , out_cnt             , char   ,   5;
		end
		s0046OutBlock2,출력,output,occurs;
		begin
			USER ID               ,    user_id         ,    user_id          ,  char  ,  10;
			단축코드              ,    symbol          ,    symbol           ,  char  ,  15;
			설정일자              ,    est_dt          ,    est_dt           ,  char  ,   8;
			조건일련번호          ,    sq              ,    sq               ,  long  ,  10;
			주문일자              ,    ordr_dt         ,    ordr_dt          ,  char  ,   8;
			주문시간              ,    ordr_tm         ,    ordr_tm          ,  char  ,   8;
			주문번호              ,    ordr_no         ,    ordr_no          ,  long  ,  10;
			종목명                ,    is_nm           ,    is_nm            ,  char  ,  50;
			매매구분              ,    trd_ccd         ,    trd_ccd          ,  char  ,  20;
			주문유형              ,    ordr_typ_cd     ,    ordr_typ_cd      ,  char  ,  22;
			주문수량              ,    ordr_q          ,    ordr_q           ,  double,  20;
			주문가격              ,    ordr_prc        ,    ordr_prc         ,  char  ,  20;
			체결수량              ,    ccls_q          ,    ccls_q           ,  double,  20;
			체결가격              ,    ccls_prc        ,    ccls_prc         ,  double,  20;
			처리내용              ,    ordr_prc_stts   ,    ordr_prc_stts    ,  char  ,   8;
			주문거부사유          ,    rfsl_msg        ,    rfsl_msg         ,  char  , 100;
			유효기간              ,    end_dt          ,    end_dt           ,  char  ,   8;
			설정구분              ,    est_typ_cd      ,    est_typ_cd       ,  char  ,   2;
			설정명                ,    est_typ_cd_nm   ,    est_typ_cd_nm    ,  char  ,   8;
			매체구분              ,    md_cd           ,    md_cd            ,  char  ,   3;
		end
	END_DATA_MAP
END_FUNCTION_MAP
