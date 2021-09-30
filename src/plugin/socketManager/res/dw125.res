BEGIN_FUNCTION_MAP
    .Func,(dw125)원화입금처리,dw125,headtype=A;
    BEGIN_DATA_MAP
        dw125In,입력,input;
        begin
            계정ID      , user_id       , user_id       , char  , 10;
            거래일자    , trd_dt        , trd_dt        , char  , 8;
            거래시각    , trd_tm        , trd_tm        , char  , 12;
            은행코드    , bank_cd       , bank_cd       , char  , 3;
            계좌번호    , acct_no       , acct_no       , char  , 20;
            거래금액    , trd_amt       , trd_amt       , long  , 20;
            트랜젝션ID  , txid          , txid          , char  , 14;
            처리여부    , proc_yn       , proc_yn       , char  , 1;
            에러메세지  , err_msg       , err_msg       , char  , 200;
        end
        dw125Out,출력,output;
        begin
            DUMMY       , dummy        , dummy         , char  , 1;
        end
    END_DATA_MAP
END_FUNCTION_MAP
