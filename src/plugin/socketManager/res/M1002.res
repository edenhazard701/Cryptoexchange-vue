BEGIN_FUNCTION_MAP
	.Func,(M1002)서버 리스트 조회,M1002,headtype=B;
	BEGIN_DATA_MAP
		M1002In1,입력,input;
		begin
			서버구분   , svr_div     , svr_div     , char ,   1;
		end
		M1002Out1,출력,output;
		begin
			출력개수   , out_cnt     , out_cnt     , char ,   5;
		end
		M1002Out2,출력,output,occurs;
		begin
			IP주소     , ip_addr     , ip_addr     , char ,  15;
			포트번호   , port_no     , port_no     , char ,   5;
			서버명     , svr_nm      , svr_nm      , char , 100;
			서버구분   , svr_div     , svr_div     , char ,   1;
			등록일자   , reg_dt      , reg_dt      , char ,   8;
		end
	END_DATA_MAP
END_FUNCTION_MAP
