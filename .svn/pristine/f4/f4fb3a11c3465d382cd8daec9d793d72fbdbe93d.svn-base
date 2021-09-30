BEGIN_FUNCTION_MAP
    .Func,(f0004)신호 등록/해제,f0004,headtype=B;
    BEGIN_DATA_MAP
        f0004In1,입력,input;
        begin
            계정ID         , id             , id             , char , 10;
			날짜           , date           , date           , char , 8;
			시간           , time           , time           , char , 6;
			등록해제구분   , op_gb          , op_gb          , char , 1;
			OS구분         , os_div         , os_div         , char , 1;
			단말기고유정보 , dev_ihrt_value , dev_ihrt_value , char , 152;
			신호등록번호   , alert_no       , alert_no       , char , 8;
			지표번호       , cond_no        , cond_no        , char , 4;
			주기           , term           , term           , char , 4;
			조건형태       , cond_type      , cond_type      , char , 2;
			종목코드       , code           , code           , char , 15;
			신호설정1      , param1         , param1         , char , 24;
			신호설정2      , param2         , param2         , char , 24;
			신호설정3      , param3         , param3         , char , 24;
			신호설정4      , param4         , param4         , char , 24;
			신호설정5      , param5         , param5         , char , 24
        end
        f0004Out1,출력,output;
        begin
            계정ID         , id             , id             , char , 10;
			등록해제구분   , op_gb          , op_gb          , char , 1;
            처리결과       , result         , result         , char , 1;
			시간           , time           , time           , char , 6;
			신호등록번호   , alert_no       , alert_no       , char , 8;
			에러메세지     , msg            , msg            , char , 120;
        end
    END_DATA_MAP
END_FUNCTION_MAP
