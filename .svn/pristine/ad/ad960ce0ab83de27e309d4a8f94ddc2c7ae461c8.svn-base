BEGIN_FUNCTION_MAP
    .Feed, (KVM2)KVX 24시간 변동량SIMPLE, KVM2, key=15, keycnt=1000, bufcnt=200, group=1;
    BEGIN_DATA_MAP
    InBlock,입력,input;
    begin
	종목코드                , symbol               , symbol               , char   ,   15;
    end
    OutBlock,출력,output;
    begin
	종목코드                , symbol               , symbol               , char   ,   15;
	조회일자                , qry_date             , qry_date             , char   ,    8;
	조회시간                , qry_time             , qry_time             , char   ,    6;
	1440분전 시가           , openprc_1440         , openprc_1440         , double ,   20;
    1440분전 고가           , highprc_1440         , highprc_1440         , double ,   20;
    1440분전 저가           , lowprc_1440          , lowprc_1440          , double ,   20;
    1440분전 종가           , curprc_1440          , curprc_1440          , double ,   20;
    1440분전 등락율         , updnrate_1440        , updnrate_1440        , double ,   20;
    1440분전 대비           , diff_1440            , diff_1440            , double ,   20;
    1440분전 거래대금       , cumdealcost_1440     , cumdealcost_1440     , long   ,   20;
    당일 종가               , curprc               , curprc               , double ,   20;
    당일 등락율             , updnrate             , updnrate             , double ,   20;
    end
    END_DATA_MAP
END_FUNCTION_MAP
