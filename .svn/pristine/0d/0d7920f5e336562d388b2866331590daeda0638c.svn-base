BEGIN_FUNCTION_MAP
	.Func,(o0005)1:1문의 게시판 저장/삭제/변경,o0005,headtype=B;
	BEGIN_DATA_MAP
		o0005In1,입력,input;
		begin
			저장삭제구분     , save_del_div  , save_del_div  , char ,       1;
			저장일자         , save_date     , save_date     , char ,       8;
			게시물일련번호   , list_no       , list_no       , long ,      10;
			USER_ID          , user_id       , user_id       , long ,      10;
			카테고리ID       , category_id   , category_id   , int  ,       4;
			입력개수         , in_cnt        , in_cnt        , char ,       5;
		end
        o0005In2,입력,input,occurs;
        begin
            필드시퀀스       , field_seq     , field_seq     , int  ,       2;
            유저필드         , user_field    , user_field    , char ,    3076;
        end
		o0005Out1,출력,output;
		begin
			성공개수         , out_cnt       , out_cnt       , char ,       5;
		end
	END_DATA_MAP
END_FUNCTION_MAP
