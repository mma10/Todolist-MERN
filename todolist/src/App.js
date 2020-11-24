import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadUser } from './store/actions/authActions'
import { Route } from 'react-router-dom'

import Navbar from './Components/navbar/navbar'
import Dashboard from './Components/main/dashboard/dashboard'
import Welcome from './Components/guestPages/welcome'
import SignUp from './Components/auth/signUp'
import Login from './Components/auth/login'
import Loading from './Components/auth/loading'

class App extends Component {
  componentDidMount() {    
    this.props.loadUser();
  } 

  render() {   
    return (     
      <div className="App">  
          <Navbar/>                      
          <Route exact path="/" component={Welcome} />      
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
      </div>      
    )
  }
  
}

App.propTypes = {
  loadUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
}

const MapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect( MapStateToProps, { loadUser })(App);
