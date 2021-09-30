BEGIN_FUNCTION_MAP
	.Func,(tr414)랜딩공모정보 등록_수정,tr414,headtype=A;
	BEGIN_DATA_MAP
		tr414In,입력,input;
		begin
			처리구분        ,proc_tp            ,proc_tp            ,char  , 1 ;
			랜딩ID          ,lend_id            ,lend_id            ,long  , 10;
			통화코드        ,cur_cd             ,cur_cd             ,char  , 5 ;
			연수익율        ,prft_rt            ,prft_rt            ,double, 15;
			공모시작일      ,subs_sta_dt        ,subs_sta_dt        ,char  , 8 ;
			공모종료일      ,subs_end_dt        ,subs_end_dt        ,char  , 8 ;
			투자일수        ,invt_days          ,invt_days          ,long  , 15;
			최소투자단위수량,min_invt_unit_qty  ,min_invt_unit_qty  ,double, 20;
			총공모수량      ,tot_subs_qty       ,tot_subs_qty       ,double, 20;
		end
		tr414Out,출력,output;
		begin
			DUMMY           ,dummy              ,dummy              ,char  , 1 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
