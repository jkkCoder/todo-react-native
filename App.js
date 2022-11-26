import React, { useState, useEffect } from "react";
import { Alert, FlatList, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Header from "./components/Header.js";
import TodoItem from "./components/TodoItem.js";
import AddTodo from "./components/AddTodo.js";
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { useSelector, useDispatch } from "react-redux"
import { getList } from "./redux/actions"
import LotteView from "lottie-react-native"
import axios from "axios"
import { useQuery } from "react-query"
import { QueryClient, QueryClientProvider } from "react-query"


const AppWrapper = () => {
  const todoList = useSelector(state => state.todoList)
  const { todos } = todoList
  const dispatch = useDispatch()

  const { isLoading, error, data } = useQuery("todoQuery", () => axios("https://crushcalc.herokuapp.com/getTodo"))
  console.log("useQuery called isLoading, ",isLoading)

  useEffect(()=>{
    if(!isLoading){
      dispatch(getList(data.data))
    }
  },[isLoading,data])

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
                isLoading ? <LotteView source={require("./assets/loading.json")} autoPlay />
                  :
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

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppWrapper />
      </Provider>
    </QueryClientProvider>

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
