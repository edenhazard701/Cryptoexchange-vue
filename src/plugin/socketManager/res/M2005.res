BEGIN_FUNCTION_MAP
	.Func,(M2005)접속서버(MCA) CH상태 시간별 조회,M2005,headtype=B;
	BEGIN_DATA_MAP
		M2005In1,입력,input;
		begin
			일자               , dt                      , dt                      , char ,  8;
			시간               , time                    , time                    , char ,  6; // NEXT필드-최초:9(6)
			IP주소             , ip_addr                 , ip_addr                 , char , 15; // NEXT필드-최초:9(16)
			매체구분           , media_div               , media_div               , char ,  2; // 00:전체 10:HTS 20:MTS 30:WEB 40:API
			조회개수           , qry_cnt                 , qry_cnt                 , char ,  5;
			플래그             , flag                    , flag                    , char ,  1;
		end
		M2005Out1,출력,output;
		begin
			츨력개수           , out_cnt                 , out_cnt                 , char ,  5;
		end
		M2005Out2,출력,output,occurs;
		begin
			일자               , dt                      , dt                      , char ,  8;
			시간               , time                    , time                    , char ,  6;
			IP주소             , ip_addr                 , ip_addr                 , char , 15;
			매체구분           , media_div               , media_div               , char ,  2;
			접속세션건수       , con_sesn_cnt            , con_sesn_cnt            , int  ,  5;
			TR호출건수         , tr_call_cnt             , tr_call_cnt             , int  , 10;
			직전TR호출건수     , pre_tr_call_cnt         , pre_tr_call_cnt         , int  , 10;
			TR초당호출건수     , tr_sec_per_call_cnt     , tr_sec_per_call_cnt     , int  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
