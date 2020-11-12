const initState = {
    tasks: []
}

const taskReducer = (state = initState, action) => {
    switch(action.type){
        case 'GET':
            return{
                ...state,
                tasks: action.payload
            }

        case "ADD" :
            return({
                ...state,
                tasks: [action.payload, ...state.tasks]
            })

        case "UPDATE" :
            return({
                ...state,
                tasks: state.tasks.map((task) => {                    
                    if(task._id==action.id){                        
                        return {
                            _id: action.id,
                            item: action.payload.item
                        };
                    }
                    else
                        return task;
                })
            })
        
        case 'DELETE' :
            return{
                ...state,
                tasks: state.tasks.filter( (task) => task._id !== action.id)
            }
        
        case "LOGOUT_SUCCESS":            
            return {
                ...state,
               tasks: []
            }

        default:
            return state;
    }    
            
}  

export default taskReducer;