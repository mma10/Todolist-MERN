import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import '../../styles/login.css'
import { login } from '../../store/actions/authActions'
import Loading from './loading'
import $ from 'jquery'

class Login extends Component {
    state = {        
        email: '',
        password: ''       
    };   
    
    static propTypes = {
        login: propTypes.func.isRequired,
        error: propTypes.object.isRequired,
        auth: propTypes.object.isRequired
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
        if(this.props.auth.authenticated == true){            
            this.props.history.push('/dashboard');
        }
        
        if(this.props.auth.loading == true){
            $('.loading').css("display","block");
            $('.loginContainer').css("display","none");
        }
        else{
            $('.loading').css("display","none");
            $('.loginContainer').css("display","block");
        }
        
        return (
            <div>
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
      error: state.error,
      auth: state.auth
    }
}

export default connect(mapStateToProps, { login })(Login);