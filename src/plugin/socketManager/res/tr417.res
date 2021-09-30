BEGIN_FUNCTION_MAP
	.Func,(tr417)부가서비스수수료율조회,tr417,headtype=A;
	BEGIN_DATA_MAP
		tr417In,입력,input;
		begin
			요청건수             ,req_cnt            ,req_cnt            ,long	,5 ;
		end
		tr417Out_c,출력공통,output;
		begin
			응답건수             ,rsp_cnt            ,rsp_cnt            ,long  ,5 ;
		end
		tr417Out,출력,output,occurs;
		begin
			적용시작일           ,aply_sta_dt        ,aply_sta_dt        ,char  ,8 ;
			부가서비스코드       ,adt_svc_cd         ,adt_svc_cd         ,char  ,5 ;
			부가서비스수수료율   ,fee_rt             ,fee_rt             ,double,15;
			적용종료일           ,aply_end_dt        ,aply_end_dt        ,char  ,8 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
