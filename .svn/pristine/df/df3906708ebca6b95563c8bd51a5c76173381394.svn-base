BEGIN_FUNCTION_MAP
	.Func,(tr416)처리오류내역재처리,tr416,headtype=A;
	BEGIN_DATA_MAP
		tr416In,입력,input;
		begin
			계정ID          ,user_id           ,user_id            ,long      ,10;
			주문번호        ,ord_no            ,ord_no             ,long      ,10;
			오류시각        ,err_dtm           ,err_dtm            ,char      ,20;
		end
		tr416Out,출력,output;
		begin
			재처리여부      ,re_proc_yn        ,re_proc_yn         ,char      ,1;
			재처리오류시에러메시지,err_msg     ,err_msg            ,char      ,300;
		end
	END_DATA_MAP
END_FUNCTION_MAP
