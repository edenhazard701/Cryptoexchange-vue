BEGIN_FUNCTION_MAP
    .Func,(M2001)전체서버 CPU상태 일별 조회,M2001,headtype=B;
    BEGIN_DATA_MAP
        M2001In1,입력,input;
        begin
            일자                 , dt         , dt         , char  ,  8;
        end
        M2001Out1,출력,output;
        begin
            츨력개수             , out_cnt    , out_cnt    , char  ,  5;
        end
        M2001Out2,출력,output,occurs;
        begin
            일자                 , dt         , dt         , char  ,  8;
            IP주소               , ip_addr    , ip_addr    , char  , 15;
            시간                 , time       , time       , char  ,  6;
            사용자CPU사용율      , user       , user       , double,  5;
            사용자CPU사용율-최대 , user_max   , user_max   , double,  5;
            사용자CPU사용율-최저 , user_min   , user_min   , double,  5;
            사용자CPU사용율-평균 , user_avg   , user_avg   , double,  5;
            커널CPU사용율        , kernel     , kernel     , double,  5;
            커널CPU사용율-최대   , kernel_max , kernel_max , double,  5;
            커널CPU사용율-최저   , kernel_min , kernel_min , double,  5;
            커널CPU사용율-평균   , kernel_avg , kernel_avg , double,  5;
            CPU IDLE             , idle       , idle       , double,  5;
            CPU IDLE-최대        , idle_max   , idle_max   , double,  5;
            CPU IDLE-최저        , idle_min   , idle_min   , double,  5;
            CPU IDLE-평균        , idle_avg   , idle_avg   , double,  5;
            I/O WAIT             , iowait     , iowait     , double,  5;
            I/O WAIT-최대        , iowait_max , iowait_max , double,  5;
            I/O WAIT-최저        , iowait_min , iowait_min , double,  5;
            I/O WAIT-평균        , iowait_avg , iowait_avg , double,  5;
            RunQ                 , runq       , runq       , double,  5;
            RunQ-최대            , runq_max   , runq_max   , double,  5;
            RunQ-최저            , runq_min   , runq_min   , double,  5;
            RunQ-평균            , runq_avg   , runq_avg   , double,  5;
        end
    END_DATA_MAP
END_FUNCTION_MAP
