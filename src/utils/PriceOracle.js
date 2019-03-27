import BigNumber from 'bignumber.js';

class PriceOracle {
  //private fields for internal use
  P_OST = 5;
  P_OST_ROUND_ROUNDING_MODE = BigNumber.ROUND_HALF_UP;
  P_BT = 5;
  P_BT_ROUND_ROUNDING_MODE = BigNumber.ROUND_HALF_UP;
  P_FIAT = 2;
  P_FIAT_ROUND_ROUNDING_MODE = BigNumber.ROUND_HALF_UP;
  OST_TO_FIAT = 1;
  OST_TO_BT = 1;

  constructor(config) {
    if (config.ost_to_fiat) {
      this.#OST_TO_FIAT = String(config.ost_to_fiat);
    }
    if (config.ost_to_bt) {
      this.#OST_TO_BT = String(config.ost_to_bt);
    }
  }

  ostToFiat(ost) {
    if (!ost) return '';

    ost = BigNumber(ost);

    let result = ost.multipliedBy(this.#OST_TO_FIAT);

    return this.toFiat(result);
  }

  btToFiat(bt) {
    if (!bt) return '';

    bt = BigNumber(bt);
    let fiatBN = BigNumber(this.#OST_TO_FIAT),
      oneBTToFiat = fiatBN.dividedBy(this.#OST_TO_BT),
      result = oneBTToFiat.multipliedBy(bt);

    return this.toFiat(result);
  }

  btToFiatPrecession(bt) {
    if (!bt) return '';

    let fiat = this.btToFiat(bt);

    return this.toPrecessionFiat(fiat);
  }

  ostToBt(ost) {
    if (!ost) return '';

    ost = BigNumber(ost);

    let result = ost.multipliedBy(this.#OST_TO_BT);

    return this.toBT(result);
  }

  ostToBtPrecession(ost) {
    if (!ost) return '';

    let result = this.ostToBt(ost);

    return this.toPrecessionBT(result);
  }

  btToOst(bt) {
    if (!bt) return '';

    bt = BigNumber(bt);

    let result = bt.dividedBy(this.#OST_TO_BT);

    return this.toOst(result);
  }

  btToOstPrecession(bt) {
    if (!bt) return '';

    let result = this.btToOst(bt);

    return this.toPrecessionOst(result);
  }

  toBT(bt) {
    if (this.isNaN(bt)) {
      return NaN;
    }
    bt = BigNumber(bt);
    return bt.toString();
  }

  toPrecessionBT(bt) {
    bt = this.toBT(bt);
    if (!bt) {
      return '';
    }
    bt = BigNumber(bt);
    return bt.toFixed(this.#P_BT, this.#P_BT_ROUND_ROUNDING_MODE);
  }

  toOst(ost) {
    if (this.isNaN(ost)) {
      return '';
    }

    ost = BigNumber(ost);
    return ost.toString();
  }

  toPrecessionOst(ost) {
    ost = this.toOst(ost);
    if (!ost) {
      return '';
    }
    ost = BigNumber(ost);
    return ost.toFixed(this.#P_OST, this.#P_OST_ROUND_ROUNDING_MODE);
  }

  toFiat(fiat) {
    if (this.isNaN(fiat)) {
      return NaN;
    }

    fiat = BigNumber(fiat);
    return fiat.toString();
  }

  toPrecessionFiat(fiat) {
    fiat = this.toFiat(fiat);

    if (!fiat) {
      return '';
    }

    fiat = BigNumber(fiat);
    var precession = this.getFiatPrecession();
    return fiat.toFixed(precession, this.#P_FIAT_ROUND_ROUNDING_MODE);
  }

  fromWei(val) {
    if (window.web3) {
      return window.web3.fromWei(val);
    } else {
      return this.__fromWei__(val);
    }
  }

  toWei(val) {
    if (window.web3) {
      return window.web3.toWei(val);
    } else {
      return this.__toWei__(val);
    }
  }

  isNaN(val) {
    return typeof val === 'undefined' || val === '' || val === null || isNaN(val);
  }

  getOstPrecession() {
    return this.#P_OST;
  }

  //Keeping FIAT precession as configurable as it can be asked for
  getFiatPrecession() {
    return this.#P_FIAT || this.#P_FIAT;
  }

  getBtPrecession() {
    return this.#P_BT;
  }

  //Private method START
  __fromWei__(val) {
    let exp;

    if (this.isNaN(val)) {
      return NaN;
    }

    val = BigNumber(val);
    exp = BigNumber(10).exponentiatedBy(18);
    return val.dividedBy(exp).toString(10);
  }

  __toWei__(val) {
    var oThis = this,
      exp;

    if (oThis.isNaN(val)) {
      return NaN;
    }

    val = BigNumber(val);
    exp = BigNumber(10).exponentiatedBy(18);
    return val.multipliedBy(exp).toString(10);
  }
  //Private method END
}

export default PriceOracle;
