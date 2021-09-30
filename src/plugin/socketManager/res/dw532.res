BEGIN_FUNCTION_MAP
	.Func,(dw532)입출금 통화조회,dw532,headtype=A;
	BEGIN_DATA_MAP
		dw532In,입력,input;
		begin
			계정ID		, user_id		, user_id		, char		,  10;
			입출구분		, dpwd_tp		, dpwd_tp		, char		,   1;
		end
		dw532Out_c,출력공통,output;
		begin
			응답건수		, rsp_cnt		, rsp_cnt		, long		,   5;
		end
		dw532Out,출력,output,occurs;
		begin
			통화코드		, cur_cd		, cur_cd		, char		,   5;
			통화명		, cur_nm		, cur_nm		, char		,   60;
		end
	END_DATA_MAP
END_FUNCTION_MAP
