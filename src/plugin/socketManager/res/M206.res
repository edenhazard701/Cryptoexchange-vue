BEGIN_FUNCTION_MAP
    .Feed, (M206)서버별 CPU 상태 실시간, M206, key=1, keycnt=1, bufcnt=20, group=1;
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
    파일시스템명           , file_sys_nm          , file_sys_nm          , char   ,   64;
    MOUNT위치              , mount_loc            , mount_loc            , char   ,   64;
    전체용량               , all_qty              , all_qty              , int    ,   12;
    사용량                 , use_qty              , use_qty              , int    ,   12;
    가용량                 , poss_qty             , poss_qty             , int    ,   12;
    사용율                 , use_rate             , use_rate             , double ,    5;
    상태구분               , stts_div             , stts_div             , char   ,    1;
    end
    END_DATA_MAP
END_FUNCTION_MAP
