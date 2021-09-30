BEGIN_FUNCTION_MAP
	.Func,(o0015)카테고리 수정,o0015,headtype=B;
	BEGIN_DATA_MAP
		o0015In1,입력,input;
		begin
            입력개수     , in_cnt       , in_cnt       , char ,   5;
        end
        o0015In2,입력,input,occurs;
        begin
			순서정보     , sort_id       , sort_id       , int  ,       4;
			카테고리ID   , category_id   , category_id   , int  ,       4;
        end
        o0015Out1,출력,output;
        begin
            출력개수     , out_cnt      , out_cnt      , char ,   5;
        end
        o0015Out2,출력,output,occurs;
        begin
			부모ID       , parent_id     , parent_id     , int  ,       4;
			순서정보     , sort_id       , sort_id       , int  ,       4;
			카테고리ID   , category_id   , category_id   , int  ,       4;
			제목         , category_name , category_name , char ,     240;
        end
    END_DATA_MAP
END_FUNCTION_MAP
