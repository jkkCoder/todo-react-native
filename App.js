import React, { useState,useEffect } from "react";
import { Alert, FlatList, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Header from "./components/Header.js";
import TodoItem from "./components/TodoItem.js";
import AddTodo from "./components/AddTodo.js";
import { Provider } from "react-redux"
import {store} from "./redux/store"
import { useSelector,useDispatch } from "react-redux"
import { getList } from "./redux/actions"

const AppWrapper = () => {
  const todoList = useSelector(state => state.todoList)
  const { todos } = todoList
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getList())
    console.log("todos is ",todos)
  },[dispatch])

  const pressHandler = (key) => {
    // setTodos((prevTodos) => {
    //   return prevTodos.filter(todo => todo.key != key)
    // })
  }

  const submitHandler = (text) => {

    if (text.length < 3) {
      Alert.alert("OOPS!", "Todos must be over 3 chars long", [
        { text: "Understood", onPress: () => console.log("alert closed") }
      ])
      return
    }

    // setTodos((prevTodos) => {
    //   return [
    //     { text: text, key: Math.random().toString() },
    //     ...prevTodos
    //   ]
    // })
  }

  return (
    <Provider store={store}>
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss()
        console.log("dismissed keyboard")
      }}>
        <View style={styles.container}>
          <Header />
          <View style={styles.content}>
            <AddTodo submitHandler={submitHandler} />
            <View style={styles.list}>
              <FlatList
                data={todos}
                renderItem={({ item }) => (
                  <TodoItem item={item} pressHandler={pressHandler} />
                )}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Provider>
  );
}


export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
    flex: 1
  },
  list: {
    marginTop: 20,
    flex: 1
  }
});
