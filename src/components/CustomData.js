import React, {Component} from "react";
import ListItem from './ListItem'
import axios from "axios/index";
import {apiRoot, dataMap} from "../constants";
import QRCode from "qrcode.react";

const EMPTY_ITEM = {
  address : "",
  amount : ""
};

const SelectAddress = (props) => (
  <div className="row mb-4">
    <div className="col-12 col-md-4">
      <label htmlFor={`addressSelect${props.id}`}>Address</label>
      <select className="form-control" id={`addressSelect${props.id}`}>
        <option></option>
        {props.filteredUsers.map( user => (<option key={user._id} value={user.token_holder_address}>{user.user_display_name} ({user.token_holder_address})</option>))}
      </select>
    </div>
    <div className="col-12 col-md-4">
      <label htmlFor={`amount${props.id}`}>Amount</label>
      <input type="number" className="form-control" id={`amount${props.id}`} />
    </div>
  </div>
);

class CustomData  extends Component {
  constructor(props) {
    super( props );
    this.state = {
      filteredUsers : [],
      amounts : [],
      addresses : [],
      currentTokenId : null,
      currentUserId : '',
      showQR : false,
      QRSeed : ''
    };
    this.handleUserChange = this.handleUserChange.bind( this );
    this.handleAddressChange = this.handleAddressChange.bind( this );
    this.handleAmountChange = this.handleAmountChange.bind( this );
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    let id = event.target.id,
      QRSeed = JSON.parse(JSON.stringify(dataMap[id]));
    QRSeed.d["ads"] = [this.state.addresses];
    QRSeed.d["tid"] = this.state.currentTokenId;
    if (this.state.amounts.length > 0) {
      QRSeed.d["ams"] = this.state.amounts;
    }
    delete QRSeed["_label"];
    this.setState({
      QRSeed,
      showQR : true
    });
  }

  getData() {
    let filteredUsers = [];
    axios
      .get(`${apiRoot}api/users`)
      .then(res => {
        const users = res.data["users"];
        if (users.length == 0) return;
        users.forEach(function(user, userIndex){
            if(user.token_holder_address){
              filteredUsers.push( user );
            }
        });
        this.setState({
          filteredUsers
        })
      })
      .catch(err => {
          console.error(err);
      });
  }

  componentDidMount() {
    this.getData();
  }

  handleUserChange( event ){
    let userId = event.target.value;
    axios
      .get(`${apiRoot}api/users/${userId}/ost-users`)
      .then(res => {
        this.setState({
          currentTokenId : res.data && res.data.token_id ,
          currentUserId : userId
        });
      })
      .catch(err => {
      });
  }

  handleAddressChange( address ){
    let addresses = this.state.addresses;
    if( addresses.indexOf( address ) == -1){
      addresses.push( address );
      this.setState({
        addresses
      })
    }
  }

  handleAmountChange( amount, index ){
    let amounts = this.state.amounts;
    amounts[index] = amount;
    this.setState({
      amounts
    })
  }

  render(){
    this.state.filteredUsers.length > 0 && console.log( this.state );
    return (
      !this.state.showQR ?
        <div>
        <h4 className="py-4 text-muted">Add custom data here</h4>
        <div className="row bg-light p-4 mb-4">
          <div className="col-12 col-md-4">
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Select User</label>
              <select className="form-control" id="exampleFormControlSelect1" value={this.state.currentUserId} onChange={this.handleUserChange}>
                <option></option>
                {this.state.filteredUsers.map( user => (<option value={user._id} key={user._id}>{user.user_display_name}</option>))}
              </select>
            </div>
          </div>
          <div className="col-12 col-md-4">
           <label>Token Id</label>
            <div>{this.state.currentTokenId}</div>
          </div>
        </div>
        {[0,1,2,3,4].map( i => <ListItem filteredUsers={this.state.filteredUsers} key={i} id={i} handleAddressChange={this.handleAddressChange}
                                         handleAmountChange={this.handleAmountChange}/>)}
          <div className="row text-center">
            <div className="text-center w-100">
              {dataMap.map((action, index) => (
                <button key={`k-${index}`} className="btn btn-primary mx-2" id={index} onClick={this.onClick}>
                  {action._label}
                </button>
              ))}
            </div>
          </div>
        </div> :
        <React.Fragment>
          <div className="row">
            <div className="text-center w-100" style={{ height: "350px" }}>
              {this.state.QRSeed &&
                <QRCode className="p-4" size={350} value={JSON.stringify(this.state.QRSeed)} />
              }
            </div>
          </div>
        </React.Fragment>
    )
  }

};

export default CustomData;