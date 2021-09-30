BEGIN_FUNCTION_MAP
    .Push, (RB01)주문체결통지, RB01, key=10, keycnt=4000, bufcnt=100, group=1;
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
    FILLER            , filler           ,  filler           , char,   40;
    end
    END_DATA_MAP
END_FUNCTION_MAP
