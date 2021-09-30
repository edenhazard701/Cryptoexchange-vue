BEGIN_FUNCTION_MAP
	.Func,(ac610)TDI ICO 조회,ac610,headtype=A;
	BEGIN_DATA_MAP
		ac610In,입력,input;
		begin
			통화코드			, cur_cd			, cur_cd			, char		,    5;
		end
		ac610Out,출력,output;
		begin
			통화코드			, cur_cd			, cur_cd			, char		,    5;
			통화한글명			, cur_kor_nm		, cur_kor_nm		, char		,   50;
			통화영문명			, cur_eng_nm		, cur_eng_nm		, char		,   50;
			협의프로토콜		, cnst_prtc			, cnst_prtc			, char		,	20;
			발행수량			, issu_qty			, issu_qty			, double	,   20;
			KYC인증여부			, kyc_auth_yn		, kyc_auth_yn		, char		,    1;
			홈페이지URL			, home_page_url		, home_page_url		, char		,  200;
			백서URL				, hwite_papr_url	, hwite_papr_url	, char		,  200;
			유투브URL			, you_tube_url		, you_tube_url		, char		,  200;
			간략소개			, smpl_intr			, smpl_intr			, char		,  400;
			상세소개			, detl_intr			, detl_intr			, char		, 9000;
		end
	END_DATA_MAP
END_FUNCTION_MAP
