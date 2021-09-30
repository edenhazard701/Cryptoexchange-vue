BEGIN_FUNCTION_MAP
	.Func,(b1001)사용자알림정보조회,b1001,headtype=A;
	BEGIN_DATA_MAP
		b1001In1,입력,input;
		begin
			계정ID(O)           , user_id		, user_id		, long	, 10 ;
			알림종류			, noti_kind		, noti_kind		, char	, 2;
		end
		b1001Out1,출력공통,output;
		begin
			매일설정여부		, mail_tp		, mail_tp		, char	, 1;
			SMS설정여부			, sms_tp		, sms_tp		, char	, 1;
			PUSH설정여부		, push_tp		, push_tp		, char	, 1;
			계정명				, user_nm		, user_nm		, char	, 128;
			이메일				, user_email	, user_email	, char	, 128;
			핸드폰번호			, mobl_no		, mobl_no		, char	, 24;
			모바일OS종류		, mobl_os		, mobl_os		, char	, 1;
			모바일기기UID		, mobl_uid		, mobl_uid		, char	, 160;
		end
	END_DATA_MAP
END_FUNCTION_MAP
