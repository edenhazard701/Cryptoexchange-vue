BEGIN_FUNCTION_MAP
	.Func,(tr201)마진미체결내역조회,tr201,headtype=A;
	BEGIN_DATA_MAP
		tr201In,입력,input;
		begin
			계정ID(O)           ,user_id         ,user_id         ,long    ,10 ;
			종목코드            ,symbol          ,symbol          ,char    ,15 ;
			요청건수            ,req_cnt         ,req_cnt         ,long    ,5  ;
		end
		tr201Out_c,출력공통,output;
		begin
			응답건수            ,rsp_cnt		 ,rsp_cnt         ,long    ,5 ;
		end
		tr201Out,출력,output,occurs;
		begin
			주문일시            ,ord_dtm         ,ord_dtm         ,char    ,17 ;
			주문번호            ,ord_no          ,ord_no          ,long    ,10 ;
			주문구분            ,ord_tp          ,ord_tp          ,char    ,1  ;
			매수매도구분        ,buy_sell_tp     ,buy_sell_tp     ,char    ,1  ;
			마진거래구분        ,mrgn_trd_tp     ,mrgn_trd_tp     ,char    ,1  ;
			주문가격구분        ,ord_prc_tp      ,ord_prc_tp      ,char    ,1  ;
			주문수량            ,ord_qty         ,ord_qty         ,double  ,20 ;
			주문가격            ,ord_prc         ,ord_prc         ,double  ,20 ;
			체결수량            ,cntr_qty        ,cntr_qty        ,double  ,20 ;
			체결금액            ,cntr_amt        ,cntr_amt        ,double  ,20 ;
			잔여수량            ,remn_qty        ,remn_qty        ,double  ,20 ;
			주문만료일시        ,ord_expr_dtm    ,ord_expr_dtm    ,char    ,12 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
