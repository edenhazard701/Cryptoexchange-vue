BEGIN_FUNCTION_MAP
	.Func,(s0049)가상화폐 서버자동주문 약관 동의/해지/갱신,s0049,headtype=B;
	BEGIN_DATA_MAP
		s0049InBlock,입력,input;
		begin
			처리구분                , proc_sec                  , proc_sec                   , char ,    1;
			유저ID                  , user_id                   , user_id                    , char ,   10;
			설정일자                , save_date                 , save_date                  , char ,    8;
			SMS 신청여부            , sms_rqst_cncl_f           , sms_rqst_cncl_f            , char ,    1;
			OS구분                  , os_type                   , os_type                    , char ,    1;
			핸드폰번호              , mobile_no                 , mobile_no                  , char ,   32;
			단말기고유정보          , device_id                 , device_id                  , char ,  152;
		end
		s0049OutBlock,출력,output;
		begin
			유저ID                  , user_id                   , user_id                    , char ,   10;
			처리결과구분            , rslt_clsf                 , rslt_clsf                  , char ,    4;
		end
	END_DATA_MAP
END_FUNCTION_MAP
