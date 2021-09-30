BEGIN_FUNCTION_MAP
	.Func,(M2006)전체서버 DISK상태 일별 조회,M2006,headtype=B;
	BEGIN_DATA_MAP
		M2006In1,입력,input;
		begin
			일자         , dt           , dt           , char  ,  8;
		end
		M2006Out1,출력,output;
		begin
			츨력개수     , out_cnt      , out_cnt      , char  ,  5;
		end
		M2006Out2,출력,output,occurs;
		begin
			일자         , dt           , dt           , char  ,  8;
			IP주소       , ip_addr      , ip_addr      , char  , 15;
			파일시스템명 , file_sys_nm  , file_sys_nm  , char  , 64;
			MOUNT위치    , mount_loc    , mount_loc    , char  , 64;
			시간         , time         , time         , char  ,  6;
			전체용량     , all_qty      , all_qty      , int   , 12;
			사용량       , use_qty      , use_qty      , int   , 12;
			가용량       , poss_qty     , poss_qty     , int   , 12;
			사용율       , use_rate     , use_rate     , char  ,  5;
		end
	END_DATA_MAP
END_FUNCTION_MAP
