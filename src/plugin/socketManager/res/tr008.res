BEGIN_FUNCTION_MAP
	.Func,(tr008)마진미수변제대용매도주문,tr008,headtype=A;
	BEGIN_DATA_MAP
		tr008In,입력,input;
		begin
			계정ID             ,user_id         ,user_id         ,long    ,10 ;
			종목코드            ,symbol          ,symbol          ,char    ,15 ;
			주문수량            ,ord_qty         ,ord_qty         ,double  ,20 ;
		end
		tr008Out,출력,output;
		begin
			주문번호             ,ord_no          ,ord_no         ,long    ,10 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
