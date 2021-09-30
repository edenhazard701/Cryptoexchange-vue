BEGIN_FUNCTION_MAP
	.Func,(ac502)계정맵핑조회,ac502,headtype=A;
	BEGIN_DATA_MAP
		ac502In,입력,input;
		begin
			계정ID		, user_id				, user_id				, long 	, 10;
		end
		ac502Out_c,출력공통,output;
		begin
			응답건수 		, rsp_cnt				, rsp_cnt          		, long	, 5;
		end
		ac502Out,출력,output,occurs;
		begin
			계정그룹ID		, user_grp_id			, user_grp_id			, char  , 2;
			L4스위치 IP	, switch_ip	    		, switch_ip	    		, char  , 16;
			계정ID대역하한	, user_id_low_limt		, user_id_low_limt		, long  , 10;
			계정ID대역상한	, user_id_high_limt 	, user_id_high_limt		, long  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
