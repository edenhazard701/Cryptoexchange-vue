BEGIN_FUNCTION_MAP
    .Func,(f0012)시스템 신호 조회,f0012,headtype=B;
    BEGIN_DATA_MAP
        f0012In1,입력,input;
        begin
           	전략코드         ,     SearchNum        ,     SearchNum        ,     char  ,        4;
			주기             ,     Term             ,     Term             ,     char  ,        4;
			마켓구분         ,     MarketGb         ,     MarketGb         ,     char  ,        1;
        end
        f0012Out1,출력,output;
        begin
            만족종목수        ,     TotalJongCnt     ,     TotalJongCnt     ,     char  ,        4;
			상한종목수        ,     High             ,     High             ,     char  ,        4;
			상승종목수        ,     Up               ,     Up               ,     char  ,        4;
			보합종목수        ,     Noch             ,     Noch             ,     char  ,        4;
			하락종목수        ,     Down             ,     Down             ,     char  ,        4;
			하한종목수        ,     Low              ,     Low              ,     char  ,        4;
			상승비중          ,     UpRate           ,     UpRate           ,     char  ,        6;
			평균등락율        ,     ChgrateAvg       ,     ChgrateAvg       ,     char  ,        6;
			만족종목수        ,     out_cnt		    ,     out_cnt		   ,     char  ,        5;
        end
        f0012Out2,출력,output,occurs;
        begin
            마켓구분          ,     MarketGb         ,     MarketGb         ,     char  ,        1;
			종목코드          ,     Code             ,     Code             ,     char  ,       15;
			종목명            ,     Hname            ,     Hname            ,     char  ,       50;
			현재가            ,     Close            ,     Close            ,     char  ,       12;
			전일대비          ,     Daebi            ,     Daebi            ,     char  ,       12;
			등락률(24시)      ,     ChgRate          ,     ChgRate          ,     char  ,        6;
			거래대금          ,     Value            ,     Value            ,     char  ,       18;
			거래량(24시)      ,     Volume           ,     Volume           ,     char  ,       12;
			대비(1시)         ,     Change_1h        ,     Change_1h        ,     char  ,        12;
			대비(24시)        ,     Change           ,     Change           ,     char  ,        12;
			대비(7일)         ,     Change_7d        ,     Change_7d        ,     char  ,        12;
			대비(1달)         ,     Change_1m        ,     Change_1m        ,     char  ,        12;
			등락률(1시)       ,     ChgRate_1h       ,     ChgRate_1h       ,     char  ,        9;
			등락률(7일)       ,     ChgRate_7d       ,     ChgRate_7d       ,     char  ,        9;
			등락률(1달)       ,     ChgRate_1m       ,     ChgRate_1m       ,     char  ,        9;
			거래소한글명      ,     ExcHname         ,     ExcHname         ,     char  ,       50;
			단순이동평균(5)   ,     MoveAvg_Sim_5    ,     MoveAvg_Sim_5    ,     char  ,       12;
			단순이동평균(20)  ,     MoveAvg_Sim_20   ,     MoveAvg_Sim_20   ,     char  ,       12;
			단순이동평균(60)  ,     MoveAvg_Sim_60   ,     MoveAvg_Sim_60   ,     char  ,       12;
			단순이동평균(120) ,     MoveAvg_Sim_120  ,     MoveAvg_Sim_120  ,     char  ,       12;
			지수이동평균(5)   ,     MoveAvg_Exp_5    ,     MoveAvg_Exp_5    ,     char  ,       12;
			지수이동평균(20)  ,     MoveAvg_Exp_20   ,     MoveAvg_Exp_20   ,     char  ,       12;
			지수이동평균(60)  ,     MoveAvg_Exp_60   ,     MoveAvg_Exp_60   ,     char  ,       12;
			지수이동평균(120) ,     MoveAvg_Exp_120  ,     MoveAvg_Exp_120  ,     char  ,       12;
			매수호가          ,     Bidho            ,     Bidho            ,     char  ,       12;
			매도호가          ,     Offerho          ,     Offerho          ,     char  ,       12;
			시가              ,    Open             ,     Open             ,     char  ,       12;
			고가              ,    High             ,     High             ,     char  ,       12;
			저가              ,    Low              ,     Low              ,     char  ,       12;
			1달고가           ,    High_1m          ,     High_1m          ,     char  ,       12;
			1달저가           ,    Low_1m           ,     Low_1m           ,     char  ,       12;
			3달고가           ,    High_3m          ,     High_3m          ,     char  ,       12;
			3달저가           ,    Low_3m           ,     Low_3m           ,     char  ,       12;
			52주고가          ,    High_52w         ,     High_52w         ,     char  ,       12;
			52주저가          ,    Low_52w          ,     Low_52w          ,     char  ,       12;
			연중최고          ,    High_Year        ,     High_Year        ,     char  ,       12;
			연중최저          ,    Low_Year         ,     Low_Year         ,     char  ,       12;
			시가%             ,    OpenPer          ,     OpenPer          ,     char  ,        9;
			고가%             ,    HighPer          ,     HighPer          ,     char  ,        9;
			저가%             ,    LowPer           ,     LowPer           ,     char  ,        9;
			종가상승률(1일)	   ,    PrcUpRateDay     ,     PrcUpRateDay     ,     char  ,        9;
			종가상승률(1주)	   ,    PrcUpRateWeek    ,     PrcUpRateWeek    ,     char  ,        9;
			종가상승률(1개월)  ,    PrcUpRateMon     ,     PrcUpRateMon     ,     char  ,        9;
			거래량상승률(1일)  ,    VolUpRateDay     ,     VolUpRateDay     ,     char  ,        9;
			거래량상승률(1주)  ,    VolUpRateWeek    ,     VolUpRateWeek    ,     char  ,        9;
			거래량상승률(1개월),    VolUpRateMon     ,     VolUpRateMon     ,     char  ,        9;
			순위검색순위       ,    OrderRank        ,     OrderRank        ,     char  ,        4;
        end
    END_DATA_MAP
END_FUNCTION_MAP
