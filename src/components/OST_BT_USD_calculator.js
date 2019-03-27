import React, { Component } from 'react';
import PriceOracle from '.././utils/PriceOracle';
import axios from 'axios/index';
import { apiRoot } from '../constants';

export default class OST_BT_USD_calculator extends Component {
  constructor(props) {
    super(props);
    this.ost_to_fiat_conversion_ratio = 0;
    this.ost_to_bt_conversion_ratio = 0;
    this.priceOracle = null;
    this.state = {
      BT_val: '',
      OST_val: '',
      FIAT_val: ''
    };
  }

  componentDidMount() {
    axios
      .get(`${apiRoot}api/token`)
      .then((res) => {
        this.ost_to_fiat_conversion_ratio = res.data && res.data['price_points']['price_point']['OST']['USD'];
        this.ost_to_bt_conversion_ratio = res.data && res.data['token']['conversion_factor'];
        this.priceOracle = new PriceOracle({
          ost_to_fiat: this.ost_to_fiat_conversion_ratio,
          ost_to_bt: this.ost_to_bt_conversion_ratio
        });
      })
      .catch((err) => {});
  }

  handleOSTChange = (event) => {
    let value = event.target.value;
    this.setState({
      BT_val: this.priceOracle.ostToBt(value),
      OST_val: value,
      FIAT_val: this.priceOracle.ostToFiat(value)
    });
  };

  handleBTChange = (event) => {
    let value = event.target.value;
    this.setState({
      BT_val: value,
      OST_val: this.priceOracle.btToOst(value),
      FIAT_val: this.priceOracle.btToFiat(value)
    });
  };

  render() {
    return (
      <div className="row mt-5">
        <div className="col-4">
          <label htmlFor="OST_input" className="mr-2">
            Value in OST
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={this.state.OST_val}
            id="OST_input"
            onChange={this.handleOSTChange}
          />
        </div>
        <div className="col-4">
          <label htmlFor="BT_input" className="mr-2">
            Value in BT
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={this.state.BT_val}
            id="BT_input"
            onChange={this.handleBTChange}
          />
        </div>
        <div className="col-4">
          <label htmlFor="USD_input" className="mr-2">
            Value in USD
          </label>
          <input
            disabled
            className="form-control form-control-sm"
            type="text"
            value={this.state.FIAT_val}
            id="USD_input"
          />
        </div>
      </div>
    );
  }
}
