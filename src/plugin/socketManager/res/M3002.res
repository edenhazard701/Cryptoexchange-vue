BEGIN_FUNCTION_MAP
    .Func,(M3002)서버별 시세포트 송/수신 건수 시간별 조회,M3002,headtype=B;
    BEGIN_DATA_MAP
        M3002In1,입력,input;
        begin
            일자             , dt                , dt                , char ,   8;
            시간             , time              , time              , char ,   6; // NEXT필드-최초:9(6)
            IP주소           , ip_addr           , ip_addr           , char ,  15; // NEXT필드-최초:9(16)
            시세포트번호     , quote_port_no     , quote_port_no     , char ,   5; // NEXT필드-최초:9(5)
            조회개수         , qry_cnt           , qry_cnt           , char ,   5;
        	플래그           , flag              , flag              , char ,   1;
        end
        M3002Out1,출력,output;
        begin
            츨력개수         , out_cnt           , out_cnt           , char ,   5;
        end
        M3002Out2,출력,output,occurs;
        begin
            일자             , dt                , dt                , char ,   8;
            시간             , time              , time              , char ,   6;
            IP주소           , ip_addr           , ip_addr           , char ,  15;
            홈경로           , home_path         , home_path         , char ,  64;
            시세포트번호     , quote_port_no     , quote_port_no     , char ,   5;
            시세포트명       , quote_port_nm     , quote_port_nm     , char , 100;
            시세누적수신건수 , quote_cum_rcv_cnt , quote_cum_rcv_cnt , int  ,  12;
            시세누적전송건수 , quote_cum_snd_cnt , quote_cum_snd_cnt , int  ,  12;
        end
    END_DATA_MAP
END_FUNCTION_MAP
