BEGIN_FUNCTION_MAP
    .Feed, (FREX)고시환율, FREX, key=5, keycnt=1000, bufcnt=50, group=1;
    BEGIN_DATA_MAP
    InBlock,입력,input;
    begin
    통화코드               , currcode             ,  currcode            , char    ,    5;
    end
    OutBlock,출력,output;
    begin
    통화코드               , currcode             ,  currcode            , char    ,    5;
    기준일                 , bssdate              ,  bssdate             , char    ,    8;
    고시시간               , notitime             ,  notitime            , char    ,    6;
    회차                   , cnt                  ,  cnt                 , char    ,    4;
    매매기준율             , trdbssrate           ,  trdbssrate          , double  ,   20;
    end
    END_DATA_MAP
END_FUNCTION_MAP
