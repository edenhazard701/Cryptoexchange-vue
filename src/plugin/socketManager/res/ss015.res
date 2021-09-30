BEGIN_FUNCTION_MAP
	.Func,(ss015)스마트시그널_신청내역,ss015,headtype=B;
	BEGIN_DATA_MAP
		ss015In1,입력,input;
		begin
			계정_ID	,			usr_id,		usr_id, 	char, 	10;
			조회구분	,		next_gb, 	next_gb, 	char, 	1; 
			다음조회키	, 		next_key, 	next_key, 	char, 	14;
		end
		ss015Out1,출력,output;
		begin
			조회결과,    		rslt_cls,   rslt_cls,   char, 	1;
			결과메시지,			rslt_msg,	rslt_msg,	char,	100;
			다음조회키	, 		next_key, 	next_key, 	char, 	14;
			결과갯수,     		out_cnt,	out_cnt,  	char, 	4;
		end
		ss015Out2,출력,output,occurs;
		begin
			신청일,				rqst_dttm,	rqst_dttm, 	char,	14;
			구독상태,			stt_cls, 	stt_cls, 	char, 	1;
			구독전문가실명,		expt_nm,	expt_nm,	char,	20;
			닉네임,				expt_nnm,	expt_nnm, 	char, 	40;
			해지일,				trmn_dttm,	trmn_dttm,	char,	14;
		end
	END_DATA_MAP
END_FUNCTION_MAP
