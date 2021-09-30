const real_OCTA_URL = "https://octadev.kovex.co.kr:8443/PRISM_AML_RBA/view/AML/common/include/KOVXVM/interface/"
const dev_OCTA_URL = "http://211.62.108.1:8082/PRISM_AML_RBA/view/AML/common/include/KOVXVM/interface/"

export function octaWLFcheckGet( inputData ) 
{     
  return new Promise(function(resolve, reject) {  
   
    let scUrl = 
    real_OCTA_URL + "wlf.jsp?"  
    +"CUSTOMER_NO="+inputData.customer_no + "&"  //필수 고객번호
    +"CUSTOMER_DIV="+inputData.customer_div + "&"//필수 고객구분
    +"CUSTOMER_NM="+inputData.customer_nm + "&"//필수 고객명
    +"CUSTOMER_ENG_NM="+inputData.customer_eng_nm + "&" //필수 고객영문명
    +"BIRTH_DD="+inputData.birth_dd + "&" // 출생일자 (개인) / 설립일자 (법인)
    +"COUNTRY_CD="+inputData.country_cd + "&" // 국적
    +"LIVE_COUNTRY_CD="+inputData.live_country_cd + "&" //거주국가
    +"AGENT_YN="+inputData.agent_yn + "&"  //필수 대리인 여부
    +"AGENT_NM="+inputData.agent_nm  + "&"  //대리인 명
    +"AGENT_ENG_NM="+inputData.agent_eng_nm + "&" //대리인 영문명     
    +"AGENT_BIRTH_DD="+inputData.agent_birth_dd + "&" // 대리인 출생일자    
    +"AGENT_COUNTRY_CD="+inputData.agent_country_cd + "&" //대리인 국적     
    +"AGENT_LIVE_COUNTRY_CD="+inputData.agent_live_country_cd + "&" //대리인 거주국가  
    +"CEO_YN="+inputData.ceo_yn + "&" //필수    대표자 여부
    +"CEO_NM="+inputData.ceo_nm + "&"  // 대표자 명
    +"CEO_ENG_NM="+inputData.ceo_eng_nm + "&"  // 대표자 영문명
    +"CEO_BIRTH_DD="+inputData.ceo_birth_dd + "&"   //대표자 출생일자
    +"CEO_COUNTRY_CD="+inputData.ceo_country_cd + "&"  //대표자 국적 
    +"CEO_LIVE_COUNTRY_CD="+inputData.ceo_live_country_cd + "&"  //대표자 거주국가
    +"REAL_OWNR_YN="+inputData.real_ownr_yn + "&" //필수 실소유자 여부
    +"REAL_OWNR_NM="+inputData.real_ownr_nm + "&"// 실소유자 명
    +"REAL_OWNR_ENG_NM="+inputData.real_ownr_eng_nm + "&"//실소유자 영문명
    +"REAL_OWNR_BIRTH_DD="+inputData.real_ownr_birth_dd + "&"// 실소유자 출생일자
    +"REAL_OWNR_COUNTRY_CD="+inputData.real_ownr_country_cd + "&"//실소유자 국적
    +"REAL_OWNR_LIVE_COUNTRY_CD="+inputData.real_ownr_live_country_cd + "&"  //실소유자 거주국가
    +"REQ_USER_ID="+inputData.req_user_id //필수   요청 직원 ID
   
    fetch(scUrl)  
      .then(response => {
          if (!response.ok) {
             reject(response)       
          }
          return response.json();
      })
      .then(data => {
          if(data.SUCCESS_YN == 'Y')
          {
              console.log("SUCCESS_YN:" + data.SUCCESS_YN);                
              resolve(data)           
          }else
          {             
              reject(data) 
                            
          }
      })     
  });
}

export function octaWLFcheckPost( inputData ) 
{     
  return new Promise(function(resolve, reject) {         
     let customerNo1 = inputData.customer_no
     let customerDiv2 = inputData.customer_div
     let customerNm3 = inputData.customer_nm
     let customerEngNm4 = inputData.customer_eng_nm
     let birthDd5 = inputData.birth_dd
     let countryCd6 = inputData.country_cd
     let liveCountryCd7 = inputData.live_country_cd
     let agentYn8 = inputData.agent_yn
     let agentNm9 = inputData.agent_nm
     let agentEngNm10 = inputData.agent_eng_nm
     let agentBirthDd11 = inputData.agent_birth_dd
     let agentCountryCd12 = inputData.agent_country_cd
     let agentLiveCountryCd13 = inputData.agent_live_country_cd
     let ceoYn14 = inputData.ceo_yn
     let ceoNm15 = inputData.ceo_nm
     let ceoEngNm16 = inputData.ceo_eng_nm
     let ceoBirthDd17 = inputData.ceo_birth_dd
     let ceoCountryCd18 = inputData.ceo_country_cd
     let ceoLiveCountryCd19 = inputData.ceo_live_country_cd
     let realOwnrYn20 = inputData.real_ownr_yn
     let realOwnrNm21 = inputData.real_ownr_nm
     let realOwnrEngNm22 = inputData.real_ownr_eng_nm
     let realOwnrBirthDd23 = inputData.real_ownr_birth_dd
     let realOwnrCountryCd24 = inputData.real_ownr_country_cd
     let realOwnrLiveCountryCd25 = inputData.real_ownr_live_country_cd
     let reqUserId26 = inputData.req_user_id
     
     fetch(real_OCTA_URL+ "wlf.jsp", {   
            method: 'POST',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:
              new URLSearchParams({
                    'customer_no': customerNo1.trim(),
                    'customer_div': customerDiv2.trim(),
                    'customer_nm': customerNm3.trim(),
                    'customer_eng_nm': customerEngNm4.trim(),
                    'birth_dd': birthDd5.trim(),
                    'country_cd': countryCd6.trim(),     
                    'live_country_cd': liveCountryCd7.trim(),        
                    'agent_yn': agentYn8.trim(),
                    'agent_nm': agentNm9.trim(),
                    'agent_eng_nm': agentEngNm10.trim(),
                    'agent_birth_dd': agentBirthDd11.trim(),
                    'agent_country_cd': agentCountryCd12.trim(),
                    'agent_live_country_cd': agentLiveCountryCd13.trim(),
                    'ceo_yn': ceoYn14.trim(),
                    'ceo_nm': ceoNm15.trim(),
                    'ceo_eng_nm': ceoEngNm16.trim(),
                    'ceo_birth_dd': ceoBirthDd17.trim(),
                    'ceo_country_cd': ceoCountryCd18.trim(),
                    'ceo_live_country_cd': ceoLiveCountryCd19.trim(),   
                    'real_ownr_yn': realOwnrYn20.trim(),
                    'real_ownr_nm': realOwnrNm21.trim(),
                    'real_ownr_eng_nm': realOwnrEngNm22.trim(),
                    'real_ownr_birth_dd': realOwnrBirthDd23.trim(),
                    'real_ownr_country_cd': realOwnrCountryCd24.trim(),
                    'real_ownr_live_country_cd': realOwnrLiveCountryCd25.trim(),
                    'req_user_id': reqUserId26.trim(),      
                 })
          })
      .then(response => {
          if (!response.ok) {
             reject(response)       
          }
          return response.json();
      })
      .then(data => {
          if(data.SUCCESS_YN == 'Y')
          {
              console.log("CODE:" + data.CODE);  
              console.log("REAL:" + data.REAL);     
              resolve(data)           
          }else
          {             
              reject(data) 
                            
          }
      })     
  });
}

//FDS 조회
export function octaFDScheckGet( inputData ) 
{     
  return new Promise(function(resolve, reject) {  
   
    let scUrl = 
    real_OCTA_URL + "fds.jsp?"  
    +"SYSTEM_DIV="+inputData.system_div + "&"  //시스템 구분  Y
    +"INF_REC_DATE_TIME="+inputData.inf_rec_date_time + "&"//송신일시 Y
    +"CUSTOMER_NO="+inputData.customer_no + "&"//고객_번호 Y
    +"SEND_GBN="+inputData.send_gbn + "&" //전송_구분 Y
    +"INF_REC_TIME="+inputData.inf_rec_time + "&" // 송신_시간 Y
    +"CUSTOMER_DIV="+inputData.customer_div + "&" // 고객_구분 Y
    +"CUSTOMER_NM="+inputData.customer_nm + "&" //고객_명 Y
    +"BIRTH_DD="+inputData.birth_dd + "&"  //출생일자
    +"REV_COIN_WALLET_NO="+inputData.rev_coin_wallet_no  + "&"  //수신_지갑_번호 Y
    +"ACCOUNT_ID="+inputData.account_id + "&" //계정_ID   Y
    +"ACCOUNT_IP_ADDR="+inputData.account_ip_addr + "&" // 계정_IP_주소     Y
    +"ACCOUNT_PHONE_NO="+inputData.account_phone_no + "&" //계정자_휴대폰_번호    
    +"OUT_CNT="+inputData.out_cnt + "&" //출금_횟수  
    +"ACCESS_IP_ADDR="+inputData.access_ip_addr + "&" //접속_IP_주소
    +"REST_COUNTRY_CD="+inputData.rest_country_cd + "&"  // 제재_국가_코드 Y
    +"SEND_COIN_WALLET_NO="+inputData.send_coin_wallet_no + "&"  // 송신_지갑_번호 Y
    +"COIN_KIND_CD="+inputData.coin_kind_cd + "&"   //코인 종류 Y
    +"COIN_NM="+inputData.coin_nm + "&"  //코인_명 Y
    +"DD_WITHDRAWAL_AMT="+inputData.dd_withdrawal_amt + "&"  //당일_출금_금액
    +"DD_DEPOSIT_AMT="+inputData.dd_deposit_amt + "&" //당일_입금_금액
    +"DD_DEPOSIT_ADD_CNT="+inputData.dd_deposit_add_cnt + "&"// 당일_입금자_명
    +"DD_DEPOSIT_LAST_TIME="+inputData.dd_deposit_last_time + "&"//당일_입금_누적_건수
    +"DD_LOGIN_LAST_TIME="+inputData.dd_login_last_time + "&"// 당일_입금_마지막_시간
    +"ACCESS_EQUIP_NM="+inputData.access_equip_nm + "&"//접속_기기_명
    +"CERTIFIED_CHANGE_TIME="+inputData.certified_change_time + "&"  //인증수단변경시간
    +"API_CHANGE_TIME="+inputData.api_change_time //API변경시간
   
    fetch(scUrl)  
      .then(response => {
          if (!response.ok) {
             reject(response)       
          }
          return response.json();
      })
      .then(data => {
        
            //0101: 화이트리스트 지갑주소입니다.
            //0201: 블랙리스트 지갑주소입니다.
            //0202: 블랙리스트 계정입니다.
            //0203: 블랙리스트 접속IP입니다.
            //0301: 첫출금 지갑이 아닙니다.
            //0301: 사고빈도가 높은 코인이 아닙니다.

            //0401: 출금신청금액 기준 원 이상입니다.
            //0402: 출금신청금액이 보유자산의 기준(%)를 초과했습니다.
            //0403: 당일 입금금액이 기준 원 이상 입니다.
            //0404: 당일 입금건수가 기준 건 이하 입니다.
            //0405: 입금후 출금까지 소요시간이 기준 분 이하입니다.
            //0406: 로그인후 출금까지 소요시간이 기준 분 이하 입니다.
            //0407: 가입후 출금까지 기준 일 이하입니다.
            //0501: IP출금신청이력이 기준 회 이하입니다.
            //0502: 접속기기 출금신청이력이 기준 회 이하입니다.
            //0503: 인증수단 변경이 기준 분 이하입니다.
            //0504: API 변경이 기준 시간 이하입니다.

            //0601: 입금자명이 고객명과 일치하지 않습니다.


          if(data.ERROR_YN == 'N')
          {             
              console.log("AUTO_OUT_YN:" + data.AUTO_OUT_YN);  
              console.log("data:" + JSON.stringify(data))
              resolve(data)           
          }else
          {   
              console.log("ERROR_YN:" + data.ERROR_YN);                      
              reject(data) 
                            
          }
      })     
  });
}

