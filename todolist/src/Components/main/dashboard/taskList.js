import React,{ Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import $ from 'jquery'

import { getTasks, updateTask, deleteTask } from '../../../store/actions/taskActions'

const editTasks = (e) => {
    e.persist();
    e.preventDefault();
    $('document').ready(() => {
        e.preventDefault();             
        $(e.target.parentElement.parentElement).find('span').toggleClass('deactive');
        $(e.target.parentElement.parentElement).find('.input').toggleClass('deactive');
        $(e.target.parentElement.parentElement).find('.delete_edit').toggleClass('deactive');
        $(e.target.parentElement.parentElement).find('.cancel_done').toggleClass('deactive');
        $(e.target.parentElement.parentElement).find('.input')[0].value = $(e.target.parentElement.parentElement).find('span').text();
    })
}

const cancelEdit = (e) => {
    e.persist();
    e.preventDefault();        
    $(e.target.parentElement.parentElement).find('span').toggleClass('deactive');
    $(e.target.parentElement.parentElement).find('.input').toggleClass('deactive');
    $(e.target.parentElement.parentElement).find('.delete_edit').toggleClass('deactive');
    $(e.target.parentElement.parentElement).find('.cancel_done').toggleClass('deactive');
    $(e.target.parentElement.parentElement).find('.input')[0].value = null;
}

const clickButton = (e) => {
    e.persist();        
    if(e.keyCode === 13)
            $(e.target.parentElement).find('.done').click();
}

class TaskList extends Component {
    componentDidMount() {        
        this.props.getTasks();
    }

    deleteTask = (task,e) => {
        e.preventDefault();
        this.props.deleteTask(task._id);
    }

    editTask = (task,e) => {
        e.persist();
        e.preventDefault();   
        var updatedTask = $(e.target.parentElement.parentElement).find('input').val();             
        this.props.updateTask({ item: task.item}, { item: updatedTask }, task._id, e);
    }
        
    render() {
        const tasks = this.props.task.tasks;
        return(                    
            tasks && tasks.map((task) => {
                return(
                <li className="li_task" key={task._id}>                    
                    <span className="">{task.item}</span>
                    <input name="newTask" className="input deactive" type="text" placeholder="Enter Task" onKeyUp={clickButton}/> 
                    <div className="button_wrapper delete_edit">                   
                        <button className="button delete" onClick={(e) => {this.deleteTask(task,e)}}>Delete</button>   
                        <button className="button_2 edit" onClick={editTasks}>Edit</button> 
                    </div>
                    <div className="button_wrapper cancel_done deactive">
                        <button className="button cancel" onClick={cancelEdit}>Cancel</button>                       
                        <button className="button_2 done" onClick={(e) => this.editTask(task,e)} >Done</button>                                                         
                    </div>                   
                </li>  
                )
            })          
            
        )
    }
}

TaskList.propTypes = {
    getTasks: propTypes.func.isRequired,
    deleteTask: propTypes.func.isRequired, 
    updateTask: propTypes.func.isRequired,    
    task: propTypes.object.isRequired   
}

export default connect(null, { getTasks, updateTask, deleteTask } )(TaskList);