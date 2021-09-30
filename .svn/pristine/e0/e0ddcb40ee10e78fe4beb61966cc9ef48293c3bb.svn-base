BEGIN_FUNCTION_MAP
	.Func,(tr105)간편매매예상구매수량조회,tr105,headtype=A;
	BEGIN_DATA_MAP
		tr105In,입력,input;
		begin
			계정ID(O)           ,user_id         ,user_id         ,long    ,10 ;
			매도통화코드(O)     ,sell_cur_cd     ,sell_cur_cd      ,char    ,5 ;
			매수통화코드(O)     ,buy_cur_cd      ,buy_cur_cd       ,char    ,5 ;
			매도주문수량(O)     ,sell_ord_qty    ,sell_ord_qty    ,double  ,20 ;
		end
		tr105Out,출력,output;
		begin
			예상매수수량        ,buy_qty         ,buy_qty         ,double  ,20 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
