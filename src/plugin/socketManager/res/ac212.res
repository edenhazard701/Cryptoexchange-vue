BEGIN_FUNCTION_MAP
	.Func,(ac212)국가전화번호코드 조회,ac212,headtype=A;
	BEGIN_DATA_MAP
		ac212In,입력,input;
		begin
			계정ID		, user_id			, user_id			, long  , 10;
		end
		ac212Out_c,출력공통,output;
		begin
			응답건수 		, rsp_cnt			, rsp_cnt           , long	, 5;
		end
		ac212Out,출력,output,occurs;
		begin
			국가코드		, ctry_cd			, ctry_cd			, char  , 2;
			국가한글명		, ctry_kor_nm		, ctry_kor_nm		, char  , 50;
			국가영문명		, ctry_eng_nm		, ctry_eng_nm		, char  , 50;
			국가전화번호	, ctry_tel_pfix		, ctry_tel_pfix		, char  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
