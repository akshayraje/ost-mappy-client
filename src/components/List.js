/*
 * External dependencies
 */
import React, { Component } from "react";
import axios from "axios";

/*
 * Internal dependencies
 */
import Card from "./Card";
import { apiRoot } from "../constants";
import { Loader, Error } from "./Loader";

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
      hasPrevious: false
    };
    this.skip = 0;
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData(skip = 0) {
    this.setState({
      isLoaded: false
    });
    axios
      .get(`${apiRoot}api/users?limit=${LIMIT}&skip=${skip}`)
      .then(res => {
        const users = res.data["users"];
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
      .catch(err => {
        this.setState({
          error: err,
          isLoaded: true
        });
      });
  }

  next() {
    if (this.state.hasNext) {
      this.getData(this.skip + LIMIT);
    }
  }

  previous() {
    if (this.state.hasPrevious) {
      this.getData(this.skip - LIMIT);
    }
  }

  render() {
    if (this.state.error) return <Error message={this.state.error.message} />;

    return (
      <div className="p-4">
        {!this.state.isLoaded ? <Loader /> : ""}
        <div className="row">
          {this.state.users.map(user => (
            <Card key={user._id} user={user} />
          ))}
        </div>
        <nav aria-label="User navigation">
          <ul className="pagination justify-content-end pt-3">
            <li className={`page-item ${!this.state.hasPrevious ? "disabled" : ""}`}>
              <span className="page-link" onClick={this.previous}>
                &laquo;
              </span>
            </li>
            <li className={`page-item ${!this.state.hasNext ? "disabled" : ""}`}>
              <span className="page-link" onClick={this.next}>
                &raquo;
              </span>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default List;
