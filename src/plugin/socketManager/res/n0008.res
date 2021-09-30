BEGIN_FUNCTION_MAP
	.Func,(n0008)표시통화코드 리스트 조회,n0008;
	BEGIN_DATA_MAP
		n0008In1,입력,input;
		begin
			조회구분     , qrydiv       , qrydiv       , char ,  1;
		end
		n0008Out1,출력,output;
		begin
			출력개수     , out_cnt      , out_cnt      , char ,  5;
		end
		n0008Out2,출력,output,occurs;
		begin
			표시통화코드 , tradcurrcode , tradcurrcode , char ,  5;
			통화한글명   , cur_kor_nm   , cur_kor_nm   , char , 30;
		end
	END_DATA_MAP
END_FUNCTION_MAP
