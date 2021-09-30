BEGIN_FUNCTION_MAP
	.Func,(tr103)일반주문체결조회,tr103,headtype=A;
	BEGIN_DATA_MAP
		tr103In,입력,input;
		begin
			계정ID(O)           ,user_id         ,user_id         ,long    ,10 ;
			종목코드            ,symbol          ,symbol          ,char    ,15 ;
			조회일수            ,qry_days        ,qry_days        ,char    ,3  ;
			요청건수            ,req_cnt         ,req_cnt         ,long    ,5  ;
		end
		tr103Out_c,출력공통,output;
		begin
			응답건수            ,rsp_cnt         ,rsp_cnt         ,long    ,5  ;
		end
		tr103Out,출력,output,occurs;
		begin
			주문일시            ,ord_dtm         ,ord_dtm         ,char    ,17 ;
			주문번호            ,ord_no          ,ord_no          ,long    ,10 ;
			종목코드            ,symbol          ,symbol          ,char    ,15 ;
			주문구분            ,ord_tp          ,ord_tp          ,char    ,1  ;
			매수매도구분        ,buy_sell_tp     ,buy_sell_tp     ,char    ,1  ;
			호가유형            ,ord_prc_tp      ,ord_prc_tp      ,char    ,1  ;
			자동매매주문구분    ,auto_trd_ord_tp ,auto_trd_ord_tp ,char    ,1  ;
			주문수량            ,ord_qty         ,ord_qty         ,double  ,20 ;
			주문가격            ,ord_prc         ,ord_prc         ,double  ,20 ;
			체결수량            ,cntr_qty        ,cntr_qty        ,double  ,20 ;
			체결금액            ,cntr_amt        ,cntr_amt        ,double  ,20 ;
			평균체결가격        ,avg_cntr_prc    ,avg_cntr_prc    ,double  ,20 ;
			잔여수량            ,remn_qty        ,remn_qty        ,double  ,20 ;
			주문만료일시        ,ord_expr_dtm    ,ord_expr_dtm    ,char    ,12 ;
			대상통화코드        ,trgt_cur_cd     ,trgt_cur_cd     ,char    ,5  ;
			결제통화코드        ,setl_cur_cd     ,setl_cur_cd     ,char    ,5  ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
