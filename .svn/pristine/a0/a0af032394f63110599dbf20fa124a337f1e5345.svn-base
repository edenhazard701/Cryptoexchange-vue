BEGIN_FUNCTION_MAP
	.Func,(ac417)부가서비스내역조회,ac417,headtype=A;
	BEGIN_DATA_MAP
		ac417In,입력,input;
		begin
			계정ID			, user_id			, user_id			, long  , 10;
			부가서비스 구분 		, adt_svc_tp		, adt_svc_tp		, char  , 1;
			요청개수            	, req_cnt           , req_cnt           , long	, 5;
		end
		ac417Out_c,출력공통,output;
		begin
			부가서비스 가입여부	, adt_svc_stat		, adt_svc_stat		, char	, 1;
			응답건수 			, rsp_cnt			, rsp_cnt           , long	, 5;
			부가서비스코드		, adt_svc_cd		, adt_svc_cd		, char  , 5;
			부가서비스코드명		, adt_svc_nm		, adt_svc_nm		, char  , 50;
		end
		ac417Out,출력,output,occurs;
		begin
			부가서비스코드		, adt_svc_cd		, adt_svc_cd		, char  , 5;
			부가서비스코드명		, adt_svc_nm		, adt_svc_nm		, char  , 50;
		end
	END_DATA_MAP
END_FUNCTION_MAP
