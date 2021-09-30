BEGIN_FUNCTION_MAP
    .Func,(f0001)약관 동의/동의 해지/정보 갱신,f0001,headtype=B;
    BEGIN_DATA_MAP
        f0001In1,입력,input;
        begin
            계정ID         , id             , id             , char , 10;
			설정구분       , op_gb          , op_gb          , char , 1;
			날짜           , date           , date           , char , 8;
			시간           , time           , time           , char , 6;
			OS구분         , os_div         , os_div         , char , 1;
			단말기고유정보 , dev_ihrt_value , dev_ihrt_value , char , 152;
        end
        f0001Out1,출력,output;
        begin
            계정ID         , id            , id              , char , 10;
            처리구분       , result        , result          , char , 1;
        end
    END_DATA_MAP
END_FUNCTION_MAP
