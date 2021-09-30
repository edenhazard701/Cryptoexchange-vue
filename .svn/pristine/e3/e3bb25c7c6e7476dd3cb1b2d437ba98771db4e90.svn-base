BEGIN_FUNCTION_MAP
	.Func,(d0008)관심종목 메모 조회/저장/삭제,d0008,headtype=B;
	BEGIN_DATA_MAP
		d0008In1,입력,input;
		begin
			메모구분 , memodiv      , memodiv      , char ,    1;
			계정ID   , account_id   , account_id   , char ,   10;
			종목코드 , symbol       , symbol       , char ,   15;
			관심메모 , intr_memo    , intr_memo    , char , 2000;
		end
		d0008Out1,출력,output;
		begin
			출력개수 , out_cnt      , out_cnt      , char ,    5;
		end
		d0008Out2,출력,output,occurs;
		begin
			계정ID   , account_id   , account_id   , char ,   10;
			종목코드 , symbol       , symbol       , char ,   15;
			관심메모 , intr_memo    , intr_memo    , char , 2000;
		end
	END_DATA_MAP
END_FUNCTION_MAP
