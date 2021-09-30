BEGIN_FUNCTION_MAP
    .Func,(ac531)API Key List 조회,ac531,headtype=A;
    BEGIN_DATA_MAP
        ac531In,입력,input;
        begin
            계정ID      , user_id       , user_id       , char  , 10;
            요청건수    , req_cnt       , req_cnt       , long  , 5;
        end
        ac531Out_c,출력공통,output;
        begin
            응답건수    , rsp_cnt       , rsp_cnt       , long  , 5;
        end
        ac531Out,출력,output,occurs;
        begin
            UNIT_CODE       , unit_code         , unit_code         , char  ,  5;
            CONNECT KEY     , connect_key       , connect_key       , char  , 32;
            등록일자        , reg_dtm           , reg_dtm           , char  , 14;       // 등록일자
            만료일자        , expr_dtm          , expr_dtm          , char  , 14;       // 만료일자
            시세            , curt_st           , curt_st           , char  ,  1;       // 0 : 사용불가능, 1: 사용가능
            주문            , ord_st            , ord_st            , char  ,  1;       // 0 : 사용불가능, 1: 사용가능
            잔고            , cur_bar_st        , cur_bar_st        , char  ,  1;       // 0 : 사용불가능, 1: 사용가능
            종목정보        , inst_st           , inst_st           , char  ,  1;       // 0 : 사용불가능, 1: 사용가능
            IP 정보         , ip_info           , ip_info           , char  , 64;
        end
    END_DATA_MAP
END_FUNCTION_MAP
