BEGIN_FUNCTION_MAP
	.Func,(ac501)통화정보조회,ac501,headtype=A;
	BEGIN_DATA_MAP
		ac501In,입력,input;
		begin
			검색타입			, sear_tp         , sear_tp         , char      ,  1;
		end
		ac501Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt		  , rsp_cnt         , long	    ,  5;
		end
		ac501Out,출력,output,occurs;
		begin
			통화코드	        , cur_cd		  , cur_cd			, char	    ,  5;
			표시통화코드	    , disp_cur_cd	  , disp_cur_cd		, char	    , 30;
			한글명           		, cur_kor_nm      , cur_kor_nm      , char    	, 50;
			영문명           		, cur_eng_nm      , cur_eng_nm      , char    	, 50;
			소수점자릿수		, dec_digt	 	  , dec_digt		, int    	, 2;
		end
	END_DATA_MAP
END_FUNCTION_MAP
