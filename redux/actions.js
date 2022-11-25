export const GET_TODOLIST = 'GET_TODOLIST'
export const ADD_TODOLIST = 'ADD_TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST'

export const getList = () => dispatch => {

    //make a fetch request to get todos list
    const todos = [     
        { text: "buy coffee", key: "1" },
        { text: "create an app", key: "2" },
        { text: "play on the swich", key: "3" }
    ]
    dispatch({
        type: GET_TODOLIST,
        payload: todos
    })
}

export const addList = (text) => (dispatch,getState) => {
    const {todoList:{todos}} = getState()

    const todo = {
        text,
        key:Math.random().toString()
    }

    const newTodos = [
        todo,
        ...todos
    ]


    dispatch({
        type : ADD_TODOLIST,
        payload : newTodos
    })
}

export const removeList = (key) => (dispatch,getState) => {
    const {todoList:{todos}} = getState()
    console.log("from remove",todos)

    const newTodos = todos.filter(todo => todo.key != key)
    console.log("new todos from remove is ",newTodos)

    dispatch({
        type : REMOVE_TODOLIST,
        payload : newTodos
    })
}