BEGIN_FUNCTION_MAP
	.Func,(dw102)전자지갑출금주소 등록/삭제,dw102,headtype=A;
	BEGIN_DATA_MAP
		dw102In,입력,input;
		begin
			계정ID			, user_id		, user_id		, char  , 	10;
			통화코드			, cur_cd		, cur_cd		, char  , 	 5;
			출금전자지갑주소          , walt_id		, walt_id		, char  ,  256;
			보조필드                     , sub_info		, sub_info		, char  , 	50;
			전자지갑 이름		, walt_nm		, walt_nm		, char	,	30;
			처리구분                     , proc_tp		, proc_tp		, char  , 	 1;    // 1:등록 ,2:삭제
		end
		dw102Out,출력,output;
		begin
			DUMMY			, dummy         , dummy         , char  ,	 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
