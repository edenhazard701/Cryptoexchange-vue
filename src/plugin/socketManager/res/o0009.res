BEGIN_FUNCTION_MAP
	.Func,(o0009)FAQ 게시판 저장/삭제/변경,o0009,headtype=B;
	BEGIN_DATA_MAP
		o0009In1,입력,input;
		begin
			저장삭제구분     , save_del_div  , save_del_div  , char ,       1;
			저장일자         , save_date     , save_date     , char ,       8;
			게시물일련번호   , list_no       , list_no       , long ,      10;
			USER_ID          , user_id       , user_id       , long ,      10;
			노출여부         , hide_yn       , hide_yn       , char ,       1;
			사용자그룹       , user_group    , user_group    , char ,       1;
			카테고리ID       , category_id   , category_id   , int  ,       4;
			제목             , title         , title         , char ,     512;
			내용             , cntnt         , cntnt         , char , 1024000;
		end
		o0009Out1,출력,output;
		begin
			성공개수         , out_cnt       , out_cnt       , char ,       5;
		end
	END_DATA_MAP
END_FUNCTION_MAP
