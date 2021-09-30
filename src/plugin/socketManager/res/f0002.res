BEGIN_FUNCTION_MAP
    .Func,(f0002)언어설정,f0002,headtype=B;
    BEGIN_DATA_MAP
        f0002In1,입력,input;
        begin
            계정ID         , id             , id             , char , 10;
			국가구분       , lang_flag      , lang_flag      , char , 1;
        end
        f0002Out1,출력,output;
        begin
            계정ID         , id            , id              , char , 10;
            처리구분       , result        , result          , char , 1;
        end
    END_DATA_MAP
END_FUNCTION_MAP
