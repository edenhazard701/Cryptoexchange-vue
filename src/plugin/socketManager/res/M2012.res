BEGIN_FUNCTION_MAP
	.Func,(M2012)서버별 XtJNL 상태 시간별 조회,M2012,headtype=B;
	BEGIN_DATA_MAP
		M2012In1,입력,input;
		begin
			일자           , dt               , dt               , char ,   8;
			시간           , time             , time             , char ,   6;
			IP주소         , ip_addr          , ip_addr          , char ,  15;
			CLIENT IP주소  , client_ip_addr   , client_ip_addr   , char ,  16;
			CLIENT쓰레드ID , client_thread_id , client_thread_id , char ,  16;
			프로세스명     , proc_nm          , proc_nm          , char ,  30;
			조회개수       , qry_cnt          , qry_cnt          , char ,   5;
			플래그         , flag             , flag             , char ,   1;
		end
		M2012Out1,출력,output;
		begin
			츨력개수       , out_cnt          , out_cnt          , char ,   5;
		end
		M2012Out2,출력,output,occurs;
		begin
			일자           , dt               , dt               , char ,   8;
			시간           , time             , time             , char ,   6;
			IP주소         , ip_addr          , ip_addr          , char ,  15;
			CLIENT IP주소  , client_ip_addr   , client_ip_addr   , char ,  16;
			CLIENT쓰레드ID , client_thread_id , client_thread_id , char ,  16;
			프로세스명     , proc_nm          , proc_nm          , char ,  30;
			프로세스설명   , proc_desc        , proc_desc        , char , 256;
			추가시퀀스일자 , add_seq_dt       , add_seq_dt       , char ,   8;
			추가시퀀스     , add_seq          , add_seq          , int  ,  16;
			전송시퀀스일자 , snd_seq_dt       , snd_seq_dt       , char ,   8;
			전송시퀀스     , snd_seq          , snd_seq          , int  ,  16;
		end
	END_DATA_MAP
END_FUNCTION_MAP
