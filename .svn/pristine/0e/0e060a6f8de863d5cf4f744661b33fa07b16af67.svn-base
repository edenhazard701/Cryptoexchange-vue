BEGIN_FUNCTION_MAP
	.Func,(n0005)원화고시환율 리스트 조회,n0005;
	BEGIN_DATA_MAP
		n0005In1,입력,input;
		begin
			조회구분   , qrydiv     , qrydiv     , char   ,  1;
		end
		n0005Out1,출력,output;
		begin
			출력개수   , out_cnt    , out_cnt    , char   ,  5;
		end
		n0005Out2,출력,output,occurs;
		begin
			통화코드   , currcode   , currcode   , char   ,  5;
			고시시간   , notitime   , notitime   , char   ,  6;
			회차       , cnt        , cnt        , char   ,  4;
			매매기준율 , trdbssrate , trdbssrate , double , 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
