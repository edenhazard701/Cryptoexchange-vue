BEGIN_FUNCTION_MAP
	.Func,(tr208)마진증거금현황,tr208,headtype=A;
	BEGIN_DATA_MAP
		tr208In,입력,input;
		begin
			계정ID(O)           ,user_id         ,user_id          ,long    ,10;
		end
		tr208Out_S,출력(S),output;
		begin
			총증거금            ,tot_wmon       ,tot_wmon          ,double  ,20;
			사용증거금          ,tot_use_wmon   ,tot_use_wmon      ,double  ,20;
			가용증거금          ,tot_able_wmon  ,tot_able_wmon     ,double  ,20;
			응답건수            ,rsp_cnt        ,rsp_cnt           ,long    ,5 ;
		end
		tr208Out_M,출력(M),output,occurs;
		begin
			통화코드            ,cur_cd         ,cur_cd            ,char    ,5 ;
			현재가              ,curt_prc       ,curt_prc          ,double  ,20;
			대용가능수량        ,sbst_able_qty  ,sbst_able_qty     ,double  ,20;
			대용가율            ,sbst_rt        ,sbst_rt           ,double  ,10;
			증거금              ,wmon           ,wmon              ,double  ,20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
