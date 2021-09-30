BEGIN_FUNCTION_MAP
    .Func,(h0001)샘플 TR1,h0001;
    BEGIN_DATA_MAP
        h0001In1,입력,input;
        begin
            종목코드		, shcode	, shcode	, char	,    6;
        end
        h0001Out1,출력,output;
        begin
			종목명			, hname		, hname		, char	,   40;
			현재가			, price		, price		, long	,    9;
        end
    END_DATA_MAP
END_FUNCTION_MAP
