import React, {Component} from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../../styles/navbar.css'
import SignUp from '../auth/signUp'
import Login from '../auth/login'
import Logout from '../auth/logout'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbarContainer">
                <NavLink to="/dashboard">
                    <span>DASHBOARD</span>
                </NavLink>

                <NavLink to="/signup">
                    <span>SIGNUP</span>
                </NavLink>

                <NavLink to="/login">
                    <span>LOGIN</span>
                </NavLink>
                
                <Link to="/">
                    <Logout />
                </Link>                
            </div>
        </div>
    )

}

export default Navbar;