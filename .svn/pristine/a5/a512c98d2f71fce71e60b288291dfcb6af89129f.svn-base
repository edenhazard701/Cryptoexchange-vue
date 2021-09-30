BEGIN_FUNCTION_MAP
    .Func,(ac511) 마이페이지_회원자금정보조회,ac511,headtype=A;
    BEGIN_DATA_MAP
        ac511In,입력,input;
        begin
            계정ID            , user_id        , user_id        , char  , 10;
        end
        ac511Out,출력,output;
        begin
            자금원천구분      , fund_src_tp    , fund_src_tp    , char  ,  3;
            자금원천구분기타  , fund_src_etc   , fund_src_etc   , char  ,  60; //한글20자
            거래목적코드      , trd_purp_cd    , trd_purp_cd    , char  ,  2;
            거래목적기타      , trd_purp_etc   , trd_purp_etc   , char  ,  60; //한글20자
        end
    END_DATA_MAP
END_FUNCTION_MAP
