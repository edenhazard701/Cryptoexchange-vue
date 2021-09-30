BEGIN_FUNCTION_MAP
	.Func,(tr523)거래내역조회,tr523,headtype=A;
	BEGIN_DATA_MAP
		tr523In,입력,input;
		begin
			계정ID			    , user_id			, user_id			, char  ,10;
			검색시작일			, fr_dt             , fr_dt             , char	, 8;
			검색종료일			, to_dt             , to_dt             , char	, 8;
			대상코인			, trgt_coin		    , trgt_coin		    , char  ,10;
			종목코드            , symbol            , symbol            , char  ,15;
			매수도구분			, buy_sell_tp		, buy_sell_tp		, char  , 1;
			요청건수			, req_cnt           , req_cnt           , long	, 5;
		end
		tr523Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt			, rsp_cnt           , long	, 5;
		end
		tr523Out,출력,output,occurs;
		begin
			거래일시			, trd_dtm			, trd_dtm			, char		, 20;
			거래통화코드		, trd_cur_cd		, trd_cur_cd		, char		, 30;
			매수매도구분		, buy_sell_tp		, buy_sell_tp		, char		,  1;
			체결수량			, cntr_qty			, cntr_qty			, double  	, 20;
			체결가				, cntr_prc			, cntr_prc			, double  	, 20;
			거래금액			, trd_amt			, trd_amt			, double	, 20;
			수수료				, fee				, fee				, double  	, 20;
			정산금액			, net_amt			, net_amt			, double  	, 20;
			대상통화코드		, trgt_cur_cd		, trgt_cur_cd		, char		, 5;
			결제통화코드		, setl_cur_cd		, setl_cur_cd		, char		, 5;
			수수료통화코드		, fee_cur_cd		, fee_cur_cd		, char		, 5;
			종목코드            , symbol            , symbol            , char  ,15;
		end
	END_DATA_MAP
END_FUNCTION_MAP
