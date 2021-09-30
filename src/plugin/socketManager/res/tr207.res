BEGIN_FUNCTION_MAP
	.Func,(tr207)마진예상매매내역조회,tr207,headtype=A;
	BEGIN_DATA_MAP
		tr207In,입력,input;
		begin
			계정ID(O)            ,user_id         ,user_id         ,long    ,10 ;
			종목코드(O)          ,symbol          ,symbol          ,char    ,15 ;
			매수매도구분(O)      ,buy_sell_tp     ,buy_sell_tp     ,char    ,1  ;
			마진거래구분(O)      ,mrgn_trd_tp     ,mrgn_trd_tp     ,char    ,1  ;
			주문수량(O)          ,ord_qty         ,ord_qty         ,double  ,20 ;
			주문가격(O)          ,ord_prc         ,ord_prc         ,double  ,20 ;
		end
		tr207Out,출력,output;
		begin
			주문금액             ,ord_amt         ,ord_amt         ,double  ,20 ;
			증거금               ,wmon            ,wmon            ,double  ,20 ;
			수수료               ,fee             ,fee             ,double  ,20 ;
			수수료율             ,fee_rt          ,fee_rt          ,double  ,10 ;
			매매금액             ,trd_amt         ,trd_amt         ,double  ,20 ;
			수수료통화코드       ,fee_cur_cd      ,fee_cur_cd      ,char    ,5  ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
