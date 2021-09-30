BEGIN_FUNCTION_MAP
	.Func,(M2010)접속서버(MCA) 서비스 호출 건수 시간별,M2010,headtype=B;
	BEGIN_DATA_MAP
		M2010In1,입력,input;
		begin
			일자           , dt              , dt              , char ,  8;
			시간           , time            , time            , char ,  6; // NEXT필드-최초:9(6)
			접속서버IP주소 , conn_ip_addr    , conn_ip_addr    , char , 15; // NEXT필드-최초:9(16)
			목적서버IP주소 , obj_ip_addr     , obj_ip_addr     , char , 15; // NEXT필드-최초:9(16)
			TR코드         , tr_cd           , tr_cd           , char ,  6; // NEXT필드-최초:9(6)
			조회개수       , qry_cnt         , qry_cnt         , char ,  5;
			플래그         , flag            , flag            , char ,  1;
		end
		M2010Out1,출력,output;
		begin
			츨력개수       , out_cnt         , out_cnt         , char ,  5;
		end
		M2010Out2,출력,output,occurs;
		begin
			일자           , dt              , dt              , char ,  8;
			시간           , time            , time            , char ,  6;
			접속서버IP주소 , conn_ip_addr    , conn_ip_addr    , char , 15;
			목적서버IP주소 , obj_ip_addr     , obj_ip_addr     , char , 15;
			TR코드         , tr_cd           , tr_cd           , char ,  6;
			TR설명         , tr_desc         , tr_desc         , char , 64;
			TR누적호출건수 , tr_cum_call_cnt , tr_cum_call_cnt , int  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
