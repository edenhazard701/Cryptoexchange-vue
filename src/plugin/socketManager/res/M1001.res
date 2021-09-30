BEGIN_FUNCTION_MAP
	.Func,(M1001)긴급 공지사항 전달(관리자메세지),M1001,headtype=B;
	BEGIN_DATA_MAP
		M1001In1,입력,input;
		begin
			접속서버 IP, conn_ip_addr, conn_ip_addr, char ,  15;
			사용자 ID  , user_id     , user_id     , char ,  10;
			세션키     , sesn_key    , sesn_key    , char ,  50;
			매체구분   , med_div     , med_div     , char ,   2;
			사용자구분 , user_div    , user_div    , char ,   1;
			메세지구분 , msg_div     , msg_div     , char ,   1;
			화면형태   , screen_form , screen_form , char ,   1;
			화면번호   , screen_no   , screen_no   , char ,   4;
			제목       , title       , title       , char ,  80;
			내용       , cntnt       , cntnt       , char , 512;
			필러       , filler      , filler      , char , 356;
		end
		M1001Out1,출력,output;
		begin
			결과구분   , rslt_div    , rslt_div    , char ,   1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
