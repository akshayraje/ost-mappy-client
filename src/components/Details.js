import React, { Component } from 'react';

class Details extends Component {
  render() {
    return (
      <div className="row pt-4">
        <div className="col-md-6">
          <ul>
            <li>
              List item 1
            </li>
            <li>
              List item 2
            </li>
            <li>
              List item 3
            </li>
            <li>
              List item 4
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          <div className="mx-auto my-auto">
            Content
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
