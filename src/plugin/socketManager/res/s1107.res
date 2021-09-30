BEGIN_FUNCTION_MAP
    .Func,(s1107)가상화폐 자동주문 잔고 상세비교,s1107,headtype=B;
    BEGIN_DATA_MAP
        s1107In1,입력,input;
        begin
			유저ID                  		, user_id                   , user_id                   , char	,   10;
        end
        s1107Out1,출력,output;
        begin
			유저ID                  		, user_id                   , user_id                   , char  ,   10;
			계좌구분                        , act_tp      				, act_tp      				, char	,	 1;
			통화코드                        , cur_cd                    , cur_cd                    , char	,	 5;
			종목구분                        , is_ccd                    , is_ccd                    , char	,   20;
			메모리잔고수량                  , shm_cur_bal               , shm_cur_bal               , double, 20.8;
			메모리매입금액(수수료)          , shm_buy_pamt_fee          , shm_buy_pamt_fee          , double, 20.8;
			메모리사용가능수량              , shm_ord_able_qty          , shm_ord_able_qty          , double, 20.8;
			원장잔고수량                    , tr_cur_bal                , tr_cur_bal                , double, 20.8;
			원장매입금액(수수료)            , tr_buy_pamt_fee           , tr_buy_pamt_fee           , double, 20.8;
			원장사용가능수량                , tr_ord_able_qty           , tr_ord_able_qty           , double, 20.8;
        end
    END_DATA_MAP
END_FUNCTION_MAP
