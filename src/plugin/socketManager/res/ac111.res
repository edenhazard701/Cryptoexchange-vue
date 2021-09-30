BEGIN_FUNCTION_MAP
    .Func,(ac111)고객거주정보등록,ac111,headtype=A;
    BEGIN_DATA_MAP
        ac111In,입력,input;
        begin
            계정ID            , user_id        , user_id        , char  ,  10;
            자택우편번호      , home_pst_no    , home_pst_no    , char  ,   5;
            자택기본주소      , home_addr      , home_addr      , char  , 150;
            자택상세주소      , home_addr_dtl  , home_addr_dtl  , char  , 150;
            자택전화지역번호  , home_area_code , home_area_code , char  ,   4;
            자택전화번호      , home_phon_no   , home_phon_no   , char  ,  20;
        end
        ac111Out,출력,output;
        begin
            DUMMY              , dummy         , dummy         , char  ,  1;
        end
    END_DATA_MAP
END_FUNCTION_MAP
