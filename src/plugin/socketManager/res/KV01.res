BEGIN_FUNCTION_MAP
    .Push, (KV01)가상화폐 수동주문, KV01, key=10, keycnt=4000, bufcnt=100, group=1;
    BEGIN_DATA_MAP
    InBlock,입력,input;
    begin
    KEY_계정ID        , key_user_id      ,  key_user_id      , char,   10;
    end
    OutBlock,출력,output;
    begin
    데이터구분        , dt_div           ,  dt_div           , char,    4;
    KEY_계정ID        , key_user_id      ,  key_user_id      , char,   10;
    종목코드          , symbol           ,  symbol           , char,   15;
    설정일자          , est_dt           ,  est_dt           , char,    8;
    일련번호          , sq               ,  sq               , char,   10;
    종목명            , is_nm            ,  is_nm            , char,   40;
    조건설정유형      , est_typ_cd       ,  est_typ_cd       , char,    2;
    매매구분          , trd_ccd          ,  trd_ccd          , char,    1;
    매매구분명        , trd_ccd_nm       ,  trd_ccd_nm       , char,   20;
    주문유형          , ordr_typ_cd      ,  ordr_typ_cd      , char,    1;
    주문유형명        , ordr_typ_nm      ,  ordr_typ_nm      , char,   40;
    주문수량          , ordr_q           ,  ordr_q           , char,   20;
    주문수량명        , ordr_q_nm        ,  ordr_q_nm        , char,   50;
    주문가격          , ordr_prc         ,  ordr_prc         , char,   20;
    주문가격명        , ordr_prc_nm      ,  ordr_prc_nm      , char,   50;
    조건메세지        , msg              ,  msg              , char,  200;
    end
    END_DATA_MAP
END_FUNCTION_MAP