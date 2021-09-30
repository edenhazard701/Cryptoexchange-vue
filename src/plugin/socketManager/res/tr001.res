BEGIN_FUNCTION_MAP
	.Func,(tr001)일반주문,tr001,headtype=A;
	BEGIN_DATA_MAP
		tr001In,입력,input;
		begin
			계정ID(O)          ,user_id         ,user_id         ,long    ,10 ;
			종목코드(O)         ,symbol          ,symbol          ,char    ,15 ;
			매수매도구분(O)      ,buy_sell_tp     ,buy_sell_tp     ,char    ,1  ;
			주문호가유형(O)      ,ord_prc_tp      ,ord_prc_tp      ,char    ,1  ;
			주문조건(O)         ,ord_cond        ,ord_cond        ,char    ,1  ;
			자동매매주문구분(O)   ,auto_trd_ord_tp ,auto_trd_ord_tp ,char    ,1  ;
			주문수량            ,ord_qty         ,ord_qty         ,double  ,20 ;
			주문가격            ,ord_prc         ,ord_prc         ,double  ,20 ;
			주문금액            ,ord_amt         ,ord_amt         ,double  ,20 ;
			주문만료일시         ,ord_expr_dtm    ,ord_expr_dtm    ,char    ,12 ;
			시스템매매구분(O)    ,sys_trd_tp      ,sys_trd_tp      ,char    ,1  ;
		end
		tr001Out,출력,output;
		begin
			주문번호             ,ord_no          ,ord_no         ,long    ,10 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
