BEGIN_FUNCTION_MAP
	.Func,(tr110)합산잔고조회,tr110,headtype=A;
	BEGIN_DATA_MAP
		tr110In,입력,input;
		begin
			계정ID              ,user_id            ,user_id           ,long  ,10 ;
		end
		tr110Out_S,출력(S),output;
		begin
			일반자산            ,gnrl_net_aset_amt  ,gnrl_net_aset_amt ,double ,20 ;
			마진자산            ,mrgn_net_aset_amt  ,mrgn_net_aset_amt ,double ,20 ;
			합산잔고            ,tot_net_aset_amt   ,tot_net_aset_amt  ,double ,20 ;
		end
	END_DATA_MAP
END_FUNCTION_MAP
