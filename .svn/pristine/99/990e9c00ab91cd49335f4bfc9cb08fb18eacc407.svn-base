BEGIN_FUNCTION_MAP
	.Func,(tr203)마진공여가용한도조회,tr203,headtype=A;
	BEGIN_DATA_MAP
		tr203In,입력,input;
		begin
			통화코드             ,cur_cd          ,cur_cd          ,char    ,5 ;
			요청건수             ,req_cnt         ,req_cnt         ,long	,5 ;
		end
		tr203Out_c,출력공통,output;
		begin
			응답건수             ,rsp_cnt         ,rsp_cnt         ,long    ,5 ;
		end
		tr203Out,출력,output,occurs;
		begin
			통화코드             ,cur_cd          ,cur_cd          ,char    ,5 ;
			가용금액_수량        ,able_amt        ,able_amt        ,double  ,20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
