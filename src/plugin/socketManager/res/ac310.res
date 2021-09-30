BEGIN_FUNCTION_MAP
	.Func,(ac310)부가서비스신청해지,ac310,headtype=A;
	BEGIN_DATA_MAP
		ac310In,입력,input;
		begin
			계정ID			, user_id		, user_id		, long  , 10;
			부가서비스구분		, adt_svc_cd	, adt_svc_cd	, char  , 5;
			부가서비스신청구분	, svc_stat		, svc_stat		, char  , 1;
		end
		ac310Out,출력,output;
		begin
			계정ID			, user_id		, user_id		, long  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
