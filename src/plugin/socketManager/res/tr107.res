BEGIN_FUNCTION_MAP
	.Func,(tr107)간편매매내역,tr107,headtype=A;
	BEGIN_DATA_MAP
		tr107In,입력,input;
		begin
			계정ID(O)           ,user_id         ,user_id         ,long    ,10 ;
			요청건수            ,req_cnt         ,req_cnt         ,long    ,5  ;
		end
		tr107Out_c,출력공통,output;
		begin
			응답건수            ,rsp_cnt         ,rsp_cnt         ,long    ,5  ;
		end
		tr107Out,출력,output,occurs;
		begin
			거래일시            ,trd_dtm         ,trd_dtm         ,char    ,14 ;
			매도종목코드        ,sell_symbol     ,sell_symbol     ,char    ,15 ; 
			매수종목코드        ,buy_symbol      ,buy_symbol      ,char    ,15 ;
			매도통화코드        ,sell_cur_cd     ,sell_cur_cd     ,char    ,5  ;
			매수통화코드        ,buy_cur_cd      ,buy_cur_cd      ,char    ,5  ;
			매도수량            ,sell_qty        ,sell_qty        ,double  ,20 ;
			매수수량            ,buy_qty         ,buy_qty         ,double  ,20 ;
			간편매매상태        ,smpl_trd_stat   ,smpl_trd_stat   ,char    ,1  ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
