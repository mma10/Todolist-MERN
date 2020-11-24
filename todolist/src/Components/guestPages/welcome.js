import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import '../../styles/welcome.css'
import { Link } from 'react-router-dom'

class Welcome extends Component {
    static propTypes = {
        auth: propTypes.object.isRequired
    }

    render() {
        if(this.props.auth.authenticated == true)
            this.props.history.push('/dashboard');

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

const MapStateToProps = (state) => {
    return {
      auth: state.auth
    }
}

export default connect(MapStateToProps)(Welcome);