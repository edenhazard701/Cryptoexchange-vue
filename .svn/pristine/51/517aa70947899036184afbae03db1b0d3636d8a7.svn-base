BEGIN_FUNCTION_MAP
	.Func,(M1006)모니터링 알림 설정,M1006,headtype=B;
	BEGIN_DATA_MAP
		M1006In1,입력,input;
		begin
			CH SESN 설정       , ch_sesn_set       , ch_sesn_set       , char , 5;
			CPU IDLE 설정      , cpu_idle_set      , cpu_idle_set      , char , 5;
			MEM FREE 설정      , mem_free_set      , mem_free_set      , char , 5;
			DISK USE_RATE 설정 , disk_use_rate_set , disk_use_rate_set , char , 5;
		end
		M1006Out1,출력,output;
		begin
			결과구분           , rslt_div          , rslt_div          , char , 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
