BEGIN_FUNCTION_MAP
    .Func,(ac194)계정로그인처리,ac194,headtype=A;
    BEGIN_DATA_MAP
        ac194In,입력,input;
        begin
            계정ID         , user_id      , user_id       , char  , 10;
            인증휴대폰번호 , auth_mobl_no , auth_mobl_no  , char  , 11; // 로그인 인증번호
        end
        ac194Out,출력,output;
        begin
            계정ID               , user_id        , user_id        , char , 10;
            기존휴대폰번호       , db_mobl_no     , db_mobl_no     , char , 11; // 원장에있는번호
            휴대폰갱신여부       , auth_mobl_yn   , auth_mobl_yn   , char ,  1; // Y.갱신필요 N.갱신불필요
            고객확인잔여일수     , user_day_cnt   , user_day_cnt   , long , 10;
            세션ID               , sesn_id        , sesn_id        , char , 50;
            자동로그인키값       , auto_key       , auto_key       , char , 72;
            자동감시주문약관동의 , auto_ord_terms , auto_ord_terms , char ,  1; // 0.미동의1.동의
        end
    END_DATA_MAP
END_FUNCTION_MAP
