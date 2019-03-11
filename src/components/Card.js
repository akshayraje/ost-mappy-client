import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jdenticon from 'jdenticon';

class Card extends Component {
  constructor(props) {
    super(props);
    this.colClass = this.props.colClass || 'col-lg-3 col-sm-6';
  }

  componentDidMount() {
    jdenticon();
  }

  render() {
    return (
      <div className={`${this.colClass} py-2`}>
        <div className="card shadow">
          <svg className="card-img-top" data-jdenticon-value={this.props.user._id} />
          <div className="card-body">
            <h5 className="card-title text-truncate">
              {this.props.user.user_display_name || this.props.user.username}
            </h5>
            <p className="card-text">Phone: {this.props.user.mobile_number}</p>
            {this.props.user.token_holder_address ? (
              <div className="row">
                <div className="col-6">
                  <Link className="card-link" to={`/user/${this.props.user._id}/tx`}>
                    Transaction QR Codes
                  </Link>
                </div>
                <div className="col-6">
                  <Link className="card-link" to={`/user/${this.props.user._id}/devices`}>
                    Devices QR Codes
                  </Link>
                </div>
              </div>
            ) : (
              <span className="text-black-50">User not setup</span>
            )}
          </div>
          <div className="card-footer text-muted small">{new Date(this.props.user.created_at).toLocaleString()}</div>
        </div>
      </div>
    );
  }
}

export default Card;
