BEGIN_FUNCTION_MAP
	.Func,(tr402)호가단위 등록_수정,tr402,headtype=A;
	BEGIN_DATA_MAP
		tr402In,입력,input;
		begin
			처리구분      ,proc_tp      ,proc_tp      ,char      , 1 ;
			결제통화코드  ,setl_cur_cd  ,setl_cur_cd  ,char      , 5 ;
			가격하한      ,prc_low_limt ,prc_low_limt ,double    , 20;
			가격상한      ,prc_high_limt,prc_high_limt,double    , 20;
			호가단위      ,prc_unit     ,prc_unit     ,double    , 20;
		end
		tr402Out,출력,output;
		begin
			DUMMY         ,dummy        ,dummy        ,char      , 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
