import axios from 'axios'
import $ from 'jquery'
import getErrors from './errorActions'

export const getTasks = () => dispatch => { 
    const authToken = localStorage.getItem('token');     
    axios.get('/api/item/' + authToken)
        .then(res => { 
            dispatch({  
                type: 'GET',
                payload: res.data.tasks
            })
        }).catch(err => {
            dispatch(getErrors(err.response.data, err.response.status, "GET_TASK_FAILED"));        
        }) 
}

export const addTask = task => dispatch => {
    const token = localStorage.getItem('token');
    axios.post('/api/item/' + token,task).then(res => {
        dispatch({
            type: "ADD",
            payload: res.data
        })
    }).catch(err => {
        dispatch(getErrors(err.response.data, err.response.status,"GET_ERROR"));        
    })     
}

export const updateTask = (oldTask, newTask, id, e) => dispatch => {
    const token = localStorage.getItem('token');
    axios.put('/api/item/' + token + '/' + id, newTask).then(res => {                
        dispatch({
            type: "UPDATE",    
            id,        
            payload: newTask
        })

        $(e.target.parentElement.parentElement).find('span').toggleClass('deactive');
        $(e.target.parentElement.parentElement).find('.input').toggleClass('deactive');
        $(e.target.parentElement.parentElement).find('.delete_edit').toggleClass('deactive');
        $(e.target.parentElement.parentElement).find('.cancel_done').toggleClass('deactive');        
    });
}

export const deleteTask = id => dispatch => {
    const token = localStorage.getItem('token');
    axios.delete('/api/item/' + token + '/' + id ).then(res => {       
        dispatch({
            type: "DELETE",
            id           
        });
    }).catch(err => {
        dispatch(getErrors(err.response.data, err.response.status,"GET_ERROR"));
    })
}