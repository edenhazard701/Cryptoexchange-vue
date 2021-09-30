BEGIN_FUNCTION_MAP
	.Func,(ac420)보유자산조회,ac420,headtype=A;
	BEGIN_DATA_MAP
		ac420In,입력,input;
		begin
			계정ID           , user_id		  , user_id			, long      , 10;
			검색타입			, sear_tp         , sear_tp         , char      ,  1;
			검색키워드			, sear_key        , sear_key		, char		, 50;
		end
		ac420Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt		  , rsp_cnt         , long	    ,  5;
			KRW환산총보유자산	, tot_krw_bal     , tot_krw_bal     , long      , 20;
		end
		ac420Out,출력,output,occurs;
		begin
			통화코드	        , cur_cd		  , cur_cd			, char	    ,  5;
			보유수량            	, cur_bal         , cur_bal         , double    , 30;
			KRW환산금액         	, krw_bal         , krw_bal         , long      , 20;
			전자지갑연계구분		, walt_cnct_tp    , walt_cnct_tp    , char      ,  1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
