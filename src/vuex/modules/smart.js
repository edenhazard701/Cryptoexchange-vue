import Vue from "vue";

const state = {
  tdiCash: 0,
  tdiRate: 100,
  tdiList: [],
  tdiSelectedDetail: null,
  tdiToJoinCurCd: null,
  tdiOngoingList: [],
  tdiJoinedList: [],
  ssExperts: [],
  ssExpertSignalHistory: [],
  ssExpertProfitHistory: [],
  ssFollowHistory: [],
  contiKey: null,
  miningContiKey: null,
  dividendContiKey: null,
  coinMining: {
    bf_dt: "",
    bf_minn_rt: 0,
    bf_proc_qty: 0,
    bf_trd_amt: 0,
    cur_cd: "",
    to_dt: "",
    to_minn_rt: 0,
    to_proc_qty: 0,
    to_trd_amt: 0,
    trd_amt: 0,
    pdt_minn: 0,
    cur_cd2: ""
  },
  coinMiningList: [],
  dividend: {
    bf_dt: "",
    bf_dvd_rt: 0,
    bf_tot_qty: 0,
    bf_dvd_amt: 0,
    cur_cd: "",
    to_dt: "",
    to_dvd_rt: 0,
    to_tot_qty: 0,
    to_dvd_amt: 0,
    avg_poss_amt: 0,
    sta_rt: 0,
    pdt_dvd: 0
  },
  dividendList: [],
  issueStatus: {
    cur_cd: "",
    last_tot_qty: 0,
    rsp_cnt: 0
  },
  issueStatusList: [],
  signalList: [],
  signal: []
};

const getters = {
  tdiCash: state => state.tdiCash,
  tdiRate: state => state.tdiRate,
  tdiList: state => state.tdiList,
  tdiSelectedDetail: state => state.tdiSelectedDetail,
  tdiToJoinCurCd: state => state.tdiToJoinCurCd,
  tdiOngoingList: state => state.tdiOngoingList,
  tdiJoinedList: state => state.tdiJoinedList,
  smartSignalExperts: state => state.ssExperts,
  smartSignalExpertSignalHistory: state => state.ssExpertSignalHistory,
  smartSignalExpertProfitHistory: state => state.ssExpertProfitHistory,
  smartSignalFollowHistory: state => state.ssFollowHistory,
  getCoinMining: state => state.coinMining,
  getCoinMiningList: state => state.coinMiningList,
  getDividend: state => state.dividend,
  getDividendList: state => state.dividendList,
  getIssueStatus: state => state.issueStatus,
  getIssueStatusList: state => state.issueStatusList,
  getSignalList: state => state.signalList,
  getSignal: state => state.signal
};

const mutations = {
  setTdiCash: (state, data) => {
    state.tdiCash = data;
  },
  setTdiRate: (state, data) => {
    state.tdiRate = data;
  },
  setTdiList: (state, list) => {
    state.tdiList = list;
  },
  setTdiSelectedDetail: (state, data) => {
    state.tdiSelectedDetail = data;
  },
  setTdiToJoinCurCd: (state, cur_cd) => {
    state.tdiToJoinCurCd = cur_cd;
  },
  setTdiOngoingList: (state, list) => {
    state.tdiOngoingList = list;
  },
  setTdiJoinedList: (state, list) => {
    state.tdiJoinedList = list;
  },
  setSmartSignalExperts: (state, list) => {
    state.ssExperts = list;
  },
  setSmartSignalExpertSignalHistory: (state, list) => {
    state.ssExpertSignalHistory = list;
  },
  setSmartSignalExpertProfitHistory: (state, list) => {
    state.ssExpertProfitHistory = list;
  },
  setSmartSignalFollowHistory: (state, list) => {
    state.ssFollowHistory = list;
  },
  setContiKey: (state, contiKey) => {
    state.contiKey = contiKey;
  },
  setMiningContiKey: (state, contiKey) => {
    state.miningContiKey = contiKey;
  },
  setDividendContiKey: (state, contiKey) => {
    state.dividendContiKey = contiKey;
  },
  setCoinMining: (state, obj) => {
    Object.assign(state.coinMining, obj);
  },
  setCoinMiningList: (state, list) => {
    state.coinMiningList = list;
  },
  addCoinMiningList: (state, list) => {
    state.coinMiningList = state.coinMiningList.concat(list);
  },
  setDividend: (state, obj) => {
    Object.assign(state.dividend, obj);
  },
  setDividendList: (state, list) => {
    state.dividendList = list;
  },
  addDividendList: (state, list) => {
    state.dividendList = state.dividendList.concat(list);
  },
  setIssueStatus: (state, obj) => {
    Object.assign(state.issueStatus, obj);
  },
  setIssueStatusList: (state, list) => {
    state.issueStatusList = list;
  },
  setSignalList: (state, list) => {
    state.signalList = list;
  },
  setSignal: (state, list) => {
    state.signal = list;
  },
  addSignal: (state, list) => {
    state.signal = state.signal.concat(list);
  }
};

const actions = {
  fetchSignalList({ rootGetters, commit }, payload) {
    // 스크리너 - 스크리너 시그널 리스트 조회 : f0011
    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "f0011",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];

          Object.assign(block, payload);
        },
        queryData => {
          if (!queryData) {
            const error = rootGetters.getError("f0011");
            if (error) reject(error);
            return;
          }

          var res = queryData.getBlockData("OutBlock2");

          commit("setSignalList", res);
          resolve(res);
        }
      );
    });
  },
  fetchSignalResult({ rootGetters, commit }, payload) {
    // 스크리너 - 스크리너 시그널 리스트 조회 : f0012
    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "f0012",
        queryData => {
          payload["contiFlag"] &&
            state.contiKey != null &&
            queryData.setContiKey(state.contiKey);

          var block = queryData.getBlockData("InBlock1")[0];

          Object.assign(block, payload);
        },
        queryData => {
          if (queryData != null) {
            var res = [];
            res.signalCnt = queryData.getBlockData("OutBlock1")[0];
            res.signalList = queryData.getBlockData("OutBlock2");
            commit("setSignal", res);
            resolve(res);
          } else {
            let errorData = window.sessionStorage.getItem("lastErrorData");
            if (errorData !== null) {
              const error = rootGetters.getError("f0012");
              if (error) {
                reject(error);
                return;
              }
            }
          }
        }
      );
    });
  },

  fetchTDIList({ commit, rootGetters }) {
    // TDI히스토리 : ac609

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ac609",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["proc_tp"] = "%";
          block["req_cnt"] = "30";
        },
        queryData => {
          if (!queryData) {
            console.log("TDI히스토리 : ac609 실패");
            const error = rootGetters.getError("ac609");
            if (error) reject(error);
            return;
          }
          let list = queryData.getBlockData("OutBlock2");
          commit("setTdiList", list);
          resolve(list);
        }
      );
    });
  },
  fetchTDIDetail({ rootGetters }, param) {
    // TDI ICO 조회 : ac610

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ac610",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["cur_cd"] = param["cur_cd"];
        },
        queryData => {
          if (!queryData) {
            console.log("TDI ICO 조회 : ac610 실패");
            const error = rootGetters.getError("ac610");
            if (error) reject(error);
            return;
          }
          let res = queryData.getBlockData("OutBlock1")[0];
          resolve(res);
        }
      );
    });
  },
  selectTDI({ commit }, data) {
    commit("setTdiSelectedDetail", data);
  },
  mergeSelectedTDI({ commit, getters }, data) {
    commit(
      "setTdiSelectedDetail",
      Object.assign(getters.tdiSelectedDetail, data)
    );
  },
  prepareTDIJoin({ commit }, cur_cd) {
    commit("setTdiToJoinCurCd", cur_cd);
  },
  preparedTDIJoin({ commit }) {
    commit("setTdiToJoinCurCd", null);
  },
  fetchTDIOngoingList({ commit, rootGetters }) {
    // TDI참여코인 조회 : ac606

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ac606",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["proc_tp"] = "1";
          block["req_cnt"] = "30";
        },
        queryData => {
          if (!queryData) {
            console.log("TDI참여코인 조회 : ac606 실패");
            const error = rootGetters.getError("ac606");
            if (error) reject(error);
            return;
          }
          let res = queryData.getBlockData("OutBlock1")[0];
          let list = queryData.getBlockData("OutBlock2");
          commit("setTdiRate", res.event_aply_rt);
          commit("setTdiOngoingList", list);
          resolve({
            res,
            list
          });
        }
      );
    });
  },
  fetchTDIMyAble({ rootGetters }, param) {
    // 나의 참여가능 정보 조회 : ac607

    if (!rootGetters.getUserId) {
      return;
    }

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ac607",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["user_id"] = rootGetters.getUserId;
          block["cur_cd"] = param["cur_cd"];
          block["seq"] = param["seq"];
        },
        queryData => {
          if (!queryData) {
            console.log("나의 참여가능 정보 조회 : ac607 실패");
            const error = rootGetters.getError("ac607");
            if (error) reject(error);
            return;
          }
          let res = queryData.getBlockData("OutBlock1")[0];
          resolve(res);
        }
      );
    });
  },
  requestTDIJoin({ rootGetters }, param) {
    // TDI 참여 요청 : ac611

    if (!rootGetters.getUserId) {
      return;
    }

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ac611",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["user_id"] = rootGetters.getUserId;
          block["cur_cd"] = param["cur_cd"];
          block["cur_seq"] = param["cur_seq"];
          block["tdi_invo_qty"] = param["tdi_invo_qty"];
        },
        queryData => {
          if (!queryData) {
            const error = rootGetters.getError("ac611");
            if (error) reject(error);
            return;
          }
          let res = queryData.getBlockData("OutBlock1")[0];
          resolve(res);
        }
      );
    });
  },
  fetchTDIJoinedList({ rootGetters }, param) {
    // TDI나의 참여내역 조회 : ac608

    if (!rootGetters.getUserId) {
      return;
    }

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ac608",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["user_id"] = rootGetters.getUserId;
          block["req_cnt"] = "10";
          if (param && param.next_key) {
            queryData.setContiKey(param.next_key);
          }
        },
        queryData => {
          if (!queryData) {
            console.log("TDI나의 참여내역 조회 : ac608 실패");
            const error = rootGetters.getError("ac608");
            if (error) reject(error);
            return;
          }
          let list = queryData.getBlockData("OutBlock2");
          let next_key = queryData.getContiKey();

          resolve({
            list,
            next_key
          });
        }
      );
    });
  },
  fetchTDICash({ commit, rootGetters }) {
    // TDI보유캐쉬 조회 : ac612

    if (!rootGetters.getUserId) {
      return;
    }

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ac612",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["user_id"] = rootGetters.getUserId;
        },
        queryData => {
          if (!queryData) {
            console.log("TDI나의 참여내역 조회 : ac612 실패");
            const error = rootGetters.getError("ac612");
            if (error) reject(error);
            return;
          }
          let res = queryData.getBlockData("OutBlock1")[0];
          commit("setTdiCash", res["remn_cash"]);
          resolve(res);
        }
      );
    });
  },
  fetchSmartSignalExperts({ rootGetters }, param) {
    // 스마트시그널_전문가선택_목록 : ss011

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ss011",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["usr_id"] = rootGetters.getUserId;                                               // 계정 ID
          block["expt_rgst_no"] = param && param["expt_rgst_no"] ? param["expt_rgst_no"] : null; // 전문가 등록 번호
          block["next_gb"] = param && param["next_key"] ? "1" : "0";                             // 0 : 첫조회, 1 : 다음조회
          block["next_key"] = param && param["next_key"] ? param["next_key"] : null;             // 다음키
        },
        queryData => {
          if (!queryData) {
            console.log("스마트시그널_전문가선택_목록 : ss011 ::::: 조회 실패");
            const error = rootGetters.getError("ss011");
            if (error) reject(error);
            return;
          }
          let res = queryData.getBlockData("OutBlock1")[0];
          var list = queryData.getBlockData("OutBlock2");
          list.map(function(o) {
            o.prf_img_url = process.env.IMG_URL + "L" + o.expt_rgst_no;
            o.pr_img_url = process.env.IMG_URL + "D" + o.expt_rgst_no;
          });
          resolve({ res, list });
        }
      );
    });
  },
  fetchSmartSignalExpertPR({ rootGetters }, expertID) {
    // 스마트시그널_전문가선택_상세_소개 : ss012

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ss012",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["expt_rgst_no"] = expertID;
        },
        queryData => {
          if (!queryData) {
            console.log(
              "스마트시그널_전문가선택_상세_소개 : ss012 ::::: 조회 실패"
            );
            const error = rootGetters.getError("ss012");
            if (error) reject(error);
            return;
          }
          let res = queryData.getBlockData("OutBlock1")[0];
          resolve(res);
        }
      );
    });
  },
  fetchSmartSignalExpertSymbols({ rootGetters }, expertID) {
    // 전문가 전략종목요청 : ss039

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ss039",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["expt_rgst_no"] = expertID;
        },
        queryData => {
          if (!queryData) {
            console.log("전문가 전략종목요청 : ss039 ::::: 조회 실패");
            const error = rootGetters.getError("ss039");
            if (error) reject(error);
            return;
          }
          let list = queryData.getBlockData("OutBlock2");
          resolve(list);
        }
      );
    });
  },
  fetchSmartSignalExpertSignalHistory({ commit, rootGetters }, params) {
    // 스마트시그널_전문가선택_상세_신호히스토리 : ss013

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ss013",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["expt_rgst_no"] = params["expt_rgst_no"];
          block["symbol"] = params["symbol"];
        },
        queryData => {
          if (!queryData) {
            console.log(
              "스마트시그널_전문가선택_상세_실적 : ss013 ::::: 조회 실패"
            );
            const error = rootGetters.getError("ss013");
            if (error) reject(error);
            return;
          }
          let list = queryData.getBlockData("OutBlock2");
          commit("setSmartSignalExpertSignalHistory", list);
          resolve(list);
        }
      );
    });
  },
  fetchSmartSignalExpertProfitHistory({ commit, rootGetters }, params) {
    // 스마트시그널_전문가선택_상세_실적 : ss014

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ss014",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["expt_rgst_no"] = params["expt_rgst_no"];
          block["symbol"] = params["symbol"];
          block["slt_dir"] = params["slt_dir"]; // 0:조회시점기준 과거, 1:조회시점기준 미래
          block["date"] = params["date"];
          block["count"] = params["count"]; // PC 15개, Mobile 7개
        },
        queryData => {
          if (!queryData) {
            console.log(
              "스마트시그널_전문가선택_상세_실적 : ss014 ::::: 조회 실패"
            );
            const error = rootGetters.getError("ss014");
            if (error) reject(error);
            return;
          }
          let list = queryData.getBlockData("OutBlock2");
          if (Object.values(list).length > 0) {
            commit("setSmartSignalExpertProfitHistory", list);
            resolve(list);
          }
        }
      );
    });
  },
  fetchSmartSignalFollowHistory({ commit, rootGetters }, param) {
    // 스마트시그널_신청내역 : ss015

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ss015",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["usr_id"] = rootGetters.getUserId;
          block["next_key"] =
            param && param["next_key"] ? param["next_key"] : null;
          block["next_gb"] = param && param["next_key"] ? "1" : "0"; // 0 : 첫조회, 1 : 다음조회
        },
        queryData => {
          if (!queryData) {
            console.log("스마트시그널_신청내역 : ss015 ::::: 조회 실패");
            const error = rootGetters.getError("ss015");
            if (error) reject(error);
            return;
          }
          let res = queryData.getBlockData("OutBlock1")[0];
          let list = queryData.getBlockData("OutBlock2");
          resolve({ res, list });
        }
      );
    });
  },
  followExpert({ rootGetters }, params) {
    // 스마트시그널_전문가선택_스마트시그널 신청하기 : ss022

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ss022",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["expt_rgst_no"] = params["expt_rgst_no"];
          block["stt_cls"] = params["stt_cls"]; // 0:해지 / 1:구독
          block["usr_id"] = rootGetters.getUserId; // 계정 ID
        },
        queryData => {
          if (!queryData) {
            console.log(
              "스마트시그널_전문가선택_상세_실적 : ss022 ::::: 구독/해지 신청 실패"
            );
            const error = rootGetters.getError("ss022");
            if (error) reject(error);
            return;
          }
          let res = queryData.getBlockData("OutBlock1")[0];
          resolve(res);
        }
      );
    });
  },
  fetchFollowingExperts({ rootGetters }) {
    // (ss041) 스마트시그널_고객별_구동중인_전문가리스트
    if (!rootGetters.getUserId) {
      return;
    }

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ss041",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          block["usr_id"] = rootGetters.getUserId;
        },
        queryData => {
          if (!queryData) {
            console.log(
              "(ss041) 스마트시그널_고객별_구동중인_전문가리스트 ::::: 조회 실패"
            );
            const error = rootGetters.getError("ss041");
            if (error) reject(error);
            return;
          }
          let list = queryData.getBlockData("OutBlock2");
          resolve(list);
        }
      );
    });
  },
  coinMiningObj({ commit, rootGetters }, payload) {
    // 전일, 당일 마이닝 조회 ac601

    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ac601",
        queryData => {
          const day = new Date();
          var yyyy = day.getFullYear().toString(),
            mm = (day.getMonth() + 1).toString(),
            dd = day.getDate().toString();

          payload["base_dt"] =
            yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]);

          var block = queryData.getBlockData("InBlock1")[0];
          block["base_dt"] = payload["base_dt"];
        },
        queryData => {
          if (!queryData) {
            console.log("마이닝 조회 : ac601 ::::: 데이터 없음");
            const error = rootGetters.getError("ac601");
            if (error) reject(error);
            return;
          }
          commit("setCoinMining", queryData.getBlockData("OutBlock1")[0]);
          resolve(queryData.getBlockData("OutBlock1")[0]);
        }
      );
    });
  },
  coinMiningDetailList({ commit, rootGetters, state }, payload) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ac602",
        queryData => {
          // 연속플래그 조회 ( 연속일 경우 추가 / 연속이 아닐 경우 재조회 )
          payload["contiFlag"] &&
            state.miningContiKey != null &&
            queryData.setContiKey(state.miningContiKey);

          var block = queryData.getBlockData("InBlock1")[0];
          payload["req_cnt"] = !payload["req_cnt"] ? "11" : payload["req_cnt"];
          payload["user_id"] = rootGetters.getUserId;
          Object.assign(block, payload);
        },
        queryData => {
          if (!queryData) {
            console.log("마이닝 조회 : ac602 ::::: 데이터 조회 실패");
            const error = rootGetters.getError("ac602");
            if (error) reject(error);
            return;
          }
          if (queryData.getBlockData("OutBlock1")[0]["rsp_cnt"] == 0) {
            console.log("마이닝 조회 : ac602 ::::: 데이터 0건");
            commit("setCoinMining", queryData.getBlockData("OutBlock1")[0]);
            return;
          }

          if (payload["contiFlag"] && state.miningContiKey != null) {
            commit("addCoinMiningList", queryData.getBlockData("OutBlock2"));
          } else {
            commit("setCoinMining", queryData.getBlockData("OutBlock1")[0]);
            commit("setCoinMiningList", queryData.getBlockData("OutBlock2"));
          }

          // ContiKey set
          commit("setMiningContiKey", queryData.getContiKey());
          resolve(queryData);
        }
      );
    });
  },
  dividendObj({ commit, rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ac603",
        queryData => {
          const day = new Date();
          var yyyy = day.getFullYear().toString(),
            mm = (day.getMonth() + 1).toString(),
            dd = day.getDate().toString();

          payload["base_dt"] =
            yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]);

          var block = queryData.getBlockData("InBlock1")[0];
          block["base_dt"] = payload["base_dt"];
        },
        queryData => {
          if (!queryData) {
            console.log("배당 조회 : ac603 ::::: 데이터 없음");
            const error = rootGetters.getError("ac603");
            if (error) reject(error);
            return;
          }
          commit("setDividend", queryData.getBlockData("OutBlock1")[0]);
          resolve(queryData.getBlockData("OutBlock1")[0]);
        }
      );
    });
  },
  dividendDetailList({ commit, rootGetters, state }, payload) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ac604",
        queryData => {
          // 연속플래그 조회 ( 연속일 경우 추가 / 연속이 아닐 경우 재조회 )
          payload["contiFlag"] &&
            state.dividendContiKey != null &&
            queryData.setContiKey(state.dividendContiKey);

          var block = queryData.getBlockData("InBlock1")[0];
          payload["req_cnt"] = !payload["req_cnt"] ? "11" : payload["req_cnt"];
          payload["user_id"] = rootGetters.getUserId;
          Object.assign(block, payload);
        },
        queryData => {
          if (!queryData) {
            console.log("배당 조회 : ac604 ::::: 데이터 조회 실패");
            const error = rootGetters.getError("ac604");
            if (error) reject(error);
            return;
          }
          if (queryData.getBlockData("OutBlock1")[0]["rsp_cnt"] == 0) {
            console.log("마이닝 조회 : ac604 ::::: 데이터 0건");
            commit("setDividend", queryData.getBlockData("OutBlock1")[0]);
            return;
          }

          if (payload["contiFlag"] && state.dividendContiKey != null) {
            commit("addDividendList", queryData.getBlockData("OutBlock2"));
          } else {
            commit("setDividend", queryData.getBlockData("OutBlock1")[0]);
            commit("setDividendList", queryData.getBlockData("OutBlock2"));
          }

          // ContiKey set
          commit("setDividendContiKey", queryData.getContiKey());
          resolve(queryData);
        }
      );
    });
  },
  issueStatusObj({ commit, rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$socket.sendProcessByName(
        "ac605",
        queryData => {
          var block = queryData.getBlockData("InBlock1")[0];
          Object.assign(block, payload);
        },
        queryData => {
          if (!queryData) {
            console.log("배당현황 조회 : ac605 ::::: 데이터 조회 실패");
            const error = rootGetters.getError("ac605");
            if (error) reject(error);
            return;
          }

          commit("setIssueStatus", queryData.getBlockData("OutBlock1")[0]);
          commit("setIssueStatusList", queryData.getBlockData("OutBlock2"));

          resolve();
        }
      );
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
