import React, { Component } from 'react';
import Card from './components/Card'
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      error : null,
      isLoaded : false,
      users : []
    };
  }

  componentDidMount(){
    axios.get('http://172.16.0.223:4040/api/users')
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
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="row p-4">
              {this.state.users.map(user => (
                 <Card key={user._id} user={user}/>
              ))}
        </div>
      );
    }
  }
}

export default App;
