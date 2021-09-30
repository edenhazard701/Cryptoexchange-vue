BEGIN_FUNCTION_MAP
	.Func,(ss039)전문가 전략종목요청,ss039,headtype=B;
	BEGIN_DATA_MAP
		ss039In1,입력,input;
		begin
            전문가_등록_번호, 	expt_rgst_no, 	expt_rgst_no, 	char, 	20;
		end
		ss039Out1,출력,output;
		begin
			조회결과,    		rslt_cls,   rslt_cls,   char, 	1;
			결과메시지,			rslt_msg,	rslt_msg,	char,	100;
			결과갯수,     		out_cnt,	out_cnt,  	char, 	4;
		end
		ss039Out2,출력,output,occurs;
		begin
            종목코드, 			symbol, 		symbol, 		char, 	15;
			전략키, 			expt_strtg_key, 		expt_strtg_key, 		char, 	32;
            등록일시, 			rgst_dttm, 		rgst_dttm, 		char, 	14;
		end
	END_DATA_MAP
END_FUNCTION_MAP

