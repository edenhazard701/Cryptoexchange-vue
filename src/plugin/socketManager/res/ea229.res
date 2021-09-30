BEGIN_FUNCTION_MAP
	.Func,(ea229)고객거래제한조회_고객용,ea229,headtype=A;
	BEGIN_DATA_MAP
		ea229In,입력,input;
		begin
			계정ID       		, user_id           , user_id           , char  , 10;
			요청건수          	, req_cnt           , req_cnt           , char	,  5;
		end
		ea229Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt		  	, rsp_cnt           , long	,  5;
		end
		ea229Out,출력,output,occurs;
		begin
			제한구분      		, cnst_tp         	, cnst_tp         	, char  ,  1;
			등록일자      		, regi_dt         	, regi_dt         	, char  ,  8;
			등록해지사유		, resn_nm			, resn_nm			, char  ,500;
		end
	END_DATA_MAP
END_FUNCTION_MAP
