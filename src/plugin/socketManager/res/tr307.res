BEGIN_FUNCTION_MAP
	.Func,(tr307)랜딩거래내역조회,tr307,headtype=A;
	BEGIN_DATA_MAP
		tr307In,입력,input;
		begin
			계정ID             ,user_id          ,user_id        ,long    ,10;
			요청건수           ,req_cnt          ,req_cnt        ,long    ,5 ;
		end
		tr307Out_c,출력공통,output;
		begin
			응답건수           ,rsp_cnt          ,rsp_cnt        ,long    ,5 ;
		end
		tr307Out,출력,output,occurs;
		begin
			거래일자           ,trd_dt           ,trd_dt         ,char    ,8 ;
      		거래시각           ,trd_tm           ,trd_tm         ,char    ,9 ;
      		랜딩ID             ,lend_id          ,lend_id        ,long    ,10;
      		투자시작일시       ,sta_dtm          ,sta_dtm        ,char    ,12;
      		통화코드           ,cur_cd           ,cur_cd         ,char    ,5 ;
      		랜딩거래구분       ,lend_trd_tp      ,lend_trd_tp    ,char    ,1 ;
      		거래수량           ,trd_qty          ,trd_qty        ,double  ,20;
      		이자수량           ,int_qty          ,int_qty        ,double  ,20;
      		랜딩수량전잔       ,lend_pbal        ,lend_pbal      ,double  ,20;
      		랜딩수량금잔       ,lend_nbal        ,lend_nbal      ,double  ,20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
