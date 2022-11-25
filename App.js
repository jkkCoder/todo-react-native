import React, { useState,useEffect } from "react";
import { Alert, FlatList, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Header from "./components/Header.js";
import TodoItem from "./components/TodoItem.js";
import AddTodo from "./components/AddTodo.js";
import { Provider } from "react-redux"
import {store} from "./redux/store"
import { useSelector,useDispatch } from "react-redux"
import { getList } from "./redux/actions"
import LotteView from "lottie-react-native"


const AppWrapper = () => {
  const todoList = useSelector(state => state.todoList)
  const { todos } = todoList
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getList())
  },[dispatch])

  return (
    <Provider store={store}>
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss()
        console.log("dismissed keyboard")
      }}>
        <View style={styles.container}>
          <Header />
          <View style={styles.content}>
            <AddTodo />
            <View style={styles.list}>
              {
                todos.length === 0 ?
                <>
                <LotteView 
                  source={require("./assets/empty.json")}
                  autoPlay
                />
                </>
                :
                <FlatList
                  data={todos}
                  renderItem={({ item }) => (
                    <TodoItem item={item} />
                  )}
                />

              }
              
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
