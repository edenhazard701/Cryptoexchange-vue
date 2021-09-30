BEGIN_FUNCTION_MAP
	.Func,(s0014)가상화폐 잔고청산주문설정 종목별 신규편입조건 전체삭제,s0014,headtype=B;
	BEGIN_DATA_MAP
		s0014InBlock,입력,input;
		begin
			USER ID             , user_id       , user_id     ,    char         , 10;
			사용자구분          , mbr_ccd       , mbr_ccd     ,    char         ,  2;
			매체구분            , md_cd         , md_cd       ,    char         ,  3;
		end
		s0014OutBlock,출력,output;
		begin
			USER ID             , user_id       , user_id     ,    char         , 10;
			매체구분            , md_cd         , md_cd       ,    char         ,  3;
			처리결과구분        , rslt_clsf     , rslt_clsf   ,    char         ,  4;

		end
	END_DATA_MAP
END_FUNCTION_MAP
