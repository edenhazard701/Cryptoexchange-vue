BEGIN_FUNCTION_MAP
	.Func,(tr102)정정취소주문,tr102,headtype=A;
	BEGIN_DATA_MAP
		tr102In,입력,input;
		begin
			계정ID             	,user_id         ,user_id         ,char    ,10 ;
			원주문번호          		,org_ord_no      ,org_ord_no      ,long    ,10 ;
			정정취소구분         		,modi_cncl_tp    ,modi_cncl_tp    ,char    ,1  ;
			일부전부구분         		,part_all_tp     ,part_all_tp     ,char    ,1  ;
			주문수량            		,ord_qty         ,ord_qty         ,double  ,20 ;
			주문가격            		,ord_prc         ,ord_prc         ,double  ,20 ;
		end
		tr102Out,출력,output;
		begin
			주문번호             		,ord_no          ,ord_no         ,long    ,10 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
