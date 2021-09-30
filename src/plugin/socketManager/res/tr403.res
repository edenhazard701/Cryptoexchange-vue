BEGIN_FUNCTION_MAP
	.Func,(tr403)매매수수료율조회,tr403,headtype=A;
	BEGIN_DATA_MAP
		tr403In,입력,input;
		begin
			요청건수        ,req_cnt           ,req_cnt            ,long 	  ,5;
		end
		tr403Out_c,출력공통,output;
		begin
			응답건수        ,rsp_cnt           ,rsp_cnt            ,long      ,5;
		end
		tr403Out,출력,output,occurs;
		begin
			적용시작일자    ,aply_sta_dt       ,aply_sta_dt        ,char      ,8;
			거래구분        ,trd_tp            ,trd_tp             ,char      ,1;
			매체구분        ,media_tp          ,media_tp           ,char      ,2;
			누적거래금액하한,trd_amt_low_limt  ,trd_amt_low_limt   ,double    ,20;
			누적거래금액상한,trd_amt_high_limt ,trd_amt_high_limt  ,double    ,20;
			Maker수수료율   ,maker_fee_rt      ,maker_fee_rt       ,double    ,15;
			Taker수수료율   ,taker_fee_rt      ,taker_fee_rt       ,double    ,15;
			적용종료일자    ,aply_end_dt       ,aply_end_dt        ,char      ,8;
		end
	END_DATA_MAP
END_FUNCTION_MAP
