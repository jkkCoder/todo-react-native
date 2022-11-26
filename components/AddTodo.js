import React, { useState } from "react";
import { Alert, Keyboard } from "react-native"
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useDispatch } from "react-redux"
import { addList } from "../redux/actions"
import moment from "moment"
import * as yup from "yup"
import axios from "axios"

export default function AddTodo() {
    const [text, setText] = useState("")
    const dispatch = useDispatch()

    const todoSchema = yup.object().shape({
        todo: yup.string().required().min(4)
    })

    const submitHandler = async (text) => {
        todoSchema.validate({
            todo: text
        })
        .then((valid)=>{
            const createdAt = moment().format("D-MMM-YYYY LT")
            dispatch(addList(text, createdAt))
            setText("")
            Keyboard.dismiss()
        })
        .catch((err) => {
            Alert.alert("OOPS!", "Todos must be over 3 chars long", [
                { text: "Understood", onPress: () => console.log("alert closed") }
            ])
        })
    }

    const changeHandler = (val) => {
        setText(val)
    }
    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="new todo..."
                value={text}
                onChangeText={(val) => changeHandler(val)}
            />
            <Button onPress={() => submitHandler(text)} title="add todo" color="coral" />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd"
    }
})