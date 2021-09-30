BEGIN_FUNCTION_MAP
    .Func,(ac519) 계좌생성단계조회,ac519,headtype=A;
    BEGIN_DATA_MAP
        ac519In,입력,input;
        begin
            인증휴대폰CI      , auth_ci        , auth_ci        , char  , 88;
        end
        ac519Out,출력,output;
        begin
			사용자성명        , user_nm        , user_nm        , char  , 50;
			생년월일          , user_brth_day  , user_brth_day  , char  ,  8;
            코벡스보유YN      , kovex_yn       , kovex_yn       , char  ,  1;
            지점코드          , unit_code      , unit_code      , char  ,  5;
            지점명            , unit_kor_nm    , unit_kor_nm    , char  , 50;
            마케팅정보동의    , event_noti     , event_noti     , char  ,  1; // 0.미동의,1.동의
            신분증 발급일자   , auth_gen_dt    , auth_gen_dt    , char  ,  8;
            영문명            , user_eng_nm    , user_eng_nm    , char  , 50;
            영문성            , user_eng_surnm , user_eng_surnm , char  , 20;
            거주구분          , dmst_liv_tp    , dmst_liv_tp    , char  ,  2; // 01국내 : 02국외
            자택우편번호      , home_pst_no    , home_pst_no    , char  ,  5;
            자택기본주소      , home_addr      , home_addr      , char  , 150;
            자택상세주소      , home_addr_dtl  , home_addr_dtl  , char  , 150;
            자택전화지역번호  , home_area_code , home_area_code , char  ,  4;
            자택전화번호      , home_phon_no   , home_phon_no   , char  , 20;
            직장구분          , job_tp         , job_tp         , char  ,  2;
            업종              , job_kind       , job_kind       , char  ,  2;
            직위코드          , job_position_code , job_position_code, char  ,  2;
            직장명            , ofc_nm         , ofc_nm         , char  , 50;
            부서명            , ofc_dept_nm    , ofc_dept_nm    , char  , 50;
            직장우편번호      , ofc_pst_no     , ofc_pst_no     , char  ,  5;
            직장기본주소      , ofc_addr       , ofc_addr       , char  , 150;
            직장상세주소      , ofc_addr_dtl   , ofc_addr_dtl   , char  , 150;
            직장전화지역번호  , ofc_area_code  , ofc_area_code  , char  ,  4;
            직장전화번호      , ofc_phon_no    , ofc_phon_no    , char  , 20;
            자금원천구분      , fund_src_tp    , fund_src_tp    , char  ,  3;
            자금원천구분기타  , fund_src_etc   , fund_src_etc   , char  ,  60; //한글20자
            거래목적코드      , trd_purp_cd    , trd_purp_cd    , char  ,  2;
            거래목적기타      , trd_purp_etc   , trd_purp_etc   , char  ,  60; //한글20자
            계좌인증구분      , bact_auth_tp   , bact_auth_tp   , char  ,  1;  //계좌인증구분[0.미등록,1.등록]
            계정id            , user_id        , user_id        , char  , 10;
            계정그룹ID        , user_grp_id    , user_grp_id    , char  ,  2;
            L4스위치 IP       , switch_ip      , switch_ip      , char  , 16;
        end
    END_DATA_MAP
END_FUNCTION_MAP
