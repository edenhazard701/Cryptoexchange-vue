BEGIN_FUNCTION_MAP
	.Func,(tr303)랜딩신청,tr303,headtype=A;
	BEGIN_DATA_MAP
		tr303In,입력,input;
		begin
			계정ID             ,user_id          ,user_id         ,long    ,10;
			랜딩ID             ,lend_id          ,lend_id         ,long    ,10;
			랜딩수량           ,lend_qty         ,lend_qty        ,double  ,20;
		end
		tr303Out,출력,output;
		begin
			DUMMY              ,dummy            ,dummy           ,char    ,1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
