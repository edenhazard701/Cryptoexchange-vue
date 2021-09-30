BEGIN_FUNCTION_MAP
    .Func,(f0003)알람내역 조회,f0003,headtype=B;
    BEGIN_DATA_MAP
        f0003In1,입력,input;
        begin
            계정ID       , id             , id             , char , 10;
            다음조회키값 , nextkey        , nextkey        , char , 17;
        end
        f0003Out1,출력,output;
        begin
            다음조회키값 , nextkey        , nextkey        , char , 17;
            출력개수     , out_cnt        , out_cnt        , char , 5;
        end
        f0003Out2,출력,output,occurs;
        begin
            날짜         , date           , date           , char , 8;
            시간         , time           , time           , char , 6;
            내용         , msg            , msg            , char , 300;
        end
    END_DATA_MAP
END_FUNCTION_MAP
