BEGIN_FUNCTION_MAP
    .Func,(s1104)가상화폐 자동주문 미체결감시 주문설정 조회,s1104,headtype=B;
    BEGIN_DATA_MAP
        s1104In1,입력,input;
        begin
			유저ID                  		, user_id                   , user_id                   , char	,   10;
			설정일자						, est_dt					, est_dt					, char	,	 8;
			조건일련번호            		, sq                        , sq                        , long	,   10;
			조건설정일시					, cndt_est_dy_tm			, cndt_est_dy_tm			, char	,	16;
        end
        s1104Out1,출력,output;
        begin
			유저ID                  		, user_id                   , user_id                   , char  ,   10;
			설정일자                    	, est_dt                  	, est_dt                  	, char	,    8;
			조건일련번호                	, sq                      	, sq                      	, long	,   10;
			조건설정일시                	, cndt_est_dy_tm          	, cndt_est_dy_tm          	, char	,   16;
			상태변경일시                	, st_upt_dy_tm            	, st_upt_dy_tm            	, char	,   16;
			모조건일련번호              	, mthr_sq                 	, mthr_sq                 	, long	,   10;
			원조건일련번호              	, orgn_sq                 	, orgn_sq                 	, long	,   10;
			시작일자                    	, st_dt                   	, st_dt                   	, char	,    8;
			종료일자                    	, end_dt                  	, end_dt                  	, char	,    8;
			조건설정유형                	, est_typ_cd              	, est_typ_cd              	, char	,    2;
			자동여부                    	, at_mnl_ccd              	, at_mnl_ccd              	, char	,    1;
			연속조건처리FLag            	, ctnu_f                  	, ctnu_f                  	, char	,    1;
			조건상태                    	, hndl_st_vl              	, hndl_st_vl              	, char	,    4;
			조건 삭제 Flag              	, dlt_f                   	, dlt_f                   	, char	,    1;
			사용자구분                  	, mbr_ccd                 	, mbr_ccd                 	, char	,    2;
			IP ADDRESS                  	, ip                      	, ip                      	, char	,   12;
			단말MAC주소                 	, tmnl_mac_addr           	, tmnl_mac_addr           	, char	,   12;
			매체구분                    	, md_cd                   	, md_cd                   	, char	,    3;
			종목명                      	, is_nm                   	, is_nm                   	, char	,   50;
			종목코드                    	, symbol                 	, symbol                 	, char	,   15;
			종목구분                    	, is_ccd                  	, is_ccd                  	, char	,    1;
			주문번호(원조건)          		, ordr_no            		, ordr_no            		, long	,	10;
			주문일련번호              		, ordr_sq            		, ordr_sq               	, long	,	10;
			주문조건구분코드          		, ordr_cnd_dcd       		, ordr_cnd_dcd          	, char	,	 1;
			주문접수가격              		, acpt_prc           		, acpt_prc              	, double, 20.8;
			매매구분                  		, trd_ccd            		, trd_ccd               	, char	,	 1;
			미체결 자동정정대비설정틱 		, at_crct_cmpr_est_vl		, at_crct_cmpr_est_vl   	, int	,	 4;
			미체결 자동정정설정틱     		, at_crct_est_vl     		, at_crct_est_vl        	, int	,	 4;
			미체결 자동정정횟수       		, at_crct_tno        		, at_crct_tno           	, int	,	 4;
			Order Status Flag         		, ordr_hndl_f        		, ordr_hndl_f           	, char	,	 1;
			주문처리상태값            		, ordr_status        		, ordr_status           	, char	,	 4;
        end
    END_DATA_MAP
END_FUNCTION_MAP
