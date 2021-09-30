BEGIN_FUNCTION_MAP
	.Func,(o0007)1:1문의 단건 상세조회,o0007,headtype=B;
	BEGIN_DATA_MAP
		o0007In1,입력,input;
		begin
			저장일자       , save_date     , save_date     , char ,       8;
		    게시물일련번호 , list_no       , list_no       , long ,      10;
		end
		o0007Out1,출력,output;
		begin
			저장일자       , save_date     , save_date     , char ,       8;
			게시글일련번호 , list_no       , list_no       , long ,      10;
			저장시간       , save_time     , save_time     , char ,       6;
			작성자ID       , user_id       , user_id       , long ,      10;
			작성자명       , user_nm       , user_nm       , char ,      50;
			작성자그룹     , user_group    , user_group    , char ,       1;
			카테고리ID     , category_id   , category_id   , int  ,       4;
			카테고리명     , category_name , category_name , char ,     240;
			노출여부       , hide_yn       , hide_yn       , char ,       1;
			제목           , title         , title         , char ,     120;
			내용           , message       , message       , char , 1024000;
			답글내용       , re_message    , re_message    , char ,   24000;
			답글저장시간   , rem_save_time , rem_save_time , char ,      14;
			조회수         , views         , views         , int  ,       8;
			리플개수       , out_cnt       , out_cnt       , char ,       5;
		end
		o0007Out2,출력,output,occurs;
		begin
			리플일련번호   , reply_no      , reply_no      , long ,      10;
			저장일자       , save_date     , save_date     , char ,       8;
			저장시간       , save_time     , save_time     , char ,       6;
			작성자ID       , user_id       , user_id       , long ,      10;
			작성자명       , user_nm       , user_nm       , char ,      50;
			작성자그룹     , user_group    , user_group    , char ,       1;
			노출여부       , hide_yn       , hide_yn       , char ,       1;
			리플내용       , message       , message       , char ,     800;
		end
	END_DATA_MAP
END_FUNCTION_MAP
