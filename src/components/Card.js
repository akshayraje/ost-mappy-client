import React, { Component } from 'react';
import { toSvg } from 'jdenticon';

class Card extends Component {
    render() {
      const user = this.props.user,
            colClass = this.props.colClass ? this.props.colClass : 'col-md-3';
        return (
          <div className={colClass+' py-2'}>
            <div className="card">
              <svg className="card-img-top" data-jdenticon-value={user._id}></svg>
              <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text">{user.mobile_number}</p>
                <p className="card-text">{user.description}</p>
              </div>
            </div>
          </div>
        );
    }
}

export default Card;
