BEGIN_FUNCTION_MAP
	.Func,(d0002)관심종목 그룹 리스트 저장/삭제,d0002,headtype=B;
	BEGIN_DATA_MAP
		d0002In1,입력,input;
		begin
			계정ID       , account_id   , account_id   , char ,  10;
			입력개수     , in_cnt       , in_cnt       , char ,   5;
		end
		d0002In2,입력,input,occurs;
		begin
			그룹번호     , grp_no       , grp_no       , long ,   3;
			그룹순서     , grp_seq      , grp_seq      , long ,   3;
			그룹명       , grp_nm       , grp_nm       , char , 100;
			저장삭제구분 , save_del_div , save_del_div , char ,   1;
		end
		d0002Out1,출력,output;
		begin
			출력개수     , out_cnt      , out_cnt      , char ,   5;
		end
		d0002Out2,출력,output,occurs;
		begin
			그룹번호     , grp_no       , grp_no       , long ,   3;
			그룹순서     , grp_seq      , grp_seq      , long ,   3;
			그룹명       , grp_nm       , grp_nm       , char , 100;
		end
	END_DATA_MAP
END_FUNCTION_MAP
