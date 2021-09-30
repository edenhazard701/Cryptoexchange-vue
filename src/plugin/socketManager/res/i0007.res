BEGIN_FUNCTION_MAP
	.Func,(i0007)관심종목 확장화면(일간) 조회,i0007,headtype=B;
	BEGIN_DATA_MAP
		i0007In1,입력,input;
		begin
			종목건수             , symbolcnt        , symbolcnt        , long   ,  5;
			결제통화코드         , paycurrcode      , paycurrcode      , char   ,  5;
			거래소코드           , excode           , excode           , char   ,  3;
		end
		i0007In2,입력,input,occurs;
		begin
			종목코드             , symbol           , symbol           , char   , 15;
		end
		i0007Out1,출력,output;
		begin
			출력개수             , out_cnt          , out_cnt          , char   ,  5;
		end
		i0007Out2,출력,output,occurs;
		begin
			종목코드             , symbol           , symbol           , char   , 15;
			거래소명             , exkorname        , exkorname        , char   , 50;
			현재가(KRW)          , krwcurprc        , krwcurprc        , double , 20;
			현재가(USD)          , usdcurprc        , usdcurprc        , double , 20;
			전일대비             , diff             , diff             , double , 20;
			등락률               , dtupdnrate       , dtupdnrate       , double ,  6;
			등락률(24시간)       , dtupdnrate24     , dtupdnrate24     , double ,  6;
			거래량               , cumdealqty       , cumdealqty       , double , 20;
			시가                 , openprc          , openprc          , double , 20;
			고가                 , highprc          , highprc          , double , 20;
			저가                 , lowprc           , lowprc           , double , 20;
			전일종가             , yesterdayprice   , yesterdayprice   , double , 20;
			전일거래량           , precumdealqty    , precumdealqty    , double , 20;
			코인명               , korname          , korname          , char   , 50;
			변동률(1시간)        , updratetime1     , updratetime1     , double ,  6;
			변동률(3시간)        , updratetime3     , updratetime3     , double ,  6;
			변동률(12시간)       , updratetime12    , updratetime12    , double ,  6;
			변동률(24시간)       , updratetime24    , updratetime24    , double ,  6;
			변동률(3일)          , updratedate3     , updratedate3     , double ,  6;
			변동률(7일)          , updratedate7     , updratedate7     , double ,  6;
			스프레드(최고가대비) , maxhighprccomp   , maxhighprccomp   , double , 20;
			스프레드(최저가대비) , minlowprccomp    , minlowprccomp    , double , 20;
			최고가거래소         , maxhighexkorname , maxhighexkorname , char   , 50;
			최저가거래소         , minlowexkorname  , minlowexkorname  , char   , 50;
			최우선매수호가       , bid0             , bid0             , double , 20;
			최우선매도호가       , ask0             , ask0             , double , 20;
			매수총잔량           , bidtotal         , bidtotal         , double , 20;
			매도총잔량           , asktotal         , asktotal         , double , 20;
			체결강도             , execstrth        , execstrth        , double ,  6;
			평균가격(7일)        , avgprcmax7       , avgprcmax7       , double , 20;
			평균가격(14일)       , avgprcmax14      , avgprcmax14      , double , 20;
			평균가격(28일)       , avgprcmax28      , avgprcmax28      , double , 20;
			이격도(14일)         , spmax14          , spmax14          , double ,  9;
			이격도(28일)         , spmax28          , spmax28          , double ,  9;
			최고가(365일)        , hprc365          , hprc365          , double , 20;
			최저가(365일)        , lprc365          , lprc365          , double , 20;
			연중최고가           , hprcyear         , hprcyear         , double , 20;
			연중최저가           , lprcyear         , lprcyear         , double , 20;
			피봇값               , pivot            , pivot            , double , 20;
			피봇1차지지          , support1         , support1         , double , 20;
			피봇2차지지          , support2         , support2         , double , 20;
			피봇1차저항          , resist1          , resist1          , double , 20;
			피봇2차저항          , resist2          , resist2          , double , 20;
			메모                 , message          , message          , char   , 55;
			거래대금             , cumdealcost      , cumdealcost      , double , 20;
		end
		i0007Out3,출력,output;
		begin
			출력개수             , out_cnt          , out_cnt          , char   ,  5;
		end
		i0007Out4,출력,output,occurs;
		begin
			종목코드             , symbol           , symbol           , char   , 15;
			고가                 , highprc          , highprc          , double , 20;
			저가                 , lowprc           , lowprc           , double , 20;
			시가                 , openprc          , openprc          , double , 20;
			종가                 , yesterdayprice   , yesterdayprice   , double , 20;
			일자                 , execdate         , execdate         , char   ,  8;
			시간                 , exectime         , exectime         , char   ,  6;
		end
	END_DATA_MAP
END_FUNCTION_MAP
