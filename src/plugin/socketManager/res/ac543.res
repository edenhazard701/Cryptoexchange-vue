BEGIN_FUNCTION_MAP
    .Func,(ac543) 지점정보조회,ac543,headtype=A;
    BEGIN_DATA_MAP
        ac543In,입력,input;
        begin
            지점코드    , unit_code    , unit_code   , char  , 5; // %.전체
        end
        ac543Out_c,출력공통,output;
        begin
            응답건수    , rsp_cnt      , rsp_cnt     , long   ,  5;
        end
        ac543Out,출력,output,occurs;
        begin
            지점코드    , unit_code    , unit_code    , char  , 5;
            지점한글명  , unit_kor_nm  , unit_kor_nm  , char  , 50;
            지점영문명  , unit_eng_nm  , unit_eng_nm  , char  , 50;
        end
    END_DATA_MAP
END_FUNCTION_MAP
