BEGIN_FUNCTION_MAP
	.Func,(tr512)체결내역조회(실시간서버),tr512,headtype=A;
	BEGIN_DATA_MAP
		tr512In,입력,input;
		begin
			계정ID              ,user_id         ,user_id         ,long    ,10 ;
			매수도구분          ,buy_sell_tp     ,buy_sell_tp     ,char    ,1  ;
			종목코드            ,symbol          ,symbol          ,char    ,15 ;
			요청건수            ,req_cnt         ,req_cnt         ,long    ,5  ;
		end
		tr512Out_c,출력공통,output;
		begin
			응답건수            ,rsp_cnt         ,rsp_cnt         ,long    ,5  ;
		end
		tr512Out,출력,output,occurs;
		begin
			주문번호            ,ord_no          ,ord_no          ,long    ,10 ;
			원주문번호          ,org_ord_no      ,org_ord_no      ,long    ,10 ;
			주문일시            ,ord_dtm         ,ord_dtm         ,char    ,17 ;
			종목                ,symbol          ,symbol          ,char    ,15 ;
			주문구분            ,ord_tp          ,ord_tp          ,char    ,1  ;
			매수매도구분        ,buy_sell_tp     ,buy_sell_tp     ,char    ,1  ;
			호가유형            ,ord_prc_tp      ,ord_prc_tp      ,char    ,1  ;
			마진거래구분        ,mrgn_trd_tp     ,mrgn_trd_tp     ,char    ,1  ;
			주문상태            ,ord_stat        ,ord_stat        ,char    ,1  ;
			주문조건            ,ord_cond        ,ord_cond        ,char    ,1  ;
			반대매매주문구분    ,lqdt_ord_tp     ,lqdt_ord_tp     ,char    ,1  ;
			자동매매주문구분    ,auto_trd_ord_tp ,auto_trd_ord_tp ,char    ,1  ;
			간편매매주문구분    ,smpl_trd_ord_tp ,smpl_trd_ord_tp ,char    ,1  ;
			대상통화코드        ,trgt_cur_cd     ,trgt_cur_cd     ,char    ,5  ;
			결제통화코드        ,setl_cur_cd     ,setl_cur_cd     ,char    ,5  ;
			수수료통화코드      ,fee_cur_cd      ,fee_cur_cd      ,char    ,5  ;
			대상통화소수자리수  ,trgt_dp         ,trgt_dp         ,long    ,2  ;
			결제통화소수자리수  ,stlc_dp         ,stlc_dp         ,long    ,2  ;
			수수료통화자리수    ,fee_dp          ,fee_dp          ,long    ,2  ;
			주문수량            ,ord_qty         ,ord_qty         ,double  ,20 ;
			주문가격            ,ord_prc         ,ord_prc         ,double  ,20 ;
			체결수량            ,cntr_qty        ,cntr_qty        ,double  ,20 ;
			체결금액            ,cntr_amt        ,cntr_amt        ,double  ,20 ;
			평균체결가격        ,avg_cntr_prc    ,avg_cntr_prc    ,double  ,20 ;
			잔여수량            ,remn_qty        ,remn_qty        ,double  ,20 ;
			수수료              ,fee             ,fee             ,double  ,20 ;
			주문만료일시        ,ord_expr_dtm    ,ord_expr_dtm    ,char    ,12 ;
			시스템매매구분      ,sys_trd_tp      ,sys_trd_tp      ,char    ,1  ;
			채널영역            ,chnl_area       ,chnl_area       ,char    ,20 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
