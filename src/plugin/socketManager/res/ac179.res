BEGIN_FUNCTION_MAP
    .Func,(ac179)WLF결과처리,ac179,headtype=A;
    BEGIN_DATA_MAP
        ac179In,입력,input;
        begin
            요청업무구분       , req_bsi_tp  , req_bsi_tp , char  ,  1; // 1.회원가입 2.회원정보편집
            계정ID             , user_id     , user_id    , char  , 10;
            메세지수신성공여부 , success_yn  , success_yn , char  , 1
            에러메세지         , error_msg   , error_msg  , char  , 1000
            응답코드           , rtn_code    , rtn_code   , char  , 10
            응답코드명         , code_msg    , code_msg   , char  , 1000
        end
        ac179Out,출력,output;
        begin
            계정ID             , user_id     , user_id    , char  , 10;
        end
    END_DATA_MAP
END_FUNCTION_MAP
