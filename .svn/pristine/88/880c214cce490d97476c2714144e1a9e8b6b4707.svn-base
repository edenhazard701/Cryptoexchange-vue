BEGIN_FUNCTION_MAP
    .Func,(ac110)고객영문명거주구분등록,ac110,headtype=A;
    BEGIN_DATA_MAP
        ac110In,입력,input;
        begin
            계정ID        , user_id        , user_id         , char  , 10;
            영문이름      , user_eng_nm    , user_eng_nm     , char  , 50;
            영문성        , user_eng_surnm , user_eng_surnm  , char  , 20;
            국내거주여부  , dmst_liv_tp    , dmst_liv_tp     , char  ,  2; // 01국내 : 02국외
        end
        ac110Out,출력,output;
        begin
            DUMMY         , dummy          , dummy           , char  ,  1;
        end
    END_DATA_MAP
END_FUNCTION_MAP
