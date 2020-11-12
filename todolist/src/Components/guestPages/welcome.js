import React, { Component } from 'react'
import '../../styles/welcome.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Welcome extends Component {
    render() {
        return (
            <div className="welcomePage">
                <div className="welcomeContainer">
                    <div className="welcomeText">
                        <h1>TODO APP</h1>
                        <h2>CREATE AND MANAGE YOUR TASKS FOR THE DAY</h2>
                    </div>
                    <div className="welcomeButtons">
                        <Link to="/signup">
                            <button type="submit">SIGNUP</button>
                        </Link>    

                        <Link to='/login'>
                            <button type="submit">LOGIN</button>
                        </Link>
                    </div>   
                    
                </div>
            </div>           
        )
    }
}

export default Welcome;