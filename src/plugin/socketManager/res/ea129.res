BEGIN_FUNCTION_MAP
	.Func,(ea129)고객제한등록,ea129,headtype=A;
	BEGIN_DATA_MAP
		ea129In,입력,input;
		begin
			처리구분       		, proc_tp           , proc_tp           , char  ,  1;
			계정ID       		, user_id           , user_id           , char  , 10;
			제한구분       		, cnst_tp         	, cnst_tp         	, char  ,  1;
      		등록해지구분   		, regi_tp	    	, regi_tp	    	, char  ,  1;
			등록해지사유		, resn_nm			, resn_nm			, char  ,500;
		end
		ea129Out,출력,output;
		begin
			DUMMY		       	, dummy             , dummy             , char	,  1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
