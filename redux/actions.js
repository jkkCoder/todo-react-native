export const GET_TODOLIST = 'GET_TODOLIST'

export const getList = () => dispatch => {
    console.log("inside getlist action")

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