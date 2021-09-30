BEGIN_FUNCTION_MAP
	.Func,(ac602)나의 마이닝 내역 조회,ac602,headtype=A;
	BEGIN_DATA_MAP
		ac602In,입력,input;
		begin
			계정ID			, user_id         , user_id         , char      ,  10;
			요청개수			, req_cnt		  , req_cnt			, int		,	5;
		end
		ac602Out_c,출력공통,output;
		begin
			통화코드	        , cur_cd		  , cur_cd			, char	    ,   5;	
			거래금액 			, trd_amt		  , trd_amt         , long	    ,  20;
			예상 채굴량 			, pdt_minn		  , pdt_minn        , double    ,  20;
			응답건수 			, rsp_cnt		  , rsp_cnt         , long	    ,   5;
		end
		ac602Out,출력,output,occurs;
		begin
			기준일시	        , base_dtm		  , base_dtm		, char	    ,  14;
			마이닝비율		    , minn_rt		  , minn_rt			, double    ,  20;
			채굴량           		, minn_qty	      , minn_qty     	, double  	,  20;
			누적 채굴량         		, tot_minn_qty    , tot_minn_qty    , double   	,  20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
