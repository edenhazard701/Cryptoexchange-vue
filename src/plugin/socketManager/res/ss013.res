BEGIN_FUNCTION_MAP
	.Func,(ss013)스마트시그널_전문가선택_상세_신호히스토리,ss013,headtype=B;
	BEGIN_DATA_MAP
		ss013In1,입력,input;
		begin
			전문가_등록_번호, 	expt_rgst_no, 	expt_rgst_no, 	char, 20;
			종목코드,		  	symbol,			symbol,		  	char, 15;
			검색시작일자,		srch_sdate,		srch_sdate,		char, 14;
			검색종료일자,		srch_edate,		srch_edate,		char, 14;
		end
		ss013Out1,출력,output;
		begin
			조회결과,    		rslt_cls,      	rslt_cls,     	char, 1;
			종목코드,		  	symbol,			symbol,		  	char, 15;
			검색시작일자, 		srch_sdate, 	srch_sdate, 	char, 14;
			다음조회키, 		next_key, 		next_key, 		char, 14;
			결과갯수,   		out_cnt,	    out_cnt,  	  	char, 4;
		end
		ss013Out2,출력,output,occurs;
		begin
			발생일자,	   		date,    		date,    		char, 8; 
			발생시간 ,          time,         	time,         	char, 6;
			매수가,		   		sig_buy,        sig_buy,        char, 20;
			매도가,  			sig_sell,   	sig_sell,   	char, 20;
			목표가,  			sig_target,   	sig_target,   	char, 20;
			손절가,      		sig_sales,  	sig_sales,  	char, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
