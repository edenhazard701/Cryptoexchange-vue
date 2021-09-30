BEGIN_FUNCTION_MAP
	.Func,(o0002)공지사항 리스트 조회,o0002,headtype=B;
	BEGIN_DATA_MAP
		o0002In1,입력,input;
		begin
			시작일자         , from_date     , from_date     , char ,       8;
			종료일자         , end_date      , end_date      , char ,       8;
			USER_ID          , user_id       , user_id       , long ,      10;
			사용자그룹       , user_group    , user_group    , char ,       1;
			긴급여부         , emergency_yn  , emergency_yn  , char ,       1;
			카테고리ID       , category_id   , category_id   , int  ,       4;
			검색어           , search_title  , search_title  , char ,      60;
			페이지위치       , page_pos      , page_pos      , int  ,       8;
			요청건수         , req_count     , req_count     , char ,       5;
		end
		o0002Out1,출력,output;
		begin
			전체출력개수     , total_out_cnt , total_out_cnt , char ,       5;
			출력개수         , out_cnt       , out_cnt       , char ,       5;
		end
		o0002Out2,출력,output,occurs;
		begin
			저장일자         , save_date     , save_date     , char ,       8;
			게시물일련번호   , list_no       , list_no       , long ,      10;
			저장시간         , save_time     , save_time     , char ,       6;
			사용자그룹       , user_group    , user_group    , char ,       1;
			카테고리ID       , category_id   , category_id   , int  ,       4;
			카테고리명       , category_name , category_name , char ,      80;
			긴급여부         , emergency_yn  , emergency_yn  , char ,       1;
			제목             , title         , title         , char ,     120;
			조회수           , views         , views         , int  ,       8;
		end
	END_DATA_MAP
END_FUNCTION_MAP
