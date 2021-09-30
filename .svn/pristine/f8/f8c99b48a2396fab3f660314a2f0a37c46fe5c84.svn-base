var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
   NODE_ENV: '"development"',   
   
   // local
   NODE_API: '"https://univax.kovex.co.kr/data/"',
   CRET_URL: '"https://cert.kovex.co.kr/pcc/pcc_kovex_seed.php"',
   IMG_URL: '"https://univax.kovex.co.kr/img/view.php?id="',
   RECAP_URL: '"https://univax.kovex.co.kr/recap.html"',
   BASE_API: '"https://univax.kovex.co.kr:3004/front"',
   SV_CONNECTIONURL: '"wss://univax.kovex.co.kr:4791"',
   RESTFUL_API: '"univax.kovex.co.kr"',
   LIC_CODE: '"375A0B82706A6A937F20"',
   EXCN_URL: '"https://dev.2xchange.co.kr:9443/ASP/api/bank/EX000100"',  
   MYKEEPIN_URL: '"https://auth.mykeepin.com/didauth/v1/authorize/view"', //마이키핀 URL
   MYKEEPIN_SERVICE_ID: '"d5abd0d9-4dc1-4a0f-84ce-89df21f46a5e"',  //마이키핀 코벡스 고유ID
   MYKEEPIN_REDIRECT_URI: '"https://univax.kovex.co.kr/static/browser/mykeepin.html"', //마이키핀 state, code 받아오는 주소 
   
   // dev
   // NODE_API: '"https://dev.kovex.co.kr/data/"',
   // CRET_URL: '"https://dev.kovex.co.kr/pcc/pcc_kovex_seed.php"',
   // IMG_URL: '"https://dev.kovex.co.kr/img/view.php?id="',
   // RECAP_URL: '"https://dev.kovex.co.kr/recap.html"',
   // BASE_API: '"https://dev.kovex.co.kr:3003/api"',
   // SV_CONNECTIONURL: '"wss://dev.kovex.co.kr:4789"',
   // RESTFUL_API: '"dev.kovex.co.kr"',
   // LIC_CODE: '"375A0B82706A6A937F20"',
   // EXCN_URL: '"https://dev.2xchange.co.kr:9443/ASP/api/bank/EX000100"'

   //dev LIC_CODE
   //LIC_CODE: '"4F08628DF063636DEB48"',
   
   //staging
   // NODE_API: '"https://test.kovex.co.kr/data/"',
   // CRET_URL: '"https://cert.kovex.co.kr/pcc/pcc_kovex_seed.php"',
   // IMG_URL: '"https://test.kovex.co.kr/img/view.php?id="',
   // RECAP_URL: '"https://test.kovex.co.kr/recap.html"',
   // BASE_API: '"https://test.kovex.co.kr:3003/api"',
   // SV_CONNECTIONURL: '"wss://test.kovex.co.kr:4789"',
   // RESTFUL_API: '"test.kovex.co.kr"',
   // LIC_CODE: '"B8A9689F8E6565CBC3DE"',
   // EXCN_URL: '"https://www.2xchange.co.kr:9443/ASP/api/bank/EX000100"'
})
