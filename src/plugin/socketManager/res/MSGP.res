BEGIN_FUNCTION_MAP
    .Push, (MSGP)관리자메세지, MSGP, key=1, keycnt=1, bufcnt=2, group=1;
    BEGIN_DATA_MAP
    InBlock,입력,input;
    begin
    KEY_계정ID             , key_user_id        ,  key_user_id         , char    ,   10;	
	end
    OutBlock,출력,output;
    begin
    데이터구분             , dt_div             , dt_div               , char    ,    4;
    KEY_계정ID             , key_user_id        , key_user_id          , char    ,   10; 
	일자                   , date               , date                 , char    ,    8;
    시간                   , time               , time                 , char    ,    6;
    제목                   , title              , title                , char    ,   80;
    내용                   , cntnt              , cntnt                , char    ,  512;
    end
    END_DATA_MAP
END_FUNCTION_MAP
