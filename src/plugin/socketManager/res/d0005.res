BEGIN_FUNCTION_MAP
	.Func,(d0005)뉴스 제목 조회,d0005,headtype=B;
	BEGIN_DATA_MAP
		d0005In1,입력,input;
		begin
			종목코드   , symbol        , symbol        , char ,  15;
			조회구분   , qry_div       , qry_div       , char ,   1;
		end
		d0005Out1,출력,output;
		begin
			출력개수   , out_cnt       , out_cnt       , char ,   5;
		end
		d0005Out2,출력,output,occurs;
		begin
			일련번호   , seq_no        , seq_no        , char ,  10;
			원일련번호 , orgn_seq_no   , orgn_seq_no   , char ,  10;
			뉴스키     , crrt_news_key , crrt_news_key , char ,  40;
			사용여부   , use_yn        , use_yn        , char ,   1;
			수신일자   , rcv_dt        , rcv_dt        , char ,   8;
			수신시간   , rcv_time      , rcv_time      , char ,   6;
			국가코드   , nat_cd        , nat_cd        , char ,   2;
			통화코드   , curcy_cd      , curcy_cd      , char ,   5;
			뉴스원     , news_src      , news_src      , char ,   2;
			뉴스대분류 , main_div      , main_div      , char ,   2;
			뉴스중분류 , midd_div      , midd_div      , char ,   2;
			조회건수   , qry_cnt       , qry_cnt       , long ,  10;
			제목길이   , title_len     , title_len     , long ,   5;
			제목       , title         , title         , char , 512;
		end
	END_DATA_MAP
END_FUNCTION_MAP
