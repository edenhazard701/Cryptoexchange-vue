BEGIN_FUNCTION_MAP
    .Func,(ac125)마이페이지_회원 직장정보 처리,ac125,headtype=A;
    BEGIN_DATA_MAP
        ac125In,입력,input;
        begin
            계정ID             , user_id           , user_id           , char  ,  10;
            직장구분           , job_tp            , job_tp            , char  ,   2;
            업종               , job_kind          , job_kind          , char  ,   2;
            직위코드           , job_position_code , job_position_code , char  ,   2;
            직장명             , ofc_nm            , ofc_nm            , char  ,  60; // 한글20자
            부서명             , ofc_dept_nm       , ofc_dept_nm       , char  ,  60; // 한글20자
            직장우편번호       , ofc_pst_no        , ofc_pst_no        , char  ,   5;
            직장기본주소       , ofc_addr          , ofc_addr          , char  , 150;
            직장상세주소       , ofc_addr_dtl      , ofc_addr_dtl      , char  , 150;
			직장전화지역번호   , ofc_area_code     , ofc_area_code     , char  ,   4;
            직장전화번호       , ofc_phon_no       , ofc_phon_no       , char  ,  20;
        end
        ac125Out,출력,output;
        begin
            DUMMY        , dummy             , dummy             , char  ,  1;
        end
    END_DATA_MAP
END_FUNCTION_MAP
