import axios from "axios";

export const GET_TODOLIST = 'GET_TODOLIST'
export const ADD_TODOLIST = 'ADD_TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
export const ADD_TODOLIST_REQUEST = 'ADD_TODOLIST_REQUEST'

export const getList = (todos) => async (dispatch) => {

    dispatch({
        type: GET_TODOLIST,
        payload: todos
    })
}

export const addList = (text, createdAt) => async (dispatch, getState) => {
    const { todoList: { todos } } = getState()
    let todo

    dispatch({
        type:ADD_TODOLIST_REQUEST,
        payload:todos
    })

    try{
        const resp = await axios.post('https://crushcalc.herokuapp.com/postTodo', {
            text,
            createdAt
        });
        todo = resp.data.todo
    }catch(err){
        console.log(err)
    }

    const newTodos = [
        todo,
        ...todos
    ]


    dispatch({
        type: ADD_TODOLIST,
        payload: newTodos
    })
}

export const removeList = (key) => (dispatch, getState) => {
    const { todoList: { todos } } = getState()

    try{
        const res = axios.delete(`https://crushcalc.herokuapp.com/deleteTodo/${key}`)
    }catch(err){
        console.log(err)
    }

    const newTodos = todos.filter(todo => todo._id !== key)

    dispatch({
        type: REMOVE_TODOLIST,
        payload: newTodos
    })
}