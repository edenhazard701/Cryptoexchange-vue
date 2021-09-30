BEGIN_FUNCTION_MAP
	.Func,(ac419)전자지갑출금주소 조회,ac419,headtype=A;
	BEGIN_DATA_MAP
		ac419In,입력,input;
		begin
			계정ID		, user_id			, user_id			, long	,	 10;
			조회할통화코드	, cur_cd			, cur_cd			, char	,  	  5;
			요청건수		, req_cnt			, req_cnt           , long	, 	  5;
		end
		ac419Out_c,출력공통,output;
		begin
			응답건수		, rsp_cnt			, rsp_cnt			, long	,  	  5;
		end
		ac419Out,출력,output,occurs;
		begin
			전자지갑 이름 	, walt_nm			, walt_nm			, char  , 	 30;
			통화코드 		, cur_cd 			, cur_cd			, char  ,  	  5;
			출금전자지갑주소	, walt_id			, walt_id			, char  ,	256;
			보조필드 		, sub_info			, sub_info			, char  , 	 50;
			등록일시		, regi_dtm			, regi_dtm			, char  , 	 20;
			출금사용여부	, widr_use_tp		, widr_use_tp		, char  , 	  1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
