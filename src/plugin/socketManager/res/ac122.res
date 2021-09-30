BEGIN_FUNCTION_MAP
    .Func,(ac122)직장정보입력,ac122,headtype=A;
    BEGIN_DATA_MAP
        ac122In,입력,input;
        begin
            계정ID       , user_id           , user_id          , char  , 10;
            직장구분     , job_tp            , job_tp           , char  ,  2;
            업종         , job_kind          , job_kind         , char  ,  2;
            직위코드     , job_position_code , job_position_code, char  ,  2;
            직장명       , ofc_nm            , ofc_nm           , char  , 60; // 한글20자
            부서명       , ofc_dept_nm       , ofc_dept_nm      , char  , 60; // 한글20자
        end
        ac122Out,출력,output;
        begin
            DUMMY        , dummy             , dummy             , char  ,  1;
        end
    END_DATA_MAP
END_FUNCTION_MAP
