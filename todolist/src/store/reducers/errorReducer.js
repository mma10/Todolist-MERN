const initState = {
    msg: null,
    status: null,
    id: null
}

const errorReducer = (state = initState, action) => {
    switch(action.type){
        case "GET_ERRORS":
            return {
                ...state,
                ...action.payload
            }
        
        case "CLEAR_ERRORS":
            return {
                ...state,
                msg: null,
                status: null,
                id: null
            }

        default:
            return state;
    }
}

export default errorReducer;