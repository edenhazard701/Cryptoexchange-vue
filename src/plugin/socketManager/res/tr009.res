BEGIN_FUNCTION_MAP
	.Func,(tr009)만기청산취소주문,tr009,headtype=A;
	BEGIN_DATA_MAP
		tr009In,입력,input;
		begin
			계정ID             ,user_id         ,user_id         ,long    ,10 ;
			원주문번호          ,org_ord_no      ,org_ord_no      ,char    ,10 ;
			주문수량            ,ord_qty         ,ord_qty         ,double  ,20 ;
		end
		tr009Out,출력,output;
		begin
			주문번호             ,ord_no          ,ord_no         ,long    ,10 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
