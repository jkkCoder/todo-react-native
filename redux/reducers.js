import {GET_TODOLIST} from "./actions"

export const todoListReducer = (state = [], action) => {
    switch(action.type){
        case GET_TODOLIST:
            return {todos : action.payload}
        default:
            return state
    }
}