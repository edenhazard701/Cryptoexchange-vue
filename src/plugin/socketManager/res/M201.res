BEGIN_FUNCTION_MAP
    .Feed, (M201)서버별 CPU 상태 실시간, M201, key=1, keycnt=1, bufcnt=20, group=1;
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
    사용자CPU사용율        , user                 , user                 , double ,    5;
    커널CPU사용율          , kernel               , kernel               , double ,    5;
    CPU IDLE               , idle                 , idle                 , double ,    5;
    I/O WAIT               , iowait               , iowait               , double ,    5;
    RunQ                   , runq                 , runq                 , double ,    5;
    상태구분               , stts_div             , stts_div             , char   ,    1;
    end
    END_DATA_MAP
END_FUNCTION_MAP
