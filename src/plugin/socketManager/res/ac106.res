BEGIN_FUNCTION_MAP
    .Func,(ac106)회원가입지점정보등록,ac106,headtype=A;
    BEGIN_DATA_MAP
        ac106In,입력,input;
        begin
            인증휴대폰CI      , auth_ci        , auth_ci        , char  , 88;
            지점코드          , unit_code      , unit_code      , char  ,  5;
        end
        ac106Out,출력,output;
        begin
            계정ID            , user_id        , user_id        , char  , 10; //가입진행중인 지점코드의 해당되는 계정ID
        end
    END_DATA_MAP
END_FUNCTION_MAP
