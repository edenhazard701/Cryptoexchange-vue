BEGIN_FUNCTION_MAP
	.Func,(dw516)전자지갑주소조회,dw516,headtype=A;
	BEGIN_DATA_MAP
		dw516In,입력,input;
		begin
			계정ID			, user_id			, user_id			, char  , 10;
			조회할통화코드 		, cur_cd			, cur_cd			, char  , 5;
			요청건수             	, req_cnt           , req_cnt           , long	, 5;
		end
		dw516Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt			, rsp_cnt           , long	, 5;
		end
		dw516Out,출력,output,occurs;
		begin
			통화코드 			, cur_cd			, cur_cd			, char  , 5;
			전자지갑주소		, walt_id			, walt_id			, char  , 256;
			보조필드 			, sub_info			, sub_info			, char  , 50;
			발급일시			, open_dtm			, open_dtm			, char  , 14;
			통화한글명			, cur_kor_nm		, cur_kor_nm		, char	, 50;
		end
	END_DATA_MAP
END_FUNCTION_MAP
