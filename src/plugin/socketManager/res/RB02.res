BEGIN_FUNCTION_MAP
    .Push, (RB02)잔고변동, RB02, key=10, keycnt=4000, bufcnt=100, group=1;
    BEGIN_DATA_MAP
    InBlock,입력,input;
    begin
    KEY_계정ID , key_user_id , key_user_id , char, 10;
    end
    OutBlock,출력,output;
    begin
    데이터구분 , dt_div , dt_div , char, 4;
    KEY_계정ID , key_user_id , key_user_id , char, 10;
    TR코드 , tr_code , tr_code , char, 2;
    이벤트구분 , evnt_tp , evnt_tp , char, 1;
    이벤트시간 , evnt_dtm , evnt_dtm , char, 14;
    계정ID , user_id , user_id , char, 10;
    통화코드 , cur_cd , cur_cd , char, 5;
    잔고구분 , act_tp , act_tp , char, 1;
    소수자리수 , cur_dp , cur_dp , char, 2;
    잔액(잔량) , cur_bal , cur_bal , char, 20;
    매입원금 , buy_pamt , buy_pamt , char, 20;
    평균매입가 , avg_buy_prc , avg_buy_prc , char, 20;
    FILLER , filler , filler , char, 55;
    end
    END_DATA_MAP
END_FUNCTION_MAP