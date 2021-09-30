BEGIN_FUNCTION_MAP
    .Func,(dw101)전자지갑주소발급,dw101,headtype=A;
    BEGIN_DATA_MAP
        dw101In,입력,input;
        begin
            계정ID              , user_id       , user_id       , char  , 10;
            발급될통화코드      , cur_cd        , cur_cd        , char  , 5;
            계좌구분            , account_tp    , account_tp    , char  , 1;    /* 1:고객, 2:회사 */
        end
        dw101Out,출력,output;
        begin
            발급된통화코드      , cur_cd        , cur_cd        , char  , 5;
            전자지갑주소        , walt_id       , walt_id       , char  , 256;
            보조필드            , sub_info      , sub_info      , char  , 50;
        end
    END_DATA_MAP
END_FUNCTION_MAP