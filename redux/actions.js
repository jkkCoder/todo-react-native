import axios from "axios";

export const GET_TODOLIST = 'GET_TODOLIST'
export const ADD_TODOLIST = 'ADD_TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST'

export const getList = () => async (dispatch) => {

    //make a fetch request to get todos list
    let todos
    try {
        const { data } = await axios.get("https://crushcalc.herokuapp.com/getTodo")
        todos = data
    } catch (err) {
        console.log(err)

        //hardcoded
        todos = [
            { text: "buy coffee", createdAt: "24-Nov-2022 7:25 PM", _id: "1" },
            { text: "create an app", createdAt: "23-Nov-2022 7:25 PM", _id: "2" },
            { text: "turn on the switch", createdAt: "22-Nov-2022 7:25 PM", _id: "3" }
        ]
    }

    dispatch({
        type: GET_TODOLIST,
        payload: todos
    })
}

export const addList = (text, createdAt) => async (dispatch, getState) => {
    const { todoList: { todos } } = getState()

    // const todo = {
    //     text,
    //     createdAt,
    //     key: Math.random().toString()
    // }
    let todo
    try{
        const resp = await axios.post('https://crushcalc.herokuapp.com/postTodo', {
            text,
            createdAt
        });
        todo = resp.data.todo
        console.log("from add ",resp.data)
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