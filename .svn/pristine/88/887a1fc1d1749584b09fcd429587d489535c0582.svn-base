BEGIN_FUNCTION_MAP
	.Func,(M2004)전체접속서버(MCA) CH상태 일별 조회,M2004,headtype=B;
	BEGIN_DATA_MAP
		M2004In1,입력,input;
		begin
			일자                , dt                      , dt                      , char ,  8;
			매체구분            , media_div               , media_div               , char ,  2; // 00:전체 10:HTS 20:MTS 30:WEB 40:API
		end
		M2004Out1,출력,output;
		begin
			츨력개수            , out_cnt                 , out_cnt                 , char ,  5;
		end
		M2004Out2,출력,output,occurs;
		begin
			일자                , dt                      , dt                      , char ,  8;
			IP주소              , ip_addr                 , ip_addr                 , char , 15;
			매체구분            , media_div               , media_div               , char ,  2;
			시간                , time                    , time                    , char ,  6;
			접속세션건수        , con_sesn_cnt            , con_sesn_cnt            , int  ,  5;
			접속세션건수-최대   , con_sesn_cnt_max        , con_sesn_cnt_max        , int  ,  5;
			접속세션건수-최저   , con_sesn_cnt_min        , con_sesn_cnt_min        , int  ,  5;
			접속세션건수-평균   , con_sesn_cnt_avg        , con_sesn_cnt_avg        , int  ,  5;
			TR호출건수          , tr_call_cnt             , tr_call_cnt             , int  , 10;
			TR호출건수-최대     , tr_call_cnt_max         , tr_call_cnt_max         , int  , 10;
			TR호출건수-최저     , tr_call_cnt_min         , tr_call_cnt_min         , int  , 10;
			TR호출건수-평균     , tr_call_cnt_avg         , tr_call_cnt_avg         , int  , 10;
			TR초당호출건수      , tr_sec_per_call_cnt     , tr_sec_per_call_cnt     , int  , 10;
			TR초당호출건수-최대 , tr_sec_per_call_cnt_max , tr_sec_per_call_cnt_max , int  , 10;
			TR초당호출건수-최저 , tr_sec_per_call_cnt_min , tr_sec_per_call_cnt_min , int  , 10;
			TR초당호출건수-평균 , tr_sec_per_call_cnt_avg , tr_sec_per_call_cnt_avg , int  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
