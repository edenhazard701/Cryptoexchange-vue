BEGIN_FUNCTION_MAP
  .Func,(cm401)출금한도조회,cm401,headtype=A;
  BEGIN_DATA_MAP
    cm401In,입력,input;
    begin
      유닛코드        , unit_code         , unit_code         , char   ,  5; // 2020/02/19 UNIVAX 대상 수정 - 문민웅
      통화코드        , cur_cd            , cur_cd            , char   ,  5;
      한도등급        , widr_levl         , widr_levl         , char   ,  1;
      요청건수        , req_cnt           , req_cnt           , long   ,  5;
    end
    cm401Out_c,출력공통,output;
    begin
      응답건수           , rsp_cnt           , rsp_cnt           , long   ,   5;
    end
    cm401Out,출력,output,occurs;
    begin
      유닛명          , unit_kor_nm       , unit_kor_nm       , char   ,   50; // 2020/02/19 UNIVAX 대상 수정 - 문민웅
      통화코드        , cur_cd            , cur_cd            , char   ,   5;
      한도등급        , widr_levl         , widr_levl         , char   ,   1;
      이전일일출금한도    , bf_day_limt       , bf_day_limt       , double ,  15;
      이전일회출금한도    , bf_once_limt      , bf_once_limt      , double ,  15;
      일일출금한도    , day_limt          , day_limt          , double ,  15;
      일회출금한도    , once_limt         , once_limt         , double ,  15;
      작업일시        , work_dtm          , work_dtm          , char   ,  14;
      작업자ID        , work_oper_id      , work_oper_id      , char   ,  20;
      작업자명        , work_oper_nm      , work_oper_nm      , char   ,  30;
    end
  END_DATA_MAP
END_FUNCTION_MAP
