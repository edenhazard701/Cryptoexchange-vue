BEGIN_FUNCTION_MAP
    .Func,(ac133)회원가입요청처리,ac133,headtype=A;
    BEGIN_DATA_MAP
        ac133In,입력,input;
        begin
            계정메일주소        , user_mail         , user_mail         , char  , 50;
            계정비밀번호        , iput_pass         , iput_pass         , char  , 64;
            이용약관            , use_terms         , use_terms         , char  , 1;
            개인정보처리        , prv_info_proc     , prv_info_proc     , char  , 1;
            이벤트알림          , event_noti        , event_noti        , char  , 1;
            인증휴대폰CI        , auth_ci           , auth_ci           , char  , 88;
            인증휴대폰DI        , auth_di           , auth_di           , char  , 64;
            인증휴대폰번호      , auth_mobl_no      , auth_mobl_no      , char  , 11;
            휴대폰통신사        , mobl_corp         , mobl_corp         , char  , 3;
            사용자명            , user_nm           , user_nm           , char  , 40;
            생년월일            , user_brth_day     , user_brth_day     , char  , 8;
            성별                , user_gend         , user_gend         , char  , 1;
            내외국인구분        , user_forn_tp      , user_forn_tp      , char  , 1;
            언어종류            , lang_kind         , lang_kind         , char  , 2;
        end
        ac133Out,출력,output;
        begin
            계정ID              , user_id           , user_id           , char  , 10;
            계정그룹ID          , user_grp_id       , user_grp_id       , char  , 2;
            L4스위치IP          , switch_ip         , switch_ip         , char  , 16;
        end
    END_DATA_MAP
END_FUNCTION_MAP