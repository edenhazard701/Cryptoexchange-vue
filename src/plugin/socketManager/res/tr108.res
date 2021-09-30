BEGIN_FUNCTION_MAP
	.Func,(tr108)미체결수량조회,tr108,headtype=A;
	BEGIN_DATA_MAP
		tr108In,입력,input;
		begin
			계정ID(O)           ,user_id         ,user_id         ,long    ,10 ;
			주문번호            ,ord_no          ,ord_no          ,long    ,10 ;
		end
		tr108Out,출력,output,occurs;
		begin
			잔여수량            ,remn_qty        ,remn_qty        ,double  ,20 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
