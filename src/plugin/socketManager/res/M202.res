BEGIN_FUNCTION_MAP
    .Feed, (M202)프로세스 상태 실시간, M202, key=1, keycnt=1, bufcnt=20, group=1;
    BEGIN_DATA_MAP
    InBlock,입력,input;
    begin
    조회구분               , qry_div              , qry_div              , char   ,    1;
    end
    OutBlock,출력,output;
    begin
    조회구분               , qry_div              , qry_div              , char   ,    1;
    일자                   , dt                   , dt                   , char   ,    8;
    시간                   , time                 , time                 , char   ,    6;
    IP주소                 , ip_addr              , ip_addr              , char   ,   15;
    홈경로                 , home_path            , home_path            , char   ,   64;
    프로세스ID             , proc_id              , proc_id              , char   ,    6;
    프로세스명             , proc_nm              , proc_nm              , char   ,   30;
    상태레벨               , stts_lvl             , stts_lvl             , int    ,    1;
    메세지                 , msg                  , msg                  , char   ,  100;
    end
    END_DATA_MAP
END_FUNCTION_MAP
