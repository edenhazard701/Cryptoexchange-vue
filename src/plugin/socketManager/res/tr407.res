BEGIN_FUNCTION_MAP
	.Func,(tr407)대용가율조회,tr407,headtype=A;
	BEGIN_DATA_MAP
		tr407In,입력,input;
		begin
			조회구분        ,qry_tp             ,qry_tp             ,char  ,1 ;
			요청건수        ,req_cnt            ,req_cnt            ,long  ,5 ;
		end
		tr407Out_c,출력공통,output;
		begin
			응답건수        ,rsp_cnt            ,rsp_cnt            ,long  ,5 ;
		end
		tr407Out,출력,output,occurs;
		begin
			적용시작일      ,aply_sta_dt        ,aply_sta_dt        ,char  ,8 ;
			통화코드        ,cur_cd             ,cur_cd             ,char  ,5 ;
			통화명          ,cur_kor_nm         ,cur_kor_nm         ,char  ,30;
			대용가율        ,sbst_rt            ,sbst_rt            ,double,15;
			적용종료일      ,aply_end_dt        ,aply_end_dt        ,char  ,8 ;
			작업자          ,wrk_oper_id        ,wrk_oper_id        ,char  ,10;
			작업일시        ,wrk_dtm            ,wrk_dtm            ,char  ,14;
		end
	END_DATA_MAP
END_FUNCTION_MAP
