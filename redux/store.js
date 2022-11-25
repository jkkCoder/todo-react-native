import {createStore, combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {todoListReducer} from "./reducers"

const rootReducer = combineReducers({
    todoList : todoListReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))