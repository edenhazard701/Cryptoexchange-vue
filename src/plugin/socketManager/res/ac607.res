BEGIN_FUNCTION_MAP
	.Func,(ac607)나의 참여가능 정보 조회,ac607,headtype=A;
	BEGIN_DATA_MAP
		ac607In,입력,input;
		begin
			계정ID			, user_id			, user_id			, char			,	10;	
			통화코드			, cur_cd			, cur_cd			, char			,	 5;
			차수				, seq				, seq				, int			,	 1;
		end
		ac607Out,출력,output;
		begin
			통화코드			, cur_cd       		, cur_cd     		, char   		,	 5;
			차수				, seq        		, seq      			, int	    	, 	 1;
			보유캐쉬			, remn_cash  		, remn_cash			, double  		, 	20;
			TDI참여가격		, tdi_invo_prc   	, tdi_invo_prc 		, long    		, 	10;
			참여가능수량		, invo_able_qty   	, invo_able_qty 	, double  		, 	20;
			나의참여가능수량한도	, my_able_limt      , my_able_limt      , double    	, 	20;
			나의참여최대가능수량	, my_max_able_qty  	, my_max_able_qty	, double  		, 	20;
			TDI참여가능여부		, tdi_invo_yn  		, tdi_invo_yn 		, char    		, 	 1;
			통화자릿수         , dec_digt        , dec_digt          , int          ,     5;
		end
	END_DATA_MAP
END_FUNCTION_MAP
