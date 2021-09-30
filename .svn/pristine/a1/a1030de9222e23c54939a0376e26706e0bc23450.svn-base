BEGIN_FUNCTION_MAP
	.Func,(tr209)마진잔고평가손익,tr209,headtype=A;
	BEGIN_DATA_MAP
		tr209In,입력,input;
		begin
			계정ID(O)           ,user_id        ,user_id       ,long    ,10 ;
		end
		tr209Out_S,출력(S),output;
		begin
			총평가손익          ,tot_evlt_pl    ,tot_evlt_pl   ,double  ,20 ;
			응답건수            ,rsp_cnt        ,rsp_cnt       ,long    ,5  ;
		end
		tr209Out_M,출력(M),output,occurs;
		begin
			종목               ,symbol         ,symbol         ,char    ,15 ;
			포지션구분         ,pstn_tp        ,pstn_tp        ,char    ,1  ;
			대상통화코드       ,trgt_cur_cd    ,trgt_cur_cd    ,char    ,5  ;
			평균체결가격       ,avg_cntr_prc   ,avg_cntr_prc   ,double  ,20 ;
			현재가             ,curt_prc       ,curt_prc       ,double  ,20 ;
			잔량               ,remn_qty       ,remn_qty       ,double  ,20 ;
			평가손익           ,evlt_pl        ,evlt_pl        ,double  ,20 ;
			대출금액           ,loan_amt       ,loan_amt       ,double  ,20 ;
			평가금액           ,evlt_amt       ,evlt_amt       ,double  ,20 ;
			수익율             ,prft_rt        ,prft_rt        ,double  ,20 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
