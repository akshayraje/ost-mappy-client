import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jdenticon from 'jdenticon';

class Card extends Component {

    constructor(props){
        super(props);
        this.colClass = this.props.colClass || 'col-lg-3 col-sm-6';
    }

    componentDidMount(){
        jdenticon();
    }

    render() {
      return (
          <div className={`${this.colClass} py-2`}>
              <div className="card shadow">
                <svg className="card-img-top" data-jdenticon-value={this.props.user._id}></svg>
                <div className="card-body">
                  <h5 className="card-title">{this.props.user.username}</h5>
                  <p className="card-text">Phone: {this.props.user.mobile_number}</p>
                  <Link className="card-link" to={`/user/${this.props.user._id}`}>Get QR Codes</Link>
                </div>
              </div>
          </div>
        );
    }
}

export default Card;
