// 호가, 수량, 가격, 금액 단위 관리자
function UnitManager() {}

UnitManager.inst = null;
UnitManager.getInst = function() {
  if (!UnitManager.inst) UnitManager.inst = new UnitManager();
  return UnitManager.inst;
};

// 결제통화코드
UnitManager.getSetlCurCd = function(symbol) {
  var setlCurCd = theApp.master.getItemValue(symbol, "o_setl_cur_cd");
  return setlCurCd;
};

// 결제통화소수점자리수
UnitManager.getSetlDecDigt = function(symbol) {
  var setlDecDigt = theApp.master.getItemValue(symbol, "o_setl_dec_digt");
  return setlDecDigt;
};

// 결제통화표시소수점자리수
UnitManager.getSetlDecDispDigt = function(symbol) {
  var setlDecDispDigt = theApp.master.getItemValue(
    symbol,
    "o_setl_dec_disp_digt"
  );
  return setlDecDispDigt;
};

// 대상통화표시소수점자리수
UnitManager.getTrgtDecDispDigt = function(symbol) {
  var trgtDecDispDigt = theApp.master.getItemValue(
    symbol,
    "o_trgt_dec_disp_digt"
  );
  return trgtDecDispDigt;
};

// 대상통화소수점자리수
UnitManager.getTrgtDecDigt = function(symbol) {
  var trgtDecDigt = theApp.master.getItemValue(symbol, "o_trgt_dec_digt");
  return trgtDecDigt;
};

//대상화폐소수점자리수(키:화폐코드)
UnitManager.getDigitByTrgtCurCd = function(TrgtCurCd) {
  var nDigit = theApp.master.getDigitByTrgtCurCd(TrgtCurCd);
  return nDigit;
};

// 주문단위수량
UnitManager.getQty_OrdUnit = function(symbol) {
  var qty_OrdUnit = theApp.master.getItemValue(symbol, "o_ord_unit_qty");
  return parseFloat(qty_OrdUnit);
};

// 주문단위수량의 소수점이상 자리수
UnitManager.getDecimalPntLen_OrdQtyUnit = function(symbol) {
  var qty_OrdUnit = theApp.master.getItemValue(symbol, "o_ord_unit_qty");
  var ordQtyUnit = parseFloat(qty_OrdUnit);
  return FloatUtil.getLength_DecimalPoint(ordQtyUnit);
};

// 주문단위수량의 소수점이하 자리수
UnitManager.getBelowDecimalPntLen_OrdQtyUnit = function(symbol) {
  var qty_OrdUnit = theApp.master.getItemValue(symbol, "o_ord_unit_qty");
  var ordQtyUnit = parseFloat(qty_OrdUnit);
  return FloatUtil.getLength_belowDecimalPoint(ordQtyUnit);
};

// 최소주문단위수량
UnitManager.getMinQty_OrdUnit = function(symbol) {
  var minQty_OrdUnit = theApp.master.getItemValue(symbol, "o_min_ord_qty");
  return minQty_OrdUnit;
};

// 최소주문단위수량의 소수점이상 자리수
UnitManager.getDecimalPntLen_OrdMinQtyUnit = function(symbol) {
  var minQty_OrdUnit = theApp.master.getItemValue(symbol, "o_min_ord_qty");
  var ordMinQtyUnit = parseFloat(minQty_OrdUnit);
  return FloatUtil.getLength_DecimalPoint(ordMinQtyUnit);
};

// 최소주문단위수량의 소수점이하 자리수
UnitManager.getBelowDecimalPntLen_OrdMinQtyUnit = function(symbol) {
  var minQty_OrdUnit = theApp.master.getItemValue(symbol, "o_min_ord_qty");
  var ordMinQtyUnit = parseFloat(minQty_OrdUnit);
  return FloatUtil.getLength_belowDecimalPoint(ordMinQtyUnit);
};

// 호가단위가격 또는 금액
UnitManager.getHogaUnit = function(unit, curCd, prc, HogaRangeArray, isMinus, nLenBelowDigitArray) {
  if (!isMinus) isMinus = false;
  var hogaUnits = unit;
  if (!unit || unit.length <= 0) {
    return;
  }
  for (var index = 0; index < hogaUnits.length; ++index) {
    var hogaUnit = hogaUnits[index];
    if (hogaUnit.setl_cur_cd == curCd) {
      if (index < hogaUnits.length - 1) {
        var highLimit =
          isMinus == true
            ? prc <= hogaUnit.prc_high_limt
            : prc < hogaUnit.prc_high_limt;
        if (hogaUnit.prc_low_limt <= prc && highLimit) {
          if (HogaRangeArray != undefined) {
            HogaRangeArray[0] = hogaUnit.prc_low_limt;
            HogaRangeArray[1] = hogaUnit.prc_high_limt;
          }

          if (nLenBelowDigitArray != undefined) {
            nLenBelowDigitArray[0] = hogaUnit.prc_LenBelowDigit;
          }
          return hogaUnit.prc_unit;
        }
      } else {
        if (hogaUnit.prc_low_limt <= prc) {
          if (HogaRangeArray != undefined) {
            HogaRangeArray[0] = hogaUnit.prc_low_limt;
            HogaRangeArray[1] = null;
          }

          if (nLenBelowDigitArray != undefined) {
            nLenBelowDigitArray[0] = hogaUnit.prc_LenBelowDigit;
          }

          return hogaUnit.prc_unit;
        }
      }
    }
  }

  //자릿수 맞추면서 기획팀에서 요청한 예외처리들
  if (curCd == "XRP") {
    if (nLenBelowDigitArray != undefined) {
      nLenBelowDigitArray[0] = 6;
    }
    return 0.000001;
  } else if (curCd == "KRW") {
    if (nLenBelowDigitArray != undefined) {
      nLenBelowDigitArray[0] = 0;
    }
    return 1;
  } else if (curCd == "TMX") {
    if (nLenBelowDigitArray != undefined) {
      nLenBelowDigitArray[0] = 8;
    }
  }

  return 0.00000001;
};

UnitManager.getMaxLenBelowDigit = function(curCd) {
  var nMaxLenBelowDigit = theApp.master.mapMaxLenBelowDigitPerSetlCd[curCd];
  if (nMaxLenBelowDigit) return nMaxLenBelowDigit;
  return 0;
};

//주문단위수량 소수점 자리수로 Qty값을 나타낼 경우 사용
UnitManager.fixToOrdUnitQtyDigit = function(symbol, Qty) {
  var OrdUnitQty = this.getQty_OrdUnit(symbol);
  var strOrdUnitQty = "" + OrdUnitQty;
  var nPointPos = strOrdUnitQty.indexOf(".");

  var nOrdUnitQtyDigit = 0;
  if (nPointPos >= 0) nOrdUnitQtyDigit = strOrdUnitQty.length - nPointPos - 1;

  var strQty = "" + Qty;
  nPointPos = strQty.indexOf(".");

  var nDigit = 0;
  if (nPointPos >= 0) nDigit = strQty.length - nPointPos - 1;

  if (nOrdUnitQtyDigit > nDigit)
    strQty = Qty.toFixed(nOrdUnitQtyDigit).toString();
  else if (nOrdUnitQtyDigit < nDigit)
    strQty = strQty.substring(0, nPointPos + nOrdUnitQtyDigit);

  return strQty;
};

UnitManager.test = function(data) {
  return data;
};

//대상통화표시자리수로 Qty값을 나타낼 경우 사용
UnitManager.fixToTargetDisplayDigit = function(symbol, Qty) {
  var nTrgtDispDigit = this.getTrgtDecDispDigt(symbol);

  var strQty = "" + Qty;
  var nPointPos = strQty.indexOf(".");

  var nDigit = 0;
  if (nPointPos >= 0) nDigit = strQty.length - nPointPos - 1;

  if (nTrgtDispDigit > nDigit) strQty = Qty.toFixed(nTrgtDispDigit).toString();

  return strQty;
};

UnitManager.numberWithCommas = function(x) {
  var tmp = x.toString().split(".");
  return (
    tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (tmp[1] ? "." + tmp[1] : "")
  );
};

// 포맷 + 소수점 자리수 기준 반올림
// d - 대상 숫자, f - 소수점 자리수
UnitManager.fixedDecimalWithCommas = function(d, f) {
  var tmp = Number(d)
    .toFixed(f)
    .split(".");
  return (
    tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (tmp[1] ? "." + tmp[1] : "")
  );
};

// 포맷 + 소수점 자리수 기준 절사
// d - 대상 숫자, f - 소수점 자리수
UnitManager.flooredDecimalWithCommas = function(d, f) {
  var mod = Math.pow(10, f);
  var tmp = (Math.floor((d * 1 * mod).toFixed()) / mod).toFixed(f).split(".");
  // var tmp = Math.floor(Math.floor((d * 1 * mod)).toFixed() / mod).toString().split(".");
  return (
    tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (tmp[1] ? "." + tmp[1] : "")
  );
};
