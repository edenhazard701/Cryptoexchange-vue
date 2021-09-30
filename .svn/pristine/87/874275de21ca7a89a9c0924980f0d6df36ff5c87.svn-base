BEGIN_FUNCTION_MAP
	.Func,(M2003)전체서버 프로세스 상태 시간별 조회,M2003,headtype=B;
	BEGIN_DATA_MAP
		M2003In1,입력,input;
		begin
			일자       , dt       , dt       , char  ,   8;
			시간       , time     , time     , char  ,   6; // NEXT필드-최초:9(6)
			IP주소     , ip_addr  , ip_addr  , char  ,  15; // NEXT필드-최초:9(16)
			프로세스ID , proc_id  , proc_id  , char  ,   6; // NEXT필드-최초:9(6)
			조회개수   , qry_cnt  , qry_cnt  , char  ,   5;
			플래그     , flag     , flag     , char  ,   1;
		end
		M2003Out1,출력,output;
		begin
			츨력개수   , out_cnt  , out_cnt  , char  ,   5;
		end
		M2003Out2,출력,output,occurs;
		begin
			일자       , dt       , dt       , char  ,   8;
			시간       , time     , time     , char  ,   6;
			IP주소     , ip_addr  , ip_addr  , char  ,  15;
			홈경로     , home_path, home_path, char  ,  64;
			프로세스ID , proc_id  , proc_id  , char  ,   6;
			프로세스명 , proc_nm  , proc_nm  , char  ,  64;
			상태레벨   , stts_lvl , stts_lvl , int   ,   1; //0:죽음 1:크리티컬 2:위험 3:확인
			메세지     , msg      , msg      , char  , 200;
		end
	END_DATA_MAP
END_FUNCTION_MAP
