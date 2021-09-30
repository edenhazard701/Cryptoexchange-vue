BEGIN_FUNCTION_MAP
	.Func,(s0010)가상화폐 잔고신규편입 주문설정 감시 실행,s0010,headtype=B;
	BEGIN_DATA_MAP
		s0010InBlock,입력,input;
		begin
			USER ID             , user_id            , user_id      ,     char   ,   10;
			설정일자            , est_dt             , est_dt       ,     char   ,    8;
			단축코드            , symbol             , symbol       ,     char   ,   15;
			사용자구분          , mbr_ccd            , mbr_ccd      ,     char   ,    2;
			매체구분            , md_cd              , md_cd        ,     char   ,    3;
		end
		s0010OutBlock,출력,output;
		begin
			USER ID             , user_id            , user_id      ,     char    ,  10;
			단축코드            , symbol             , symbol       ,     char    ,  15;
			설정일자            , est_dt             , est_dt       ,     char    ,   8;
			매체구분            , md_cd              , md_cd        ,     char    ,   3;
			처리결과구분        , rslt_clsf          , rslt_clsf    ,     char    ,   4;
		end
	END_DATA_MAP
END_FUNCTION_MAP
