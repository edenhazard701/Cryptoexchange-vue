BEGIN_FUNCTION_MAP
	.Head, 정보계공통, B;
	BEGIN_DATA_MAP
		input, 입력, input;
		begin
			연속Flag              , conti_flag           , conti_flag           , char  ,     1;
			연속조회키            , paging_key           , paging_key           , char  ,    80;
			화면번호              , screen_no            , screen_no            , char  ,     4;
			필러                  , filler               , filler               , char  ,   115;
		end
	END_DATA_MAP
END_FUNCTION_MAP
