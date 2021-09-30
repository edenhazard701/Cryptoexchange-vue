BEGIN_FUNCTION_MAP
	.Func,(ac535)이용 동의,ac535,headtype=A;
	BEGIN_DATA_MAP
		ac535In,입력,input;
		begin
			계정ID          , user_id           , user_id           , char  , 10;
            약관종류        , terms_kind        , terms_kind        , char  ,  2;       // 약관종류
		end
		ac535Out,출력,output;
		begin
			계정ID          , user_id           , user_id           , char  , 10;
            약관종류        , terms_kind        , terms_kind        , char  ,  2;       // 약관종류
            이용동의        , use_terms         , use_terms         , char  ,  1;       // 이용동의(1,0)
            이용약관등록일시, terms_reqt_dtm    , terms_reqt_dtm    , char  , 14;       // 이용동의일시
		end
	END_DATA_MAP
END_FUNCTION_MAP
