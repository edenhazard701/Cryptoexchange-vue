BEGIN_FUNCTION_MAP
	.Func,(d0003)관심종목 종목 리스트 조회,d0003,headtype=B;
	BEGIN_DATA_MAP
		d0003In1,입력,input;
		begin
			계정ID       ,  account_id   ,  account_id   , char ,   10;
			그룹번호     ,  grp_no       ,  grp_no       , long ,    3;
		end
		d0003Out1,출력,output;
		begin
			출력개수     ,  out_cnt      ,  out_cnt      , char ,    5;
		end
		d0003Out2,출력,output,occurs;
		begin
			종목코드     ,  symbol       ,  symbol       , char ,   15;
			종목순서     ,  symbol_seq   ,  symbol_seq   , char ,    3;
			빈칸메모여부 ,  blnk_memo_yn ,  blnk_memo_yn , char ,    1;
			북마크여부   ,  bmrk_yn      ,  bmrk_yn      , char ,    1;
			빈칸메모     ,  blnk_memo    ,  blnk_memo    , char , 2000;
		end
	END_DATA_MAP
END_FUNCTION_MAP
