
const apiKey = "2076ca74-9ef7-42cc-942f-7ee07f2e9030" //테스트용 (운영반영시 변경)
const orgCode = "10000152"
const internetTest = 'https://test-gw-firm.dozn.co.kr' //인터넷망(test)
const internetReal = 'https://file-pub.dozn.co.kr'  //인터넷망(real)
const privateTest = 'https://test-firmapi.dozn.co.kr' //전용회선망(test)
const privateReal = 'https://firmapi.dozn.co.kr'  //전용회선망(real)

// 테스트계좌 :
// 은행코드 / 테스트계좌 / 예금주명
// 004 / 832210312031 / 문세인
// 007 / 113000509251 / (고)하정파범	
// 011 / 36701006302 / 달나라가자	
// 034 / 1107020460139 / 영전용가이가
// 045 / 9002999999028 / 김 일
// 081 / 46291012501007 / 핍랄샐
// 088 / 140012036898 / (나)하완파차
// 090 / 3333030303018 / 함진헌

//예금주 조회
export function doznInquireDepositor( inputData ) 
{     
  return new Promise(function(resolve, reject) {
  
    let params = {
            api_key: apiKey,
            org_code: orgCode,   //이용기관 구분코드
            drw_bank_code : '',  //대표은행코드 - 코벡스가 대표적으로 이용하는 은행이 있을 경우
            telegram_no: inputData.telegramNoData,  //당일 unique 한 거래번호 ,최대 6자
            bank_code : inputData.bankCodeData, //입금하고자 하는 은행코드     
            account : inputData.accountData,   //'-' 하이픈 미포함
            amount:'',    //조회 대상계좌에 대하여 금액체크가 필요한 경우 사용
            check_depositor:'',   //사용: Y , 미사용: N ,미입력시 'N'
            identify_no : ''//self.identify_no	//실명확인여부가 'Y' 인 경우,사용,생년월일(YYMMDD) / 사업자번호 -- 더즌에서 실명확인 지원안함        
    };
    console.log("params:"+JSON.stringify(params)); 
      
      fetch(internetTest + '/api/rt/v1/inquireDepositor', {
        method: 'POST',
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(params)
        
      })
      .then(response => {
          if (!response.ok) {
             reject(response)       
          }
          return response.json();
      })
      .then(data => {
          if(data.status == '200' )
          {                 
            resolve(data)            
          }else
          {        
            reject(data);     
            console.log(new Error( data.error_code + ": " + data.error_message ));   
          }       
      })     
  });
}
//계좌점유인증(해당계좌로 1원 송금)
export function doznAccAuth( inputData ) 
{     
  return new Promise(function(resolve, reject) {
    
      let params = {
        api_key: apiKey,
        org_code: orgCode,   //이용기관 구분코드
        telegram_no : inputData.telegramNoData,//당일 unique 한 거래번호 ,최대 6자
        rv_bank_code : inputData.rvBankCodeData, //입금하고자 하는 은행코드           
        rv_account :  inputData.rvAccountData, //입금하고자 하는 계좌번호'-' 하이픈 미포함   
        rv_account_cntn :inputData.rvAccountCntnData, //랜덤 4자리 한글단어 생성 추후 구현
        amount:'',    //값이 없을 경우 1원 송금 100원 미만 송금만 가능           
      };
      console.log("params:"+JSON.stringify(params));       

      //계좌점유인증API
      fetch(internetTest + '/api/rt/v1/account/auth', {
        method: 'POST',
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(params)
        
      })
      .then(response => {
          if (!response.ok) {
            reject(response)       
          }
          return response.json();
      })
      .then(data => {
          if(data.status == '200' )
          {                 
            resolve(data)            
          }else
          {        
            reject(data);     
            console.log(new Error( data.error_code + ": " + data.error_message ));   
          }         
      })

    });
}


//계좌점유인증 내역조회
export function doznAccAuthInquire( inputData ) 
{     
  return new Promise(function(resolve, reject) {
    
      let params = {
        api_key: apiKey,
        org_code: orgCode,  
        org_telegram_no : inputData.orgTelegramNo,//요청 시 사용한 거래고유번호, 최대 6자
        tr_dt : inputData.trDt, //원거래 요청일자         YYYYMMDD   
        drw_bank_code :  inputData.drwBankCode //원거래 모계좌 은행코드 이용기관이 은행과 직접 계약된 경우 필수.              
      };
      console.log("params:"+JSON.stringify(params));       

      //계좌점유인증내역조회 API
      fetch(internetTest + '/api/rt/v1/account/auth/inquire', {
        method: 'POST',
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(params)
        
      })
      .then(response => {
          if (!response.ok) {
            reject(response)       
          }
          return response.json();
      })
      .then(data => {
          if(data.status == '200' )
          {                 
            resolve(data)            
          }else
          {        
            reject(data);     
            console.log(new Error( data.error_code + ": " + data.error_message ));   
          }         
      })

    });
}


