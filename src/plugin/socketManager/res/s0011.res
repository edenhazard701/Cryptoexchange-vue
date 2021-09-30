BEGIN_FUNCTION_MAP
	.Func,(s0011)가상화폐 잔고신규편입 주문설정 전체감시 실행,s0011,headtype=B;
	BEGIN_DATA_MAP
		s0011InBlock,입력,input;
		begin
			USER ID             , user_id            , user_id      ,     char   ,   10;
			사용자구분          , mbr_ccd            , mbr_ccd      ,     char   ,    2;
			매체구분            , md_cd              , md_cd        ,     char   ,    3;
		end
		s0011OutBlock,출력,output;
		begin
			USER ID             , user_id            , user_id      ,     char   ,   10;
			매체구분            , md_cd              , md_cd        ,     char   ,    3;
			처리결과구분        , rslt_clsf          , rslt_clsf    ,     char   ,    4;
		end
	END_DATA_MAP
END_FUNCTION_MAP
