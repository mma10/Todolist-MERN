import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../styles/signup.css'
import propTypes from 'prop-types'
import { signUp } from '../../store/actions/authActions'
import Loading from './loading'
import $ from 'jquery'

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

    static propTypes = {
        signUp: propTypes.func.isRequired,
        auth: propTypes.object.isRequired,
        error: propTypes.object.isRequired
    }

    render() {
        if(this.props.auth.authenticated == true)            
            this.props.history.push('/dashboard');
        
        if(this.props.auth.loading == true){
            $('.loading').css("display","block");
            $('.signupContainer').css("display","none");
        }
        else{
            $('.loading').css("display","none");
            $('.signupContainer').css("display","block");
        }    

        return (
            <div>
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
                    { this.props.error.msg ?  <div className="error">
                        <p>{ this.props.error.msg.msg }</p>
                    </div> : null }
                </div>
                
                <Loading/>
            </div>
        );
        
    }    
}



const mapStateToProps = (state) => {
    return {
      auth: state.auth,
      error: state.error
    }
}

export default connect(mapStateToProps, { signUp })(SignUp);