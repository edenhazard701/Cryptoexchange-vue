BEGIN_FUNCTION_MAP
	.Func,(ac423)입출금내역 조회,ac423,headtype=A;
	BEGIN_DATA_MAP
		ac423In,입력,input;
		begin
			계정ID			, user_id			, user_id			, long  , 10;
			통화코드			, cur_cd			, cur_cd			, char  , 5;
			입출구분			, dpwd_tp			, dpwd_tp			, char  , 1;
			검색시작일			, fr_dt             , fr_dt             , char	, 8;
			검색종료일			, to_dt             , to_dt             , char	, 8;
			요청건수			, req_cnt           , req_cnt           , long	, 5;
		end
		ac423Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt			, rsp_cnt           , long	, 5;
		end
		ac423Out,출력,output,occurs;
		begin
			거래일자			, trd_dt			, trd_dt			, char		, 8;
			거래시간			, trd_tm			, trd_tm			, char		, 12;
			입출구분			, dpwd_tp			, dpwd_tp			, char  	, 1;
			입출금상대구분		, dpwd_trgt_tp		, dpwd_trgt_tp		, char  	, 1;
			진행상태구분		, trd_stat			, trd_stat			, char  	, 1;
			통화코드			, cur_cd			, cur_cd			, char  	, 5;
			거래금액			, t_trd_amt			, t_trd_amt			, double  	, 30;
			수수료			, fee				, fee				, double  	, 30;
			정산금액			, trd_amt			, trd_amt			, double  	, 30;
			트랜젠션ID			, txid				, txid				, char  	, 128;
			완료일시			, conf_dtm			, conf_dtm			, char  	, 20;
			지갑주소			, walt_id			, walt_id			, char  	, 256;
			보조정보			, sub_info			, sub_info			, char  	, 50;
			상대지갑주소		, oppt_walt_id		, oppt_walt_id		, char  	, 256;
			상대보조정보		, oppt_sub_info		, oppt_sub_info		, char  	, 50;
			컨펌수			, cnfm_cnt			, cnfm_cnt			, int  		, 5;
			기본정보URL		, info_url			, info_url			, char  	, 500;
		end	
	END_DATA_MAP
END_FUNCTION_MAP
