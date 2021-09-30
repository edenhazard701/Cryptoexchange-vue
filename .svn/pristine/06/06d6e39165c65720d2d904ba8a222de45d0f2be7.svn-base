BEGIN_FUNCTION_MAP
	.Func,(ac299)이메일조회,ac299,headtype=A;
	BEGIN_DATA_MAP
		ac299In,입력,input;
		begin
			조회시작ID			, fr_id				, fr_id				, int	, 10;
			조회종료ID			, to_id				, to_id				, int	, 10;
		end
		ac299Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt			, rsp_cnt           , int	, 5;
		end
		ac299Out,출력,output,occurs;
		begin
			계정ID			, user_id			, user_id			, int   , 10;
			계정메일주소		, user_mail			, user_mail			, char  , 50;
		end
	END_DATA_MAP
END_FUNCTION_MAP
