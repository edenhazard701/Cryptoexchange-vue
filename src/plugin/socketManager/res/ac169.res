BEGIN_FUNCTION_MAP
    .Func,(ac169)사용자언어변경,ac169,headtype=A;
    BEGIN_DATA_MAP
        ac169In,입력,input;
        begin
            계정ID      , user_id       , user_id       , char  , 10;
            언어종류    , lang_kind     , lang_kind     , char  ,  2;
        end
        ac169Out,출력,output;
        begin
            계정ID      , user_id       , user_id       , char  , 10;
        end
    END_DATA_MAP
END_FUNCTION_MAP