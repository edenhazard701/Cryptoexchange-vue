BEGIN_FUNCTION_MAP
	.Func,(cm606)주문가 상하한폭 조회,cm606,headtype=A;
	BEGIN_DATA_MAP
		cm606In,입력,input;
		begin
			기준일자           , base_dt           , base_dt           , char  ,   8;
			종목코드		, symbol			, symbol			, char  ,  15;
			요청건수		, req_cnt			, req_cnt			, long	,	5;
		end
		cm606Out_c,출력공통,output;
		begin
			응답건수 		  , rsp_cnt			, rsp_cnt           , long	,	5;
		end
		cm606Out,출력,output,occurs;
		begin
			종목코드		, symbol			, symbol			, char  ,  15;
			종목이름           , inst_kor_nm       , inst_kor_nm       , char  ,  50;
			적용일자		, aply_sta_dt		, aply_sta_dt		, char	,   8;
			하한제한율		, low_limt_rt		, low_limt_rt		, long  ,   5;
			상한제한율		, high_limt_rt		, high_limt_rt		, long  ,   5;
			적용종료일자	, aply_end_dt		, aply_end_dt		, char	,   8;
			작업일시		, work_dtm			, work_dtm			, char	,  14;
			작업자ID		, work_oper_id		, work_oper_id		, char	,  20;
			작업자명		, work_oper_nm		, work_oper_nm		, char	,  30;
		end
	END_DATA_MAP
END_FUNCTION_MAP
