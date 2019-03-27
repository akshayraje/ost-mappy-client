/*
 * External dependencies
 */
import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

/*
 * Internal dependencies
 */
import Card from './Card';
import { apiRoot } from '../constants';
import { Loader, Error } from './Loader';

/*
 * Module constants
 */
const LIMIT = 8;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: [],
      hasNext: false,
      hasPrevious: false,
      searchText: ''
    };
    this.skip = 0;
    this.debounceGetData = _.debounce(this.getData, 1000);
  }

  componentDidMount() {
    this.getData();
  }

  getData = (skip = 0, searchCriteria = '') => {
    this.setState({
      isLoaded: false
    });
    axios
      .get(`${apiRoot}api/users?limit=${LIMIT}&skip=${skip}&un=${searchCriteria}`)
      .then((res) => {
        const users = res.data['users'];
        this.setState({
          isLoaded: true,
          hasPrevious: skip > 0
        });
        if (users.length > 0) {
          this.skip = skip;
          this.setState({
            users,
            hasNext: !(users.length < LIMIT || users.length === 0)
          });
        } else {
          this.setState({
            hasNext: false
          });
        }
      })
      .catch((err) => {
        this.setState({
          error: err,
          isLoaded: true
        });
      });
  };

  next = () => {
    if (this.state.hasNext) {
      this.getData(this.skip + LIMIT, this.state.searchText);
    }
  };

  previous = () => {
    if (this.state.hasPrevious) {
      this.getData(this.skip - LIMIT, this.state.searchText);
    }
  };

  updateSearchCriteria = (event) => {
    let value = event.target.value;
    event.persist();
    this.setState({
      searchText: value
    });
    this.debounceGetData(0, value);
  };

  render() {
    if (this.state.error) return <Error message={this.state.error.message} />;
    if (!this.state.isLoaded)
      return (
        <React.Fragment>
          <div className="row justify-content-end px-4 pt-4">
            <div className="col-6 col-md-3 float-right">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search..."
                onKeyUp={this.updateSearchCriteria}
              />
            </div>
          </div>
          <div className="p-5">
            <Loader />
          </div>
        </React.Fragment>
      );
    return (
      <React.Fragment>
        <div className="row justify-content-end px-4 pt-4">
          <div className="col-6 col-md-3 float-right">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search..."
              onKeyUp={this.updateSearchCriteria}
            />
          </div>
        </div>
        <div className="p-4">
          <div className="row">
            {this.state.users.map((user) => (
              <Card key={user._id} user={user} />
            ))}
          </div>
          <nav aria-label="User navigation">
            <ul className="pagination justify-content-end pt-3">
              <li className={`page-item ${!this.state.hasPrevious ? 'disabled' : ''}`}>
                <span className="page-link" onClick={this.previous}>
                  &laquo;
                </span>
              </li>
              <li className={`page-item ${!this.state.hasNext ? 'disabled' : ''}`}>
                <span className="page-link" onClick={this.next}>
                  &raquo;
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default List;
