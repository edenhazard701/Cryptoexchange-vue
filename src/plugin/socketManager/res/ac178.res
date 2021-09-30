BEGIN_FUNCTION_MAP
    .Func,(ac178)WLF전문생성,ac178,headtype=A;
    BEGIN_DATA_MAP
        ac178In,입력,input;
        begin
            계정ID       , user_id     , user_id    , char  , 10;
            요청업무구분 , req_bsi_tp  , req_bsi_tp , char  ,  1; // 1.회원가입 2.회원정보편집
        end
        ac178Out,출력,output;
        begin
            고객번호          , customer_no                     , customer_no                    , char  , 20 ;
            고객구분          , customer_div                    , customer_div                   , char  , 2  ;
            고객명            , customer_nm                     , customer_nm                    , char  , 100;
            고객영문명        , customer_eng_nm                 , customer_eng_nm                , char  , 500;
            출생일자          , birth_dd                        , birth_dd                       , char  , 8  ;
            국적              , country_cd                      , country_cd                     , char  , 2  ;
            거주국가          , live_country_cd                 , live_country_cd                , char  , 2  ;
            대리인 여부       , agent_yn                        , agent_yn                       , char  , 1  ;
            대리인 명         , agent_nm                        , agent_nm                       , char  , 100;
            대리인 영문명     , agent_eng_nm                    , agent_eng_nm                   , char  , 500;
            대리인 출생일자   , agent_birth_dd                  , agent_birth_dd                 , char  , 8  ;
            대리인 국적       , agent_country_cd                , agent_country_cd               , char  , 2  ;
            대리인 거주국가   , agent_live_country_cd           , agent_live_country_cd          , char  , 2  ;
            대표자 여부       , ceo_yn                          , ceo_yn                         , char  , 1  ;
            대표자 명         , ceo_nm                          , ceo_nm                         , char  , 100;
            대표자 영문명     , ceo_eng_nm                      , ceo_eng_nm                     , char  , 500;
            대표자 출생일자   , ceo_birth_dd                    , ceo_birth_dd                   , char  , 8  ;
            대표자 국적       , ceo_country_cd                  , ceo_country_cd                 , char  , 2  ;
            대표자 거주국가   , ceo_live_country_cd             , ceo_live_country_cd            , char  , 2  ;
            실소유자 여부     , real_ownr_yn                    , real_ownr_yn                   , char  , 1  ;
            실소유자 명       , real_ownr_nm                    , real_ownr_nm                   , char  , 100;
            실소유자 영문명   , real_ownr_eng_nm                , real_ownr_eng_nm               , char  , 500;
            실소유자 출생일자 , real_ownr_birth_dd              , real_ownr_birth_dd             , char  , 8  ;
            실소유자 국적     , real_ownr_country_cd            , real_ownr_country_cd           , char  , 2  ;
            실소유자 거주국가 , real_ownr_live_country_cd       , real_ownr_live_country_cd      , char  , 2  ;
            요청 직원 ID      , req_user_id                     , req_user_id                    , char  , 20 ;
        end
    END_DATA_MAP
END_FUNCTION_MAP
