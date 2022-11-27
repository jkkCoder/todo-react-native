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
import 'react-native-reanimated'
import { MotiView } from 'moti'

export const Loader = ({ size }) => (
  <MotiView
    from={{
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 0,
      shadowOpacity: 0.5
    }}
    animate={{
      width: size + 20,
      height: size + 20,
      borderRadius: (size + 20) / 2,
      borderWidth: 5,
      shadowOpacity: 1
    }}
    transition={{
      type: "timing",
      duration: 1000,
      loop: true,
    }}
    style={{
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 5,
      borderColor: "black",
      shadowColor: "black",
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 10,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 50
    }}
  />
)


const AppWrapper = () => {
  const todoList = useSelector(state => state.todoList)
  const { todos } = todoList
  const { loading } = todoList
  const dispatch = useDispatch()

  const { isLoading, error, data } = useQuery("todoQuery", () => axios("https://crushcalc.herokuapp.com/getTodo"))

  useEffect(() => {
    if (!isLoading) {
      dispatch(getList(data.data))
    }
  }, [isLoading, data])

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
            {
              loading ? <Loader size={50} />
                :
                <>
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
                </>
            }
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
