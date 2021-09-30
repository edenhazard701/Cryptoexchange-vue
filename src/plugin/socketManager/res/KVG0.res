BEGIN_FUNCTION_MAP
    .Feed, (KVG0)KVX 스마트시그널, KVG0, key=20, keycnt=1000, bufcnt=1, group=1;
    BEGIN_DATA_MAP
    InBlock,입력,input;
    begin
    전문가ID               , expt_rgst_no         , expt_rgst_no         , char   ,   20;
    end
    OutBlock,출력,output;
    begin
    전문가ID               , expt_rgst_no         , expt_rgst_no         , char   ,   20;
    전략명                 , expt_strtg_key       , expt_strtg_key       , char   ,   32;
    전문가명               , expt_nm              , expt_nm              , char   ,   20;
    전문가예명             , expt_nnm             , expt_nnm             , char   ,   40;
    종목코드               , symbol               , symbol               , char   ,   15;
    대상통화소수점자리수   , tradcurrdcmpntdgt    , tradcurrdcmpntdgt    , char   ,    1;
    신호발생일시           , rgst_dttm            , rgst_dttm            , char   ,   14;
    신호매수가             , sig_buy              , sig_buy              , double ,   20;
    신호매도가             , sig_sell             , sig_sell             , double ,   20;
    신호목표가             , sig_target           , sig_target           , double ,   20;
    신호손절가             , sig_sales            , sig_sales            , double ,   20;
    한글종목명             , korname              , korname              , char   ,   50;
    영문종목명             , engname              , engname              , char   ,   50;
    대상통화코드           , tradcurrcode         , tradcurrcode         , char   ,   30;
    결제통화코드           , paycurrcode          , paycurrcode          , char   ,   30;
    end
    END_DATA_MAP
END_FUNCTION_MAP
