BEGIN_FUNCTION_MAP
	.Func,(s1101)가상화폐 서버자동주문 조건설정 관리정보 조회,s1101,headtype=B;
	BEGIN_DATA_MAP
		s1101In1,입력,input;
		begin
			유저ID                  , user_id                   , user_id                    , char ,   10;
			조회일자FROM            , from_dt                   , from_dt                    , char ,    8;
			조회일자TO              , end_dt                    , end_dt                     , char ,    8;
			조건설정유형            , est_typ_cd                , est_typ_cd                 , char ,    2;
			조건일련번호            , sq                        , sq                         , long ,   10;
			조건상태                , hndl_st_vl                , hndl_st_vl                 , long ,    4;
			조회건수                , count                     , count                      , char ,    5;
		end
		s1101Out1,출력,output;
		begin
			조회건수                , count                     , count                      , char ,    5;
		end
		s1101Out2,출력,output,occurs;
		begin
			조회구분                , inq_info_ccd              , inq_info_ccd               , char ,    2;
			유저ID                  , user_id                   , user_id                    , char ,   10;
			상태변경일시            , st_upt_dy_tm              , st_upt_dy_tm               , char ,   16;
			설정일자                , est_dt                    , est_dt                     , char ,    8;
			조건일련번호            , sq                        , sq                         , long ,   10;
			모조건일련번호          , mthr_sq                   , mthr_sq                    , long ,   10;
			원조건일련번호          , orgn_sq                   , orgn_sq                    , long ,   10;
			조건설정유형            , est_typ_cd                , est_typ_cd                 , char ,    2;
			조건상태                , hndl_st_vl                , hndl_st_vl                 , long ,    4;
			조건설정일시            , cndt_est_dy_tm            , cndt_est_dy_tm             , char ,   16;
		end
	END_DATA_MAP
END_FUNCTION_MAP
