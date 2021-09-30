import i18n from "./lang/index";

// PC버전
const Main = () => import(/* webpackChunkName: "main" */ './views/Main.vue');

const Exchange = () => import(/* webpackChunkName: "exchange" */ './views/Exchange.vue');
const FullExchange = () => import(/* webpackChunkName: "exchange" */ './views/FullExchange.vue');
const FullScreenChart = () => import(/* webpackChunkName: "exchange" */ './views/FullScreenChart.vue');
const TradeHistory = () => import(/* webpackChunkName: "exchange" */ './views/exchanges/TradeHistory.vue');
const SignHistory = () => import(/* webpackChunkName: "exchange" */ './views/exchanges/SignHistory.vue');
const NotSign = () => import(/* webpackChunkName: "exchange" */ './views/exchanges/NotSign.vue');
const OrderHistory = () => import(/* webpackChunkName: "exchange" */ './views/exchanges/OrderHistory.vue');
const WatchHistory = () => import(/* webpackChunkName: "exchange" */ './views/exchanges/WatchHistory.vue');
const StockHistory = () => import(/* webpackChunkName: "exchange" */ './views/exchanges/StockHistory.vue');

const Asset = () => import(/* webpackChunkName: "asset" */ './views/Asset.vue');
const AssetProfit = () => import(/* webpackChunkName: "asset" */ './views/asset/AssetProfit.vue');
const AssetStatus = () => import(/* webpackChunkName: "asset" */ './views/asset/AssetStatus.vue');

const Bank = () => import(/* webpackChunkName: "bank" */ './views/Bank.vue');
const DepositWithdraw = () => import(/* webpackChunkName: "bank" */ './views/bank/DepositWithdraw.vue');
const BankHistory = () => import(/* webpackChunkName: "bank" */ './views/bank/BankHistory.vue');

const MyPage = () => import(/* webpackChunkName: "mypage" */ './views/MyPage.vue');
const MyPageInfo = () => import(/* webpackChunkName: "mypage" */ './views/mypage/MyInfo.vue');
const MyInfoChangeCertifi = () => import(/* webpackChunkName: "mEtc" */ './views/mypage/MyInfoChangeCertifi.vue');
const MyPhonenumChange = () => import(/* webpackChunkName: "mEtc" */ './views/mypage/MyPhoneNumChange.vue');
const MyCustomerConfirm = () => import(/* webpackChunkName: "etc" */ './views/mypage/MyCustomerConfirm.vue');
const MyPageSecurity = () => import(/* webpackChunkName: "mypage" */ './views/mypage/MySecurity.vue');
const MyPageLog = () => import(/* webpackChunkName: "mypage" */ './views/mypage/MyLog.vue');
const MyPageOpenAPI = () => import(/* webpackChunkName: "mypage" */ './views/mypage/MyOpenAPI.vue');
const MyPageRestAPI = () => import(/* webpackChunkName: "mypage" */ './views/mypage/MyRestAPI.vue');
const MyPagePreference = () => import(/* webpackChunkName: "mypage" */ './views/mypage/MyPreference.vue');
const MyRestriction = () => import(/* webpackChunkName: "mypage" */ './views/mypage/MyRestriction.vue');

const Customers = () => import(/* webpackChunkName: "customers" */ './views/Customers.vue');
const Notice = () => import(/* webpackChunkName: "customers" */ './views/customers/Notice.vue');
const NoticeDetail = () => import(/* webpackChunkName: "customers" */ './views/customers/NoticeDetail.vue');
const News = () => import(/* webpackChunkName: "customers" */ './views/customers/News.vue');
const NewsDetail = () => import(/* webpackChunkName: "customers" */ './views/customers/NewsDetail.vue');
const HowToUse = () => import(/* webpackChunkName: "customers" */ './views/customers/HowToUse.vue');
const Qna = () => import(/* webpackChunkName: "customers" */ './views/customers/QnA.vue');
const QnaDetail = () => import(/* webpackChunkName: "customers" */ './views/customers/QnaDetail.vue');
const QnaWrite = () => import(/* webpackChunkName: "customers" */ './views/customers/QnaWrite.vue');
const FAQ = () => import(/* webpackChunkName: "customers" */ './views/customers/FAQ.vue');
const Policy = () => import(/* webpackChunkName: "customers" */ './views/customers/Policy.vue');

const Login = () => import(/* webpackChunkName: "etc" */ './views/member/Login.vue');
const Registration = () => import(/* webpackChunkName: "etc" */ './views/member/Registration.vue');
const Registered = () => import(/* webpackChunkName: "etc" */ './views/member/Registered.vue');
const Unregistration = () => import(/* webpackChunkName: "etc" */ './views/member/Unregistration.vue');
const MobileVerification = () => import(/* webpackChunkName: "etc" */ './views/member/MobileVerification.vue');
const NewPassword = () => import(/* webpackChunkName: "etc" */ './views/member/NewPassword.vue');
const SecurityIntro = () => import(/* webpackChunkName: "etc" */ './views/member/notInUse/SecurityIntro.vue');
const NewGoogleOTP = () => import(/* webpackChunkName: "etc" */ './views/member/notInUse/NewGoogleOTP.vue');
const NewSecurePIN = () => import(/* webpackChunkName: "etc" */ './views/member/notInUse/NewSecurePIN.vue');
const GoogleOTP = () => import(/* webpackChunkName: "etc" */ './views/member/notInUse/GoogleOTP.vue');
const SecurePIN = () => import(/* webpackChunkName: "etc" */ './views/member/notInUse/SecurePIN.vue');
const BankAccount = () => import(/* webpackChunkName: "etc" */ './views/member/BankAccount.vue');
const AccountFind = () => import(/* webpackChunkName: "etc" */ './views/member/AccountFind.vue');
const PasswordFind = () => import(/* webpackChunkName: "etc" */ './views/member/PasswordFind.vue');
const PasswordChange = () => import(/* webpackChunkName: "etc" */ './views/member/PasswordChange.vue');
const CertifyOk = () => import(/* webpackChunkName: "etc" */ './views/member/CertifyOk.vue');
const CertifyErrorTime = () => import(/* webpackChunkName: "etc" */ './views/member/CertifyErrorTime.vue');
const CertifyErrorEmail = () => import(/* webpackChunkName: "etc" */ './views/member/CertifyErrorEmail.vue');
const NotFound = () => import(/* webpackChunkName: "etc" */ './views/404.vue');
const ServerChecking = () => import(/* webpackChunkName: "etc" */ './views/ServerChecking.vue');
const BrowserChecking = () => import(/* webpackChunkName: "etc" */ './views/BrowserChecking.vue');
const ServerError = () => import(/* webpackChunkName: "etc" */ './views/ServerError.vue');
const SafetyProgram = () => import(/* webpackChunkName: "etc" */ './views/SafetyProgram.vue');
const SecurityProgram = () => import(/* webpackChunkName: "etc" */ './views/SecurityProgram.vue');

const Notification = () => import(/* webpackChunkName: "notification" */ './views/Notification.vue');
const NotificationSetting = () => import(/* webpackChunkName: "notification" */ './views/notification/NotiSetting.vue');
const NotificationHistory = () => import(/* webpackChunkName: "notification" */ './views/notification/NotiHistory.vue');

//거래소코인 메뉴 삭제
// const KovexCoinIntroduce = () => import(/* webpackChunkName: "kovexcoin" */ './views/kovexcoin/KovexCoinIntroduce.vue');
// const KovexCoinMiningDividend = () => import(/* webpackChunkName: "kovexcoin" */ './views/kovexcoin/KovexCoinMiningDividend.vue');
// const KovexCoinSituation = () => import(/* webpackChunkName: "kovexcoin" */ './views/kovexcoin/KovexCoinSituation.vue');

//스마트투자 메뉴 삭제 (스크리너 제외)
// const Tdi = () => import(/* webpackChunkName: "smartinvest" */ './views/smartinvest/Tdi.vue');
// const TdiIntroduce = () => import(/* webpackChunkName: "smartinvest" */ './views/smartinvest/TdiIntroduce.vue');
// const TdiList = () => import(/* webpackChunkName: "smartinvest" */ './views/smartinvest/TdiList.vue');
// const TdiHistory = () => import(/* webpackChunkName: "smartinvest" */ './views/smartinvest/TdiHistory.vue');
// const TdiCoinDetail = () => import(/* webpackChunkName: "smartinvest" */ './views/smartinvest/TdiCoinDetail.vue');
// const SmartSignal = () => import(/* webpackChunkName: "smartinvest" */ './views/smartinvest/SmartSignal.vue');
// const SignalInfo = () => import(/* webpackChunkName: "smartinvest" */ './views/smartinvest/SignalInfo.vue');
// const SignalSpecialist = () => import(/* webpackChunkName: "smartinvest" */ './views/smartinvest/SignalSpecialist.vue');
// const SpecialDetail = () => import(/* webpackChunkName: "smartinvest" */ './views/smartinvest/SpecialDetail.vue');
// const SignalRequest = () => import(/* webpackChunkName: "smartinvest" */ './views/smartinvest/SignalRequest.vue');
// const SignalNotice = () => import(/* webpackChunkName: "smartinvest" */ './views/smartinvest/SignalNotice.vue');
// const SignalNoticeDetail = () => import(/* webpackChunkName: "smartinvest" */ './views/smartinvest/SignalNoticeDetail.vue');
const Screener = () => import(/* webpackChunkName: "smartinvest" */ './views/smartinvest/Screener.vue');

// Mobile버전
const MMain = () => import(/* webpackChunkName: "mMain" */ './views/mobile/Main.vue');

const MExchange = () => import(/* webpackChunkName: "mExchange" */ './views/mobile/Exchange.vue');
const MOrder = () => import(/* webpackChunkName: "mExchange" */ './views/mobile/order/Order.vue');
const MTrade = () => import(/* webpackChunkName: "mExchange" */ './views/mobile/order/Trade.vue');
const MNotConcluded = () => import(/* webpackChunkName: "mExchange" */ './views/mobile/order/NotConcluded.vue');
const MStockPrice = () => import(/* webpackChunkName: "mExchange" */ './views/mobile/order/StockPrice.vue');
const MRealTime = () => import(/* webpackChunkName: "mExchange" */ './views/mobile/order/RealTime.vue');
const MChart = () => import(/* webpackChunkName: "mExchange" */ './views/mobile/order/Chart.vue');

const MNotification = () => import(/* webpackChunkName: "mNotification" */ './views/mobile/exchanges/notification/Notification.vue');
const MNotificationSettingDetail = () => import(/* webpackChunkName: "mNotification" */ './views/mobile/exchanges/notification/NotiSettingDetail.vue');

const MInvestment = () => import(/* webpackChunkName: "mInvestment" */ './views/mobile/Investment.vue');
const MInvestWatchview = () => import(/* webpackChunkName: "mInvestment" */ './views/mobile/exchanges/InvestWatchView.vue');
const MInvestFinishhview = () => import(/* webpackChunkName: "mInvestment" */ './views/mobile/exchanges/InvestFinishView.vue');

//스마트투자 메뉴 삭제 (스크리너 제외)
// const MSmartInvest = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/SmartInvest.vue');
// const MSmartSignal = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/smart/SmartSignal.vue');
// const MSmartSignalIntro = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/smart/signal/SmartSignalIntro.vue');
// const MSmartSignalExpert = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/smart/signal/SmartSignalExpert.vue');
// const MSmartSignalExperts = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/smart/signal/SmartSignalExperts.vue');
// const MSmartSignalHistory = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/smart/signal/SmartSignalHistory.vue');
// const MSmartSignalNotice = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/smart/signal/SmartSignalNotice.vue');
// const MSmartSignalNotices = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/smart/signal/SmartSignalNotices.vue');
// const MAppInfo = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/AppInfo.vue');
const MSmartScreener = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/smart/SmartScreener.vue');
const MSmartScreenerResult = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/smart/screener/SmartScreenerResult.vue');
// const MSmartTdi = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/smart/SmartTdi.vue');
// const MTdiCoinDetail = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/smart/tdi/TdiCoinDetail.vue');
// const MTdiIntroduce = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/smart/tdi/TdiIntroduce.vue');
// const MTdiHistoryList = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/smart/tdi/TdiHistoryList.vue');
// const MTdiJoin = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/smart/tdi/TdiJoin.vue');
// const MSmartCoin = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/smart/SmartCoin.vue');
// const MSmartCoinIntro = () => import(/* webpackChunkName: "mSmartInvest" */ './views/mobile/smart/coin/SmartCoinIntro.vue');

const MBank = () => import(/* webpackChunkName: "mBank" */ './views/mobile/Bank.vue');
const MBankHistory = () => import(/* webpackChunkName: "mBank" */ './views/mobile/bank/BankHistory.vue');
const MBankTransaction = () => import(/* webpackChunkName: "mBank" */ './views/mobile/bank/BankTransaction.vue');

const MMyPage = () => import(/* webpackChunkName: "mMypage" */ './views/mobile/MyPage.vue');
const MFAQ = () => import(/* webpackChunkName: "mMypage" */ './views/mobile/mypage/FAQ.vue');
const MMyLog = () => import(/* webpackChunkName: "mMypage" */ './views/mobile/mypage/MyLog.vue');
const MyPreference = () => import(/* webpackChunkName: "mMypage" */ './views/mobile/mypage/MyPreference.vue');
const MMyInfo = () => import(/* webpackChunkName: "mMypage" */ './views/mobile/mypage/MyInfo.vue');
const MInfoChangeCertifi = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/mypage/InfoChangeCertifi.vue');
const MPhoneNumChange = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/mypage/PhoneNumChange.vue');
const MCustomerConfirm = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/mypage/CustomerConfirm.vue');
const MMySecurity = () => import(/* webpackChunkName: "mMypage" */ './views/mobile/mypage/MySecurity.vue');
const MPolicy = () => import(/* webpackChunkName: "mMypage" */ './views/mobile/mypage/Policy.vue');
const MQnA = () => import(/* webpackChunkName: "mMypage" */ './views/mobile/mypage/QnA.vue');
const MHowToUse = () => import(/* webpackChunkName: "mMypage" */ './views/mobile/mypage/HowToUse.vue');
const MQnaDetail = () => import(/* webpackChunkName: "mMypage" */ './views/mobile/mypage/QnaDetail.vue');
const MQnaWrite = () => import(/* webpackChunkName: "mMypage" */ './views/mobile/mypage/QnaWrite.vue');
const MNotice = () => import(/* webpackChunkName: "mMypage" */ './views/mobile/mypage/Notice.vue');
const MNoticeDetail = () => import(/* webpackChunkName: "mMypage" */ './views/mobile/mypage/NoticeDetail.vue');
const MNews = () => import(/* webpackChunkName: "mMypage" */ './views/mobile/mypage/News.vue');
const MNewsDetail = () => import(/* webpackChunkName: "mMypage" */ './views/mobile/mypage/NewsDetail.vue');

const MLogin = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/Login.vue');
const MGuideToKovexApp = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/registration/GuideToKovexApp.vue');
const MRegiIntro = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/registration/RegiIntro.vue');
const MTermAgree = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/registration/TermAgree.vue');
const MMyKeepInIntro = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/registration/MyKeepInCertIntro.vue');
const MAppInstallGuide = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/registration/AppInstallGuide.vue');
const MMobileIdConfirmed = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/registration/MobileIdConfirmed.vue');
const MRegiComplete = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/registration/RegiComplete.vue');
const MRegiRefused = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/registration/RegiRefused.vue');
const MRegiFail = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/registration/RegiFail.vue');
const MAccCreateIntro = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/accCreate/AccCreateIntro.vue');
const MAccCreateResume = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/accCreate/AccCreateResume.vue');
const MBranchSelect = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/accCreate/BranchSelect.vue');
const MIdSubmit = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/accCreate/IdSubmit.vue');
const MAccIdConfirmed = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/accCreate/AccIdConfirmed.vue');
const MCustomerInfo = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/accCreate/CustomerInfo.vue');
const MResidenceInfo = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/accCreate/ResidenceInfo.vue');
const MJobInfo = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/accCreate/JobInfo.vue');
const MJobAddrInfo = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/accCreate/JobAddrInfo.vue');
const MInvestInfo = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/accCreate/InvestInfo.vue');
const MOneWonVerifi1 = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/accCreate/OneWonVerifi1.vue');
const MOneWonVerifi2 = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/accCreate/OneWonVerifi2.vue');
const MOneWonVerifiComplete = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/accCreate/OneWonVerifiComplete.vue');
const MOneWonVerifiPostponed = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/newRegiPages/accCreate/OneWonVerifiPostponed.vue');

const MRegistration = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/Registration.vue');
const MRegistered = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/Registered.vue');
const MCertifyOk = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/CertifyOk.vue');
const MCertifyErrorEmail = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/CertifyErrorEmail.vue');
const MCertifyErrorTime = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/CertifyErrorTime.vue');
const MMobileVerification = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/MobileVerification.vue');
const MNewPassword = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/NewPassword.vue');
const MSecurityIntro = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/notInUse/SecurityIntro.vue');
const MNewGoogleOTP = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/notInUse/NewGoogleOTP.vue');
const MNewSecurePIN = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/notInUse/NewSecurePIN.vue');
const MGoogleOTP = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/notInUse/GoogleOTP.vue');
const MSecurePIN = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/notInUse/SecurePIN.vue');
const MBankAccount = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/BankAccount.vue');
const MAccountFind = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/AccountFind.vue');
const MPasswordFind = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/PasswordFind.vue');
const MPasswordChange = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/PasswordChange.vue');
const MUnregistration = () => import(/* webpackChunkName: "mEtc" */ './views/mobile/member/Unregistration.vue');


import MobileDetect from 'mobile-detect';
import { store } from "./vuex/store";
import Vue from 'vue';

const onlyAuthUser = (to, from, next) => {
  let isLogin = store.getters.isLoggedIn;
  let isPreLogin = store.getters.getLogin.user_id;
  if (isLogin) {
    next();
  } else {        
    if(to.query.plan != undefined && to.query.plan == 'preLogin' && isPreLogin) {
      next();
    } else {
      Vue.prototype.$alert(i18n.t('exchange.a017'), '', {
        confirmButtonText: i18n.t('login.h005'),
        callback: function() {
          next('/login');
        }
      });
    }
  }
}

const loginPageAuthChk = (to, from, next) => {
  let isLogin = store.getters.isLoggedIn;
  if (isLogin) {
    next('/');
  } else {
    if (to.name == "login") {
      store.commit("setBeforePageUrl", from.fullPath);
    }
    next();
  }
}

let routes = [];
let md = new MobileDetect(window.navigator.userAgent);
if(!md.phone()) {
  routes = [
    {
      path: '/',
      component: Main,
      name: 'main',
      hidden: true
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: loginPageAuthChk,
      name: 'login',
      hidden: true
    },
    {
      path: '/registration',
      component: Registration,
      name: 'registration',
      hidden: true
    },
    {
      path: '/registered',
      component: Registered,
      name: 'registered',
      hidden: true
    },
    {
      path: '/mobileverification',
      component: MobileVerification,
      name: 'mobileVerification',
      hidden: true
    },
    {
      path: '/newpassword',
      component: NewPassword,
      name: 'newPassword',
      hidden: true
    },
    {
      path: '/securityintro',
      component: SecurityIntro,
      name: 'securityIntro',
      hidden: true
    },
    {
      path: '/newgoogleotp',
      component: NewGoogleOTP,
      name: 'newGoogleOTP',
      hidden: true
    },
    {
      path: '/newsecurepin',
      component: NewSecurePIN,
      name: 'newSecurePIN',
      hidden: true
    },
    {
      path: '/googleotp',
      component: GoogleOTP,
      name: 'googleOTP',
      beforeEnter: loginPageAuthChk,
      hidden: true
    },
    {
      path: '/securepin',
      component: SecurePIN,
      beforeEnter: loginPageAuthChk,
      name: 'securePIN',
      hidden: true
    },
    {
      path: '/accountfind',
      component: AccountFind,
      name: 'accountFind',
      hidden: true
    },
    {
      path: '/passwordfind',
      component: PasswordFind,
      name: 'passwordFind',
      hidden: true
    },
    {
      path: '/asset',
      component: Asset,
      name: 'asset',
      hidden: true,
      beforeEnter: onlyAuthUser,
      children: [
        {
          path: 'profit',
          component: AssetProfit,
          name: 'assetProfit',
          beforeEnter: onlyAuthUser,
          hidden: true
        },
        {
          path: 'status',
          component: AssetStatus,
          name: 'assetStatus',
          beforeEnter: onlyAuthUser,
          hidden: true
        }
      ]
    },
    {
      path: '/bank',
      component: Bank,
      name: 'bank',
      beforeEnter: onlyAuthUser,
      hidden: true,
      children: [
        {
          path: 'depositwithdraw',
          component: DepositWithdraw,
          name: 'depositWithdraw',
          beforeEnter: onlyAuthUser,
          hidden: true
        },
        {
          path: 'history',
          component: BankHistory,
          name: 'bankHistory',
          beforeEnter: onlyAuthUser,
          hidden: true
        }
      ]
    },
    // {
    //   path: '/introduce',
    //   component: KovexCoinIntroduce,
    //   name: 'kovexcoinintroduce',
    //   hidden: true
    // },
    // {
    //   path: '/miningdividend',
    //   component: KovexCoinMiningDividend,
    //   beforeEnter: onlyAuthUser,
    //   name: 'kovexcoinminingdividend',
    //   hidden: true
    // },
    // {
    //   path: '/situation',
    //   component: KovexCoinSituation,
    //   name: 'kovexcoinsituation',
    //   hidden: true
    // },
    {
      path: '/customers',
      component: Customers,
      name: 'customers',
      hidden: true,
      children: [
        {
          path: 'notice',
          component: Notice,
          name: 'csNotice',
          hidden: true,
        },
        {
          path: 'noticedetail',
          component: NoticeDetail,
          name: 'pcNoticeDetail',
          hidden: true,
          props: true
        },
        {
          path: 'news',
          component: News,
          name: 'csNews',
          hidden: true,
        },
        {
          path: 'newsdetail',
          component: NewsDetail,
          name: 'pcNewsDetail',
          hidden: true,
          props: true
        },
        {
          path: 'howtouse',
          component: HowToUse,
          name: 'csHowtouse',
          hidden: true
        },
        {
          path: 'qna',
          component: Qna,
          name: 'csQna',
          beforeEnter: onlyAuthUser,
          hidden: true
        },
        {
          path: 'write',
          component: QnaWrite,
          name: 'qnaWrite',
          beforeEnter: onlyAuthUser,
          hidden: true
        },
        {
          path: 'detail',
          component: QnaDetail,
          name: 'qnaDetail',
          hidden: true,
          beforeEnter: onlyAuthUser,
          props: true
        },
        {
          path: 'faq',
          component: FAQ,
          name: 'csFaq',
          hidden: true
        },
        {
          path: 'policy',
          component: Policy,
          name: 'csPolicy',
          hidden: true
        }
      ]
    },
    {
      path: '/notification',
      component: Notification,
      name: 'notification',
      hidden: true,
      children: [
        {
          path: 'setting',
          component: NotificationSetting,
          name: 'notificationSetting',
          hidden: true
        },
        {
          path: 'history',
          component: NotificationHistory,
          name: 'notificationHistory',
          hidden: true
        }
      ]
    },
    {
      path: '/mypage',
      component: MyPage,
      name: 'mypage',
      beforeEnter: onlyAuthUser,
      hidden: true,
      children: [
        {
          path: 'myinfo',
          component: MyPageInfo,
          name: 'mypageInfo',
          beforeEnter: onlyAuthUser,
          hidden: true
        },
        {
          path: 'myinfochangecertifi',
          component: MyInfoChangeCertifi,
          name: 'myinfochangecertifi',
          beforeEnter: onlyAuthUser,
          hidden: true
        },
        {
          path: '/passwordchange',
          component: PasswordChange,
          name: 'passwordChange',
          beforeEnter: onlyAuthUser,
          hidden: true
        },
        {
          path: '/unregistration',
          component: Unregistration,
          name: 'unregistration',
          beforeEnter: onlyAuthUser,
          hidden: true
        },
        {
          path: 'mysecurity',
          component: MyPageSecurity,
          name: 'mypageSecurity',
          beforeEnter: onlyAuthUser,
          hidden: true
        },
        {
          path: '/bankaccount',
          component: BankAccount,
          name: 'bankAccount',
          beforeEnter: onlyAuthUser,
          hidden: true
        },
        {
          path: 'mylog',
          component: MyPageLog,
          name: 'mypageLog',
          beforeEnter: onlyAuthUser,
          hidden: true
        },
        {
          path: 'myopenapi',
          component: MyPageOpenAPI,
          name: 'mypageOpenApi',
          beforeEnter: onlyAuthUser,
          hidden: true
        },
        {
          path: 'myrestapi',
          component: MyPageRestAPI,
          name: 'mypageRestApi',
          beforeEnter: onlyAuthUser,
          hidden: true
        },
        {
          path: 'mypreference',
          component: MyPagePreference,
          name: 'mypagePreference',
          beforeEnter: onlyAuthUser,
          hidden: true
        },
        {
          path: 'myrestriction',
          component: MyRestriction,
          name: 'mypageRestriction',
          beforeEnter: onlyAuthUser,
          hidden: true
        },
        {
          path: 'mycustomerconfirm',
          component: MyCustomerConfirm,
          name: 'mypageCustomerconfirm',
          beforeEnter: onlyAuthUser,
          hidden: true
        },
        {
          path: 'myphonenumchange',
          component: MyPhonenumChange,
          name: 'mypagephonenumchange',
          beforeEnter: onlyAuthUser,
          hidden: true
        }       
      ]
    },
    {
      path: '/404',
      component: NotFound,
      name: '404',
      hidden: true
    },
    {
      path: '/serverchecking',
      component: ServerChecking,
      name: 'serverChecking',
      hidden: true
    },
    {
      path: '/BrowserChecking',
      component: BrowserChecking,
      name: 'browserChecking',
      hidden: true
    },
    {
      path: '/wait',
      component: ServerError,
      name: 'wait',
      hidden: true
    },
    {
      path: '/certifyok',
      component: CertifyOk,
      name: 'certifyOk',
      hidden: true
    },
    {
      path: '/certifyerroremail',
      component: CertifyErrorEmail,
      name: 'certifyErrorEmail',
      hiddne: true
    },
    {
      path: '/certifyerrortime',
      component: CertifyErrorTime,
      name: 'certifyErrorTime',
      hiddne: true
    },
    {
      path: '/safetyprogram',
      component: SafetyProgram,
      name: 'safetyProgram',
      hidden: true
    },
    {
      path: '/securityprogram',
      component: SecurityProgram,
      name: 'securityProgram',
      hidden: true
    },
    {
      path: '/fullscreenchart',
      component: FullScreenChart,
      name: 'fullscreenchart'
    },
    {
      path: '/exchange',
      component: Exchange,
      name: 'exchange'
    },
    {
      path: '/fullexchange',
      component: FullExchange,
      name: 'fullexchange',
      props: true
    },
    {
      path: '/trade',
      component: TradeHistory,
      name: 'tradeHistory',
      beforeEnter: onlyAuthUser,
      hidden: true,
      children: [
        {
          path: 'sign',
          component: SignHistory,
          name: 'signHistory',
          hidden: true
        },
        {
          path: 'notsign',
          component: NotSign,
          name: 'notSign',
          hidden: true
        },
        {
          path: 'order',
          component: OrderHistory,
          name: 'orderHistory',
          hidden: true
        },
        {
          path: 'watch',
          component: WatchHistory,
          name: 'watchHistory',
          hidden: true
        },
        {
          path: 'stock',
          component: StockHistory,
          name: 'stockHistory',
          hidden: true
        }
      ]
    },
    // {
    //   path: '/tdi',
    //   component: Tdi,
    //   name: 'tdi',
    //   hidden: true,
    //   children: [
    //     {
    //       path: 'tdilist',
    //       component: TdiList,
    //       name: 'tdiList',
    //       hidden: true
    //     },
    //     {
    //       path: 'tdihistory',
    //       component: TdiHistory,
    //       name: 'tdiHistory',
    //       hidden: true
    //     }
    //   ]
    // },
    // {
    //   path: '/tdiIntroduce',
    //   component: TdiIntroduce,
    //   name: 'tdiIntroduce',
    //   hidden: true
    // },
    // {
    //   path: '/tdicoin',
    //   component: TdiCoinDetail,
    //   name: 'tdicoin',
    //   hidden: true
    // },
    // {
    //   path: '/smartsignal',
    //   component: SmartSignal,
    //   name: 'smartSignal',
    //   hidden: true,
    //   children: [
    //     {
    //       path: 'info',
    //       component: SignalInfo,
    //       name: 'signalInfo',
    //       hidden: true
    //     },
    //     {
    //       path: 'specialist',
    //       component: SignalSpecialist,
    //       name: 'signalSpecialist',
    //       hidden: true,
    //     },
    //     {
    //       path: 'expert',
    //       component: SpecialDetail,
    //       name: 'specialDetail',
    //       hidden: true
    //     },
    //     {
    //       path: 'request',
    //       component: SignalRequest,
    //       name: 'signalRequest',
    //       beforeEnter: onlyAuthUser,
    //       hidden: true
    //     },
    //     {
    //       path: 'notice',
    //       component: SignalNotice,
    //       name: 'signalNotice',
    //       hidden: true,
    //     },
    //     {
    //       path: 'detail',
    //       component: SignalNoticeDetail,
    //       name: 'signalNoticeDetail',
    //       hidden: true
    //     }
    //   ]
    // },
    // {
    //   path: '/KMcheck',
    //   component: KMcheck,
    //   name: 'KMcheck',
    //   hidden: true
    // },
    {
      path: '/screener',
      component: Screener,
      name: 'screener',
      hidden: true
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/serverchecking' }
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/browserchecking' }
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/wait' }
    }
  ];
} else {
  routes = [
    {
      path: '/404',
      component: NotFound,
      name: '404',
      hidden: true
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    },
    {
      path: '/serverchecking',
      component: ServerChecking,
      name: 'serverChecking',
      hidden: true
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/serverchecking' }
    },
    {
      path: '/browserchecking',
      component: BrowserChecking,
      name: 'browserChecking',
      hidden: true
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/browserchecking' }
    },
    {
      path: '/wait',
      component: ServerError,
      name: 'serverError',
      hidden: true
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/wait' }
    },
    {
      path: '/',
      component: afc.isDevice ? MExchange : MMain,
      name: 'mMain',
      hidden: true,
    },
    {
      path: '/m',
      component: MMain,
      name: 'mobile',
      hidden: true
    },
    {
      path: '/login',
      component: MLogin,
      name: 'mLogin',
      hidden: true
    },
    // --회원가입--------
    {
      path: '/guidetokovexapp',
      component: MGuideToKovexApp,
      name: 'mGuideToKovexApp',
      hidden: true
    },
    {
      path: '/mykeepinintro',
      component: MMyKeepInIntro,
      name: 'mMyKeepInIntro',
      hidden: true,
    },
    {
      path: '/regiintro',
      component: MRegiIntro,
      name: 'mRegiIntro',
      hidden: true,   
    },
    {
      path: '/termagree',
      component: MTermAgree,
      name: 'mTermAgree',
      hidden: true,   
    },
    {
      path: '/appinstallguide',
      component: MAppInstallGuide,
      name: 'mAppInstallGuide',
      hidden: true
    },
    {
      path: '/mobileidconfirmed',
      component: MMobileIdConfirmed,
      name: 'mMobileIdConfirmed',
      hidden: true,
    },    
    {
      path: '/regicomplete',
      component: MRegiComplete,
      name: 'mRegiComplete',
      hidden: true
    },
    {
      path: '/regirefused',
      component: MRegiRefused,
      name: 'mRegiRefused',
      hidden: true
    },
    {
      path: '/regifail',
      component: MRegiFail,
      name: 'mRegiFail',
      hidden: true
    },
    
    // --계좌만들기--------   
    {
      path: '/acccreateintro',
      component: MAccCreateIntro,
      name: 'mAccCreateIntro',
    //  beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/acccreateresume',
      component: MAccCreateResume,
      name: 'mAccCreateResume',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/branchselect',
      component: MBranchSelect,
      name: 'mBranchSelect',
    //  beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/idsubmit',
      component: MIdSubmit,
      name: 'mIdSubmit',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/accidconfirmed',
      component: MAccIdConfirmed,
      name: 'mAccIdconfirmed',
      beforeEnter: onlyAuthUser,
      hidden: true,
    },    
    {
      path: '/customerinfo',
      component: MCustomerInfo,
      name: 'mCustomerInfo',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/residenceinfo',
      component: MResidenceInfo,
      name: 'mResidenceInfo',
      beforeEnter: onlyAuthUser,
      hidden: true
    },    
    {
      path: '/jobinfo',
      component: MJobInfo,
      name: 'mJobInfo',
      beforeEnter: onlyAuthUser,
      hidden: true
    },  
    {
      path: '/jobAddrinfo',
      component: MJobAddrInfo,
      name: 'mJobAddrInfo',
      beforeEnter: onlyAuthUser,
      hidden: true
    },  
    {
      path: '/investinfo',
      component: MInvestInfo,
      name: 'mInvestInfo',
      beforeEnter: onlyAuthUser,
      hidden: true
    }, 
    {
      path: '/oneWonverifi1',
      component: MOneWonVerifi1,
      name: 'mOneWonVerifi1',
    //  beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/oneWonverifi2',
      component: MOneWonVerifi2,
      name: 'mOneWonVerifi2',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/oneWonverifiComplete',
      component: MOneWonVerifiComplete,
      name: 'mOneWonVerifiComplete',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/onewonverifipostponed',
      component: MOneWonVerifiPostponed,
      name: 'mOneWonVerifiPostponed',
      beforeEnter: onlyAuthUser,
      hidden: true
    },    
    // ----------
    
    {
      path: '/registration',
      component: MRegistration,
      name: 'mRegistration',
      hidden: true
    },
    {
      path: '/registered',
      component: MRegistered,
      name: 'mRegistered',
      hidden: true
    },
    {
      path: '/certifyOk',
      component: MCertifyOk,
      name: 'mCertifyOk',
      hidden: true
    },
    {
      path: '/certifyerroremail',
      component: MCertifyErrorEmail,
      name: 'mCertifyErrorEmail',
      hidden: true
    },
    {
      path: '/certifyerrortime',
      component: MCertifyErrorTime,
      name: 'mCertifyErrorTime',
      hidden: true
    },
    {
      path: '/mobileverification',
      component: MMobileVerification,
      name: 'mMobileVerification',
      hidden: true
    },
    {
      path: '/newpassword',
      component: MNewPassword,
      name: 'mNewPassword',
      hidden: true
    },
    {
      path: '/securityintro',
      component: MSecurityIntro,
      name: 'mSecurityIntro',
      hidden: true
    },
    {
      path: '/newgoogleotp',
      component: MNewGoogleOTP,
      name: 'mNewGoogleOTP',
      hidden: true
    },
    {
      path: '/newsecurepin',
      component: MNewSecurePIN,
      name: 'mNewSecurePIN',
      hidden: true
    },
    {
      path: '/googleotp',
      component: MGoogleOTP,
      name: 'mGoogleOTP',
      hidden: true
    },
    {
      path: '/securepin',
      component: MSecurePIN,
      name: 'mSecurePIN',
      hidden: true
    },
    {
      path: '/bankaccount',
      component: MBankAccount,
      name: 'mBankAccount',
      hidden: true
    },
    {
      path: '/accountfind',
      component: MAccountFind,
      name: 'mAccountFind',
      hidden: true
    },
    {
      path: '/passwordfind',
      component: MPasswordFind,
      name: 'mPasswordFind',
      hidden: true
    },
    {
      path: '/passwordchange',
      component: MPasswordChange,
      name: 'mPasswordChange',
      hidden: true
    },
    {
      path: '/unregistration',
      component: MUnregistration,
      name: 'mUnregistration',
      hidden: true
    },
    {
      path: '/exchange',
      component: MExchange,
      name: 'mExchange',
      menus: 'noti',
      hidden: true
    },
    {
      path: '/exchange/notification',
      component: MNotification,
      name: 'mNotification',
      hidden: true
    },
    {
      path: '/exchange/setting',
      component: MNotificationSettingDetail,
      name: 'mNotificationSettingDetail',
      hidden: true,
      props: true
    },
    {
      path: '/order',
      component: MOrder,
      name: 'mOrder',
      hidden: true,
      props: true,
      children: [
        {
          path: 'price',
          component: MStockPrice,
          name: 'mStockPrice',
          hidden: true
        },
        {
          path: 'trade',
          component: MTrade,
          name: 'mTrade',
          hidden: true
        },
        {
          path: 'notconcluded',
          component: MNotConcluded,
          name: 'mNotConcluded',
          hidden: true
        },
        {
          path: 'realtime',
          component: MRealTime,
          name: 'mRealTime',
          hidden: true
        },
        {
          path: 'chart',
          component: MChart,
          name: 'mChart',
          hidden: true
        }
      ]
    },
    // {
    //   path: '/smartinvest',
    //   component: MSmartInvest,
    //   name: 'mSmartInvest',
    //   hidden: true
    // },
    // {
    //   path: '/smartsignal',
    //   component: MSmartSignal,
    //   name: 'mSmartSignal',
    //   hidden: true
    // },
    // {
    //   path: '/expert',
    //   component: MSmartSignalExpert,
    //   name: 'mSmartSignalExpert',
    //   props: true
    // },
    // {
    //   path: '/experts',
    //   component: MSmartSignalExperts,
    //   name: 'mSmartSignalExperts',
    //   props: true
    // },
    // {
    //   path: '/smartsignalintro',
    //   component: MSmartSignalIntro,
    //   name: 'mSmartSignalIntro',
    //   props: true
    // },
    // {
    //   path: '/smartsignalhistory',
    //   component: MSmartSignalHistory ,
    //   name: 'mSmartSignalHistory',
    //   props: true
    // },
    // {
    //   path: '/smartsignalnotices',
    //   component: MSmartSignalNotices,
    //   name: 'mSmartSignalNotices',
    //   props: true,
    // },
    // {
    //   path: '/appinfo',
    //   component: MAppInfo,
    //   name: 'mAppInfo',
    //   props: true,
    // },
    // {
    //   path: '/smartsignalnotice',
    //   component: MSmartSignalNotice,
    //   name: 'mSmartSignalNotice',
    //   props: true
    // },
    {
      path: '/screener',
      component: MSmartScreener,
      name: 'mSmartScreener',
      hidden: true
    },
    {
      path: '/screenerresult',
      component: MSmartScreenerResult,
      name: 'mSmartScreenerResult',
      props: true
    },
    // {
    //   path: '/tdi',
    //   component: MSmartTdi,
    //   name: 'mSmartTdi',
    //   hidden: true
    // },
    // {
    //   path: '/tdiintroduce',
    //   component: MTdiIntroduce,
    //   name: 'mTdiIntroduce',
    //   hidden: true
    // },
    // {
    //   path: '/tdicoin',
    //   component: MTdiCoinDetail,
    //   name: 'mTdiCoinDetail',
    //   hidden: true
    // },
    // {
    //   path: '/tdihistory',
    //   component: MTdiHistoryList,
    //   name: 'mTdiHistory',
    //   hidden: true
    // },
    // {
    //   path: '/tdijoin',
    //   component: MTdiJoin,
    //   name: 'mTdiJoin',
    //   hidden: true,
    //   props: true
    // },
    // {
    //   path: '/coin',
    //   component: MSmartCoin,
    //   name: 'mSmartCoin',
    //   hidden: true
    // },
    // {
    //   path: '/coinintro',
    //   component: MSmartCoinIntro,
    //   name: 'mSmartCoinIntro'
    // },
    {
      path: '/investment',
      component: MInvestment,
      name: 'mInvestment',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/watchview',
      component: MInvestWatchview,
      name: 'mInvestWatchview',
      hidden: true
    },
    {
      path: '/finishview',
      component: MInvestFinishhview,
      name: 'mInvestFinishhview',
      hidden: true
    },
    {
      path: '/bank',
      component: MBank,
      name: 'mBank',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/bank/history',
      component: MBankHistory,
      name: 'mBankHistory',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/bank/transaction',
      component: MBankTransaction,
      name: 'mBankTransaction',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/mypage',
      component: MMyPage,
      name: 'mMyPage',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/security',
      component: MyPageSecurity,
      name: 'mMypageSecurity',
      hidden: true
    },
    {
      path: '/faq',
      component: MFAQ,
      name: 'mFaq',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/mylog',
      component: MMyLog,
      name: 'mMyLog',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/mypreference',
      component: MyPreference,
      name: 'mMyPreference',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/mysecurity',
      component: MMySecurity,
      name: 'mMySecurity',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/policy',
      component: MPolicy,
      name: 'mCsPolicy',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/qna',
      component: MQnA,
      name: 'mQna',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/qnadetail',
      component: MQnaDetail,
      name: 'mQnaDetail',
      hidden: true,
      beforeEnter: onlyAuthUser,
      props: true
    },
    {
      path: '/qnawrite',
      component: MQnaWrite,
      name: 'mQnaWrite',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/howtouse',
      component: MHowToUse,
      name: 'mHowToUse',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    
    {
      path: '/notice',
      component: MNotice,
      name: 'mNotice',
      beforeEnter: onlyAuthUser,
      hidden: true
    },
    {
      path: '/noticedetail',
      component: MNoticeDetail,
      name: 'mNoticeDetail',
      beforeEnter: onlyAuthUser,
      props: true,
      hidden: true,
    },
    {
      path: '/news',
      component: MNews,
      beforeEnter: onlyAuthUser,
      name: 'mNews',
      hidden: true
    },
    {
      path: '/newsdetail',
      component: MNewsDetail,
      name: 'mNewsDetail',
      beforeEnter: onlyAuthUser,
      props: true,
      hidden: true,
    },
    {
      path: '/myinfo',
      component: MMyInfo,
      name: 'mMyInfo',
      beforeEnter: onlyAuthUser,
      props: true,
      hidden: true,
    },

    {
      path: '/phonenumchange',
      component: MPhoneNumChange,
      name: 'mPhoneNumChange',
      hidden: true
    },
    {
      path: '/customerconfirm',
      component: MCustomerConfirm,
      name: 'mCustomerConfirm',
      hidden: true
    },   
    {
      path: '/infochangecertifi',
      component: MInfoChangeCertifi,
      name: 'mInfoChangeCertifi',
      hidden: true
    }
  ];
}

export default routes
