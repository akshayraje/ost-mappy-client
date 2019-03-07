import React, { Component } from "react";
import CustomDataItem from "./CustomDataItem";
import axios from "axios/index";
import { apiRoot, dataMap } from "../constants";
import QRCode from "qrcode.react";

class CustomData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredUsers: [],
      amounts: [],
      addresses: [],
      currentTokenId: null,
      currentUserId: "",
      QRSeed: null,
      actionId: 0,
      actionLabel: dataMap[0]._label
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.getQRCodeData = this.getQRCodeData.bind(this);
    this.setAction = this.setAction.bind(this);
  }

  getQRCodeData() {
    if (
      this.state.addresses.length !== this.state.amounts.length ||
      this.state.amounts.length === 0 ||
      !this.state.currentTokenId
    ) {
      return "";
    }
    let id = this.state.actionId,
      QRSeed = JSON.parse(JSON.stringify(dataMap[id]));
    QRSeed.d["ads"] = this.state.addresses;
    QRSeed.d["tid"] = this.state.currentTokenId;
    QRSeed.d["ams"] = this.state.amounts;
    delete QRSeed["_label"];
    return QRSeed;
  }

  setAction(event) {
    let id = event.target.id,
      actionLabel = event.target.dataset.label;
    this.setState(
      {
        actionId: id,
        actionLabel: actionLabel
      },
      () => {
        this.setState({
          QRSeed: this.getQRCodeData()
        });
      }
    );
  }

  getData() {
    let filteredUsers = [];
    axios
      .get(`${apiRoot}api/users`)
      .then(res => {
        const users = res.data["users"];
        if (users.length === 0) return;
        users.forEach(function(user, userIndex) {
          if (user.token_holder_address) {
            filteredUsers.push(user);
          }
        });
        this.setState({
          filteredUsers
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.getData();
  }

  handleUserChange(event) {
    let userId = event.target.value;
    axios
      .get(`${apiRoot}api/users/${userId}/ost-users`)
      .then(res => {
        this.setState({
          currentTokenId: res.data && res.data.token_id,
          currentUserId: userId,
          QRSeed: this.getQRCodeData()
        });
      })
      .catch(err => {});
  }

  handleAddressChange(address, index) {
    let addresses = this.state.addresses;
    if (addresses.indexOf(address) === -1) {
      addresses[index] = address;
      this.setState({
        addresses,
        QRSeed: this.getQRCodeData()
      });
    }
  }

  handleAmountChange(amount, index) {
    let amounts = this.state.amounts;
    amounts[index] = amount;
    this.setState({
      amounts,
      QRSeed: this.getQRCodeData(),
    });
  }

  ListItemCollection() {
    const items = [];
    for (var i = 0; i < 5; i++) {
      items.push(
        <CustomDataItem
          filteredUsers={this.state.filteredUsers}
          key={i}
          id={i}
          handleAddressChange={this.handleAddressChange}
          handleAmountChange={this.handleAmountChange}
        />
      );
    }
    return items;
  }

  render() {
    this.state.filteredUsers.length > 0 && console.log(this.state);
    return (
      <div>
        <div className="row bg-light py-3 my-4">
          <div className="col-12 col-md-4">
            <div className="form-group">
              <label htmlFor="userSelect">Select User</label>
              <select className="form-control"
                      id="userSelect" value={this.state.currentUserId} onChange={this.handleUserChange}>
                <option />
                {this.state.filteredUsers.map(user => (
                  <option value={user._id} key={user._id}>
                    {user.user_display_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <label>Token Id</label>
            <div>{this.state.currentTokenId}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-12 col-md-9">
                <label>Address</label>
              </div>
              <div className="col-12 col-md-3">
                <label>Amount</label>
              </div>
            </div>
            {this.ListItemCollection()}
          </div>
          <div className="col-6">
            <React.Fragment>
              <div className="row">
                <div className="col-12 text-center">
                  <h3>{this.state.actionLabel}</h3>
                </div>
                <div className="col-12 text-center w-100 mt-3" style={{ height: "350px" }}>
                  {this.state.QRSeed ? (
                    <QRCode className="p-4" size={350} value={JSON.stringify(this.state.QRSeed)} />
                  ) : (
                    <span className="text-muted">Incomplete / incorrect address / amount combination</span>
                  )}
                </div>
              </div>
            </React.Fragment>
          </div>
        </div>
        <div className="row text-center">
          <div className="text-center w-100">
            {dataMap.map((action, index) => (
              <button
                key={`k-${index}`}
                className="btn btn-primary mx-2"
                id={index}
                data-label={action._label}
                onClick={this.setAction}
              >
                {action._label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CustomData;
