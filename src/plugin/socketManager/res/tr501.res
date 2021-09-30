BEGIN_FUNCTION_MAP
	.Func,(tr501)호가단위조회,tr501,headtype=A;
	BEGIN_DATA_MAP
		tr501In,입력,input;
		begin
			요청건수        ,req_cnt            ,req_cnt            ,long   ,5;
		end
		tr501Out_c,출력공통,output;
		begin
			응답건수        ,rsp_cnt            ,rsp_cnt            ,long   ,5;
		end
		tr501Out,출력,output,occurs;
		begin
			결제통화코드   ,setl_cur_cd        ,setl_cur_cd        ,char   ,5;
			가격하한        ,prc_low_limt       ,prc_low_limt       ,double ,20;
			가격상한        ,prc_high_limt      ,prc_high_limt      ,double ,20;
			호가단위        ,prc_unit           ,prc_unit           ,double ,20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
