BEGIN_FUNCTION_MAP
	.Func,(ac608)TDI나의 참여내역 조회,ac608,headtype=A;
	BEGIN_DATA_MAP
		ac608In,입력,input;
		begin
			계정ID			, user_id		  , user_id			, char		,  10;
			요청개수			, req_cnt		  , req_cnt			, int		,	5;
		end
		ac608Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt		  , rsp_cnt         , long	    ,   5;
		end
		ac608Out,출력,output,occurs;
		begin
			기준일시    			, base_dtm		  , base_dtm	  	, char  	,  14;
			통화코드	        , cur_cd		  , cur_cd			, char	    ,   5;
			통화명		    , cur_nm		  , cur_nm			, char   	,  30;
			통화영문명		    , cur_eng_nm	  , cur_eng_nm		, char   	,  30;
			차수			    , seq			  , seq				, int   	,   1;
			TDI참여가격 		, tdi_invo_prc	  , tdi_invo_prc   	, long  	,  10;
			TDI참여수량    		, tdi_invo_qty	  , tdi_invo_qty   	, double  	,  20;
			TDI참여캐쉬    		, tdi_invo_cash   , tdi_invo_cash  	, double  	,  20;
			통화자릿수    		, dec_digt   	  , dec_digt  		, int	  	,   5;
		end
	END_DATA_MAP
END_FUNCTION_MAP