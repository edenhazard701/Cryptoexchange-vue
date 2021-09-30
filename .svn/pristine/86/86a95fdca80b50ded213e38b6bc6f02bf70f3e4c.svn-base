BEGIN_FUNCTION_MAP
	.Func,(ac532)API KEY 정보조회,ac532,headtype=A;
	BEGIN_DATA_MAP
		ac532In,입력,input;
		begin
			CONNECT KEY	, connect_key	, connect_key	, char  , 32;
		end
		ac532Out,출력,output;
		begin
			계정ID		, user_id 		, user_id		, char  ,  10;
			CONNECT KEY	, connect_key	, connect_key	, char  ,  32;
			SECRET KEY	, secret_key	, secret_key	, char  ,  32;
			상태		, api_st		, api_st		, char  ,   1;
			만료일자	, expr_dtm		, expr_dtm		, char  ,   8;
			사용API		, use_api		, use_api		, char  , 512;
			특정IP실행	, ip_info		, ip_info		, char  ,  64;
			Switch IP	, switch_ip		, switch_ip		, char  ,  16;
		end
	END_DATA_MAP
END_FUNCTION_MAP
