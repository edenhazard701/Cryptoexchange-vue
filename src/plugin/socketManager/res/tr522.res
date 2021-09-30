BEGIN_FUNCTION_MAP
    .Func,(tr522)일반주문내역조회,tr522,headtype=A;
    BEGIN_DATA_MAP
        tr522In,입력,input;
        begin
            계정ID              ,user_id         ,user_id         ,char    ,10 ;
            주문번호			,ord_no			 ,ord_no		  ,long	   ,10 ;
            요청건수            ,req_cnt         ,req_cnt         ,long    ,5  ;
        end
        tr522Out_c,출력공통,output;
        begin
            총수수료	        ,tot_fee	    ,tot_fee	    ,double	    ,20 ;
            총거래대금	        ,tot_trd_amt	,tot_trd_amt	,double	    ,20 ;
            응답건수            ,rsp_cnt         ,rsp_cnt         ,long    ,5  ;
        end
        tr522Out,출력,output,occurs;
        begin
			주문일시            ,ord_dtm         ,ord_dtm         ,char    ,17 ;
            체결수량            ,cntr_qty        ,cntr_qty        ,double  ,20 ;
            체결가격            ,cntr_prc        ,cntr_prc        ,double  ,20 ;
   			수수료              ,fee             ,fee             ,double  ,20 ;
   			거래대금			,trd_amt		 ,trd_amt		  ,double  ,20 ;
   			주문상태			,ord_stat		 ,ord_stat		  ,char	   , 1 ;
   			대상통화코드        ,trgt_cur_cd     ,trgt_cur_cd     ,char    ,5  ;
			결제통화코드        ,setl_cur_cd     ,setl_cur_cd     ,char    ,5  ;
			수수료통화코드      ,fee_cur_cd      ,fee_cur_cd      ,char    ,5  ;
        end
    END_DATA_MAP
END_FUNCTION_MAP






























