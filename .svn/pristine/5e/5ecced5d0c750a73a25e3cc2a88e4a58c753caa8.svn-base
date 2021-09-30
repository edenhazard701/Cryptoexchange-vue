BEGIN_FUNCTION_MAP
	.Func,(tr413)랜딩공모정보조회,tr413,headtype=A;
	BEGIN_DATA_MAP
		tr413In,입력,input;
		begin
			통화코드        ,cur_cd             ,cur_cd             ,char  , 5 ;
			요청건수        ,req_cnt            ,req_cnt            ,long  , 5 ;
		end
		tr413Out_c,출력공통,output;
		begin
			응답건수        ,rsp_cnt            ,rsp_cnt            ,long  , 5 ;
		end
		tr413Out,출력,output,occurs;
		begin
			랜딩ID          ,lend_id            ,lend_id            ,char  , 10;
			통화코드        ,cur_cd             ,cur_cd             ,char  , 5 ;
			연수익율        ,prft_rt            ,prft_rt            ,double, 15;
			공모시작일      ,subs_sta_dt        ,subs_sta_dt        ,char  , 8 ;
			공모종료일      ,subs_end_dt        ,subs_end_dt        ,char  , 8 ;
			투자일수        ,invt_days          ,invt_days          ,long  , 15;
			최소투자단위수량,min_invt_unit_qty  ,min_invt_unit_qty  ,double, 20;
			총공모수량      ,tot_subs_qty       ,tot_subs_qty       ,double, 20;
			공모수량        ,subs_qty           ,subs_qty           ,double, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
