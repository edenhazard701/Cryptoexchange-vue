BEGIN_FUNCTION_MAP
    .Func,(M2009)전체접속서버(MCA) 서비스 호출 건수 일별 조회,M2009,headtype=B;
    BEGIN_DATA_MAP
        M2009In1,입력,input;
        begin
            일자           , dt              , dt              , char ,  8;
        end
        M2009Out1,출력,output;
        begin
            츨력개수       , out_cnt         , out_cnt         , char ,  5;
        end
        M2009Out2,출력,output,occurs;
        begin
            일자           , dt              , dt              , char ,   8;
            접속서버IP주소 , conn_ip_addr    , conn_ip_addr    , char ,  15;
            목적서버IP주소 , obj_ip_addr     , obj_ip_addr     , char ,  15;
            TR코드         , tr_cd           , tr_cd           , char ,   6;
            시간           , time            , time            , char ,   6;
            TR설명         , tr_desc         , tr_desc         , char , 100;
            TR누적호출건수 , tr_cum_call_cnt , tr_cum_call_cnt , int  ,  10;
        end
    END_DATA_MAP
END_FUNCTION_MAP
