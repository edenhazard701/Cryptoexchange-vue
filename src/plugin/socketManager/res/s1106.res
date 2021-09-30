BEGIN_FUNCTION_MAP
    .Func,(s1106)가상화폐 자동주문 잔고 체크,s1106,headtype=B;
    BEGIN_DATA_MAP
        s1106In1,입력,input;
        begin
			dummy , dummy    , dummy   , char  ,  1;
        end 
        s1106Out1,출력,output;
        begin
			유저ID , user_id , user_id , char  ,  10;
        end
    END_DATA_MAP
END_FUNCTION_MAP
