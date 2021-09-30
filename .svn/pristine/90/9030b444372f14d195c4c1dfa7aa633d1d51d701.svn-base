BEGIN_FUNCTION_MAP
	.Func,(dw530)입출금자산조회,dw530,headtype=A;
	BEGIN_DATA_MAP
		dw530In,입력,input;
		begin
			계정ID           , user_id		  , user_id			, char      , 10;
			검색타입			, sear_tp         , sear_tp         , char      ,  1;
			검색키워드			, sear_key        , sear_key		, char		, 50;
		end
		dw530Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt		  , rsp_cnt         , long	    ,  5;
		end
		dw530Out,출력,output,occurs;
		begin
			통화코드	        , cur_cd		  , cur_cd			, char	    ,  5;
			보유자산         	  	, cur_bal         , cur_bal         , double    , 30;
			보유자산KRW환산금액    , krw_bal         , krw_bal         , long      , 20;
			사용중수량			, tot_hold_qty	  , tot_hold_qty	, double    , 30;
			사용중KRW환산금액	, krw_hold_bal	  , krw_hold_bal    , long      , 20;
			출금가능 수량		, widr_able_qty	  , widr_able_qty   , double    , 30;
			출금가능KRW환산금액	, krw_able_bal	  , krw_able_bal	, long		, 20;
			전자지갑연계구분		, walt_cnct_tp    , walt_cnct_tp    , char      ,  1;
			통화명		, cur_nm    , cur_nm    , char      ,  60;
		end
	END_DATA_MAP
END_FUNCTION_MAP
