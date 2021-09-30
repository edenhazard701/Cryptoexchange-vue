BEGIN_FUNCTION_MAP
	.Func,(tr104)일반주문가능수량/금액조회,tr104,headtype=A;
	BEGIN_DATA_MAP
		tr104In,입력,input;
		begin
			계정ID(O)           ,user_id         ,user_id         ,long    ,10 ;
			종목코드(O)         ,symbol          ,symbol          ,char    ,15 ;
			주문가격            ,ord_prc         ,ord_prc         ,double  ,20 ;
			주문가격구분        ,ord_prc_tp      ,ord_prc_tp      ,char    ,1  ;
		end
		tr104Out,출력,output;
		begin
			매수주문가능금액     ,buy_ord_able_amt   ,buy_ord_able_amt  ,double  ,20 ;
			매수주문가능수량     ,buy_ord_able_qty   ,buy_ord_able_qty  ,double  ,20 ;
			매도주문가능수량     ,sell_ord_able_qty  ,sell_ord_able_qty ,double  ,20 ;
			결제통화코드         ,setl_cur_cd        ,setl_cur_cd       ,char    ,5  ;
			대상통화코드         ,trgt_cur_cd        ,trgt_cur_cd       ,char    ,5  ;
			매도주문가능보유수랼 ,sell_ord_bal_qty   ,sell_ord_bal_qty  ,double  ,20 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
