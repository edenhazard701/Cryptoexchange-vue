BEGIN_FUNCTION_MAP
	.Func,(tr305)랜딩자동재투자,tr305,headtype=A;
	BEGIN_DATA_MAP
		tr305In,입력,input;
		begin
			계정ID             ,user_id          ,user_id         ,long    ,10;
			랜딩ID             ,lend_id          ,lend_id         ,long    ,10;
			시작일시           ,sta_dtm          ,sta_dtm         ,char    ,12;
			처리구분           ,proc_tp          ,proc_tp         ,char    ,1 ;
		end
		tr305Out,출력,output,occurs;
		begin
			DUMMY           ,dummy             ,dummy             ,char    ,1 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
