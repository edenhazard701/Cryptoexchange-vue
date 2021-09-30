BEGIN_FUNCTION_MAP
	.Func,(tr502)예상수수료조회,tr502,headtype=A;
	BEGIN_DATA_MAP
		tr502In,입력,input;
		begin
			계정ID(O)           ,user_id         ,user_id         ,char    ,10 ;
			종목코드(O)         ,symbol          ,symbol          ,char    ,15 ;
			마진거래구분(O)     ,mrgn_trd_tp     ,mrgn_trd_tp     ,char    ,1  ;
			매수매도구분(O)     ,buy_sell_tp     ,buy_sell_tp     ,char    ,1  ;
			주문가격구분(O)     ,ord_prc_tp      ,ord_prc_tp      ,char    ,1  ;
			자동매매주문구분(O) ,auto_trd_ord_tp ,auto_trd_ord_tp ,char    ,1  ;
			주문수량            ,ord_qty         ,ord_qty         ,double  ,20 ;
			주문가격            ,ord_prc         ,ord_prc         ,double  ,20 ;
			주문금액            ,ord_amt         ,ord_amt         ,double  ,20 ;
		end
		tr502Out,출력,output;
		begin
			예상수수료          ,fee             ,fee             ,double  ,20 ;
			예상수수료율        ,fee_rt          ,fee_rt          ,double  ,15 ;
			수수료통화코드      ,fee_cur_cd      ,fee_cur_cd      ,char    ,5  ;
			수수료구분          ,fee_tp          ,fee_tp          ,char    ,1  ;
			수수료적용구분      ,fee_aplc_tp     ,fee_aplc_tp     ,char    ,1  ;
			매매금액            ,trd_amt         ,trd_amt         ,double  ,20 ;
			NET매매수량         ,net_trd_qty     ,net_trd_qty     ,double  ,20 ;
			NET매매금액         ,net_trd_amt     ,net_trd_amt     ,double  ,20 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
