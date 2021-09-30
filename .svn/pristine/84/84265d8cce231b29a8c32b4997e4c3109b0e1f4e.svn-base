BEGIN_FUNCTION_MAP
    .Func,(M3001)전체시세수신서버 전체시세포트 송/수신 건수 일별 조회,M3001,headtype=B;
    BEGIN_DATA_MAP
        M3001In1,입력,input;
        begin
            일자             , dt                , dt                , char ,   8;
        end
        M3001Out1,출력,output;
        begin
            츨력개수         , out_cnt           , out_cnt           , char ,   5;
        end
        M3001Out2,출력,output,occurs;
        begin
            일자             , dt                , dt                , char ,   8;
            IP주소           , ip_addr           , ip_addr           , char ,  15;
            홈경로           , home_path         , home_path         , char ,  64;
            시세포트번호     , quote_port_no     , quote_port_no     , char ,   5;
            시세포트명       , quote_port_nm     , quote_port_nm     , char , 100;
            시간             , time              , time              , char ,   6;
            시세누적수신건수 , quote_cum_rcv_cnt , quote_cum_rcv_cnt , int  ,  12;
            시세누적전송건수 , quote_cum_snd_cnt , quote_cum_snd_cnt , int  ,  12;
        end
    END_DATA_MAP
END_FUNCTION_MAP
