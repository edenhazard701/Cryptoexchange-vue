BEGIN_FUNCTION_MAP
	.Func,(tr206)마진청산가능수량조회,tr206,headtype=A;
	BEGIN_DATA_MAP
		tr206In,입력,input;
		begin
			계정ID(O)           ,user_id         ,user_id       ,long    ,10 ;
			종목코드(O)         ,symbol          ,symbol        ,char    ,15 ;
			포지션구분(O)       ,pstn_tp         ,pstn_tp       ,char    ,1 ;
		end
		tr206Out,출력,output;
		begin
			청산가능수량    ,lqdt_able_qty  ,lqdt_able_qty    ,double  ,20 ;
			평가손익        ,evlt_pl        ,evlt_pl          ,double  ,20 ;
			대상통화코드    ,trgt_cur_cd    ,trgt_cur_cd      ,char    , 5 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
