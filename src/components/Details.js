/*
 * External dependencies
 */
import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

/*
 * Internal dependencies
 */
import DataDefinition from '../constants/DataDefinition'
import { Loader, Error } from './Loader';

class Details extends Component {

  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      currentListId : null,
      user : null,
      error : null,
      isLoaded : false
    };
  }

  componentDidMount(){
    this.setState({
      isLoaded : false,
    });
    axios.get('http://localhost:4040/api/users/'+this.props.match.params.userId)
      .then(res => {
        this.setState({
          user : res.data,
          isLoaded : true
        });
      })
      .catch(err => {
        this.setState({
          error : err,
          isLoaded : true
        })
      })
  }

  onClick( event ) {
    let id = event.target.id,
        data = JSON.parse(JSON.stringify(DataDefinition[id])),
        address = this.state.user && this.state.user.token_holder_address;
    data.d['ads'] = [address];
    delete data['_label'];
    this.setState({
      currentListId : id,
      QRSeed : data
    });
  }

  render() {
    if( this.state.error ) return <Error message={this.state.error.message} />;
    if (!this.state.isLoaded ) return <div className="p-4" ><Loader /></div>;
    return (
        <React.Fragment>
          <div className="row">
            <div className="text-center w-100" style={{height: '350px'}}>
              {
              this.state.QRSeed ?
                  <QRCode className="p-4" size={350} value={JSON.stringify(this.state.QRSeed)}/> :
                  <p className="p-4 display-4 text-muted" style={{height: '350px'}}>Select an action to get QR code</p>
            }
            </div>
          </div>
          <div className="row text-center">
            <div className="text-center w-100">
              {DataDefinition.map((action, index) => (
                  <button key={`k-${index}`} className="btn btn-primary mx-2" id={index} onClick={this.onClick}>{action._label}</button>
              ))}
            </div>
          </div>
        </React.Fragment>
    );
  }
}

export default Details;
