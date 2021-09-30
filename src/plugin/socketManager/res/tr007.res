BEGIN_FUNCTION_MAP
	.Func,(tr007)반대매매청산취소주문,tr007,headtype=A;
	BEGIN_DATA_MAP
		tr007In,입력,input;
		begin
			계정ID             ,user_id         ,user_id         ,long    ,10 ;
			원주문번호          ,org_ord_no      ,org_ord_no      ,char    ,10 ;
			일부전부구분         ,part_all_tp     ,part_all_tp     ,char    ,1  ;
			주문수량            ,ord_qty         ,ord_qty         ,double  ,20 ;
		end
		tr007Out,출력,output;
		begin
			주문번호             ,ord_no          ,ord_no         ,long    ,10 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
