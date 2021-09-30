BEGIN_FUNCTION_MAP
	.Func,(tr406)협의수수료율 등록_수정,tr406,headtype=A;
	BEGIN_DATA_MAP
		tr406In,입력,input;
		begin
			처리구분        ,proc_tp           ,proc_tp            ,char      ,1;
			계정ID          ,user_id           ,user_id            ,long      ,10;
			적용시작일자    ,aply_sta_dt       ,aply_sta_dt        ,char      ,8;
			거래구분        ,trd_tp            ,trd_tp             ,char      ,1;
			매수매도구분    ,buy_sell_tp       ,buy_sell_tp        ,char      ,1;
			통화코드        ,cur_cd            ,cur_cd             ,char      ,5;
			누적거래금액하한,trd_amt_low_limt  ,trd_amt_low_limt   ,double    ,20;
			누적거래금액상한,trd_amt_high_limt ,trd_amt_high_limt  ,double    ,20;
			Maker수수료율   ,maker_fee_rt      ,maker_fee_rt       ,double    ,15;
			Taker수수료율   ,taker_fee_rt      ,taker_fee_rt       ,double    ,15;
			적용종료일자    ,aply_end_dt       ,aply_end_dt        ,char      ,8;
			코멘트          ,cmmt              ,cmmt               ,char      ,300;
		end
		tr406Out,출력,output;
		begin
			DUMMY           ,dummy             ,dummy              ,char      ,1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
