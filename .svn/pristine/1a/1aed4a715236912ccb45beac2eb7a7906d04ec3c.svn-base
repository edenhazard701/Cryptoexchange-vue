import { router } from "../../main";
import Vue from "vue";
import { _ } from "vue-underscore";

const state = {
  asset: {
    total: {
      tot_asset: 0, // 총 보유자산
      krw_remn_bal: 0, // 보유 KRW
      tot_evlt_amt: 0, // 총 평가 (보유 암호화폐)
      tot_buy_pamt: 0, // 총 매입
      tot_evlt_pl: 0, // 총 평가손익
      tot_prft_rt: 0 // 수익률
    },
    profitList: [],
    statusList: []
  },
  coinList: [],
  currentCurCd: "",

  //입출금 내정보 조회
  infoUser: {
    auth_mobl_no: null,
    event_noti: null,
    user_mail: null,
    user_nm: null,
    user_pass: null,
    mobl_auth_tp: null,
    secu_auth_tp: null,
    bact_auth_tp: null,
    fail_secu_cont: null
  },
  //관리자 전자지갑연계구분(0.없음, 1.입금, 2.입출금)
  adminWalletState: "0",
  //입출금 :coin 지갑정보
  walletInfo: {
    wallet_Id: "",
    Wallet_SubInfo: "",
    Wallet_UseState: false
  },
  //입출금 :자산내역
  myAssetstatusList: [],
  //입출금 :자산정보
  myAssetstatusInfo: {
    cur_cd: "",
    cur_nm: "",
    cur_bal: 0,
    krw_bal: 0,
    tot_hold_qty: 0,
    krw_hold_bal: 0,
    widr_able_qty: 0,
    krw_able_bal: 0,
    walt_cnct_tp: 0
  },
  //입출금 :실명인증계좌정보
  myAccountData: {
    bank_nm: "", // 은행명
    bank_cd: "", // 은행코드
    acct_no: "", // 계좌번호
    moth_bank_nm: "", // 모계좌은행명
    moth_bank_cd: "", // 모계좌은행코드
    moth_acct_no: "" // 모계좌계좌번호
  },
  //입출금 :출금차단확인
  withdrawBlackStat: "", // '0' : 출금가능
  //입출금 :tab-index
  depositWithdrawTabIndex: "0" //입출금 탭 index : (입금 : '0' , 츨금 : '1' , 입출금내역 : '2')
};

const getters = {
  assetTotal: state => state.asset.total,
  coinList: state => state.coinList,
  assetProfitList: state => state.asset.profitList,
  assetStatusList: state => state.asset.statusList,
  currentCurCd: state => state.currentCurCd,
  getCoinByCd: state => cd => {
    let res = _.findWhere(state.coinList, { cur_cd: cd });
    if(cd == '' || cd == null || cd == undefined || res == undefined) return;
    return res
  },
  getMyCds: state => state.asset.profitList.map(item => item.cur_cd),
  getStatusCds: state => state.asset.statusList.map(item => item.cur_cd),
  getwalletInfo: state => state.walletInfo,
  getMyAssetstatusList: state => state.myAssetstatusList,
  getMyAssetstatusInfo: state => state.myAssetstatusInfo,
  getMyAssetstatusInfoCurCd: state => state.myAssetstatusInfo.cur_cd,
  getMyAccountData: state => state.myAccountData,
  getWithdrawBlackStat: state => state.withdrawBlackStat,
  getDepositWithdrawTabIndex: state => state.depositWithdrawTabIndex,
  getInfoUser: state => state.infoUser,
  getAdminWalletState: state => state.adminWalletState,
};

const mutations = {
  setAssetTotal: (state, data) => {
    state.asset.total = data;
  },
  setCoinList: (state, list) => {
    state.coinList = list;
  },
  setAssetProfitList: (state, profitList) => {
    state.asset.profitList = profitList;
  },
  setAssetStatusList: (state, statusList) => {
    state.asset.statusList = statusList;
  },
  setSelectMyAssetStatusData: (state, statusList) => {
    state.myAssetstatusList = statusList;
  },
  setMyAssetstatusInfo: (state, myAssetInfo) => {
    state.myAssetstatusInfo = myAssetInfo;
  },
  setCurrentCurCd: (state, curCd) => {
    state.currentCurCd = curCd;
  },
  setWalletInfoWalletId: (state, waltId) => {
    state.walletInfo.wallet_Id = waltId;
  },
  setWalletInfoWalletSubInfo: (state, subInfo) => {
    state.walletInfo.Wallet_SubInfo = subInfo;
  },
  setWalletInfoWalletUseState: (state, useState) => {
    state.walletInfo.Wallet_UseState = useState;
  },
  setMyAccountData: (state, myAccountInfo) => {
    state.myAccountData = myAccountInfo;
  },
  setMyAssetstatusInfoCurCd: (state, curCd) => {
    state.myAssetstatusInfo.cur_cd = curCd;
  },
  setWithdrawBlackStat: (state, blackStat) => {
    state.withdrawBlackStat = blackStat;
  },
  setDepositWithdrawTabIndex: (state, tabIndex) => {
    state.depositWithdrawTabIndex = tabIndex;
  },
  setInfoUser: (state, user_id) => {
    state.infoUser = user_id;
  },
  setAdminWalletState: (state, wallstate) => {
    state.adminWalletState = wallstate;
  },
};

const actions = {
  // 자산
  fetchCoinList({ commit, rootGetters }) {
    // 통화정보조회 : ac501

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ac501",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["sear_tp"] = "0";
        },
        queryData => {
          if (!queryData) {
            console.log("[통화정보조회 : ac501] 조회 실패");
            const error = rootGetters.getError("ac501");
            if (error) reject(error);
            return;
          }

          let list = queryData.getBlockData("OutBlock2");
          commit("setCoinList", list);
          resolve(list);
        }
      );
    });
  },
  fetchAssetProfitData({ commit, getters, rootGetters }, param) {
    // 자산 > 투자손익
    // TR   : tr531 -> b0002
    if (!getters.getUserId) return;

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "b0002",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];

          block["user_id"] = getters.getUserId; // 계정 ID
          block["cur_cd"] = null; // 통화 코드 입력 시 해당 코드만 조회
          block["fee_tp"] = param["fee_tp"]; // 수수료포함구분 (0:미포함, 1:포함) (모바일은 포함으로 조회 by 이창원 차장)
        },
        queryData => {
          if (!queryData) {
            console.log("자산-투자손익 데이터 조회 실패");
            const error = rootGetters.getError("b0002");
            if (error) reject(error);
            return;
          }
          let list = queryData.getBlockData("OutBlock2");
          let resList = [];
          let tmpList = [];

          resList = list.filter( o => {

            let tmpArr = rootGetters.getN1001.filter( p => {
              return o.cur_cd == p.o_trgt_cur_cd_n
            })
            return tmpArr.length > 0
          })

          tmpList = list.filter( o => {

            let tmpArr = rootGetters.getN1001.filter( p => {
              return o.cur_cd == p.o_trgt_cur_cd_n
            })
            return tmpArr.length == 0 && o.cur_cd !== 'KRW'
          })

          resList = resList.concat(tmpList)

          commit("setAssetTotal", queryData.getBlockData("OutBlock1")[0]);
          commit("setAssetProfitList", resList);

          resolve(queryData);
        }
      );
    });
  },
  filterAssetProfitList({ commit, getters }, cur_cd) {
    commit(
      "setAssetProfitList",
      getters.assetProfitList.filter(o => o.cur_cd !== cur_cd)
    );
  },
  fetchAssetStatusData({ commit, getters, rootGetters }, holdingOnly) {
    // 자산 > 자산현황
    // TR   : ac529
    if (!getters.getUserId) return;

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ac529",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["user_id"] = getters.getUserId; // 계정 ID
          block["cur_cd"] = null;
          block["remn_tp"] = holdingOnly ? "1" : "%"; // %.전체, 1.보유자산만
          block["req_cnt"] = 100;
        },
        queryData => {
          if (!queryData) {
            console.log("자산-자산현황 데이터 조회 실패");
            const error = rootGetters.getError("ac529");
            if (error) reject(error);
            return;
          }

          let list = queryData.getBlockData("OutBlock2");
          let resList = [];
          let tmpList = [];

          resList = list.filter( o => {

            let tmpArr = rootGetters.getN1001.filter( p => {
              return o.cur_cd == p.o_trgt_cur_cd_n
            })
            return tmpArr.length > 0
          })

          tmpList = list.filter( o => {

            let tmpArr = rootGetters.getN1001.filter( p => {
              return o.cur_cd == p.o_trgt_cur_cd_n
            })
            return tmpArr.length == 0
          })

          resList = resList.concat(tmpList)

          commit("setAssetStatusList", resList);
          resolve(queryData);
        }
      );
    });
  },
  selectMyAssetStatusData({ commit, getters, rootGetters }, payload) {
    // 입출금 > 입출금
    // TR   : dw530 입출금자산조회
    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName("dw530", queryData => {
        var block = queryData.getBlockData("InBlock1")[0];
        block["user_id"] = getters.getUserId; // 계정 ID
        block["sear_tp"] = payload.sear_tp; // 1.보유자산 2.전체 3.보유자산 검색키워드
        block["sear_key"] = payload.sear_key; // 3.검색키워드
      },
      queryData => {
        if (!queryData) {
          const error = rootGetters.getError("dw530");
          if (error) reject(error);
          return;
        }
        commit("setSelectMyAssetStatusData", queryData.getBlockData("OutBlock2"));

        if (queryData.getBlockData("OutBlock2").length > 0) {
          if (getters.getMyAssetstatusInfo === undefined || getters.getMyAssetstatusInfoCurCd === "") {
            commit("setMyAssetstatusInfo", queryData.getBlockData("OutBlock2")[0]);
          } else if (getters.currentCurCd !== "") {
            let findCurCd = _.findWhere(queryData.getBlockData("OutBlock2"), {
              cur_cd: getters.currentCurCd
            });
            commit("setMyAssetstatusInfo", findCurCd);
          } else {
            let findCurCd = _.findWhere(queryData.getBlockData("OutBlock2"), {
              cur_cd: getters.getMyAssetstatusInfoCurCd
            });

            if (findCurCd === undefined) {
              commit("setMyAssetstatusInfo", queryData.getBlockData("OutBlock2")[0]);
            } else {
              commit("setMyAssetstatusInfo", findCurCd);
            }
          }
        }

        resolve(queryData);
      });
    });
  },

  registerAssetNotification({ getters }, param) {
    // 잔고변동 RB02 등록
    if (!getters.getUserId) {
      return;
    }
    if (!param || !param.vue_name || !param.callback) {
      return;
    }

    Vue.prototype.$socket.registerReal(
      "RB02",
      "key_user_id",
      [getters.getUserId],
      param.vue_name,
      queryData => {
        let res = queryData.getBlockData("OutBlock1")[0];
        param.callback(res);
      }
    );
    console.log(JSON.stringify(param) + "RB02 등록 #registerAssetNotification");
  },
  unregisterAssetNotification({ getters }, param) {
    // 잔고변동 RB02 해제
    if (!getters.getUserId) {
      return;
    }
    if (!param || !param.vue_name) {
      return;
    }

    Vue.prototype.$socket.unregisterReal(
      "RB02",
      [getters.getUserId],
      param.vue_name
    );
    console.log(
      JSON.stringify(param) + "RB02 해제 #unregisterAssetNotification"
    );
  },
  registerOrderNotification({ getters }, param) {
    // 실시간 주문체결통지 (RB03) 등록
    // evnt_tp: 주문확인(1), 주문거부(2), 정정확인(3), 취소확인(4), 자동취소(5), 체결(6)
    if (!getters.getUserId) {
      return;
    }
    if (!param || !param.vue_name || !param.callback) {
      return;
    }

    Vue.prototype.$socket.registerReal(
      "RB03",
      "key_user_id",
      [getters.getUserId],
      param.vue_name,
      queryData => {
        let res = queryData.getBlockData("OutBlock1")[0];
        param.callback(res);
      }
    );
    console.log(JSON.stringify(param) + "RB03 등록 #registerOrderNotification");
  },
  unregisterOrderNotification({ getters }, param) {
    // 실시간 주문체결통지 (RB03) 해제
    if (!getters.getUserId) {
      return;
    }
    if (!param || !param.vue_name) {
      return;
    }

    Vue.prototype.$socket.unregisterReal(
      "RB03",
      [getters.getUserId],
      param.vue_name
    );
    console.log(
      JSON.stringify(param) + "RB03 해제 #unregisterOrderNotification"
    );
  },
  adminWalletState({ commit, rootGetters }, payload) {
    // 통화정보조회 (관리자  전자지갑연계구분(0.없음, 1.입금, 2.입출금) )
    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "cm802",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["cur_cd"] = payload["cur_cd"];
          block["req_cnt"] = 1;
        },
        queryData => {
          if (!queryData) {
            /** error 처리 S **/
            const error = rootGetters.getError("cm802");
            if (error) {
              commit("setAdminWalletState", "");
              reject(error);
            }
            /** error 처리 E **/
            return;
          }
          let res = queryData.getBlockData("OutBlock2")[0];
          commit("setAdminWalletState", res.walt_cnct_tp); //  walt_cnct_tp  전자지갑연계구분(0.없음, 1.입금, 2.입출금)

          if (res.walt_cnct_tp === "0") {
            commit("setWalletInfoWalletId", "");
            commit("setWalletInfoWalletSubInfo", "");
            commit("setWalletInfoWalletUseState", false);
          }
          resolve(res); //리턴
        }
      );
    });
  },
  selectCoinWallet({ rootGetters, getters, commit }, payload) {
    //commit('setMyAssetstatusInfoCurCd', payload['cur_cd'] )
    // 코인 지갑 조회(dw541)
    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName("dw541", queryData => {
        var block = queryData.getBlockData("InBlock1")[0];
        block["user_id"] = getters.getUserId;
        block["cur_cd"] = payload["cur_cd"];
      },
      queryData => {
        //지갑주소 , 보조정보 , 지갑상태체크
        if (queryData) {
          let res = queryData.getBlockData("OutBlock1")[0];
          //지갑주소 , 보조정보 , 상태
          commit("setWalletInfoWalletId", res.walt_id);
          commit("setWalletInfoWalletSubInfo", res.sub_info);
          commit("setWalletInfoWalletUseState", true);
          resolve(res); //리턴
        } else {
          //error is null ???
          const error = rootGetters.getError("dw541");
          commit("setWalletInfoWalletId", "");
          commit("setWalletInfoWalletSubInfo", "");
          commit("setWalletInfoWalletUseState", false);
          reject(error);
        }
      });
    });
  },
  giveCoinWallet({ rootGetters, getters, commit }, payload) {
    // commit('setMyAssetstatusInfoCurCd', payload['cur_cd'] )
    // 코인 지갑 발급(dw101)
    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName("dw101", queryData => {
        var block = queryData.getBlockData("InBlock1")[0];
        block["user_id"] = getters.getUserId;
        block["cur_cd"] = payload["cur_cd"];
        block["account_tp"] = '1';
      }, queryData => {
        if (queryData) {
          let res = queryData.getBlockData("OutBlock1")[0];
          commit("setWalletInfoWalletId", res.walt_id);
          commit("setWalletInfoWalletSubInfo", res.sub_info);
          commit("setWalletInfoWalletUseState", true);
          resolve(res); //리턴
        } else {
          // 전문 에러 언어팩 적용
          const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
          if (errorData.trName == "dw101") {
            commit("setWalletInfoWalletId", "");
            commit("setWalletInfoWalletSubInfo", "");
            commit("setWalletInfoWalletUseState", false);
            reject(errorData);
          }
        }
      });
    });
  },
  selectMyAccountInfo({ rootGetters, getters, commit }) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName("dw559", queryData => {
        var block = queryData.getBlockData("InBlock1")[0];
        block["user_id"] = getters.getUserId;
      }, queryData => {
        if (!queryData) {
          /** error 처리 S **/
          const error = rootGetters.getError("dw559");
          if (error) {
            reject(error);
          }
          /** error 처리 E **/
          return;
        }
        let res = queryData.getBlockData("OutBlock1")[0];
        commit("setMyAccountData", res);
        resolve(res); //리턴
      });
    });
  },
  selectMyInfo({ rootGetters, getters, commit }) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName("ac503", queryData => {
        var block = queryData.getBlockData("InBlock1")[0];
        block["user_id"] = getters.getUserId;
      }, queryData => {
        if (!queryData) {
          /** error 처리 S **/
          const error = rootGetters.getError("ac503");
          if (error) {
            reject(error);
          }
          /** error 처리 E **/
          return;
        }
        let res = queryData.getBlockData("OutBlock1")[0];
        commit("setInfoUser", res);
        resolve(res); //리턴
      });
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
