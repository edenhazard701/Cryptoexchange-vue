BEGIN_FUNCTION_MAP
	.Func,(o0012)FAQ 리플 저장/삭제,o0012,headtype=B;
	BEGIN_DATA_MAP
		o0012In1,입력,input;
		begin
            저장삭제구분     , save_del_div  , save_del_div  , char ,       1;
			게시물번호       , list_no       , list_no       , long ,      10;
			댓글번호         , reply_no      , reply_no      , long ,      10;
			USER_ID          , user_id       , user_id       , long ,      10;
			사용자그룹       , user_group    , user_group    , char ,       1;
			노출여부         , hide_yn       , hide_yn       , char ,       1;
			댓글             , reply_text    , reply_text    , char ,     800;
		end
		o0012Out1,출력,output;
		begin
			성공개수         , out_cnt       , out_cnt       , char ,       5;
		end
	END_DATA_MAP
END_FUNCTION_MAP
