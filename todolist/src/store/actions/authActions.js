import axios from 'axios'
import getErrors from './errorActions'

export const signUp = ({ name, email, password }) => dispatch => {
    // const config = {
    //     header: {
    //         "Content-type": "application/json"
    //     }
    // }

    const body = { name, email, password };

    axios.post('/api/user/register', body)
        .then(res => {        
            dispatch({
                type: "REGISTER_SUCCESS",
                payload: res.data
            })
        }).catch(err => {
            dispatch(getErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
            dispatch({
                type: "REGISTER_FAIL"
            })
        })
}

export const login = ({ email, password }) => dispatch => {        
    const body = { email, password };
    
    axios.post('/api/auth/login', body)
        .then(res => {        
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: res.data
            })
        })
        .catch(err => {       
            dispatch(getErrors(err.response.data, err.response.status, "LOGIN_FAIL"))
            dispatch({
                type: "LOGIN_FAIL"
            })
        });        
}

export const logout = () => dispatch => {
    dispatch({
        type: "LOGOUT_SUCCESS"
    })
}


export const loadUser = () => (dispatch, getState) => {
    dispatch({type: "LOADING_USER" });
    const configzz = tokenConfig();
    
    if(configzz.header.authToken){
        axios.get('/api/auth/user/' + configzz.header.authToken)
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

const tokenConfig = () => {
    const token = localStorage.getItem('token');
    
    const config = {
        header:{
            'Content-type': 'application/json'
        }
    }
    if(token)
        config.header['authToken'] = token;
        
    console.log(config.header.authToken);
    
    return config;
}



