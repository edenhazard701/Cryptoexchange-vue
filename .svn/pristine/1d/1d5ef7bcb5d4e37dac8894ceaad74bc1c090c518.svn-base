BEGIN_FUNCTION_MAP
	.Func,(tr415)주문처리오류내역조회,tr415,headtype=A;
	BEGIN_DATA_MAP
		tr415In,입력,input;
		begin
			계정ID               , user_id          , user_id           , char   , 10;
			종목                 , symbol           , symbol            , char   , 15;
			재처리여부           , re_proc_yn       , re_proc_yn        , char   , 1;
			주문처리오류구분     , ord_proc_err_tp  , ord_proc_err_tp   , char   , 1;
			조회시작일           , sta_dt           , sta_dt            , char   , 8;
			조회종료일           , end_dt           , end_dt            , char   , 8;
			요청건수             , req_cnt          , req_cnt           , long   , 5;
		end
		tr415Out_c,출력공통,output;
		begin
			응답건수             , rsp_cnt          , rsp_cnt           , long   , 5;
		end
		tr415Out,출력,output,occurs;
		begin
			계정ID               , user_id          , user_id           , long   , 10;
			주문번호             , ord_no           , ord_no            , long   , 10;
			오류시각             , err_dtm          , err_dtm           , char   , 20;
			주문처리오류구분     , ord_proc_err_tp  , ord_proc_err_tp   , char   , 1;
			거래소거부사유코드   , rejt_resn_cd     , rejt_resn_cd      , char   , 2;
			오류MSG              , err_msg          , err_msg           , char   , 300;
			재처리여부           , re_proc_yn       , re_proc_yn        , char   , 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
