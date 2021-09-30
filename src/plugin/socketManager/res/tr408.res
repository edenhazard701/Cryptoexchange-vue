BEGIN_FUNCTION_MAP
	.Func,(tr408)대용가율 등록_수정,tr408,headtype=A;
	BEGIN_DATA_MAP
		tr408In,입력,input;
		begin
			처리구분      ,proc_tp      ,proc_tp      ,char    , 1 ;
			적용시작일    ,aply_sta_dt  ,aply_sta_dt  ,char    , 8 ;
			통화코드      ,cur_cd       ,cur_cd       ,char    , 5 ;
			대용가율      ,sbst_rt      ,sbst_rt      ,double  , 15;
			적용종료일    ,aply_end_dt  ,aply_end_dt  ,char    , 8 ;
		end
		tr408Out,출력,output;
		begin
			DUMMY         ,dummy        ,dummy        ,char    , 1 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
