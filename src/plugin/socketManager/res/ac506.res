BEGIN_FUNCTION_MAP
    .Func,(ac506) 마이페이지_기본조회,ac506,headtype=A;
    BEGIN_DATA_MAP
        ac506In,입력,input;
        begin
            계정ID            , user_id        , user_id        , char  , 10;
        end
        ac506Out,출력,output;
        begin
            지점코드          , unit_code      , unit_code      , char  ,  5;
            지점한글명        , unit_kor_nm    , unit_kor_nm    , char  , 50;
			사용자성명        , user_nm        , user_nm        , char  , 40;
			생년월일          , user_brth_day  , user_brth_day  , char  ,  8;
            영문명            , user_eng_nm    , user_eng_nm    , char  , 50;
            영문성            , user_eng_surnm , user_eng_surnm , char  , 20;
			인증휴대폰번호    , auth_mobl_no   , auth_mobl_no   , char  , 11;
        end
    END_DATA_MAP
END_FUNCTION_MAP
