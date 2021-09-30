BEGIN_FUNCTION_MAP
	.Func,(s0050)가상화폐 서버자동주문 약정동의 조회    ,s0050,headtype=B;
	BEGIN_DATA_MAP
		s0050InBlock,입력,input;
		begin
			유저ID                  , user_id                   , user_id                    , char ,   10;
		end
		s0050OutBlock,출력,output;
		begin
			유저ID                  , user_id                   , user_id                    , char ,   10;
			약정설정일자            , est_dt                    , est_dt                     , char ,    8;
			약정해지일자            , cc_dt                     , cc_dt                      , char ,    8;
			약정신청여부            , rqst_cncl_f               , rqst_cncl_f                , char ,    1;
			SMS 신청일자            , sms_est_dt                , sms_est_dt                 , char ,    8;
			SMS 해지일자            , sms_cc_dt                 , sms_cc_dt                  , char ,    8;
			SMS 신청여부            , sms_rqst_cncl_f           , sms_rqst_cncl_f            , char ,    1;
			이메일(암호화)          , user_email                , user_email                 , char ,  128;
			핸드폰번호(암호화)      , mobl_no                   , mobl_no                    , char ,   24;
			모바일OS 종류           , mobl_os                   , mobl_os                    , char ,    1;
			모바일기기UID           , mobl_uid                  , mobl_uid                   , char ,  160;
		end
	END_DATA_MAP
END_FUNCTION_MAP
