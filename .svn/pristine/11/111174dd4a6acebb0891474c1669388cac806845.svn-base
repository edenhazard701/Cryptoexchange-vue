BEGIN_FUNCTION_MAP
	.Func,(ac102)휴대폰본인확인정보등록,ac102,headtype=A;
	BEGIN_DATA_MAP
		ac102In,입력,input;
		begin
			인증휴대폰CI    , auth_ci       , auth_ci       , char  , 88;
			사용자성명      , user_nm       , user_nm       , char  , 40;
			생년월일        , user_brth_day , user_brth_day , char  ,  8;
			성별            , user_gend     , user_gend     , char  ,  1; // 0: 여성, "1": 남성
			내외국인구분    , user_forn_tp  , user_forn_tp  , char  ,  1; // 1: 내국인, "2": 외국인
			인증휴대폰번호  , auth_mobl_no  , auth_mobl_no  , char  , 11;
			인증휴대폰DI    , auth_di       , auth_di       , char  , 64;
			휴대폰통신사    , mobl_corp     , mobl_corp     , char  ,  2;
			이용약관        , use_terms     , use_terms     , char  ,  1; // 0.미동의,1.동의
			개인정보처리    , prv_info_proc , prv_info_proc , char  ,  1; // 0.미동의,1.동의
			마케팅정보수신  , event_noti    , event_noti    , char  ,  1; // 0.미동의,1.동의
		end
		ac102Out,출력,output;
		begin
            계정ID            , user_id        , user_id        , char  , 10;
            계정그룹ID        , user_grp_id    , user_grp_id    , char  ,  2;
            L4스위치 IP       , switch_ip      , switch_ip      , char  , 16;
		end
	END_DATA_MAP
END_FUNCTION_MAP
