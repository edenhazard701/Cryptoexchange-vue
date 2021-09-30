BEGIN_FUNCTION_MAP
	.Func,(s0027)가상화폐 서버자동주문 신규주문설정 수동주문,s0027,headtype=B;
	BEGIN_DATA_MAP
		s0027InBlock,입력,input;
		begin
			USER ID             , user_id           , user_id        ,   char  ,   10;
			SYMBOL              , symbol            , symbol         ,   char  ,   15;
			설정일자            , est_dt            , est_dt         ,   char  ,    8;
			조건일련번호        , sq                , sq             ,   long  ,   10;
			사용자구분          , mbr_ccd           , mbr_ccd        ,   char  ,    2;
			매체구분            , md_cd             , md_cd          ,   char  ,    3;
		end
		s0027OutBlock,출력,output;
		begin
			USER ID             , user_id           , user_id        ,   char  ,   10;
			SYMBOL              , symbol            , symbol         ,   char  ,   15;
			설정일자            , est_dt            , est_dt         ,   char  ,    8;
			조건일련번호        , sq                , sq             ,   long  ,   10;
			매체구분            , md_cd             , md_cd          ,   char  ,    3;
			처리결과구분        , rslt_clsf         , rslt_clsf      ,   char  ,    4;
		end
	END_DATA_MAP
END_FUNCTION_MAP
