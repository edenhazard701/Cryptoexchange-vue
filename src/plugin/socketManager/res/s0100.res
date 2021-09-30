BEGIN_FUNCTION_MAP
	.Func,(s0100)가상화폐 서버자동주문 호가정보 조회,s0100,headtype=B;
	BEGIN_DATA_MAP
		s0100InBlock,입력,input;
		begin
			USER ID             ,     user_id           ,     user_id              ,  char     , 10;
			설정일자            ,     est_dt            ,     est_dt               ,  char     ,  8;
			조건일련번호        ,     sq                ,     sq                   ,  long     , 10;
			단축코드            ,     symbol            ,     symbol               ,  char     , 15;
			사용자구분          ,     mbr_ccd           ,     mbr_ccd              ,  char     ,  2;
			매체구분            ,     md_cd             ,     md_cd                ,  char     ,  3;
		end
		s0100OutBlock,출력,output;
		begin
			USER ID             ,     user_id           ,     user_id              ,  char     , 10;
			단축코드            ,     symbol            ,     symbol               ,  char     , 15;
			현재가              ,     now_prc           ,     now_prc              ,  double   , 20;
			전일종가            ,     bdy_cls_prc2      ,     bdy_cls_prc2         ,  double   , 20;
			매도호가1           ,     s1_prcd_askprc    ,     s1_prcd_askprc       ,  double   , 20;
			매수호가1           ,     b1_prcd_askprc    ,     b1_prcd_askprc       ,  double   , 20;
			매도호가 잔량1      ,     s1_prcd_askprc_rv ,     s1_prcd_askprc_rv    ,  double   , 20;
			매수호가 잔량1      ,     b1_prcd_askprc_rv ,     b1_prcd_askprc_rv    ,  double   , 20;
			매도호가2           ,     s2_prcd_askprc    ,     s2_prcd_askprc       ,  double   , 20;
			매수호가2           ,     b2_prcd_askprc    ,     b2_prcd_askprc       ,  double   , 20;
			매도호가 잔량2      ,     s2_prcd_askprc_rv ,     s2_prcd_askprc_rv    ,  double   , 20;
			매수호가 잔량2      ,     b2_prcd_askprc_rv ,     b2_prcd_askprc_rv    ,  double   , 20;
			매도호가3           ,     s3_prcd_askprc    ,     s3_prcd_askprc       ,  double   , 20;
			매수호가3           ,     b3_prcd_askprc    ,     b3_prcd_askprc       ,  double   , 20;
			매도호가 잔량3      ,     s3_prcd_askprc_rv ,     s3_prcd_askprc_rv    ,  double   , 20;
			매수호가 잔량3      ,     b3_prcd_askprc_rv ,     b3_prcd_askprc_rv    ,  double   , 20;
			매도호가4           ,     s4_prcd_askprc    ,     s4_prcd_askprc       ,  double   , 20;
			매수호가4           ,     b4_prcd_askprc    ,     b4_prcd_askprc       ,  double   , 20;
			매도호가 잔량4      ,     s4_prcd_askprc_rv ,     s4_prcd_askprc_rv    ,  double   , 20;
			매수호가 잔량4      ,     b4_prcd_askprc_rv ,     b4_prcd_askprc_rv    ,  double   , 20;
			매도호가5           ,     s5_prcd_askprc    ,     s5_prcd_askprc       ,  double   , 20;
			매수호가5           ,     b5_prcd_askprc    ,     b5_prcd_askprc       ,  double   , 20;
			매도호가 잔량5      ,     s5_prcd_askprc_rv ,     s5_prcd_askprc_rv    ,  double   , 20;
			매수호가 잔량5      ,     b5_prcd_askprc_rv ,     b5_prcd_askprc_rv    ,  double   , 20;
			매도호가6           ,     s6_prcd_askprc    ,     s6_prcd_askprc       ,  double   , 20;
			매수호가6           ,     b6_prcd_askprc    ,     b6_prcd_askprc       ,  double   , 20;
			매도호가 잔량6      ,     s6_prcd_askprc_rv ,     s6_prcd_askprc_rv    ,  double   , 20;
			매수호가 잔량6      ,     b6_prcd_askprc_rv ,     b6_prcd_askprc_rv    ,  double   , 20;
			매도호가7           ,     s7_prcd_askprc    ,     s7_prcd_askprc       ,  double   , 20;
			매수호가7           ,     b7_prcd_askprc    ,     b7_prcd_askprc       ,  double   , 20;
			매도호가 잔량7      ,     s7_prcd_askprc_rv ,     s7_prcd_askprc_rv    ,  double   , 20;
			매수호가 잔량7      ,     b7_prcd_askprc_rv ,     b7_prcd_askprc_rv    ,  double   , 20;
			매도호가8           ,     s8_prcd_askprc    ,     s8_prcd_askprc       ,  double   , 20;
			매수호가8           ,     b8_prcd_askprc    ,     b8_prcd_askprc       ,  double   , 20;
			매도호가 잔량8      ,     s8_prcd_askprc_rv ,     s8_prcd_askprc_rv    ,  double   , 20;
			매수호가 잔량8      ,     b8_prcd_askprc_rv ,     b8_prcd_askprc_rv    ,  double   , 20;
			매도호가9           ,     s9_prcd_askprc    ,     s9_prcd_askprc       ,  double   , 20;
			매수호가9           ,     b9_prcd_askprc    ,     b9_prcd_askprc       ,  double   , 20;
			매도호가 잔량9      ,     s9_prcd_askprc_rv ,     s9_prcd_askprc_rv    ,  double   , 20;
			매수호가 잔량9      ,     b9_prcd_askprc_rv ,     b9_prcd_askprc_rv    ,  double   , 20;
			매도호가10          ,     s10_prcd_askprc   ,     s10_prcd_askprc      ,  double   , 20;
			매수호가10          ,     b10_prcd_askprc   ,     b10_prcd_askprc      ,  double   , 20;
			매도호가 잔량10     ,     s10_prcd_askprc_rv,     s10_prcd_askprc_rv   ,  double   , 20;
			매수호가 잔량10     ,     b10_prcd_askprc_rv,     b10_prcd_askprc_rv   ,  double   , 20;
			매체구분            ,     md_cd             ,     md_cd                ,  char     ,  3;
		end
	END_DATA_MAP
END_FUNCTION_MAP
