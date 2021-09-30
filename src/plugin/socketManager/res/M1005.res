BEGIN_FUNCTION_MAP
	.Func,(M1005)모니터링 휴대전화번호 리스트 조회,M1005,headtype=B;
	BEGIN_DATA_MAP
		M1005In1,입력,input;
		begin
			조회구분       , qry_div  , qry_div  , char ,   1;
		end
		M1005Out1,출력,output;
		begin
			출력개수       , out_cnt  , out_cnt  , char ,   5;
		end
		M1005Out2,출력,output,occurs;
		begin
			IP주소         , ip_addr  , ip_addr  , char ,  15;
			휴대전화번호   , phone_no , phone_no , char ,  11;
			휴대전화번호명 , phone_nm , phone_nm , char ,  30;
			사용자구분     , user_div , user_div , char ,   1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
