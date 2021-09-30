BEGIN_FUNCTION_MAP
    .Func,(cm802)통화정보조회,cm802,headtype=A;
    BEGIN_DATA_MAP
        cm802In,입력,input;
        begin
            통화코드            , cur_cd            , cur_cd            , char      ,  5;
            요청건수            , req_cnt           , req_cnt           , long      ,  5;
        end
        cm802Out_c,출력공통,output;
        begin
            응답건수            , rsp_cnt           , rsp_cnt           , long      ,  5;
        end
        cm802Out,출력,output,occurs;
        begin
			통화코드				, cur_cd				, cur_cd			, char	,  5;
			통화명한글				, cur_kor_nm			, cur_kor_nm		, char	, 50;
			통화명영문				, cur_eng_nm			, cur_eng_nm		, char	, 50;
			단위명					, cur_unit_nm			, cur_unit_nm		, char	, 30;
			통화표준코드명			, cur_std_nm			, cur_std_nm		, char	, 30;
			소수점자릿수			, dec_digt				, dec_digt			, long	, 10;
			소수점표시자릿수		, dec_disp_digt			, dec_disp_digt		, long	, 10;
			청산수수료소수점자릿수	, lqdt_fee_dec_digt		, lqdt_fee_dec_digt	, long	, 10;
			총소수점자릿수			, tot_dec_digt			, tot_dec_digt		, long	, 10;
			출금소수점자릿수		, oamt_dec_digt			, oamt_dec_digt		, long	, 10;
			화폐구분				, currency_gbn			, currency_gbn		, char	,  1; // 화폐구분 1.가상통화 2.국가통화
			평가단가적용비율		, evlt_prc_aplc_rt		, evlt_prc_aplc_rt	, double, 20;
			네트워크수수료			, fee_amt				, fee_amt			, double, 20;
			컨펌수					, confirm_cnt			, confirm_cnt		, long	, 10;
			상장수량				, list_num				, list_num			, double, 20;
			상장일자				, list_date				, list_date			, char	,  8;
			코인타입				, coin_tp				, coin_tp			, char	,  1; // B:BTC계열 E:ETC/ETH계열 M:개별메인넷계열 R:ERC20계열
			고객출금수수료			, user_fee				, user_fee			, double, 20;
			출금최소수량			, minimum_output_qty	, minimum_output_qty, double, 20;
			최소입금수량			, minimum_input_qty		, minimum_input_qty	, double, 20;			
			최소입금수수료			, minimum_fee			, minimum_fee		, double, 20;
			기준가					, base_amt				, base_amt			, double, 20;
			거래제한구분			, trd_cnst_tp			, trd_cnst_tp		, char	,  1; // 0.정상, 1.전거래정지(미사용), 2.입출금정지, 3.매매정지(미사용), 4.입금정지, 5.출금정지, 6.자산이동정지(미사용)
			전자지갑연계구분		, walt_cnct_tp			, walt_cnct_tp		, char	,  1; // 0.없음 1.입금 2.입출금
			기본정보URL				, info_url				, info_url			, char	,500;
			보조주소구분			, sub_info_tp			, sub_info_tp		, char	,  1; // 0.없음 1.있음 2.ERC : 디폴트 '0'
			보조주소비고			, sub_info_etc			, sub_info_etc		, char	,100;
			거래소구분				, exch_tp				, exch_tp			, char	,  1; // 1.자체 2.통합
			등록일시				, regi_dtm				, regi_dtm			, char	, 14;
			작업사원ID				, wrk_oper_id			, wrk_oper_id		, char	, 10;
			작업일시				, wrk_dtm				, wrk_dtm			, char	, 14;
        end
    END_DATA_MAP
END_FUNCTION_MAP