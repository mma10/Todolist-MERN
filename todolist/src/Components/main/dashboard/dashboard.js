import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from '../../header/header'
import SearchBox from './searchbox'
import TaskList from './taskList'
import HideTask from './hideTask'
import AddTask from './addTask'

class Dashboard extends Component{   
    render() {               
        return (
            <div className="welcome">
                <Header />
                <main>                
                    <SearchBox />
                    <ul className="list">
                        <TaskList task={this.props.task} />
                    </ul>
                    <HideTask />
                    <AddTask />
                </main>
            </div>
        )
    }     
}

const MapStateToProps = (state) => {
    const tasks = state.task;
    return ({
        task: tasks
    })
}

export default connect(MapStateToProps)(Dashboard);
