BEGIN_FUNCTION_MAP
    .Func,(ac124)계좌만들기 투자정보입력,ac124,headtype=A;
    BEGIN_DATA_MAP
        ac124In,입력,input;
        begin
            계정ID             , user_id           , user_id          , char  , 10;
            자금원천구분       , fund_src_tp       , fund_src_tp      , char  ,  3;
            자금원천구분기타   , fund_src_etc      , fund_src_etc     , char  ,  60; //한글20자
            거래목적코드       , trd_purp_cd       , trd_purp_cd      , char  ,  2;
            거래목적기타       , trd_purp_etc      , trd_purp_etc     , char  ,  60; //한글20자
        end
        ac124Out,출력,output;
        begin
            DUMMY               , dummy             , dummy            , char  ,  1;
        end
    END_DATA_MAP
END_FUNCTION_MAP
