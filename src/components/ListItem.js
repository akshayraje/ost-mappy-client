import React from "react";

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      amount: 0
    };

    this.onAddressChange = this.onAddressChange.bind(this);
    this.onAmountChange  = this.onAmountChange.bind(this);
  }

  onAddressChange(event) {
    let address = event.target.value;
    this.props.handleAddressChange( address );
    this.setState({
      address
    })
  }

  onAmountChange(event) {
    let amount = event.target.value;
    this.props.handleAmountChange( amount, this.props.id );
    this.setState({
      amount
    })
  }

  render(){
    return(
      <div className="row mb-4">
        <div className="col-12 col-md-4">
          <label htmlFor={`addressSelect${this.props.id}`}>Address</label>
          <select value={this.state.address} className="form-control" id={`addressSelect${this.props.id}`} onChange={this.onAddressChange}>
            <option></option>
            {this.props.filteredUsers.map( user => (<option key={user._id} value={user.token_holder_address}>{user.user_display_name} ({user.token_holder_address})</option>))}
          </select>
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor={`amount${this.props.id}`}>Amount</label>
          <input type="number" className="form-control" value={this.state.amount} id={`amount${this.props.id}`}  onChange={this.onAmountChange}/>
        </div>
      </div>
    )
  }
};