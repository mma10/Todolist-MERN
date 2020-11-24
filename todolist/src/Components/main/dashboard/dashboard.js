import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import Header from '../../header/header'
import SearchBox from './searchbox'
import TaskList from './taskList'
import HideTask from './hideTask'
import AddTask from './addTask'

class Dashboard extends Component{  
    static propTypes = {
        task: propTypes.object.isRequired,
        auth: propTypes.object.isRequired
    }
    
    render() {           
        if(localStorage.getItem('token'))        
            return (
                <div className="welcome">
                    <Header user = { this.props.auth.user}/>
                    <main>                
                        <SearchBox />
                        <ul className="list">
                            <TaskList task = { this.props.task } />
                        </ul>
                        <HideTask />
                        <AddTask />
                    </main>
                </div>
            )
        else
            return (
                <p text-align="center">Please login to perform operation</p>                
            )
    }     
}

const MapStateToProps = (state) => {
    return ({
        task: state.task,
        auth: state.auth
    })
}

export default connect(MapStateToProps)(Dashboard);
