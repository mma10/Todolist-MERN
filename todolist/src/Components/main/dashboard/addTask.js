import React,{ Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import $ from 'jquery'

import { addTask } from '../../../store/actions/taskActions'


class AddTask extends Component {
    state = {
        addTask : ''
    };

    submitForm = (e) => {
        e.preventDefault();
        const task = {
            item: this.state.addTask
        }
        this.props.addTask(task);
        $('.add_form input')[0].value = null;
    };

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };
     

    render() {
        return (
        <form className="add_form" onSubmit={ this.submitForm }>
            <label htmlFor="addTask">Add a Task: </label>
            <input id="addTask" type="text" placeholder="Enter Task" onChange={ this.onChange }/>
            <button className="submit" type="submit">Add</button>
        </form>
        )
    };
}

AddTask.propTypes = {
    addTask: propTypes.func.isRequired
}

export default connect( null, { addTask } )(AddTask); 

