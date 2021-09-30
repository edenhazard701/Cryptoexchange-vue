BEGIN_FUNCTION_MAP
    .Func,(ac109)가상자산인증서정보등록,ac109,headtype=A;
    BEGIN_DATA_MAP
        ac109In,입력,input;
        begin
            계정ID             , user_id       , user_id       , char  , 10;
			사용자성명         , user_nm       , user_nm       , char  , 40;
			생년월일           , user_brth_day , user_brth_day , char  ,  8;
			성별               , user_gend     , user_gend     , char  ,  1; // 0: 여성, "1": 남성
			실명번호           , id_no         , id_no         , char  , 13;
			발급기관           , auth_ogz_nm   , auth_ogz_nm   , char  , 30;
			신분증발급일자     , auth_gen_dt   , auth_gen_dt   , char  ,  8;
            신분증이미지파일명 , auth_img_id   , auth_img_id   , char  , 30;
        end
        ac109Out,출력,output;
        begin
            계정ID             , user_id       , user_id       , char  , 10;
        end
    END_DATA_MAP
END_FUNCTION_MAP
