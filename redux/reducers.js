import {GET_TODOLIST,ADD_TODOLIST,REMOVE_TODOLIST,ADD_TODOLIST_REQUEST} from "./actions"

export const todoListReducer = (state = {todos:[],loading:false}, action) => {
    switch(action.type){
        case GET_TODOLIST:
            return {loading:false, todos : action.payload}
        case ADD_TODOLIST_REQUEST:
            return {loading:true, todos:action.payload}
        case ADD_TODOLIST:
            return {loading:false,todos : action.payload}
        case REMOVE_TODOLIST:
            return {loading:false,todos : action.payload}
        default:
            return state
    }
}