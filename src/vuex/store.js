// store.js
import Vue from "vue";
import Vuex from "vuex";
import { _ } from "vue-underscore";
import user from "./modules/user";
import exchange from "./modules/exchange";
import wallet from "./modules/wallet";
import smart from "./modules/smart";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user,
    exchange,
    wallet,
    smart
  },
  state: {
    lastErrorData: window.sessionStorage.getItem("lastErrorData"),
    nowPage: null,
    socket: {
      isConnected: false,
      reconnectError: false
    },
    data: {
      currentSymbol: "",
      beforeSymbol: "",
      currentPayCurrCode: "KRW",
      currentCoinCurrCode: "BTC",
      currentData: {
        cumdealcost: 0
      },
      n1001: [],
      i0001: [],
      i0002: [],
      i0018: [],
      KVS0: [],
      trSymbols: [],
      i0018QryDiv: "4",
      currentBtcKrPrice: 0,
      currentEthKrPrice: 0,
      coinImage: {
        ada: require("@/images/coin/ada.png"),
        ae: require("@/images/coin/ae.png"),
        amo: require("@/images/coin/amo.png"),
        apis: require("@/images/coin/apis.png"),
        arn: require("@/images/coin/arn.png"),
        bcd: require("@/images/coin/bcd.png"),
        bch: require("@/images/coin/bch.png"),
        bhpc: require("@/images/coin/bhpc.png"),
        bsv: require("@/images/coin/bsv.png"),
        btc: require("@/images/coin/btc.png"),
        btg: require("@/images/coin/btg.png"),
        bznt: require("@/images/coin/bznt.png"),
        cmt: require("@/images/coin/cmt.png"),
        ctxc: require("@/images/coin/ctxc.png"),
        dash: require("@/images/coin/dash.png"),
        elf: require("@/images/coin/elf.png"),
        enj: require("@/images/coin/enj.png"),
        eos: require("@/images/coin/eos.png"),
        etc: require("@/images/coin/etc.png"),
        eth: require("@/images/coin/eth.png"),
        ethos: require("@/images/coin/ethos.png"),
        gnt: require("@/images/coin/gnt.png"),
        gto: require("@/images/coin/gto.png"),
        hsr: require("@/images/coin/hsr.png"),
        icx: require("@/images/coin/icx.png"),
        itc: require("@/images/coin/itc.png"),
        knc: require("@/images/coin/knc.png"),
        lrc: require("@/images/coin/lrc.png"),
        ltc: require("@/images/coin/ltc.png"),
        mco: require("@/images/coin/mco.png"),
        mith: require("@/images/coin/mith.png"),
        neo: require("@/images/coin/neo.png"),
        omg: require("@/images/coin/omg.png"),
        pay: require("@/images/coin/pay.png"),
        powr: require("@/images/coin/powr.png"),
        ppt: require("@/images/coin/ppt.png"),
        pst: require("@/images/coin/pst.png"),
        qtum: require("@/images/coin/qtum.png"),
        rdn: require("@/images/coin/rdn.png"),
        rep: require("@/images/coin/rep.png"),
        rom: require("@/images/coin/rom.png"),
        salt: require("@/images/coin/salt.png"),
        snt: require("@/images/coin/snt.png"),
        steem: require("@/images/coin/steem.png"),
        strat: require("@/images/coin/strat.png"),
        theta: require("@/images/coin/theta.png"),
        tmtg: require("@/images/coin/tmtg.png"),
        trx: require("@/images/coin/trx.png"),
        vet: require("@/images/coin/vet.png"),
        wax: require("@/images/coin/wax.png"),
        wet: require("@/images/coin/wet.png"),
        wtc: require("@/images/coin/wtc.png"),
        xem: require("@/images/coin/xem.png"),
        xmr: require("@/images/coin/xmr.png"),
        xrp: require("@/images/coin/xrp.png"),
        zec: require("@/images/coin/zec.png"),
        zil: require("@/images/coin/zil.png"),
        zrx: require("@/images/coin/zrx.png"),
        default: require("@/images/coin/default.png")
      }
    },
    unitcode: '',
  },
  getters: {
    isSocketConnected(state) {
      return state.socket.isConnected;
    },
    getData(state) {
      return state.data;
    },
    getDataWithName: state => name => {
      console.log(name);
      if (state.data[name] == undefined) {
        return [];
      }
      return state.data[name];
    },
    getCurrentData: state => {
      return state.data.currentData;
    },
    getI0001: state => {
      if (state.data["i0001"] == undefined) {
        return [];
      }
      return [];
      //var KVS0 = state.data['KVS0']
      // console.log(state.data['i0001'][0])
      // console.log(KVS0)
      // var addArr = state.data['i0001'].concat(KVS0)
      //var addArr = KVS0;
      // console.log(arr)
      //return addArr.slice(addArr.length - 200, addArr.length)
    },
    getI0002: state => {
      if (state.data["i0002"] == undefined) {
        return [];
      }
      var KVS0 = state.data["KVS0"];
      var filtered = _.where(KVS0, { symbol: state.data.currentSymbol });
      var addArr = state.data["i0002"].concat(filtered);
      return addArr.slice(addArr.length - 200, addArr.length).reverse();
    },
    getN1001: state => {
      if (state.data["n1001"] == undefined) {
        return [];
      }
      return state.data["n1001"];
    },
    i0018LatestItem: state => {
      return state.data["i0018"].length > 0
        ? state.data["i0018"].reduce((max, symbol) =>
            symbol.listdatetime > max.listdatetime ? symbol : max
          )
        : null;
    },
    getPairByCd: state => cd => {
      return _.findWhere(state.data.n1001, { o_trgt_cur_cd_n: cd });
    },
    getPairBySymbol: state => symbol => {
      return _.findWhere(state.data.n1001, { o_symbol: symbol });
    },
    getPairsByCd: state => cd => {
      return _.where(state.data.n1001, { o_trgt_cur_cd_n: cd });
    },
    getPairsByCds: state => cds => {
      return _.filter(state.data.n1001, pair => {
        return cds.includes(pair.o_trgt_cur_cd_n);
      });
    },
    btcKRWCurPrc: state => state.data.currentBtcKrPrice,
    ethKRWCurPrc: state => state.data.currentEthKrPrice,
    getCoinImage(state) {
      var coin = state.data.currentCoinCurrCode.toLocaleLowerCase();
      var data = state.data.coinImage[coin];
      if (data != null) {
        return data;
      } else {
        return state.data.coinImage.default;
      }
    },
    getCoinImages(state) {
      return state.data.coinImage;
    },
    getError: state => tr_cd => {
      let error = state.lastErrorData;
      if (!error) return null;
      error = JSON.parse(error);
      if (error.trName !== tr_cd) return null;
      return error;
    },
    getUnitcode: state => state.unitcode,
  },
  mutations: {
    SOCKET_ONOPEN(state, event) {
      console.log(event);
      // Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = event;
      if (state.socket.isConnected) {
        console.log("SOCKET_ONOPEN");
      } else {
        console.log("SOCKET_ONCLOSE");
      }
    },
    SOCKET_ONCLOSE(state, event) {
      state.socket.isConnected = false;
      console.log("SOCKET_ONCLOSE");
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event);
      console.log("SOCKET_ONERROR");
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      state.socket.message = message;
      console.log("SOCKET_ONMESSAGE");
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count);
      console.log("SOCKET_RECONNECT");
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
      console.log("SOCKET_RECONNECT_ERROR");
    },
    addData(state, payload) {
      var arrayData = state.data[payload["name"]];
      arrayData.push(payload["data"]);
      if (arrayData.length > 1000) {
        arrayData.shift();
      }
      state.data[payload["name"]] = arrayData;
    },
    updateData(state, payload) {
      //console.log(payload["currentData"]);
      state.data[payload["name"]] = payload["data"];
      if (payload["currentData"] != undefined && payload["currentData"]) {
        state.data.currentData = _.findWhere(payload["data"], {
          symbol: state.data.currentSymbol
        });
      }
    },
    updateRealData(state, payload) {
      let arrData = state.data[payload["name"]];
      const realData = payload["data"];
      const key = payload["key"];
      let findObj = _.findWhere(arrData, { symbol: realData[key] });
      if (findObj != undefined) {
        let mergeData = _.extend(findObj, realData);
        Object.keys(findObj).forEach(function(key) {
          var realVal = realData[key];

          if (realVal != undefined) {
            findObj[key] = realVal;
          }
        });
        findObj["newTick"] = true;
        if (mergeData["symbol"] == state.data.currentSymbol) {
          state.data.currentData = mergeData;
        }
        setTimeout(() => {
          findObj["newTick"] = false;
        }, 50);
      }
    },
    setCurrentSymbol(state, symbol) {
      state.data.beforeSymbol = state.data.currentSymbol;
      state.data.currentSymbol = symbol;
      state.data.currentCoinCurrCode = symbol
        .replace(/__/g, "_")
        .split("_")[0]
        .substr(5);
      state.data.currentPayCurrCode = symbol.replace(/__/g, "_").split("_")[1];
    },
    setCurrentPayCurrCode(state, payCurrCode) {
      state.data.currentPayCurrCode = payCurrCode;
    },
    setI0018QryDiv(state, qryDiv) {
      state.data.i0018QryDiv = qryDiv;
    },
    setI0018(state, list) {
      state.data.i0018 = list;
    },
    setUnitcode(state, unitcode) {
      state.unitcode = unitcode;
    },
  },
  actions: {
    sendProcessByName({ commit, state }, payload) {
      const needSave = payload["needSave"];
      if (needSave != undefined && needSave) {
        commit("updateData", {
          name: payload["name"],
          data: []
        });
      }
      return new Promise((resolve, reject) => {
        Vue.prototype.$socket.sendProcessByName(
          payload["name"],
          function(queryData) {
            //console.log(queryData);
            var block = queryData.getBlockData("InBlock1")[0];
            Object.keys(payload["params"]).forEach(function(key) {
              block[key] = payload["params"][key];
            });
          },
          function(queryData) {
            //console.log(queryData);
            if (queryData != null) {
              if (needSave != undefined && needSave) {
                if (payload["name"] == "i0001") {
                  commit("addData", {
                    name: payload["name"],
                    data: queryData.queryObj.OutBlock1
                  });
                } else {
                  commit("updateData", {
                    name: payload["name"],
                    data: queryData.queryObj.OutBlock2,
                    currentData: payload["currentData"]
                  });
                }
              }
              resolve({
                name: payload["name"],
                data: queryData.queryObj.OutBlock2
              });
            } else {
              resolve({
                name: payload["name"],
                data: null
              });
            }
          }
        );
      });
    },
    registerReal({ commit, state }, payload) {
      console.log("registerReal");
      const needSave = payload["needSave"];
      const update = payload["update"];
      const name = payload["name"];
      const realField = payload["realField"];
      const keyArr = payload["keyArr"];
      Vue.prototype.$socket.unregisterReal(name, keyArr, null);
      Vue.prototype.$socket.registerReal(
        name,
        realField,
        keyArr,
        null,
        function(queryData) {
          if (needSave != undefined && needSave) {
            commit("addData", {
              name: payload["name"],
              data: queryData.queryObj.OutBlock1[0]
            });
          }
          if (update != undefined && update) {
            commit("updateRealData", {
              name: update["name"],
              key: update["key"],
              data: queryData.queryObj.OutBlock1[0]
            });
          }
          if (payload["callback"] != null) {
            payload["callback"](queryData);
          }
        }
      );
    },
    updateI0018({ commit }, payload) {
      commit("setI0018", payload);
    }
  }
});
