BEGIN_FUNCTION_MAP
	.Func,(d2001)차트설정정보_저장_로드,d2001,headtype=B;
	BEGIN_DATA_MAP
		d2001In1,입력,input;
		begin
			구분	,				reg_gb,				reg_gb,			char, 1;
			유져ID	,				user_id,			user_id,		char, 10;
			key		,				key,				key,			char, 20;
			data_len,				datalen, 			datalen,		char, 7;
			data	,				data,				data,			char, 11264;
		end
		d2001Out1,출력,output;
		begin
			등록결과,     			rslt_cls,			rslt_cls,  		char, 1;
			결과메세지,				rslt_msg,			rslt_msg,		char, 100;
			결과갯수,				out_cnt,			out_cnt,		char, 4;
		end
		d2001Out2,출력,output,occurs;
		begin
			user_id	,				user_id,			user_id,		char, 10;
			key		,				key,				key,			char, 20;
			data_len,				datalen, 			datalen,		char, 7;
			data	,				data,				data,			char, 11264;
		end
	END_DATA_MAP
END_FUNCTION_MAP
