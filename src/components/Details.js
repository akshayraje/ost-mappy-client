import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import DataDefinition from '../constants/DataDefinition'

class Details extends Component {

  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
    this.setState = this.setState.bind(this);
    this.state = {
      currentListId : null,
    };
  }

  onClick( event ) {
    let id = event.target.id,
        data = DataDefinition[id];
    this.setState({
      currentListId : id,
      QRSeed : data
    })
  }

  render() {
    return (
        <React.Fragment>
          <div className="row">
            <div className="text-center w-100" style={{height: '350px'}}>
            {this.state.QRSeed && <QRCode className="p-4" size={350} value={JSON.stringify(this.state.QRSeed)}/>}
            </div>
          </div>
          <div className="row text-center">
            <div className="text-center w-100">
              <button className="btn btn-primary mx-2" id="listItem1" onClick={this.onClick}>
                List item 1
              </button>
              <button className="btn btn-primary mx-2" id="listItem2" onClick={this.onClick}>
                List item 2
              </button>
            </div>
          </div>
        </React.Fragment>
    );
  }
}

export default Details;
