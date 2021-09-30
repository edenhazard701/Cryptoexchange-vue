BEGIN_FUNCTION_MAP
	.Func,(tr210)마진담보정보조회,tr210,headtype=A;
	BEGIN_DATA_MAP
		tr210In,입력,input;
		begin
			계정ID(O)      ,user_id       ,user_id         ,long    ,10 ;
		end
		tr210Out,출력,output;
		begin
			증거금         ,wmon          ,wmon            ,double  ,20 ;
			사용증거금     ,use_wmon      ,use_wmon        ,double  ,20 ;
			가용증거금     ,able_wmon     ,able_wmon       ,double  ,20 ;
			평가손익       ,evlt_pl       ,evlt_pl         ,double  ,20 ;
			대출금액       ,loan_amt      ,loan_amt        ,double  ,20 ;
			현담보비율     ,cur_wrnt_rt   ,cur_wrnt_rt     ,double  ,10 ;
			유지담보비율   ,keep_wrnt_rt  ,keep_wrnt_rt    ,double  ,10 ;
			로스컷금액     ,loss_cut_amt  ,loss_cut_amt    ,double  ,20 ;
			순자산         ,net_aset_amt  ,net_aset_amt    ,double  ,20 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
