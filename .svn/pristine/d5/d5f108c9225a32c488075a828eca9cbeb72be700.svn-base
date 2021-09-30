BEGIN_FUNCTION_MAP
	.Func,(M2002)서버별 CPU상태 시간별 조회,M2002,headtype=B;
	BEGIN_DATA_MAP
		M2002In1,입력,input;
		begin
			일자            , dt      , dt      , char  ,  8;
			시간            , time    , time    , char  ,  6; // NEXT필드-최초:9(6)
			IP주소          , ip_addr , ip_addr , char  , 15; // NEXT필드-최초:9(16)
			조회개수        , qry_cnt , qry_cnt , char  ,  5;
			플래그          , flag    , flag    , char  ,  1;
		end
		M2002Out1,출력,output;
		begin
			츨력개수        , out_cnt , out_cnt , char  ,  5;
		end
		M2002Out2,출력,output,occurs;
		begin
			일자            , dt      , dt      , char  ,  8;
			시간            , time    , time    , char  ,  6;
			IP주소          , ip_addr , ip_addr , char  , 15;
			사용자CPU사용율 , user    , user    , double,  5;
			커널CPU사용율   , kernel  , kernel  , double,  5;
			CPU IDLE        , idle    , idle    , double,  5;
			I/O WAIT        , iowait  , iowait  , double,  5;
			RunQ            , runq    , runq    , double,  5;
		end
	END_DATA_MAP
END_FUNCTION_MAP
