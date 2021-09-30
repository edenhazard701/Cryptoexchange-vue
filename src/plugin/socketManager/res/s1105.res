BEGIN_FUNCTION_MAP
    .Func,(s1105)시장별 조건일련번호 정보 조회,s1105,headtype=B;
    BEGIN_DATA_MAP
        s1105In1,입력,input;
        begin
			dummy	              , dummy                     , dummy                     , char	,    1;
        end
        s1105Out1,출력,output;
        begin
			잔고청산감시해제	  , cond01kv_hndl0			  , cond01kv_hndl0     	      , long	,	10;
			잔고청산감시중        , cond01kv_hndl1            , cond01kv_hndl1            , long	,	10;
			잔고청산미체결감시중  , cond01kv_hndl2            , cond01kv_hndl2            , long	,	10;
			잔고청산조건만족      , cond01kv_hndl3            , cond01kv_hndl3            , long	,	10;
			잔고청산주문전송      , cond01kv_ordr_snd         , cond01kv_ordr_snd         , long	,	10;
			잔고청산주문오류      , cond01kv_ordr_err         , cond01kv_ordr_err         , long	,	10;
			잔고청산HOST접수      , cond01kv_ordr_acpt1       , cond01kv_ordr_acpt1       , long	,	10;
			잔고청산HOST거부      , cond01kv_ordr_rfsl1       , cond01kv_ordr_rfsl1       , long	,	10;
			잔고청산거래소접수    , cond01kv_ordr_acpt2       , cond01kv_ordr_acpt2       , long	,	10;
			잔고청산거래소거부    , cond01kv_ordr_rfsl2       , cond01kv_ordr_rfsl2       , long	,	10;
			잔고청산주문체결      , cond01kv_ordr_cncs        , cond01kv_ordr_cncs        , long	,	10;
			잔고청산주문취소      , cond01kv_ordr_cncl        , cond01kv_ordr_cncl        , long	,	10;
			잔고청산주문정정      , cond01kv_ordr_crct        , cond01kv_ordr_crct        , long	,	10;
			신규조건감시해제      , cond02kv_hndl0            , cond02kv_hndl0            , long	,	10;
			신규조건감시중        , cond02kv_hndl1            , cond02kv_hndl1            , long	,	10;
			신규조건미체결감시중  , cond02kv_hndl2            , cond02kv_hndl2            , long	,	10;
			신규조건조건만족      , cond02kv_hndl3            , cond02kv_hndl3            , long	,	10;
			신규조건주문전송      , cond02kv_ordr_snd         , cond02kv_ordr_snd         , long	,	10;
			신규조건주문오류      , cond02kv_ordr_err         , cond02kv_ordr_err         , long	,	10;
			신규조건HOST접수      , cond02kv_ordr_acpt1       , cond02kv_ordr_acpt1       , long	,	10;
			신규조건HOST거부      , cond02kv_ordr_rfsl1       , cond02kv_ordr_rfsl1       , long	,	10;
			신규조건거래소접수    , cond02kv_ordr_acpt2       , cond02kv_ordr_acpt2       , long	,	10;
			신규조건거래소거부    , cond02kv_ordr_rfsl2       , cond02kv_ordr_rfsl2       , long	,	10;
			신규조건주문체결      , cond02kv_ordr_cncs        , cond02kv_ordr_cncs        , long	,	10;
			신규조건주문취소      , cond02kv_ordr_cncl        , cond02kv_ordr_cncl        , long	,	10;
			신규조건주문정정      , cond02kv_ordr_crct        , cond02kv_ordr_crct        , long	,	10;
			미체결감시해제        , cond03kv_hndl0            , cond03kv_hndl0            , long	,	10;
			미체결감시중          , cond03kv_hndl1            , cond03kv_hndl1            , long	,	10;
			미체결미체결감시중    , cond03kv_hndl2            , cond03kv_hndl2            , long	,	10;
			미체결조건만족        , cond03kv_hndl3            , cond03kv_hndl3            , long	,	10;
			미체결주문전송        , cond03kv_ordr_snd         , cond03kv_ordr_snd         , long	,	10;
			미체결주문오류        , cond03kv_ordr_err         , cond03kv_ordr_err         , long	,	10;
			미체결HOST접수        , cond03kv_ordr_acpt1       , cond03kv_ordr_acpt1       , long	,	10;
			미체결HOST거부        , cond03kv_ordr_rfsl1       , cond03kv_ordr_rfsl1       , long	,	10;
			미체결거래소접수      , cond03kv_ordr_acpt2       , cond03kv_ordr_acpt2       , long	,	10;
			미체결거래소거부      , cond03kv_ordr_rfsl2       , cond03kv_ordr_rfsl2       , long	,	10;
			미체결주문체결        , cond03kv_ordr_cncs        , cond03kv_ordr_cncs        , long	,	10;
			미체결주문취소        , cond03kv_ordr_cncl        , cond03kv_ordr_cncl        , long	,	10;
			미체결주문정정        , cond03kv_ordr_crct        , cond03kv_ordr_crct        , long	,	10;
        end
    END_DATA_MAP
END_FUNCTION_MAP
