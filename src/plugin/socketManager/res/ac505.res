BEGIN_FUNCTION_MAP
    .Func,(ac505)공통설정(알림정보) 조회,ac505,headtype=A;
    BEGIN_DATA_MAP
        ac505In,입력,input;
        begin
            계정ID          , user_id       , user_id       , char  , 10;
        end
        ac505Out,출력,output;
        begin
            로그인메일구분  , login_mail_tp , login_mail_tp , char  ,  1;
            로그인SMS구분   , login_sms_tp  , login_sms_tp  , char  ,  1;
            체결메일구분    , cntr_mail_tp  , cntr_mail_tp  , char  ,  1;
            체결SMS구분     , cntr_sms_tp   , cntr_sms_tp   , char  ,  1;
            입출금메일구분  , dpwd_mail_tp  , dpwd_mail_tp  , char  ,  1;
            입출금SMS구분   , dpwd_sms_tp   , dpwd_sms_tp   , char  ,  1;
            이벤트메일구분  , event_mail_tp , event_mail_tp , char  ,  1;
            이벤트SMS구분   , event_sms_tp  , event_sms_tp  , char  ,  1;
            이벤트알림구분  , event_noti_tp , event_noti_tp , char  ,  1;
        end
    END_DATA_MAP
END_FUNCTION_MAP
