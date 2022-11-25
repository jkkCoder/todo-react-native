import React,{useState} from "react";
import {Alert} from "react-native"
import { StyleSheet, Text, TextInput, View, Button} from 'react-native';
import { useDispatch } from "react-redux"
import { addList } from "../redux/actions"

export default function AddTodo() {
    const [text,setText] = useState("")
    const dispatch = useDispatch()

    const submitHandler = (text) => {

        if (text.length < 3) {
          Alert.alert("OOPS!", "Todos must be over 3 chars long", [
            { text: "Understood", onPress: () => console.log("alert closed") }
          ])
          return
        }
    
        dispatch(addList(text))
      }

    const changeHandler = (val) =>{
        setText(val)
    }
    return(
        <View>
            <TextInput 
                style={styles.input}
                placeholder="new todo..."
                value={text}
                onChangeText={(val)=>changeHandler(val)}
            />
            <Button onPress={()=> submitHandler(text)} title="add todo" color="coral" />
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        marginBottom:10,
        paddingHorizontal:8,
        paddingVertical:6,
        borderBottomWidth:1,
        borderBottomColor:"#ddd"
    }
})