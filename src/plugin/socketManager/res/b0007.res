BEGIN_FUNCTION_MAP
	.Func,(b0007)뉴스 저장/삭제,b0007,headtype=B;
	BEGIN_DATA_MAP
		b0007In1,입력,input;
		begin
			저장삭제구분 , save_del_div  , save_del_div  , char ,       1;
			저장일자     , save_date     , save_date     , char ,       8;
			일련번호     , seq_no        , seq_no        , char ,      10;
			USER_ID      , user_id       , user_id       , long ,      10;
			사용자그룹   , user_group    , user_group    , char ,       1;
			메세지타입   , msg_type      , msg_type      , char ,       1;
			제목         , title         , title         , char ,     512;
			내용         , cntnt         , cntnt         , char , 1024000;
		end
		b0007Out1,출력,output;
		begin
			출력개수     , out_cnt       , out_cnt       , char ,       5;
		end
	END_DATA_MAP
END_FUNCTION_MAP
