BEGIN_FUNCTION_MAP
	.Func,(n0004)국가정보 조회,n0004;
	BEGIN_DATA_MAP
		n0004In1,입력,input;
		begin
			조회구분     , i_qrydiv        , i_qrydiv        , char ,  1;
		end
		n0004Out1,출력,output;
		begin
			출력개수     , out_cnt         , out_cnt         , char ,  5;
		end
		n0004Out2,출력,output,occurs;
		begin
			국가코드     , o_ctry_cd       , o_ctry_cd       , char ,  2;
			국가한글명   , o_ctry_kor_nm   , o_ctry_kor_nm   , char , 40;
			국가영문명   , o_ctry_eng_nm   , o_ctry_eng_nm   , char , 40;
			국가한글약어 , o_ctry_kor_abbr , o_ctry_kor_abbr , char , 20;
			국가영문약어 , o_ctry_eng_abbr , o_ctry_eng_abbr , char , 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
