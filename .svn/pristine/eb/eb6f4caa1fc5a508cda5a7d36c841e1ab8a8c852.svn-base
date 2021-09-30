BEGIN_FUNCTION_MAP
	.Func,(ac210)알림정보조회,ac210,headtype=A;
	BEGIN_DATA_MAP
		ac210In,입력,input;
		begin
			계정ID			, user_id			, user_id			, long	, 10;
			요청건수			, req_cnt			, req_cnt           , long	, 5;
		end
		ac210Out_c,출력공통,output;
		begin
			응답건수			, rsp_cnt			, rsp_cnt			, long	, 5;
		end
		ac210Out,출력,output,occurs;
		begin
			알림종류			, noti_kind			, noti_kind			, char	, 2;
			메일설정여부			, mail_tp			, mail_tp			, char  , 1;
			SMS설정여부			, sms_tp			, sms_tp			, long  , 1;
			PUSH설정여부		, push_tp			, push_tp			, long  , 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
