import React, { Component } from 'react';
import Card from './Card'
import axios from 'axios';

class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      error : null,
      isLoaded : false,
      users : []
    };
  }

  componentDidMount(){
    axios.get('http://localhost:4040/api/users')
      .then(res => {
        const users = res.data['users'];
        this.setState({
          isLoaded : true,
          users
        })
      })
      .catch(err => {
        this.setState({
          error : err,
          isLoaded : true,
        })
      })
  }

  render() {
    if( this.state.error ) return <div className="alert alert-danger mt-3">Error: {this.state.error.message}</div>;
    if (!this.state.isLoaded ) return <div className="alert alert-secondary mt-3">Loading...</div>;

    return (
      <div className="row p-4">
        {this.state.users.map(user => (
          <Card key={user._id} user={user}/>
        ))}
      </div>
    );
  }
}

export default List;
