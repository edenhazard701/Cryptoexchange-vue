BEGIN_FUNCTION_MAP
	.Func,(ac107)OTP정보등록신청,ac107,headtype=A;
	BEGIN_DATA_MAP
		ac107In,입력,input;
		begin
			계정ID		, user_id			, user_id			, char  , 10;
		end
		ac107Out,출력,output;
		begin
			시리얼번호		, seri_no			, seri_no			, char  , 20;
			qr코드url		, qrcd_url			, qrcd_url			, char  , 200;
		end
	END_DATA_MAP
END_FUNCTION_MAP
