BEGIN_FUNCTION_MAP
	.Func,(ac302)전자지갑출금주소 등록/삭제,ac302,headtype=A;
	BEGIN_DATA_MAP
		ac302In,입력,input;
		begin
			계정ID			, user_id		, user_id		, long  , 	10;
			통화코드			, cur_cd		, cur_cd		, char  , 	 5;
			출금전자지갑주소		, walt_id		, walt_id		, char  ,  256;
			보조필드    		, sub_info		, sub_info		, char  , 	50;
			전자지갑 이름		, walt_nm		, walt_nm		, char	,	30;
			처리구분    		, proc_tp		, proc_tp		, char  , 	 1;
		end
		ac302Out,출력,output;
		begin
			DUMMY			, dummy         , dummy         , char  ,	 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
