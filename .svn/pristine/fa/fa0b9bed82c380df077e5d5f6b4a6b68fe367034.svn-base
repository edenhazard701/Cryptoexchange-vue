BEGIN_FUNCTION_MAP
	.Func,(tr504)일반잔고조회,tr504,headtype=A;
	BEGIN_DATA_MAP
		tr504In,입력,input;
		begin
			계정ID(O)           ,user_id         ,user_id         ,char    ,10 ;
			통화코드            ,cur_cd          ,cur_cd          ,char    ,5  ;
			수수료포함구분      ,fee_tp          ,fee_tp          ,char    ,1  ;
		end
		tr504Out_S,출력(S),output;
		begin
			총매입              ,tot_buy_pamt    ,tot_buy_pamt    ,double  ,20 ;
			총평가              ,tot_evlt_amt    ,tot_evlt_amt    ,double  ,20 ;
			총평가손익          ,tot_evlt_pl     ,tot_evlt_pl     ,double  ,20 ;
			수익률              ,tot_prft_rt     ,tot_prft_rt     ,double  ,15 ;
			KRW잔고             ,krw_remn_bal    ,krw_remn_bal    ,double  ,20 ;
			총자산              ,tot_asset       ,tot_asset       ,double  ,20 ;
			응답건수 	        ,rsp_cnt         ,rsp_cnt         ,long    ,5  ;
		end
		tr504Out_M,출력(M),output,occurs;
		begin
			통화코드            ,cur_cd          ,cur_cd          ,char    ,5  ;
			매입원금            ,buy_pamt        ,buy_pamt        ,double  ,20 ;
			평가금액            ,evlt_amt        ,evlt_amt        ,double  ,20 ;
			평가손익            ,evlt_pl         ,evlt_pl         ,double  ,20 ;
			수익률              ,prft_rt         ,prft_rt         ,double  ,15 ;
			매입가              ,buy_prc         ,buy_prc         ,double  ,20 ;
			보유                ,remn_qty        ,remn_qty        ,double  ,20 ;
			사용중              ,use_qty         ,use_qty         ,double  ,20 ;
			사용가능            ,ord_able_qty    ,ord_able_qty    ,double  ,20 ;
			현재가              ,sbst_base_prc   ,sbst_base_prc   ,double  ,20 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
