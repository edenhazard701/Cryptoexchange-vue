BEGIN_FUNCTION_MAP
	.Func,(tr302)랜딩투자내역조회,tr302,headtype=A;
	BEGIN_DATA_MAP
		tr302In,입력,input;
		begin
			계정ID             ,user_id          ,user_id        ,long    ,10;
			조회구분           ,qry_tp           ,qry_tp         ,char    ,1 ;
			조회시작일         ,sta_dt           ,sta_dt         ,char    ,8 ;
			조회종료일         ,end_dt           ,end_dt         ,char    ,8 ;
			요청건수           ,req_cnt          ,req_cnt        ,long    ,5 ;
		end
		tr302Out_c,출력공통,output;
		begin
			응답건수           ,rsp_cnt          ,rsp_cnt        ,long    ,5 ;
		end
		tr302Out,출력,output,occurs;
		begin
			랜딩ID          ,lend_id         , lend_id           ,long    ,10;
			통화코드        ,cur_cd          , cur_cd            ,char    ,5 ;
			연수익율        ,prft_rt         , prft_rt           ,double  ,10;
			투자시작일시    ,invt_sta_dtm    , invt_sta_dtm      ,char    ,12;
			투자종료일시    ,invt_end_dtm    , invt_end_dtm      ,char    ,12;
			자동재투자여부  ,auto_re_invt_yn , auto_re_invt_yn   ,char    ,1 ;
			투자금액        ,lend_qty        , lend_qty          ,double  ,20;
			이자금액        ,int_qty         , int_qty           ,double  ,20;
			회수금액        ,lqdt_qty        , lqdt_qty          ,double  ,20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
