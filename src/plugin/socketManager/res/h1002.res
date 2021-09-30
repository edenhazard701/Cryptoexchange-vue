BEGIN_FUNCTION_MAP
    .Func,(h1002)샘플 TR2,h1002;
    BEGIN_DATA_MAP
        h1002In1,입력,input;
        begin
            종목코드		, shcode	, shcode	, char	,    6;
            조회건수        , count     , count     , long  ,    4;
        end
        h1002Out1,출력,output;
        begin
			종목명			, hname		, hname		, char	,   40;
        end
        h1002Out2,출력,output,occurs;
        begin
			일자            , date      , date      , char  ,    8;
			현재가			, price		, price		, long	,    9;
        end
    END_DATA_MAP
END_FUNCTION_MAP
