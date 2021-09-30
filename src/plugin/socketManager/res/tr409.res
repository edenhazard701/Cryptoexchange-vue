BEGIN_FUNCTION_MAP
	.Func,(tr409)마진공여한도조회,tr409,headtype=A;
	BEGIN_DATA_MAP
		tr409In,입력,input;
		begin
			요청건수        ,req_cnt            ,req_cnt            ,long	, 5 ;
		end
		tr409Out_c,출력공통,output;
		begin
			응답건수        ,rsp_cnt            ,rsp_cnt            ,long	, 5 ;
		end
		tr409Out,출력,output,occurs;
		begin
			통화코드        ,cur_cd             ,cur_cd             ,char   , 5 ;
			한도금액        ,limt_amt           ,limt_amt           ,double , 20;
			사용금액        ,use_amt            ,use_amt            ,double , 20;
			주문사용금액    ,ord_use_amt        ,ord_use_amt        ,double , 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
