BEGIN_FUNCTION_MAP
	.Func,(tr304)랜딩잔고내역조회,tr304,headtype=A;
	BEGIN_DATA_MAP
		tr304In,입력,input;
		begin
			계정ID             ,user_id          ,user_id        ,long    ,10;
			요청건수           ,req_cnt          ,req_cnt        ,long    ,5 ;
		end
		tr304Out_c,출력공통,output;
		begin
			응답건수           ,rsp_cnt          ,rsp_cnt        ,long    ,5 ;
		end
		tr304Out,출력,output,occurs;
		begin
			통화코드           ,cur_cd           ,cur_cd         ,char    ,5 ;
			보유수량           ,remn_qty         ,remn_qty       ,double  ,20;
			랜딩사용수량       ,lend_use_qty     ,lend_use_qty   ,double  ,20;
			랜딩가용수량       ,lend_able_qty    ,lend_able_qty  ,double  ,20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
