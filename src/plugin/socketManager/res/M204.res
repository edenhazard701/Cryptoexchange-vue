BEGIN_FUNCTION_MAP
    .Feed, (M204)CH 로그인정보 상태 실시간, M204, key=2, keycnt=1, bufcnt=20, group=1;
    BEGIN_DATA_MAP
    InBlock,입력,input;
    begin
    매체구분               , media_div            , media_div            , char   ,    2;
    end
    OutBlock,출력,output;
    begin
    매체구분               , media_div            , media_div            , char   ,    2;
    일자                   , dt                   , dt                   , char   ,    8;
    시간                   , time                 , time                 , char   ,    6;
    IP주소                 , ip_addr              , ip_addr              , char   ,   15;
    접속세션건수           , con_sesn_cnt         , con_sesn_cnt         , int    ,    5;
    TR호출건수             , tr_call_cnt          , tr_call_cnt          , int    ,   10;
    TR초당호출건수         , tr_sec_per_call_cnt  , tr_sec_per_call_cnt  , int    ,    4;
    상태구분               , stts_div             , stts_div             , int    ,    1;
    end
    END_DATA_MAP
END_FUNCTION_MAP
