BEGIN_FUNCTION_MAP
    .Func,(ac560) 당일1원이체요청횟수조회,ac560,headtype=A;
    BEGIN_DATA_MAP
        ac560In,입력,input;
        begin
            계정ID            , user_id        , user_id        , char  , 10;
        end
        ac560Out,출력,output;
        begin
			당일자            , to_day       , to_day       , char  ,  8;
            이체요청횟수      , tran_req_cnt , tran_req_cnt , long  ,  5;
        end
    END_DATA_MAP
END_FUNCTION_MAP
