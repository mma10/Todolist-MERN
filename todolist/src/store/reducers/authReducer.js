const initState = {
    token: null,
    authenticated: false,
    user: null,
    loading: false
} 

const authReducer = (state = initState, action) => {
    switch(action.type){
        case "LOADING_USER":
            return{
                ...state,
                loading: true
            } 

        case "LOAD_USER":
            return{                
                ...state,
                token: localStorage.getItem('token'),
                user: action.payload,
                authenticated: true,
                loading: false                
            }
        
        case "REGISTER_SUCCESS":
        case "LOGIN_SUCCESS": 
            localStorage.setItem("token",action.payload.token);                
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                authenticated: true ,
                loading: false                
            }
         
        case "LOGOUT_SUCCESS":
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                user: null,
                authenticated: false,
                loading: false
            }
        case "AUTH_ERROR":
        case "LOGIN_FAIL":
        case "REGISTER_FAIL":               
            return {
                ...state,
                token: null,
                user: null,
                authenticated: false,
                loading: false
            }
        default: 
            return state;
    }
}

export default authReducer;