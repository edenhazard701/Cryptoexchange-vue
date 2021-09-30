BEGIN_FUNCTION_MAP
    .Func,(sg003)스마트시그널 서버전략 실행중지 제어,sg003;
    BEGIN_DATA_MAP
        sg003In1,입력,input;
        begin
            DUMMY, 				dummy,			dummy, 			char,   1;
        end
        sg003Out1,출력,output;
        begin
			응답건수,			out_cnt,		out_cnt,		long,   5;
        end
        sg003Out2,출력,output,occurs;
        begin
			전문가코드,			expt_rgst_no,	expt_rgst_no,	char,   20;
			전략키,				expt_strtg_key,	expt_strtg_key,	char,   32;
			종목코드,			symbol,			symbol,			char,   15;
			실행일시,			rundt,			rundt,			char,	14;
			시작일시,			startdt,		startdt,		char,	14;
			이전종료일시,		enddt,			enddt,			char,	14;
			프로세스ID,			pid,			pid,			char,	6;
			종료코드,			exitno,			exitno,			char,	4;
			시그널코드,			signo,			signo,			char,	4;
			재실행횟수,			rcnt,			rcnt,			char,	3;
			주기,				cycunit,		cycunit,		char,   1;
			N봉,				cyc,			cyc,			char,   3;
			봉수,				cyccnt,			cyccnt,			char,   5;
			마지막봉일시,		cyclastdt,		cyclastdt,		char,   14;
			마지막봉가격,		cycprc,			cycprc,			char,   20;
			시세일시,			execdt,			execdt,			char,   14;
			시세가격,			execprc,		execprc,		char,   20;
			시세금액,			execval,		execval,		char,   20;
			신호일시,			sigdt,			sigdt,			char,   14;
			신호매수가,			sigbuy,			sigbuy,			char,   20;
			신호매도가,			sigsell,		sigsell,		char,   20;
			신호목표가,			sigtarg,		sigtarg,		char,   20;
			신호손절가,			sigsale,		sigsale,		char,   20;
        end
    END_DATA_MAP
END_FUNCTION_MAP
