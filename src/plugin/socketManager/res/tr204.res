BEGIN_FUNCTION_MAP
	.Func,(tr204)마진잔고통합조회,tr204,headtype=A;
	BEGIN_DATA_MAP
		tr204In,Input,input;
		begin
			계정ID(O)           ,user_id             ,user_id            ,long    ,10;
		end
		tr204Out_S,Output(S),output;
		begin
			총증거금            ,tot_wmon            ,tot_wmon           ,double  ,20;
			총사용증거금        ,tot_use_wmon        ,tot_use_wmon       ,double  ,20;
			총가용증거금        ,tot_able_wmon       ,tot_able_wmon      ,double  ,20;
			총대출금액          ,tot_loan_amt        ,tot_loan_amt       ,double  ,20;
			총원화대출평가액    ,tot_krw_evlt_amt    ,tot_krw_evlt_amt   ,double  ,20;
			총코인대출원화평가액,tot_coin_evlt_amt   ,tot_coin_evlt_amt  ,double  ,20;
			총평가손익          ,tot_evlt_pl         ,tot_evlt_pl        ,double  ,20; 
			응답건수 	        ,rsp_cnt		     ,rsp_cnt            ,long    ,5 ;
		end
		tr204Out_M,Output(M),output,occurs;
		begin
			통화코드            ,cur_cd              ,cur_cd             ,char    ,5 ;
			보유금액            ,remn_qty            ,remn_qty           ,double  ,20;
			대용기준가격        ,sbst_base_prc       ,sbst_base_prc      ,double  ,20;
			대용가율            ,sbst_rt             ,sbst_rt            ,double  ,15;
			대용가              ,sbst_prc            ,sbst_prc           ,double  ,20;
			증거금              ,wmon                ,wmon               ,double  ,20;
			사용증거금          ,use_wmon            ,use_wmon           ,double  ,20;
			가용증거금          ,able_wmon           ,able_wmon          ,double  ,20;
			대출금액            ,loan_amt            ,loan_amt           ,double  ,20;
			원화대출평가액      ,krw_evlt_amt        ,krw_evlt_amt       ,double  ,20;
			코인대출원화평가액  ,coin_evlt_amt       ,coin_evlt_amt      ,double  ,20;
			평가손익            ,evlt_pl             ,evlt_pl            ,double  ,20;
			인출가능금액        ,widr_able_amt       ,widr_able_amt      ,double  ,20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
