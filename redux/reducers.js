import {GET_TODOLIST,ADD_TODOLIST,REMOVE_TODOLIST} from "./actions"

export const todoListReducer = (state = {todos:[]}, action) => {
    switch(action.type){
        case GET_TODOLIST:
            return {todos : action.payload}
        case ADD_TODOLIST:
            return {todos : action.payload}
        case REMOVE_TODOLIST:
            return {todos : action.payload}
        default:
            return state
    }
}