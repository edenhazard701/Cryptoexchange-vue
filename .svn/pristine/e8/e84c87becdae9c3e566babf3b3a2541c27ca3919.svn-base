BEGIN_FUNCTION_MAP
    .Push, (RB03)주문체결통지자동추가, RB03, key=10, keycnt=4000, bufcnt=100, group=1;
    BEGIN_DATA_MAP
    InBlock,입력,input;
    begin
    KEY_계정ID        , key_user_id      ,  key_user_id      , char,   10;
    end
    OutBlock,출력,output;
    begin
    데이터구분        , dt_div           ,  dt_div           , char,    4;
    KEY_계정ID        , key_user_id      ,  key_user_id      , char,   10;
    TR코드            , tr_code          ,  tr_code          , char,    2;
    이벤트구분        , evnt_tp          ,  evnt_tp          , char,    1;
    이벤트시간        , evnt_dtm         ,  evnt_dtm         , char,   14;
    계정ID            , user_id          ,  user_id          , char,   10;
	유닛코드          , unit_code        ,  unit_code        , char,    5;
    주문번호          , ord_no           ,  ord_no           , char,   10;
    원주문번호        , org_ord_no       ,  org_ord_no       , char,   10;
    종목코드          , symbol           ,  symbol           , char,   15;
    주문구분          , ord_tp           ,  ord_tp           , char,    1;
    매수매도구분      , buy_sell_tp      ,  buy_sell_tp      , char,    1;
    호가유형          , ord_prc_tp       ,  ord_prc_tp       , char,    1;
    주문조건          , ord_cond         ,  ord_cond         , char,    1;
    마진거래구분      , mrgn_trd_tp      ,  mrgn_trd_tp      , char,    1;
    주문상태          , ord_stat         ,  ord_stat         , char,    1;
    반대매매주문구분  , lqdt_ord_tp      ,  lqdt_ord_tp      , char,    1;
    자동매매주문구분  , auto_trd_ord_tp  ,  auto_trd_ord_tp  , char,    1;
    간편매매주문구분  , smpl_trd_ord_tp  ,  smpl_trd_ord_tp  , char,    1;
    대상통화코드      , trgt_cur_cd      ,  trgt_cur_cd      , char,    5;
    결제통화코드      , setl_cur_cd      ,  setl_cur_cd      , char,    5;
    주문수량          , ord_qty          ,  ord_qty          , char,   20;
    주문가격          , ord_prc          ,  ord_prc          , char,   20;
    전체체결수량      , tot_cntr_qty     ,  tot_cntr_qty     , char,   20;
    평균체결가격      , avg_cntr_prc     ,  avg_cntr_prc     , char,   20;
    전체체결금액      , tot_cntr_amt     ,  tot_cntr_amt     , char,   20;
    잔여수량          , remn_qty         ,  remn_qty         , char,   20;
    주문일시          , ord_dtm          ,  ord_dtm          , char,   14;
    주문만료일시      , ord_expr_dtm     ,  ord_expr_dtm     , char,   12;
    거래소체결ID      , exch_cntr_id     ,  exch_cntr_id     , char,   16;
    체결수량          , cntr_qty         ,  cntr_qty         , char,   20;
    체결가격          , cntr_prc         ,  cntr_prc         , char,   20;
    채널구분          , media_tp         ,  media_tp         , char,    2;
    맥주소            , mac_addr         ,  mac_addr         , char,   32;
    통화잔고구분      , cur_act_tp       ,  cur_act_tp       , char,    1;
    시스템트레이딩구분, sys_trd_tp       ,  sys_trd_tp       , char,    1;
    채널영역          , channel_area     ,  channel_area     , char,   20;
    확인수량          , cnfm_qty         ,  cnfm_qty         , char,   20;
    전체체결여부      , all_cntr_yn      ,  all_cntr_yn      , char,    1;
    수수료            , fee              ,  fee              , char,   20;
    체결금액          , cntr_amt         ,  cntr_amt         , char,   20;
	API원주문ID       , org_api_ord_id   ,  org_api_ord_id   , char,   20;
	API주문ID         , api_ord_id       ,  api_ord_id       , char,   20;
    설정일자          , est_dt           ,  est_dt           , char,    8;
    조건일련번호      , sq               ,  sq               , char,   10;
    자동주문유형      , md_cd            ,  md_cd            , char,    1;
    Stop              , stop_prc         ,  stop_prc         , char,   40;
    OrderQuantity     , ordr_q           ,  ordr_q           , char,   40;
    OrderPrice        , ordr_prc         ,  ordr_prc         , char,   40;
    Ordr Amt          , ordr_amt         ,  ordr_amt         , char,   40;
    Distance          , distance         ,  distance         , char,   40;
    end
    END_DATA_MAP
END_FUNCTION_MAP
