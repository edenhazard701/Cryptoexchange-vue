import Vue from 'vue';
import i18n from '../../lang/index'
import { _ } from 'vue-underscore';

const state = {
  transaction: {                      // 거래내역
    signList                : [],     // 체결내역 목록
    notSignList             : [],     // 미체결내역 목록
    signCancel              : {},     // 주문취소 완료
    orderHistoryList        : [],     // 주문내역(체결 + 미체결 + 취소주문)
    orderHistoryDetailList  : [],     // 주문내역 상세팝업
    watchingList            : [],     // 감시중 내역
    watchSearchOldParam     : {},     // 감시중 검색조건
    watchedList             : [],     // 감시완료 내역
    isOrderWatch            : false,
  },
  master: {
    curCodeList         : []          // 통화코드 목록 (n1002)
  },
  contiKey: null,
  hogaUnit : null,                    // 호가단위
  orderAble : null,                   // 주문 가능 금액/수량
  fee : null,                         // 예상 수수료
  priceLimit : null,                  // 주문가 상하한폭
  nowPrice: null,                     // 현재가, 기준가 조회
  mapMaxLenBelowDigitPerSetlCd : null,// 결제통화코드 소숫점 최대 자릿수
  notifyOrder: [],                    // 주문 체결/거부 알림 토스트 데이터
  watchSearchCoin: '',                // 모바일> 투자내역> 감시내역 > 상세 페이지 > 뒤로가기 버튼 클릭시 검색조건 유지를 위한 저장
  watchSearchValue: '',               // 모바일> 투자내역> 감시내역 > 상세 페이지 > 뒤로가기 버튼 클릭시 검색조건 유지를 위한 저장
};

const getters = {
  signList: state => state.transaction.signList,
  notSignList: state => state.transaction.notSignList,
  orderHistoryList: state => state.transaction.orderHistoryList,
  orderHistoryDetailList: state => state.transaction.orderHistoryDetailList,
  watchingList: state => state.transaction.watchingList,
  watchedList: state => state.transaction.watchedList,
  hogaUnit: state => state.hogaUnit,
  orderAble: state => state.orderAble,
  feeRatio: state => state.fee,
  priceLimit: state => state.priceLimit,
  nowPrice: state => state.nowPrice,
  curCodeList: state => state.master.curCodeList,
  isOrderWatch: state => state.transaction.isOrderWatch,
  notifyOrder: state => state.notifyOrder
};

const actions = {
  /** auth : 이명철
   *  desc : 체결내역조회 전문 (tr523)
   *  거래소 > 일반 > 체결 탭
   *  거래소 > 거래내역 > 체결 탭
   */
  searchSignList: ({commit, rootGetters, state}, payload) => {
      
      if (!rootGetters.getUserId) return;
      
      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('tr523', (queryData)=> {

              // 연속플래그 조회 ( 연속일 경우 추가 / 연속이 아닐 경우 재조회 )
              (payload['contiFlag'] && state.contiKey != null) && queryData.setContiKey(state.contiKey);
              
              // InBlock default set
              //  > user_id       : 로그인한 id
              //  > to_dt, fr_dt  : 오늘 기준 최근 1년
              //  > req_cnt       : 요청건수 30건
              var block = queryData.getBlockData('InBlock1')[0];
              block['user_id']    = rootGetters.getUserId;
              const toDay = new Date();
              payload['to_dt']    = !payload['to_dt'] ? toDay.format('yyyyMMdd') : payload['to_dt'];
              toDay.setDate(toDay.getDate() - 365);
              payload['fr_dt']    = !payload['fr_dt'] ? toDay.format('yyyyMMdd') : payload['fr_dt'];
              payload['req_cnt']  = !payload['req_cnt'] ? 30 : payload['req_cnt'];

              Object.assign(block, payload);
          }, (queryData)=> {
              
              if (queryData == null) {
                  console.log("체결내역 조회 tr523 실패");
                  return;
              }
              
              if (payload['contiFlag'] && state.contiKey != null) {
                  // 체결내역 데이터 추가
                  commit('addSignList', queryData.getBlockData('OutBlock2'));
              } else {
                  // 체결내역 데이터 조회
                  commit('setSignList', queryData.getBlockData('OutBlock2'));
              }

              // ContiKey set
              commit('setContiKey', queryData.getContiKey());
              resolve(queryData);
          });
      });
  },
  /** auth : 이명철
   *  desc : 미체결내역조회 전문 (tr526 -> b0001 변경)
   *      거래소 > 일반 > 미체결 탭
   *      거래소 > 거래내역 > 미체결 탭
   */
  searchNotSignList: ({commit, rootGetters, state}, payload) => {

      if (!rootGetters.getUserId) return;

      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('b0001', (queryData)=> {
              // 연속플래그 조회 ( 연속일 경우 추가 / 연속이 아닐 경우 재조회 )
              (payload['contiFlag'] && state.contiKey != null) && queryData.setContiKey(state.contiKey);
              (payload['contiKey'] && payload['contiKey'] != 'first') && queryData.setContiKey(payload['contiKey'])
              
              // InBlock default set
              //  > user_id       : 로그인한 id
              //  > req_cnt       : 요청건수 30건
              var block = queryData.getBlockData('InBlock1')[0];
              block['user_id']    = rootGetters.getUserId;
              payload['req_cnt']  = !payload['req_cnt'] ? 30 : payload['req_cnt'];
              
              Object.assign(block, payload);
          }, (queryData)=> {
              if (queryData == null) {
                  console.log("미체결내역 조회 b0001 실패")
                  return;
              }

              if (payload['contiKey']) {
                  
                  var resObj = {
                      resArr : queryData.getBlockData('OutBlock2'),
                      contiKey : queryData.getContiKey(),
                      beforeContiKey : payload['contiKey']
                  }
                  resolve(resObj);
              } else {

                  if (payload['contiFlag'] && state.contiKey != null) {
                      // 미체결내역 데이터 추가
                      commit('addNotSignList', queryData.getBlockData('OutBlock2'));
                  } else {
                      // 미체결내역 데이터 조회
                      commit('setNotSignList', queryData.getBlockData('OutBlock2'));
                  }
  
                  // ContiKey set
                  commit('setContiKey', queryData.getContiKey());
                  resolve(queryData);
              }
          });
      });
  },
  /** auth : 이명철
   *  desc : 주문내역조회 전문 (tr521)
   *      거래소 > 거래내역 > 주문내역 탭
   */
  searchOrderHistoryList: ({commit, rootGetters}, payload) => {
      
      if (!rootGetters.getUserId) return;

      return new Promise((resolve, reject) => {
      
          Vue.prototype.$socket.sendProcessByName('tr521', (queryData)=> {
              // 연속플래그 조회 ( 연속일 경우 추가 / 연속이 아닐 경우 재조회 )
              (payload['contiFlag'] && state.contiKey != null) && queryData.setContiKey(state.contiKey);

              // InBlock default set
              //  > user_id       : 로그인한 id
              //  > req_cnt       : 요청건수 25건
              //  > ord_comp_stat : 0(전체)
              var block = queryData.getBlockData('InBlock1')[0];
              block['user_id'] = rootGetters.getUserId;
              payload['req_cnt']  = !payload['req_cnt'] ? 25 : payload['req_cnt'];
              payload['ord_comp_stat'] = !payload['ord_comp_stat'] ? '0' : payload['ord_comp_stat'];
              Object.assign(block, payload);
          }, (queryData)=> {
              if (queryData == null) {
                  console.log("주문내역 조회 tr521 실패")
                  return;
              }

              if (payload['contiFlag'] && state.contiKey != null) {
                  // 주문내역조회 데이터 추가
                  commit('addOrderHistoryList', queryData.getBlockData('OutBlock2'));
              } else {
                  // 주문내역조회 데이터 조회
                  commit('setOrderHistoryList', queryData.getBlockData('OutBlock2'));
              }

              // ContiKey set
              commit('setContiKey', queryData.getContiKey());
              resolve(queryData);
          });
      });
  },
  /** auth : 이명철
   *  desc : 주문내역조회 전문 (tr522)
   *      거래소 > 거래내역 > 주문내역 탭 > 상태클릭 팝업
   */
  searchOrderDetailList: ({commit, rootGetters}, payload) => {
      
      if (!rootGetters.getUserId) return;

      return new Promise((resolve, reject) => {
      
          Vue.prototype.$socket.sendProcessByName('tr522', (queryData)=> {
              // 연속플래그 조회 ( 연속일 경우 추가 / 연속이 아닐 경우 재조회 )
              (payload['contiFlag'] && state.contiKey != null) && queryData.setContiKey(state.contiKey);

              // InBlock default set
              //  > user_id       : 로그인한 id
              //  > req_cnt       : 요청건수 5건
              var block = queryData.getBlockData('InBlock1')[0];
              block['user_id'] = rootGetters.getUserId;
              payload['req_cnt']  = !payload['req_cnt'] ? 5 : payload['req_cnt'];

              Object.assign(block, payload);
          }, (queryData)=> {
              if (!queryData) {
                  reject()
                  console.log("주문내역 상세 팝업 목록조회 tr522 실패")
                  return
              }

              if (payload['contiFlag'] && state.contiKey != null) {
                  // 주문내역 상세팝업 데이터 추가
                  commit('addOrderHistoryDetailList', queryData.getBlockData('OutBlock2'));
              } else {
                  // 주문내역 상세팝업 데이터 조회
                  commit('setOrderHistoryDetailList', queryData.getBlockData('OutBlock2'));
              }
              
              // ContiKey set
              commit('setContiKey', queryData.getContiKey());
              resolve(queryData);
          });
      });

  },
  /** auth : 이명철
   *  desc : 감시내역 전문 (s0055)
   *      거래소 > 일반 > 감시중, 감시완료 탭
   *      거래소 > 거래내역 > 감시내역 탭
   *  memo : 1. 감시주문이 들어올 경우 실시간 감시내역 tr이 없어 감시내역 재조회 처리 ( => payload['isOrderWatch'] 가 true일 경우 )
   *         2. InBlock에 요청건수 필드가 없음 -> 30건으로 픽스되어 조회됨.
   */
  searchWatchList: ({commit, rootGetters}, payload) => {

      if (!rootGetters.getUserId) return;
      
      // 감시주문이 들어올 경우 payload를 watchSearchOldParam로 설정
      if (payload['isOrderWatch']) {

          if (Object.keys(state.transaction.watchSearchOldParam).length !== 0) {
              
              payload = state.transaction.watchSearchOldParam;
          }
      }
      console.log(payload)
      return new Promise((resolve, reject) => {
      
          Vue.prototype.$socket.sendProcessByName('s0055', (queryData)=> {
              
              // 연속플래그 조회 ( 연속일 경우 추가 / 연속이 아닐 경우 재조회 )
              (payload['contiFlag'] && state.contiKey != null) && queryData.setContiKey(state.contiKey);

              // InBlock default set
              //  > user_id       : 로그인한 id
              var block = queryData.getBlockData('InBlock1')[0];
              block['user_id'] = rootGetters.getUserId;

              Object.assign(block, payload);
          }, (queryData)=> {
              if (!queryData) {
                  console.log("감시내역 조회 s0055 실패")
                  return;
              }

              // 데이터 추가요청일 경우
              if (payload['contiFlag'] && state.contiKey != null) {
                  
                  if (payload['hndl_st_vl'] == '1') {
                      // 감시중 데이터 추가
                      commit('addWatchingList', queryData.getBlockData('OutBlock2'));
                  } else {
                      // 감시완료 데이터 추가
                      commit('addWatchedList', queryData.getBlockData('OutBlock2'));
                  }
              // 데이터 조회 요청
              } else {

                  if (payload['hndl_st_vl'] == '1') {
                      // watchSearchOldParam에 현재 검색param set
                      commit('setWatchSearchOldParam', payload);
                      // 감시중 데이터 조회
                      commit('setWatchingList', queryData.getBlockData('OutBlock2'));
                  } else {
                      // 감시완료 데이터 조회
                      commit('setWatchedList', queryData.getBlockData('OutBlock2'));
                  }
              }
              
              // ContiKey set
              commit('setContiKey', queryData.getContiKey());
              resolve(queryData);
          });
      });
  },
  /** auth : 이명철
   *  desc : 감시취소 전문 (s0021 / s0003)
   *      거래소 > 일반 > 감시중
   *      거래소 > 거래내역 > 감시내역 탭
   *  memo : 1. 매수취소 : s0021, 매도취소 : s0003
   *         2. 감시취소 성공시 감시내역 재조회
   */
  reqWatchCancel: ({commit, rootGetters, state}, payload) => {
      // 매수취소, 매도취소에 따른 전문번호 구분
      const trCd = payload['trd_ccd'] == '2' ? 's0021' : 's0003';
      payload['symbol'] = payload['symbol_tmp'];
      
      return new Promise((resolve, reject) => {
          
          Vue.prototype.$socket.sendProcessByName(trCd, (queryData)=> {

              // InBlock default set
              //  > user_id       : 로그인한 id
              var block = queryData.getBlockData('InBlock1')[0];
              block['user_id'] = rootGetters.getUserId;    
              
              Object.assign(block, payload);
          }, (queryData)=> {

              if (queryData != null) {
                  // 감시취소 성공
                  resolve(queryData.getBlockData('OutBlock1')[0]);
              } else {
                  // 감시취소 실패
                  let errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                  if (errorData.trName == 's0021' || errorData.trName == 's0003') reject(errorData);
              }
              // 감시내역 재조회 전문호출
              actions.searchWatchList({commit, rootGetters}, {isOrderWatch: true});
          });
      });
  },
  reqWatchAllCancel: ({commit, rootGetters, state}, param) => {
      
      return new Promise((resolve, reject) => {
          var payload      = {},
              trCd         = '',
              successArr   = [],
              failObjArr   = [],
              cancelCnt    = 0;
          
          for (var idx in param) {
              payload = {
                  est_dt  : param[idx]['est_dt'],
                  symbol  : param[idx]['symbol'],
                  sq      : param[idx]['sq'],
                  trd_ccd : param[idx]['trd_ccd'],
                  mbr_ccd : '01',
                  md_cd   : '',
              };

              // 매수취소, 매도취소에 따른 전문번호 구분
              trCd = payload['trd_ccd'] == '2' ? 's0021' : 's0003';

              Vue.prototype.$socket.sendProcessByName(trCd, (queryData)=> {

                  // InBlock default set
                  //  > user_id       : 로그인한 id
                  var block = queryData.getBlockData('InBlock1')[0];
                  block['user_id'] = rootGetters.getUserId;    
                  
                  Object.assign(block, payload);
              }, (queryData)=> {
  
                  if (queryData != null) {
                      // 감시취소 성공
                      successArr.push(queryData.getBlockData('OutBlock1')[0])
                  } else {
                      // 감시취소 실패
                      let errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                      failObjArr.push(errorData)
                  }

                  if (++cancelCnt == param.length) {

                      const res ={
                          successArr : successArr,
                          failObjArr : failObjArr
                      }
                      resolve(res);
                  }
              });
          }
      });
  },
  /** auth : 이명철
   *  desc : 실시간 주문체결통지 (RB03)
   *      거래소 > 일반 > (미체결, 체결) 탭
   *      거래소 > 거래내역 > (체결내역, 미체결, 주문내역) 탭
   *  memo : 주문체결시 callback -> 미체결, 체결, 주문내역 데이터 재조회 처리.
   */
  orderNotification: ({commit, rootGetters, rootState}, payload) => {
      if (!rootGetters.getUserId) return;

      const user_id = rootGetters.getUserId;
      // Vue.prototype.$socket.unregisterReal('RB03', [user_id], payload['vue_name']);
      Vue.prototype.$socket.registerReal('RB03',  'key_user_id', [user_id], payload['vue_name'], (queryData) => {
          const resObj = queryData.getBlockData('OutBlock1')[0];
          // var evntTp = '';
          // console.log(resObj)
          // if (resObj.evnt_tp == '1') evntTp = '1.주문확인'
          // else if (resObj.evnt_tp == '2') evntTp = '2.주문거부'
          // else if (resObj.evnt_tp == '3') evntTp = '3.정정확인'
          // else if (resObj.evnt_tp == '4') evntTp = '4.취소확인'
          // else if (resObj.evnt_tp == '5') evntTp = '5.자동취소'
          // else if (resObj.evnt_tp == '6') evntTp = '6.체결'
          
          // console.log("------------- 주문 체결 통지 SUCCESS --------------");
          // console.log("------------- 체결 유형 : " + evntTp);
          // console.log("----------- 주문번호       : " + resObj.ord_no);
          // console.log("----------- 매수 / 매도    : ", resObj.buy_sell_tp == '2' ? '매수' : '매도');
          // console.log("----------- 주문수량       : " + resObj.ord_qty);
          // console.log("----------- 체결수량       : " + resObj.cntr_qty);
          // console.log("----------- 전체체결 수량  : " + resObj.tot_cntr_qty);
          // console.log("----------- 잔여수량       : " + resObj.remn_qty);

          if (typeof payload['callback'] == 'function') payload['callback'](resObj); 
      })
  },
  /** auth : 이명철
   *  desc : 주문취소 전문 (tr102)
   *      거래소 > 일반 > 미체결 탭
   *      거래소 > 거래내역 > 미체결 탭
   *  memo : 
   */
  reqSignCancel: ({commit, rootGetters, state}, payload) => {
      
      return new Promise((resolve, reject) => {
          
          Vue.prototype.$socket.sendProcessByName('tr102', (queryData)=> {
              
              // InBlock default set
              //  > user_id       : 로그인한 id
              var block = queryData.getBlockData('InBlock1')[0];
              block['user_id'] = rootGetters.getUserId;
              
              Object.assign(block, payload);
          }, (queryData)=> {

              if (queryData != null) {
                  // 주문취소 성공
                  payload['res'] = queryData.getBlockData('OutBlock1')[0]
                  resolve(payload);
              } else {
                  // 주문취소 실패
                  let errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                  if (errorData.trName == 'tr102') {
                      
                      reject(errorData);
                  }
              }
          });
      });
  },
  reqSignAllCancel({rootGetters, dispatch}, param) {
      
      return new Promise((resolve, reject) => {
          var payload      = {},
              successArr   = [],
              failObjArr   = [],
              cancelCnt    = 0;
          
          for (var idx in param) {
              payload = {
                  org_ord_no: param[idx]['ord_no'],
                  ord_qty: param[idx]['remn_qty'],
                  modi_cncl_tp: '2',
                  part_all_tp: '2',
                  ord_prc: ''
              }
  
              Vue.prototype.$socket.sendProcessByName('tr102', (queryData)=> {
                  // InBlock default set
                  //  > user_id       : 로그인한 id
                  var block = queryData.getBlockData('InBlock1')[0];
                  block['user_id'] = rootGetters.getUserId;

                  Object.assign(block, payload);    
              }, (queryData)=> {
                  
                  if (queryData != null) {
                      // 주문취소 성공
                      successArr.push(payload['org_ord_no'])
                  } else {
                      // 주문취소 실패
                      let errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                      if (errorData.trName == 'tr102') {
                          
                          failObjArr.push({
                              errorData : errorData,
                              ord_no    : payload['org_ord_no']
                          })
                      }
                  }
  
                  if (++cancelCnt == param.length) {
                      const res ={
                          successArr : successArr,
                          failObjArr : failObjArr
                      }
                      resolve(res);
                  }
              });
          }
      });
  },
  getHogaUnit({ rootState, rootGetters, commit }) {       // 호가단위 조회
      Vue.prototype.$socket.sendProcessByName('tr501', (queryData) => {
          var block = queryData.getBlockData('InBlock1')[0];
          block['req_cnt'] = '100';
      }, (queryData) => {
          if(queryData != null) {
              var res = queryData.getBlockData('OutBlock2');
              commit('setHogaUnit', res);
          } else {

          }
      })
  },
  getPriceLimit({ rootState, rootGetters, commit }) {         // 주문가 상하한폭 조회
      if(rootGetters.getUserId === null) {
          return;
      }
      
      Vue.prototype.$socket.sendProcessByName('cm606', (queryData) => {

          var d = new Date();
          var today = d.getFullYear().toString() + ("0" + (d.getMonth() + 1).toString()).slice(-2) + ("0" + d.getDate().toString()).slice(-2);

          var block = queryData.getBlockData('InBlock1')[0];
          block['base_dt'] = today;
          block['symbol'] = rootState.data.currentSymbol;
          block['req_cnt'] = '1';
      }, (queryData) => {
          if(queryData != null) {
              var res = queryData.getBlockData('OutBlock2');
              commit('setPriceLimit', res);
          } else {
              let errorData = window.sessionStorage.getItem('lastErrorData')
              if(errorData !== null ) {
                  errorData = JSON.parse(errorData);
                  if(errorData.trName === 'cm606')
                      console.log(errorData.errMsg);
              }
              return;
          }
      })
  },
  initOrderAble({ rootGetters, commit }) {       // 주문 가능 금액/수량 초기화
      if(rootGetters.getUserId === null) {
          return;
      }
      commit('setOrderAble', null);
  },
  getOrderAble({ rootState, rootGetters, commit }, payload) {       // 주문 가능 금액/수량조회
      if(rootGetters.getUserId === null) {
          return;
      }
      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('tr507', (queryData) => {
              var block = queryData.getBlockData('InBlock1')[0];
              block['user_id'] = rootGetters.getUserId;
              block['symbol'] = rootState.data.currentSymbol;
              block['ord_prc'] = payload !== undefined ? payload['ord_prc'] : '';
              block['ord_prc_tp'] = payload !== undefined ? payload['ord_prc_tp'] : '';
          }, (queryData) => {
              if(queryData != null) {
                  var res = queryData.getBlockData('OutBlock1')[0];
                  commit('setOrderAble', res);
                  if(payload !== undefined) {
                      resolve(res);
                  }
              } else {
                  const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
                  if (errorData.trName == "tr507") {
                      reject(errorData);
                  }
              }
          })
      })
  },
  getNowPrice({ rootState, rootGetters, commit }, payload) {         // 현재가 조회
      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName('i0011', (queryData) => {
              var block = queryData.getBlockData('InBlock1')[0];
              block['symbol'] = rootState.data.currentSymbol;
          }, (queryData) => {
              if(queryData != null) {
                  var res = queryData.getBlockData('OutBlock1')[0];
                  
                  commit('setNowPrice', res);
                  resolve(res);
              } else {
                  let errorData = window.sessionStorage.getItem('lastErrorData')
                  if(errorData !== null ) {
                      errorData = JSON.parse(errorData);
                      if(errorData.trName === 'i0011') {

                          alert(i18n.t('sys_err.'+errorData.errCode));
                      }
                  }
                  return;
              }
          })
      })
  },
  getFee({ rootState, rootGetters, commit }) {         // 예상 수수료 조회
      if(rootGetters.getUserId === null) {
          return;
      }
      
      Vue.prototype.$socket.sendProcessByName('tr503', (queryData) => {
          var block = queryData.getBlockData('InBlock1')[0];
          block['user_id'] = rootGetters.getUserId;
      }, (queryData) => {
          if(queryData != null) {
              var res = queryData.getBlockData('OutBlock1')[0];
              commit('setFee', res);
          } else {
              console.log('수수료율 조회 실패');
              let errorData = window.sessionStorage.getItem('lastErrorData')
              if(errorData !== null ) {
                  errorData = JSON.parse(errorData);
                  if(errorData.trName === 'tr503') {
                      // alert(errorData.errMsg);
                  }
              }
              return;
          }
      })
  },
  coinOrder({ rootState, commit, rootGetters }, orderData) {      // 주문
      var trName;

      // orderData['buy_sell_tp'] // 1:매도 2: 매수
      // orderData['ord_prc_tp']  // 1:시장가 2:지정가 3:스탑지정가 4:스탑시장가 5:트레일링 스탑
      
      if(orderData['ord_prc_tp'] === '1' || orderData['ord_prc_tp'] === '2') {  // 지정가/시장가
          trName = 'tr101';
      } else {
          if(orderData['trd_ccd'] === '1') {          // 스탑 매도
              trName = 's0001';
          } else if(orderData['trd_ccd'] === '2') {   // 스탑 매수
              trName = 's0020';
          }
      }

      return new Promise((resolve, reject) => {
          Vue.prototype.$socket.sendProcessByName(trName, (queryData) => {
              var block = queryData.getBlockData('InBlock1')[0];
              for(var key in orderData) {
                  block[key] = orderData[key];
              }
          }, (queryData) => {
              if(queryData != null) {
                  var res = queryData.getBlockData('OutBlock1')[0];
                  commit('setOrderResult', res);
                  resolve(res);
                  actions.getOrderAble({ rootState, commit, rootGetters });
              } else {
                  let errorData = window.sessionStorage.getItem('lastErrorData')
                  if(errorData !== null ) {
                      errorData = JSON.parse(errorData);
                      if(errorData.trName === trName) {
                          reject(errorData);
                      }
                  }
              }
          })
      })
  },
  orderWatch({ rootState, rootGetters, commit }, payload) {      // 스탑 매매 감시 설정
    var watchTrName;
    
    if(payload.buySell === '2') {           // 매수
      watchTrName = 's0022';
    } else if(payload.buySell === '1') {    // 매도
      watchTrName = 's0005';
    } else {
      return;
    }

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(watchTrName, (queryData) => {
        var block = queryData.getBlockData('InBlock1')[0];
        for(var key in payload.orderResult) {
          block[key] = payload.orderResult[key];
        }
      }, (queryData) => {
        if(queryData != null) {
          resolve(true);
          
          // 18.12.20 감시설정 등록 후 감시중List 데이터 재조회 추가 - 이명철
          // actions.searchWatchList({commit, rootGetters}, {isOrderWatch: true});
          commit('setIsOrderWatch');
        } else {
          console.log('감시 실행 실패');
          let errorData = window.sessionStorage.getItem('lastErrorData')
          if(errorData !== null ) {
            errorData = JSON.parse(errorData);
            if(errorData.trName === watchTrName) {
              reject(errorData);
            }
          }
        }
      })
    })
  },
  fetchCurCodeList: ({commit, rootGetters}) => {
    // 통화 목록 : n1002
    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName('n1002', (queryData)=> {
        var block = queryData.getBlockData('InBlock1')[0];
        block['i_qrydiv'] = '2';    // 전체 정보 : 0, 결제: 1, 대상: 2
      }, (queryData)=> {
        if (!queryData) {
          console.log('n1002 데이터 조회 실패')
          return
        }

        commit('setCurCodeList', queryData.getBlockData('OutBlock2'));
        resolve(queryData);
      });
    });
  }
};

const mutations = {
  setContiKey: (state, contiKey) => {
    state.contiKey = contiKey;
  },
  orderUnshift: (state, obj) => {
    state.transaction[obj.listName] = obj.addObj.concat(state.transaction[obj.listName]);
  },
  orderRemove: (state, obj) => {
    state.transaction[obj.listName].splice(obj.idx, 1)
  },
  orderUpdate: (state, obj) => {
    state.transaction[obj.listName].splice(obj.idx, 1)
    state.transaction[obj.listName].splice(obj.idx, 0, obj.updObj)
  },
  setSignList: (state, signList) => {
    state.transaction.signList = signList;
  },
  addSignList: (state, signList) => {
    state.transaction.signList = state.transaction.signList.concat(signList);
  },
  setNotSignList: (state, notSignList) => {
    state.transaction.notSignList = notSignList;
  },
  addNotSignList: (state, notSignList) => {
    state.transaction.notSignList = state.transaction.notSignList.concat(notSignList);
  },
  setSignCancel: (state, signCancel) => {
    state.transaction.signCancel = signCancel;
  },
  setOrderHistoryList: (state, orderHistoryList) => {
    state.transaction.orderHistoryList = orderHistoryList;
  },
  addOrderHistoryList: (state, orderHistoryList) => {
    state.transaction.orderHistoryList = state.transaction.orderHistoryList.concat(orderHistoryList);
  },
  setOrderHistoryDetailList: (state, orderHistoryDetailList) => {
    state.transaction.orderHistoryDetailList = orderHistoryDetailList;
  },
  addOrderHistoryDetailList: (state, orderHistoryDetailList) => {
    state.transaction.orderHistoryDetailList = state.transaction.orderHistoryDetailList.concat(orderHistoryDetailList);
  },
  setWatchingList: (state, watchingList) => {
    state.transaction.watchingList = watchingList;
  },
  addWatchingList: (state, watchingList) => {
    state.transaction.watchingList = state.transaction.watchingList.concat(watchingList);
  },
  setWatchSearchOldParam: (state, watchSearchOldParam) => {
    state.transaction.watchSearchOldParam = watchSearchOldParam;
  },
  setWatchedList: (state, watchedList) => {
    state.transaction.watchedList = watchedList;
  },
  addWatchedList: (state, watchedList) => {
    state.transaction.watchedList = state.transaction.watchedList.concat(watchedList);
  },
  setHogaUnit: (state, data) => {
    state.mapMaxLenBelowDigitPerSetlCd = {};
    state.hogaUnit = null;

    for(var key in data) {					
      data[key].prc_LenBelowDigit = NumberUtil.getLenBelowDigit(data[key].prc_unit);
      if((state.mapMaxLenBelowDigitPerSetlCd[data[key].setl_cur_cd] == undefined) || (state.mapMaxLenBelowDigitPerSetlCd[data[key].setl_cur_cd] < data[key].prc_LenBelowDigit))
        state.mapMaxLenBelowDigitPerSetlCd[data[key].setl_cur_cd] = data[key].prc_LenBelowDigit;
    }
    
    state.hogaUnit = data;
  },
  setOrderAble: (state, data) => {
    state.orderAble = data;
  },
  setFee: (state, data) => {
    state.fee = data;
  },
  setPriceLimit: (state, data) => {
    state.priceLimit = data;
  },
  setCurCodeList: (state, data) => {
    state.master.curCodeList = data;
  },
  setNowPrice: (state, data) => {
    state.nowPrice = data;
  },
  setOrderResult: (state, data) => {
      
  },
  setIsOrderWatch: (state) => {
    state.transaction.isOrderWatch = !state.transaction.isOrderWatch
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
