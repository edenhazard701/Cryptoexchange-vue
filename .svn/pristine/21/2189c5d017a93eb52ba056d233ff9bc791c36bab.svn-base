BEGIN_FUNCTION_MAP
    .Func,(dw570) FDS 전문생성,dw570,headtype=A;
    BEGIN_DATA_MAP
        dw570In,입력,input;
        begin
            계정ID          , user_id           , user_id           , char      , 10;
            통화코드        , cur_cd            , cur_cd            , char      , 5;
            전자지갑주소    , walt_id           , walt_id           , char      , 256;
            보조필드        , sub_info          , sub_info          , char      , 50;
            입력출금금액    , iput_amt          , iput_amt          , double    , 20;
        end
        dw570Out,출력,output;
        begin
            시스템구분          , system_div                    , system_div                     , char  , 10 ;
            송신일시            , inf_rec_date_time             , inf_rec_date_time              , char  , 14 ;
            고객번호            , customer_no                   , customer_no                    , char  , 50 ;
            전송구분            , send_gbn                      , send_gbn                       , char  , 10 ; // 01:신규, 02:재전송
            송신시간            , inf_rec_time                  , inf_rec_time                   , char  , 6  ;
            고객구분            , customer_div                  , customer_div                   , char  , 10 ; // 01:개인(개인사업자), 02:법인
            고객명              , customer_nm                   , customer_nm                    , char  , 100;
            출생일자            , birth_dd                      , birth_dd                       , char  , 8  ;
            수신지갑번호        , rev_coin_wallet_no            , rev_coin_wallet_no             , char  , 150;
            계정ID              , user_id                       , user_id                        , char  , 100;
            계정ID주소          , account_ip_addr               , account_ip_addr                , char  , 100;
            계정자휴대폰번호    , account_phone_no              , account_phone_no               , char  , 50 ;
            출금횟수            , out_cnt                       , out_cnt                        , char  , 5  ;
            접속IP주소          , access_ip_addr                , access_ip_addr                 , char  , 100;
            제제국가코드        , rest_country_cd               , rest_country_cd                , char  , 10 ;
            송신지갑번호        , send_coin_wallet_no           , send_coin_wallet_no            , char  , 150;
            코인종류            , coin_kind_cd                  , coin_kind_cd                   , char  , 10;
            코인명              , coin_nm                       , coin_nm                        , char  , 100;
            당일출금금액        , dd_withdrawal_amt             , dd_withdrawal_amt              , char  , 22 ;
            당일입금금액        , dd_deposit_amt                , dd_deposit_amt                 , char  , 22 ;
            당일입금자명        , dd_deposit_nm                 , dd_deposit_nm                  , char  , 100;
            당일입금누적건수    , dd_deposit_add_cnt            , dd_deposit_add_cnt             , char  , 3  ;
            당일입금마지막시간  , dd_deposit_last_time          , dd_deposit_last_time           , char  , 6  ;
            당일로그인마지막시간, dd_login_last_time            , dd_login_last_time             , char  , 6  ;
            접속기기명          , access_equip_nm               , access_equip_nm                , char  , 100;
            인증수단변경시간    , certified_change_time         , certified_change_time          , char  , 6  ;
            API변경시간         , api_change_time               , api_change_time                , char  , 6  ;
        end
    END_DATA_MAP
END_FUNCTION_MAP
