BEGIN_FUNCTION_MAP
	.Func,(n0014)환율정보 저장/삭제,n0014;
	BEGIN_DATA_MAP
		n0014In1,입력,input;
		begin
			저장삭제구분     , i_save_del_div  , i_save_del_div  , char ,  1;
			통화코드         , i_cur_cd        , i_cur_cd        , char ,  5;
			통화한글명       , i_cur_kor_nm    , i_cur_kor_nm    , char , 30;
			통화영문명       , i_cur_eng_nm    , i_cur_eng_nm    , char , 30;
			단위명           , i_cur_unit_nm   , i_cur_unit_nm   , char , 10;
			소수점자릿수     , i_dec_digt      , i_dec_digt      , int  , 11;
			소수점표시자릿수 , i_dec_disp_digt , i_dec_disp_digt , int  , 11;
		end
		n0014Out1,출력,output;
		begin
			출력개수         , out_cnt         , out_cnt         , char ,  5;
		end
		n0014Out2,출력,output,occurs;
		begin
			통화코드         , o_cur_cd        , o_cur_cd        , char ,  5;
			통화한글명       , o_cur_kor_nm    , o_cur_kor_nm    , char , 30;
			통화영문명       , o_cur_eng_nm    , o_cur_eng_nm    , char , 30;
			단위명           , o_cur_unit_nm   , o_cur_unit_nm   , char , 10;
			소수점자릿수     , o_dec_digt      , o_dec_digt      , int  , 11;
			소수점표시자릿수 , o_dec_disp_digt , o_dec_disp_digt , int  , 11;
		end
	END_DATA_MAP
END_FUNCTION_MAP
