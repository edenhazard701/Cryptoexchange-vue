import request from '@/api/requestNode'

//const apiBaseUrl = process.env.NODE_API;

export function afterLogin(data) {
  return request({
    url: 'https://univax.kovex.co.kr/data/afterLogin.php',
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data
  })
}

export function destroySession(data) {
  return request({
    url: 'https://univax.kovex.co.kr/data/destroySession.php',
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data
  })  
}

export function checkSession(data) {
  return request({
    url: 'https://univax.kovex.co.kr/data/checkSession.php',
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data
  })
}

export function updateSession(data) {
  return request({
    url: 'https://univax.kovex.co.kr/data/updateSession.php',
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data
  })
}

// export function afterLogin(data) {  
//   return $.when($.ajax({
//     url: apiBaseUrl + 'afterLogin.php',
//     type: 'post',    
//     xhrFields: { withCredentials: true },
//     data : JSON.stringify(data)
//   }));
// }

// export function destroySession(data) {  
//   return $.when($.ajax({
//     url: apiBaseUrl + 'destroySession.php',
//     type: 'post',    
//     xhrFields: { withCredentials: true },    
//     data : JSON.stringify(data)
//   }));
// }

// export function checkSession(data) {  
//   return $.when($.ajax({
//     url: apiBaseUrl + 'checkSession.php',
//     type: 'post',    
//     xhrFields: { withCredentials: true },    
//     data : JSON.stringify(data)
//   }));
// }