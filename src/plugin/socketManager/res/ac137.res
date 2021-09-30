BEGIN_FUNCTION_MAP
	.Func,(ac137)이메일발송,ac137,headtype=A;
	BEGIN_DATA_MAP
		ac137In,입력,input;
		begin
			계정ID				, user_id			, user_id			, char  , 10;
			메일발송타입		, trig_tp			, trig_tp			, char  , 2;
			재발송여부			, resnd_tp			, resnd_tp			, char  , 1;
			언어설정구분        , lang_code         , lang_code         , char  , 2;
		end
		ac137Out,출력,output;
		begin
			계정ID				, user_id			, user_id			, char  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
