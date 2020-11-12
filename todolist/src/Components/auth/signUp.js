import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../styles/signup.css'
import propTypes from 'prop-types'
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    };    

    updateState = (e) => {
        this.setState({
            [e.target.className]: e.target.value
        });
    }

    register = (e) => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        this.props.signUp(newUser);
    } 

    render() {
        return (
            <div className="signupContainer">
                <form className="signupForm" onSubmit={ this.register}>  
                    <div className="text">
                        <span>SIGNUP</span>
                    </div>

                    <div className="formEntity" >
                        <label htmlFor="name"> NAME : </label>
                        <input type="text" className="name" onChange={this.updateState} /> <br/><br/>
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

SignUp.propTypes = {
    signUp: propTypes.func.isRequired
}

export default connect(null, { signUp })(SignUp);