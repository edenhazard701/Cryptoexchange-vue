BEGIN_FUNCTION_MAP
    .Func,(s1108)가상화폐 자동주문 잔고 복구처리,s1108,headtype=B;
    BEGIN_DATA_MAP
        s1108In1,입력,input;
        begin
			유저ID        , user_id   , user_id   , char , 10;
        end
        s1108Out1,출력,output;
        begin
			처리결과구분  , rslt_clsf , rslt_clsf , char , 4;
        end
    END_DATA_MAP
END_FUNCTION_MAP
