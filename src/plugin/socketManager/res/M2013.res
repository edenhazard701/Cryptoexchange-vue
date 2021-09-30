BEGIN_FUNCTION_MAP
	.Func,(M2013)MCA Remotecall 조회,M2013;
	BEGIN_DATA_MAP
		M2013In1,입력,input;
		begin
			IP주소     , ip_addr     , ip_addr     , char ,  15;
		end
		M2013Out1,출력,output;
		begin
			출력개수   , out_cnt     , out_cnt     , char ,   5;
		end
		M2013Out2,출력,output,occurs;
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
