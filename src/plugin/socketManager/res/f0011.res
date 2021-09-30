BEGIN_FUNCTION_MAP
    .Func,(f0011)시스템 신호 리스트 조회,f0011,headtype=B;
	BEGIN_DATA_MAP
        f0011In1,입력,input;
        begin
            카테고리                , Category       , Category           , char 		, 4;
            Filter				   , Filter         , Filter             , char 		, 4;
	    end
        f0011Out1,출력,output;
		begin
			시스템신호리스트수       , out_cnt       , out_cnt               , char	     , 4;
		end
		f0011Out2,출력,output,occurs;
		begin
		    전략코드                , SearchNum     , SearchNum            , char       , 4;
			전략명                  , SearchName    , SearchName           , char       , 128;
			만족종목수              , JongCnt		, JongCnt              , char       , 4;
		end
	END_DATA_MAP
END_FUNCTION_MAP