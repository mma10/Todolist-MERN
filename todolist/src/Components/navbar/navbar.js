import React, {Component} from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import '../../styles/navbar.css'
import Logout from '../auth/logout'

class Navbar extends Component {
    static propTypes = {
        auth: propTypes.object.isRequired
    }

    render () {
        const authLinks = ( 
            <div className="navbarContainer">
                <NavLink to="/dashboard">
                    <span>DASHBOARD</span>
                </NavLink>
                
                <Link to="/">
                    <Logout />
                </Link>
            </div>
        );
        
        const guestLinks = (
            <div className="navbarContainer">
                <NavLink to="/signup">
                    <span>SIGNUP</span>
                </NavLink>

                <NavLink to="/login">
                    <span>LOGIN</span>
                </NavLink>
            </div>
        )        
        
        return (     
            <div className="navbar">    
                { localStorage.getItem('token') ? authLinks : guestLinks }
            </div>
        )    
    }    
}

const MapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(MapStateToProps)(Navbar);