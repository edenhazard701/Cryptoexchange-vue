BEGIN_FUNCTION_MAP
	.Func,(MA001)접속서버(MCA)별 사용자ID 조회,MA001;
	BEGIN_DATA_MAP
		MA001In1,입력,input;
		begin
			조회구분   , qry_div     , qry_div     , char ,   1;
		end
		MA001Out1,출력,output;
		begin
			출력개수   , out_cnt     , out_cnt     , char ,   5;
		end
		MA001Out2,출력,output,occurs;
		begin
			사용자ID   , user_id     , user_id     , char ,  10;
			세션키     , sesn_key    , sesn_key    , char ,  50;
			접속 IP    , conn_ip_addr, conn_ip_addr, char ,  15;
			PC IP      , pc_ip       , pc_ip       , char ,  15;
			매체구분   , media       , media       , char ,   2;
			MAC ADDRESS, mac_addr    , mac_addr    , char ,  32;
		end
	END_DATA_MAP
END_FUNCTION_MAP
