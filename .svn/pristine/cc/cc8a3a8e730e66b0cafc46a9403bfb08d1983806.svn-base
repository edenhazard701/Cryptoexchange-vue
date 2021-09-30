BEGIN_FUNCTION_MAP
	.Func,(s0053)가상화폐 서버자동주문 자동주문내역 조회,s0053,headtype=B;
	BEGIN_DATA_MAP
		s0053InBlock,입력,input;
		begin
			USER ID           , user_id         , user_id        , char   ,  10;
			조회일자FROM      , from_dt         , from_dt        , char   ,   8;
			조회일자TO        , end_dt          , end_dt         , char   ,   8;
			사용자구분        , mbr_ccd         , mbr_ccd        , char   ,   2; //00:직원 01:고객
			조건상태          , hndl_st_vl      , hndl_st_vl     , char   ,   2; //0:감시해제 1:감시중 2:미체결감시중 3.조건만족 4:유효기간만료 98전체조회(감시중 제외, MTS용)99:전체
		end
		s0053OutBlock1,출력,output;
		begin
			츨력개수          , out_cnt         , out_cnt        , char   ,   5;
		end
		s0053OutBlock2,출력,output,occurs;
		begin
			시퀀스번호        , sq              , sq             , char   ,  10;
			원주문번호        , orgn_ordr_no    , orgn_ordr_no   , char   ,  10;
			주문번호          , ordr_no         , ordr_no        , char   ,  10;
			모주문번호        , mthr_ordr_no    , mthr_ordr_no   , char   ,  10;
			설정일자시간      , cndt_est_dy_tm  , cndt_est_dy_tm , char   ,  20;
			대상통화코드      , tradcurrcode    , tradcurrcode   , char   ,  30;
			결제통화코드      , paycurrcode     , paycurrcode    , char   ,  30;
			종목코드          , symbol          , symbol         , char   ,  15;
			종목코드약어      , symbol_abbr     , symbol_abbr    , char   ,  40;
			자동주문구분      , md_cd           , md_cd          , char   ,   1; //1:Stop_Market 2:Stop_Limit 3:Trailing_Stop
			매수도구분        , trd_ccd         , trd_ccd        , char   ,   1; //1:BUY 2:SELL
			주문구분          , ordr_typ_cd     , ordr_typ_cd    , char   ,   1; //1:Market 2:Limit
			스탑가격          , stop_prc        , stop_prc       , char   ,  40;
			주문수량          , ordr_q          , ordr_q         , char   ,  40;
			주문가격          , ordr_prc        , ordr_prc       , char   ,  40;
			주문금액          , ordr_amt        , ordr_amt       , char   ,  40;
			상승폭            , distance        , distance       , char   ,  40;
			조건상태          , hndl_st_vl      , hndl_st_vl     , char   ,   1; //1:Monitoring 2:Expired 3:Completed 4:Canceled
			종료일자          , end_dt          , end_dt         , char   ,  20;
			설정일자          , est_dt          , est_dt         , char   ,   8;
			주문처리상태      , ordr_hndl_ccd   , ordr_hndl_ccd  , char   ,   1;
			거부메세지        , rfsl_msg        , rfsl_msg       , char   , 100;
		end
	END_DATA_MAP
END_FUNCTION_MAP
