BEGIN_FUNCTION_MAP
   .Func,(ss011)스마트시그널_전문가선택_목록,ss011,headtype=B;
   BEGIN_DATA_MAP
      ss011In1,입력,input;
      begin
         계정ID,               usr_id,          usr_id,            char,   10;
         전문가_등록_번호,         expt_rgst_no,       expt_rgst_no,       char,    20; 
         조회구분   ,         next_gb,          next_gb,          char,    1; 
         다음조회키   ,          next_key,          next_key,          char,    20;
      end
      ss011Out1,출력,output;
      begin
         조희결과,            rslt_cls,         rslt_cls,         char,   1;
         결과메시지,            rslt_msg,         rslt_msg,         char,   100;
         다음조회키   ,          next_key,          next_key,          char,    20;
         결과갯수,              out_cnt,            out_cnt,           char,    4;
      end
      ss011Out2,출력,output,occurs;
      begin
         전문가_등록_번호,         expt_rgst_no,       expt_rgst_no,       char,    20; 
         전문가_이름 ,             expt_nm,            expt_nm,            char,    20;
         전문가_닉네임,            expt_nnm,           expt_nnm,           char,    40;
         전문가_한줄_소개,         expt_sinl_intr,     expt_sinl_intr,     char,    50;
         전문가_한줄_전략,         expt_sinl_strtg,    expt_sinl_strtg,    char,    50;
         URL            ,      expt_url,         expt_url,         char,   100;
         구독상태여부,         stt_cls_gb,         stt_cls_gb,         char,    1;
      end
   END_DATA_MAP
END_FUNCTION_MAP