var LIC_CODE = '';
var DOMAIN = '';
var CERT_DOMAIN = '';
var MTS_CERT_DOMAIN = '';
var BASE_API_IP = '';
var SV_CONNECTIONURL = '';
var RESTFUL_API = '';
var EXCN_URL = '';

if (process.argv[2] === 'dev') {
  LIC_CODE = '"4F08628DF063636DEB48"';
  DOMAIN = 'univax.kovex.co.kr';
  CERT_DOMAIN = 'univax.kovex.co.kr';
  BASE_API_IP = 'univax.kovex.co.kr:3004/front"';
  SV_CONNECTIONURL = '"wss://univax.kovex.co.kr:4791"';
  RESTFUL_API = '"univax.kovex.co.kr"';
  EXCN_URL = '"https://dev.2xchange.co.kr:9443/ASP/api/bank/EX000100"';
} else if (process.argv[2] === 'real') {
  LIC_CODE = '"B8A9689F8E6565CBC3DE"';
  DOMAIN = 'www.kovex.co.kr';
  CERT_DOMAIN = 'www.kovex.co.kr';
  BASE_API_IP = 'www.kovex.co.kr';
  SV_CONNECTIONURL = '"wss://www.kovex.co.kr:4791"';
  RESTFUL_API = '"www.kovex.co.kr"';
  EXCN_URL = '"https://www.2xchange.co.kr:9443/ASP/api/bank/EX000100"';
} else if (process.argv[2] === 'mobile') {
  LIC_CODE = '"B8A9689F8E6565CBC3DE"';
  DOMAIN = 'sm.kovex.co.kr';
  CERT_DOMAIN = 'cert.kovex.co.kr';
  BASE_API_IP = 'sm.kovex.co.kr';
  SV_CONNECTIONURL = '"wss://sm.kovex.co.kr:4791"';
  RESTFUL_API = '"sm.kovex.co.kr"';
  EXCN_URL = '"https://www.2xchange.co.kr:9443/ASP/api/bank/EX000100"';
}

console.log("LIC_CODE         : ", LIC_CODE);
console.log("DOMAIN           : ", DOMAIN);
console.log("CERT_DOMAIN      : ", CERT_DOMAIN);
console.log("MTS_CERT_DOMAIN  : ", MTS_CERT_DOMAIN);
console.log("SV_CONNECTIONURL : ", SV_CONNECTIONURL);
console.log("RESTFUL_API      : ", RESTFUL_API);
console.log("BASE_API_IP      : ", BASE_API_IP);

module.exports = {
  NODE_ENV: '"production"',
  UNITCODE: '"00001"',

  BASE_API: '"//'+ DOMAIN +':3004/front"',
  NODE_API: '"//'+ DOMAIN +'/data/"',
  CRET_URL: '"//'+ CERT_DOMAIN +'/pcc/pcc_kovex_seed.php"',
  MTS_CRET_URL: '"https://'+ CERT_DOMAIN +'/pcc/pcc_kovex_mts_seed.php"',
  IMG_URL: '"//'+ DOMAIN +'/img/view.php?id="',
  RECAP_URL: '"//'+ DOMAIN +'/recap.html"',
  LIC_CODE: LIC_CODE,
  SV_CONNECTIONURL: SV_CONNECTIONURL,
  RESTFUL_API: RESTFUL_API,
  EXCN_URL: EXCN_URL
  
  // BASE_API: '"//'+ DOMAIN +':3004/front"',
  // NODE_API: '"/data"',
  // CRET_URL: '"/pcc/pcc_kovex_seed.php"',
  // MTS_CRET_URL: '"https://'+ CERT_DOMAIN +'/pcc/pcc_kovex_mts_seed.php"',
  // IMG_URL: '"/img/view.php?id="',
  // RECAP_URL: '"/recap.html"',
  // LIC_CODE: LIC_CODE,
  // SV_CONNECTIONURL: SV_CONNECTIONURL,
  // RESTFUL_API: RESTFUL_API,
  // EXCN_URL: EXCN_URL
};
