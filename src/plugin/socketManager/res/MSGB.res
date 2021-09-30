BEGIN_FUNCTION_MAP
    .Feed, (MSGB)공지사항메세지, MSGB, key=1, keycnt=1, bufcnt=2, group=1;
    BEGIN_DATA_MAP
    InBlock,입력,input;
    begin
        조회구분               , qry_div            , qry_div              , char    ,    1;
    end
    OutBlock,출력,output;
    begin
        조회구분               , qry_div            , qry_div              , char    ,    1;
        매체구분               , med_div            , med_div              , char    ,    2;
        일자                   , date               , date                 , char    ,    8;
        시간                   , time               , time                 , char    ,    6;
        게시물일련번호         , list_no            , list_no              , long    ,   10;
        제목                   , title              , title                , char    ,   80;
    end
    END_DATA_MAP
END_FUNCTION_MAP
