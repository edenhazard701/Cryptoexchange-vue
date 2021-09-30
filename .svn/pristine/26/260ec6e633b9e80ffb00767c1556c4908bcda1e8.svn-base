BEGIN_FUNCTION_MAP
	.Func,(o0014)카테고리 저장/삭제,o0014,headtype=B;
	BEGIN_DATA_MAP
		o0014In1,입력,input;
		begin
			입력개수     , in_cnt        , in_cnt        , char ,       5;
        end
        o0014In2,입력,input,occurs;
        begin
			저장삭제구분 , save_del_div  , save_del_div  , char ,       1;
			카테고리ID   , category_id   , category_id   , INT  ,       4;
			순서정보     , sort_id       , sort_id       , INT  ,       4;
			PARENT ID    , parent_id     , parent_id     , INT  ,       4;
			노출여부     , hide_yn       , hide_yn       , char ,       1;
			제목         , category_name , category_name , char ,     240;
		end
		o0014Out1,출력,output;
		begin
			성공개수     , out_cnt       , out_cnt       , char ,       5;
		end
	END_DATA_MAP
END_FUNCTION_MAP
