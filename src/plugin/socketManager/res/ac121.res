BEGIN_FUNCTION_MAP
    .Func,(ac121)계좌만들기 약관동의,ac121,headtype=A;
    BEGIN_DATA_MAP
        ac121In,입력,input;
        begin
            계정ID              , user_id           , user_id          , char  , 10;
            이용약관동의        , use_terms         , use_terms        , char  ,  1; // 0.미동의1.동의
            개인정보처리동의    , prv_info_proc     , prv_info_proc    , char  ,  1; // 0.미동의1.동의
            이벤트알림동의      , event_noti        , event_noti       , char  ,  1; // 0.미동의1.동의
        end
        ac121Out,출력,output;
        begin
            DUMMY               , dummy             , dummy            , char  ,  1;
        end
    END_DATA_MAP
END_FUNCTION_MAP
