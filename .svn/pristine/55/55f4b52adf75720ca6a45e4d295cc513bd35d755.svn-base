BEGIN_FUNCTION_MAP
	.Func,(tr411)마진레버리지조회,tr411,headtype=A;
	BEGIN_DATA_MAP
		tr411In,입력,input;
		begin
			요청건수        ,req_cnt            ,req_cnt            ,long   , 5 ;
		end
		tr411Out_c,출력공통,output;
		begin
			응답건수        ,rsp_cnt            ,rsp_cnt            ,long   , 5 ;
		end
		tr411Out,출력,output,occurs;
		begin
			적용시작일      ,aply_sta_dt        ,aply_sta_dt        ,char   , 8 ;
			통화코드        ,cur_cd             ,cur_cd             ,char   , 5 ;
			고객등급        ,user_levl          ,user_levl          ,char   , 2 ;
			개시담보비율    ,open_wrnt_rt       ,open_wrnt_rt       ,double , 15;
			유지담보비율    ,keep_wrnt_rt       ,keep_wrnt_rt       ,double , 15;
			적용종료일      ,aply_end_dt        ,aply_end_dt        ,char   , 8 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
