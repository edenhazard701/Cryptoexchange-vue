BEGIN_FUNCTION_MAP
	.Func,(tr410)마진공여한도 등록_수정,tr410,headtype=A;
	BEGIN_DATA_MAP
		tr410In,입력,input;
		begin
			처리구분      ,proc_tp      ,proc_tp      ,char    , 1 ;
			통화코드      ,cur_cd       ,cur_cd       ,char    , 5 ;
			한도금액      ,limt_amt     ,limt_amt     ,double  , 20;
		end
		tr410Out,출력,output;
		begin
			DUMMY         ,dummy        ,dummy        ,char    , 1 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
