BEGIN_FUNCTION_MAP
	.Func,(o0010)FAQ 리스트 조회,o0010,headtype=B;
	BEGIN_DATA_MAP
		o0010In1,입력,input;
		begin
			시작일자         , from_date     , from_date     , char ,       8;
			종료일자         , end_date      , end_date      , char ,       8;
			USER_ID          , user_id       , user_id       , long ,      10;
			사용자그룹       , user_group    , user_group    , char ,       1;
			응답처리         , requst_yn     , requst_yn     , char ,       1;
			카테고리ID       , category_id   , category_id   , int  ,       4;
			검색어           , search_title  , search_title  , char ,      60;
            페이지위치       , page_pos      , page_pos      , int  ,       8;
		end
		o0010Out1,출력,output;
		begin
            전체출력개수     , total_out_cnt , total_out_cnt , char ,       5;
			출력개수         , out_cnt       , out_cnt       , char ,       5;
		end
		o0010Out2,출력,output,occurs;
		begin
			저장일자         , save_date     , save_date     , char ,       8;
			게시물일련번호   , list_no       , list_no       , long ,      10;
			저장시간         , save_time     , save_time     , char ,       6;
			사용자그룹       , user_group    , user_group    , char ,       1;
			카테고리ID       , category_id   , category_id   , int  ,       4;
			카테고리명       , category_name , category_name , char ,      80;
			제목             , title         , title         , char ,     120;
			조회수           , views         , views         , int  ,       8;
		end
	END_DATA_MAP
END_FUNCTION_MAP
