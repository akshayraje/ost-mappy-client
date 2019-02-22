import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import DataDefinition from '../constants/DataDefinition'
import axios from "axios/index";

class Details extends Component {

  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
    this.setState = this.setState.bind(this);
    this.state = {
      currentListId : null,
      user : null
    };
  }

  componentDidMount(){
    axios.get('http://localhost:4040/api/users/'+this.props.match.params.userId)
      .then(res => {
        this.setState({
          user : res.data
        });
        console.log(this.state);
      })
      .catch(err => {

      })
  }

  onClick( event ) {
    let id = event.target.id,
        data = DataDefinition[id],
        address = this.state.user && this.state.user.token_holder_address;
    data.rule_parameters['addresses'] = [address];
    this.setState({
      currentListId : id,
      QRSeed : data
    })
  }

  render() {
    console.log(this.state.QRSeed);
    return (
        <React.Fragment>
          <div className="row">
            <div className="text-center w-100" style={{height: '350px'}}>
            {this.state.QRSeed && <QRCode className="p-4" size={350} value={JSON.stringify(this.state.QRSeed)}/>}
            </div>
          </div>
          <div className="row text-center">
            <div className="text-center w-100">
              <button className="btn btn-primary mx-2" id="directTransfers" onClick={this.onClick}>
                Direct Transfers
              </button>
              <button className="btn btn-primary mx-2" id="pay" onClick={this.onClick}>
                Pay
              </button>
            </div>
          </div>
        </React.Fragment>
    );
  }
}

export default Details;
