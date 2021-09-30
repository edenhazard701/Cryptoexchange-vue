BEGIN_FUNCTION_MAP
	.Func,(d0001)관심종목 그룹 리스트 조회,d0001,headtype=B;
	BEGIN_DATA_MAP
		d0001In1,입력,input;
		begin
			계정ID   , account_id , account_id , char ,  10;
		end
		d0001Out1,출력,output;
		begin
			출력개수 , out_cnt    , out_cnt    , char ,   5;
		end
		d0001Out2,출력,output,occurs;
		begin
			그룹번호 , grp_no     , grp_no     , long ,   3;
			그룹순서 , grp_seq    , grp_seq    , long ,   3;
			그룹명   , grp_nm     , grp_nm     , char , 100;
			관심버전 , intr_ver   , intr_ver   , char ,  30;
		end
	END_DATA_MAP
END_FUNCTION_MAP
