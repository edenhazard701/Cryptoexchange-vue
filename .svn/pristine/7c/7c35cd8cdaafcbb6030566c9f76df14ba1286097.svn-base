BEGIN_FUNCTION_MAP
	.Func,(f0022) 알림 설정,f0022,headtype=B;
	BEGIN_DATA_MAP
		f0022In1,입력,input;
		begin
			작업구분	 ,JobFlag	,JobFlag	 ,char	,1;
			아이디		 ,UserID	,UserID		 ,char	,10;
			종목코드	 ,Code		,Code		 ,char	,15;
			NextFlag	,NextFlag	,NextFlag	,char	,1;
			NextKey		,NextKey	,NextKey	,char	,14;
		end
		f0022Out_c,출력,output;
		begin
			NextFlag,	NextFlag,	NextFlag,	char,	1;
			NextKey,	NextKey,	NextKey,	char,	14;
			결과카운트,	 out_cnt,	 out_cnt,	 char,	5;
		end
		f0022Out,출력,output,occurs;
		begin
			종목코드,		Code,			Code,			char,	15;
			종목명,			Hname,			Hname,			char,	40;
			저장날짜,		Datetime,		Datetime,		char,	14;
			조건번호명,		CondName,		CondName,		char,	100;
			상승하락구분,	UpDownFlag,		UpDownFlag,		char,	1;
			조건상세명,		ConditionName,	ConditionName,	char,	100;
			조건번호,		CondNo,			CondNo,			char,	4;
			조건상세1,		Condition1,		Condition1,		char,	16;
			조건상세2,		Condition2,		Condition2,		char,	16;
			조건상세3,		Condition3,		Condition3,		char,	16;
		end
	END_DATA_MAP
END_FUNCTION_MAP