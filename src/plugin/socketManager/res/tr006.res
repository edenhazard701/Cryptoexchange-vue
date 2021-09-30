BEGIN_FUNCTION_MAP
	.Func,(tr006)반대매매청산주문,tr006,headtype=A;
	BEGIN_DATA_MAP
		tr006In,입력,input;
		begin
			계정ID             ,user_id         ,user_id         ,long    ,10 ;
			종목코드            ,symbol          ,symbol          ,char    ,15 ;
			매수매도구분         ,buy_sell_tp     ,buy_sell_tp     ,char    ,1  ;
			주문호가유형         ,ord_prc_tp      ,ord_prc_tp      ,char    ,1  ;
			주문조건            ,ord_cond        ,ord_cond        ,char    ,1  ;
			주문수량            ,ord_qty         ,ord_qty         ,double  ,20 ;
			주문가격            ,ord_prc         ,ord_prc         ,double  ,20 ;
		end
		tr006Out,출력,output;
		begin
			주문번호             ,ord_no          ,ord_no         ,long    ,10 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
