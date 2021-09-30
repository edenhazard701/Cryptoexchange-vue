const serviceIdData = "d5abd0d9-4dc1-4a0f-84ce-89df21f46a5e"
const REDIRECT_URI = "https://univax.kovex.co.kr/static/browser/mykeepin.html"
const SP_URI =  "https://univax.kovex.co.kr:3011" //"https://211.62.108.1:3011" // SP주소(자체서버주소)

export function myKeepInLogin( inputData ) 
{     
  return new Promise(function(resolve, reject) {

    const scUrl = "https://auth.mykeepin.com/didauth/v1/authorize/view" 

    fetch(scUrl, {   
        method: 'POST',
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:
          new URLSearchParams({
                'serviceId': serviceIdData, //코백스 전용 service_id
                'redirect_uri': REDIRECT_URI, //리다이렉트 될 코벡스페이지
                'state': inputData.stateData,
                'type': '2'
             })
        })
        .then(response => {
            if (!response.ok) {
                reject(response);                
            }
            return response.text(); //json() 에러남
        })
        .then(html => {

            resolve(html)     
        
         })       
  });
}

export function myKeepInVerifyAuthInfo( inputData ) 
{     
  return new Promise(function(resolve, reject) {
  
    const params = {
      service_id : serviceIdData,    //코백스 전용 service_id
      state : inputData.stateData, 
      code : inputData.codeData 
    };
    console.log("params:"+JSON.stringify(params));
 
    const scUrl = "https://auth.mykeepin.com/didauth/v1/verify/"+params.service_id +"/"+params.state +"/"+params.code; 
   
    fetch(scUrl)  
        .then(response => {
            if (!response.ok) {
                reject(response);                
            }
            return response.json();
        })
        .then(data => {
            //did vp, signature 값을 받아옴
            if(data.status == '200' )
            {                 
              resolve(data.data)            
            }else
            {        
              reject(data);     
              console.log(new Error( data.code + ": " + data.message ));   
            }              
  
         })       

  });
}
//https://stackoverflow.com/questions/35325370/how-do-i-post-a-x-www-form-urlencoded-request-using-fetch
export function myNodeServerAuthVerify( inputData )
{ 
  return new Promise(function(resolve, reject) {

        fetch(SP_URI + '/AuthVerify', {      
        method: 'POST',
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:
          new URLSearchParams({
                'serviceId': serviceIdData,
                'did': inputData.didData,
                'state': inputData.stateData,
                'type': inputData.typeData,
                'code': inputData.codeData,
                'signature': inputData.signatureData
             })
      })
      .then(response => { 
          if (!response.ok) {
            reject(response);            
          }
          return response.json();
      })
      .then(data => {                      
            resolve(data)    
      })
      .catch(error => {
          //Here is still promise
          console.log(error);             
      })   
    });     
}

export function myNodeServerAuth( inputData )
{ 
  return new Promise(function(resolve, reject) {
        fetch(SP_URI + '/Auth', {     
        method: 'POST',
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:
          new URLSearchParams({
                'serviceId': serviceIdData,
                'did': inputData.didData,
                'encryptedVp': inputData.vpData
               })
      })
      .then(response => { 
        if (!response.ok) {
          reject(response);        
        }
        return response.json();
      })
      .then(data => {               
            resolve(data)          
      })
      .catch(error => {
          //Here is still promise
          reject(error);         
      })
    });
}
