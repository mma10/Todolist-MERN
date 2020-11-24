import axios from 'axios'
import getErrors from './errorActions'

export const signUp = ({ name, email, password }) => dispatch => {
    dispatch({type: "LOADING_USER" });   
    axios.post('/api/user/register', { name, email, password } )
        .then(res => {        
            dispatch({
                type: "REGISTER_SUCCESS",
                payload: res.data
            });        
        }).catch(err => {
            dispatch(getErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
            dispatch({
                type: "REGISTER_FAIL"
            });
        })
}

export const login = ({ email, password }) => dispatch => {
    dispatch({type: "LOADING_USER" });         
    axios.post('/api/auth/login', { email, password } )
        .then(res => {        
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: res.data
            });            
        })
        .catch(err => {       
            dispatch(getErrors(err.response.data, err.response.status, "LOGIN_FAIL"))
            dispatch({
                type: "LOGIN_FAIL"
            });
        });        
}

export const logout = () => dispatch => {
    dispatch({
        type: "LOGOUT_SUCCESS"
    })
}


export const loadUser = () => (dispatch, getState) => {
    dispatch({type: "LOADING_USER" });
    const token = localStorage.getItem('token')
    
    if(token && token != 'null' && token != 'undefined'){
        axios.get('/api/auth/user/' + token)
            .then(res => {
                dispatch({
                    type: "LOAD_USER",
                    payload: res.data
                })
            })
            .catch(err => {        
                dispatch(getErrors(err.response.data, err.response.status,"LOADUSER_FAILED"));
                dispatch({
                    type: "AUTH_ERROR"
                })
            }) ;
    }
    else{
        dispatch({
            type: "AUTH_ERROR"
        })
    }    
}