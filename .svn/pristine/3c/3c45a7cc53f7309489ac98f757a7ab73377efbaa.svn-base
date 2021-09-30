BEGIN_FUNCTION_MAP
	.Func,(ac211)로그인내역조회,ac211,headtype=A;
	BEGIN_DATA_MAP
		ac211In,입력,input;
		begin
			조회할계정ID		, user_id			, user_id			, long  , 10;
			로그인결과검색조건	, logn_reut			, logn_reut			, char  , 2;
			요청건수             	, req_cnt           , req_cnt           , long	, 5;
		end
		ac211Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt			, rsp_cnt           , long	, 5;
		end
		ac211Out,출력,output,occurs;
		begin
			로그인일시			, logn_dtm			, logn_dtm			, char  , 20;
			로그인결과			, logn_reut			, logn_reut			, char  , 2;
			접속채널			, cnel_tp			, cnel_tp			, char  , 2;
			공인IP			, pub_ip			, pub_ip			, char  , 16;
			사설IP			, prv_ip			, prv_ip			, char  , 16;
			MAC주소			, mac_addr			, mac_addr			, char  , 32;
		end
	END_DATA_MAP
END_FUNCTION_MAP
