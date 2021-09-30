BEGIN_FUNCTION_MAP
	.Func,(tr205)마진신규가용수량조회,tr205,headtype=A;
	BEGIN_DATA_MAP
		tr205In,입력,input;
		begin
			계정ID(O)           ,user_id         ,user_id         ,long    ,10 ;
			종목코드(O)         ,symbol          ,symbol          ,char    ,15 ;
			매수매도구분(O)     ,buy_sell_tp     ,buy_sell_tp     ,char    ,1  ;
			주문가격            ,ord_prc         ,ord_prc         ,double  ,20 ;
		end
		tr205Out,출력,output;
		begin
			주문가능금액        ,ord_able_amt    ,ord_able_amt    ,double  ,20 ;
			주문가용수량        ,ord_able_qty    ,ord_able_qty    ,double  ,20 ;
			대상통화코드        ,trgt_cur_cd     ,trgt_cur_cd     ,char    ,5  ;
			적용가격            ,aply_prc        ,aply_prc        ,double  ,20 ;
			주문금액            ,ord_amt         ,ord_amt         ,double  ,20 ;
			증거금              ,wmon            ,wmon            ,double  ,20 ;
			수수료              ,fee             ,fee             ,double  ,20 ;
			NET매매금액         ,net_trd_amt     ,net_trd_amt     ,double  ,20 ;
			수수료통화코드      ,fee_cur_cd      ,fee_cur_cd      ,char    ,5  ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
