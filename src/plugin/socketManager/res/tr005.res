BEGIN_FUNCTION_MAP
	.Func,(tr005)간편매매주문,tr005,headtype=A;
	BEGIN_DATA_MAP
		tr005In,입력,input;
		begin
			계정ID(O)          ,user_id         ,user_id         ,long    ,10 ;
			매도통화코드(O)      ,sell_cur_cd     ,sell_cur_cd      ,char    ,5 ;
			매도통화코드(O)      ,buy_cur_cd      ,buy_cur_cd       ,char    ,5 ;
			매도주문수량(O)      ,sell_ord_qty    ,sell_ord_qty     ,double  ,20 ;
		end
		tr005Out,출력,output;
		begin
			매도주문번호         ,sell_ord_no     ,sell_ord_no       ,long    ,10 ;
			매수주문번호         ,buy_ord_no      ,buy_ord_no        ,long    ,10 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
