import React, { Component } from 'react';
import QRCodeContainer from './QRCodeContainer'
import dataMap from '../constants'

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
        data = dataMap[id];
    this.setState({
      currentListId : id,
      QRSeed : data
    })
  }
  render() {
    return (
      <div className="row pt-4">
        <div className="col-md-6">
          <div className="row text-center">
            <div className="col-12 py-2">
              <button className="btn btn-primary" id="listItem1" onClick={this.onClick}>
                List item 1
              </button>
            </div>
            <div className="col-12 py-2">
              <button className="btn btn-primary" id="listItem2" onClick={this.onClick}>
                List item 2
              </button>
            </div>
            <div className="col-12 py-2">
              <button className="btn btn-primary" id="listItem3" onClick={this.onClick}>
                List item 3
              </button>
            </div>
            <div className="col-12 py-2">
              <button className="btn btn-primary" id="listItem4" onClick={this.onClick}>
                List item 4
              </button>
            </div>
          </div>

        </div>
        <div className="col-md-6">
          <div className="">
            <QRCodeContainer currentListId={this.state.currentListId} qrSeed={this.state.QRSeed}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
