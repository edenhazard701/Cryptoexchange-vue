BEGIN_FUNCTION_MAP
	.Func,(ea429)고객별 거래내역 조회,ea429,headtype=A;
	BEGIN_DATA_MAP
		ea429In,입력,input;
		begin
			   거래구분 		 	        , trd_tp			      , trd_tp			      , char  ,  1;
		     검색시작일           	  , fr_dt             , fr_dt             , char	,  8;
			   검색종료일          	  , to_dt             , to_dt             , char	,  8;
			   통화코드 			        , cur_cd			      , cur_cd			      , char  ,  5;
			   요청건수             	, req_cnt           , req_cnt           , long	,  5;
		end
		ea429Out_c,출력공통,output;
		begin
			   응답건수 			, rsp_cnt			, rsp_cnt           , long	, 5;
		end
		ea429Out,출력,output,occurs;
		begin
			    계정ID          	      , user_id     		    , user_id      		 , char  , 10;
			    계좌구분                , act_tp              , act_tp           , char  ,  1;
          통화코드            		, cur_cd      		    , cur_cd       		 , char  ,  5;
	      	거래일자            		, trd_dt      		    , trd_dt       		 , char  ,  8;
	      	거래시각            		, trd_tm      		    , trd_tm       		 , char  , 12;
	      	업무구분                , biz_tp              , biz_tp           , char  ,  1;
	      	업무상세구분             , biz_detl_tp         , biz_detl_tp      , char  ,  1;
	      	적요코드                , rmrk_cd             , rmrk_cd          , char  ,  5;
	      	주문번호                , ord_no              , ord_no           , long  , 15;
	        거래소체결 ID            , exch_cntr_id	      , exch_cntr_id     , long  , 16;
	        거래수량            		, trd_qty     		    , trd_qty      		  , double, 20;
	      	거래단가            		, trd_prc     		    , trd_prc      		  , double, 20;
	      	거래금액            		, trd_amt     		    , trd_amt      		  , double, 20;
	      	원화평가금액   	      	, krw_evlt_amt 		    , krw_evlt_amt  	  , double, 20;
	      	원화환산 거래금액       	, krw_prc_trd_amt 	  , krw_prc_trd_amt  	, double, 20;
	      	원화환산 매도장부금액    	, krw_prc_sell_book_amt 		, krw_prc_sell_book_amt  	, double, 20;
	      	원화환산손익           	, krw_prc_pl 		      , krw_prc_pl  	   , double, 20;
	      	전통화장고 						 , bf_cur_bal          , bf_cur_bal        , double, 20;
	      	전 KRW기준 매입금액      , bf_krw_buy_pamt     , bf_krw_buy_pamt   , double, 20;
	      	전 여분통화잔고          , bf_extr_cur_bal     , bf_extr_cur_bal   , double, 20; 
	      	후통화장고 						 , af_cur_bal          , af_cur_bal        , double, 20;
	      	후 KRW기준 매입금액      , af_krw_buy_pamt     , af_krw_buy_pamt   , double, 20;
	      	후 여분통화잔고          , af_extr_cur_bal     , af_extr_cur_bal   , double, 20; 
	        대상통화 KRW매수수수료    , trgt_krw_buy_fee    , trgt_krw_buy_fee  , double, 20; 
          결제통화 KRW매수수수료    , setl_krw_buy_fee    , setl_krw_buy_fee  , double, 20; 
	      	출금수수료            	 , widr_fee         	 , widr_fee          , double, 20;
	      	네트워크출금수수료        , widr_fee_amt        , widr_fee_amt      , double, 20;
	      	KRW기준 매입수수료	  	 , krw_buy_fee 		   , krw_buy_fee  		 , double, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP