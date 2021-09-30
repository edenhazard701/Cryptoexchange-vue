BEGIN_FUNCTION_MAP
	.Func,(n1002)대상/결제통화코드 조회,n1002,headtype=B;
	BEGIN_DATA_MAP
		n1002In1,입력,input;
		begin
			조회구분                 , i_qrydiv             , i_qrydiv             , char   ,   1;
		end
		n1002Out1,출력,output;
		begin
			출력개수                 , out_cnt              , out_cnt              , char   ,   5;
		end
		n1002Out2,출력,output,occurs;
		begin
			통화코드(전체)           , o_tot_cur_cd         , o_tot_cur_cd         , char   ,  30;
			대상통화코드(30자리)     , o_trgt_cur_cd        , o_trgt_cur_cd        , char   ,  30;
			결제통화코드(30자리)     , o_setl_cur_cd        , o_setl_cur_cd        , char   ,  30;
			통화한글명               , o_cur_kor_nm         , o_cur_kor_nm         , char   ,  50;
			통화영문명               , o_cur_eng_nm         , o_cur_eng_nm         , char   ,  50;
			Cfiller                  , Cfiller              , Cfiller              , char   , 100;
			Dfiller                  , Dfiller              , Dfiiler              , double ,  20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
