BEGIN_FUNCTION_MAP
	.Func,(ac534)API Key 메모조회(관리자),ac534,headtype=A;
	BEGIN_DATA_MAP
		ac534In,입력,input;
		begin
			CONNECT KEY		, connect_key	, connect_key	, char	,  32;
			wrk_oper_id		, wrk_oper_id	, wrk_oper_id	, char	,  10;		// 조회 작업자 ID
		end
		ac534Out_c,출력공통,output;
        begin
            응답건수    , rsp_cnt       , rsp_cnt       , long  , 5;
        end
		ac534Out,출력,output,occurs;
		begin
			CONNECT KEY		, connect_key	, connect_key	, char	,  32;
			작업자 계정명	, wrk_oper_nm	, wrk_oper_nm	, char	,  10;		// 작업자 계정 ID
			작업자 등록일시	, wrk_dtm		, wrk_dtm		, char	,  14;		// 작업자 등록일시
			메모			, memo			, memo			, char	, 256;		// 메모 내용
		end
	END_DATA_MAP
END_FUNCTION_MAP
