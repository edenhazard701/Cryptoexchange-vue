BEGIN_FUNCTION_MAP
	.Func,(d0007)뉴스 저장/삭제,d0007,headtype=B;
	BEGIN_DATA_MAP
		d0007In1,입력,input;
		begin
			저장삭제구분 , save_del_div  , save_del_div  , char ,       1;
			일련번호     , seq_no        , seq_no        , char ,      10;
			원일련번호   , orgn_seq_no   , orgn_seq_no   , char ,      10;
			뉴스키       , crrt_news_key , crrt_news_key , char ,      40;
			사용여부     , use_yn        , use_yn        , char ,       1;
			수신일자     , rcv_dt        , rcv_dt        , char ,       8;
			수신시간     , rcv_time      , rcv_time      , char ,       6;
			국가코드     , nat_cd        , nat_cd        , char ,       2;
			통화코드     , curcy_cd      , curcy_cd      , char ,       5;
			뉴스원       , news_src      , news_src      , char ,       2;
			뉴스대분류   , main_div      , main_div      , char ,       2;
			뉴스중분류   , midd_div      , midd_div      , char ,       2;
			조회건수     , qry_cnt       , qry_cnt       , long ,      10;
			제목길이     , title_len     , title_len     , long ,       5;
			제목         , title         , title         , char ,     512;
			내용길이     , cntnt_len     , cntnt_len     , long ,       8;
			내용         , cntnt         , cntnt         , char , 1024000;
		end
		d0007Out1,출력,output;
		begin
			출력개수     , out_cnt       , out_cnt       , char ,       5;
		end
		d0007Out2,출력,output,occurs;
		begin
			일련번호     , seq_no        , seq_no        , char ,      10;
			원일련번호   , orgn_seq_no   , orgn_seq_no   , char ,      10;
			뉴스키       , crrt_news_key , crrt_news_key , char ,      40;
			사용여부     , use_yn        , use_yn        , char ,       1;
			수신일자     , rcv_dt        , rcv_dt        , char ,       8;
			수신시간     , rcv_time      , rcv_time      , char ,       6;
			국가코드     , nat_cd        , nat_cd        , char ,       2;
			통화코드     , curcy_cd      , curcy_cd      , char ,       5;
			뉴스원       , news_src      , news_src      , char ,       2;
			뉴스대분류   , main_div      , main_div      , char ,       2;
			뉴스중분류   , midd_div      , midd_div      , char ,       2;
			조회건수     , qry_cnt       , qry_cnt       , long ,      10;
			제목길이     , title_len     , title_len     , long ,       5;
			제목         , title         , title         , char ,     512;
			내용길이     , cntnt_len     , cntnt_len     , long ,       8;
			내용         , cntnt         , cntnt         , char , 1024000;
		end
	END_DATA_MAP
END_FUNCTION_MAP
