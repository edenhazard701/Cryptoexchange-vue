BEGIN_FUNCTION_MAP
    .Feed, (MSGU)실시간unit공지사항메세지, MSGU, key=1, keycnt=1, bufcnt=2, group=1;
    BEGIN_DATA_MAP
    InBlock,입력,input;
    begin
        unit구분               , unit_code            , unit_code              , char    ,    5;
    end
    OutBlock,출력,output;
    begin
        unit구분               , unit_code          , unit_code            , char    ,    5;
        데이타구분             , data_gb            , data_gb              , char    ,    2;
        일자                   , date               , date                 , char    ,    8;
        시간                   , time               , time                 , char    ,    6;
        게시물일련번호         , seq                , seq                  , long    ,   10;
        제목                   , title              , title                , char    ,  120;
        내용                   , content            , content              , char    , 1024;
    end
    END_DATA_MAP
END_FUNCTION_MAP