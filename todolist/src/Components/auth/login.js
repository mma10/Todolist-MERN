import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import '../../styles/login.css'
import { login } from '../../store/actions/authActions'

class Login extends Component {
    state = {        
        email: '',
        password: ''        
    };   
    
    static propTypes = {
        login: propTypes.func.isRequired,
        error: propTypes.object
    }

    updateState = (e) => {     
        this.setState({            
            [e.target.className]: e.target.value
        });
    }

    loginUser = (e) => {       
        e.preventDefault();       
        const User = {
            email: this.state.email,
            password: this.state.password
        }          
        this.props.login(User);         
    } 

    render() {   
        return (
            <div className="loginContainer">                                
                <form className="loginForm" onSubmit={ this.loginUser} >  
                    <div className="text">
                        <span>LOGIN</span>
                    </div>

                    <div className="formEntity" >
                        <label htmlFor="email"> EMAIL : </label>
                        <input type="email" className="email" onChange={this.updateState} /> <br/><br/>
                    </div>

                    <div className="formEntity" >
                        <label htmlFor="password" > PASSWORD : </label>
                        <input type="password" className="password" onChange={this.updateState} /> <br/><br/>
                    </div>

                    <div className="submitButton" >
                        <input type="submit" />
                    </div>
                </form>
            </div>
        );
        
    }    
}

const mapStateToProps = (state) => {
    return {
      error: state.error
    }
  }

export default connect(mapStateToProps, { login })(Login);