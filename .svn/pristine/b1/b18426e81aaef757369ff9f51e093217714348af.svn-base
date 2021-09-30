BEGIN_FUNCTION_MAP
	.Func,(dw531)입출금 내역조회,dw531,headtype=A;
	BEGIN_DATA_MAP
		dw531In,입력,input;
		begin
			계정ID		, user_id		, user_id		, char		,  10;
			조회시작일자	, fr_dt		, fr_dt		, char		,  8;
			조회종료일자	, to_dt		, to_dt		, char		,  8;
			입출구분		, dpwd_tp		, dpwd_tp		, char		,   1;   //%: 전체 , 1:입금,2:출금,3:입금(관리자),4:출금(관리자) ,5:입금(이벤트),6:출금(이벤트),7:입금전체,8:(출금전체)
			통화코드		, cur_cd		, cur_cd		, char		,   5;   //%: 전체
			요청개수		, req_cnt		, req_cnt		, long		,   5;
		end
		dw531Out_c,출력공통,output;
		begin
			응답건수		, rsp_cnt		, rsp_cnt		, long		,   5;
		end
		dw531Out,출력,output,occurs;
		begin
			거래일자		, trd_dt		, trd_dt		, char		,   8;  // YYYYMMDD(정렬기준)
			거래시각		, trd_tm		, trd_tm		, char		,  12;  // HH23MISSFF6 (정렬기준)
			입출구분		, dpwd_tp		, dpwd_tp		, char		,   1;  // 1 : 입금 , 2: 출금
			입출금상대구분	, dpwd_trgt_tp	, dpwd_trgt_tp	, char		,   1;   //  1 : 외부 , 2: 내부 , R : 관리자 , E : 이벤트
			통화코드		, cur_cd		, cur_cd		, char		,   5;  
			이동수량		, mov_trd_amt	, mov_trd_amt	, double	,  30;   //수수료제외
			KRW환산거래금액	, krw_trd_amt	, krw_trd_amt	, double	,  20;   //수수료제외
			상대전자지갑주소	, oppt_walt_id	, oppt_walt_id	, char		, 256;  //입금시 출금주소 , 출금시 입금주소
			상대지갑보조정보	, oppt_sub_info	, oppt_sub_info	, char		,  50;  
			진행상태구분	, trd_stat		, trd_stat		, char		,   1;    // 입금 - 1.입금중  2.입금완료 9.취소완료  // 암호화 화폐일경우 3. 출금완료 
			완료일시		, conf_dtm		, conf_dtm		, char		,  20;    // YYMMDDHH24MISSFF6
			트랜젝션ID		, txid			, txid			, char		, 128;      
			기본정보URL	, info_url		, info_url		, char		, 500;
			수수료	, fee		, fee		, double		, 30;
			총거래금액	, tot_trd_amt	, tot_trd_amt		, double		, 30;  //정산금액
		end
	END_DATA_MAP
END_FUNCTION_MAP
